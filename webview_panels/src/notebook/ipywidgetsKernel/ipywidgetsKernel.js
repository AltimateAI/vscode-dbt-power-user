var Pl = Object.create;
var vn = Object.defineProperty;
var Ml = Object.getOwnPropertyDescriptor;
var Tl = Object.getOwnPropertyNames;
var Ol = Object.getPrototypeOf,
  Nl = Object.prototype.hasOwnProperty;
var Ns = (n, e) => () => (n && (e = n((n = 0))), e);
var k = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports),
  Ll = (n, e) => {
    for (var t in e) vn(n, t, { get: e[t], enumerable: !0 });
  },
  Ls = (n, e, t, r) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let i of Tl(e))
        !Nl.call(n, i) &&
          i !== t &&
          vn(n, i, {
            get: () => e[i],
            enumerable: !(r = Ml(e, i)) || r.enumerable,
          });
    return n;
  };
var Ct = (n, e, t) => (
    (t = n != null ? Pl(Ol(n)) : {}),
    Ls(
      e || !n || !n.__esModule
        ? vn(t, "default", { value: n, enumerable: !0 })
        : t,
      n
    )
  ),
  kl = (n) => Ls(vn({}, "__esModule", { value: !0 }), n);
var process,
  h = Ns(() => {
    "use strict";
    process = {
      platform: "web",
      cwd: () => "",
      env: { NODE_ENV: "production" },
    };
  });
var kr = k((gf, Ws) => {
  "use strict";
  h();
  var Fs = Array.isArray,
    Us = Object.keys,
    jl = Object.prototype.hasOwnProperty;
  Ws.exports = function n(e, t) {
    if (e === t) return !0;
    if (e && t && typeof e == "object" && typeof t == "object") {
      var r = Fs(e),
        i = Fs(t),
        s,
        o,
        a;
      if (r && i) {
        if (((o = e.length), o != t.length)) return !1;
        for (s = o; s-- !== 0; ) if (!n(e[s], t[s])) return !1;
        return !0;
      }
      if (r != i) return !1;
      var l = e instanceof Date,
        u = t instanceof Date;
      if (l != u) return !1;
      if (l && u) return e.getTime() == t.getTime();
      var f = e instanceof RegExp,
        c = t instanceof RegExp;
      if (f != c) return !1;
      if (f && c) return e.toString() == t.toString();
      var C = Us(e);
      if (((o = C.length), o !== Us(t).length)) return !1;
      for (s = o; s-- !== 0; ) if (!jl.call(t, C[s])) return !1;
      for (s = o; s-- !== 0; ) if (((a = C[s]), !n(e[a], t[a]))) return !1;
      return !0;
    }
    return e !== e && t !== t;
  };
});
var ct = k((En, Ks) => {
  h();
  (function (n, e) {
    typeof En == "object" && typeof Ks != "undefined"
      ? e(En)
      : typeof define == "function" && define.amd
        ? define(["exports"], e)
        : ((n = typeof globalThis != "undefined" ? globalThis : n || self),
          e((n.lumino_algorithm = {})));
  })(En, function (n) {
    "use strict";
    (n.ArrayExt = void 0),
      (function (d) {
        function g(A, P, _, p) {
          _ === void 0 && (_ = 0), p === void 0 && (p = -1);
          var v = A.length;
          if (v === 0) return -1;
          _ < 0 ? (_ = Math.max(0, _ + v)) : (_ = Math.min(_, v - 1)),
            p < 0 ? (p = Math.max(0, p + v)) : (p = Math.min(p, v - 1));
          var N;
          p < _ ? (N = p + 1 + (v - _)) : (N = p - _ + 1);
          for (var j = 0; j < N; ++j) {
            var Q = (_ + j) % v;
            if (A[Q] === P) return Q;
          }
          return -1;
        }
        d.firstIndexOf = g;
        function D(A, P, _, p) {
          _ === void 0 && (_ = -1), p === void 0 && (p = 0);
          var v = A.length;
          if (v === 0) return -1;
          _ < 0 ? (_ = Math.max(0, _ + v)) : (_ = Math.min(_, v - 1)),
            p < 0 ? (p = Math.max(0, p + v)) : (p = Math.min(p, v - 1));
          var N;
          _ < p ? (N = _ + 1 + (v - p)) : (N = _ - p + 1);
          for (var j = 0; j < N; ++j) {
            var Q = (_ - j + v) % v;
            if (A[Q] === P) return Q;
          }
          return -1;
        }
        d.lastIndexOf = D;
        function x(A, P, _, p) {
          _ === void 0 && (_ = 0), p === void 0 && (p = -1);
          var v = A.length;
          if (v === 0) return -1;
          _ < 0 ? (_ = Math.max(0, _ + v)) : (_ = Math.min(_, v - 1)),
            p < 0 ? (p = Math.max(0, p + v)) : (p = Math.min(p, v - 1));
          var N;
          p < _ ? (N = p + 1 + (v - _)) : (N = p - _ + 1);
          for (var j = 0; j < N; ++j) {
            var Q = (_ + j) % v;
            if (P(A[Q], Q)) return Q;
          }
          return -1;
        }
        d.findFirstIndex = x;
        function U(A, P, _, p) {
          _ === void 0 && (_ = -1), p === void 0 && (p = 0);
          var v = A.length;
          if (v === 0) return -1;
          _ < 0 ? (_ = Math.max(0, _ + v)) : (_ = Math.min(_, v - 1)),
            p < 0 ? (p = Math.max(0, p + v)) : (p = Math.min(p, v - 1));
          var N;
          _ < p ? (N = _ + 1 + (v - p)) : (N = _ - p + 1);
          for (var j = 0; j < N; ++j) {
            var Q = (_ - j + v) % v;
            if (P(A[Q], Q)) return Q;
          }
          return -1;
        }
        d.findLastIndex = U;
        function le(A, P, _, p) {
          _ === void 0 && (_ = 0), p === void 0 && (p = -1);
          var v = x(A, P, _, p);
          return v !== -1 ? A[v] : void 0;
        }
        d.findFirstValue = le;
        function G(A, P, _, p) {
          _ === void 0 && (_ = -1), p === void 0 && (p = 0);
          var v = U(A, P, _, p);
          return v !== -1 ? A[v] : void 0;
        }
        d.findLastValue = G;
        function $(A, P, _, p, v) {
          p === void 0 && (p = 0), v === void 0 && (v = -1);
          var N = A.length;
          if (N === 0) return 0;
          p < 0 ? (p = Math.max(0, p + N)) : (p = Math.min(p, N - 1)),
            v < 0 ? (v = Math.max(0, v + N)) : (v = Math.min(v, N - 1));
          for (var j = p, Q = v - p + 1; Q > 0; ) {
            var Re = Q >> 1,
              It = j + Re;
            _(A[It], P) < 0 ? ((j = It + 1), (Q -= Re + 1)) : (Q = Re);
          }
          return j;
        }
        d.lowerBound = $;
        function ee(A, P, _, p, v) {
          p === void 0 && (p = 0), v === void 0 && (v = -1);
          var N = A.length;
          if (N === 0) return 0;
          p < 0 ? (p = Math.max(0, p + N)) : (p = Math.min(p, N - 1)),
            v < 0 ? (v = Math.max(0, v + N)) : (v = Math.min(v, N - 1));
          for (var j = p, Q = v - p + 1; Q > 0; ) {
            var Re = Q >> 1,
              It = j + Re;
            _(A[It], P) > 0 ? (Q = Re) : ((j = It + 1), (Q -= Re + 1));
          }
          return j;
        }
        d.upperBound = ee;
        function te(A, P, _) {
          if (A === P) return !0;
          if (A.length !== P.length) return !1;
          for (var p = 0, v = A.length; p < v; ++p)
            if (_ ? !_(A[p], P[p]) : A[p] !== P[p]) return !1;
          return !0;
        }
        d.shallowEqual = te;
        function oe(A, P) {
          P === void 0 && (P = {});
          var _ = P.start,
            p = P.stop,
            v = P.step;
          if ((v === void 0 && (v = 1), v === 0))
            throw new Error("Slice `step` cannot be zero.");
          var N = A.length;
          _ === void 0
            ? (_ = v < 0 ? N - 1 : 0)
            : _ < 0
              ? (_ = Math.max(_ + N, v < 0 ? -1 : 0))
              : _ >= N && (_ = v < 0 ? N - 1 : N),
            p === void 0
              ? (p = v < 0 ? -1 : N)
              : p < 0
                ? (p = Math.max(p + N, v < 0 ? -1 : 0))
                : p >= N && (p = v < 0 ? N - 1 : N);
          var j;
          (v < 0 && p >= _) || (v > 0 && _ >= p)
            ? (j = 0)
            : v < 0
              ? (j = Math.floor((p - _ + 1) / v + 1))
              : (j = Math.floor((p - _ - 1) / v + 1));
          for (var Q = [], Re = 0; Re < j; ++Re) Q[Re] = A[_ + Re * v];
          return Q;
        }
        d.slice = oe;
        function se(A, P, _) {
          var p = A.length;
          if (
            !(p <= 1) &&
            (P < 0 ? (P = Math.max(0, P + p)) : (P = Math.min(P, p - 1)),
            _ < 0 ? (_ = Math.max(0, _ + p)) : (_ = Math.min(_, p - 1)),
            P !== _)
          ) {
            for (var v = A[P], N = P < _ ? 1 : -1, j = P; j !== _; j += N)
              A[j] = A[j + N];
            A[_] = v;
          }
        }
        d.move = se;
        function pe(A, P, _) {
          P === void 0 && (P = 0), _ === void 0 && (_ = -1);
          var p = A.length;
          if (!(p <= 1))
            for (
              P < 0 ? (P = Math.max(0, P + p)) : (P = Math.min(P, p - 1)),
                _ < 0 ? (_ = Math.max(0, _ + p)) : (_ = Math.min(_, p - 1));
              P < _;

            ) {
              var v = A[P],
                N = A[_];
              (A[P++] = N), (A[_--] = v);
            }
        }
        d.reverse = pe;
        function Me(A, P, _, p) {
          _ === void 0 && (_ = 0), p === void 0 && (p = -1);
          var v = A.length;
          if (
            !(v <= 1) &&
            (_ < 0 ? (_ = Math.max(0, _ + v)) : (_ = Math.min(_, v - 1)),
            p < 0 ? (p = Math.max(0, p + v)) : (p = Math.min(p, v - 1)),
            !(_ >= p))
          ) {
            var N = p - _ + 1;
            if (
              (P > 0 ? (P = P % N) : P < 0 && (P = ((P % N) + N) % N), P !== 0)
            ) {
              var j = _ + P;
              pe(A, _, j - 1), pe(A, j, p), pe(A, _, p);
            }
          }
        }
        d.rotate = Me;
        function Oe(A, P, _, p) {
          _ === void 0 && (_ = 0), p === void 0 && (p = -1);
          var v = A.length;
          if (v !== 0) {
            _ < 0 ? (_ = Math.max(0, _ + v)) : (_ = Math.min(_, v - 1)),
              p < 0 ? (p = Math.max(0, p + v)) : (p = Math.min(p, v - 1));
            var N;
            p < _ ? (N = p + 1 + (v - _)) : (N = p - _ + 1);
            for (var j = 0; j < N; ++j) A[(_ + j) % v] = P;
          }
        }
        d.fill = Oe;
        function Rs(A, P, _) {
          var p = A.length;
          P < 0 ? (P = Math.max(0, P + p)) : (P = Math.min(P, p));
          for (var v = p; v > P; --v) A[v] = A[v - 1];
          A[P] = _;
        }
        d.insert = Rs;
        function wt(A, P) {
          var _ = A.length;
          if ((P < 0 && (P += _), !(P < 0 || P >= _))) {
            for (var p = A[P], v = P + 1; v < _; ++v) A[v - 1] = A[v];
            return (A.length = _ - 1), p;
          }
        }
        d.removeAt = wt;
        function As(A, P, _, p) {
          _ === void 0 && (_ = 0), p === void 0 && (p = -1);
          var v = g(A, P, _, p);
          return v !== -1 && wt(A, v), v;
        }
        d.removeFirstOf = As;
        function Ds(A, P, _, p) {
          _ === void 0 && (_ = -1), p === void 0 && (p = 0);
          var v = D(A, P, _, p);
          return v !== -1 && wt(A, v), v;
        }
        d.removeLastOf = Ds;
        function Ps(A, P, _, p) {
          _ === void 0 && (_ = 0), p === void 0 && (p = -1);
          var v = A.length;
          if (v === 0) return 0;
          _ < 0 ? (_ = Math.max(0, _ + v)) : (_ = Math.min(_, v - 1)),
            p < 0 ? (p = Math.max(0, p + v)) : (p = Math.min(p, v - 1));
          for (var N = 0, j = 0; j < v; ++j)
            (_ <= p && j >= _ && j <= p && A[j] === P) ||
            (p < _ && (j <= p || j >= _) && A[j] === P)
              ? N++
              : N > 0 && (A[j - N] = A[j]);
          return N > 0 && (A.length = v - N), N;
        }
        d.removeAllOf = Ps;
        function Ms(A, P, _, p) {
          _ === void 0 && (_ = 0), p === void 0 && (p = -1);
          var v,
            N = x(A, P, _, p);
          return N !== -1 && (v = wt(A, N)), { index: N, value: v };
        }
        d.removeFirstWhere = Ms;
        function Ts(A, P, _, p) {
          _ === void 0 && (_ = -1), p === void 0 && (p = 0);
          var v,
            N = U(A, P, _, p);
          return N !== -1 && (v = wt(A, N)), { index: N, value: v };
        }
        d.removeLastWhere = Ts;
        function Os(A, P, _, p) {
          _ === void 0 && (_ = 0), p === void 0 && (p = -1);
          var v = A.length;
          if (v === 0) return 0;
          _ < 0 ? (_ = Math.max(0, _ + v)) : (_ = Math.min(_, v - 1)),
            p < 0 ? (p = Math.max(0, p + v)) : (p = Math.min(p, v - 1));
          for (var N = 0, j = 0; j < v; ++j)
            (_ <= p && j >= _ && j <= p && P(A[j], j)) ||
            (p < _ && (j <= p || j >= _) && P(A[j], j))
              ? N++
              : N > 0 && (A[j - N] = A[j]);
          return N > 0 && (A.length = v - N), N;
        }
        d.removeAllWhere = Os;
      })(n.ArrayExt || (n.ArrayExt = {}));
    function e(d) {
      var g;
      return typeof d.iter == "function" ? (g = d.iter()) : (g = new c(d)), g;
    }
    function t(d) {
      return new C(d);
    }
    function r(d) {
      return new M(d);
    }
    function i(d) {
      return new S(d);
    }
    function s(d) {
      return new w(d);
    }
    function o(d, g) {
      for (var D = 0, x = e(d), U; (U = x.next()) !== void 0; )
        if (g(U, D++) === !1) return;
    }
    function a(d, g) {
      for (var D = 0, x = e(d), U; (U = x.next()) !== void 0; )
        if (!g(U, D++)) return !1;
      return !0;
    }
    function l(d, g) {
      for (var D = 0, x = e(d), U; (U = x.next()) !== void 0; )
        if (g(U, D++)) return !0;
      return !1;
    }
    function u(d) {
      for (var g = 0, D = [], x = e(d), U; (U = x.next()) !== void 0; )
        D[g++] = U;
      return D;
    }
    function f(d) {
      for (var g = e(d), D, x = {}; (D = g.next()) !== void 0; ) x[D[0]] = D[1];
      return x;
    }
    var c = (function () {
        function d(g) {
          (this._index = 0), (this._source = g);
        }
        return (
          (d.prototype.iter = function () {
            return this;
          }),
          (d.prototype.clone = function () {
            var g = new d(this._source);
            return (g._index = this._index), g;
          }),
          (d.prototype.next = function () {
            if (!(this._index >= this._source.length))
              return this._source[this._index++];
          }),
          d
        );
      })(),
      C = (function () {
        function d(g, D) {
          D === void 0 && (D = Object.keys(g)),
            (this._index = 0),
            (this._source = g),
            (this._keys = D);
        }
        return (
          (d.prototype.iter = function () {
            return this;
          }),
          (d.prototype.clone = function () {
            var g = new d(this._source, this._keys);
            return (g._index = this._index), g;
          }),
          (d.prototype.next = function () {
            if (!(this._index >= this._keys.length)) {
              var g = this._keys[this._index++];
              return g in this._source ? g : this.next();
            }
          }),
          d
        );
      })(),
      M = (function () {
        function d(g, D) {
          D === void 0 && (D = Object.keys(g)),
            (this._index = 0),
            (this._source = g),
            (this._keys = D);
        }
        return (
          (d.prototype.iter = function () {
            return this;
          }),
          (d.prototype.clone = function () {
            var g = new d(this._source, this._keys);
            return (g._index = this._index), g;
          }),
          (d.prototype.next = function () {
            if (!(this._index >= this._keys.length)) {
              var g = this._keys[this._index++];
              return g in this._source ? this._source[g] : this.next();
            }
          }),
          d
        );
      })(),
      S = (function () {
        function d(g, D) {
          D === void 0 && (D = Object.keys(g)),
            (this._index = 0),
            (this._source = g),
            (this._keys = D);
        }
        return (
          (d.prototype.iter = function () {
            return this;
          }),
          (d.prototype.clone = function () {
            var g = new d(this._source, this._keys);
            return (g._index = this._index), g;
          }),
          (d.prototype.next = function () {
            if (!(this._index >= this._keys.length)) {
              var g = this._keys[this._index++];
              return g in this._source ? [g, this._source[g]] : this.next();
            }
          }),
          d
        );
      })(),
      w = (function () {
        function d(g) {
          this._fn = g;
        }
        return (
          (d.prototype.iter = function () {
            return this;
          }),
          (d.prototype.clone = function () {
            throw new Error("An `FnIterator` cannot be cloned.");
          }),
          (d.prototype.next = function () {
            return this._fn.call(void 0);
          }),
          d
        );
      })();
    function E() {
      for (var d = [], g = 0; g < arguments.length; g++) d[g] = arguments[g];
      return new m(e(d.map(e)));
    }
    var m = (function () {
      function d(g) {
        (this._cloned = !1), (this._source = g), (this._active = void 0);
      }
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          var g = new d(this._source.clone());
          return (
            (g._active = this._active && this._active.clone()),
            (g._cloned = !0),
            (this._cloned = !0),
            g
          );
        }),
        (d.prototype.next = function () {
          if (this._active === void 0) {
            var g = this._source.next();
            if (g === void 0) return;
            this._active = this._cloned ? g.clone() : g;
          }
          var D = this._active.next();
          return D !== void 0 ? D : ((this._active = void 0), this.next());
        }),
        d
      );
    })();
    function b() {
      return new y();
    }
    var y = (function () {
      function d() {}
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          return new d();
        }),
        (d.prototype.next = function () {}),
        d
      );
    })();
    function L(d, g) {
      return g === void 0 && (g = 0), new q(e(d), g);
    }
    var q = (function () {
      function d(g, D) {
        (this._source = g), (this._index = D);
      }
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          return new d(this._source.clone(), this._index);
        }),
        (d.prototype.next = function () {
          var g = this._source.next();
          if (g !== void 0) return [this._index++, g];
        }),
        d
      );
    })();
    function F(d, g) {
      return new R(e(d), g);
    }
    var R = (function () {
      function d(g, D) {
        (this._index = 0), (this._source = g), (this._fn = D);
      }
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          var g = new d(this._source.clone(), this._fn);
          return (g._index = this._index), g;
        }),
        (d.prototype.next = function () {
          for (
            var g = this._fn, D = this._source, x;
            (x = D.next()) !== void 0;

          )
            if (g(x, this._index++)) return x;
        }),
        d
      );
    })();
    function O(d, g) {
      for (var D = 0, x = e(d), U; (U = x.next()) !== void 0; )
        if (g(U, D++)) return U;
    }
    function W(d, g) {
      for (var D = 0, x = e(d), U; (U = x.next()) !== void 0; )
        if (g(U, D++)) return D - 1;
      return -1;
    }
    function J(d, g) {
      var D = e(d),
        x = D.next();
      if (x !== void 0) {
        for (var U = x; (x = D.next()) !== void 0; ) g(x, U) < 0 && (U = x);
        return U;
      }
    }
    function Se(d, g) {
      var D = e(d),
        x = D.next();
      if (x !== void 0) {
        for (var U = x; (x = D.next()) !== void 0; ) g(x, U) > 0 && (U = x);
        return U;
      }
    }
    function ut(d, g) {
      var D = e(d),
        x = D.next();
      if (x !== void 0) {
        for (var U = x, le = x; (x = D.next()) !== void 0; )
          g(x, U) < 0 ? (U = x) : g(x, le) > 0 && (le = x);
        return [U, le];
      }
    }
    function _s(d, g) {
      return new Dr(e(d), g);
    }
    var Dr = (function () {
      function d(g, D) {
        (this._index = 0), (this._source = g), (this._fn = D);
      }
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          var g = new d(this._source.clone(), this._fn);
          return (g._index = this._index), g;
        }),
        (d.prototype.next = function () {
          var g = this._source.next();
          if (g !== void 0) return this._fn.call(void 0, g, this._index++);
        }),
        d
      );
    })();
    function ms(d, g, D) {
      return g === void 0
        ? new Vt(0, d, 1)
        : D === void 0
          ? new Vt(d, g, 1)
          : new Vt(d, g, D);
    }
    var Vt = (function () {
        function d(g, D, x) {
          (this._index = 0),
            (this._start = g),
            (this._stop = D),
            (this._step = x),
            (this._length = _n.rangeLength(g, D, x));
        }
        return (
          (d.prototype.iter = function () {
            return this;
          }),
          (d.prototype.clone = function () {
            var g = new d(this._start, this._stop, this._step);
            return (g._index = this._index), g;
          }),
          (d.prototype.next = function () {
            if (!(this._index >= this._length))
              return this._start + this._step * this._index++;
          }),
          d
        );
      })(),
      _n;
    (function (d) {
      function g(D, x, U) {
        return U === 0
          ? 1 / 0
          : (D > x && U > 0) || (D < x && U < 0)
            ? 0
            : Math.ceil((x - D) / U);
      }
      d.rangeLength = g;
    })(_n || (_n = {}));
    function vs(d, g, D) {
      var x = 0,
        U = e(d),
        le = U.next();
      if (le === void 0 && D === void 0)
        throw new TypeError("Reduce of empty iterable with no initial value.");
      if (le === void 0) return D;
      var G = U.next();
      if (G === void 0 && D === void 0) return le;
      if (G === void 0) return g(D, le, x++);
      var $;
      D === void 0 ? ($ = g(le, G, x++)) : ($ = g(g(D, le, x++), G, x++));
      for (var ee; (ee = U.next()) !== void 0; ) $ = g($, ee, x++);
      return $;
    }
    function ys(d, g) {
      return new mn(d, g);
    }
    function Es(d) {
      return new mn(d, 1);
    }
    var mn = (function () {
      function d(g, D) {
        (this._value = g), (this._count = D);
      }
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          return new d(this._value, this._count);
        }),
        (d.prototype.next = function () {
          if (!(this._count <= 0)) return this._count--, this._value;
        }),
        d
      );
    })();
    function bs(d) {
      var g;
      return (
        typeof d.retro == "function" ? (g = d.retro()) : (g = new Pr(d)), g
      );
    }
    var Pr = (function () {
      function d(g) {
        (this._source = g), (this._index = g.length - 1);
      }
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          var g = new d(this._source);
          return (g._index = this._index), g;
        }),
        (d.prototype.next = function () {
          if (!(this._index < 0 || this._index >= this._source.length))
            return this._source[this._index--];
        }),
        d
      );
    })();
    function Ss(d) {
      var g = [],
        D = new Set(),
        x = new Map();
      return (
        o(d, U),
        x.forEach(function (G, $) {
          le($);
        }),
        g
      );
      function U(G) {
        var $ = G[0],
          ee = G[1],
          te = x.get(ee);
        te ? te.push($) : x.set(ee, [$]);
      }
      function le(G) {
        if (!D.has(G)) {
          D.add(G);
          var $ = x.get(G);
          $ && $.forEach(le), g.push(G);
        }
      }
    }
    function ws(d, g) {
      return new Mr(e(d), g);
    }
    var Mr = (function () {
      function d(g, D) {
        (this._source = g), (this._step = D);
      }
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          return new d(this._source.clone(), this._step);
        }),
        (d.prototype.next = function () {
          for (var g = this._source.next(), D = this._step - 1; D > 0; --D)
            this._source.next();
          return g;
        }),
        d
      );
    })();
    (n.StringExt = void 0),
      (function (d) {
        function g(G, $, ee) {
          ee === void 0 && (ee = 0);
          for (
            var te = new Array($.length), oe = 0, se = ee, pe = $.length;
            oe < pe;
            ++oe, ++se
          ) {
            if (((se = G.indexOf($[oe], se)), se === -1)) return null;
            te[oe] = se;
          }
          return te;
        }
        d.findIndices = g;
        function D(G, $, ee) {
          ee === void 0 && (ee = 0);
          var te = g(G, $, ee);
          if (!te) return null;
          for (var oe = 0, se = 0, pe = te.length; se < pe; ++se) {
            var Me = te[se] - ee;
            oe += Me * Me;
          }
          return { score: oe, indices: te };
        }
        d.matchSumOfSquares = D;
        function x(G, $, ee) {
          ee === void 0 && (ee = 0);
          var te = g(G, $, ee);
          if (!te) return null;
          for (var oe = 0, se = ee - 1, pe = 0, Me = te.length; pe < Me; ++pe) {
            var Oe = te[pe];
            (oe += Oe - se - 1), (se = Oe);
          }
          return { score: oe, indices: te };
        }
        d.matchSumOfDeltas = x;
        function U(G, $, ee) {
          for (var te = [], oe = 0, se = 0, pe = $.length; oe < pe; ) {
            for (var Me = $[oe], Oe = $[oe]; ++oe < pe && $[oe] === Oe + 1; )
              Oe++;
            se < Me && te.push(G.slice(se, Me)),
              Me < Oe + 1 && te.push(ee(G.slice(Me, Oe + 1))),
              (se = Oe + 1);
          }
          return se < G.length && te.push(G.slice(se)), te;
        }
        d.highlight = U;
        function le(G, $) {
          return G < $ ? -1 : G > $ ? 1 : 0;
        }
        d.cmp = le;
      })(n.StringExt || (n.StringExt = {}));
    function Is(d, g) {
      return new Tr(e(d), g);
    }
    var Tr = (function () {
      function d(g, D) {
        (this._source = g), (this._count = D);
      }
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          return new d(this._source.clone(), this._count);
        }),
        (d.prototype.next = function () {
          if (!(this._count <= 0)) {
            var g = this._source.next();
            if (g !== void 0) return this._count--, g;
          }
        }),
        d
      );
    })();
    function Cs() {
      for (var d = [], g = 0; g < arguments.length; g++) d[g] = arguments[g];
      return new Or(d.map(e));
    }
    var Or = (function () {
      function d(g) {
        this._source = g;
      }
      return (
        (d.prototype.iter = function () {
          return this;
        }),
        (d.prototype.clone = function () {
          return new d(
            this._source.map(function (g) {
              return g.clone();
            })
          );
        }),
        (d.prototype.next = function () {
          for (
            var g = new Array(this._source.length),
              D = 0,
              x = this._source.length;
            D < x;
            ++D
          ) {
            var U = this._source[D].next();
            if (U === void 0) return;
            g[D] = U;
          }
          return g;
        }),
        d
      );
    })();
    (n.ArrayIterator = c),
      (n.ChainIterator = m),
      (n.EmptyIterator = y),
      (n.EnumerateIterator = q),
      (n.FilterIterator = R),
      (n.FnIterator = w),
      (n.ItemIterator = S),
      (n.KeyIterator = C),
      (n.MapIterator = Dr),
      (n.RangeIterator = Vt),
      (n.RepeatIterator = mn),
      (n.RetroArrayIterator = Pr),
      (n.StrideIterator = Mr),
      (n.TakeIterator = Tr),
      (n.ValueIterator = M),
      (n.ZipIterator = Or),
      (n.chain = E),
      (n.each = o),
      (n.empty = b),
      (n.enumerate = L),
      (n.every = a),
      (n.filter = F),
      (n.find = O),
      (n.findIndex = W),
      (n.iter = e),
      (n.iterFn = s),
      (n.iterItems = i),
      (n.iterKeys = t),
      (n.iterValues = r),
      (n.map = _s),
      (n.max = Se),
      (n.min = J),
      (n.minmax = ut),
      (n.once = Es),
      (n.range = ms),
      (n.reduce = vs),
      (n.repeat = ys),
      (n.retro = bs),
      (n.some = l),
      (n.stride = ws),
      (n.take = Is),
      (n.toArray = u),
      (n.toObject = f),
      (n.topologicSort = Ss),
      (n.zip = Cs),
      Object.defineProperty(n, "__esModule", { value: !0 });
  });
});
var xr = k((bn, qs) => {
  h();
  (function (n, e) {
    typeof bn == "object" && typeof qs != "undefined"
      ? e(bn)
      : typeof define == "function" && define.amd
        ? define(["exports"], e)
        : ((n = typeof globalThis != "undefined" ? globalThis : n || self),
          e((n.lumino_properties = {})));
  })(bn, function (n) {
    "use strict";
    (n.AttachedProperty = (function () {
      function t(r) {
        (this._pid = e.nextPID()),
          (this.name = r.name),
          (this._create = r.create),
          (this._coerce = r.coerce || null),
          (this._compare = r.compare || null),
          (this._changed = r.changed || null);
      }
      return (
        (t.prototype.get = function (r) {
          var i,
            s = e.ensureMap(r);
          return (
            this._pid in s
              ? (i = s[this._pid])
              : (i = s[this._pid] = this._createValue(r)),
            i
          );
        }),
        (t.prototype.set = function (r, i) {
          var s,
            o = e.ensureMap(r);
          this._pid in o
            ? (s = o[this._pid])
            : (s = o[this._pid] = this._createValue(r));
          var a = this._coerceValue(r, i);
          this._maybeNotify(r, s, (o[this._pid] = a));
        }),
        (t.prototype.coerce = function (r) {
          var i,
            s = e.ensureMap(r);
          this._pid in s
            ? (i = s[this._pid])
            : (i = s[this._pid] = this._createValue(r));
          var o = this._coerceValue(r, i);
          this._maybeNotify(r, i, (s[this._pid] = o));
        }),
        (t.prototype._createValue = function (r) {
          var i = this._create;
          return i(r);
        }),
        (t.prototype._coerceValue = function (r, i) {
          var s = this._coerce;
          return s ? s(r, i) : i;
        }),
        (t.prototype._compareValue = function (r, i) {
          var s = this._compare;
          return s ? s(r, i) : r === i;
        }),
        (t.prototype._maybeNotify = function (r, i, s) {
          var o = this._changed;
          o && !this._compareValue(i, s) && o(r, i, s);
        }),
        t
      );
    })()),
      (function (t) {
        function r(i) {
          e.ownerData.delete(i);
        }
        t.clearData = r;
      })(n.AttachedProperty || (n.AttachedProperty = {}));
    var e;
    (function (t) {
      (t.ownerData = new WeakMap()),
        (t.nextPID = (function () {
          var i = 0;
          return function () {
            var s = Math.random(),
              o = ("" + s).slice(2);
            return "pid-" + o + "-" + i++;
          };
        })());
      function r(i) {
        var s = t.ownerData.get(i);
        return s || ((s = Object.create(null)), t.ownerData.set(i, s), s);
      }
      t.ensureMap = r;
    })(e || (e = {})),
      Object.defineProperty(n, "__esModule", { value: !0 });
  });
});
var ce = k((Sn, Vs) => {
  h();
  (function (n, e) {
    typeof Sn == "object" && typeof Vs != "undefined"
      ? e(Sn, ct(), xr())
      : typeof define == "function" && define.amd
        ? define(["exports", "@lumino/algorithm", "@lumino/properties"], e)
        : ((n = typeof globalThis != "undefined" ? globalThis : n || self),
          e(
            (n.lumino_signaling = {}),
            n.lumino_algorithm,
            n.lumino_properties
          ));
  })(Sn, function (n, e, t) {
    "use strict";
    (n.Signal = (function () {
      function i(s) {
        (this._blockedCount = 0), (this.sender = s);
      }
      return (
        (i.prototype.block = function (s) {
          this._blockedCount++;
          try {
            s();
          } finally {
            this._blockedCount--;
          }
        }),
        (i.prototype.connect = function (s, o) {
          return r.connect(this, s, o);
        }),
        (i.prototype.disconnect = function (s, o) {
          return r.disconnect(this, s, o);
        }),
        (i.prototype.emit = function (s) {
          this._blockedCount || r.emit(this, s);
        }),
        i
      );
    })()),
      (function (i) {
        function s(M, S) {
          var w = r.blockedProperty;
          w.set(M, w.get(M) + 1);
          try {
            S();
          } finally {
            w.set(M, w.get(M) - 1);
          }
        }
        i.blockAll = s;
        function o(M, S) {
          r.disconnectBetween(M, S);
        }
        i.disconnectBetween = o;
        function a(M) {
          r.disconnectSender(M);
        }
        i.disconnectSender = a;
        function l(M) {
          r.disconnectReceiver(M);
        }
        i.disconnectReceiver = l;
        function u(M) {
          r.disconnectAll(M);
        }
        i.disconnectAll = u;
        function f(M) {
          r.disconnectAll(M);
        }
        i.clearData = f;
        function c() {
          return r.exceptionHandler;
        }
        i.getExceptionHandler = c;
        function C(M) {
          var S = r.exceptionHandler;
          return (r.exceptionHandler = M), S;
        }
        i.setExceptionHandler = C;
      })(n.Signal || (n.Signal = {}));
    var r;
    (function (i) {
      i.exceptionHandler = function (F) {
        console.error(F);
      };
      function s(F, R, O) {
        O = O || void 0;
        var W = C.get(F.sender);
        if ((W || ((W = []), C.set(F.sender, W)), E(W, F, R, O))) return !1;
        var J = O || R,
          Se = M.get(J);
        Se || ((Se = []), M.set(J, Se));
        var ut = { signal: F, slot: R, thisArg: O };
        return W.push(ut), Se.push(ut), !0;
      }
      i.connect = s;
      function o(F, R, O) {
        O = O || void 0;
        var W = C.get(F.sender);
        if (!W || W.length === 0) return !1;
        var J = E(W, F, R, O);
        if (!J) return !1;
        var Se = O || R,
          ut = M.get(Se);
        return (J.signal = null), b(W), b(ut), !0;
      }
      i.disconnect = o;
      function a(F, R) {
        var O = C.get(F);
        if (!(!O || O.length === 0)) {
          var W = M.get(R);
          !W ||
            W.length === 0 ||
            (e.each(W, function (J) {
              J.signal && J.signal.sender === F && (J.signal = null);
            }),
            b(O),
            b(W));
        }
      }
      i.disconnectBetween = a;
      function l(F) {
        var R = C.get(F);
        !R ||
          R.length === 0 ||
          (e.each(R, function (O) {
            if (O.signal) {
              var W = O.thisArg || O.slot;
              (O.signal = null), b(M.get(W));
            }
          }),
          b(R));
      }
      i.disconnectSender = l;
      function u(F) {
        var R = M.get(F);
        !R ||
          R.length === 0 ||
          (e.each(R, function (O) {
            if (O.signal) {
              var W = O.signal.sender;
              (O.signal = null), b(C.get(W));
            }
          }),
          b(R));
      }
      i.disconnectReceiver = u;
      function f(F) {
        l(F), u(F);
      }
      i.disconnectAll = f;
      function c(F, R) {
        if (!(i.blockedProperty.get(F.sender) > 0)) {
          var O = C.get(F.sender);
          if (!(!O || O.length === 0))
            for (var W = 0, J = O.length; W < J; ++W) {
              var Se = O[W];
              Se.signal === F && m(Se, R);
            }
        }
      }
      i.emit = c;
      var C = new WeakMap(),
        M = new WeakMap(),
        S = new Set(),
        w = (function () {
          var F = typeof requestAnimationFrame == "function";
          return F ? requestAnimationFrame : setImmediate;
        })();
      function E(F, R, O, W) {
        return e.find(F, function (J) {
          return J.signal === R && J.slot === O && J.thisArg === W;
        });
      }
      function m(F, R) {
        var O = F.signal,
          W = F.slot,
          J = F.thisArg;
        try {
          W.call(J, O.sender, R);
        } catch (Se) {
          i.exceptionHandler(Se);
        }
      }
      function b(F) {
        S.size === 0 && w(y), S.add(F);
      }
      function y() {
        S.forEach(L), S.clear();
      }
      function L(F) {
        e.ArrayExt.removeAllWhere(F, q);
      }
      function q(F) {
        return F.signal === null;
      }
      i.blockedProperty = new t.AttachedProperty({
        name: "blocked",
        create: function () {
          return 0;
        },
      });
    })(r || (r = {})),
      Object.defineProperty(n, "__esModule", { value: !0 });
  });
});
var Hs = k((wn) => {
  "use strict";
  h();
  Object.defineProperty(wn, "__esModule", { value: !0 });
  wn.ActivityMonitor = void 0;
  var Bs = ce(),
    jr = class {
      constructor(e) {
        (this._timer = -1),
          (this._timeout = -1),
          (this._isDisposed = !1),
          (this._activityStopped = new Bs.Signal(this)),
          e.signal.connect(this._onSignalFired, this),
          (this._timeout = e.timeout || 1e3);
      }
      get activityStopped() {
        return this._activityStopped;
      }
      get timeout() {
        return this._timeout;
      }
      set timeout(e) {
        this._timeout = e;
      }
      get isDisposed() {
        return this._isDisposed;
      }
      dispose() {
        this._isDisposed ||
          ((this._isDisposed = !0), Bs.Signal.clearData(this));
      }
      _onSignalFired(e, t) {
        clearTimeout(this._timer),
          (this._sender = e),
          (this._args = t),
          (this._timer = setTimeout(() => {
            this._activityStopped.emit({
              sender: this._sender,
              args: this._args,
            });
          }, this._timeout));
      }
    };
  wn.ActivityMonitor = jr;
});
var Js = k(($s) => {
  "use strict";
  h();
  Object.defineProperty($s, "__esModule", { value: !0 });
});
var Gs = k(($t) => {
  "use strict";
  h();
  Object.defineProperty($t, "__esModule", { value: !0 });
  $t.MarkdownCodeBlocks = void 0;
  var Fl;
  (function (n) {
    n.CODE_BLOCK_MARKER = "```";
    let e = [
      ".markdown",
      ".mdown",
      ".mkdn",
      ".md",
      ".mkd",
      ".mdwn",
      ".mdtxt",
      ".mdtext",
      ".text",
      ".txt",
      ".Rmd",
    ];
    class t {
      constructor(o) {
        (this.startLine = o), (this.code = ""), (this.endLine = -1);
      }
    }
    n.MarkdownCodeBlock = t;
    function r(s) {
      return e.indexOf(s) > -1;
    }
    n.isMarkdown = r;
    function i(s) {
      if (!s || s === "") return [];
      let o = s.split(`
`),
        a = [],
        l = null;
      for (let u = 0; u < o.length; u++) {
        let f = o[u],
          c = f.indexOf(n.CODE_BLOCK_MARKER) === 0,
          C = l != null;
        if (!(!c && !C))
          if (C)
            l &&
              (c
                ? ((l.endLine = u - 1), a.push(l), (l = null))
                : (l.code +=
                    f +
                    `
`));
          else {
            l = new t(u);
            let M = f.indexOf(n.CODE_BLOCK_MARKER),
              S = f.lastIndexOf(n.CODE_BLOCK_MARKER);
            M !== S &&
              ((l.code = f.substring(M + n.CODE_BLOCK_MARKER.length, S)),
              (l.endLine = u),
              a.push(l),
              (l = null));
          }
      }
      return a;
    }
    n.findMarkdownCodeBlocks = i;
  })((Fl = $t.MarkdownCodeBlocks || ($t.MarkdownCodeBlocks = {})));
});
var Ne = k((In, zs) => {
  h();
  (function (n, e) {
    typeof In == "object" && typeof zs != "undefined"
      ? e(In)
      : typeof define == "function" && define.amd
        ? define(["exports"], e)
        : ((n = typeof globalThis != "undefined" ? globalThis : n || self),
          e((n.lumino_coreutils = {})));
  })(In, function (n) {
    "use strict";
    (n.JSONExt = void 0),
      (function (o) {
        (o.emptyObject = Object.freeze({})), (o.emptyArray = Object.freeze([]));
        function a(E) {
          return (
            E === null ||
            typeof E == "boolean" ||
            typeof E == "number" ||
            typeof E == "string"
          );
        }
        o.isPrimitive = a;
        function l(E) {
          return Array.isArray(E);
        }
        o.isArray = l;
        function u(E) {
          return !a(E) && !l(E);
        }
        o.isObject = u;
        function f(E, m) {
          if (E === m) return !0;
          if (a(E) || a(m)) return !1;
          var b = l(E),
            y = l(m);
          return b !== y ? !1 : b && y ? C(E, m) : M(E, m);
        }
        o.deepEqual = f;
        function c(E) {
          return a(E) ? E : l(E) ? S(E) : w(E);
        }
        o.deepCopy = c;
        function C(E, m) {
          if (E === m) return !0;
          if (E.length !== m.length) return !1;
          for (var b = 0, y = E.length; b < y; ++b)
            if (!f(E[b], m[b])) return !1;
          return !0;
        }
        function M(E, m) {
          if (E === m) return !0;
          for (var b in E) if (E[b] !== void 0 && !(b in m)) return !1;
          for (var b in m) if (m[b] !== void 0 && !(b in E)) return !1;
          for (var b in E) {
            var y = E[b],
              L = m[b];
            if (
              !(y === void 0 && L === void 0) &&
              (y === void 0 || L === void 0 || !f(y, L))
            )
              return !1;
          }
          return !0;
        }
        function S(E) {
          for (var m = new Array(E.length), b = 0, y = E.length; b < y; ++b)
            m[b] = c(E[b]);
          return m;
        }
        function w(E) {
          var m = {};
          for (var b in E) {
            var y = E[b];
            y !== void 0 && (m[b] = c(y));
          }
          return m;
        }
      })(n.JSONExt || (n.JSONExt = {}));
    var e = (function () {
        function o() {
          (this._types = []), (this._values = []);
        }
        return (
          (o.prototype.types = function () {
            return this._types.slice();
          }),
          (o.prototype.hasData = function (a) {
            return this._types.indexOf(a) !== -1;
          }),
          (o.prototype.getData = function (a) {
            var l = this._types.indexOf(a);
            return l !== -1 ? this._values[l] : void 0;
          }),
          (o.prototype.setData = function (a, l) {
            this.clearData(a), this._types.push(a), this._values.push(l);
          }),
          (o.prototype.clearData = function (a) {
            var l = this._types.indexOf(a);
            l !== -1 && (this._types.splice(l, 1), this._values.splice(l, 1));
          }),
          (o.prototype.clear = function () {
            (this._types.length = 0), (this._values.length = 0);
          }),
          o
        );
      })(),
      t = (function () {
        function o() {
          var a = this;
          this.promise = new Promise(function (l, u) {
            (a._resolve = l), (a._reject = u);
          });
        }
        return (
          (o.prototype.resolve = function (a) {
            var l = this._resolve;
            l(a);
          }),
          (o.prototype.reject = function (a) {
            var l = this._reject;
            l(a);
          }),
          o
        );
      })(),
      r = (function () {
        function o(a) {
          (this.name = a), (this._tokenStructuralPropertyT = null);
        }
        return o;
      })();
    function i(o) {
      for (var a = 0, l = 0, u = o.length; l < u; ++l)
        l % 4 === 0 && (a = (Math.random() * 4294967295) >>> 0),
          (o[l] = a & 255),
          (a >>>= 8);
    }
    (n.Random = void 0),
      (function (o) {
        o.getRandomValues = (function () {
          var a =
            (typeof window != "undefined" &&
              (window.crypto || window.msCrypto)) ||
            null;
          return a && typeof a.getRandomValues == "function"
            ? function (u) {
                return a.getRandomValues(u);
              }
            : i;
        })();
      })(n.Random || (n.Random = {}));
    function s(o) {
      for (var a = new Uint8Array(16), l = new Array(256), u = 0; u < 16; ++u)
        l[u] = "0" + u.toString(16);
      for (var u = 16; u < 256; ++u) l[u] = u.toString(16);
      return function () {
        return (
          o(a),
          (a[6] = 64 | (a[6] & 15)),
          (a[8] = 128 | (a[8] & 63)),
          l[a[0]] +
            l[a[1]] +
            l[a[2]] +
            l[a[3]] +
            "-" +
            l[a[4]] +
            l[a[5]] +
            "-" +
            l[a[6]] +
            l[a[7]] +
            "-" +
            l[a[8]] +
            l[a[9]] +
            "-" +
            l[a[10]] +
            l[a[11]] +
            l[a[12]] +
            l[a[13]] +
            l[a[14]] +
            l[a[15]]
        );
      };
    }
    (n.UUID = void 0),
      (function (o) {
        o.uuid4 = s(n.Random.getRandomValues);
      })(n.UUID || (n.UUID = {})),
      (n.MimeData = e),
      (n.PromiseDelegate = t),
      (n.Token = r),
      Object.defineProperty(n, "__esModule", { value: !0 });
  });
});
var Zs = k((Pf, Qs) => {
  "use strict";
  h();
  function Ul(n, e) {
    var t = n;
    e.slice(0, -1).forEach(function (i) {
      t = t[i] || {};
    });
    var r = e[e.length - 1];
    return r in t;
  }
  function Ys(n) {
    return typeof n == "number" || /^0x[0-9a-f]+$/i.test(n)
      ? !0
      : /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(n);
  }
  function Xs(n, e) {
    return (
      (e === "constructor" && typeof n[e] == "function") || e === "__proto__"
    );
  }
  Qs.exports = function (n, e) {
    e || (e = {});
    var t = { bools: {}, strings: {}, unknownFn: null };
    typeof e.unknown == "function" && (t.unknownFn = e.unknown),
      typeof e.boolean == "boolean" && e.boolean
        ? (t.allBools = !0)
        : []
            .concat(e.boolean)
            .filter(Boolean)
            .forEach(function (L) {
              t.bools[L] = !0;
            });
    var r = {};
    function i(L) {
      return r[L].some(function (q) {
        return t.bools[q];
      });
    }
    Object.keys(e.alias || {}).forEach(function (L) {
      (r[L] = [].concat(e.alias[L])),
        r[L].forEach(function (q) {
          r[q] = [L].concat(
            r[L].filter(function (F) {
              return q !== F;
            })
          );
        });
    }),
      []
        .concat(e.string)
        .filter(Boolean)
        .forEach(function (L) {
          (t.strings[L] = !0),
            r[L] &&
              [].concat(r[L]).forEach(function (q) {
                t.strings[q] = !0;
              });
        });
    var s = e.default || {},
      o = { _: [] };
    function a(L, q) {
      return (
        (t.allBools && /^--[^=]+$/.test(q)) ||
        t.strings[L] ||
        t.bools[L] ||
        r[L]
      );
    }
    function l(L, q, F) {
      for (var R = L, O = 0; O < q.length - 1; O++) {
        var W = q[O];
        if (Xs(R, W)) return;
        R[W] === void 0 && (R[W] = {}),
          (R[W] === Object.prototype ||
            R[W] === Number.prototype ||
            R[W] === String.prototype) &&
            (R[W] = {}),
          R[W] === Array.prototype && (R[W] = []),
          (R = R[W]);
      }
      var J = q[q.length - 1];
      Xs(R, J) ||
        ((R === Object.prototype ||
          R === Number.prototype ||
          R === String.prototype) &&
          (R = {}),
        R === Array.prototype && (R = []),
        R[J] === void 0 || t.bools[J] || typeof R[J] == "boolean"
          ? (R[J] = F)
          : Array.isArray(R[J])
            ? R[J].push(F)
            : (R[J] = [R[J], F]));
    }
    function u(L, q, F) {
      if (!(F && t.unknownFn && !a(L, F) && t.unknownFn(F) === !1)) {
        var R = !t.strings[L] && Ys(q) ? Number(q) : q;
        l(o, L.split("."), R),
          (r[L] || []).forEach(function (O) {
            l(o, O.split("."), R);
          });
      }
    }
    Object.keys(t.bools).forEach(function (L) {
      u(L, s[L] === void 0 ? !1 : s[L]);
    });
    var f = [];
    n.indexOf("--") !== -1 &&
      ((f = n.slice(n.indexOf("--") + 1)), (n = n.slice(0, n.indexOf("--"))));
    for (var c = 0; c < n.length; c++) {
      var C = n[c],
        M,
        S;
      if (/^--.+=/.test(C)) {
        var w = C.match(/^--([^=]+)=([\s\S]*)$/);
        M = w[1];
        var E = w[2];
        t.bools[M] && (E = E !== "false"), u(M, E, C);
      } else if (/^--no-.+/.test(C))
        (M = C.match(/^--no-(.+)/)[1]), u(M, !1, C);
      else if (/^--.+/.test(C))
        (M = C.match(/^--(.+)/)[1]),
          (S = n[c + 1]),
          S !== void 0 &&
          !/^(-|--)[^-]/.test(S) &&
          !t.bools[M] &&
          !t.allBools &&
          (!r[M] || !i(M))
            ? (u(M, S, C), (c += 1))
            : /^(true|false)$/.test(S)
              ? (u(M, S === "true", C), (c += 1))
              : u(M, t.strings[M] ? "" : !0, C);
      else if (/^-[^-]+/.test(C)) {
        for (
          var m = C.slice(1, -1).split(""), b = !1, y = 0;
          y < m.length;
          y++
        ) {
          if (((S = C.slice(y + 2)), S === "-")) {
            u(m[y], S, C);
            continue;
          }
          if (/[A-Za-z]/.test(m[y]) && S[0] === "=") {
            u(m[y], S.slice(1), C), (b = !0);
            break;
          }
          if (/[A-Za-z]/.test(m[y]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(S)) {
            u(m[y], S, C), (b = !0);
            break;
          }
          if (m[y + 1] && m[y + 1].match(/\W/)) {
            u(m[y], C.slice(y + 2), C), (b = !0);
            break;
          } else u(m[y], t.strings[m[y]] ? "" : !0, C);
        }
        (M = C.slice(-1)[0]),
          !b &&
            M !== "-" &&
            (n[c + 1] &&
            !/^(-|--)[^-]/.test(n[c + 1]) &&
            !t.bools[M] &&
            (!r[M] || !i(M))
              ? (u(M, n[c + 1], C), (c += 1))
              : n[c + 1] && /^(true|false)$/.test(n[c + 1])
                ? (u(M, n[c + 1] === "true", C), (c += 1))
                : u(M, t.strings[M] ? "" : !0, C));
      } else if (
        ((!t.unknownFn || t.unknownFn(C) !== !1) &&
          o._.push(t.strings._ || !Ys(C) ? C : Number(C)),
        e.stopEarly)
      ) {
        o._.push.apply(o._, n.slice(c + 1));
        break;
      }
    }
    return (
      Object.keys(s).forEach(function (L) {
        Ul(o, L.split(".")) ||
          (l(o, L.split("."), s[L]),
          (r[L] || []).forEach(function (q) {
            l(o, q.split("."), s[L]);
          }));
      }),
      e["--"]
        ? (o["--"] = f.slice())
        : f.forEach(function (L) {
            o._.push(L);
          }),
      o
    );
  };
});
var Cn = k((Tf, to) => {
  "use strict";
  h();
  function We(n) {
    if (typeof n != "string")
      throw new TypeError(
        "Path must be a string. Received " + JSON.stringify(n)
      );
  }
  function eo(n, e) {
    for (var t = "", r = 0, i = -1, s = 0, o, a = 0; a <= n.length; ++a) {
      if (a < n.length) o = n.charCodeAt(a);
      else {
        if (o === 47) break;
        o = 47;
      }
      if (o === 47) {
        if (!(i === a - 1 || s === 1))
          if (i !== a - 1 && s === 2) {
            if (
              t.length < 2 ||
              r !== 2 ||
              t.charCodeAt(t.length - 1) !== 46 ||
              t.charCodeAt(t.length - 2) !== 46
            ) {
              if (t.length > 2) {
                var l = t.lastIndexOf("/");
                if (l !== t.length - 1) {
                  l === -1
                    ? ((t = ""), (r = 0))
                    : ((t = t.slice(0, l)),
                      (r = t.length - 1 - t.lastIndexOf("/"))),
                    (i = a),
                    (s = 0);
                  continue;
                }
              } else if (t.length === 2 || t.length === 1) {
                (t = ""), (r = 0), (i = a), (s = 0);
                continue;
              }
            }
            e && (t.length > 0 ? (t += "/..") : (t = ".."), (r = 2));
          } else
            t.length > 0
              ? (t += "/" + n.slice(i + 1, a))
              : (t = n.slice(i + 1, a)),
              (r = a - i - 1);
        (i = a), (s = 0);
      } else o === 46 && s !== -1 ? ++s : (s = -1);
    }
    return t;
  }
  function Wl(n, e) {
    var t = e.dir || e.root,
      r = e.base || (e.name || "") + (e.ext || "");
    return t ? (t === e.root ? t + r : t + n + r) : r;
  }
  var Rt = {
    resolve: function () {
      for (
        var e = "", t = !1, r, i = arguments.length - 1;
        i >= -1 && !t;
        i--
      ) {
        var s;
        i >= 0
          ? (s = arguments[i])
          : (r === void 0 && (r = process.cwd()), (s = r)),
          We(s),
          s.length !== 0 && ((e = s + "/" + e), (t = s.charCodeAt(0) === 47));
      }
      return (
        (e = eo(e, !t)),
        t ? (e.length > 0 ? "/" + e : "/") : e.length > 0 ? e : "."
      );
    },
    normalize: function (e) {
      if ((We(e), e.length === 0)) return ".";
      var t = e.charCodeAt(0) === 47,
        r = e.charCodeAt(e.length - 1) === 47;
      return (
        (e = eo(e, !t)),
        e.length === 0 && !t && (e = "."),
        e.length > 0 && r && (e += "/"),
        t ? "/" + e : e
      );
    },
    isAbsolute: function (e) {
      return We(e), e.length > 0 && e.charCodeAt(0) === 47;
    },
    join: function () {
      if (arguments.length === 0) return ".";
      for (var e, t = 0; t < arguments.length; ++t) {
        var r = arguments[t];
        We(r), r.length > 0 && (e === void 0 ? (e = r) : (e += "/" + r));
      }
      return e === void 0 ? "." : Rt.normalize(e);
    },
    relative: function (e, t) {
      if (
        (We(e),
        We(t),
        e === t || ((e = Rt.resolve(e)), (t = Rt.resolve(t)), e === t))
      )
        return "";
      for (var r = 1; r < e.length && e.charCodeAt(r) === 47; ++r);
      for (
        var i = e.length, s = i - r, o = 1;
        o < t.length && t.charCodeAt(o) === 47;
        ++o
      );
      for (
        var a = t.length, l = a - o, u = s < l ? s : l, f = -1, c = 0;
        c <= u;
        ++c
      ) {
        if (c === u) {
          if (l > u) {
            if (t.charCodeAt(o + c) === 47) return t.slice(o + c + 1);
            if (c === 0) return t.slice(o + c);
          } else
            s > u &&
              (e.charCodeAt(r + c) === 47 ? (f = c) : c === 0 && (f = 0));
          break;
        }
        var C = e.charCodeAt(r + c),
          M = t.charCodeAt(o + c);
        if (C !== M) break;
        C === 47 && (f = c);
      }
      var S = "";
      for (c = r + f + 1; c <= i; ++c)
        (c === i || e.charCodeAt(c) === 47) &&
          (S.length === 0 ? (S += "..") : (S += "/.."));
      return S.length > 0
        ? S + t.slice(o + f)
        : ((o += f), t.charCodeAt(o) === 47 && ++o, t.slice(o));
    },
    _makeLong: function (e) {
      return e;
    },
    dirname: function (e) {
      if ((We(e), e.length === 0)) return ".";
      for (
        var t = e.charCodeAt(0), r = t === 47, i = -1, s = !0, o = e.length - 1;
        o >= 1;
        --o
      )
        if (((t = e.charCodeAt(o)), t === 47)) {
          if (!s) {
            i = o;
            break;
          }
        } else s = !1;
      return i === -1 ? (r ? "/" : ".") : r && i === 1 ? "//" : e.slice(0, i);
    },
    basename: function (e, t) {
      if (t !== void 0 && typeof t != "string")
        throw new TypeError('"ext" argument must be a string');
      We(e);
      var r = 0,
        i = -1,
        s = !0,
        o;
      if (t !== void 0 && t.length > 0 && t.length <= e.length) {
        if (t.length === e.length && t === e) return "";
        var a = t.length - 1,
          l = -1;
        for (o = e.length - 1; o >= 0; --o) {
          var u = e.charCodeAt(o);
          if (u === 47) {
            if (!s) {
              r = o + 1;
              break;
            }
          } else
            l === -1 && ((s = !1), (l = o + 1)),
              a >= 0 &&
                (u === t.charCodeAt(a)
                  ? --a === -1 && (i = o)
                  : ((a = -1), (i = l)));
        }
        return r === i ? (i = l) : i === -1 && (i = e.length), e.slice(r, i);
      } else {
        for (o = e.length - 1; o >= 0; --o)
          if (e.charCodeAt(o) === 47) {
            if (!s) {
              r = o + 1;
              break;
            }
          } else i === -1 && ((s = !1), (i = o + 1));
        return i === -1 ? "" : e.slice(r, i);
      }
    },
    extname: function (e) {
      We(e);
      for (
        var t = -1, r = 0, i = -1, s = !0, o = 0, a = e.length - 1;
        a >= 0;
        --a
      ) {
        var l = e.charCodeAt(a);
        if (l === 47) {
          if (!s) {
            r = a + 1;
            break;
          }
          continue;
        }
        i === -1 && ((s = !1), (i = a + 1)),
          l === 46
            ? t === -1
              ? (t = a)
              : o !== 1 && (o = 1)
            : t !== -1 && (o = -1);
      }
      return t === -1 ||
        i === -1 ||
        o === 0 ||
        (o === 1 && t === i - 1 && t === r + 1)
        ? ""
        : e.slice(t, i);
    },
    format: function (e) {
      if (e === null || typeof e != "object")
        throw new TypeError(
          'The "pathObject" argument must be of type Object. Received type ' +
            typeof e
        );
      return Wl("/", e);
    },
    parse: function (e) {
      We(e);
      var t = { root: "", dir: "", base: "", ext: "", name: "" };
      if (e.length === 0) return t;
      var r = e.charCodeAt(0),
        i = r === 47,
        s;
      i ? ((t.root = "/"), (s = 1)) : (s = 0);
      for (
        var o = -1, a = 0, l = -1, u = !0, f = e.length - 1, c = 0;
        f >= s;
        --f
      ) {
        if (((r = e.charCodeAt(f)), r === 47)) {
          if (!u) {
            a = f + 1;
            break;
          }
          continue;
        }
        l === -1 && ((u = !1), (l = f + 1)),
          r === 46
            ? o === -1
              ? (o = f)
              : c !== 1 && (c = 1)
            : o !== -1 && (c = -1);
      }
      return (
        o === -1 ||
        l === -1 ||
        c === 0 ||
        (c === 1 && o === l - 1 && o === a + 1)
          ? l !== -1 &&
            (a === 0 && i
              ? (t.base = t.name = e.slice(1, l))
              : (t.base = t.name = e.slice(a, l)))
          : (a === 0 && i
              ? ((t.name = e.slice(1, o)), (t.base = e.slice(1, l)))
              : ((t.name = e.slice(a, o)), (t.base = e.slice(a, l))),
            (t.ext = e.slice(o, l))),
        a > 0 ? (t.dir = e.slice(0, a - 1)) : i && (t.dir = "/"),
        t
      );
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null,
  };
  Rt.posix = Rt;
  to.exports = Rt;
});
var ro = k((Nf, no) => {
  "use strict";
  h();
  no.exports = function (e, t) {
    if (((t = t.split(":")[0]), (e = +e), !e)) return !1;
    switch (t) {
      case "http":
      case "ws":
        return e !== 80;
      case "https":
      case "wss":
        return e !== 443;
      case "ftp":
        return e !== 21;
      case "gopher":
        return e !== 70;
      case "file":
        return !1;
    }
    return e !== 0;
  };
});
var oo = k((Fr) => {
  "use strict";
  h();
  var Kl = Object.prototype.hasOwnProperty,
    ql;
  function io(n) {
    try {
      return decodeURIComponent(n.replace(/\+/g, " "));
    } catch (e) {
      return null;
    }
  }
  function so(n) {
    try {
      return encodeURIComponent(n);
    } catch (e) {
      return null;
    }
  }
  function Vl(n) {
    for (var e = /([^=?#&]+)=?([^&]*)/g, t = {}, r; (r = e.exec(n)); ) {
      var i = io(r[1]),
        s = io(r[2]);
      i === null || s === null || i in t || (t[i] = s);
    }
    return t;
  }
  function Bl(n, e) {
    e = e || "";
    var t = [],
      r,
      i;
    typeof e != "string" && (e = "?");
    for (i in n)
      if (Kl.call(n, i)) {
        if (
          ((r = n[i]),
          !r && (r === null || r === ql || isNaN(r)) && (r = ""),
          (i = so(i)),
          (r = so(r)),
          i === null || r === null)
        )
          continue;
        t.push(i + "=" + r);
      }
    return t.length ? e + t.join("&") : "";
  }
  Fr.stringify = Bl;
  Fr.parse = Vl;
});
var go = k((jf, po) => {
  "use strict";
  h();
  var lo = ro(),
    Rn = oo(),
    Hl =
      /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,
    uo = /[\n\r\t]/g,
    $l = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
    co = /:\d+$/,
    Jl = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,
    Gl = /^[a-zA-Z]:/;
  function Wr(n) {
    return (n || "").toString().replace(Hl, "");
  }
  var Ur = [
      ["#", "hash"],
      ["?", "query"],
      function (e, t) {
        return Ke(t.protocol) ? e.replace(/\\/g, "/") : e;
      },
      ["/", "pathname"],
      ["@", "auth", 1],
      [NaN, "host", void 0, 1, 1],
      [/:(\d*)$/, "port", void 0, 1],
      [NaN, "hostname", void 0, 1, 1],
    ],
    ao = { hash: 1, query: 1 };
  function ho(n) {
    var e;
    typeof window != "undefined"
      ? (e = window)
      : typeof this != "undefined"
        ? (e = this)
        : typeof self != "undefined"
          ? (e = self)
          : (e = {});
    var t = e.location || {};
    n = n || t;
    var r = {},
      i = typeof n,
      s;
    if (n.protocol === "blob:") r = new qe(unescape(n.pathname), {});
    else if (i === "string") {
      r = new qe(n, {});
      for (s in ao) delete r[s];
    } else if (i === "object") {
      for (s in n) s in ao || (r[s] = n[s]);
      r.slashes === void 0 && (r.slashes = $l.test(n.href));
    }
    return r;
  }
  function Ke(n) {
    return (
      n === "file:" ||
      n === "ftp:" ||
      n === "http:" ||
      n === "https:" ||
      n === "ws:" ||
      n === "wss:"
    );
  }
  function fo(n, e) {
    (n = Wr(n)), (n = n.replace(uo, "")), (e = e || {});
    var t = Jl.exec(n),
      r = t[1] ? t[1].toLowerCase() : "",
      i = !!t[2],
      s = !!t[3],
      o = 0,
      a;
    return (
      i
        ? s
          ? ((a = t[2] + t[3] + t[4]), (o = t[2].length + t[3].length))
          : ((a = t[2] + t[4]), (o = t[2].length))
        : s
          ? ((a = t[3] + t[4]), (o = t[3].length))
          : (a = t[4]),
      r === "file:"
        ? o >= 2 && (a = a.slice(2))
        : Ke(r)
          ? (a = t[4])
          : r
            ? i && (a = a.slice(2))
            : o >= 2 && Ke(e.protocol) && (a = t[4]),
      { protocol: r, slashes: i || Ke(r), slashesCount: o, rest: a }
    );
  }
  function zl(n, e) {
    if (n === "") return e;
    for (
      var t = (e || "/").split("/").slice(0, -1).concat(n.split("/")),
        r = t.length,
        i = t[r - 1],
        s = !1,
        o = 0;
      r--;

    )
      t[r] === "."
        ? t.splice(r, 1)
        : t[r] === ".."
          ? (t.splice(r, 1), o++)
          : o && (r === 0 && (s = !0), t.splice(r, 1), o--);
    return (
      s && t.unshift(""), (i === "." || i === "..") && t.push(""), t.join("/")
    );
  }
  function qe(n, e, t) {
    if (((n = Wr(n)), (n = n.replace(uo, "")), !(this instanceof qe)))
      return new qe(n, e, t);
    var r,
      i,
      s,
      o,
      a,
      l,
      u = Ur.slice(),
      f = typeof e,
      c = this,
      C = 0;
    for (
      f !== "object" && f !== "string" && ((t = e), (e = null)),
        t && typeof t != "function" && (t = Rn.parse),
        e = ho(e),
        i = fo(n || "", e),
        r = !i.protocol && !i.slashes,
        c.slashes = i.slashes || (r && e.slashes),
        c.protocol = i.protocol || e.protocol || "",
        n = i.rest,
        ((i.protocol === "file:" && (i.slashesCount !== 2 || Gl.test(n))) ||
          (!i.slashes &&
            (i.protocol || i.slashesCount < 2 || !Ke(c.protocol)))) &&
          (u[3] = [/(.*)/, "pathname"]);
      C < u.length;
      C++
    ) {
      if (((o = u[C]), typeof o == "function")) {
        n = o(n, c);
        continue;
      }
      (s = o[0]),
        (l = o[1]),
        s !== s
          ? (c[l] = n)
          : typeof s == "string"
            ? ((a = s === "@" ? n.lastIndexOf(s) : n.indexOf(s)),
              ~a &&
                (typeof o[2] == "number"
                  ? ((c[l] = n.slice(0, a)), (n = n.slice(a + o[2])))
                  : ((c[l] = n.slice(a)), (n = n.slice(0, a)))))
            : (a = s.exec(n)) && ((c[l] = a[1]), (n = n.slice(0, a.index))),
        (c[l] = c[l] || (r && o[3] && e[l]) || ""),
        o[4] && (c[l] = c[l].toLowerCase());
    }
    t && (c.query = t(c.query)),
      r &&
        e.slashes &&
        c.pathname.charAt(0) !== "/" &&
        (c.pathname !== "" || e.pathname !== "") &&
        (c.pathname = zl(c.pathname, e.pathname)),
      c.pathname.charAt(0) !== "/" &&
        Ke(c.protocol) &&
        (c.pathname = "/" + c.pathname),
      lo(c.port, c.protocol) || ((c.host = c.hostname), (c.port = "")),
      (c.username = c.password = ""),
      c.auth &&
        ((a = c.auth.indexOf(":")),
        ~a
          ? ((c.username = c.auth.slice(0, a)),
            (c.username = encodeURIComponent(decodeURIComponent(c.username))),
            (c.password = c.auth.slice(a + 1)),
            (c.password = encodeURIComponent(decodeURIComponent(c.password))))
          : (c.username = encodeURIComponent(decodeURIComponent(c.auth))),
        (c.auth = c.password ? c.username + ":" + c.password : c.username)),
      (c.origin =
        c.protocol !== "file:" && Ke(c.protocol) && c.host
          ? c.protocol + "//" + c.host
          : "null"),
      (c.href = c.toString());
  }
  function Yl(n, e, t) {
    var r = this;
    switch (n) {
      case "query":
        typeof e == "string" && e.length && (e = (t || Rn.parse)(e)),
          (r[n] = e);
        break;
      case "port":
        (r[n] = e),
          lo(e, r.protocol)
            ? e && (r.host = r.hostname + ":" + e)
            : ((r.host = r.hostname), (r[n] = ""));
        break;
      case "hostname":
        (r[n] = e), r.port && (e += ":" + r.port), (r.host = e);
        break;
      case "host":
        (r[n] = e),
          co.test(e)
            ? ((e = e.split(":")),
              (r.port = e.pop()),
              (r.hostname = e.join(":")))
            : ((r.hostname = e), (r.port = ""));
        break;
      case "protocol":
        (r.protocol = e.toLowerCase()), (r.slashes = !t);
        break;
      case "pathname":
      case "hash":
        if (e) {
          var i = n === "pathname" ? "/" : "#";
          r[n] = e.charAt(0) !== i ? i + e : e;
        } else r[n] = e;
        break;
      case "username":
      case "password":
        r[n] = encodeURIComponent(e);
        break;
      case "auth":
        var s = e.indexOf(":");
        ~s
          ? ((r.username = e.slice(0, s)),
            (r.username = encodeURIComponent(decodeURIComponent(r.username))),
            (r.password = e.slice(s + 1)),
            (r.password = encodeURIComponent(decodeURIComponent(r.password))))
          : (r.username = encodeURIComponent(decodeURIComponent(e)));
    }
    for (var o = 0; o < Ur.length; o++) {
      var a = Ur[o];
      a[4] && (r[a[1]] = r[a[1]].toLowerCase());
    }
    return (
      (r.auth = r.password ? r.username + ":" + r.password : r.username),
      (r.origin =
        r.protocol !== "file:" && Ke(r.protocol) && r.host
          ? r.protocol + "//" + r.host
          : "null"),
      (r.href = r.toString()),
      r
    );
  }
  function Xl(n) {
    (!n || typeof n != "function") && (n = Rn.stringify);
    var e,
      t = this,
      r = t.host,
      i = t.protocol;
    i && i.charAt(i.length - 1) !== ":" && (i += ":");
    var s = i + ((t.protocol && t.slashes) || Ke(t.protocol) ? "//" : "");
    return (
      t.username
        ? ((s += t.username), t.password && (s += ":" + t.password), (s += "@"))
        : t.password
          ? ((s += ":" + t.password), (s += "@"))
          : t.protocol !== "file:" &&
            Ke(t.protocol) &&
            !r &&
            t.pathname !== "/" &&
            (s += "@"),
      (r[r.length - 1] === ":" || (co.test(t.hostname) && !t.port)) &&
        (r += ":"),
      (s += r + t.pathname),
      (e = typeof t.query == "object" ? n(t.query) : t.query),
      e && (s += e.charAt(0) !== "?" ? "?" + e : e),
      t.hash && (s += t.hash),
      s
    );
  }
  qe.prototype = { set: Yl, toString: Xl };
  qe.extractProtocol = fo;
  qe.location = ho;
  qe.trimLeft = Wr;
  qe.qs = Rn;
  po.exports = qe;
});
var qr = k((dt) => {
  "use strict";
  h();
  var Ql =
    (dt && dt.__importDefault) ||
    function (n) {
      return n && n.__esModule ? n : { default: n };
    };
  Object.defineProperty(dt, "__esModule", { value: !0 });
  dt.URLExt = void 0;
  var Zl = Cn(),
    Kr = Ql(go()),
    eu;
  (function (n) {
    function e(u) {
      if (typeof document != "undefined" && document) {
        let f = document.createElement("a");
        return (f.href = u), f;
      }
      return Kr.default(u);
    }
    n.parse = e;
    function t(u) {
      return Kr.default(u).hostname;
    }
    n.getHostName = t;
    function r(u) {
      return u && e(u).toString();
    }
    n.normalize = r;
    function i(...u) {
      let f = Kr.default(u[0], {}),
        c = `${f.protocol}${f.slashes ? "//" : ""}${f.auth}${f.auth ? "@" : ""}${f.host}`,
        C = Zl.posix.join(
          `${c && f.pathname[0] !== "/" ? "/" : ""}${f.pathname}`,
          ...u.slice(1)
        );
      return `${c}${C === "." ? "" : C}`;
    }
    n.join = i;
    function s(u) {
      return i(...u.split("/").map(encodeURIComponent));
    }
    n.encodeParts = s;
    function o(u) {
      let f = Object.keys(u).filter((c) => c.length > 0);
      return f.length
        ? "?" +
            f
              .map((c) => {
                let C = encodeURIComponent(String(u[c]));
                return c + (C ? "=" + C : "");
              })
              .join("&")
        : "";
    }
    n.objectToQueryString = o;
    function a(u) {
      return u
        .replace(/^\?/, "")
        .split("&")
        .reduce((f, c) => {
          let [C, M] = c.split("=");
          return C.length > 0 && (f[C] = decodeURIComponent(M || "")), f;
        }, {});
    }
    n.queryStringToObject = a;
    function l(u) {
      let { protocol: f } = e(u);
      return (!f || u.toLowerCase().indexOf(f) !== 0) && u.indexOf("/") !== 0;
    }
    n.isLocal = l;
  })((eu = dt.URLExt || (dt.URLExt = {})));
});
var _o = k((exports, module) => {
  "use strict";
  h();
  var __importDefault =
    (exports && exports.__importDefault) ||
    function (n) {
      return n && n.__esModule ? n : { default: n };
    };
  Object.defineProperty(exports, "__esModule", { value: !0 });
  exports.PageConfig = void 0;
  var coreutils_1 = Ne(),
    minimist_1 = __importDefault(Zs()),
    url_1 = qr(),
    PageConfig;
  (function (PageConfig) {
    function getOption(name) {
      if (configData) return configData[name] || getBodyData(name);
      configData = Object.create(null);
      let found = !1;
      if (typeof document != "undefined" && document) {
        let n = document.getElementById("jupyter-config-data");
        n && ((configData = JSON.parse(n.textContent || "")), (found = !0));
      }
      if (!found && typeof process != "undefined" && process.argv)
        try {
          let cli = minimist_1.default(process.argv.slice(2)),
            path = Cn(),
            fullPath = "";
          "jupyter-config-data" in cli
            ? (fullPath = path.resolve(cli["jupyter-config-data"]))
            : "JUPYTER_CONFIG_DATA" in process.env &&
              (fullPath = path.resolve(process.env.JUPYTER_CONFIG_DATA)),
            fullPath && (configData = eval("require")(fullPath));
        } catch (n) {
          console.error(n);
        }
      if (!coreutils_1.JSONExt.isObject(configData))
        configData = Object.create(null);
      else
        for (let n in configData)
          typeof configData[n] != "string" &&
            (configData[n] = JSON.stringify(configData[n]));
      return configData[name] || getBodyData(name);
    }
    PageConfig.getOption = getOption;
    function setOption(n, e) {
      let t = getOption(n);
      return (configData[n] = e), t;
    }
    PageConfig.setOption = setOption;
    function getBaseUrl() {
      return url_1.URLExt.normalize(getOption("baseUrl") || "/");
    }
    PageConfig.getBaseUrl = getBaseUrl;
    function getTreeUrl() {
      return url_1.URLExt.join(getBaseUrl(), getOption("treeUrl"));
    }
    PageConfig.getTreeUrl = getTreeUrl;
    function getShareUrl() {
      return url_1.URLExt.normalize(getOption("shareUrl") || getBaseUrl());
    }
    PageConfig.getShareUrl = getShareUrl;
    function getTreeShareUrl() {
      return url_1.URLExt.normalize(
        url_1.URLExt.join(getShareUrl(), getOption("treeUrl"))
      );
    }
    PageConfig.getTreeShareUrl = getTreeShareUrl;
    function getUrl(n) {
      var e, t, r;
      let i = getOption("baseUrl") || "/",
        s = (e = n.mode) !== null && e !== void 0 ? e : getOption("mode"),
        o =
          (t = n.workspace) !== null && t !== void 0
            ? t
            : getOption("workspace"),
        a = s === "multiple-document" ? "lab" : "doc";
      (i = url_1.URLExt.join(i, a)),
        o !== PageConfig.defaultWorkspace &&
          (i = url_1.URLExt.join(
            i,
            "workspaces",
            encodeURIComponent(getOption("workspace"))
          ));
      let l =
        (r = n.treePath) !== null && r !== void 0 ? r : getOption("treePath");
      return (
        l && (i = url_1.URLExt.join(i, "tree", url_1.URLExt.encodeParts(l))), i
      );
    }
    (PageConfig.getUrl = getUrl), (PageConfig.defaultWorkspace = "default");
    function getWsUrl(n) {
      let e = getOption("wsUrl");
      if (!e) {
        if (
          ((n = n ? url_1.URLExt.normalize(n) : getBaseUrl()),
          n.indexOf("http") !== 0)
        )
          return "";
        e = "ws" + n.slice(4);
      }
      return url_1.URLExt.normalize(e);
    }
    PageConfig.getWsUrl = getWsUrl;
    function getNBConvertURL({ path: n, format: e, download: t }) {
      let r = url_1.URLExt.encodeParts(n),
        i = url_1.URLExt.join(getBaseUrl(), "nbconvert", e, r);
      return t ? i + "?download=true" : i;
    }
    PageConfig.getNBConvertURL = getNBConvertURL;
    function getToken() {
      return getOption("token") || getBodyData("jupyterApiToken");
    }
    PageConfig.getToken = getToken;
    function getNotebookVersion() {
      let n = getOption("notebookVersion");
      return n === "" ? [0, 0, 0] : JSON.parse(n);
    }
    PageConfig.getNotebookVersion = getNotebookVersion;
    let configData = null;
    function getBodyData(n) {
      if (typeof document == "undefined" || !document.body) return "";
      let e = document.body.dataset[n];
      return typeof e == "undefined" ? "" : decodeURIComponent(e);
    }
    let Extension;
    (function (n) {
      function e(i) {
        try {
          let s = getOption(i);
          if (s) return JSON.parse(s);
        } catch (s) {
          console.warn(`Unable to parse ${i}.`, s);
        }
        return [];
      }
      (n.deferred = e("deferredExtensions")),
        (n.disabled = e("disabledExtensions"));
      function t(i) {
        let s = i.indexOf(":"),
          o = "";
        return (
          s !== -1 && (o = i.slice(0, s)),
          n.deferred.some((a) => a === i || (o && a === o))
        );
      }
      n.isDeferred = t;
      function r(i) {
        let s = i.indexOf(":"),
          o = "";
        return (
          s !== -1 && (o = i.slice(0, s)),
          n.disabled.some((a) => a === i || (o && a === o))
        );
      }
      n.isDisabled = r;
    })((Extension = PageConfig.Extension || (PageConfig.Extension = {})));
  })((PageConfig = exports.PageConfig || (exports.PageConfig = {})));
});
var mo = k((Jt) => {
  "use strict";
  h();
  Object.defineProperty(Jt, "__esModule", { value: !0 });
  Jt.PathExt = void 0;
  var ht = Cn(),
    tu;
  (function (n) {
    function e(...f) {
      let c = ht.posix.join(...f);
      return c === "." ? "" : u(c);
    }
    n.join = e;
    function t(f, c) {
      return ht.posix.basename(f, c);
    }
    n.basename = t;
    function r(f) {
      let c = u(ht.posix.dirname(f));
      return c === "." ? "" : c;
    }
    n.dirname = r;
    function i(f) {
      return ht.posix.extname(f);
    }
    n.extname = i;
    function s(f) {
      return f === "" ? "" : u(ht.posix.normalize(f));
    }
    n.normalize = s;
    function o(...f) {
      return u(ht.posix.resolve(...f));
    }
    n.resolve = o;
    function a(f, c) {
      return u(ht.posix.relative(f, c));
    }
    n.relative = a;
    function l(f) {
      return f.length > 0 && f.indexOf(".") !== 0 && (f = `.${f}`), f;
    }
    n.normalizeExtension = l;
    function u(f) {
      return f.indexOf("/") === 0 && (f = f.slice(1)), f;
    }
    n.removeSlash = u;
  })((tu = Jt.PathExt || (Jt.PathExt = {})));
});
var vo = k((Gt) => {
  "use strict";
  h();
  Object.defineProperty(Gt, "__esModule", { value: !0 });
  Gt.Text = void 0;
  var nu;
  (function (n) {
    let e = 2 > 1;
    function t(o, a) {
      if (e) return o;
      let l = o;
      for (let u = 0; u + 1 < a.length && u < o; u++) {
        let f = a.charCodeAt(u);
        if (f >= 55296 && f <= 56319) {
          let c = a.charCodeAt(u + 1);
          c >= 56320 && c <= 57343 && (l--, u++);
        }
      }
      return l;
    }
    n.jsIndexToCharIndex = t;
    function r(o, a) {
      if (e) return o;
      let l = o;
      for (let u = 0; u + 1 < a.length && u < l; u++) {
        let f = a.charCodeAt(u);
        if (f >= 55296 && f <= 56319) {
          let c = a.charCodeAt(u + 1);
          c >= 56320 && c <= 57343 && (l++, u++);
        }
      }
      return l;
    }
    n.charIndexToJsIndex = r;
    function i(o, a = !1) {
      return o.replace(/^(\w)|[\s-_:]+(\w)/g, function (l, u, f) {
        return f ? f.toUpperCase() : a ? u.toUpperCase() : u.toLowerCase();
      });
    }
    n.camelCase = i;
    function s(o) {
      return (o || "")
        .toLowerCase()
        .split(" ")
        .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
        .join(" ");
    }
    n.titleCase = s;
  })((nu = Gt.Text || (Gt.Text = {})));
});
var yo = {};
Ll(yo, { default: () => ru });
function ru(n) {
  return {
    formatNow: () => {
      try {
        return n.toLocaleString();
      } catch (e) {
        return `${n}`;
      }
    },
    format: () => {
      try {
        return n.toLocaleTimeString();
      } catch (e) {
        return `${n}`;
      }
    },
  };
}
var Eo = Ns(() => {
  "use strict";
  h();
});
var bo = k((ft) => {
  "use strict";
  h();
  var iu =
    (ft && ft.__importDefault) ||
    function (n) {
      return n && n.__esModule ? n : { default: n };
    };
  Object.defineProperty(ft, "__esModule", { value: !0 });
  ft.Time = void 0;
  var Vr = iu((Eo(), kl(yo))),
    su;
  (function (n) {
    function e(r) {
      Vr.default.locale(document.documentElement.lang);
      let i = Vr.default(r).fromNow();
      return (i = i === "a few seconds ago" ? "seconds ago" : i), i;
    }
    n.formatHuman = e;
    function t(r, i = "YYYY-MM-DD HH:mm") {
      return Vr.default(r).format(i);
    }
    n.format = t;
  })((su = ft.Time || (ft.Time = {})));
});
var Ie = k((we) => {
  "use strict";
  h();
  var ou =
      (we && we.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    tt =
      (we && we.__exportStar) ||
      function (n, e) {
        for (var t in n)
          t !== "default" &&
            !Object.prototype.hasOwnProperty.call(e, t) &&
            ou(e, n, t);
      };
  Object.defineProperty(we, "__esModule", { value: !0 });
  tt(Hs(), we);
  tt(Js(), we);
  tt(Gs(), we);
  tt(_o(), we);
  tt(mo(), we);
  tt(vo(), we);
  tt(bo(), we);
  tt(qr(), we);
});
var So = k((pt) => {
  "use strict";
  h();
  Object.defineProperty(pt, "__esModule", { value: !0 });
  pt.ConfigWithDefaults = pt.ConfigSection = void 0;
  var au = Ie(),
    zt = Ve(),
    lu = "api/config",
    uu;
  (function (n) {
    function e(t) {
      let r = new Br(t);
      return r.load().then(() => r);
    }
    n.create = e;
  })((uu = pt.ConfigSection || (pt.ConfigSection = {})));
  var Br = class {
      constructor(e) {
        var t;
        this._url = "unknown";
        let r = (this.serverSettings =
          (t = e.serverSettings) !== null && t !== void 0
            ? t
            : zt.ServerConnection.makeSettings());
        this._url = au.URLExt.join(r.baseUrl, lu, encodeURIComponent(e.name));
      }
      get data() {
        return this._data;
      }
      async load() {
        let e = await zt.ServerConnection.makeRequest(
          this._url,
          {},
          this.serverSettings
        );
        if (e.status !== 200)
          throw await zt.ServerConnection.ResponseError.create(e);
        this._data = await e.json();
      }
      async update(e) {
        this._data = Object.assign(Object.assign({}, this._data), e);
        let t = { method: "PATCH", body: JSON.stringify(e) },
          r = await zt.ServerConnection.makeRequest(
            this._url,
            t,
            this.serverSettings
          );
        if (r.status !== 200)
          throw await zt.ServerConnection.ResponseError.create(r);
        return (this._data = await r.json()), this._data;
      }
    },
    Hr = class {
      constructor(e) {
        var t, r;
        (this._className = ""),
          (this._section = e.section),
          (this._defaults = (t = e.defaults) !== null && t !== void 0 ? t : {}),
          (this._className =
            (r = e.className) !== null && r !== void 0 ? r : "");
      }
      get(e) {
        let t = this._classData();
        return e in t ? t[e] : this._defaults[e];
      }
      set(e, t) {
        let r = {};
        if (((r[e] = t), this._className)) {
          let i = {};
          return (i[this._className] = r), this._section.update(i);
        } else return this._section.update(r);
      }
      _classData() {
        let e = this._section.data;
        return this._className && this._className in e ? e[this._className] : e;
      }
    };
  pt.ConfigWithDefaults = Hr;
});
var Yt = k((An) => {
  "use strict";
  h();
  Object.defineProperty(An, "__esModule", { value: !0 });
  An.validateProperty = void 0;
  function cu(n, e, t, r = []) {
    if (!n.hasOwnProperty(e)) throw Error(`Missing property '${e}'`);
    let i = n[e];
    if (t !== void 0) {
      let s = !0;
      switch (t) {
        case "array":
          s = Array.isArray(i);
          break;
        case "object":
          s = typeof i != "undefined";
          break;
        default:
          s = typeof i === t;
      }
      if (!s) throw new Error(`Property '${e}' is not of type '${t}'`);
      if (r.length > 0) {
        let o = !0;
        switch (t) {
          case "string":
          case "number":
          case "boolean":
            o = r.includes(i);
            break;
          default:
            o = r.findIndex((a) => a === i) >= 0;
            break;
        }
        if (!o)
          throw new Error(
            `Property '${e}' is not one of the valid values ${JSON.stringify(r)}`
          );
      }
    }
  }
  An.validateProperty = cu;
});
var wo = k((At) => {
  "use strict";
  h();
  Object.defineProperty(At, "__esModule", { value: !0 });
  At.validateCheckpointModel = At.validateContentsModel = void 0;
  var Be = Yt();
  function du(n) {
    Be.validateProperty(n, "name", "string"),
      Be.validateProperty(n, "path", "string"),
      Be.validateProperty(n, "type", "string"),
      Be.validateProperty(n, "created", "string"),
      Be.validateProperty(n, "last_modified", "string"),
      Be.validateProperty(n, "mimetype", "object"),
      Be.validateProperty(n, "content", "object"),
      Be.validateProperty(n, "format", "object");
  }
  At.validateContentsModel = du;
  function hu(n) {
    Be.validateProperty(n, "id", "string"),
      Be.validateProperty(n, "last_modified", "string");
  }
  At.validateCheckpointModel = hu;
});
var Gr = k((_e) => {
  "use strict";
  h();
  var fu =
      (_e && _e.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    pu =
      (_e && _e.__setModuleDefault) ||
      (Object.create
        ? function (n, e) {
            Object.defineProperty(n, "default", { enumerable: !0, value: e });
          }
        : function (n, e) {
            n.default = e;
          }),
    gu =
      (_e && _e.__importStar) ||
      function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (n != null)
          for (var t in n)
            t !== "default" &&
              Object.prototype.hasOwnProperty.call(n, t) &&
              fu(e, n, t);
        return pu(e, n), e;
      };
  Object.defineProperty(_e, "__esModule", { value: !0 });
  _e.Drive = _e.ContentsManager = _e.Contents = void 0;
  var Ae = Ie(),
    _u = ct(),
    Dn = ce(),
    re = Ve(),
    Xe = gu(wo()),
    mu = "api/contents",
    vu = "files",
    yu;
  (function (n) {
    function e(r) {
      Xe.validateContentsModel(r);
    }
    n.validateContentsModel = e;
    function t(r) {
      Xe.validateCheckpointModel(r);
    }
    n.validateCheckpointModel = t;
  })((yu = _e.Contents || (_e.Contents = {})));
  var $r = class {
    constructor(e = {}) {
      var t, r;
      (this._isDisposed = !1),
        (this._additionalDrives = new Map()),
        (this._fileChanged = new Dn.Signal(this));
      let i = (this.serverSettings =
        (t = e.serverSettings) !== null && t !== void 0
          ? t
          : re.ServerConnection.makeSettings());
      (this._defaultDrive =
        (r = e.defaultDrive) !== null && r !== void 0
          ? r
          : new Pn({ serverSettings: i })),
        this._defaultDrive.fileChanged.connect(this._onFileChanged, this);
    }
    get fileChanged() {
      return this._fileChanged;
    }
    get isDisposed() {
      return this._isDisposed;
    }
    dispose() {
      this.isDisposed || ((this._isDisposed = !0), Dn.Signal.clearData(this));
    }
    addDrive(e) {
      this._additionalDrives.set(e.name, e),
        e.fileChanged.connect(this._onFileChanged, this);
    }
    getModelDBFactory(e) {
      var t;
      let [r] = this._driveForPath(e);
      return (t = r == null ? void 0 : r.modelDBFactory) !== null &&
        t !== void 0
        ? t
        : null;
    }
    localPath(e) {
      let t = e.split("/"),
        r = t[0].split(":");
      return r.length === 1 || !this._additionalDrives.has(r[0])
        ? Ae.PathExt.removeSlash(e)
        : Ae.PathExt.join(r.slice(1).join(":"), ...t.slice(1));
    }
    normalize(e) {
      let t = e.split(":");
      return t.length === 1
        ? Ae.PathExt.normalize(e)
        : `${t[0]}:${Ae.PathExt.normalize(t.slice(1).join(":"))}`;
    }
    resolvePath(e, t) {
      let r = this.driveName(e),
        i = this.localPath(e),
        s = Ae.PathExt.resolve("/", i, t);
      return r ? `${r}:${s}` : s;
    }
    driveName(e) {
      let r = e.split("/")[0].split(":");
      return r.length === 1 ? "" : this._additionalDrives.has(r[0]) ? r[0] : "";
    }
    get(e, t) {
      let [r, i] = this._driveForPath(e);
      return r.get(i, t).then((s) => {
        let o = [];
        return s.type === "directory" && s.content
          ? (_u.each(s.content, (a) => {
              o.push(
                Object.assign(Object.assign({}, a), {
                  path: this._toGlobalPath(r, a.path),
                })
              );
            }),
            Object.assign(Object.assign({}, s), {
              path: this._toGlobalPath(r, i),
              content: o,
            }))
          : Object.assign(Object.assign({}, s), {
              path: this._toGlobalPath(r, i),
            });
      });
    }
    getDownloadUrl(e) {
      let [t, r] = this._driveForPath(e);
      return t.getDownloadUrl(r);
    }
    newUntitled(e = {}) {
      if (e.path) {
        let t = this.normalize(e.path),
          [r, i] = this._driveForPath(t);
        return r
          .newUntitled(Object.assign(Object.assign({}, e), { path: i }))
          .then((s) =>
            Object.assign(Object.assign({}, s), {
              path: Ae.PathExt.join(t, s.name),
            })
          );
      } else return this._defaultDrive.newUntitled(e);
    }
    delete(e) {
      let [t, r] = this._driveForPath(e);
      return t.delete(r);
    }
    rename(e, t) {
      let [r, i] = this._driveForPath(e),
        [s, o] = this._driveForPath(t);
      if (r !== s)
        throw Error(
          "ContentsManager: renaming files must occur within a Drive"
        );
      return r
        .rename(i, o)
        .then((a) =>
          Object.assign(Object.assign({}, a), {
            path: this._toGlobalPath(r, o),
          })
        );
    }
    save(e, t = {}) {
      let r = this.normalize(e),
        [i, s] = this._driveForPath(e);
      return i
        .save(s, Object.assign(Object.assign({}, t), { path: s }))
        .then((o) => Object.assign(Object.assign({}, o), { path: r }));
    }
    copy(e, t) {
      let [r, i] = this._driveForPath(e),
        [s, o] = this._driveForPath(t);
      if (r === s)
        return r
          .copy(i, o)
          .then((a) =>
            Object.assign(Object.assign({}, a), {
              path: this._toGlobalPath(r, a.path),
            })
          );
      throw Error("Copying files between drives is not currently implemented");
    }
    createCheckpoint(e) {
      let [t, r] = this._driveForPath(e);
      return t.createCheckpoint(r);
    }
    listCheckpoints(e) {
      let [t, r] = this._driveForPath(e);
      return t.listCheckpoints(r);
    }
    restoreCheckpoint(e, t) {
      let [r, i] = this._driveForPath(e);
      return r.restoreCheckpoint(i, t);
    }
    deleteCheckpoint(e, t) {
      let [r, i] = this._driveForPath(e);
      return r.deleteCheckpoint(i, t);
    }
    _toGlobalPath(e, t) {
      return e === this._defaultDrive
        ? Ae.PathExt.removeSlash(t)
        : `${e.name}:${Ae.PathExt.removeSlash(t)}`;
    }
    _driveForPath(e) {
      let t = this.driveName(e),
        r = this.localPath(e);
      return t ? [this._additionalDrives.get(t), r] : [this._defaultDrive, r];
    }
    _onFileChanged(e, t) {
      var r, i;
      if (e === this._defaultDrive) this._fileChanged.emit(t);
      else {
        let s = null,
          o = null;
        !((r = t.newValue) === null || r === void 0) &&
          r.path &&
          (s = Object.assign(Object.assign({}, t.newValue), {
            path: this._toGlobalPath(e, t.newValue.path),
          })),
          !((i = t.oldValue) === null || i === void 0) &&
            i.path &&
            (o = Object.assign(Object.assign({}, t.oldValue), {
              path: this._toGlobalPath(e, t.oldValue.path),
            })),
          this._fileChanged.emit({ type: t.type, newValue: s, oldValue: o });
      }
    }
  };
  _e.ContentsManager = $r;
  var Pn = class {
    constructor(e = {}) {
      var t, r, i;
      (this._isDisposed = !1),
        (this._fileChanged = new Dn.Signal(this)),
        (this.name = (t = e.name) !== null && t !== void 0 ? t : "Default"),
        (this._apiEndpoint =
          (r = e.apiEndpoint) !== null && r !== void 0 ? r : mu),
        (this.serverSettings =
          (i = e.serverSettings) !== null && i !== void 0
            ? i
            : re.ServerConnection.makeSettings());
    }
    get fileChanged() {
      return this._fileChanged;
    }
    get isDisposed() {
      return this._isDisposed;
    }
    dispose() {
      this.isDisposed || ((this._isDisposed = !0), Dn.Signal.clearData(this));
    }
    async get(e, t) {
      let r = this._getUrl(e);
      if (t) {
        t.type === "notebook" && delete t.format;
        let a = t.content ? "1" : "0",
          l = Object.assign(Object.assign({}, t), { content: a });
        r += Ae.URLExt.objectToQueryString(l);
      }
      let i = this.serverSettings,
        s = await re.ServerConnection.makeRequest(r, {}, i);
      if (s.status !== 200)
        throw await re.ServerConnection.ResponseError.create(s);
      let o = await s.json();
      return Xe.validateContentsModel(o), o;
    }
    getDownloadUrl(e) {
      let t = this.serverSettings.baseUrl,
        r = Ae.URLExt.join(t, vu, Ae.URLExt.encodeParts(e)),
        i = document.cookie.match("\\b_xsrf=([^;]*)\\b");
      if (i) {
        let s = new URL(r);
        s.searchParams.append("_xsrf", i[1]), (r = s.toString());
      }
      return Promise.resolve(r);
    }
    async newUntitled(e = {}) {
      var t;
      let r = "{}";
      e &&
        (e.ext && (e.ext = Jr.normalizeExtension(e.ext)),
        (r = JSON.stringify(e)));
      let i = this.serverSettings,
        s = this._getUrl((t = e.path) !== null && t !== void 0 ? t : ""),
        o = { method: "POST", body: r },
        a = await re.ServerConnection.makeRequest(s, o, i);
      if (a.status !== 201)
        throw await re.ServerConnection.ResponseError.create(a);
      let l = await a.json();
      return (
        Xe.validateContentsModel(l),
        this._fileChanged.emit({ type: "new", oldValue: null, newValue: l }),
        l
      );
    }
    async delete(e) {
      let t = this._getUrl(e),
        r = this.serverSettings,
        i = { method: "DELETE" },
        s = await re.ServerConnection.makeRequest(t, i, r);
      if (s.status !== 204)
        throw await re.ServerConnection.ResponseError.create(s);
      this._fileChanged.emit({
        type: "delete",
        oldValue: { path: e },
        newValue: null,
      });
    }
    async rename(e, t) {
      let r = this.serverSettings,
        i = this._getUrl(e),
        s = { method: "PATCH", body: JSON.stringify({ path: t }) },
        o = await re.ServerConnection.makeRequest(i, s, r);
      if (o.status !== 200)
        throw await re.ServerConnection.ResponseError.create(o);
      let a = await o.json();
      return (
        Xe.validateContentsModel(a),
        this._fileChanged.emit({
          type: "rename",
          oldValue: { path: e },
          newValue: a,
        }),
        a
      );
    }
    async save(e, t = {}) {
      let r = this.serverSettings,
        i = this._getUrl(e),
        s = { method: "PUT", body: JSON.stringify(t) },
        o = await re.ServerConnection.makeRequest(i, s, r);
      if (o.status !== 200 && o.status !== 201)
        throw await re.ServerConnection.ResponseError.create(o);
      let a = await o.json();
      return (
        Xe.validateContentsModel(a),
        this._fileChanged.emit({ type: "save", oldValue: null, newValue: a }),
        a
      );
    }
    async copy(e, t) {
      let r = this.serverSettings,
        i = this._getUrl(t),
        s = { method: "POST", body: JSON.stringify({ copy_from: e }) },
        o = await re.ServerConnection.makeRequest(i, s, r);
      if (o.status !== 201)
        throw await re.ServerConnection.ResponseError.create(o);
      let a = await o.json();
      return (
        Xe.validateContentsModel(a),
        this._fileChanged.emit({ type: "new", oldValue: null, newValue: a }),
        a
      );
    }
    async createCheckpoint(e) {
      let t = this._getUrl(e, "checkpoints"),
        r = { method: "POST" },
        i = await re.ServerConnection.makeRequest(t, r, this.serverSettings);
      if (i.status !== 201)
        throw await re.ServerConnection.ResponseError.create(i);
      let s = await i.json();
      return Xe.validateCheckpointModel(s), s;
    }
    async listCheckpoints(e) {
      let t = this._getUrl(e, "checkpoints"),
        r = await re.ServerConnection.makeRequest(t, {}, this.serverSettings);
      if (r.status !== 200)
        throw await re.ServerConnection.ResponseError.create(r);
      let i = await r.json();
      if (!Array.isArray(i)) throw new Error("Invalid Checkpoint list");
      for (let s = 0; s < i.length; s++) Xe.validateCheckpointModel(i[s]);
      return i;
    }
    async restoreCheckpoint(e, t) {
      let r = this._getUrl(e, "checkpoints", t),
        i = { method: "POST" },
        s = await re.ServerConnection.makeRequest(r, i, this.serverSettings);
      if (s.status !== 204)
        throw await re.ServerConnection.ResponseError.create(s);
    }
    async deleteCheckpoint(e, t) {
      let r = this._getUrl(e, "checkpoints", t),
        i = { method: "DELETE" },
        s = await re.ServerConnection.makeRequest(r, i, this.serverSettings);
      if (s.status !== 204)
        throw await re.ServerConnection.ResponseError.create(s);
    }
    _getUrl(...e) {
      let t = e.map((i) => Ae.URLExt.encodeParts(i)),
        r = this.serverSettings.baseUrl;
      return Ae.URLExt.join(r, this._apiEndpoint, ...t);
    }
  };
  _e.Drive = Pn;
  var Jr;
  (function (n) {
    function e(t) {
      return t.length > 0 && t.indexOf(".") !== 0 && (t = `.${t}`), t;
    }
    n.normalizeExtension = e;
  })(Jr || (Jr = {}));
});
var Co = k((Io) => {
  "use strict";
  h();
  Object.defineProperty(Io, "__esModule", { value: !0 });
});
var Xt = k((V) => {
  "use strict";
  h();
  Object.defineProperty(V, "__esModule", { value: !0 });
  V.isInputReplyMsg =
    V.isInputRequestMsg =
    V.isDebugReplyMsg =
    V.isDebugRequestMsg =
    V.isExecuteReplyMsg =
    V.isInfoRequestMsg =
    V.isCommMsgMsg =
    V.isCommCloseMsg =
    V.isCommOpenMsg =
    V.isDebugEventMsg =
    V.isClearOutputMsg =
    V.isStatusMsg =
    V.isErrorMsg =
    V.isExecuteResultMsg =
    V.isExecuteInputMsg =
    V.isUpdateDisplayDataMsg =
    V.isDisplayDataMsg =
    V.isStreamMsg =
    V.createMessage =
      void 0;
  var Eu = Ne();
  function bu(n) {
    var e, t, r, i, s;
    return {
      buffers: (e = n.buffers) !== null && e !== void 0 ? e : [],
      channel: n.channel,
      content: n.content,
      header: {
        date: new Date().toISOString(),
        msg_id: (t = n.msgId) !== null && t !== void 0 ? t : Eu.UUID.uuid4(),
        msg_type: n.msgType,
        session: n.session,
        username: (r = n.username) !== null && r !== void 0 ? r : "",
        version: "5.2",
      },
      metadata: (i = n.metadata) !== null && i !== void 0 ? i : {},
      parent_header: (s = n.parentHeader) !== null && s !== void 0 ? s : {},
    };
  }
  V.createMessage = bu;
  function Su(n) {
    return n.header.msg_type === "stream";
  }
  V.isStreamMsg = Su;
  function wu(n) {
    return n.header.msg_type === "display_data";
  }
  V.isDisplayDataMsg = wu;
  function Iu(n) {
    return n.header.msg_type === "update_display_data";
  }
  V.isUpdateDisplayDataMsg = Iu;
  function Cu(n) {
    return n.header.msg_type === "execute_input";
  }
  V.isExecuteInputMsg = Cu;
  function Ru(n) {
    return n.header.msg_type === "execute_result";
  }
  V.isExecuteResultMsg = Ru;
  function Au(n) {
    return n.header.msg_type === "error";
  }
  V.isErrorMsg = Au;
  function Du(n) {
    return n.header.msg_type === "status";
  }
  V.isStatusMsg = Du;
  function Pu(n) {
    return n.header.msg_type === "clear_output";
  }
  V.isClearOutputMsg = Pu;
  function Mu(n) {
    return n.header.msg_type === "debug_event";
  }
  V.isDebugEventMsg = Mu;
  function Tu(n) {
    return n.header.msg_type === "comm_open";
  }
  V.isCommOpenMsg = Tu;
  function Ou(n) {
    return n.header.msg_type === "comm_close";
  }
  V.isCommCloseMsg = Ou;
  function Nu(n) {
    return n.header.msg_type === "comm_msg";
  }
  V.isCommMsgMsg = Nu;
  function Lu(n) {
    return n.header.msg_type === "kernel_info_request";
  }
  V.isInfoRequestMsg = Lu;
  function ku(n) {
    return n.header.msg_type === "execute_reply";
  }
  V.isExecuteReplyMsg = ku;
  function xu(n) {
    return n.header.msg_type === "debug_request";
  }
  V.isDebugRequestMsg = xu;
  function ju(n) {
    return n.header.msg_type === "debug_reply";
  }
  V.isDebugReplyMsg = ju;
  function Fu(n) {
    return n.header.msg_type === "input_request";
  }
  V.isInputRequestMsg = Fu;
  function Uu(n) {
    return n.header.msg_type === "input_reply";
  }
  V.isInputReplyMsg = Uu;
});
var Ro = k(() => {
  h();
});
var Ao = k((zr) => {
  "use strict";
  h();
  Object.defineProperty(zr, "__esModule", { value: !0 });
  zr.default = WebSocket;
});
var De = k((nt) => {
  "use strict";
  h();
  var Yr, Xr, Qr;
  Object.defineProperty(nt, "__esModule", { value: !0 });
  nt.ServerConnection = void 0;
  var gt = Ie(),
    Zr,
    ei,
    ti,
    ni;
  if (typeof window == "undefined") {
    let n = Ro();
    (Zr = (Yr = nt.fetch) !== null && Yr !== void 0 ? Yr : n),
      (ti = (Xr = nt.Request) !== null && Xr !== void 0 ? Xr : n.Request),
      (ei = (Qr = nt.Headers) !== null && Qr !== void 0 ? Qr : n.Headers),
      (ni = Ao());
  } else (Zr = fetch), (ti = Request), (ei = Headers), (ni = WebSocket);
  var Do;
  (function (n) {
    function e(s) {
      return Mn.makeSettings(s);
    }
    n.makeSettings = e;
    function t(s, o, a) {
      return Mn.handleRequest(s, o, a);
    }
    n.makeRequest = t;
    class r extends Error {
      constructor(
        o,
        a = `Invalid response: ${o.status} ${o.statusText}`,
        l = ""
      ) {
        super(a), (this.response = o), (this.traceback = l);
      }
      static async create(o) {
        try {
          let a = await o.json();
          return (
            a.traceback && console.error(a.traceback),
            a.message ? new r(o, a.message) : new r(o)
          );
        } catch (a) {
          return console.debug(a), new r(o);
        }
      }
    }
    n.ResponseError = r;
    class i extends TypeError {
      constructor(o) {
        super(o.message), (this.stack = o.stack);
      }
    }
    n.NetworkError = i;
  })((Do = nt.ServerConnection || (nt.ServerConnection = {})));
  var Mn;
  (function (n) {
    function e(i = {}) {
      let s = gt.PageConfig.getBaseUrl(),
        o = gt.PageConfig.getWsUrl(),
        a = gt.URLExt.normalize(i.baseUrl) || s,
        l = i.wsUrl;
      return (
        !l && a === s && (l = o),
        !l && a.indexOf("http") === 0 && (l = "ws" + a.slice(4)),
        (l = l != null ? l : o),
        Object.assign(
          Object.assign(
            {
              init: { cache: "no-store", credentials: "same-origin" },
              fetch: Zr,
              Headers: ei,
              Request: ti,
              WebSocket: ni,
              token: gt.PageConfig.getToken(),
              appUrl: gt.PageConfig.getOption("appUrl"),
              appendToken:
                typeof window == "undefined" ||
                process.env.JEST_WORKER_ID !== void 0 ||
                gt.URLExt.getHostName(s) !== gt.URLExt.getHostName(l),
            },
            i
          ),
          { baseUrl: a, wsUrl: l }
        )
      );
    }
    n.makeSettings = e;
    function t(i, s, o) {
      var a;
      if (i.indexOf(o.baseUrl) !== 0)
        throw new Error("Can only be used for notebook server requests");
      ((a = s.cache) !== null && a !== void 0 ? a : o.init.cache) ===
        "no-store" && (i += (/\?/.test(i) ? "&" : "?") + new Date().getTime());
      let u = new o.Request(i, Object.assign(Object.assign({}, o.init), s)),
        f = !1;
      if (
        (o.token &&
          ((f = !0), u.headers.append("Authorization", `token ${o.token}`)),
        typeof document != "undefined" && document != null && document.cookie)
      ) {
        let c = r("_xsrf");
        c !== void 0 && ((f = !0), u.headers.append("X-XSRFToken", c));
      }
      return (
        !u.headers.has("Content-Type") &&
          f &&
          u.headers.set("Content-Type", "application/json"),
        o.fetch.call(null, u).catch((c) => {
          throw new Do.NetworkError(c);
        })
      );
    }
    n.handleRequest = t;
    function r(i) {
      let s = document.cookie.match("\\b" + i + "=([^;]*)\\b");
      return s == null ? void 0 : s[1];
    }
  })(Mn || (Mn = {}));
});
var Tn = k((rt) => {
  "use strict";
  h();
  Object.defineProperty(rt, "__esModule", { value: !0 });
  rt.validateModels = rt.validateModel = rt.validateMessage = void 0;
  var _t = Yt(),
    Po = ["username", "version", "session", "msg_id", "msg_type"],
    Wu = {
      stream: { name: "string", text: "string" },
      display_data: { data: "object", metadata: "object" },
      execute_input: { code: "string", execution_count: "number" },
      execute_result: {
        execution_count: "number",
        data: "object",
        metadata: "object",
      },
      error: { ename: "string", evalue: "string", traceback: "object" },
      status: {
        execution_state: [
          "string",
          ["starting", "idle", "busy", "restarting", "dead"],
        ],
      },
      clear_output: { wait: "boolean" },
      comm_open: { comm_id: "string", target_name: "string", data: "object" },
      comm_msg: { comm_id: "string", data: "object" },
      comm_close: { comm_id: "string" },
      shutdown_reply: { restart: "boolean" },
    };
  function Ku(n) {
    for (let e = 0; e < Po.length; e++) _t.validateProperty(n, Po[e], "string");
  }
  function qu(n) {
    _t.validateProperty(n, "metadata", "object"),
      _t.validateProperty(n, "content", "object"),
      _t.validateProperty(n, "channel", "string"),
      Ku(n.header),
      n.channel === "iopub" && Vu(n);
  }
  rt.validateMessage = qu;
  function Vu(n) {
    if (n.channel === "iopub") {
      let e = Wu[n.header.msg_type];
      if (e === void 0) return;
      let t = Object.keys(e),
        r = n.content;
      for (let i = 0; i < t.length; i++) {
        let s = e[t[i]];
        Array.isArray(s) || (s = [s]), _t.validateProperty(r, t[i], ...s);
      }
    }
  }
  function Mo(n) {
    _t.validateProperty(n, "name", "string"),
      _t.validateProperty(n, "id", "string");
  }
  rt.validateModel = Mo;
  function Bu(n) {
    if (!Array.isArray(n)) throw new Error("Invalid kernel list");
    n.forEach((e) => Mo(e));
  }
  rt.validateModels = Bu;
});
var Nn = k((ie) => {
  "use strict";
  h();
  Object.defineProperty(ie, "__esModule", { value: !0 });
  ie.getKernelModel =
    ie.shutdownKernel =
    ie.interruptKernel =
    ie.restartKernel =
    ie.startNew =
    ie.listRunning =
    ie.KERNEL_SERVICE_URL =
      void 0;
  var ue = De(),
    Dt = Ie(),
    On = Tn();
  ie.KERNEL_SERVICE_URL = "api/kernels";
  async function Hu(n = ue.ServerConnection.makeSettings()) {
    let e = Dt.URLExt.join(n.baseUrl, ie.KERNEL_SERVICE_URL),
      t = await ue.ServerConnection.makeRequest(e, {}, n);
    if (t.status !== 200)
      throw await ue.ServerConnection.ResponseError.create(t);
    let r = await t.json();
    return On.validateModels(r), r;
  }
  ie.listRunning = Hu;
  async function $u(n = {}, e = ue.ServerConnection.makeSettings()) {
    let t = Dt.URLExt.join(e.baseUrl, ie.KERNEL_SERVICE_URL),
      r = { method: "POST", body: JSON.stringify(n) },
      i = await ue.ServerConnection.makeRequest(t, r, e);
    if (i.status !== 201)
      throw await ue.ServerConnection.ResponseError.create(i);
    let s = await i.json();
    return On.validateModel(s), s;
  }
  ie.startNew = $u;
  async function Ju(n, e = ue.ServerConnection.makeSettings()) {
    let t = Dt.URLExt.join(
        e.baseUrl,
        ie.KERNEL_SERVICE_URL,
        encodeURIComponent(n),
        "restart"
      ),
      r = { method: "POST" },
      i = await ue.ServerConnection.makeRequest(t, r, e);
    if (i.status !== 200)
      throw await ue.ServerConnection.ResponseError.create(i);
    let s = await i.json();
    On.validateModel(s);
  }
  ie.restartKernel = Ju;
  async function Gu(n, e = ue.ServerConnection.makeSettings()) {
    let t = Dt.URLExt.join(
        e.baseUrl,
        ie.KERNEL_SERVICE_URL,
        encodeURIComponent(n),
        "interrupt"
      ),
      r = { method: "POST" },
      i = await ue.ServerConnection.makeRequest(t, r, e);
    if (i.status !== 204)
      throw await ue.ServerConnection.ResponseError.create(i);
  }
  ie.interruptKernel = Gu;
  async function zu(n, e = ue.ServerConnection.makeSettings()) {
    let t = Dt.URLExt.join(
        e.baseUrl,
        ie.KERNEL_SERVICE_URL,
        encodeURIComponent(n)
      ),
      r = { method: "DELETE" },
      i = await ue.ServerConnection.makeRequest(t, r, e);
    if (i.status === 404) {
      let s = `The kernel "${n}" does not exist on the server`;
      console.warn(s);
    } else if (i.status !== 204)
      throw await ue.ServerConnection.ResponseError.create(i);
  }
  ie.shutdownKernel = zu;
  async function Yu(n, e = ue.ServerConnection.makeSettings()) {
    let t = Dt.URLExt.join(
        e.baseUrl,
        ie.KERNEL_SERVICE_URL,
        encodeURIComponent(n)
      ),
      r = await ue.ServerConnection.makeRequest(t, {}, e);
    if (r.status === 404) return;
    if (r.status !== 200)
      throw await ue.ServerConnection.ResponseError.create(r);
    let i = await r.json();
    return On.validateModel(i), i;
  }
  ie.getKernelModel = Yu;
});
var Qt = k((Ln, To) => {
  h();
  (function (n, e) {
    typeof Ln == "object" && typeof To != "undefined"
      ? e(Ln, Ne(), ce())
      : typeof define == "function" && define.amd
        ? define(["exports", "@lumino/coreutils", "@lumino/signaling"], e)
        : ((n = typeof globalThis != "undefined" ? globalThis : n || self),
          e((n.lumino_polling = {}), n.lumino_coreutils, n.lumino_signaling));
  })(Ln, function (n, e, t) {
    "use strict";
    var r = function (S, w) {
      return (
        (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (E, m) {
              E.__proto__ = m;
            }) ||
          function (E, m) {
            for (var b in m)
              Object.prototype.hasOwnProperty.call(m, b) && (E[b] = m[b]);
          }),
        r(S, w)
      );
    };
    function i(S, w) {
      if (typeof w != "function" && w !== null)
        throw new TypeError(
          "Class extends value " + String(w) + " is not a constructor or null"
        );
      r(S, w);
      function E() {
        this.constructor = S;
      }
      S.prototype =
        w === null ? Object.create(w) : ((E.prototype = w.prototype), new E());
    }
    var s = function () {
      return (
        (s =
          Object.assign ||
          function (w) {
            for (var E, m = 1, b = arguments.length; m < b; m++) {
              E = arguments[m];
              for (var y in E)
                Object.prototype.hasOwnProperty.call(E, y) && (w[y] = E[y]);
            }
            return w;
          }),
        s.apply(this, arguments)
      );
    };
    function o(S, w, E, m) {
      function b(y) {
        return y instanceof E
          ? y
          : new E(function (L) {
              L(y);
            });
      }
      return new (E || (E = Promise))(function (y, L) {
        function q(O) {
          try {
            R(m.next(O));
          } catch (W) {
            L(W);
          }
        }
        function F(O) {
          try {
            R(m.throw(O));
          } catch (W) {
            L(W);
          }
        }
        function R(O) {
          O.done ? y(O.value) : b(O.value).then(q, F);
        }
        R((m = m.apply(S, w || [])).next());
      });
    }
    function a(S, w) {
      var E = {
          label: 0,
          sent: function () {
            if (y[0] & 1) throw y[1];
            return y[1];
          },
          trys: [],
          ops: [],
        },
        m,
        b,
        y,
        L;
      return (
        (L = { next: q(0), throw: q(1), return: q(2) }),
        typeof Symbol == "function" &&
          (L[Symbol.iterator] = function () {
            return this;
          }),
        L
      );
      function q(R) {
        return function (O) {
          return F([R, O]);
        };
      }
      function F(R) {
        if (m) throw new TypeError("Generator is already executing.");
        for (; E; )
          try {
            if (
              ((m = 1),
              b &&
                (y =
                  R[0] & 2
                    ? b.return
                    : R[0]
                      ? b.throw || ((y = b.return) && y.call(b), 0)
                      : b.next) &&
                !(y = y.call(b, R[1])).done)
            )
              return y;
            switch (((b = 0), y && (R = [R[0] & 2, y.value]), R[0])) {
              case 0:
              case 1:
                y = R;
                break;
              case 4:
                return E.label++, { value: R[1], done: !1 };
              case 5:
                E.label++, (b = R[1]), (R = [0]);
                continue;
              case 7:
                (R = E.ops.pop()), E.trys.pop();
                continue;
              default:
                if (
                  ((y = E.trys),
                  !(y = y.length > 0 && y[y.length - 1]) &&
                    (R[0] === 6 || R[0] === 2))
                ) {
                  E = 0;
                  continue;
                }
                if (R[0] === 3 && (!y || (R[1] > y[0] && R[1] < y[3]))) {
                  E.label = R[1];
                  break;
                }
                if (R[0] === 6 && E.label < y[1]) {
                  (E.label = y[1]), (y = R);
                  break;
                }
                if (y && E.label < y[2]) {
                  (E.label = y[2]), E.ops.push(R);
                  break;
                }
                y[2] && E.ops.pop(), E.trys.pop();
                continue;
            }
            R = w.call(S, E);
          } catch (O) {
            (R = [6, O]), (b = 0);
          } finally {
            m = y = 0;
          }
        if (R[0] & 5) throw R[1];
        return { value: R[0] ? R[1] : void 0, done: !0 };
      }
    }
    var l =
        typeof requestAnimationFrame == "function"
          ? requestAnimationFrame
          : setImmediate,
      u =
        typeof cancelAnimationFrame == "function"
          ? cancelAnimationFrame
          : clearImmediate;
    (n.Poll = (function () {
      function S(w) {
        var E = this;
        (this._disposed = new t.Signal(this)),
          (this._tick = new e.PromiseDelegate()),
          (this._ticked = new t.Signal(this)),
          (this._timeout = -1),
          (this._factory = w.factory),
          (this._standby = w.standby || f.DEFAULT_STANDBY),
          (this._state = s(s({}, f.DEFAULT_STATE), {
            timestamp: new Date().getTime(),
          }));
        var m = w.frequency || {},
          b = Math.max(m.interval || 0, m.max || 0, f.DEFAULT_FREQUENCY.max);
        (this.frequency = s(s(s({}, f.DEFAULT_FREQUENCY), m), { max: b })),
          (this.name = w.name || f.DEFAULT_NAME),
          (!("auto" in w) || w.auto) &&
            l(function () {
              return void E.start();
            });
      }
      return (
        Object.defineProperty(S.prototype, "disposed", {
          get: function () {
            return this._disposed;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(S.prototype, "frequency", {
          get: function () {
            return this._frequency;
          },
          set: function (w) {
            if (
              !(this.isDisposed || e.JSONExt.deepEqual(w, this.frequency || {}))
            ) {
              var E = w.backoff,
                m = w.interval,
                b = w.max;
              if (
                ((m = Math.round(m)),
                (b = Math.round(b)),
                typeof E == "number" && E < 1)
              )
                throw new Error(
                  "Poll backoff growth factor must be at least 1"
                );
              if ((m < 0 || m > b) && m !== S.NEVER)
                throw new Error("Poll interval must be between 0 and max");
              if (b > S.MAX_INTERVAL && b !== S.NEVER)
                throw new Error(
                  "Max interval must be less than " + S.MAX_INTERVAL
                );
              this._frequency = { backoff: E, interval: m, max: b };
            }
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(S.prototype, "isDisposed", {
          get: function () {
            return this.state.phase === "disposed";
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(S.prototype, "standby", {
          get: function () {
            return this._standby;
          },
          set: function (w) {
            this.isDisposed || this.standby === w || (this._standby = w);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(S.prototype, "state", {
          get: function () {
            return this._state;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(S.prototype, "tick", {
          get: function () {
            return this._tick.promise;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(S.prototype, "ticked", {
          get: function () {
            return this._ticked;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (S.prototype.dispose = function () {
          this.isDisposed ||
            ((this._state = s(s({}, f.DISPOSED_STATE), {
              timestamp: new Date().getTime(),
            })),
            this._tick.promise.catch(function (w) {}),
            this._tick.reject(
              new Error("Poll (" + this.name + ") is disposed.")
            ),
            this._disposed.emit(void 0),
            t.Signal.clearData(this));
        }),
        (S.prototype.refresh = function () {
          return this.schedule({
            cancel: function (w) {
              var E = w.phase;
              return E === "refreshed";
            },
            interval: S.IMMEDIATE,
            phase: "refreshed",
          });
        }),
        (S.prototype.schedule = function (w) {
          return (
            w === void 0 && (w = {}),
            o(this, void 0, void 0, function () {
              var E,
                m,
                b,
                y,
                L,
                q = this;
              return a(this, function (F) {
                switch (F.label) {
                  case 0:
                    return this.isDisposed
                      ? [2]
                      : w.cancel && w.cancel(this.state)
                        ? [2]
                        : ((E = this.state),
                          (m = this._tick),
                          (b = new e.PromiseDelegate()),
                          (y = s(
                            {
                              interval: this.frequency.interval,
                              payload: null,
                              phase: "standby",
                              timestamp: new Date().getTime(),
                            },
                            w
                          )),
                          (this._state = y),
                          (this._tick = b),
                          E.interval === S.IMMEDIATE
                            ? u(this._timeout)
                            : clearTimeout(this._timeout),
                          this._ticked.emit(this.state),
                          m.resolve(this),
                          [4, m.promise]);
                  case 1:
                    return (
                      F.sent(),
                      (L = function () {
                        q.isDisposed || q.tick !== b.promise || q._execute();
                      }),
                      (this._timeout =
                        y.interval === S.IMMEDIATE
                          ? l(L)
                          : y.interval === S.NEVER
                            ? -1
                            : setTimeout(L, y.interval)),
                      [2]
                    );
                }
              });
            })
          );
        }),
        (S.prototype.start = function () {
          return this.schedule({
            cancel: function (w) {
              var E = w.phase;
              return E !== "constructed" && E !== "standby" && E !== "stopped";
            },
            interval: S.IMMEDIATE,
            phase: "started",
          });
        }),
        (S.prototype.stop = function () {
          return this.schedule({
            cancel: function (w) {
              var E = w.phase;
              return E === "stopped";
            },
            interval: S.NEVER,
            phase: "stopped",
          });
        }),
        (S.prototype._execute = function () {
          var w = this,
            E =
              typeof this.standby == "function" ? this.standby() : this.standby;
          if (
            ((E =
              E === "never"
                ? !1
                : E === "when-hidden"
                  ? !!(
                      typeof document != "undefined" &&
                      document &&
                      document.hidden
                    )
                  : E),
            E)
          ) {
            this.schedule();
            return;
          }
          var m = this.tick;
          this._factory(this.state)
            .then(function (b) {
              w.isDisposed ||
                w.tick !== m ||
                w.schedule({
                  payload: b,
                  phase:
                    w.state.phase === "rejected" ? "reconnected" : "resolved",
                });
            })
            .catch(function (b) {
              w.isDisposed ||
                w.tick !== m ||
                w.schedule({
                  interval: f.sleep(w.frequency, w.state),
                  payload: b,
                  phase: "rejected",
                });
            });
        }),
        S
      );
    })()),
      (function (S) {
        (S.IMMEDIATE = 0), (S.MAX_INTERVAL = 2147483647), (S.NEVER = 1 / 0);
      })(n.Poll || (n.Poll = {}));
    var f;
    (function (S) {
      (S.DEFAULT_BACKOFF = 3),
        (S.DEFAULT_FREQUENCY = { backoff: !0, interval: 1e3, max: 30 * 1e3 }),
        (S.DEFAULT_NAME = "unknown"),
        (S.DEFAULT_STANDBY = "when-hidden"),
        (S.DEFAULT_STATE = {
          interval: n.Poll.NEVER,
          payload: null,
          phase: "constructed",
          timestamp: new Date(0).getTime(),
        }),
        (S.DISPOSED_STATE = {
          interval: n.Poll.NEVER,
          payload: null,
          phase: "disposed",
          timestamp: new Date(0).getTime(),
        });
      function w(m, b) {
        return (
          (m = Math.ceil(m)),
          (b = Math.floor(b)),
          Math.floor(Math.random() * (b - m + 1)) + m
        );
      }
      function E(m, b) {
        var y = m.backoff,
          L = m.interval,
          q = m.max;
        if (L === n.Poll.NEVER) return L;
        var F = y === !0 ? S.DEFAULT_BACKOFF : y === !1 ? 1 : y,
          R = w(L, b.interval * F);
        return Math.min(q, R);
      }
      S.sleep = E;
    })(f || (f = {}));
    var c = (function () {
        function S(w, E) {
          var m = this;
          E === void 0 && (E = 500),
            (this.payload = null),
            (this.limit = E),
            (this.poll = new n.Poll({
              auto: !1,
              factory: function () {
                return o(m, void 0, void 0, function () {
                  return a(this, function (b) {
                    switch (b.label) {
                      case 0:
                        return [4, w()];
                      case 1:
                        return [2, b.sent()];
                    }
                  });
                });
              },
              frequency: {
                backoff: !1,
                interval: n.Poll.NEVER,
                max: n.Poll.NEVER,
              },
              standby: "never",
            })),
            (this.payload = new e.PromiseDelegate()),
            this.poll.ticked.connect(function (b, y) {
              var L = m.payload;
              if (y.phase === "resolved") {
                (m.payload = new e.PromiseDelegate()), L.resolve(y.payload);
                return;
              }
              if (y.phase === "rejected" || y.phase === "stopped") {
                (m.payload = new e.PromiseDelegate()),
                  L.promise.catch(function (q) {}),
                  L.reject(y.payload);
                return;
              }
            }, this);
        }
        return (
          Object.defineProperty(S.prototype, "isDisposed", {
            get: function () {
              return this.payload === null;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (S.prototype.dispose = function () {
            this.isDisposed || ((this.payload = null), this.poll.dispose());
          }),
          (S.prototype.stop = function () {
            return o(this, void 0, void 0, function () {
              return a(this, function (w) {
                return [2, this.poll.stop()];
              });
            });
          }),
          S
        );
      })(),
      C = (function (S) {
        i(w, S);
        function w() {
          return (S !== null && S.apply(this, arguments)) || this;
        }
        return (
          (w.prototype.invoke = function () {
            return (
              this.poll.schedule({ interval: this.limit, phase: "invoked" }),
              this.payload.promise
            );
          }),
          w
        );
      })(c),
      M = (function (S) {
        i(w, S);
        function w(E, m) {
          var b =
              S.call(this, E, typeof m == "number" ? m : m && m.limit) || this,
            y = "leading";
          return (
            typeof m != "number" &&
              ((m = m || {}), (y = "edge" in m ? m.edge : y)),
            (b._interval = y === "trailing" ? b.limit : n.Poll.IMMEDIATE),
            b
          );
        }
        return (
          (w.prototype.invoke = function () {
            return (
              this.poll.state.phase !== "invoked" &&
                this.poll.schedule({
                  interval: this._interval,
                  phase: "invoked",
                }),
              this.payload.promise
            );
          }),
          w
        );
      })(c);
    (n.Debouncer = C),
      (n.RateLimiter = c),
      (n.Throttler = M),
      Object.defineProperty(n, "__esModule", { value: !0 });
  });
});
var Zt = k((kn) => {
  "use strict";
  h();
  Object.defineProperty(kn, "__esModule", { value: !0 });
  kn.BaseManager = void 0;
  var Oo = ce(),
    Xu = De(),
    ri = class {
      constructor(e) {
        var t;
        (this._isDisposed = !1),
          (this._disposed = new Oo.Signal(this)),
          (this.serverSettings =
            (t = e.serverSettings) !== null && t !== void 0
              ? t
              : Xu.ServerConnection.makeSettings());
      }
      get disposed() {
        return this._disposed;
      }
      get isDisposed() {
        return this._isDisposed;
      }
      dispose() {
        this.isDisposed ||
          (this._disposed.emit(void 0), Oo.Signal.clearData(this));
      }
    };
  kn.BaseManager = ri;
});
var ii = k((xn, No) => {
  h();
  (function (n, e) {
    typeof xn == "object" && typeof No != "undefined"
      ? e(xn, ct(), ce())
      : typeof define == "function" && define.amd
        ? define(["exports", "@lumino/algorithm", "@lumino/signaling"], e)
        : ((n = typeof globalThis != "undefined" ? globalThis : n || self),
          e(
            (n.lumino_disposable = {}),
            n.lumino_algorithm,
            n.lumino_signaling
          ));
  })(xn, function (n, e, t) {
    "use strict";
    var r = function (a, l) {
      return (
        (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (u, f) {
              u.__proto__ = f;
            }) ||
          function (u, f) {
            for (var c in f)
              Object.prototype.hasOwnProperty.call(f, c) && (u[c] = f[c]);
          }),
        r(a, l)
      );
    };
    function i(a, l) {
      if (typeof l != "function" && l !== null)
        throw new TypeError(
          "Class extends value " + String(l) + " is not a constructor or null"
        );
      r(a, l);
      function u() {
        this.constructor = a;
      }
      a.prototype =
        l === null ? Object.create(l) : ((u.prototype = l.prototype), new u());
    }
    var s = (function () {
        function a(l) {
          this._fn = l;
        }
        return (
          Object.defineProperty(a.prototype, "isDisposed", {
            get: function () {
              return !this._fn;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (a.prototype.dispose = function () {
            if (this._fn) {
              var l = this._fn;
              (this._fn = null), l();
            }
          }),
          a
        );
      })(),
      o = (function (a) {
        i(l, a);
        function l() {
          var u = (a !== null && a.apply(this, arguments)) || this;
          return (u._disposed = new t.Signal(u)), u;
        }
        return (
          Object.defineProperty(l.prototype, "disposed", {
            get: function () {
              return this._disposed;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (l.prototype.dispose = function () {
            this.isDisposed ||
              (a.prototype.dispose.call(this),
              this._disposed.emit(void 0),
              t.Signal.clearData(this));
          }),
          l
        );
      })(s);
    (n.DisposableSet = (function () {
      function a() {
        (this._isDisposed = !1), (this._items = new Set());
      }
      return (
        Object.defineProperty(a.prototype, "isDisposed", {
          get: function () {
            return this._isDisposed;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (a.prototype.dispose = function () {
          this._isDisposed ||
            ((this._isDisposed = !0),
            this._items.forEach(function (l) {
              l.dispose();
            }),
            this._items.clear());
        }),
        (a.prototype.contains = function (l) {
          return this._items.has(l);
        }),
        (a.prototype.add = function (l) {
          this._items.add(l);
        }),
        (a.prototype.remove = function (l) {
          this._items.delete(l);
        }),
        (a.prototype.clear = function () {
          this._items.clear();
        }),
        a
      );
    })()),
      (function (a) {
        function l(u) {
          var f = new a();
          return (
            e.each(u, function (c) {
              f.add(c);
            }),
            f
          );
        }
        a.from = l;
      })(n.DisposableSet || (n.DisposableSet = {})),
      (n.ObservableDisposableSet = (function (a) {
        i(l, a);
        function l() {
          var u = (a !== null && a.apply(this, arguments)) || this;
          return (u._disposed = new t.Signal(u)), u;
        }
        return (
          Object.defineProperty(l.prototype, "disposed", {
            get: function () {
              return this._disposed;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (l.prototype.dispose = function () {
            this.isDisposed ||
              (a.prototype.dispose.call(this),
              this._disposed.emit(void 0),
              t.Signal.clearData(this));
          }),
          l
        );
      })(n.DisposableSet)),
      (function (a) {
        function l(u) {
          var f = new a();
          return (
            e.each(u, function (c) {
              f.add(c);
            }),
            f
          );
        }
        a.from = l;
      })(n.ObservableDisposableSet || (n.ObservableDisposableSet = {})),
      (n.DisposableDelegate = s),
      (n.ObservableDisposableDelegate = o),
      Object.defineProperty(n, "__esModule", { value: !0 });
  });
});
var Lo = k((He) => {
  "use strict";
  h();
  var Qu =
      (He && He.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    Zu =
      (He && He.__setModuleDefault) ||
      (Object.create
        ? function (n, e) {
            Object.defineProperty(n, "default", { enumerable: !0, value: e });
          }
        : function (n, e) {
            n.default = e;
          }),
    ec =
      (He && He.__importStar) ||
      function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (n != null)
          for (var t in n)
            t !== "default" &&
              Object.prototype.hasOwnProperty.call(n, t) &&
              Qu(e, n, t);
        return Zu(e, n), e;
      };
  Object.defineProperty(He, "__esModule", { value: !0 });
  He.CommHandler = void 0;
  var tc = ii(),
    jn = ec(Xt()),
    si = class extends tc.DisposableDelegate {
      constructor(e, t, r, i) {
        super(i),
          (this._target = ""),
          (this._id = ""),
          (this._id = t),
          (this._target = e),
          (this._kernel = r);
      }
      get commId() {
        return this._id;
      }
      get targetName() {
        return this._target;
      }
      get onClose() {
        return this._onClose;
      }
      set onClose(e) {
        this._onClose = e;
      }
      get onMsg() {
        return this._onMsg;
      }
      set onMsg(e) {
        this._onMsg = e;
      }
      open(e, t, r = []) {
        if (this.isDisposed || this._kernel.isDisposed)
          throw new Error("Cannot open");
        let i = jn.createMessage({
          msgType: "comm_open",
          channel: "shell",
          username: this._kernel.username,
          session: this._kernel.clientId,
          content: {
            comm_id: this._id,
            target_name: this._target,
            data: e != null ? e : {},
          },
          metadata: t,
          buffers: r,
        });
        return this._kernel.sendShellMessage(i, !1, !0);
      }
      send(e, t, r = [], i = !0) {
        if (this.isDisposed || this._kernel.isDisposed)
          throw new Error("Cannot send");
        let s = jn.createMessage({
          msgType: "comm_msg",
          channel: "shell",
          username: this._kernel.username,
          session: this._kernel.clientId,
          content: { comm_id: this._id, data: e },
          metadata: t,
          buffers: r,
        });
        return this._kernel.sendShellMessage(s, !1, i);
      }
      close(e, t, r = []) {
        if (this.isDisposed || this._kernel.isDisposed)
          throw new Error("Cannot close");
        let i = jn.createMessage({
            msgType: "comm_close",
            channel: "shell",
            username: this._kernel.username,
            session: this._kernel.clientId,
            content: { comm_id: this._id, data: e != null ? e : {} },
            metadata: t,
            buffers: r,
          }),
          s = this._kernel.sendShellMessage(i, !1, !0),
          o = this._onClose;
        if (o) {
          let a = jn.createMessage({
            msgType: "comm_close",
            channel: "iopub",
            username: this._kernel.username,
            session: this._kernel.clientId,
            content: { comm_id: this._id, data: e != null ? e : {} },
            metadata: t,
            buffers: r,
          });
          o(a);
        }
        return this.dispose(), s;
      }
    };
  He.CommHandler = si;
});
var xo = k((Ce) => {
  "use strict";
  h();
  var nc =
      (Ce && Ce.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    rc =
      (Ce && Ce.__setModuleDefault) ||
      (Object.create
        ? function (n, e) {
            Object.defineProperty(n, "default", { enumerable: !0, value: e });
          }
        : function (n, e) {
            n.default = e;
          }),
    ic =
      (Ce && Ce.__importStar) ||
      function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (n != null)
          for (var t in n)
            t !== "default" &&
              Object.prototype.hasOwnProperty.call(n, t) &&
              nc(e, n, t);
        return rc(e, n), e;
      };
  Object.defineProperty(Ce, "__esModule", { value: !0 });
  Ce.KernelShellFutureHandler =
    Ce.KernelControlFutureHandler =
    Ce.KernelFutureHandler =
      void 0;
  var ko = Ne(),
    sc = ii(),
    oc = ic(Xt()),
    en = class extends sc.DisposableDelegate {
      constructor(e, t, r, i, s) {
        super(e),
          (this._status = 0),
          (this._stdin = de.noOp),
          (this._iopub = de.noOp),
          (this._reply = de.noOp),
          (this._done = new ko.PromiseDelegate()),
          (this._hooks = new de.HookList()),
          (this._disposeOnDone = !0),
          (this._msg = t),
          r || this._setFlag(de.KernelFutureFlag.GotReply),
          (this._disposeOnDone = i),
          (this._kernel = s);
      }
      get msg() {
        return this._msg;
      }
      get done() {
        return this._done.promise;
      }
      get onReply() {
        return this._reply;
      }
      set onReply(e) {
        this._reply = e;
      }
      get onIOPub() {
        return this._iopub;
      }
      set onIOPub(e) {
        this._iopub = e;
      }
      get onStdin() {
        return this._stdin;
      }
      set onStdin(e) {
        this._stdin = e;
      }
      registerMessageHook(e) {
        if (this.isDisposed) throw new Error("Kernel future is disposed");
        this._hooks.add(e);
      }
      removeMessageHook(e) {
        this.isDisposed || this._hooks.remove(e);
      }
      sendInputReply(e) {
        this._kernel.sendInputReply(e);
      }
      dispose() {
        (this._stdin = de.noOp),
          (this._iopub = de.noOp),
          (this._reply = de.noOp),
          (this._hooks = null),
          this._testFlag(de.KernelFutureFlag.IsDone) ||
            (this._done.promise.catch(() => {}),
            this._done.reject(
              new Error(
                `Canceled future for ${this.msg.header.msg_type} message before replies were done`
              )
            )),
          super.dispose();
      }
      async handleMsg(e) {
        switch (e.channel) {
          case "control":
          case "shell":
            e.channel === this.msg.channel &&
              e.parent_header.msg_id === this.msg.header.msg_id &&
              (await this._handleReply(e));
            break;
          case "stdin":
            await this._handleStdin(e);
            break;
          case "iopub":
            await this._handleIOPub(e);
            break;
          default:
            break;
        }
      }
      async _handleReply(e) {
        let t = this._reply;
        t && (await t(e)),
          (this._replyMsg = e),
          this._setFlag(de.KernelFutureFlag.GotReply),
          this._testFlag(de.KernelFutureFlag.GotIdle) && this._handleDone();
      }
      async _handleStdin(e) {
        let t = this._stdin;
        t && (await t(e));
      }
      async _handleIOPub(e) {
        let t = await this._hooks.process(e),
          r = this._iopub;
        t && r && (await r(e)),
          oc.isStatusMsg(e) &&
            e.content.execution_state === "idle" &&
            (this._setFlag(de.KernelFutureFlag.GotIdle),
            this._testFlag(de.KernelFutureFlag.GotReply) && this._handleDone());
      }
      _handleDone() {
        this._testFlag(de.KernelFutureFlag.IsDone) ||
          (this._setFlag(de.KernelFutureFlag.IsDone),
          this._done.resolve(this._replyMsg),
          this._disposeOnDone && this.dispose());
      }
      _testFlag(e) {
        return (this._status & e) !== 0;
      }
      _setFlag(e) {
        this._status |= e;
      }
    };
  Ce.KernelFutureHandler = en;
  var oi = class extends en {};
  Ce.KernelControlFutureHandler = oi;
  var ai = class extends en {};
  Ce.KernelShellFutureHandler = ai;
  var de;
  (function (n) {
    n.noOp = () => {};
    let e = (() =>
      typeof requestAnimationFrame == "function"
        ? requestAnimationFrame
        : setImmediate)();
    class t {
      constructor() {
        this._hooks = [];
      }
      add(s) {
        this.remove(s), this._hooks.push(s);
      }
      remove(s) {
        let o = this._hooks.indexOf(s);
        o >= 0 && ((this._hooks[o] = null), this._scheduleCompact());
      }
      async process(s) {
        await this._processing;
        let o = new ko.PromiseDelegate();
        this._processing = o.promise;
        let a;
        for (let l = this._hooks.length - 1; l >= 0; l--) {
          let u = this._hooks[l];
          if (u !== null) {
            try {
              a = await u(s);
            } catch (f) {
              (a = !0), console.error(f);
            }
            if (a === !1) return o.resolve(void 0), !1;
          }
        }
        return o.resolve(void 0), !0;
      }
      _scheduleCompact() {
        this._compactScheduled ||
          ((this._compactScheduled = !0),
          e(() => {
            this._processing = this._processing.then(() => {
              (this._compactScheduled = !1), this._compact();
            });
          }));
      }
      _compact() {
        let s = 0;
        for (let o = 0, a = this._hooks.length; o < a; o++) {
          let l = this._hooks[o];
          this._hooks[o] === null ? s++ : (this._hooks[o - s] = l);
        }
        this._hooks.length -= s;
      }
    }
    n.HookList = t;
    let r;
    (function (i) {
      (i[(i.GotReply = 1)] = "GotReply"),
        (i[(i.GotIdle = 2)] = "GotIdle"),
        (i[(i.IsDone = 4)] = "IsDone"),
        (i[(i.DisposeOnDone = 8)] = "DisposeOnDone");
    })((r = n.KernelFutureFlag || (n.KernelFutureFlag = {})));
  })(de || (de = {}));
});
var jo = k((Pt) => {
  "use strict";
  h();
  Object.defineProperty(Pt, "__esModule", { value: !0 });
  Pt.serialize = Pt.deserialize = void 0;
  function ac(n) {
    let e;
    return typeof n == "string" ? (e = JSON.parse(n)) : (e = uc(n)), e;
  }
  Pt.deserialize = ac;
  function lc(n) {
    var e;
    let t;
    return (
      !((e = n.buffers) === null || e === void 0) && e.length
        ? (t = cc(n))
        : (t = JSON.stringify(n)),
      t
    );
  }
  Pt.serialize = lc;
  function uc(n) {
    let e = new DataView(n),
      t = e.getUint32(0),
      r = [];
    if (t < 2) throw new Error("Invalid incoming Kernel Message");
    for (let o = 1; o <= t; o++) r.push(e.getUint32(o * 4));
    let i = new Uint8Array(n.slice(r[0], r[1])),
      s = JSON.parse(new TextDecoder("utf8").decode(i));
    s.buffers = [];
    for (let o = 1; o < t; o++) {
      let a = r[o],
        l = r[o + 1] || n.byteLength;
      s.buffers.push(new DataView(n.slice(a, l)));
    }
    return s;
  }
  function cc(n) {
    let e = [],
      t = [],
      r = new TextEncoder(),
      i = [];
    n.buffers !== void 0 && ((i = n.buffers), delete n.buffers);
    let s = r.encode(JSON.stringify(n));
    t.push(s.buffer);
    for (let u = 0; u < i.length; u++) {
      let f = i[u];
      t.push(ArrayBuffer.isView(f) ? f.buffer : f);
    }
    let o = t.length;
    e.push(4 * (o + 1));
    for (let u = 0; u + 1 < t.length; u++)
      e.push(e[e.length - 1] + t[u].byteLength);
    let a = new Uint8Array(e[e.length - 1] + t[t.length - 1].byteLength),
      l = new DataView(a.buffer);
    l.setUint32(0, o);
    for (let u = 0; u < e.length; u++) l.setUint32(4 * (u + 1), e[u]);
    for (let u = 0; u < t.length; u++) a.set(new Uint8Array(t[u]), e[u]);
    return a.buffer;
  }
});
var Uo = k((Fo) => {
  "use strict";
  h();
  Object.defineProperty(Fo, "__esModule", { value: !0 });
});
var Ko = k((Mt) => {
  "use strict";
  h();
  Object.defineProperty(Mt, "__esModule", { value: !0 });
  Mt.validateSpecModels = Mt.validateSpecModel = void 0;
  var mt = Yt();
  function Wo(n) {
    let e = n.spec;
    if (!e) throw new Error("Invalid kernel spec");
    mt.validateProperty(n, "name", "string"),
      mt.validateProperty(n, "resources", "object"),
      mt.validateProperty(e, "language", "string"),
      mt.validateProperty(e, "display_name", "string"),
      mt.validateProperty(e, "argv", "array");
    let t = null;
    e.hasOwnProperty("metadata") &&
      (mt.validateProperty(e, "metadata", "object"), (t = e.metadata));
    let r = null;
    return (
      e.hasOwnProperty("env") &&
        (mt.validateProperty(e, "env", "object"), (r = e.env)),
      {
        name: n.name,
        resources: n.resources,
        language: e.language,
        display_name: e.display_name,
        argv: e.argv,
        metadata: t,
        env: r,
      }
    );
  }
  Mt.validateSpecModel = Wo;
  function dc(n) {
    if (!n.hasOwnProperty("kernelspecs"))
      throw new Error("No kernelspecs found");
    let e = Object.keys(n.kernelspecs),
      t = Object.create(null),
      r = n.default;
    for (let i = 0; i < e.length; i++) {
      let s = n.kernelspecs[e[i]];
      try {
        t[e[i]] = Wo(s);
      } catch (o) {
        console.warn(`Removing errant kernel spec: ${e[i]}`);
      }
    }
    if (((e = Object.keys(t)), !e.length))
      throw new Error("No valid kernelspecs found");
    return (
      (!r || typeof r != "string" || !(r in t)) &&
        ((r = e[0]), console.warn(`Default kernel not found, using '${e[0]}'`)),
      { default: r, kernelspecs: t }
    );
  }
  Mt.validateSpecModels = dc;
});
var ui = k((Fn) => {
  "use strict";
  h();
  Object.defineProperty(Fn, "__esModule", { value: !0 });
  Fn.getSpecs = void 0;
  var li = De(),
    hc = Ko(),
    fc = Ie(),
    pc = "api/kernelspecs";
  async function gc(n = li.ServerConnection.makeSettings()) {
    let e = fc.URLExt.join(n.baseUrl, pc),
      t = await li.ServerConnection.makeRequest(e, {}, n);
    if (t.status !== 200)
      throw await li.ServerConnection.ResponseError.create(t);
    let r = await t.json();
    return hc.validateSpecModels(r);
  }
  Fn.getSpecs = gc;
});
var Vo = k(($e) => {
  "use strict";
  h();
  var _c =
      ($e && $e.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    mc =
      ($e && $e.__setModuleDefault) ||
      (Object.create
        ? function (n, e) {
            Object.defineProperty(n, "default", { enumerable: !0, value: e });
          }
        : function (n, e) {
            n.default = e;
          }),
    vc =
      ($e && $e.__importStar) ||
      function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (n != null)
          for (var t in n)
            t !== "default" &&
              Object.prototype.hasOwnProperty.call(n, t) &&
              _c(e, n, t);
        return mc(e, n), e;
      };
  Object.defineProperty($e, "__esModule", { value: !0 });
  $e.KernelSpecManager = void 0;
  var yc = Ne(),
    Ec = Qt(),
    qo = ce(),
    bc = vc(ui()),
    Sc = Zt(),
    ci = class extends Sc.BaseManager {
      constructor(e = {}) {
        var t;
        super(e),
          (this._isReady = !1),
          (this._connectionFailure = new qo.Signal(this)),
          (this._specs = null),
          (this._specsChanged = new qo.Signal(this)),
          (this._ready = Promise.all([this.requestSpecs()])
            .then((r) => {})
            .catch((r) => {})
            .then(() => {
              this.isDisposed || (this._isReady = !0);
            })),
          (this._pollSpecs = new Ec.Poll({
            auto: !1,
            factory: () => this.requestSpecs(),
            frequency: { interval: 61 * 1e3, backoff: !0, max: 300 * 1e3 },
            name: "@jupyterlab/services:KernelSpecManager#specs",
            standby:
              (t = e.standby) !== null && t !== void 0 ? t : "when-hidden",
          })),
          this.ready.then(() => {
            this._pollSpecs.start();
          });
      }
      get isReady() {
        return this._isReady;
      }
      get ready() {
        return this._ready;
      }
      get specs() {
        return this._specs;
      }
      get specsChanged() {
        return this._specsChanged;
      }
      get connectionFailure() {
        return this._connectionFailure;
      }
      dispose() {
        this._pollSpecs.dispose(), super.dispose();
      }
      async refreshSpecs() {
        await this._pollSpecs.refresh(), await this._pollSpecs.tick;
      }
      async requestSpecs() {
        let e = await bc.getSpecs(this.serverSettings);
        this.isDisposed ||
          yc.JSONExt.deepEqual(e, this._specs) ||
          ((this._specs = e), this._specsChanged.emit(e));
      }
    };
  $e.KernelSpecManager = ci;
});
var Un = k((me) => {
  "use strict";
  h();
  var Bo =
      (me && me.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    wc =
      (me && me.__setModuleDefault) ||
      (Object.create
        ? function (n, e) {
            Object.defineProperty(n, "default", { enumerable: !0, value: e });
          }
        : function (n, e) {
            n.default = e;
          }),
    Ho =
      (me && me.__importStar) ||
      function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (n != null)
          for (var t in n)
            t !== "default" &&
              Object.prototype.hasOwnProperty.call(n, t) &&
              Bo(e, n, t);
        return wc(e, n), e;
      },
    Ic =
      (me && me.__exportStar) ||
      function (n, e) {
        for (var t in n)
          t !== "default" &&
            !Object.prototype.hasOwnProperty.call(e, t) &&
            Bo(e, n, t);
      };
  Object.defineProperty(me, "__esModule", { value: !0 });
  me.KernelSpecAPI = me.KernelSpec = void 0;
  var Cc = Ho(Uo());
  me.KernelSpec = Cc;
  var Rc = Ho(ui());
  me.KernelSpecAPI = Rc;
  Ic(Vo(), me);
});
var fi = k((Je) => {
  "use strict";
  h();
  var Ac =
      (Je && Je.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    Dc =
      (Je && Je.__setModuleDefault) ||
      (Object.create
        ? function (n, e) {
            Object.defineProperty(n, "default", { enumerable: !0, value: e });
          }
        : function (n, e) {
            n.default = e;
          }),
    Kn =
      (Je && Je.__importStar) ||
      function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (n != null)
          for (var t in n)
            t !== "default" &&
              Object.prototype.hasOwnProperty.call(n, t) &&
              Ac(e, n, t);
        return Dc(e, n), e;
      };
  Object.defineProperty(Je, "__esModule", { value: !0 });
  Je.KernelConnection = void 0;
  var $o = Ie(),
    it = Ne(),
    vt = ce(),
    Pc = Ve(),
    Jo = Lo(),
    Pe = Kn(Xt()),
    Go = xo(),
    di = Kn(jo()),
    Mc = Kn(Tn()),
    Tc = Un(),
    Wn = Kn(Nn()),
    Oc = 3e3,
    Tt = "_RESTARTING_",
    Nc = "",
    hi = class n {
      constructor(e) {
        var t, r, i, s;
        (this._createSocket = () => {
          this._errorIfDisposed(),
            this._clearSocket(),
            this._updateConnectionStatus("connecting");
          let o = this.serverSettings,
            a = $o.URLExt.join(
              o.wsUrl,
              Wn.KERNEL_SERVICE_URL,
              encodeURIComponent(this._id)
            ),
            l = a.replace(/^((?:\w+:)?\/\/)(?:[^@\/]+@)/, "$1"),
            u = $o.URLExt.join(
              a,
              "channels?session_id=" + encodeURIComponent(this._clientId)
            ),
            f = o.token;
          o.appendToken &&
            f !== "" &&
            (u = u + `&token=${encodeURIComponent(f)}`),
            (this._ws = new o.WebSocket(u)),
            (this._ws.binaryType = "arraybuffer"),
            (this._ws.onmessage = this._onWSMessage),
            (this._ws.onopen = this._onWSOpen),
            (this._ws.onclose = this._onWSClose),
            (this._ws.onerror = this._onWSClose);
        }),
          (this._onWSOpen = (o) => {
            this._updateConnectionStatus("connected");
          }),
          (this._onWSMessage = (o) => {
            let a;
            try {
              (a = di.deserialize(o.data)), Mc.validateMessage(a);
            } catch (l) {
              throw (
                ((l.message = `Kernel message validation error: ${l.message}`),
                l)
              );
            }
            (this._kernelSession = a.header.session),
              (this._msgChain = this._msgChain
                .then(() => this._handleMessage(a))
                .catch((l) => {
                  l.message.startsWith("Canceled future for ") &&
                    console.error(l);
                })),
              this._anyMessage.emit({ msg: a, direction: "recv" });
          }),
          (this._onWSClose = (o) => {
            this.isDisposed || this._reconnect();
          }),
          (this._id = ""),
          (this._name = ""),
          (this._status = "unknown"),
          (this._connectionStatus = "connecting"),
          (this._kernelSession = ""),
          (this._isDisposed = !1),
          (this._ws = null),
          (this._username = ""),
          (this._reconnectLimit = 7),
          (this._reconnectAttempt = 0),
          (this._reconnectTimeout = null),
          (this._futures = new Map()),
          (this._comms = new Map()),
          (this._targetRegistry = Object.create(null)),
          (this._info = new it.PromiseDelegate()),
          (this._pendingMessages = []),
          (this._statusChanged = new vt.Signal(this)),
          (this._connectionStatusChanged = new vt.Signal(this)),
          (this._disposed = new vt.Signal(this)),
          (this._iopubMessage = new vt.Signal(this)),
          (this._anyMessage = new vt.Signal(this)),
          (this._unhandledMessage = new vt.Signal(this)),
          (this._displayIdToParentIds = new Map()),
          (this._msgIdToDisplayIds = new Map()),
          (this._msgChain = Promise.resolve()),
          (this._noOp = () => {}),
          (this._name = e.model.name),
          (this._id = e.model.id),
          (this.serverSettings =
            (t = e.serverSettings) !== null && t !== void 0
              ? t
              : Pc.ServerConnection.makeSettings()),
          (this._clientId =
            (r = e.clientId) !== null && r !== void 0 ? r : it.UUID.uuid4()),
          (this._username = (i = e.username) !== null && i !== void 0 ? i : ""),
          (this.handleComms =
            (s = e.handleComms) !== null && s !== void 0 ? s : !0),
          this._createSocket();
      }
      get disposed() {
        return this._disposed;
      }
      get statusChanged() {
        return this._statusChanged;
      }
      get connectionStatusChanged() {
        return this._connectionStatusChanged;
      }
      get iopubMessage() {
        return this._iopubMessage;
      }
      get unhandledMessage() {
        return this._unhandledMessage;
      }
      get model() {
        return { id: this.id, name: this.name };
      }
      get anyMessage() {
        return this._anyMessage;
      }
      get id() {
        return this._id;
      }
      get name() {
        return this._name;
      }
      get username() {
        return this._username;
      }
      get clientId() {
        return this._clientId;
      }
      get status() {
        return this._status;
      }
      get connectionStatus() {
        return this._connectionStatus;
      }
      get isDisposed() {
        return this._isDisposed;
      }
      get info() {
        return this._info.promise;
      }
      get spec() {
        return this._specPromise
          ? this._specPromise
          : ((this._specPromise = Tc.KernelSpecAPI.getSpecs(
              this.serverSettings
            ).then((e) => e.kernelspecs[this._name])),
            this._specPromise);
      }
      clone(e = {}) {
        return new n(
          Object.assign(
            {
              model: this.model,
              username: this.username,
              serverSettings: this.serverSettings,
              handleComms: !1,
            },
            e
          )
        );
      }
      dispose() {
        this.isDisposed ||
          ((this._isDisposed = !0),
          this._disposed.emit(),
          this._updateConnectionStatus("disconnected"),
          this._clearKernelState(),
          (this._pendingMessages = []),
          this._clearSocket(),
          vt.Signal.clearData(this));
      }
      sendShellMessage(e, t = !1, r = !0) {
        return this._sendKernelShellControl(
          Go.KernelShellFutureHandler,
          e,
          t,
          r
        );
      }
      sendControlMessage(e, t = !1, r = !0) {
        return this._sendKernelShellControl(
          Go.KernelControlFutureHandler,
          e,
          t,
          r
        );
      }
      _sendKernelShellControl(e, t, r = !1, i = !0) {
        this._sendMessage(t),
          this._anyMessage.emit({ msg: t, direction: "send" });
        let s = new e(
          () => {
            let o = t.header.msg_id;
            this._futures.delete(o);
            let a = this._msgIdToDisplayIds.get(o);
            a &&
              (a.forEach((l) => {
                let u = this._displayIdToParentIds.get(l);
                if (u) {
                  let f = u.indexOf(o);
                  if (f === -1) return;
                  u.length === 1
                    ? this._displayIdToParentIds.delete(l)
                    : (u.splice(f, 1), this._displayIdToParentIds.set(l, u));
                }
              }),
              this._msgIdToDisplayIds.delete(o));
          },
          t,
          r,
          i,
          this
        );
        return this._futures.set(t.header.msg_id, s), s;
      }
      _sendMessage(e, t = !0) {
        if (this.status === "dead") throw new Error("Kernel is dead");
        if (
          (this._kernelSession === Nc || this._kernelSession === Tt) &&
          Pe.isInfoRequestMsg(e)
        )
          if (this.connectionStatus === "connected") {
            this._ws.send(di.serialize(e));
            return;
          } else
            throw new Error("Could not send message: status is not connected");
        if (t && this._pendingMessages.length > 0) {
          this._pendingMessages.push(e);
          return;
        }
        if (this.connectionStatus === "connected" && this._kernelSession !== Tt)
          this._ws.send(di.serialize(e));
        else if (t) this._pendingMessages.push(e);
        else throw new Error("Could not send message");
      }
      async interrupt() {
        if (this.status === "dead") throw new Error("Kernel is dead");
        return Wn.interruptKernel(this.id, this.serverSettings);
      }
      async restart() {
        if (this.status === "dead") throw new Error("Kernel is dead");
        this._updateStatus("restarting"),
          this._clearKernelState(),
          (this._kernelSession = Tt),
          await Wn.restartKernel(this.id, this.serverSettings),
          await this.reconnect();
      }
      reconnect() {
        this._errorIfDisposed();
        let e = new it.PromiseDelegate(),
          t = (r, i) => {
            i === "connected"
              ? (e.resolve(), this.connectionStatusChanged.disconnect(t, this))
              : i === "disconnected" &&
                (e.reject(new Error("Kernel connection disconnected")),
                this.connectionStatusChanged.disconnect(t, this));
          };
        return (
          this.connectionStatusChanged.connect(t, this),
          (this._reconnectAttempt = 0),
          this._reconnect(),
          e.promise
        );
      }
      async shutdown() {
        this.status !== "dead" &&
          (await Wn.shutdownKernel(this.id, this.serverSettings)),
          this.handleShutdown();
      }
      handleShutdown() {
        this._updateStatus("dead"), this.dispose();
      }
      async requestKernelInfo() {
        let e = Pe.createMessage({
            msgType: "kernel_info_request",
            channel: "shell",
            username: this._username,
            session: this._clientId,
            content: {},
          }),
          t;
        try {
          t = await Le.handleShellMessage(this, e);
        } catch (r) {
          if (this.isDisposed) return;
          throw r;
        }
        if ((this._errorIfDisposed(), !!t))
          return (
            t.content.status === void 0 && (t.content.status = "ok"),
            t.content.status !== "ok"
              ? (this._info.reject("Kernel info reply errored"), t)
              : (this._info.resolve(t.content),
                (this._kernelSession = t.header.session),
                t)
          );
      }
      requestComplete(e) {
        let t = Pe.createMessage({
          msgType: "complete_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content: e,
        });
        return Le.handleShellMessage(this, t);
      }
      requestInspect(e) {
        let t = Pe.createMessage({
          msgType: "inspect_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content: e,
        });
        return Le.handleShellMessage(this, t);
      }
      requestHistory(e) {
        let t = Pe.createMessage({
          msgType: "history_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content: e,
        });
        return Le.handleShellMessage(this, t);
      }
      requestExecute(e, t = !0, r) {
        let i = {
            silent: !1,
            store_history: !0,
            user_expressions: {},
            allow_stdin: !0,
            stop_on_error: !1,
          },
          s = Pe.createMessage({
            msgType: "execute_request",
            channel: "shell",
            username: this._username,
            session: this._clientId,
            content: Object.assign(Object.assign({}, i), e),
            metadata: r,
          });
        return this.sendShellMessage(s, !0, t);
      }
      requestDebug(e, t = !0) {
        let r = Pe.createMessage({
          msgType: "debug_request",
          channel: "control",
          username: this._username,
          session: this._clientId,
          content: e,
        });
        return this.sendControlMessage(r, !0, t);
      }
      requestIsComplete(e) {
        let t = Pe.createMessage({
          msgType: "is_complete_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content: e,
        });
        return Le.handleShellMessage(this, t);
      }
      requestCommInfo(e) {
        let t = Pe.createMessage({
          msgType: "comm_info_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content: e,
        });
        return Le.handleShellMessage(this, t);
      }
      sendInputReply(e) {
        let t = Pe.createMessage({
          msgType: "input_reply",
          channel: "stdin",
          username: this._username,
          session: this._clientId,
          content: e,
        });
        this._sendMessage(t),
          this._anyMessage.emit({ msg: t, direction: "send" });
      }
      createComm(e, t = it.UUID.uuid4()) {
        if (!this.handleComms)
          throw new Error("Comms are disabled on this kernel connection");
        if (this._comms.has(t)) throw new Error("Comm is already created");
        let r = new Jo.CommHandler(e, t, this, () => {
          this._unregisterComm(t);
        });
        return this._comms.set(t, r), r;
      }
      hasComm(e) {
        return this._comms.has(e);
      }
      registerCommTarget(e, t) {
        this.handleComms && (this._targetRegistry[e] = t);
      }
      removeCommTarget(e, t) {
        this.handleComms &&
          !this.isDisposed &&
          this._targetRegistry[e] === t &&
          delete this._targetRegistry[e];
      }
      registerMessageHook(e, t) {
        var r;
        let i =
          (r = this._futures) === null || r === void 0 ? void 0 : r.get(e);
        i && i.registerMessageHook(t);
      }
      removeMessageHook(e, t) {
        var r;
        let i =
          (r = this._futures) === null || r === void 0 ? void 0 : r.get(e);
        i && i.removeMessageHook(t);
      }
      async _handleDisplayId(e, t) {
        var r, i;
        let s = t.parent_header.msg_id,
          o = this._displayIdToParentIds.get(e);
        if (o) {
          let l = {
            header: it.JSONExt.deepCopy(t.header),
            parent_header: it.JSONExt.deepCopy(t.parent_header),
            metadata: it.JSONExt.deepCopy(t.metadata),
            content: it.JSONExt.deepCopy(t.content),
            channel: t.channel,
            buffers: t.buffers ? t.buffers.slice() : [],
          };
          (l.header.msg_type = "update_display_data"),
            await Promise.all(
              o.map(async (u) => {
                let f = this._futures && this._futures.get(u);
                f && (await f.handleMsg(l));
              })
            );
        }
        if (t.header.msg_type === "update_display_data") return !0;
        (o =
          (r = this._displayIdToParentIds.get(e)) !== null && r !== void 0
            ? r
            : []),
          o.indexOf(s) === -1 && o.push(s),
          this._displayIdToParentIds.set(e, o);
        let a =
          (i = this._msgIdToDisplayIds.get(s)) !== null && i !== void 0
            ? i
            : [];
        return (
          a.indexOf(s) === -1 && a.push(s),
          this._msgIdToDisplayIds.set(s, a),
          !1
        );
      }
      _clearSocket() {
        this._ws !== null &&
          ((this._ws.onopen = this._noOp),
          (this._ws.onclose = this._noOp),
          (this._ws.onerror = this._noOp),
          (this._ws.onmessage = this._noOp),
          this._ws.close(),
          (this._ws = null));
      }
      _updateStatus(e) {
        this._status === e ||
          this._status === "dead" ||
          ((this._status = e),
          Le.logKernelStatus(this),
          this._statusChanged.emit(e),
          e === "dead" && this.dispose());
      }
      _sendPending() {
        for (
          ;
          this.connectionStatus === "connected" &&
          this._kernelSession !== Tt &&
          this._pendingMessages.length > 0;

        )
          this._sendMessage(this._pendingMessages[0], !1),
            this._pendingMessages.shift();
      }
      _clearKernelState() {
        (this._kernelSession = ""),
          (this._pendingMessages = []),
          this._futures.forEach((e) => {
            e.dispose();
          }),
          this._comms.forEach((e) => {
            e.dispose();
          }),
          (this._msgChain = Promise.resolve()),
          (this._futures = new Map()),
          (this._comms = new Map()),
          this._displayIdToParentIds.clear(),
          this._msgIdToDisplayIds.clear();
      }
      _assertCurrentMessage(e) {
        if ((this._errorIfDisposed(), e.header.session !== this._kernelSession))
          throw new Error(
            `Canceling handling of old message: ${e.header.msg_type}`
          );
      }
      async _handleCommOpen(e) {
        this._assertCurrentMessage(e);
        let t = e.content,
          r = new Jo.CommHandler(t.target_name, t.comm_id, this, () => {
            this._unregisterComm(t.comm_id);
          });
        this._comms.set(t.comm_id, r);
        try {
          await (
            await Le.loadObject(
              t.target_name,
              t.target_module,
              this._targetRegistry
            )
          )(r, e);
        } catch (i) {
          throw (r.close(), console.error("Exception opening new comm"), i);
        }
      }
      async _handleCommClose(e) {
        this._assertCurrentMessage(e);
        let t = e.content,
          r = this._comms.get(t.comm_id);
        if (!r) {
          console.error("Comm not found for comm id " + t.comm_id);
          return;
        }
        this._unregisterComm(r.commId);
        let i = r.onClose;
        i && (await i(e)), r.dispose();
      }
      async _handleCommMsg(e) {
        this._assertCurrentMessage(e);
        let t = e.content,
          r = this._comms.get(t.comm_id);
        if (!r) return;
        let i = r.onMsg;
        i && (await i(e));
      }
      _unregisterComm(e) {
        this._comms.delete(e);
      }
      _updateConnectionStatus(e) {
        if (this._connectionStatus !== e) {
          if (
            ((this._connectionStatus = e),
            e !== "connecting" &&
              ((this._reconnectAttempt = 0),
              clearTimeout(this._reconnectTimeout)),
            this.status !== "dead")
          )
            if (e === "connected") {
              let t = this._kernelSession === Tt,
                r = this.requestKernelInfo(),
                i = !1,
                s = () => {
                  i ||
                    ((i = !0),
                    t &&
                      this._kernelSession === Tt &&
                      (this._kernelSession = ""),
                    clearTimeout(o),
                    this._pendingMessages.length > 0 && this._sendPending());
                };
              r.then(s);
              let o = setTimeout(s, Oc);
            } else this._updateStatus("unknown");
          this._connectionStatusChanged.emit(e);
        }
      }
      async _handleMessage(e) {
        var t, r;
        let i = !1;
        if (
          e.parent_header &&
          e.channel === "iopub" &&
          (Pe.isDisplayDataMsg(e) ||
            Pe.isUpdateDisplayDataMsg(e) ||
            Pe.isExecuteResultMsg(e))
        ) {
          let o = ((t = e.content.transient) !== null && t !== void 0 ? t : {})
            .display_id;
          o &&
            ((i = await this._handleDisplayId(o, e)),
            this._assertCurrentMessage(e));
        }
        if (!i && e.parent_header) {
          let s = e.parent_header,
            o =
              (r = this._futures) === null || r === void 0
                ? void 0
                : r.get(s.msg_id);
          if (o) await o.handleMsg(e), this._assertCurrentMessage(e);
          else {
            let a = s.session === this.clientId;
            e.channel !== "iopub" && a && this._unhandledMessage.emit(e);
          }
        }
        if (e.channel === "iopub") {
          switch (e.header.msg_type) {
            case "status": {
              let s = e.content.execution_state;
              s === "restarting" &&
                Promise.resolve().then(async () => {
                  this._updateStatus("autorestarting"),
                    this._clearKernelState(),
                    await this.reconnect();
                }),
                this._updateStatus(s);
              break;
            }
            case "comm_open":
              this.handleComms && (await this._handleCommOpen(e));
              break;
            case "comm_msg":
              this.handleComms && (await this._handleCommMsg(e));
              break;
            case "comm_close":
              this.handleComms && (await this._handleCommClose(e));
              break;
            default:
              break;
          }
          this.isDisposed ||
            (this._assertCurrentMessage(e), this._iopubMessage.emit(e));
        }
      }
      _reconnect() {
        if (
          (this._errorIfDisposed(),
          clearTimeout(this._reconnectTimeout),
          this._reconnectAttempt < this._reconnectLimit)
        ) {
          this._updateConnectionStatus("connecting");
          let e = Le.getRandomIntInclusive(
            0,
            1e3 * (Math.pow(2, this._reconnectAttempt) - 1)
          );
          console.warn(
            `Connection lost, reconnecting in ${Math.floor(e / 1e3)} seconds.`
          ),
            (this._reconnectTimeout = setTimeout(this._createSocket, e)),
            (this._reconnectAttempt += 1);
        } else this._updateConnectionStatus("disconnected");
        this._clearSocket();
      }
      _errorIfDisposed() {
        if (this.isDisposed) throw new Error("Kernel connection is disposed");
      }
    };
  Je.KernelConnection = hi;
  var Le;
  (function (n) {
    function e(s) {
      switch (s.status) {
        case "idle":
        case "busy":
        case "unknown":
          return;
        default:
          console.debug(`Kernel: ${s.status} (${s.id})`);
          break;
      }
    }
    n.logKernelStatus = e;
    async function t(s, o) {
      return s.sendShellMessage(o, !0).done;
    }
    n.handleShellMessage = t;
    function r(s, o, a) {
      return new Promise((l, u) => {
        if (o) {
          if (typeof requirejs == "undefined")
            throw new Error("requirejs not found");
          requirejs(
            [o],
            (f) => {
              if (f[s] === void 0) {
                let c = `Object '${s}' not found in module '${o}'`;
                u(new Error(c));
              } else l(f[s]);
            },
            u
          );
        } else
          a != null && a[s]
            ? l(a[s])
            : u(new Error(`Object '${s}' not found in registry`));
      });
    }
    n.loadObject = r;
    function i(s, o) {
      return (
        (s = Math.ceil(s)),
        (o = Math.floor(o)),
        Math.floor(Math.random() * (o - s + 1)) + s
      );
    }
    n.getRandomIntInclusive = i;
  })(Le || (Le = {}));
});
var Xo = k((Vn) => {
  "use strict";
  h();
  Object.defineProperty(Vn, "__esModule", { value: !0 });
  Vn.KernelManager = void 0;
  var zo = ct(),
    Lc = Qt(),
    Yo = ce(),
    kc = Ve(),
    xc = Zt(),
    qn = Nn(),
    jc = fi(),
    pi = class extends xc.BaseManager {
      constructor(e = {}) {
        var t;
        super(e),
          (this._isReady = !1),
          (this._kernelConnections = new Set()),
          (this._models = new Map()),
          (this._runningChanged = new Yo.Signal(this)),
          (this._connectionFailure = new Yo.Signal(this)),
          (this._pollModels = new Lc.Poll({
            auto: !1,
            factory: () => this.requestRunning(),
            frequency: { interval: 10 * 1e3, backoff: !0, max: 300 * 1e3 },
            name: "@jupyterlab/services:KernelManager#models",
            standby:
              (t = e.standby) !== null && t !== void 0 ? t : "when-hidden",
          })),
          (this._ready = (async () => {
            await this._pollModels.start(),
              await this._pollModels.tick,
              (this._isReady = !0);
          })());
      }
      get isReady() {
        return this._isReady;
      }
      get ready() {
        return this._ready;
      }
      get runningChanged() {
        return this._runningChanged;
      }
      get connectionFailure() {
        return this._connectionFailure;
      }
      dispose() {
        this.isDisposed ||
          (this._models.clear(),
          this._kernelConnections.forEach((e) => e.dispose()),
          this._pollModels.dispose(),
          super.dispose());
      }
      connectTo(e) {
        var t;
        let { id: r } = e.model,
          i = (t = e.handleComms) !== null && t !== void 0 ? t : !0;
        if (e.handleComms === void 0) {
          for (let o of this._kernelConnections)
            if (o.id === r && o.handleComms) {
              i = !1;
              break;
            }
        }
        let s = new jc.KernelConnection(
          Object.assign(Object.assign({ handleComms: i }, e), {
            serverSettings: this.serverSettings,
          })
        );
        return (
          this._onStarted(s),
          this._models.has(r) || this.refreshRunning().catch(() => {}),
          s
        );
      }
      running() {
        return zo.iter([...this._models.values()]);
      }
      async refreshRunning() {
        await this._pollModels.refresh(), await this._pollModels.tick;
      }
      async startNew(e = {}, t = {}) {
        let r = await qn.startNew(e, this.serverSettings);
        return this.connectTo(
          Object.assign(Object.assign({}, t), { model: r })
        );
      }
      async shutdown(e) {
        await qn.shutdownKernel(e, this.serverSettings),
          await this.refreshRunning();
      }
      async shutdownAll() {
        await this.refreshRunning(),
          await Promise.all(
            [...this._models.keys()].map((e) =>
              qn.shutdownKernel(e, this.serverSettings)
            )
          ),
          await this.refreshRunning();
      }
      async findById(e) {
        return this._models.has(e)
          ? this._models.get(e)
          : (await this.refreshRunning(), this._models.get(e));
      }
      async requestRunning() {
        var e, t;
        let r;
        try {
          r = await qn.listRunning(this.serverSettings);
        } catch (i) {
          throw (
            ((i instanceof kc.ServerConnection.NetworkError ||
              ((e = i.response) === null || e === void 0
                ? void 0
                : e.status) === 503 ||
              ((t = i.response) === null || t === void 0
                ? void 0
                : t.status) === 424) &&
              this._connectionFailure.emit(i),
            i)
          );
        }
        this.isDisposed ||
          (this._models.size === r.length &&
            zo.every(r, (i) => {
              let s = this._models.get(i.id);
              return s ? s.name === i.name : !1;
            })) ||
          ((this._models = new Map(r.map((i) => [i.id, i]))),
          this._kernelConnections.forEach((i) => {
            this._models.has(i.id) || i.handleShutdown();
          }),
          this._runningChanged.emit(r));
      }
      _onStarted(e) {
        this._kernelConnections.add(e),
          e.statusChanged.connect(this._onStatusChanged, this),
          e.disposed.connect(this._onDisposed, this);
      }
      _onDisposed(e) {
        this._kernelConnections.delete(e),
          this.refreshRunning().catch(() => {});
      }
      _onStatusChanged(e, t) {
        t === "dead" && this.refreshRunning().catch(() => {});
      }
    };
  Vn.KernelManager = pi;
});
var _i = k((he) => {
  "use strict";
  h();
  var Qo =
      (he && he.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    Fc =
      (he && he.__setModuleDefault) ||
      (Object.create
        ? function (n, e) {
            Object.defineProperty(n, "default", { enumerable: !0, value: e });
          }
        : function (n, e) {
            n.default = e;
          }),
    gi =
      (he && he.__importStar) ||
      function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (n != null)
          for (var t in n)
            t !== "default" &&
              Object.prototype.hasOwnProperty.call(n, t) &&
              Qo(e, n, t);
        return Fc(e, n), e;
      },
    Uc =
      (he && he.__exportStar) ||
      function (n, e) {
        for (var t in n)
          t !== "default" &&
            !Object.prototype.hasOwnProperty.call(e, t) &&
            Qo(e, n, t);
      };
  Object.defineProperty(he, "__esModule", { value: !0 });
  he.KernelAPI = he.KernelMessage = he.Kernel = void 0;
  var Wc = gi(Co());
  he.Kernel = Wc;
  var Kc = gi(Xt());
  he.KernelMessage = Kc;
  var qc = gi(Nn());
  he.KernelAPI = qc;
  Uc(Xo(), he);
});
var Zo = k((Bn) => {
  "use strict";
  h();
  Object.defineProperty(Bn, "__esModule", { value: !0 });
  Bn.BuildManager = void 0;
  var mi = Ie(),
    st = De(),
    Vc = "api/build",
    vi = class {
      constructor(e = {}) {
        var t;
        (this._url = ""),
          (this.serverSettings =
            (t = e.serverSettings) !== null && t !== void 0
              ? t
              : st.ServerConnection.makeSettings());
        let { baseUrl: r, appUrl: i } = this.serverSettings;
        this._url = mi.URLExt.join(r, i, Vc);
      }
      get isAvailable() {
        return (
          mi.PageConfig.getOption("buildAvailable").toLowerCase() === "true"
        );
      }
      get shouldCheck() {
        return mi.PageConfig.getOption("buildCheck").toLowerCase() === "true";
      }
      getStatus() {
        let { _url: e, serverSettings: t } = this;
        return st.ServerConnection.makeRequest(e, {}, t)
          .then((i) => {
            if (i.status !== 200)
              throw new st.ServerConnection.ResponseError(i);
            return i.json();
          })
          .then((i) => {
            if (typeof i.status != "string") throw new Error("Invalid data");
            if (typeof i.message != "string") throw new Error("Invalid data");
            return i;
          });
      }
      build() {
        let { _url: e, serverSettings: t } = this,
          r = { method: "POST" };
        return st.ServerConnection.makeRequest(e, r, t).then((s) => {
          if (s.status === 400)
            throw new st.ServerConnection.ResponseError(s, "Build aborted");
          if (s.status !== 200) {
            let o = `Build failed with ${s.status}, please run 'jupyter lab build' on the server for full output`;
            throw new st.ServerConnection.ResponseError(s, o);
          }
        });
      }
      cancel() {
        let { _url: e, serverSettings: t } = this,
          r = { method: "DELETE" };
        return st.ServerConnection.makeRequest(e, r, t).then((s) => {
          if (s.status !== 204) throw new st.ServerConnection.ResponseError(s);
        });
      }
    };
  Bn.BuildManager = vi;
});
var bi = k((Hn) => {
  "use strict";
  h();
  Object.defineProperty(Hn, "__esModule", { value: !0 });
  Hn.NbConvertManager = void 0;
  var Bc = Ie(),
    yi = De(),
    Hc = "api/nbconvert",
    Ei = class {
      constructor(e = {}) {
        var t;
        this.serverSettings =
          (t = e.serverSettings) !== null && t !== void 0
            ? t
            : yi.ServerConnection.makeSettings();
      }
      async getExportFormats() {
        let e = this.serverSettings.baseUrl,
          t = Bc.URLExt.join(e, Hc),
          { serverSettings: r } = this,
          i = await yi.ServerConnection.makeRequest(t, {}, r);
        if (i.status !== 200)
          throw await yi.ServerConnection.ResponseError.create(i);
        let s = await i.json(),
          o = {};
        return (
          Object.keys(s).forEach(function (l) {
            let u = s[l].output_mimetype;
            o[l] = { output_mimetype: u };
          }),
          o
        );
      }
    };
  Hn.NbConvertManager = Ei;
});
var ta = k((ea) => {
  "use strict";
  h();
  Object.defineProperty(ea, "__esModule", { value: !0 });
});
var ra = k((ot) => {
  "use strict";
  h();
  Object.defineProperty(ot, "__esModule", { value: !0 });
  ot.validateModels = ot.updateLegacySessionModel = ot.validateModel = void 0;
  var $c = Tn(),
    tn = Yt();
  function na(n) {
    tn.validateProperty(n, "id", "string"),
      tn.validateProperty(n, "type", "string"),
      tn.validateProperty(n, "name", "string"),
      tn.validateProperty(n, "path", "string"),
      tn.validateProperty(n, "kernel", "object"),
      $c.validateModel(n.kernel);
  }
  ot.validateModel = na;
  function Jc(n) {
    n.path === void 0 &&
      n.notebook !== void 0 &&
      ((n.path = n.notebook.path), (n.type = "notebook"), (n.name = ""));
  }
  ot.updateLegacySessionModel = Jc;
  function Gc(n) {
    if (!Array.isArray(n)) throw new Error("Invalid session list");
    n.forEach((e) => na(e));
  }
  ot.validateModels = Gc;
});
var Jn = k((ae) => {
  "use strict";
  h();
  Object.defineProperty(ae, "__esModule", { value: !0 });
  ae.updateSession =
    ae.startSession =
    ae.getSessionModel =
    ae.shutdownSession =
    ae.getSessionUrl =
    ae.listRunning =
    ae.SESSION_SERVICE_URL =
      void 0;
  var ge = De(),
    Si = Ie(),
    at = ra();
  ae.SESSION_SERVICE_URL = "api/sessions";
  async function zc(n = ge.ServerConnection.makeSettings()) {
    let e = Si.URLExt.join(n.baseUrl, ae.SESSION_SERVICE_URL),
      t = await ge.ServerConnection.makeRequest(e, {}, n);
    if (t.status !== 200)
      throw await ge.ServerConnection.ResponseError.create(t);
    let r = await t.json();
    if (!Array.isArray(r)) throw new Error("Invalid Session list");
    return (
      r.forEach((i) => {
        at.updateLegacySessionModel(i), at.validateModel(i);
      }),
      r
    );
  }
  ae.listRunning = zc;
  function $n(n, e) {
    return Si.URLExt.join(n, ae.SESSION_SERVICE_URL, e);
  }
  ae.getSessionUrl = $n;
  async function Yc(n, e = ge.ServerConnection.makeSettings()) {
    var t;
    let r = $n(e.baseUrl, n),
      i = { method: "DELETE" },
      s = await ge.ServerConnection.makeRequest(r, i, e);
    if (s.status === 404) {
      let a =
        (t = (await s.json()).message) !== null && t !== void 0
          ? t
          : `The session "${n}"" does not exist on the server`;
      console.warn(a);
    } else {
      if (s.status === 410)
        throw new ge.ServerConnection.ResponseError(
          s,
          "The kernel was deleted but the session was not"
        );
      if (s.status !== 204)
        throw await ge.ServerConnection.ResponseError.create(s);
    }
  }
  ae.shutdownSession = Yc;
  async function Xc(n, e = ge.ServerConnection.makeSettings()) {
    let t = $n(e.baseUrl, n),
      r = await ge.ServerConnection.makeRequest(t, {}, e);
    if (r.status !== 200)
      throw await ge.ServerConnection.ResponseError.create(r);
    let i = await r.json();
    return at.updateLegacySessionModel(i), at.validateModel(i), i;
  }
  ae.getSessionModel = Xc;
  async function Qc(n, e = ge.ServerConnection.makeSettings()) {
    let t = Si.URLExt.join(e.baseUrl, ae.SESSION_SERVICE_URL),
      r = { method: "POST", body: JSON.stringify(n) },
      i = await ge.ServerConnection.makeRequest(t, r, e);
    if (i.status !== 201)
      throw await ge.ServerConnection.ResponseError.create(i);
    let s = await i.json();
    return at.updateLegacySessionModel(s), at.validateModel(s), s;
  }
  ae.startSession = Qc;
  async function Zc(n, e = ge.ServerConnection.makeSettings()) {
    let t = $n(e.baseUrl, n.id),
      r = { method: "PATCH", body: JSON.stringify(n) },
      i = await ge.ServerConnection.makeRequest(t, r, e);
    if (i.status !== 200)
      throw await ge.ServerConnection.ResponseError.create(i);
    let s = await i.json();
    return at.updateLegacySessionModel(s), at.validateModel(s), s;
  }
  ae.updateSession = Zc;
});
var sa = k((Gn) => {
  "use strict";
  h();
  Object.defineProperty(Gn, "__esModule", { value: !0 });
  Gn.SessionConnection = void 0;
  var Qe = ce(),
    ed = Ve(),
    ia = Jn(),
    td = Ne(),
    wi = class {
      constructor(e) {
        var t, r, i, s;
        (this._id = ""),
          (this._path = ""),
          (this._name = ""),
          (this._type = ""),
          (this._kernel = null),
          (this._isDisposed = !1),
          (this._disposed = new Qe.Signal(this)),
          (this._kernelChanged = new Qe.Signal(this)),
          (this._statusChanged = new Qe.Signal(this)),
          (this._connectionStatusChanged = new Qe.Signal(this)),
          (this._iopubMessage = new Qe.Signal(this)),
          (this._unhandledMessage = new Qe.Signal(this)),
          (this._anyMessage = new Qe.Signal(this)),
          (this._propertyChanged = new Qe.Signal(this)),
          (this._id = e.model.id),
          (this._name = e.model.name),
          (this._path = e.model.path),
          (this._type = e.model.type),
          (this._username = (t = e.username) !== null && t !== void 0 ? t : ""),
          (this._clientId =
            (r = e.clientId) !== null && r !== void 0 ? r : td.UUID.uuid4()),
          (this._connectToKernel = e.connectToKernel),
          (this._kernelConnectionOptions =
            (i = e.kernelConnectionOptions) !== null && i !== void 0 ? i : {}),
          (this.serverSettings =
            (s = e.serverSettings) !== null && s !== void 0
              ? s
              : ed.ServerConnection.makeSettings()),
          this.setupKernel(e.model.kernel);
      }
      get disposed() {
        return this._disposed;
      }
      get kernelChanged() {
        return this._kernelChanged;
      }
      get statusChanged() {
        return this._statusChanged;
      }
      get connectionStatusChanged() {
        return this._connectionStatusChanged;
      }
      get iopubMessage() {
        return this._iopubMessage;
      }
      get unhandledMessage() {
        return this._unhandledMessage;
      }
      get anyMessage() {
        return this._anyMessage;
      }
      get propertyChanged() {
        return this._propertyChanged;
      }
      get id() {
        return this._id;
      }
      get kernel() {
        return this._kernel;
      }
      get path() {
        return this._path;
      }
      get type() {
        return this._type;
      }
      get name() {
        return this._name;
      }
      get model() {
        return {
          id: this.id,
          kernel: this.kernel && { id: this.kernel.id, name: this.kernel.name },
          path: this._path,
          type: this._type,
          name: this._name,
        };
      }
      get isDisposed() {
        return this._isDisposed;
      }
      update(e) {
        let t = this.model;
        if (
          ((this._path = e.path),
          (this._name = e.name),
          (this._type = e.type),
          (this._kernel === null && e.kernel !== null) ||
            (this._kernel !== null && e.kernel === null) ||
            (this._kernel !== null &&
              e.kernel !== null &&
              this._kernel.id !== e.kernel.id))
        ) {
          this._kernel !== null && this._kernel.dispose();
          let r = this._kernel || null;
          this.setupKernel(e.kernel);
          let i = this._kernel || null;
          this._kernelChanged.emit({
            name: "kernel",
            oldValue: r,
            newValue: i,
          });
        }
        this._handleModelChange(t);
      }
      dispose() {
        if (!this.isDisposed) {
          if (((this._isDisposed = !0), this._disposed.emit(), this._kernel)) {
            this._kernel.dispose();
            let e = this._kernel;
            this._kernel = null;
            let t = this._kernel;
            this._kernelChanged.emit({
              name: "kernel",
              oldValue: e,
              newValue: t,
            });
          }
          Qe.Signal.clearData(this);
        }
      }
      async setPath(e) {
        if (this.isDisposed) throw new Error("Session is disposed");
        await this._patch({ path: e });
      }
      async setName(e) {
        if (this.isDisposed) throw new Error("Session is disposed");
        await this._patch({ name: e });
      }
      async setType(e) {
        if (this.isDisposed) throw new Error("Session is disposed");
        await this._patch({ type: e });
      }
      async changeKernel(e) {
        if (this.isDisposed) throw new Error("Session is disposed");
        return await this._patch({ kernel: e }), this.kernel;
      }
      async shutdown() {
        if (this.isDisposed) throw new Error("Session is disposed");
        await ia.shutdownSession(this.id, this.serverSettings), this.dispose();
      }
      setupKernel(e) {
        if (e === null) {
          this._kernel = null;
          return;
        }
        let t = this._connectToKernel(
          Object.assign(Object.assign({}, this._kernelConnectionOptions), {
            model: e,
            username: this._username,
            clientId: this._clientId,
            serverSettings: this.serverSettings,
          })
        );
        (this._kernel = t),
          t.statusChanged.connect(this.onKernelStatus, this),
          t.connectionStatusChanged.connect(
            this.onKernelConnectionStatus,
            this
          ),
          t.unhandledMessage.connect(this.onUnhandledMessage, this),
          t.iopubMessage.connect(this.onIOPubMessage, this),
          t.anyMessage.connect(this.onAnyMessage, this);
      }
      onKernelStatus(e, t) {
        this._statusChanged.emit(t);
      }
      onKernelConnectionStatus(e, t) {
        this._connectionStatusChanged.emit(t);
      }
      onIOPubMessage(e, t) {
        this._iopubMessage.emit(t);
      }
      onUnhandledMessage(e, t) {
        this._unhandledMessage.emit(t);
      }
      onAnyMessage(e, t) {
        this._anyMessage.emit(t);
      }
      async _patch(e) {
        let t = await ia.updateSession(
          Object.assign(Object.assign({}, e), { id: this._id }),
          this.serverSettings
        );
        return this.update(t), t;
      }
      _handleModelChange(e) {
        e.name !== this._name && this._propertyChanged.emit("name"),
          e.type !== this._type && this._propertyChanged.emit("type"),
          e.path !== this._path && this._propertyChanged.emit("path");
      }
    };
  Gn.SessionConnection = wi;
});
var la = k((zn) => {
  "use strict";
  h();
  Object.defineProperty(zn, "__esModule", { value: !0 });
  zn.SessionManager = void 0;
  var oa = ct(),
    nd = Qt(),
    aa = ce(),
    rd = De(),
    id = Zt(),
    sd = sa(),
    nn = Jn(),
    Ii = class extends id.BaseManager {
      constructor(e) {
        var t;
        super(e),
          (this._isReady = !1),
          (this._sessionConnections = new Set()),
          (this._models = new Map()),
          (this._runningChanged = new aa.Signal(this)),
          (this._connectionFailure = new aa.Signal(this)),
          (this._connectToKernel = (r) => this._kernelManager.connectTo(r)),
          (this._kernelManager = e.kernelManager),
          (this._pollModels = new nd.Poll({
            auto: !1,
            factory: () => this.requestRunning(),
            frequency: { interval: 10 * 1e3, backoff: !0, max: 300 * 1e3 },
            name: "@jupyterlab/services:SessionManager#models",
            standby:
              (t = e.standby) !== null && t !== void 0 ? t : "when-hidden",
          })),
          (this._ready = (async () => {
            await this._pollModels.start(),
              await this._pollModels.tick,
              await this._kernelManager.ready,
              (this._isReady = !0);
          })());
      }
      get isReady() {
        return this._isReady;
      }
      get ready() {
        return this._ready;
      }
      get runningChanged() {
        return this._runningChanged;
      }
      get connectionFailure() {
        return this._connectionFailure;
      }
      dispose() {
        this.isDisposed ||
          (this._models.clear(),
          this._sessionConnections.forEach((e) => e.dispose()),
          this._pollModels.dispose(),
          super.dispose());
      }
      connectTo(e) {
        let t = new sd.SessionConnection(
          Object.assign(Object.assign({}, e), {
            connectToKernel: this._connectToKernel,
            serverSettings: this.serverSettings,
          })
        );
        return (
          this._onStarted(t),
          this._models.has(e.model.id) || this.refreshRunning().catch(() => {}),
          t
        );
      }
      running() {
        return oa.iter([...this._models.values()]);
      }
      async refreshRunning() {
        await this._pollModels.refresh(), await this._pollModels.tick;
      }
      async startNew(e, t = {}) {
        let r = await nn.startSession(e, this.serverSettings);
        return (
          await this.refreshRunning(),
          this.connectTo(Object.assign(Object.assign({}, t), { model: r }))
        );
      }
      async shutdown(e) {
        await nn.shutdownSession(e, this.serverSettings),
          await this.refreshRunning();
      }
      async shutdownAll() {
        await this.refreshRunning(),
          await Promise.all(
            [...this._models.keys()].map((e) =>
              nn.shutdownSession(e, this.serverSettings)
            )
          ),
          await this.refreshRunning();
      }
      async stopIfNeeded(e) {
        try {
          let r = (await nn.listRunning(this.serverSettings)).filter(
            (i) => i.path === e
          );
          if (r.length === 1) {
            let i = r[0].id;
            await this.shutdown(i);
          }
        } catch (t) {}
      }
      async findById(e) {
        return this._models.has(e)
          ? this._models.get(e)
          : (await this.refreshRunning(), this._models.get(e));
      }
      async findByPath(e) {
        for (let t of this._models.values()) if (t.path === e) return t;
        await this.refreshRunning();
        for (let t of this._models.values()) if (t.path === e) return t;
      }
      async requestRunning() {
        var e, t;
        let r;
        try {
          r = await nn.listRunning(this.serverSettings);
        } catch (i) {
          throw (
            ((i instanceof rd.ServerConnection.NetworkError ||
              ((e = i.response) === null || e === void 0
                ? void 0
                : e.status) === 503 ||
              ((t = i.response) === null || t === void 0
                ? void 0
                : t.status) === 424) &&
              this._connectionFailure.emit(i),
            i)
          );
        }
        this.isDisposed ||
          (this._models.size === r.length &&
            oa.every(r, (i) => {
              var s, o, a, l;
              let u = this._models.get(i.id);
              return u
                ? ((s = u.kernel) === null || s === void 0 ? void 0 : s.id) ===
                    ((o = i.kernel) === null || o === void 0 ? void 0 : o.id) &&
                    ((a = u.kernel) === null || a === void 0
                      ? void 0
                      : a.name) ===
                      ((l = i.kernel) === null || l === void 0
                        ? void 0
                        : l.name) &&
                    u.name === i.name &&
                    u.path === i.path &&
                    u.type === i.type
                : !1;
            })) ||
          ((this._models = new Map(r.map((i) => [i.id, i]))),
          this._sessionConnections.forEach((i) => {
            this._models.has(i.id)
              ? i.update(this._models.get(i.id))
              : i.dispose();
          }),
          this._runningChanged.emit(r));
      }
      _onStarted(e) {
        this._sessionConnections.add(e),
          e.disposed.connect(this._onDisposed, this),
          e.propertyChanged.connect(this._onChanged, this),
          e.kernelChanged.connect(this._onChanged, this);
      }
      _onDisposed(e) {
        this._sessionConnections.delete(e),
          this.refreshRunning().catch(() => {});
      }
      _onChanged() {
        this.refreshRunning().catch(() => {});
      }
    };
  zn.SessionManager = Ii;
});
var Ci = k((ve) => {
  "use strict";
  h();
  var ua =
      (ve && ve.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    od =
      (ve && ve.__setModuleDefault) ||
      (Object.create
        ? function (n, e) {
            Object.defineProperty(n, "default", { enumerable: !0, value: e });
          }
        : function (n, e) {
            n.default = e;
          }),
    ca =
      (ve && ve.__importStar) ||
      function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (n != null)
          for (var t in n)
            t !== "default" &&
              Object.prototype.hasOwnProperty.call(n, t) &&
              ua(e, n, t);
        return od(e, n), e;
      },
    ad =
      (ve && ve.__exportStar) ||
      function (n, e) {
        for (var t in n)
          t !== "default" &&
            !Object.prototype.hasOwnProperty.call(e, t) &&
            ua(e, n, t);
      };
  Object.defineProperty(ve, "__esModule", { value: !0 });
  ve.SessionAPI = ve.Session = void 0;
  var ld = ca(ta());
  ve.Session = ld;
  var ud = ca(Jn());
  ve.SessionAPI = ud;
  ad(la(), ve);
});
var da = k((Yn) => {
  "use strict";
  h();
  Object.defineProperty(Yn, "__esModule", { value: !0 });
  Yn.DataConnector = void 0;
  var Ri = class {
    async list(e) {
      throw new Error("DataConnector#list method has not been implemented.");
    }
    async remove(e) {
      throw new Error("DataConnector#remove method has not been implemented.");
    }
    async save(e, t) {
      throw new Error("DataConnector#save method has not been implemented.");
    }
  };
  Yn.DataConnector = Ri;
});
var fa = k((ha) => {
  "use strict";
  h();
  Object.defineProperty(ha, "__esModule", { value: !0 });
});
var ga = k((Qn) => {
  "use strict";
  h();
  Object.defineProperty(Qn, "__esModule", { value: !0 });
  Qn.RestorablePool = void 0;
  var cd = Ne(),
    pa = xr(),
    Xn = ce(),
    Ai = class {
      constructor(e) {
        (this._added = new Xn.Signal(this)),
          (this._current = null),
          (this._currentChanged = new Xn.Signal(this)),
          (this._hasRestored = !1),
          (this._isDisposed = !1),
          (this._objects = new Set()),
          (this._restore = null),
          (this._restored = new cd.PromiseDelegate()),
          (this._updated = new Xn.Signal(this)),
          (this.namespace = e.namespace);
      }
      get added() {
        return this._added;
      }
      get current() {
        return this._current;
      }
      set current(e) {
        this._current !== e &&
          e !== null &&
          this._objects.has(e) &&
          ((this._current = e), this._currentChanged.emit(this._current));
      }
      get currentChanged() {
        return this._currentChanged;
      }
      get isDisposed() {
        return this._isDisposed;
      }
      get restored() {
        return this._restored.promise;
      }
      get size() {
        return this._objects.size;
      }
      get updated() {
        return this._updated;
      }
      async add(e) {
        var t, r;
        if (e.isDisposed) {
          let i = "A disposed object cannot be added.";
          throw (console.warn(i, e), new Error(i));
        }
        if (this._objects.has(e)) {
          let i = "This object already exists in the pool.";
          throw (console.warn(i, e), new Error(i));
        }
        if (
          (this._objects.add(e),
          e.disposed.connect(this._onInstanceDisposed, this),
          !Ge.injectedProperty.get(e))
        ) {
          if (this._restore) {
            let { connector: i } = this._restore,
              s = this._restore.name(e);
            if (s) {
              let o = `${this.namespace}:${s}`,
                a =
                  (r = (t = this._restore).args) === null || r === void 0
                    ? void 0
                    : r.call(t, e);
              Ge.nameProperty.set(e, o), await i.save(o, { data: a });
            }
          }
          this._added.emit(e);
        }
      }
      dispose() {
        this.isDisposed ||
          ((this._current = null),
          (this._isDisposed = !0),
          this._objects.clear(),
          Xn.Signal.clearData(this));
      }
      find(e) {
        let t = this._objects.values();
        for (let r of t) if (e(r)) return r;
      }
      forEach(e) {
        this._objects.forEach(e);
      }
      filter(e) {
        let t = [];
        return (
          this.forEach((r) => {
            e(r) && t.push(r);
          }),
          t
        );
      }
      inject(e) {
        return Ge.injectedProperty.set(e, !0), this.add(e);
      }
      has(e) {
        return this._objects.has(e);
      }
      async restore(e) {
        if (this._hasRestored)
          throw new Error("This pool has already been restored.");
        this._hasRestored = !0;
        let { command: t, connector: r, registry: i, when: s } = e,
          o = this.namespace,
          a = s ? [r.list(o)].concat(s) : [r.list(o)];
        this._restore = e;
        let [l] = await Promise.all(a),
          u = await Promise.all(
            l.ids.map(async (f, c) => {
              let C = l.values[c],
                M = C && C.data;
              return M === void 0
                ? r.remove(f)
                : i.execute(t, M).catch(() => r.remove(f));
            })
          );
        return this._restored.resolve(), u;
      }
      async save(e) {
        var t, r;
        let i = Ge.injectedProperty.get(e);
        if (!this._restore || !this.has(e) || i) return;
        let { connector: s } = this._restore,
          o = this._restore.name(e),
          a = Ge.nameProperty.get(e),
          l = o ? `${this.namespace}:${o}` : "";
        if (
          (a && a !== l && (await s.remove(a)), Ge.nameProperty.set(e, l), l)
        ) {
          let u =
            (r = (t = this._restore).args) === null || r === void 0
              ? void 0
              : r.call(t, e);
          await s.save(l, { data: u });
        }
        a !== l && this._updated.emit(e);
      }
      _onInstanceDisposed(e) {
        if (
          (this._objects.delete(e),
          e === this._current &&
            ((this._current = null), this._currentChanged.emit(this._current)),
          Ge.injectedProperty.get(e) || !this._restore)
        )
          return;
        let { connector: t } = this._restore,
          r = Ge.nameProperty.get(e);
        r && t.remove(r);
      }
    };
  Qn.RestorablePool = Ai;
  var Ge;
  (function (n) {
    (n.injectedProperty = new pa.AttachedProperty({
      name: "injected",
      create: () => !1,
    })),
      (n.nameProperty = new pa.AttachedProperty({
        name: "name",
        create: () => "",
      }));
  })(Ge || (Ge = {}));
});
var _a = k((Ot) => {
  "use strict";
  h();
  Object.defineProperty(Ot, "__esModule", { value: !0 });
  Ot.StateDB = void 0;
  var dd = ce(),
    Zn = class n {
      constructor(e = {}) {
        this._changed = new dd.Signal(this);
        let { connector: t, transform: r } = e;
        (this._connector = t || new n.Connector()),
          r
            ? (this._ready = r.then((i) => {
                let { contents: s, type: o } = i;
                switch (o) {
                  case "cancel":
                    return;
                  case "clear":
                    return this._clear();
                  case "merge":
                    return this._merge(s || {});
                  case "overwrite":
                    return this._overwrite(s || {});
                  default:
                    return;
                }
              }))
            : (this._ready = Promise.resolve(void 0));
      }
      get changed() {
        return this._changed;
      }
      async clear() {
        await this._ready, await this._clear();
      }
      async fetch(e) {
        return await this._ready, this._fetch(e);
      }
      async list(e) {
        return await this._ready, this._list(e);
      }
      async remove(e) {
        await this._ready,
          await this._remove(e),
          this._changed.emit({ id: e, type: "remove" });
      }
      async save(e, t) {
        await this._ready,
          await this._save(e, t),
          this._changed.emit({ id: e, type: "save" });
      }
      async toJSON() {
        await this._ready;
        let { ids: e, values: t } = await this._list();
        return t.reduce((r, i, s) => ((r[e[s]] = i), r), {});
      }
      async _clear() {
        await Promise.all((await this._list()).ids.map((e) => this._remove(e)));
      }
      async _fetch(e) {
        let t = await this._connector.fetch(e);
        if (t) return JSON.parse(t).v;
      }
      async _list(e = "") {
        let { ids: t, values: r } = await this._connector.list(e);
        return { ids: t, values: r.map((i) => JSON.parse(i).v) };
      }
      async _merge(e) {
        await Promise.all(
          Object.keys(e).map((t) => e[t] && this._save(t, e[t]))
        );
      }
      async _overwrite(e) {
        await this._clear(), await this._merge(e);
      }
      async _remove(e) {
        return this._connector.remove(e);
      }
      async _save(e, t) {
        return this._connector.save(e, JSON.stringify({ v: t }));
      }
    };
  Ot.StateDB = Zn;
  (function (n) {
    class e {
      constructor() {
        this._storage = {};
      }
      async fetch(r) {
        return this._storage[r];
      }
      async list(r = "") {
        return Object.keys(this._storage).reduce(
          (i, s) => (
            (r === "" || r === s.split(":")[0]) &&
              (i.ids.push(s), i.values.push(this._storage[s])),
            i
          ),
          { ids: [], values: [] }
        );
      }
      async remove(r) {
        delete this._storage[r];
      }
      async save(r, i) {
        this._storage[r] = i;
      }
    }
    n.Connector = e;
  })((Zn = Ot.StateDB || (Ot.StateDB = {})));
});
var ma = k((er) => {
  "use strict";
  h();
  Object.defineProperty(er, "__esModule", { value: !0 });
  er.IStateDB = void 0;
  var hd = Ne();
  er.IStateDB = new hd.Token("@jupyterlab/coreutils:IStateDB");
});
var Di = k((ke) => {
  "use strict";
  h();
  var fd =
      (ke && ke.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    rn =
      (ke && ke.__exportStar) ||
      function (n, e) {
        for (var t in n)
          t !== "default" &&
            !Object.prototype.hasOwnProperty.call(e, t) &&
            fd(e, n, t);
      };
  Object.defineProperty(ke, "__esModule", { value: !0 });
  rn(da(), ke);
  rn(fa(), ke);
  rn(ga(), ke);
  rn(_a(), ke);
  rn(ma(), ke);
});
var Mi = k((nr) => {
  "use strict";
  h();
  Object.defineProperty(nr, "__esModule", { value: !0 });
  nr.SettingManager = void 0;
  var pd = Ie(),
    gd = Di(),
    tr = De(),
    _d = "api/settings",
    Pi = class extends gd.DataConnector {
      constructor(e = {}) {
        var t;
        super(),
          (this.serverSettings =
            (t = e.serverSettings) !== null && t !== void 0
              ? t
              : tr.ServerConnection.makeSettings());
      }
      async fetch(e) {
        if (!e)
          throw new Error(
            "Plugin `id` parameter is required for settings fetch."
          );
        let { serverSettings: t } = this,
          { baseUrl: r, appUrl: i } = t,
          { makeRequest: s, ResponseError: o } = tr.ServerConnection,
          a = r + i,
          l = sn.url(a, e),
          u = await s(l, {}, t);
        if (u.status !== 200) throw await o.create(u);
        return u.json();
      }
      async list() {
        var e, t;
        let { serverSettings: r } = this,
          { baseUrl: i, appUrl: s } = r,
          { makeRequest: o, ResponseError: a } = tr.ServerConnection,
          l = i + s,
          u = sn.url(l, ""),
          f = await o(u, {}, r);
        if (f.status !== 200) throw new a(f);
        let c = await f.json(),
          C =
            (t =
              (e = c == null ? void 0 : c.settings) === null || e === void 0
                ? void 0
                : e.map((S) => ((S.data = { composite: {}, user: {} }), S))) !==
              null && t !== void 0
              ? t
              : [];
        return { ids: C.map((S) => S.id), values: C };
      }
      async save(e, t) {
        let { serverSettings: r } = this,
          { baseUrl: i, appUrl: s } = r,
          { makeRequest: o, ResponseError: a } = tr.ServerConnection,
          l = i + s,
          u = sn.url(l, e),
          f = { body: JSON.stringify({ raw: t }), method: "PUT" },
          c = await o(u, f, r);
        if (c.status !== 204) throw new a(c);
      }
    };
  nr.SettingManager = Pi;
  var sn;
  (function (n) {
    function e(t, r) {
      return pd.URLExt.join(t, _d, r);
    }
    n.url = e;
  })(sn || (sn = {}));
});
var an = k((ye) => {
  "use strict";
  h();
  Object.defineProperty(ye, "__esModule", { value: !0 });
  ye.shutdownTerminal =
    ye.listRunning =
    ye.startNew =
    ye.isAvailable =
    ye.TERMINAL_SERVICE_URL =
      void 0;
  var rr = Ie(),
    Ze = De();
  ye.TERMINAL_SERVICE_URL = "api/terminals";
  function va() {
    return (
      String(rr.PageConfig.getOption("terminalsAvailable")).toLowerCase() ===
      "true"
    );
  }
  ye.isAvailable = va;
  async function md(n = Ze.ServerConnection.makeSettings()) {
    on.errorIfNotAvailable();
    let e = rr.URLExt.join(n.baseUrl, ye.TERMINAL_SERVICE_URL),
      t = { method: "POST" },
      r = await Ze.ServerConnection.makeRequest(e, t, n);
    if (r.status !== 200)
      throw await Ze.ServerConnection.ResponseError.create(r);
    return await r.json();
  }
  ye.startNew = md;
  async function vd(n = Ze.ServerConnection.makeSettings()) {
    on.errorIfNotAvailable();
    let e = rr.URLExt.join(n.baseUrl, ye.TERMINAL_SERVICE_URL),
      t = await Ze.ServerConnection.makeRequest(e, {}, n);
    if (t.status !== 200)
      throw await Ze.ServerConnection.ResponseError.create(t);
    let r = await t.json();
    if (!Array.isArray(r)) throw new Error("Invalid terminal list");
    return r;
  }
  ye.listRunning = vd;
  async function yd(n, e = Ze.ServerConnection.makeSettings()) {
    var t;
    on.errorIfNotAvailable();
    let r = rr.URLExt.join(e.baseUrl, ye.TERMINAL_SERVICE_URL, n),
      i = { method: "DELETE" },
      s = await Ze.ServerConnection.makeRequest(r, i, e);
    if (s.status === 404) {
      let a =
        (t = (await s.json()).message) !== null && t !== void 0
          ? t
          : `The terminal session "${n}"" does not exist on the server`;
      console.warn(a);
    } else if (s.status !== 204)
      throw await Ze.ServerConnection.ResponseError.create(s);
  }
  ye.shutdownTerminal = yd;
  var on;
  (function (n) {
    function e() {
      if (!va()) throw new Error("Terminals Unavailable");
    }
    n.errorIfNotAvailable = e;
  })(on || (on = {}));
});
var ya = k((ir) => {
  "use strict";
  h();
  Object.defineProperty(ir, "__esModule", { value: !0 });
  ir.isAvailable = void 0;
  var Ed = an();
  Object.defineProperty(ir, "isAvailable", {
    enumerable: !0,
    get: function () {
      return Ed.isAvailable;
    },
  });
});
var Sa = k((or) => {
  "use strict";
  h();
  Object.defineProperty(or, "__esModule", { value: !0 });
  or.TerminalConnection = void 0;
  var Ea = Ie(),
    bd = Ne(),
    sr = ce(),
    Sd = Ve(),
    ba = an(),
    Ti = class n {
      constructor(e) {
        var t;
        (this._createSocket = () => {
          this._errorIfDisposed(),
            this._clearSocket(),
            this._updateConnectionStatus("connecting");
          let r = this._name,
            i = this.serverSettings,
            s = Ea.URLExt.join(
              i.wsUrl,
              "terminals",
              "websocket",
              encodeURIComponent(r)
            ),
            o = i.token;
          i.appendToken &&
            o !== "" &&
            (s = s + `?token=${encodeURIComponent(o)}`),
            (this._ws = new i.WebSocket(s)),
            (this._ws.onmessage = this._onWSMessage),
            (this._ws.onclose = this._onWSClose),
            (this._ws.onerror = this._onWSClose);
        }),
          (this._onWSMessage = (r) => {
            if (this._isDisposed) return;
            let i = JSON.parse(r.data);
            if (
              (i[0] === "disconnect" && this.dispose(),
              this._connectionStatus === "connecting")
            ) {
              i[0] === "setup" && this._updateConnectionStatus("connected");
              return;
            }
            this._messageReceived.emit({ type: i[0], content: i.slice(1) });
          }),
          (this._onWSClose = (r) => {
            console.warn(`Terminal websocket closed: ${r.code}`),
              this.isDisposed || this._reconnect();
          }),
          (this._connectionStatus = "connecting"),
          (this._connectionStatusChanged = new sr.Signal(this)),
          (this._isDisposed = !1),
          (this._disposed = new sr.Signal(this)),
          (this._messageReceived = new sr.Signal(this)),
          (this._reconnectTimeout = null),
          (this._ws = null),
          (this._noOp = () => {}),
          (this._reconnectLimit = 7),
          (this._reconnectAttempt = 0),
          (this._pendingMessages = []),
          (this._name = e.model.name),
          (this.serverSettings =
            (t = e.serverSettings) !== null && t !== void 0
              ? t
              : Sd.ServerConnection.makeSettings()),
          this._createSocket();
      }
      get disposed() {
        return this._disposed;
      }
      get messageReceived() {
        return this._messageReceived;
      }
      get name() {
        return this._name;
      }
      get model() {
        return { name: this._name };
      }
      get isDisposed() {
        return this._isDisposed;
      }
      dispose() {
        this._isDisposed ||
          ((this._isDisposed = !0),
          this._disposed.emit(),
          this._updateConnectionStatus("disconnected"),
          this._clearSocket(),
          sr.Signal.clearData(this));
      }
      send(e) {
        this._sendMessage(e);
      }
      _sendMessage(e, t = !0) {
        if (!(this._isDisposed || !e.content))
          if (this.connectionStatus === "connected" && this._ws) {
            let r = [e.type, ...e.content];
            this._ws.send(JSON.stringify(r));
          } else if (t) this._pendingMessages.push(e);
          else throw new Error(`Could not send message: ${JSON.stringify(e)}`);
      }
      _sendPending() {
        for (
          ;
          this.connectionStatus === "connected" &&
          this._pendingMessages.length > 0;

        )
          this._sendMessage(this._pendingMessages[0], !1),
            this._pendingMessages.shift();
      }
      reconnect() {
        this._errorIfDisposed();
        let e = new bd.PromiseDelegate(),
          t = (r, i) => {
            i === "connected"
              ? (e.resolve(), this.connectionStatusChanged.disconnect(t, this))
              : i === "disconnected" &&
                (e.reject(new Error("Terminal connection disconnected")),
                this.connectionStatusChanged.disconnect(t, this));
          };
        return (
          this.connectionStatusChanged.connect(t, this),
          (this._reconnectAttempt = 0),
          this._reconnect(),
          e.promise
        );
      }
      _reconnect() {
        if (
          (this._errorIfDisposed(),
          clearTimeout(this._reconnectTimeout),
          this._reconnectAttempt < this._reconnectLimit)
        ) {
          this._updateConnectionStatus("connecting");
          let e = Oi.getRandomIntInclusive(
            0,
            1e3 * (Math.pow(2, this._reconnectAttempt) - 1)
          );
          console.error(
            `Connection lost, reconnecting in ${Math.floor(e / 1e3)} seconds.`
          ),
            (this._reconnectTimeout = setTimeout(this._createSocket, e)),
            (this._reconnectAttempt += 1);
        } else this._updateConnectionStatus("disconnected");
        this._clearSocket();
      }
      _clearSocket() {
        this._ws !== null &&
          ((this._ws.onopen = this._noOp),
          (this._ws.onclose = this._noOp),
          (this._ws.onerror = this._noOp),
          (this._ws.onmessage = this._noOp),
          this._ws.close(),
          (this._ws = null));
      }
      async shutdown() {
        await ba.shutdownTerminal(this.name, this.serverSettings),
          this.dispose();
      }
      clone() {
        return new n(this);
      }
      _updateConnectionStatus(e) {
        this._connectionStatus !== e &&
          ((this._connectionStatus = e),
          e !== "connecting" &&
            ((this._reconnectAttempt = 0),
            clearTimeout(this._reconnectTimeout)),
          e === "connected" && this._sendPending(),
          this._connectionStatusChanged.emit(e));
      }
      _errorIfDisposed() {
        if (this.isDisposed) throw new Error("Terminal connection is disposed");
      }
      get connectionStatusChanged() {
        return this._connectionStatusChanged;
      }
      get connectionStatus() {
        return this._connectionStatus;
      }
    };
  or.TerminalConnection = Ti;
  var Oi;
  (function (n) {
    function e(r, i) {
      return Ea.URLExt.join(r, ba.TERMINAL_SERVICE_URL, encodeURIComponent(i));
    }
    n.getTermUrl = e;
    function t(r, i) {
      return (
        (r = Math.ceil(r)),
        (i = Math.floor(i)),
        Math.floor(Math.random() * (i - r + 1)) + r
      );
    }
    n.getRandomIntInclusive = t;
  })(Oi || (Oi = {}));
});
var Ia = k((ar) => {
  "use strict";
  h();
  Object.defineProperty(ar, "__esModule", { value: !0 });
  ar.TerminalManager = void 0;
  var wd = ct(),
    Id = Qt(),
    wa = ce(),
    Cd = Ve(),
    Rd = Zt(),
    ln = an(),
    Ad = Sa(),
    Ni = class extends Rd.BaseManager {
      constructor(e = {}) {
        var t;
        if (
          (super(e),
          (this._isReady = !1),
          (this._names = []),
          (this._terminalConnections = new Set()),
          (this._runningChanged = new wa.Signal(this)),
          (this._connectionFailure = new wa.Signal(this)),
          !this.isAvailable())
        ) {
          (this._ready = Promise.reject("Terminals unavailable")),
            this._ready.catch((r) => {});
          return;
        }
        (this._pollModels = new Id.Poll({
          auto: !1,
          factory: () => this.requestRunning(),
          frequency: { interval: 10 * 1e3, backoff: !0, max: 300 * 1e3 },
          name: "@jupyterlab/services:TerminalManager#models",
          standby: (t = e.standby) !== null && t !== void 0 ? t : "when-hidden",
        })),
          (this._ready = (async () => {
            await this._pollModels.start(),
              await this._pollModels.tick,
              (this._isReady = !0);
          })());
      }
      get isReady() {
        return this._isReady;
      }
      get ready() {
        return this._ready;
      }
      get runningChanged() {
        return this._runningChanged;
      }
      get connectionFailure() {
        return this._connectionFailure;
      }
      dispose() {
        this.isDisposed ||
          ((this._names.length = 0),
          this._terminalConnections.forEach((e) => e.dispose()),
          this._pollModels.dispose(),
          super.dispose());
      }
      isAvailable() {
        return ln.isAvailable();
      }
      connectTo(e) {
        let t = new Ad.TerminalConnection(
          Object.assign(Object.assign({}, e), {
            serverSettings: this.serverSettings,
          })
        );
        return (
          this._onStarted(t),
          this._names.includes(e.model.name) ||
            this.refreshRunning().catch(() => {}),
          t
        );
      }
      running() {
        return wd.iter(this._models);
      }
      async refreshRunning() {
        await this._pollModels.refresh(), await this._pollModels.tick;
      }
      async startNew() {
        let e = await ln.startNew(this.serverSettings);
        return await this.refreshRunning(), this.connectTo({ model: e });
      }
      async shutdown(e) {
        await ln.shutdownTerminal(e, this.serverSettings),
          await this.refreshRunning();
      }
      async shutdownAll() {
        await this.refreshRunning(),
          await Promise.all(
            this._names.map((e) => ln.shutdownTerminal(e, this.serverSettings))
          ),
          await this.refreshRunning();
      }
      async requestRunning() {
        var e, t;
        let r;
        try {
          r = await ln.listRunning(this.serverSettings);
        } catch (s) {
          throw (
            ((s instanceof Cd.ServerConnection.NetworkError ||
              ((e = s.response) === null || e === void 0
                ? void 0
                : e.status) === 503 ||
              ((t = s.response) === null || t === void 0
                ? void 0
                : t.status) === 424) &&
              this._connectionFailure.emit(s),
            s)
          );
        }
        if (this.isDisposed) return;
        let i = r.map(({ name: s }) => s).sort();
        i !== this._names &&
          ((this._names = i),
          this._terminalConnections.forEach((s) => {
            i.includes(s.name) || s.dispose();
          }),
          this._runningChanged.emit(this._models));
      }
      _onStarted(e) {
        this._terminalConnections.add(e),
          e.disposed.connect(this._onDisposed, this);
      }
      _onDisposed(e) {
        this._terminalConnections.delete(e),
          this.refreshRunning().catch(() => {});
      }
      get _models() {
        return this._names.map((e) => ({ name: e }));
      }
    };
  ar.TerminalManager = Ni;
});
var Li = k((Ee) => {
  "use strict";
  h();
  var Ca =
      (Ee && Ee.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    Dd =
      (Ee && Ee.__setModuleDefault) ||
      (Object.create
        ? function (n, e) {
            Object.defineProperty(n, "default", { enumerable: !0, value: e });
          }
        : function (n, e) {
            n.default = e;
          }),
    Ra =
      (Ee && Ee.__importStar) ||
      function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (n != null)
          for (var t in n)
            t !== "default" &&
              Object.prototype.hasOwnProperty.call(n, t) &&
              Ca(e, n, t);
        return Dd(e, n), e;
      },
    Pd =
      (Ee && Ee.__exportStar) ||
      function (n, e) {
        for (var t in n)
          t !== "default" &&
            !Object.prototype.hasOwnProperty.call(e, t) &&
            Ca(e, n, t);
      };
  Object.defineProperty(Ee, "__esModule", { value: !0 });
  Ee.TerminalAPI = Ee.Terminal = void 0;
  var Md = Ra(ya());
  Ee.Terminal = Md;
  var Td = Ra(an());
  Ee.TerminalAPI = Td;
  Pd(Ia(), Ee);
});
var xi = k((lr) => {
  "use strict";
  h();
  Object.defineProperty(lr, "__esModule", { value: !0 });
  lr.WorkspaceManager = void 0;
  var Od = Ie(),
    Nd = Di(),
    un = De(),
    Ld = "api/workspaces",
    ki = class extends Nd.DataConnector {
      constructor(e = {}) {
        var t;
        super(),
          (this.serverSettings =
            (t = e.serverSettings) !== null && t !== void 0
              ? t
              : un.ServerConnection.makeSettings());
      }
      async fetch(e) {
        let { serverSettings: t } = this,
          { baseUrl: r, appUrl: i } = t,
          { makeRequest: s, ResponseError: o } = un.ServerConnection,
          a = r + i,
          l = Nt.url(a, e),
          u = await s(l, {}, t);
        if (u.status !== 200) throw await o.create(u);
        return u.json();
      }
      async list() {
        let { serverSettings: e } = this,
          { baseUrl: t, appUrl: r } = e,
          { makeRequest: i, ResponseError: s } = un.ServerConnection,
          o = t + r,
          a = Nt.url(o, ""),
          l = await i(a, {}, e);
        if (l.status !== 200) throw await s.create(l);
        return (await l.json()).workspaces;
      }
      async remove(e) {
        let { serverSettings: t } = this,
          { baseUrl: r, appUrl: i } = t,
          { makeRequest: s, ResponseError: o } = un.ServerConnection,
          a = r + i,
          l = Nt.url(a, e),
          f = await s(l, { method: "DELETE" }, t);
        if (f.status !== 204) throw await o.create(f);
      }
      async save(e, t) {
        let { serverSettings: r } = this,
          { baseUrl: i, appUrl: s } = r,
          { makeRequest: o, ResponseError: a } = un.ServerConnection,
          l = i + s,
          u = Nt.url(l, e),
          f = { body: JSON.stringify(t), method: "PUT" },
          c = await o(u, f, r);
        if (c.status !== 204) throw await a.create(c);
      }
    };
  lr.WorkspaceManager = ki;
  var Nt;
  (function (n) {
    function e(t, r) {
      return Od.URLExt.join(t, Ld, r);
    }
    n.url = e;
  })(Nt || (Nt = {}));
});
var Da = k((ur) => {
  "use strict";
  h();
  Object.defineProperty(ur, "__esModule", { value: !0 });
  ur.ServiceManager = void 0;
  var Aa = ce(),
    kd = Zo(),
    xd = bi(),
    jd = Gr(),
    Fd = Un(),
    Ud = Ci(),
    Wd = Mi(),
    Kd = Li(),
    qd = De(),
    Vd = xi(),
    Bd = _i(),
    ji = class {
      constructor(e = {}) {
        var t, r;
        (this._isDisposed = !1),
          (this._connectionFailure = new Aa.Signal(this)),
          (this._isReady = !1);
        let i = e.defaultDrive,
          s =
            (t = e.serverSettings) !== null && t !== void 0
              ? t
              : qd.ServerConnection.makeSettings(),
          o = (r = e.standby) !== null && r !== void 0 ? r : "when-hidden",
          a = { defaultDrive: i, serverSettings: s, standby: o },
          l = new Bd.KernelManager(a);
        (this.serverSettings = s),
          (this.contents = new jd.ContentsManager(a)),
          (this.sessions = new Ud.SessionManager(
            Object.assign(Object.assign({}, a), { kernelManager: l })
          )),
          (this.settings = new Wd.SettingManager(a)),
          (this.terminals = new Kd.TerminalManager(a)),
          (this.builder = new kd.BuildManager(a)),
          (this.workspaces = new Vd.WorkspaceManager(a)),
          (this.nbconvert = new xd.NbConvertManager(a)),
          (this.kernelspecs = new Fd.KernelSpecManager(a)),
          this.kernelspecs.connectionFailure.connect(
            this._onConnectionFailure,
            this
          ),
          this.sessions.connectionFailure.connect(
            this._onConnectionFailure,
            this
          ),
          this.terminals.connectionFailure.connect(
            this._onConnectionFailure,
            this
          );
        let u = [this.sessions.ready, this.kernelspecs.ready];
        this.terminals.isAvailable() && u.push(this.terminals.ready),
          (this._readyPromise = Promise.all(u).then(() => {
            this._isReady = !0;
          }));
      }
      get connectionFailure() {
        return this._connectionFailure;
      }
      get isDisposed() {
        return this._isDisposed;
      }
      dispose() {
        this.isDisposed ||
          ((this._isDisposed = !0),
          Aa.Signal.clearData(this),
          this.contents.dispose(),
          this.sessions.dispose(),
          this.terminals.dispose());
      }
      get isReady() {
        return this._isReady;
      }
      get ready() {
        return this._readyPromise;
      }
      _onConnectionFailure(e, t) {
        this._connectionFailure.emit(t);
      }
    };
  ur.ServiceManager = ji;
});
var Ve = k((fe) => {
  "use strict";
  h();
  var Hd =
      (fe && fe.__createBinding) ||
      (Object.create
        ? function (n, e, t, r) {
            r === void 0 && (r = t),
              Object.defineProperty(n, r, {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              });
          }
        : function (n, e, t, r) {
            r === void 0 && (r = t), (n[r] = e[t]);
          }),
    xe =
      (fe && fe.__exportStar) ||
      function (n, e) {
        for (var t in n)
          t !== "default" &&
            !Object.prototype.hasOwnProperty.call(e, t) &&
            Hd(e, n, t);
      };
  Object.defineProperty(fe, "__esModule", { value: !0 });
  xe(So(), fe);
  xe(Gr(), fe);
  xe(_i(), fe);
  xe(Un(), fe);
  xe(Da(), fe);
  xe(De(), fe);
  xe(Ci(), fe);
  xe(Mi(), fe);
  xe(Li(), fe);
  xe(xi(), fe);
  xe(bi(), fe);
});
var Xa = k((A_, Bi) => {
  "use strict";
  h();
  var kt = typeof Reflect == "object" ? Reflect : null,
    Ka =
      kt && typeof kt.apply == "function"
        ? kt.apply
        : function (e, t, r) {
            return Function.prototype.apply.call(e, t, r);
          },
    cr;
  kt && typeof kt.ownKeys == "function"
    ? (cr = kt.ownKeys)
    : Object.getOwnPropertySymbols
      ? (cr = function (e) {
          return Object.getOwnPropertyNames(e).concat(
            Object.getOwnPropertySymbols(e)
          );
        })
      : (cr = function (e) {
          return Object.getOwnPropertyNames(e);
        });
  function zd(n) {
    console && console.warn && console.warn(n);
  }
  var Va =
    Number.isNaN ||
    function (e) {
      return e !== e;
    };
  function X() {
    X.init.call(this);
  }
  Bi.exports = X;
  Bi.exports.once = Zd;
  X.EventEmitter = X;
  X.prototype._events = void 0;
  X.prototype._eventsCount = 0;
  X.prototype._maxListeners = void 0;
  var qa = 10;
  function dr(n) {
    if (typeof n != "function")
      throw new TypeError(
        'The "listener" argument must be of type Function. Received type ' +
          typeof n
      );
  }
  Object.defineProperty(X, "defaultMaxListeners", {
    enumerable: !0,
    get: function () {
      return qa;
    },
    set: function (n) {
      if (typeof n != "number" || n < 0 || Va(n))
        throw new RangeError(
          'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
            n +
            "."
        );
      qa = n;
    },
  });
  X.init = function () {
    (this._events === void 0 ||
      this._events === Object.getPrototypeOf(this)._events) &&
      ((this._events = Object.create(null)), (this._eventsCount = 0)),
      (this._maxListeners = this._maxListeners || void 0);
  };
  X.prototype.setMaxListeners = function (e) {
    if (typeof e != "number" || e < 0 || Va(e))
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' +
          e +
          "."
      );
    return (this._maxListeners = e), this;
  };
  function Ba(n) {
    return n._maxListeners === void 0 ? X.defaultMaxListeners : n._maxListeners;
  }
  X.prototype.getMaxListeners = function () {
    return Ba(this);
  };
  X.prototype.emit = function (e) {
    for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
    var i = e === "error",
      s = this._events;
    if (s !== void 0) i = i && s.error === void 0;
    else if (!i) return !1;
    if (i) {
      var o;
      if ((t.length > 0 && (o = t[0]), o instanceof Error)) throw o;
      var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
      throw ((a.context = o), a);
    }
    var l = s[e];
    if (l === void 0) return !1;
    if (typeof l == "function") Ka(l, this, t);
    else
      for (var u = l.length, f = za(l, u), r = 0; r < u; ++r) Ka(f[r], this, t);
    return !0;
  };
  function Ha(n, e, t, r) {
    var i, s, o;
    if (
      (dr(t),
      (s = n._events),
      s === void 0
        ? ((s = n._events = Object.create(null)), (n._eventsCount = 0))
        : (s.newListener !== void 0 &&
            (n.emit("newListener", e, t.listener ? t.listener : t),
            (s = n._events)),
          (o = s[e])),
      o === void 0)
    )
      (o = s[e] = t), ++n._eventsCount;
    else if (
      (typeof o == "function"
        ? (o = s[e] = r ? [t, o] : [o, t])
        : r
          ? o.unshift(t)
          : o.push(t),
      (i = Ba(n)),
      i > 0 && o.length > i && !o.warned)
    ) {
      o.warned = !0;
      var a = new Error(
        "Possible EventEmitter memory leak detected. " +
          o.length +
          " " +
          String(e) +
          " listeners added. Use emitter.setMaxListeners() to increase limit"
      );
      (a.name = "MaxListenersExceededWarning"),
        (a.emitter = n),
        (a.type = e),
        (a.count = o.length),
        zd(a);
    }
    return n;
  }
  X.prototype.addListener = function (e, t) {
    return Ha(this, e, t, !1);
  };
  X.prototype.on = X.prototype.addListener;
  X.prototype.prependListener = function (e, t) {
    return Ha(this, e, t, !0);
  };
  function Yd() {
    if (!this.fired)
      return (
        this.target.removeListener(this.type, this.wrapFn),
        (this.fired = !0),
        arguments.length === 0
          ? this.listener.call(this.target)
          : this.listener.apply(this.target, arguments)
      );
  }
  function $a(n, e, t) {
    var r = { fired: !1, wrapFn: void 0, target: n, type: e, listener: t },
      i = Yd.bind(r);
    return (i.listener = t), (r.wrapFn = i), i;
  }
  X.prototype.once = function (e, t) {
    return dr(t), this.on(e, $a(this, e, t)), this;
  };
  X.prototype.prependOnceListener = function (e, t) {
    return dr(t), this.prependListener(e, $a(this, e, t)), this;
  };
  X.prototype.removeListener = function (e, t) {
    var r, i, s, o, a;
    if ((dr(t), (i = this._events), i === void 0)) return this;
    if (((r = i[e]), r === void 0)) return this;
    if (r === t || r.listener === t)
      --this._eventsCount === 0
        ? (this._events = Object.create(null))
        : (delete i[e],
          i.removeListener && this.emit("removeListener", e, r.listener || t));
    else if (typeof r != "function") {
      for (s = -1, o = r.length - 1; o >= 0; o--)
        if (r[o] === t || r[o].listener === t) {
          (a = r[o].listener), (s = o);
          break;
        }
      if (s < 0) return this;
      s === 0 ? r.shift() : Xd(r, s),
        r.length === 1 && (i[e] = r[0]),
        i.removeListener !== void 0 && this.emit("removeListener", e, a || t);
    }
    return this;
  };
  X.prototype.off = X.prototype.removeListener;
  X.prototype.removeAllListeners = function (e) {
    var t, r, i;
    if (((r = this._events), r === void 0)) return this;
    if (r.removeListener === void 0)
      return (
        arguments.length === 0
          ? ((this._events = Object.create(null)), (this._eventsCount = 0))
          : r[e] !== void 0 &&
            (--this._eventsCount === 0
              ? (this._events = Object.create(null))
              : delete r[e]),
        this
      );
    if (arguments.length === 0) {
      var s = Object.keys(r),
        o;
      for (i = 0; i < s.length; ++i)
        (o = s[i]), o !== "removeListener" && this.removeAllListeners(o);
      return (
        this.removeAllListeners("removeListener"),
        (this._events = Object.create(null)),
        (this._eventsCount = 0),
        this
      );
    }
    if (((t = r[e]), typeof t == "function")) this.removeListener(e, t);
    else if (t !== void 0)
      for (i = t.length - 1; i >= 0; i--) this.removeListener(e, t[i]);
    return this;
  };
  function Ja(n, e, t) {
    var r = n._events;
    if (r === void 0) return [];
    var i = r[e];
    return i === void 0
      ? []
      : typeof i == "function"
        ? t
          ? [i.listener || i]
          : [i]
        : t
          ? Qd(i)
          : za(i, i.length);
  }
  X.prototype.listeners = function (e) {
    return Ja(this, e, !0);
  };
  X.prototype.rawListeners = function (e) {
    return Ja(this, e, !1);
  };
  X.listenerCount = function (n, e) {
    return typeof n.listenerCount == "function"
      ? n.listenerCount(e)
      : Ga.call(n, e);
  };
  X.prototype.listenerCount = Ga;
  function Ga(n) {
    var e = this._events;
    if (e !== void 0) {
      var t = e[n];
      if (typeof t == "function") return 1;
      if (t !== void 0) return t.length;
    }
    return 0;
  }
  X.prototype.eventNames = function () {
    return this._eventsCount > 0 ? cr(this._events) : [];
  };
  function za(n, e) {
    for (var t = new Array(e), r = 0; r < e; ++r) t[r] = n[r];
    return t;
  }
  function Xd(n, e) {
    for (; e + 1 < n.length; e++) n[e] = n[e + 1];
    n.pop();
  }
  function Qd(n) {
    for (var e = new Array(n.length), t = 0; t < e.length; ++t)
      e[t] = n[t].listener || n[t];
    return e;
  }
  function Zd(n, e) {
    return new Promise(function (t, r) {
      function i(o) {
        n.removeListener(e, s), r(o);
      }
      function s() {
        typeof n.removeListener == "function" && n.removeListener("error", i),
          t([].slice.call(arguments));
      }
      Ya(n, e, s, { once: !0 }), e !== "error" && eh(n, i, { once: !0 });
    });
  }
  function eh(n, e, t) {
    typeof n.on == "function" && Ya(n, "error", e, t);
  }
  function Ya(n, e, t, r) {
    if (typeof n.on == "function") r.once ? n.once(e, t) : n.on(e, t);
    else if (typeof n.addEventListener == "function")
      n.addEventListener(e, function i(s) {
        r.once && n.removeEventListener(e, i), t(s);
      });
    else
      throw new TypeError(
        'The "emitter" argument must be of type EventEmitter. Received type ' +
          typeof n
      );
  }
});
var ml = k((K, _l) => {
  h();
  K = _l.exports = H;
  var Y;
  typeof process == "object" &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
    ? (Y = function () {
        var n = Array.prototype.slice.call(arguments, 0);
        n.unshift("SEMVER"), console.log.apply(console, n);
      })
    : (Y = function () {});
  K.SEMVER_SPEC_VERSION = "2.0.0";
  var cn = 256,
    gr = Number.MAX_SAFE_INTEGER || 9007199254740991,
    Gi = 16,
    sh = cn - 6,
    dn = (K.re = []),
    Z = (K.safeRe = []),
    I = (K.src = []),
    B = 0,
    Zi = "[a-zA-Z0-9-]",
    zi = [
      ["\\s", 1],
      ["\\d", cn],
      [Zi, sh],
    ];
  function br(n) {
    for (var e = 0; e < zi.length; e++) {
      var t = zi[e][0],
        r = zi[e][1];
      n = n
        .split(t + "*")
        .join(t + "{0," + r + "}")
        .split(t + "+")
        .join(t + "{1," + r + "}");
    }
    return n;
  }
  var xt = B++;
  I[xt] = "0|[1-9]\\d*";
  var jt = B++;
  I[jt] = "\\d+";
  var es = B++;
  I[es] = "\\d*[a-zA-Z-]" + Zi + "*";
  var nl = B++;
  I[nl] = "(" + I[xt] + ")\\.(" + I[xt] + ")\\.(" + I[xt] + ")";
  var rl = B++;
  I[rl] = "(" + I[jt] + ")\\.(" + I[jt] + ")\\.(" + I[jt] + ")";
  var Yi = B++;
  I[Yi] = "(?:" + I[xt] + "|" + I[es] + ")";
  var Xi = B++;
  I[Xi] = "(?:" + I[jt] + "|" + I[es] + ")";
  var ts = B++;
  I[ts] = "(?:-(" + I[Yi] + "(?:\\." + I[Yi] + ")*))";
  var ns = B++;
  I[ns] = "(?:-?(" + I[Xi] + "(?:\\." + I[Xi] + ")*))";
  var Qi = B++;
  I[Qi] = Zi + "+";
  var fn = B++;
  I[fn] = "(?:\\+(" + I[Qi] + "(?:\\." + I[Qi] + ")*))";
  var rs = B++,
    il = "v?" + I[nl] + I[ts] + "?" + I[fn] + "?";
  I[rs] = "^" + il + "$";
  var is = "[v=\\s]*" + I[rl] + I[ns] + "?" + I[fn] + "?",
    ss = B++;
  I[ss] = "^" + is + "$";
  var qt = B++;
  I[qt] = "((?:<|>)?=?)";
  var _r = B++;
  I[_r] = I[jt] + "|x|X|\\*";
  var mr = B++;
  I[mr] = I[xt] + "|x|X|\\*";
  var Et = B++;
  I[Et] =
    "[v=\\s]*(" +
    I[mr] +
    ")(?:\\.(" +
    I[mr] +
    ")(?:\\.(" +
    I[mr] +
    ")(?:" +
    I[ts] +
    ")?" +
    I[fn] +
    "?)?)?";
  var Ut = B++;
  I[Ut] =
    "[v=\\s]*(" +
    I[_r] +
    ")(?:\\.(" +
    I[_r] +
    ")(?:\\.(" +
    I[_r] +
    ")(?:" +
    I[ns] +
    ")?" +
    I[fn] +
    "?)?)?";
  var sl = B++;
  I[sl] = "^" + I[qt] + "\\s*" + I[Et] + "$";
  var ol = B++;
  I[ol] = "^" + I[qt] + "\\s*" + I[Ut] + "$";
  var al = B++;
  I[al] =
    "(?:^|[^\\d])(\\d{1," +
    Gi +
    "})(?:\\.(\\d{1," +
    Gi +
    "}))?(?:\\.(\\d{1," +
    Gi +
    "}))?(?:$|[^\\d])";
  var Sr = B++;
  I[Sr] = "(?:~>?)";
  var Wt = B++;
  I[Wt] = "(\\s*)" + I[Sr] + "\\s+";
  dn[Wt] = new RegExp(I[Wt], "g");
  Z[Wt] = new RegExp(br(I[Wt]), "g");
  var oh = "$1~",
    ll = B++;
  I[ll] = "^" + I[Sr] + I[Et] + "$";
  var ul = B++;
  I[ul] = "^" + I[Sr] + I[Ut] + "$";
  var wr = B++;
  I[wr] = "(?:\\^)";
  var Kt = B++;
  I[Kt] = "(\\s*)" + I[wr] + "\\s+";
  dn[Kt] = new RegExp(I[Kt], "g");
  Z[Kt] = new RegExp(br(I[Kt]), "g");
  var ah = "$1^",
    cl = B++;
  I[cl] = "^" + I[wr] + I[Et] + "$";
  var dl = B++;
  I[dl] = "^" + I[wr] + I[Ut] + "$";
  var os = B++;
  I[os] = "^" + I[qt] + "\\s*(" + is + ")$|^$";
  var as = B++;
  I[as] = "^" + I[qt] + "\\s*(" + il + ")$|^$";
  var bt = B++;
  I[bt] = "(\\s*)" + I[qt] + "\\s*(" + is + "|" + I[Et] + ")";
  dn[bt] = new RegExp(I[bt], "g");
  Z[bt] = new RegExp(br(I[bt]), "g");
  var lh = "$1$2$3",
    hl = B++;
  I[hl] = "^\\s*(" + I[Et] + ")\\s+-\\s+(" + I[Et] + ")\\s*$";
  var fl = B++;
  I[fl] = "^\\s*(" + I[Ut] + ")\\s+-\\s+(" + I[Ut] + ")\\s*$";
  var pl = B++;
  I[pl] = "(<|>)?=?\\s*\\*";
  for (ze = 0; ze < B; ze++)
    Y(ze, I[ze]),
      dn[ze] || ((dn[ze] = new RegExp(I[ze])), (Z[ze] = new RegExp(br(I[ze]))));
  var ze;
  K.parse = St;
  function St(n, e) {
    if (
      ((!e || typeof e != "object") &&
        (e = { loose: !!e, includePrerelease: !1 }),
      n instanceof H)
    )
      return n;
    if (typeof n != "string" || n.length > cn) return null;
    var t = e.loose ? Z[ss] : Z[rs];
    if (!t.test(n)) return null;
    try {
      return new H(n, e);
    } catch (r) {
      return null;
    }
  }
  K.valid = uh;
  function uh(n, e) {
    var t = St(n, e);
    return t ? t.version : null;
  }
  K.clean = ch;
  function ch(n, e) {
    var t = St(n.trim().replace(/^[=v]+/, ""), e);
    return t ? t.version : null;
  }
  K.SemVer = H;
  function H(n, e) {
    if (
      ((!e || typeof e != "object") &&
        (e = { loose: !!e, includePrerelease: !1 }),
      n instanceof H)
    ) {
      if (n.loose === e.loose) return n;
      n = n.version;
    } else if (typeof n != "string")
      throw new TypeError("Invalid Version: " + n);
    if (n.length > cn)
      throw new TypeError("version is longer than " + cn + " characters");
    if (!(this instanceof H)) return new H(n, e);
    Y("SemVer", n, e), (this.options = e), (this.loose = !!e.loose);
    var t = n.trim().match(e.loose ? Z[ss] : Z[rs]);
    if (!t) throw new TypeError("Invalid Version: " + n);
    if (
      ((this.raw = n),
      (this.major = +t[1]),
      (this.minor = +t[2]),
      (this.patch = +t[3]),
      this.major > gr || this.major < 0)
    )
      throw new TypeError("Invalid major version");
    if (this.minor > gr || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > gr || this.patch < 0)
      throw new TypeError("Invalid patch version");
    t[4]
      ? (this.prerelease = t[4].split(".").map(function (r) {
          if (/^[0-9]+$/.test(r)) {
            var i = +r;
            if (i >= 0 && i < gr) return i;
          }
          return r;
        }))
      : (this.prerelease = []),
      (this.build = t[5] ? t[5].split(".") : []),
      this.format();
  }
  H.prototype.format = function () {
    return (
      (this.version = this.major + "." + this.minor + "." + this.patch),
      this.prerelease.length &&
        (this.version += "-" + this.prerelease.join(".")),
      this.version
    );
  };
  H.prototype.toString = function () {
    return this.version;
  };
  H.prototype.compare = function (n) {
    return (
      Y("SemVer.compare", this.version, this.options, n),
      n instanceof H || (n = new H(n, this.options)),
      this.compareMain(n) || this.comparePre(n)
    );
  };
  H.prototype.compareMain = function (n) {
    return (
      n instanceof H || (n = new H(n, this.options)),
      Ft(this.major, n.major) ||
        Ft(this.minor, n.minor) ||
        Ft(this.patch, n.patch)
    );
  };
  H.prototype.comparePre = function (n) {
    if (
      (n instanceof H || (n = new H(n, this.options)),
      this.prerelease.length && !n.prerelease.length)
    )
      return -1;
    if (!this.prerelease.length && n.prerelease.length) return 1;
    if (!this.prerelease.length && !n.prerelease.length) return 0;
    var e = 0;
    do {
      var t = this.prerelease[e],
        r = n.prerelease[e];
      if ((Y("prerelease compare", e, t, r), t === void 0 && r === void 0))
        return 0;
      if (r === void 0) return 1;
      if (t === void 0) return -1;
      if (t === r) continue;
      return Ft(t, r);
    } while (++e);
  };
  H.prototype.inc = function (n, e) {
    switch (n) {
      case "premajor":
        (this.prerelease.length = 0),
          (this.patch = 0),
          (this.minor = 0),
          this.major++,
          this.inc("pre", e);
        break;
      case "preminor":
        (this.prerelease.length = 0),
          (this.patch = 0),
          this.minor++,
          this.inc("pre", e);
        break;
      case "prepatch":
        (this.prerelease.length = 0), this.inc("patch", e), this.inc("pre", e);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", e),
          this.inc("pre", e);
        break;
      case "major":
        (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) &&
          this.major++,
          (this.minor = 0),
          (this.patch = 0),
          (this.prerelease = []);
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++,
          (this.patch = 0),
          (this.prerelease = []);
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, (this.prerelease = []);
        break;
      case "pre":
        if (this.prerelease.length === 0) this.prerelease = [0];
        else {
          for (var t = this.prerelease.length; --t >= 0; )
            typeof this.prerelease[t] == "number" &&
              (this.prerelease[t]++, (t = -2));
          t === -1 && this.prerelease.push(0);
        }
        e &&
          (this.prerelease[0] === e
            ? isNaN(this.prerelease[1]) && (this.prerelease = [e, 0])
            : (this.prerelease = [e, 0]));
        break;
      default:
        throw new Error("invalid increment argument: " + n);
    }
    return this.format(), (this.raw = this.version), this;
  };
  K.inc = dh;
  function dh(n, e, t, r) {
    typeof t == "string" && ((r = t), (t = void 0));
    try {
      return new H(n, t).inc(e, r).version;
    } catch (i) {
      return null;
    }
  }
  K.diff = hh;
  function hh(n, e) {
    if (ls(n, e)) return null;
    var t = St(n),
      r = St(e),
      i = "";
    if (t.prerelease.length || r.prerelease.length) {
      i = "pre";
      var s = "prerelease";
    }
    for (var o in t)
      if ((o === "major" || o === "minor" || o === "patch") && t[o] !== r[o])
        return i + o;
    return s;
  }
  K.compareIdentifiers = Ft;
  var tl = /^[0-9]+$/;
  function Ft(n, e) {
    var t = tl.test(n),
      r = tl.test(e);
    return (
      t && r && ((n = +n), (e = +e)),
      n === e ? 0 : t && !r ? -1 : r && !t ? 1 : n < e ? -1 : 1
    );
  }
  K.rcompareIdentifiers = fh;
  function fh(n, e) {
    return Ft(e, n);
  }
  K.major = ph;
  function ph(n, e) {
    return new H(n, e).major;
  }
  K.minor = gh;
  function gh(n, e) {
    return new H(n, e).minor;
  }
  K.patch = _h;
  function _h(n, e) {
    return new H(n, e).patch;
  }
  K.compare = et;
  function et(n, e, t) {
    return new H(n, t).compare(new H(e, t));
  }
  K.compareLoose = mh;
  function mh(n, e) {
    return et(n, e, !0);
  }
  K.rcompare = vh;
  function vh(n, e, t) {
    return et(e, n, t);
  }
  K.sort = yh;
  function yh(n, e) {
    return n.sort(function (t, r) {
      return K.compare(t, r, e);
    });
  }
  K.rsort = Eh;
  function Eh(n, e) {
    return n.sort(function (t, r) {
      return K.rcompare(t, r, e);
    });
  }
  K.gt = hn;
  function hn(n, e, t) {
    return et(n, e, t) > 0;
  }
  K.lt = vr;
  function vr(n, e, t) {
    return et(n, e, t) < 0;
  }
  K.eq = ls;
  function ls(n, e, t) {
    return et(n, e, t) === 0;
  }
  K.neq = gl;
  function gl(n, e, t) {
    return et(n, e, t) !== 0;
  }
  K.gte = us;
  function us(n, e, t) {
    return et(n, e, t) >= 0;
  }
  K.lte = cs;
  function cs(n, e, t) {
    return et(n, e, t) <= 0;
  }
  K.cmp = yr;
  function yr(n, e, t, r) {
    switch (e) {
      case "===":
        return (
          typeof n == "object" && (n = n.version),
          typeof t == "object" && (t = t.version),
          n === t
        );
      case "!==":
        return (
          typeof n == "object" && (n = n.version),
          typeof t == "object" && (t = t.version),
          n !== t
        );
      case "":
      case "=":
      case "==":
        return ls(n, t, r);
      case "!=":
        return gl(n, t, r);
      case ">":
        return hn(n, t, r);
      case ">=":
        return us(n, t, r);
      case "<":
        return vr(n, t, r);
      case "<=":
        return cs(n, t, r);
      default:
        throw new TypeError("Invalid operator: " + e);
    }
  }
  K.Comparator = Te;
  function Te(n, e) {
    if (
      ((!e || typeof e != "object") &&
        (e = { loose: !!e, includePrerelease: !1 }),
      n instanceof Te)
    ) {
      if (n.loose === !!e.loose) return n;
      n = n.value;
    }
    if (!(this instanceof Te)) return new Te(n, e);
    (n = n.trim().split(/\s+/).join(" ")),
      Y("comparator", n, e),
      (this.options = e),
      (this.loose = !!e.loose),
      this.parse(n),
      this.semver === pn
        ? (this.value = "")
        : (this.value = this.operator + this.semver.version),
      Y("comp", this);
  }
  var pn = {};
  Te.prototype.parse = function (n) {
    var e = this.options.loose ? Z[os] : Z[as],
      t = n.match(e);
    if (!t) throw new TypeError("Invalid comparator: " + n);
    (this.operator = t[1]),
      this.operator === "=" && (this.operator = ""),
      t[2]
        ? (this.semver = new H(t[2], this.options.loose))
        : (this.semver = pn);
  };
  Te.prototype.toString = function () {
    return this.value;
  };
  Te.prototype.test = function (n) {
    return (
      Y("Comparator.test", n, this.options.loose),
      this.semver === pn
        ? !0
        : (typeof n == "string" && (n = new H(n, this.options)),
          yr(n, this.operator, this.semver, this.options))
    );
  };
  Te.prototype.intersects = function (n, e) {
    if (!(n instanceof Te)) throw new TypeError("a Comparator is required");
    (!e || typeof e != "object") && (e = { loose: !!e, includePrerelease: !1 });
    var t;
    if (this.operator === "")
      return (t = new ne(n.value, e)), Er(this.value, t, e);
    if (n.operator === "")
      return (t = new ne(this.value, e)), Er(n.semver, t, e);
    var r =
        (this.operator === ">=" || this.operator === ">") &&
        (n.operator === ">=" || n.operator === ">"),
      i =
        (this.operator === "<=" || this.operator === "<") &&
        (n.operator === "<=" || n.operator === "<"),
      s = this.semver.version === n.semver.version,
      o =
        (this.operator === ">=" || this.operator === "<=") &&
        (n.operator === ">=" || n.operator === "<="),
      a =
        yr(this.semver, "<", n.semver, e) &&
        (this.operator === ">=" || this.operator === ">") &&
        (n.operator === "<=" || n.operator === "<"),
      l =
        yr(this.semver, ">", n.semver, e) &&
        (this.operator === "<=" || this.operator === "<") &&
        (n.operator === ">=" || n.operator === ">");
    return r || i || (s && o) || a || l;
  };
  K.Range = ne;
  function ne(n, e) {
    if (
      ((!e || typeof e != "object") &&
        (e = { loose: !!e, includePrerelease: !1 }),
      n instanceof ne)
    )
      return n.loose === !!e.loose &&
        n.includePrerelease === !!e.includePrerelease
        ? n
        : new ne(n.raw, e);
    if (n instanceof Te) return new ne(n.value, e);
    if (!(this instanceof ne)) return new ne(n, e);
    if (
      ((this.options = e),
      (this.loose = !!e.loose),
      (this.includePrerelease = !!e.includePrerelease),
      (this.raw = n.trim().split(/\s+/).join(" ")),
      (this.set = this.raw
        .split("||")
        .map(function (t) {
          return this.parseRange(t.trim());
        }, this)
        .filter(function (t) {
          return t.length;
        })),
      !this.set.length)
    )
      throw new TypeError("Invalid SemVer Range: " + this.raw);
    this.format();
  }
  ne.prototype.format = function () {
    return (
      (this.range = this.set
        .map(function (n) {
          return n.join(" ").trim();
        })
        .join("||")
        .trim()),
      this.range
    );
  };
  ne.prototype.toString = function () {
    return this.range;
  };
  ne.prototype.parseRange = function (n) {
    var e = this.options.loose,
      t = e ? Z[fl] : Z[hl];
    (n = n.replace(t, Mh)),
      Y("hyphen replace", n),
      (n = n.replace(Z[bt], lh)),
      Y("comparator trim", n, Z[bt]),
      (n = n.replace(Z[Wt], oh)),
      (n = n.replace(Z[Kt], ah));
    var r = e ? Z[os] : Z[as],
      i = n
        .split(" ")
        .map(function (s) {
          return Sh(s, this.options);
        }, this)
        .join(" ")
        .split(/\s+/);
    return (
      this.options.loose &&
        (i = i.filter(function (s) {
          return !!s.match(r);
        })),
      (i = i.map(function (s) {
        return new Te(s, this.options);
      }, this)),
      i
    );
  };
  ne.prototype.intersects = function (n, e) {
    if (!(n instanceof ne)) throw new TypeError("a Range is required");
    return this.set.some(function (t) {
      return t.every(function (r) {
        return n.set.some(function (i) {
          return i.every(function (s) {
            return r.intersects(s, e);
          });
        });
      });
    });
  };
  K.toComparators = bh;
  function bh(n, e) {
    return new ne(n, e).set.map(function (t) {
      return t
        .map(function (r) {
          return r.value;
        })
        .join(" ")
        .trim()
        .split(" ");
    });
  }
  function Sh(n, e) {
    return (
      Y("comp", n, e),
      (n = Ch(n, e)),
      Y("caret", n),
      (n = wh(n, e)),
      Y("tildes", n),
      (n = Ah(n, e)),
      Y("xrange", n),
      (n = Ph(n, e)),
      Y("stars", n),
      n
    );
  }
  function be(n) {
    return !n || n.toLowerCase() === "x" || n === "*";
  }
  function wh(n, e) {
    return n
      .trim()
      .split(/\s+/)
      .map(function (t) {
        return Ih(t, e);
      })
      .join(" ");
  }
  function Ih(n, e) {
    var t = e.loose ? Z[ul] : Z[ll];
    return n.replace(t, function (r, i, s, o, a) {
      Y("tilde", n, r, i, s, o, a);
      var l;
      return (
        be(i)
          ? (l = "")
          : be(s)
            ? (l = ">=" + i + ".0.0 <" + (+i + 1) + ".0.0")
            : be(o)
              ? (l = ">=" + i + "." + s + ".0 <" + i + "." + (+s + 1) + ".0")
              : a
                ? (Y("replaceTilde pr", a),
                  (l =
                    ">=" +
                    i +
                    "." +
                    s +
                    "." +
                    o +
                    "-" +
                    a +
                    " <" +
                    i +
                    "." +
                    (+s + 1) +
                    ".0"))
                : (l =
                    ">=" +
                    i +
                    "." +
                    s +
                    "." +
                    o +
                    " <" +
                    i +
                    "." +
                    (+s + 1) +
                    ".0"),
        Y("tilde return", l),
        l
      );
    });
  }
  function Ch(n, e) {
    return n
      .trim()
      .split(/\s+/)
      .map(function (t) {
        return Rh(t, e);
      })
      .join(" ");
  }
  function Rh(n, e) {
    Y("caret", n, e);
    var t = e.loose ? Z[dl] : Z[cl];
    return n.replace(t, function (r, i, s, o, a) {
      Y("caret", n, r, i, s, o, a);
      var l;
      return (
        be(i)
          ? (l = "")
          : be(s)
            ? (l = ">=" + i + ".0.0 <" + (+i + 1) + ".0.0")
            : be(o)
              ? i === "0"
                ? (l = ">=" + i + "." + s + ".0 <" + i + "." + (+s + 1) + ".0")
                : (l = ">=" + i + "." + s + ".0 <" + (+i + 1) + ".0.0")
              : a
                ? (Y("replaceCaret pr", a),
                  i === "0"
                    ? s === "0"
                      ? (l =
                          ">=" +
                          i +
                          "." +
                          s +
                          "." +
                          o +
                          "-" +
                          a +
                          " <" +
                          i +
                          "." +
                          s +
                          "." +
                          (+o + 1))
                      : (l =
                          ">=" +
                          i +
                          "." +
                          s +
                          "." +
                          o +
                          "-" +
                          a +
                          " <" +
                          i +
                          "." +
                          (+s + 1) +
                          ".0")
                    : (l =
                        ">=" +
                        i +
                        "." +
                        s +
                        "." +
                        o +
                        "-" +
                        a +
                        " <" +
                        (+i + 1) +
                        ".0.0"))
                : (Y("no pr"),
                  i === "0"
                    ? s === "0"
                      ? (l =
                          ">=" +
                          i +
                          "." +
                          s +
                          "." +
                          o +
                          " <" +
                          i +
                          "." +
                          s +
                          "." +
                          (+o + 1))
                      : (l =
                          ">=" +
                          i +
                          "." +
                          s +
                          "." +
                          o +
                          " <" +
                          i +
                          "." +
                          (+s + 1) +
                          ".0")
                    : (l =
                        ">=" +
                        i +
                        "." +
                        s +
                        "." +
                        o +
                        " <" +
                        (+i + 1) +
                        ".0.0")),
        Y("caret return", l),
        l
      );
    });
  }
  function Ah(n, e) {
    return (
      Y("replaceXRanges", n, e),
      n
        .split(/\s+/)
        .map(function (t) {
          return Dh(t, e);
        })
        .join(" ")
    );
  }
  function Dh(n, e) {
    n = n.trim();
    var t = e.loose ? Z[ol] : Z[sl];
    return n.replace(t, function (r, i, s, o, a, l) {
      Y("xRange", n, r, i, s, o, a, l);
      var u = be(s),
        f = u || be(o),
        c = f || be(a),
        C = c;
      return (
        i === "=" && C && (i = ""),
        u
          ? i === ">" || i === "<"
            ? (r = "<0.0.0")
            : (r = "*")
          : i && C
            ? (f && (o = 0),
              (a = 0),
              i === ">"
                ? ((i = ">="),
                  f
                    ? ((s = +s + 1), (o = 0), (a = 0))
                    : ((o = +o + 1), (a = 0)))
                : i === "<=" && ((i = "<"), f ? (s = +s + 1) : (o = +o + 1)),
              (r = i + s + "." + o + "." + a))
            : f
              ? (r = ">=" + s + ".0.0 <" + (+s + 1) + ".0.0")
              : c &&
                (r = ">=" + s + "." + o + ".0 <" + s + "." + (+o + 1) + ".0"),
        Y("xRange return", r),
        r
      );
    });
  }
  function Ph(n, e) {
    return Y("replaceStars", n, e), n.trim().replace(Z[pl], "");
  }
  function Mh(n, e, t, r, i, s, o, a, l, u, f, c, C) {
    return (
      be(t)
        ? (e = "")
        : be(r)
          ? (e = ">=" + t + ".0.0")
          : be(i)
            ? (e = ">=" + t + "." + r + ".0")
            : (e = ">=" + e),
      be(l)
        ? (a = "")
        : be(u)
          ? (a = "<" + (+l + 1) + ".0.0")
          : be(f)
            ? (a = "<" + l + "." + (+u + 1) + ".0")
            : c
              ? (a = "<=" + l + "." + u + "." + f + "-" + c)
              : (a = "<=" + a),
      (e + " " + a).trim()
    );
  }
  ne.prototype.test = function (n) {
    if (!n) return !1;
    typeof n == "string" && (n = new H(n, this.options));
    for (var e = 0; e < this.set.length; e++)
      if (Th(this.set[e], n, this.options)) return !0;
    return !1;
  };
  function Th(n, e, t) {
    for (var r = 0; r < n.length; r++) if (!n[r].test(e)) return !1;
    if (e.prerelease.length && !t.includePrerelease) {
      for (r = 0; r < n.length; r++)
        if (
          (Y(n[r].semver),
          n[r].semver !== pn && n[r].semver.prerelease.length > 0)
        ) {
          var i = n[r].semver;
          if (i.major === e.major && i.minor === e.minor && i.patch === e.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  }
  K.satisfies = Er;
  function Er(n, e, t) {
    try {
      e = new ne(e, t);
    } catch (r) {
      return !1;
    }
    return e.test(n);
  }
  K.maxSatisfying = Oh;
  function Oh(n, e, t) {
    var r = null,
      i = null;
    try {
      var s = new ne(e, t);
    } catch (o) {
      return null;
    }
    return (
      n.forEach(function (o) {
        s.test(o) &&
          (!r || i.compare(o) === -1) &&
          ((r = o), (i = new H(r, t)));
      }),
      r
    );
  }
  K.minSatisfying = Nh;
  function Nh(n, e, t) {
    var r = null,
      i = null;
    try {
      var s = new ne(e, t);
    } catch (o) {
      return null;
    }
    return (
      n.forEach(function (o) {
        s.test(o) && (!r || i.compare(o) === 1) && ((r = o), (i = new H(r, t)));
      }),
      r
    );
  }
  K.minVersion = Lh;
  function Lh(n, e) {
    n = new ne(n, e);
    var t = new H("0.0.0");
    if (n.test(t) || ((t = new H("0.0.0-0")), n.test(t))) return t;
    t = null;
    for (var r = 0; r < n.set.length; ++r) {
      var i = n.set[r];
      i.forEach(function (s) {
        var o = new H(s.semver.version);
        switch (s.operator) {
          case ">":
            o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0),
              (o.raw = o.format());
          case "":
          case ">=":
            (!t || hn(t, o)) && (t = o);
            break;
          case "<":
          case "<=":
            break;
          default:
            throw new Error("Unexpected operation: " + s.operator);
        }
      });
    }
    return t && n.test(t) ? t : null;
  }
  K.validRange = kh;
  function kh(n, e) {
    try {
      return new ne(n, e).range || "*";
    } catch (t) {
      return null;
    }
  }
  K.ltr = xh;
  function xh(n, e, t) {
    return ds(n, e, "<", t);
  }
  K.gtr = jh;
  function jh(n, e, t) {
    return ds(n, e, ">", t);
  }
  K.outside = ds;
  function ds(n, e, t, r) {
    (n = new H(n, r)), (e = new ne(e, r));
    var i, s, o, a, l;
    switch (t) {
      case ">":
        (i = hn), (s = cs), (o = vr), (a = ">"), (l = ">=");
        break;
      case "<":
        (i = vr), (s = us), (o = hn), (a = "<"), (l = "<=");
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (Er(n, e, r)) return !1;
    for (var u = 0; u < e.set.length; ++u) {
      var f = e.set[u],
        c = null,
        C = null;
      if (
        (f.forEach(function (M) {
          M.semver === pn && (M = new Te(">=0.0.0")),
            (c = c || M),
            (C = C || M),
            i(M.semver, c.semver, r)
              ? (c = M)
              : o(M.semver, C.semver, r) && (C = M);
        }),
        c.operator === a ||
          c.operator === l ||
          ((!C.operator || C.operator === a) && s(n, C.semver)))
      )
        return !1;
      if (C.operator === l && o(n, C.semver)) return !1;
    }
    return !0;
  }
  K.prerelease = Fh;
  function Fh(n, e) {
    var t = St(n, e);
    return t && t.prerelease.length ? t.prerelease : null;
  }
  K.intersects = Uh;
  function Uh(n, e, t) {
    return (n = new ne(n, t)), (e = new ne(e, t)), n.intersects(e);
  }
  K.coerce = Wh;
  function Wh(n) {
    if (n instanceof H) return n;
    if (typeof n != "string") return null;
    var e = n.match(Z[al]);
    return e == null
      ? null
      : St(e[1] + "." + (e[2] || "0") + "." + (e[3] || "0"));
  }
});
h();
h();
h();
var Bt;
function z(n) {
  Bt && Bt("verbose", n);
}
function Ue(n) {
  Bt && Bt("error", n);
}
function ks(n) {
  Bt = n;
}
var Nr = class {
    constructor() {
      this.registered = !1;
      this.baseHandler = this.handleVSCodeApiMessages.bind(this);
    }
    register(e) {
      if (
        ((this.messageCallback = e),
        !this.vscodeApi && typeof acquireVsCodeApi != "undefined"
          ? (this.vscodeApi = acquireVsCodeApi())
          : !this.vscodeApi &&
            typeof window.acquireVsCodeApi != "undefined" &&
            (this.vscodeApi = window.acquireVsCodeApi()),
        this.vscodeApi || console.error("The vscode api is not set"),
        !this.registered)
      ) {
        (this.registered = !0),
          window.addEventListener("message", this.baseHandler);
        try {
          let t = this.vscodeApi;
          t &&
            t.handleMessage &&
            t.handleMessage(this.handleVSCodeApiMessages.bind(this));
        } catch (t) {}
      }
    }
    sendMessage(e, t) {
      this.vscodeApi
        ? this.vscodeApi.postMessage({ type: e, payload: t })
        : e === "IPyWidgets_logMessage"
          ? z(`Logging message ${e}, ${t}`)
          : z(`No vscode API to post message ${e}`);
    }
    dispose() {
      this.registered &&
        ((this.registered = !1),
        window.removeEventListener("message", this.baseHandler));
    }
    async handleVSCodeApiMessages(e) {
      let t = e.data;
      t && this.messageCallback && (await this.messageCallback(t));
    }
  },
  Lr = class {
    constructor(e) {
      this.kernelMessagingApi = e || {
        onDidReceiveKernelMessage,
        postKernelMessage,
      };
    }
    register(e) {
      (this.messageCallback = e),
        this.kernelHandler ||
          (this.kernelHandler =
            this.kernelMessagingApi.onDidReceiveKernelMessage(
              this.handleKernelMessage.bind(this)
            ));
    }
    sendMessage(e, t) {
      this.kernelMessagingApi.postKernelMessage({ type: e, payload: t });
    }
    dispose() {
      this.kernelHandler && this.kernelHandler.dispose();
    }
    async handleKernelMessage(e) {
      let t = e;
      t && this.messageCallback && (await this.messageCallback(t));
    }
  },
  yn = class {
    constructor(e) {
      this.kernelMessagingApi = e;
      this.handlers = [];
    }
    dispose() {
      this.messageApi && this.messageApi.dispose();
    }
    sendMessage(e, t) {
      return this.sendUnsafeMessage(e.toString(), t);
    }
    sendUnsafeMessage(e, t) {
      this.messageApi
        ? this.messageApi.sendMessage(e, t)
        : e === "IPyWidgets_logMessage"
          ? console.log("Message not sent", e, t)
          : z(`No message API to post message ${e}`);
    }
    addHandler(e) {
      this.acquireApi(), this.handlers.push(e);
    }
    removeHandler(e) {
      this.handlers = this.handlers.filter((t) => t !== e);
    }
    acquireApi() {
      this.messageApi ||
        (this.useKernelMessageApi()
          ? (this.messageApi = new Lr(this.kernelMessagingApi))
          : (this.messageApi = new Nr()),
        this.messageApi.register(this.handleMessage.bind(this)));
    }
    useKernelMessageApi() {
      return !!(
        (this.kernelMessagingApi &&
          typeof this.kernelMessagingApi.postKernelMessage != "undefined") ||
        typeof postKernelMessage != "undefined"
      );
    }
    async handleMessage(e) {
      this.handlers &&
        e &&
        this.handlers.forEach((t) => {
          t && t.handleMessage(e.type, e.payload);
        });
    }
  };
h();
h();
h();
h();
function xs(n) {
  if (typeof document != "undefined") {
    var e = document.createElement("style"),
      t = document.createTextNode(n);
    e.appendChild(t), document.head.appendChild(e);
  }
}
var js = `:root{--md-red-50: #FFEBEE;--md-red-100: #FFCDD2;--md-red-200: #EF9A9A;--md-red-300: #E57373;--md-red-400: #EF5350;--md-red-500: #F44336;--md-red-600: #E53935;--md-red-700: #D32F2F;--md-red-800: #C62828;--md-red-900: #B71C1C;--md-red-A100: #FF8A80;--md-red-A200: #FF5252;--md-red-A400: #FF1744;--md-red-A700: #D50000;--md-pink-50: #FCE4EC;--md-pink-100: #F8BBD0;--md-pink-200: #F48FB1;--md-pink-300: #F06292;--md-pink-400: #EC407A;--md-pink-500: #E91E63;--md-pink-600: #D81B60;--md-pink-700: #C2185B;--md-pink-800: #AD1457;--md-pink-900: #880E4F;--md-pink-A100: #FF80AB;--md-pink-A200: #FF4081;--md-pink-A400: #F50057;--md-pink-A700: #C51162;--md-purple-50: #F3E5F5;--md-purple-100: #E1BEE7;--md-purple-200: #CE93D8;--md-purple-300: #BA68C8;--md-purple-400: #AB47BC;--md-purple-500: #9C27B0;--md-purple-600: #8E24AA;--md-purple-700: #7B1FA2;--md-purple-800: #6A1B9A;--md-purple-900: #4A148C;--md-purple-A100: #EA80FC;--md-purple-A200: #E040FB;--md-purple-A400: #D500F9;--md-purple-A700: #AA00FF;--md-deep-purple-50: #EDE7F6;--md-deep-purple-100: #D1C4E9;--md-deep-purple-200: #B39DDB;--md-deep-purple-300: #9575CD;--md-deep-purple-400: #7E57C2;--md-deep-purple-500: #673AB7;--md-deep-purple-600: #5E35B1;--md-deep-purple-700: #512DA8;--md-deep-purple-800: #4527A0;--md-deep-purple-900: #311B92;--md-deep-purple-A100: #B388FF;--md-deep-purple-A200: #7C4DFF;--md-deep-purple-A400: #651FFF;--md-deep-purple-A700: #6200EA;--md-indigo-50: #E8EAF6;--md-indigo-100: #C5CAE9;--md-indigo-200: #9FA8DA;--md-indigo-300: #7986CB;--md-indigo-400: #5C6BC0;--md-indigo-500: #3F51B5;--md-indigo-600: #3949AB;--md-indigo-700: #303F9F;--md-indigo-800: #283593;--md-indigo-900: #1A237E;--md-indigo-A100: #8C9EFF;--md-indigo-A200: #536DFE;--md-indigo-A400: #3D5AFE;--md-indigo-A700: #304FFE;--md-blue-50: #E3F2FD;--md-blue-100: #BBDEFB;--md-blue-200: #90CAF9;--md-blue-300: #64B5F6;--md-blue-400: #42A5F5;--md-blue-500: #2196F3;--md-blue-600: #1E88E5;--md-blue-700: #1976D2;--md-blue-800: #1565C0;--md-blue-900: #0D47A1;--md-blue-A100: #82B1FF;--md-blue-A200: #448AFF;--md-blue-A400: #2979FF;--md-blue-A700: #2962FF;--md-light-blue-50: #E1F5FE;--md-light-blue-100: #B3E5FC;--md-light-blue-200: #81D4FA;--md-light-blue-300: #4FC3F7;--md-light-blue-400: #29B6F6;--md-light-blue-500: #03A9F4;--md-light-blue-600: #039BE5;--md-light-blue-700: #0288D1;--md-light-blue-800: #0277BD;--md-light-blue-900: #01579B;--md-light-blue-A100: #80D8FF;--md-light-blue-A200: #40C4FF;--md-light-blue-A400: #00B0FF;--md-light-blue-A700: #0091EA;--md-cyan-50: #E0F7FA;--md-cyan-100: #B2EBF2;--md-cyan-200: #80DEEA;--md-cyan-300: #4DD0E1;--md-cyan-400: #26C6DA;--md-cyan-500: #00BCD4;--md-cyan-600: #00ACC1;--md-cyan-700: #0097A7;--md-cyan-800: #00838F;--md-cyan-900: #006064;--md-cyan-A100: #84FFFF;--md-cyan-A200: #18FFFF;--md-cyan-A400: #00E5FF;--md-cyan-A700: #00B8D4;--md-teal-50: #E0F2F1;--md-teal-100: #B2DFDB;--md-teal-200: #80CBC4;--md-teal-300: #4DB6AC;--md-teal-400: #26A69A;--md-teal-500: #009688;--md-teal-600: #00897B;--md-teal-700: #00796B;--md-teal-800: #00695C;--md-teal-900: #004D40;--md-teal-A100: #A7FFEB;--md-teal-A200: #64FFDA;--md-teal-A400: #1DE9B6;--md-teal-A700: #00BFA5;--md-green-50: #E8F5E9;--md-green-100: #C8E6C9;--md-green-200: #A5D6A7;--md-green-300: #81C784;--md-green-400: #66BB6A;--md-green-500: #4CAF50;--md-green-600: #43A047;--md-green-700: #388E3C;--md-green-800: #2E7D32;--md-green-900: #1B5E20;--md-green-A100: #B9F6CA;--md-green-A200: #69F0AE;--md-green-A400: #00E676;--md-green-A700: #00C853;--md-light-green-50: #F1F8E9;--md-light-green-100: #DCEDC8;--md-light-green-200: #C5E1A5;--md-light-green-300: #AED581;--md-light-green-400: #9CCC65;--md-light-green-500: #8BC34A;--md-light-green-600: #7CB342;--md-light-green-700: #689F38;--md-light-green-800: #558B2F;--md-light-green-900: #33691E;--md-light-green-A100: #CCFF90;--md-light-green-A200: #B2FF59;--md-light-green-A400: #76FF03;--md-light-green-A700: #64DD17;--md-lime-50: #F9FBE7;--md-lime-100: #F0F4C3;--md-lime-200: #E6EE9C;--md-lime-300: #DCE775;--md-lime-400: #D4E157;--md-lime-500: #CDDC39;--md-lime-600: #C0CA33;--md-lime-700: #AFB42B;--md-lime-800: #9E9D24;--md-lime-900: #827717;--md-lime-A100: #F4FF81;--md-lime-A200: #EEFF41;--md-lime-A400: #C6FF00;--md-lime-A700: #AEEA00;--md-yellow-50: #FFFDE7;--md-yellow-100: #FFF9C4;--md-yellow-200: #FFF59D;--md-yellow-300: #FFF176;--md-yellow-400: #FFEE58;--md-yellow-500: #FFEB3B;--md-yellow-600: #FDD835;--md-yellow-700: #FBC02D;--md-yellow-800: #F9A825;--md-yellow-900: #F57F17;--md-yellow-A100: #FFFF8D;--md-yellow-A200: #FFFF00;--md-yellow-A400: #FFEA00;--md-yellow-A700: #FFD600;--md-amber-50: #FFF8E1;--md-amber-100: #FFECB3;--md-amber-200: #FFE082;--md-amber-300: #FFD54F;--md-amber-400: #FFCA28;--md-amber-500: #FFC107;--md-amber-600: #FFB300;--md-amber-700: #FFA000;--md-amber-800: #FF8F00;--md-amber-900: #FF6F00;--md-amber-A100: #FFE57F;--md-amber-A200: #FFD740;--md-amber-A400: #FFC400;--md-amber-A700: #FFAB00;--md-orange-50: #FFF3E0;--md-orange-100: #FFE0B2;--md-orange-200: #FFCC80;--md-orange-300: #FFB74D;--md-orange-400: #FFA726;--md-orange-500: #FF9800;--md-orange-600: #FB8C00;--md-orange-700: #F57C00;--md-orange-800: #EF6C00;--md-orange-900: #E65100;--md-orange-A100: #FFD180;--md-orange-A200: #FFAB40;--md-orange-A400: #FF9100;--md-orange-A700: #FF6D00;--md-deep-orange-50: #FBE9E7;--md-deep-orange-100: #FFCCBC;--md-deep-orange-200: #FFAB91;--md-deep-orange-300: #FF8A65;--md-deep-orange-400: #FF7043;--md-deep-orange-500: #FF5722;--md-deep-orange-600: #F4511E;--md-deep-orange-700: #E64A19;--md-deep-orange-800: #D84315;--md-deep-orange-900: #BF360C;--md-deep-orange-A100: #FF9E80;--md-deep-orange-A200: #FF6E40;--md-deep-orange-A400: #FF3D00;--md-deep-orange-A700: #DD2C00;--md-brown-50: #EFEBE9;--md-brown-100: #D7CCC8;--md-brown-200: #BCAAA4;--md-brown-300: #A1887F;--md-brown-400: #8D6E63;--md-brown-500: #795548;--md-brown-600: #6D4C41;--md-brown-700: #5D4037;--md-brown-800: #4E342E;--md-brown-900: #3E2723;--md-grey-50: #FAFAFA;--md-grey-100: #F5F5F5;--md-grey-200: #EEEEEE;--md-grey-300: #E0E0E0;--md-grey-400: #BDBDBD;--md-grey-500: #9E9E9E;--md-grey-600: #757575;--md-grey-700: #616161;--md-grey-800: #424242;--md-grey-900: #212121;--md-blue-grey-50: #ECEFF1;--md-blue-grey-100: #CFD8DC;--md-blue-grey-200: #B0BEC5;--md-blue-grey-300: #90A4AE;--md-blue-grey-400: #78909C;--md-blue-grey-500: #607D8B;--md-blue-grey-600: #546E7A;--md-blue-grey-700: #455A64;--md-blue-grey-800: #37474F;--md-blue-grey-900: #263238}:root{--jp-icon-search: none;--jp-ui-select-caret: none}:root{--jp-border-width: 1px;--jp-border-color0: var(--md-grey-700);--jp-border-color1: var(--md-grey-500);--jp-border-color2: var(--md-grey-300);--jp-border-color3: var(--md-grey-100);--jp-ui-icon-font-size: 14px;--jp-ui-font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;--jp-ui-font-color0: rgba(0,0,0,1);--jp-ui-font-color1: rgba(0,0,0,.8);--jp-ui-font-color2: rgba(0,0,0,.5);--jp-ui-font-color3: rgba(0,0,0,.3);--jp-ui-inverse-font-color0: rgba(255, 255, 255, 1);--jp-ui-inverse-font-color1: rgba(255, 255, 255, 1);--jp-ui-inverse-font-color2: rgba(255, 255, 255, .7);--jp-ui-inverse-font-color3: rgba(255, 255, 255, .5);--jp-inverse-ui-font-color0: rgba(255,255,255,1);--jp-inverse-ui-font-color1: rgba(255,255,255,1);--jp-inverse-ui-font-color2: rgba(255,255,255,.7);--jp-inverse-ui-font-color3: rgba(255,255,255,.5);--jp-content-font-size: 13px;--jp-content-line-height: 1.5;--jp-content-font-color0: black;--jp-content-font-color1: black;--jp-content-font-color2: var(--md-grey-700);--jp-content-font-color3: var(--md-grey-500);--jp-ui-font-scale-factor: 1.2;--jp-ui-font-size0: calc(var(--jp-ui-font-size1)/var(--jp-ui-font-scale-factor));--jp-ui-font-size1: 13px;--jp-ui-font-size2: calc(var(--jp-ui-font-size1)*var(--jp-ui-font-scale-factor));--jp-ui-font-size3: calc(var(--jp-ui-font-size2)*var(--jp-ui-font-scale-factor));--jp-code-font-size: 13px;--jp-code-line-height: 1.307;--jp-code-padding: 5px;--jp-code-font-family: monospace;--jp-layout-color0: white;--jp-layout-color1: white;--jp-layout-color2: var(--md-grey-200);--jp-layout-color3: var(--md-grey-400);--jp-brand-color0: var(--md-blue-700);--jp-brand-color1: var(--md-blue-500);--jp-brand-color2: var(--md-blue-300);--jp-brand-color3: var(--md-blue-100);--jp-accent-color0: var(--md-green-700);--jp-accent-color1: var(--md-green-500);--jp-accent-color2: var(--md-green-300);--jp-accent-color3: var(--md-green-100);--jp-warn-color0: var(--md-orange-700);--jp-warn-color1: var(--md-orange-500);--jp-warn-color2: var(--md-orange-300);--jp-warn-color3: var(--md-orange-100);--jp-error-color0: var(--md-red-700);--jp-error-color1: var(--md-red-500);--jp-error-color2: var(--md-red-300);--jp-error-color3: var(--md-red-100);--jp-success-color0: var(--md-green-700);--jp-success-color1: var(--md-green-500);--jp-success-color2: var(--md-green-300);--jp-success-color3: var(--md-green-100);--jp-info-color0: var(--md-cyan-700);--jp-info-color1: var(--md-cyan-500);--jp-info-color2: var(--md-cyan-300);--jp-info-color3: var(--md-cyan-100);--jp-cell-padding: 5px;--jp-cell-editor-background: #f7f7f7;--jp-cell-editor-border-color: #cfcfcf;--jp-cell-editor-background-edit: var(--jp-ui-layout-color1);--jp-cell-editor-border-color-edit: var(--jp-brand-color1);--jp-cell-prompt-width: 100px;--jp-cell-prompt-font-family: "Roboto Mono", monospace;--jp-cell-prompt-letter-spacing: 0px;--jp-cell-prompt-opacity: 1;--jp-cell-prompt-opacity-not-active: .4;--jp-cell-prompt-font-color-not-active: var(--md-grey-700);--jp-cell-inprompt-font-color: #307FC1;--jp-cell-outprompt-font-color: #BF5B3D;--jp-notebook-padding: 10px;--jp-notebook-scroll-padding: 100px;--jp-console-background: var(--md-grey-100);--jp-toolbar-border-color: var(--md-grey-400);--jp-toolbar-micro-height: 8px;--jp-toolbar-background: var(--jp-layout-color0);--jp-toolbar-box-shadow: 0px 0px 2px 0px rgba(0,0,0,.24);--jp-toolbar-header-margin: 4px 4px 0px 4px;--jp-toolbar-active-background: var(--md-grey-300)}
`;
xs(js);
var Wa = Ct(kr());
h();
var Ht = class {
  constructor() {
    this.event = (e, t, r) => {
      let i = this.add(t ? e.bind(t) : e);
      return r == null || r.push(i), i;
    };
  }
  get size() {
    return this.listeners
      ? typeof this.listeners == "function"
        ? 1
        : this.listeners.length
      : 0;
  }
  fire(e) {
    if (this.listeners)
      if (typeof this.listeners == "function") this.listeners(e);
      else for (let t of this.listeners) t(e);
  }
  dispose() {
    this.listeners = void 0;
  }
  add(e) {
    return (
      this.listeners
        ? typeof this.listeners == "function"
          ? (this.listeners = [this.listeners, e])
          : this.listeners.push(e)
        : (this.listeners = e),
      { dispose: () => this.rm(e) }
    );
  }
  rm(e) {
    if (!this.listeners) return;
    if (typeof this.listeners == "function") {
      this.listeners === e && (this.listeners = void 0);
      return;
    }
    let t = this.listeners.indexOf(e);
    t !== -1 &&
      (this.listeners.length === 2
        ? (this.listeners = t === 0 ? this.listeners[1] : this.listeners[0])
        : (this.listeners = this.listeners
            .slice(0, t)
            .concat(this.listeners.slice(t + 1))));
  }
};
h();
var ja = Ct(Ve()),
  Fa = Ct(fi());
h();
h();
h();
h();
var $d = "ms-toolsai.jupyter";
var Pa;
((t) => (
  (t.PythonInteractiveHelpLink = "https://aka.ms/pyaiinstall"),
  (t.JupyterDataRateHelpLink = "https://aka.ms/AA5ggm0")
))(Pa || (Pa = {}));
var Ma;
((s) => (
  (s.JupyterServerRemoteLaunchNameSeparator = `
`),
  (s.JupyterServerRemoteLaunchService = $d),
  (s.JupyterServerUriListMax = 10),
  (s.IntellisenseTimeout = 2e3),
  (s.IntellisenseResolveTimeout = 5e3)
))(Ma || (Ma = {}));
var Fi;
((w) => (
  (w.GeneratedThemeName = "ipython-theme"),
  (w.MatplotLibDefaultParams = "_VSCode_defaultMatplotlib_Params"),
  (w.MatplotLibFigureFormats = "_VSCode_matplotLib_FigureFormats"),
  (w.DefaultCodeCellMarker = "# %%"),
  (w.DefaultCommTarget = "jupyter.widget"),
  (w.ALL_VARIABLES = "ALL_VARIABLES"),
  (w.KERNEL_VARIABLES = "KERNEL_VARIABLES"),
  (w.DEBUGGER_VARIABLES = "DEBUGGER_VARIABLES"),
  (w.PYTHON_VARIABLES_REQUESTER = "PYTHON_VARIABLES_REQUESTER"),
  (w.MULTIPLEXING_DEBUGSERVICE = "MULTIPLEXING_DEBUGSERVICE"),
  (w.RUN_BY_LINE_DEBUGSERVICE = "RUN_BY_LINE_DEBUGSERVICE"),
  (w.REMOTE_URI = "https://remote/"),
  (w.REMOTE_URI_ID_PARAM = "id"),
  (w.REMOTE_URI_HANDLE_PARAM = "uriHandle"),
  (w.REMOTE_URI_EXTENSION_ID_PARAM = "extensionId")
))(Fi || (Fi = {}));
var Ta;
((r) => (
  (r.ImportIPython = `{0}
from IPython import get_ipython

{1}`),
  (r.MatplotLibInit = `import matplotlib
%matplotlib inline
${Fi.MatplotLibDefaultParams} = dict(matplotlib.rcParams)
`),
  (r.DisableJedi = "%config Completer.use_jedi = False")
))(Ta || (Ta = {}));
var je;
((T) => (
  (T.RunAllCells = "jupyter.runallcells"),
  (T.RunAllCellsAbove = "jupyter.runallcellsabove"),
  (T.RunCellAndAllBelow = "jupyter.runcellandallbelow"),
  (T.RunAllCellsAbovePalette = "jupyter.runallcellsabove.palette"),
  (T.RunCellAndAllBelowPalette = "jupyter.runcurrentcellandallbelow.palette"),
  (T.RunToLine = "jupyter.runtoline"),
  (T.RunFromLine = "jupyter.runfromline"),
  (T.RunCell = "jupyter.runcell"),
  (T.RunCurrentCell = "jupyter.runcurrentcell"),
  (T.RunCurrentCellAdvance = "jupyter.runcurrentcelladvance"),
  (T.CreateNewInteractive = "jupyter.createnewinteractive"),
  (T.ImportNotebook = "jupyter.importnotebook"),
  (T.ImportNotebookFile = "jupyter.importnotebookfile"),
  (T.ExportFileAsNotebook = "jupyter.exportfileasnotebook"),
  (T.ExportFileAndOutputAsNotebook = "jupyter.exportfileandoutputasnotebook"),
  (T.InterruptKernel = "jupyter.interruptkernel"),
  (T.RestartKernel = "jupyter.restartkernel"),
  (T.RestartKernelAndRunAllCells = "jupyter.restartkernelandrunallcells"),
  (T.RestartKernelAndRunUpToSelectedCell =
    "jupyter.restartkernelandrunuptoselectedcell"),
  (T.NotebookEditorRemoveAllCells = "jupyter.notebookeditor.removeallcells"),
  (T.NotebookEditorRunAllCells = "jupyter.notebookeditor.runallcells"),
  (T.NotebookEditorRunSelectedCell = "jupyter.notebookeditor.runselectedcell"),
  (T.NotebookEditorAddCellBelow = "jupyter.notebookeditor.addcellbelow"),
  (T.ExpandAllCells = "jupyter.expandallcells"),
  (T.CollapseAllCells = "jupyter.collapseallcells"),
  (T.ExportOutputAsNotebook = "jupyter.exportoutputasnotebook"),
  (T.ExecSelectionInInteractiveWindow = "jupyter.execSelectionInteractive"),
  (T.RunFileInInteractiveWindows = "jupyter.runFileInteractive"),
  (T.DebugFileInInteractiveWindows = "jupyter.debugFileInteractive"),
  (T.AddCellBelow = "jupyter.addcellbelow"),
  (T.DebugCurrentCellPalette = "jupyter.debugcurrentcell.palette"),
  (T.DebugCell = "jupyter.debugcell"),
  (T.DebugStepOver = "jupyter.debugstepover"),
  (T.DebugContinue = "jupyter.debugcontinue"),
  (T.DebugStop = "jupyter.debugstop"),
  (T.RunCurrentCellAndAddBelow = "jupyter.runcurrentcellandaddbelow"),
  (T.InsertCellBelowPosition = "jupyter.insertCellBelowPosition"),
  (T.InsertCellBelow = "jupyter.insertCellBelow"),
  (T.InsertCellAbove = "jupyter.insertCellAbove"),
  (T.DeleteCells = "jupyter.deleteCells"),
  (T.SelectCell = "jupyter.selectCell"),
  (T.SelectCellContents = "jupyter.selectCellContents"),
  (T.ExtendSelectionByCellAbove = "jupyter.extendSelectionByCellAbove"),
  (T.ExtendSelectionByCellBelow = "jupyter.extendSelectionByCellBelow"),
  (T.MoveCellsUp = "jupyter.moveCellsUp"),
  (T.MoveCellsDown = "jupyter.moveCellsDown"),
  (T.ChangeCellToMarkdown = "jupyter.changeCellToMarkdown"),
  (T.ChangeCellToCode = "jupyter.changeCellToCode"),
  (T.GotoNextCellInFile = "jupyter.gotoNextCellInFile"),
  (T.GotoPrevCellInFile = "jupyter.gotoPrevCellInFile"),
  (T.ScrollToCell = "jupyter.scrolltocell"),
  (T.CreateNewNotebook = "jupyter.createnewnotebook"),
  (T.ViewJupyterOutput = "jupyter.viewOutput"),
  (T.ExportAsPythonScript = "jupyter.exportAsPythonScript"),
  (T.ExportToHTML = "jupyter.exportToHTML"),
  (T.ExportToPDF = "jupyter.exportToPDF"),
  (T.Export = "jupyter.export"),
  (T.NativeNotebookExport = "jupyter.notebookeditor.export"),
  (T.LatestExtension = "jupyter.latestExtension"),
  (T.EnableLoadingWidgetsFrom3rdPartySource =
    "jupyter.enableLoadingWidgetScriptsFromThirdPartySource"),
  (T.ShowDataViewer = "jupyter.showDataViewer"),
  (T.ShowJupyterDataViewer = "jupyter.showJupyterDataViewer"),
  (T.RefreshDataViewer = "jupyter.refreshDataViewer"),
  (T.ClearSavedJupyterUris = "jupyter.clearSavedJupyterUris"),
  (T.OpenVariableView = "jupyter.openVariableView"),
  (T.OpenOutlineView = "jupyter.openOutlineView"),
  (T.InteractiveClearAll = "jupyter.interactive.clearAllCells"),
  (T.InteractiveGoToCode = "jupyter.interactive.goToCode"),
  (T.InteractiveCopyCell = "jupyter.interactive.copyCell"),
  (T.InteractiveExportAsNotebook = "jupyter.interactive.exportasnotebook"),
  (T.InteractiveExportAs = "jupyter.interactive.exportas"),
  (T.RunByLine = "jupyter.runByLine"),
  (T.RunAndDebugCell = "jupyter.runAndDebugCell"),
  (T.RunByLineNext = "jupyter.runByLineNext"),
  (T.RunByLineStop = "jupyter.runByLineStop"),
  (T.ReplayPylanceLog = "jupyter.replayPylanceLog"),
  (T.ReplayPylanceLogStep = "jupyter.replayPylanceLogStep"),
  (T.InstallPythonExtensionViaKernelPicker =
    "jupyter.installPythonExtensionViaKernelPicker"),
  (T.InstallPythonViaKernelPicker = "jupyter.installPythonViaKernelPicker"),
  (T.ContinueEditSessionInCodespace = "jupyter.continueEditSessionInCodespace")
))(je || (je = {}));
var Oa;
((r) => (
  (r.DefaultDesignLenses = [
    je.RunCurrentCell,
    je.RunAllCellsAbove,
    je.DebugCell,
  ]),
  (r.DefaultDebuggingLenses = [
    je.DebugContinue,
    je.DebugStop,
    je.DebugStepOver,
  ]),
  (r.DebuggerCommands = [je.DebugContinue, je.DebugStop, je.DebugStepOver])
))(Oa || (Oa = {}));
var Na;
((O) => (
  (O.HasCodeCells = "jupyter.hascodecells"),
  (O.IsInteractiveActive = "jupyter.isinteractiveactive"),
  (O.OwnsSelection = "jupyter.ownsSelection"),
  (O.HaveNativeCells = "jupyter.havenativecells"),
  (O.HaveNative = "jupyter.havenative"),
  (O.IsNativeActive = "jupyter.isnativeactive"),
  (O.IsInteractiveOrNativeActive = "jupyter.isinteractiveornativeactive"),
  (O.IsPythonOrNativeActive = "jupyter.ispythonornativeactive"),
  (O.IsPythonOrInteractiveActive = "jupyter.ispythonorinteractiveeactive"),
  (O.IsPythonOrInteractiveOrNativeActive =
    "jupyter.ispythonorinteractiveornativeeactive"),
  (O.CanRestartNotebookKernel =
    "jupyter.notebookeditor.canrestartNotebookkernel"),
  (O.CanInterruptNotebookKernel =
    "jupyter.notebookeditor.canInterruptNotebookKernel"),
  (O.CanRestartInteractiveWindowKernel =
    "jupyter.interactive.canRestartNotebookKernel"),
  (O.CanInterruptInteractiveWindowKernel =
    "jupyter.interactive.canInterruptNotebookKernel"),
  (O.RunByLineCells = "jupyter.notebookeditor.runByLineCells"),
  (O.RunByLineDocuments = "jupyter.notebookeditor.runByLineDocuments"),
  (O.DebugDocuments = "jupyter.notebookeditor.debugDocuments"),
  (O.IsPythonNotebook = "jupyter.ispythonnotebook"),
  (O.IsJupyterKernelSelected = "jupyter.kernel.isjupyter"),
  (O.IsDataViewerActive = "jupyter.dataViewerActive"),
  (O.HasNativeNotebookOrInteractiveWindowOpen =
    "jupyter.hasNativeNotebookOrInteractiveWindowOpen"),
  (O.ZmqAvailable = "jupyter.zmqavailable"),
  (O.ReplayLogLoaded = "jupyter.replayLogLoaded"),
  (O.KernelSource = "jupyter.kernelSource")
))(Na || (Na = {}));
var La;
((l) => (
  (l.PythonCellMarker =
    /^(#\s*%%|#\s*\<codecell\>|#\s*In\[\d*?\]|#\s*In\[ \])/),
  (l.PythonMarkdownCellMarker =
    /^(#\s*%%\s*\[markdown\]|#\s*\<markdowncell\>)/),
  (l.UrlPatternRegEx =
    "(?<PREFIX>https?:\\/\\/)((\\(.+\\s+or\\s+(?<IP>.+)\\))|(?<LOCAL>[^\\s]+))(?<REST>:.+)"),
  (l.HttpPattern = /https?:\/\//),
  (l.ShapeSplitterRegEx = /.*,\s*(\d+).*/),
  (l.SvgHeightRegex = /(\<svg.*height=\")(.*?)\"/),
  (l.SvgWidthRegex = /(\<svg.*width=\")(.*?)\"/),
  (l.SvgSizeTagRegex = /\<svg.*tag=\"sizeTag=\{(.*),\s*(.*)\}\"/)
))(La || (La = {}));
var Wg = Symbol("DataScienceStartupTime");
var Ui = "application/vnd.jupyter.widget-view+json",
  Wi = "application/vnd.jupyter.widget-state+json";
function yt() {}
h();
var Jd = Symbol("MicrotaskDelay");
var Ki = class {
  constructor(e = null) {
    this.scope = e;
    this._resolved = !1;
    this._rejected = !1;
    this._promise = new Promise((t, r) => {
      (this._resolve = t), (this._reject = r);
    });
  }
  get value() {
    return this._value;
  }
  resolve(e) {
    (this._value = e),
      this._resolve.apply(this.scope ? this.scope : this, arguments),
      (this._resolved = !0);
  }
  reject(e) {
    this._reject.apply(this.scope ? this.scope : this, arguments),
      (this._rejected = !0);
  }
  get promise() {
    return this._promise;
  }
  get resolved() {
    return this._resolved;
  }
  get rejected() {
    return this._rejected;
  }
  get completed() {
    return this._rejected || this._resolved;
  }
};
function Fe(n = null) {
  return new Ki(n);
}
h();
function ka(n) {
  if (!n || !Array.isArray(n) || n.length === 0) return;
  let e = [];
  for (let t = 0; t < n.length; t += 1) {
    let r = n[t];
    if ("buffer" in r && "byteOffset" in r) {
      let i = Array.apply(null, new Uint8Array(r.buffer));
      e.push({
        ...r,
        byteLength: r.byteLength,
        byteOffset: r.byteOffset,
        buffer: i,
      });
    } else e.push([...new Uint8Array(r)]);
  }
  return e;
}
function xa(n) {
  if (!Array.isArray(n) || n.length === 0) return n;
  let e = [];
  for (let t = 0; t < n.length; t += 1) {
    let r = n[t];
    if ("buffer" in r && "byteOffset" in r) {
      let i = new Uint8Array(r.buffer).buffer,
        s = new DataView(i, r.byteOffset, r.byteLength);
      e.push(s);
    } else {
      let i = new Uint8Array(r).buffer;
      e.push(i);
    }
  }
  return e;
}
var qi = class n {
  constructor(e, t) {
    this.postOffice = t;
    this.hookResults = new Map();
    let r;
    class i {
      constructor() {
        this.sendEnabled = !0;
        r = this;
      }
      close(l, u) {}
      send(l) {
        this.sendEnabled &&
          (typeof l == "string"
            ? t.sendMessage("IPyWidgets_msg", l)
            : t.sendMessage("IPyWidgets_binary_msg", ka([l])));
      }
    }
    let s = ja.ServerConnection.makeSettings({
      WebSocket: i,
      wsUrl: "BOGUS_PVSC",
    });
    (this.awaitingExtensionMessage = new Map()),
      (this.realKernel = new Fa.KernelConnection({
        serverSettings: s,
        clientId: e.clientId,
        handleComms: !0,
        username: e.userName,
        model: e.model,
      }));
    let o = ce();
    (this._ioPubMessageSignal = new o.Signal(this)),
      this.realKernel.iopubMessage.connect(this.onIOPubMessage, this),
      (this._options = e),
      t.addHandler(this),
      (this.websocket = r),
      (this.messageHook = this.messageHookInterceptor.bind(this)),
      (this.messageHooks = new Map()),
      this.fakeOpenSocket();
  }
  get iopubMessage() {
    return this._ioPubMessageSignal;
  }
  get statusChanged() {
    return this.realKernel.statusChanged;
  }
  get connectionStatusChanged() {
    return this.realKernel.connectionStatusChanged;
  }
  get unhandledMessage() {
    return this.realKernel.unhandledMessage;
  }
  get anyMessage() {
    return this.realKernel.anyMessage;
  }
  get serverSettings() {
    return this.realKernel.serverSettings;
  }
  get id() {
    return this.realKernel.id;
  }
  get name() {
    return this.realKernel.name;
  }
  get model() {
    return this.realKernel.model;
  }
  get username() {
    return this.realKernel.username;
  }
  get clientId() {
    return this.realKernel.clientId;
  }
  get status() {
    return this.realKernel.status;
  }
  get handleComms() {
    return this.realKernel.handleComms;
  }
  get isDisposed() {
    return this.realKernel.isDisposed;
  }
  get connectionStatus() {
    return this.realKernel.connectionStatus;
  }
  get spec() {
    return this.realKernel.spec;
  }
  get info() {
    return this.realKernel.info;
  }
  get hasComm() {
    return this.realKernel.hasComm;
  }
  createComm(e, t) {
    return this.realKernel.createComm(e, t);
  }
  get disposed() {
    return this.realKernel.disposed;
  }
  clone(e) {
    return new n(
      {
        ...this._options,
        clientId: (e == null ? void 0 : e.clientId) || this._options.clientId,
        userName: (e == null ? void 0 : e.username) || this._options.userName,
      },
      this.postOffice
    );
  }
  shutdown() {
    return this.realKernel.shutdown();
  }
  sendShellMessage(e, t, r) {
    return this.realKernel.sendShellMessage(e, t, r);
  }
  sendControlMessage(e, t, r) {
    return this.realKernel.sendControlMessage(e, t, r);
  }
  reconnect() {
    return this.realKernel.reconnect();
  }
  interrupt() {
    return this.realKernel.interrupt();
  }
  restart() {
    return this.realKernel.restart();
  }
  requestKernelInfo() {
    return this.realKernel.requestKernelInfo();
  }
  requestComplete(e) {
    return this.realKernel.requestComplete(e);
  }
  requestInspect(e) {
    return this.realKernel.requestInspect(e);
  }
  requestHistory(e) {
    return this.realKernel.requestHistory(e);
  }
  requestExecute(e, t, r) {
    return this.realKernel.requestExecute(e, t, r);
  }
  requestDebug(e, t) {
    return this.realKernel.requestDebug(e, t);
  }
  requestIsComplete(e) {
    return this.realKernel.requestIsComplete(e);
  }
  requestCommInfo(e) {
    return this.realKernel.requestCommInfo(e);
  }
  sendInputReply(e) {
    return this.realKernel.sendInputReply(e);
  }
  registerCommTarget(e, t) {
    return (
      this.postOffice.sendMessage("IPyWidgets_registerCommTarget", e),
      this.realKernel.registerCommTarget(e, t)
    );
  }
  removeCommTarget(e, t) {
    return this.realKernel.removeCommTarget(e, t);
  }
  dispose() {
    return this.postOffice.removeHandler(this), this.realKernel.dispose();
  }
  handleMessage(e, t) {
    switch (e) {
      case "IPyWidgets_MessageHookCall":
        this.sendHookResult(t);
        break;
      case "IPyWidgets_msg":
        this.websocket &&
          this.websocket.onmessage &&
          this.websocket.onmessage({
            target: this.websocket,
            data: t.data,
            type: "",
          }),
          this.sendResponse(t.id);
        break;
      case "IPyWidgets_binary_msg":
        if (this.websocket && this.websocket.onmessage) {
          let r = xa(t.data)[0];
          this.websocket.onmessage({
            target: this.websocket,
            data: r,
            type: "",
          });
        }
        this.sendResponse(t.id);
        break;
      case "IPyWidgets_mirror_execute":
        this.handleMirrorExecute(t);
        break;
      case "IPyWidgets_ExtensionOperationHandled":
        this.extensionOperationFinished(t);
        break;
      case "IPyWidgets_registerCommTarget":
        this.realKernel.registerCommTarget(t, yt);
        break;
      default:
        break;
    }
    return !0;
  }
  registerMessageHook(e, t) {
    let r = Fe(),
      i = this.generateExtensionResponseKey(
        e,
        "IPyWidgets_RegisterMessageHook".toString()
      );
    this.awaitingExtensionMessage.set(i, r),
      this.postOffice.sendMessage("IPyWidgets_RegisterMessageHook", e),
      this.messageHooks.set(e, t),
      this.realKernel.registerMessageHook(e, this.messageHook);
  }
  removeMessageHook(e, t) {
    let r = Fe(),
      i = this.generateExtensionResponseKey(
        e,
        "IPyWidgets_RemoveMessageHook".toString()
      );
    this.awaitingExtensionMessage.set(i, r),
      this.postOffice.sendMessage("IPyWidgets_RemoveMessageHook", {
        hookMsgId: e,
        lastHookedMsgId: this.lastHookedMessageId,
      }),
      this.messageHooks.delete(e),
      (this.lastHookedMessageId = void 0),
      this.realKernel.removeMessageHook(e, this.messageHook);
  }
  extensionOperationFinished(e) {
    let t = `${e.id}${e.type}`,
      r = this.awaitingExtensionMessage.get(t);
    r && (r.resolve(), this.awaitingExtensionMessage.delete(t));
  }
  sendResponse(e) {
    this.postOffice.sendMessage("IPyWidgets_msg_received", { id: e });
  }
  generateExtensionResponseKey(e, t) {
    return `${e}${t}`;
  }
  fakeOpenSocket() {
    let e = this.realKernel.requestKernelInfo.bind(this.realKernel);
    (this.realKernel.requestKernelInfo = () => (
      (this.realKernel.requestKernelInfo = e), Promise.resolve()
    )),
      this.websocket && this.websocket.onopen({ target: this.websocket }),
      (this.realKernel.requestKernelInfo = e);
  }
  messageHookInterceptor(e) {
    try {
      this.lastHookedMessageId = e.header.msg_id;
      let t = this.messageHooks.get(e.parent_header.msg_id);
      if (t) {
        let r = t(e);
        return (
          this.hookResults.set(e.header.msg_id, r),
          r.then ? r.then((i) => i) : r
        );
      }
    } catch (t) {}
    return !1;
  }
  sendHookResult(e) {
    let t = this.hookResults.get(e.msg.header.msg_id);
    t !== void 0
      ? (this.hookResults.delete(e.msg.header.msg_id),
        t.then
          ? t.then((r) => {
              this.postOffice.sendMessage("IPyWidgets_MessageHookResult", {
                requestId: e.requestId,
                parentId: e.parentId,
                msgType: e.msg.header.msg_type,
                result: r,
              });
            })
          : this.postOffice.sendMessage("IPyWidgets_MessageHookResult", {
              requestId: e.requestId,
              parentId: e.parentId,
              msgType: e.msg.header.msg_type,
              result: t === !0,
            }))
      : this.postOffice.sendMessage("IPyWidgets_MessageHookResult", {
          requestId: e.requestId,
          parentId: e.parentId,
          msgType: e.msg.header.msg_type,
          result: !0,
        });
  }
  handleMirrorExecute(e) {
    try {
      (this.websocket.sendEnabled = !1),
        this.realKernel.sendShellMessage(e.msg, !1, e.msg.content.silent);
    } finally {
      this.websocket.sendEnabled = !0;
    }
    this.sendResponse(e.id);
  }
  onIOPubMessage(e, t) {
    if (this.awaitingExtensionMessage.size <= 0) this.finishIOPubMessage(t);
    else {
      let r = Array.from(this.awaitingExtensionMessage.values()).map(
        (i) => i.promise
      );
      Promise.all(r)
        .then(() => {
          this.finishIOPubMessage(t);
        })
        .catch((i) => {
          window.console.error("Failed to send iopub_msg_handled message", i);
        });
    }
  }
  finishIOPubMessage(e) {
    this.postOffice.sendMessage("IPyWidgets_iopub_msg_handled", {
      id: e.header.msg_id,
    }),
      this._ioPubMessageSignal.emit(e);
  }
};
function Ua(n, e, t) {
  let r = new qi(n, e);
  return t.forEach((i) => r.handleMessage(i.message, i.payload)), r;
}
var lt = class lt {
  constructor(e, t, r, i, s) {
    this.widgetContainer = e;
    this.postOffice = t;
    this.scriptLoader = r;
    this.JupyterLabWidgetManager = i;
    this.widgetState = s;
    this.pendingMessages = [];
    this.modelIdsToBeDisplayed = new Map();
    this.offlineModelIds = new Set();
    this.postOffice.addHandler(this),
      this.postOffice.sendMessage("IPyWidgets_Ready"),
      ks((o, a) => {
        this.postOffice.sendMessage("IPyWidgets_logMessage", {
          category: o,
          message: a,
        }),
          o === "error" && console.error(a);
      }),
      s &&
        this.initializeKernelAndWidgetManager(
          { clientId: "", id: "", model: { id: "", name: "" }, userName: "" },
          s
        );
  }
  static get onDidChangeInstance() {
    return lt._onDidChangeInstance.event;
  }
  dispose() {
    var e;
    (e = this.proxyKernel) == null || e.dispose(),
      this.postOffice.removeHandler(this),
      this.clear().catch(yt);
  }
  async clear() {
    var e;
    await ((e = this.manager) == null ? void 0 : e.clear_state());
  }
  handleMessage(e, t) {
    var r, i;
    return (
      e === "IPyWidgets_kernelOptions"
        ? (z("Received IPyWidgetMessages.IPyWidgets_kernelOptions"),
          this.initializeKernelAndWidgetManager(t))
        : e === "IPyWidgets_IsReadyRequest"
          ? (z("Received IPyWidgetMessages.IPyWidgets_IsReadyRequest"),
            this.postOffice.sendMessage("IPyWidgets_Ready"))
          : e === "IPyWidgets_onRestartKernel"
            ? (z("Received IPyWidgetMessages.IPyWidgets_onRestartKernel"),
              (r = this.manager) == null || r.dispose(),
              (this.manager = void 0),
              (i = this.proxyKernel) == null || i.dispose(),
              (this.proxyKernel = void 0),
              (lt.instance = void 0),
              lt._onDidChangeInstance.fire(void 0))
            : this.proxyKernel ||
              (z(`Received some pending message ${e}`),
              this.pendingMessages.push({ message: e, payload: t })),
      !0
    );
  }
  async restoreWidgets(e, t) {
    if (!e || !(t != null && t.loadNotebook)) return;
    if (!this.manager) throw new Error("DS IPyWidgetManager not initialized.");
    await this.manager.restoreWidgets(e, t);
    let r = e.metadata.get("widgets"),
      i = r && r[Wi] ? r[Wi] : void 0;
    if (i) {
      let s = Fe();
      s.resolve(),
        Object.keys(i.state).forEach((o) => {
          this.modelIdsToBeDisplayed.set(o, s), this.offlineModelIds.add(o);
        });
    }
  }
  async renderWidget(e, t) {
    if (!e)
      throw new Error(
        "application/vnd.jupyter.widget-view+json not in msg.content.data, as msg.content.data is 'undefined'."
      );
    if (!this.manager) throw new Error("DS IPyWidgetManager not initialized.");
    if (!e || e.version_major !== 2) {
      console.warn("Widget data not available to render an ipywidget");
      return;
    }
    let r = e.model_id;
    this.modelIdsToBeDisplayed.has(r) ||
      this.modelIdsToBeDisplayed.set(r, Fe()),
      z(`Waiting for model to be available before rendering it ${e.model_id}`),
      await this.modelIdsToBeDisplayed.get(r).promise;
    let i = this.manager.get_model(e.model_id);
    if (!i) {
      console.warn("Widget model not available to render an ipywidget");
      return;
    }
    let s = await i;
    this.widgetState && this.offlineModelIds.has(r) && (s.comm_live = !1);
    let o = await this.manager.create_view(s, { el: t });
    return (
      this.widgetState && o.initialize({ model: s, el: t, options: {} }),
      this.manager.display_view(e, o, { node: t })
    );
  }
  initializeKernelAndWidgetManager(e, t) {
    var r, i;
    if (
      !(this.manager && this.proxyKernel && (0, Wa.default)(e, this.options))
    ) {
      (this.options = e),
        (r = this.proxyKernel) == null || r.dispose(),
        (this.proxyKernel = Ua(e, this.postOffice, this.pendingMessages)),
        (this.pendingMessages = []),
        (i = this.manager) == null || i.dispose();
      try {
        (this.manager = new this.JupyterLabWidgetManager(
          this.proxyKernel,
          this.widgetContainer,
          this.scriptLoader,
          z,
          t
        )),
          this.proxyKernel.iopubMessage.connect(
            this.handleDisplayDataMessage.bind(this)
          ),
          this.manager.onUnhandledIOPubMessage.connect(
            this.handleUnhandledIOPubMessage.bind(this)
          ),
          (lt.instance = this),
          lt._onDidChangeInstance.fire(this);
      } catch (s) {
        console.error("Failed to initialize WidgetManager", s);
      }
    }
  }
  handleDisplayDataMessage(e, t) {
    let r = Ve();
    if (
      !r.KernelMessage.isDisplayDataMsg(t) &&
      !r.KernelMessage.isExecuteResultMsg(t)
    )
      return;
    let i = t;
    if (i.content && i.content.data && i.content.data[Ui]) {
      let s = i.content.data[Ui],
        o = s.model_id;
      z(`Received display data message ${o}`);
      let a = this.modelIdsToBeDisplayed.get(o);
      if (
        (a || ((a = Fe()), this.modelIdsToBeDisplayed.set(o, a)), !this.manager)
      )
        throw new Error("DS IPyWidgetManager not initialized");
      let l = this.manager.get_model(s.model_id);
      l
        ? l
            .then((u) => (a == null ? void 0 : a.resolve()))
            .catch((u) => (a == null ? void 0 : a.reject(u)))
        : a.resolve();
    }
  }
  handleUnhandledIOPubMessage(e, t) {
    this.postOffice.sendMessage("ipywidget_unhandled_kernel_message", t);
  }
};
lt._onDidChangeInstance = new Ht();
var Lt = lt;
h();
var Sl = Ct(kr()),
  wl = Ct(Xa());
h();
var th = "https://unpkg.com/",
  nh = "https://cdn.jsdelivr.net/npm/requirejs@2.3.6/bin/r.min.js",
  rh = 1e3,
  Hi = !1;
async function $i() {
  if (Hi) return !0;
  let n = new AbortController(),
    e,
    t = new Promise((r) => {
      e = setTimeout(() => {
        r(!1), n.abort();
      }, rh);
    });
  t.catch(() => {});
  try {
    return (
      (Hi = await Promise.race([Qa(th, n.signal), Qa(nh, n.signal), t])), Hi
    );
  } finally {
    e && clearInterval(e);
  }
}
async function Qa(n, e) {
  let t = 1;
  try {
    for (t = 0; t <= 5; t++) if ((await fetch(n, { signal: e })).ok) return !0;
    return !1;
  } catch (r) {
    return (
      Ue(
        `Failed to access CDN ${n} after ${t} attempt(s), ${(r || "").toString()}`
      ),
      !1
    );
  }
}
h();
h();
h();
var hr;
((E) => {
  function n(m) {
    return m && typeof m == "object" && typeof m[Symbol.iterator] == "function";
  }
  E.is = n;
  let e = Object.freeze([]);
  function t() {
    return e;
  }
  E.empty = t;
  function* r(m) {
    yield m;
  }
  E.single = r;
  function i(m) {
    return n(m) ? m : r(m);
  }
  E.wrap = i;
  function s(m) {
    return m || e;
  }
  E.from = s;
  function o(m) {
    return !m || m[Symbol.iterator]().next().done === !0;
  }
  E.isEmpty = o;
  function a(m) {
    return m[Symbol.iterator]().next().value;
  }
  E.first = a;
  function l(m, b) {
    for (let y of m) if (b(y)) return !0;
    return !1;
  }
  E.some = l;
  function u(m, b) {
    for (let y of m) if (b(y)) return y;
  }
  E.find = u;
  function* f(m, b) {
    for (let y of m) b(y) && (yield y);
  }
  E.filter = f;
  function* c(m, b) {
    let y = 0;
    for (let L of m) yield b(L, y++);
  }
  E.map = c;
  function* C(...m) {
    for (let b of m) for (let y of b) yield y;
  }
  E.concat = C;
  function M(m, b, y) {
    let L = y;
    for (let q of m) L = b(L, q);
    return L;
  }
  E.reduce = M;
  function* S(m, b, y = m.length) {
    for (
      b < 0 && (b += m.length),
        y < 0 ? (y += m.length) : y > m.length && (y = m.length);
      b < y;
      b++
    )
      yield m[b];
  }
  E.slice = S;
  function w(m, b = Number.POSITIVE_INFINITY) {
    let y = [];
    if (b === 0) return [y, m];
    let L = m[Symbol.iterator]();
    for (let q = 0; q < b; q++) {
      let F = L.next();
      if (F.done) return [y, E.empty()];
      y.push(F.value);
    }
    return [
      y,
      {
        [Symbol.iterator]() {
          return L;
        },
      },
    ];
  }
  E.consume = w;
})(hr || (hr = {}));
var Ji;
function ih(n) {
  return Ji == null || Ji.push(n), n;
}
function pr(n) {
  if (hr.is(n)) {
    for (let e of n)
      if (e)
        try {
          e.dispose();
        } catch (t) {
          console.warn(`dispose() failed for ${e}`, t);
        }
    return Array.isArray(n) ? [] : n;
  } else if (n) return n.dispose(), n;
}
var fr = class fr {
  constructor(...e) {
    this._toDispose = new Set();
    this._isDisposed = !1;
    e.forEach((t) => this.add(t)), ih(this);
  }
  dispose() {
    this._isDisposed || ((this._isDisposed = !0), this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0)
      try {
        pr(this._toDispose);
      } finally {
        this._toDispose.clear();
      }
  }
  add(e) {
    if (!e) return e;
    if (e === this) throw new Error("Cannot register a disposable on itself!");
    return (
      this._isDisposed
        ? fr.DISABLE_DISPOSED_WARNING ||
          console.warn(
            new Error(
              "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!"
            ).stack
          )
        : this._toDispose.add(e),
      e
    );
  }
};
fr.DISABLE_DISPOSED_WARNING = !1;
var Za = fr;
var el = class {
  constructor() {
    this._store = new Map();
    this._isDisposed = !1;
  }
  dispose() {
    (this._isDisposed = !0), this.clearAndDisposeAll();
  }
  clearAndDisposeAll() {
    if (this._store.size)
      try {
        pr(this._store.values());
      } finally {
        this._store.clear();
      }
  }
  has(e) {
    return this._store.has(e);
  }
  get(e) {
    return this._store.get(e);
  }
  set(e, t, r = !1) {
    var i;
    this._isDisposed &&
      console.warn(
        new Error(
          "Trying to add a disposable to a DisposableMap that has already been disposed of. The added object will be leaked!"
        ).stack
      ),
      r || (i = this._store.get(e)) == null || i.dispose(),
      this._store.set(e, t);
  }
  deleteAndDispose(e) {
    var t;
    (t = this._store.get(e)) == null || t.dispose(), this._store.delete(e);
  }
  [Symbol.iterator]() {
    return this._store[Symbol.iterator]();
  }
};
h();
var Ir = Ct(ml()),
  vl = "1.1.1",
  Kh = "qgrid";
function yl(n, e, t, r) {
  if (n.source === "cdn" || !t || n.moduleName !== Kh) return !1;
  try {
    if (
      (!e.startsWith("^") && Ir.compare(e, vl) <= 0) ||
      (e.startsWith("^") && Ir.satisfies(vl, e))
    )
      return !1;
  } catch (i) {
    return !1;
  }
  r({ moduleName: n.moduleName, moduleVersion: e });
}
h();
var Cr = new Map();
function qh(n) {
  return n.filter(
    (e) => !(Cr.has(e.moduleName) && Cr.get(e.moduleName) === e.scriptUri)
  );
}
function Vh(n) {
  return n
    .filter((e) =>
      e.scriptUri
        ? (z(
            `Source for IPyWidget ${e.moduleName} found in ${e.source} @ ${e.scriptUri}.`
          ),
          !0)
        : (console.error(`Source for IPyWidget ${e.moduleName} not found.`), !1)
    )
    .map((e) => e);
}
function fs() {
  let n = window.requirejs;
  if (!n)
    throw (
      (window.console.error("Requirejs not found"),
      new Error("Requirejs not found"))
    );
  return n;
}
function Bh(n, e) {
  let t = fs(),
    r = { paths: {} };
  n && (r.baseUrl = n),
    hs(),
    e.forEach((i) => {
      z(`Registering IPyWidget ${i.moduleName} found in ${i.scriptUri}.`),
        Cr.set(i.moduleName, i.scriptUri);
      let s = i.scriptUri.toLowerCase().endsWith(".js")
        ? i.scriptUri.substring(0, i.scriptUri.length - 3)
        : i.scriptUri;
      r.paths[i.moduleName] = s;
    }),
    t.config(r);
}
function El(n) {
  Cr.delete(n), fs().undef(n);
}
function bl(n, e) {
  let t = qh(e),
    r = Vh(t);
  Bh(n, r);
}
function hs() {
  hs.invoked ||
    ((hs.invoked = !0),
    fs().config({
      map: { "*": { "jupyter-js-widgets": "@jupyter-widgets/base" } },
    }));
}
var Rr = class extends wl.EventEmitter {
  constructor(t, r = $i()) {
    super();
    this.postOffice = t;
    this.widgetsRegisteredInRequireJs = new Set();
    this.disposables = [];
    this.widgetSourceRequests = new Map();
    this.registeredWidgetSources = new Map();
    this.widgetModulesFailedToLoad = new Set();
    this.isOnline = Fe();
    this.widgetsCanLoadFromCDN = !1;
    this.timeoutWaitingForScriptToLoad = 6e4;
    this.isOnline.promise.catch(yt),
      r
        .then((i) => {
          this.isOnline.resolve(i),
            this.postOffice.sendMessage("IPyWidgets_IsOnline", { isOnline: i });
        })
        .catch((i) => Ue(`Failed to check if online ${i.toString()}`)),
      t.addHandler({
        handleMessage: (i, s) => {
          if (i === "update_settings") {
            let o = JSON.parse(s);
            this.widgetsCanLoadFromCDN = o.widgetScriptSources.length > 0;
          } else if (i === "IPyWidgets_WidgetScriptSource_Response")
            this.registerScriptSourceInRequirejs(s);
          else if (i === "IPyWidgets_AttemptToDownloadFailedWidgetsAgain")
            Array.from(this.widgetModulesFailedToLoad.values()).forEach((o) => {
              this.clearWidgetModuleScriptSource(o);
            }),
              this.widgetModulesFailedToLoad.clear();
          else if (i === "IPyWidgets_BaseUrl_Response") {
            let o = s;
            o &&
              ((this.baseUrl = o),
              (document.body.dataset.baseUrl = o.endsWith("/") ? o : `${o}/`),
              z(`data-base-url set to ${o}`));
          } else
            i === "IPyWidgets_kernelOptions"
              ? (z("Received IPyWidgets_kernelOptions in ScriptManager"),
                this.previousKernelOptions &&
                  !(0, Sl.default)(this.previousKernelOptions, s) &&
                  (z(
                    "Received IPyWidgets_kernelOptions in ScriptManager with new kernel options"
                  ),
                  (this.previousKernelOptions = s),
                  this.clear()))
              : i === "IPyWidgets_onKernelChanged" &&
                (z("Received IPyWidgets_onKernelChanged in ScriptManager"),
                this.clear());
          return !0;
        },
      });
  }
  dispose() {
    pr(this.disposables);
  }
  getScriptLoader() {
    return {
      widgetsRegisteredInRequireJs: this.widgetsRegisteredInRequireJs,
      errorHandler: (t, r, i, s) =>
        this.handleLoadError(t, r, i, s).catch(() => {}),
      loadWidgetScript: (t, r) => this.loadWidgetScript(t, r),
      successHandler: (t, r, i) => this.handleLoadSuccess(t, r, i),
    };
  }
  onWidgetLoadSuccess(t) {
    return this.on("onWidgetLoadSuccess", t);
  }
  onWidgetLoadError(t) {
    return this.on("onWidgetLoadError", t);
  }
  onWidgetVersionNotSupported(t) {
    return this.on("onWidgetVersionNotSupported", t);
  }
  async loadWidgetScript(t, r) {
    z(`Fetch IPyWidget source for ${t}`);
    let i = await this.isOnline.promise,
      s = this.widgetSourceRequests.get(t),
      o = `${t}:${r}:${Date.now().toString()}`;
    if (
      (i && s && !s.explicitlyRequested && s.source !== "cdn" && (s = void 0),
      !s)
    ) {
      s = {
        deferred: Fe(),
        timer: void 0,
        explicitlyRequested: !0,
        requestId: o,
      };
      let a = this.timedoutWaitingForWidgetsToGetLoaded
        ? 5e3
        : this.timeoutWaitingForScriptToLoad;
      (s.timer = setTimeout(() => {
        s &&
          !s.deferred.resolved &&
          (console.error(`Timeout waiting to get widget source for ${t}, ${r}`),
          this.handleLoadError(
            "<class>",
            t,
            r,
            new Error(`Timeout getting source for ${t}:${r}`),
            !0
          ).catch(() => {}),
          s.deferred.resolve(),
          (this.timedoutWaitingForWidgetsToGetLoaded = !0));
      }, a)),
        this.disposables.push({
          dispose() {
            try {
              s != null && s.timer && clearTimeout(s.timer);
            } catch (l) {}
          },
        }),
        this.widgetSourceRequests.set(t, s);
    }
    this.postOffice.sendMessage("IPyWidgets_WidgetScriptSourceRequest", {
      moduleName: t,
      moduleVersion: r,
      requestId: o,
    });
    try {
      await s.deferred.promise;
      let a = this.registeredWidgetSources.get(t);
      a &&
        yl(a, r, this.widgetsCanLoadFromCDN, (l) =>
          this.emit("onWidgetVersionNotSupported", {
            moduleName: l.moduleName,
            moduleVersion: l.moduleVersion,
          })
        );
    } catch (a) {
      console.error(
        `Failed to load Widget Script from Extension for ${t}, ${r}`,
        a
      );
    }
  }
  handleLoadSuccess(t, r, i) {
    this.emit("onWidgetLoadSuccess", {
      className: t,
      moduleName: r,
      moduleVersion: i,
    });
  }
  clearWidgetModuleScriptSource(t) {
    this.widgetSourceRequests.delete(t),
      this.registeredWidgetSources.delete(t),
      this.widgetsRegisteredInRequireJs.delete(t),
      El(t);
  }
  clear() {
    this.widgetSourceRequests.clear(), this.registeredWidgetSources.clear();
  }
  registerScriptSourcesInRequirejs(t) {
    z(`Received IPyWidget scripts ${JSON.stringify(t || [])}`),
      !(!Array.isArray(t) || t.length === 0) &&
        t.forEach((r) => {
          let i = this.registeredWidgetSources.get(r.moduleName);
          (!i || (i.source && i.source !== "cdn")) &&
            (bl(this.baseUrl, [r]),
            this.registeredWidgetSources.set(r.moduleName, r),
            this.widgetsRegisteredInRequireJs.add(r.moduleName));
          let s = this.widgetSourceRequests.get(r.moduleName);
          s ||
            ((s = {
              deferred: Fe(),
              timer: void 0,
              source: r.source,
              requestId: r.requestId || "",
              explicitlyRequested: !1,
            }),
            this.widgetSourceRequests.set(r.moduleName, s)),
            r.requestId && r.requestId === s.requestId
              ? ((s.source = r.source), s.deferred.resolve())
              : r.requestId || ((s.source = r.source), s.deferred.resolve()),
            s.deferred.completed && s.timer !== void 0 && clearTimeout(s.timer);
        });
  }
  registerScriptSourceInRequirejs(t) {
    if (!t) {
      z("No widget script source");
      return;
    }
    this.registerScriptSourcesInRequirejs([t]);
  }
  async handleLoadError(t, r, i, s, o = !1) {
    this.widgetModulesFailedToLoad.add(r);
    let a = await $i();
    this.emit("onWidgetLoadError", {
      className: t,
      moduleName: r,
      moduleVersion: i,
      error: s,
      timedout: o,
      isOnline: a,
    });
  }
};
var ps = class {
    constructor(e, t, r) {
      this.postOffice = e;
      (this.scriptManager = new Rr(e)),
        this.scriptManager.onWidgetLoadError(this.handleLoadError.bind(this)),
        this.scriptManager.onWidgetLoadSuccess(
          this.handleLoadSuccess.bind(this)
        ),
        this.scriptManager.onWidgetVersionNotSupported(
          this.handleUnsupportedWidgetVersion.bind(this)
        ),
        (this.widgetManager = new Lt(
          void 0,
          e,
          this.scriptManager.getScriptLoader(),
          t,
          r
        )),
        e.addHandler({ handleMessage: (i, s) => !0 });
    }
    dispose() {
      this.widgetManager.dispose();
    }
    async handleLoadError(e) {
      this.postOffice.sendMessage("ipywidget_load_failure", {
        className: e.className,
        moduleName: e.moduleName,
        moduleVersion: e.moduleVersion,
        isOnline: e.isOnline,
        timedout: e.timedout,
        error: JSON.stringify(e.error),
      }),
        console.error(
          `Failed to to Widget load class ${e.moduleName}${e.className}`,
          e
        );
    }
    handleUnsupportedWidgetVersion(e) {
      this.postOffice.sendMessage("ipywidget_widget_version_not_supported", {
        moduleName: e.moduleName,
        moduleVersion: e.moduleVersion,
      });
    }
    handleLoadSuccess(e) {
      this.postOffice.sendMessage("ipywidget_load_success", {
        className: e.className,
        moduleName: e.moduleName,
        moduleVersion: e.moduleVersion,
      });
    }
  },
  Hh = new Map(),
  Ye = new Map(),
  Ar = [];
async function $h(n, e, t, r) {
  try {
    Ar.push({ outputId: n.id, container: t }), Gh(n.id, e, t, r);
  } catch (i) {
    throw (
      (r(`Error: render output ${n.id} failed ${i.toString()}`, "error"), i)
    );
  }
}
function Jh(n) {
  n && (Ar = Ar.filter((e) => !(n in e)));
}
function Gh(n, e, t, r) {
  var s, o, a, l;
  if (
    (r(`Rendering IPyWidget ${n} with model ${e.model_id} in ${t.id}`),
    Ye.has(n) &&
      ((s = Ye.get(n)) == null ? void 0 : s.container) === t &&
      ((o = Ye.get(n)) == null ? void 0 : o.modelId) === e.model_id)
  )
    return r("already rendering");
  let i = 0;
  if (Ye.has(n)) {
    (i = 100),
      r(
        "Widget was already rendering for another container, dispose that widget so we can re-render it"
      );
    try {
      (l = (a = Ye.get(n)) == null ? void 0 : a.widget) == null || l.dispose();
    } catch (u) {}
  }
  if (t.firstChild)
    try {
      t.removeChild(t.firstChild);
    } catch (u) {}
  new Promise((u) => setTimeout(u, i))
    .then(() => {
      let u = document.createElement("div");
      (u.className = "cell-output cell-output"),
        typeof e._vsc_test_cellIndex == "number" &&
          (t.className += ` vsc-test-cell-index-${e._vsc_test_cellIndex}`);
      let f = document.createElement("div");
      (f.className = "cell-output-ipywidget-background"),
        t.appendChild(f),
        f.appendChild(u),
        Ye.set(n, { container: t, modelId: e.model_id }),
        zh(e, f)
          .then((c) => {
            var S;
            if (((S = Ye.get(n)) == null ? void 0 : S.container) !== t) {
              r("Widget container changed, hence disposing the widget"),
                c == null || c.dispose();
              return;
            }
            Ye.has(n) && (Ye.get(n).widget = c);
            let C = {
              dispose: () => {
                Ye.delete(n), c == null || c.dispose();
              },
            };
            Hh.set(n, C);
            let M = Ar.find((w) => w.outputId === n);
            M && (M.success = !0);
          })
          .catch((c) => {
            r(`Error: Failed to render ${n}, ${c.toString()}`, "error");
          });
    })
    .catch((u) => {
      r(`Error: Failed to render ${n}, ${u.toString()}`, "error");
    });
}
var gn;
async function Rl() {
  if (!gn) {
    let e = function (t) {
      function r() {
        let i = Lt.instance;
        if (i) {
          let s = i.dispose.bind(i);
          (i.dispose = () => ((gn = void 0), s())),
            t && (t(i), (t = void 0)),
            (gn = Promise.resolve(i));
        }
      }
      r(), Lt.onDidChangeInstance(r);
    };
    var n = e;
    gn = new Promise((t) => e(t));
  }
  return gn;
}
async function zh(n, e) {
  try {
    let t = await Rl();
    return await (t == null ? void 0 : t.renderWidget(n, e));
  } catch (t) {
    Ue(`Error: Failed to render widget ${n.model_id}, ${t.toString()}`);
  }
}
async function Yh(n) {
  await new Promise((e) => {
    let t = () => {
      if (window.vscIPyWidgets) return e();
      setTimeout(t, 1e3);
    };
    setTimeout(t, 1e3);
  });
  try {
    Dl(n);
    let e = await Rl(),
      t = { metadata: { get: (r) => n } };
    return await (e == null
      ? void 0
      : e.restoreWidgets(t, { loadKernel: !1, loadNotebook: !0 }));
  } catch (e) {
    Ue(`Error: Failed to render widget state ${n}, ${e.toString()}`);
  }
}
var Il = !1;
function Xh(n, e, t) {
  if (Il) {
    Ue("Error: WidgetManager already initialized");
    return;
  }
  try {
    let r = new yn(e),
      i = new ps(r, n, t);
    (window._mgr = i), (Il = !0);
  } catch (r) {
    Ue(`Error: Exception initializing WidgetManager, ${r.toString()}`);
  }
}
var gs;
window.ipywidgetsKernel = {
  renderOutput: $h,
  disposeOutput: Jh,
  restoreWidgets: Yh,
  initialize: () => {
    Al(gs);
  },
};
function Al(n) {
  n.postKernelMessage({ type: "IPyWidgets_Request_Widget_Version" });
}
function Dl(n) {
  z("IPyWidget kernel initializing...");
  let e = window.vscIPyWidgets.WidgetManager;
  if (!e)
    throw new Error(
      "JupyterLabWidgetManager not defined. Please include/check ipywidgets.js file"
    );
  Xh(e, gs, n);
}
var Cl = !1;
function gm(n) {
  (gs = n),
    Qh(n),
    z(`Attempt Initialize IpyWidgets kernel.js : ${JSON.stringify(n)}`),
    n.onDidReceiveKernelMessage(async (e) => {
      if (
        typeof e == "object" &&
        e &&
        "type" in e &&
        e.type === "IPyWidgets_Reply_Widget_Version" &&
        "payload" in e &&
        typeof e.payload == "number"
      ) {
        if (Cl) return;
        Cl = !0;
        try {
          let t = e.payload;
          z(`Loading IPyWidget Version ${t}`);
          let r = new Promise((a) => {
              let l = () => {
                if (window.vscIPyWidgets7) return a();
                setTimeout(l, 500);
              };
              setTimeout(l, 500);
            }),
            i = new Promise((a) => {
              let l = () => {
                if (window.vscIPyWidgets8) return a();
                setTimeout(l, 500);
              };
              setTimeout(l, 500);
            });
          await Promise.all([r, i]),
            t === 7
              ? ((() => {
                  try {
                    window.vscIPyWidgets8.unload();
                  } catch (a) {}
                })(),
                window.vscIPyWidgets7.load(),
                z("Loaded IPYWidgets 7.x from Kernel"))
              : t === 8 &&
                ((() => {
                  try {
                    window.vscIPyWidgets7.unload();
                  } catch (a) {}
                })(),
                window.vscIPyWidgets8.load(),
                z("Loaded IPYWidgets 8.x from Kernel")),
            Dl();
        } catch (t) {
          Ue(`Failed to load IPyWidget Version ${e.payload}, ${t}`);
        }
      }
    }),
    Al(n);
}
function Qh(n) {
  n.postKernelMessage &&
    ((window.alert = (e) => {
      var t;
      throw (
        (console.log("window.alert", e),
        (t = n.postKernelMessage) == null ||
          t.call(n, { type: "IPyWidgets_Window_Alert", message: e.toString() }),
        new Error("window.alert not supported in VS Code Renderers"))
      );
    }),
    (window.open = (e) => {
      var t;
      if ((console.log("window.open", e), e))
        throw (
          ((t = n.postKernelMessage) == null ||
            t.call(n, { type: "IPyWidgets_Window_Open", url: e.toString() }),
          new Error("window.open not supported in VS Code Renderers"))
        );
      return null;
    }));
}
export { gm as activate, Jh as disposeOutput, $h as renderOutput };
/*! Bundled license information:

@lumino/polling/dist/index.js:
  (*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** *)

@lumino/disposable/dist/index.js:
  (*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** *)
*/
