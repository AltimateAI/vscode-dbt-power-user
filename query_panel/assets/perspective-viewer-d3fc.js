var OC = Object.create;
var Vf = Object.defineProperty;
var BC = Object.getOwnPropertyDescriptor;
var FC = Object.getOwnPropertyNames;
var HC = Object.getPrototypeOf,
  YC = Object.prototype.hasOwnProperty;
var T = (e, t) => () => (e && (t = e((e = 0))), t);
var Px = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  At = (e, t) => {
    for (var r in t) Vf(e, r, { get: t[r], enumerable: !0 });
  },
  Rx = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let a of FC(t))
        !YC.call(e, a) &&
          a !== r &&
          Vf(e, a, {
            get: () => t[a],
            enumerable: !(n = BC(t, a)) || n.enumerable,
          });
    return e;
  };
var Re = (e, t, r) => (
    (r = e != null ? OC(HC(e)) : {}),
    Rx(
      t || !e || !e.__esModule
        ? Vf(r, "default", { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  ar = (e) => Rx(Vf({}, "__esModule", { value: !0 }), e);
function Fe(e, t) {
  return e == null || t == null
    ? NaN
    : e < t
    ? -1
    : e > t
    ? 1
    : e >= t
    ? 0
    : NaN;
}
var _r = T(() => {});
function Yi(e, t) {
  return e == null || t == null
    ? NaN
    : t < e
    ? -1
    : t > e
    ? 1
    : t >= e
    ? 0
    : NaN;
}
var bd = T(() => {});
function yo(e) {
  let t, r, n;
  e.length !== 2
    ? ((t = Fe), (r = (u, l) => Fe(e(u), l)), (n = (u, l) => e(u) - l))
    : ((t = e === Fe || e === Yi ? e : qC), (r = e), (n = e));
  function a(u, l, s = 0, h = u.length) {
    if (s < h) {
      if (t(l, l) !== 0) return h;
      do {
        let y = (s + h) >>> 1;
        r(u[y], l) < 0 ? (s = y + 1) : (h = y);
      } while (s < h);
    }
    return s;
  }
  function o(u, l, s = 0, h = u.length) {
    if (s < h) {
      if (t(l, l) !== 0) return h;
      do {
        let y = (s + h) >>> 1;
        r(u[y], l) <= 0 ? (s = y + 1) : (h = y);
      } while (s < h);
    }
    return s;
  }
  function i(u, l, s = 0, h = u.length) {
    let y = a(u, l, s, h - 1);
    return y > s && n(u[y - 1], l) > -n(u[y], l) ? y - 1 : y;
  }
  return { left: a, center: i, right: o };
}
function qC() {
  return 0;
}
var yd = T(() => {
  _r();
  bd();
});
function qi(e) {
  return e === null ? NaN : +e;
}
function* wd(e, t) {
  if (t === void 0) for (let r of e) r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of e) (n = t(n, ++r, e)) != null && (n = +n) >= n && (yield n);
  }
}
var _d = T(() => {});
var Lx,
  Sd,
  Ox,
  Bx,
  Nf,
  Md = T(() => {
    _r();
    yd();
    _d();
    (Lx = yo(Fe)),
      (Sd = Lx.right),
      (Ox = Lx.left),
      (Bx = yo(qi).center),
      (Nf = Sd);
  });
function Fx(e, t) {
  if (!((t = +t) >= 0)) throw new RangeError("invalid r");
  let r = e.length;
  if (!((r = Math.floor(r)) >= 0)) throw new RangeError("invalid length");
  if (!r || !t) return e;
  let n = Ad(t),
    a = e.slice();
  return n(e, a, 0, r, 1), n(a, e, 0, r, 1), n(e, a, 0, r, 1), e;
}
function qx(e) {
  return function (t, r, n = r) {
    if (!((r = +r) >= 0)) throw new RangeError("invalid rx");
    if (!((n = +n) >= 0)) throw new RangeError("invalid ry");
    let { data: a, width: o, height: i } = t;
    if (!((o = Math.floor(o)) >= 0)) throw new RangeError("invalid width");
    if (!((i = Math.floor(i !== void 0 ? i : a.length / o)) >= 0))
      throw new RangeError("invalid height");
    if (!o || !i || (!r && !n)) return t;
    let u = r && e(r),
      l = n && e(n),
      s = a.slice();
    return (
      u && l
        ? (wo(u, s, a, o, i),
          wo(u, a, s, o, i),
          wo(u, s, a, o, i),
          _o(l, a, s, o, i),
          _o(l, s, a, o, i),
          _o(l, a, s, o, i))
        : u
        ? (wo(u, a, s, o, i), wo(u, s, a, o, i), wo(u, a, s, o, i))
        : l && (_o(l, a, s, o, i), _o(l, s, a, o, i), _o(l, a, s, o, i)),
      t
    );
  };
}
function wo(e, t, r, n, a) {
  for (let o = 0, i = n * a; o < i; ) e(t, r, o, (o += n), 1);
}
function _o(e, t, r, n, a) {
  for (let o = 0, i = n * a; o < n; ++o) e(t, r, o, o + i, n);
}
function WC(e) {
  let t = Ad(e);
  return (r, n, a, o, i) => {
    (a <<= 2),
      (o <<= 2),
      (i <<= 2),
      t(r, n, a + 0, o + 0, i),
      t(r, n, a + 1, o + 1, i),
      t(r, n, a + 2, o + 2, i),
      t(r, n, a + 3, o + 3, i);
  };
}
function Ad(e) {
  let t = Math.floor(e);
  if (t === e) return $C(e);
  let r = e - t,
    n = 2 * e + 1;
  return (a, o, i, u, l) => {
    if (!((u -= l) >= i)) return;
    let s = t * o[i],
      h = l * t,
      y = h + l;
    for (let x = i, M = i + h; x < M; x += l) s += o[Math.min(u, x)];
    for (let x = i, M = u; x <= M; x += l)
      (s += o[Math.min(u, x + h)]),
        (a[x] = (s + r * (o[Math.max(i, x - y)] + o[Math.min(u, x + y)])) / n),
        (s -= o[Math.max(i, x - h)]);
  };
}
function $C(e) {
  let t = 2 * e + 1;
  return (r, n, a, o, i) => {
    if (!((o -= i) >= a)) return;
    let u = e * n[a],
      l = i * e;
    for (let s = a, h = a + l; s < h; s += i) u += n[Math.min(o, s)];
    for (let s = a, h = o; s <= h; s += i)
      (u += n[Math.min(o, s + l)]),
        (r[s] = u / t),
        (u -= n[Math.max(a, s - l)]);
  };
}
var Hx,
  Yx,
  Wx = T(() => {
    (Hx = qx(Ad)), (Yx = qx(WC));
  });
function un(e, t) {
  let r = 0;
  if (t === void 0) for (let n of e) n != null && (n = +n) >= n && ++r;
  else {
    let n = -1;
    for (let a of e) (a = t(a, ++n, e)) != null && (a = +a) >= a && ++r;
  }
  return r;
}
var Wi = T(() => {});
function GC(e) {
  return e.length | 0;
}
function UC(e) {
  return !(e > 0);
}
function XC(e) {
  return typeof e != "object" || "length" in e ? e : Array.from(e);
}
function jC(e) {
  return (t) => e(...t);
}
function kd(...e) {
  let t = typeof e[e.length - 1] == "function" && jC(e.pop());
  e = e.map(XC);
  let r = e.map(GC),
    n = e.length - 1,
    a = new Array(n + 1).fill(0),
    o = [];
  if (n < 0 || r.some(UC)) return o;
  for (;;) {
    o.push(a.map((u, l) => e[l][u]));
    let i = n;
    for (; ++a[i] === r[i]; ) {
      if (i === 0) return t ? o.map(t) : o;
      a[i--] = 0;
    }
  }
}
var $x = T(() => {});
function Cd(e, t) {
  var r = 0,
    n = 0;
  return Float64Array.from(
    e,
    t === void 0 ? (a) => (r += +a || 0) : (a) => (r += +t(a, n++, e) || 0),
  );
}
var Gx = T(() => {});
function $i(e, t) {
  let r = 0,
    n,
    a = 0,
    o = 0;
  if (t === void 0)
    for (let i of e)
      i != null &&
        (i = +i) >= i &&
        ((n = i - a), (a += n / ++r), (o += n * (i - a)));
  else {
    let i = -1;
    for (let u of e)
      (u = t(u, ++i, e)) != null &&
        (u = +u) >= u &&
        ((n = u - a), (a += n / ++r), (o += n * (u - a)));
  }
  if (r > 1) return o / (r - 1);
}
var Td = T(() => {});
function Gi(e, t) {
  let r = $i(e, t);
  return r && Math.sqrt(r);
}
var Vd = T(() => {
  Td();
});
function ba(e, t) {
  let r, n;
  if (t === void 0)
    for (let a of e)
      a != null &&
        (r === void 0
          ? a >= a && (r = n = a)
          : (r > a && (r = a), n < a && (n = a)));
  else {
    let a = -1;
    for (let o of e)
      (o = t(o, ++a, e)) != null &&
        (r === void 0
          ? o >= o && (r = n = o)
          : (r > o && (r = o), n < o && (n = o)));
  }
  return [r, n];
}
var Nd = T(() => {});
function Ux(e, t) {
  let r = new So();
  if (t === void 0) for (let n of e) (n = +n) && r.add(n);
  else {
    let n = -1;
    for (let a of e) (a = +t(a, ++n, e)) && r.add(a);
  }
  return +r;
}
function Xx(e, t) {
  let r = new So(),
    n = -1;
  return Float64Array.from(
    e,
    t === void 0 ? (a) => r.add(+a || 0) : (a) => r.add(+t(a, ++n, e) || 0),
  );
}
var So,
  jx = T(() => {
    So = class {
      constructor() {
        (this._partials = new Float64Array(32)), (this._n = 0);
      }
      add(t) {
        let r = this._partials,
          n = 0;
        for (let a = 0; a < this._n && a < 32; a++) {
          let o = r[a],
            i = t + o,
            u = Math.abs(t) < Math.abs(o) ? t - (i - o) : o - (i - t);
          u && (r[n++] = u), (t = i);
        }
        return (r[n] = t), (this._n = n + 1), this;
      }
      valueOf() {
        let t = this._partials,
          r = this._n,
          n,
          a,
          o,
          i = 0;
        if (r > 0) {
          for (
            i = t[--r];
            r > 0 &&
            ((n = i), (a = t[--r]), (i = n + a), (o = a - (i - n)), !o);

          );
          r > 0 &&
            ((o < 0 && t[r - 1] < 0) || (o > 0 && t[r - 1] > 0)) &&
            ((a = o * 2), (n = i + a), a == n - i && (i = n));
        }
        return i;
      }
    };
  });
function Dd({ _intern: e, _key: t }, r) {
  let n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function Qx({ _intern: e, _key: t }, r) {
  let n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function Kx({ _intern: e, _key: t }, r) {
  let n = t(r);
  return e.has(n) && ((r = e.get(n)), e.delete(n)), r;
}
function Zx(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
var or,
  Ot,
  fn = T(() => {
    (or = class extends Map {
      constructor(t, r = Zx) {
        if (
          (super(),
          Object.defineProperties(this, {
            _intern: { value: new Map() },
            _key: { value: r },
          }),
          t != null)
        )
          for (let [n, a] of t) this.set(n, a);
      }
      get(t) {
        return super.get(Dd(this, t));
      }
      has(t) {
        return super.has(Dd(this, t));
      }
      set(t, r) {
        return super.set(Qx(this, t), r);
      }
      delete(t) {
        return super.delete(Kx(this, t));
      }
    }),
      (Ot = class extends Set {
        constructor(t, r = Zx) {
          if (
            (super(),
            Object.defineProperties(this, {
              _intern: { value: new Map() },
              _key: { value: r },
            }),
            t != null)
          )
            for (let n of t) this.add(n);
        }
        has(t) {
          return super.has(Dd(this, t));
        }
        add(t) {
          return super.add(Qx(this, t));
        }
        delete(t) {
          return super.delete(Kx(this, t));
        }
      });
  });
function ln(e) {
  return e;
}
var Ed = T(() => {});
function Ui(e, ...t) {
  return Mo(e, ln, ln, t);
}
function Id(e, ...t) {
  return Mo(e, Array.from, ln, t);
}
function Jx(e, t) {
  for (let r = 1, n = t.length; r < n; ++r)
    e = e.flatMap((a) => a.pop().map(([o, i]) => [...a, o, i]));
  return e;
}
function e1(e, ...t) {
  return Jx(Id(e, ...t), t);
}
function t1(e, t, ...r) {
  return Jx(zd(e, t, ...r), r);
}
function Df(e, t, ...r) {
  return Mo(e, ln, t, r);
}
function zd(e, t, ...r) {
  return Mo(e, Array.from, t, r);
}
function r1(e, ...t) {
  return Mo(e, ln, a1, t);
}
function n1(e, ...t) {
  return Mo(e, Array.from, a1, t);
}
function a1(e) {
  if (e.length !== 1) throw new Error("duplicate key");
  return e[0];
}
function Mo(e, t, r, n) {
  return (function a(o, i) {
    if (i >= n.length) return r(o);
    let u = new or(),
      l = n[i++],
      s = -1;
    for (let h of o) {
      let y = l(h, ++s, o),
        x = u.get(y);
      x ? x.push(h) : u.set(y, [h]);
    }
    for (let [h, y] of u) u.set(h, a(y, i));
    return t(u);
  })(e, 0);
}
var Pd = T(() => {
  fn();
  Ed();
});
function Xi(e, t) {
  return Array.from(t, (r) => e[r]);
}
var Rd = T(() => {});
function Ao(e, ...t) {
  if (typeof e[Symbol.iterator] != "function")
    throw new TypeError("values is not iterable");
  e = Array.from(e);
  let [r] = t;
  if ((r && r.length !== 2) || t.length > 1) {
    let n = Uint32Array.from(e, (a, o) => o);
    return (
      t.length > 1
        ? ((t = t.map((a) => e.map(a))),
          n.sort((a, o) => {
            for (let i of t) {
              let u = cn(i[a], i[o]);
              if (u) return u;
            }
          }))
        : ((r = e.map(r)), n.sort((a, o) => cn(r[a], r[o]))),
      Xi(e, n)
    );
  }
  return e.sort(ji(r));
}
function ji(e = Fe) {
  if (e === Fe) return cn;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    let n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function cn(e, t) {
  return (
    (e == null || !(e >= e)) - (t == null || !(t >= t)) ||
    (e < t ? -1 : e > t ? 1 : 0)
  );
}
var ko = T(() => {
  _r();
  Rd();
});
function Ld(e, t, r) {
  return (
    t.length !== 2
      ? Ao(Df(e, t, r), ([n, a], [o, i]) => Fe(a, i) || Fe(n, o))
      : Ao(Ui(e, r), ([n, a], [o, i]) => t(a, i) || Fe(n, o))
  ).map(([n]) => n);
}
var o1 = T(() => {
  _r();
  Pd();
  ko();
});
var i1,
  u1,
  HR,
  f1 = T(() => {
    (i1 = Array.prototype), (u1 = i1.slice), (HR = i1.map);
  });
function Qi(e) {
  return () => e;
}
var l1 = T(() => {});
function Ki(e, t, r) {
  var n,
    a = -1,
    o,
    i,
    u;
  if (((t = +t), (e = +e), (r = +r), e === t && r > 0)) return [e];
  if (
    ((n = t < e) && ((o = e), (e = t), (t = o)),
    (u = zn(e, t, r)) === 0 || !isFinite(u))
  )
    return [];
  if (u > 0) {
    let l = Math.round(e / u),
      s = Math.round(t / u);
    for (
      l * u < e && ++l, s * u > t && --s, i = new Array((o = s - l + 1));
      ++a < o;

    )
      i[a] = (l + a) * u;
  } else {
    u = -u;
    let l = Math.round(e * u),
      s = Math.round(t * u);
    for (
      l / u < e && ++l, s / u > t && --s, i = new Array((o = s - l + 1));
      ++a < o;

    )
      i[a] = (l + a) / u;
  }
  return n && i.reverse(), i;
}
function zn(e, t, r) {
  var n = (t - e) / Math.max(0, r),
    a = Math.floor(Math.log(n) / Math.LN10),
    o = n / Math.pow(10, a);
  return a >= 0
    ? (o >= Od ? 10 : o >= Bd ? 5 : o >= Fd ? 2 : 1) * Math.pow(10, a)
    : -Math.pow(10, -a) / (o >= Od ? 10 : o >= Bd ? 5 : o >= Fd ? 2 : 1);
}
function c1(e, t, r) {
  var n = Math.abs(t - e) / Math.max(0, r),
    a = Math.pow(10, Math.floor(Math.log(n) / Math.LN10)),
    o = n / a;
  return (
    o >= Od ? (a *= 10) : o >= Bd ? (a *= 5) : o >= Fd && (a *= 2),
    t < e ? -a : a
  );
}
var Od,
  Bd,
  Fd,
  Ef = T(() => {
    (Od = Math.sqrt(50)), (Bd = Math.sqrt(10)), (Fd = Math.sqrt(2));
  });
function Zi(e, t, r) {
  let n;
  for (;;) {
    let a = zn(e, t, r);
    if (a === n || a === 0 || !isFinite(a)) return [e, t];
    a > 0
      ? ((e = Math.floor(e / a) * a), (t = Math.ceil(t / a) * a))
      : a < 0 && ((e = Math.ceil(e * a) / a), (t = Math.floor(t * a) / a)),
      (n = a);
  }
}
var Hd = T(() => {
  Ef();
});
function Ji(e) {
  return Math.ceil(Math.log(un(e)) / Math.LN2) + 1;
}
var Yd = T(() => {
  Wi();
});
function If() {
  var e = ln,
    t = ba,
    r = Ji;
  function n(a) {
    Array.isArray(a) || (a = Array.from(a));
    var o,
      i = a.length,
      u,
      l,
      s = new Array(i);
    for (o = 0; o < i; ++o) s[o] = e(a[o], o, a);
    var h = t(s),
      y = h[0],
      x = h[1],
      M = r(s, y, x);
    if (!Array.isArray(M)) {
      let F = x,
        R = +M;
      if (
        (t === ba && ([y, x] = Zi(y, x, R)),
        (M = Ki(y, x, R)),
        M[0] <= y && (l = zn(y, x, R)),
        M[M.length - 1] >= x)
      )
        if (F >= x && t === ba) {
          let I = zn(y, x, R);
          isFinite(I) &&
            (I > 0
              ? (x = (Math.floor(x / I) + 1) * I)
              : I < 0 && (x = (Math.ceil(x * -I) + 1) / -I));
        } else M.pop();
    }
    for (var A = M.length, N = 0, k = A; M[N] <= y; ) ++N;
    for (; M[k - 1] > x; ) --k;
    (N || k < A) && ((M = M.slice(N, k)), (A = k - N));
    var D = new Array(A + 1),
      B;
    for (o = 0; o <= A; ++o)
      (B = D[o] = []), (B.x0 = o > 0 ? M[o - 1] : y), (B.x1 = o < A ? M[o] : x);
    if (isFinite(l)) {
      if (l > 0)
        for (o = 0; o < i; ++o)
          (u = s[o]) != null &&
            y <= u &&
            u <= x &&
            D[Math.min(A, Math.floor((u - y) / l))].push(a[o]);
      else if (l < 0) {
        for (o = 0; o < i; ++o)
          if ((u = s[o]) != null && y <= u && u <= x) {
            let F = Math.floor((y - u) * l);
            D[Math.min(A, F + (M[F] <= u))].push(a[o]);
          }
      }
    } else
      for (o = 0; o < i; ++o)
        (u = s[o]) != null && y <= u && u <= x && D[Nf(M, u, 0, A)].push(a[o]);
    return D;
  }
  return (
    (n.value = function (a) {
      return arguments.length
        ? ((e = typeof a == "function" ? a : Qi(a)), n)
        : e;
    }),
    (n.domain = function (a) {
      return arguments.length
        ? ((t = typeof a == "function" ? a : Qi([a[0], a[1]])), n)
        : t;
    }),
    (n.thresholds = function (a) {
      return arguments.length
        ? ((r =
            typeof a == "function" ? a : Qi(Array.isArray(a) ? u1.call(a) : a)),
          n)
        : r;
    }),
    n
  );
}
var s1 = T(() => {
  f1();
  Md();
  l1();
  Nd();
  Ed();
  Hd();
  Ef();
  Yd();
});
function zr(e, t) {
  let r;
  if (t === void 0)
    for (let n of e)
      n != null && (r < n || (r === void 0 && n >= n)) && (r = n);
  else {
    let n = -1;
    for (let a of e)
      (a = t(a, ++n, e)) != null &&
        (r < a || (r === void 0 && a >= a)) &&
        (r = a);
  }
  return r;
}
var qd = T(() => {});
function ya(e, t) {
  let r,
    n = -1,
    a = -1;
  if (t === void 0)
    for (let o of e)
      ++a,
        o != null && (r < o || (r === void 0 && o >= o)) && ((r = o), (n = a));
  else
    for (let o of e)
      (o = t(o, ++a, e)) != null &&
        (r < o || (r === void 0 && o >= o)) &&
        ((r = o), (n = a));
  return n;
}
var zf = T(() => {});
function ir(e, t) {
  let r;
  if (t === void 0)
    for (let n of e)
      n != null && (r > n || (r === void 0 && n >= n)) && (r = n);
  else {
    let n = -1;
    for (let a of e)
      (a = t(a, ++n, e)) != null &&
        (r > a || (r === void 0 && a >= a)) &&
        (r = a);
  }
  return r;
}
var Pf = T(() => {});
function wa(e, t) {
  let r,
    n = -1,
    a = -1;
  if (t === void 0)
    for (let o of e)
      ++a,
        o != null && (r > o || (r === void 0 && o >= o)) && ((r = o), (n = a));
  else
    for (let o of e)
      (o = t(o, ++a, e)) != null &&
        (r > o || (r === void 0 && o >= o)) &&
        ((r = o), (n = a));
  return n;
}
var Rf = T(() => {});
function _a(e, t, r = 0, n = 1 / 0, a) {
  if (
    ((t = Math.floor(t)),
    (r = Math.floor(Math.max(0, r))),
    (n = Math.floor(Math.min(e.length - 1, n))),
    !(r <= t && t <= n))
  )
    return e;
  for (a = a === void 0 ? cn : ji(a); n > r; ) {
    if (n - r > 600) {
      let l = n - r + 1,
        s = t - r + 1,
        h = Math.log(l),
        y = 0.5 * Math.exp((2 * h) / 3),
        x = 0.5 * Math.sqrt((h * y * (l - y)) / l) * (s - l / 2 < 0 ? -1 : 1),
        M = Math.max(r, Math.floor(t - (s * y) / l + x)),
        A = Math.min(n, Math.floor(t + ((l - s) * y) / l + x));
      _a(e, t, M, A, a);
    }
    let o = e[t],
      i = r,
      u = n;
    for (eu(e, r, t), a(e[n], o) > 0 && eu(e, r, n); i < u; ) {
      for (eu(e, i, u), ++i, --u; a(e[i], o) < 0; ) ++i;
      for (; a(e[u], o) > 0; ) --u;
    }
    a(e[r], o) === 0 ? eu(e, r, u) : (++u, eu(e, u, n)),
      u <= t && (r = u + 1),
      t <= u && (n = u - 1);
  }
  return e;
}
function eu(e, t, r) {
  let n = e[t];
  (e[t] = e[r]), (e[r] = n);
}
var Wd = T(() => {
  ko();
});
function tu(e, t = Fe) {
  let r,
    n = !1;
  if (t.length === 1) {
    let a;
    for (let o of e) {
      let i = t(o);
      (n ? Fe(i, a) > 0 : Fe(i, i) === 0) && ((r = o), (a = i), (n = !0));
    }
  } else
    for (let a of e) (n ? t(a, r) > 0 : t(a, a) === 0) && ((r = a), (n = !0));
  return r;
}
var $d = T(() => {
  _r();
});
function Pn(e, t, r) {
  if (
    ((e = Float64Array.from(wd(e, r))), !(!(n = e.length) || isNaN((t = +t))))
  ) {
    if (t <= 0 || n < 2) return ir(e);
    if (t >= 1) return zr(e);
    var n,
      a = (n - 1) * t,
      o = Math.floor(a),
      i = zr(_a(e, o).subarray(0, o + 1)),
      u = ir(e.subarray(o + 1));
    return i + (u - i) * (a - o);
  }
}
function d1(e, t, r = qi) {
  if (!(!(n = e.length) || isNaN((t = +t)))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n,
      a = (n - 1) * t,
      o = Math.floor(a),
      i = +r(e[o], o, e),
      u = +r(e[o + 1], o + 1, e);
    return i + (u - i) * (a - o);
  }
}
function Lf(e, t, r) {
  if (
    ((e = Float64Array.from(wd(e, r))), !(!(n = e.length) || isNaN((t = +t))))
  ) {
    if (t <= 0 || n < 2) return wa(e);
    if (t >= 1) return ya(e);
    var n,
      a = Math.floor((n - 1) * t),
      o = (u, l) => cn(e[u], e[l]),
      i = _a(
        Uint32Array.from(e, (u, l) => l),
        a,
        0,
        n - 1,
        o,
      );
    return tu(i.subarray(0, a + 1), (u) => e[u]);
  }
}
var Of = T(() => {
  qd();
  zf();
  Pf();
  Rf();
  Wd();
  _d();
  ko();
  $d();
});
function Gd(e, t, r) {
  return Math.ceil(
    (r - t) / (2 * (Pn(e, 0.75) - Pn(e, 0.25)) * Math.pow(un(e), -1 / 3)),
  );
}
var m1 = T(() => {
  Wi();
  Of();
});
function Ud(e, t, r) {
  return Math.ceil(((r - t) * Math.cbrt(un(e))) / (3.49 * Gi(e)));
}
var h1 = T(() => {
  Wi();
  Vd();
});
function Xd(e, t) {
  let r = 0,
    n = 0;
  if (t === void 0)
    for (let a of e) a != null && (a = +a) >= a && (++r, (n += a));
  else {
    let a = -1;
    for (let o of e)
      (o = t(o, ++a, e)) != null && (o = +o) >= o && (++r, (n += o));
  }
  if (r) return n / r;
}
var p1 = T(() => {});
function jd(e, t) {
  return Pn(e, 0.5, t);
}
function g1(e, t) {
  return Lf(e, 0.5, t);
}
var v1 = T(() => {
  Of();
});
function* QC(e) {
  for (let t of e) yield* t;
}
function Qd(e) {
  return Array.from(QC(e));
}
var x1 = T(() => {});
function Kd(e, t) {
  let r = new or();
  if (t === void 0)
    for (let o of e) o != null && o >= o && r.set(o, (r.get(o) || 0) + 1);
  else {
    let o = -1;
    for (let i of e)
      (i = t(i, ++o, e)) != null && i >= i && r.set(i, (r.get(i) || 0) + 1);
  }
  let n,
    a = 0;
  for (let [o, i] of r) i > a && ((a = i), (n = o));
  return n;
}
var b1 = T(() => {
  fn();
});
function Zd(e, t = KC) {
  let r = [],
    n,
    a = !1;
  for (let o of e) a && r.push(t(n, o)), (n = o), (a = !0);
  return r;
}
function KC(e, t) {
  return [e, t];
}
var y1 = T(() => {});
function Jd(e, t, r) {
  (e = +e),
    (t = +t),
    (r = (a = arguments.length) < 2 ? ((t = e), (e = 0), 1) : a < 3 ? 1 : +r);
  for (
    var n = -1, a = Math.max(0, Math.ceil((t - e) / r)) | 0, o = new Array(a);
    ++n < a;

  )
    o[n] = e + n * r;
  return o;
}
var w1 = T(() => {});
function em(e, t = Fe) {
  if (typeof e[Symbol.iterator] != "function")
    throw new TypeError("values is not iterable");
  let r = Array.from(e),
    n = new Float64Array(r.length);
  t.length !== 2 && ((r = r.map(t)), (t = Fe));
  let a = (u, l) => t(r[u], r[l]),
    o,
    i;
  return (
    Uint32Array.from(r, (u, l) => l)
      .sort(t === Fe ? (u, l) => cn(r[u], r[l]) : ji(a))
      .forEach((u, l) => {
        let s = a(u, o === void 0 ? u : o);
        s >= 0
          ? ((o === void 0 || s > 0) && ((o = u), (i = l)), (n[u] = i))
          : (n[u] = NaN);
      }),
    n
  );
}
var _1 = T(() => {
  _r();
  ko();
});
function tm(e, t = Fe) {
  let r,
    n = !1;
  if (t.length === 1) {
    let a;
    for (let o of e) {
      let i = t(o);
      (n ? Fe(i, a) < 0 : Fe(i, i) === 0) && ((r = o), (a = i), (n = !0));
    }
  } else
    for (let a of e) (n ? t(a, r) < 0 : t(a, a) === 0) && ((r = a), (n = !0));
  return r;
}
var S1 = T(() => {
  _r();
});
function ru(e, t = Fe) {
  if (t.length === 1) return wa(e, t);
  let r,
    n = -1,
    a = -1;
  for (let o of e)
    ++a, (n < 0 ? t(o, o) === 0 : t(o, r) < 0) && ((r = o), (n = a));
  return n;
}
var rm = T(() => {
  _r();
  Rf();
});
function nm(e, t = Fe) {
  if (t.length === 1) return ya(e, t);
  let r,
    n = -1,
    a = -1;
  for (let o of e)
    ++a, (n < 0 ? t(o, o) === 0 : t(o, r) > 0) && ((r = o), (n = a));
  return n;
}
var M1 = T(() => {
  _r();
  zf();
});
function am(e, t) {
  let r = ru(e, t);
  return r < 0 ? void 0 : r;
}
var A1 = T(() => {
  rm();
});
function om(e) {
  return function (r, n = 0, a = r.length) {
    let o = a - (n = +n);
    for (; o; ) {
      let i = (e() * o--) | 0,
        u = r[o + n];
      (r[o + n] = r[i + n]), (r[i + n] = u);
    }
    return r;
  };
}
var k1,
  C1 = T(() => {
    k1 = om(Math.random);
  });
function im(e, t) {
  let r = 0;
  if (t === void 0) for (let n of e) (n = +n) && (r += n);
  else {
    let n = -1;
    for (let a of e) (a = +t(a, ++n, e)) && (r += a);
  }
  return r;
}
var T1 = T(() => {});
function nu(e) {
  if (!(o = e.length)) return [];
  for (var t = -1, r = ir(e, ZC), n = new Array(r); ++t < r; )
    for (var a = -1, o, i = (n[t] = new Array(o)); ++a < o; ) i[a] = e[a][t];
  return n;
}
function ZC(e) {
  return e.length;
}
var um = T(() => {
  Pf();
});
function fm() {
  return nu(arguments);
}
var V1 = T(() => {
  um();
});
function lm(e, t) {
  if (typeof t != "function") throw new TypeError("test is not a function");
  let r = -1;
  for (let n of e) if (!t(n, ++r, e)) return !1;
  return !0;
}
var N1 = T(() => {});
function cm(e, t) {
  if (typeof t != "function") throw new TypeError("test is not a function");
  let r = -1;
  for (let n of e) if (t(n, ++r, e)) return !0;
  return !1;
}
var D1 = T(() => {});
function sm(e, t) {
  if (typeof t != "function") throw new TypeError("test is not a function");
  let r = [],
    n = -1;
  for (let a of e) t(a, ++n, e) && r.push(a);
  return r;
}
var E1 = T(() => {});
function dm(e, t) {
  if (typeof e[Symbol.iterator] != "function")
    throw new TypeError("values is not iterable");
  if (typeof t != "function") throw new TypeError("mapper is not a function");
  return Array.from(e, (r, n) => t(r, n, e));
}
var I1 = T(() => {});
function mm(e, t, r) {
  if (typeof t != "function") throw new TypeError("reducer is not a function");
  let n = e[Symbol.iterator](),
    a,
    o,
    i = -1;
  if (arguments.length < 3) {
    if ((({ done: a, value: r } = n.next()), a)) return;
    ++i;
  }
  for (; ({ done: a, value: o } = n.next()), !a; ) r = t(r, o, ++i, e);
  return r;
}
var z1 = T(() => {});
function hm(e) {
  if (typeof e[Symbol.iterator] != "function")
    throw new TypeError("values is not iterable");
  return Array.from(e).reverse();
}
var P1 = T(() => {});
function pm(e, ...t) {
  e = new Ot(e);
  for (let r of t) for (let n of r) e.delete(n);
  return e;
}
var R1 = T(() => {
  fn();
});
function gm(e, t) {
  let r = t[Symbol.iterator](),
    n = new Ot();
  for (let a of e) {
    if (n.has(a)) return !1;
    let o, i;
    for (; ({ value: o, done: i } = r.next()) && !i; ) {
      if (Object.is(a, o)) return !1;
      n.add(o);
    }
  }
  return !0;
}
var L1 = T(() => {
  fn();
});
function vm(e, ...t) {
  (e = new Ot(e)), (t = t.map(JC));
  e: for (let r of e)
    for (let n of t)
      if (!n.has(r)) {
        e.delete(r);
        continue e;
      }
  return e;
}
function JC(e) {
  return e instanceof Ot ? e : new Ot(e);
}
var O1 = T(() => {
  fn();
});
function au(e, t) {
  let r = e[Symbol.iterator](),
    n = new Set();
  for (let a of t) {
    let o = B1(a);
    if (n.has(o)) continue;
    let i, u;
    for (; ({ value: i, done: u } = r.next()); ) {
      if (u) return !1;
      let l = B1(i);
      if ((n.add(l), Object.is(o, l))) break;
    }
  }
  return !0;
}
function B1(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
var xm = T(() => {});
function bm(e, t) {
  return au(t, e);
}
var F1 = T(() => {
  xm();
});
function ym(...e) {
  let t = new Ot();
  for (let r of e) for (let n of r) t.add(n);
  return t;
}
var H1 = T(() => {
  fn();
});
var wm = {};
At(wm, {
  Adder: () => So,
  InternMap: () => or,
  InternSet: () => Ot,
  ascending: () => Fe,
  bin: () => If,
  bisect: () => Nf,
  bisectCenter: () => Bx,
  bisectLeft: () => Ox,
  bisectRight: () => Sd,
  bisector: () => yo,
  blur: () => Fx,
  blur2: () => Hx,
  blurImage: () => Yx,
  count: () => un,
  cross: () => kd,
  cumsum: () => Cd,
  descending: () => Yi,
  deviation: () => Gi,
  difference: () => pm,
  disjoint: () => gm,
  every: () => lm,
  extent: () => ba,
  fcumsum: () => Xx,
  filter: () => sm,
  flatGroup: () => e1,
  flatRollup: () => t1,
  fsum: () => Ux,
  greatest: () => tu,
  greatestIndex: () => nm,
  group: () => Ui,
  groupSort: () => Ld,
  groups: () => Id,
  histogram: () => If,
  index: () => r1,
  indexes: () => n1,
  intersection: () => vm,
  least: () => tm,
  leastIndex: () => ru,
  map: () => dm,
  max: () => zr,
  maxIndex: () => ya,
  mean: () => Xd,
  median: () => jd,
  medianIndex: () => g1,
  merge: () => Qd,
  min: () => ir,
  minIndex: () => wa,
  mode: () => Kd,
  nice: () => Zi,
  pairs: () => Zd,
  permute: () => Xi,
  quantile: () => Pn,
  quantileIndex: () => Lf,
  quantileSorted: () => d1,
  quickselect: () => _a,
  range: () => Jd,
  rank: () => em,
  reduce: () => mm,
  reverse: () => hm,
  rollup: () => Df,
  rollups: () => zd,
  scan: () => am,
  shuffle: () => k1,
  shuffler: () => om,
  some: () => cm,
  sort: () => Ao,
  subset: () => bm,
  sum: () => im,
  superset: () => au,
  thresholdFreedmanDiaconis: () => Gd,
  thresholdScott: () => Ud,
  thresholdSturges: () => Ji,
  tickIncrement: () => zn,
  tickStep: () => c1,
  ticks: () => Ki,
  transpose: () => nu,
  union: () => ym,
  variance: () => $i,
  zip: () => fm,
});
var _m = T(() => {
  Md();
  _r();
  yd();
  Wx();
  Wi();
  $x();
  Gx();
  bd();
  Vd();
  Nd();
  jx();
  Pd();
  o1();
  s1();
  m1();
  h1();
  Yd();
  qd();
  zf();
  p1();
  v1();
  x1();
  Pf();
  Rf();
  b1();
  Hd();
  y1();
  Rd();
  Of();
  Wd();
  w1();
  _1();
  S1();
  rm();
  $d();
  M1();
  A1();
  C1();
  T1();
  Ef();
  um();
  Td();
  V1();
  N1();
  D1();
  E1();
  I1();
  z1();
  P1();
  ko();
  R1();
  L1();
  O1();
  F1();
  xm();
  H1();
  fn();
});
function Gt(e, t) {
  return e == null || t == null
    ? NaN
    : e < t
    ? -1
    : e > t
    ? 1
    : e >= t
    ? 0
    : NaN;
}
var ou = T(() => {});
function Bf(e) {
  let t = e,
    r = e,
    n = e;
  e.length !== 2 &&
    ((t = (u, l) => e(u) - l), (r = Gt), (n = (u, l) => Gt(e(u), l)));
  function a(u, l, s = 0, h = u.length) {
    if (s < h) {
      if (r(l, l) !== 0) return h;
      do {
        let y = (s + h) >>> 1;
        n(u[y], l) < 0 ? (s = y + 1) : (h = y);
      } while (s < h);
    }
    return s;
  }
  function o(u, l, s = 0, h = u.length) {
    if (s < h) {
      if (r(l, l) !== 0) return h;
      do {
        let y = (s + h) >>> 1;
        n(u[y], l) <= 0 ? (s = y + 1) : (h = y);
      } while (s < h);
    }
    return s;
  }
  function i(u, l, s = 0, h = u.length) {
    let y = a(u, l, s, h - 1);
    return y > s && t(u[y - 1], l) > -t(u[y], l) ? y - 1 : y;
  }
  return { left: a, center: i, right: o };
}
var Y1 = T(() => {
  ou();
});
function iu(e) {
  return e === null ? NaN : +e;
}
function* q1(e, t) {
  if (t === void 0) for (let r of e) r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of e) (n = t(n, ++r, e)) != null && (n = +n) >= n && (yield n);
  }
}
var Sm = T(() => {});
var W1,
  $1,
  eT,
  tT,
  Sr,
  G1 = T(() => {
    ou();
    Y1();
    Sm();
    (W1 = Bf(Gt)),
      ($1 = W1.right),
      (eT = W1.left),
      (tT = Bf(iu).center),
      (Sr = $1);
  });
function U1(e = Gt) {
  if (e === Gt) return Mm;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    let n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function Mm(e, t) {
  return (
    (e == null || !(e >= e)) - (t == null || !(t >= t)) ||
    (e < t ? -1 : e > t ? 1 : 0)
  );
}
var X1 = T(() => {
  ou();
});
function Sa(e, t, r) {
  var n,
    a = -1,
    o,
    i,
    u;
  if (((t = +t), (e = +e), (r = +r), e === t && r > 0)) return [e];
  if (
    ((n = t < e) && ((o = e), (e = t), (t = o)),
    (u = Ff(e, t, r)) === 0 || !isFinite(u))
  )
    return [];
  if (u > 0) {
    let l = Math.round(e / u),
      s = Math.round(t / u);
    for (
      l * u < e && ++l, s * u > t && --s, i = new Array((o = s - l + 1));
      ++a < o;

    )
      i[a] = (l + a) * u;
  } else {
    u = -u;
    let l = Math.round(e * u),
      s = Math.round(t * u);
    for (
      l / u < e && ++l, s / u > t && --s, i = new Array((o = s - l + 1));
      ++a < o;

    )
      i[a] = (l + a) / u;
  }
  return n && i.reverse(), i;
}
function Ff(e, t, r) {
  var n = (t - e) / Math.max(0, r),
    a = Math.floor(Math.log(n) / Math.LN10),
    o = n / Math.pow(10, a);
  return a >= 0
    ? (o >= Am ? 10 : o >= km ? 5 : o >= Cm ? 2 : 1) * Math.pow(10, a)
    : -Math.pow(10, -a) / (o >= Am ? 10 : o >= km ? 5 : o >= Cm ? 2 : 1);
}
function Tm(e, t, r) {
  var n = Math.abs(t - e) / Math.max(0, r),
    a = Math.pow(10, Math.floor(Math.log(n) / Math.LN10)),
    o = n / a;
  return (
    o >= Am ? (a *= 10) : o >= km ? (a *= 5) : o >= Cm && (a *= 2),
    t < e ? -a : a
  );
}
var Am,
  km,
  Cm,
  j1 = T(() => {
    (Am = Math.sqrt(50)), (km = Math.sqrt(10)), (Cm = Math.sqrt(2));
  });
function Hf(e, t) {
  let r;
  if (t === void 0)
    for (let n of e)
      n != null && (r < n || (r === void 0 && n >= n)) && (r = n);
  else {
    let n = -1;
    for (let a of e)
      (a = t(a, ++n, e)) != null &&
        (r < a || (r === void 0 && a >= a)) &&
        (r = a);
  }
  return r;
}
var Q1 = T(() => {});
function Yf(e, t) {
  let r;
  if (t === void 0)
    for (let n of e)
      n != null && (r > n || (r === void 0 && n >= n)) && (r = n);
  else {
    let n = -1;
    for (let a of e)
      (a = t(a, ++n, e)) != null &&
        (r > a || (r === void 0 && a >= a)) &&
        (r = a);
  }
  return r;
}
var K1 = T(() => {});
function qf(e, t, r = 0, n = e.length - 1, a) {
  for (a = a === void 0 ? Mm : U1(a); n > r; ) {
    if (n - r > 600) {
      let l = n - r + 1,
        s = t - r + 1,
        h = Math.log(l),
        y = 0.5 * Math.exp((2 * h) / 3),
        x = 0.5 * Math.sqrt((h * y * (l - y)) / l) * (s - l / 2 < 0 ? -1 : 1),
        M = Math.max(r, Math.floor(t - (s * y) / l + x)),
        A = Math.min(n, Math.floor(t + ((l - s) * y) / l + x));
      qf(e, t, M, A, a);
    }
    let o = e[t],
      i = r,
      u = n;
    for (uu(e, r, t), a(e[n], o) > 0 && uu(e, r, n); i < u; ) {
      for (uu(e, i, u), ++i, --u; a(e[i], o) < 0; ) ++i;
      for (; a(e[u], o) > 0; ) --u;
    }
    a(e[r], o) === 0 ? uu(e, r, u) : (++u, uu(e, u, n)),
      u <= t && (r = u + 1),
      t <= u && (n = u - 1);
  }
  return e;
}
function uu(e, t, r) {
  let n = e[t];
  (e[t] = e[r]), (e[r] = n);
}
var Z1 = T(() => {
  X1();
});
function Wf(e, t, r) {
  if (((e = Float64Array.from(q1(e, r))), !!(n = e.length))) {
    if ((t = +t) <= 0 || n < 2) return Yf(e);
    if (t >= 1) return Hf(e);
    var n,
      a = (n - 1) * t,
      o = Math.floor(a),
      i = Hf(qf(e, o).subarray(0, o + 1)),
      u = Yf(e.subarray(o + 1));
    return i + (u - i) * (a - o);
  }
}
function Vm(e, t, r = iu) {
  if (!!(n = e.length)) {
    if ((t = +t) <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n,
      a = (n - 1) * t,
      o = Math.floor(a),
      i = +r(e[o], o, e),
      u = +r(e[o + 1], o + 1, e);
    return i + (u - i) * (a - o);
  }
}
var J1 = T(() => {
  Q1();
  K1();
  Z1();
  Sm();
});
function $f(e, t, r) {
  (e = +e),
    (t = +t),
    (r = (a = arguments.length) < 2 ? ((t = e), (e = 0), 1) : a < 3 ? 1 : +r);
  for (
    var n = -1, a = Math.max(0, Math.ceil((t - e) / r)) | 0, o = new Array(a);
    ++n < a;

  )
    o[n] = e + n * r;
  return o;
}
var eb = T(() => {});
var Mr = T(() => {
  G1();
  ou();
  J1();
  eb();
  j1();
  fn();
});
function Ze(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function ur(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e),
        typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
var kt = T(() => {});
function fr() {
  var e = new or(),
    t = [],
    r = [],
    n = Gf;
  function a(o) {
    let i = e.get(o);
    if (i === void 0) {
      if (n !== Gf) return n;
      e.set(o, (i = t.push(o) - 1));
    }
    return r[i % r.length];
  }
  return (
    (a.domain = function (o) {
      if (!arguments.length) return t.slice();
      (t = []), (e = new or());
      for (let i of o) e.has(i) || e.set(i, t.push(i) - 1);
      return a;
    }),
    (a.range = function (o) {
      return arguments.length ? ((r = Array.from(o)), a) : r.slice();
    }),
    (a.unknown = function (o) {
      return arguments.length ? ((n = o), a) : n;
    }),
    (a.copy = function () {
      return fr(t, r).unknown(n);
    }),
    Ze.apply(a, arguments),
    a
  );
}
var Gf,
  Nm = T(() => {
    Mr();
    kt();
    Gf = Symbol("implicit");
  });
function Ar() {
  var e = fr().unknown(void 0),
    t = e.domain,
    r = e.range,
    n = 0,
    a = 1,
    o,
    i,
    u = !1,
    l = 0,
    s = 0,
    h = 0.5;
  delete e.unknown;
  function y() {
    var x = t().length,
      M = a < n,
      A = M ? a : n,
      N = M ? n : a;
    (o = (N - A) / Math.max(1, x - l + s * 2)),
      u && (o = Math.floor(o)),
      (A += (N - A - o * (x - l)) * h),
      (i = o * (1 - l)),
      u && ((A = Math.round(A)), (i = Math.round(i)));
    var k = $f(x).map(function (D) {
      return A + o * D;
    });
    return r(M ? k.reverse() : k);
  }
  return (
    (e.domain = function (x) {
      return arguments.length ? (t(x), y()) : t();
    }),
    (e.range = function (x) {
      return arguments.length
        ? (([n, a] = x), (n = +n), (a = +a), y())
        : [n, a];
    }),
    (e.rangeRound = function (x) {
      return ([n, a] = x), (n = +n), (a = +a), (u = !0), y();
    }),
    (e.bandwidth = function () {
      return i;
    }),
    (e.step = function () {
      return o;
    }),
    (e.round = function (x) {
      return arguments.length ? ((u = !!x), y()) : u;
    }),
    (e.padding = function (x) {
      return arguments.length ? ((l = Math.min(1, (s = +x))), y()) : l;
    }),
    (e.paddingInner = function (x) {
      return arguments.length ? ((l = Math.min(1, x)), y()) : l;
    }),
    (e.paddingOuter = function (x) {
      return arguments.length ? ((s = +x), y()) : s;
    }),
    (e.align = function (x) {
      return arguments.length ? ((h = Math.max(0, Math.min(1, x))), y()) : h;
    }),
    (e.copy = function () {
      return Ar(t(), [n, a]).round(u).paddingInner(l).paddingOuter(s).align(h);
    }),
    Ze.apply(y(), arguments)
  );
}
function tb(e) {
  var t = e.copy;
  return (
    (e.padding = e.paddingOuter),
    delete e.paddingInner,
    delete e.paddingOuter,
    (e.copy = function () {
      return tb(t());
    }),
    e
  );
}
function rb() {
  return tb(Ar.apply(null, arguments).paddingInner(1));
}
var nb = T(() => {
  Mr();
  kt();
  Nm();
});
function Co(e, t, r) {
  (e.prototype = t.prototype = r), (r.constructor = e);
}
function fu(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
var Dm = T(() => {});
function Aa() {}
function ob() {
  return this.rgb().formatHex();
}
function lT() {
  return sb(this).formatHsl();
}
function ib() {
  return this.rgb().formatRgb();
}
function Tt(e) {
  var t, r;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = rT.exec(e))
      ? ((r = t[1].length),
        (t = parseInt(t[1], 16)),
        r === 6
          ? ub(t)
          : r === 3
          ? new Ct(
              ((t >> 8) & 15) | ((t >> 4) & 240),
              ((t >> 4) & 15) | (t & 240),
              ((t & 15) << 4) | (t & 15),
              1,
            )
          : r === 8
          ? Uf(
              (t >> 24) & 255,
              (t >> 16) & 255,
              (t >> 8) & 255,
              (t & 255) / 255,
            )
          : r === 4
          ? Uf(
              ((t >> 12) & 15) | ((t >> 8) & 240),
              ((t >> 8) & 15) | ((t >> 4) & 240),
              ((t >> 4) & 15) | (t & 240),
              (((t & 15) << 4) | (t & 15)) / 255,
            )
          : null)
      : (t = nT.exec(e))
      ? new Ct(t[1], t[2], t[3], 1)
      : (t = aT.exec(e))
      ? new Ct((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, 1)
      : (t = oT.exec(e))
      ? Uf(t[1], t[2], t[3], t[4])
      : (t = iT.exec(e))
      ? Uf((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, t[4])
      : (t = uT.exec(e))
      ? cb(t[1], t[2] / 100, t[3] / 100, 1)
      : (t = fT.exec(e))
      ? cb(t[1], t[2] / 100, t[3] / 100, t[4])
      : ab.hasOwnProperty(e)
      ? ub(ab[e])
      : e === "transparent"
      ? new Ct(NaN, NaN, NaN, 0)
      : null
  );
}
function ub(e) {
  return new Ct((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function Uf(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new Ct(e, t, r, n);
}
function zm(e) {
  return (
    e instanceof Aa || (e = Tt(e)),
    e ? ((e = e.rgb()), new Ct(e.r, e.g, e.b, e.opacity)) : new Ct()
  );
}
function Ln(e, t, r, n) {
  return arguments.length === 1 ? zm(e) : new Ct(e, t, r, n ?? 1);
}
function Ct(e, t, r, n) {
  (this.r = +e), (this.g = +t), (this.b = +r), (this.opacity = +n);
}
function fb() {
  return "#" + Em(this.r) + Em(this.g) + Em(this.b);
}
function lb() {
  var e = this.opacity;
  return (
    (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))),
    (e === 1 ? "rgb(" : "rgba(") +
      Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
      ", " +
      Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
      ", " +
      Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
      (e === 1 ? ")" : ", " + e + ")")
  );
}
function Em(e) {
  return (
    (e = Math.max(0, Math.min(255, Math.round(e) || 0))),
    (e < 16 ? "0" : "") + e.toString(16)
  );
}
function cb(e, t, r, n) {
  return (
    n <= 0
      ? (e = t = r = NaN)
      : r <= 0 || r >= 1
      ? (e = t = NaN)
      : t <= 0 && (e = NaN),
    new Pr(e, t, r, n)
  );
}
function sb(e) {
  if (e instanceof Pr) return new Pr(e.h, e.s, e.l, e.opacity);
  if ((e instanceof Aa || (e = Tt(e)), !e)) return new Pr();
  if (e instanceof Pr) return e;
  e = e.rgb();
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    a = Math.min(t, r, n),
    o = Math.max(t, r, n),
    i = NaN,
    u = o - a,
    l = (o + a) / 2;
  return (
    u
      ? (t === o
          ? (i = (r - n) / u + (r < n) * 6)
          : r === o
          ? (i = (n - t) / u + 2)
          : (i = (t - r) / u + 4),
        (u /= l < 0.5 ? o + a : 2 - o - a),
        (i *= 60))
      : (u = l > 0 && l < 1 ? 0 : i),
    new Pr(i, u, l, e.opacity)
  );
}
function db(e, t, r, n) {
  return arguments.length === 1 ? sb(e) : new Pr(e, t, r, n ?? 1);
}
function Pr(e, t, r, n) {
  (this.h = +e), (this.s = +t), (this.l = +r), (this.opacity = +n);
}
function Im(e, t, r) {
  return (
    (e < 60
      ? t + ((r - t) * e) / 60
      : e < 180
      ? r
      : e < 240
      ? t + ((r - t) * (240 - e)) / 60
      : t) * 255
  );
}
var Rn,
  Ma,
  To,
  lu,
  Rr,
  rT,
  nT,
  aT,
  oT,
  iT,
  uT,
  fT,
  ab,
  Pm = T(() => {
    Dm();
    (Rn = 0.7),
      (Ma = 1 / Rn),
      (To = "\\s*([+-]?\\d+)\\s*"),
      (lu = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*"),
      (Rr = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*"),
      (rT = /^#([0-9a-f]{3,8})$/),
      (nT = new RegExp("^rgb\\(" + [To, To, To] + "\\)$")),
      (aT = new RegExp("^rgb\\(" + [Rr, Rr, Rr] + "\\)$")),
      (oT = new RegExp("^rgba\\(" + [To, To, To, lu] + "\\)$")),
      (iT = new RegExp("^rgba\\(" + [Rr, Rr, Rr, lu] + "\\)$")),
      (uT = new RegExp("^hsl\\(" + [lu, Rr, Rr] + "\\)$")),
      (fT = new RegExp("^hsla\\(" + [lu, Rr, Rr, lu] + "\\)$")),
      (ab = {
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
      });
    Co(Aa, Tt, {
      copy: function (e) {
        return Object.assign(new this.constructor(), this, e);
      },
      displayable: function () {
        return this.rgb().displayable();
      },
      hex: ob,
      formatHex: ob,
      formatHsl: lT,
      formatRgb: ib,
      toString: ib,
    });
    Co(
      Ct,
      Ln,
      fu(Aa, {
        brighter: function (e) {
          return (
            (e = e == null ? Ma : Math.pow(Ma, e)),
            new Ct(this.r * e, this.g * e, this.b * e, this.opacity)
          );
        },
        darker: function (e) {
          return (
            (e = e == null ? Rn : Math.pow(Rn, e)),
            new Ct(this.r * e, this.g * e, this.b * e, this.opacity)
          );
        },
        rgb: function () {
          return this;
        },
        displayable: function () {
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
        hex: fb,
        formatHex: fb,
        formatRgb: lb,
        toString: lb,
      }),
    );
    Co(
      Pr,
      db,
      fu(Aa, {
        brighter: function (e) {
          return (
            (e = e == null ? Ma : Math.pow(Ma, e)),
            new Pr(this.h, this.s, this.l * e, this.opacity)
          );
        },
        darker: function (e) {
          return (
            (e = e == null ? Rn : Math.pow(Rn, e)),
            new Pr(this.h, this.s, this.l * e, this.opacity)
          );
        },
        rgb: function () {
          var e = (this.h % 360) + (this.h < 0) * 360,
            t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
            r = this.l,
            n = r + (r < 0.5 ? r : 1 - r) * t,
            a = 2 * r - n;
          return new Ct(
            Im(e >= 240 ? e - 240 : e + 120, a, n),
            Im(e, a, n),
            Im(e < 120 ? e + 240 : e - 120, a, n),
            this.opacity,
          );
        },
        displayable: function () {
          return (
            ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
            0 <= this.l &&
            this.l <= 1 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        formatHsl: function () {
          var e = this.opacity;
          return (
            (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))),
            (e === 1 ? "hsl(" : "hsla(") +
              (this.h || 0) +
              ", " +
              (this.s || 0) * 100 +
              "%, " +
              (this.l || 0) * 100 +
              "%" +
              (e === 1 ? ")" : ", " + e + ")")
          );
        },
      }),
    );
  });
var mb,
  hb,
  pb = T(() => {
    (mb = Math.PI / 180), (hb = 180 / Math.PI);
  });
function cT(e) {
  if (e instanceof ka) return new ka(e.h, e.s, e.l, e.opacity);
  e instanceof Ct || (e = zm(e));
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    a = (xb * n + gb * t - vb * r) / (xb + gb - vb),
    o = n - a,
    i = (cu * (r - a) - Lm * o) / Xf,
    u = Math.sqrt(i * i + o * o) / (cu * a * (1 - a)),
    l = u ? Math.atan2(i, o) * hb - 120 : NaN;
  return new ka(l < 0 ? l + 360 : l, u, a, e.opacity);
}
function Bt(e, t, r, n) {
  return arguments.length === 1 ? cT(e) : new ka(e, t, r, n ?? 1);
}
function ka(e, t, r, n) {
  (this.h = +e), (this.s = +t), (this.l = +r), (this.opacity = +n);
}
var bb,
  Rm,
  Lm,
  Xf,
  cu,
  gb,
  vb,
  xb,
  yb = T(() => {
    Dm();
    Pm();
    pb();
    (bb = -0.14861),
      (Rm = 1.78277),
      (Lm = -0.29227),
      (Xf = -0.90649),
      (cu = 1.97294),
      (gb = cu * Xf),
      (vb = cu * Rm),
      (xb = Rm * Lm - Xf * bb);
    Co(
      ka,
      Bt,
      fu(Aa, {
        brighter: function (e) {
          return (
            (e = e == null ? Ma : Math.pow(Ma, e)),
            new ka(this.h, this.s, this.l * e, this.opacity)
          );
        },
        darker: function (e) {
          return (
            (e = e == null ? Rn : Math.pow(Rn, e)),
            new ka(this.h, this.s, this.l * e, this.opacity)
          );
        },
        rgb: function () {
          var e = isNaN(this.h) ? 0 : (this.h + 120) * mb,
            t = +this.l,
            r = isNaN(this.s) ? 0 : this.s * t * (1 - t),
            n = Math.cos(e),
            a = Math.sin(e);
          return new Ct(
            255 * (t + r * (bb * n + Rm * a)),
            255 * (t + r * (Lm * n + Xf * a)),
            255 * (t + r * (cu * n)),
            this.opacity,
          );
        },
      }),
    );
  });
var sn = T(() => {
  Pm();
  yb();
});
function Om(e, t, r, n, a) {
  var o = e * e,
    i = o * e;
  return (
    ((1 - 3 * e + 3 * o - i) * t +
      (4 - 6 * o + 3 * i) * r +
      (1 + 3 * e + 3 * o - 3 * i) * n +
      i * a) /
    6
  );
}
function wb(e) {
  var t = e.length - 1;
  return function (r) {
    var n = r <= 0 ? (r = 0) : r >= 1 ? ((r = 1), t - 1) : Math.floor(r * t),
      a = e[n],
      o = e[n + 1],
      i = n > 0 ? e[n - 1] : 2 * a - o,
      u = n < t - 1 ? e[n + 2] : 2 * o - a;
    return Om((r - n / t) * t, i, a, o, u);
  };
}
var Bm = T(() => {});
function _b(e) {
  var t = e.length;
  return function (r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * t),
      a = e[(n + t - 1) % t],
      o = e[n % t],
      i = e[(n + 1) % t],
      u = e[(n + 2) % t];
    return Om((r - n / t) * t, a, o, i, u);
  };
}
var Sb = T(() => {
  Bm();
});
var Vo,
  Fm = T(() => {
    Vo = (e) => () => e;
  });
function Mb(e, t) {
  return function (r) {
    return e + r * t;
  };
}
function sT(e, t, r) {
  return (
    (e = Math.pow(e, r)),
    (t = Math.pow(t, r) - e),
    (r = 1 / r),
    function (n) {
      return Math.pow(e + n * t, r);
    }
  );
}
function Ab(e, t) {
  var r = t - e;
  return r
    ? Mb(e, r > 180 || r < -180 ? r - 360 * Math.round(r / 360) : r)
    : Vo(isNaN(e) ? t : e);
}
function kb(e) {
  return (e = +e) == 1
    ? dn
    : function (t, r) {
        return r - t ? sT(t, r, e) : Vo(isNaN(t) ? r : t);
      };
}
function dn(e, t) {
  var r = t - e;
  return r ? Mb(e, r) : Vo(isNaN(e) ? t : e);
}
var Hm = T(() => {
  Fm();
});
function Cb(e) {
  return function (t) {
    var r = t.length,
      n = new Array(r),
      a = new Array(r),
      o = new Array(r),
      i,
      u;
    for (i = 0; i < r; ++i)
      (u = Ln(t[i])), (n[i] = u.r || 0), (a[i] = u.g || 0), (o[i] = u.b || 0);
    return (
      (n = e(n)),
      (a = e(a)),
      (o = e(o)),
      (u.opacity = 1),
      function (l) {
        return (u.r = n(l)), (u.g = a(l)), (u.b = o(l)), u + "";
      }
    );
  };
}
var Ca,
  Ym,
  dT,
  qm = T(() => {
    sn();
    Bm();
    Sb();
    Hm();
    Ca = (function e(t) {
      var r = kb(t);
      function n(a, o) {
        var i = r((a = Ln(a)).r, (o = Ln(o)).r),
          u = r(a.g, o.g),
          l = r(a.b, o.b),
          s = dn(a.opacity, o.opacity);
        return function (h) {
          return (
            (a.r = i(h)), (a.g = u(h)), (a.b = l(h)), (a.opacity = s(h)), a + ""
          );
        };
      }
      return (n.gamma = e), n;
    })(1);
    (Ym = Cb(wb)), (dT = Cb(_b));
  });
function Tb(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0,
    n = t.slice(),
    a;
  return function (o) {
    for (a = 0; a < r; ++a) n[a] = e[a] * (1 - o) + t[a] * o;
    return n;
  };
}
function Vb(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
var Nb = T(() => {});
function Db(e, t) {
  var r = t ? t.length : 0,
    n = e ? Math.min(r, e.length) : 0,
    a = new Array(n),
    o = new Array(r),
    i;
  for (i = 0; i < n; ++i) a[i] = tt(e[i], t[i]);
  for (; i < r; ++i) o[i] = t[i];
  return function (u) {
    for (i = 0; i < n; ++i) o[i] = a[i](u);
    return o;
  };
}
var Eb = T(() => {
  su();
});
function Ib(e, t) {
  var r = new Date();
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return r.setTime(e * (1 - n) + t * n), r;
    }
  );
}
var zb = T(() => {});
function wt(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return e * (1 - r) + t * r;
    }
  );
}
var du = T(() => {});
function Pb(e, t) {
  var r = {},
    n = {},
    a;
  (e === null || typeof e != "object") && (e = {}),
    (t === null || typeof t != "object") && (t = {});
  for (a in t) a in e ? (r[a] = tt(e[a], t[a])) : (n[a] = t[a]);
  return function (o) {
    for (a in r) n[a] = r[a](o);
    return n;
  };
}
var Rb = T(() => {
  su();
});
function mT(e) {
  return function () {
    return e;
  };
}
function hT(e) {
  return function (t) {
    return e(t) + "";
  };
}
function mu(e, t) {
  var r = ($m.lastIndex = Wm.lastIndex = 0),
    n,
    a,
    o,
    i = -1,
    u = [],
    l = [];
  for (e = e + "", t = t + ""; (n = $m.exec(e)) && (a = Wm.exec(t)); )
    (o = a.index) > r &&
      ((o = t.slice(r, o)), u[i] ? (u[i] += o) : (u[++i] = o)),
      (n = n[0]) === (a = a[0])
        ? u[i]
          ? (u[i] += a)
          : (u[++i] = a)
        : ((u[++i] = null), l.push({ i, x: wt(n, a) })),
      (r = Wm.lastIndex);
  return (
    r < t.length && ((o = t.slice(r)), u[i] ? (u[i] += o) : (u[++i] = o)),
    u.length < 2
      ? l[0]
        ? hT(l[0].x)
        : mT(t)
      : ((t = l.length),
        function (s) {
          for (var h = 0, y; h < t; ++h) u[(y = l[h]).i] = y.x(s);
          return u.join("");
        })
  );
}
var $m,
  Wm,
  Gm = T(() => {
    du();
    ($m = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g),
      (Wm = new RegExp($m.source, "g"));
  });
function tt(e, t) {
  var r = typeof t,
    n;
  return t == null || r === "boolean"
    ? Vo(t)
    : (r === "number"
        ? wt
        : r === "string"
        ? (n = Tt(t))
          ? ((t = n), Ca)
          : mu
        : t instanceof Tt
        ? Ca
        : t instanceof Date
        ? Ib
        : Vb(t)
        ? Tb
        : Array.isArray(t)
        ? Db
        : (typeof t.valueOf != "function" && typeof t.toString != "function") ||
          isNaN(t)
        ? Pb
        : wt)(e, t);
}
var su = T(() => {
  sn();
  qm();
  Eb();
  zb();
  du();
  Rb();
  Gm();
  Fm();
  Nb();
});
function Ta(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return Math.round(e * (1 - r) + t * r);
    }
  );
}
var Lb = T(() => {});
function Um(e, t, r, n, a, o) {
  var i, u, l;
  return (
    (i = Math.sqrt(e * e + t * t)) && ((e /= i), (t /= i)),
    (l = e * r + t * n) && ((r -= e * l), (n -= t * l)),
    (u = Math.sqrt(r * r + n * n)) && ((r /= u), (n /= u), (l /= u)),
    e * n < t * r && ((e = -e), (t = -t), (l = -l), (i = -i)),
    {
      translateX: a,
      translateY: o,
      rotate: Math.atan2(t, e) * Ob,
      skewX: Math.atan(l) * Ob,
      scaleX: i,
      scaleY: u,
    }
  );
}
var Ob,
  jf,
  Bb = T(() => {
    (Ob = 180 / Math.PI),
      (jf = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1,
      });
  });
function Fb(e) {
  let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    e + "",
  );
  return t.isIdentity ? jf : Um(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Hb(e) {
  return e == null
    ? jf
    : (Qf || (Qf = document.createElementNS("http://www.w3.org/2000/svg", "g")),
      Qf.setAttribute("transform", e),
      (e = Qf.transform.baseVal.consolidate())
        ? ((e = e.matrix), Um(e.a, e.b, e.c, e.d, e.e, e.f))
        : jf);
}
var Qf,
  Yb = T(() => {
    Bb();
  });
function qb(e, t, r, n) {
  function a(s) {
    return s.length ? s.pop() + " " : "";
  }
  function o(s, h, y, x, M, A) {
    if (s !== y || h !== x) {
      var N = M.push("translate(", null, t, null, r);
      A.push({ i: N - 4, x: wt(s, y) }, { i: N - 2, x: wt(h, x) });
    } else (y || x) && M.push("translate(" + y + t + x + r);
  }
  function i(s, h, y, x) {
    s !== h
      ? (s - h > 180 ? (h += 360) : h - s > 180 && (s += 360),
        x.push({ i: y.push(a(y) + "rotate(", null, n) - 2, x: wt(s, h) }))
      : h && y.push(a(y) + "rotate(" + h + n);
  }
  function u(s, h, y, x) {
    s !== h
      ? x.push({ i: y.push(a(y) + "skewX(", null, n) - 2, x: wt(s, h) })
      : h && y.push(a(y) + "skewX(" + h + n);
  }
  function l(s, h, y, x, M, A) {
    if (s !== y || h !== x) {
      var N = M.push(a(M) + "scale(", null, ",", null, ")");
      A.push({ i: N - 4, x: wt(s, y) }, { i: N - 2, x: wt(h, x) });
    } else (y !== 1 || x !== 1) && M.push(a(M) + "scale(" + y + "," + x + ")");
  }
  return function (s, h) {
    var y = [],
      x = [];
    return (
      (s = e(s)),
      (h = e(h)),
      o(s.translateX, s.translateY, h.translateX, h.translateY, y, x),
      i(s.rotate, h.rotate, y, x),
      u(s.skewX, h.skewX, y, x),
      l(s.scaleX, s.scaleY, h.scaleX, h.scaleY, y, x),
      (s = h = null),
      function (M) {
        for (var A = -1, N = x.length, k; ++A < N; ) y[(k = x[A]).i] = k.x(M);
        return y.join("");
      }
    );
  };
}
var Xm,
  jm,
  Wb = T(() => {
    du();
    Yb();
    (Xm = qb(Fb, "px, ", "px)", "deg)")), (jm = qb(Hb, ", ", ")", ")"));
  });
function $b(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function gT(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function vT(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
var pT,
  Qm,
  Gb = T(() => {
    pT = 1e-12;
    Qm = (function e(t, r, n) {
      function a(o, i) {
        var u = o[0],
          l = o[1],
          s = o[2],
          h = i[0],
          y = i[1],
          x = i[2],
          M = h - u,
          A = y - l,
          N = M * M + A * A,
          k,
          D;
        if (N < pT)
          (D = Math.log(x / s) / t),
            (k = function ($) {
              return [u + $ * M, l + $ * A, s * Math.exp(t * $ * D)];
            });
        else {
          var B = Math.sqrt(N),
            F = (x * x - s * s + n * N) / (2 * s * r * B),
            R = (x * x - s * s - n * N) / (2 * x * r * B),
            I = Math.log(Math.sqrt(F * F + 1) - F),
            L = Math.log(Math.sqrt(R * R + 1) - R);
          (D = (L - I) / t),
            (k = function ($) {
              var G = $ * D,
                ue = $b(I),
                ne = (s / (r * B)) * (ue * vT(t * G + I) - gT(I));
              return [u + ne * M, l + ne * A, (s * ue) / $b(t * G + I)];
            });
        }
        return (k.duration = (D * 1e3 * t) / Math.SQRT2), k;
      }
      return (
        (a.rho = function (o) {
          var i = Math.max(0.001, +o),
            u = i * i,
            l = u * u;
          return e(i, u, l);
        }),
        a
      );
    })(Math.SQRT2, 2, 4);
  });
function Ub(e) {
  return (function t(r) {
    r = +r;
    function n(a, o) {
      var i = e((a = Bt(a)).h, (o = Bt(o)).h),
        u = dn(a.s, o.s),
        l = dn(a.l, o.l),
        s = dn(a.opacity, o.opacity);
      return function (h) {
        return (
          (a.h = i(h)),
          (a.s = u(h)),
          (a.l = l(Math.pow(h, r))),
          (a.opacity = s(h)),
          a + ""
        );
      };
    }
    return (n.gamma = t), n;
  })(1);
}
var xT,
  No,
  Xb = T(() => {
    sn();
    Hm();
    (xT = Ub(Ab)), (No = Ub(dn));
  });
function Kf(e, t) {
  t === void 0 && ((t = e), (e = tt));
  for (
    var r = 0, n = t.length - 1, a = t[0], o = new Array(n < 0 ? 0 : n);
    r < n;

  )
    o[r] = e(a, (a = t[++r]));
  return function (i) {
    var u = Math.max(0, Math.min(n - 1, Math.floor((i *= n))));
    return o[u](i - u);
  };
}
var jb = T(() => {
  su();
});
var Zt = T(() => {
  su();
  du();
  Lb();
  Gm();
  Wb();
  Gb();
  qm();
  Xb();
  jb();
});
function Km(e) {
  return function () {
    return e;
  };
}
var Qb = T(() => {});
function On(e) {
  return +e;
}
var Zf = T(() => {});
function ut(e) {
  return e;
}
function Zm(e, t) {
  return (t -= e = +e)
    ? function (r) {
        return (r - e) / t;
      }
    : Km(isNaN(t) ? NaN : 0.5);
}
function bT(e, t) {
  var r;
  return (
    e > t && ((r = e), (e = t), (t = r)),
    function (n) {
      return Math.max(e, Math.min(t, n));
    }
  );
}
function yT(e, t, r) {
  var n = e[0],
    a = e[1],
    o = t[0],
    i = t[1];
  return (
    a < n ? ((n = Zm(a, n)), (o = r(i, o))) : ((n = Zm(n, a)), (o = r(o, i))),
    function (u) {
      return o(n(u));
    }
  );
}
function wT(e, t, r) {
  var n = Math.min(e.length, t.length) - 1,
    a = new Array(n),
    o = new Array(n),
    i = -1;
  for (
    e[n] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
    ++i < n;

  )
    (a[i] = Zm(e[i], e[i + 1])), (o[i] = r(t[i], t[i + 1]));
  return function (u) {
    var l = Sr(e, u, 1, n) - 1;
    return o[l](a[l](u));
  };
}
function Lr(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function Va() {
  var e = Kb,
    t = Kb,
    r = tt,
    n,
    a,
    o,
    i = ut,
    u,
    l,
    s;
  function h() {
    var x = Math.min(e.length, t.length);
    return (
      i !== ut && (i = bT(e[0], e[x - 1])),
      (u = x > 2 ? wT : yT),
      (l = s = null),
      y
    );
  }
  function y(x) {
    return x == null || isNaN((x = +x))
      ? o
      : (l || (l = u(e.map(n), t, r)))(n(i(x)));
  }
  return (
    (y.invert = function (x) {
      return i(a((s || (s = u(t, e.map(n), wt)))(x)));
    }),
    (y.domain = function (x) {
      return arguments.length ? ((e = Array.from(x, On)), h()) : e.slice();
    }),
    (y.range = function (x) {
      return arguments.length ? ((t = Array.from(x)), h()) : t.slice();
    }),
    (y.rangeRound = function (x) {
      return (t = Array.from(x)), (r = Ta), h();
    }),
    (y.clamp = function (x) {
      return arguments.length ? ((i = x ? !0 : ut), h()) : i !== ut;
    }),
    (y.interpolate = function (x) {
      return arguments.length ? ((r = x), h()) : r;
    }),
    (y.unknown = function (x) {
      return arguments.length ? ((o = x), y) : o;
    }),
    function (x, M) {
      return (n = x), (a = M), h();
    }
  );
}
function Na() {
  return Va()(ut, ut);
}
var Kb,
  Or = T(() => {
    Mr();
    Zt();
    Qb();
    Zf();
    Kb = [0, 1];
  });
function Zb(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString("en").replace(/,/g, "")
    : e.toString(10);
}
function Da(e, t) {
  if (
    (r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0
  )
    return null;
  var r,
    n = e.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)];
}
var hu = T(() => {});
function Br(e) {
  return (e = Da(Math.abs(e))), e ? e[1] : NaN;
}
var pu = T(() => {
  hu();
});
function Jb(e, t) {
  return function (r, n) {
    for (
      var a = r.length, o = [], i = 0, u = e[0], l = 0;
      a > 0 &&
      u > 0 &&
      (l + u + 1 > n && (u = Math.max(1, n - l)),
      o.push(r.substring((a -= u), a + u)),
      !((l += u + 1) > n));

    )
      u = e[(i = (i + 1) % e.length)];
    return o.reverse().join(t);
  };
}
var ey = T(() => {});
function ty(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (r) {
      return e[+r];
    });
  };
}
var ry = T(() => {});
function Fr(e) {
  if (!(t = _T.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new Jf({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  });
}
function Jf(e) {
  (this.fill = e.fill === void 0 ? " " : e.fill + ""),
    (this.align = e.align === void 0 ? ">" : e.align + ""),
    (this.sign = e.sign === void 0 ? "-" : e.sign + ""),
    (this.symbol = e.symbol === void 0 ? "" : e.symbol + ""),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? "" : e.type + "");
}
var _T,
  Jm = T(() => {
    _T =
      /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
    Fr.prototype = Jf.prototype;
    Jf.prototype.toString = function () {
      return (
        this.fill +
        this.align +
        this.sign +
        this.symbol +
        (this.zero ? "0" : "") +
        (this.width === void 0 ? "" : Math.max(1, this.width | 0)) +
        (this.comma ? "," : "") +
        (this.precision === void 0
          ? ""
          : "." + Math.max(0, this.precision | 0)) +
        (this.trim ? "~" : "") +
        this.type
      );
    };
  });
function ny(e) {
  e: for (var t = e.length, r = 1, n = -1, a; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = a = r;
        break;
      case "0":
        n === 0 && (n = r), (a = r);
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(a + 1) : e;
}
var ay = T(() => {});
function oy(e, t) {
  var r = Da(e, t);
  if (!r) return e + "";
  var n = r[0],
    a = r[1],
    o = a - (eh = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1,
    i = n.length;
  return o === i
    ? n
    : o > i
    ? n + new Array(o - i + 1).join("0")
    : o > 0
    ? n.slice(0, o) + "." + n.slice(o)
    : "0." + new Array(1 - o).join("0") + Da(e, Math.max(0, t + o - 1))[0];
}
var eh,
  th = T(() => {
    hu();
  });
function rh(e, t) {
  var r = Da(e, t);
  if (!r) return e + "";
  var n = r[0],
    a = r[1];
  return a < 0
    ? "0." + new Array(-a).join("0") + n
    : n.length > a + 1
    ? n.slice(0, a + 1) + "." + n.slice(a + 1)
    : n + new Array(a - n.length + 2).join("0");
}
var iy = T(() => {
  hu();
});
var nh,
  uy = T(() => {
    hu();
    th();
    iy();
    nh = {
      "%": (e, t) => (e * 100).toFixed(t),
      b: (e) => Math.round(e).toString(2),
      c: (e) => e + "",
      d: Zb,
      e: (e, t) => e.toExponential(t),
      f: (e, t) => e.toFixed(t),
      g: (e, t) => e.toPrecision(t),
      o: (e) => Math.round(e).toString(8),
      p: (e, t) => rh(e * 100, t),
      r: rh,
      s: oy,
      X: (e) => Math.round(e).toString(16).toUpperCase(),
      x: (e) => Math.round(e).toString(16),
    };
  });
function ah(e) {
  return e;
}
var fy = T(() => {});
function sy(e) {
  var t =
      e.grouping === void 0 || e.thousands === void 0
        ? ah
        : Jb(ly.call(e.grouping, Number), e.thousands + ""),
    r = e.currency === void 0 ? "" : e.currency[0] + "",
    n = e.currency === void 0 ? "" : e.currency[1] + "",
    a = e.decimal === void 0 ? "." : e.decimal + "",
    o = e.numerals === void 0 ? ah : ty(ly.call(e.numerals, String)),
    i = e.percent === void 0 ? "%" : e.percent + "",
    u = e.minus === void 0 ? "\u2212" : e.minus + "",
    l = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(y) {
    y = Fr(y);
    var x = y.fill,
      M = y.align,
      A = y.sign,
      N = y.symbol,
      k = y.zero,
      D = y.width,
      B = y.comma,
      F = y.precision,
      R = y.trim,
      I = y.type;
    I === "n"
      ? ((B = !0), (I = "g"))
      : nh[I] || (F === void 0 && (F = 12), (R = !0), (I = "g")),
      (k || (x === "0" && M === "=")) && ((k = !0), (x = "0"), (M = "="));
    var L =
        N === "$"
          ? r
          : N === "#" && /[boxX]/.test(I)
          ? "0" + I.toLowerCase()
          : "",
      $ = N === "$" ? n : /[%p]/.test(I) ? i : "",
      G = nh[I],
      ue = /[defgprs%]/.test(I);
    F =
      F === void 0
        ? 6
        : /[gprs]/.test(I)
        ? Math.max(1, Math.min(21, F))
        : Math.max(0, Math.min(20, F));
    function ne(U) {
      var ae = L,
        J = $,
        H,
        ee,
        j;
      if (I === "c") (J = G(U) + J), (U = "");
      else {
        U = +U;
        var X = U < 0 || 1 / U < 0;
        if (
          ((U = isNaN(U) ? l : G(Math.abs(U), F)),
          R && (U = ny(U)),
          X && +U == 0 && A !== "+" && (X = !1),
          (ae =
            (X ? (A === "(" ? A : u) : A === "-" || A === "(" ? "" : A) + ae),
          (J =
            (I === "s" ? cy[8 + eh / 3] : "") +
            J +
            (X && A === "(" ? ")" : "")),
          ue)
        ) {
          for (H = -1, ee = U.length; ++H < ee; )
            if (((j = U.charCodeAt(H)), 48 > j || j > 57)) {
              (J = (j === 46 ? a + U.slice(H + 1) : U.slice(H)) + J),
                (U = U.slice(0, H));
              break;
            }
        }
      }
      B && !k && (U = t(U, 1 / 0));
      var K = ae.length + U.length + J.length,
        Z = K < D ? new Array(D - K + 1).join(x) : "";
      switch (
        (B && k && ((U = t(Z + U, Z.length ? D - J.length : 1 / 0)), (Z = "")),
        M)
      ) {
        case "<":
          U = ae + U + J + Z;
          break;
        case "=":
          U = ae + Z + U + J;
          break;
        case "^":
          U = Z.slice(0, (K = Z.length >> 1)) + ae + U + J + Z.slice(K);
          break;
        default:
          U = Z + ae + U + J;
          break;
      }
      return o(U);
    }
    return (
      (ne.toString = function () {
        return y + "";
      }),
      ne
    );
  }
  function h(y, x) {
    var M = s(((y = Fr(y)), (y.type = "f"), y)),
      A = Math.max(-8, Math.min(8, Math.floor(Br(x) / 3))) * 3,
      N = Math.pow(10, -A),
      k = cy[8 + A / 3];
    return function (D) {
      return M(N * D) + k;
    };
  }
  return { format: s, formatPrefix: h };
}
var ly,
  cy,
  dy = T(() => {
    pu();
    ey();
    ry();
    Jm();
    ay();
    uy();
    th();
    fy();
    (ly = Array.prototype.map),
      (cy = [
        "y",
        "z",
        "a",
        "f",
        "p",
        "n",
        "\xB5",
        "m",
        "",
        "k",
        "M",
        "G",
        "T",
        "P",
        "E",
        "Z",
        "Y",
      ]);
  });
function oh(e) {
  return (el = sy(e)), (Hr = el.format), (tl = el.formatPrefix), el;
}
var el,
  Hr,
  tl,
  my = T(() => {
    dy();
    oh({ thousands: ",", grouping: [3], currency: ["$", ""] });
  });
function ih(e) {
  return Math.max(0, -Br(Math.abs(e)));
}
var hy = T(() => {
  pu();
});
function uh(e, t) {
  return Math.max(
    0,
    Math.max(-8, Math.min(8, Math.floor(Br(t) / 3))) * 3 - Br(Math.abs(e)),
  );
}
var py = T(() => {
  pu();
});
function fh(e, t) {
  return (
    (e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, Br(t) - Br(e)) + 1
  );
}
var gy = T(() => {
  pu();
});
var rl = T(() => {
  my();
  Jm();
  hy();
  py();
  gy();
});
function gu(e, t, r, n) {
  var a = Tm(e, t, r),
    o;
  switch (((n = Fr(n ?? ",f")), n.type)) {
    case "s": {
      var i = Math.max(Math.abs(e), Math.abs(t));
      return (
        n.precision == null && !isNaN((o = uh(a, i))) && (n.precision = o),
        tl(n, i)
      );
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null &&
        !isNaN((o = fh(a, Math.max(Math.abs(e), Math.abs(t))))) &&
        (n.precision = o - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null &&
        !isNaN((o = ih(a))) &&
        (n.precision = o - (n.type === "%") * 2);
      break;
    }
  }
  return Hr(n);
}
var lh = T(() => {
  Mr();
  rl();
});
function Ft(e) {
  var t = e.domain;
  return (
    (e.ticks = function (r) {
      var n = t();
      return Sa(n[0], n[n.length - 1], r ?? 10);
    }),
    (e.tickFormat = function (r, n) {
      var a = t();
      return gu(a[0], a[a.length - 1], r ?? 10, n);
    }),
    (e.nice = function (r) {
      r == null && (r = 10);
      var n = t(),
        a = 0,
        o = n.length - 1,
        i = n[a],
        u = n[o],
        l,
        s,
        h = 10;
      for (
        u < i && ((s = i), (i = u), (u = s), (s = a), (a = o), (o = s));
        h-- > 0;

      ) {
        if (((s = Ff(i, u, r)), s === l)) return (n[a] = i), (n[o] = u), t(n);
        if (s > 0) (i = Math.floor(i / s) * s), (u = Math.ceil(u / s) * s);
        else if (s < 0) (i = Math.ceil(i * s) / s), (u = Math.floor(u * s) / s);
        else break;
        l = s;
      }
      return e;
    }),
    e
  );
}
function Yr() {
  var e = Na();
  return (
    (e.copy = function () {
      return Lr(e, Yr());
    }),
    Ze.apply(e, arguments),
    Ft(e)
  );
}
var mn = T(() => {
  Mr();
  Or();
  kt();
  lh();
});
function nl(e) {
  var t;
  function r(n) {
    return n == null || isNaN((n = +n)) ? t : n;
  }
  return (
    (r.invert = r),
    (r.domain = r.range =
      function (n) {
        return arguments.length ? ((e = Array.from(n, On)), r) : e.slice();
      }),
    (r.unknown = function (n) {
      return arguments.length ? ((t = n), r) : t;
    }),
    (r.copy = function () {
      return nl(e).unknown(t);
    }),
    (e = arguments.length ? Array.from(e, On) : [0, 1]),
    Ft(r)
  );
}
var vy = T(() => {
  mn();
  Zf();
});
function vu(e, t) {
  e = e.slice();
  var r = 0,
    n = e.length - 1,
    a = e[r],
    o = e[n],
    i;
  return (
    o < a && ((i = r), (r = n), (n = i), (i = a), (a = o), (o = i)),
    (e[r] = t.floor(a)),
    (e[n] = t.ceil(o)),
    e
  );
}
var ch = T(() => {});
function xy(e) {
  return Math.log(e);
}
function by(e) {
  return Math.exp(e);
}
function ST(e) {
  return -Math.log(-e);
}
function MT(e) {
  return -Math.exp(-e);
}
function AT(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function kT(e) {
  return e === 10 ? AT : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function CT(e) {
  return e === Math.E
    ? Math.log
    : (e === 10 && Math.log10) ||
        (e === 2 && Math.log2) ||
        ((e = Math.log(e)), (t) => Math.log(t) / e);
}
function yy(e) {
  return (t, r) => -e(-t, r);
}
function xu(e) {
  let t = e(xy, by),
    r = t.domain,
    n = 10,
    a,
    o;
  function i() {
    return (
      (a = CT(n)),
      (o = kT(n)),
      r()[0] < 0 ? ((a = yy(a)), (o = yy(o)), e(ST, MT)) : e(xy, by),
      t
    );
  }
  return (
    (t.base = function (u) {
      return arguments.length ? ((n = +u), i()) : n;
    }),
    (t.domain = function (u) {
      return arguments.length ? (r(u), i()) : r();
    }),
    (t.ticks = (u) => {
      let l = r(),
        s = l[0],
        h = l[l.length - 1],
        y = h < s;
      y && ([s, h] = [h, s]);
      let x = a(s),
        M = a(h),
        A,
        N,
        k = u == null ? 10 : +u,
        D = [];
      if (!(n % 1) && M - x < k) {
        if (((x = Math.floor(x)), (M = Math.ceil(M)), s > 0)) {
          for (; x <= M; ++x)
            for (A = 1; A < n; ++A)
              if (((N = x < 0 ? A / o(-x) : A * o(x)), !(N < s))) {
                if (N > h) break;
                D.push(N);
              }
        } else
          for (; x <= M; ++x)
            for (A = n - 1; A >= 1; --A)
              if (((N = x > 0 ? A / o(-x) : A * o(x)), !(N < s))) {
                if (N > h) break;
                D.push(N);
              }
        D.length * 2 < k && (D = Sa(s, h, k));
      } else D = Sa(x, M, Math.min(M - x, k)).map(o);
      return y ? D.reverse() : D;
    }),
    (t.tickFormat = (u, l) => {
      if (
        (u == null && (u = 10),
        l == null && (l = n === 10 ? "s" : ","),
        typeof l != "function" &&
          (!(n % 1) && (l = Fr(l)).precision == null && (l.trim = !0),
          (l = Hr(l))),
        u === 1 / 0)
      )
        return l;
      let s = Math.max(1, (n * u) / t.ticks().length);
      return (h) => {
        let y = h / o(Math.round(a(h)));
        return y * n < n - 0.5 && (y *= n), y <= s ? l(h) : "";
      };
    }),
    (t.nice = () =>
      r(
        vu(r(), {
          floor: (u) => o(Math.floor(a(u))),
          ceil: (u) => o(Math.ceil(a(u))),
        }),
      )),
    t
  );
}
function al() {
  let e = xu(Va()).domain([1, 10]);
  return (e.copy = () => Lr(e, al()).base(e.base())), Ze.apply(e, arguments), e;
}
var ol = T(() => {
  Mr();
  rl();
  ch();
  Or();
  kt();
});
function wy(e) {
  return function (t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function _y(e) {
  return function (t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function bu(e) {
  var t = 1,
    r = e(wy(t), _y(t));
  return (
    (r.constant = function (n) {
      return arguments.length ? e(wy((t = +n)), _y(t)) : t;
    }),
    Ft(r)
  );
}
function il() {
  var e = bu(Va());
  return (
    (e.copy = function () {
      return Lr(e, il()).constant(e.constant());
    }),
    Ze.apply(e, arguments)
  );
}
var ul = T(() => {
  mn();
  Or();
  kt();
});
function Sy(e) {
  return function (t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function TT(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function VT(e) {
  return e < 0 ? -e * e : e * e;
}
function yu(e) {
  var t = e(ut, ut),
    r = 1;
  function n() {
    return r === 1 ? e(ut, ut) : r === 0.5 ? e(TT, VT) : e(Sy(r), Sy(1 / r));
  }
  return (
    (t.exponent = function (a) {
      return arguments.length ? ((r = +a), n()) : r;
    }),
    Ft(t)
  );
}
function wu() {
  var e = yu(Va());
  return (
    (e.copy = function () {
      return Lr(e, wu()).exponent(e.exponent());
    }),
    Ze.apply(e, arguments),
    e
  );
}
function My() {
  return wu.apply(null, arguments).exponent(0.5);
}
var fl = T(() => {
  mn();
  Or();
  kt();
});
function Ay(e) {
  return Math.sign(e) * e * e;
}
function NT(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function ll() {
  var e = Na(),
    t = [0, 1],
    r = !1,
    n;
  function a(o) {
    var i = NT(e(o));
    return isNaN(i) ? n : r ? Math.round(i) : i;
  }
  return (
    (a.invert = function (o) {
      return e.invert(Ay(o));
    }),
    (a.domain = function (o) {
      return arguments.length ? (e.domain(o), a) : e.domain();
    }),
    (a.range = function (o) {
      return arguments.length
        ? (e.range((t = Array.from(o, On)).map(Ay)), a)
        : t.slice();
    }),
    (a.rangeRound = function (o) {
      return a.range(o).round(!0);
    }),
    (a.round = function (o) {
      return arguments.length ? ((r = !!o), a) : r;
    }),
    (a.clamp = function (o) {
      return arguments.length ? (e.clamp(o), a) : e.clamp();
    }),
    (a.unknown = function (o) {
      return arguments.length ? ((n = o), a) : n;
    }),
    (a.copy = function () {
      return ll(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
    }),
    Ze.apply(a, arguments),
    Ft(a)
  );
}
var ky = T(() => {
  Or();
  kt();
  mn();
  Zf();
});
function cl() {
  var e = [],
    t = [],
    r = [],
    n;
  function a() {
    var i = 0,
      u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++i < u; ) r[i - 1] = Vm(e, i / u);
    return o;
  }
  function o(i) {
    return i == null || isNaN((i = +i)) ? n : t[Sr(r, i)];
  }
  return (
    (o.invertExtent = function (i) {
      var u = t.indexOf(i);
      return u < 0
        ? [NaN, NaN]
        : [u > 0 ? r[u - 1] : e[0], u < r.length ? r[u] : e[e.length - 1]];
    }),
    (o.domain = function (i) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let u of i) u != null && !isNaN((u = +u)) && e.push(u);
      return e.sort(Gt), a();
    }),
    (o.range = function (i) {
      return arguments.length ? ((t = Array.from(i)), a()) : t.slice();
    }),
    (o.unknown = function (i) {
      return arguments.length ? ((n = i), o) : n;
    }),
    (o.quantiles = function () {
      return r.slice();
    }),
    (o.copy = function () {
      return cl().domain(e).range(t).unknown(n);
    }),
    Ze.apply(o, arguments)
  );
}
var Cy = T(() => {
  Mr();
  kt();
});
function sl() {
  var e = 0,
    t = 1,
    r = 1,
    n = [0.5],
    a = [0, 1],
    o;
  function i(l) {
    return l != null && l <= l ? a[Sr(n, l, 0, r)] : o;
  }
  function u() {
    var l = -1;
    for (n = new Array(r); ++l < r; )
      n[l] = ((l + 1) * t - (l - r) * e) / (r + 1);
    return i;
  }
  return (
    (i.domain = function (l) {
      return arguments.length
        ? (([e, t] = l), (e = +e), (t = +t), u())
        : [e, t];
    }),
    (i.range = function (l) {
      return arguments.length
        ? ((r = (a = Array.from(l)).length - 1), u())
        : a.slice();
    }),
    (i.invertExtent = function (l) {
      var s = a.indexOf(l);
      return s < 0
        ? [NaN, NaN]
        : s < 1
        ? [e, n[0]]
        : s >= r
        ? [n[r - 1], t]
        : [n[s - 1], n[s]];
    }),
    (i.unknown = function (l) {
      return arguments.length && (o = l), i;
    }),
    (i.thresholds = function () {
      return n.slice();
    }),
    (i.copy = function () {
      return sl().domain([e, t]).range(a).unknown(o);
    }),
    Ze.apply(Ft(i), arguments)
  );
}
var Ty = T(() => {
  Mr();
  mn();
  kt();
});
function dl() {
  var e = [0.5],
    t = [0, 1],
    r,
    n = 1;
  function a(o) {
    return o != null && o <= o ? t[Sr(e, o, 0, n)] : r;
  }
  return (
    (a.domain = function (o) {
      return arguments.length
        ? ((e = Array.from(o)), (n = Math.min(e.length, t.length - 1)), a)
        : e.slice();
    }),
    (a.range = function (o) {
      return arguments.length
        ? ((t = Array.from(o)), (n = Math.min(e.length, t.length - 1)), a)
        : t.slice();
    }),
    (a.invertExtent = function (o) {
      var i = t.indexOf(o);
      return [e[i - 1], e[i]];
    }),
    (a.unknown = function (o) {
      return arguments.length ? ((r = o), a) : r;
    }),
    (a.copy = function () {
      return dl().domain(e).range(t).unknown(r);
    }),
    Ze.apply(a, arguments)
  );
}
var Vy = T(() => {
  Mr();
  kt();
});
function Ve(e, t, r, n) {
  function a(o) {
    return e((o = arguments.length === 0 ? new Date() : new Date(+o))), o;
  }
  return (
    (a.floor = function (o) {
      return e((o = new Date(+o))), o;
    }),
    (a.ceil = function (o) {
      return e((o = new Date(o - 1))), t(o, 1), e(o), o;
    }),
    (a.round = function (o) {
      var i = a(o),
        u = a.ceil(o);
      return o - i < u - o ? i : u;
    }),
    (a.offset = function (o, i) {
      return t((o = new Date(+o)), i == null ? 1 : Math.floor(i)), o;
    }),
    (a.range = function (o, i, u) {
      var l = [],
        s;
      if (
        ((o = a.ceil(o)),
        (u = u == null ? 1 : Math.floor(u)),
        !(o < i) || !(u > 0))
      )
        return l;
      do l.push((s = new Date(+o))), t(o, u), e(o);
      while (s < o && o < i);
      return l;
    }),
    (a.filter = function (o) {
      return Ve(
        function (i) {
          if (i >= i) for (; e(i), !o(i); ) i.setTime(i - 1);
        },
        function (i, u) {
          if (i >= i)
            if (u < 0) for (; ++u <= 0; ) for (; t(i, -1), !o(i); );
            else for (; --u >= 0; ) for (; t(i, 1), !o(i); );
        },
      );
    }),
    r &&
      ((a.count = function (o, i) {
        return (
          sh.setTime(+o), dh.setTime(+i), e(sh), e(dh), Math.floor(r(sh, dh))
        );
      }),
      (a.every = function (o) {
        return (
          (o = Math.floor(o)),
          !isFinite(o) || !(o > 0)
            ? null
            : o > 1
            ? a.filter(
                n
                  ? function (i) {
                      return n(i) % o === 0;
                    }
                  : function (i) {
                      return a.count(0, i) % o === 0;
                    },
              )
            : a
        );
      })),
    a
  );
}
var sh,
  dh,
  Vt = T(() => {
    (sh = new Date()), (dh = new Date());
  });
var ml,
  _u,
  mh,
  hh = T(() => {
    Vt();
    ml = Ve(
      function () {},
      function (e, t) {
        e.setTime(+e + t);
      },
      function (e, t) {
        return t - e;
      },
    );
    ml.every = function (e) {
      return (
        (e = Math.floor(e)),
        !isFinite(e) || !(e > 0)
          ? null
          : e > 1
          ? Ve(
              function (t) {
                t.setTime(Math.floor(t / e) * e);
              },
              function (t, r) {
                t.setTime(+t + r * e);
              },
              function (t, r) {
                return (r - t) / e;
              },
            )
          : ml
      );
    };
    (_u = ml), (mh = ml.range);
  });
var Ny,
  lr,
  ph,
  gh = T(() => {
    Vt();
    (Ny = Ve(
      function (e) {
        e.setTime(e - e.getMilliseconds());
      },
      function (e, t) {
        e.setTime(+e + t * 1e3);
      },
      function (e, t) {
        return (t - e) / 1e3;
      },
      function (e) {
        return e.getUTCSeconds();
      },
    )),
      (lr = Ny),
      (ph = Ny.range);
  });
var Dy,
  Do,
  Ey,
  vh = T(() => {
    Vt();
    (Dy = Ve(
      function (e) {
        e.setTime(e - e.getMilliseconds() - e.getSeconds() * 1e3);
      },
      function (e, t) {
        e.setTime(+e + t * 6e4);
      },
      function (e, t) {
        return (t - e) / 6e4;
      },
      function (e) {
        return e.getMinutes();
      },
    )),
      (Do = Dy),
      (Ey = Dy.range);
  });
var Iy,
  Eo,
  zy,
  xh = T(() => {
    Vt();
    (Iy = Ve(
      function (e) {
        e.setTime(
          e - e.getMilliseconds() - e.getSeconds() * 1e3 - e.getMinutes() * 6e4,
        );
      },
      function (e, t) {
        e.setTime(+e + t * 36e5);
      },
      function (e, t) {
        return (t - e) / 36e5;
      },
      function (e) {
        return e.getHours();
      },
    )),
      (Eo = Iy),
      (zy = Iy.range);
  });
var Py,
  hn,
  Ry,
  yh = T(() => {
    Vt();
    (Py = Ve(
      (e) => e.setHours(0, 0, 0, 0),
      (e, t) => e.setDate(e.getDate() + t),
      (e, t) =>
        (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 864e5,
      (e) => e.getDate() - 1,
    )),
      (hn = Py),
      (Ry = Py.range);
  });
function za(e) {
  return Ve(
    function (t) {
      t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)),
        t.setHours(0, 0, 0, 0);
    },
    function (t, r) {
      t.setDate(t.getDate() + r * 7);
    },
    function (t, r) {
      return (
        (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 6048e5
      );
    },
  );
}
var Wr,
  Pa,
  wh,
  _h,
  pn,
  Sh,
  Mh,
  Ah,
  Oy,
  By,
  Fy,
  Hy,
  Yy,
  qy,
  kh = T(() => {
    Vt();
    (Wr = za(0)),
      (Pa = za(1)),
      (wh = za(2)),
      (_h = za(3)),
      (pn = za(4)),
      (Sh = za(5)),
      (Mh = za(6)),
      (Ah = Wr.range),
      (Oy = Pa.range),
      (By = wh.range),
      (Fy = _h.range),
      (Hy = pn.range),
      (Yy = Sh.range),
      (qy = Mh.range);
  });
var Wy,
  Io,
  $y,
  Ch = T(() => {
    Vt();
    (Wy = Ve(
      function (e) {
        e.setDate(1), e.setHours(0, 0, 0, 0);
      },
      function (e, t) {
        e.setMonth(e.getMonth() + t);
      },
      function (e, t) {
        return (
          t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12
        );
      },
      function (e) {
        return e.getMonth();
      },
    )),
      (Io = Wy),
      ($y = Wy.range);
  });
var Th,
  cr,
  Gy,
  Vh = T(() => {
    Vt();
    Th = Ve(
      function (e) {
        e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
      },
      function (e, t) {
        e.setFullYear(e.getFullYear() + t);
      },
      function (e, t) {
        return t.getFullYear() - e.getFullYear();
      },
      function (e) {
        return e.getFullYear();
      },
    );
    Th.every = function (e) {
      return !isFinite((e = Math.floor(e))) || !(e > 0)
        ? null
        : Ve(
            function (t) {
              t.setFullYear(Math.floor(t.getFullYear() / e) * e),
                t.setMonth(0, 1),
                t.setHours(0, 0, 0, 0);
            },
            function (t, r) {
              t.setFullYear(t.getFullYear() + r * e);
            },
          );
    };
    (cr = Th), (Gy = Th.range);
  });
var Uy,
  zo,
  Xy,
  Nh = T(() => {
    Vt();
    (Uy = Ve(
      function (e) {
        e.setUTCSeconds(0, 0);
      },
      function (e, t) {
        e.setTime(+e + t * 6e4);
      },
      function (e, t) {
        return (t - e) / 6e4;
      },
      function (e) {
        return e.getUTCMinutes();
      },
    )),
      (zo = Uy),
      (Xy = Uy.range);
  });
var jy,
  Po,
  Qy,
  Dh = T(() => {
    Vt();
    (jy = Ve(
      function (e) {
        e.setUTCMinutes(0, 0, 0);
      },
      function (e, t) {
        e.setTime(+e + t * 36e5);
      },
      function (e, t) {
        return (t - e) / 36e5;
      },
      function (e) {
        return e.getUTCHours();
      },
    )),
      (Po = jy),
      (Qy = jy.range);
  });
var Ky,
  gn,
  Zy,
  Eh = T(() => {
    Vt();
    (Ky = Ve(
      function (e) {
        e.setUTCHours(0, 0, 0, 0);
      },
      function (e, t) {
        e.setUTCDate(e.getUTCDate() + t);
      },
      function (e, t) {
        return (t - e) / 864e5;
      },
      function (e) {
        return e.getUTCDate() - 1;
      },
    )),
      (gn = Ky),
      (Zy = Ky.range);
  });
function Ra(e) {
  return Ve(
    function (t) {
      t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)),
        t.setUTCHours(0, 0, 0, 0);
    },
    function (t, r) {
      t.setUTCDate(t.getUTCDate() + r * 7);
    },
    function (t, r) {
      return (r - t) / 6048e5;
    },
  );
}
var $r,
  La,
  Ih,
  zh,
  vn,
  Ph,
  Rh,
  Lh,
  Jy,
  e2,
  t2,
  r2,
  n2,
  a2,
  Oh = T(() => {
    Vt();
    ($r = Ra(0)),
      (La = Ra(1)),
      (Ih = Ra(2)),
      (zh = Ra(3)),
      (vn = Ra(4)),
      (Ph = Ra(5)),
      (Rh = Ra(6)),
      (Lh = $r.range),
      (Jy = La.range),
      (e2 = Ih.range),
      (t2 = zh.range),
      (r2 = vn.range),
      (n2 = Ph.range),
      (a2 = Rh.range);
  });
var o2,
  Ro,
  i2,
  Bh = T(() => {
    Vt();
    (o2 = Ve(
      function (e) {
        e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
      },
      function (e, t) {
        e.setUTCMonth(e.getUTCMonth() + t);
      },
      function (e, t) {
        return (
          t.getUTCMonth() -
          e.getUTCMonth() +
          (t.getUTCFullYear() - e.getUTCFullYear()) * 12
        );
      },
      function (e) {
        return e.getUTCMonth();
      },
    )),
      (Ro = o2),
      (i2 = o2.range);
  });
var Fh,
  sr,
  u2,
  Hh = T(() => {
    Vt();
    Fh = Ve(
      function (e) {
        e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
      },
      function (e, t) {
        e.setUTCFullYear(e.getUTCFullYear() + t);
      },
      function (e, t) {
        return t.getUTCFullYear() - e.getUTCFullYear();
      },
      function (e) {
        return e.getUTCFullYear();
      },
    );
    Fh.every = function (e) {
      return !isFinite((e = Math.floor(e))) || !(e > 0)
        ? null
        : Ve(
            function (t) {
              t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e),
                t.setUTCMonth(0, 1),
                t.setUTCHours(0, 0, 0, 0);
            },
            function (t, r) {
              t.setUTCFullYear(t.getUTCFullYear() + r * e);
            },
          );
    };
    (sr = Fh), (u2 = Fh.range);
  });
function hl(e, t) {
  return e == null || t == null
    ? NaN
    : e < t
    ? -1
    : e > t
    ? 1
    : e >= t
    ? 0
    : NaN;
}
var f2 = T(() => {});
function pl(e) {
  let t = e,
    r = e,
    n = e;
  e.length !== 2 &&
    ((t = (u, l) => e(u) - l), (r = hl), (n = (u, l) => hl(e(u), l)));
  function a(u, l, s = 0, h = u.length) {
    if (s < h) {
      if (r(l, l) !== 0) return h;
      do {
        let y = (s + h) >>> 1;
        n(u[y], l) < 0 ? (s = y + 1) : (h = y);
      } while (s < h);
    }
    return s;
  }
  function o(u, l, s = 0, h = u.length) {
    if (s < h) {
      if (r(l, l) !== 0) return h;
      do {
        let y = (s + h) >>> 1;
        n(u[y], l) <= 0 ? (s = y + 1) : (h = y);
      } while (s < h);
    }
    return s;
  }
  function i(u, l, s = 0, h = u.length) {
    let y = a(u, l, s, h - 1);
    return y > s && t(u[y - 1], l) > -t(u[y], l) ? y - 1 : y;
  }
  return { left: a, center: i, right: o };
}
var l2 = T(() => {
  f2();
});
function gl(e, t, r) {
  var n = Math.abs(t - e) / Math.max(0, r),
    a = Math.pow(10, Math.floor(Math.log(n) / Math.LN10)),
    o = n / a;
  return (
    o >= DT ? (a *= 10) : o >= ET ? (a *= 5) : o >= IT && (a *= 2),
    t < e ? -a : a
  );
}
var DT,
  ET,
  IT,
  c2 = T(() => {
    (DT = Math.sqrt(50)), (ET = Math.sqrt(10)), (IT = Math.sqrt(2));
  });
var s2 = T(() => {
  l2();
  c2();
});
function m2(e, t, r, n, a, o) {
  let i = [
    [lr, 1, 1e3],
    [lr, 5, 5 * 1e3],
    [lr, 15, 15 * 1e3],
    [lr, 30, 30 * 1e3],
    [o, 1, 6e4],
    [o, 5, 5 * 6e4],
    [o, 15, 15 * 6e4],
    [o, 30, 30 * 6e4],
    [a, 1, 36e5],
    [a, 3, 3 * 36e5],
    [a, 6, 6 * 36e5],
    [a, 12, 12 * 36e5],
    [n, 1, 864e5],
    [n, 2, 2 * 864e5],
    [r, 1, 6048e5],
    [t, 1, 2592e6],
    [t, 3, 3 * 2592e6],
    [e, 1, 31536e6],
  ];
  function u(s, h, y) {
    let x = h < s;
    x && ([s, h] = [h, s]);
    let M = y && typeof y.range == "function" ? y : l(s, h, y),
      A = M ? M.range(s, +h + 1) : [];
    return x ? A.reverse() : A;
  }
  function l(s, h, y) {
    let x = Math.abs(h - s) / y,
      M = pl(([, , k]) => k).right(i, x);
    if (M === i.length) return e.every(gl(s / 31536e6, h / 31536e6, y));
    if (M === 0) return _u.every(Math.max(gl(s, h, y), 1));
    let [A, N] = i[x / i[M - 1][2] < i[M][2] / x ? M - 1 : M];
    return A.every(N);
  }
  return [u, l];
}
var vl,
  xl,
  bl,
  yl,
  h2 = T(() => {
    s2();
    hh();
    gh();
    vh();
    xh();
    yh();
    kh();
    Ch();
    Vh();
    Nh();
    Dh();
    Eh();
    Oh();
    Bh();
    Hh();
    ([vl, xl] = m2(sr, Ro, $r, gn, Po, zo)),
      ([bl, yl] = m2(cr, Io, Wr, hn, Eo, Do));
  });
var p2 = {};
At(p2, {
  timeDay: () => hn,
  timeDays: () => Ry,
  timeFriday: () => Sh,
  timeFridays: () => Yy,
  timeHour: () => Eo,
  timeHours: () => zy,
  timeInterval: () => Ve,
  timeMillisecond: () => _u,
  timeMilliseconds: () => mh,
  timeMinute: () => Do,
  timeMinutes: () => Ey,
  timeMonday: () => Pa,
  timeMondays: () => Oy,
  timeMonth: () => Io,
  timeMonths: () => $y,
  timeSaturday: () => Mh,
  timeSaturdays: () => qy,
  timeSecond: () => lr,
  timeSeconds: () => ph,
  timeSunday: () => Wr,
  timeSundays: () => Ah,
  timeThursday: () => pn,
  timeThursdays: () => Hy,
  timeTickInterval: () => yl,
  timeTicks: () => bl,
  timeTuesday: () => wh,
  timeTuesdays: () => By,
  timeWednesday: () => _h,
  timeWednesdays: () => Fy,
  timeWeek: () => Wr,
  timeWeeks: () => Ah,
  timeYear: () => cr,
  timeYears: () => Gy,
  utcDay: () => gn,
  utcDays: () => Zy,
  utcFriday: () => Ph,
  utcFridays: () => n2,
  utcHour: () => Po,
  utcHours: () => Qy,
  utcMillisecond: () => _u,
  utcMilliseconds: () => mh,
  utcMinute: () => zo,
  utcMinutes: () => Xy,
  utcMonday: () => La,
  utcMondays: () => Jy,
  utcMonth: () => Ro,
  utcMonths: () => i2,
  utcSaturday: () => Rh,
  utcSaturdays: () => a2,
  utcSecond: () => lr,
  utcSeconds: () => ph,
  utcSunday: () => $r,
  utcSundays: () => Lh,
  utcThursday: () => vn,
  utcThursdays: () => r2,
  utcTickInterval: () => xl,
  utcTicks: () => vl,
  utcTuesday: () => Ih,
  utcTuesdays: () => e2,
  utcWednesday: () => zh,
  utcWednesdays: () => t2,
  utcWeek: () => $r,
  utcWeeks: () => Lh,
  utcYear: () => sr,
  utcYears: () => u2,
});
var Lo = T(() => {
  Vt();
  hh();
  gh();
  vh();
  xh();
  yh();
  kh();
  Ch();
  Vh();
  Nh();
  Dh();
  Eh();
  Oh();
  Bh();
  Hh();
  h2();
});
function Yh(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function qh(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Su(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function Wh(e) {
  var t = e.dateTime,
    r = e.date,
    n = e.time,
    a = e.periods,
    o = e.days,
    i = e.shortDays,
    u = e.months,
    l = e.shortMonths,
    s = Mu(a),
    h = Au(a),
    y = Mu(o),
    x = Au(o),
    M = Mu(i),
    A = Au(i),
    N = Mu(u),
    k = Au(u),
    D = Mu(l),
    B = Au(l),
    F = {
      a: X,
      A: K,
      b: Z,
      B: te,
      c: null,
      d: w2,
      e: w2,
      f: nV,
      g: mV,
      G: pV,
      H: eV,
      I: tV,
      j: rV,
      L: k2,
      m: aV,
      M: oV,
      p: le,
      q: de,
      Q: M2,
      s: A2,
      S: iV,
      u: uV,
      U: fV,
      V: lV,
      w: cV,
      W: sV,
      x: null,
      X: null,
      y: dV,
      Y: hV,
      Z: gV,
      "%": S2,
    },
    R = {
      a: re,
      A: me,
      b: Me,
      B: Oe,
      c: null,
      d: _2,
      e: _2,
      f: yV,
      g: NV,
      G: EV,
      H: vV,
      I: xV,
      j: bV,
      L: T2,
      m: wV,
      M: _V,
      p: Ne,
      q: Ue,
      Q: M2,
      s: A2,
      S: SV,
      u: MV,
      U: AV,
      V: kV,
      w: CV,
      W: TV,
      x: null,
      X: null,
      y: VV,
      Y: DV,
      Z: IV,
      "%": S2,
    },
    I = {
      a: ne,
      A: U,
      b: ae,
      B: J,
      c: H,
      d: b2,
      e: b2,
      f: QT,
      g: x2,
      G: v2,
      H: y2,
      I: y2,
      j: GT,
      L: jT,
      m: $T,
      M: UT,
      p: ue,
      q: WT,
      Q: ZT,
      s: JT,
      S: XT,
      u: BT,
      U: FT,
      V: HT,
      w: OT,
      W: YT,
      x: ee,
      X: j,
      y: x2,
      Y: v2,
      Z: qT,
      "%": KT,
    };
  (F.x = L(r, F)),
    (F.X = L(n, F)),
    (F.c = L(t, F)),
    (R.x = L(r, R)),
    (R.X = L(n, R)),
    (R.c = L(t, R));
  function L(ce, _e) {
    return function (be) {
      var ie = [],
        Xe = -1,
        Be = 0,
        vt = ce.length,
        nt,
        xe,
        Qe;
      for (be instanceof Date || (be = new Date(+be)); ++Xe < vt; )
        ce.charCodeAt(Xe) === 37 &&
          (ie.push(ce.slice(Be, Xe)),
          (xe = g2[(nt = ce.charAt(++Xe))]) != null
            ? (nt = ce.charAt(++Xe))
            : (xe = nt === "e" ? " " : "0"),
          (Qe = _e[nt]) && (nt = Qe(be, xe)),
          ie.push(nt),
          (Be = Xe + 1));
      return ie.push(ce.slice(Be, Xe)), ie.join("");
    };
  }
  function $(ce, _e) {
    return function (be) {
      var ie = Su(1900, void 0, 1),
        Xe = G(ie, ce, (be += ""), 0),
        Be,
        vt;
      if (Xe != be.length) return null;
      if ("Q" in ie) return new Date(ie.Q);
      if ("s" in ie) return new Date(ie.s * 1e3 + ("L" in ie ? ie.L : 0));
      if (
        (_e && !("Z" in ie) && (ie.Z = 0),
        "p" in ie && (ie.H = (ie.H % 12) + ie.p * 12),
        ie.m === void 0 && (ie.m = "q" in ie ? ie.q : 0),
        "V" in ie)
      ) {
        if (ie.V < 1 || ie.V > 53) return null;
        "w" in ie || (ie.w = 1),
          "Z" in ie
            ? ((Be = qh(Su(ie.y, 0, 1))),
              (vt = Be.getUTCDay()),
              (Be = vt > 4 || vt === 0 ? La.ceil(Be) : La(Be)),
              (Be = gn.offset(Be, (ie.V - 1) * 7)),
              (ie.y = Be.getUTCFullYear()),
              (ie.m = Be.getUTCMonth()),
              (ie.d = Be.getUTCDate() + ((ie.w + 6) % 7)))
            : ((Be = Yh(Su(ie.y, 0, 1))),
              (vt = Be.getDay()),
              (Be = vt > 4 || vt === 0 ? Pa.ceil(Be) : Pa(Be)),
              (Be = hn.offset(Be, (ie.V - 1) * 7)),
              (ie.y = Be.getFullYear()),
              (ie.m = Be.getMonth()),
              (ie.d = Be.getDate() + ((ie.w + 6) % 7)));
      } else
        ("W" in ie || "U" in ie) &&
          ("w" in ie || (ie.w = "u" in ie ? ie.u % 7 : "W" in ie ? 1 : 0),
          (vt =
            "Z" in ie
              ? qh(Su(ie.y, 0, 1)).getUTCDay()
              : Yh(Su(ie.y, 0, 1)).getDay()),
          (ie.m = 0),
          (ie.d =
            "W" in ie
              ? ((ie.w + 6) % 7) + ie.W * 7 - ((vt + 5) % 7)
              : ie.w + ie.U * 7 - ((vt + 6) % 7)));
      return "Z" in ie
        ? ((ie.H += (ie.Z / 100) | 0), (ie.M += ie.Z % 100), qh(ie))
        : Yh(ie);
    };
  }
  function G(ce, _e, be, ie) {
    for (var Xe = 0, Be = _e.length, vt = be.length, nt, xe; Xe < Be; ) {
      if (ie >= vt) return -1;
      if (((nt = _e.charCodeAt(Xe++)), nt === 37)) {
        if (
          ((nt = _e.charAt(Xe++)),
          (xe = I[nt in g2 ? _e.charAt(Xe++) : nt]),
          !xe || (ie = xe(ce, be, ie)) < 0)
        )
          return -1;
      } else if (nt != be.charCodeAt(ie++)) return -1;
    }
    return ie;
  }
  function ue(ce, _e, be) {
    var ie = s.exec(_e.slice(be));
    return ie ? ((ce.p = h.get(ie[0].toLowerCase())), be + ie[0].length) : -1;
  }
  function ne(ce, _e, be) {
    var ie = M.exec(_e.slice(be));
    return ie ? ((ce.w = A.get(ie[0].toLowerCase())), be + ie[0].length) : -1;
  }
  function U(ce, _e, be) {
    var ie = y.exec(_e.slice(be));
    return ie ? ((ce.w = x.get(ie[0].toLowerCase())), be + ie[0].length) : -1;
  }
  function ae(ce, _e, be) {
    var ie = D.exec(_e.slice(be));
    return ie ? ((ce.m = B.get(ie[0].toLowerCase())), be + ie[0].length) : -1;
  }
  function J(ce, _e, be) {
    var ie = N.exec(_e.slice(be));
    return ie ? ((ce.m = k.get(ie[0].toLowerCase())), be + ie[0].length) : -1;
  }
  function H(ce, _e, be) {
    return G(ce, t, _e, be);
  }
  function ee(ce, _e, be) {
    return G(ce, r, _e, be);
  }
  function j(ce, _e, be) {
    return G(ce, n, _e, be);
  }
  function X(ce) {
    return i[ce.getDay()];
  }
  function K(ce) {
    return o[ce.getDay()];
  }
  function Z(ce) {
    return l[ce.getMonth()];
  }
  function te(ce) {
    return u[ce.getMonth()];
  }
  function le(ce) {
    return a[+(ce.getHours() >= 12)];
  }
  function de(ce) {
    return 1 + ~~(ce.getMonth() / 3);
  }
  function re(ce) {
    return i[ce.getUTCDay()];
  }
  function me(ce) {
    return o[ce.getUTCDay()];
  }
  function Me(ce) {
    return l[ce.getUTCMonth()];
  }
  function Oe(ce) {
    return u[ce.getUTCMonth()];
  }
  function Ne(ce) {
    return a[+(ce.getUTCHours() >= 12)];
  }
  function Ue(ce) {
    return 1 + ~~(ce.getUTCMonth() / 3);
  }
  return {
    format: function (ce) {
      var _e = L((ce += ""), F);
      return (
        (_e.toString = function () {
          return ce;
        }),
        _e
      );
    },
    parse: function (ce) {
      var _e = $((ce += ""), !1);
      return (
        (_e.toString = function () {
          return ce;
        }),
        _e
      );
    },
    utcFormat: function (ce) {
      var _e = L((ce += ""), R);
      return (
        (_e.toString = function () {
          return ce;
        }),
        _e
      );
    },
    utcParse: function (ce) {
      var _e = $((ce += ""), !0);
      return (
        (_e.toString = function () {
          return ce;
        }),
        _e
      );
    },
  };
}
function He(e, t, r) {
  var n = e < 0 ? "-" : "",
    a = (n ? -e : e) + "",
    o = a.length;
  return n + (o < r ? new Array(r - o + 1).join(t) + a : a);
}
function LT(e) {
  return e.replace(RT, "\\$&");
}
function Mu(e) {
  return new RegExp("^(?:" + e.map(LT).join("|") + ")", "i");
}
function Au(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function OT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 1));
  return n ? ((e.w = +n[0]), r + n[0].length) : -1;
}
function BT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 1));
  return n ? ((e.u = +n[0]), r + n[0].length) : -1;
}
function FT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 2));
  return n ? ((e.U = +n[0]), r + n[0].length) : -1;
}
function HT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 2));
  return n ? ((e.V = +n[0]), r + n[0].length) : -1;
}
function YT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 2));
  return n ? ((e.W = +n[0]), r + n[0].length) : -1;
}
function v2(e, t, r) {
  var n = ct.exec(t.slice(r, r + 4));
  return n ? ((e.y = +n[0]), r + n[0].length) : -1;
}
function x2(e, t, r) {
  var n = ct.exec(t.slice(r, r + 2));
  return n ? ((e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3)), r + n[0].length) : -1;
}
function qT(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n
    ? ((e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00"))), r + n[0].length)
    : -1;
}
function WT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 1));
  return n ? ((e.q = n[0] * 3 - 3), r + n[0].length) : -1;
}
function $T(e, t, r) {
  var n = ct.exec(t.slice(r, r + 2));
  return n ? ((e.m = n[0] - 1), r + n[0].length) : -1;
}
function b2(e, t, r) {
  var n = ct.exec(t.slice(r, r + 2));
  return n ? ((e.d = +n[0]), r + n[0].length) : -1;
}
function GT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 3));
  return n ? ((e.m = 0), (e.d = +n[0]), r + n[0].length) : -1;
}
function y2(e, t, r) {
  var n = ct.exec(t.slice(r, r + 2));
  return n ? ((e.H = +n[0]), r + n[0].length) : -1;
}
function UT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 2));
  return n ? ((e.M = +n[0]), r + n[0].length) : -1;
}
function XT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 2));
  return n ? ((e.S = +n[0]), r + n[0].length) : -1;
}
function jT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 3));
  return n ? ((e.L = +n[0]), r + n[0].length) : -1;
}
function QT(e, t, r) {
  var n = ct.exec(t.slice(r, r + 6));
  return n ? ((e.L = Math.floor(n[0] / 1e3)), r + n[0].length) : -1;
}
function KT(e, t, r) {
  var n = PT.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function ZT(e, t, r) {
  var n = ct.exec(t.slice(r));
  return n ? ((e.Q = +n[0]), r + n[0].length) : -1;
}
function JT(e, t, r) {
  var n = ct.exec(t.slice(r));
  return n ? ((e.s = +n[0]), r + n[0].length) : -1;
}
function w2(e, t) {
  return He(e.getDate(), t, 2);
}
function eV(e, t) {
  return He(e.getHours(), t, 2);
}
function tV(e, t) {
  return He(e.getHours() % 12 || 12, t, 2);
}
function rV(e, t) {
  return He(1 + hn.count(cr(e), e), t, 3);
}
function k2(e, t) {
  return He(e.getMilliseconds(), t, 3);
}
function nV(e, t) {
  return k2(e, t) + "000";
}
function aV(e, t) {
  return He(e.getMonth() + 1, t, 2);
}
function oV(e, t) {
  return He(e.getMinutes(), t, 2);
}
function iV(e, t) {
  return He(e.getSeconds(), t, 2);
}
function uV(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function fV(e, t) {
  return He(Wr.count(cr(e) - 1, e), t, 2);
}
function C2(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? pn(e) : pn.ceil(e);
}
function lV(e, t) {
  return (e = C2(e)), He(pn.count(cr(e), e) + (cr(e).getDay() === 4), t, 2);
}
function cV(e) {
  return e.getDay();
}
function sV(e, t) {
  return He(Pa.count(cr(e) - 1, e), t, 2);
}
function dV(e, t) {
  return He(e.getFullYear() % 100, t, 2);
}
function mV(e, t) {
  return (e = C2(e)), He(e.getFullYear() % 100, t, 2);
}
function hV(e, t) {
  return He(e.getFullYear() % 1e4, t, 4);
}
function pV(e, t) {
  var r = e.getDay();
  return (
    (e = r >= 4 || r === 0 ? pn(e) : pn.ceil(e)),
    He(e.getFullYear() % 1e4, t, 4)
  );
}
function gV(e) {
  var t = e.getTimezoneOffset();
  return (
    (t > 0 ? "-" : ((t *= -1), "+")) +
    He((t / 60) | 0, "0", 2) +
    He(t % 60, "0", 2)
  );
}
function _2(e, t) {
  return He(e.getUTCDate(), t, 2);
}
function vV(e, t) {
  return He(e.getUTCHours(), t, 2);
}
function xV(e, t) {
  return He(e.getUTCHours() % 12 || 12, t, 2);
}
function bV(e, t) {
  return He(1 + gn.count(sr(e), e), t, 3);
}
function T2(e, t) {
  return He(e.getUTCMilliseconds(), t, 3);
}
function yV(e, t) {
  return T2(e, t) + "000";
}
function wV(e, t) {
  return He(e.getUTCMonth() + 1, t, 2);
}
function _V(e, t) {
  return He(e.getUTCMinutes(), t, 2);
}
function SV(e, t) {
  return He(e.getUTCSeconds(), t, 2);
}
function MV(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function AV(e, t) {
  return He($r.count(sr(e) - 1, e), t, 2);
}
function V2(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? vn(e) : vn.ceil(e);
}
function kV(e, t) {
  return (e = V2(e)), He(vn.count(sr(e), e) + (sr(e).getUTCDay() === 4), t, 2);
}
function CV(e) {
  return e.getUTCDay();
}
function TV(e, t) {
  return He(La.count(sr(e) - 1, e), t, 2);
}
function VV(e, t) {
  return He(e.getUTCFullYear() % 100, t, 2);
}
function NV(e, t) {
  return (e = V2(e)), He(e.getUTCFullYear() % 100, t, 2);
}
function DV(e, t) {
  return He(e.getUTCFullYear() % 1e4, t, 4);
}
function EV(e, t) {
  var r = e.getUTCDay();
  return (
    (e = r >= 4 || r === 0 ? vn(e) : vn.ceil(e)),
    He(e.getUTCFullYear() % 1e4, t, 4)
  );
}
function IV() {
  return "+0000";
}
function S2() {
  return "%";
}
function M2(e) {
  return +e;
}
function A2(e) {
  return Math.floor(+e / 1e3);
}
var g2,
  ct,
  PT,
  RT,
  N2 = T(() => {
    Lo();
    (g2 = { "-": "", _: " ", 0: "0" }),
      (ct = /^\s*\d+/),
      (PT = /^%/),
      (RT = /[\\^$*+?|[\]().{}]/g);
  });
function $h(e) {
  return (
    (Oo = Wh(e)),
    (wl = Oo.format),
    (D2 = Oo.parse),
    (_l = Oo.utcFormat),
    (E2 = Oo.utcParse),
    Oo
  );
}
var Oo,
  wl,
  D2,
  _l,
  E2,
  I2 = T(() => {
    N2();
    $h({
      dateTime: "%x, %X",
      date: "%-m/%-d/%Y",
      time: "%-I:%M:%S %p",
      periods: ["AM", "PM"],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    });
  });
var Sl = T(() => {
  I2();
});
function zV(e) {
  return new Date(e);
}
function PV(e) {
  return e instanceof Date ? +e : +new Date(+e);
}
function Ml(e, t, r, n, a, o, i, u, l, s) {
  var h = Na(),
    y = h.invert,
    x = h.domain,
    M = s(".%L"),
    A = s(":%S"),
    N = s("%I:%M"),
    k = s("%I %p"),
    D = s("%a %d"),
    B = s("%b %d"),
    F = s("%B"),
    R = s("%Y");
  function I(L) {
    return (
      l(L) < L
        ? M
        : u(L) < L
        ? A
        : i(L) < L
        ? N
        : o(L) < L
        ? k
        : n(L) < L
        ? a(L) < L
          ? D
          : B
        : r(L) < L
        ? F
        : R
    )(L);
  }
  return (
    (h.invert = function (L) {
      return new Date(y(L));
    }),
    (h.domain = function (L) {
      return arguments.length ? x(Array.from(L, PV)) : x().map(zV);
    }),
    (h.ticks = function (L) {
      var $ = x();
      return e($[0], $[$.length - 1], L ?? 10);
    }),
    (h.tickFormat = function (L, $) {
      return $ == null ? I : s($);
    }),
    (h.nice = function (L) {
      var $ = x();
      return (
        (!L || typeof L.range != "function") &&
          (L = t($[0], $[$.length - 1], L ?? 10)),
        L ? x(vu($, L)) : h
      );
    }),
    (h.copy = function () {
      return Lr(h, Ml(e, t, r, n, a, o, i, u, l, s));
    }),
    h
  );
}
function ku() {
  return Ze.apply(
    Ml(bl, yl, cr, Io, Wr, hn, Eo, Do, lr, wl).domain([
      new Date(2e3, 0, 1),
      new Date(2e3, 0, 2),
    ]),
    arguments,
  );
}
var Gh = T(() => {
  Lo();
  Sl();
  Or();
  kt();
  ch();
});
function Uh() {
  return Ze.apply(
    Ml(vl, xl, sr, Ro, $r, gn, Po, zo, lr, _l).domain([
      Date.UTC(2e3, 0, 1),
      Date.UTC(2e3, 0, 2),
    ]),
    arguments,
  );
}
var z2 = T(() => {
  Lo();
  Sl();
  Gh();
  kt();
});
function Al() {
  var e = 0,
    t = 1,
    r,
    n,
    a,
    o,
    i = ut,
    u = !1,
    l;
  function s(y) {
    return y == null || isNaN((y = +y))
      ? l
      : i(
          a === 0
            ? 0.5
            : ((y = (o(y) - r) * a), u ? Math.max(0, Math.min(1, y)) : y),
        );
  }
  (s.domain = function (y) {
    return arguments.length
      ? (([e, t] = y),
        (r = o((e = +e))),
        (n = o((t = +t))),
        (a = r === n ? 0 : 1 / (n - r)),
        s)
      : [e, t];
  }),
    (s.clamp = function (y) {
      return arguments.length ? ((u = !!y), s) : u;
    }),
    (s.interpolator = function (y) {
      return arguments.length ? ((i = y), s) : i;
    });
  function h(y) {
    return function (x) {
      var M, A;
      return arguments.length ? (([M, A] = x), (i = y(M, A)), s) : [i(0), i(1)];
    };
  }
  return (
    (s.range = h(tt)),
    (s.rangeRound = h(Ta)),
    (s.unknown = function (y) {
      return arguments.length ? ((l = y), s) : l;
    }),
    function (y) {
      return (
        (o = y), (r = y(e)), (n = y(t)), (a = r === n ? 0 : 1 / (n - r)), s
      );
    }
  );
}
function xn(e, t) {
  return t
    .domain(e.domain())
    .interpolator(e.interpolator())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function Bo() {
  var e = Ft(Al()(ut));
  return (
    (e.copy = function () {
      return xn(e, Bo());
    }),
    ur.apply(e, arguments)
  );
}
function Xh() {
  var e = xu(Al()).domain([1, 10]);
  return (
    (e.copy = function () {
      return xn(e, Xh()).base(e.base());
    }),
    ur.apply(e, arguments)
  );
}
function jh() {
  var e = bu(Al());
  return (
    (e.copy = function () {
      return xn(e, jh()).constant(e.constant());
    }),
    ur.apply(e, arguments)
  );
}
function kl() {
  var e = yu(Al());
  return (
    (e.copy = function () {
      return xn(e, kl()).exponent(e.exponent());
    }),
    ur.apply(e, arguments)
  );
}
function P2() {
  return kl.apply(null, arguments).exponent(0.5);
}
var Qh = T(() => {
  Zt();
  Or();
  kt();
  mn();
  ol();
  ul();
  fl();
});
function Cl() {
  var e = [],
    t = ut;
  function r(n) {
    if (n != null && !isNaN((n = +n)))
      return t((Sr(e, n, 1) - 1) / (e.length - 1));
  }
  return (
    (r.domain = function (n) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let a of n) a != null && !isNaN((a = +a)) && e.push(a);
      return e.sort(Gt), r;
    }),
    (r.interpolator = function (n) {
      return arguments.length ? ((t = n), r) : t;
    }),
    (r.range = function () {
      return e.map((n, a) => t(a / (e.length - 1)));
    }),
    (r.quantiles = function (n) {
      return Array.from({ length: n + 1 }, (a, o) => Wf(e, o / n));
    }),
    (r.copy = function () {
      return Cl(t).domain(e);
    }),
    ur.apply(r, arguments)
  );
}
var R2 = T(() => {
  Mr();
  Or();
  kt();
});
function Tl() {
  var e = 0,
    t = 0.5,
    r = 1,
    n = 1,
    a,
    o,
    i,
    u,
    l,
    s = ut,
    h,
    y = !1,
    x;
  function M(N) {
    return isNaN((N = +N))
      ? x
      : ((N = 0.5 + ((N = +h(N)) - o) * (n * N < n * o ? u : l)),
        s(y ? Math.max(0, Math.min(1, N)) : N));
  }
  (M.domain = function (N) {
    return arguments.length
      ? (([e, t, r] = N),
        (a = h((e = +e))),
        (o = h((t = +t))),
        (i = h((r = +r))),
        (u = a === o ? 0 : 0.5 / (o - a)),
        (l = o === i ? 0 : 0.5 / (i - o)),
        (n = o < a ? -1 : 1),
        M)
      : [e, t, r];
  }),
    (M.clamp = function (N) {
      return arguments.length ? ((y = !!N), M) : y;
    }),
    (M.interpolator = function (N) {
      return arguments.length ? ((s = N), M) : s;
    });
  function A(N) {
    return function (k) {
      var D, B, F;
      return arguments.length
        ? (([D, B, F] = k), (s = Kf(N, [D, B, F])), M)
        : [s(0), s(0.5), s(1)];
    };
  }
  return (
    (M.range = A(tt)),
    (M.rangeRound = A(Ta)),
    (M.unknown = function (N) {
      return arguments.length ? ((x = N), M) : x;
    }),
    function (N) {
      return (
        (h = N),
        (a = N(e)),
        (o = N(t)),
        (i = N(r)),
        (u = a === o ? 0 : 0.5 / (o - a)),
        (l = o === i ? 0 : 0.5 / (i - o)),
        (n = o < a ? -1 : 1),
        M
      );
    }
  );
}
function Vl() {
  var e = Ft(Tl()(ut));
  return (
    (e.copy = function () {
      return xn(e, Vl());
    }),
    ur.apply(e, arguments)
  );
}
function Kh() {
  var e = xu(Tl()).domain([0.1, 1, 10]);
  return (
    (e.copy = function () {
      return xn(e, Kh()).base(e.base());
    }),
    ur.apply(e, arguments)
  );
}
function Zh() {
  var e = bu(Tl());
  return (
    (e.copy = function () {
      return xn(e, Zh()).constant(e.constant());
    }),
    ur.apply(e, arguments)
  );
}
function Nl() {
  var e = yu(Tl());
  return (
    (e.copy = function () {
      return xn(e, Nl()).exponent(e.exponent());
    }),
    ur.apply(e, arguments)
  );
}
function L2() {
  return Nl.apply(null, arguments).exponent(0.5);
}
var O2 = T(() => {
  Zt();
  Or();
  kt();
  mn();
  ol();
  Qh();
  ul();
  fl();
});
var B2 = {};
At(B2, {
  scaleBand: () => Ar,
  scaleDiverging: () => Vl,
  scaleDivergingLog: () => Kh,
  scaleDivergingPow: () => Nl,
  scaleDivergingSqrt: () => L2,
  scaleDivergingSymlog: () => Zh,
  scaleIdentity: () => nl,
  scaleImplicit: () => Gf,
  scaleLinear: () => Yr,
  scaleLog: () => al,
  scaleOrdinal: () => fr,
  scalePoint: () => rb,
  scalePow: () => wu,
  scaleQuantile: () => cl,
  scaleQuantize: () => sl,
  scaleRadial: () => ll,
  scaleSequential: () => Bo,
  scaleSequentialLog: () => Xh,
  scaleSequentialPow: () => kl,
  scaleSequentialQuantile: () => Cl,
  scaleSequentialSqrt: () => P2,
  scaleSequentialSymlog: () => jh,
  scaleSqrt: () => My,
  scaleSymlog: () => il,
  scaleThreshold: () => dl,
  scaleTime: () => ku,
  scaleUtc: () => Uh,
  tickFormat: () => gu,
});
var Jh = T(() => {
  nb();
  vy();
  mn();
  ol();
  ul();
  Nm();
  fl();
  ky();
  Cy();
  Ty();
  Vy();
  Gh();
  z2();
  Qh();
  R2();
  O2();
  lh();
});
var Ie,
  st = T(() => {
    Ie = Math.random;
  });
var F2,
  H2 = T(() => {
    st();
    F2 = (function e(t) {
      function r(n, a) {
        return (
          (n = n == null ? 0 : +n),
          (a = a == null ? 1 : +a),
          arguments.length === 1 ? ((a = n), (n = 0)) : (a -= n),
          function () {
            return t() * a + n;
          }
        );
      }
      return (r.source = e), r;
    })(Ie);
  });
var Y2,
  q2 = T(() => {
    st();
    Y2 = (function e(t) {
      function r(n, a) {
        return (
          arguments.length < 2 && ((a = n), (n = 0)),
          (n = Math.floor(n)),
          (a = Math.floor(a) - n),
          function () {
            return Math.floor(t() * a + n);
          }
        );
      }
      return (r.source = e), r;
    })(Ie);
  });
var Fo,
  Dl = T(() => {
    st();
    Fo = (function e(t) {
      function r(n, a) {
        var o, i;
        return (
          (n = n == null ? 0 : +n),
          (a = a == null ? 1 : +a),
          function () {
            var u;
            if (o != null) (u = o), (o = null);
            else
              do (o = t() * 2 - 1), (u = t() * 2 - 1), (i = o * o + u * u);
              while (!i || i > 1);
            return n + a * u * Math.sqrt((-2 * Math.log(i)) / i);
          }
        );
      }
      return (r.source = e), r;
    })(Ie);
  });
var W2,
  $2 = T(() => {
    st();
    Dl();
    W2 = (function e(t) {
      var r = Fo.source(t);
      function n() {
        var a = r.apply(this, arguments);
        return function () {
          return Math.exp(a());
        };
      }
      return (n.source = e), n;
    })(Ie);
  });
var El,
  ep = T(() => {
    st();
    El = (function e(t) {
      function r(n) {
        return (n = +n) <= 0
          ? () => 0
          : function () {
              for (var a = 0, o = n; o > 1; --o) a += t();
              return a + o * t();
            };
      }
      return (r.source = e), r;
    })(Ie);
  });
var G2,
  U2 = T(() => {
    st();
    ep();
    G2 = (function e(t) {
      var r = El.source(t);
      function n(a) {
        if ((a = +a) == 0) return t;
        var o = r(a);
        return function () {
          return o() / a;
        };
      }
      return (n.source = e), n;
    })(Ie);
  });
var X2,
  j2 = T(() => {
    st();
    X2 = (function e(t) {
      function r(n) {
        return function () {
          return -Math.log1p(-t()) / n;
        };
      }
      return (r.source = e), r;
    })(Ie);
  });
var Q2,
  K2 = T(() => {
    st();
    Q2 = (function e(t) {
      function r(n) {
        if ((n = +n) < 0) throw new RangeError("invalid alpha");
        return (
          (n = 1 / -n),
          function () {
            return Math.pow(1 - t(), n);
          }
        );
      }
      return (r.source = e), r;
    })(Ie);
  });
var Z2,
  J2 = T(() => {
    st();
    Z2 = (function e(t) {
      function r(n) {
        if ((n = +n) < 0 || n > 1) throw new RangeError("invalid p");
        return function () {
          return Math.floor(t() + n);
        };
      }
      return (r.source = e), r;
    })(Ie);
  });
var Il,
  tp = T(() => {
    st();
    Il = (function e(t) {
      function r(n) {
        if ((n = +n) < 0 || n > 1) throw new RangeError("invalid p");
        return n === 0
          ? () => 1 / 0
          : n === 1
          ? () => 1
          : ((n = Math.log1p(-n)),
            function () {
              return 1 + Math.floor(Math.log1p(-t()) / n);
            });
      }
      return (r.source = e), r;
    })(Ie);
  });
var Ho,
  zl = T(() => {
    st();
    Dl();
    Ho = (function e(t) {
      var r = Fo.source(t)();
      function n(a, o) {
        if ((a = +a) < 0) throw new RangeError("invalid k");
        if (a === 0) return () => 0;
        if (((o = o == null ? 1 : +o), a === 1))
          return () => -Math.log1p(-t()) * o;
        var i = (a < 1 ? a + 1 : a) - 1 / 3,
          u = 1 / (3 * Math.sqrt(i)),
          l = a < 1 ? () => Math.pow(t(), 1 / a) : () => 1;
        return function () {
          do {
            do
              var s = r(),
                h = 1 + u * s;
            while (h <= 0);
            h *= h * h;
            var y = 1 - t();
          } while (
            y >= 1 - 0.0331 * s * s * s * s &&
            Math.log(y) >= 0.5 * s * s + i * (1 - h + Math.log(h))
          );
          return i * h * l() * o;
        };
      }
      return (n.source = e), n;
    })(Ie);
  });
var Pl,
  rp = T(() => {
    st();
    zl();
    Pl = (function e(t) {
      var r = Ho.source(t);
      function n(a, o) {
        var i = r(a),
          u = r(o);
        return function () {
          var l = i();
          return l === 0 ? 0 : l / (l + u());
        };
      }
      return (n.source = e), n;
    })(Ie);
  });
var Rl,
  np = T(() => {
    st();
    rp();
    tp();
    Rl = (function e(t) {
      var r = Il.source(t),
        n = Pl.source(t);
      function a(o, i) {
        return (
          (o = +o),
          (i = +i) >= 1
            ? () => o
            : i <= 0
            ? () => 0
            : function () {
                for (
                  var u = 0, l = o, s = i;
                  l * s > 16 && l * (1 - s) > 16;

                ) {
                  var h = Math.floor((l + 1) * s),
                    y = n(h, l - h + 1)();
                  y <= s
                    ? ((u += h), (l -= h), (s = (s - y) / (1 - y)))
                    : ((l = h - 1), (s /= y));
                }
                for (
                  var x = s < 0.5, M = x ? s : 1 - s, A = r(M), N = A(), k = 0;
                  N <= l;
                  ++k
                )
                  N += A();
                return u + (x ? k : l - k);
              }
        );
      }
      return (a.source = e), a;
    })(Ie);
  });
var ew,
  tw = T(() => {
    st();
    ew = (function e(t) {
      function r(n, a, o) {
        var i;
        return (
          (n = +n) == 0
            ? (i = (u) => -Math.log(u))
            : ((n = 1 / n), (i = (u) => Math.pow(u, n))),
          (a = a == null ? 0 : +a),
          (o = o == null ? 1 : +o),
          function () {
            return a + o * i(-Math.log1p(-t()));
          }
        );
      }
      return (r.source = e), r;
    })(Ie);
  });
var rw,
  nw = T(() => {
    st();
    rw = (function e(t) {
      function r(n, a) {
        return (
          (n = n == null ? 0 : +n),
          (a = a == null ? 1 : +a),
          function () {
            return n + a * Math.tan(Math.PI * t());
          }
        );
      }
      return (r.source = e), r;
    })(Ie);
  });
var aw,
  ow = T(() => {
    st();
    aw = (function e(t) {
      function r(n, a) {
        return (
          (n = n == null ? 0 : +n),
          (a = a == null ? 1 : +a),
          function () {
            var o = t();
            return n + a * Math.log(o / (1 - o));
          }
        );
      }
      return (r.source = e), r;
    })(Ie);
  });
var iw,
  uw = T(() => {
    st();
    np();
    zl();
    iw = (function e(t) {
      var r = Ho.source(t),
        n = Rl.source(t);
      function a(o) {
        return function () {
          for (var i = 0, u = o; u > 16; ) {
            var l = Math.floor(0.875 * u),
              s = r(l)();
            if (s > u) return i + n(l - 1, u / s)();
            (i += l), (u -= s);
          }
          for (var h = -Math.log1p(-t()), y = 0; h <= u; ++y)
            h -= Math.log1p(-t());
          return i + y;
        };
      }
      return (a.source = e), a;
    })(Ie);
  });
function ap(e = Math.random()) {
  let t = (0 <= e && e < 1 ? e / fw : Math.abs(e)) | 0;
  return () => ((t = (1664525 * t + 1013904223) | 0), fw * (t >>> 0));
}
var fw,
  lw = T(() => {
    fw = 23283064365386963e-26;
  });
var cw = {};
At(cw, {
  randomBates: () => G2,
  randomBernoulli: () => Z2,
  randomBeta: () => Pl,
  randomBinomial: () => Rl,
  randomCauchy: () => rw,
  randomExponential: () => X2,
  randomGamma: () => Ho,
  randomGeometric: () => Il,
  randomInt: () => Y2,
  randomIrwinHall: () => El,
  randomLcg: () => ap,
  randomLogNormal: () => W2,
  randomLogistic: () => aw,
  randomNormal: () => Fo,
  randomPareto: () => Q2,
  randomPoisson: () => iw,
  randomUniform: () => F2,
  randomWeibull: () => ew,
});
var op = T(() => {
  H2();
  q2();
  Dl();
  $2();
  U2();
  ep();
  j2();
  K2();
  J2();
  tp();
  np();
  zl();
  rp();
  tw();
  nw();
  ow();
  uw();
  lw();
});
function RV(e) {
  if (!e.ok) throw new Error(e.status + " " + e.statusText);
  return e.blob();
}
function sw(e, t) {
  return fetch(e, t).then(RV);
}
var dw = T(() => {});
function LV(e) {
  if (!e.ok) throw new Error(e.status + " " + e.statusText);
  return e.arrayBuffer();
}
function mw(e, t) {
  return fetch(e, t).then(LV);
}
var hw = T(() => {});
function vw(e) {
  return new Function(
    "d",
    "return {" +
      e
        .map(function (t, r) {
          return JSON.stringify(t) + ": d[" + r + '] || ""';
        })
        .join(",") +
      "}",
  );
}
function OV(e, t) {
  var r = vw(e);
  return function (n, a) {
    return t(r(n), a, e);
  };
}
function gw(e) {
  var t = Object.create(null),
    r = [];
  return (
    e.forEach(function (n) {
      for (var a in n) a in t || r.push((t[a] = a));
    }),
    r
  );
}
function Ut(e, t) {
  var r = e + "",
    n = r.length;
  return n < t ? new Array(t - n + 1).join(0) + r : r;
}
function BV(e) {
  return e < 0 ? "-" + Ut(-e, 6) : e > 9999 ? "+" + Ut(e, 6) : Ut(e, 4);
}
function FV(e) {
  var t = e.getUTCHours(),
    r = e.getUTCMinutes(),
    n = e.getUTCSeconds(),
    a = e.getUTCMilliseconds();
  return isNaN(e)
    ? "Invalid Date"
    : BV(e.getUTCFullYear(), 4) +
        "-" +
        Ut(e.getUTCMonth() + 1, 2) +
        "-" +
        Ut(e.getUTCDate(), 2) +
        (a
          ? "T" +
            Ut(t, 2) +
            ":" +
            Ut(r, 2) +
            ":" +
            Ut(n, 2) +
            "." +
            Ut(a, 3) +
            "Z"
          : n
          ? "T" + Ut(t, 2) + ":" + Ut(r, 2) + ":" + Ut(n, 2) + "Z"
          : r || t
          ? "T" + Ut(t, 2) + ":" + Ut(r, 2) + "Z"
          : "");
}
function Oa(e) {
  var t = new RegExp(
      '["' +
        e +
        `
\r]`,
    ),
    r = e.charCodeAt(0);
  function n(y, x) {
    var M,
      A,
      N = a(y, function (k, D) {
        if (M) return M(k, D - 1);
        (A = k), (M = x ? OV(k, x) : vw(k));
      });
    return (N.columns = A || []), N;
  }
  function a(y, x) {
    var M = [],
      A = y.length,
      N = 0,
      k = 0,
      D,
      B = A <= 0,
      F = !1;
    y.charCodeAt(A - 1) === Cu && --A, y.charCodeAt(A - 1) === fp && --A;
    function R() {
      if (B) return ip;
      if (F) return (F = !1), pw;
      var L,
        $ = N,
        G;
      if (y.charCodeAt($) === up) {
        for (
          ;
          (N++ < A && y.charCodeAt(N) !== up) || y.charCodeAt(++N) === up;

        );
        return (
          (L = N) >= A
            ? (B = !0)
            : (G = y.charCodeAt(N++)) === Cu
            ? (F = !0)
            : G === fp && ((F = !0), y.charCodeAt(N) === Cu && ++N),
          y.slice($ + 1, L - 1).replace(/""/g, '"')
        );
      }
      for (; N < A; ) {
        if ((G = y.charCodeAt((L = N++))) === Cu) F = !0;
        else if (G === fp) (F = !0), y.charCodeAt(N) === Cu && ++N;
        else if (G !== r) continue;
        return y.slice($, L);
      }
      return (B = !0), y.slice($, A);
    }
    for (; (D = R()) !== ip; ) {
      for (var I = []; D !== pw && D !== ip; ) I.push(D), (D = R());
      (x && (I = x(I, k++)) == null) || M.push(I);
    }
    return M;
  }
  function o(y, x) {
    return y.map(function (M) {
      return x
        .map(function (A) {
          return h(M[A]);
        })
        .join(e);
    });
  }
  function i(y, x) {
    return (
      x == null && (x = gw(y)),
      [x.map(h).join(e)].concat(o(y, x)).join(`
`)
    );
  }
  function u(y, x) {
    return (
      x == null && (x = gw(y)),
      o(y, x).join(`
`)
    );
  }
  function l(y) {
    return y.map(s).join(`
`);
  }
  function s(y) {
    return y.map(h).join(e);
  }
  function h(y) {
    return y == null
      ? ""
      : y instanceof Date
      ? FV(y)
      : t.test((y += ""))
      ? '"' + y.replace(/"/g, '""') + '"'
      : y;
  }
  return {
    parse: n,
    parseRows: a,
    format: i,
    formatBody: u,
    formatRows: l,
    formatRow: s,
    formatValue: h,
  };
}
var pw,
  ip,
  up,
  Cu,
  fp,
  Ll = T(() => {
    (pw = {}), (ip = {}), (up = 34), (Cu = 10), (fp = 13);
  });
var Ba,
  lp,
  HV,
  YV,
  qV,
  WV,
  $V,
  GV,
  xw = T(() => {
    Ll();
    (Ba = Oa(",")),
      (lp = Ba.parse),
      (HV = Ba.parseRows),
      (YV = Ba.format),
      (qV = Ba.formatBody),
      (WV = Ba.formatRows),
      ($V = Ba.formatRow),
      (GV = Ba.formatValue);
  });
var Fa,
  cp,
  UV,
  XV,
  jV,
  QV,
  KV,
  ZV,
  bw = T(() => {
    Ll();
    (Fa = Oa("	")),
      (cp = Fa.parse),
      (UV = Fa.parseRows),
      (XV = Fa.format),
      (jV = Fa.formatBody),
      (QV = Fa.formatRows),
      (KV = Fa.formatRow),
      (ZV = Fa.formatValue);
  });
var sp = T(() => {
  Ll();
  xw();
  bw();
});
function JV(e) {
  if (!e.ok) throw new Error(e.status + " " + e.statusText);
  return e.text();
}
function Ha(e, t) {
  return fetch(e, t).then(JV);
}
var Ol = T(() => {});
function yw(e) {
  return function (t, r, n) {
    return (
      arguments.length === 2 &&
        typeof r == "function" &&
        ((n = r), (r = void 0)),
      Ha(t, r).then(function (a) {
        return e(a, n);
      })
    );
  };
}
function dp(e, t, r, n) {
  arguments.length === 3 && typeof r == "function" && ((n = r), (r = void 0));
  var a = Oa(e);
  return Ha(t, r).then(function (o) {
    return a.parse(o, n);
  });
}
var ww,
  _w,
  Sw = T(() => {
    sp();
    Ol();
    (ww = yw(lp)), (_w = yw(cp));
  });
function Mw(e, t) {
  return new Promise(function (r, n) {
    var a = new Image();
    for (var o in t) a[o] = t[o];
    (a.onerror = n),
      (a.onload = function () {
        r(a);
      }),
      (a.src = e);
  });
}
var Aw = T(() => {});
function eN(e) {
  if (!e.ok) throw new Error(e.status + " " + e.statusText);
  if (!(e.status === 204 || e.status === 205)) return e.json();
}
function kw(e, t) {
  return fetch(e, t).then(eN);
}
var Cw = T(() => {});
function mp(e) {
  return (t, r) => Ha(t, r).then((n) => new DOMParser().parseFromString(n, e));
}
var Tw,
  Vw,
  Nw,
  Dw = T(() => {
    Ol();
    (Tw = mp("application/xml")),
      (Vw = mp("text/html")),
      (Nw = mp("image/svg+xml"));
  });
var Ew = {};
At(Ew, {
  blob: () => sw,
  buffer: () => mw,
  csv: () => ww,
  dsv: () => dp,
  html: () => Vw,
  image: () => Mw,
  json: () => kw,
  svg: () => Nw,
  text: () => Ha,
  tsv: () => _w,
  xml: () => Tw,
});
var hp = T(() => {
  dw();
  hw();
  Sw();
  Aw();
  Cw();
  Ol();
  Dw();
});
function vp() {
  (this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = "");
}
function Iw() {
  return new vp();
}
var pp,
  gp,
  Ya,
  tN,
  dr,
  zw = T(() => {
    (pp = Math.PI), (gp = 2 * pp), (Ya = 1e-6), (tN = gp - Ya);
    vp.prototype = Iw.prototype = {
      constructor: vp,
      moveTo: function (e, t) {
        this._ +=
          "M" + (this._x0 = this._x1 = +e) + "," + (this._y0 = this._y1 = +t);
      },
      closePath: function () {
        this._x1 !== null &&
          ((this._x1 = this._x0), (this._y1 = this._y0), (this._ += "Z"));
      },
      lineTo: function (e, t) {
        this._ += "L" + (this._x1 = +e) + "," + (this._y1 = +t);
      },
      quadraticCurveTo: function (e, t, r, n) {
        this._ +=
          "Q" + +e + "," + +t + "," + (this._x1 = +r) + "," + (this._y1 = +n);
      },
      bezierCurveTo: function (e, t, r, n, a, o) {
        this._ +=
          "C" +
          +e +
          "," +
          +t +
          "," +
          +r +
          "," +
          +n +
          "," +
          (this._x1 = +a) +
          "," +
          (this._y1 = +o);
      },
      arcTo: function (e, t, r, n, a) {
        (e = +e), (t = +t), (r = +r), (n = +n), (a = +a);
        var o = this._x1,
          i = this._y1,
          u = r - e,
          l = n - t,
          s = o - e,
          h = i - t,
          y = s * s + h * h;
        if (a < 0) throw new Error("negative radius: " + a);
        if (this._x1 === null)
          this._ += "M" + (this._x1 = e) + "," + (this._y1 = t);
        else if (y > Ya)
          if (!(Math.abs(h * u - l * s) > Ya) || !a)
            this._ += "L" + (this._x1 = e) + "," + (this._y1 = t);
          else {
            var x = r - o,
              M = n - i,
              A = u * u + l * l,
              N = x * x + M * M,
              k = Math.sqrt(A),
              D = Math.sqrt(y),
              B = a * Math.tan((pp - Math.acos((A + y - N) / (2 * k * D))) / 2),
              F = B / D,
              R = B / k;
            Math.abs(F - 1) > Ya &&
              (this._ += "L" + (e + F * s) + "," + (t + F * h)),
              (this._ +=
                "A" +
                a +
                "," +
                a +
                ",0,0," +
                +(h * x > s * M) +
                "," +
                (this._x1 = e + R * u) +
                "," +
                (this._y1 = t + R * l));
          }
      },
      arc: function (e, t, r, n, a, o) {
        (e = +e), (t = +t), (r = +r), (o = !!o);
        var i = r * Math.cos(n),
          u = r * Math.sin(n),
          l = e + i,
          s = t + u,
          h = 1 ^ o,
          y = o ? n - a : a - n;
        if (r < 0) throw new Error("negative radius: " + r);
        this._x1 === null
          ? (this._ += "M" + l + "," + s)
          : (Math.abs(this._x1 - l) > Ya || Math.abs(this._y1 - s) > Ya) &&
            (this._ += "L" + l + "," + s),
          r &&
            (y < 0 && (y = (y % gp) + gp),
            y > tN
              ? (this._ +=
                  "A" +
                  r +
                  "," +
                  r +
                  ",0,1," +
                  h +
                  "," +
                  (e - i) +
                  "," +
                  (t - u) +
                  "A" +
                  r +
                  "," +
                  r +
                  ",0,1," +
                  h +
                  "," +
                  (this._x1 = l) +
                  "," +
                  (this._y1 = s))
              : y > Ya &&
                (this._ +=
                  "A" +
                  r +
                  "," +
                  r +
                  ",0," +
                  +(y >= pp) +
                  "," +
                  h +
                  "," +
                  (this._x1 = e + r * Math.cos(a)) +
                  "," +
                  (this._y1 = t + r * Math.sin(a))));
      },
      rect: function (e, t, r, n) {
        this._ +=
          "M" +
          (this._x0 = this._x1 = +e) +
          "," +
          (this._y0 = this._y1 = +t) +
          "h" +
          +r +
          "v" +
          +n +
          "h" +
          -r +
          "Z";
      },
      toString: function () {
        return this._;
      },
    };
    dr = Iw;
  });
var Pw = {};
At(Pw, { path: () => dr });
var Bn = T(() => {
  zw();
});
var Bl,
  Tu,
  Fl = T(() => {
    (Bl = "http://www.w3.org/1999/xhtml"),
      (Tu = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: Bl,
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/",
      });
  });
function Gr(e) {
  var t = (e += ""),
    r = t.indexOf(":");
  return (
    r >= 0 && (t = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)),
    Tu.hasOwnProperty(t) ? { space: Tu[t], local: e } : e
  );
}
var Hl = T(() => {
  Fl();
});
function rN(e) {
  return function () {
    var t = this.ownerDocument,
      r = this.namespaceURI;
    return r === Bl && t.documentElement.namespaceURI === Bl
      ? t.createElement(e)
      : t.createElementNS(r, e);
  };
}
function nN(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Fn(e) {
  var t = Gr(e);
  return (t.local ? nN : rN)(t);
}
var Vu = T(() => {
  Hl();
  Fl();
});
function aN() {}
function Hn(e) {
  return e == null
    ? aN
    : function () {
        return this.querySelector(e);
      };
}
var Yl = T(() => {});
function Rw(e) {
  typeof e != "function" && (e = Hn(e));
  for (var t = this._groups, r = t.length, n = new Array(r), a = 0; a < r; ++a)
    for (
      var o = t[a], i = o.length, u = (n[a] = new Array(i)), l, s, h = 0;
      h < i;
      ++h
    )
      (l = o[h]) &&
        (s = e.call(l, l.__data__, h, o)) &&
        ("__data__" in l && (s.__data__ = l.__data__), (u[h] = s));
  return new je(n, this._parents);
}
var Lw = T(() => {
  mr();
  Yl();
});
function Nu(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
var xp = T(() => {});
function oN() {
  return [];
}
function Yo(e) {
  return e == null
    ? oN
    : function () {
        return this.querySelectorAll(e);
      };
}
var bp = T(() => {});
function iN(e) {
  return function () {
    return Nu(e.apply(this, arguments));
  };
}
function Ow(e) {
  typeof e == "function" ? (e = iN(e)) : (e = Yo(e));
  for (var t = this._groups, r = t.length, n = [], a = [], o = 0; o < r; ++o)
    for (var i = t[o], u = i.length, l, s = 0; s < u; ++s)
      (l = i[s]) && (n.push(e.call(l, l.__data__, s, i)), a.push(l));
  return new je(n, a);
}
var Bw = T(() => {
  mr();
  xp();
  bp();
});
function qo(e) {
  return function () {
    return this.matches(e);
  };
}
function ql(e) {
  return function (t) {
    return t.matches(e);
  };
}
var Du = T(() => {});
function fN(e) {
  return function () {
    return uN.call(this.children, e);
  };
}
function lN() {
  return this.firstElementChild;
}
function Fw(e) {
  return this.select(e == null ? lN : fN(typeof e == "function" ? e : ql(e)));
}
var uN,
  Hw = T(() => {
    Du();
    uN = Array.prototype.find;
  });
function sN() {
  return Array.from(this.children);
}
function dN(e) {
  return function () {
    return cN.call(this.children, e);
  };
}
function Yw(e) {
  return this.selectAll(
    e == null ? sN : dN(typeof e == "function" ? e : ql(e)),
  );
}
var cN,
  qw = T(() => {
    Du();
    cN = Array.prototype.filter;
  });
function Ww(e) {
  typeof e != "function" && (e = qo(e));
  for (var t = this._groups, r = t.length, n = new Array(r), a = 0; a < r; ++a)
    for (var o = t[a], i = o.length, u = (n[a] = []), l, s = 0; s < i; ++s)
      (l = o[s]) && e.call(l, l.__data__, s, o) && u.push(l);
  return new je(n, this._parents);
}
var $w = T(() => {
  mr();
  Du();
});
function Wl(e) {
  return new Array(e.length);
}
var yp = T(() => {});
function Gw() {
  return new je(this._enter || this._groups.map(Wl), this._parents);
}
function Eu(e, t) {
  (this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = t);
}
var wp = T(() => {
  yp();
  mr();
  Eu.prototype = {
    constructor: Eu,
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
});
function Uw(e) {
  return function () {
    return e;
  };
}
var Xw = T(() => {});
function mN(e, t, r, n, a, o) {
  for (var i = 0, u, l = t.length, s = o.length; i < s; ++i)
    (u = t[i]) ? ((u.__data__ = o[i]), (n[i] = u)) : (r[i] = new Eu(e, o[i]));
  for (; i < l; ++i) (u = t[i]) && (a[i] = u);
}
function hN(e, t, r, n, a, o, i) {
  var u,
    l,
    s = new Map(),
    h = t.length,
    y = o.length,
    x = new Array(h),
    M;
  for (u = 0; u < h; ++u)
    (l = t[u]) &&
      ((x[u] = M = i.call(l, l.__data__, u, t) + ""),
      s.has(M) ? (a[u] = l) : s.set(M, l));
  for (u = 0; u < y; ++u)
    (M = i.call(e, o[u], u, o) + ""),
      (l = s.get(M))
        ? ((n[u] = l), (l.__data__ = o[u]), s.delete(M))
        : (r[u] = new Eu(e, o[u]));
  for (u = 0; u < h; ++u) (l = t[u]) && s.get(x[u]) === l && (a[u] = l);
}
function pN(e) {
  return e.__data__;
}
function jw(e, t) {
  if (!arguments.length) return Array.from(this, pN);
  var r = t ? hN : mN,
    n = this._parents,
    a = this._groups;
  typeof e != "function" && (e = Uw(e));
  for (
    var o = a.length,
      i = new Array(o),
      u = new Array(o),
      l = new Array(o),
      s = 0;
    s < o;
    ++s
  ) {
    var h = n[s],
      y = a[s],
      x = y.length,
      M = gN(e.call(h, h && h.__data__, s, n)),
      A = M.length,
      N = (u[s] = new Array(A)),
      k = (i[s] = new Array(A)),
      D = (l[s] = new Array(x));
    r(h, y, N, k, D, M, t);
    for (var B = 0, F = 0, R, I; B < A; ++B)
      if ((R = N[B])) {
        for (B >= F && (F = B + 1); !(I = k[F]) && ++F < A; );
        R._next = I || null;
      }
  }
  return (i = new je(i, n)), (i._enter = u), (i._exit = l), i;
}
function gN(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
var Qw = T(() => {
  mr();
  wp();
  Xw();
});
function Kw() {
  return new je(this._exit || this._groups.map(Wl), this._parents);
}
var Zw = T(() => {
  yp();
  mr();
});
function Jw(e, t, r) {
  var n = this.enter(),
    a = this,
    o = this.exit();
  return (
    typeof e == "function"
      ? ((n = e(n)), n && (n = n.selection()))
      : (n = n.append(e + "")),
    t != null && ((a = t(a)), a && (a = a.selection())),
    r == null ? o.remove() : r(o),
    n && a ? n.merge(a).order() : a
  );
}
var e_ = T(() => {});
function t_(e) {
  for (
    var t = e.selection ? e.selection() : e,
      r = this._groups,
      n = t._groups,
      a = r.length,
      o = n.length,
      i = Math.min(a, o),
      u = new Array(a),
      l = 0;
    l < i;
    ++l
  )
    for (
      var s = r[l], h = n[l], y = s.length, x = (u[l] = new Array(y)), M, A = 0;
      A < y;
      ++A
    )
      (M = s[A] || h[A]) && (x[A] = M);
  for (; l < a; ++l) u[l] = r[l];
  return new je(u, this._parents);
}
var r_ = T(() => {
  mr();
});
function n_() {
  for (var e = this._groups, t = -1, r = e.length; ++t < r; )
    for (var n = e[t], a = n.length - 1, o = n[a], i; --a >= 0; )
      (i = n[a]) &&
        (o &&
          i.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(i, o),
        (o = i));
  return this;
}
var a_ = T(() => {});
function o_(e) {
  e || (e = vN);
  function t(y, x) {
    return y && x ? e(y.__data__, x.__data__) : !y - !x;
  }
  for (
    var r = this._groups, n = r.length, a = new Array(n), o = 0;
    o < n;
    ++o
  ) {
    for (
      var i = r[o], u = i.length, l = (a[o] = new Array(u)), s, h = 0;
      h < u;
      ++h
    )
      (s = i[h]) && (l[h] = s);
    l.sort(t);
  }
  return new je(a, this._parents).order();
}
function vN(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
var i_ = T(() => {
  mr();
});
function u_() {
  var e = arguments[0];
  return (arguments[0] = this), e.apply(null, arguments), this;
}
var f_ = T(() => {});
function l_() {
  return Array.from(this);
}
var c_ = T(() => {});
function s_() {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var n = e[t], a = 0, o = n.length; a < o; ++a) {
      var i = n[a];
      if (i) return i;
    }
  return null;
}
var d_ = T(() => {});
function m_() {
  let e = 0;
  for (let t of this) ++e;
  return e;
}
var h_ = T(() => {});
function p_() {
  return !this.node();
}
var g_ = T(() => {});
function v_(e) {
  for (var t = this._groups, r = 0, n = t.length; r < n; ++r)
    for (var a = t[r], o = 0, i = a.length, u; o < i; ++o)
      (u = a[o]) && e.call(u, u.__data__, o, a);
  return this;
}
var x_ = T(() => {});
function xN(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function bN(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function yN(e, t) {
  return function () {
    this.setAttribute(e, t);
  };
}
function wN(e, t) {
  return function () {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function _N(e, t) {
  return function () {
    var r = t.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function SN(e, t) {
  return function () {
    var r = t.apply(this, arguments);
    r == null
      ? this.removeAttributeNS(e.space, e.local)
      : this.setAttributeNS(e.space, e.local, r);
  };
}
function b_(e, t) {
  var r = Gr(e);
  if (arguments.length < 2) {
    var n = this.node();
    return r.local ? n.getAttributeNS(r.space, r.local) : n.getAttribute(r);
  }
  return this.each(
    (t == null
      ? r.local
        ? bN
        : xN
      : typeof t == "function"
      ? r.local
        ? SN
        : _N
      : r.local
      ? wN
      : yN)(r, t),
  );
}
var y_ = T(() => {
  Hl();
});
function Wo(e) {
  return (
    (e.ownerDocument && e.ownerDocument.defaultView) ||
    (e.document && e) ||
    e.defaultView
  );
}
var $l = T(() => {});
function MN(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function AN(e, t, r) {
  return function () {
    this.style.setProperty(e, t, r);
  };
}
function kN(e, t, r) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, r);
  };
}
function w_(e, t, r) {
  return arguments.length > 1
    ? this.each(
        (t == null ? MN : typeof t == "function" ? kN : AN)(e, t, r ?? ""),
      )
    : bn(this.node(), e);
}
function bn(e, t) {
  return (
    e.style.getPropertyValue(t) ||
    Wo(e).getComputedStyle(e, null).getPropertyValue(t)
  );
}
var _p = T(() => {
  $l();
});
function CN(e) {
  return function () {
    delete this[e];
  };
}
function TN(e, t) {
  return function () {
    this[e] = t;
  };
}
function VN(e, t) {
  return function () {
    var r = t.apply(this, arguments);
    r == null ? delete this[e] : (this[e] = r);
  };
}
function __(e, t) {
  return arguments.length > 1
    ? this.each((t == null ? CN : typeof t == "function" ? VN : TN)(e, t))
    : this.node()[e];
}
var S_ = T(() => {});
function M_(e) {
  return e.trim().split(/^|\s+/);
}
function Sp(e) {
  return e.classList || new A_(e);
}
function A_(e) {
  (this._node = e), (this._names = M_(e.getAttribute("class") || ""));
}
function k_(e, t) {
  for (var r = Sp(e), n = -1, a = t.length; ++n < a; ) r.add(t[n]);
}
function C_(e, t) {
  for (var r = Sp(e), n = -1, a = t.length; ++n < a; ) r.remove(t[n]);
}
function NN(e) {
  return function () {
    k_(this, e);
  };
}
function DN(e) {
  return function () {
    C_(this, e);
  };
}
function EN(e, t) {
  return function () {
    (t.apply(this, arguments) ? k_ : C_)(this, e);
  };
}
function T_(e, t) {
  var r = M_(e + "");
  if (arguments.length < 2) {
    for (var n = Sp(this.node()), a = -1, o = r.length; ++a < o; )
      if (!n.contains(r[a])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? EN : t ? NN : DN)(r, t));
}
var V_ = T(() => {
  A_.prototype = {
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
});
function IN() {
  this.textContent = "";
}
function zN(e) {
  return function () {
    this.textContent = e;
  };
}
function PN(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function N_(e) {
  return arguments.length
    ? this.each(e == null ? IN : (typeof e == "function" ? PN : zN)(e))
    : this.node().textContent;
}
var D_ = T(() => {});
function RN() {
  this.innerHTML = "";
}
function LN(e) {
  return function () {
    this.innerHTML = e;
  };
}
function ON(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function E_(e) {
  return arguments.length
    ? this.each(e == null ? RN : (typeof e == "function" ? ON : LN)(e))
    : this.node().innerHTML;
}
var I_ = T(() => {});
function BN() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function z_() {
  return this.each(BN);
}
var P_ = T(() => {});
function FN() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function R_() {
  return this.each(FN);
}
var L_ = T(() => {});
function O_(e) {
  var t = typeof e == "function" ? e : Fn(e);
  return this.select(function () {
    return this.appendChild(t.apply(this, arguments));
  });
}
var B_ = T(() => {
  Vu();
});
function HN() {
  return null;
}
function F_(e, t) {
  var r = typeof e == "function" ? e : Fn(e),
    n = t == null ? HN : typeof t == "function" ? t : Hn(t);
  return this.select(function () {
    return this.insertBefore(
      r.apply(this, arguments),
      n.apply(this, arguments) || null,
    );
  });
}
var H_ = T(() => {
  Vu();
  Yl();
});
function YN() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Y_() {
  return this.each(YN);
}
var q_ = T(() => {});
function qN() {
  var e = this.cloneNode(!1),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function WN() {
  var e = this.cloneNode(!0),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function W_(e) {
  return this.select(e ? WN : qN);
}
var $_ = T(() => {});
function G_(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
var U_ = T(() => {});
function $N(e) {
  return function (t) {
    e.call(this, t, this.__data__);
  };
}
function GN(e) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var r = "",
        n = t.indexOf(".");
      return (
        n >= 0 && ((r = t.slice(n + 1)), (t = t.slice(0, n))),
        { type: t, name: r }
      );
    });
}
function UN(e) {
  return function () {
    var t = this.__on;
    if (!!t) {
      for (var r = 0, n = -1, a = t.length, o; r < a; ++r)
        (o = t[r]),
          (!e.type || o.type === e.type) && o.name === e.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (t[++n] = o);
      ++n ? (t.length = n) : delete this.__on;
    }
  };
}
function XN(e, t, r) {
  return function () {
    var n = this.__on,
      a,
      o = $N(t);
    if (n) {
      for (var i = 0, u = n.length; i < u; ++i)
        if ((a = n[i]).type === e.type && a.name === e.name) {
          this.removeEventListener(a.type, a.listener, a.options),
            this.addEventListener(a.type, (a.listener = o), (a.options = r)),
            (a.value = t);
          return;
        }
    }
    this.addEventListener(e.type, o, r),
      (a = { type: e.type, name: e.name, value: t, listener: o, options: r }),
      n ? n.push(a) : (this.__on = [a]);
  };
}
function X_(e, t, r) {
  var n = GN(e + ""),
    a,
    o = n.length,
    i;
  if (arguments.length < 2) {
    var u = this.node().__on;
    if (u) {
      for (var l = 0, s = u.length, h; l < s; ++l)
        for (a = 0, h = u[l]; a < o; ++a)
          if ((i = n[a]).type === h.type && i.name === h.name) return h.value;
    }
    return;
  }
  for (u = t ? XN : UN, a = 0; a < o; ++a) this.each(u(n[a], t, r));
  return this;
}
var j_ = T(() => {});
function Q_(e, t, r) {
  var n = Wo(e),
    a = n.CustomEvent;
  typeof a == "function"
    ? (a = new a(t, r))
    : ((a = n.document.createEvent("Event")),
      r
        ? (a.initEvent(t, r.bubbles, r.cancelable), (a.detail = r.detail))
        : a.initEvent(t, !1, !1)),
    e.dispatchEvent(a);
}
function jN(e, t) {
  return function () {
    return Q_(this, e, t);
  };
}
function QN(e, t) {
  return function () {
    return Q_(this, e, t.apply(this, arguments));
  };
}
function K_(e, t) {
  return this.each((typeof t == "function" ? QN : jN)(e, t));
}
var Z_ = T(() => {
  $l();
});
function* J_() {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var n = e[t], a = 0, o = n.length, i; a < o; ++a)
      (i = n[a]) && (yield i);
}
var e3 = T(() => {});
function je(e, t) {
  (this._groups = e), (this._parents = t);
}
function t3() {
  return new je([[document.documentElement]], Iu);
}
function KN() {
  return this;
}
var Iu,
  Ur,
  mr = T(() => {
    Lw();
    Bw();
    Hw();
    qw();
    $w();
    Qw();
    wp();
    Zw();
    e_();
    r_();
    a_();
    i_();
    f_();
    c_();
    d_();
    h_();
    g_();
    x_();
    y_();
    _p();
    S_();
    V_();
    D_();
    I_();
    P_();
    L_();
    B_();
    H_();
    q_();
    $_();
    U_();
    j_();
    Z_();
    e3();
    Iu = [null];
    je.prototype = t3.prototype = {
      constructor: je,
      select: Rw,
      selectAll: Ow,
      selectChild: Fw,
      selectChildren: Yw,
      filter: Ww,
      data: jw,
      enter: Gw,
      exit: Kw,
      join: Jw,
      merge: t_,
      selection: KN,
      order: n_,
      sort: o_,
      call: u_,
      nodes: l_,
      node: s_,
      size: m_,
      empty: p_,
      each: v_,
      attr: b_,
      style: w_,
      property: __,
      classed: T_,
      text: N_,
      html: E_,
      raise: z_,
      lower: R_,
      append: O_,
      insert: F_,
      remove: Y_,
      clone: W_,
      datum: G_,
      on: X_,
      dispatch: K_,
      [Symbol.iterator]: J_,
    };
    Ur = t3;
  });
function fe(e) {
  return typeof e == "string"
    ? new je([[document.querySelector(e)]], [document.documentElement])
    : new je([[e]], Iu);
}
var Mp = T(() => {
  mr();
});
function r3(e) {
  return fe(Fn(e).call(document.documentElement));
}
var n3 = T(() => {
  Vu();
  Mp();
});
function Gl() {
  return new Ap();
}
function Ap() {
  this._ = "@" + (++ZN).toString(36);
}
var ZN,
  a3 = T(() => {
    ZN = 0;
    Ap.prototype = Gl.prototype = {
      constructor: Ap,
      get: function (e) {
        for (var t = this._; !(t in e); ) if (!(e = e.parentNode)) return;
        return e[t];
      },
      set: function (e, t) {
        return (e[this._] = t);
      },
      remove: function (e) {
        return this._ in e && delete e[this._];
      },
      toString: function () {
        return this._;
      },
    };
  });
function Ul(e) {
  let t;
  for (; (t = e.sourceEvent); ) e = t;
  return e;
}
var kp = T(() => {});
function dt(e, t) {
  if (((e = Ul(e)), t === void 0 && (t = e.currentTarget), t)) {
    var r = t.ownerSVGElement || t;
    if (r.createSVGPoint) {
      var n = r.createSVGPoint();
      return (
        (n.x = e.clientX),
        (n.y = e.clientY),
        (n = n.matrixTransform(t.getScreenCTM().inverse())),
        [n.x, n.y]
      );
    }
    if (t.getBoundingClientRect) {
      var a = t.getBoundingClientRect();
      return [
        e.clientX - a.left - t.clientLeft,
        e.clientY - a.top - t.clientTop,
      ];
    }
  }
  return [e.pageX, e.pageY];
}
var Cp = T(() => {
  kp();
});
function o3(e, t) {
  return (
    e.target &&
      ((e = Ul(e)),
      t === void 0 && (t = e.currentTarget),
      (e = e.touches || [e])),
    Array.from(e, (r) => dt(r, t))
  );
}
var i3 = T(() => {
  Cp();
  kp();
});
function Xl(e) {
  return typeof e == "string"
    ? new je([document.querySelectorAll(e)], [document.documentElement])
    : new je([Nu(e)], Iu);
}
var u3 = T(() => {
  xp();
  mr();
});
var f3 = {};
At(f3, {
  create: () => r3,
  creator: () => Fn,
  local: () => Gl,
  matcher: () => qo,
  namespace: () => Gr,
  namespaces: () => Tu,
  pointer: () => dt,
  pointers: () => o3,
  select: () => fe,
  selectAll: () => Xl,
  selection: () => Ur,
  selector: () => Hn,
  selectorAll: () => Yo,
  style: () => bn,
  window: () => Wo,
});
var Nt = T(() => {
  n3();
  Vu();
  a3();
  Du();
  Hl();
  Fl();
  Cp();
  i3();
  Mp();
  u3();
  mr();
  Yl();
  bp();
  _p();
  $l();
});
function we(e) {
  return function () {
    return e;
  };
}
var Yn = T(() => {});
function c3(e) {
  return e > 1 ? 0 : e < -1 ? Cr : Math.acos(e);
}
function Vp(e) {
  return e >= 1 ? zu : e <= -1 ? -zu : Math.asin(e);
}
var Tp,
  _t,
  qn,
  l3,
  jl,
  kr,
  qa,
  mt,
  Cr,
  zu,
  hr,
  $o = T(() => {
    (Tp = Math.abs),
      (_t = Math.atan2),
      (qn = Math.cos),
      (l3 = Math.max),
      (jl = Math.min),
      (kr = Math.sin),
      (qa = Math.sqrt),
      (mt = 1e-12),
      (Cr = Math.PI),
      (zu = Cr / 2),
      (hr = 2 * Cr);
  });
function JN(e) {
  return e.innerRadius;
}
function eD(e) {
  return e.outerRadius;
}
function tD(e) {
  return e.startAngle;
}
function rD(e) {
  return e.endAngle;
}
function nD(e) {
  return e && e.padAngle;
}
function aD(e, t, r, n, a, o, i, u) {
  var l = r - e,
    s = n - t,
    h = i - a,
    y = u - o,
    x = y * l - h * s;
  if (!(x * x < mt))
    return (x = (h * (t - o) - y * (e - a)) / x), [e + x * l, t + x * s];
}
function Ql(e, t, r, n, a, o, i) {
  var u = e - r,
    l = t - n,
    s = (i ? o : -o) / qa(u * u + l * l),
    h = s * l,
    y = -s * u,
    x = e + h,
    M = t + y,
    A = r + h,
    N = n + y,
    k = (x + A) / 2,
    D = (M + N) / 2,
    B = A - x,
    F = N - M,
    R = B * B + F * F,
    I = a - o,
    L = x * N - A * M,
    $ = (F < 0 ? -1 : 1) * qa(l3(0, I * I * R - L * L)),
    G = (L * F - B * $) / R,
    ue = (-L * B - F * $) / R,
    ne = (L * F + B * $) / R,
    U = (-L * B + F * $) / R,
    ae = G - k,
    J = ue - D,
    H = ne - k,
    ee = U - D;
  return (
    ae * ae + J * J > H * H + ee * ee && ((G = ne), (ue = U)),
    {
      cx: G,
      cy: ue,
      x01: -h,
      y01: -y,
      x11: G * (a / I - 1),
      y11: ue * (a / I - 1),
    }
  );
}
function Kl() {
  var e = JN,
    t = eD,
    r = we(0),
    n = null,
    a = tD,
    o = rD,
    i = nD,
    u = null;
  function l() {
    var s,
      h,
      y = +e.apply(this, arguments),
      x = +t.apply(this, arguments),
      M = a.apply(this, arguments) - zu,
      A = o.apply(this, arguments) - zu,
      N = Tp(A - M),
      k = A > M;
    if ((u || (u = s = dr()), x < y && ((h = x), (x = y), (y = h)), !(x > mt)))
      u.moveTo(0, 0);
    else if (N > hr - mt)
      u.moveTo(x * qn(M), x * kr(M)),
        u.arc(0, 0, x, M, A, !k),
        y > mt && (u.moveTo(y * qn(A), y * kr(A)), u.arc(0, 0, y, A, M, k));
    else {
      var D = M,
        B = A,
        F = M,
        R = A,
        I = N,
        L = N,
        $ = i.apply(this, arguments) / 2,
        G = $ > mt && (n ? +n.apply(this, arguments) : qa(y * y + x * x)),
        ue = jl(Tp(x - y) / 2, +r.apply(this, arguments)),
        ne = ue,
        U = ue,
        ae,
        J;
      if (G > mt) {
        var H = Vp((G / y) * kr($)),
          ee = Vp((G / x) * kr($));
        (I -= H * 2) > mt
          ? ((H *= k ? 1 : -1), (F += H), (R -= H))
          : ((I = 0), (F = R = (M + A) / 2)),
          (L -= ee * 2) > mt
            ? ((ee *= k ? 1 : -1), (D += ee), (B -= ee))
            : ((L = 0), (D = B = (M + A) / 2));
      }
      var j = x * qn(D),
        X = x * kr(D),
        K = y * qn(R),
        Z = y * kr(R);
      if (ue > mt) {
        var te = x * qn(B),
          le = x * kr(B),
          de = y * qn(F),
          re = y * kr(F),
          me;
        if (N < Cr && (me = aD(j, X, de, re, te, le, K, Z))) {
          var Me = j - me[0],
            Oe = X - me[1],
            Ne = te - me[0],
            Ue = le - me[1],
            ce =
              1 /
              kr(
                c3(
                  (Me * Ne + Oe * Ue) /
                    (qa(Me * Me + Oe * Oe) * qa(Ne * Ne + Ue * Ue)),
                ) / 2,
              ),
            _e = qa(me[0] * me[0] + me[1] * me[1]);
          (ne = jl(ue, (y - _e) / (ce - 1))), (U = jl(ue, (x - _e) / (ce + 1)));
        }
      }
      L > mt
        ? U > mt
          ? ((ae = Ql(de, re, j, X, x, U, k)),
            (J = Ql(te, le, K, Z, x, U, k)),
            u.moveTo(ae.cx + ae.x01, ae.cy + ae.y01),
            U < ue
              ? u.arc(ae.cx, ae.cy, U, _t(ae.y01, ae.x01), _t(J.y01, J.x01), !k)
              : (u.arc(
                  ae.cx,
                  ae.cy,
                  U,
                  _t(ae.y01, ae.x01),
                  _t(ae.y11, ae.x11),
                  !k,
                ),
                u.arc(
                  0,
                  0,
                  x,
                  _t(ae.cy + ae.y11, ae.cx + ae.x11),
                  _t(J.cy + J.y11, J.cx + J.x11),
                  !k,
                ),
                u.arc(J.cx, J.cy, U, _t(J.y11, J.x11), _t(J.y01, J.x01), !k)))
          : (u.moveTo(j, X), u.arc(0, 0, x, D, B, !k))
        : u.moveTo(j, X),
        !(y > mt) || !(I > mt)
          ? u.lineTo(K, Z)
          : ne > mt
          ? ((ae = Ql(K, Z, te, le, y, -ne, k)),
            (J = Ql(j, X, de, re, y, -ne, k)),
            u.lineTo(ae.cx + ae.x01, ae.cy + ae.y01),
            ne < ue
              ? u.arc(
                  ae.cx,
                  ae.cy,
                  ne,
                  _t(ae.y01, ae.x01),
                  _t(J.y01, J.x01),
                  !k,
                )
              : (u.arc(
                  ae.cx,
                  ae.cy,
                  ne,
                  _t(ae.y01, ae.x01),
                  _t(ae.y11, ae.x11),
                  !k,
                ),
                u.arc(
                  0,
                  0,
                  y,
                  _t(ae.cy + ae.y11, ae.cx + ae.x11),
                  _t(J.cy + J.y11, J.cx + J.x11),
                  k,
                ),
                u.arc(J.cx, J.cy, ne, _t(J.y11, J.x11), _t(J.y01, J.x01), !k)))
          : u.arc(0, 0, y, R, F, k);
    }
    if ((u.closePath(), s)) return (u = null), s + "" || null;
  }
  return (
    (l.centroid = function () {
      var s = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2,
        h =
          (+a.apply(this, arguments) + +o.apply(this, arguments)) / 2 - Cr / 2;
      return [qn(h) * s, kr(h) * s];
    }),
    (l.innerRadius = function (s) {
      return arguments.length
        ? ((e = typeof s == "function" ? s : we(+s)), l)
        : e;
    }),
    (l.outerRadius = function (s) {
      return arguments.length
        ? ((t = typeof s == "function" ? s : we(+s)), l)
        : t;
    }),
    (l.cornerRadius = function (s) {
      return arguments.length
        ? ((r = typeof s == "function" ? s : we(+s)), l)
        : r;
    }),
    (l.padRadius = function (s) {
      return arguments.length
        ? ((n = s == null ? null : typeof s == "function" ? s : we(+s)), l)
        : n;
    }),
    (l.startAngle = function (s) {
      return arguments.length
        ? ((a = typeof s == "function" ? s : we(+s)), l)
        : a;
    }),
    (l.endAngle = function (s) {
      return arguments.length
        ? ((o = typeof s == "function" ? s : we(+s)), l)
        : o;
    }),
    (l.padAngle = function (s) {
      return arguments.length
        ? ((i = typeof s == "function" ? s : we(+s)), l)
        : i;
    }),
    (l.context = function (s) {
      return arguments.length ? ((u = s ?? null), l) : u;
    }),
    l
  );
}
var s3 = T(() => {
  Bn();
  Yn();
  $o();
});
function Wn(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
var d3,
  Go = T(() => {
    d3 = Array.prototype.slice;
  });
function m3(e) {
  this._context = e;
}
function $n(e) {
  return new m3(e);
}
var Pu = T(() => {
  m3.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      (this._line || (this._line !== 0 && this._point === 1)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (e, t) {
      switch (((e = +e), (t = +t), this._point)) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(e, t)
              : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
        default:
          this._context.lineTo(e, t);
          break;
      }
    },
  };
});
function Uo(e) {
  return e[0];
}
function Xo(e) {
  return e[1];
}
var Zl = T(() => {});
function Gn(e, t) {
  var r = we(!0),
    n = null,
    a = $n,
    o = null;
  (e = typeof e == "function" ? e : e === void 0 ? Uo : we(e)),
    (t = typeof t == "function" ? t : t === void 0 ? Xo : we(t));
  function i(u) {
    var l,
      s = (u = Wn(u)).length,
      h,
      y = !1,
      x;
    for (n == null && (o = a((x = dr()))), l = 0; l <= s; ++l)
      !(l < s && r((h = u[l]), l, u)) === y &&
        ((y = !y) ? o.lineStart() : o.lineEnd()),
        y && o.point(+e(h, l, u), +t(h, l, u));
    if (x) return (o = null), x + "" || null;
  }
  return (
    (i.x = function (u) {
      return arguments.length
        ? ((e = typeof u == "function" ? u : we(+u)), i)
        : e;
    }),
    (i.y = function (u) {
      return arguments.length
        ? ((t = typeof u == "function" ? u : we(+u)), i)
        : t;
    }),
    (i.defined = function (u) {
      return arguments.length
        ? ((r = typeof u == "function" ? u : we(!!u)), i)
        : r;
    }),
    (i.curve = function (u) {
      return arguments.length ? ((a = u), n != null && (o = a(n)), i) : a;
    }),
    (i.context = function (u) {
      return arguments.length
        ? (u == null ? (n = o = null) : (o = a((n = u))), i)
        : n;
    }),
    i
  );
}
var Jl = T(() => {
  Bn();
  Go();
  Yn();
  Pu();
  Zl();
});
function ec(e, t, r) {
  var n = null,
    a = we(!0),
    o = null,
    i = $n,
    u = null;
  (e = typeof e == "function" ? e : e === void 0 ? Uo : we(+e)),
    (t = typeof t == "function" ? t : t === void 0 ? we(0) : we(+t)),
    (r = typeof r == "function" ? r : r === void 0 ? Xo : we(+r));
  function l(h) {
    var y,
      x,
      M,
      A = (h = Wn(h)).length,
      N,
      k = !1,
      D,
      B = new Array(A),
      F = new Array(A);
    for (o == null && (u = i((D = dr()))), y = 0; y <= A; ++y) {
      if (!(y < A && a((N = h[y]), y, h)) === k)
        if ((k = !k)) (x = y), u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), M = y - 1; M >= x; --M)
            u.point(B[M], F[M]);
          u.lineEnd(), u.areaEnd();
        }
      k &&
        ((B[y] = +e(N, y, h)),
        (F[y] = +t(N, y, h)),
        u.point(n ? +n(N, y, h) : B[y], r ? +r(N, y, h) : F[y]));
    }
    if (D) return (u = null), D + "" || null;
  }
  function s() {
    return Gn().defined(a).curve(i).context(o);
  }
  return (
    (l.x = function (h) {
      return arguments.length
        ? ((e = typeof h == "function" ? h : we(+h)), (n = null), l)
        : e;
    }),
    (l.x0 = function (h) {
      return arguments.length
        ? ((e = typeof h == "function" ? h : we(+h)), l)
        : e;
    }),
    (l.x1 = function (h) {
      return arguments.length
        ? ((n = h == null ? null : typeof h == "function" ? h : we(+h)), l)
        : n;
    }),
    (l.y = function (h) {
      return arguments.length
        ? ((t = typeof h == "function" ? h : we(+h)), (r = null), l)
        : t;
    }),
    (l.y0 = function (h) {
      return arguments.length
        ? ((t = typeof h == "function" ? h : we(+h)), l)
        : t;
    }),
    (l.y1 = function (h) {
      return arguments.length
        ? ((r = h == null ? null : typeof h == "function" ? h : we(+h)), l)
        : r;
    }),
    (l.lineX0 = l.lineY0 =
      function () {
        return s().x(e).y(t);
      }),
    (l.lineY1 = function () {
      return s().x(e).y(r);
    }),
    (l.lineX1 = function () {
      return s().x(n).y(t);
    }),
    (l.defined = function (h) {
      return arguments.length
        ? ((a = typeof h == "function" ? h : we(!!h)), l)
        : a;
    }),
    (l.curve = function (h) {
      return arguments.length ? ((i = h), o != null && (u = i(o)), l) : i;
    }),
    (l.context = function (h) {
      return arguments.length
        ? (h == null ? (o = u = null) : (u = i((o = h))), l)
        : o;
    }),
    l
  );
}
var Np = T(() => {
  Bn();
  Go();
  Yn();
  Pu();
  Jl();
  Zl();
});
function h3(e, t) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
var p3 = T(() => {});
function g3(e) {
  return e;
}
var v3 = T(() => {});
function x3() {
  var e = g3,
    t = h3,
    r = null,
    n = we(0),
    a = we(hr),
    o = we(0);
  function i(u) {
    var l,
      s = (u = Wn(u)).length,
      h,
      y,
      x = 0,
      M = new Array(s),
      A = new Array(s),
      N = +n.apply(this, arguments),
      k = Math.min(hr, Math.max(-hr, a.apply(this, arguments) - N)),
      D,
      B = Math.min(Math.abs(k) / s, o.apply(this, arguments)),
      F = B * (k < 0 ? -1 : 1),
      R;
    for (l = 0; l < s; ++l)
      (R = A[(M[l] = l)] = +e(u[l], l, u)) > 0 && (x += R);
    for (
      t != null
        ? M.sort(function (I, L) {
            return t(A[I], A[L]);
          })
        : r != null &&
          M.sort(function (I, L) {
            return r(u[I], u[L]);
          }),
        l = 0,
        y = x ? (k - s * F) / x : 0;
      l < s;
      ++l, N = D
    )
      (h = M[l]),
        (R = A[h]),
        (D = N + (R > 0 ? R * y : 0) + F),
        (A[h] = {
          data: u[h],
          index: l,
          value: R,
          startAngle: N,
          endAngle: D,
          padAngle: B,
        });
    return A;
  }
  return (
    (i.value = function (u) {
      return arguments.length
        ? ((e = typeof u == "function" ? u : we(+u)), i)
        : e;
    }),
    (i.sortValues = function (u) {
      return arguments.length ? ((t = u), (r = null), i) : t;
    }),
    (i.sort = function (u) {
      return arguments.length ? ((r = u), (t = null), i) : r;
    }),
    (i.startAngle = function (u) {
      return arguments.length
        ? ((n = typeof u == "function" ? u : we(+u)), i)
        : n;
    }),
    (i.endAngle = function (u) {
      return arguments.length
        ? ((a = typeof u == "function" ? u : we(+u)), i)
        : a;
    }),
    (i.padAngle = function (u) {
      return arguments.length
        ? ((o = typeof u == "function" ? u : we(+u)), i)
        : o;
    }),
    i
  );
}
var b3 = T(() => {
  Go();
  Yn();
  p3();
  v3();
  $o();
});
function y3(e) {
  this._curve = e;
}
function jo(e) {
  function t(r) {
    return new y3(e(r));
  }
  return (t._curve = e), t;
}
var tc,
  Dp = T(() => {
    Pu();
    tc = jo($n);
    y3.prototype = {
      areaStart: function () {
        this._curve.areaStart();
      },
      areaEnd: function () {
        this._curve.areaEnd();
      },
      lineStart: function () {
        this._curve.lineStart();
      },
      lineEnd: function () {
        this._curve.lineEnd();
      },
      point: function (e, t) {
        this._curve.point(t * Math.sin(e), t * -Math.cos(e));
      },
    };
  });
function Qo(e) {
  var t = e.curve;
  return (
    (e.angle = e.x),
    delete e.x,
    (e.radius = e.y),
    delete e.y,
    (e.curve = function (r) {
      return arguments.length ? t(jo(r)) : t()._curve;
    }),
    e
  );
}
function Ep() {
  return Qo(Gn().curve(tc));
}
var Ip = T(() => {
  Dp();
  Jl();
});
function zp() {
  var e = ec().curve(tc),
    t = e.curve,
    r = e.lineX0,
    n = e.lineX1,
    a = e.lineY0,
    o = e.lineY1;
  return (
    (e.angle = e.x),
    delete e.x,
    (e.startAngle = e.x0),
    delete e.x0,
    (e.endAngle = e.x1),
    delete e.x1,
    (e.radius = e.y),
    delete e.y,
    (e.innerRadius = e.y0),
    delete e.y0,
    (e.outerRadius = e.y1),
    delete e.y1,
    (e.lineStartAngle = function () {
      return Qo(r());
    }),
    delete e.lineX0,
    (e.lineEndAngle = function () {
      return Qo(n());
    }),
    delete e.lineX1,
    (e.lineInnerRadius = function () {
      return Qo(a());
    }),
    delete e.lineY0,
    (e.lineOuterRadius = function () {
      return Qo(o());
    }),
    delete e.lineY1,
    (e.curve = function (i) {
      return arguments.length ? t(jo(i)) : t()._curve;
    }),
    e
  );
}
var w3 = T(() => {
  Dp();
  Np();
  Ip();
});
function Wa(e, t) {
  return [(t = +t) * Math.cos((e -= Math.PI / 2)), t * Math.sin(e)];
}
var Pp = T(() => {});
function oD(e) {
  return e.source;
}
function iD(e) {
  return e.target;
}
function Rp(e) {
  var t = oD,
    r = iD,
    n = Uo,
    a = Xo,
    o = null;
  function i() {
    var u,
      l = d3.call(arguments),
      s = t.apply(this, l),
      h = r.apply(this, l);
    if (
      (o || (o = u = dr()),
      e(
        o,
        +n.apply(this, ((l[0] = s), l)),
        +a.apply(this, l),
        +n.apply(this, ((l[0] = h), l)),
        +a.apply(this, l),
      ),
      u)
    )
      return (o = null), u + "" || null;
  }
  return (
    (i.source = function (u) {
      return arguments.length ? ((t = u), i) : t;
    }),
    (i.target = function (u) {
      return arguments.length ? ((r = u), i) : r;
    }),
    (i.x = function (u) {
      return arguments.length
        ? ((n = typeof u == "function" ? u : we(+u)), i)
        : n;
    }),
    (i.y = function (u) {
      return arguments.length
        ? ((a = typeof u == "function" ? u : we(+u)), i)
        : a;
    }),
    (i.context = function (u) {
      return arguments.length ? ((o = u ?? null), i) : o;
    }),
    i
  );
}
function uD(e, t, r, n, a) {
  e.moveTo(t, r), e.bezierCurveTo((t = (t + n) / 2), r, t, a, n, a);
}
function fD(e, t, r, n, a) {
  e.moveTo(t, r), e.bezierCurveTo(t, (r = (r + a) / 2), n, r, n, a);
}
function lD(e, t, r, n, a) {
  var o = Wa(t, r),
    i = Wa(t, (r = (r + a) / 2)),
    u = Wa(n, r),
    l = Wa(n, a);
  e.moveTo(o[0], o[1]), e.bezierCurveTo(i[0], i[1], u[0], u[1], l[0], l[1]);
}
function _3() {
  return Rp(uD);
}
function S3() {
  return Rp(fD);
}
function M3() {
  var e = Rp(lD);
  return (e.angle = e.x), delete e.x, (e.radius = e.y), delete e.y, e;
}
var A3 = T(() => {
  Bn();
  Go();
  Yn();
  Zl();
  Pp();
});
var $a,
  Lp = T(() => {
    $o();
    $a = {
      draw: function (e, t) {
        var r = Math.sqrt(t / Cr);
        e.moveTo(r, 0), e.arc(0, 0, r, 0, hr);
      },
    };
  });
var Ko,
  Op = T(() => {
    Ko = {
      draw: function (e, t) {
        var r = Math.sqrt(t / 5) / 2;
        e.moveTo(-3 * r, -r),
          e.lineTo(-r, -r),
          e.lineTo(-r, -3 * r),
          e.lineTo(r, -3 * r),
          e.lineTo(r, -r),
          e.lineTo(3 * r, -r),
          e.lineTo(3 * r, r),
          e.lineTo(r, r),
          e.lineTo(r, 3 * r),
          e.lineTo(-r, 3 * r),
          e.lineTo(-r, r),
          e.lineTo(-3 * r, r),
          e.closePath();
      },
    };
  });
var k3,
  cD,
  Zo,
  Bp = T(() => {
    (k3 = Math.sqrt(0.3333333333333333)),
      (cD = k3 * 2),
      (Zo = {
        draw: function (e, t) {
          var r = Math.sqrt(t / cD),
            n = r * k3;
          e.moveTo(0, -r),
            e.lineTo(n, 0),
            e.lineTo(0, r),
            e.lineTo(-n, 0),
            e.closePath();
        },
      });
  });
var sD,
  C3,
  dD,
  mD,
  Jo,
  Fp = T(() => {
    $o();
    (sD = 0.8908130915292852),
      (C3 = Math.sin(Cr / 10) / Math.sin((7 * Cr) / 10)),
      (dD = Math.sin(hr / 10) * C3),
      (mD = -Math.cos(hr / 10) * C3),
      (Jo = {
        draw: function (e, t) {
          var r = Math.sqrt(t * sD),
            n = dD * r,
            a = mD * r;
          e.moveTo(0, -r), e.lineTo(n, a);
          for (var o = 1; o < 5; ++o) {
            var i = (hr * o) / 5,
              u = Math.cos(i),
              l = Math.sin(i);
            e.lineTo(l * r, -u * r), e.lineTo(u * n - l * a, l * n + u * a);
          }
          e.closePath();
        },
      });
  });
var ei,
  Hp = T(() => {
    ei = {
      draw: function (e, t) {
        var r = Math.sqrt(t),
          n = -r / 2;
        e.rect(n, n, r, r);
      },
    };
  });
var Yp,
  ti,
  qp = T(() => {
    (Yp = Math.sqrt(3)),
      (ti = {
        draw: function (e, t) {
          var r = -Math.sqrt(t / (Yp * 3));
          e.moveTo(0, r * 2),
            e.lineTo(-Yp * r, -r),
            e.lineTo(Yp * r, -r),
            e.closePath();
        },
      });
  });
var pr,
  gr,
  Wp,
  hD,
  ri,
  $p = T(() => {
    (pr = -0.5),
      (gr = Math.sqrt(3) / 2),
      (Wp = 1 / Math.sqrt(12)),
      (hD = (Wp / 2 + 1) * 3),
      (ri = {
        draw: function (e, t) {
          var r = Math.sqrt(t / hD),
            n = r / 2,
            a = r * Wp,
            o = n,
            i = r * Wp + r,
            u = -o,
            l = i;
          e.moveTo(n, a),
            e.lineTo(o, i),
            e.lineTo(u, l),
            e.lineTo(pr * n - gr * a, gr * n + pr * a),
            e.lineTo(pr * o - gr * i, gr * o + pr * i),
            e.lineTo(pr * u - gr * l, gr * u + pr * l),
            e.lineTo(pr * n + gr * a, pr * a - gr * n),
            e.lineTo(pr * o + gr * i, pr * i - gr * o),
            e.lineTo(pr * u + gr * l, pr * l - gr * u),
            e.closePath();
        },
      });
  });
function rc(e, t) {
  var r = null;
  (e = typeof e == "function" ? e : we(e || $a)),
    (t = typeof t == "function" ? t : we(t === void 0 ? 64 : +t));
  function n() {
    var a;
    if (
      (r || (r = a = dr()),
      e.apply(this, arguments).draw(r, +t.apply(this, arguments)),
      a)
    )
      return (r = null), a + "" || null;
  }
  return (
    (n.type = function (a) {
      return arguments.length
        ? ((e = typeof a == "function" ? a : we(a)), n)
        : e;
    }),
    (n.size = function (a) {
      return arguments.length
        ? ((t = typeof a == "function" ? a : we(+a)), n)
        : t;
    }),
    (n.context = function (a) {
      return arguments.length ? ((r = a ?? null), n) : r;
    }),
    n
  );
}
var T3,
  V3 = T(() => {
    Bn();
    Lp();
    Op();
    Bp();
    Fp();
    Hp();
    qp();
    $p();
    Yn();
    T3 = [$a, Ko, Zo, ei, Jo, ti, ri];
  });
function vr() {}
var Ru = T(() => {});
function ni(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6,
  );
}
function Lu(e) {
  this._context = e;
}
function N3(e) {
  return new Lu(e);
}
var Ou = T(() => {
  Lu.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 3:
          ni(this, this._x1, this._y1);
        case 2:
          this._context.lineTo(this._x1, this._y1);
          break;
      }
      (this._line || (this._line !== 0 && this._point === 1)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (e, t) {
      switch (((e = +e), (t = +t), this._point)) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(e, t)
              : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          (this._point = 3),
            this._context.lineTo(
              (5 * this._x0 + this._x1) / 6,
              (5 * this._y0 + this._y1) / 6,
            );
        default:
          ni(this, e, t);
          break;
      }
      (this._x0 = this._x1),
        (this._x1 = e),
        (this._y0 = this._y1),
        (this._y1 = t);
    },
  };
});
function D3(e) {
  this._context = e;
}
function E3(e) {
  return new D3(e);
}
var I3 = T(() => {
  Ru();
  Ou();
  D3.prototype = {
    areaStart: vr,
    areaEnd: vr,
    lineStart: function () {
      (this._x0 =
        this._x1 =
        this._x2 =
        this._x3 =
        this._x4 =
        this._y0 =
        this._y1 =
        this._y2 =
        this._y3 =
        this._y4 =
          NaN),
        (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 1: {
          this._context.moveTo(this._x2, this._y2), this._context.closePath();
          break;
        }
        case 2: {
          this._context.moveTo(
            (this._x2 + 2 * this._x3) / 3,
            (this._y2 + 2 * this._y3) / 3,
          ),
            this._context.lineTo(
              (this._x3 + 2 * this._x2) / 3,
              (this._y3 + 2 * this._y2) / 3,
            ),
            this._context.closePath();
          break;
        }
        case 3: {
          this.point(this._x2, this._y2),
            this.point(this._x3, this._y3),
            this.point(this._x4, this._y4);
          break;
        }
      }
    },
    point: function (e, t) {
      switch (((e = +e), (t = +t), this._point)) {
        case 0:
          (this._point = 1), (this._x2 = e), (this._y2 = t);
          break;
        case 1:
          (this._point = 2), (this._x3 = e), (this._y3 = t);
          break;
        case 2:
          (this._point = 3),
            (this._x4 = e),
            (this._y4 = t),
            this._context.moveTo(
              (this._x0 + 4 * this._x1 + e) / 6,
              (this._y0 + 4 * this._y1 + t) / 6,
            );
          break;
        default:
          ni(this, e, t);
          break;
      }
      (this._x0 = this._x1),
        (this._x1 = e),
        (this._y0 = this._y1),
        (this._y1 = t);
    },
  };
});
function z3(e) {
  this._context = e;
}
function P3(e) {
  return new z3(e);
}
var R3 = T(() => {
  Ou();
  z3.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
    },
    lineEnd: function () {
      (this._line || (this._line !== 0 && this._point === 3)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (e, t) {
      switch (((e = +e), (t = +t), this._point)) {
        case 0:
          this._point = 1;
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3;
          var r = (this._x0 + 4 * this._x1 + e) / 6,
            n = (this._y0 + 4 * this._y1 + t) / 6;
          this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
          break;
        case 3:
          this._point = 4;
        default:
          ni(this, e, t);
          break;
      }
      (this._x0 = this._x1),
        (this._x1 = e),
        (this._y0 = this._y1),
        (this._y1 = t);
    },
  };
});
function L3(e) {
  return new nc(e, !0);
}
function O3(e) {
  return new nc(e, !1);
}
var nc,
  B3 = T(() => {
    nc = class {
      constructor(t, r) {
        (this._context = t), (this._x = r);
      }
      areaStart() {
        this._line = 0;
      }
      areaEnd() {
        this._line = NaN;
      }
      lineStart() {
        this._point = 0;
      }
      lineEnd() {
        (this._line || (this._line !== 0 && this._point === 1)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      }
      point(t, r) {
        switch (((t = +t), (r = +r), this._point)) {
          case 0: {
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, r)
                : this._context.moveTo(t, r);
            break;
          }
          case 1:
            this._point = 2;
          default: {
            this._x
              ? this._context.bezierCurveTo(
                  (this._x0 = (this._x0 + t) / 2),
                  this._y0,
                  this._x0,
                  r,
                  t,
                  r,
                )
              : this._context.bezierCurveTo(
                  this._x0,
                  (this._y0 = (this._y0 + r) / 2),
                  t,
                  this._y0,
                  t,
                  r,
                );
            break;
          }
        }
        (this._x0 = t), (this._y0 = r);
      }
    };
  });
function F3(e, t) {
  (this._basis = new Lu(e)), (this._beta = t);
}
var H3,
  Y3 = T(() => {
    Ou();
    F3.prototype = {
      lineStart: function () {
        (this._x = []), (this._y = []), this._basis.lineStart();
      },
      lineEnd: function () {
        var e = this._x,
          t = this._y,
          r = e.length - 1;
        if (r > 0)
          for (
            var n = e[0], a = t[0], o = e[r] - n, i = t[r] - a, u = -1, l;
            ++u <= r;

          )
            (l = u / r),
              this._basis.point(
                this._beta * e[u] + (1 - this._beta) * (n + l * o),
                this._beta * t[u] + (1 - this._beta) * (a + l * i),
              );
        (this._x = this._y = null), this._basis.lineEnd();
      },
      point: function (e, t) {
        this._x.push(+e), this._y.push(+t);
      },
    };
    H3 = (function e(t) {
      function r(n) {
        return t === 1 ? new Lu(n) : new F3(n, t);
      }
      return (
        (r.beta = function (n) {
          return e(+n);
        }),
        r
      );
    })(0.85);
  });
function ai(e, t, r) {
  e._context.bezierCurveTo(
    e._x1 + e._k * (e._x2 - e._x0),
    e._y1 + e._k * (e._y2 - e._y0),
    e._x2 + e._k * (e._x1 - t),
    e._y2 + e._k * (e._y1 - r),
    e._x2,
    e._y2,
  );
}
function ac(e, t) {
  (this._context = e), (this._k = (1 - t) / 6);
}
var q3,
  Bu = T(() => {
    ac.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x2, this._y2);
            break;
          case 3:
            ai(this, this._x1, this._y1);
            break;
        }
        (this._line || (this._line !== 0 && this._point === 1)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (e, t) {
        switch (((e = +e), (t = +t), this._point)) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(e, t)
                : this._context.moveTo(e, t);
            break;
          case 1:
            (this._point = 2), (this._x1 = e), (this._y1 = t);
            break;
          case 2:
            this._point = 3;
          default:
            ai(this, e, t);
            break;
        }
        (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = e),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = t);
      },
    };
    q3 = (function e(t) {
      function r(n) {
        return new ac(n, t);
      }
      return (
        (r.tension = function (n) {
          return e(+n);
        }),
        r
      );
    })(0);
  });
function oc(e, t) {
  (this._context = e), (this._k = (1 - t) / 6);
}
var W3,
  Gp = T(() => {
    Ru();
    Bu();
    oc.prototype = {
      areaStart: vr,
      areaEnd: vr,
      lineStart: function () {
        (this._x0 =
          this._x1 =
          this._x2 =
          this._x3 =
          this._x4 =
          this._x5 =
          this._y0 =
          this._y1 =
          this._y2 =
          this._y3 =
          this._y4 =
          this._y5 =
            NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 1: {
            this._context.moveTo(this._x3, this._y3), this._context.closePath();
            break;
          }
          case 2: {
            this._context.lineTo(this._x3, this._y3), this._context.closePath();
            break;
          }
          case 3: {
            this.point(this._x3, this._y3),
              this.point(this._x4, this._y4),
              this.point(this._x5, this._y5);
            break;
          }
        }
      },
      point: function (e, t) {
        switch (((e = +e), (t = +t), this._point)) {
          case 0:
            (this._point = 1), (this._x3 = e), (this._y3 = t);
            break;
          case 1:
            (this._point = 2),
              this._context.moveTo((this._x4 = e), (this._y4 = t));
            break;
          case 2:
            (this._point = 3), (this._x5 = e), (this._y5 = t);
            break;
          default:
            ai(this, e, t);
            break;
        }
        (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = e),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = t);
      },
    };
    W3 = (function e(t) {
      function r(n) {
        return new oc(n, t);
      }
      return (
        (r.tension = function (n) {
          return e(+n);
        }),
        r
      );
    })(0);
  });
function ic(e, t) {
  (this._context = e), (this._k = (1 - t) / 6);
}
var $3,
  Up = T(() => {
    Bu();
    ic.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        (this._line || (this._line !== 0 && this._point === 3)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (e, t) {
        switch (((e = +e), (t = +t), this._point)) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3),
              this._line
                ? this._context.lineTo(this._x2, this._y2)
                : this._context.moveTo(this._x2, this._y2);
            break;
          case 3:
            this._point = 4;
          default:
            ai(this, e, t);
            break;
        }
        (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = e),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = t);
      },
    };
    $3 = (function e(t) {
      function r(n) {
        return new ic(n, t);
      }
      return (
        (r.tension = function (n) {
          return e(+n);
        }),
        r
      );
    })(0);
  });
function Fu(e, t, r) {
  var n = e._x1,
    a = e._y1,
    o = e._x2,
    i = e._y2;
  if (e._l01_a > mt) {
    var u = 2 * e._l01_2a + 3 * e._l01_a * e._l12_a + e._l12_2a,
      l = 3 * e._l01_a * (e._l01_a + e._l12_a);
    (n = (n * u - e._x0 * e._l12_2a + e._x2 * e._l01_2a) / l),
      (a = (a * u - e._y0 * e._l12_2a + e._y2 * e._l01_2a) / l);
  }
  if (e._l23_a > mt) {
    var s = 2 * e._l23_2a + 3 * e._l23_a * e._l12_a + e._l12_2a,
      h = 3 * e._l23_a * (e._l23_a + e._l12_a);
    (o = (o * s + e._x1 * e._l23_2a - t * e._l12_2a) / h),
      (i = (i * s + e._y1 * e._l23_2a - r * e._l12_2a) / h);
  }
  e._context.bezierCurveTo(n, a, o, i, e._x2, e._y2);
}
function G3(e, t) {
  (this._context = e), (this._alpha = t);
}
var U3,
  uc = T(() => {
    $o();
    Bu();
    G3.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._l01_a =
            this._l12_a =
            this._l23_a =
            this._l01_2a =
            this._l12_2a =
            this._l23_2a =
            this._point =
              0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x2, this._y2);
            break;
          case 3:
            this.point(this._x2, this._y2);
            break;
        }
        (this._line || (this._line !== 0 && this._point === 1)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (e, t) {
        if (((e = +e), (t = +t), this._point)) {
          var r = this._x2 - e,
            n = this._y2 - t;
          this._l23_a = Math.sqrt(
            (this._l23_2a = Math.pow(r * r + n * n, this._alpha)),
          );
        }
        switch (this._point) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(e, t)
                : this._context.moveTo(e, t);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
          default:
            Fu(this, e, t);
            break;
        }
        (this._l01_a = this._l12_a),
          (this._l12_a = this._l23_a),
          (this._l01_2a = this._l12_2a),
          (this._l12_2a = this._l23_2a),
          (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = e),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = t);
      },
    };
    U3 = (function e(t) {
      function r(n) {
        return t ? new G3(n, t) : new ac(n, 0);
      }
      return (
        (r.alpha = function (n) {
          return e(+n);
        }),
        r
      );
    })(0.5);
  });
function X3(e, t) {
  (this._context = e), (this._alpha = t);
}
var j3,
  Q3 = T(() => {
    Gp();
    Ru();
    uc();
    X3.prototype = {
      areaStart: vr,
      areaEnd: vr,
      lineStart: function () {
        (this._x0 =
          this._x1 =
          this._x2 =
          this._x3 =
          this._x4 =
          this._x5 =
          this._y0 =
          this._y1 =
          this._y2 =
          this._y3 =
          this._y4 =
          this._y5 =
            NaN),
          (this._l01_a =
            this._l12_a =
            this._l23_a =
            this._l01_2a =
            this._l12_2a =
            this._l23_2a =
            this._point =
              0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 1: {
            this._context.moveTo(this._x3, this._y3), this._context.closePath();
            break;
          }
          case 2: {
            this._context.lineTo(this._x3, this._y3), this._context.closePath();
            break;
          }
          case 3: {
            this.point(this._x3, this._y3),
              this.point(this._x4, this._y4),
              this.point(this._x5, this._y5);
            break;
          }
        }
      },
      point: function (e, t) {
        if (((e = +e), (t = +t), this._point)) {
          var r = this._x2 - e,
            n = this._y2 - t;
          this._l23_a = Math.sqrt(
            (this._l23_2a = Math.pow(r * r + n * n, this._alpha)),
          );
        }
        switch (this._point) {
          case 0:
            (this._point = 1), (this._x3 = e), (this._y3 = t);
            break;
          case 1:
            (this._point = 2),
              this._context.moveTo((this._x4 = e), (this._y4 = t));
            break;
          case 2:
            (this._point = 3), (this._x5 = e), (this._y5 = t);
            break;
          default:
            Fu(this, e, t);
            break;
        }
        (this._l01_a = this._l12_a),
          (this._l12_a = this._l23_a),
          (this._l01_2a = this._l12_2a),
          (this._l12_2a = this._l23_2a),
          (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = e),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = t);
      },
    };
    j3 = (function e(t) {
      function r(n) {
        return t ? new X3(n, t) : new oc(n, 0);
      }
      return (
        (r.alpha = function (n) {
          return e(+n);
        }),
        r
      );
    })(0.5);
  });
function K3(e, t) {
  (this._context = e), (this._alpha = t);
}
var Z3,
  J3 = T(() => {
    Up();
    uc();
    K3.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._l01_a =
            this._l12_a =
            this._l23_a =
            this._l01_2a =
            this._l12_2a =
            this._l23_2a =
            this._point =
              0);
      },
      lineEnd: function () {
        (this._line || (this._line !== 0 && this._point === 3)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (e, t) {
        if (((e = +e), (t = +t), this._point)) {
          var r = this._x2 - e,
            n = this._y2 - t;
          this._l23_a = Math.sqrt(
            (this._l23_2a = Math.pow(r * r + n * n, this._alpha)),
          );
        }
        switch (this._point) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3),
              this._line
                ? this._context.lineTo(this._x2, this._y2)
                : this._context.moveTo(this._x2, this._y2);
            break;
          case 3:
            this._point = 4;
          default:
            Fu(this, e, t);
            break;
        }
        (this._l01_a = this._l12_a),
          (this._l12_a = this._l23_a),
          (this._l01_2a = this._l12_2a),
          (this._l12_2a = this._l23_2a),
          (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = e),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = t);
      },
    };
    Z3 = (function e(t) {
      function r(n) {
        return t ? new K3(n, t) : new ic(n, 0);
      }
      return (
        (r.alpha = function (n) {
          return e(+n);
        }),
        r
      );
    })(0.5);
  });
function e8(e) {
  this._context = e;
}
function t8(e) {
  return new e8(e);
}
var r8 = T(() => {
  Ru();
  e8.prototype = {
    areaStart: vr,
    areaEnd: vr,
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      this._point && this._context.closePath();
    },
    point: function (e, t) {
      (e = +e),
        (t = +t),
        this._point
          ? this._context.lineTo(e, t)
          : ((this._point = 1), this._context.moveTo(e, t));
    },
  };
});
function n8(e) {
  return e < 0 ? -1 : 1;
}
function a8(e, t, r) {
  var n = e._x1 - e._x0,
    a = t - e._x1,
    o = (e._y1 - e._y0) / (n || (a < 0 && -0)),
    i = (r - e._y1) / (a || (n < 0 && -0)),
    u = (o * a + i * n) / (n + a);
  return (
    (n8(o) + n8(i)) * Math.min(Math.abs(o), Math.abs(i), 0.5 * Math.abs(u)) || 0
  );
}
function o8(e, t) {
  var r = e._x1 - e._x0;
  return r ? ((3 * (e._y1 - e._y0)) / r - t) / 2 : t;
}
function Xp(e, t, r) {
  var n = e._x0,
    a = e._y0,
    o = e._x1,
    i = e._y1,
    u = (o - n) / 3;
  e._context.bezierCurveTo(n + u, a + u * t, o - u, i - u * r, o, i);
}
function fc(e) {
  this._context = e;
}
function i8(e) {
  this._context = new u8(e);
}
function u8(e) {
  this._context = e;
}
function f8(e) {
  return new fc(e);
}
function l8(e) {
  return new i8(e);
}
var c8 = T(() => {
  fc.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
        (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x1, this._y1);
          break;
        case 3:
          Xp(this, this._t0, o8(this, this._t0));
          break;
      }
      (this._line || (this._line !== 0 && this._point === 1)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (e, t) {
      var r = NaN;
      if (((e = +e), (t = +t), !(e === this._x1 && t === this._y1))) {
        switch (this._point) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(e, t)
                : this._context.moveTo(e, t);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3), Xp(this, o8(this, (r = a8(this, e, t))), r);
            break;
          default:
            Xp(this, this._t0, (r = a8(this, e, t)));
            break;
        }
        (this._x0 = this._x1),
          (this._x1 = e),
          (this._y0 = this._y1),
          (this._y1 = t),
          (this._t0 = r);
      }
    },
  };
  (i8.prototype = Object.create(fc.prototype)).point = function (e, t) {
    fc.prototype.point.call(this, t, e);
  };
  u8.prototype = {
    moveTo: function (e, t) {
      this._context.moveTo(t, e);
    },
    closePath: function () {
      this._context.closePath();
    },
    lineTo: function (e, t) {
      this._context.lineTo(t, e);
    },
    bezierCurveTo: function (e, t, r, n, a, o) {
      this._context.bezierCurveTo(t, e, n, r, o, a);
    },
  };
});
function d8(e) {
  this._context = e;
}
function s8(e) {
  var t,
    r = e.length - 1,
    n,
    a = new Array(r),
    o = new Array(r),
    i = new Array(r);
  for (a[0] = 0, o[0] = 2, i[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t)
    (a[t] = 1), (o[t] = 4), (i[t] = 4 * e[t] + 2 * e[t + 1]);
  for (
    a[r - 1] = 2, o[r - 1] = 7, i[r - 1] = 8 * e[r - 1] + e[r], t = 1;
    t < r;
    ++t
  )
    (n = a[t] / o[t - 1]), (o[t] -= n), (i[t] -= n * i[t - 1]);
  for (a[r - 1] = i[r - 1] / o[r - 1], t = r - 2; t >= 0; --t)
    a[t] = (i[t] - a[t + 1]) / o[t];
  for (o[r - 1] = (e[r] + a[r - 1]) / 2, t = 0; t < r - 1; ++t)
    o[t] = 2 * e[t + 1] - a[t + 1];
  return [a, o];
}
function m8(e) {
  return new d8(e);
}
var h8 = T(() => {
  d8.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x = []), (this._y = []);
    },
    lineEnd: function () {
      var e = this._x,
        t = this._y,
        r = e.length;
      if (r)
        if (
          (this._line
            ? this._context.lineTo(e[0], t[0])
            : this._context.moveTo(e[0], t[0]),
          r === 2)
        )
          this._context.lineTo(e[1], t[1]);
        else
          for (var n = s8(e), a = s8(t), o = 0, i = 1; i < r; ++o, ++i)
            this._context.bezierCurveTo(
              n[0][o],
              a[0][o],
              n[1][o],
              a[1][o],
              e[i],
              t[i],
            );
      (this._line || (this._line !== 0 && r === 1)) &&
        this._context.closePath(),
        (this._line = 1 - this._line),
        (this._x = this._y = null);
    },
    point: function (e, t) {
      this._x.push(+e), this._y.push(+t);
    },
  };
});
function lc(e, t) {
  (this._context = e), (this._t = t);
}
function p8(e) {
  return new lc(e, 0.5);
}
function g8(e) {
  return new lc(e, 0);
}
function v8(e) {
  return new lc(e, 1);
}
var x8 = T(() => {
  lc.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x = this._y = NaN), (this._point = 0);
    },
    lineEnd: function () {
      0 < this._t &&
        this._t < 1 &&
        this._point === 2 &&
        this._context.lineTo(this._x, this._y),
        (this._line || (this._line !== 0 && this._point === 1)) &&
          this._context.closePath(),
        this._line >= 0 &&
          ((this._t = 1 - this._t), (this._line = 1 - this._line));
    },
    point: function (e, t) {
      switch (((e = +e), (t = +t), this._point)) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(e, t)
              : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
        default: {
          if (this._t <= 0)
            this._context.lineTo(this._x, t), this._context.lineTo(e, t);
          else {
            var r = this._x * (1 - this._t) + e * this._t;
            this._context.lineTo(r, this._y), this._context.lineTo(r, t);
          }
          break;
        }
      }
      (this._x = e), (this._y = t);
    },
  };
});
function Tr(e, t) {
  if ((i = e.length) > 1)
    for (var r = 1, n, a, o = e[t[0]], i, u = o.length; r < i; ++r)
      for (a = o, o = e[t[r]], n = 0; n < u; ++n)
        o[n][1] += o[n][0] = isNaN(a[n][1]) ? a[n][0] : a[n][1];
}
var oi = T(() => {});
function Vr(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
var ii = T(() => {});
function pD(e, t) {
  return e[t];
}
function gD(e) {
  let t = [];
  return (t.key = e), t;
}
function b8() {
  var e = we([]),
    t = Vr,
    r = Tr,
    n = pD;
  function a(o) {
    var i = Array.from(e.apply(this, arguments), gD),
      u,
      l = i.length,
      s = -1,
      h;
    for (let y of o)
      for (u = 0, ++s; u < l; ++u)
        (i[u][s] = [0, +n(y, i[u].key, s, o)]).data = y;
    for (u = 0, h = Wn(t(i)); u < l; ++u) i[h[u]].index = u;
    return r(i, h), i;
  }
  return (
    (a.keys = function (o) {
      return arguments.length
        ? ((e = typeof o == "function" ? o : we(Array.from(o))), a)
        : e;
    }),
    (a.value = function (o) {
      return arguments.length
        ? ((n = typeof o == "function" ? o : we(+o)), a)
        : n;
    }),
    (a.order = function (o) {
      return arguments.length
        ? ((t =
            o == null ? Vr : typeof o == "function" ? o : we(Array.from(o))),
          a)
        : t;
    }),
    (a.offset = function (o) {
      return arguments.length ? ((r = o ?? Tr), a) : r;
    }),
    a
  );
}
var y8 = T(() => {
  Go();
  Yn();
  oi();
  ii();
});
function w8(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, a = 0, o = e[0].length, i; a < o; ++a) {
      for (i = r = 0; r < n; ++r) i += e[r][a][1] || 0;
      if (i) for (r = 0; r < n; ++r) e[r][a][1] /= i;
    }
    Tr(e, t);
  }
}
var _8 = T(() => {
  oi();
});
function S8(e, t) {
  if ((l = e.length) > 0)
    for (var r, n = 0, a, o, i, u, l, s = e[t[0]].length; n < s; ++n)
      for (i = u = 0, r = 0; r < l; ++r)
        (o = (a = e[t[r]][n])[1] - a[0]) > 0
          ? ((a[0] = i), (a[1] = i += o))
          : o < 0
          ? ((a[1] = u), (a[0] = u += o))
          : ((a[0] = 0), (a[1] = o));
}
var M8 = T(() => {});
function A8(e, t) {
  if ((a = e.length) > 0) {
    for (var r = 0, n = e[t[0]], a, o = n.length; r < o; ++r) {
      for (var i = 0, u = 0; i < a; ++i) u += e[i][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    Tr(e, t);
  }
}
var k8 = T(() => {
  oi();
});
function C8(e, t) {
  if (!(!((i = e.length) > 0) || !((o = (a = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, a, o, i; n < o; ++n) {
      for (var u = 0, l = 0, s = 0; u < i; ++u) {
        for (
          var h = e[t[u]],
            y = h[n][1] || 0,
            x = h[n - 1][1] || 0,
            M = (y - x) / 2,
            A = 0;
          A < u;
          ++A
        ) {
          var N = e[t[A]],
            k = N[n][1] || 0,
            D = N[n - 1][1] || 0;
          M += k - D;
        }
        (l += y), (s += M * y);
      }
      (a[n - 1][1] += a[n - 1][0] = r), l && (r -= s / l);
    }
    (a[n - 1][1] += a[n - 1][0] = r), Tr(e, t);
  }
}
var T8 = T(() => {
  oi();
});
function cc(e) {
  var t = e.map(vD);
  return Vr(e).sort(function (r, n) {
    return t[r] - t[n];
  });
}
function vD(e) {
  for (var t = -1, r = 0, n = e.length, a, o = -1 / 0; ++t < n; )
    (a = +e[t][1]) > o && ((o = a), (r = t));
  return r;
}
var jp = T(() => {
  ii();
});
function sc(e) {
  var t = e.map(Qp);
  return Vr(e).sort(function (r, n) {
    return t[r] - t[n];
  });
}
function Qp(e) {
  for (var t = 0, r = -1, n = e.length, a; ++r < n; )
    (a = +e[r][1]) && (t += a);
  return t;
}
var dc = T(() => {
  ii();
});
function V8(e) {
  return sc(e).reverse();
}
var N8 = T(() => {
  dc();
});
function D8(e) {
  var t = e.length,
    r,
    n,
    a = e.map(Qp),
    o = cc(e),
    i = 0,
    u = 0,
    l = [],
    s = [];
  for (r = 0; r < t; ++r)
    (n = o[r]), i < u ? ((i += a[n]), l.push(n)) : ((u += a[n]), s.push(n));
  return s.reverse().concat(l);
}
var E8 = T(() => {
  jp();
  dc();
});
function I8(e) {
  return Vr(e).reverse();
}
var z8 = T(() => {
  ii();
});
var P8 = {};
At(P8, {
  arc: () => Kl,
  area: () => ec,
  areaRadial: () => zp,
  curveBasis: () => N3,
  curveBasisClosed: () => E3,
  curveBasisOpen: () => P3,
  curveBumpX: () => L3,
  curveBumpY: () => O3,
  curveBundle: () => H3,
  curveCardinal: () => q3,
  curveCardinalClosed: () => W3,
  curveCardinalOpen: () => $3,
  curveCatmullRom: () => U3,
  curveCatmullRomClosed: () => j3,
  curveCatmullRomOpen: () => Z3,
  curveLinear: () => $n,
  curveLinearClosed: () => t8,
  curveMonotoneX: () => f8,
  curveMonotoneY: () => l8,
  curveNatural: () => m8,
  curveStep: () => p8,
  curveStepAfter: () => v8,
  curveStepBefore: () => g8,
  line: () => Gn,
  lineRadial: () => Ep,
  linkHorizontal: () => _3,
  linkRadial: () => M3,
  linkVertical: () => S3,
  pie: () => x3,
  pointRadial: () => Wa,
  radialArea: () => zp,
  radialLine: () => Ep,
  stack: () => b8,
  stackOffsetDiverging: () => S8,
  stackOffsetExpand: () => w8,
  stackOffsetNone: () => Tr,
  stackOffsetSilhouette: () => A8,
  stackOffsetWiggle: () => C8,
  stackOrderAppearance: () => cc,
  stackOrderAscending: () => sc,
  stackOrderDescending: () => V8,
  stackOrderInsideOut: () => D8,
  stackOrderNone: () => Vr,
  stackOrderReverse: () => I8,
  symbol: () => rc,
  symbolCircle: () => $a,
  symbolCross: () => Ko,
  symbolDiamond: () => Zo,
  symbolSquare: () => ei,
  symbolStar: () => Jo,
  symbolTriangle: () => ti,
  symbolWye: () => ri,
  symbols: () => T3,
});
var Kp = T(() => {
  s3();
  Np();
  Jl();
  b3();
  w3();
  Ip();
  Pp();
  A3();
  V3();
  Lp();
  Op();
  Bp();
  Hp();
  Fp();
  qp();
  $p();
  I3();
  R3();
  Ou();
  B3();
  Y3();
  Gp();
  Up();
  Bu();
  Q3();
  J3();
  uc();
  r8();
  Pu();
  c8();
  h8();
  x8();
  y8();
  _8();
  M8();
  oi();
  k8();
  T8();
  jp();
  dc();
  N8();
  E8();
  ii();
  z8();
});
function se(e) {
  for (var t = (e.length / 6) | 0, r = new Array(t), n = 0; n < t; )
    r[n] = "#" + e.slice(n * 6, ++n * 6);
  return r;
}
var ke = T(() => {});
var R8,
  L8 = T(() => {
    ke();
    R8 = se("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
  });
var O8,
  B8 = T(() => {
    ke();
    O8 = se("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
  });
var F8,
  H8 = T(() => {
    ke();
    F8 = se("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
  });
var Y8,
  q8 = T(() => {
    ke();
    Y8 = se(
      "a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928",
    );
  });
var W8,
  $8 = T(() => {
    ke();
    W8 = se("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
  });
var G8,
  U8 = T(() => {
    ke();
    G8 = se("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
  });
var X8,
  j8 = T(() => {
    ke();
    X8 = se("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
  });
var Q8,
  K8 = T(() => {
    ke();
    Q8 = se("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
  });
var Z8,
  J8 = T(() => {
    ke();
    Z8 = se(
      "8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f",
    );
  });
var e5,
  t5 = T(() => {
    ke();
    e5 = se("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
  });
var ve,
  qe = T(() => {
    Zt();
    ve = (e) => Ym(e[e.length - 1]);
  });
var Zp,
  r5,
  n5 = T(() => {
    ke();
    qe();
    (Zp = new Array(3)
      .concat(
        "d8b365f5f5f55ab4ac",
        "a6611adfc27d80cdc1018571",
        "a6611adfc27df5f5f580cdc1018571",
        "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
        "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
        "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
        "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
        "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
        "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30",
      )
      .map(se)),
      (r5 = ve(Zp));
  });
var Jp,
  a5,
  o5 = T(() => {
    ke();
    qe();
    (Jp = new Array(3)
      .concat(
        "af8dc3f7f7f77fbf7b",
        "7b3294c2a5cfa6dba0008837",
        "7b3294c2a5cff7f7f7a6dba0008837",
        "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
        "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
        "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
        "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
        "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
        "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b",
      )
      .map(se)),
      (a5 = ve(Jp));
  });
var eg,
  i5,
  u5 = T(() => {
    ke();
    qe();
    (eg = new Array(3)
      .concat(
        "e9a3c9f7f7f7a1d76a",
        "d01c8bf1b6dab8e1864dac26",
        "d01c8bf1b6daf7f7f7b8e1864dac26",
        "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
        "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
        "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
        "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
        "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
        "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419",
      )
      .map(se)),
      (i5 = ve(eg));
  });
var tg,
  f5,
  l5 = T(() => {
    ke();
    qe();
    (tg = new Array(3)
      .concat(
        "998ec3f7f7f7f1a340",
        "5e3c99b2abd2fdb863e66101",
        "5e3c99b2abd2f7f7f7fdb863e66101",
        "542788998ec3d8daebfee0b6f1a340b35806",
        "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
        "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
        "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
        "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
        "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08",
      )
      .map(se)),
      (f5 = ve(tg));
  });
var rg,
  c5,
  s5 = T(() => {
    ke();
    qe();
    (rg = new Array(3)
      .concat(
        "ef8a62f7f7f767a9cf",
        "ca0020f4a58292c5de0571b0",
        "ca0020f4a582f7f7f792c5de0571b0",
        "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
        "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
        "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
        "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
        "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
        "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061",
      )
      .map(se)),
      (c5 = ve(rg));
  });
var ng,
  d5,
  m5 = T(() => {
    ke();
    qe();
    (ng = new Array(3)
      .concat(
        "ef8a62ffffff999999",
        "ca0020f4a582bababa404040",
        "ca0020f4a582ffffffbababa404040",
        "b2182bef8a62fddbc7e0e0e09999994d4d4d",
        "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
        "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
        "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
        "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
        "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a",
      )
      .map(se)),
      (d5 = ve(ng));
  });
var ag,
  h5,
  p5 = T(() => {
    ke();
    qe();
    (ag = new Array(3)
      .concat(
        "fc8d59ffffbf91bfdb",
        "d7191cfdae61abd9e92c7bb6",
        "d7191cfdae61ffffbfabd9e92c7bb6",
        "d73027fc8d59fee090e0f3f891bfdb4575b4",
        "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
        "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
        "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
        "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
        "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695",
      )
      .map(se)),
      (h5 = ve(ag));
  });
var og,
  g5,
  v5 = T(() => {
    ke();
    qe();
    (og = new Array(3)
      .concat(
        "fc8d59ffffbf91cf60",
        "d7191cfdae61a6d96a1a9641",
        "d7191cfdae61ffffbfa6d96a1a9641",
        "d73027fc8d59fee08bd9ef8b91cf601a9850",
        "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
        "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
        "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
        "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
        "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837",
      )
      .map(se)),
      (g5 = ve(og));
  });
var ig,
  x5,
  b5 = T(() => {
    ke();
    qe();
    (ig = new Array(3)
      .concat(
        "fc8d59ffffbf99d594",
        "d7191cfdae61abdda42b83ba",
        "d7191cfdae61ffffbfabdda42b83ba",
        "d53e4ffc8d59fee08be6f59899d5943288bd",
        "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
        "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
        "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
        "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
        "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2",
      )
      .map(se)),
      (x5 = ve(ig));
  });
var ug,
  y5,
  w5 = T(() => {
    ke();
    qe();
    (ug = new Array(3)
      .concat(
        "e5f5f999d8c92ca25f",
        "edf8fbb2e2e266c2a4238b45",
        "edf8fbb2e2e266c2a42ca25f006d2c",
        "edf8fbccece699d8c966c2a42ca25f006d2c",
        "edf8fbccece699d8c966c2a441ae76238b45005824",
        "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
        "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b",
      )
      .map(se)),
      (y5 = ve(ug));
  });
var fg,
  _5,
  S5 = T(() => {
    ke();
    qe();
    (fg = new Array(3)
      .concat(
        "e0ecf49ebcda8856a7",
        "edf8fbb3cde38c96c688419d",
        "edf8fbb3cde38c96c68856a7810f7c",
        "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
        "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
        "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
        "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b",
      )
      .map(se)),
      (_5 = ve(fg));
  });
var lg,
  M5,
  A5 = T(() => {
    ke();
    qe();
    (lg = new Array(3)
      .concat(
        "e0f3dba8ddb543a2ca",
        "f0f9e8bae4bc7bccc42b8cbe",
        "f0f9e8bae4bc7bccc443a2ca0868ac",
        "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
        "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
        "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
        "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081",
      )
      .map(se)),
      (M5 = ve(lg));
  });
var cg,
  k5,
  C5 = T(() => {
    ke();
    qe();
    (cg = new Array(3)
      .concat(
        "fee8c8fdbb84e34a33",
        "fef0d9fdcc8afc8d59d7301f",
        "fef0d9fdcc8afc8d59e34a33b30000",
        "fef0d9fdd49efdbb84fc8d59e34a33b30000",
        "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
        "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
        "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000",
      )
      .map(se)),
      (k5 = ve(cg));
  });
var sg,
  T5,
  V5 = T(() => {
    ke();
    qe();
    (sg = new Array(3)
      .concat(
        "ece2f0a6bddb1c9099",
        "f6eff7bdc9e167a9cf02818a",
        "f6eff7bdc9e167a9cf1c9099016c59",
        "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
        "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
        "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
        "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636",
      )
      .map(se)),
      (T5 = ve(sg));
  });
var dg,
  N5,
  D5 = T(() => {
    ke();
    qe();
    (dg = new Array(3)
      .concat(
        "ece7f2a6bddb2b8cbe",
        "f1eef6bdc9e174a9cf0570b0",
        "f1eef6bdc9e174a9cf2b8cbe045a8d",
        "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
        "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
        "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
        "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858",
      )
      .map(se)),
      (N5 = ve(dg));
  });
var mg,
  E5,
  I5 = T(() => {
    ke();
    qe();
    (mg = new Array(3)
      .concat(
        "e7e1efc994c7dd1c77",
        "f1eef6d7b5d8df65b0ce1256",
        "f1eef6d7b5d8df65b0dd1c77980043",
        "f1eef6d4b9dac994c7df65b0dd1c77980043",
        "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
        "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
        "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f",
      )
      .map(se)),
      (E5 = ve(mg));
  });
var hg,
  z5,
  P5 = T(() => {
    ke();
    qe();
    (hg = new Array(3)
      .concat(
        "fde0ddfa9fb5c51b8a",
        "feebe2fbb4b9f768a1ae017e",
        "feebe2fbb4b9f768a1c51b8a7a0177",
        "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
        "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
        "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
        "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a",
      )
      .map(se)),
      (z5 = ve(hg));
  });
var pg,
  R5,
  L5 = T(() => {
    ke();
    qe();
    (pg = new Array(3)
      .concat(
        "edf8b17fcdbb2c7fb8",
        "ffffcca1dab441b6c4225ea8",
        "ffffcca1dab441b6c42c7fb8253494",
        "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
        "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
        "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
        "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58",
      )
      .map(se)),
      (R5 = ve(pg));
  });
var gg,
  O5,
  B5 = T(() => {
    ke();
    qe();
    (gg = new Array(3)
      .concat(
        "f7fcb9addd8e31a354",
        "ffffccc2e69978c679238443",
        "ffffccc2e69978c67931a354006837",
        "ffffccd9f0a3addd8e78c67931a354006837",
        "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
        "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
        "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529",
      )
      .map(se)),
      (O5 = ve(gg));
  });
var vg,
  F5,
  H5 = T(() => {
    ke();
    qe();
    (vg = new Array(3)
      .concat(
        "fff7bcfec44fd95f0e",
        "ffffd4fed98efe9929cc4c02",
        "ffffd4fed98efe9929d95f0e993404",
        "ffffd4fee391fec44ffe9929d95f0e993404",
        "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
        "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
        "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506",
      )
      .map(se)),
      (F5 = ve(vg));
  });
var xg,
  Y5,
  q5 = T(() => {
    ke();
    qe();
    (xg = new Array(3)
      .concat(
        "ffeda0feb24cf03b20",
        "ffffb2fecc5cfd8d3ce31a1c",
        "ffffb2fecc5cfd8d3cf03b20bd0026",
        "ffffb2fed976feb24cfd8d3cf03b20bd0026",
        "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
        "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
        "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026",
      )
      .map(se)),
      (Y5 = ve(xg));
  });
var bg,
  W5,
  $5 = T(() => {
    ke();
    qe();
    (bg = new Array(3)
      .concat(
        "deebf79ecae13182bd",
        "eff3ffbdd7e76baed62171b5",
        "eff3ffbdd7e76baed63182bd08519c",
        "eff3ffc6dbef9ecae16baed63182bd08519c",
        "eff3ffc6dbef9ecae16baed64292c62171b5084594",
        "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
        "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b",
      )
      .map(se)),
      (W5 = ve(bg));
  });
var yg,
  G5,
  U5 = T(() => {
    ke();
    qe();
    (yg = new Array(3)
      .concat(
        "e5f5e0a1d99b31a354",
        "edf8e9bae4b374c476238b45",
        "edf8e9bae4b374c47631a354006d2c",
        "edf8e9c7e9c0a1d99b74c47631a354006d2c",
        "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
        "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
        "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b",
      )
      .map(se)),
      (G5 = ve(yg));
  });
var wg,
  X5,
  j5 = T(() => {
    ke();
    qe();
    (wg = new Array(3)
      .concat(
        "f0f0f0bdbdbd636363",
        "f7f7f7cccccc969696525252",
        "f7f7f7cccccc969696636363252525",
        "f7f7f7d9d9d9bdbdbd969696636363252525",
        "f7f7f7d9d9d9bdbdbd969696737373525252252525",
        "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
        "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000",
      )
      .map(se)),
      (X5 = ve(wg));
  });
var _g,
  Q5,
  K5 = T(() => {
    ke();
    qe();
    (_g = new Array(3)
      .concat(
        "efedf5bcbddc756bb1",
        "f2f0f7cbc9e29e9ac86a51a3",
        "f2f0f7cbc9e29e9ac8756bb154278f",
        "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
        "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
        "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
        "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d",
      )
      .map(se)),
      (Q5 = ve(_g));
  });
var Sg,
  Z5,
  J5 = T(() => {
    ke();
    qe();
    (Sg = new Array(3)
      .concat(
        "fee0d2fc9272de2d26",
        "fee5d9fcae91fb6a4acb181d",
        "fee5d9fcae91fb6a4ade2d26a50f15",
        "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
        "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
        "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
        "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d",
      )
      .map(se)),
      (Z5 = ve(Sg));
  });
var Mg,
  e6,
  t6 = T(() => {
    ke();
    qe();
    (Mg = new Array(3)
      .concat(
        "fee6cefdae6be6550d",
        "feeddefdbe85fd8d3cd94701",
        "feeddefdbe85fd8d3ce6550da63603",
        "feeddefdd0a2fdae6bfd8d3ce6550da63603",
        "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
        "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
        "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704",
      )
      .map(se)),
      (e6 = ve(Mg));
  });
function r6(e) {
  return (
    (e = Math.max(0, Math.min(1, e))),
    "rgb(" +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            -4.54 -
              e *
                (35.34 -
                  e * (2381.73 - e * (6402.7 - e * (7024.72 - e * 2710.57)))),
          ),
        ),
      ) +
      ", " +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            32.49 +
              e *
                (170.73 +
                  e * (52.82 - e * (131.46 - e * (176.58 - e * 67.37)))),
          ),
        ),
      ) +
      ", " +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            81.24 +
              e *
                (442.36 -
                  e * (2482.43 - e * (6167.24 - e * (6614.94 - e * 2475.67)))),
          ),
        ),
      ) +
      ")"
  );
}
var n6 = T(() => {});
var a6,
  o6 = T(() => {
    sn();
    Zt();
    a6 = No(Bt(300, 0.5, 0), Bt(-240, 0.5, 1));
  });
function f6(e) {
  (e < 0 || e > 1) && (e -= Math.floor(e));
  var t = Math.abs(e - 0.5);
  return (
    (mc.h = 360 * e - 100),
    (mc.s = 1.5 - 1.5 * t),
    (mc.l = 0.8 - 0.9 * t),
    mc + ""
  );
}
var i6,
  u6,
  mc,
  l6 = T(() => {
    sn();
    Zt();
    (i6 = No(Bt(-100, 0.75, 0.35), Bt(80, 1.5, 0.8))),
      (u6 = No(Bt(260, 0.75, 0.35), Bt(80, 1.5, 0.8))),
      (mc = Bt());
  });
function c6(e) {
  var t;
  return (
    (e = (0.5 - e) * Math.PI),
    (hc.r = 255 * (t = Math.sin(e)) * t),
    (hc.g = 255 * (t = Math.sin(e + xD)) * t),
    (hc.b = 255 * (t = Math.sin(e + bD)) * t),
    hc + ""
  );
}
var hc,
  xD,
  bD,
  s6 = T(() => {
    sn();
    (hc = Ln()), (xD = Math.PI / 3), (bD = (Math.PI * 2) / 3);
  });
function d6(e) {
  return (
    (e = Math.max(0, Math.min(1, e))),
    "rgb(" +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            34.61 +
              e *
                (1172.33 -
                  e *
                    (10793.56 -
                      e * (33300.12 - e * (38394.49 - e * 14825.05)))),
          ),
        ),
      ) +
      ", " +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            23.31 +
              e *
                (557.33 +
                  e * (1225.33 - e * (3574.96 - e * (1073.77 + e * 707.56)))),
          ),
        ),
      ) +
      ", " +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            27.2 +
              e *
                (3211.1 -
                  e * (15327.97 - e * (27814 - e * (22569.18 - e * 6838.66)))),
          ),
        ),
      ) +
      ")"
  );
}
var m6 = T(() => {});
function pc(e) {
  var t = e.length;
  return function (r) {
    return e[Math.max(0, Math.min(t - 1, Math.floor(r * t)))];
  };
}
var h6,
  p6,
  g6,
  v6,
  x6 = T(() => {
    ke();
    (h6 = pc(
      se(
        "44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725",
      ),
    )),
      (p6 = pc(
        se(
          "00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf",
        ),
      )),
      (g6 = pc(
        se(
          "00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4",
        ),
      )),
      (v6 = pc(
        se(
          "0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921",
        ),
      ));
  });
var b6 = {};
At(b6, {
  interpolateBlues: () => W5,
  interpolateBrBG: () => r5,
  interpolateBuGn: () => y5,
  interpolateBuPu: () => _5,
  interpolateCividis: () => r6,
  interpolateCool: () => u6,
  interpolateCubehelixDefault: () => a6,
  interpolateGnBu: () => M5,
  interpolateGreens: () => G5,
  interpolateGreys: () => X5,
  interpolateInferno: () => g6,
  interpolateMagma: () => p6,
  interpolateOrRd: () => k5,
  interpolateOranges: () => e6,
  interpolatePRGn: () => a5,
  interpolatePiYG: () => i5,
  interpolatePlasma: () => v6,
  interpolatePuBu: () => N5,
  interpolatePuBuGn: () => T5,
  interpolatePuOr: () => f5,
  interpolatePuRd: () => E5,
  interpolatePurples: () => Q5,
  interpolateRainbow: () => f6,
  interpolateRdBu: () => c5,
  interpolateRdGy: () => d5,
  interpolateRdPu: () => z5,
  interpolateRdYlBu: () => h5,
  interpolateRdYlGn: () => g5,
  interpolateReds: () => Z5,
  interpolateSinebow: () => c6,
  interpolateSpectral: () => x5,
  interpolateTurbo: () => d6,
  interpolateViridis: () => h6,
  interpolateWarm: () => i6,
  interpolateYlGn: () => O5,
  interpolateYlGnBu: () => R5,
  interpolateYlOrBr: () => F5,
  interpolateYlOrRd: () => Y5,
  schemeAccent: () => O8,
  schemeBlues: () => bg,
  schemeBrBG: () => Zp,
  schemeBuGn: () => ug,
  schemeBuPu: () => fg,
  schemeCategory10: () => R8,
  schemeDark2: () => F8,
  schemeGnBu: () => lg,
  schemeGreens: () => yg,
  schemeGreys: () => wg,
  schemeOrRd: () => cg,
  schemeOranges: () => Mg,
  schemePRGn: () => Jp,
  schemePaired: () => Y8,
  schemePastel1: () => W8,
  schemePastel2: () => G8,
  schemePiYG: () => eg,
  schemePuBu: () => dg,
  schemePuBuGn: () => sg,
  schemePuOr: () => tg,
  schemePuRd: () => mg,
  schemePurples: () => _g,
  schemeRdBu: () => rg,
  schemeRdGy: () => ng,
  schemeRdPu: () => hg,
  schemeRdYlBu: () => ag,
  schemeRdYlGn: () => og,
  schemeReds: () => Sg,
  schemeSet1: () => X8,
  schemeSet2: () => Q8,
  schemeSet3: () => Z8,
  schemeSpectral: () => ig,
  schemeTableau10: () => e5,
  schemeYlGn: () => gg,
  schemeYlGnBu: () => pg,
  schemeYlOrBr: () => vg,
  schemeYlOrRd: () => xg,
});
var Ag = T(() => {
  L8();
  B8();
  H8();
  q8();
  $8();
  U8();
  j8();
  K8();
  J8();
  t5();
  n5();
  o5();
  u5();
  l5();
  s5();
  m5();
  p5();
  v5();
  b5();
  w5();
  S5();
  A5();
  C5();
  V5();
  D5();
  I5();
  P5();
  L5();
  B5();
  H5();
  q5();
  $5();
  U5();
  j5();
  K5();
  J5();
  t6();
  n6();
  o6();
  l6();
  s6();
  m6();
  x6();
});
function w6() {
  for (var e = 0, t = arguments.length, r = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in r || /[\s.]/.test(n))
      throw new Error("illegal type: " + n);
    r[n] = [];
  }
  return new gc(r);
}
function gc(e) {
  this._ = e;
}
function wD(e, t) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (r) {
      var n = "",
        a = r.indexOf(".");
      if (
        (a >= 0 && ((n = r.slice(a + 1)), (r = r.slice(0, a))),
        r && !t.hasOwnProperty(r))
      )
        throw new Error("unknown type: " + r);
      return { type: r, name: n };
    });
}
function _D(e, t) {
  for (var r = 0, n = e.length, a; r < n; ++r)
    if ((a = e[r]).name === t) return a.value;
}
function y6(e, t, r) {
  for (var n = 0, a = e.length; n < a; ++n)
    if (e[n].name === t) {
      (e[n] = yD), (e = e.slice(0, n).concat(e.slice(n + 1)));
      break;
    }
  return r != null && e.push({ name: t, value: r }), e;
}
var yD,
  Xr,
  _6 = T(() => {
    yD = { value: () => {} };
    gc.prototype = w6.prototype = {
      constructor: gc,
      on: function (e, t) {
        var r = this._,
          n = wD(e + "", r),
          a,
          o = -1,
          i = n.length;
        if (arguments.length < 2) {
          for (; ++o < i; )
            if ((a = (e = n[o]).type) && (a = _D(r[a], e.name))) return a;
          return;
        }
        if (t != null && typeof t != "function")
          throw new Error("invalid callback: " + t);
        for (; ++o < i; )
          if ((a = (e = n[o]).type)) r[a] = y6(r[a], e.name, t);
          else if (t == null) for (a in r) r[a] = y6(r[a], e.name, null);
        return this;
      },
      copy: function () {
        var e = {},
          t = this._;
        for (var r in t) e[r] = t[r].slice();
        return new gc(e);
      },
      call: function (e, t) {
        if ((a = arguments.length - 2) > 0)
          for (var r = new Array(a), n = 0, a, o; n < a; ++n)
            r[n] = arguments[n + 2];
        if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
        for (o = this._[e], n = 0, a = o.length; n < a; ++n)
          o[n].value.apply(t, r);
      },
      apply: function (e, t, r) {
        if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
        for (var n = this._[e], a = 0, o = n.length; a < o; ++a)
          n[a].value.apply(t, r);
      },
    };
    Xr = w6;
  });
var S6 = {};
At(S6, { dispatch: () => Xr });
var Ga = T(() => {
  _6();
});
function vc(e) {
  e.stopImmediatePropagation();
}
function Un(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
var M6,
  Ua,
  kg = T(() => {
    (M6 = { passive: !1 }), (Ua = { capture: !0, passive: !1 });
  });
function Xa(e) {
  var t = e.document.documentElement,
    r = fe(e).on("dragstart.drag", Un, Ua);
  "onselectstart" in t
    ? r.on("selectstart.drag", Un, Ua)
    : ((t.__noselect = t.style.MozUserSelect),
      (t.style.MozUserSelect = "none"));
}
function ja(e, t) {
  var r = e.document.documentElement,
    n = fe(e).on("dragstart.drag", null);
  t &&
    (n.on("click.drag", Un, Ua),
    setTimeout(function () {
      n.on("click.drag", null);
    }, 0)),
    "onselectstart" in r
      ? n.on("selectstart.drag", null)
      : ((r.style.MozUserSelect = r.__noselect), delete r.__noselect);
}
var Cg = T(() => {
  Nt();
  kg();
});
var Hu,
  A6 = T(() => {
    Hu = (e) => () => e;
  });
function Yu(
  e,
  {
    sourceEvent: t,
    subject: r,
    target: n,
    identifier: a,
    active: o,
    x: i,
    y: u,
    dx: l,
    dy: s,
    dispatch: h,
  },
) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: r, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    identifier: { value: a, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: i, enumerable: !0, configurable: !0 },
    y: { value: u, enumerable: !0, configurable: !0 },
    dx: { value: l, enumerable: !0, configurable: !0 },
    dy: { value: s, enumerable: !0, configurable: !0 },
    _: { value: h },
  });
}
var k6 = T(() => {
  Yu.prototype.on = function () {
    var e = this._.on.apply(this._, arguments);
    return e === this._ ? this : e;
  };
});
function SD(e) {
  return !e.ctrlKey && !e.button;
}
function MD() {
  return this.parentNode;
}
function AD(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function kD() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ui() {
  var e = SD,
    t = MD,
    r = AD,
    n = kD,
    a = {},
    o = Xr("start", "drag", "end"),
    i = 0,
    u,
    l,
    s,
    h,
    y = 0;
  function x(R) {
    R.on("mousedown.drag", M)
      .filter(n)
      .on("touchstart.drag", k)
      .on("touchmove.drag", D, M6)
      .on("touchend.drag touchcancel.drag", B)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function M(R, I) {
    if (!(h || !e.call(this, R, I))) {
      var L = F(this, t.call(this, R, I), R, I, "mouse");
      !L ||
        (fe(R.view).on("mousemove.drag", A, Ua).on("mouseup.drag", N, Ua),
        Xa(R.view),
        vc(R),
        (s = !1),
        (u = R.clientX),
        (l = R.clientY),
        L("start", R));
    }
  }
  function A(R) {
    if ((Un(R), !s)) {
      var I = R.clientX - u,
        L = R.clientY - l;
      s = I * I + L * L > y;
    }
    a.mouse("drag", R);
  }
  function N(R) {
    fe(R.view).on("mousemove.drag mouseup.drag", null),
      ja(R.view, s),
      Un(R),
      a.mouse("end", R);
  }
  function k(R, I) {
    if (!!e.call(this, R, I)) {
      var L = R.changedTouches,
        $ = t.call(this, R, I),
        G = L.length,
        ue,
        ne;
      for (ue = 0; ue < G; ++ue)
        (ne = F(this, $, R, I, L[ue].identifier, L[ue])) &&
          (vc(R), ne("start", R, L[ue]));
    }
  }
  function D(R) {
    var I = R.changedTouches,
      L = I.length,
      $,
      G;
    for ($ = 0; $ < L; ++$)
      (G = a[I[$].identifier]) && (Un(R), G("drag", R, I[$]));
  }
  function B(R) {
    var I = R.changedTouches,
      L = I.length,
      $,
      G;
    for (
      h && clearTimeout(h),
        h = setTimeout(function () {
          h = null;
        }, 500),
        $ = 0;
      $ < L;
      ++$
    )
      (G = a[I[$].identifier]) && (vc(R), G("end", R, I[$]));
  }
  function F(R, I, L, $, G, ue) {
    var ne = o.copy(),
      U = dt(ue || L, I),
      ae,
      J,
      H;
    if (
      (H = r.call(
        R,
        new Yu("beforestart", {
          sourceEvent: L,
          target: x,
          identifier: G,
          active: i,
          x: U[0],
          y: U[1],
          dx: 0,
          dy: 0,
          dispatch: ne,
        }),
        $,
      )) != null
    )
      return (
        (ae = H.x - U[0] || 0),
        (J = H.y - U[1] || 0),
        function ee(j, X, K) {
          var Z = U,
            te;
          switch (j) {
            case "start":
              (a[G] = ee), (te = i++);
              break;
            case "end":
              delete a[G], --i;
            case "drag":
              (U = dt(K || X, I)), (te = i);
              break;
          }
          ne.call(
            j,
            R,
            new Yu(j, {
              sourceEvent: X,
              subject: H,
              target: x,
              identifier: G,
              active: te,
              x: U[0] + ae,
              y: U[1] + J,
              dx: U[0] - Z[0],
              dy: U[1] - Z[1],
              dispatch: ne,
            }),
            $,
          );
        }
      );
  }
  return (
    (x.filter = function (R) {
      return arguments.length
        ? ((e = typeof R == "function" ? R : Hu(!!R)), x)
        : e;
    }),
    (x.container = function (R) {
      return arguments.length
        ? ((t = typeof R == "function" ? R : Hu(R)), x)
        : t;
    }),
    (x.subject = function (R) {
      return arguments.length
        ? ((r = typeof R == "function" ? R : Hu(R)), x)
        : r;
    }),
    (x.touchable = function (R) {
      return arguments.length
        ? ((n = typeof R == "function" ? R : Hu(!!R)), x)
        : n;
    }),
    (x.on = function () {
      var R = o.on.apply(o, arguments);
      return R === o ? x : R;
    }),
    (x.clickDistance = function (R) {
      return arguments.length ? ((y = (R = +R) * R), x) : Math.sqrt(y);
    }),
    x
  );
}
var C6 = T(() => {
  Ga();
  Nt();
  Cg();
  kg();
  A6();
  k6();
});
var xc = T(() => {
  C6();
  Cg();
});
function Xu() {
  return Qa || (N6(CD), (Qa = Gu.now() + wc));
}
function CD() {
  Qa = 0;
}
function Uu() {
  this._call = this._time = this._next = null;
}
function _c(e, t, r) {
  var n = new Uu();
  return n.restart(e, t, r), n;
}
function D6() {
  Xu(), ++fi;
  for (var e = bc, t; e; )
    (t = Qa - e._time) >= 0 && e._call.call(void 0, t), (e = e._next);
  --fi;
}
function T6() {
  (Qa = (yc = Gu.now()) + wc), (fi = Wu = 0);
  try {
    D6();
  } finally {
    (fi = 0), VD(), (Qa = 0);
  }
}
function TD() {
  var e = Gu.now(),
    t = e - yc;
  t > V6 && ((wc -= t), (yc = e));
}
function VD() {
  for (var e, t = bc, r, n = 1 / 0; t; )
    t._call
      ? (n > t._time && (n = t._time), (e = t), (t = t._next))
      : ((r = t._next), (t._next = null), (t = e ? (e._next = r) : (bc = r)));
  ($u = e), Tg(n);
}
function Tg(e) {
  if (!fi) {
    Wu && (Wu = clearTimeout(Wu));
    var t = e - Qa;
    t > 24
      ? (e < 1 / 0 && (Wu = setTimeout(T6, e - Gu.now() - wc)),
        qu && (qu = clearInterval(qu)))
      : (qu || ((yc = Gu.now()), (qu = setInterval(TD, V6))), (fi = 1), N6(T6));
  }
}
var fi,
  Wu,
  qu,
  V6,
  bc,
  $u,
  yc,
  Qa,
  wc,
  Gu,
  N6,
  Vg = T(() => {
    (fi = 0),
      (Wu = 0),
      (qu = 0),
      (V6 = 1e3),
      (yc = 0),
      (Qa = 0),
      (wc = 0),
      (Gu =
        typeof performance == "object" && performance.now ? performance : Date),
      (N6 =
        typeof window == "object" && window.requestAnimationFrame
          ? window.requestAnimationFrame.bind(window)
          : function (e) {
              setTimeout(e, 17);
            });
    Uu.prototype = _c.prototype = {
      constructor: Uu,
      restart: function (e, t, r) {
        if (typeof e != "function")
          throw new TypeError("callback is not a function");
        (r = (r == null ? Xu() : +r) + (t == null ? 0 : +t)),
          !this._next &&
            $u !== this &&
            ($u ? ($u._next = this) : (bc = this), ($u = this)),
          (this._call = e),
          (this._time = r),
          Tg();
      },
      stop: function () {
        this._call && ((this._call = null), (this._time = 1 / 0), Tg());
      },
    };
  });
function Sc(e, t, r) {
  var n = new Uu();
  return (
    (t = t == null ? 0 : +t),
    n.restart(
      (a) => {
        n.stop(), e(a + t);
      },
      t,
      r,
    ),
    n
  );
}
var E6 = T(() => {
  Vg();
});
var Mc = T(() => {
  Vg();
  E6();
});
function Xn(e, t, r, n, a, o) {
  var i = e.__transition;
  if (!i) e.__transition = {};
  else if (r in i) return;
  ED(e, r, {
    name: t,
    index: n,
    group: a,
    on: ND,
    tween: DD,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: P6,
  });
}
function Qu(e, t) {
  var r = ft(e, t);
  if (r.state > P6) throw new Error("too late; already scheduled");
  return r;
}
function St(e, t) {
  var r = ft(e, t);
  if (r.state > Ac) throw new Error("too late; already running");
  return r;
}
function ft(e, t) {
  var r = e.__transition;
  if (!r || !(r = r[t])) throw new Error("transition not found");
  return r;
}
function ED(e, t, r) {
  var n = e.__transition,
    a;
  (n[t] = r), (r.timer = _c(o, 0, r.time));
  function o(s) {
    (r.state = I6),
      r.timer.restart(i, r.delay, r.time),
      r.delay <= s && i(s - r.delay);
  }
  function i(s) {
    var h, y, x, M;
    if (r.state !== I6) return l();
    for (h in n)
      if (((M = n[h]), M.name === r.name)) {
        if (M.state === Ac) return Sc(i);
        M.state === z6
          ? ((M.state = ju),
            M.timer.stop(),
            M.on.call("interrupt", e, e.__data__, M.index, M.group),
            delete n[h])
          : +h < t &&
            ((M.state = ju),
            M.timer.stop(),
            M.on.call("cancel", e, e.__data__, M.index, M.group),
            delete n[h]);
      }
    if (
      (Sc(function () {
        r.state === Ac &&
          ((r.state = z6), r.timer.restart(u, r.delay, r.time), u(s));
      }),
      (r.state = kc),
      r.on.call("start", e, e.__data__, r.index, r.group),
      r.state === kc)
    ) {
      for (
        r.state = Ac, a = new Array((x = r.tween.length)), h = 0, y = -1;
        h < x;
        ++h
      )
        (M = r.tween[h].value.call(e, e.__data__, r.index, r.group)) &&
          (a[++y] = M);
      a.length = y + 1;
    }
  }
  function u(s) {
    for (
      var h =
          s < r.duration
            ? r.ease.call(null, s / r.duration)
            : (r.timer.restart(l), (r.state = Cc), 1),
        y = -1,
        x = a.length;
      ++y < x;

    )
      a[y].call(e, h);
    r.state === Cc && (r.on.call("end", e, e.__data__, r.index, r.group), l());
  }
  function l() {
    (r.state = ju), r.timer.stop(), delete n[t];
    for (var s in n) return;
    delete e.__transition;
  }
}
var ND,
  DD,
  P6,
  I6,
  kc,
  Ac,
  z6,
  Cc,
  ju,
  Xt = T(() => {
    Ga();
    Mc();
    (ND = Xr("start", "end", "cancel", "interrupt")),
      (DD = []),
      (P6 = 0),
      (I6 = 1),
      (kc = 2),
      (Ac = 3),
      (z6 = 4),
      (Cc = 5),
      (ju = 6);
  });
function jr(e, t) {
  var r = e.__transition,
    n,
    a,
    o = !0,
    i;
  if (!!r) {
    t = t == null ? null : t + "";
    for (i in r) {
      if ((n = r[i]).name !== t) {
        o = !1;
        continue;
      }
      (a = n.state > kc && n.state < Cc),
        (n.state = ju),
        n.timer.stop(),
        n.on.call(a ? "interrupt" : "cancel", e, e.__data__, n.index, n.group),
        delete r[i];
    }
    o && delete e.__transition;
  }
}
var Ng = T(() => {
  Xt();
});
function R6(e) {
  return this.each(function () {
    jr(this, e);
  });
}
var L6 = T(() => {
  Ng();
});
function ID(e, t) {
  var r, n;
  return function () {
    var a = St(this, e),
      o = a.tween;
    if (o !== r) {
      n = r = o;
      for (var i = 0, u = n.length; i < u; ++i)
        if (n[i].name === t) {
          (n = n.slice()), n.splice(i, 1);
          break;
        }
    }
    a.tween = n;
  };
}
function zD(e, t, r) {
  var n, a;
  if (typeof r != "function") throw new Error();
  return function () {
    var o = St(this, e),
      i = o.tween;
    if (i !== n) {
      a = (n = i).slice();
      for (var u = { name: t, value: r }, l = 0, s = a.length; l < s; ++l)
        if (a[l].name === t) {
          a[l] = u;
          break;
        }
      l === s && a.push(u);
    }
    o.tween = a;
  };
}
function O6(e, t) {
  var r = this._id;
  if (((e += ""), arguments.length < 2)) {
    for (var n = ft(this.node(), r).tween, a = 0, o = n.length, i; a < o; ++a)
      if ((i = n[a]).name === e) return i.value;
    return null;
  }
  return this.each((t == null ? ID : zD)(r, e, t));
}
function li(e, t, r) {
  var n = e._id;
  return (
    e.each(function () {
      var a = St(this, n);
      (a.value || (a.value = {}))[t] = r.apply(this, arguments);
    }),
    function (a) {
      return ft(a, n).value[t];
    }
  );
}
var Ku = T(() => {
  Xt();
});
function Tc(e, t) {
  var r;
  return (
    typeof t == "number"
      ? wt
      : t instanceof Tt
      ? Ca
      : (r = Tt(t))
      ? ((t = r), Ca)
      : mu
  )(e, t);
}
var Dg = T(() => {
  sn();
  Zt();
});
function PD(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function RD(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function LD(e, t, r) {
  var n,
    a = r + "",
    o;
  return function () {
    var i = this.getAttribute(e);
    return i === a ? null : i === n ? o : (o = t((n = i), r));
  };
}
function OD(e, t, r) {
  var n,
    a = r + "",
    o;
  return function () {
    var i = this.getAttributeNS(e.space, e.local);
    return i === a ? null : i === n ? o : (o = t((n = i), r));
  };
}
function BD(e, t, r) {
  var n, a, o;
  return function () {
    var i,
      u = r(this),
      l;
    return u == null
      ? void this.removeAttribute(e)
      : ((i = this.getAttribute(e)),
        (l = u + ""),
        i === l
          ? null
          : i === n && l === a
          ? o
          : ((a = l), (o = t((n = i), u))));
  };
}
function FD(e, t, r) {
  var n, a, o;
  return function () {
    var i,
      u = r(this),
      l;
    return u == null
      ? void this.removeAttributeNS(e.space, e.local)
      : ((i = this.getAttributeNS(e.space, e.local)),
        (l = u + ""),
        i === l
          ? null
          : i === n && l === a
          ? o
          : ((a = l), (o = t((n = i), u))));
  };
}
function B6(e, t) {
  var r = Gr(e),
    n = r === "transform" ? jm : Tc;
  return this.attrTween(
    e,
    typeof t == "function"
      ? (r.local ? FD : BD)(r, n, li(this, "attr." + e, t))
      : t == null
      ? (r.local ? RD : PD)(r)
      : (r.local ? OD : LD)(r, n, t),
  );
}
var F6 = T(() => {
  Zt();
  Nt();
  Ku();
  Dg();
});
function HD(e, t) {
  return function (r) {
    this.setAttribute(e, t.call(this, r));
  };
}
function YD(e, t) {
  return function (r) {
    this.setAttributeNS(e.space, e.local, t.call(this, r));
  };
}
function qD(e, t) {
  var r, n;
  function a() {
    var o = t.apply(this, arguments);
    return o !== n && (r = (n = o) && YD(e, o)), r;
  }
  return (a._value = t), a;
}
function WD(e, t) {
  var r, n;
  function a() {
    var o = t.apply(this, arguments);
    return o !== n && (r = (n = o) && HD(e, o)), r;
  }
  return (a._value = t), a;
}
function H6(e, t) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  var n = Gr(e);
  return this.tween(r, (n.local ? qD : WD)(n, t));
}
var Y6 = T(() => {
  Nt();
});
function $D(e, t) {
  return function () {
    Qu(this, e).delay = +t.apply(this, arguments);
  };
}
function GD(e, t) {
  return (
    (t = +t),
    function () {
      Qu(this, e).delay = t;
    }
  );
}
function q6(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? $D : GD)(t, e))
    : ft(this.node(), t).delay;
}
var W6 = T(() => {
  Xt();
});
function UD(e, t) {
  return function () {
    St(this, e).duration = +t.apply(this, arguments);
  };
}
function XD(e, t) {
  return (
    (t = +t),
    function () {
      St(this, e).duration = t;
    }
  );
}
function $6(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? UD : XD)(t, e))
    : ft(this.node(), t).duration;
}
var G6 = T(() => {
  Xt();
});
function jD(e, t) {
  if (typeof t != "function") throw new Error();
  return function () {
    St(this, e).ease = t;
  };
}
function U6(e) {
  var t = this._id;
  return arguments.length ? this.each(jD(t, e)) : ft(this.node(), t).ease;
}
var X6 = T(() => {
  Xt();
});
function QD(e, t) {
  return function () {
    var r = t.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    St(this, e).ease = r;
  };
}
function j6(e) {
  if (typeof e != "function") throw new Error();
  return this.each(QD(this._id, e));
}
var Q6 = T(() => {
  Xt();
});
function K6(e) {
  typeof e != "function" && (e = qo(e));
  for (var t = this._groups, r = t.length, n = new Array(r), a = 0; a < r; ++a)
    for (var o = t[a], i = o.length, u = (n[a] = []), l, s = 0; s < i; ++s)
      (l = o[s]) && e.call(l, l.__data__, s, o) && u.push(l);
  return new Ht(n, this._parents, this._name, this._id);
}
var Z6 = T(() => {
  Nt();
  Ka();
});
function J6(e) {
  if (e._id !== this._id) throw new Error();
  for (
    var t = this._groups,
      r = e._groups,
      n = t.length,
      a = r.length,
      o = Math.min(n, a),
      i = new Array(n),
      u = 0;
    u < o;
    ++u
  )
    for (
      var l = t[u], s = r[u], h = l.length, y = (i[u] = new Array(h)), x, M = 0;
      M < h;
      ++M
    )
      (x = l[M] || s[M]) && (y[M] = x);
  for (; u < n; ++u) i[u] = t[u];
  return new Ht(i, this._parents, this._name, this._id);
}
var e4 = T(() => {
  Ka();
});
function KD(e) {
  return (e + "")
    .trim()
    .split(/^|\s+/)
    .every(function (t) {
      var r = t.indexOf(".");
      return r >= 0 && (t = t.slice(0, r)), !t || t === "start";
    });
}
function ZD(e, t, r) {
  var n,
    a,
    o = KD(t) ? Qu : St;
  return function () {
    var i = o(this, e),
      u = i.on;
    u !== n && (a = (n = u).copy()).on(t, r), (i.on = a);
  };
}
function t4(e, t) {
  var r = this._id;
  return arguments.length < 2
    ? ft(this.node(), r).on.on(e)
    : this.each(ZD(r, e, t));
}
var r4 = T(() => {
  Xt();
});
function JD(e) {
  return function () {
    var t = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    t && t.removeChild(this);
  };
}
function n4() {
  return this.on("end.remove", JD(this._id));
}
var a4 = T(() => {});
function o4(e) {
  var t = this._name,
    r = this._id;
  typeof e != "function" && (e = Hn(e));
  for (var n = this._groups, a = n.length, o = new Array(a), i = 0; i < a; ++i)
    for (
      var u = n[i], l = u.length, s = (o[i] = new Array(l)), h, y, x = 0;
      x < l;
      ++x
    )
      (h = u[x]) &&
        (y = e.call(h, h.__data__, x, u)) &&
        ("__data__" in h && (y.__data__ = h.__data__),
        (s[x] = y),
        Xn(s[x], t, r, x, s, ft(h, r)));
  return new Ht(o, this._parents, t, r);
}
var i4 = T(() => {
  Nt();
  Ka();
  Xt();
});
function u4(e) {
  var t = this._name,
    r = this._id;
  typeof e != "function" && (e = Yo(e));
  for (var n = this._groups, a = n.length, o = [], i = [], u = 0; u < a; ++u)
    for (var l = n[u], s = l.length, h, y = 0; y < s; ++y)
      if ((h = l[y])) {
        for (
          var x = e.call(h, h.__data__, y, l),
            M,
            A = ft(h, r),
            N = 0,
            k = x.length;
          N < k;
          ++N
        )
          (M = x[N]) && Xn(M, t, r, N, x, A);
        o.push(x), i.push(h);
      }
  return new Ht(o, i, t, r);
}
var f4 = T(() => {
  Nt();
  Ka();
  Xt();
});
function l4() {
  return new eE(this._groups, this._parents);
}
var eE,
  c4 = T(() => {
    Nt();
    eE = Ur.prototype.constructor;
  });
function tE(e, t) {
  var r, n, a;
  return function () {
    var o = bn(this, e),
      i = (this.style.removeProperty(e), bn(this, e));
    return o === i ? null : o === r && i === n ? a : (a = t((r = o), (n = i)));
  };
}
function s4(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function rE(e, t, r) {
  var n,
    a = r + "",
    o;
  return function () {
    var i = bn(this, e);
    return i === a ? null : i === n ? o : (o = t((n = i), r));
  };
}
function nE(e, t, r) {
  var n, a, o;
  return function () {
    var i = bn(this, e),
      u = r(this),
      l = u + "";
    return (
      u == null && (l = u = (this.style.removeProperty(e), bn(this, e))),
      i === l ? null : i === n && l === a ? o : ((a = l), (o = t((n = i), u)))
    );
  };
}
function aE(e, t) {
  var r,
    n,
    a,
    o = "style." + t,
    i = "end." + o,
    u;
  return function () {
    var l = St(this, e),
      s = l.on,
      h = l.value[o] == null ? u || (u = s4(t)) : void 0;
    (s !== r || a !== h) && (n = (r = s).copy()).on(i, (a = h)), (l.on = n);
  };
}
function d4(e, t, r) {
  var n = (e += "") == "transform" ? Xm : Tc;
  return t == null
    ? this.styleTween(e, tE(e, n)).on("end.style." + e, s4(e))
    : typeof t == "function"
    ? this.styleTween(e, nE(e, n, li(this, "style." + e, t))).each(
        aE(this._id, e),
      )
    : this.styleTween(e, rE(e, n, t), r).on("end.style." + e, null);
}
var m4 = T(() => {
  Zt();
  Nt();
  Xt();
  Ku();
  Dg();
});
function oE(e, t, r) {
  return function (n) {
    this.style.setProperty(e, t.call(this, n), r);
  };
}
function iE(e, t, r) {
  var n, a;
  function o() {
    var i = t.apply(this, arguments);
    return i !== a && (n = (a = i) && oE(e, i, r)), n;
  }
  return (o._value = t), o;
}
function h4(e, t, r) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, iE(e, t, r ?? ""));
}
var p4 = T(() => {});
function uE(e) {
  return function () {
    this.textContent = e;
  };
}
function fE(e) {
  return function () {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function g4(e) {
  return this.tween(
    "text",
    typeof e == "function"
      ? fE(li(this, "text", e))
      : uE(e == null ? "" : e + ""),
  );
}
var v4 = T(() => {
  Ku();
});
function lE(e) {
  return function (t) {
    this.textContent = e.call(this, t);
  };
}
function cE(e) {
  var t, r;
  function n() {
    var a = e.apply(this, arguments);
    return a !== r && (t = (r = a) && lE(a)), t;
  }
  return (n._value = e), n;
}
function x4(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, cE(e));
}
var b4 = T(() => {});
function y4() {
  for (
    var e = this._name,
      t = this._id,
      r = Vc(),
      n = this._groups,
      a = n.length,
      o = 0;
    o < a;
    ++o
  )
    for (var i = n[o], u = i.length, l, s = 0; s < u; ++s)
      if ((l = i[s])) {
        var h = ft(l, t);
        Xn(l, e, r, s, i, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease,
        });
      }
  return new Ht(n, this._parents, e, r);
}
var w4 = T(() => {
  Ka();
  Xt();
});
function _4() {
  var e,
    t,
    r = this,
    n = r._id,
    a = r.size();
  return new Promise(function (o, i) {
    var u = { value: i },
      l = {
        value: function () {
          --a === 0 && o();
        },
      };
    r.each(function () {
      var s = St(this, n),
        h = s.on;
      h !== e &&
        ((t = (e = h).copy()),
        t._.cancel.push(u),
        t._.interrupt.push(u),
        t._.end.push(l)),
        (s.on = t);
    }),
      a === 0 && o();
  });
}
var S4 = T(() => {
  Xt();
});
function Ht(e, t, r, n) {
  (this._groups = e), (this._parents = t), (this._name = r), (this._id = n);
}
function M4(e) {
  return Ur().transition(e);
}
function Vc() {
  return ++sE;
}
var sE,
  yn,
  Ka = T(() => {
    Nt();
    F6();
    Y6();
    W6();
    G6();
    X6();
    Q6();
    Z6();
    e4();
    r4();
    a4();
    i4();
    f4();
    c4();
    m4();
    p4();
    v4();
    b4();
    w4();
    Ku();
    S4();
    sE = 0;
    yn = Ur.prototype;
    Ht.prototype = M4.prototype = {
      constructor: Ht,
      select: o4,
      selectAll: u4,
      selectChild: yn.selectChild,
      selectChildren: yn.selectChildren,
      filter: K6,
      merge: J6,
      selection: l4,
      transition: y4,
      call: yn.call,
      nodes: yn.nodes,
      node: yn.node,
      size: yn.size,
      empty: yn.empty,
      each: yn.each,
      on: t4,
      attr: B6,
      attrTween: H6,
      style: d4,
      styleTween: h4,
      text: g4,
      textTween: x4,
      remove: n4,
      tween: O6,
      delay: q6,
      duration: $6,
      ease: U6,
      easeVarying: j6,
      end: _4,
      [Symbol.iterator]: yn[Symbol.iterator],
    };
  });
function Nc(e) {
  return --e * e * e + 1;
}
function Dc(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var A4 = T(() => {});
var Eg = T(() => {
  A4();
});
function mE(e, t) {
  for (var r; !(r = e.__transition) || !(r = r[t]); )
    if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
  return r;
}
function k4(e) {
  var t, r;
  e instanceof Ht
    ? ((t = e._id), (e = e._name))
    : ((t = Vc()), ((r = dE).time = Xu()), (e = e == null ? null : e + ""));
  for (var n = this._groups, a = n.length, o = 0; o < a; ++o)
    for (var i = n[o], u = i.length, l, s = 0; s < u; ++s)
      (l = i[s]) && Xn(l, e, t, s, i, r || mE(l, t));
  return new Ht(n, this._parents, e, t);
}
var dE,
  C4 = T(() => {
    Ka();
    Xt();
    Eg();
    Mc();
    dE = { time: null, delay: 0, duration: 250, ease: Dc };
  });
var T4 = T(() => {
  Nt();
  L6();
  C4();
  Ur.prototype.interrupt = R6;
  Ur.prototype.transition = k4;
});
var Ec = T(() => {
  T4();
  Ng();
});
var Ic,
  V4 = T(() => {
    Ic = (e) => () => e;
  });
function Ig(
  e,
  { sourceEvent: t, target: r, selection: n, mode: a, dispatch: o },
) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    selection: { value: n, enumerable: !0, configurable: !0 },
    mode: { value: a, enumerable: !0, configurable: !0 },
    _: { value: o },
  });
}
var N4 = T(() => {});
function D4(e) {
  e.stopImmediatePropagation();
}
function zc(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
var E4 = T(() => {});
function P4(e) {
  return [+e[0], +e[1]];
}
function Rg(e) {
  return [P4(e[0]), P4(e[1])];
}
function Zu(e) {
  return { type: e };
}
function vE(e) {
  return !e.ctrlKey && !e.button;
}
function xE() {
  var e = this.ownerSVGElement || this;
  return e.hasAttribute("viewBox")
    ? ((e = e.viewBox.baseVal),
      [
        [e.x, e.y],
        [e.x + e.width, e.y + e.height],
      ])
    : [
        [0, 0],
        [e.width.baseVal.value, e.height.baseVal.value],
      ];
}
function bE() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Pg(e) {
  for (; !e.__brush; ) if (!(e = e.parentNode)) return;
  return e.__brush;
}
function yE(e) {
  return e[0][0] === e[1][0] || e[0][1] === e[1][1];
}
function O4(e) {
  var t = e.__brush;
  return t ? t.dim.output(t.selection) : null;
}
function B4() {
  return Lg(Pc);
}
function F4() {
  return Lg(Rc);
}
function H4() {
  return Lg(hE);
}
function Lg(e) {
  var t = xE,
    r = vE,
    n = bE,
    a = !0,
    o = Xr("start", "brush", "end"),
    i = 6,
    u;
  function l(k) {
    var D = k
      .property("__brush", N)
      .selectAll(".overlay")
      .data([Zu("overlay")]);
    D.enter()
      .append("rect")
      .attr("class", "overlay")
      .attr("pointer-events", "all")
      .attr("cursor", wn.overlay)
      .merge(D)
      .each(function () {
        var F = Pg(this).extent;
        fe(this)
          .attr("x", F[0][0])
          .attr("y", F[0][1])
          .attr("width", F[1][0] - F[0][0])
          .attr("height", F[1][1] - F[0][1]);
      }),
      k
        .selectAll(".selection")
        .data([Zu("selection")])
        .enter()
        .append("rect")
        .attr("class", "selection")
        .attr("cursor", wn.selection)
        .attr("fill", "#777")
        .attr("fill-opacity", 0.3)
        .attr("stroke", "#fff")
        .attr("shape-rendering", "crispEdges");
    var B = k.selectAll(".handle").data(e.handles, function (F) {
      return F.type;
    });
    B.exit().remove(),
      B.enter()
        .append("rect")
        .attr("class", function (F) {
          return "handle handle--" + F.type;
        })
        .attr("cursor", function (F) {
          return wn[F.type];
        }),
      k
        .each(s)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mousedown.brush", x)
        .filter(n)
        .on("touchstart.brush", x)
        .on("touchmove.brush", M)
        .on("touchend.brush touchcancel.brush", A)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  (l.move = function (k, D, B) {
    k.tween
      ? k
          .on("start.brush", function (F) {
            h(this, arguments).beforestart().start(F);
          })
          .on("interrupt.brush end.brush", function (F) {
            h(this, arguments).end(F);
          })
          .tween("brush", function () {
            var F = this,
              R = F.__brush,
              I = h(F, arguments),
              L = R.selection,
              $ = e.input(
                typeof D == "function" ? D.apply(this, arguments) : D,
                R.extent,
              ),
              G = tt(L, $);
            function ue(ne) {
              (R.selection = ne === 1 && $ === null ? null : G(ne)),
                s.call(F),
                I.brush();
            }
            return L !== null && $ !== null ? ue : ue(1);
          })
      : k.each(function () {
          var F = this,
            R = arguments,
            I = F.__brush,
            L = e.input(typeof D == "function" ? D.apply(F, R) : D, I.extent),
            $ = h(F, R).beforestart();
          jr(F),
            (I.selection = L === null ? null : L),
            s.call(F),
            $.start(B).brush(B).end(B);
        });
  }),
    (l.clear = function (k, D) {
      l.move(k, null, D);
    });
  function s() {
    var k = fe(this),
      D = Pg(this).selection;
    D
      ? (k
          .selectAll(".selection")
          .style("display", null)
          .attr("x", D[0][0])
          .attr("y", D[0][1])
          .attr("width", D[1][0] - D[0][0])
          .attr("height", D[1][1] - D[0][1]),
        k
          .selectAll(".handle")
          .style("display", null)
          .attr("x", function (B) {
            return B.type[B.type.length - 1] === "e"
              ? D[1][0] - i / 2
              : D[0][0] - i / 2;
          })
          .attr("y", function (B) {
            return B.type[0] === "s" ? D[1][1] - i / 2 : D[0][1] - i / 2;
          })
          .attr("width", function (B) {
            return B.type === "n" || B.type === "s" ? D[1][0] - D[0][0] + i : i;
          })
          .attr("height", function (B) {
            return B.type === "e" || B.type === "w" ? D[1][1] - D[0][1] + i : i;
          }))
      : k
          .selectAll(".selection,.handle")
          .style("display", "none")
          .attr("x", null)
          .attr("y", null)
          .attr("width", null)
          .attr("height", null);
  }
  function h(k, D, B) {
    var F = k.__brush.emitter;
    return F && (!B || !F.clean) ? F : new y(k, D, B);
  }
  function y(k, D, B) {
    (this.that = k),
      (this.args = D),
      (this.state = k.__brush),
      (this.active = 0),
      (this.clean = B);
  }
  y.prototype = {
    beforestart: function () {
      return (
        ++this.active === 1 &&
          ((this.state.emitter = this), (this.starting = !0)),
        this
      );
    },
    start: function (k, D) {
      return (
        this.starting
          ? ((this.starting = !1), this.emit("start", k, D))
          : this.emit("brush", k),
        this
      );
    },
    brush: function (k, D) {
      return this.emit("brush", k, D), this;
    },
    end: function (k, D) {
      return (
        --this.active === 0 &&
          (delete this.state.emitter, this.emit("end", k, D)),
        this
      );
    },
    emit: function (k, D, B) {
      var F = fe(this.that).datum();
      o.call(
        k,
        this.that,
        new Ig(k, {
          sourceEvent: D,
          target: l,
          selection: e.output(this.state.selection),
          mode: B,
          dispatch: o,
        }),
        F,
      );
    },
  };
  function x(k) {
    if ((u && !k.touches) || !r.apply(this, arguments)) return;
    var D = this,
      B = k.target.__data__.type,
      F =
        (a && k.metaKey ? (B = "overlay") : B) === "selection"
          ? I4
          : a && k.altKey
          ? si
          : ci,
      R = e === Rc ? null : pE[B],
      I = e === Pc ? null : gE[B],
      L = Pg(D),
      $ = L.extent,
      G = L.selection,
      ue = $[0][0],
      ne,
      U,
      ae = $[0][1],
      J,
      H,
      ee = $[1][0],
      j,
      X,
      K = $[1][1],
      Z,
      te,
      le = 0,
      de = 0,
      re,
      me = R && I && a && k.shiftKey,
      Me,
      Oe,
      Ne = Array.from(k.touches || [k], (xe) => {
        let Qe = xe.identifier;
        return (
          (xe = dt(xe, D)), (xe.point0 = xe.slice()), (xe.identifier = Qe), xe
        );
      });
    jr(D);
    var Ue = h(D, arguments, !0).beforestart();
    if (B === "overlay") {
      G && (re = !0);
      let xe = [Ne[0], Ne[1] || Ne[0]];
      (L.selection = G =
        [
          [
            (ne = e === Rc ? ue : Et(xe[0][0], xe[1][0])),
            (J = e === Pc ? ae : Et(xe[0][1], xe[1][1])),
          ],
          [
            (j = e === Rc ? ee : Dt(xe[0][0], xe[1][0])),
            (Z = e === Pc ? K : Dt(xe[0][1], xe[1][1])),
          ],
        ]),
        Ne.length > 1 && Xe(k);
    } else (ne = G[0][0]), (J = G[0][1]), (j = G[1][0]), (Z = G[1][1]);
    (U = ne), (H = J), (X = j), (te = Z);
    var ce = fe(D).attr("pointer-events", "none"),
      _e = ce.selectAll(".overlay").attr("cursor", wn[B]);
    if (k.touches) (Ue.moved = ie), (Ue.ended = Be);
    else {
      var be = fe(k.view)
        .on("mousemove.brush", ie, !0)
        .on("mouseup.brush", Be, !0);
      a && be.on("keydown.brush", vt, !0).on("keyup.brush", nt, !0), Xa(k.view);
    }
    s.call(D), Ue.start(k, F.name);
    function ie(xe) {
      for (let Qe of xe.changedTouches || [xe])
        for (let Cn of Ne)
          Cn.identifier === Qe.identifier && (Cn.cur = dt(Qe, D));
      if (me && !Me && !Oe && Ne.length === 1) {
        let Qe = Ne[0];
        z4(Qe.cur[0] - Qe[0]) > z4(Qe.cur[1] - Qe[1]) ? (Oe = !0) : (Me = !0);
      }
      for (let Qe of Ne) Qe.cur && ((Qe[0] = Qe.cur[0]), (Qe[1] = Qe.cur[1]));
      (re = !0), zc(xe), Xe(xe);
    }
    function Xe(xe) {
      let Qe = Ne[0],
        Cn = Qe.point0;
      var Lt;
      switch (((le = Qe[0] - Cn[0]), (de = Qe[1] - Cn[1]), F)) {
        case zg:
        case I4: {
          R &&
            ((le = Dt(ue - ne, Et(ee - j, le))), (U = ne + le), (X = j + le)),
            I &&
              ((de = Dt(ae - J, Et(K - Z, de))), (H = J + de), (te = Z + de));
          break;
        }
        case ci: {
          Ne[1]
            ? (R &&
                ((U = Dt(ue, Et(ee, Ne[0][0]))),
                (X = Dt(ue, Et(ee, Ne[1][0]))),
                (R = 1)),
              I &&
                ((H = Dt(ae, Et(K, Ne[0][1]))),
                (te = Dt(ae, Et(K, Ne[1][1]))),
                (I = 1)))
            : (R < 0
                ? ((le = Dt(ue - ne, Et(ee - ne, le))), (U = ne + le), (X = j))
                : R > 0 &&
                  ((le = Dt(ue - j, Et(ee - j, le))), (U = ne), (X = j + le)),
              I < 0
                ? ((de = Dt(ae - J, Et(K - J, de))), (H = J + de), (te = Z))
                : I > 0 &&
                  ((de = Dt(ae - Z, Et(K - Z, de))), (H = J), (te = Z + de)));
          break;
        }
        case si: {
          R &&
            ((U = Dt(ue, Et(ee, ne - le * R))),
            (X = Dt(ue, Et(ee, j + le * R)))),
            I &&
              ((H = Dt(ae, Et(K, J - de * I))),
              (te = Dt(ae, Et(K, Z + de * I))));
          break;
        }
      }
      X < U &&
        ((R *= -1),
        (Lt = ne),
        (ne = j),
        (j = Lt),
        (Lt = U),
        (U = X),
        (X = Lt),
        B in R4 && _e.attr("cursor", wn[(B = R4[B])])),
        te < H &&
          ((I *= -1),
          (Lt = J),
          (J = Z),
          (Z = Lt),
          (Lt = H),
          (H = te),
          (te = Lt),
          B in L4 && _e.attr("cursor", wn[(B = L4[B])])),
        L.selection && (G = L.selection),
        Me && ((U = G[0][0]), (X = G[1][0])),
        Oe && ((H = G[0][1]), (te = G[1][1])),
        (G[0][0] !== U || G[0][1] !== H || G[1][0] !== X || G[1][1] !== te) &&
          ((L.selection = [
            [U, H],
            [X, te],
          ]),
          s.call(D),
          Ue.brush(xe, F.name));
    }
    function Be(xe) {
      if ((D4(xe), xe.touches)) {
        if (xe.touches.length) return;
        u && clearTimeout(u),
          (u = setTimeout(function () {
            u = null;
          }, 500));
      } else
        ja(xe.view, re),
          be.on(
            "keydown.brush keyup.brush mousemove.brush mouseup.brush",
            null,
          );
      ce.attr("pointer-events", "all"),
        _e.attr("cursor", wn.overlay),
        L.selection && (G = L.selection),
        yE(G) && ((L.selection = null), s.call(D)),
        Ue.end(xe, F.name);
    }
    function vt(xe) {
      switch (xe.keyCode) {
        case 16: {
          me = R && I;
          break;
        }
        case 18: {
          F === ci &&
            (R && ((j = X - le * R), (ne = U + le * R)),
            I && ((Z = te - de * I), (J = H + de * I)),
            (F = si),
            Xe(xe));
          break;
        }
        case 32: {
          (F === ci || F === si) &&
            (R < 0 ? (j = X - le) : R > 0 && (ne = U - le),
            I < 0 ? (Z = te - de) : I > 0 && (J = H - de),
            (F = zg),
            _e.attr("cursor", wn.selection),
            Xe(xe));
          break;
        }
        default:
          return;
      }
      zc(xe);
    }
    function nt(xe) {
      switch (xe.keyCode) {
        case 16: {
          me && ((Me = Oe = me = !1), Xe(xe));
          break;
        }
        case 18: {
          F === si &&
            (R < 0 ? (j = X) : R > 0 && (ne = U),
            I < 0 ? (Z = te) : I > 0 && (J = H),
            (F = ci),
            Xe(xe));
          break;
        }
        case 32: {
          F === zg &&
            (xe.altKey
              ? (R && ((j = X - le * R), (ne = U + le * R)),
                I && ((Z = te - de * I), (J = H + de * I)),
                (F = si))
              : (R < 0 ? (j = X) : R > 0 && (ne = U),
                I < 0 ? (Z = te) : I > 0 && (J = H),
                (F = ci)),
            _e.attr("cursor", wn[B]),
            Xe(xe));
          break;
        }
        default:
          return;
      }
      zc(xe);
    }
  }
  function M(k) {
    h(this, arguments).moved(k);
  }
  function A(k) {
    h(this, arguments).ended(k);
  }
  function N() {
    var k = this.__brush || { selection: null };
    return (k.extent = Rg(t.apply(this, arguments))), (k.dim = e), k;
  }
  return (
    (l.extent = function (k) {
      return arguments.length
        ? ((t = typeof k == "function" ? k : Ic(Rg(k))), l)
        : t;
    }),
    (l.filter = function (k) {
      return arguments.length
        ? ((r = typeof k == "function" ? k : Ic(!!k)), l)
        : r;
    }),
    (l.touchable = function (k) {
      return arguments.length
        ? ((n = typeof k == "function" ? k : Ic(!!k)), l)
        : n;
    }),
    (l.handleSize = function (k) {
      return arguments.length ? ((i = +k), l) : i;
    }),
    (l.keyModifiers = function (k) {
      return arguments.length ? ((a = !!k), l) : a;
    }),
    (l.on = function () {
      var k = o.on.apply(o, arguments);
      return k === o ? l : k;
    }),
    l
  );
}
var I4,
  zg,
  ci,
  si,
  z4,
  Dt,
  Et,
  Pc,
  Rc,
  hE,
  wn,
  R4,
  L4,
  pE,
  gE,
  Y4 = T(() => {
    Ga();
    xc();
    Zt();
    Nt();
    Ec();
    V4();
    N4();
    E4();
    (I4 = { name: "drag" }),
      (zg = { name: "space" }),
      (ci = { name: "handle" }),
      (si = { name: "center" }),
      ({ abs: z4, max: Dt, min: Et } = Math);
    (Pc = {
      name: "x",
      handles: ["w", "e"].map(Zu),
      input: function (e, t) {
        return e == null
          ? null
          : [
              [+e[0], t[0][1]],
              [+e[1], t[1][1]],
            ];
      },
      output: function (e) {
        return e && [e[0][0], e[1][0]];
      },
    }),
      (Rc = {
        name: "y",
        handles: ["n", "s"].map(Zu),
        input: function (e, t) {
          return e == null
            ? null
            : [
                [t[0][0], +e[0]],
                [t[1][0], +e[1]],
              ];
        },
        output: function (e) {
          return e && [e[0][1], e[1][1]];
        },
      }),
      (hE = {
        name: "xy",
        handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(Zu),
        input: function (e) {
          return e == null ? null : Rg(e);
        },
        output: function (e) {
          return e;
        },
      }),
      (wn = {
        overlay: "crosshair",
        selection: "move",
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize",
      }),
      (R4 = { e: "w", w: "e", nw: "ne", ne: "nw", se: "sw", sw: "se" }),
      (L4 = { n: "s", s: "n", nw: "sw", ne: "se", se: "ne", sw: "nw" }),
      (pE = {
        overlay: 1,
        selection: 1,
        n: null,
        e: 1,
        s: null,
        w: -1,
        nw: -1,
        ne: 1,
        se: 1,
        sw: -1,
      }),
      (gE = {
        overlay: 1,
        selection: 1,
        n: -1,
        e: null,
        s: 1,
        w: null,
        nw: -1,
        ne: -1,
        se: 1,
        sw: 1,
      });
  });
var q4 = {};
At(q4, {
  brush: () => H4,
  brushSelection: () => O4,
  brushX: () => B4,
  brushY: () => F4,
});
var Og = T(() => {
  Y4();
});
var Ju,
  W4 = T(() => {
    Ju = (e) => () => e;
  });
function Bg(e, { sourceEvent: t, target: r, transform: n, dispatch: a }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: a },
  });
}
var $4 = T(() => {});
function xr(e, t, r) {
  (this.k = e), (this.x = t), (this.y = r);
}
function Lc(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Qr;
  return e.__zoom;
}
var Qr,
  Fg = T(() => {
    xr.prototype = {
      constructor: xr,
      scale: function (e) {
        return e === 1 ? this : new xr(this.k * e, this.x, this.y);
      },
      translate: function (e, t) {
        return (e === 0) & (t === 0)
          ? this
          : new xr(this.k, this.x + this.k * e, this.y + this.k * t);
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
        return e
          .copy()
          .domain(e.range().map(this.invertX, this).map(e.invert, e));
      },
      rescaleY: function (e) {
        return e
          .copy()
          .domain(e.range().map(this.invertY, this).map(e.invert, e));
      },
      toString: function () {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
      },
    };
    Qr = new xr(1, 0, 0);
    Lc.prototype = xr.prototype;
  });
function Oc(e) {
  e.stopImmediatePropagation();
}
function di(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
var G4 = T(() => {});
function wE(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function _E() {
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
function U4() {
  return this.__zoom || Qr;
}
function SE(e) {
  return (
    -e.deltaY *
    (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) *
    (e.ctrlKey ? 10 : 1)
  );
}
function ME() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function AE(e, t, r) {
  var n = e.invertX(t[0][0]) - r[0][0],
    a = e.invertX(t[1][0]) - r[1][0],
    o = e.invertY(t[0][1]) - r[0][1],
    i = e.invertY(t[1][1]) - r[1][1];
  return e.translate(
    a > n ? (n + a) / 2 : Math.min(0, n) || Math.max(0, a),
    i > o ? (o + i) / 2 : Math.min(0, o) || Math.max(0, i),
  );
}
function Bc() {
  var e = wE,
    t = _E,
    r = AE,
    n = SE,
    a = ME,
    o = [0, 1 / 0],
    i = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    u = 250,
    l = Qm,
    s = Xr("start", "zoom", "end"),
    h,
    y,
    x,
    M = 500,
    A = 150,
    N = 0,
    k = 10;
  function D(H) {
    H.property("__zoom", U4)
      .on("wheel.zoom", G, { passive: !1 })
      .on("mousedown.zoom", ue)
      .on("dblclick.zoom", ne)
      .filter(a)
      .on("touchstart.zoom", U)
      .on("touchmove.zoom", ae)
      .on("touchend.zoom touchcancel.zoom", J)
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  (D.transform = function (H, ee, j, X) {
    var K = H.selection ? H.selection() : H;
    K.property("__zoom", U4),
      H !== K
        ? I(H, ee, j, X)
        : K.interrupt().each(function () {
            L(this, arguments)
              .event(X)
              .start()
              .zoom(
                null,
                typeof ee == "function" ? ee.apply(this, arguments) : ee,
              )
              .end();
          });
  }),
    (D.scaleBy = function (H, ee, j, X) {
      D.scaleTo(
        H,
        function () {
          var K = this.__zoom.k,
            Z = typeof ee == "function" ? ee.apply(this, arguments) : ee;
          return K * Z;
        },
        j,
        X,
      );
    }),
    (D.scaleTo = function (H, ee, j, X) {
      D.transform(
        H,
        function () {
          var K = t.apply(this, arguments),
            Z = this.__zoom,
            te =
              j == null
                ? R(K)
                : typeof j == "function"
                ? j.apply(this, arguments)
                : j,
            le = Z.invert(te),
            de = typeof ee == "function" ? ee.apply(this, arguments) : ee;
          return r(F(B(Z, de), te, le), K, i);
        },
        j,
        X,
      );
    }),
    (D.translateBy = function (H, ee, j, X) {
      D.transform(
        H,
        function () {
          return r(
            this.__zoom.translate(
              typeof ee == "function" ? ee.apply(this, arguments) : ee,
              typeof j == "function" ? j.apply(this, arguments) : j,
            ),
            t.apply(this, arguments),
            i,
          );
        },
        null,
        X,
      );
    }),
    (D.translateTo = function (H, ee, j, X, K) {
      D.transform(
        H,
        function () {
          var Z = t.apply(this, arguments),
            te = this.__zoom,
            le =
              X == null
                ? R(Z)
                : typeof X == "function"
                ? X.apply(this, arguments)
                : X;
          return r(
            Qr.translate(le[0], le[1])
              .scale(te.k)
              .translate(
                typeof ee == "function" ? -ee.apply(this, arguments) : -ee,
                typeof j == "function" ? -j.apply(this, arguments) : -j,
              ),
            Z,
            i,
          );
        },
        X,
        K,
      );
    });
  function B(H, ee) {
    return (
      (ee = Math.max(o[0], Math.min(o[1], ee))),
      ee === H.k ? H : new xr(ee, H.x, H.y)
    );
  }
  function F(H, ee, j) {
    var X = ee[0] - j[0] * H.k,
      K = ee[1] - j[1] * H.k;
    return X === H.x && K === H.y ? H : new xr(H.k, X, K);
  }
  function R(H) {
    return [(+H[0][0] + +H[1][0]) / 2, (+H[0][1] + +H[1][1]) / 2];
  }
  function I(H, ee, j, X) {
    H.on("start.zoom", function () {
      L(this, arguments).event(X).start();
    })
      .on("interrupt.zoom end.zoom", function () {
        L(this, arguments).event(X).end();
      })
      .tween("zoom", function () {
        var K = this,
          Z = arguments,
          te = L(K, Z).event(X),
          le = t.apply(K, Z),
          de = j == null ? R(le) : typeof j == "function" ? j.apply(K, Z) : j,
          re = Math.max(le[1][0] - le[0][0], le[1][1] - le[0][1]),
          me = K.__zoom,
          Me = typeof ee == "function" ? ee.apply(K, Z) : ee,
          Oe = l(
            me.invert(de).concat(re / me.k),
            Me.invert(de).concat(re / Me.k),
          );
        return function (Ne) {
          if (Ne === 1) Ne = Me;
          else {
            var Ue = Oe(Ne),
              ce = re / Ue[2];
            Ne = new xr(ce, de[0] - Ue[0] * ce, de[1] - Ue[1] * ce);
          }
          te.zoom(null, Ne);
        };
      });
  }
  function L(H, ee, j) {
    return (!j && H.__zooming) || new $(H, ee);
  }
  function $(H, ee) {
    (this.that = H),
      (this.args = ee),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = t.apply(H, ee)),
      (this.taps = 0);
  }
  $.prototype = {
    event: function (H) {
      return H && (this.sourceEvent = H), this;
    },
    start: function () {
      return (
        ++this.active === 1 &&
          ((this.that.__zooming = this), this.emit("start")),
        this
      );
    },
    zoom: function (H, ee) {
      return (
        this.mouse &&
          H !== "mouse" &&
          (this.mouse[1] = ee.invert(this.mouse[0])),
        this.touch0 &&
          H !== "touch" &&
          (this.touch0[1] = ee.invert(this.touch0[0])),
        this.touch1 &&
          H !== "touch" &&
          (this.touch1[1] = ee.invert(this.touch1[0])),
        (this.that.__zoom = ee),
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
    emit: function (H) {
      var ee = fe(this.that).datum();
      s.call(
        H,
        this.that,
        new Bg(H, {
          sourceEvent: this.sourceEvent,
          target: D,
          type: H,
          transform: this.that.__zoom,
          dispatch: s,
        }),
        ee,
      );
    },
  };
  function G(H, ...ee) {
    if (!e.apply(this, arguments)) return;
    var j = L(this, ee).event(H),
      X = this.__zoom,
      K = Math.max(
        o[0],
        Math.min(o[1], X.k * Math.pow(2, n.apply(this, arguments))),
      ),
      Z = dt(H);
    if (j.wheel)
      (j.mouse[0][0] !== Z[0] || j.mouse[0][1] !== Z[1]) &&
        (j.mouse[1] = X.invert((j.mouse[0] = Z))),
        clearTimeout(j.wheel);
    else {
      if (X.k === K) return;
      (j.mouse = [Z, X.invert(Z)]), jr(this), j.start();
    }
    di(H),
      (j.wheel = setTimeout(te, A)),
      j.zoom("mouse", r(F(B(X, K), j.mouse[0], j.mouse[1]), j.extent, i));
    function te() {
      (j.wheel = null), j.end();
    }
  }
  function ue(H, ...ee) {
    if (x || !e.apply(this, arguments)) return;
    var j = H.currentTarget,
      X = L(this, ee, !0).event(H),
      K = fe(H.view).on("mousemove.zoom", de, !0).on("mouseup.zoom", re, !0),
      Z = dt(H, j),
      te = H.clientX,
      le = H.clientY;
    Xa(H.view),
      Oc(H),
      (X.mouse = [Z, this.__zoom.invert(Z)]),
      jr(this),
      X.start();
    function de(me) {
      if ((di(me), !X.moved)) {
        var Me = me.clientX - te,
          Oe = me.clientY - le;
        X.moved = Me * Me + Oe * Oe > N;
      }
      X.event(me).zoom(
        "mouse",
        r(F(X.that.__zoom, (X.mouse[0] = dt(me, j)), X.mouse[1]), X.extent, i),
      );
    }
    function re(me) {
      K.on("mousemove.zoom mouseup.zoom", null),
        ja(me.view, X.moved),
        di(me),
        X.event(me).end();
    }
  }
  function ne(H, ...ee) {
    if (!!e.apply(this, arguments)) {
      var j = this.__zoom,
        X = dt(H.changedTouches ? H.changedTouches[0] : H, this),
        K = j.invert(X),
        Z = j.k * (H.shiftKey ? 0.5 : 2),
        te = r(F(B(j, Z), X, K), t.apply(this, ee), i);
      di(H),
        u > 0
          ? fe(this).transition().duration(u).call(I, te, X, H)
          : fe(this).call(D.transform, te, X, H);
    }
  }
  function U(H, ...ee) {
    if (!!e.apply(this, arguments)) {
      var j = H.touches,
        X = j.length,
        K = L(this, ee, H.changedTouches.length === X).event(H),
        Z,
        te,
        le,
        de;
      for (Oc(H), te = 0; te < X; ++te)
        (le = j[te]),
          (de = dt(le, this)),
          (de = [de, this.__zoom.invert(de), le.identifier]),
          K.touch0
            ? !K.touch1 &&
              K.touch0[2] !== de[2] &&
              ((K.touch1 = de), (K.taps = 0))
            : ((K.touch0 = de), (Z = !0), (K.taps = 1 + !!h));
      h && (h = clearTimeout(h)),
        Z &&
          (K.taps < 2 &&
            ((y = de[0]),
            (h = setTimeout(function () {
              h = null;
            }, M))),
          jr(this),
          K.start());
    }
  }
  function ae(H, ...ee) {
    if (!!this.__zooming) {
      var j = L(this, ee).event(H),
        X = H.changedTouches,
        K = X.length,
        Z,
        te,
        le,
        de;
      for (di(H), Z = 0; Z < K; ++Z)
        (te = X[Z]),
          (le = dt(te, this)),
          j.touch0 && j.touch0[2] === te.identifier
            ? (j.touch0[0] = le)
            : j.touch1 && j.touch1[2] === te.identifier && (j.touch1[0] = le);
      if (((te = j.that.__zoom), j.touch1)) {
        var re = j.touch0[0],
          me = j.touch0[1],
          Me = j.touch1[0],
          Oe = j.touch1[1],
          Ne = (Ne = Me[0] - re[0]) * Ne + (Ne = Me[1] - re[1]) * Ne,
          Ue = (Ue = Oe[0] - me[0]) * Ue + (Ue = Oe[1] - me[1]) * Ue;
        (te = B(te, Math.sqrt(Ne / Ue))),
          (le = [(re[0] + Me[0]) / 2, (re[1] + Me[1]) / 2]),
          (de = [(me[0] + Oe[0]) / 2, (me[1] + Oe[1]) / 2]);
      } else if (j.touch0) (le = j.touch0[0]), (de = j.touch0[1]);
      else return;
      j.zoom("touch", r(F(te, le, de), j.extent, i));
    }
  }
  function J(H, ...ee) {
    if (!!this.__zooming) {
      var j = L(this, ee).event(H),
        X = H.changedTouches,
        K = X.length,
        Z,
        te;
      for (
        Oc(H),
          x && clearTimeout(x),
          x = setTimeout(function () {
            x = null;
          }, M),
          Z = 0;
        Z < K;
        ++Z
      )
        (te = X[Z]),
          j.touch0 && j.touch0[2] === te.identifier
            ? delete j.touch0
            : j.touch1 && j.touch1[2] === te.identifier && delete j.touch1;
      if (
        (j.touch1 && !j.touch0 && ((j.touch0 = j.touch1), delete j.touch1),
        j.touch0)
      )
        j.touch0[1] = this.__zoom.invert(j.touch0[0]);
      else if (
        (j.end(),
        j.taps === 2 &&
          ((te = dt(te, this)), Math.hypot(y[0] - te[0], y[1] - te[1]) < k))
      ) {
        var le = fe(this).on("dblclick.zoom");
        le && le.apply(this, arguments);
      }
    }
  }
  return (
    (D.wheelDelta = function (H) {
      return arguments.length
        ? ((n = typeof H == "function" ? H : Ju(+H)), D)
        : n;
    }),
    (D.filter = function (H) {
      return arguments.length
        ? ((e = typeof H == "function" ? H : Ju(!!H)), D)
        : e;
    }),
    (D.touchable = function (H) {
      return arguments.length
        ? ((a = typeof H == "function" ? H : Ju(!!H)), D)
        : a;
    }),
    (D.extent = function (H) {
      return arguments.length
        ? ((t =
            typeof H == "function"
              ? H
              : Ju([
                  [+H[0][0], +H[0][1]],
                  [+H[1][0], +H[1][1]],
                ])),
          D)
        : t;
    }),
    (D.scaleExtent = function (H) {
      return arguments.length
        ? ((o[0] = +H[0]), (o[1] = +H[1]), D)
        : [o[0], o[1]];
    }),
    (D.translateExtent = function (H) {
      return arguments.length
        ? ((i[0][0] = +H[0][0]),
          (i[1][0] = +H[1][0]),
          (i[0][1] = +H[0][1]),
          (i[1][1] = +H[1][1]),
          D)
        : [
            [i[0][0], i[0][1]],
            [i[1][0], i[1][1]],
          ];
    }),
    (D.constrain = function (H) {
      return arguments.length ? ((r = H), D) : r;
    }),
    (D.duration = function (H) {
      return arguments.length ? ((u = +H), D) : u;
    }),
    (D.interpolate = function (H) {
      return arguments.length ? ((l = H), D) : l;
    }),
    (D.on = function () {
      var H = s.on.apply(s, arguments);
      return H === s ? D : H;
    }),
    (D.clickDistance = function (H) {
      return arguments.length ? ((N = (H = +H) * H), D) : Math.sqrt(N);
    }),
    (D.tapDistance = function (H) {
      return arguments.length ? ((k = +H), D) : k;
    }),
    D
  );
}
var X4 = T(() => {
  Ga();
  xc();
  Zt();
  Nt();
  Ec();
  W4();
  $4();
  Fg();
  G4();
});
var j4 = {};
At(j4, {
  ZoomTransform: () => xr,
  zoom: () => Bc,
  zoomIdentity: () => Qr,
  zoomTransform: () => Lc,
});
var Hg = T(() => {
  X4();
  Fg();
});
var Le = Px((Fc, Q4) => {
  (function (e, t) {
    typeof Fc == "object" && typeof Q4 < "u"
      ? t(
          Fc,
          (_m(), ar(wm)),
          (Jh(), ar(B2)),
          (Lo(), ar(p2)),
          (op(), ar(cw)),
          (hp(), ar(Ew)),
          (Bn(), ar(Pw)),
          (Nt(), ar(f3)),
          (Kp(), ar(P8)),
          (Ag(), ar(b6)),
          (Ga(), ar(S6)),
          (Og(), ar(q4)),
          (Hg(), ar(j4)),
        )
      : typeof define == "function" && define.amd
      ? define(
          [
            "exports",
            "d3-array",
            "d3-scale",
            "d3-time",
            "d3-random",
            "d3-fetch",
            "d3-path",
            "d3-selection",
            "d3-shape",
            "d3-scale-chromatic",
            "d3-dispatch",
            "d3-brush",
            "d3-zoom",
          ],
          t,
        )
      : ((e = typeof globalThis < "u" ? globalThis : e || self),
        t(
          (e.fc = {}),
          e.d3,
          e.d3,
          e.d3,
          e.d3,
          e.d3,
          e.d3,
          e.d3,
          e.d3,
          e.d3,
          e.d3,
          e.d3,
          e.d3,
        ));
  })(Fc, function (e, t, r, n, a, o, i, u, l, s, h, y, x) {
    "use strict";
    var M = function (f, c, d) {
        var p = c[d];
        if (typeof p != "function")
          throw new Error(
            "Attempt to rebind ".concat(
              d,
              " which isn't a function on the source object",
            ),
          );
        return function () {
          for (var b = arguments.length, w = new Array(b), m = 0; m < b; m++)
            w[m] = arguments[m];
          var g = p.apply(c, w);
          return g === c ? f : g;
        };
      },
      A = function (f, c) {
        for (
          var d = arguments.length, p = new Array(d > 2 ? d - 2 : 0), b = 2;
          b < d;
          b++
        )
          p[b - 2] = arguments[b];
        for (var w = 0, m = p; w < m.length; w++) {
          var g = m[w];
          f[g] = M(f, c, g);
        }
        return f;
      },
      N = function (c) {
        return function (d) {
          return c.reduce(function (p, b) {
            return p && b(p);
          }, d);
        };
      },
      k = function (f, c) {
        for (
          var d = arguments.length, p = new Array(d > 2 ? d - 2 : 0), b = 2;
          b < d;
          b++
        )
          p[b - 2] = arguments[b];
        for (var w = N(p), m = 0, g = Object.keys(c); m < g.length; m++) {
          var v = g[m],
            _ = w(v);
          _ && (f[_] = M(f, c, v));
        }
        return f;
      },
      D = function (f) {
        return f.map(function (c) {
          return typeof c == "string" ? new RegExp("^".concat(c, "$")) : c;
        });
      },
      B = function () {
        for (var f = arguments.length, c = new Array(f), d = 0; d < f; d++)
          c[d] = arguments[d];
        return (
          (c = D(c)),
          function (p) {
            return (
              c.every(function (b) {
                return !b.test(p);
              }) && p
            );
          }
        );
      },
      F = function () {
        for (var f = arguments.length, c = new Array(f), d = 0; d < f; d++)
          c[d] = arguments[d];
        return (
          (c = D(c)),
          function (p) {
            return (
              c.some(function (b) {
                return b.test(p);
              }) && p
            );
          }
        );
      },
      R = function (f) {
        return function (c) {
          return f[c];
        };
      },
      I = function (c) {
        return c[0].toUpperCase() + c.slice(1);
      },
      L = function (f) {
        return function (c) {
          return f + I(c);
        };
      };
    function $(f) {
      return f;
    }
    function G(f) {}
    function ue(f) {
      return typeof f == "function"
        ? f
        : function () {
            return f;
          };
    }
    function ne(f) {
      return typeof f == "number" && isNaN(f) ? void 0 : f;
    }
    function U() {
      var f = function () {
          return 10;
        },
        c = G,
        d = $,
        p = function (m) {
          return m != null;
        },
        b = function (m) {
          var g = f.apply(this, arguments),
            v = m.slice(0, g).map(d);
          return m.map(function (_, S) {
            return (
              S >= g && (v.shift(), v.push(d(_, S))),
              S < g - 1 ||
              v.some(function (C) {
                return !p(C);
              })
                ? c(void 0, S)
                : c(v, S)
            );
          });
        };
      return (
        (b.period = function () {
          return arguments.length
            ? ((f = ue(arguments.length <= 0 ? void 0 : arguments[0])), b)
            : f;
        }),
        (b.accumulator = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), b)
            : c;
        }),
        (b.defined = function () {
          return arguments.length
            ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), b)
            : p;
        }),
        (b.value = function () {
          return arguments.length
            ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), b)
            : d;
        }),
        b
      );
    }
    function ae() {
      var f = 2,
        c = U().accumulator(function (p) {
          var b = p && t.deviation(p),
            w = p && t.mean(p);
          return { average: w, upper: ne(w + f * b), lower: ne(w - f * b) };
        }),
        d = function (b) {
          return c(b);
        };
      return (
        (d.multiplier = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), d)
            : f;
        }),
        A(d, c, "period", "value"),
        d
      );
    }
    function J() {
      var f = $,
        c = function () {
          return 9;
        },
        d = function (w) {
          var m = [];
          return function (g) {
            var v;
            return (
              m.length < w && (g != null ? m.push(g) : (m = [])),
              m.length >= w && (v = t.mean(m)),
              v
            );
          };
        },
        p = function (w) {
          var m = c.apply(this, arguments),
            g = 2 / (m + 1),
            v = d(m),
            _;
          return w.map(function (S, C) {
            var V = f(S, C);
            return _ === void 0 ? (_ = v(V)) : (_ = V * g + (1 - g) * _), ne(_);
          });
        };
      return (
        (p.period = function () {
          return arguments.length
            ? ((c = ue(arguments.length <= 0 ? void 0 : arguments[0])), p)
            : c;
        }),
        (p.value = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), p)
            : f;
        }),
        p
      );
    }
    function H() {
      var f = $,
        c = J().period(12),
        d = J().period(26),
        p = J().period(9),
        b = function (m) {
          c.value(f), d.value(f);
          var g = t.zip(c(m), d(m)).map(function (_) {
              return _[0] !== void 0 && _[1] !== void 0 ? _[0] - _[1] : void 0;
            }),
            v = p(g);
          return t.zip(g, v).map(function (_) {
            return {
              macd: _[0],
              signal: _[1],
              divergence:
                _[0] !== void 0 && _[1] !== void 0 ? _[0] - _[1] : void 0,
            };
          });
        };
      return (
        (b.value = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), b)
            : f;
        }),
        k(b, c, R({ period: "fastPeriod" })),
        k(b, d, R({ period: "slowPeriod" })),
        k(b, p, R({ period: "signalPeriod" })),
        b
      );
    }
    function ee(f) {
      return (
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? (ee = function (c) {
              return typeof c;
            })
          : (ee = function (c) {
              return c &&
                typeof Symbol == "function" &&
                c.constructor === Symbol &&
                c !== Symbol.prototype
                ? "symbol"
                : typeof c;
            }),
        ee(f)
      );
    }
    function j(f, c) {
      if (!(f instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function X(f, c) {
      for (var d = 0; d < c.length; d++) {
        var p = c[d];
        (p.enumerable = p.enumerable || !1),
          (p.configurable = !0),
          "value" in p && (p.writable = !0),
          Object.defineProperty(f, p.key, p);
      }
    }
    function K(f, c, d) {
      return c && X(f.prototype, c), d && X(f, d), f;
    }
    function Z(f, c) {
      if (typeof c != "function" && c !== null)
        throw new TypeError(
          "Super expression must either be null or a function",
        );
      (f.prototype = Object.create(c && c.prototype, {
        constructor: { value: f, writable: !0, configurable: !0 },
      })),
        c && le(f, c);
    }
    function te(f) {
      return (
        (te = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (d) {
              return d.__proto__ || Object.getPrototypeOf(d);
            }),
        te(f)
      );
    }
    function le(f, c) {
      return (
        (le =
          Object.setPrototypeOf ||
          function (p, b) {
            return (p.__proto__ = b), p;
          }),
        le(f, c)
      );
    }
    function de() {
      if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
        return !1;
      if (typeof Proxy == "function") return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {}),
          ),
          !0
        );
      } catch {
        return !1;
      }
    }
    function re(f, c, d) {
      return (
        de()
          ? (re = Reflect.construct)
          : (re = function (b, w, m) {
              var g = [null];
              g.push.apply(g, w);
              var v = Function.bind.apply(b, g),
                _ = new v();
              return m && le(_, m.prototype), _;
            }),
        re.apply(null, arguments)
      );
    }
    function me(f) {
      return Function.toString.call(f).indexOf("[native code]") !== -1;
    }
    function Me(f) {
      var c = typeof Map == "function" ? new Map() : void 0;
      return (
        (Me = function (p) {
          if (p === null || !me(p)) return p;
          if (typeof p != "function")
            throw new TypeError(
              "Super expression must either be null or a function",
            );
          if (typeof c < "u") {
            if (c.has(p)) return c.get(p);
            c.set(p, b);
          }
          function b() {
            return re(p, arguments, te(this).constructor);
          }
          return (
            (b.prototype = Object.create(p.prototype, {
              constructor: {
                value: b,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            le(b, p)
          );
        }),
        Me(f)
      );
    }
    function Oe(f) {
      if (f === void 0)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return f;
    }
    function Ne(f, c) {
      return c && (typeof c == "object" || typeof c == "function") ? c : Oe(f);
    }
    function Ue(f) {
      var c = de();
      return function () {
        var p = te(f),
          b;
        if (c) {
          var w = te(this).constructor;
          b = Reflect.construct(p, arguments, w);
        } else b = p.apply(this, arguments);
        return Ne(this, b);
      };
    }
    function ce(f, c) {
      return Xe(f) || vt(f, c) || nt(f, c) || Cn();
    }
    function _e(f) {
      return Xe(f) || Be(f) || nt(f) || Cn();
    }
    function be(f) {
      return ie(f) || Be(f) || nt(f) || Qe();
    }
    function ie(f) {
      if (Array.isArray(f)) return xe(f);
    }
    function Xe(f) {
      if (Array.isArray(f)) return f;
    }
    function Be(f) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(f))
        return Array.from(f);
    }
    function vt(f, c) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(f)))) {
        var d = [],
          p = !0,
          b = !1,
          w = void 0;
        try {
          for (
            var m = f[Symbol.iterator](), g;
            !(p = (g = m.next()).done) &&
            (d.push(g.value), !(c && d.length === c));
            p = !0
          );
        } catch (v) {
          (b = !0), (w = v);
        } finally {
          try {
            !p && m.return != null && m.return();
          } finally {
            if (b) throw w;
          }
        }
        return d;
      }
    }
    function nt(f, c) {
      if (!!f) {
        if (typeof f == "string") return xe(f, c);
        var d = Object.prototype.toString.call(f).slice(8, -1);
        if (
          (d === "Object" && f.constructor && (d = f.constructor.name),
          d === "Map" || d === "Set")
        )
          return Array.from(f);
        if (
          d === "Arguments" ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d)
        )
          return xe(f, c);
      }
    }
    function xe(f, c) {
      (c == null || c > f.length) && (c = f.length);
      for (var d = 0, p = new Array(c); d < c; d++) p[d] = f[d];
      return p;
    }
    function Qe() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function Cn() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function Lt(f, c) {
      var d;
      if (typeof Symbol > "u" || f[Symbol.iterator] == null) {
        if (
          Array.isArray(f) ||
          (d = nt(f)) ||
          (c && f && typeof f.length == "number")
        ) {
          d && (f = d);
          var p = 0,
            b = function () {};
          return {
            s: b,
            n: function () {
              return p >= f.length ? { done: !0 } : { done: !1, value: f[p++] };
            },
            e: function (v) {
              throw v;
            },
            f: b,
          };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var w = !0,
        m = !1,
        g;
      return {
        s: function () {
          d = f[Symbol.iterator]();
        },
        n: function () {
          var v = d.next();
          return (w = v.done), v;
        },
        e: function (v) {
          (m = !0), (g = v);
        },
        f: function () {
          try {
            !w && d.return != null && d.return();
          } finally {
            if (m) throw g;
          }
        },
      };
    }
    function wA() {
      var f = U().period(14),
        c = function (v, _) {
          return _ + (v[v.length - 1] - _) / v.length;
        },
        d = function (v) {
          var _ = ce(v, 2),
            S = _[0],
            C = _[1];
          return S < C ? 0 : S - C;
        },
        p = function (v) {
          var _ = ce(v, 2),
            S = _[0],
            C = _[1];
          return S > C ? 0 : C - S;
        },
        b = function (v, _) {
          return _ !== void 0 ? c(v, _) : t.mean(v);
        },
        w = function () {
          var v, _, S;
          return function (C) {
            if (!C) {
              v !== void 0 && (v = NaN);
              return;
            }
            if (v === void 0) {
              v = C[0];
              return;
            }
            var V = t.pairs([v].concat(be(C)));
            (_ = b(V.map(d), _)), (S = b(V.map(p), S));
            var E = isNaN(v) ? NaN : S / _;
            return ne(100 - 100 / (1 + E));
          };
        },
        m = function (v) {
          var _ = w();
          return f.accumulator(_), f(v);
        };
      return A(m, f, "period", "value"), m;
    }
    function K0() {
      var f = U().accumulator(function (d) {
          return d && t.mean(d);
        }),
        c = function (p) {
          return f(p);
        };
      return A(c, f, "period", "value"), c;
    }
    function _A() {
      var f = function (g, v) {
          return g.close;
        },
        c = function (g, v) {
          return g.high;
        },
        d = function (g, v) {
          return g.low;
        },
        p = U()
          .period(5)
          .defined(function (m) {
            return f(m) != null && c(m) != null && d(m) != null;
          })
          .accumulator(function (m) {
            var g = m && t.max(m, c),
              v = m && t.min(m, d),
              _ = m && (100 * (f(m[m.length - 1]) - v)) / (g - v);
            return ne(_);
          }),
        b = K0().period(3),
        w = function (g) {
          var v = p(g),
            _ = b(v);
          return v.map(function (S, C) {
            return { k: S, d: _[C] };
          });
        };
      return (
        (w.closeValue = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : f;
        }),
        (w.highValue = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : c;
        }),
        (w.lowValue = function () {
          return arguments.length
            ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : d;
        }),
        k(w, p, R({ period: "kPeriod" })),
        k(w, b, R({ period: "dPeriod" })),
        w
      );
    }
    function SA() {
      var f = function (m, g) {
          return m.volume;
        },
        c = function (m, g) {
          return m.close;
        },
        d = J().period(13),
        p = U()
          .period(2)
          .defined(function (w) {
            return c(w) != null && f(w) != null;
          })
          .accumulator(function (w) {
            return w && ne((c(w[1]) - c(w[0])) * f(w[1]));
          }),
        b = function (m) {
          var g = p(m);
          return d(g);
        };
      return (
        (b.volumeValue = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), b)
            : f;
        }),
        (b.closeValue = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), b)
            : c;
        }),
        A(b, d, "period"),
        b
      );
    }
    function MA() {
      var f = 0.1,
        c = $,
        d = function (b) {
          return b.map(function (w) {
            var m = ne(c(w) * (1 - f)),
              g = ne(c(w) * (1 + f));
            return { lower: m, upper: g };
          });
        };
      return (
        (d.factor = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), d)
            : f;
        }),
        (d.value = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), d)
            : c;
        }),
        d
      );
    }
    function AA() {
      var f = function (m, g) {
          return m.close;
        },
        c = function (m, g) {
          return m.high;
        },
        d = function (m, g) {
          return m.low;
        },
        p = J().period(13),
        b = function (m) {
          return (
            p.value(f),
            t.zip(m, p(m)).map(function (g) {
              var v = ne(c(g[0]) - g[1]),
                _ = ne(d(g[0]) - g[1]);
              return { bullPower: v, bearPower: _ };
            })
          );
        };
      return (
        (b.closeValue = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), b)
            : f;
        }),
        (b.highValue = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), b)
            : c;
        }),
        (b.lowValue = function () {
          return arguments.length
            ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), b)
            : d;
        }),
        A(b, p, "period"),
        b
      );
    }
    function Z0() {
      var f = {};
      return (
        (f.distance = function (c, d) {
          return d - c;
        }),
        (f.offset = function (c, d) {
          return c instanceof Date ? new Date(c.getTime() + d) : c + d;
        }),
        (f.clampUp = function (c) {
          return c;
        }),
        (f.clampDown = function (c) {
          return c;
        }),
        (f.copy = function () {
          return f;
        }),
        f
      );
    }
    function kA(f, c) {
      var d = f.map(c.clampUp);
      return (
        d.length !==
          new Set(
            d.map(function (p) {
              return p?.valueOf();
            }),
          ).size &&
          console.warn(
            "There are multiple ticks that fall within a discontinuity, which has led to them being rendered on top of each other. Consider using scale.ticks to explicitly specify the ticks for the scale.",
          ),
        d
      );
    }
    function J0(f) {
      var c = this;
      arguments.length || (f = r.scaleIdentity());
      var d = Z0(),
        p = function (w) {
          var m = f.domain(),
            g = f.range(),
            v = d.distance(m[0], m[1]),
            _ = d.distance(m[0], w),
            S = _ / v,
            C = S * (g[1] - g[0]) + g[0];
          return C;
        };
      return (
        (p.invert = function (b) {
          var w = f.domain(),
            m = f.range(),
            g = (b - m[0]) / (m[1] - m[0]),
            v = d.distance(w[0], w[1]),
            _ = g * v;
          return d.offset(w[0], _);
        }),
        (p.domain = function () {
          if (!arguments.length) return f.domain();
          var b = arguments.length <= 0 ? void 0 : arguments[0],
            w = d.clampUp(b[0]),
            m = d.clampDown(b[1]);
          return f.domain([w, m]), p;
        }),
        (p.nice = function () {
          f.nice();
          var b = f.domain(),
            w = d.clampUp(b[0]),
            m = d.clampDown(b[1]);
          return f.domain([w, m]), p;
        }),
        (p.ticks = function () {
          for (var b = arguments.length, w = new Array(b), m = 0; m < b; m++)
            w[m] = arguments[m];
          var g = f.ticks.apply(c, w);
          return kA(g, d);
        }),
        (p.copy = function () {
          return J0(f.copy()).discontinuityProvider(d.copy());
        }),
        (p.discontinuityProvider = function () {
          return arguments.length
            ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), p)
            : d;
        }),
        k(p, f, F("range", "rangeRound", "interpolate", "clamp", "tickFormat")),
        p
      );
    }
    var ev = function (c, d, p, b) {
        var w = { sunday: 0, monday: 1, saturday: 6 },
          m = 24 * 3600 * 1e3,
          g = m * 5,
          v = m * 7,
          _ = {},
          S = function (V) {
            return c(V) === 0 || c(V) === 6;
          };
        return (
          (_.clampDown = function (C) {
            if (C && S(C)) {
              var V = d.ceil(C);
              return c(V) === w.sunday
                ? d.offset(V, -1)
                : c(V) === w.monday
                ? d.offset(V, -2)
                : V;
            } else return C;
          }),
          (_.clampUp = function (C) {
            if (C && S(C)) {
              var V = d.floor(C);
              return c(V) === w.saturday
                ? d.offset(V, 2)
                : c(V) === w.sunday
                ? d.offset(V, 1)
                : V;
            } else return C;
          }),
          (_.distance = function (C, V) {
            (C = _.clampUp(C)), (V = _.clampDown(V));
            var E = p.ceil(C);
            if (V < E) return V.getTime() - C.getTime();
            var P = E.getTime() - C.getTime(),
              z = p.ceil(V),
              O = z.getTime() - V.getTime(),
              Y = Math.round((z.getTime() - E.getTime()) / v);
            return Y * g + P - O;
          }),
          (_.offset = function (C, V) {
            var E = S(C) ? _.clampUp(C) : C;
            if (V === 0) return E;
            var P = V < 0,
              z = V > 0,
              O = V,
              Y = P ? b.floor(E) : p.ceil(E);
            if (
              ((O -= Y.getTime() - E.getTime()), (P && O > 0) || (z && O < 0))
            )
              return new Date(E.getTime() + V);
            E = P ? Y : d.offset(Y, 2);
            var q = Math.floor(O / g);
            return (
              (E = d.offset(E, q * 7)),
              (O -= q * g),
              (E = new Date(E.getTime() + O)),
              E
            );
          }),
          (_.copy = function () {
            return _;
          }),
          _
        );
      },
      CA = function () {
        return ev(
          function (f) {
            return f.getDay();
          },
          n.timeDay,
          n.timeSaturday,
          n.timeMonday,
        );
      },
      TA = function () {
        return ev(
          function (f) {
            return f.getUTCDay();
          },
          n.utcDay,
          n.utcSaturday,
          n.utcMonday,
        );
      },
      VA = function () {
        for (var c = arguments.length, d = new Array(c), p = 0; p < c; p++)
          d[p] = arguments[p];
        var b = function (_, S) {
            return _ > S[0] && _ < S[1];
          },
          w = function (_, S) {
            return _[0] >= S[0] && _[1] <= S[1];
          },
          m = {};
        m.distance = function (v, _) {
          (v = m.clampUp(v)), (_ = m.clampDown(_));
          var S = d.filter(function (V) {
              return w(V, [v, _]);
            }),
            C = S.map(function (V) {
              return V[1] - V[0];
            });
          return (
            _ -
            v -
            C.reduce(function (V, E) {
              return V + E;
            }, 0)
          );
        };
        var g = function (_, S) {
          return _ instanceof Date ? new Date(_.getTime() + S) : _ + S;
        };
        return (
          (m.offset = function (v, _) {
            if (_ > 0) {
              var S = (function () {
                for (var V = m.clampUp(v), E = _; E > 0; ) {
                  var P = d
                    .filter(function (Y) {
                      return Y[0] > V;
                    })
                    .sort(function (Y, q) {
                      return Y[0] - q[0];
                    });
                  if (P.length) {
                    var z = P[0],
                      O = z[0] - V;
                    O > E ? ((V = g(V, E)), (E = 0)) : ((V = z[1]), (E -= O));
                  } else (V = g(V, E)), (E = 0);
                }
                return { v: V };
              })();
              if (ee(S) === "object") return S.v;
            } else {
              var C = (function () {
                for (var V = m.clampDown(v), E = _; E < 0; ) {
                  var P = d
                    .filter(function (Y) {
                      return Y[1] < V;
                    })
                    .sort(function (Y, q) {
                      return q[0] - Y[0];
                    });
                  if (P.length) {
                    var z = P[0],
                      O = z[1] - V;
                    O < E ? ((V = g(V, E)), (E = 0)) : ((V = z[0]), (E -= O));
                  } else (V = g(V, E)), (E = 0);
                }
                return { v: V };
              })();
              if (ee(C) === "object") return C.v;
            }
          }),
          (m.clampUp = function (v) {
            return d.reduce(function (_, S) {
              return b(_, S) ? S[1] : _;
            }, v);
          }),
          (m.clampDown = function (v) {
            return d.reduce(function (_, S) {
              return b(_, S) ? S[0] : _;
            }, v);
          }),
          (m.copy = function () {
            return m;
          }),
          m
        );
      },
      wf = 24 * 3600 * 1e3,
      tr = "00:00:00.000",
      NA = "SOD",
      DA = "EOD";
    function tv(f) {
      if (arguments.length !== 1 || typeof f != "string")
        throw "Expected single argument of type string";
      var c = function (m, g) {
          return Number.isInteger(m) ? m >= 0 && m <= g : !1;
        },
        d = [0, 0, 0, 0],
        p = f.split(":");
      if (p.length < 2 || p.length > 3)
        throw "Expected an argument wiht 2 or 3 colon delimited parts.";
      if (
        ((d[0] = c(parseInt(p[0], 10), 23)
          ? parseInt(p[0], 10)
          : (function () {
              throw "'Hours' component must be an int between 0 and 23, but was '".concat(
                p[0],
                "'",
              );
            })()),
        (d[1] = c(parseInt(p[1], 10), 59)
          ? parseInt(p[1], 10)
          : (function () {
              throw "'Minutes' component must be an int between 0 and 59, but was '".concat(
                p[1],
                "'",
              );
            })()),
        p.length === 3)
      ) {
        var b = p[2].split(".").map(function (w) {
          return parseInt(w, 10);
        });
        (d[2] = c(b[0], 59)
          ? b[0]
          : (function () {
              throw "'Seconds' component must be an int between 0 and 59, but was '".concat(
                b[0],
                "'",
              );
            })()),
          b.length === 2 &&
            (d[3] = c(b[1], 999)
              ? b[1]
              : (function () {
                  throw "'Miliseconds' component must be an int between 0 and 999, but was '".concat(
                    b[1],
                    "'",
                  );
                })());
      }
      return ""
        .concat(d[0].toString(10).padStart(2, "0"), ":")
        .concat(d[1].toString(10).padStart(2, "0"), ":")
        .concat(d[2].toString(10).padStart(2, "0"), ".")
        .concat(d[3].toString(10).padStart(3, "0"));
    }
    function EA(f, c) {
      if (
        arguments.length != 2 ||
        !Array.isArray(f) ||
        f.length !== 2 ||
        typeof f[0] != "string" ||
        typeof f[1] != "string"
      )
        throw "Expected argument is a single string[] of length 2.";
      f[0] === NA && (f[0] = tr), f[1] === DA && (f[1] = tr);
      var d = tv(f[0]),
        p = tv(f[1]);
      if (p !== tr && d > p)
        throw "Time range start time '"
          .concat(d, "' must be before end time '")
          .concat(p, "' or both must equal ")
          .concat(tr);
      var b =
          c.setTime(new Date(p === tr ? wf : 0), p) - c.setTime(new Date(0), d),
        w = { startTime: d, endTime: p, lenghtInMs: b };
      return (
        (w.isInRange = function (m) {
          var g = c.getTimeString(m);
          return w.startTime <= g && (w.endTime === tr || w.endTime > g);
        }),
        w
      );
    }
    var pa = function (c, d) {
        var p = c
            .map(function (g) {
              return EA(g, d);
            })
            .sort(function (g, v) {
              return g.startTime < v.startTime
                ? -1
                : g.startTime > v.startTime
                ? 1
                : 0;
            }),
          b =
            wf -
            p.reduce(function (g, v) {
              return g + v.lenghtInMs;
            }, 0),
          w = function (v, _) {
            if (v.getTime() === _.getTime()) return 0;
            if (
              d.dayInterval(v).getTime() !== d.dayInterval(_).getTime() &&
              d.getStartOfNextDay(v).getTime() !== _.getTime()
            )
              throw "tradingDay.totalTradingMillisecondsBetween arguments must be on the same day or intervalEnd must be the start of the next day instead: intervalStart: '"
                .concat(v, "'; intervalEnd: '")
                .concat(_, "'");
            var S = 0,
              C = p.filter(function (Y) {
                return Y.endTime === tr || d.setTime(v, Y.endTime) >= v;
              }),
              V = Lt(C),
              E;
            try {
              for (V.s(); !(E = V.n()).done; ) {
                var P = E.value,
                  z = d.setTime(v, P.startTime),
                  O =
                    P.endTime === tr
                      ? d.getStartOfNextDay(v)
                      : d.setTime(v, P.endTime);
                if (v < z && _ < z) return S + d.msInterval.count(v, _);
                if ((v < z && (S += d.msInterval.count(v, z)), _ < O)) return S;
                v = O;
              }
            } catch (Y) {
              V.e(Y);
            } finally {
              V.f();
            }
            return S + d.msInterval.count(v, _);
          },
          m = function (v, _) {
            if (_ === 0) return [v, _];
            var S = d.msInterval.offset(v, _),
              C =
                _ > 0
                  ? p.filter(function (Q) {
                      return d.setTime(v, Q.startTime) >= v;
                    })
                  : p
                      .filter(function (Q) {
                        return d.setTime(v, Q.startTime) < v;
                      })
                      .reverse();
            if (C.length === 0) return [d.msInterval.offset(v, _), 0];
            if (_ > 0) {
              var V = Lt(C),
                E;
              try {
                for (V.s(); !(E = V.n()).done; ) {
                  var P = E.value,
                    z = d.setTime(v, P.startTime);
                  z <= S &&
                    ((_ -= d.msInterval.count(v, z)),
                    (v =
                      P.endTime === tr
                        ? d.getStartOfNextDay(v)
                        : d.setTime(v, P.endTime)),
                    (S = d.msInterval.offset(v, _)));
                }
              } catch (Q) {
                V.e(Q);
              } finally {
                V.f();
              }
              _ -= d.msInterval.count(v, S);
            } else {
              var O = Lt(C),
                Y;
              try {
                for (O.s(); !(Y = O.n()).done; ) {
                  var q = Y.value,
                    W =
                      q.endTime === tr
                        ? d.getStartOfNextDay(v)
                        : d.setTime(v, q.endTime);
                  S < W &&
                    ((_ += d.msInterval.count(W, v) + 1),
                    (v = d.msInterval.offset(d.setTime(v, q.startTime), -1)),
                    (S = d.msInterval.offset(v, _)));
                }
              } catch (Q) {
                O.e(Q);
              } finally {
                O.f();
              }
              _ += d.msInterval.count(S, v);
            }
            if (_ !== 0)
              throw "tradingDay.offset was called with an offset that spans more than a day";
            return [S, _];
          };
        return {
          totalTradingTimeInMiliseconds: b,
          nonTradingTimeRanges: p,
          totalTradingMillisecondsBetween: w,
          offset: m,
        };
      },
      rv = function (c, d, p, b, w) {
        var m = {};
        return (
          (m.getTimeComponentArrayFromString = function (g) {
            return [
              g.slice(0, 2),
              g.slice(3, 5),
              g.slice(6, 8),
              g.slice(9, 12),
            ];
          }),
          (m.getTimeString = function (g) {
            var v = p(g).map(function (P) {
                return P.toString(10).padStart(2, "0");
              }),
              _ = ce(v, 4),
              S = _[0],
              C = _[1],
              V = _[2],
              E = _[3];
            return ""
              .concat(S, ":")
              .concat(C, ":")
              .concat(V, ".")
              .concat(E.padStart(3, "0"));
          }),
          (m.setTime = function (g, v) {
            var _ =
                arguments.length > 2 && arguments[2] !== void 0
                  ? arguments[2]
                  : 0,
              S = m.getTimeComponentArrayFromString(v),
              C = ce(S, 4),
              V = C[0],
              E = C[1],
              P = C[2],
              z = C[3];
            return w.offset(c(g, V, E, P, z), _);
          }),
          (m.getStartOfNextDay = function (g) {
            return b.offset(b.floor(g), 1);
          }),
          (m.getEndOfPreviousDay = function (g) {
            return w.offset(b.floor(g), -1);
          }),
          (m.dayInterval = b),
          (m.msInterval = w),
          (m.getDay = d),
          m
        );
      },
      IA = rv(
        function (f, c, d, p, b) {
          return new Date(
            f.getFullYear(),
            f.getMonth(),
            f.getDate(),
            c,
            d,
            p,
            b,
          );
        },
        function (f) {
          return f.getDay();
        },
        function (f) {
          return [
            f.getHours(),
            f.getMinutes(),
            f.getSeconds(),
            f.getMilliseconds(),
          ];
        },
        n.timeDay,
        n.timeMillisecond,
      ),
      nv = function (c, d) {
        var p = function (v) {
            return c[v] === void 0 ? [] : c[v];
          },
          b = [
            pa(p("Sunday"), d),
            pa(p("Monday"), d),
            pa(p("Tuesday"), d),
            pa(p("Wednesday"), d),
            pa(p("Thursday"), d),
            pa(p("Friday"), d),
            pa(p("Saturday"), d),
          ],
          w = b.reduce(function (g, v) {
            return g + v.totalTradingTimeInMiliseconds;
          }, 0);
        if (w === 0)
          throw "Trading pattern must yield at least 1 ms of trading time";
        var m = { tradingDays: b, totalTradingWeekMilliseconds: w };
        return (
          (m.clampUp = function (g) {
            var v = b[d.getDay(g)],
              _ = Lt(v.nonTradingTimeRanges),
              S;
            try {
              for (_.s(); !(S = _.n()).done; ) {
                var C = S.value;
                if (C.isInRange(g))
                  return C.endTime === tr
                    ? m.clampUp(d.getStartOfNextDay(g))
                    : d.setTime(g, C.endTime);
              }
            } catch (V) {
              _.e(V);
            } finally {
              _.f();
            }
            return g;
          }),
          (m.clampDown = function (g) {
            var v = b[d.getDay(g)],
              _ = Lt(v.nonTradingTimeRanges),
              S;
            try {
              for (_.s(); !(S = _.n()).done; ) {
                var C = S.value;
                if (C.isInRange(g))
                  return C.startTime === tr
                    ? m.clampDown(d.getEndOfPreviousDay(g))
                    : d.setTime(g, C.startTime, -1);
              }
            } catch (V) {
              _.e(V);
            } finally {
              _.f();
            }
            return g;
          }),
          (m.distance = function (g, v) {
            if (g.getTime() === v.getTime()) return 0;
            var _ = g <= v ? [g, v, 1] : [v, g, -1],
              S = ce(_, 3),
              C = S[0],
              V = S[1],
              E = S[2];
            if (d.dayInterval(C).getTime() === d.dayInterval(V).getTime())
              return m.tradingDays[d.getDay(C)].totalTradingMillisecondsBetween(
                C,
                V,
              );
            var P =
              m.tradingDays[d.getDay(C)].totalTradingMillisecondsBetween(
                C,
                d.dayInterval.offset(d.dayInterval(C), 1),
              ) +
              m.tradingDays[d.getDay(V)].totalTradingMillisecondsBetween(
                d.dayInterval(V),
                V,
              );
            return d.dayInterval.count(C, V) === 1
              ? P
              : ((C = d.dayInterval.offset(d.dayInterval(C), 1)),
                (V = d.dayInterval(V)),
                E *
                  d.dayInterval.range(C, V).reduce(function (z, O, Y, q) {
                    var W =
                        Y < q.length - 1
                          ? q[Y + 1]
                          : d.dayInterval.offset(O, 1),
                      Q = W - O !== wf,
                      oe = m.tradingDays[d.getDay(O)];
                    return (z += Q
                      ? oe.totalTradingMillisecondsBetween(O, W)
                      : oe.totalTradingTimeInMiliseconds);
                  }, P));
          }),
          (m.offset = function (g, v) {
            g = v >= 0 ? m.clampUp(g) : m.clampDown(g);
            var _ = function (Q) {
                return d.dayInterval.offset(Q) - d.dayInterval(Q) !== wf;
              },
              S = function (Q, oe, pe) {
                if (pe < 0) {
                  var ge = d.dayInterval(oe),
                    he = Q.totalTradingMillisecondsBetween(ge, oe);
                  return Math.abs(pe) <= he
                    ? Q.offset(oe, pe)
                    : [m.clampDown(d.msInterval.offset(ge, -1)), pe + he + 1];
                } else {
                  var Ce = d.getStartOfNextDay(oe),
                    xt = Q.totalTradingMillisecondsBetween(oe, Ce);
                  return pe < xt ? Q.offset(oe, pe) : [m.clampUp(Ce), pe - xt];
                }
              };
            if (v === 0) return g;
            var C =
                v < 0
                  ? function (W, Q, oe) {
                      return [m.clampDown(d.dayInterval.offset(W, -1)), Q + oe];
                    }
                  : function (W, Q, oe) {
                      return [m.clampUp(d.dayInterval.offset(W)), Q - oe];
                    },
              V = m.tradingDays[d.getDay(g)],
              E = S(V, g, v),
              P = ce(E, 2);
            for (g = P[0], v = P[1]; v !== 0; )
              if (((V = m.tradingDays[d.getDay(g)]), _(g))) {
                var z = S(V, g, v),
                  O = ce(z, 2);
                (g = O[0]), (v = O[1]);
              } else {
                var Y =
                    Math.abs(v) >= V.totalTradingTimeInMiliseconds
                      ? C(g, v, V.totalTradingTimeInMiliseconds)
                      : S(V, g, v),
                  q = ce(Y, 2);
                (g = q[0]), (v = q[1]);
              }
            return g;
          }),
          (m.copy = function () {
            return m;
          }),
          m
        );
      },
      zA = function (f) {
        return nv(f, IA);
      },
      PA = rv(
        function (f, c, d, p, b) {
          return new Date(
            Date.UTC(
              f.getUTCFullYear(),
              f.getUTCMonth(),
              f.getUTCDate(),
              c,
              d,
              p,
              b,
            ),
          );
        },
        function (f) {
          return f.getUTCDay();
        },
        function (f) {
          return [
            f.getUTCHours(),
            f.getUTCMinutes(),
            f.getUTCSeconds(),
            f.getUTCMilliseconds(),
          ];
        },
        n.utcDay,
        n.utcMillisecond,
      ),
      RA = function (f) {
        return nv(f, PA);
      };
    function av() {
      var f = [
          function (m) {
            return m;
          },
        ],
        c = [0, 0],
        d = "percent",
        p = null,
        b = [],
        w = function (g) {
          var v = new Array(g.length),
            _ = Lt(f),
            S;
          try {
            for (_.s(); !(S = _.n()).done; )
              for (var C = S.value, V = 0; V < g.length; V++) {
                var E = C(g[V], V);
                Array.isArray(E) ? v.push.apply(v, be(E)) : v.push(E);
              }
          } catch (Y) {
            _.e(Y);
          } finally {
            _.f();
          }
          var P = [t.min(v), t.max(v)];
          if (
            ((P[0] = P[0] == null ? t.min(b) : t.min([P[0]].concat(be(b)))),
            (P[1] = P[1] == null ? t.max(b) : t.max([P[1]].concat(be(b)))),
            p != null)
          ) {
            var z = Math.max(Math.abs(P[1] - p), Math.abs(P[0] - p));
            (P[0] = p - z), (P[1] = p + z);
          }
          switch (d) {
            case "domain": {
              (P[0] -= c[0]), (P[1] += c[1]);
              break;
            }
            case "percent": {
              var O = P[1] - P[0];
              (P[0] -= c[0] * O), (P[1] += c[1] * O);
              break;
            }
            default:
              throw new Error("Unknown padUnit: ".concat(d));
          }
          return P;
        };
      return (
        (w.accessors = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : f;
        }),
        (w.pad = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : c;
        }),
        (w.padUnit = function () {
          return arguments.length
            ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : d;
        }),
        (w.include = function () {
          return arguments.length
            ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : b;
        }),
        (w.symmetricalAbout = function () {
          return arguments.length
            ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : p;
        }),
        w
      );
    }
    function ov() {
      var f = [],
        c = [0, 0],
        d = "percent",
        p = null,
        b = [],
        w = av(),
        m = function (_) {
          return _ != null ? _.valueOf() : null;
        },
        g = function (_) {
          var S = f.map(function (C) {
            return function () {
              var V = C.apply(void 0, arguments);
              return Array.isArray(V) ? V.map(m) : m(V);
            };
          });
          return (
            w
              .accessors(S)
              .pad(c)
              .padUnit(d)
              .symmetricalAbout(p != null ? p.valueOf() : null)
              .include(
                b.map(function (C) {
                  return C.valueOf();
                }),
              ),
            w(_).map(function (C) {
              return new Date(C);
            })
          );
        };
      return (
        (g.accessors = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), g)
            : f;
        }),
        (g.pad = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), g)
            : c;
        }),
        (g.padUnit = function () {
          return arguments.length
            ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), g)
            : d;
        }),
        (g.include = function () {
          return arguments.length
            ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), g)
            : b;
        }),
        (g.symmetricalAbout = function () {
          return arguments.length
            ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), g)
            : p;
        }),
        g
      );
    }
    function iv() {
      var f = 1,
        c = 20,
        d = 0.1,
        p = 0.1,
        b = a.randomNormal(),
        w = function () {
          for (
            var g =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : 0,
              v = f / c,
              _ = [],
              S = 0;
            S < c + 1;
            S++
          ) {
            _.push(g);
            var C = b() * Math.sqrt(v) * p + (d - (p * p) / 2) * v;
            g = g * Math.exp(C);
          }
          return _;
        };
      return (
        (w.period = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : f;
        }),
        (w.steps = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : c;
        }),
        (w.mu = function () {
          return arguments.length
            ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : d;
        }),
        (w.sigma = function () {
          return arguments.length
            ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : p;
        }),
        (w.random = function () {
          return arguments.length
            ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), w)
            : b;
        }),
        w
      );
    }
    function LA(f) {
      return typeof f == "function"
        ? f
        : function () {
            return f;
          };
    }
    function OA() {
      var f = new Date(),
        c = 100,
        d = n.timeDay,
        p = 1,
        b = n.timeYear,
        w = 1,
        m = null,
        g = function () {
          var z = a.randomNormal(1, 0.1);
          return Math.ceil(z() * 1e3);
        },
        v = iv(),
        _ = function (z) {
          var O = b.offset(z, w) - z;
          return (d.offset(z, p) - z) / O;
        },
        S = function (z, O) {
          var Y = _(z),
            q = v.period(Y)(O),
            W = {
              date: z,
              open: q[0],
              high: Math.max.apply(Math, q),
              low: Math.min.apply(Math, q),
              close: q[v.steps()],
            };
          return (W.volume = g(W)), W;
        },
        C = function (z) {
          var O, Y, q;
          do
            (O = z ? d.offset(z.date, p) : new Date(f.getTime())),
              (Y = z ? z.close : c),
              (z = S(O, Y)),
              (q = m && !m(z));
          while (q);
          return z;
        },
        V = function () {
          var z,
            O = {};
          return (
            (O.next = function () {
              var Y = C(z);
              return (z = Y), Y;
            }),
            (O.take = function (Y) {
              return O.until(function (q, W) {
                return !Y || Y < 0 || W === Y;
              });
            }),
            (O.until = function (Y) {
              for (var q = [], W = 0, Q = C(z), oe = Y && !Y(Q, W); oe; )
                q.push(Q), (z = Q), (Q = C(z)), (W += 1), (oe = Y && !Y(Q, W));
              return q;
            }),
            O
          );
        },
        E = function (z) {
          return V().take(z);
        };
      if (
        ((E.stream = V),
        typeof Symbol != "function" || ee(Symbol.iterator) !== "symbol")
      )
        throw new Error(
          "d3fc-random-data depends on Symbol. Make sure that you load a polyfill in older browsers. See README.",
        );
      return (
        (E[Symbol.iterator] = function () {
          var P = V();
          return {
            next: function () {
              return { value: P.next(), done: !1 };
            },
          };
        }),
        (E.startDate = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), E)
            : f;
        }),
        (E.startPrice = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), E)
            : c;
        }),
        (E.interval = function () {
          return arguments.length
            ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), E)
            : d;
        }),
        (E.intervalStep = function () {
          return arguments.length
            ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), E)
            : p;
        }),
        (E.unitInterval = function () {
          return arguments.length
            ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), E)
            : b;
        }),
        (E.unitIntervalStep = function () {
          return arguments.length
            ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), E)
            : w;
        }),
        (E.filter = function () {
          return arguments.length
            ? ((m = arguments.length <= 0 ? void 0 : arguments[0]), E)
            : m;
        }),
        (E.volume = function () {
          return arguments.length
            ? ((g = LA(arguments.length <= 0 ? void 0 : arguments[0])), E)
            : g;
        }),
        k(E, v),
        E
      );
    }
    function BA(f) {
      var c = f.date.getDay();
      return !(c === 0 || c === 6);
    }
    function FA() {
      var f = "BTC-USD",
        c = null,
        d = null,
        p = null,
        b = function () {
          var m = [];
          c != null && m.push("start=" + c.toISOString()),
            d != null && m.push("end=" + d.toISOString()),
            p != null && m.push("granularity=" + p);
          var g =
            "https://api.gdax.com/products/" + f + "/candles?" + m.join("&");
          return o.json(g).then(function (v) {
            return v.map(function (_) {
              return {
                date: new Date(_[0] * 1e3),
                open: _[3],
                high: _[2],
                low: _[1],
                close: _[4],
                volume: _[5],
              };
            });
          });
        };
      return (
        (b.product = function (w) {
          return arguments.length ? ((f = w), b) : f;
        }),
        (b.start = function (w) {
          return arguments.length ? ((c = w), b) : c;
        }),
        (b.end = function (w) {
          return arguments.length ? ((d = w), b) : d;
        }),
        (b.granularity = function (w) {
          return arguments.length ? ((p = w), b) : p;
        }),
        b
      );
    }
    function _f() {
      var f = 10,
        c = function (p) {
          return f <= 1
            ? p.map(function (b) {
                return [b];
              })
            : t.range(0, Math.ceil(p.length / f)).map(function (b) {
                return p.slice(b * f, (b + 1) * f);
              });
        };
      return (
        (c.bucketSize = function (d) {
          return arguments.length ? ((f = d), c) : f;
        }),
        c
      );
    }
    function HA() {
      var f = _f(),
        c = function (m) {
          return m;
        },
        d = function (m) {
          return m;
        },
        p = function (m) {
          if (f.bucketSize() >= m.length) return m;
          var g = b(m),
            v = f(g),
            _ = f(m.slice(1, m.length - 1)),
            S = _.map(function (C, V) {
              var E = v[V],
                P = t.max(E),
                z = E.indexOf(P);
              return C[z];
            });
          return [].concat([m[0]], S, [m[m.length - 1]]);
        };
      function b(w) {
        var m = w.map(function (v) {
            return [c(v), d(v)];
          }),
          g = t.range(1, m.length - 1).map(function (v) {
            var _ = m[v - 1],
              S = m[v],
              C = m[v + 1];
            return (
              0.5 *
              Math.abs(
                (_[0] - C[0]) * (S[1] - _[1]) - (_[0] - S[0]) * (C[1] - _[1]),
              )
            );
          });
        return g;
      }
      return (
        A(p, f, "bucketSize"),
        (p.x = function (w) {
          return arguments.length ? ((c = w), p) : c;
        }),
        (p.y = function (w) {
          return arguments.length ? ((d = w), p) : d;
        }),
        p
      );
    }
    function YA() {
      var f = function (w) {
          return w;
        },
        c = function (w) {
          return w;
        },
        d = _f(),
        p = function (w) {
          if (d.bucketSize() >= w.length) return w;
          var m = d(w.slice(1, w.length - 1)),
            g = w[0],
            v = w[w.length - 1],
            _ = [].concat([g], m, [v]),
            S = f(g),
            C = c(g),
            V = m.map(function (E, P) {
              var z = t.mean(_[P + 1], f),
                O = t.mean(_[P + 1], c),
                Y = E.map(function (oe) {
                  return [f(oe), c(oe)];
                }),
                q = Y.map(function (oe) {
                  return (
                    0.5 *
                    Math.abs((S - z) * (oe[1] - C) - (S - oe[0]) * (O - C))
                  );
                }),
                W = q.indexOf(t.max(q)),
                Q = Y[W];
              return (S = Q[0]), (C = Q[1]), E[W];
            });
          return [].concat([w[0]], V, [w[w.length - 1]]);
        };
      return (
        A(p, d, "bucketSize"),
        (p.x = function (b) {
          return arguments.length ? ((f = b), p) : f;
        }),
        (p.y = function (b) {
          return arguments.length ? ((c = b), p) : c;
        }),
        p
      );
    }
    function qA() {
      var f = _f(),
        c = function (b) {
          return b;
        },
        d = function (b) {
          if (f.bucketSize() > b.length) return b;
          var w = t.extent(b, c),
            m = f(b.slice(1, b.length - 1)),
            g = m.map(function (v, _) {
              var S = {},
                C,
                V,
                E = !0,
                P = v.map(c),
                z = P.filter(function (O) {
                  return O === w[0] || O === w[1];
                }).map(function (O) {
                  return P.indexOf(O);
                })[0];
              return z !== void 0
                ? v[z]
                : (P.forEach(function (O, Y) {
                    S[O] === void 0 && (S[O] = 0),
                      S[O]++,
                      S[O] > S[C] || C === void 0
                        ? ((C = O), (V = Y), (E = !0))
                        : S[O] === S[C] && (E = !1);
                  }),
                  E ? v[V] : v[Math.floor(v.length / 2)]);
            });
          return [].concat([b[0]], g, [b[b.length - 1]]);
        };
      return (
        A(d, f, "bucketSize"),
        (d.value = function (p) {
          return arguments.length ? ((c = p), d) : c;
        }),
        d
      );
    }
    var De = function (f) {
        return typeof f == "function"
          ? f
          : function () {
              return f;
            };
      },
      $s = function () {
        var f = null,
          c = function (S) {
            return S.date;
          },
          d = function (S) {
            return S.open;
          },
          p = function (S) {
            return S.high;
          },
          b = function (S) {
            return S.low;
          },
          w = function (S) {
            return S.close;
          },
          m = "vertical",
          g = De(3),
          v = function (S) {
            var C = f || i.path();
            return (
              S.forEach(function (V, E) {
                var P = c(V, E),
                  z = d(V, E),
                  O = p(V, E),
                  Y = b(V, E),
                  q = w(V, E),
                  W = g(V, E) / 2;
                m === "vertical"
                  ? (C.moveTo(P, Y),
                    C.lineTo(P, O),
                    C.moveTo(P, z),
                    C.lineTo(P - W, z),
                    C.moveTo(P, q),
                    C.lineTo(P + W, q))
                  : (C.moveTo(Y, P),
                    C.lineTo(O, P),
                    C.moveTo(z, P),
                    C.lineTo(z, P + W),
                    C.moveTo(q, P),
                    C.lineTo(q, P - W));
              }),
              f ? null : C.toString()
            );
          };
        return (
          (v.context = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : f;
          }),
          (v.x = function () {
            return arguments.length
              ? ((c = De(arguments.length <= 0 ? void 0 : arguments[0])), v)
              : c;
          }),
          (v.open = function () {
            return arguments.length
              ? ((d = De(arguments.length <= 0 ? void 0 : arguments[0])), v)
              : d;
          }),
          (v.high = function () {
            return arguments.length
              ? ((p = De(arguments.length <= 0 ? void 0 : arguments[0])), v)
              : p;
          }),
          (v.low = function () {
            return arguments.length
              ? ((b = De(arguments.length <= 0 ? void 0 : arguments[0])), v)
              : b;
          }),
          (v.close = function () {
            return arguments.length
              ? ((w = De(arguments.length <= 0 ? void 0 : arguments[0])), v)
              : w;
          }),
          (v.width = function () {
            return arguments.length
              ? ((g = De(arguments.length <= 0 ? void 0 : arguments[0])), v)
              : g;
          }),
          (v.orient = function () {
            return arguments.length
              ? ((m = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : m;
          }),
          v
        );
      },
      xo = function () {
        var f = null,
          c = function (_) {
            return _.x;
          },
          d = function (_) {
            return _.y;
          },
          p = "center",
          b = "center",
          w = function (_) {
            return _.height;
          },
          m = De(3),
          g = function (_, S) {
            var C = f || i.path();
            return (
              _.forEach(function (V, E) {
                var P = c.call(this, V, S || E),
                  z = d.call(this, V, S || E),
                  O = w.call(this, V, S || E),
                  Y = m.call(this, V, S || E),
                  q;
                switch (p) {
                  case "left":
                    q = Y;
                    break;
                  case "right":
                    q = 0;
                    break;
                  case "center":
                    q = Y / 2;
                    break;
                  default:
                    throw new Error("Invalid horizontal alignment " + p);
                }
                var W;
                switch (b) {
                  case "bottom":
                    W = -O;
                    break;
                  case "top":
                    W = 0;
                    break;
                  case "center":
                    W = O / 2;
                    break;
                  default:
                    throw new Error("Invalid vertical alignment " + b);
                }
                C.rect(P - q, z - W, Y, O);
              }, this),
              f ? null : C.toString()
            );
          };
        return (
          (g.context = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : f;
          }),
          (g.x = function () {
            return arguments.length
              ? ((c = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : c;
          }),
          (g.y = function () {
            return arguments.length
              ? ((d = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : d;
          }),
          (g.width = function () {
            return arguments.length
              ? ((m = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : m;
          }),
          (g.horizontalAlign = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : p;
          }),
          (g.height = function () {
            return arguments.length
              ? ((w = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : w;
          }),
          (g.verticalAlign = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : b;
          }),
          g
        );
      },
      Gs = function () {
        var f = null,
          c = function (_) {
            return _.date;
          },
          d = function (_) {
            return _.open;
          },
          p = function (_) {
            return _.high;
          },
          b = function (_) {
            return _.low;
          },
          w = function (_) {
            return _.close;
          },
          m = De(3),
          g = function (_) {
            var S = f || i.path();
            return (
              _.forEach(function (C, V) {
                var E = c(C, V),
                  P = d(C, V),
                  z = p(C, V),
                  O = b(C, V),
                  Y = w(C, V),
                  q = m(C, V),
                  W = q / 2;
                S.rect(E - W, P, q, Y - P),
                  S.moveTo(E, Math.min(Y, P)),
                  S.lineTo(E, z),
                  S.moveTo(E, Math.max(Y, P)),
                  S.lineTo(E, O);
              }),
              f ? null : S.toString()
            );
          };
        return (
          (g.context = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : f;
          }),
          (g.x = function () {
            return arguments.length
              ? ((c = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : c;
          }),
          (g.open = function () {
            return arguments.length
              ? ((d = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : d;
          }),
          (g.high = function () {
            return arguments.length
              ? ((p = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : p;
          }),
          (g.low = function () {
            return arguments.length
              ? ((b = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : b;
          }),
          (g.close = function () {
            return arguments.length
              ? ((w = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : w;
          }),
          (g.width = function () {
            return arguments.length
              ? ((m = De(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : m;
          }),
          g
        );
      },
      Us = function () {
        var f = null,
          c = function (V) {
            return V.value;
          },
          d = function (V) {
            return V.median;
          },
          p = function (V) {
            return V.upperQuartile;
          },
          b = function (V) {
            return V.lowerQuartile;
          },
          w = function (V) {
            return V.high;
          },
          m = function (V) {
            return V.low;
          },
          g = "vertical",
          v = De(5),
          _ = De(0.5),
          S = function (V) {
            var E = f || i.path();
            return (
              V.forEach(function (P, z) {
                var O = c(P, z),
                  Y = v(P, z),
                  q = Y / 2,
                  W = Y * _(P, z),
                  Q = W / 2,
                  oe = w(P, z),
                  pe = p(P, z),
                  ge = d(P, z),
                  he = b(P, z),
                  Ce = m(P, z),
                  xt = he - pe;
                g === "vertical"
                  ? (E.moveTo(O - Q, oe),
                    E.lineTo(O + Q, oe),
                    E.moveTo(O, oe),
                    E.lineTo(O, pe),
                    E.rect(O - q, pe, Y, xt),
                    E.moveTo(O - q, ge),
                    E.lineTo(O + q, ge),
                    E.moveTo(O, he),
                    E.lineTo(O, Ce),
                    E.moveTo(O - Q, Ce),
                    E.lineTo(O + Q, Ce))
                  : (E.moveTo(Ce, O - Q),
                    E.lineTo(Ce, O + Q),
                    E.moveTo(Ce, O),
                    E.lineTo(he, O),
                    E.rect(he, O - q, -xt, Y),
                    E.moveTo(ge, O - q),
                    E.lineTo(ge, O + q),
                    E.moveTo(pe, O),
                    E.lineTo(oe, O),
                    E.moveTo(oe, O - Q),
                    E.lineTo(oe, O + Q));
              }),
              f ? null : E.toString()
            );
          };
        return (
          (S.context = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), S)
              : f;
          }),
          (S.value = function () {
            return arguments.length
              ? ((c = De(arguments.length <= 0 ? void 0 : arguments[0])), S)
              : c;
          }),
          (S.median = function () {
            return arguments.length
              ? ((d = De(arguments.length <= 0 ? void 0 : arguments[0])), S)
              : d;
          }),
          (S.upperQuartile = function () {
            return arguments.length
              ? ((p = De(arguments.length <= 0 ? void 0 : arguments[0])), S)
              : p;
          }),
          (S.lowerQuartile = function () {
            return arguments.length
              ? ((b = De(arguments.length <= 0 ? void 0 : arguments[0])), S)
              : b;
          }),
          (S.high = function () {
            return arguments.length
              ? ((w = De(arguments.length <= 0 ? void 0 : arguments[0])), S)
              : w;
          }),
          (S.low = function () {
            return arguments.length
              ? ((m = De(arguments.length <= 0 ? void 0 : arguments[0])), S)
              : m;
          }),
          (S.width = function () {
            return arguments.length
              ? ((v = De(arguments.length <= 0 ? void 0 : arguments[0])), S)
              : v;
          }),
          (S.orient = function () {
            return arguments.length
              ? ((g = arguments.length <= 0 ? void 0 : arguments[0]), S)
              : g;
          }),
          (S.cap = function () {
            return arguments.length
              ? ((_ = De(arguments.length <= 0 ? void 0 : arguments[0])), S)
              : _;
          }),
          S
        );
      },
      Xs = function () {
        var f = null,
          c = function (v) {
            return v.x;
          },
          d = function (v) {
            return v.high;
          },
          p = function (v) {
            return v.low;
          },
          b = "vertical",
          w = De(5),
          m = function (v) {
            var _ = f || i.path();
            return (
              v.forEach(function (S, C) {
                var V = c(S, C),
                  E = w(S, C),
                  P = E / 2,
                  z = d(S, C),
                  O = p(S, C);
                b === "vertical"
                  ? (_.moveTo(V - P, z),
                    _.lineTo(V + P, z),
                    _.moveTo(V, z),
                    _.lineTo(V, O),
                    _.moveTo(V - P, O),
                    _.lineTo(V + P, O))
                  : (_.moveTo(O, V - P),
                    _.lineTo(O, V + P),
                    _.moveTo(O, V),
                    _.lineTo(z, V),
                    _.moveTo(z, V - P),
                    _.lineTo(z, V + P));
              }),
              f ? null : _.toString()
            );
          };
        return (
          (m.context = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : f;
          }),
          (m.value = function () {
            return arguments.length
              ? ((c = De(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : c;
          }),
          (m.high = function () {
            return arguments.length
              ? ((d = De(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : d;
          }),
          (m.low = function () {
            return arguments.length
              ? ((p = De(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : p;
          }),
          (m.width = function () {
            return arguments.length
              ? ((w = De(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : w;
          }),
          (m.orient = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : b;
          }),
          m
        );
      },
      js = function (f) {
        return typeof f == "function"
          ? f
          : function () {
              return f;
            };
      },
      Qs = 1e-6,
      at = function (c) {
        return c.selection() !== c;
      },
      ze = function (f, c) {
        f = f || "g";
        var d = function (m, g) {
            return g;
          },
          p = null,
          b = function (m, g) {
            g =
              g ||
              function (z) {
                return z;
              };
            var v = m.selection(),
              _ = at(m) ? m : null,
              S = v.selectChildren(c == null ? f : "".concat(f, ".").concat(c)),
              C = S.data(g, d),
              V = C.enter().append(f).attr("class", c),
              E = C.exit();
            C = C.merge(V);
            var P = _ || p;
            return (
              P &&
                ((C = C.transition(P).style("opacity", 1)),
                V.style("opacity", Qs),
                (E = E.transition(P).style("opacity", Qs))),
              E.remove(),
              (C.enter = function () {
                return V;
              }),
              (C.exit = function () {
                return E;
              }),
              C
            );
          };
        return (
          (b.element = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), b)
              : f;
          }),
          (b.className = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), b)
              : c;
          }),
          (b.key = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), b)
              : d;
          }),
          (b.transition = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), b)
              : p;
          }),
          b
        );
      },
      WA = function (f) {
        var c = function () {},
          d = function () {
            return [0, 0];
          },
          p = function (C, V) {
            return [C.x, C.y];
          },
          b =
            f ||
            function (S) {
              return S;
            },
          w = function () {},
          m = r.scaleIdentity(),
          g = r.scaleIdentity(),
          v = ze("g", "label"),
          _ = function (C) {
            C.each(function (V, E, P) {
              var z = v(u.select(P[E]), V).call(w),
                O = z.nodes(),
                Y = O.map(function (W, Q) {
                  var oe = u.select(W).datum(),
                    pe = p(oe, Q, O),
                    ge = [m(pe[0]), g(pe[1])],
                    he = d(oe, Q, O);
                  return {
                    hidden: !1,
                    x: ge[0],
                    y: ge[1],
                    width: he[0],
                    height: he[1],
                  };
                }),
                q = b(Y);
              z
                .attr("style", function (W, Q) {
                  return "display:" + (q[Q].hidden ? "none" : "inherit");
                })
                .attr("transform", function (W, Q) {
                  return "translate(" + q[Q].x + ", " + q[Q].y + ")";
                })
                .attr("layout-width", function (W, Q) {
                  return q[Q].width;
                })
                .attr("layout-height", function (W, Q) {
                  return q[Q].height;
                })
                .attr("anchor-x", function (W, Q, oe) {
                  return Y[Q].x - q[Q].x;
                })
                .attr("anchor-y", function (W, Q, oe) {
                  return Y[Q].y - q[Q].y;
                }),
                z.call(w),
                c(z, V, E);
            });
          };
        return (
          k(_, v, F("key")),
          k(_, b),
          (_.size = function () {
            return arguments.length
              ? ((d = js(arguments.length <= 0 ? void 0 : arguments[0])), _)
              : d;
          }),
          (_.position = function () {
            return arguments.length
              ? ((p = js(arguments.length <= 0 ? void 0 : arguments[0])), _)
              : p;
          }),
          (_.component = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), _)
              : w;
          }),
          (_.decorate = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), _)
              : c;
          }),
          (_.xScale = function () {
            return arguments.length
              ? ((m = arguments.length <= 0 ? void 0 : arguments[0]), _)
              : m;
          }),
          (_.yScale = function () {
            return arguments.length
              ? ((g = arguments.length <= 0 ? void 0 : arguments[0]), _)
              : g;
          }),
          _
        );
      },
      $A = function (f) {
        var c = 2,
          d = function (v) {
            return v;
          },
          p = ze("text"),
          b = ze("rect"),
          w = ze("circle"),
          m = function (v) {
            v.each(function (_, S, C) {
              var V = C[S],
                E = u.select(V),
                P = Number(V.getAttribute("layout-width")),
                z = Number(V.getAttribute("layout-height")),
                O = b(E, [_]);
              O.attr("width", P).attr("height", z);
              var Y = Number(V.getAttribute("anchor-x")),
                q = Number(V.getAttribute("anchor-y")),
                W = w(E, [_]);
              W.attr("r", 2).attr("cx", Y).attr("cy", q);
              var Q = p(E, [_]);
              Q.enter()
                .attr("dy", "0.9em")
                .attr("transform", "translate(".concat(c, ", ").concat(c, ")")),
                Q.text(d);
            });
          };
        return (
          (m.padding = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          (m.value = function () {
            return arguments.length
              ? ((d = js(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : d;
          }),
          m
        );
      },
      GA = function (c, d) {
        return !(
          c.x >= d.x + d.width ||
          c.x + c.width <= d.x ||
          c.y >= d.y + d.height ||
          c.y + c.height <= d.y
        );
      },
      Ks = function (f, c) {
        if (GA(f, c)) {
          var d = Math.max(f.x, c.x),
            p = Math.min(f.x + f.width, c.x + c.width),
            b = Math.max(f.y, c.y),
            w = Math.min(f.y + f.height, c.y + c.height);
          return (p - d) * (w - b);
        } else return 0;
      },
      Zs = function (c, d) {
        return t.sum(
          c.map(function (p, b) {
            return d === b ? 0 : Ks(c[d], p);
          }),
        );
      },
      Tn = function (c, d, p, b, w) {
        return { x: c, y: d, width: p, height: b, location: w };
      },
      uv = function (f) {
        var c = f.x,
          d = f.y,
          p = f.width,
          b = f.height;
        return [
          Tn(c, d, p, b, "bottom-right"),
          Tn(c - p, d, p, b, "bottom-left"),
          Tn(c - p, d - b, p, b, "top-left"),
          Tn(c, d - b, p, b, "top-right"),
          Tn(c, d - b / 2, p, b, "middle-right"),
          Tn(c - p / 2, d, p, b, "bottom-center"),
          Tn(c - p, d - b / 2, p, b, "middle-left"),
          Tn(c - p / 2, d - b, p, b, "top-center"),
        ];
      },
      fv = function (c, d, p) {
        return [].concat(be(c.slice(0, d)), [p], be(c.slice(d + 1)));
      },
      UA = function (c, d) {
        return c < d;
      },
      lv = function f() {
        var c = null,
          d = UA,
          p = function () {
            return 0;
          },
          b,
          w = function (v, _) {
            return c - p(b[_], _, b) + p(v, _, fv(b, _, v));
          },
          m = function g(v, _) {
            c ||
              (c = t.sum(
                b.map(function (C, V) {
                  return p(C, V, b);
                }),
              ));
            var S = w(v, _);
            return d(S, c)
              ? f()
                  .locationScore(p)
                  .winningScore(d)
                  .score(S)
                  .rectangles(fv(b, _, v))
              : g;
          };
        return (
          (m.rectangles = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : b;
          }),
          (m.score = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          (m.winningScore = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : d;
          }),
          (m.locationScore = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : p;
          }),
          m
        );
      },
      XA = function () {
        var f,
          c = function (w) {
            return f ? w.width * w.height - Ks(w, f) : 0;
          },
          d = function (w, m, g) {
            return Zs(g, m) + c(w);
          },
          p = function (w) {
            var m = lv().locationScore(d).rectangles(w);
            return (
              w.forEach(function (g, v) {
                uv(g).forEach(function (_, S) {
                  m = m(_, v);
                });
              }),
              m.rectangles()
            );
          };
        return (
          (p.bounds = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : f;
          }),
          p
        );
      },
      jA = function (c) {
        return c[cv(c)];
      },
      cv = function (c) {
        return Math.floor(Math.random() * c.length);
      },
      QA = function () {
        var f = 1e3,
          c = 1,
          d,
          p = function (v) {
            switch (v.location) {
              case "bottom-right":
                return 0;
              case "middle-right":
              case "bottom-center":
                return (v.width * v.height) / 8;
            }
            return (v.width * v.height) / 4;
          },
          b = function (v) {
            return d ? v.width * v.height - Ks(v, d) : 0;
          },
          w = function (v, _, S) {
            return Zs(S, _) + b(v) + p(v);
          },
          m = function (v) {
            for (
              var _ = f,
                S = function (z, O) {
                  return Math.exp((O - z) / _) > Math.random();
                },
                C = lv().locationScore(w).winningScore(S).rectangles(v);
              _ > 0;

            ) {
              var V = cv(v),
                E = jA(uv(v[V]));
              (C = C(E, V)), (_ -= c);
            }
            return C.rectangles();
          };
        return (
          (m.temperature = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : f;
          }),
          (m.cooling = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          (m.bounds = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : d;
          }),
          m
        );
      },
      KA = function (c, d) {
        return c[t.scan(c, d)];
      },
      ZA = function (f) {
        f =
          f ||
          function (d) {
            return d;
          };
        var c = function (p) {
          p = f(p);
          for (
            var b = function () {
              var g = p.filter(function (S) {
                  return !S.hidden;
                }),
                v = g.map(function (S, C) {
                  return [S, Zs(g, C)];
                }),
                _ = KA(v, function (S, C) {
                  return C[1] - S[1];
                });
              if (_[1] > 0) _[0].hidden = !0;
              else return "break";
            };
            ;

          ) {
            var w = b();
            if (w === "break") break;
          }
          return p;
        };
        return k(c, f), c;
      },
      JA = function () {
        var f = [0, 0],
          c = function (p) {
            return p.map(function (b, w) {
              var m = b.x,
                g = b.y;
              return (
                m + b.width > f[0] && (m -= b.width),
                g + b.height > f[1] && (g -= b.height),
                { height: b.height, width: b.width, x: m, y: g }
              );
            });
          };
        return (
          (c.bounds = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), c)
              : f;
          }),
          c
        );
      },
      $e = function (f) {
        return typeof f == "function"
          ? f
          : function () {
              return f;
            };
      };
    function zi() {
      var f = arguments;
      return function (c, d) {
        for (var p = 0, b = f.length; p < b; p++)
          if (f[p](c, d) == null) return !1;
        return !0;
      };
    }
    var Pi = function (f, c) {
        switch (f) {
          case "left":
            return c / 2;
          case "right":
            return -c / 2;
          default:
            return 0;
        }
      },
      ga = function (f) {
        var c = Object.assign({}, f),
          d = function () {};
        return (
          Object.keys(c).forEach(function (p) {
            d[p] = function () {
              return arguments.length
                ? ((c[p] = arguments.length <= 0 ? void 0 : arguments[0]), d)
                : c[p];
            };
          }),
          d
        );
      },
      rr = function () {
        var f = function () {
            return 0;
          },
          c = function (v) {
            return v.x;
          },
          d = function (v) {
            return v.y;
          },
          p = "center",
          b = function () {
            return 5;
          },
          w = "vertical",
          m = ga({
            decorate: function () {},
            defined: function (v, _) {
              return zi(f, c, d)(v, _);
            },
            xScale: r.scaleIdentity(),
            yScale: r.scaleIdentity(),
          });
        return (
          (m.values = function (g, v) {
            var _ = b(g, v),
              S = Pi(p, _),
              C = m.xScale(),
              V = m.yScale();
            if (w === "vertical") {
              var E = V(d(g, v), v),
                P = V(f(g, v), v),
                z = C(c(g, v), v) + S;
              return {
                d: g,
                x: z,
                y: E,
                y0: P,
                width: _,
                height: E - P,
                origin: [z, E],
                baseOrigin: [z, P],
                transposedX: z,
                transposedY: E,
              };
            } else {
              var O = C(d(g, v), v),
                Y = C(f(g, v), v),
                q = V(c(g, v), v) + S;
              return {
                d: g,
                x: q,
                y: O,
                y0: Y,
                width: _,
                height: O - Y,
                origin: [O, q],
                baseOrigin: [Y, q],
                transposedX: O,
                transposedY: q,
              };
            }
          }),
          (m.xValues = function () {
            return w === "vertical" ? [c] : [f, d];
          }),
          (m.yValues = function () {
            return w !== "vertical" ? [c] : [f, d];
          }),
          (m.baseValue = function () {
            return arguments.length
              ? ((f = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : f;
          }),
          (m.crossValue = function () {
            return arguments.length
              ? ((c = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : c;
          }),
          (m.mainValue = function () {
            return arguments.length
              ? ((d = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : d;
          }),
          (m.bandwidth = function () {
            return arguments.length
              ? ((b = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : b;
          }),
          (m.align = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : p;
          }),
          (m.orient = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : w;
          }),
          m
        );
      },
      ek = "#c60",
      tk = "#6c0",
      rk = "#000",
      nk = "#ddd",
      ak = "#999",
      et = { red: ek, green: tk, black: rk, gray: nk, darkGray: ak },
      Js = function () {
        var f = rr(),
          c = l
            .line()
            .x(function (b, w) {
              return f.values(b, w).transposedX;
            })
            .y(function (b, w) {
              return f.values(b, w).transposedY;
            }),
          d = ze("path", "line"),
          p = function (w) {
            at(w) && d.transition(w),
              c.defined(f.defined()),
              w.each(function (m, g, v) {
                var _ = d(u.select(v[g]), [m]);
                _.enter().attr("fill", "none").attr("stroke", et.black),
                  _.attr("d", c),
                  f.decorate()(_, m, g);
              });
          };
        return (
          k(p, f, B("baseValue", "bandwidth", "align")),
          A(p, d, "key"),
          A(p, c, "curve"),
          p
        );
      },
      ed = function () {
        var f = rr(),
          c = l
            .line()
            .x(function (p, b) {
              return f.values(p, b).transposedX;
            })
            .y(function (p, b) {
              return f.values(p, b).transposedY;
            }),
          d = function (b) {
            var w = c.context();
            w.beginPath(),
              (w.strokeStyle = et.black),
              (w.fillStyle = "transparent"),
              f.decorate()(w, b),
              c.defined(f.defined())(b),
              w.fill(),
              w.stroke(),
              w.closePath();
          };
        return (
          k(d, f, B("baseValue", "bandwidth", "align")),
          A(d, c, "curve", "context"),
          d
        );
      },
      it = function () {
        var f = [0, 1],
          c = [-1, 1],
          d = function () {};
        return (
          (d.domain = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), d)
              : f;
          }),
          (d.range = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), d)
              : c;
          }),
          d
        );
      },
      sv = function () {
        var f = {},
          c = {},
          d = null,
          p = function (w, m) {
            var g = w.context();
            Object.keys(f).forEach(function (v) {
              var _ = f[v];
              if (typeof _ != "function")
                throw new Error(
                  "Expected an attribute for ".concat(v, ", found ").concat(_),
                );
              var S = g.getAttribLocation(m, v);
              _.location(S)(w);
            }),
              Object.keys(c).forEach(function (v) {
                var _ = c[v];
                if (typeof _ != "function")
                  throw new Error(
                    "Expected a uniform for ".concat(v, ", found ").concat(_),
                  );
                var S = g.getUniformLocation(m, v);
                _.location(S)(w);
              }),
              d !== null && d(w);
          };
        return (
          (p.flush = function () {
            Object.values(f).forEach(function (b) {
              return b.clear();
            }),
              Object.values(c).forEach(function (b) {
                return b.clear();
              }),
              d !== null && d.clear();
          }),
          (p.attribute = function () {
            for (var b = arguments.length, w = new Array(b), m = 0; m < b; m++)
              w[m] = arguments[m];
            return w.length === 1 ? f[w[0]] : ((f[w[0]] = w[1]), p);
          }),
          (p.uniform = function () {
            for (var b = arguments.length, w = new Array(b), m = 0; m < b; m++)
              w[m] = arguments[m];
            return w.length === 1 ? c[w[0]] : ((c[w[0]] = w[1]), p);
          }),
          (p.elementIndices = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : d;
          }),
          p
        );
      },
      Qt = function (f) {
        var c = -1,
          d = f,
          p = !0,
          b = function (m) {
            if (!!p) {
              var g = m.context();
              if (Array.isArray(d))
                switch (d.length) {
                  case 1:
                    g.uniform1fv(c, d);
                    break;
                  case 2:
                    g.uniform2fv(c, d);
                    break;
                  case 3:
                    g.uniform3fv(c, d);
                    break;
                  case 4:
                    g.uniform4fv(c, d);
                    break;
                  default:
                    throw new Error(
                      "Uniform supports up to 4 elements. ".concat(
                        d.length,
                        " provided.",
                      ),
                    );
                }
              else g.uniform1f(c, d);
              p = !1;
            }
          };
        return (
          (b.clear = function () {
            p = !0;
          }),
          (b.location = function () {
            return arguments.length
              ? (c !== (arguments.length <= 0 ? void 0 : arguments[0]) &&
                  ((c = arguments.length <= 0 ? void 0 : arguments[0]),
                  (p = !0)),
                b)
              : c;
          }),
          (b.data = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]),
                (p = !0),
                b)
              : d;
          }),
          b
        );
      },
      an = {
        POINTS: 0,
        LINES: 1,
        LINE_LOOP: 2,
        LINE_STRIP: 3,
        TRIANGLES: 4,
        TRIANGLE_STRIP: 5,
        TRIANGLE_FAN: 6,
      },
      on = function () {
        var f = null,
          c = null,
          d = null,
          p = null,
          b = null,
          w = null,
          m = an.TRIANGLES,
          g = 0,
          v = sv(),
          _ = !1,
          S = null,
          C = !0,
          V = 1,
          E = function Y(q) {
            if (f != null) {
              var W = d(),
                Q = p();
              if (
                (P(c, W, Q) && ((c = z(W, Q)), (b = W), (w = Q), (C = !1)),
                f.useProgram(c),
                v.uniform(
                  "uScreen",
                  Qt([f.canvas.width / V, f.canvas.height / V]),
                ),
                v(Y, c),
                g === 0)
              )
                v.elementIndices() == null
                  ? f.drawArrays(m, 0, q)
                  : f.drawElements(m, q, f.UNSIGNED_SHORT, 0);
              else if (v.elementIndices() == null)
                S.drawArraysInstancedANGLE(m, 0, g, q);
              else {
                var oe = v.elementIndices().data().length;
                if (g !== oe)
                  throw new Error(
                    "Expected elementIndices length ".concat(oe) +
                      " to match subInstanceCount ".concat(g, "."),
                  );
                S.drawElementsInstancedANGLE(m, g, f.UNSIGNED_SHORT, 0, q);
              }
            }
          };
        return (
          (E.extInstancedArrays = function () {
            return S;
          }),
          (E.context = function () {
            for (var Y = arguments.length, q = new Array(Y), W = 0; W < Y; W++)
              q[W] = arguments[W];
            return q.length
              ? ((q[0] == null || q[0] !== f) && (v.flush(), (C = !0)),
                q[0] != null &&
                  q[0] !== f &&
                  (S = q[0].getExtension("ANGLE_instanced_arrays")),
                (f = q[0]),
                E)
              : f;
          }),
          (E.buffers = function () {
            return arguments.length
              ? ((v = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : v;
          }),
          (E.vertexShader = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : d;
          }),
          (E.fragmentShader = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : p;
          }),
          (E.mode = function () {
            return arguments.length
              ? ((m = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : m;
          }),
          (E.subInstanceCount = function () {
            return arguments.length
              ? ((g = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : g;
          }),
          (E.debug = function () {
            return arguments.length
              ? ((_ = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : _;
          }),
          (E.pixelRatio = function () {
            return arguments.length
              ? ((V = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : V;
          }),
          E
        );
        function P(Y, q, W) {
          return !Y || C ? !0 : q !== b || W !== w;
        }
        function z(Y, q) {
          var W = O(Y, f.VERTEX_SHADER),
            Q = O(q, f.FRAGMENT_SHADER),
            oe = f.createProgram();
          if (
            (f.attachShader(oe, W),
            f.attachShader(oe, Q),
            f.linkProgram(oe),
            _ && !f.getProgramParameter(oe, f.LINK_STATUS))
          ) {
            var pe = f.getProgramInfoLog(oe);
            throw (
              (f.deleteProgram(oe),
              new Error(
                "Failed to link program : "
                  .concat(
                    pe,
                    `
            Vertex Shader : `,
                  )
                  .concat(
                    Y,
                    `
            Fragment Shader : `,
                  )
                  .concat(q),
              ))
            );
          }
          return oe;
        }
        function O(Y, q) {
          var W = f.createShader(q);
          if (
            (f.shaderSource(W, Y),
            f.compileShader(W),
            _ && !f.getShaderParameter(W, f.COMPILE_STATUS))
          ) {
            var Q = f.getShaderInfoLog(W);
            throw (
              (f.deleteShader(W),
              new Error(
                "Failed to compile shader : "
                  .concat(
                    Q,
                    `
            Shader : `,
                  )
                  .concat(Y),
              ))
            );
          }
          return W;
        }
      },
      Ye = function (f) {
        var c = [],
          d = [],
          p = function () {
            return f(
              c.join(`
`),
              d.join(`
`),
            );
          };
        function b(g, v) {
          g.push(v);
        }
        function w(g, v, _) {
          var S = g.indexOf(_);
          g.splice(S >= 0 ? S : g.length, 0, v);
        }
        function m(g, v) {
          var _ = g.indexOf(v);
          _ === -1 && g.push(v);
        }
        return (
          (p.appendHeader = function (g) {
            return b(c, g), p;
          }),
          (p.insertHeader = function (g, v) {
            return w(c, g, v), p;
          }),
          (p.appendHeaderIfNotExists = function (g) {
            return m(c, g), p;
          }),
          (p.appendBody = function (g) {
            return b(d, g), p;
          }),
          (p.insertBody = function (g, v) {
            return w(d, g, v), p;
          }),
          (p.appendBodyIfNotExists = function (g) {
            return m(d, g), p;
          }),
          p
        );
      },
      qt = function (c, d) {
        return `
precision mediump float;
float inf = 1.0 / 0.0;
`
          .concat(
            c,
            `
void main() {
    `,
          )
          .concat(
            d,
            `
}`,
          );
      },
      Wt = function (c, d) {
        return `
precision mediump float;
`
          .concat(
            c,
            `
void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    `,
          )
          .concat(
            d,
            `
}`,
          );
      },
      dv = {
        header: `attribute vec4 aFillColor;
             varying vec4 vFillColor;`,
        body: "vFillColor = aFillColor;",
      },
      mv = {
        header: `attribute vec4 aStrokeColor;
             varying vec4 vStrokeColor;`,
        body: "vStrokeColor = aStrokeColor;",
      },
      hv = {
        header: `
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        attribute float aDefined;

        uniform float uStrokeWidth;

        varying float vSize;
        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        vSize = 2.0 * sqrt(aSize / 3.14159);
        gl_PointSize = vSize + uStrokeWidth + 1.0;
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`,
      },
      pv = {
        header: `
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        attribute float aDefined;

        uniform float uStrokeWidth;

        varying float vSize;
        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        vSize = 4.0 * sqrt(aSize / 3.14159);
        gl_PointSize = vSize + uStrokeWidth + 1.0;
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`,
      },
      gv = {
        header: `
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        attribute float aDefined;

        uniform float uStrokeWidth;

        varying float vSize;
        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        vSize = 3.0 * sqrt(aSize / 3.14159);
        gl_PointSize = vSize + uStrokeWidth + 1.0;
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`,
      },
      vv = {
        header: `
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        attribute float aDefined;

        uniform float uStrokeWidth;

        varying float vSize;
        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        vSize = sqrt(aSize);
        gl_PointSize = vSize + uStrokeWidth + 1.0;
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`,
      },
      xv = {
        header: `
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        attribute float aDefined;

        uniform float uStrokeWidth;

        varying float vSize;
        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        vSize = sqrt(aSize);
        gl_PointSize = 2.0 * (vSize + uStrokeWidth + 1.0);
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`,
      },
      bv = {
        header: `
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        attribute float aDefined;

        uniform float uStrokeWidth;

        varying float vSize;
        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        vSize = sqrt((16.0 * aSize) / (3.0 * sqrt(3.0)));
        gl_PointSize = vSize + uStrokeWidth + 1.0;
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`,
      },
      yv = {
        header: `
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        attribute float aDefined;

        uniform float uStrokeWidth;

        varying float vSize;
        varying float vStrokeWidthRatio;
        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        vSize = 3.0 * sqrt(aSize / 5.0);
        vStrokeWidthRatio = uStrokeWidth / (vSize + uStrokeWidth + 1.0);
        gl_PointSize = vSize + uStrokeWidth + 1.0;
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`,
      },
      wv = {
        header: `
        attribute float aCrossValue;
        attribute float aBandwidth;
        attribute float aHighValue;
        attribute float aOpenValue;
        attribute float aCloseValue;
        attribute float aLowValue;
        attribute vec3 aCorner;
        attribute float aDefined;

        uniform vec2 uScreen;
        uniform float uStrokeWidth;

        varying float vColorIndicator;
        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        vColorIndicator = sign(aCloseValue - aOpenValue);

        float isPositiveY = (sign(aCorner.y) + 1.0) / 2.0;
        float isNotPositiveY = 1.0 - isPositiveY;
        float isExtremeY = abs(aCorner.y) - 1.0;
        float isNotExtremeY = 1.0 - isExtremeY;
        float yValue =
         (isPositiveY * isExtremeY * aLowValue) +
         (isPositiveY * isNotExtremeY * aCloseValue) +
         (isNotPositiveY * isNotExtremeY * aOpenValue) +
         (isNotPositiveY * isExtremeY * aHighValue);

        float lineWidthXDirection = (isNotExtremeY * aCorner.x) + (isExtremeY * aCorner.z);
        float lineWidthYDirection = isNotExtremeY * sign(aCloseValue - aOpenValue) * aCorner.y;

        float bandwidthModifier = aBandwidth * aCorner.x / 2.0;

        float xModifier = (uStrokeWidth * lineWidthXDirection / 2.0) + bandwidthModifier;
        float yModifier = uStrokeWidth * lineWidthYDirection / 2.0;

        gl_Position = vec4(aCrossValue, yValue, 0, 1);`,
      },
      _v = {
        header: `
        attribute float aCrossValue;
        attribute float aBandwidth;
        attribute float aHighValue;
        attribute float aOpenValue;
        attribute float aCloseValue;
        attribute float aLowValue;
        attribute vec3 aCorner;
        attribute float aDefined;

        uniform vec2 uScreen;
        uniform float uStrokeWidth;

        varying float vColorIndicator;
        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        vColorIndicator = sign(aCloseValue - aOpenValue);

        float isPositiveY = (sign(aCorner.y) + 1.0) / 2.0;
        float isNotPositiveY = 1.0 - isPositiveY;
        float isExtremeY = abs(aCorner.y) - 1.0;
        float isNotExtremeY = 1.0 - isExtremeY;
        float yValue =
            (isPositiveY * isExtremeY * aLowValue) +
            (isPositiveY * isNotExtremeY * aCloseValue) +
            (isNotPositiveY * isNotExtremeY * aOpenValue) +
            (isNotPositiveY * isExtremeY * aHighValue);

        float lineWidthXDirection = isExtremeY * aCorner.z;
        float lineWidthYDirection = isNotExtremeY * aCorner.z;

        float bandwidthModifier = isNotExtremeY * aCorner.x * aBandwidth / 2.0;

        float xModifier = (uStrokeWidth * lineWidthXDirection / 2.0) + bandwidthModifier;
        float yModifier = uStrokeWidth * lineWidthYDirection / 2.0;

        gl_Position = vec4(aCrossValue, yValue, 0, 1);`,
      },
      Sv = {
        header: `
        attribute float aCrossValue;
        attribute float aBandwidth;
        attribute float aMainValue;
        attribute float aBaseValue;
        attribute vec2 aCorner;
        attribute float aDefined;

        uniform vec2 uScreen;
        uniform float uStrokeWidth;

        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        float isBaseline = (1.0 - aCorner.y) / 2.0;
        float yValue = (isBaseline * aBaseValue) + ((1.0 - isBaseline) * aMainValue);

        float xModifier = aCorner.x * (aBandwidth) / 2.0;

        gl_Position = vec4(aCrossValue, yValue, 0, 1);`,
      },
      Mv = {
        header: `
        attribute vec3 aCorner;
        attribute float aCrossValue;
        attribute float aBandwidth;
        attribute float aHighValue;
        attribute float aLowValue;
        attribute float aDefined;

        uniform vec2 uScreen;
        uniform float uStrokeWidth;

        varying float vDefined;`,
        body: `
        vDefined = aDefined;
        float isLow = (aCorner.y + 1.0) / 2.0;
        float yValue = isLow * aLowValue + (1.0 - isLow) * aHighValue;

        float isEdgeCorner = abs(aCorner.x);
        float lineWidthXDirection = (1.0 - isEdgeCorner) * aCorner.z;
        float lineWidthYDirection = isEdgeCorner * aCorner.z;

        gl_Position = vec4(aCrossValue, yValue, 0, 1);

        float xModifier = (uStrokeWidth * lineWidthXDirection) + (aBandwidth * aCorner.x / 2.0);
        float yModifier = (uStrokeWidth * lineWidthYDirection);`,
      },
      Av = {
        header: `
        attribute vec3 aCorner;
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aCrossNextValue;
        attribute float aMainNextValue;
        attribute float aBaseValue;
        attribute float aBaseNextValue;
        attribute float aDefined;
        attribute float aDefinedNext;

        varying float vDefined;

        float when_lt(float a, float b) {
            return max(sign(b - a), 0.0);
        }

        float and(float a, float b) {
            return a * b;
        }`,
        body: `
        vDefined = aDefined * aDefinedNext;
        gl_Position = vec4(0, 0, 0, 1);

        float hasIntercepted = when_lt((aMainNextValue - aBaseNextValue) * (aMainValue - aBaseValue), 0.0);
        float useIntercept = and(aCorner.z, hasIntercepted);

        float yGradient = (aMainNextValue - aMainValue) / (aCrossNextValue - aCrossValue);
        float yConstant = aMainNextValue - (yGradient * aCrossNextValue);

        float y0Gradient = (aBaseNextValue - aBaseValue) / (aCrossNextValue - aCrossValue);
        float y0Constant = aBaseNextValue - (y0Gradient * aCrossNextValue);

        float denominator = (yGradient - y0Gradient) + step(abs(yGradient - y0Gradient), 0.0);
        float interceptXValue = (y0Constant - yConstant) / denominator;
        float interceptYValue = (yGradient * interceptXValue) + yConstant;

        gl_Position = vec4(interceptXValue * useIntercept, interceptYValue * useIntercept, 0, 1);

        gl_Position.x += (1.0 - useIntercept) * ((aCorner.x * aCrossNextValue) + ((1.0 - aCorner.x) * aCrossValue));
        gl_Position.y += (1.0 - useIntercept) * (1.0 - aCorner.y) * ((aCorner.x * aMainNextValue) + ((1.0 - aCorner.x) * aMainValue));
        gl_Position.y += (1.0 - useIntercept) * aCorner.y * ((aCorner.x * aBaseNextValue) + ((1.0 - aCorner.x) * aBaseValue));`,
      },
      kv = {
        header: `
        attribute vec4 aCorner;
        attribute float aCrossValue;
        attribute float aBandwidth;
        attribute float aCapWidth;
        attribute float aHighValue;
        attribute float aUpperQuartileValue;
        attribute float aMedianValue;
        attribute float aLowerQuartileValue;
        attribute float aLowValue;
        attribute float aDefined;

        uniform vec2 uScreen;
        uniform float uStrokeWidth;

        varying float vDefined;
    `,
        body: `
        vDefined = aDefined;
        float isExtremeY = sign(abs(aCorner.y) - 2.0) + 1.0;
        float isNotExtremeY = 1.0 - isExtremeY;

        float isNonZeroY = abs(sign(aCorner.y));
        float isZeroY = 1.0 - isNonZeroY;

        float isQuartileY = isNotExtremeY * isNonZeroY;

        float isPositiveY = (sign(aCorner.y + 0.5) + 1.0) / 2.0;
        float isNegativeY = 1.0 - isPositiveY;

        float yValue =
          (isExtremeY * isNegativeY) * aHighValue +
          (isQuartileY * isNegativeY) * aUpperQuartileValue +
          isZeroY * aMedianValue +
          (isQuartileY * isPositiveY) * aLowerQuartileValue +
          (isExtremeY * isPositiveY) * aLowValue;

        gl_Position = vec4(aCrossValue, yValue, 0, 1);

        float isHorizontal = aCorner.w;
        float isVertical = 1.0 - isHorizontal;

        float xDisplacement = aCorner.x * (isExtremeY * aCapWidth + isNotExtremeY * aBandwidth) / 2.0;

        float xModifier = (isVertical * uStrokeWidth * aCorner.z / 2.0) + xDisplacement;
        float yModifier = isHorizontal * uStrokeWidth * aCorner.z / 2.0;`,
      },
      Cv = {
        header: `
        varying float vSize;
        varying float vDefined;`,
        body: `
        float canFill = 1.0;
        float distance = length(2.0 * gl_PointCoord - 1.0);
        float canStroke = smoothstep(vSize - 2.0, vSize, distance * vSize);
        if (distance > 1.0 || vDefined < 0.5) {
            discard;
            return;
        }`,
      },
      Tv = {
        header: `
        varying float vSize;
        varying float vDefined;

        // anterior, exterior angles
        float an = 0.628319;
        vec2 acs = vec2(0.809017, 0.587786); // (cos, sin)
        float en = 0.952000;
        vec2 ecs = vec2(0.580055, 0.814577);
    `,
        body: `
        float canFill = 1.0;

        vec2 p = 2.0 * gl_PointCoord - 1.0;
        p.y *= -1.0;

        // sector
        float bn = mod(atan(p.x, p.y), 2.0 * an) - an;
        p = length(p) * vec2(cos(bn), abs(sin(bn)));

        p -= acs;
        p += ecs * clamp(-dot(p, ecs), 0.0, acs.y / ecs.y);
        float d = length(p) * sign(p.x);

        float distance = 1.0 + d;
        float canStroke = smoothstep(vSize - 2.0, vSize, distance * vSize);
        if (distance > 1.0 || vDefined < 0.5) {
            discard;
            return;
        }`,
      },
      Vv = {
        header: `
        varying float vSize;
        varying float vDefined;
    `,
        body: `
        float canFill = 1.0;

        vec2 p = 2.0 * gl_PointCoord - 1.0;
        p.y *= -1.0;

        // sector
        float an = 3.141593 / 3.0;
        float bn = mod(atan(p.x, p.y), 2.0 * an) - an;
        p = length(p) * vec2(cos(bn), abs(sin(bn)));

        // box
        vec2 d = abs(p) - vec2(0.9, 0.35);
        float sdf = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);

        float distance = 1.0 + sdf;
        float canStroke = smoothstep(vSize - 2.0, vSize, distance * vSize);
        if (distance > 1.0 || vDefined < 0.5) {
            discard;
            return;
        }`,
      },
      Nv = {
        header: `
        varying float vSize;
        varying float vDefined;`,
        body: `
        float canFill = 1.0;
        if (vDefined < 0.5) {
            discard;
        }
        vec2 pointCoordTransform = 2.0 * gl_PointCoord - 1.0;
        float distance = max(abs(pointCoordTransform.x), abs(pointCoordTransform.y));
        float canStroke = smoothstep(vSize - 2.0, vSize, distance * vSize);`,
      },
      Dv = {
        header: `
        varying float vSize;
        varying float vDefined;
        float a = 0.6;
        float b = 1.0;
    `,
        body: `
        if (vDefined < 0.5) {
            discard;
        }

        vec2 pointCoordTransform = 2.0 * gl_PointCoord - 1.0;

        float x = abs(pointCoordTransform.x);
        float y = abs(pointCoordTransform.y);

        float X = (a * b * x) / (a * y + b * x);
        float Y = (a * b * y) / (a * y + b * x);

        float distance = length(vec2(x, y)) / length(vec2(X, Y));

        if (distance > 1.0) {
            discard;
        }
    `,
      },
      Ev = {
        header: `
        varying float vSize;
        varying float vDefined;`,
        body: `
        float canFill = 1.0;
        vec2 pointCoordTransform = 2.0 * gl_PointCoord - 1.0;
        float topEdgesDistance = abs(pointCoordTransform.x) - ((pointCoordTransform.y - 0.6) / sqrt(3.0));
        float bottomEdgeDistance = pointCoordTransform.y + 0.5;
        float distance = max(topEdgesDistance, bottomEdgeDistance);
        float canStroke = smoothstep(vSize - 2.0, vSize, distance * vSize);
        if (distance > 1.0 || vDefined < 0.5) {
            discard;
        }`,
      },
      Iv = {
        header: `
        varying float vSize;
        varying float vStrokeWidthRatio;
        varying float vDefined;`,
        body: `
        float canFill = 1.0;
        vec2 pointCoordTransform = 2.0 * gl_PointCoord - 1.0;
        float innerCornerDistance = min(abs(pointCoordTransform.x), abs(pointCoordTransform.y)) + 0.66 - vStrokeWidthRatio;
        float outerEdgeDistance = max(abs(pointCoordTransform.x), abs(pointCoordTransform.y));
        float distance = max(innerCornerDistance, outerEdgeDistance);
        float canStroke = smoothstep(vSize - 2.0, vSize, distance * vSize);
        if (distance > 1.0 || vDefined < 0.5) {
            discard;
        }`,
      },
      zv = {
        header: `
        varying float vColorIndicator;
        varying float vDefined;`,
        body: `
        float canFill = 1.0;
        float canStroke = 0.0;
        if (vDefined < 0.5) {
            discard;
        }
        gl_FragColor = vec4(0.4, 0.8, 0, 1);
        if (vColorIndicator < 0.0) {
            gl_FragColor = vec4(0.8, 0.4, 0, 1);
        }`,
      },
      Pv = {
        header: `
        varying float vColorIndicator;
        varying float vDefined;`,
        body: `
        float canFill = 0.0;
        float canStroke = 1.0;
        if (vDefined < 0.5) {
            discard;
        }
        gl_FragColor = vec4(0.4, 0.8, 0, 1);
        if (vColorIndicator < 0.0) {
            gl_FragColor = vec4(0.8, 0.4, 0, 1);
        }`,
      },
      Rv = {
        header: `
        varying float vDefined;`,
        body: `
        float canFill = 1.0;
        float canStroke = 0.0;
        if (vDefined < 0.5) {
            discard;
        }
        gl_FragColor = vec4(0.86, 0.86, 0.86, 1);`,
      },
      Lv = {
        header: `
        varying float vDefined;
    `,
        body: `
        float canFill = 0.0;
        float canStroke = 1.0;

        if (vDefined < 0.5) {
            discard;
        }`,
      },
      Ov = {
        header: "varying float vDefined;",
        body: `
        float canFill = 0.0;
        float canStroke = 1.0;
        if (vDefined < 0.5) {
            discard;
        }`,
      },
      Bv = {
        header: "varying float vDefined;",
        body: `
        float canFill = 1.0;
        float canStroke = 0.0;

        gl_FragColor = vec4(0.60, 0.60, 0.60, 1.0);

        if (vDefined < 0.5) {
            discard;
        }`,
      },
      Fv = {
        header: "varying vec4 vFillColor;",
        body: "gl_FragColor = (canFill * vFillColor) + ((1.0 - canFill) * gl_FragColor);",
      },
      Hv = {
        header: "varying vec4 vStrokeColor;",
        body: "gl_FragColor = (canStroke * vStrokeColor) + ((1.0 - canStroke) * gl_FragColor);",
      },
      ok = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(Av.header).appendBody(Av.body),
          c.appendHeader(Rv.header).appendBody(Rv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      Ee = {
        BYTE: 5120,
        UNSIGNED_BYTE: 5121,
        SHORT: 5122,
        UNSIGNED_SHORT: 5123,
        FLOAT: 5126,
      };
    function td(f) {
      switch (f) {
        case Ee.BYTE:
        case Ee.UNSIGNED_BYTE:
          return 1;
        case Ee.SHORT:
        case Ee.UNSIGNED_SHORT:
          return 2;
        case Ee.FLOAT:
          return 4;
        default:
          throw new Error("Unknown type ".concat(f));
      }
    }
    function Yv(f) {
      switch (f) {
        case Ee.BYTE:
          return Int8Array;
        case Ee.UNSIGNED_BYTE:
          return Uint8Array;
        case Ee.SHORT:
          return Int16Array;
        case Ee.UNSIGNED_SHORT:
          return Uint16Array;
        case Ee.FLOAT:
          return Float32Array;
        default:
          throw new Error("Unknown type ".concat(f));
      }
    }
    var Sf = function () {
        var f = -1,
          c = null,
          d = 1,
          p = Ee.FLOAT,
          b = !1,
          w = 0,
          m = 0,
          g = null,
          v = function (S) {
            var C = S.context();
            c == null && (c = C.createBuffer()),
              C.bindBuffer(C.ARRAY_BUFFER, c),
              C.vertexAttribPointer(f, d, p, b, w, m),
              C.enableVertexAttribArray(f);
            var V = S.extInstancedArrays();
            V.vertexAttribDivisorANGLE(
              f,
              g ?? (S.subInstanceCount() > 0 ? 1 : 0),
            );
          };
        return (
          (v.location = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : f;
          }),
          (v.buffer = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : c;
          }),
          (v.size = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : d;
          }),
          (v.type = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : p;
          }),
          (v.normalized = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : b;
          }),
          (v.stride = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : w;
          }),
          (v.offset = function () {
            return arguments.length
              ? ((m = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : m;
          }),
          (v.divisor = function () {
            return arguments.length
              ? ((g = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : g;
          }),
          v
        );
      },
      ik = function () {
        var f = Ee.FLOAT,
          c = new Float32Array(0),
          d = function (b) {
            var w = Yv(f);
            return (
              c.length > b
                ? (c = new w(c.buffer, 0, b))
                : c.length !== b && (c = new w(b)),
              c
            );
          };
        return (
          (d.type = function () {
            if (!arguments.length) return f;
            if (f !== (arguments.length <= 0 ? void 0 : arguments[0])) {
              f = arguments.length <= 0 ? void 0 : arguments[0];
              var p = Yv(f);
              c = new p(0);
            }
            return d;
          }),
          d
        );
      },
      qv = function () {
        var f = !0,
          c = 1,
          d = Ee.FLOAT,
          p = ik(),
          b = function (v, _) {
            return v;
          },
          w = null,
          m = function () {
            var v = w.length,
              _ = p.type(d)(v * c);
            if (c > 1)
              for (var S = 0; S < v; S++) {
                var C = b(w[S], S);
                if (C.length !== c)
                  throw new Error(
                    "Expected components array of size "
                      .concat(c, ", recieved array with length ")
                      .concat(C.length, "."),
                  );
                for (var V = 0; V < c; V++) _[S * c + V] = C[V];
              }
            else
              for (var E = 0; E < v; E++) {
                var P = b(w[E], E);
                if (Array.isArray(P))
                  throw new Error(
                    "Expected a single component value, recieved array with length ".concat(
                      P.length,
                      ".",
                    ),
                  );
                _[E] = P;
              }
            return (f = !1), _;
          };
        return (
          (m.dirty = function () {
            return f;
          }),
          (m.clear = function () {
            f = !0;
          }),
          (m.size = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]),
                (f = !0),
                m)
              : c;
          }),
          (m.type = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]),
                (f = !0),
                m)
              : d;
          }),
          (m.arrayViewFactory = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]),
                (f = !0),
                m)
              : p;
          }),
          (m.value = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]),
                (f = !0),
                m)
              : b;
          }),
          (m.data = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]),
                (f = !0),
                m)
              : w;
          }),
          m
        );
      },
      Ae = function () {
        var f = Sf(),
          c = qv(),
          d = function p(b) {
            if ((f.size(p.size()).type(p.type()), f(b), !!c.dirty())) {
              var w = c(),
                m = b.context();
              m.bindBuffer(m.ARRAY_BUFFER, f.buffer()),
                m.bufferData(m.ARRAY_BUFFER, w, m.DYNAMIC_DRAW);
            }
          };
        return (
          (d.clear = function () {
            f.buffer(null), c.clear();
          }),
          A(d, f, "normalized", "location", "divisor"),
          A(d, c, "data", "value", "size", "type"),
          d
        );
      },
      ye = function (f, c, d, p) {
        for (
          var b = arguments.length, w = new Array(b > 4 ? b - 4 : 0), m = 4;
          m < b;
          m++
        )
          w[m - 4] = arguments[m];
        f[c] = function () {
          for (var g = arguments.length, v = new Array(g), _ = 0; _ < g; _++)
            v[_] = arguments[_];
          var S = d[p].apply(d, w.concat(v));
          return S === d ? f : S;
        };
      },
      Wv = function () {
        var f = on().mode(an.TRIANGLES).subInstanceCount(6),
          c = it(),
          d = it(),
          p = function () {},
          b = Ae()
            .divisor(0)
            .size(3)
            .type(Ee.UNSIGNED_BYTE)
            .data([
              [0, 0, 0],
              [0, 1, 0],
              [1, 1, 1],
              [0, 0, 1],
              [1, 0, 0],
              [1, 1, 0],
            ]);
        f.buffers().attribute("aCorner", b);
        var w = function (g) {
          var v = ok();
          f.vertexShader(v.vertex()).fragmentShader(v.fragment()),
            c(f, "gl_Position", 0),
            d(f, "gl_Position", 1),
            p(f),
            f(g - 1);
        };
        return (
          (w.decorate = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : p;
          }),
          (w.xScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : c;
          }),
          (w.yScale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : d;
          }),
          A(w, f, "context", "pixelRatio"),
          ye(w, "crossValueAttribute", f.buffers(), "attribute", "aCrossValue"),
          ye(
            w,
            "crossNextValueAttribute",
            f.buffers(),
            "attribute",
            "aCrossNextValue",
          ),
          ye(w, "mainValueAttribute", f.buffers(), "attribute", "aMainValue"),
          ye(
            w,
            "mainNextValueAttribute",
            f.buffers(),
            "attribute",
            "aMainNextValue",
          ),
          ye(w, "baseValueAttribute", f.buffers(), "attribute", "aBaseValue"),
          ye(
            w,
            "baseNextValueAttribute",
            f.buffers(),
            "attribute",
            "aBaseNextValue",
          ),
          ye(w, "definedAttribute", f.buffers(), "attribute", "aDefined"),
          ye(
            w,
            "definedNextAttribute",
            f.buffers(),
            "attribute",
            "aDefinedNext",
          ),
          w
        );
      },
      $v = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(hv.header).appendBody(hv.body),
          c.appendHeader(Cv.header).appendBody(Cv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      Gv = function () {
        var f = on().mode(an.POINTS),
          c = it(),
          d = it(),
          p = $v(),
          b = function () {},
          w = function (g) {
            f.vertexShader(p.vertex()).fragmentShader(p.fragment()),
              c(f, "gl_Position", 0),
              d(f, "gl_Position", 1),
              b(f),
              f(g);
          };
        return (
          (w.type = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : p;
          }),
          (w.decorate = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : b;
          }),
          (w.xScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : c;
          }),
          (w.yScale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : d;
          }),
          A(w, f, "context", "pixelRatio"),
          ye(w, "crossValueAttribute", f.buffers(), "attribute", "aCrossValue"),
          ye(w, "mainValueAttribute", f.buffers(), "attribute", "aMainValue"),
          ye(w, "sizeAttribute", f.buffers(), "attribute", "aSize"),
          ye(w, "definedAttribute", f.buffers(), "attribute", "aDefined"),
          w
        );
      },
      Ri = function () {
        var f = 1,
          c = function (p) {
            p.buffers().uniform("uStrokeWidth", Qt(f));
          };
        return (
          (c.lineWidth = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), c)
              : f;
          }),
          c
        );
      },
      va = function (f) {
        var c = null,
          d = f,
          p = !0,
          b = function (m) {
            var g = m.context();
            c == null && (c = g.createBuffer()),
              g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, c),
              p &&
                (g.bufferData(
                  g.ELEMENT_ARRAY_BUFFER,
                  new Uint16Array(d),
                  g.STATIC_DRAW,
                ),
                (p = !1));
          };
        return (
          (b.clear = function () {
            (c = null), (p = !0);
          }),
          (b.data = function () {
            return arguments.length
              ? ((p = !0),
                (d = arguments.length <= 0 ? void 0 : arguments[0]),
                b)
              : d;
          }),
          b
        );
      },
      Uv = function () {
        var f = on().mode(an.TRIANGLES).subInstanceCount(6),
          c = it(),
          d = it(),
          p = function () {},
          b = Ri(),
          w = Ae()
            .divisor(0)
            .size(4)
            .type(Ee.BYTE)
            .data([
              [-1, 1, 1, 0],
              [1, 1, 0, 1],
              [1, -1, 0, 1],
              [-1, -1, 1, 0],
            ]);
        f.buffers()
          .elementIndices(va([0, 1, 2, 2, 3, 0]))
          .attribute("aCorner", w);
        var m = function (v) {
          var _ = Ye(qt),
            S = Ye(Wt);
          f.vertexShader(_).fragmentShader(S),
            _.appendHeader(`
            attribute vec4 aCorner;
            attribute float aCrossValue;
            attribute float aCrossNextValue;
            attribute float aMainValue;
            attribute float aMainNextValue;
            attribute float aDefined;
            attribute float aDefinedNext;

            uniform float uStrokeWidth;
            uniform vec2 uScreen;

            varying float vLength;
            varying vec2 vPosition;
        `),
            _.appendBody(`
            vec4 value = vec4(aCrossValue, aMainValue, 0.0, 1.0);
            vec4 nextValue = vec4(aCrossNextValue, aMainNextValue, 0.0, 1.0);
        `),
            c(f, "value", 0),
            c(f, "nextValue", 0),
            d(f, "value", 1),
            d(f, "nextValue", 1),
            _.appendBody(`
            vec2 position = aCorner[2] * value.xy + aCorner[3] * nextValue.xy;

            vec2 direction = normalize((nextValue.xy - value.xy) * uScreen);
            vec2 normal = vec2(direction.y, -direction.x);
            vec2 padding = ((uStrokeWidth / 2.0) / (uScreen / 2.0));
            
            padding *= aDefined * aDefinedNext;
            position += (aCorner[0] * direction + aCorner[1] * normal) * padding;

            gl_Position = vec4(position.x, position.y, 0.0, 1.0);

            vLength = length((nextValue.xy - value.xy) * (uScreen / 2.0));
            vPosition = aCorner.xy * (uStrokeWidth / 2.0);
            vPosition.x += aCorner[3] * vLength;
        `),
            S.appendHeader(`
            uniform float uStrokeWidth;
            varying float vLength;
            varying vec2 vPosition;

            float canFill = 0.0;
            float canStroke = 1.0;
        `),
            S.appendBody(`
            vec2 position = vPosition;
            position.x -= clamp(position.x, 0.0, vLength);
            float sdf = length(position) - uStrokeWidth / 2.0;
            if (sdf > 0.5) {
                discard;
            }
        `),
            b(f),
            p(f),
            f(v - 1);
        };
        return (
          (m.decorate = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : p;
          }),
          (m.xScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          (m.yScale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : d;
          }),
          A(m, f, "context", "pixelRatio"),
          A(m, b, "lineWidth"),
          ye(m, "crossValueAttribute", f.buffers(), "attribute", "aCrossValue"),
          ye(
            m,
            "crossNextValueAttribute",
            f.buffers(),
            "attribute",
            "aCrossNextValue",
          ),
          ye(m, "mainValueAttribute", f.buffers(), "attribute", "aMainValue"),
          ye(
            m,
            "mainNextValueAttribute",
            f.buffers(),
            "attribute",
            "aMainNextValue",
          ),
          ye(m, "definedAttribute", f.buffers(), "attribute", "aDefined"),
          ye(
            m,
            "definedNextAttribute",
            f.buffers(),
            "attribute",
            "aDefinedNext",
          ),
          m
        );
      },
      uk = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(_v.header).appendBody(_v.body),
          c.appendHeader(Pv.header).appendBody(Pv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      Xv = function () {
        var f = on().mode(an.TRIANGLES).subInstanceCount(18),
          c = it(),
          d = it(),
          p = Ri(),
          b = function () {},
          w = Ae()
            .divisor(0)
            .size(3)
            .type(Ee.BYTE)
            .data([
              [0, -2, -1],
              [0, -2, 1],
              [0, 2, 1],
              [0, 2, -1],
              [-1, -1, -1],
              [-1, -1, 1],
              [0, -1, 1],
              [0, -1, -1],
              [1, 1, 1],
              [0, 1, 1],
              [0, 1, -1],
              [1, 1, -1],
            ]);
        f.buffers()
          .elementIndices(
            va([0, 1, 2, 0, 3, 2, 4, 5, 6, 4, 7, 6, 8, 9, 10, 10, 11, 8]),
          )
          .attribute("aCorner", w);
        var m = function (v) {
          var _ = uk();
          f.vertexShader(_.vertex()).fragmentShader(_.fragment()),
            c(f, "gl_Position", 0),
            d(f, "gl_Position", 1),
            p(f),
            f.vertexShader().appendBody(`
          gl_Position.x += xModifier / uScreen.x * 2.0;
          gl_Position.y += yModifier / uScreen.y * 2.0;
        `),
            b(f),
            f(v);
        };
        return (
          (m.decorate = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : b;
          }),
          (m.xScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          (m.yScale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : d;
          }),
          A(m, f, "context", "pixelRatio"),
          A(m, p, "lineWidth"),
          ye(m, "crossValueAttribute", f.buffers(), "attribute", "aCrossValue"),
          ye(m, "openValueAttribute", f.buffers(), "attribute", "aOpenValue"),
          ye(m, "highValueAttribute", f.buffers(), "attribute", "aHighValue"),
          ye(m, "lowValueAttribute", f.buffers(), "attribute", "aLowValue"),
          ye(m, "closeValueAttribute", f.buffers(), "attribute", "aCloseValue"),
          ye(m, "bandwidthAttribute", f.buffers(), "attribute", "aBandwidth"),
          ye(m, "definedAttribute", f.buffers(), "attribute", "aDefined"),
          m
        );
      },
      fk = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(Sv.header).appendBody(Sv.body),
          c.appendHeader(Bv.header).appendBody(Bv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      jv = function () {
        var f = on().mode(an.TRIANGLES).subInstanceCount(6),
          c = it(),
          d = it(),
          p = function () {},
          b = Ae()
            .divisor(0)
            .size(2)
            .type(Ee.BYTE)
            .data([
              [-1, -1],
              [1, 1],
              [-1, 1],
              [1, -1],
            ]);
        f.buffers()
          .elementIndices(va([0, 1, 2, 0, 1, 3]))
          .attribute("aCorner", b);
        var w = function (g) {
          var v = fk();
          f.vertexShader(v.vertex()).fragmentShader(v.fragment()),
            c(f, "gl_Position", 0),
            d(f, "gl_Position", 1),
            f.vertexShader().appendBody(`
            gl_Position.x += xModifier / uScreen.x * 2.0;
        `),
            p(f),
            f(g);
        };
        return (
          (w.decorate = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : p;
          }),
          (w.xScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : c;
          }),
          (w.yScale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : d;
          }),
          A(w, f, "context", "pixelRatio"),
          ye(w, "crossValueAttribute", f.buffers(), "attribute", "aCrossValue"),
          ye(w, "mainValueAttribute", f.buffers(), "attribute", "aMainValue"),
          ye(w, "baseValueAttribute", f.buffers(), "attribute", "aBaseValue"),
          ye(w, "bandwidthAttribute", f.buffers(), "attribute", "aBandwidth"),
          ye(w, "definedAttribute", f.buffers(), "attribute", "aDefined"),
          w
        );
      },
      lk = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(Mv.header).appendBody(Mv.body),
          c.appendHeader(Ov.header).appendBody(Ov.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      Qv = function () {
        var f = on().mode(an.TRIANGLES).subInstanceCount(18),
          c = it(),
          d = it(),
          p = function () {},
          b = Ri(),
          w = Ae()
            .divisor(0)
            .size(3)
            .type(Ee.BYTE)
            .data([
              [0, 1, 1],
              [0, 1, -1],
              [0, -1, -1],
              [0, -1, 1],
              [1, -1, 1],
              [1, -1, -1],
              [-1, -1, -1],
              [-1, -1, 1],
              [-1, 1, -1],
              [-1, 1, 1],
              [1, 1, 1],
              [1, 1, -1],
            ]);
        f.buffers()
          .elementIndices(
            va([0, 1, 2, 0, 3, 2, 4, 5, 6, 4, 7, 6, 8, 9, 10, 8, 11, 10]),
          )
          .attribute("aCorner", w);
        var m = function (v) {
          var _ = lk();
          f.vertexShader(_.vertex()).fragmentShader(_.fragment()),
            c(f, "gl_Position", 0),
            d(f, "gl_Position", 1),
            b(f),
            f.vertexShader().appendBody(`
                gl_Position.x += xModifier / uScreen.x * 2.0;
                gl_Position.y += yModifier / uScreen.y * 2.0;
            `),
            p(f),
            f(v);
        };
        return (
          (m.decorate = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : p;
          }),
          (m.xScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          (m.yScale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : d;
          }),
          A(m, f, "context", "pixelRatio"),
          A(m, b, "lineWidth"),
          ye(m, "crossValueAttribute", f.buffers(), "attribute", "aCrossValue"),
          ye(m, "highValueAttribute", f.buffers(), "attribute", "aHighValue"),
          ye(m, "lowValueAttribute", f.buffers(), "attribute", "aLowValue"),
          ye(m, "bandwidthAttribute", f.buffers(), "attribute", "aBandwidth"),
          ye(m, "definedAttribute", f.buffers(), "attribute", "aDefined"),
          m
        );
      },
      ck = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(wv.header).appendBody(wv.body),
          c.appendHeader(zv.header).appendBody(zv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      Kv = function () {
        var f = on().mode(an.TRIANGLES).subInstanceCount(12),
          c = it(),
          d = it(),
          p = Ri(),
          b = function () {},
          w = Ae()
            .divisor(0)
            .size(3)
            .type(Ee.BYTE)
            .data([
              [0, 2, 1],
              [0, 2, -1],
              [0, -2, -1],
              [0, -2, 1],
              [1, -1, 0],
              [-1, -1, 0],
              [-1, 1, 0],
              [1, 1, 0],
            ]);
        f.buffers()
          .elementIndices(va([0, 1, 2, 0, 3, 2, 4, 5, 6, 4, 7, 6]))
          .attribute("aCorner", w);
        var m = function (v) {
          var _ = ck();
          f.vertexShader(_.vertex()).fragmentShader(_.fragment()),
            c(f, "gl_Position", 0),
            d(f, "gl_Position", 1),
            p(f),
            f.vertexShader().appendBody(`
          gl_Position.x += xModifier / uScreen.x * 2.0;
          gl_Position.y += yModifier / uScreen.y * 2.0;
        `),
            b(f),
            f(v);
        };
        return (
          (m.decorate = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : b;
          }),
          (m.xScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          (m.yScale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : d;
          }),
          A(m, f, "context", "pixelRatio"),
          A(m, p, "lineWidth"),
          ye(m, "crossValueAttribute", f.buffers(), "attribute", "aCrossValue"),
          ye(m, "openValueAttribute", f.buffers(), "attribute", "aOpenValue"),
          ye(m, "highValueAttribute", f.buffers(), "attribute", "aHighValue"),
          ye(m, "lowValueAttribute", f.buffers(), "attribute", "aLowValue"),
          ye(m, "closeValueAttribute", f.buffers(), "attribute", "aCloseValue"),
          ye(m, "bandwidthAttribute", f.buffers(), "attribute", "aBandwidth"),
          ye(m, "definedAttribute", f.buffers(), "attribute", "aDefined"),
          m
        );
      },
      sk = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(kv.header).appendBody(kv.body),
          c.appendHeader(Lv.header).appendBody(Lv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      Zv = function () {
        var f = on().mode(an.TRIANGLES).subInstanceCount(54),
          c = it(),
          d = it(),
          p = function () {},
          b = Ri(),
          w = Ae()
            .divisor(0)
            .size(4)
            .type(Ee.BYTE)
            .data([
              [-1, -2, -1, 1],
              [1, -2, -1, 1],
              [1, -2, 1, 1],
              [-1, -2, 1, 1],
              [0, -2, -1, 0],
              [0, -2, 1, 0],
              [0, -1, 1, 0],
              [0, -1, -1, 0],
              [-1, -1, -1, 1],
              [1, -1, -1, 1],
              [1, -1, 1, 1],
              [-1, -1, 1, 1],
              [-1, 0, -1, 1],
              [1, 0, -1, 1],
              [1, 0, 1, 1],
              [-1, 0, 1, 1],
              [-1, 1, -1, 1],
              [1, 1, -1, 1],
              [1, 1, 1, 1],
              [-1, 1, 1, 1],
              [-1, -1, -1, 0],
              [-1, -1, 1, 0],
              [-1, 1, 1, 0],
              [-1, 1, -1, 0],
              [1, -1, -1, 0],
              [1, -1, 1, 0],
              [1, 1, 1, 0],
              [1, 1, -1, 0],
              [0, 2, -1, 0],
              [0, 2, 1, 0],
              [0, 1, 1, 0],
              [0, 1, -1, 0],
              [-1, 2, -1, 1],
              [1, 2, -1, 1],
              [1, 2, 1, 1],
              [-1, 2, 1, 1],
            ]);
        f.buffers()
          .elementIndices(
            va([
              0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13,
              14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
              24, 25, 26, 24, 26, 27, 28, 29, 30, 28, 30, 31, 32, 33, 34, 32,
              34, 35,
            ]),
          )
          .attribute("aCorner", w);
        var m = function (v) {
          var _ = sk();
          f.vertexShader(_.vertex()).fragmentShader(_.fragment()),
            c(f, "gl_Position", 0),
            d(f, "gl_Position", 1),
            b(f),
            f.vertexShader().appendBody(`
            gl_Position.x += xModifier / uScreen.x * 2.0;
            gl_Position.y += yModifier / uScreen.y * 2.0;
        `),
            p(f),
            f(v);
        };
        return (
          (m.decorate = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : p;
          }),
          (m.xScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          (m.yScale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : d;
          }),
          A(m, f, "context", "pixelRatio"),
          A(m, b, "lineWidth"),
          ye(m, "crossValueAttribute", f.buffers(), "attribute", "aCrossValue"),
          ye(m, "highValueAttribute", f.buffers(), "attribute", "aHighValue"),
          ye(
            m,
            "upperQuartileValueAttribute",
            f.buffers(),
            "attribute",
            "aUpperQuartileValue",
          ),
          ye(
            m,
            "medianValueAttribute",
            f.buffers(),
            "attribute",
            "aMedianValue",
          ),
          ye(
            m,
            "lowerQuartileValueAttribute",
            f.buffers(),
            "attribute",
            "aLowerQuartileValue",
          ),
          ye(m, "lowValueAttribute", f.buffers(), "attribute", "aLowValue"),
          ye(m, "bandwidthAttribute", f.buffers(), "attribute", "aBandwidth"),
          ye(m, "capAttribute", f.buffers(), "attribute", "aCapWidth"),
          ye(m, "definedAttribute", f.buffers(), "attribute", "aDefined"),
          m
        );
      },
      Vn = function () {
        var f =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0,
          c =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        if (f > 0 || c < 0)
          throw new Error(
            "Offset values (".concat(f, " & ").concat(c, ") must straddle 0 "),
          );
        var d = Sf(),
          p = qv(),
          b = function w(m) {
            var g = w.size() * td(w.type()),
              v = Math.abs(f) * g;
            if (
              (d.offset(v).size(w.size()).type(w.type()), d(m), !!p.dirty())
            ) {
              var _ = p(),
                S = c * g,
                C = v + _.length * td(w.type()) + S,
                V = m.context();
              V.bindBuffer(V.ARRAY_BUFFER, d.buffer()),
                V.bufferData(V.ARRAY_BUFFER, C, V.DYNAMIC_DRAW),
                V.bufferSubData(V.ARRAY_BUFFER, v, _);
            }
          };
        return (
          (b.offset = function (w) {
            if (f > w || w > c)
              throw new Error(
                "Requested offset "
                  .concat(w, " exceeds bounds (")
                  .concat(f, " & ")
                  .concat(c, ") "),
              );
            var m = function (v) {
              d.offset((w - f) * b.size() * td(b.type())), d(v);
            };
            return A(m, b, "clear", "location"), m;
          }),
          (b.clear = function () {
            d.buffer(null), p.clear();
          }),
          A(b, d, "normalized", "location", "divisor"),
          A(b, p, "data", "value", "size", "type"),
          b
        );
      },
      Mf = function () {
        var f = it(),
          c = function (b) {
            return "linear".concat(b);
          },
          d = function (b, w, m) {
            b.vertexShader()
              .appendHeaderIfNotExists("uniform vec4 ".concat(c(m), "Offset;"))
              .appendHeaderIfNotExists("uniform vec4 ".concat(c(m), "Scale;"))
              .appendBody(
                "".concat(w, " = ").concat(w, " + ").concat(c(m), "Offset;"),
              )
              .appendBody(
                "".concat(w, " = ").concat(w, " * ").concat(c(m), "Scale;"),
              );
            var g = f.domain()[1] - f.domain()[0],
              v = f.range()[1] - f.range()[0],
              _ = f.range()[0] * (g / v) - f.domain()[0],
              S = v / g,
              C = [0, 0, 0, 0],
              V = [1, 1, 1, 1];
            (C[m] = _),
              (V[m] = S),
              b
                .buffers()
                .uniform("".concat(c(m), "Offset"), Qt(C))
                .uniform("".concat(c(m), "Scale"), Qt(V));
          };
        return k(d, f), d;
      },
      Jv = function () {
        var f = it(),
          c = 10;
        function d(w, m) {
          return Math.log10(w) / Math.log10(m);
        }
        var p = function (m) {
            return "log".concat(m);
          },
          b = function (m, g, v) {
            var _ = ""
              .concat(p(v), "Offset + (")
              .concat(p(v), "Scale * clamp(log(")
              .concat(g, ") / log(")
              .concat(p(v), "Base), -inf, inf))");
            m.vertexShader()
              .appendHeaderIfNotExists("uniform vec4 ".concat(p(v), "Offset;"))
              .appendHeaderIfNotExists("uniform vec4 ".concat(p(v), "Scale;"))
              .appendHeaderIfNotExists("uniform vec4 ".concat(p(v), "Include;"))
              .appendHeaderIfNotExists("uniform float ".concat(p(v), "Base;"))
              .appendBody(
                ""
                  .concat(g, " = (")
                  .concat(p(v), "Include * (")
                  .concat(_, ")) + ((1.0 - ")
                  .concat(p(v), "Include) * ")
                  .concat(g, ");"),
              );
            var S = d(f.domain()[1], c) - d(f.domain()[0], c),
              C = f.range()[1] - f.range()[0],
              V = C / S,
              E = f.range()[0] - V * d(f.domain()[0], c),
              P = [0, 0, 0, 0],
              z = [0, 0, 0, 0],
              O = [0, 0, 0, 0];
            (P[v] = E),
              (z[v] = V),
              (O[v] = 1),
              m
                .buffers()
                .uniform("".concat(p(v), "Offset"), Qt(P))
                .uniform("".concat(p(v), "Scale"), Qt(z))
                .uniform("".concat(p(v), "Include"), Qt(O))
                .uniform("".concat(p(v), "Base"), Qt(c));
          };
        return (
          (b.base = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), b)
              : c;
          }),
          k(b, f),
          b
        );
      },
      ex = function () {
        var f = it(),
          c = 1;
        function d(w, m) {
          return Math.sign(w) * Math.pow(Math.abs(w), m);
        }
        var p = function (m) {
            return "pow".concat(m);
          },
          b = function (m, g, v) {
            var _ = ""
              .concat(p(v), "Offset + (")
              .concat(p(v), "Scale * sign(")
              .concat(g, ") * pow(abs(")
              .concat(g, "), vec4(")
              .concat(p(v), "Exp)))");
            m.vertexShader()
              .appendHeaderIfNotExists("uniform vec4 ".concat(p(v), "Offset;"))
              .appendHeaderIfNotExists("uniform vec4 ".concat(p(v), "Scale;"))
              .appendHeaderIfNotExists("uniform vec4 ".concat(p(v), "Include;"))
              .appendHeaderIfNotExists("uniform float ".concat(p(v), "Exp;"))
              .appendBody(
                ""
                  .concat(g, " = (")
                  .concat(p(v), "Include * (")
                  .concat(_, ")) + ((1.0 - ")
                  .concat(p(v), "Include) * ")
                  .concat(g, ");"),
              );
            var S = d(f.domain()[1], c) - d(f.domain()[0], c),
              C = f.range()[1] - f.range()[0],
              V = C / S,
              E = f.range()[0] - V * d(f.domain()[0], c),
              P = [0, 0, 0, 0],
              z = [0, 0, 0, 0],
              O = [0, 0, 0, 0];
            (P[v] = E),
              (z[v] = V),
              (O[v] = 1),
              m
                .buffers()
                .uniform("".concat(p(v), "Offset"), Qt(P))
                .uniform("".concat(p(v), "Scale"), Qt(z))
                .uniform("".concat(p(v), "Include"), Qt(O))
                .uniform("".concat(p(v), "Exp"), Qt(c));
          };
        return (
          (b.exponent = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), b)
              : c;
          }),
          k(b, f),
          b
        );
      },
      dk = r.scaleLinear().copy.toString(),
      mk = r.scaleLog().copy.toString(),
      hk = r.scalePow().copy.toString(),
      pk = r.scaleTime().copy.toString(),
      rd = r.scaleIdentity(),
      gk = Date.now(),
      tx = function (c) {
        return c - gk;
      },
      Nn = function (f) {
        switch (f.copy.toString()) {
          case dk:
            return { scale: rd, webglScale: Mf().domain(f.domain()) };
          case pk:
            return { scale: tx, webglScale: Mf().domain(f.domain().map(tx)) };
          case mk:
            return {
              scale: rd,
              webglScale: Jv().domain(f.domain()).base(f.base()),
            };
          case hk:
            return {
              scale: rd,
              webglScale: ex().domain(f.domain()).exponent(f.exponent()),
            };
          default:
            return { scale: f.copy(), webglScale: Mf().domain(f.range()) };
        }
      },
      vk = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(vv.header).appendBody(vv.body),
          c.appendHeader(Nv.header).appendBody(Nv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      xk = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(bv.header).appendBody(bv.body),
          c.appendHeader(Ev.header).appendBody(Ev.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      bk = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(yv.header).appendBody(yv.body),
          c.appendHeader(Iv.header).appendBody(Iv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      yk = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(xv.header).appendBody(xv.body),
          c.appendHeader(Dv.header).appendBody(Dv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      wk = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(pv.header).appendBody(pv.body),
          c.appendHeader(Tv.header).appendBody(Tv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      _k = function () {
        var f = Ye(qt),
          c = Ye(Wt);
        return (
          f.appendHeader(gv.header).appendBody(gv.body),
          c.appendHeader(Vv.header).appendBody(Vv.body),
          {
            vertex: function () {
              return f;
            },
            fragment: function () {
              return c;
            },
          }
        );
      },
      rx = function (f) {
        switch (f) {
          case l.symbolCircle:
            return $v();
          case l.symbolSquare:
            return vk();
          case l.symbolTriangle:
            return xk();
          case l.symbolCross:
            return bk();
          case l.symbolDiamond:
            return yk();
          case l.symbolStar:
            return wk();
          case l.symbolWye:
            return _k();
          default:
            throw new Error("Unrecognised symbol: ".concat(f));
        }
      },
      nx = function (f) {
        var c = Sf().divisor(1),
          d = f,
          p = !0,
          b = function (m) {
            if ((c(m), !!p)) {
              if (!Array.isArray(d))
                throw new Error("Expected an array, received: ".concat(d));
              if (d.length !== c.size())
                throw new Error(
                  "Expected array of length: "
                    .concat(c.size(), ", recieved array of length: ")
                    .concat(d.length),
                );
              var g = m.context();
              g["vertexAttrib".concat(d.length, "fv")](c.location(), d),
                g.disableVertexAttribArray(c.location()),
                (p = !1);
            }
          };
        return (
          (b.clear = function () {
            p = !0;
          }),
          (b.value = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]),
                (p = !0),
                b)
              : d;
          }),
          A(b, c, "normalized", "size", "location"),
          b
        );
      },
      Sk = function () {
        var f =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : [0, 0, 0, 1],
          c = Ae().size(4),
          d = f,
          p = !0,
          b = function (m) {
            if (
              (m
                .vertexShader()
                .appendHeaderIfNotExists(dv.header)
                .appendBodyIfNotExists(dv.body),
              m
                .fragmentShader()
                .appendHeaderIfNotExists(Fv.header)
                .appendBodyIfNotExists(Fv.body),
              Array.isArray(d))
            )
              m.buffers().attribute("aFillColor", nx(d).size(4));
            else if (typeof d == "function") {
              if (!p) return;
              c.value(d), m.buffers().attribute("aFillColor", c);
            } else
              throw new Error(
                "Expected value to be an array or function, received ".concat(
                  d,
                ),
              );
            p = !1;
          };
        return (
          (b.value = function () {
            return arguments.length
              ? (d !== (arguments.length <= 0 ? void 0 : arguments[0]) &&
                  ((d = arguments.length <= 0 ? void 0 : arguments[0]),
                  (p = !0)),
                b)
              : d;
          }),
          A(b, c, "data"),
          b
        );
      },
      Mk = function () {
        var f =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : [0, 0, 0, 1],
          c = Ae().size(4),
          d = f,
          p = !0,
          b = function (m) {
            if (
              (m
                .vertexShader()
                .appendHeaderIfNotExists(mv.header)
                .appendBodyIfNotExists(mv.body),
              m
                .fragmentShader()
                .appendHeaderIfNotExists(Hv.header)
                .appendBodyIfNotExists(Hv.body),
              Array.isArray(d))
            )
              m.buffers().attribute("aStrokeColor", nx(d).size(4));
            else if (typeof d == "function") {
              if (!p) return;
              c.value(d), m.buffers().attribute("aStrokeColor", c);
            } else
              throw new Error(
                "Expected value to be an array or function, received ".concat(
                  d,
                ),
              );
            p = !1;
          };
        return (
          (b.value = function () {
            return arguments.length
              ? (d !== (arguments.length <= 0 ? void 0 : arguments[0]) &&
                  ((d = arguments.length <= 0 ? void 0 : arguments[0]),
                  (p = !0)),
                b)
              : d;
          }),
          A(b, c, "data"),
          b
        );
      },
      ax = function () {
        var f = rr(),
          c = Vn(0, 1),
          d = c.offset(1),
          p = Vn(0, 1),
          b = p.offset(1),
          w = Vn(0, 1).type(Ee.UNSIGNED_BYTE),
          m = w.offset(1),
          g = Uv()
            .crossValueAttribute(c)
            .crossNextValueAttribute(d)
            .mainValueAttribute(p)
            .mainNextValueAttribute(b)
            .definedAttribute(w)
            .definedNextAttribute(m),
          v = function (z, O) {
            return !1;
          },
          _ = Nn,
          S = [],
          C = null,
          V = null,
          E = function (z) {
            var O = _(f.xScale()),
              Y = _(f.yScale()),
              q = !v(S, z);
            q &&
              ((S = z),
              w
                .value(function (W, Q) {
                  return f.defined()(W, Q);
                })
                .data(z)),
              (q || O.scale !== C) &&
                ((C = O.scale),
                f.orient() === "vertical"
                  ? c
                      .value(function (W, Q) {
                        return O.scale(f.crossValue()(W, Q));
                      })
                      .data(z)
                  : c
                      .value(function (W, Q) {
                        return O.scale(f.mainValue()(W, Q));
                      })
                      .data(z)),
              (q || Y.scale !== V) &&
                ((V = Y.scale),
                f.orient() === "vertical"
                  ? p
                      .value(function (W, Q) {
                        return Y.scale(f.mainValue()(W, Q));
                      })
                      .data(z)
                  : p
                      .value(function (W, Q) {
                        return Y.scale(f.crossValue()(W, Q));
                      })
                      .data(z)),
              g
                .xScale(O.webglScale)
                .yScale(Y.webglScale)
                .decorate(function (W) {
                  return f.decorate()(W, z, 0);
                }),
              g(z.length);
          };
        return (
          (E.equals = function () {
            return arguments.length
              ? ((v = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : v;
          }),
          (E.scaleMapper = function () {
            return arguments.length
              ? ((_ = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : _;
          }),
          k(E, f, B("baseValue", "bandwidth", "align")),
          A(E, g, "context", "lineWidth", "pixelRatio"),
          E
        );
      },
      ox = function () {
        var f = l.symbol(),
          c = rr(),
          d = ze("g", "point"),
          p = function (m) {
            return "translate(" + m[0] + ", " + m[1] + ")";
          },
          b = function (m) {
            at(m) && d.transition(m),
              m.each(function (g, v, _) {
                var S = g.filter(c.defined()),
                  C = d(u.select(_[v]), S);
                C.enter()
                  .attr("transform", function (V, E) {
                    return p(c.values(V, E).origin);
                  })
                  .attr("fill", et.gray)
                  .attr("stroke", et.black)
                  .append("path"),
                  C.attr("transform", function (V, E) {
                    return p(c.values(V, E).origin);
                  })
                    .select("path")
                    .attr("d", f),
                  c.decorate()(C, g, v);
              });
          };
        return (
          k(b, c, B("baseValue", "bandwidth", "align")),
          A(b, d, "key"),
          A(b, f, "type", "size"),
          b
        );
      },
      ix = function () {
        var f = l.symbol(),
          c = rr(),
          d = function (b) {
            var w = b.filter(c.defined()),
              m = f.context();
            w.forEach(function (g, v) {
              m.save();
              var _ = c.values(g, v);
              m.translate(_.origin[0], _.origin[1]),
                m.beginPath(),
                (m.strokeStyle = et.black),
                (m.fillStyle = et.gray),
                c.decorate()(m, g, v),
                f(g, v),
                m.fill(),
                m.stroke(),
                m.closePath(),
                m.restore();
            });
          };
        return (
          k(d, c, B("baseValue", "bandwidth", "align")),
          A(d, f, "size", "type", "context"),
          d
        );
      },
      Ak = function () {
        var f = rr(),
          c = $e(64),
          d = l.symbolCircle,
          p = Ae(),
          b = Ae(),
          w = Ae().type(Ee.UNSIGNED_SHORT),
          m = Ae().type(Ee.UNSIGNED_BYTE),
          g = Gv()
            .crossValueAttribute(p)
            .mainValueAttribute(b)
            .sizeAttribute(w)
            .definedAttribute(m),
          v = function (z, O) {
            return !1;
          },
          _ = Nn,
          S = [],
          C = null,
          V = null,
          E = function (z) {
            var O = _(f.xScale()),
              Y = _(f.yScale()),
              q = !v(S, z);
            q &&
              ((S = z),
              w
                .value(function (W, Q) {
                  return c(W, Q);
                })
                .data(z),
              m
                .value(function (W, Q) {
                  return f.defined()(W, Q);
                })
                .data(z)),
              (q || O.scale !== C) &&
                ((C = O.scale),
                f.orient() === "vertical"
                  ? p
                      .value(function (W, Q) {
                        return O.scale(f.crossValue()(W, Q));
                      })
                      .data(z)
                  : p
                      .value(function (W, Q) {
                        return O.scale(f.mainValue()(W, Q));
                      })
                      .data(z)),
              (q || Y.scale !== V) &&
                ((V = Y.scale),
                f.orient() === "vertical"
                  ? b
                      .value(function (W, Q) {
                        return Y.scale(f.mainValue()(W, Q));
                      })
                      .data(z)
                  : b
                      .value(function (W, Q) {
                        return Y.scale(f.crossValue()(W, Q));
                      })
                      .data(z)),
              g
                .xScale(O.webglScale)
                .yScale(Y.webglScale)
                .type(rx(d))
                .decorate(function (W) {
                  return f.decorate()(W, z, 0);
                }),
              g(z.length);
          };
        return (
          (E.size = function () {
            return arguments.length
              ? ((c = $e(arguments.length <= 0 ? void 0 : arguments[0])), E)
              : c;
          }),
          (E.type = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : d;
          }),
          (E.equals = function () {
            return arguments.length
              ? ((v = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : v;
          }),
          (E.scaleMapper = function () {
            return arguments.length
              ? ((_ = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : _;
          }),
          k(E, f, B("baseValue", "bandwidth", "align")),
          A(E, g, "context", "pixelRatio"),
          E
        );
      },
      kk = function () {
        var f = xo().x(0).y(0),
          c = rr(),
          d = ze("g", "bar"),
          p = function (v) {
            return c.orient() === "vertical" ? v.height : v.width;
          },
          b = function (v) {
            return c.orient() === "vertical" ? v.width : v.height;
          },
          w = function (v) {
            return "translate(" + v[0] + ", " + v[1] + ")";
          },
          m = function (v) {
            at(v) && d.transition(v),
              v.each(function (_, S, C) {
                var V = c.orient();
                if (V !== "vertical" && V !== "horizontal")
                  throw new Error(
                    "The bar series does not support an orientation of " + V,
                  );
                var E = _.filter(c.defined()),
                  P = E.map(c.values);
                f.width(0).height(0),
                  c.orient() === "vertical"
                    ? (f.verticalAlign("top"), f.horizontalAlign("center"))
                    : (f.horizontalAlign("right"), f.verticalAlign("center"));
                var z = d(u.select(C[S]), E);
                z
                  .enter()
                  .attr("transform", function (O, Y) {
                    return w(P[Y].baseOrigin);
                  })
                  .attr("class", "bar " + c.orient())
                  .attr("fill", et.darkGray)
                  .append("path")
                  .attr("d", function (O, Y) {
                    return b(f)(P[Y].width), f([O]);
                  }),
                  z
                    .attr("transform", function (O, Y) {
                      return w(P[Y].origin);
                    })
                    .select("path")
                    .attr("d", function (O, Y) {
                      return b(f)(P[Y].width), p(f)(-P[Y].height), f([O]);
                    }),
                  c.decorate()(z, E, S);
              });
          };
        return k(m, c), A(m, d, "key"), m;
      },
      Ck = function () {
        var f = rr(),
          c = xo().x(0).y(0),
          d = function (m) {
            return f.orient() === "vertical" ? m.height : m.width;
          },
          p = function (m) {
            return f.orient() === "vertical" ? m.width : m.height;
          },
          b = function (m) {
            var g = c.context(),
              v = m.filter(f.defined()),
              _ = v.map(f.values);
            f.orient() === "vertical"
              ? (c.verticalAlign("top"), c.horizontalAlign("center"))
              : (c.horizontalAlign("right"), c.verticalAlign("center")),
              _.forEach(function (S, C) {
                g.save(),
                  g.beginPath(),
                  g.translate(S.origin[0], S.origin[1]),
                  (g.fillStyle = et.darkGray),
                  (g.strokeStyle = "transparent"),
                  f.decorate()(g, S.d, C),
                  d(c)(-S.height),
                  p(c)(S.width),
                  c([S]),
                  g.fill(),
                  g.stroke(),
                  g.closePath(),
                  g.restore();
              });
          };
        return k(b, f), A(b, c, "context"), b;
      },
      Tk = function () {
        var f = rr(),
          c = Ae(),
          d = Ae(),
          p = Ae(),
          b = Ae().type(Ee.UNSIGNED_SHORT),
          w = Ae().type(Ee.UNSIGNED_BYTE),
          m = jv()
            .crossValueAttribute(c)
            .mainValueAttribute(d)
            .baseValueAttribute(p)
            .bandwidthAttribute(b)
            .definedAttribute(w),
          g = function (P, z) {
            return !1;
          },
          v = Nn,
          _ = [],
          S = null,
          C = null,
          V = function (P) {
            if (f.orient() !== "vertical")
              throw new Error("Unsupported orientation ".concat(f.orient()));
            var z = v(f.xScale()),
              O = v(f.yScale()),
              Y = !g(_, P);
            Y &&
              ((_ = P),
              b
                .value(function (q, W) {
                  return f.bandwidth()(q, W);
                })
                .data(P),
              w
                .value(function (q, W) {
                  return f.defined()(q, W);
                })
                .data(P)),
              (Y || z.scale !== S) &&
                ((S = z.scale),
                c
                  .value(function (q, W) {
                    return z.scale(f.crossValue()(q, W));
                  })
                  .data(P)),
              (Y || O.scale !== C) &&
                ((C = O.scale),
                p
                  .value(function (q, W) {
                    return O.scale(f.baseValue()(q, W));
                  })
                  .data(P),
                d
                  .value(function (q, W) {
                    return O.scale(f.mainValue()(q, W));
                  })
                  .data(P)),
              m
                .xScale(z.webglScale)
                .yScale(O.webglScale)
                .decorate(function (q) {
                  return f.decorate()(q, P, 0);
                }),
              m(P.length);
          };
        return (
          (V.equals = function () {
            return arguments.length
              ? ((g = arguments.length <= 0 ? void 0 : arguments[0]), V)
              : g;
          }),
          (V.scaleMapper = function () {
            return arguments.length
              ? ((v = arguments.length <= 0 ? void 0 : arguments[0]), V)
              : v;
          }),
          k(V, f, B("align")),
          A(V, m, "context", "pixelRatio"),
          V
        );
      },
      nd = function () {
        var f = function (v) {
            return v.high;
          },
          c = function (v) {
            return v.low;
          },
          d = function (v) {
            return v.cross;
          },
          p = "vertical",
          b = "center",
          w = function () {
            return 5;
          },
          m = ga({
            decorate: function () {},
            defined: function (v, _) {
              return zi(c, f, d)(v, _);
            },
            xScale: r.scaleIdentity(),
            yScale: r.scaleIdentity(),
          });
        return (
          (m.values = function (g, v) {
            var _ = w(g, v),
              S = Pi(b, _),
              C = m.xScale(),
              V = m.yScale();
            if (p === "vertical") {
              var E = V(f(g, v));
              return {
                origin: [C(d(g, v)) + S, E],
                high: 0,
                low: V(c(g, v)) - E,
                width: _,
              };
            } else {
              var P = C(c(g, v));
              return {
                origin: [P, V(d(g, v)) + S],
                high: C(f(g, v)) - P,
                low: 0,
                width: _,
              };
            }
          }),
          (m.xValues = function () {
            return p === "vertical" ? [d] : [f, c];
          }),
          (m.yValues = function () {
            return p !== "vertical" ? [d] : [f, c];
          }),
          (m.orient = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : p;
          }),
          (m.lowValue = function () {
            return arguments.length
              ? ((c = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : c;
          }),
          (m.highValue = function () {
            return arguments.length
              ? ((f = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : f;
          }),
          (m.crossValue = function () {
            return arguments.length
              ? ((d = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : d;
          }),
          (m.bandwidth = function () {
            return arguments.length
              ? ((w = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : w;
          }),
          (m.align = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : b;
          }),
          m
        );
      },
      Vk = function () {
        var f = nd(),
          c = ze("g", "error-bar"),
          d = Xs().value(0),
          p = function (g) {
            return function (v) {
              return at(g) ? v.transition(g) : v;
            };
          },
          b = function (g) {
            return "translate(" + g.origin[0] + ", " + g.origin[1] + ")";
          },
          w = function (g) {
            at(g) && c.transition(g);
            var v = p(g);
            g.each(function (_, S, C) {
              var V = _.filter(f.defined()),
                E = V.map(f.values),
                P = c(u.select(C[S]), V);
              P.enter()
                .attr("stroke", et.black)
                .attr("fill", et.gray)
                .attr("transform", function (z, O) {
                  return b(f.values(z, O)) + " scale(1e-6, 1)";
                })
                .append("path"),
                d.orient(f.orient()),
                P.each(function (z, O, Y) {
                  var q = E[O];
                  d.high(q.high).low(q.low).width(q.width),
                    v(u.select(Y[O]))
                      .attr("transform", b(q) + " scale(1)")
                      .select("path")
                      .attr("d", d([z]));
                }),
                f.decorate()(P, _, S);
            });
          };
        return k(w, f), A(w, c, "key"), w;
      },
      Nk = function () {
        var f = nd(),
          c = Xs().value(0),
          d = function (b) {
            var w = b.filter(f.defined()),
              m = c.context();
            c.orient(f.orient()),
              w.forEach(function (g, v) {
                m.save();
                var _ = f.values(g, v);
                m.translate(_.origin[0], _.origin[1]),
                  m.beginPath(),
                  (m.strokeStyle = et.black),
                  (m.fillStyle = et.gray),
                  f.decorate()(m, g, v),
                  c.high(_.high).width(_.width).low(_.low)([g]),
                  m.fill(),
                  m.stroke(),
                  m.closePath(),
                  m.restore();
              });
          };
        return k(d, f), A(d, c, "context"), d;
      },
      Dk = function () {
        var f = nd(),
          c = Ae(),
          d = Ae(),
          p = Ae(),
          b = Ae().type(Ee.UNSIGNED_SHORT),
          w = Ae().type(Ee.UNSIGNED_BYTE),
          m = Qv()
            .crossValueAttribute(c)
            .highValueAttribute(d)
            .lowValueAttribute(p)
            .bandwidthAttribute(b)
            .definedAttribute(w),
          g = function (P, z) {
            return !1;
          },
          v = Nn,
          _ = [],
          S = null,
          C = null,
          V = function (P) {
            if (f.orient() !== "vertical")
              throw new Error("Unsupported orientation ".concat(f.orient()));
            var z = v(f.xScale()),
              O = v(f.yScale()),
              Y = !g(_, P);
            Y &&
              ((_ = P),
              b
                .value(function (q, W) {
                  return f.bandwidth()(q, W);
                })
                .data(P),
              w
                .value(function (q, W) {
                  return f.defined()(q, W);
                })
                .data(P)),
              (Y || z.scale !== S) &&
                ((S = z.scale),
                c
                  .value(function (q, W) {
                    return z.scale(f.crossValue()(q, W));
                  })
                  .data(P)),
              (Y || O.scale !== C) &&
                ((C = O.scale),
                d
                  .value(function (q, W) {
                    return O.scale(f.highValue()(q, W));
                  })
                  .data(P),
                p
                  .value(function (q, W) {
                    return O.scale(f.lowValue()(q, W));
                  })
                  .data(P)),
              m
                .xScale(z.webglScale)
                .yScale(O.webglScale)
                .decorate(function (q) {
                  return f.decorate()(q, P, 0);
                }),
              m(P.length);
          };
        return (
          (V.equals = function () {
            return arguments.length
              ? ((g = arguments.length <= 0 ? void 0 : arguments[0]), V)
              : g;
          }),
          (V.scaleMapper = function () {
            return arguments.length
              ? ((v = arguments.length <= 0 ? void 0 : arguments[0]), V)
              : v;
          }),
          k(V, f, B("align")),
          A(V, m, "context", "lineWidth", "pixelRatio"),
          V
        );
      },
      Ek = function () {
        var f = rr(),
          c = l.area(),
          d = ze("path", "area"),
          p = function (w) {
            at(w) && d.transition(w),
              c.defined(f.defined()),
              w.each(function (m, g, v) {
                var _ = m.map(f.values);
                c.x(function (V, E) {
                  return _[E].transposedX;
                }).y(function (V, E) {
                  return _[E].transposedY;
                });
                var S = f.orient() === "vertical" ? "y" : "x";
                c[S + "0"](function (V, E) {
                  return _[E].y0;
                }),
                  c[S + "1"](function (V, E) {
                    return _[E].y;
                  });
                var C = d(u.select(v[g]), [m]);
                C.enter().attr("fill", et.gray),
                  C.attr("d", c),
                  f.decorate()(C, m, g);
              });
          };
        return (
          k(p, f, B("bandwidth", "align")), A(p, d, "key"), A(p, c, "curve"), p
        );
      },
      Ik = function () {
        var f = rr(),
          c = l.area(),
          d = function (b) {
            var w = c.context();
            c.defined(f.defined());
            var m = b.map(f.values);
            c.x(function (v, _) {
              return m[_].transposedX;
            }).y(function (v, _) {
              return m[_].transposedY;
            });
            var g = f.orient() === "vertical" ? "y" : "x";
            c[g + "0"](function (v, _) {
              return m[_].y0;
            }),
              c[g + "1"](function (v, _) {
                return m[_].y;
              }),
              w.beginPath(),
              (w.fillStyle = et.gray),
              (w.strokeStyle = "transparent"),
              f.decorate()(w, b),
              c(b),
              w.fill(),
              w.stroke(),
              w.closePath();
          };
        return k(d, f, B("bandwidth", "align")), A(d, c, "curve", "context"), d;
      },
      zk = function () {
        var f = rr(),
          c = Vn(0, 1),
          d = c.offset(1),
          p = Vn(0, 1),
          b = p.offset(1),
          w = Vn(0, 1),
          m = w.offset(1),
          g = Vn(0, 1).type(Ee.UNSIGNED_BYTE),
          v = g.offset(1),
          _ = Wv()
            .crossValueAttribute(c)
            .crossNextValueAttribute(d)
            .mainValueAttribute(p)
            .mainNextValueAttribute(b)
            .baseValueAttribute(w)
            .baseNextValueAttribute(m)
            .definedAttribute(g)
            .definedNextAttribute(v),
          S = function (Y, q) {
            return !1;
          },
          C = Nn,
          V = [],
          E = null,
          P = null,
          z = function (Y) {
            if (f.orient() !== "vertical")
              throw new Error("Unsupported orientation ".concat(f.orient()));
            var q = C(f.xScale()),
              W = C(f.yScale()),
              Q = !S(V, Y);
            Q &&
              ((V = Y),
              g
                .value(function (oe, pe) {
                  return f.defined()(oe, pe);
                })
                .data(Y)),
              (Q || q.scale !== E) &&
                ((E = q.scale),
                c
                  .value(function (oe, pe) {
                    return q.scale(f.crossValue()(oe, pe));
                  })
                  .data(Y)),
              (Q || W.scale !== P) &&
                ((P = W.scale),
                w
                  .value(function (oe, pe) {
                    return W.scale(f.baseValue()(oe, pe));
                  })
                  .data(Y),
                p
                  .value(function (oe, pe) {
                    return W.scale(f.mainValue()(oe, pe));
                  })
                  .data(Y)),
              _.xScale(q.webglScale)
                .yScale(W.webglScale)
                .decorate(function (oe) {
                  return f.decorate()(oe, Y, 0);
                }),
              _(Y.length);
          };
        return (
          (z.equals = function () {
            return arguments.length
              ? ((S = arguments.length <= 0 ? void 0 : arguments[0]), z)
              : S;
          }),
          (z.scaleMapper = function () {
            return arguments.length
              ? ((C = arguments.length <= 0 ? void 0 : arguments[0]), z)
              : C;
          }),
          k(z, f, B("bandwidth", "align")),
          A(z, _, "context", "pixelRatio"),
          z
        );
      },
      ad = function () {
        var f,
          c = function (S) {
            return S.date;
          },
          d = function (S) {
            return S.open;
          },
          p = function (S) {
            return S.high;
          },
          b = function (S) {
            return S.low;
          },
          w = function (S) {
            return S.close;
          },
          m = function () {
            return 5;
          },
          g = "center",
          v = function (S, C) {
            return f.xScale()(c(S, C));
          };
        return (
          (f = ga({
            decorate: function () {},
            defined: function (S, C) {
              return zi(c, d, b, p, w)(S, C);
            },
            xScale: r.scaleIdentity(),
            yScale: r.scaleIdentity(),
          })),
          (f.values = function (_, S) {
            var C = w(_, S),
              V = d(_, S),
              E = m(_, S),
              P = Pi(g, E),
              z = "";
            return (
              C > V ? (z = "up") : C < V && (z = "down"),
              {
                cross: v(_, S) + P,
                open: f.yScale()(V),
                high: f.yScale()(p(_, S)),
                low: f.yScale()(b(_, S)),
                close: f.yScale()(C),
                width: E,
                direction: z,
              }
            );
          }),
          (f.xValues = function () {
            return [c];
          }),
          (f.yValues = function () {
            return [d, p, b, w];
          }),
          (f.crossValue = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), f)
              : c;
          }),
          (f.openValue = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), f)
              : d;
          }),
          (f.highValue = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), f)
              : p;
          }),
          (f.lowValue = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), f)
              : b;
          }),
          (f.yValue = f.closeValue =
            function () {
              return arguments.length
                ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), f)
                : w;
            }),
          (f.bandwidth = function () {
            return arguments.length
              ? ((m = $e(arguments.length <= 0 ? void 0 : arguments[0])), f)
              : m;
          }),
          (f.align = function () {
            return arguments.length
              ? ((g = arguments.length <= 0 ? void 0 : arguments[0]), f)
              : g;
          }),
          f
        );
      },
      ux = function (f, c) {
        var d = ad(),
          p = ze("g", c),
          b = function (v) {
            return "translate(" + v.cross + ", " + v.high + ")";
          },
          w = function (v) {
            return function (_) {
              return at(v) ? _.transition(v) : _;
            };
          },
          m = function (v) {
            at(v) && p.transition(v);
            var _ = w(v);
            v.each(function (S, C, V) {
              var E = S.filter(d.defined()),
                P = p(u.select(V[C]), E);
              P.enter()
                .attr("transform", function (z, O) {
                  return b(d.values(z, O)) + " scale(1e-6, 1)";
                })
                .append("path"),
                P.each(function (z, O, Y) {
                  var q = d.values(z, O),
                    W = q.direction === "up" ? et.green : et.red,
                    Q = _(u.select(Y[O]))
                      .attr("class", c + " " + q.direction)
                      .attr("stroke", W)
                      .attr("fill", W)
                      .attr("transform", function () {
                        return b(q) + " scale(1)";
                      });
                  f
                    .x(0)
                    .width(q.width)
                    .open(function () {
                      return q.open - q.high;
                    })
                    .high(0)
                    .low(function () {
                      return q.low - q.high;
                    })
                    .close(function () {
                      return q.close - q.high;
                    }),
                    Q.select("path").attr("d", f([z]));
                }),
                d.decorate()(P, S, C);
            });
          };
        return A(m, p, "key"), k(m, d), m;
      },
      Pk = function () {
        return ux(Gs(), "candlestick");
      },
      fx = function (f) {
        var c = ad(),
          d = function (b) {
            var w = b.filter(c.defined()),
              m = f.context();
            w.forEach(function (g, v) {
              m.save();
              var _ = c.values(g, v);
              m.translate(_.cross, _.high),
                m.beginPath(),
                f
                  .x(0)
                  .open(function () {
                    return _.open - _.high;
                  })
                  .width(_.width)
                  .high(0)
                  .low(function () {
                    return _.low - _.high;
                  })
                  .close(function () {
                    return _.close - _.high;
                  })([g]);
              var S = _.direction === "up" ? et.green : et.red;
              (m.strokeStyle = S),
                (m.fillStyle = S),
                c.decorate()(m, g, v),
                m.fill(),
                m.stroke(),
                m.closePath(),
                m.restore();
            });
          };
        return A(d, f, "context"), k(d, c), d;
      },
      Rk = function () {
        return fx(Gs());
      },
      lx = function (f) {
        var c = ad(),
          d = Ae(),
          p = Ae(),
          b = Ae(),
          w = Ae(),
          m = Ae(),
          g = Ae().type(Ee.UNSIGNED_SHORT),
          v = Ae().type(Ee.UNSIGNED_BYTE);
        f.crossValueAttribute(d)
          .openValueAttribute(p)
          .highValueAttribute(b)
          .lowValueAttribute(w)
          .closeValueAttribute(m)
          .bandwidthAttribute(g)
          .definedAttribute(v);
        var _ = function (O, Y) {
            return !1;
          },
          S = Nn,
          C = [],
          V = null,
          E = null,
          P = function (O) {
            var Y = S(c.xScale()),
              q = S(c.yScale()),
              W = !_(C, O);
            W &&
              ((C = O),
              g
                .value(function (Q, oe) {
                  return c.bandwidth()(Q, oe);
                })
                .data(O),
              v
                .value(function (Q, oe) {
                  return c.defined()(Q, oe);
                })
                .data(O)),
              (W || Y.scale !== V) &&
                ((V = Y.scale),
                d
                  .value(function (Q, oe) {
                    return Y.scale(c.crossValue()(Q, oe));
                  })
                  .data(O)),
              (W || q.scale !== E) &&
                ((E = q.scale),
                p
                  .value(function (Q, oe) {
                    return q.scale(c.openValue()(Q, oe));
                  })
                  .data(O),
                b
                  .value(function (Q, oe) {
                    return q.scale(c.highValue()(Q, oe));
                  })
                  .data(O),
                w
                  .value(function (Q, oe) {
                    return q.scale(c.lowValue()(Q, oe));
                  })
                  .data(O),
                m
                  .value(function (Q, oe) {
                    return q.scale(c.closeValue()(Q, oe));
                  })
                  .data(O)),
              f
                .xScale(Y.webglScale)
                .yScale(q.webglScale)
                .decorate(function (Q) {
                  return c.decorate()(Q, O, 0);
                }),
              f(O.length);
          };
        return (
          (P.equals = function () {
            return arguments.length
              ? ((_ = arguments.length <= 0 ? void 0 : arguments[0]), P)
              : _;
          }),
          (P.scaleMapper = function () {
            return arguments.length
              ? ((S = arguments.length <= 0 ? void 0 : arguments[0]), P)
              : S;
          }),
          k(P, c, B("align")),
          A(P, f, "context", "lineWidth", "pixelRatio"),
          P
        );
      },
      Lk = function () {
        return lx(Kv());
      },
      od = function () {
        var f = function (C) {
            return C.upperQuartile;
          },
          c = function (C) {
            return C.lowerQuartile;
          },
          d = function (C) {
            return C.high;
          },
          p = function (C) {
            return C.low;
          },
          b = function (C) {
            return C.value;
          },
          w = function (C) {
            return C.median;
          },
          m = "vertical",
          g = "center",
          v = function () {
            return 5;
          },
          _ = ga({
            decorate: function () {},
            defined: function (C, V) {
              return zi(p, d, c, f, b, w)(C, V);
            },
            xScale: r.scaleIdentity(),
            yScale: r.scaleIdentity(),
          });
        return (
          (_.values = function (S, C) {
            var V = v(S, C),
              E = Pi(g, V),
              P = _.xScale(),
              z = _.yScale();
            if (m === "vertical") {
              var O = z(d(S, C));
              return {
                origin: [P(b(S, C)) + E, O],
                high: 0,
                upperQuartile: z(f(S, C)) - O,
                median: z(w(S, C)) - O,
                lowerQuartile: z(c(S, C)) - O,
                low: z(p(S, C)) - O,
                width: V,
              };
            } else {
              var Y = P(p(S, C));
              return {
                origin: [Y, z(b(S, C)) + E],
                high: P(d(S, C)) - Y,
                upperQuartile: P(f(S, C)) - Y,
                median: P(w(S, C)) - Y,
                lowerQuartile: P(c(S, C)) - Y,
                low: 0,
                width: V,
              };
            }
          }),
          (_.xValues = function () {
            return m === "vertical" ? [b] : [f, c, d, p, w];
          }),
          (_.yValues = function () {
            return m !== "vertical" ? [b] : [f, c, d, p, w];
          }),
          (_.orient = function () {
            return arguments.length
              ? ((m = arguments.length <= 0 ? void 0 : arguments[0]), _)
              : m;
          }),
          (_.lowerQuartileValue = function () {
            return arguments.length
              ? ((c = $e(arguments.length <= 0 ? void 0 : arguments[0])), _)
              : c;
          }),
          (_.upperQuartileValue = function () {
            return arguments.length
              ? ((f = $e(arguments.length <= 0 ? void 0 : arguments[0])), _)
              : f;
          }),
          (_.lowValue = function () {
            return arguments.length
              ? ((p = $e(arguments.length <= 0 ? void 0 : arguments[0])), _)
              : p;
          }),
          (_.highValue = function () {
            return arguments.length
              ? ((d = $e(arguments.length <= 0 ? void 0 : arguments[0])), _)
              : d;
          }),
          (_.crossValue = function () {
            return arguments.length
              ? ((b = $e(arguments.length <= 0 ? void 0 : arguments[0])), _)
              : b;
          }),
          (_.medianValue = function () {
            return arguments.length
              ? ((w = $e(arguments.length <= 0 ? void 0 : arguments[0])), _)
              : w;
          }),
          (_.bandwidth = function () {
            return arguments.length
              ? ((v = $e(arguments.length <= 0 ? void 0 : arguments[0])), _)
              : v;
          }),
          (_.align = function () {
            return arguments.length
              ? ((g = arguments.length <= 0 ? void 0 : arguments[0]), _)
              : g;
          }),
          _
        );
      },
      Ok = function () {
        var f = od(),
          c = ze("g", "box-plot"),
          d = Us().value(0),
          p = function (g) {
            return function (v) {
              return at(g) ? v.transition(g) : v;
            };
          },
          b = function (g) {
            return "translate(" + g.origin[0] + ", " + g.origin[1] + ")";
          },
          w = function (g) {
            at(g) && c.transition(g);
            var v = p(g);
            g.each(function (_, S, C) {
              var V = _.filter(f.defined()),
                E = c(u.select(C[S]), V);
              E.enter()
                .attr("stroke", et.black)
                .attr("fill", et.gray)
                .attr("transform", function (P, z) {
                  return b(f.values(P, z)) + " scale(1e-6, 1)";
                })
                .append("path"),
                d.orient(f.orient()),
                E.each(function (P, z, O) {
                  var Y = f.values(P, z);
                  d
                    .median(Y.median)
                    .upperQuartile(Y.upperQuartile)
                    .lowerQuartile(Y.lowerQuartile)
                    .width(Y.width)
                    .high(Y.high)
                    .low(Y.low),
                    v(u.select(O[z]))
                      .attr("transform", b(Y))
                      .select("path")
                      .attr("d", d([P]));
                }),
                f.decorate()(E, _, S);
            });
          };
        return k(w, f), A(w, c, "key"), A(w, d, "cap"), w;
      },
      Bk = function () {
        var f = od(),
          c = Us().value(0),
          d = function (b) {
            var w = b.filter(f.defined()),
              m = c.context();
            c.orient(f.orient()),
              w.forEach(function (g, v) {
                m.save();
                var _ = f.values(g, v);
                m.translate(_.origin[0], _.origin[1]),
                  m.beginPath(),
                  (m.fillStyle = et.gray),
                  (m.strokeStyle = et.black),
                  f.decorate()(m, g, v),
                  c
                    .median(_.median)
                    .upperQuartile(_.upperQuartile)
                    .lowerQuartile(_.lowerQuartile)
                    .high(_.high)
                    .width(_.width)
                    .low(_.low)([g]),
                  m.fill(),
                  m.stroke(),
                  m.closePath(),
                  m.restore();
              });
          };
        return k(d, f), A(d, c, "cap", "context"), d;
      },
      Fk = function () {
        var f = od(),
          c = Ae(),
          d = Ae(),
          p = Ae(),
          b = Ae(),
          w = Ae(),
          m = Ae(),
          g = Ae().type(Ee.UNSIGNED_SHORT),
          v = Ae().type(Ee.UNSIGNED_SHORT),
          _ = Ae().type(Ee.UNSIGNED_BYTE),
          S = Zv()
            .crossValueAttribute(c)
            .highValueAttribute(d)
            .upperQuartileValueAttribute(p)
            .medianValueAttribute(b)
            .lowerQuartileValueAttribute(w)
            .lowValueAttribute(m)
            .bandwidthAttribute(g)
            .capAttribute(v)
            .definedAttribute(_),
          C = function (W, Q) {
            return !1;
          },
          V = Nn,
          E = [],
          P = null,
          z = null,
          O = $e(20),
          Y = function (W) {
            if (f.orient() !== "vertical")
              throw new Error("Unsupported orientation ".concat(f.orient()));
            var Q = V(f.xScale()),
              oe = V(f.yScale()),
              pe = !C(E, W);
            pe &&
              ((E = W),
              g
                .value(function (ge, he) {
                  return f.bandwidth()(ge, he);
                })
                .data(W),
              v
                .value(function (ge, he) {
                  return O(ge, he);
                })
                .data(W),
              _.value(function (ge, he) {
                return f.defined()(ge, he);
              }).data(W)),
              (pe || Q.scale !== P) &&
                ((P = Q.scale),
                c
                  .value(function (ge, he) {
                    return Q.scale(f.crossValue()(ge, he));
                  })
                  .data(W)),
              (pe || oe.scale !== z) &&
                ((z = oe.scale),
                d
                  .value(function (ge, he) {
                    return oe.scale(f.highValue()(ge, he));
                  })
                  .data(W),
                p
                  .value(function (ge, he) {
                    return oe.scale(f.upperQuartileValue()(ge, he));
                  })
                  .data(W),
                b
                  .value(function (ge, he) {
                    return oe.scale(f.medianValue()(ge, he));
                  })
                  .data(W),
                w
                  .value(function (ge, he) {
                    return oe.scale(f.lowerQuartileValue()(ge, he));
                  })
                  .data(W),
                m
                  .value(function (ge, he) {
                    return oe.scale(f.lowValue()(ge, he));
                  })
                  .data(W)),
              S.xScale(Q.webglScale)
                .yScale(oe.webglScale)
                .decorate(function (ge) {
                  return f.decorate()(ge, W, 0);
                }),
              S(W.length);
          };
        return (
          (Y.cap = function () {
            return arguments.length
              ? ((O = $e(arguments.length <= 0 ? void 0 : arguments[0])), Y)
              : O;
          }),
          (Y.equals = function () {
            return arguments.length
              ? ((C = arguments.length <= 0 ? void 0 : arguments[0]), Y)
              : C;
          }),
          (Y.scaleMapper = function () {
            return arguments.length
              ? ((V = arguments.length <= 0 ? void 0 : arguments[0]), Y)
              : V;
          }),
          k(Y, f, B("align")),
          A(Y, S, "context", "lineWidth", "pixelRatio"),
          Y
        );
      },
      Hk = function () {
        return ux($s(), "ohlc");
      },
      Yk = function () {
        return fx($s());
      },
      qk = function () {
        return lx(Xv());
      },
      id = function () {
        var f = [],
          c = function (w) {
            return w;
          },
          d = function (w, m) {
            return m;
          },
          p = ga({
            decorate: function () {},
            xScale: r.scaleIdentity(),
            yScale: r.scaleIdentity(),
          });
        return (
          (p.xValues = function () {
            return f
              .map(function (b) {
                return b.xValues();
              })
              .reduce(function (b, w) {
                return b.concat(w);
              });
          }),
          (p.yValues = function () {
            return f
              .map(function (b) {
                return b.yValues();
              })
              .reduce(function (b, w) {
                return b.concat(w);
              });
          }),
          (p.mapping = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : c;
          }),
          (p.key = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : d;
          }),
          (p.series = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : f;
          }),
          p
        );
      },
      ud = function () {
        var f = id(),
          c = ze("g"),
          d = ze("g", "multi"),
          p = function (w) {
            at(w) && (d.transition(w), c.transition(w));
            var m = f.mapping(),
              g = f.series(),
              v = f.xScale(),
              _ = f.yScale();
            w.each(function (S, C, V) {
              var E = d(u.select(V[C]), g);
              E.each(function (P, z, O) {
                P.xScale(v).yScale(_);
                var Y = m(S, z, g),
                  q = c(u.select(O[z]), [Y]);
                q.call(P);
              }),
                E.selection().order(),
                f.decorate()(E, S, C);
            });
          };
        return k(p, f), A(p, d, "key"), p;
      },
      fd = function () {
        var f = null,
          c = id(),
          d = function (b) {
            var w = c.mapping(),
              m = c.series(),
              g = c.xScale(),
              v = c.yScale();
            m.forEach(function (_, S) {
              var C = w(b, S, m);
              _.context(f).xScale(g).yScale(v);
              var V;
              _.decorate
                ? ((V = _.decorate()),
                  _.decorate(function (E, P, z) {
                    c.decorate()(E, b, S), V(E, P, z);
                  }))
                : c.decorate()(f, b, S),
                _(C),
                V && _.decorate(V);
            });
          };
        return (
          (d.context = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), d)
              : f;
          }),
          k(d, c),
          d
        );
      },
      cx = function () {
        var f = null,
          c = 1,
          d = id(),
          p = function (w) {
            var m = d.mapping(),
              g = d.series(),
              v = d.xScale(),
              _ = d.yScale();
            g.forEach(function (S, C) {
              var V = m(w, C, g);
              S.context(f).pixelRatio(c).xScale(v).yScale(_);
              var E;
              S.decorate
                ? ((E = S.decorate()),
                  S.decorate(function (P, z, O) {
                    d.decorate()(P, w, C), E(P, z, O);
                  }))
                : d.decorate()(f, w, C),
                S(V),
                E && S.decorate(E);
            });
          };
        return (
          (p.context = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : f;
          }),
          (p.pixelRatio = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : c;
          }),
          k(p, d),
          p
        );
      },
      sx = function (f) {
        var c = function () {
            return 50;
          },
          d = "center",
          p = r.scaleBand(),
          b = ga({
            decorate: function () {},
            xScale: r.scaleLinear(),
            yScale: r.scaleLinear(),
          });
        return (
          (b.offsetScaleForDatum = function (w, m, g) {
            var v = c(m, g),
              _ = Pi(d, v),
              S = v / 2;
            return p.domain(t.range(0, w.length)).range([-S + _, S + _]);
          }),
          (b.bandwidth = function () {
            return arguments.length
              ? ((c = $e(arguments.length <= 0 ? void 0 : arguments[0])), b)
              : c;
          }),
          (b.align = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), b)
              : d;
          }),
          k(b, p, R({ paddingInner: "paddingOuter" })),
          b
        );
      },
      Wk = function (f) {
        var c = sx(),
          d = ze("g", "grouped"),
          p = function (w) {
            at(w) && d.transition(w),
              w.each(function (m, g, v) {
                var _ = d(u.select(v[g]), m);
                _.enter().append("g"),
                  _.select("g").each(function (S, C, V) {
                    var E = u.select(V[C]),
                      P = f.orient() !== "horizontal",
                      z = function (Y, q) {
                        var W = c.offsetScaleForDatum(m, Y, q),
                          Q = P ? c.xScale() : c.yScale();
                        return Q(Y) + W(C) + W.bandwidth() / 2;
                      };
                    P
                      ? (f.xScale(z), f.yScale(c.yScale()))
                      : (f.yScale(z), f.xScale(c.xScale())),
                      f.bandwidth &&
                        f.bandwidth(function (O, Y) {
                          return c.offsetScaleForDatum(m, O, Y).bandwidth();
                        }),
                      f.decorate(function (O, Y) {
                        return c.decorate()(O, Y, C);
                      }),
                      E.call(f);
                  });
              });
          };
        return (
          k(p, f, B("decorate", "xScale", "yScale")),
          k(p, c, B("offsetScaleForDatum")),
          p
        );
      };
    function $k(f) {
      var c = sx(),
        d = function (b) {
          b.forEach(function (w, m) {
            var g = f.orient() !== "horizontal",
              v = function (S, C) {
                var V = c.offsetScaleForDatum(b, S, C),
                  E = g ? c.xScale() : c.yScale();
                return E(S) + V(m) + V.bandwidth() / 2;
              };
            g
              ? (f.xScale(v), f.yScale(c.yScale()))
              : (f.yScale(v), f.xScale(c.xScale())),
              f.bandwidth &&
                f.bandwidth(function (_, S) {
                  return c.offsetScaleForDatum(b, _, S).bandwidth();
                }),
              f.decorate(function (_, S) {
                return c.decorate()(_, S, m);
              }),
              f(w);
          });
        };
      return (
        k(d, f, B("decorate", "xScale", "yScale")),
        k(d, c, B("offsetScaleForDatum")),
        d
      );
    }
    var Gk = function () {
        var f = "vertical",
          c = Js(),
          d = ud(),
          p = function (w) {
            return w.each(function (m, g, v) {
              f === "vertical"
                ? d
                    .series(
                      m[0].map(function (_) {
                        return c;
                      }),
                    )
                    .mapping(function (_, S) {
                      return _.map(function (C) {
                        return C[S];
                      });
                    })
                : d
                    .series(
                      m.map(function (_) {
                        return c;
                      }),
                    )
                    .mapping(function (_, S) {
                      return _[S];
                    }),
                u.select(v[g]).call(d);
            });
          };
        return (
          (p.series = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : c;
          }),
          (p.orient = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : f;
          }),
          k(p, d, B("series", "mapping")),
          p
        );
      },
      Uk = function () {
        var f = "vertical",
          c = ed(),
          d = fd(),
          p = function (w) {
            f === "vertical"
              ? d
                  .series(
                    w[0].map(function (m) {
                      return c;
                    }),
                  )
                  .mapping(function (m, g) {
                    return m.map(function (v) {
                      return v[g];
                    });
                  })
              : d
                  .series(
                    w.map(function (m) {
                      return c;
                    }),
                  )
                  .mapping(function (m, g) {
                    return m[g];
                  }),
              d(w);
          };
        return (
          (p.series = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : c;
          }),
          (p.orient = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : f;
          }),
          k(p, d, B("series", "mapping")),
          p
        );
      },
      Xk = function () {
        var f = "vertical",
          c = function () {
            return ax();
          },
          d = cx(),
          p = [],
          b = function (m) {
            if (f === "vertical") {
              var g = p;
              (p = m[0].map(function (_, S) {
                return S < g.length ? g[S] : c();
              })),
                d.series(p).mapping(function (_, S) {
                  return _.map(function (C) {
                    return C[S];
                  });
                });
            } else {
              var v = p;
              (p = m.map(function (_, S) {
                return S < v.length ? v[S] : c();
              })),
                d.series(p).mapping(function (_, S) {
                  return _[S];
                });
            }
            d(m);
          };
        return (
          (b.series = function () {
            for (var w = arguments.length, m = new Array(w), g = 0; g < w; g++)
              m[g] = arguments[g];
            return m.length
              ? (typeof m[0].xScale == "function" &&
                typeof m[0].yScale == "function"
                  ? (c = function () {
                      return m[0];
                    })
                  : (c = m[0]),
                (p = []),
                b)
              : c;
          }),
          (b.orient = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]),
                (p = []),
                b)
              : f;
          }),
          k(b, d, B("series", "mapping")),
          b
        );
      },
      jk = function (c) {
        return c.sort(t.ascending).filter(function (d, p, b) {
          return b.indexOf(d, p + 1) === -1;
        });
      },
      Qk = function (f) {
        var c = 0.75,
          d = function (m) {
            if (m.length <= 1) return 10;
            m = jk(m);
            var g = t.pairs(m).map(function (_) {
                return Math.abs(_[0] - _[1]);
              }),
              v = t.min(g);
            return c * v;
          },
          p = function (m, g, v) {
            if (m.bandwidth) return m.bandwidth();
            var _,
              S = Array.isArray(g) ? (_ = []).concat.apply(_, be(g)) : g,
              C = S.filter(f.defined()).map(v()).map(m),
              V = d(C);
            return V;
          },
          b = function (m) {
            var g = function (_) {
              if (f.xBandwidth && f.yBandwidth)
                f.xBandwidth(p(f.xScale(), _, f.xValue)),
                  f.yBandwidth(p(f.yScale(), _, f.yValue));
              else {
                var S =
                  f.orient && f.orient() === "horizontal"
                    ? f.yScale()
                    : f.xScale();
                f.bandwidth(p(S, _, f.crossValue));
              }
            };
            m instanceof u.selection
              ? m.each(function (v, _, S) {
                  g(v), f(u.select(S[_]));
                })
              : (g(m), f(m));
          };
        return (
          k(b, f),
          (b.widthFraction = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), b)
              : c;
          }),
          b
        );
      },
      dx = function () {
        var f = function (v) {
            return v.x;
          },
          c = function (v) {
            return v.y;
          },
          d = function (v) {
            return v.color;
          },
          p = function () {
            return 5;
          },
          b = function () {
            return 5;
          },
          w = s.interpolateViridis,
          m = ga({
            decorate: function () {},
            defined: function (v, _) {
              return zi(f, c, d)(v, _);
            },
            xScale: r.scaleIdentity(),
            yScale: r.scaleIdentity(),
          });
        return (
          (m.pathGenerator = xo().x(0).y(0)),
          (m.colorScale = function (g) {
            var v = g.map(d);
            return r.scaleLinear().domain([t.min(v), t.max(v)]);
          }),
          (m.values = function (g, v) {
            return {
              x: m.xScale()(f(g, v)),
              y: m.yScale()(c(g, v)),
              colorValue: d(g, v),
              width: b(g, v),
              height: p(g, v),
            };
          }),
          (m.xValues = function () {
            return [f];
          }),
          (m.yValues = function () {
            return [c];
          }),
          (m.xValue = function () {
            return arguments.length
              ? ((f = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : f;
          }),
          (m.yValue = function () {
            return arguments.length
              ? ((c = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : c;
          }),
          (m.colorValue = function () {
            return arguments.length
              ? ((d = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : d;
          }),
          (m.colorInterpolate = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : w;
          }),
          (m.xBandwidth = function () {
            return arguments.length
              ? ((b = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : b;
          }),
          (m.yBandwidth = function () {
            return arguments.length
              ? ((p = $e(arguments.length <= 0 ? void 0 : arguments[0])), m)
              : p;
          }),
          k(
            m,
            m.pathGenerator,
            R({ horizontalAlign: "xAlign", verticalAlign: "yAlign" }),
          ),
          m
        );
      },
      Kk = function () {
        var f = dx(),
          c = ze("g", "box"),
          d = function (w) {
            return "translate(" + w.x + ", " + w.y + ")";
          },
          p = function (w) {
            w.each(function (m, g, v) {
              var _ = m.filter(f.defined()),
                S = f.colorValue(),
                C = f.colorInterpolate(),
                V = f.colorScale(_),
                E = c(u.select(v[g]), _);
              E.enter().append("path").attr("stroke", "transparent"),
                E.attr("transform", function (P, z) {
                  return d(f.values(P, z));
                })
                  .select("path")
                  .attr("d", function (P, z) {
                    return f.pathGenerator
                      .width(f.values(P, z).width)
                      .height(f.values(P, z).height)([P]);
                  })
                  .attr("fill", function (P, z) {
                    return C(V(S(P, z)));
                  }),
                f.decorate()(E, m, g);
            });
          };
        return k(p, f), p;
      },
      Zk = function () {
        var f = dx(),
          c = function (p) {
            var b = p.filter(f.defined()),
              w = f.colorInterpolate(),
              m = f.colorScale(b),
              g = f.pathGenerator.context();
            b.forEach(function (v, _) {
              g.save(), g.beginPath();
              var S = f.values(v, _);
              g.translate(S.x, S.y),
                (g.fillStyle = w(m(S.colorValue))),
                (g.strokeStyle = "transparent"),
                f.decorate()(g, v, _),
                f.pathGenerator.height(S.height).width(S.width)([v]),
                g.fill(),
                g.stroke(),
                g.closePath(),
                g.restore();
            });
          };
        return A(c, f.pathGenerator, "context"), k(c, f), c;
      },
      Dn = function (f) {
        return typeof f == "function"
          ? f
          : function () {
              return f;
            };
      },
      Jk = function () {
        var f = r.scaleIdentity(),
          c = r.scaleIdentity(),
          d = "horizontal",
          p = function (S) {
            return S.from;
          },
          b = function (S) {
            return S.to;
          },
          w = function () {},
          m = ze("g", "annotation-band"),
          g = xo().horizontalAlign("center").verticalAlign("center").x(0).y(0),
          v = function (S) {
            if (
              (at(S) && m.transition(S), d !== "horizontal" && d !== "vertical")
            )
              throw new Error("Invalid orientation");
            var C = d === "horizontal",
              V = C
                ? function (Q, oe) {
                    return "translate(".concat(Q, ", ").concat(oe, ")");
                  }
                : function (Q, oe) {
                    return "translate(".concat(oe, ", ").concat(Q, ")");
                  },
              E = C ? f : c,
              P = C ? c : f,
              z = E.range(),
              O = z[1] - z[0],
              Y = C ? "height" : "width",
              q = C ? "width" : "height",
              W = function () {
                return V(
                  (z[1] + z[0]) / 2,
                  (P(b.apply(void 0, arguments)) +
                    P(p.apply(void 0, arguments))) /
                    2,
                );
              };
            g[q](O),
              g[Y](function () {
                return (
                  P(b.apply(void 0, arguments)) - P(p.apply(void 0, arguments))
                );
              }),
              S.each(function (Q, oe, pe) {
                var ge = m(u.select(pe[oe]), Q);
                ge
                  .enter()
                  .attr("transform", W)
                  .append("path")
                  .classed("band", !0),
                  ge
                    .attr("class", "annotation-band ".concat(d))
                    .attr("transform", W)
                    .select("path")
                    .attr("d", function (he, Ce) {
                      return g([he], Ce);
                    }),
                  w(ge, Q, oe);
              });
          };
        return (
          (v.xScale = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : f;
          }),
          (v.yScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : c;
          }),
          (v.orient = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : d;
          }),
          (v.decorate = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : w;
          }),
          (v.fromValue = function () {
            return arguments.length
              ? ((p = Dn(arguments.length <= 0 ? void 0 : arguments[0])), v)
              : p;
          }),
          (v.toValue = function () {
            return arguments.length
              ? ((b = Dn(arguments.length <= 0 ? void 0 : arguments[0])), v)
              : b;
          }),
          v
        );
      },
      eC = function () {
        var f = r.scaleIdentity(),
          c = r.scaleIdentity(),
          d = "horizontal",
          p = function (_) {
            return _.from;
          },
          b = function (_) {
            return _.to;
          },
          w = function () {},
          m = xo().horizontalAlign("right").verticalAlign("top"),
          g = function (_) {
            if (d !== "horizontal" && d !== "vertical")
              throw new Error("Invalid orientation");
            var S = m.context(),
              C = d === "horizontal",
              V = C ? f : c,
              E = C ? c : f,
              P = V.range(),
              z = P[1] - P[0],
              O = C ? "x" : "y",
              Y = C ? "y" : "x",
              q = C ? "height" : "width",
              W = C ? "width" : "height";
            _.forEach(function (Q, oe) {
              S.save(),
                S.beginPath(),
                (S.strokeStyle = "transparent"),
                m[Y](E(p(Q))),
                m[O](P[0]),
                m[W](z),
                m[q](E(b(Q)) - E(p(Q))),
                w(S, Q, oe),
                m.context(S)([Q], oe),
                S.fill(),
                S.stroke(),
                S.closePath(),
                S.restore();
            });
          };
        return (
          (g.xScale = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : f;
          }),
          (g.yScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : c;
          }),
          (g.orient = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : d;
          }),
          (g.decorate = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : w;
          }),
          (g.fromValue = function () {
            return arguments.length
              ? ((p = Dn(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : p;
          }),
          (g.toValue = function () {
            return arguments.length
              ? ((b = Dn(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : b;
          }),
          A(g, m, "context"),
          g
        );
      },
      ld = function () {
        var f = r.scaleIdentity(),
          c = r.scaleIdentity(),
          d = function (_) {
            return _;
          },
          p = d,
          b = function () {},
          w = "horizontal",
          m = ze("g", "annotation-line"),
          g = function (_) {
            if (
              (at(_) && m.transition(_), w !== "horizontal" && w !== "vertical")
            )
              throw new Error("Invalid orientation");
            var S = w === "horizontal",
              C = S
                ? function (he, Ce) {
                    return "translate(".concat(he, ", ").concat(Ce, ")");
                  }
                : function (he, Ce) {
                    return "translate(".concat(Ce, ", ").concat(he, ")");
                  },
              V = S ? "x2" : "y2",
              E = S ? f : c,
              P = S ? c : f,
              z = S ? "left-handle" : "bottom-handle",
              O = S ? "right-handle" : "top-handle",
              Y = S ? "9" : "0",
              q = S ? "0" : "9",
              W = S ? "0.32em" : "0.71em",
              Q = S ? "start" : "middle",
              oe = E.range(),
              pe = function () {
                return C(oe[0], P(d.apply(void 0, arguments)));
              },
              ge = oe[1] - oe[0];
            _.each(function (he, Ce, xt) {
              var Kt = m(u.select(xt[Ce]), he),
                Dr = Kt.enter().attr("transform", pe).style("stroke", "#bbb");
              Dr.append("line").attr(V, ge),
                Dr.append("g").classed(z, !0).style("stroke", "none"),
                Dr.append("g")
                  .classed(O, !0)
                  .style("stroke", "none")
                  .attr("transform", C(ge, 0))
                  .append("text")
                  .attr("text-anchor", Q)
                  .attr("x", Y)
                  .attr("y", q)
                  .attr("dy", W),
                Kt.attr("class", "annotation-line ".concat(w)),
                Kt.attr("transform", pe),
                Kt.select("line").attr(V, ge),
                Kt.select("g." + O).attr("transform", C(ge, 0)),
                Kt.select("text").text(p),
                b(Kt, he, Ce);
            });
          };
        return (
          (g.xScale = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : f;
          }),
          (g.yScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : c;
          }),
          (g.value = function () {
            return arguments.length
              ? ((d = Dn(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : d;
          }),
          (g.label = function () {
            return arguments.length
              ? ((p = Dn(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : p;
          }),
          (g.decorate = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : b;
          }),
          (g.orient = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : w;
          }),
          g
        );
      };
    function tC() {
      var f = function (z) {
          return z.x;
        },
        c = function (z) {
          return z.y;
        },
        d = r.scaleIdentity(),
        p = r.scaleIdentity(),
        b = function () {},
        w = ze("g", "annotation-crosshair"),
        m = ox(),
        g = ld(),
        v = ld().orient("vertical"),
        _ = r.scaleIdentity(),
        S = r.scaleIdentity(),
        C = ud()
          .series([g, v, m])
          .xScale(_)
          .yScale(S)
          .mapping(function (P) {
            return [P];
          }),
        V = function (z) {
          at(z) && w.transition(z),
            z.each(function (O, Y, q) {
              var W = w(u.select(q[Y]), O);
              W.enter().style("pointer-events", "none"),
                _.range(d.range()),
                S.range(p.range()),
                m.crossValue(f).mainValue(c),
                g.value(c),
                v.value(f),
                W.call(C),
                b(W, O, Y);
            });
        };
      (V.x = function () {
        return arguments.length
          ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), V)
          : f;
      }),
        (V.y = function () {
          return arguments.length
            ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), V)
            : c;
        }),
        (V.xScale = function () {
          return arguments.length
            ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), V)
            : d;
        }),
        (V.yScale = function () {
          return arguments.length
            ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), V)
            : p;
        }),
        (V.decorate = function () {
          return arguments.length
            ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), V)
            : b;
        });
      var E = F("label");
      return k(V, g, E, L("y")), k(V, v, E, L("x")), V;
    }
    var cd = function () {
        var f = r.scaleIdentity(),
          c = r.scaleIdentity(),
          d = function (_) {
            return _;
          },
          p = d,
          b = function () {},
          w = "horizontal",
          m = l.line(),
          g = function (_) {
            if (w !== "horizontal" && w !== "vertical")
              throw new Error("Invalid orientation");
            var S = w === "horizontal",
              C = m.context(),
              V = S ? f : c,
              E = S ? c : f,
              P = V.domain(),
              z = S ? 9 : 0,
              O = S ? 0 : 9,
              Y = S ? "left" : "center",
              q = S ? "middle" : "hanging";
            _.forEach(function (W, Q) {
              C.save(),
                C.beginPath(),
                (C.strokeStyle = "#bbb"),
                (C.fillStyle = "#000"),
                (C.textAlign = Y),
                (C.textBaseline = q),
                b(C, W, Q),
                m.context(C)(
                  P.map(function (ge) {
                    var he = [V(ge), E(d(W))];
                    return S ? he : he.reverse();
                  }),
                );
              var oe = S ? V(P[1]) : E(d(W)),
                pe = S ? E(d(W)) : V(P[1]);
              C.fillText(p(W), oe + z, pe + O),
                C.fill(),
                C.stroke(),
                C.closePath(),
                C.restore();
            });
          };
        return (
          (g.xScale = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : f;
          }),
          (g.yScale = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : c;
          }),
          (g.value = function () {
            return arguments.length
              ? ((d = Dn(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : d;
          }),
          (g.label = function () {
            return arguments.length
              ? ((p = Dn(arguments.length <= 0 ? void 0 : arguments[0])), g)
              : p;
          }),
          (g.decorate = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : b;
          }),
          (g.orient = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), g)
              : w;
          }),
          A(g, m, "context"),
          g
        );
      },
      rC = function () {
        var f = function (E) {
            return E.x;
          },
          c = function (E) {
            return E.y;
          },
          d = r.scaleIdentity(),
          p = r.scaleIdentity(),
          b = ix(),
          w = cd(),
          m = cd().orient("vertical"),
          g = r.scaleIdentity(),
          v = r.scaleIdentity(),
          _ = fd()
            .series([w, m, b])
            .xScale(g)
            .yScale(v)
            .mapping(function (V) {
              return [V];
            }),
          S = function (E) {
            E.forEach(function (P) {
              g.range(d.range()),
                v.range(p.range()),
                b.crossValue(f).mainValue(c),
                w.value(c),
                m.value(f),
                _(P);
            });
          };
        (S.x = function () {
          return arguments.length
            ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), S)
            : f;
        }),
          (S.y = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), S)
              : c;
          }),
          (S.xScale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), S)
              : d;
          }),
          (S.yScale = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), S)
              : p;
          });
        var C = F("label", "decorate");
        return (
          k(S, w, C, L("y")),
          k(S, m, C, L("x")),
          A(S, b, "decorate"),
          A(S, _, "context"),
          S
        );
      },
      Af = function () {
        var f = r.scaleIdentity(),
          c = [10],
          d = null,
          p = function () {
            var w;
            return d ?? (f.ticks ? (w = f).ticks.apply(w, be(c)) : f.domain());
          };
        return (
          (p.scale = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : f;
          }),
          (p.ticks = function () {
            for (var b = arguments.length, w = new Array(b), m = 0; m < b; m++)
              w[m] = arguments[m];
            return (c = w), p;
          }),
          (p.tickArguments = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : c;
          }),
          (p.tickValues = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), p)
              : d;
          }),
          p
        );
      },
      mx = function (c) {
        return c;
      },
      nC = function () {
        var f = function () {},
          c = function () {},
          d = Af(),
          p = Af(),
          b = ze("line", "gridline-y").key(mx),
          w = ze("line", "gridline-x").key(mx),
          m = function (v) {
            at(v) && (b.transition(v), w.transition(v)),
              v.each(function (_, S, C) {
                var V = C[S],
                  E = u.select(C[S]),
                  P = d.scale(),
                  z = p.scale(),
                  O = V.__x_scale__ || P;
                V.__x_scale__ = P.copy();
                var Y = d(),
                  q = b(E, Y);
                q
                  .enter()
                  .attr("x1", O)
                  .attr("x2", O)
                  .attr("y1", z.range()[0])
                  .attr("y2", z.range()[1])
                  .attr("stroke", "#bbb"),
                  q
                    .attr("x1", P)
                    .attr("x2", P)
                    .attr("y1", z.range()[0])
                    .attr("y2", z.range()[1]),
                  q.exit().attr("x1", P).attr("x2", P),
                  f(q, Y, S);
                var W = V.__y_scale__ || z;
                V.__y_scale__ = z.copy();
                var Q = p(),
                  oe = w(E, Q);
                oe
                  .enter()
                  .attr("y1", W)
                  .attr("y2", W)
                  .attr("x1", P.range()[0])
                  .attr("x2", P.range()[1])
                  .attr("stroke", "#bbb"),
                  oe
                    .attr("y1", z)
                    .attr("y2", z)
                    .attr("x1", P.range()[0])
                    .attr("x2", P.range()[1]),
                  oe.exit().attr("y1", z).attr("y2", z),
                  c(oe, Q, S);
              });
          };
        return (
          (m.yDecorate = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          (m.xDecorate = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : f;
          }),
          k(m, b, R({ key: "xKey" })),
          k(m, w, R({ key: "yKey" })),
          k(m, d, L("x")),
          k(m, p, L("y")),
          m
        );
      },
      aC = function () {
        var f = function () {},
          c = function () {},
          d = Af(),
          p = Af(),
          b = l.line(),
          w = function () {
            var g = b.context(),
              v = d.scale(),
              _ = p.scale();
            d().forEach(function (S, C) {
              g.save(),
                g.beginPath(),
                (g.strokeStyle = "#bbb"),
                (g.fillStyle = "transparent"),
                f(g, S, C),
                b.context(g)(
                  _.domain().map(function (V) {
                    return [v(S), _(V)];
                  }),
                ),
                g.fill(),
                g.stroke(),
                g.closePath(),
                g.restore();
            }),
              p().forEach(function (S, C) {
                g.save(),
                  g.beginPath(),
                  (g.strokeStyle = "#bbb"),
                  (g.fillStyle = "transparent"),
                  c(g, S, C),
                  b.context(g)(
                    v.domain().map(function (V) {
                      return [v(V), _(S)];
                    }),
                  ),
                  g.fill(),
                  g.stroke(),
                  g.closePath(),
                  g.restore();
              });
          };
        return (
          (w.yDecorate = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : c;
          }),
          (w.xDecorate = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : f;
          }),
          k(w, d, L("x")),
          k(w, p, L("y")),
          A(w, b, "context"),
          w
        );
      },
      oC = function (c) {
        return c;
      },
      hx = function (c, d, p, b) {
        return c[d] ? c[d].apply(c, p) : b;
      },
      px = function (c) {
        var d;
        return (d = c.tickValues()) !== null && d !== void 0
          ? d
          : hx(c.scale(), "ticks", c.tickArguments(), c.scale().domain());
      },
      gx = function (c) {
        var d;
        return (d = c.tickFormat()) !== null && d !== void 0
          ? d
          : hx(c.scale(), "tickFormat", c.tickArguments(), oC);
      },
      iC = function (c) {
        return c;
      },
      vx = function (c, d) {
        var p =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
          b = [10],
          w = null,
          m = function () {},
          g = null,
          v = 6,
          _ = 6,
          S = 3,
          C = l.line(),
          V = ze("g", "tick").key(iC),
          E = ze("path", "domain"),
          P = function () {
            return { offset: [0, _ + S] };
          },
          z = function () {
            return {
              path: [
                [0, 0],
                [0, _],
              ],
            };
          },
          O = p.labelOffset || P,
          Y = p.tickPath || z,
          q = function (he, Ce) {
            var xt = 0;
            return (
              he.bandwidth &&
                ((xt = he.bandwidth() / 2),
                he.round() && (xt = Math.round(xt))),
              function (Kt) {
                return Ce(he(Kt) + xt, 0);
              }
            );
          },
          W = function (he, Ce) {
            return oe()
              ? "translate(".concat(Ce, ", ").concat(he, ")")
              : "translate(".concat(he, ", ").concat(Ce, ")");
          },
          Q = function (he) {
            return oe()
              ? he.map(function (Ce) {
                  return [Ce[1], Ce[0]];
                })
              : he;
          },
          oe = function () {
            return c === "left" || c === "right";
          },
          pe = function ge(he) {
            at(he) && (V.transition(he), E.transition(he)),
              he.each(function (Ce, xt, Kt) {
                var Dr = Kt[xt],
                  Fi = u.select(Dr);
                Dr.__scale__ ||
                  Fi.attr("fill", "none")
                    .attr("font-size", 10)
                    .attr("font-family", "sans-serif")
                    .attr(
                      "text-anchor",
                      c === "right" ? "start" : c === "left" ? "end" : "middle",
                    );
                var xd = Dr.__scale__ || d;
                Dr.__scale__ = d.copy();
                var xa = px(ge),
                  Te = gx(ge),
                  bo = c === "bottom" || c === "right" ? 1 : -1,
                  Mt = function (Pe) {
                    var Ke = ce(Pe, 2),
                      yt = Ke[0],
                      nr = Ke[1];
                    return [yt, bo * nr];
                  },
                  Er = d.range(),
                  En = Q([
                    [Er[0], bo * v],
                    [Er[0], 0],
                    [Er[1], 0],
                    [Er[1], bo * v],
                  ]),
                  lt = E(Fi, [Ce]);
                lt.enter().attr("stroke", "#000"), lt.attr("d", C(En));
                var Ir = V(Fi, xa),
                  Hi = xa.map(function (Se, Pe) {
                    return O(Se, Pe, xa);
                  }),
                  bt = xa.map(function (Se, Pe) {
                    return Y(Se, Pe, xa);
                  });
                Ir.enter()
                  .attr("transform", q(xd, W))
                  .append("path")
                  .attr("stroke", "#000"),
                  Ir.enter()
                    .append("text")
                    .attr("transform", function (Se, Pe) {
                      return W.apply(void 0, be(Mt(Hi[Pe].offset)));
                    })
                    .attr("fill", "#000"),
                  Ir.exit().attr("transform", q(d, W)),
                  Ir.select("path")
                    .attr("visibility", function (Se, Pe) {
                      return bt[Pe].hidden && "hidden";
                    })
                    .attr("d", function (Se, Pe) {
                      return C(Q(bt[Pe].path.map(Mt)));
                    }),
                  Ir.select("text")
                    .attr("visibility", function (Se, Pe) {
                      return Hi[Pe].hidden && "hidden";
                    })
                    .attr("transform", function (Se, Pe) {
                      return W.apply(void 0, be(Mt(Hi[Pe].offset)));
                    })
                    .attr("dy", function () {
                      var Se = "0em";
                      return (
                        oe()
                          ? (Se = "0.32em")
                          : c === "bottom" && (Se = "0.71em"),
                        Se
                      );
                    })
                    .text(Te),
                  Ir.attr("transform", q(d, W)),
                  m(Ir, Ce, xt);
              });
          };
        return (
          (pe.tickFormat = function () {
            return arguments.length
              ? ((g = arguments.length <= 0 ? void 0 : arguments[0]), pe)
              : g;
          }),
          (pe.tickSize = function () {
            return arguments.length
              ? ((_ = v =
                  Number(arguments.length <= 0 ? void 0 : arguments[0])),
                pe)
              : _;
          }),
          (pe.tickSizeInner = function () {
            return arguments.length
              ? ((_ = Number(arguments.length <= 0 ? void 0 : arguments[0])),
                pe)
              : _;
          }),
          (pe.tickSizeOuter = function () {
            return arguments.length
              ? ((v = Number(arguments.length <= 0 ? void 0 : arguments[0])),
                pe)
              : v;
          }),
          (pe.tickPadding = function () {
            return arguments.length
              ? ((S = arguments.length <= 0 ? void 0 : arguments[0]), pe)
              : S;
          }),
          (pe.decorate = function () {
            return arguments.length
              ? ((m = arguments.length <= 0 ? void 0 : arguments[0]), pe)
              : m;
          }),
          (pe.scale = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), pe)
              : d;
          }),
          (pe.ticks = function () {
            for (
              var ge = arguments.length, he = new Array(ge), Ce = 0;
              Ce < ge;
              Ce++
            )
              he[Ce] = arguments[Ce];
            return (b = [].concat(he)), pe;
          }),
          (pe.tickArguments = function () {
            return arguments.length
              ? ((b =
                  (arguments.length <= 0 ? void 0 : arguments[0]) == null
                    ? []
                    : be(arguments.length <= 0 ? void 0 : arguments[0])),
                pe)
              : b !== null
              ? b.slice()
              : null;
          }),
          (pe.tickValues = function () {
            return arguments.length
              ? ((w =
                  (arguments.length <= 0 ? void 0 : arguments[0]) == null
                    ? []
                    : be(arguments.length <= 0 ? void 0 : arguments[0])),
                pe)
              : w !== null
              ? w.slice()
              : null;
          }),
          (pe.orient = function () {
            return c;
          }),
          pe
        );
      },
      kf = function (c, d) {
        var p = !1,
          b = function (v, _, S) {
            var C = 0,
              V = w.tickSizeInner() + w.tickPadding(),
              E = !1;
            if (p) {
              var P = d(v),
                z = _ < S.length - 1 ? d(S[_ + 1]) : d.range()[1];
              (C = (z - P) / 2),
                (V = w.tickPadding()),
                (E = _ === S.length - 1 && P === z);
            }
            return { offset: [C, V], hidden: E };
          },
          w = vx(c, d, { labelOffset: b }),
          m = function (v) {
            return w(v);
          };
        return (
          (m.tickCenterLabel = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : p;
          }),
          k(m, w),
          m
        );
      },
      xx = function (c) {
        return kf("top", c);
      },
      bx = function (c) {
        return kf("bottom", c);
      },
      yx = function (c) {
        return kf("left", c);
      },
      wx = function (c) {
        return kf("right", c);
      },
      Cf = function (c, d) {
        var p = null,
          b = function (S, C, V) {
            if (d.step) return d.step();
            var E = d(S);
            return C < V.length - 1 ? d(V[C + 1]) / E : (d.range()[1] - E) * 2;
          },
          w = function (S, C, V) {
            var E = 0;
            return (
              p ? (E = p(S, C)) : (E = b(S, C, V) / 2),
              {
                path: [
                  [E, 0],
                  [E, g.tickSizeInner()],
                ],
                hidden: C === V.length - 1,
              }
            );
          },
          m = function () {
            return { offset: [0, g.tickPadding()] };
          },
          g = vx(c, d, { labelOffset: m, tickPath: w }),
          v = function (S) {
            g(S);
          };
        return (
          (v.tickOffset = function () {
            return arguments.length
              ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : p;
          }),
          k(v, g),
          v
        );
      },
      uC = function (c) {
        return Cf("top", c);
      },
      fC = function (c) {
        return Cf("bottom", c);
      },
      lC = function (c) {
        return Cf("left", c);
      },
      cC = function (c) {
        return Cf("right", c);
      },
      _x = function (f) {
        var c = function (p) {
          var b = px(f),
            w = gx(f),
            m = b.map(w),
            g = p.append("text"),
            v = m.map(function (C) {
              return g.text(C).node().getBBox();
            }),
            _ = Math.max.apply(
              Math,
              be(
                v.map(function (C) {
                  return C.height;
                }),
              ),
            ),
            S = Math.max.apply(
              Math,
              be(
                v.map(function (C) {
                  return C.width;
                }),
              ),
            );
          return (
            g.remove(), { maxHeight: _, maxWidth: S, labelCount: m.length }
          );
        };
        return c;
      },
      sC = function (f) {
        var c = "auto",
          d = function () {},
          p = function () {
            return f.orient() === "left" || f.orient() === "right";
          },
          b = function () {
            return f.orient() === "top" || f.orient() === "left" ? -1 : 1;
          },
          w = function () {
            switch (f.orient()) {
              case "top":
              case "right":
                return "start";
              default:
                return "end";
            }
          },
          m = function (S) {
            var C = _x(f)(S),
              V = C.maxHeight,
              E = C.maxWidth,
              P = C.labelCount,
              z = P * E,
              O;
            if (c === "auto") {
              var Y = f.scale().range()[1];
              O = Y < z ? 90 * Math.min(1, (z / Y - 0.8) / 2) : 0;
            } else O = c;
            return {
              rotate: p() ? Math.floor(b() * (90 - O)) : Math.floor(-O),
              maxHeight: V,
              maxWidth: E,
              anchor: O ? w() : "middle",
            };
          },
          g = function (S) {
            var C = m(S),
              V = C.rotate,
              E = C.maxHeight,
              P = C.anchor,
              z = S.select("text"),
              O = z.attr("transform"),
              Y = b() * Math.floor(E / 2),
              q = p()
                ? "translate(".concat(Y, ", 0)")
                : "translate(0, ".concat(Y, ")");
            z.style("text-anchor", P).attr(
              "transform",
              "".concat(O, " ").concat(q, " rotate(").concat(V, " 0 0)"),
            );
          },
          v = function (S) {
            f(S);
          };
        return (
          f.decorate(function (_) {
            g(_), d(_);
          }),
          (v.decorate = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : d;
          }),
          (v.labelRotate = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), v)
              : c;
          }),
          k(v, f, B("decorate")),
          v
        );
      },
      dC = function (f) {
        var c = "auto",
          d = function () {},
          p = function () {
            return f.orient() === "left" || f.orient() === "right";
          },
          b = function () {
            return f.orient() === "top" || f.orient() === "left" ? -1 : 1;
          },
          w = function (v) {
            var _ = _x(f)(v),
              S = _.maxHeight,
              C = _.maxWidth,
              V = _.labelCount,
              E = f.scale().range()[1],
              P = c === "auto" ? Math.floor(((p() ? S : C) * V) / E) + 1 : c,
              z = v.select("text"),
              O = z.attr("transform"),
              Y = function (W) {
                return p()
                  ? "translate(".concat((W % P) * C * b(), ", 0)")
                  : "translate(0, ".concat((W % P) * S * b(), ")");
              };
            z.attr("transform", function (q, W) {
              return "".concat(O, " ").concat(Y(W));
            });
          },
          m = function (v) {
            return f(v);
          };
        return (
          f.decorate(function (g) {
            w(g), d(g);
          }),
          (m.decorate = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : d;
          }),
          (m.labelOffsetDepth = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), m)
              : c;
          }),
          k(m, f, B("decorate")),
          m
        );
      },
      sd = "__d3fc-elements__",
      Li = function (c) {
        return c[sd] || {};
      },
      Sx = function (c, d) {
        return void (c[sd] = d);
      },
      mC = function (c) {
        return delete c[sd];
      },
      hC = function (c) {
        return c.tagName === "D3FC-GROUP"
          ? [c].concat(
              be(c.querySelectorAll("d3fc-canvas, d3fc-group, d3fc-svg")),
            )
          : [c];
      },
      pC = function (c) {
        var d = Li(c),
          p = d.width,
          b = d.height,
          w =
            c.useDevicePixelRatio && window.devicePixelRatio != null
              ? window.devicePixelRatio
              : 1,
          m = c.clientWidth * w,
          g = c.clientHeight * w,
          v = m !== p || g !== b,
          _ = c.children[0];
        Sx(c, { pixelRatio: w, width: m, height: g, resized: v, child: _ });
      };
    if (typeof CustomEvent != "function")
      throw new Error(
        "d3fc-element depends on CustomEvent. Make sure that you load a polyfill in older browsers. See README.",
      );
    var gC = function (c) {
        var d = Li(c),
          p = new CustomEvent("measure", { detail: d });
        c.dispatchEvent(p);
      },
      vC = function (c) {
        var d = Li(c),
          p = new CustomEvent("draw", { detail: d });
        c.dispatchEvent(p);
      },
      xC = function (f) {
        var c = f.map(hC).reduce(function (d, p) {
          return d.concat(p);
        });
        c.forEach(pC), c.forEach(gC), c.forEach(vC);
      },
      Mx = function (c) {
        return Li(c.ownerDocument).queue || [];
      },
      bC = function (c, d) {
        var p = Li(c.ownerDocument),
          b = p.requestId;
        b == null &&
          (b = requestAnimationFrame(function () {
            var w = Mx(c);
            xC(w), yC(c);
          })),
          Sx(c.ownerDocument, { queue: d, requestId: b });
      },
      yC = function (c) {
        return mC(c.ownerDocument);
      },
      Ax = function (c, d) {
        var p = c;
        do if (p.parentNode === d) return !0;
        while ((p = p.parentNode));
        return !1;
      },
      dd = function (f) {
        var c = Mx(f),
          d = c.indexOf(f) > -1;
        if (!d) {
          var p = c.some(function (w) {
            return Ax(f, w);
          });
          if (!p) {
            var b = c.filter(function (w) {
              return !Ax(w, f);
            });
            b.push(f), bC(f, b);
          }
        }
      };
    if (typeof HTMLElement != "function")
      throw new Error(
        "d3fc-element depends on Custom Elements (v1). Make sure that you load a polyfill in older browsers. See README.",
      );
    var wC = function (c) {
        c.__measureListener__ == null &&
          ((c.__measureListener__ = function (d) {
            return c.setMeasurements(d.detail);
          }),
          c.addEventListener("measure", c.__measureListener__));
      },
      _C = function (c) {
        c.__measureListener__ != null &&
          (c.removeEventListener("measure", c.__measureListener__),
          (c.__measureListener__ = null));
      },
      kx = function (f, c) {
        return (function (d) {
          Z(b, d);
          var p = Ue(b);
          function b() {
            return j(this, b), p.apply(this, arguments);
          }
          return (
            K(
              b,
              [
                {
                  key: "attributeChangedCallback",
                  value: function (m) {
                    switch (m) {
                      case "use-device-pixel-ratio":
                        this.requestRedraw();
                        break;
                    }
                  },
                },
                {
                  key: "connectedCallback",
                  value: function () {
                    this.childNodes.length === 0 && this.appendChild(f()),
                      wC(this);
                  },
                },
                {
                  key: "disconnectedCallback",
                  value: function () {
                    _C(this);
                  },
                },
                {
                  key: "setMeasurements",
                  value: function (m) {
                    var g = m.width,
                      v = m.height,
                      _ = _e(this.childNodes),
                      S = _[0],
                      C = _.slice(1);
                    if (C.length > 0)
                      throw new Error(
                        "A d3fc-svg/canvas element must only contain a single svg/canvas element.",
                      );
                    c(this, S, { width: g, height: v });
                  },
                },
                {
                  key: "requestRedraw",
                  value: function () {
                    dd(this);
                  },
                },
                {
                  key: "useDevicePixelRatio",
                  get: function () {
                    return (
                      this.hasAttribute("use-device-pixel-ratio") &&
                      this.getAttribute("use-device-pixel-ratio") !== "false"
                    );
                  },
                  set: function (m) {
                    m && !this.useDevicePixelRatio
                      ? this.setAttribute("use-device-pixel-ratio", "")
                      : !m &&
                        this.useDevicePixelRatio &&
                        this.removeAttribute("use-device-pixel-ratio"),
                      this.requestRedraw();
                  },
                },
              ],
              [
                {
                  key: "observedAttributes",
                  get: function () {
                    return ["use-device-pixel-ratio"];
                  },
                },
              ],
            ),
            b
          );
        })(Me(HTMLElement));
      },
      SC = (function (f) {
        Z(d, f);
        var c = Ue(d);
        function d() {
          return j(this, d), c.apply(this, arguments);
        }
        return (
          K(d, [
            {
              key: "setWebglViewport",
              get: function () {
                return (
                  this.hasAttribute("set-webgl-viewport") &&
                  this.getAttribute("set-webgl-viewport") !== "false"
                );
              },
              set: function (b) {
                b && !this.setWebglViewport
                  ? this.setAttribute("set-webgl-viewport", "")
                  : !b &&
                    this.setWebglViewport &&
                    this.removeAttribute("set-webgl-viewport"),
                  this.requestRedraw();
              },
            },
          ]),
          d
        );
      })(
        kx(
          function () {
            return document.createElement("canvas");
          },
          function (f, c, d) {
            var p = d.width,
              b = d.height;
            if (
              (c.setAttribute("width", p),
              c.setAttribute("height", b),
              f.setWebglViewport)
            ) {
              var w = c.getContext("webgl");
              w.viewport(0, 0, p, b);
            }
          },
        ),
      ),
      md = function (c) {
        c.autoResize ? MC(c) : Cx(c);
      },
      MC = function (c) {
        c.__autoResizeListener__ == null &&
          ((c.__autoResizeListener__ = function () {
            return dd(c);
          }),
          addEventListener("resize", c.__autoResizeListener__));
      },
      Cx = function (c) {
        c.__autoResizeListener__ != null &&
          (removeEventListener("resize", c.__autoResizeListener__),
          (c.__autoResizeListener__ = null));
      },
      AC = (function (f) {
        Z(d, f);
        var c = Ue(d);
        function d() {
          return j(this, d), c.apply(this, arguments);
        }
        return (
          K(
            d,
            [
              {
                key: "connectedCallback",
                value: function () {
                  md(this);
                },
              },
              {
                key: "disconnectedCallback",
                value: function () {
                  Cx(this);
                },
              },
              {
                key: "requestRedraw",
                value: function () {
                  dd(this);
                },
              },
              {
                key: "attributeChangedCallback",
                value: function (b) {
                  switch (b) {
                    case "auto-resize":
                      md(this);
                      break;
                  }
                },
              },
              {
                key: "autoResize",
                get: function () {
                  return (
                    this.hasAttribute("auto-resize") &&
                    this.getAttribute("auto-resize") !== "false"
                  );
                },
                set: function (b) {
                  b && !this.autoResize
                    ? this.setAttribute("auto-resize", "")
                    : !b &&
                      this.autoResize &&
                      this.removeAttribute("auto-resize"),
                    md(this);
                },
              },
            ],
            [
              {
                key: "observedAttributes",
                get: function () {
                  return ["auto-resize"];
                },
              },
            ],
          ),
          d
        );
      })(Me(HTMLElement)),
      kC = kx(
        function () {
          return document.createElementNS("http://www.w3.org/2000/svg", "svg");
        },
        function (f, c, d) {
          var p = d.width,
            b = d.height;
          c.setAttribute("viewBox", "0 0 ".concat(p, " ").concat(b));
        },
      ),
      Tx =
        "d3fc-canvas,d3fc-svg{position:relative;display:block}d3fc-canvas>canvas,d3fc-svg>svg{position:absolute;height:100%;width:100%}d3fc-svg>svg{overflow:visible}",
      Oi = document.createElement("style");
    if (
      (Oi.setAttribute("type", "text/css"),
      document.querySelector("head").appendChild(Oi),
      Oi.styleSheet ? (Oi.styleSheet.cssText += Tx) : (Oi.textContent += Tx),
      (typeof customElements > "u" ? "undefined" : ee(customElements)) !==
        "object" || typeof customElements.define != "function")
    )
      throw new Error(
        "d3fc-element depends on Custom Elements (v1). Make sure that you load a polyfill in older browsers. See README.",
      );
    var hd = [],
      pd = function (c, d) {
        customElements.get(c) ? hd.push(c) : customElements.define(c, d);
      };
    pd("d3fc-canvas", SC),
      pd("d3fc-group", AC),
      pd("d3fc-svg", kC),
      hd.length > 0 &&
        console.warn(
          'The d3fc components "'.concat(
            hd.join(", "),
            '" is/are already registered on window. Be aware that this can create compatibility issues if different versions are used.',
          ),
        );
    var CC = function () {
        var f = h.dispatch("point");
        function c(b) {
          var w = u.pointer(b);
          f.call("point", this, [{ x: w[0], y: w[1] }]);
        }
        function d() {
          f.call("point", this, []);
        }
        var p = function (w) {
          w.on("mouseenter.pointer", c)
            .on("mousemove.pointer", c)
            .on("mouseleave.pointer", d);
        };
        return A(p, f, "on"), p;
      },
      TC = function () {
        var f = "",
          c = "vertical",
          d = function (g, v) {
            return Number(g[v]);
          },
          p = function (g) {
            return Object.keys(g[0])
              .filter(function (v) {
                return v !== f;
              })
              .map(function (v) {
                var _ = g
                  .filter(function (S) {
                    return S[v];
                  })
                  .map(function (S) {
                    var C = [S[f], d(S, v)];
                    return (C.data = S), C;
                  });
                return (_.key = v), _;
              });
          },
          b = function (g) {
            return g.map(function (v) {
              var _ = Object.keys(v)
                .filter(function (S) {
                  return S !== f;
                })
                .map(function (S) {
                  var C = [S, d(v, S)];
                  return (C.data = v), C;
                });
              return (_.key = v[f]), _;
            });
          },
          w = function (g) {
            return c === "vertical" ? p(g) : b(g);
          };
        return (
          (w.key = function () {
            return arguments.length
              ? ((f = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : f;
          }),
          (w.value = function () {
            return arguments.length
              ? ((d = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : d;
          }),
          (w.orient = function () {
            return arguments.length
              ? ((c = arguments.length <= 0 ? void 0 : arguments[0]), w)
              : c;
          }),
          w
        );
      },
      Vx = function () {
        for (
          var f = {},
            c = function (_) {
              for (var S = 0, C = Object.keys(f); S < C.length; S++) {
                var V = C[S];
                _[V].apply(null, f[V]);
              }
              return _;
            },
            d = arguments.length,
            p = new Array(d),
            b = 0;
          b < d;
          b++
        )
          p[b] = arguments[b];
        for (
          var w = function () {
              var _ = g[m];
              c[_] = function () {
                for (
                  var S = arguments.length, C = new Array(S), V = 0;
                  V < S;
                  V++
                )
                  C[V] = arguments[V];
                return C.length ? ((f[_] = C), c) : f[_];
              };
            },
            m = 0,
            g = p;
          m < g.length;
          m++
        )
          w();
        return c;
      },
      Nx = `d3fc-group.cartesian-chart{width:100%;height:100%;overflow:hidden;display:grid;display:-ms-grid;grid-template-columns:minmax(1em,max-content) auto 1fr auto minmax(1em,max-content);-ms-grid-columns:minmax(1em,max-content) auto 1fr auto minmax(1em,max-content);grid-template-rows:minmax(1em,max-content) auto 1fr auto minmax(1em,max-content);-ms-grid-rows:minmax(1em,max-content) auto 1fr auto minmax(1em,max-content);}
d3fc-group.cartesian-chart>.top-label{align-self:center;-ms-grid-column-align:center;justify-self:center;-ms-grid-row-align:center;grid-column:3;-ms-grid-column:3;grid-row:1;-ms-grid-row:1;}
d3fc-group.cartesian-chart>.top-axis{height:2em;grid-column:3;-ms-grid-column:3;grid-row:2;-ms-grid-row:2;}
d3fc-group.cartesian-chart>.left-label{align-self:center;-ms-grid-column-align:center;justify-self:center;-ms-grid-row-align:center;grid-column:1;-ms-grid-column:1;grid-row:3;-ms-grid-row:3;}
d3fc-group.cartesian-chart>.left-axis{width:3em;grid-column:2;-ms-grid-column:2;grid-row:3;-ms-grid-row:3;}
d3fc-group.cartesian-chart>.plot-area{overflow:hidden;grid-column:3;-ms-grid-column:3;grid-row:3;-ms-grid-row:3;}
d3fc-group.cartesian-chart>.right-axis{width:3em;grid-column:4;-ms-grid-column:4;grid-row:3;-ms-grid-row:3;}
d3fc-group.cartesian-chart>.right-label{align-self:center;-ms-grid-column-align:center;justify-self:center;-ms-grid-row-align:center;grid-column:5;-ms-grid-column:5;grid-row:3;-ms-grid-row:3;}
d3fc-group.cartesian-chart>.bottom-axis{height:2em;grid-column:3;-ms-grid-column:3;grid-row:4;-ms-grid-row:4;}
d3fc-group.cartesian-chart>.bottom-label{align-self:center;-ms-grid-column-align:center;justify-self:center;-ms-grid-row-align:center;grid-column:3;-ms-grid-column:3;grid-row:5;-ms-grid-row:5;}
d3fc-group.cartesian-chart>.y-label{display:flex;transform:rotate(-90deg);width:1em;white-space:nowrap;justify-content:center;}`,
      Bi = document.createElement("style");
    Bi.setAttribute("type", "text/css"),
      document.querySelector("head").appendChild(Bi),
      Bi.styleSheet ? (Bi.styleSheet.cssText += Nx) : (Bi.textContent += Nx);
    var $t = function (c) {
        return typeof c == "function"
          ? c
          : function () {
              return c;
            };
      },
      Dx = function () {
        var f = VC.apply(void 0, arguments),
          c = f.xScale,
          d = f.yScale,
          p = f.xAxis,
          b = f.yAxis,
          w = $t(""),
          m = $t(""),
          g = $t(""),
          v = $t(null),
          _ = $t(null),
          S = $t("right"),
          C = $t("bottom"),
          V = null,
          E = null,
          P = null,
          z = !1,
          O = !0,
          Y = Vx(
            "tickFormat",
            "ticks",
            "tickArguments",
            "tickSize",
            "tickSizeInner",
            "tickSizeOuter",
            "tickValues",
            "tickPadding",
            "tickCenterLabel",
          ),
          q = function () {},
          W = Vx(
            "tickFormat",
            "ticks",
            "tickArguments",
            "tickSize",
            "tickSizeInner",
            "tickSizeOuter",
            "tickValues",
            "tickPadding",
            "tickCenterLabel",
          ),
          Q = function () {},
          oe = function () {},
          pe = ze("d3fc-group", "cartesian-chart"),
          ge = ze("d3fc-canvas", "webgl-plot-area"),
          he = ze("d3fc-canvas", "canvas-plot-area"),
          Ce = ze("d3fc-svg", "svg-plot-area"),
          xt = ze("d3fc-svg", "x-axis").key(function (Mt) {
            return Mt;
          }),
          Kt = ze("d3fc-svg", "y-axis").key(function (Mt) {
            return Mt;
          }),
          Dr = ze("div", "chart-label"),
          Fi = ze("div", "x-label").key(function (Mt) {
            return Mt;
          }),
          xd = ze("div", "y-label").key(function (Mt) {
            return Mt;
          }),
          xa = function (Er) {
            return function (En) {
              return at(Er) ? En.transition(Er) : En;
            };
          },
          Te = function (Er) {
            var En = xa(Er);
            Er.each(function (lt, Ir, Hi) {
              var bt = pe(u.select(Hi[Ir]), [lt]);
              bt.enter().attr("auto-resize", ""),
                Dr(bt, [C(lt)])
                  .attr("class", function (Se) {
                    return Se === "top"
                      ? "chart-label bottom-label"
                      : "chart-label top-label";
                  })
                  .style("margin-bottom", function (Se) {
                    return Se === "top" ? 0 : "1em";
                  })
                  .style("margin-top", function (Se) {
                    return Se === "top" ? "1em" : 0;
                  })
                  .text(w(lt)),
                Fi(bt, [C(lt)])
                  .attr("class", function (Se) {
                    return "x-label ".concat(Se, "-label");
                  })
                  .text(m(lt)),
                xd(bt, [S(lt)])
                  .attr("class", function (Se) {
                    return "y-label ".concat(Se, "-label");
                  })
                  .text(g(lt)),
                ge(bt, V ? [lt] : [])
                  .attr("set-webgl-viewport", "")
                  .classed("plot-area", !0)
                  .attr("use-device-pixel-ratio", O)
                  .on("draw", function (Se, Pe) {
                    var Ke = Se.detail,
                      yt = Ke.child,
                      nr = Ke.pixelRatio;
                    V.context(z ? null : yt.getContext("webgl"))
                      .pixelRatio(nr)
                      .xScale(c)
                      .yScale(d),
                      V(Pe);
                  }),
                bt
                  .select(".webgl-plot-area>canvas")
                  .on("webglcontextlost", function (Se) {
                    console.warn("WebGLRenderingContext lost"),
                      Se.preventDefault(),
                      (z = !0),
                      bt.node().requestRedraw();
                  })
                  .on("webglcontextrestored", function () {
                    console.info("WebGLRenderingContext restored"),
                      (z = !1),
                      bt.node().requestRedraw();
                  }),
                he(bt, E ? [lt] : [])
                  .classed("plot-area", !0)
                  .attr("use-device-pixel-ratio", O)
                  .on("draw", function (Se, Pe) {
                    var Ke = Se.detail,
                      yt = Ke.child,
                      nr = Ke.pixelRatio,
                      In = yt.getContext("2d");
                    In.save(),
                      O && In.scale(nr, nr),
                      E.context(In).xScale(c).yScale(d),
                      E(Pe),
                      In.restore();
                  }),
                Ce(bt, P ? [lt] : [])
                  .classed("plot-area", !0)
                  .on("draw", function (Se, Pe) {
                    var Ke = Se.detail.child;
                    P.xScale(c).yScale(d), En(u.select(Ke).datum(Pe)).call(P);
                  }),
                xt(bt, [C(lt)])
                  .attr("class", function (Se) {
                    return "x-axis ".concat(Se, "-axis");
                  })
                  .style("height", v(lt))
                  .on("measure", function (Se, Pe) {
                    var Ke = Se.detail,
                      yt = Ke.width,
                      nr = Ke.height,
                      In = Ke.child;
                    Pe === "top" &&
                      u
                        .select(In)
                        .attr(
                          "viewBox",
                          "0 ".concat(-nr, " ").concat(yt, " ").concat(nr),
                        ),
                      c.range([0, yt]);
                  })
                  .on("draw", function (Se, Pe) {
                    var Ke = Se.detail.child,
                      yt = Pe === "top" ? p.top(c) : p.bottom(c);
                    yt.decorate(q), En(u.select(Ke).datum(Pe)).call(Y(yt));
                  }),
                Kt(bt, [S(lt)])
                  .attr("class", function (Se) {
                    return "y-axis ".concat(Se, "-axis");
                  })
                  .style("width", _(lt))
                  .on("measure", function (Se, Pe) {
                    var Ke = Se.detail,
                      yt = Ke.width,
                      nr = Ke.height,
                      In = Ke.child;
                    Pe === "left" &&
                      u
                        .select(In)
                        .attr(
                          "viewBox",
                          "".concat(-yt, " 0 ").concat(yt, " ").concat(nr),
                        ),
                      d.range([nr, 0]);
                  })
                  .on("draw", function (Se, Pe) {
                    var Ke = Se.detail.child,
                      yt = Pe === "left" ? b.left(d) : b.right(d);
                    yt.decorate(Q), En(u.select(Ke).datum(Pe)).call(W(yt));
                  }),
                bt.each(function (Se, Pe, Ke) {
                  return Ke[Pe].requestRedraw();
                }),
                oe(bt, lt, Ir);
            });
          },
          bo = B(/range\w*/, /tickFormat/);
        return (
          k(Te, c, bo, L("x")),
          k(Te, d, bo, L("y")),
          k(Te, Y, L("x")),
          k(Te, W, L("y")),
          (Te.xOrient = function () {
            return arguments.length
              ? ((C = $t(arguments.length <= 0 ? void 0 : arguments[0])), Te)
              : C;
          }),
          (Te.yOrient = function () {
            return arguments.length
              ? ((S = $t(arguments.length <= 0 ? void 0 : arguments[0])), Te)
              : S;
          }),
          (Te.xDecorate = function () {
            return arguments.length
              ? ((q = arguments.length <= 0 ? void 0 : arguments[0]), Te)
              : q;
          }),
          (Te.yDecorate = function () {
            return arguments.length
              ? ((Q = arguments.length <= 0 ? void 0 : arguments[0]), Te)
              : Q;
          }),
          (Te.chartLabel = function () {
            return arguments.length
              ? ((w = $t(arguments.length <= 0 ? void 0 : arguments[0])), Te)
              : w;
          }),
          (Te.xLabel = function () {
            return arguments.length
              ? ((m = $t(arguments.length <= 0 ? void 0 : arguments[0])), Te)
              : m;
          }),
          (Te.yLabel = function () {
            return arguments.length
              ? ((g = $t(arguments.length <= 0 ? void 0 : arguments[0])), Te)
              : g;
          }),
          (Te.xAxisHeight = function () {
            return arguments.length
              ? ((v = $t(arguments.length <= 0 ? void 0 : arguments[0])), Te)
              : v;
          }),
          (Te.yAxisWidth = function () {
            return arguments.length
              ? ((_ = $t(arguments.length <= 0 ? void 0 : arguments[0])), Te)
              : _;
          }),
          (Te.webglPlotArea = function () {
            return arguments.length
              ? ((V = arguments.length <= 0 ? void 0 : arguments[0]), Te)
              : V;
          }),
          (Te.canvasPlotArea = function () {
            return arguments.length
              ? ((E = arguments.length <= 0 ? void 0 : arguments[0]), Te)
              : E;
          }),
          (Te.svgPlotArea = function () {
            return arguments.length
              ? ((P = arguments.length <= 0 ? void 0 : arguments[0]), Te)
              : P;
          }),
          (Te.decorate = function () {
            return arguments.length
              ? ((oe = arguments.length <= 0 ? void 0 : arguments[0]), Te)
              : oe;
          }),
          (Te.useDevicePixelRatio = function () {
            return arguments.length
              ? ((O = arguments.length <= 0 ? void 0 : arguments[0]), Te)
              : O;
          }),
          Te
        );
      },
      VC = function () {
        for (
          var c = {
              xScale: r.scaleIdentity(),
              yScale: r.scaleIdentity(),
              xAxis: { bottom: bx, top: xx },
              yAxis: { right: wx, left: yx },
            },
            d = arguments.length,
            p = new Array(d),
            b = 0;
          b < d;
          b++
        )
          p[b] = arguments[b];
        return p.length === 1 && !p[0].domain && !p[0].range
          ? Object.assign(c, p[0])
          : Object.assign(c, {
              xScale: p[0] || c.xScale,
              yScale: p[1] || c.yScale,
            });
      },
      Ex = function (c) {
        return typeof c == "function"
          ? c
          : function () {
              return c;
            };
      },
      Ix = function (f, c) {
        return function () {
          var d = Ex(""),
            p = c,
            b = function () {},
            w = Dx.apply(void 0, arguments),
            m = function (v) {
              f(w, p),
                w.decorate(function (_, S, C) {
                  _.enter()
                    .select(".x-label")
                    .style("height", "1em")
                    .style("line-height", "1em");
                  var V = w.yOrient()(S);
                  _.enter()
                    .append("div")
                    .attr("class", "y-label-container")
                    .style("grid-column", V === "left" ? 1 : 5)
                    .style("-ms-grid-column", V === "left" ? 1 : 5)
                    .style("grid-row", 3)
                    .style("-ms-grid-row", 3)
                    .style("width", "1em")
                    .style("display", "flex")
                    .style("align-items", "center")
                    .style("justify-content", "center")
                    .style("white-space", "nowrap")
                    .append("div")
                    .attr("class", "y-label")
                    .style("transform", "rotate(-90deg)"),
                    _.select(".y-label-container>.y-label").text(d),
                    b(_, S, C);
                }),
                v.call(w);
            };
          return (
            k(m, w, F(/^x/, /^y/, "chartLabel")),
            (m.yLabel = function () {
              return arguments.length
                ? ((d = Ex(arguments.length <= 0 ? void 0 : arguments[0])), m)
                : d;
            }),
            (m.plotArea = function () {
              return arguments.length
                ? ((p = arguments.length <= 0 ? void 0 : arguments[0]), m)
                : p;
            }),
            (m.decorate = function () {
              return arguments.length
                ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), m)
                : b;
            }),
            m
          );
        };
      },
      NC = Ix(function (f, c) {
        return f.svgPlotArea(c);
      }, Js),
      DC = Ix(function (f, c) {
        return f.canvasPlotArea(c);
      }, ed),
      EC = function (c) {
        switch (c) {
          case "x":
            return y.brushX();
          case "y":
            return y.brushY();
          case "xy":
            return y.brush();
        }
      },
      gd = function (c) {
        return [c[1], c[0]];
      },
      vd = function (c) {
        var d = EC(c),
          p = h.dispatch("brush", "start", "end"),
          b = r.scaleIdentity(),
          w = r.scaleIdentity(),
          m = ze("g", "brush"),
          g = function (z, O, Y) {
            switch (c) {
              case "x":
                return z.map(O);
              case "y":
                return z.map(Y);
              case "xy":
                return [
                  [O(z[0][0]), Y(z[0][1])],
                  [O(z[1][0]), Y(z[1][1])],
                ];
            }
          },
          v = function (z) {
            return g(
              z,
              r.scaleLinear().domain(b.range()).invert,
              r.scaleLinear().domain(gd(w.range())).invert,
            );
          },
          _ = function (z) {
            return g(
              z,
              r.scaleLinear().domain(b.range()),
              r.scaleLinear().domain(gd(w.range())),
            );
          },
          S = function (z) {
            var O = r.scaleLinear().domain(b.domain());
            if (c === "x") return z.map(O.invert);
            if (c === "xy") return [O.invert(z[0][0]), O.invert(z[1][0])];
          },
          C = function (z) {
            var O = r.scaleLinear().domain(gd(w.domain()));
            if (c === "y") return [z[1], z[0]].map(O.invert);
            if (c === "xy") return [O.invert(z[1][1]), O.invert(z[0][1])];
          },
          V = function (z) {
            if (!(z.sourceEvent && z.sourceEvent.type === "draw"))
              if (z.selection) {
                var O = _(z.selection);
                p.call(
                  z.type,
                  {},
                  { selection: O, xDomain: S(O), yDomain: C(O) },
                );
              } else p.call(z.type, {}, {});
          },
          E = function (z) {
            z.each(function (O, Y, q) {
              d.extent([
                [b.range()[0], w.range()[1]],
                [b.range()[1], w.range()[0]],
              ]),
                d
                  .on("end", function (Q) {
                    return V(Q);
                  })
                  .on("brush", function (Q) {
                    return V(Q);
                  })
                  .on("start", function (Q) {
                    return V(Q);
                  });
              var W = m(u.select(q[Y]), [O]);
              W.call(d).call(d.move, O ? v(O) : null);
            });
          };
        return (
          (E.xScale = function () {
            return arguments.length
              ? ((b = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : b;
          }),
          (E.yScale = function () {
            return arguments.length
              ? ((w = arguments.length <= 0 ? void 0 : arguments[0]), E)
              : w;
          }),
          A(E, p, "on"),
          A(E, d, "filter", "handleSize"),
          E
        );
      },
      IC = function () {
        return vd("x");
      },
      zC = function () {
        return vd("y");
      },
      PC = function () {
        return vd("xy");
      },
      zx = function (c, d) {
        if (c == null && d == null) return !0;
        var p = c.domain(),
          b = d.domain();
        return (
          p.length === b.length &&
          p.every(function (w, m) {
            var g;
            return (
              w?.valueOf() ===
              ((g = b[m]) === null || g === void 0 ? void 0 : g.valueOf())
            );
          })
        );
      },
      RC = function (c, d) {
        return x.zoomIdentity.scale(c.k / d.k).translate(c.x - d.x, c.y - d.y);
      },
      Tf = Symbol("d3fc-domain-zoom"),
      LC = function () {
        var f = h.dispatch("zoom"),
          c = x.zoom().on("zoom", function (p) {
            var b = p.transform,
              w = this,
              m = b,
              g = w[Tf],
              v = g.originalXScale,
              _ = g.previousXScale,
              S = g.xScale,
              C = g.originalYScale,
              V = g.previousYScale,
              E = g.yScale,
              P = g.previousTransform;
            (!zx(_, S) || !zx(V, E)) &&
              ((v = S?.copy()), (C = E?.copy()), (m = RC(b, P))),
              S != null &&
                ((_ = m.rescaleX(v.range(S.range()))), S.domain(_.domain())),
              E != null &&
                ((V = m.rescaleY(C.range(E.range()))), E.domain(V.domain())),
              (P = m),
              (w[Tf] = {
                originalXScale: v,
                previousXScale: _,
                xScale: S,
                originalYScale: C,
                previousYScale: V,
                yScale: E,
                previousTransform: P,
              }),
              m !== b && c.transform(u.select(w), m),
              f.call("zoom");
          }),
          d = function (b) {
            var w =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : null,
              m =
                arguments.length > 2 && arguments[2] !== void 0
                  ? arguments[2]
                  : null;
            w == null &&
              m == null &&
              console.warn(
                "Without an xScale and/or yScale specified, this component won't do anything. Perhaps you forgot to specify them e.g. selection.call(zoom, x, y)?",
              ),
              b
                .each(function (g, v, _) {
                  var S = _[v][Tf];
                  S != null &&
                    S.xScale === w &&
                    S.yScale === m &&
                    console.warn(
                      "This component should only be called on a selection once. Perhaps you're missing an .enter()?",
                    );
                  var C = w?.copy(),
                    V = m?.copy();
                  _[v][Tf] = {
                    originalXScale: C,
                    previousXScale: C,
                    xScale: w,
                    originalYScale: V,
                    previousYScale: V,
                    yScale: m,
                    previousTransform: x.zoomIdentity,
                  };
                })
                .call(c);
          };
        return (
          A(d, f, "on"),
          A(
            d,
            c,
            "extent",
            "filter",
            "wheelDelta",
            "touchable",
            "clickDistance",
            "tapDistance",
            "duration",
            "interpolate",
          ),
          d
        );
      };
    (e.annotationCanvasBand = eC),
      (e.annotationCanvasCrosshair = rC),
      (e.annotationCanvasGridline = aC),
      (e.annotationCanvasLine = cd),
      (e.annotationSvgBand = Jk),
      (e.annotationSvgCrosshair = tC),
      (e.annotationSvgGridline = nC),
      (e.annotationSvgLine = ld),
      (e.autoBandwidth = Qk),
      (e.axisBottom = bx),
      (e.axisLabelOffset = dC),
      (e.axisLabelRotate = sC),
      (e.axisLeft = yx),
      (e.axisOrdinalBottom = fC),
      (e.axisOrdinalLeft = lC),
      (e.axisOrdinalRight = cC),
      (e.axisOrdinalTop = uC),
      (e.axisRight = wx),
      (e.axisTop = xx),
      (e.brush = PC),
      (e.brushX = IC),
      (e.brushY = zC),
      (e.bucket = _f),
      (e.chartCanvasCartesian = DC),
      (e.chartCartesian = Dx),
      (e.chartSvgCartesian = NC),
      (e.dataJoin = ze),
      (e.discontinuityIdentity = Z0),
      (e.discontinuityRange = VA),
      (e.discontinuitySkipUtcWeekends = TA),
      (e.discontinuitySkipUtcWeeklyPattern = RA),
      (e.discontinuitySkipWeekends = CA),
      (e.discontinuitySkipWeeklyPattern = zA),
      (e.effectivelyZero = Qs),
      (e.exclude = B),
      (e.extentDate = ov),
      (e.extentLinear = av),
      (e.extentTime = ov),
      (e.feedGdax = FA),
      (e.group = TC),
      (e.include = F),
      (e.includeMap = R),
      (e.indicatorBollingerBands = ae),
      (e.indicatorElderRay = AA),
      (e.indicatorEnvelope = MA),
      (e.indicatorExponentialMovingAverage = J),
      (e.indicatorForceIndex = SA),
      (e.indicatorMacd = H),
      (e.indicatorMovingAverage = K0),
      (e.indicatorRelativeStrengthIndex = wA),
      (e.indicatorStochasticOscillator = _A),
      (e.isTransition = at),
      (e.largestTriangleOneBucket = HA),
      (e.largestTriangleThreeBucket = YA),
      (e.layoutAnnealing = QA),
      (e.layoutBoundingBox = JA),
      (e.layoutGreedy = XA),
      (e.layoutLabel = WA),
      (e.layoutRemoveOverlaps = ZA),
      (e.layoutTextLabel = $A),
      (e.modeMedian = qA),
      (e.pointer = CC),
      (e.prefix = L),
      (e.randomFinancial = OA),
      (e.randomGeometricBrownianMotion = iv),
      (e.randomSkipWeekends = BA),
      (e.rebind = A),
      (e.rebindAll = k),
      (e.scaleDiscontinuous = J0),
      (e.seriesCanvasArea = Ik),
      (e.seriesCanvasBar = Ck),
      (e.seriesCanvasBoxPlot = Bk),
      (e.seriesCanvasCandlestick = Rk),
      (e.seriesCanvasErrorBar = Nk),
      (e.seriesCanvasGrouped = $k),
      (e.seriesCanvasHeatmap = Zk),
      (e.seriesCanvasLine = ed),
      (e.seriesCanvasMulti = fd),
      (e.seriesCanvasOhlc = Yk),
      (e.seriesCanvasPoint = ix),
      (e.seriesCanvasRepeat = Uk),
      (e.seriesSvgArea = Ek),
      (e.seriesSvgBar = kk),
      (e.seriesSvgBoxPlot = Ok),
      (e.seriesSvgCandlestick = Pk),
      (e.seriesSvgErrorBar = Vk),
      (e.seriesSvgGrouped = Wk),
      (e.seriesSvgHeatmap = Kk),
      (e.seriesSvgLine = Js),
      (e.seriesSvgMulti = ud),
      (e.seriesSvgOhlc = Hk),
      (e.seriesSvgPoint = ox),
      (e.seriesSvgRepeat = Gk),
      (e.seriesWebglArea = zk),
      (e.seriesWebglBar = Tk),
      (e.seriesWebglBoxPlot = Fk),
      (e.seriesWebglCandlestick = Lk),
      (e.seriesWebglErrorBar = Dk),
      (e.seriesWebglLine = ax),
      (e.seriesWebglMulti = cx),
      (e.seriesWebglOhlc = qk),
      (e.seriesWebglPoint = Ak),
      (e.seriesWebglRepeat = Xk),
      (e.shapeBar = xo),
      (e.shapeBoxPlot = Us),
      (e.shapeCandlestick = Gs),
      (e.shapeErrorBar = Xs),
      (e.shapeOhlc = $s),
      (e.webglAdjacentAttribute = Vn),
      (e.webglAttribute = Ae),
      (e.webglBaseAttribute = Sf),
      (e.webglBufferBuilder = sv),
      (e.webglElementIndices = va),
      (e.webglFillColor = Sk),
      (e.webglProgramBuilder = on),
      (e.webglScaleLinear = Mf),
      (e.webglScaleLog = Jv),
      (e.webglScaleMapper = Nn),
      (e.webglScalePow = ex),
      (e.webglSeriesArea = Wv),
      (e.webglSeriesBar = jv),
      (e.webglSeriesBoxPlot = Zv),
      (e.webglSeriesCandlestick = Kv),
      (e.webglSeriesErrorBar = Qv),
      (e.webglSeriesLine = Uv),
      (e.webglSeriesOhlc = Xv),
      (e.webglSeriesPoint = Gv),
      (e.webglShaderBuilder = Ye),
      (e.webglStrokeColor = Mk),
      (e.webglSymbolMapper = rx),
      (e.webglTypes = Ee),
      (e.webglUniform = Qt),
      (e.zoom = LC),
      Object.defineProperty(e, "__esModule", { value: !0 });
  });
});
var pA = Px((j0) => {
  var vo = vo || {};
  vo.stringify = (function () {
    var e = {
      "visit_linear-gradient": function (t) {
        return e.visit_gradient(t);
      },
      "visit_repeating-linear-gradient": function (t) {
        return e.visit_gradient(t);
      },
      "visit_radial-gradient": function (t) {
        return e.visit_gradient(t);
      },
      "visit_repeating-radial-gradient": function (t) {
        return e.visit_gradient(t);
      },
      visit_gradient: function (t) {
        var r = e.visit(t.orientation);
        return r && (r += ", "), t.type + "(" + r + e.visit(t.colorStops) + ")";
      },
      visit_shape: function (t) {
        var r = t.value,
          n = e.visit(t.at),
          a = e.visit(t.style);
        return a && (r += " " + a), n && (r += " at " + n), r;
      },
      "visit_default-radial": function (t) {
        var r = "",
          n = e.visit(t.at);
        return n && (r += n), r;
      },
      "visit_extent-keyword": function (t) {
        var r = t.value,
          n = e.visit(t.at);
        return n && (r += " at " + n), r;
      },
      "visit_position-keyword": function (t) {
        return t.value;
      },
      visit_position: function (t) {
        return e.visit(t.value.x) + " " + e.visit(t.value.y);
      },
      "visit_%": function (t) {
        return t.value + "%";
      },
      visit_em: function (t) {
        return t.value + "em";
      },
      visit_px: function (t) {
        return t.value + "px";
      },
      visit_literal: function (t) {
        return e.visit_color(t.value, t);
      },
      visit_hex: function (t) {
        return e.visit_color("#" + t.value, t);
      },
      visit_rgb: function (t) {
        return e.visit_color("rgb(" + t.value.join(", ") + ")", t);
      },
      visit_rgba: function (t) {
        return e.visit_color("rgba(" + t.value.join(", ") + ")", t);
      },
      visit_color: function (t, r) {
        var n = t,
          a = e.visit(r.length);
        return a && (n += " " + a), n;
      },
      visit_angular: function (t) {
        return t.value + "deg";
      },
      visit_directional: function (t) {
        return "to " + t.value;
      },
      visit_array: function (t) {
        var r = "",
          n = t.length;
        return (
          t.forEach(function (a, o) {
            (r += e.visit(a)), o < n - 1 && (r += ", ");
          }),
          r
        );
      },
      visit: function (t) {
        if (!t) return "";
        var r = "";
        if (t instanceof Array) return e.visit_array(t, r);
        if (t.type) {
          var n = e["visit_" + t.type];
          if (n) return n(t);
          throw Error("Missing visitor visit_" + t.type);
        } else throw Error("Invalid node.");
      },
    };
    return function (t) {
      return e.visit(t);
    };
  })();
  var vo = vo || {};
  vo.parse = (function () {
    var e = {
        linearGradient: /^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,
        repeatingLinearGradient:
          /^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,
        radialGradient: /^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,
        repeatingRadialGradient:
          /^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,
        sideOrCorner:
          /^to (left (top|bottom)|right (top|bottom)|left|right|top|bottom)/i,
        extentKeywords:
          /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,
        positionKeywords: /^(left|center|right|top|bottom)/i,
        pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
        percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,
        emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
        angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
        startCall: /^\(/,
        endCall: /^\)/,
        comma: /^,/,
        hexColor: /^\#([0-9a-fA-F]+)/,
        literalColor: /^([a-zA-Z]+)/,
        rgbColor: /^rgb/i,
        rgbaColor: /^rgba/i,
        number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/,
      },
      t = "";
    function r(X) {
      var K = new Error(t + ": " + X);
      throw ((K.source = t), K);
    }
    function n() {
      var X = a();
      return t.length > 0 && r("Invalid input not EOF"), X;
    }
    function a() {
      return F(o);
    }
    function o() {
      return (
        i("linear-gradient", e.linearGradient, l) ||
        i("repeating-linear-gradient", e.repeatingLinearGradient, l) ||
        i("radial-gradient", e.radialGradient, y) ||
        i("repeating-radial-gradient", e.repeatingRadialGradient, y)
      );
    }
    function i(X, K, Z) {
      return u(K, function (te) {
        var le = Z();
        return (
          le && (ee(e.comma) || r("Missing comma before color stops")),
          { type: X, orientation: le, colorStops: F(R) }
        );
      });
    }
    function u(X, K) {
      var Z = ee(X);
      if (Z) {
        ee(e.startCall) || r("Missing (");
        var te = K(Z);
        return ee(e.endCall) || r("Missing )"), te;
      }
    }
    function l() {
      return s() || h();
    }
    function s() {
      return H("directional", e.sideOrCorner, 1);
    }
    function h() {
      return H("angular", e.angleValue, 1);
    }
    function y() {
      var X,
        K = x(),
        Z;
      return (
        K &&
          ((X = []),
          X.push(K),
          (Z = t),
          ee(e.comma) && ((K = x()), K ? X.push(K) : (t = Z))),
        X
      );
    }
    function x() {
      var X = M() || A();
      if (X) X.at = k();
      else {
        var K = N();
        if (K) {
          X = K;
          var Z = k();
          Z && (X.at = Z);
        } else {
          var te = D();
          te && (X = { type: "default-radial", at: te });
        }
      }
      return X;
    }
    function M() {
      var X = H("shape", /^(circle)/i, 0);
      return X && (X.style = J() || N()), X;
    }
    function A() {
      var X = H("shape", /^(ellipse)/i, 0);
      return X && (X.style = U() || N()), X;
    }
    function N() {
      return H("extent-keyword", e.extentKeywords, 1);
    }
    function k() {
      if (H("position", /^at/, 0)) {
        var X = D();
        return X || r("Missing positioning value"), X;
      }
    }
    function D() {
      var X = B();
      if (X.x || X.y) return { type: "position", value: X };
    }
    function B() {
      return { x: U(), y: U() };
    }
    function F(X) {
      var K = X(),
        Z = [];
      if (K)
        for (Z.push(K); ee(e.comma); )
          (K = X()), K ? Z.push(K) : r("One extra comma");
      return Z;
    }
    function R() {
      var X = I();
      return X || r("Expected color definition"), (X.length = U()), X;
    }
    function I() {
      return $() || ue() || G() || L();
    }
    function L() {
      return H("literal", e.literalColor, 0);
    }
    function $() {
      return H("hex", e.hexColor, 1);
    }
    function G() {
      return u(e.rgbColor, function () {
        return { type: "rgb", value: F(ne) };
      });
    }
    function ue() {
      return u(e.rgbaColor, function () {
        return { type: "rgba", value: F(ne) };
      });
    }
    function ne() {
      return ee(e.number)[1];
    }
    function U() {
      return H("%", e.percentageValue, 1) || ae() || J();
    }
    function ae() {
      return H("position-keyword", e.positionKeywords, 1);
    }
    function J() {
      return H("px", e.pixelValue, 1) || H("em", e.emValue, 1);
    }
    function H(X, K, Z) {
      var te = ee(K);
      if (te) return { type: X, value: te[Z] };
    }
    function ee(X) {
      var K, Z;
      return (
        (Z = /^[\n\r\t\s]+/.exec(t)),
        Z && j(Z[0].length),
        (K = X.exec(t)),
        K && j(K[0].length),
        K
      );
    }
    function j(X) {
      t = t.substr(X);
    }
    return function (X) {
      return (t = X.toString()), n();
    };
  })();
  j0.parse = vo.parse;
  j0.stringify = vo.stringify;
});
Element.prototype.matches ||
  (Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector);
Element.prototype.matches ||
  (Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector);
Element.prototype.closest ||
  (Element.prototype.closest = function (e) {
    var t = this;
    do {
      if (t.matches(e)) return t;
      t = t.parentElement || t.parentNode;
    } while (t !== null && t.nodeType === 1);
    return null;
  });
var U9 = Re(Le());
var Jn = Re(Le());
var We = { none: "none", ordinal: "ordinal", time: "time", linear: "linear" },
  mi = (e) => {
    let t = "crossValues",
      r = null,
      n = null,
      a = () => {
        let o = (i) => {
          let u = r ? e[t].filter((l) => r == l.name) : e[t];
          return t == "crossValues" && u.length > 1
            ? !1
            : u.some((l) => i.includes(l.type));
        };
        return e[t].length === 0
          ? We.none
          : n != We.time && o(["datetime", "date"])
          ? We.time
          : (n != We.linear && o(["integer", "float"])) || n == We.ordinal
          ? We.linear
          : We.ordinal;
      };
    return (
      (a.settingName = (...o) => (o.length ? ((t = o[0]), a) : t)),
      (a.settingValue = (...o) => (o.length ? ((r = o[0]), a) : r)),
      (a.excludeType = (...o) => (o.length ? ((n = o[0]), a) : n)),
      a
    );
  };
var Gg = {};
At(Gg, { domain: () => LE, labelFunction: () => $g, scale: () => RE });
function Hc(e, t, r) {
  (e = +e),
    (t = +t),
    (r = (a = arguments.length) < 2 ? ((t = e), (e = 0), 1) : a < 3 ? 1 : +r);
  for (
    var n = -1, a = Math.max(0, Math.ceil((t - e) / r)) | 0, o = new Array(a);
    ++n < a;

  )
    o[n] = e + n * r;
  return o;
}
Og();
sn();
Ga();
xc();
sp();
Eg();
hp();
rl();
function kE(e) {
  var t = 0,
    r = e.children,
    n = r && r.length;
  if (!n) t = 1;
  else for (; --n >= 0; ) t += r[n].value;
  e.value = t;
}
function K4() {
  return this.eachAfter(kE);
}
function Z4(e, t) {
  let r = -1;
  for (let n of this) e.call(t, n, ++r, this);
  return this;
}
function J4(e, t) {
  for (var r = this, n = [r], a, o, i = -1; (r = n.pop()); )
    if ((e.call(t, r, ++i, this), (a = r.children)))
      for (o = a.length - 1; o >= 0; --o) n.push(a[o]);
  return this;
}
function eS(e, t) {
  for (var r = this, n = [r], a = [], o, i, u, l = -1; (r = n.pop()); )
    if ((a.push(r), (o = r.children)))
      for (i = 0, u = o.length; i < u; ++i) n.push(o[i]);
  for (; (r = a.pop()); ) e.call(t, r, ++l, this);
  return this;
}
function tS(e, t) {
  let r = -1;
  for (let n of this) if (e.call(t, n, ++r, this)) return n;
}
function rS(e) {
  return this.eachAfter(function (t) {
    for (var r = +e(t.data) || 0, n = t.children, a = n && n.length; --a >= 0; )
      r += n[a].value;
    t.value = r;
  });
}
function nS(e) {
  return this.eachBefore(function (t) {
    t.children && t.children.sort(e);
  });
}
function aS(e) {
  for (var t = this, r = CE(t, e), n = [t]; t !== r; )
    (t = t.parent), n.push(t);
  for (var a = n.length; e !== r; ) n.splice(a, 0, e), (e = e.parent);
  return n;
}
function CE(e, t) {
  if (e === t) return e;
  var r = e.ancestors(),
    n = t.ancestors(),
    a = null;
  for (e = r.pop(), t = n.pop(); e === t; )
    (a = e), (e = r.pop()), (t = n.pop());
  return a;
}
function oS() {
  for (var e = this, t = [e]; (e = e.parent); ) t.push(e);
  return t;
}
function iS() {
  return Array.from(this);
}
function uS() {
  var e = [];
  return (
    this.eachBefore(function (t) {
      t.children || e.push(t);
    }),
    e
  );
}
function fS() {
  var e = this,
    t = [];
  return (
    e.each(function (r) {
      r !== e && t.push({ source: r.parent, target: r });
    }),
    t
  );
}
function* lS() {
  var e = this,
    t,
    r = [e],
    n,
    a,
    o;
  do
    for (t = r.reverse(), r = []; (e = t.pop()); )
      if ((yield e, (n = e.children)))
        for (a = 0, o = n.length; a < o; ++a) r.push(n[a]);
  while (r.length);
}
function jn(e, t) {
  e instanceof Map
    ? ((e = [void 0, e]), t === void 0 && (t = NE))
    : t === void 0 && (t = VE);
  for (var r = new ef(e), n, a = [r], o, i, u, l; (n = a.pop()); )
    if ((i = t(n.data)) && (l = (i = Array.from(i)).length))
      for (n.children = i, u = l - 1; u >= 0; --u)
        a.push((o = i[u] = new ef(i[u]))),
          (o.parent = n),
          (o.depth = n.depth + 1);
  return r.eachBefore(EE);
}
function TE() {
  return jn(this).eachBefore(DE);
}
function VE(e) {
  return e.children;
}
function NE(e) {
  return Array.isArray(e) ? e[1] : null;
}
function DE(e) {
  e.data.value !== void 0 && (e.value = e.data.value), (e.data = e.data.data);
}
function EE(e) {
  var t = 0;
  do e.height = t;
  while ((e = e.parent) && e.height < ++t);
}
function ef(e) {
  (this.data = e), (this.depth = this.height = 0), (this.parent = null);
}
ef.prototype = jn.prototype = {
  constructor: ef,
  count: K4,
  each: Z4,
  eachAfter: eS,
  eachBefore: J4,
  find: tS,
  sum: rS,
  sort: nS,
  path: aS,
  ancestors: oS,
  descendants: iS,
  leaves: uS,
  links: fS,
  copy: TE,
  [Symbol.iterator]: lS,
};
function cS(e) {
  if (typeof e != "function") throw new Error();
  return e;
}
function hi() {
  return 0;
}
function pi(e) {
  return function () {
    return e;
  };
}
function Yc(e) {
  (e.x0 = Math.round(e.x0)),
    (e.y0 = Math.round(e.y0)),
    (e.x1 = Math.round(e.x1)),
    (e.y1 = Math.round(e.y1));
}
function qc(e, t, r, n, a) {
  for (
    var o = e.children,
      i,
      u = -1,
      l = o.length,
      s = e.value && (n - t) / e.value;
    ++u < l;

  )
    (i = o[u]), (i.y0 = r), (i.y1 = a), (i.x0 = t), (i.x1 = t += i.value * s);
}
function Yg() {
  var e = 1,
    t = 1,
    r = 0,
    n = !1;
  function a(i) {
    var u = i.height + 1;
    return (
      (i.x0 = i.y0 = r),
      (i.x1 = e),
      (i.y1 = t / u),
      i.eachBefore(o(t, u)),
      n && i.eachBefore(Yc),
      i
    );
  }
  function o(i, u) {
    return function (l) {
      l.children &&
        qc(l, l.x0, (i * (l.depth + 1)) / u, l.x1, (i * (l.depth + 2)) / u);
      var s = l.x0,
        h = l.y0,
        y = l.x1 - r,
        x = l.y1 - r;
      y < s && (s = y = (s + y) / 2),
        x < h && (h = x = (h + x) / 2),
        (l.x0 = s),
        (l.y0 = h),
        (l.x1 = y),
        (l.y1 = x);
    };
  }
  return (
    (a.round = function (i) {
      return arguments.length ? ((n = !!i), a) : n;
    }),
    (a.size = function (i) {
      return arguments.length ? ((e = +i[0]), (t = +i[1]), a) : [e, t];
    }),
    (a.padding = function (i) {
      return arguments.length ? ((r = +i), a) : r;
    }),
    a
  );
}
function sS(e, t, r, n, a) {
  for (
    var o = e.children,
      i,
      u = -1,
      l = o.length,
      s = e.value && (a - r) / e.value;
    ++u < l;

  )
    (i = o[u]), (i.x0 = t), (i.x1 = n), (i.y0 = r), (i.y1 = r += i.value * s);
}
var IE = (1 + Math.sqrt(5)) / 2;
function zE(e, t, r, n, a, o) {
  for (
    var i = [],
      u = t.children,
      l,
      s,
      h = 0,
      y = 0,
      x = u.length,
      M,
      A,
      N = t.value,
      k,
      D,
      B,
      F,
      R,
      I,
      L;
    h < x;

  ) {
    (M = a - r), (A = o - n);
    do k = u[y++].value;
    while (!k && y < x);
    for (
      D = B = k,
        I = Math.max(A / M, M / A) / (N * e),
        L = k * k * I,
        R = Math.max(B / L, L / D);
      y < x;
      ++y
    ) {
      if (
        ((k += s = u[y].value),
        s < D && (D = s),
        s > B && (B = s),
        (L = k * k * I),
        (F = Math.max(B / L, L / D)),
        F > R)
      ) {
        k -= s;
        break;
      }
      R = F;
    }
    i.push((l = { value: k, dice: M < A, children: u.slice(h, y) })),
      l.dice
        ? qc(l, r, n, a, N ? (n += (A * k) / N) : o)
        : sS(l, r, n, N ? (r += (M * k) / N) : a, o),
      (N -= k),
      (h = y);
  }
  return i;
}
var dS = (function e(t) {
  function r(n, a, o, i, u) {
    zE(t, n, a, o, i, u);
  }
  return (
    (r.ratio = function (n) {
      return e((n = +n) > 1 ? n : 1);
    }),
    r
  );
})(IE);
function qg() {
  var e = dS,
    t = !1,
    r = 1,
    n = 1,
    a = [0],
    o = hi,
    i = hi,
    u = hi,
    l = hi,
    s = hi;
  function h(x) {
    return (
      (x.x0 = x.y0 = 0),
      (x.x1 = r),
      (x.y1 = n),
      x.eachBefore(y),
      (a = [0]),
      t && x.eachBefore(Yc),
      x
    );
  }
  function y(x) {
    var M = a[x.depth],
      A = x.x0 + M,
      N = x.y0 + M,
      k = x.x1 - M,
      D = x.y1 - M;
    k < A && (A = k = (A + k) / 2),
      D < N && (N = D = (N + D) / 2),
      (x.x0 = A),
      (x.y0 = N),
      (x.x1 = k),
      (x.y1 = D),
      x.children &&
        ((M = a[x.depth + 1] = o(x) / 2),
        (A += s(x) - M),
        (N += i(x) - M),
        (k -= u(x) - M),
        (D -= l(x) - M),
        k < A && (A = k = (A + k) / 2),
        D < N && (N = D = (N + D) / 2),
        e(x, A, N, k, D));
  }
  return (
    (h.round = function (x) {
      return arguments.length ? ((t = !!x), h) : t;
    }),
    (h.size = function (x) {
      return arguments.length ? ((r = +x[0]), (n = +x[1]), h) : [r, n];
    }),
    (h.tile = function (x) {
      return arguments.length ? ((e = cS(x)), h) : e;
    }),
    (h.padding = function (x) {
      return arguments.length
        ? h.paddingInner(x).paddingOuter(x)
        : h.paddingInner();
    }),
    (h.paddingInner = function (x) {
      return arguments.length
        ? ((o = typeof x == "function" ? x : pi(+x)), h)
        : o;
    }),
    (h.paddingOuter = function (x) {
      return arguments.length
        ? h.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x)
        : h.paddingTop();
    }),
    (h.paddingTop = function (x) {
      return arguments.length
        ? ((i = typeof x == "function" ? x : pi(+x)), h)
        : i;
    }),
    (h.paddingRight = function (x) {
      return arguments.length
        ? ((u = typeof x == "function" ? x : pi(+x)), h)
        : u;
    }),
    (h.paddingBottom = function (x) {
      return arguments.length
        ? ((l = typeof x == "function" ? x : pi(+x)), h)
        : l;
    }),
    (h.paddingLeft = function (x) {
      return arguments.length
        ? ((s = typeof x == "function" ? x : pi(+x)), h)
        : s;
    }),
    h
  );
}
function Wg(e, t, r, n, a) {
  var o = e.children,
    i,
    u = o.length,
    l,
    s = new Array(u + 1);
  for (s[0] = l = i = 0; i < u; ++i) s[i + 1] = l += o[i].value;
  h(0, u, e.value, t, r, n, a);
  function h(y, x, M, A, N, k, D) {
    if (y >= x - 1) {
      var B = o[y];
      (B.x0 = A), (B.y0 = N), (B.x1 = k), (B.y1 = D);
      return;
    }
    for (var F = s[y], R = M / 2 + F, I = y + 1, L = x - 1; I < L; ) {
      var $ = (I + L) >>> 1;
      s[$] < R ? (I = $ + 1) : (L = $);
    }
    R - s[I - 1] < s[I] - R && y + 1 < I && --I;
    var G = s[I] - F,
      ue = M - G;
    if (k - A > D - N) {
      var ne = M ? (A * ue + k * G) / M : k;
      h(y, I, G, A, N, ne, D), h(I, x, ue, ne, N, k, D);
    } else {
      var U = M ? (N * ue + D * G) / M : D;
      h(y, I, G, A, N, k, U), h(I, x, ue, A, U, k, D);
    }
  }
}
Zt();
Bn();
op();
Jh();
Ag();
Nt();
Kp();
Lo();
Sl();
Mc();
Ec();
Hg();
var mS = (e) => {
    let t = (r) => (n, a) => (n === void 0 ? a : a === void 0 ? n : r(n, a));
    return e.reduce(
      (r, n) => [t(Math.min)(r[0], n[0]), t(Math.max)(r[1], n[1])],
      [void 0, void 0],
    );
  },
  Qn = (e) => (Array.isArray(e) ? e.flat(1 / 0) : [e]);
var hS = Re(Le()),
  PE = 1,
  Wc = (e) => {
    let t = (r) => e(r);
    return (
      (0, hS.rebindAll)(t, e),
      (t.bandwidth = (...r) =>
        r.length ? (e.bandwidth(...r), t) : Math.max(e.bandwidth(), PE)),
      t
    );
  };
var pS = Re(Le()),
  gS = (e) => {
    let t = (r) => e(r);
    return (
      (0, pS.rebindAll)(t, e),
      (t.ticks = function () {
        return [];
      }),
      t
    );
  };
var RE = () => gS(Wc(Ar())),
  LE = () => {
    let e = ["crossValue"],
      t = "horizontal",
      r = (a) => {
        let o = Qn(a);
        return n([...new Set(o.map((i) => i[e[0]]))]);
      },
      n = (a) => (t == "vertical" ? a.reverse() : a);
    return (
      (r.valueName = (...a) => (a.length ? ((e = [a[0]]), r) : e[0])),
      (r.valueNames = (...a) => (a.length ? ((e = a[0]), r) : e)),
      (r.orient = (...a) => (a.length ? ((t = a[0]), r) : t)),
      r
    );
  },
  $g = (e) => (t) => t[e].join("|");
var Qg = {};
At(Qg, {
  component: () => HE,
  domain: () => Xg,
  labelFunction: () => jg,
  scale: () => BE,
  tickFormatFunction: () => FE,
});
var Kr = Re(Le());
_m();
var $c = () => {
  let e = [0, 0],
    t = "percent",
    r = (n) => {
      switch (t) {
        case "domain": {
          (n[0] -= e[0]), (n[1] += e[1]);
          break;
        }
        case "percent": {
          let a = n[1] - n[0];
          (n[0] -= e[0] * a), (n[1] += e[1] * a);
          break;
        }
        default:
          throw new Error("Unknown padUnit: " + t);
      }
      return n;
    };
  return (
    (r.pad = function () {
      return arguments.length
        ? ((e = arguments.length <= 0 ? void 0 : arguments[0]), r)
        : e;
    }),
    (r.padUnit = function () {
      return arguments.length
        ? ((t = arguments.length <= 0 ? void 0 : arguments[0]), r)
        : t;
    }),
    r
  );
};
var vS = function () {
    let e = [
        function (o) {
          return o;
        },
      ],
      t = null,
      r = [],
      n = $c(),
      a = function (i) {
        let u = new Array(i.length),
          l = !0,
          s = !1,
          h,
          y = e[Symbol.iterator]();
        try {
          for (let M; !(l = (M = y.next()).done); l = !0) {
            let A = M.value;
            for (let N = 0; N < i.length; N++) {
              let k = A(i[N], N);
              Array.isArray(k) ? u.push.apply(u, Ug(k)) : u.push(k);
            }
          }
        } catch (M) {
          (s = !0), (h = M);
        } finally {
          try {
            !l && y.return && y.return();
          } finally {
            if (s) throw h;
          }
        }
        let x = [ir(u), zr(u)];
        if (
          ((x[0] = x[0] == null ? ir(r) : ir([x[0]].concat(Ug(r)))),
          (x[1] = x[1] == null ? zr(r) : zr([x[1]].concat(Ug(r)))),
          t != null)
        ) {
          let M = Math.max(Math.abs(x[1] - t), Math.abs(x[0] - t));
          (x[0] = t - M), (x[1] = t + M);
        }
        return n(x);
      };
    return (
      (a.accessors = function () {
        return arguments.length
          ? ((e = arguments.length <= 0 ? void 0 : arguments[0]), a)
          : e;
      }),
      (a.pad = function () {
        return arguments.length
          ? (n.pad(arguments.length <= 0 ? void 0 : arguments[0]), a)
          : n.pad;
      }),
      (a.padUnit = function () {
        return arguments.length
          ? (n.padUnit(arguments.length <= 0 ? void 0 : arguments[0]), a)
          : n.padUnit;
      }),
      (a.include = function () {
        return arguments.length
          ? ((r = arguments.length <= 0 ? void 0 : arguments[0]), a)
          : r;
      }),
      (a.symmetricalAbout = function () {
        return arguments.length
          ? ((t = arguments.length <= 0 ? void 0 : arguments[0]), a)
          : t;
      }),
      (a.paddingStrategy = function () {
        return arguments.length
          ? ((n = arguments.length <= 0 ? void 0 : arguments[0]), a)
          : n;
      }),
      a
    );
  },
  Ug = function (e) {
    if (Array.isArray(e)) {
      let t = Array(e.length);
      for (let r = 0; r < e.length; r++) t[r] = e[r];
      return t;
    } else return Array.from(e);
  };
var OE = 1e7,
  Gc = (e) =>
    Math.abs(e) >= OE
      ? Hr(".3s")(e)
      : Number.isInteger(e)
      ? Hr(",.0f")(e)
      : Hr(",.2f")(e);
function gi(e) {
  return e.getRootNode().host;
}
function Kn(e) {
  return e.closest("#container.chart");
}
var BE = () => Yr(),
  Xg = () => {
    let e = vS().pad([0, 0.1]).padUnit("percent"),
      t = ["crossValue"],
      r = (o) => (e.accessors(t.map((i) => (u) => parseFloat(u[i]))), a(Qn(o)));
    Kr.rebindAll(r, e);
    let n = (o) => {
        let i = t.map((u) =>
          o
            .map((l) => l[u])
            .sort((l, s) => l - s)
            .filter((l, s, h) => s === 0 || l !== h[s - 1])
            .reduce((l, s, h, y) =>
              h === 0 || l <= s - y[h - 1] ? l : Math.abs(s - y[h - 1]),
            ),
        );
        return Math.min(...i);
      },
      a = (o) => {
        if (e.padUnit() == "domain") {
          let i = n(o);
          return e.pad([i / 2, i / 2])(o);
        } else return e(o);
      };
    return (
      (r.valueName = (...o) => (o.length ? ((t = [o[0]]), r) : t[0])),
      (r.valueNames = (...o) => (o.length ? ((t = o[0]), r) : t)),
      r
    );
  },
  jg = (e) => (t) => t[e][0],
  FE = Gc,
  HE = (e) => {
    let t = null,
      r = "horizontal",
      n = null,
      a = (s, h) => {
        try {
          return Kn(s.node())
            .querySelector(".cartesian-chart")
            .querySelector(`.${h}-axis`);
        } catch {
          return null;
        }
      },
      o = (s) => {
        let h = fe(s).select("text").node();
        h.style.fontSize = "80%";
      },
      i = (s, h) => {
        let y = s.getBoundingClientRect();
        h.each((x, M, A) => {
          let N = fe(A[M]).node().getBoundingClientRect();
          ((r == "vertical" && y.width < N.width) ||
            (r == "horizontal" && y.height < N.height)) &&
            o(A[M]);
        });
      },
      u = (s, h, y) => {
        let x = a(s, h);
        x && i(x, s);
      },
      l = () => ({
        bottom: Kr.axisBottom,
        left: Kr.axisLeft,
        top: Kr.axisTop,
        right: Kr.axisRight,
        decorate: u,
      });
    return (
      (l.domain = (...s) => (s.length ? ((t = s[0]), l) : t)),
      (l.orient = (...s) => (s.length ? ((r = s[0]), l) : r)),
      (l.settingName = (...s) => (s.length ? ((n = s[0]), l) : n)),
      l
    );
  };
var Zg = {};
At(Zg, { domain: () => qE, labelFunction: () => Kg, scale: () => YE });
var vi = Re(Le());
var YE = () => ku(),
  qE = () => {
    let e = vi.extentTime(),
      t = ["crossValue"],
      r = (o) => (e.accessors(t.map((i) => (u) => new Date(u[i]))), a(Qn(o)));
    vi.rebindAll(r, e, vi.exclude("include", "paddingStrategy"));
    let n = (o) => {
        let i = t.map((u) =>
          o
            .map((l) => new Date(l[u]).getTime())
            .sort((l, s) => l - s)
            .filter((l, s, h) => s === 0 || l !== h[s - 1])
            .reduce((l, s, h, y) =>
              h === 0 || Math.abs(l) <= Math.abs(s - y[h - 1])
                ? Math.abs(l)
                : Math.abs(s - y[h - 1]),
            ),
        );
        return Math.min(...i);
      },
      a = (o) => {
        let i = Math.abs(n(o));
        return e.padUnit("domain").pad([i / 2, i / 2])(o);
      };
    return (
      (r.valueName = (...o) => (o.length ? ((t = [o[0]]), r) : t[0])),
      (r.valueNames = (...o) => (o.length ? ((t = o[0]), r) : t)),
      r
    );
  },
  Kg = (e) => (t) => new Date(t[e][0]);
var e0 = {};
At(e0, {
  component: () => GE,
  domain: () => $E,
  labelFunction: () => Jg,
  scale: () => WE,
});
var Zn = Re(Le());
var It = Re(Le());
var xS = (...e) => {
  let t = {},
    r = (n) => {
      for (let a of Object.keys(t)) n[a](t[a]);
      return n;
    };
  for (let n of e) r[n] = (...a) => (a.length ? ((t[n] = a[0]), r) : t[n]);
  return r;
};
var Uc = (e, t, r) => {
    let n = 6,
      a = 6,
      o = xS(
        "tickFormat",
        "ticks",
        "tickArguments",
        "tickValues",
        "tickPadding",
      ),
      i = () => {},
      u = null,
      l = (0, It.dataJoin)("g", "group"),
      s = (0, It.dataJoin)("path", "domain"),
      h = (N, k) => (x() ? `translate(${k}, ${N})` : `translate(${N}, ${k})`),
      y = (N) => (x() ? N.map((k) => [k[1], k[0]]) : N),
      x = () => e === "left" || e === "right",
      M = (N) => {
        if (!u) {
          o(t(r).decorate(i))(N);
          return;
        }
        N.each((k, D, B) => {
          let F = B[D],
            R = fe(F),
            I = e === "bottom" || e === "right" ? 1 : -1,
            L = r.range(),
            $ = y([
              [L[0], I * n],
              [L[0], 0],
              [L[1], 0],
              [L[1], I * n],
            ]);
          s(R, [k])
            .attr("d", Gn()($))
            .attr("stroke", "#000")
            .attr("fill", "none");
          let ue = l(R, u),
            ne = (ae) => (Array.isArray(a) ? a[ae] : a),
            U = (ae) => {
              let J = 0;
              for (let H = 0; H < ae; H++) J += ne(H);
              return J;
            };
          ue
            .attr("transform", (ae, J) => h(0, I * U(J)))
            .each((ae, J, H) => {
              let ee = fe(H[J]),
                j = A(r, ae);
              o(t(j))
                .decorate((K, Z) => i(K, Z, J))
                .tickSizeInner(ne(J))
                .tickOffset((K) => j.step(K) / 2)(ee),
                ee.select("path.domain").attr("visibility", "hidden");
            }),
            ue.exit().attr("transform", (ae, J) => h(0, I * U(J)));
        });
      },
      A = (N, k) => {
        function D(B) {
          let F = B.domain;
          return F.reduce((R, I) => R + N(I), 0) / F.length;
        }
        return (
          (D.ticks = () => k),
          (D.tickFormat = () => (B) => B.text),
          (D.copy = () => A(N, k)),
          (D.step = (B) => B.domain.length * N.step()),
          (0, It.rebindAll)(D, N, (0, It.exclude)("ticks", "step", "copy")),
          D
        );
      };
    return (
      (M.tickSize = (...N) => (N.length ? ((a = n = Number(N[0])), M) : a)),
      (M.tickSizeInner = (...N) =>
        N.length ? ((a = Array.isArray(N[0]) ? N[0] : Number(N[0])), M) : a),
      (M.tickSizeOuter = (...N) => (N.length ? ((n = Number(N[0])), M) : n)),
      (M.decorate = (...N) => (N.length ? ((i = N[0]), M) : i)),
      (M.groups = (...N) => (N.length ? ((u = N[0]), M) : u)),
      (0, It.rebindAll)(M, o),
      M
    );
  },
  bS = (e) => Uc("top", It.axisOrdinalTop, e),
  yS = (e) => Uc("bottom", It.axisOrdinalBottom, e),
  wS = (e) => Uc("left", It.axisOrdinalLeft, e),
  _S = (e) => Uc("right", It.axisOrdinalRight, e);
var WE = () => Wc(Ar()).padding(0.5),
  $E = () => {
    let e = ["crossValue"],
      t = "horizontal",
      r = (a) => {
        let o = Qn(a);
        return n([...Array.from(new Set(o.map((i) => i[e[0]])))]);
      },
      n = (a) => (t == "vertical" ? a.reverse() : a);
    return (
      (r.valueName = (...a) => (a.length ? ((e = [a[0]]), r) : e[0])),
      (r.valueNames = (...a) => (a.length ? ((e = a[0]), r) : e)),
      (r.orient = (...a) => (a.length ? ((t = a[0]), r) : t)),
      r
    );
  },
  Jg = (e) => (t) => t[e].join("|"),
  GE = (e) => {
    let t = "horizontal",
      r = "crossValues",
      n = null,
      a = () => {
        let x = e[r].length > 1,
          M = i(n),
          A = M.map(u),
          N = x ? A.map((R) => R.size) : A[0].size,
          k = A.reduce((R, I) => R + I.size, 0),
          D = (R) => (I) => {
            let L = R(I);
            return (
              x && L.groups(M).tickSizeInner(N).tickSizeOuter(k),
              t !== "horizontal" && L.tickPadding(10),
              L
            );
          },
          B = (R, I, L) => {
            let $ = A[L].rotation;
            t === "horizontal" && y(R, $), l(R, $);
          },
          F = o(x);
        return {
          bottom: D(F.bottom),
          left: D(F.left),
          right: D(F.right),
          top: D(F.top),
          size: `${k + 10}px`,
          decorate: B,
        };
      },
      o = (x) =>
        x
          ? { bottom: yS, left: wS, top: bS, right: _S }
          : {
              bottom: Zn.axisOrdinalBottom,
              left: Zn.axisOrdinalLeft,
              top: Zn.axisOrdinalTop,
              right: Zn.axisOrdinalRight,
            },
      i = (x) => {
        let M = [];
        return (
          x.forEach((A) => {
            (A && A.split ? A.split("|") : [A]).forEach((k, D) => {
              for (; M.length <= D; ) M.push([]);
              let B = M[D];
              B.length > 0 && B[B.length - 1].text === k
                ? B[B.length - 1].domain.push(A)
                : B.push({ text: k, domain: [A] });
            });
          }),
          M.reverse()
        );
      },
      u = (x) => {
        let M = e.size.width,
          A = Math.max(...x.map((N) => (N.text ? N.text.length : 0)));
        return t === "horizontal"
          ? x && x.length * 16 > M - 100
            ? { size: A * 5 + 10, rotation: 90 }
            : x && x.length * (A * 6 + 10) > M - 100
            ? { size: A * 3 + 20, rotation: 45 }
            : { size: 25, rotation: 0 }
          : { size: A * 5 + 10, rotation: 0 };
      },
      l = (x, M) => {
        let A = (I) => {
            let L = I.indexOf(",") !== -1 ? "," : " ",
              $ = I.substring(I.indexOf("(") + 1, I.indexOf(")"))
                .split(L)
                .map((G) => parseInt(G));
            for (; $.length < 2; ) $.push(0);
            return $;
          },
          D = M
            ? (I, L) => I.x + I.width + 14 > L.x + L.width
            : (I, L) =>
                I.x <= L.x + L.width &&
                L.x <= I.x + I.width &&
                I.y <= L.y + L.height &&
                L.y <= I.y + I.height,
          B = (I, L) =>
            I.x >= L.x &&
            I.x + I.width <= L.x + L.width &&
            I.y >= L.y &&
            I.y + I.height <= L.y + L.height,
          F = t == "horizontal" ? s(x) : null,
          R = [];
        x.each((I, L, $) => {
          let G = fe($[L]),
            ue = A(G.attr("transform")),
            ne = G.node().getBBox(),
            U = {
              x: ne.x + ue[0],
              y: ne.y + ue[1],
              width: ne.width,
              height: ne.height,
            },
            J = R.some((H) => D(H, U)) || (F && !B(U, F));
          G.attr("visibility", J ? "hidden" : ""), J || R.push(U);
        });
      },
      s = (x) => {
        let M = Kn(x.node());
        if (M === null) return;
        let A = M.querySelector(".cartesian-chart"),
          N = A.querySelector(".x-axis"),
          k = A.getBoundingClientRect(),
          D = N.getBoundingClientRect();
        return {
          x: k.left - D.left,
          width: k.width,
          y: k.top - D.top,
          height: k.height,
        };
      },
      h = (x) =>
        x
          ? x < 60
            ? `rotate(-${x} 5 5)`
            : `rotate(-${x} 3 7)`
          : "translate(0, 8)",
      y = (x, M) => {
        let A = h(M),
          N = M ? "end" : "";
        x.each((k, D, B) => {
          fe(B[D]).select("text").attr("transform", A).style("text-anchor", N);
        });
      };
    return (
      (a.orient = (...x) => (x.length ? ((t = x[0]), a) : t)),
      (a.settingName = (...x) => (x.length ? ((r = x[0]), a) : r)),
      (a.domain = (...x) => (x.length ? ((n = x[0]), a) : n)),
      a
    );
  };
var UE = { none: Gg, ordinal: e0, time: Zg, linear: Qg },
  Ge = (e) => {
    let t = null,
      r = "horizontal",
      n = "crossValues",
      a = null,
      o = ["crossValue"],
      i = null,
      u = null,
      l = ["include", "paddingStrategy", "pad"],
      s = {},
      h = (M) => {
        let A = mi(e).excludeType(t).settingName(n).settingValue(a)(),
          N = UE[A],
          k = N.domain().valueNames(o);
        l.forEach((F) => {
          s[F] && k[F] && k[F](s[F]);
        }),
          k.orient && k.orient(r);
        let D = k(M);
        i !== null && (D = i(D)),
          u &&
            typeof D[0] == "number" &&
            ((u[0] = D[0] = Math.min(D[0], u[0])),
            (u[1] = D[1] = Math.max(D[1], u[1])));
        let B = N.component ? y(N, D, M) : x();
        return {
          scale: N.scale(),
          domain: D,
          domainFunction: k,
          labelFunction: N.labelFunction,
          component: {
            bottom: B.bottom,
            left: B.left,
            top: B.top,
            right: B.right,
          },
          size: B.size,
          decorate: B.decorate,
          label: e[n].map((F) => F.name).join(", "),
          tickFormatFunction: N.tickFormatFunction,
        };
      },
      y = (M, A, N) => M.component(e).orient(r).settingName(n).domain(A)(N),
      x = () => ({
        bottom: Jn.axisBottom,
        left: Jn.axisLeft,
        top: Jn.axisTop,
        right: Jn.axisRight,
        decorate: () => {},
      });
    return (
      (h.memoValue = (...M) => (M.length ? ((u = M[0]), h) : u)),
      (h.excludeType = (...M) => (M.length ? ((t = M[0]), h) : t)),
      (h.orient = (...M) => (M.length ? ((r = M[0]), h) : r)),
      (h.settingName = (...M) => (M.length ? ((n = M[0]), h) : n)),
      (h.settingValue = (...M) => (M.length ? ((a = M[0]), h) : a)),
      (h.valueName = (...M) => (M.length ? ((o = [M[0]]), h) : o[0])),
      (h.valueNames = (...M) => (M.length ? ((o = M[0]), h) : o)),
      (h.modifyDomain = (...M) => (M.length ? ((i = M[0]), h) : i)),
      l.forEach((M) => {
        h[M] = (...A) => (A.length ? ((s[M] = A[0]), h) : s[M]);
      }),
      h
    );
  };
var Za = Re(Le()),
  br = (e, t) => SS(e, t, (r, n) => r.svgPlotArea(n), !1),
  xi = (e, t) =>
    SS(
      e,
      t,
      (r, n) => r.canvasPlotArea(n).svgPlotArea(Za.seriesSvgPoint()),
      !0,
    ),
  SS = (e, t, r, n) => {
    let a = null,
      o = null,
      i = Za.chartCartesian({
        xScale: e.scale,
        yScale: t.scale,
        xAxis: e.component,
        yAxis: t.component,
      })
        .xDomain(e.domain)
        .xLabel(e.label)
        .xAxisHeight(e.size)
        .xDecorate(e.decorate)
        .xTickFormat(e.tickFormatFunction)
        .yDomain(t.domain)
        .yLabel(t.label)
        .yAxisWidth(t.size)
        .yDecorate(t.decorate)
        .yOrient("left")
        .yTickFormat(t.tickFormatFunction);
    e.decorate && i.xDecorate(e.decorate),
      t.decorate && i.yDecorate(t.decorate),
      i.xPaddingInner && i.xPaddingInner(1),
      i.xPaddingOuter && i.xPaddingOuter(0.5),
      i.yPaddingInner && i.yPaddingInner(1),
      i.yPaddingOuter && i.yPaddingOuter(0.5),
      (i.axisSplitter = (...l) => (l.length ? ((a = l[0]), i) : a)),
      (i.altAxis = (...l) => (l.length ? ((o = l[0]), i) : o)),
      (i.plotArea = function (...l) {
        return l.length == 0
          ? n
            ? this.canvasPlotArea()
            : this.svgPlotArea()
          : r(this, ...l);
      });
    let u = i.decorate();
    return (
      i.decorate((l, s) => {
        let h = l.select("d3fc-svg.plot-area"),
          y = h.select("svg").node();
        y.setAttribute(
          "viewBox",
          `0 0 ${h.node().clientWidth} ${h.node().clientHeight}`,
        ),
          y.setAttribute("preserveAspectRatio", "none");
        for (let x of ["x-axis", "y-axis"])
          l.select(`d3fc-svg.${x} svg`)
            .node()
            .setAttribute("preserveAspectRatio", "none");
        if ((u(l, s), n)) {
          let x = l.select(".svg-plot-area").node(),
            M = l.select(".canvas-plot-area").node();
          Xl([x, M]).order();
        }
        if (!!a) {
          if (a.haveSplit()) {
            let x = a.altData(),
              M = Za.dataJoin("d3fc-svg", "y2-axis").key((D) => D),
              A = Za.dataJoin("g", "y-series").key((D) => D);
            l.append("div")
              .attr("class", "y-label right-label")
              .style("grid-column", 5)
              .style("-ms-grid-column", 5)
              .style("grid-row", 3)
              .style("-ms-grid-row", 3)
              .style("width", o.size || "1em")
              .style("display", "flex")
              .style("align-items", "center")
              .style("justify-content", "center")
              .append("span")
              .attr("class", "y-label splitter-label")
              .style("transform", "rotate(-90deg)");
            let N = o.scale.domain(o.domain),
              k = o.component.right(N);
            if (
              (k.tickFormat(o.tickFormatFunction),
              o.decorate && k.decorate(o.decorate),
              M(l, ["right"])
                .attr("class", (D) => `y-axis ${D}-axis`)
                .on("measure", function (D, B) {
                  let { width: F, height: R } = D.detail;
                  B === "left" &&
                    fe(D.currentTarget)
                      .select("svg")
                      .attr("viewBox", `${-F} 0 ${F} ${R}`)
                      .attr("preserveAspectRatio", "none"),
                    N.range([R, 0]);
                })
                .on("draw", function (D, B) {
                  fe(D.currentTarget).select("svg").call(k);
                }),
              n)
            ) {
              let D = (B) => {
                let F = i.plotArea();
                F.context(B.node().getContext("2d")).xScale(e.scale);
                let R = [t.scale, N];
                [s, x].forEach((I, L) => {
                  F.yScale(R[L]), F(I);
                });
              };
              l.select("d3fc-canvas.plot-area").on("draw", function (B, F) {
                D(fe(B.currentTarget).select("canvas"));
              });
            } else {
              let D = function (B) {
                let F = i.plotArea();
                F.xScale(e.scale);
                let R = [t.scale, N];
                A(B, [s, x]).each((I, L, $) => {
                  F.yScale(R[L]), fe($[L]).datum(I).call(F);
                });
              };
              l.select("d3fc-svg.plot-area").on("draw", function (B, F) {
                D(fe(B.currentTarget).select("svg"));
              });
            }
          }
          a(l);
        }
      }),
      i
    );
  };
var Sn = Re(Le());
function ht(e, t, r) {
  let n = e.select(t);
  return n.size() > 0 ? n : r();
}
function Zr(e, t, r = "right") {
  if (r === "right" || r === "bottom") return e[r] < t[r];
  if (r === "left" || r === "top") return e[r] > t[r];
  throw `Direction being checked for overflow is invalid: ${r}`;
}
function t0(e, t, r, n = 0) {
  let a = e === "x" ? "width" : "height",
    o = t[e],
    i = t[e] + t[a],
    u = r[e],
    l = r[e] + r[a],
    s = u + n > o && u - n < i,
    h = l + n > o && l - n < i,
    y = u + n < o && l - n > i;
  return s || h || y;
}
var MS = `<ul id="tooltip-values"></ul>
`;
var AS = {
  types: {
    float: {
      filter_operator: "==",
      aggregate: "sum",
      format: {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
    string: { filter_operator: "==", aggregate: "count" },
    integer: { filter_operator: "==", aggregate: "sum", format: {} },
    boolean: { filter_operator: "==", aggregate: "count" },
    datetime: {
      filter_operator: "==",
      aggregate: "count",
      format: { dateStyle: "short", timeStyle: "medium" },
      null_value: -1,
    },
    date: {
      filter_operator: "==",
      aggregate: "count",
      format: { dateStyle: "short" },
      null_value: -1,
    },
  },
};
function bi(e) {
  let t = {};
  if ((kS().types[e] && Object.assign(t, kS().types[e]), t.type)) {
    let r = bi(t.type);
    return Object.assign(r, t), r;
  } else return t;
}
function r0(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function n0(e, ...t) {
  if (!t.length) return e;
  let r = t.shift();
  if (r0(e) && r0(r))
    for (let n in r)
      r0(r[n])
        ? (e[n] || Object.assign(e, { [n]: {} }), n0(e[n], r[n]))
        : Object.assign(e, { [n]: r[n] });
  return n0(e, ...t);
}
function kS() {
  return (
    globalThis.__PERSPECTIVE_CONFIG__ ||
      (globalThis.__PERSPECTIVE_CONFIG__ = n0(
        AS,
        globalThis.__TEMPLATE_CONFIG__ || {},
      )),
    globalThis.__PERSPECTIVE_CONFIG__
  );
}
function _n(e, t) {
  switch (e) {
    case "date":
    case "datetime":
      return t instanceof Date
        ? t
        : new Date(parseInt(t)).toLocaleString([], bi(e).format);
    case "integer":
      return parseInt(t, 10);
    case "float":
      return parseFloat(t);
  }
  return t;
}
function Xc(e, t) {
  return t.crossValues.length === 0
    ? []
    : e.crossValue.length === 0
    ? []
    : (
        (e.crossValue.split ? e.crossValue.split("|") : [e.crossValue]) || [
          e.key,
        ]
      ).map((n, a) => ({
        name: t.crossValues[a].name,
        value: _n(t.crossValues[a].type, n),
      }));
}
function jc(e, t) {
  if (t.splitValues.length === 0) return [];
  let r = [e.mainValue];
  return (
    e.key
      ? (r = e.key.split("|"))
      : e.mainValue?.split && (r = e.mainValue.split("|")),
    t.splitValues.map((n, a) => ({ name: n.name, value: _n(n.type, r[a]) }))
  );
}
function Qc(e, t) {
  return t.mainValues.length > 1
    ? e.mainValues
      ? t.mainValues.map((r, n) => ({
          name: r.name,
          value: _n(r.type, e.mainValues[n]),
        }))
      : t.mainValues.map((r) => ({
          name: r.name,
          value: _n(r.type, e.row[r.name]),
        }))
    : [
        {
          name: t.mainValues[0].name,
          value: _n(
            t.mainValues[0].type,
            e.colorValue ||
              e.mainValue - e.baseValue ||
              e.mainValue ||
              e.mainValues,
          ),
        },
      ];
}
function CS(e, t, r) {
  let n = Xc(t, r).concat(jc(t, r)).concat(Qc(t, r));
  jE(e, n);
}
function jE(e, t) {
  e.select("#tooltip-values")
    .selectAll("li")
    .data(t)
    .join("li")
    .each(function (r) {
      fe(this).text(`${r.name}: `).append("b").text(QE(r.value));
    });
}
var QE = (e) =>
  e == null
    ? "-"
    : e.toLocaleString(void 0, {
        style: "decimal",
        minimumFractionDigits: bi("float").precision,
        maximumFractionDigits: bi("float").precision,
      });
var TS = (e) => [e.name, "==", e.value],
  tf = (e, t, r) => {
    let n = Qc(t, r).map((u) => u.name),
      a = Xc(t, r).map(TS),
      o = jc(t, r).map(TS),
      i = r.filter.concat(a).concat(o);
    e.dispatchEvent(
      new CustomEvent("perspective-click", {
        bubbles: !0,
        composed: !0,
        detail: { column_names: n, config: { filter: i }, row: t.row },
      }),
    );
  },
  VS = () => {
    let e = null,
      t = (r) => {
        let n = r.node();
        r.on("click", (a, o) => tf(n, o, e));
      };
    return (t.settings = (...r) => (r.length ? ((e = r[0]), t) : e)), t;
  };
var ea = () => {
  let e = !1,
    t = null,
    r = null,
    n = !1,
    a = (o) => {
      let i = o.node();
      if (!i || !i.isConnected) {
        NS(t);
        return;
      }
      let u = fe(Kn(i));
      t = KE(u);
      let l = function (h, y) {
          CS(t, y, r);
          let x = o.nodes(),
            M = x.indexOf(this);
          ZE(u.node(), x[M], t, n), fe(x[M]).style("opacity", "0.7");
        },
        s = function (h, y) {
          NS(t);
          let x = o.nodes(),
            M = x.indexOf(this);
          x && fe(x[M]).style("opacity", "1");
        };
      e
        ? o.each(function (h) {
            return l.call(this, void 0, h);
          })
        : (o.on("mouseover", l).on("mouseout", s), VS().settings(r)(o));
    };
  return (
    (a.alwaysShow = (...o) => (o.length ? ((e = o[0]), a) : e)),
    (a.centered = (...o) => (o.length ? ((n = o[0]), a) : n)),
    (a.settings = (...o) => (o.length ? ((r = o[0]), a) : r)),
    a
  );
};
function KE(e) {
  return ht(e, "div.tooltip", () =>
    e
      .append("div")
      .attr("class", "tooltip")
      .style("z-index", 3)
      .style("opacity", 0)
      .html(MS),
  );
}
function ZE(e, t, r, n) {
  let a = e.getBoundingClientRect(),
    o = t.getBoundingClientRect(),
    i = o.left + o.width / 2 - a.left,
    u = o.top - a.top + e.scrollTop;
  n && (u = o.top + o.height / 2 - a.top + e.scrollTop),
    r.style("left", `${i}px`).style("top", `${u}px`).style("opacity", 0.9),
    n && ([i, u] = JE(r, a)),
    eI(r, a, i, u, n);
}
function JE(e, t) {
  let r = e.node().getBoundingClientRect(),
    n = r.width / 2,
    a = r.left - n - t.left;
  e.style("left", `${a}px`);
  let o = r.height / 2,
    i = r.top - o - t.top;
  return e.style("top", `${i}px`), [a, i];
}
function eI(e, t, r, n, a = !1) {
  let o = e.node().getBoundingClientRect();
  if (Zr(t, o)) {
    let i = o.right - t.right;
    e.style("left", `${r - i}px`);
  }
  if (Zr(t, o, "bottom")) {
    let i = o.bottom - t.bottom;
    e.style("top", `${n - i}px`);
  }
  if (!!a) {
    if (Zr(t, o, "left")) {
      let i = o.left - t.left;
      e.style("left", `${r - i}px`);
    }
    if (Zr(t, o, "top")) {
      let i = o.top - t.top;
      e.style("top", `${n - i}px`);
    }
  }
}
function NS(e) {
  e && e.style("opacity", 0);
}
function Kc(e, t) {
  let r =
    e.mainValues.length > 1
      ? Sn.seriesSvgGrouped(Sn.seriesSvgBar())
      : Sn.seriesSvgBar();
  return (
    (r = r.decorate((n) => {
      ea().settings(e)(n), n.style("fill", (a) => t(a.key));
    })),
    Sn.autoBandwidth(tI(r))
      .crossValue((n) => n.crossValue)
      .mainValue((n) => (n.mainValue ? n.mainValue : 0))
      .baseValue((n) => n.baseValue)
  );
}
var tI = (e) => {
  let t = (r) => e(r);
  return (
    Sn.rebindAll(t, e),
    (t.bandwidth = (...r) =>
      r.length ? (e.bandwidth(Math.max(r[0], 1)), t) : e.bandwidth()),
    t
  );
};
function ta(e) {
  return e.split("|").slice(0, -1).join("|");
}
function Jr(e) {
  let t = e.data && e.data.length > 0 ? e.data[0] : {},
    r = Object.keys(t).filter((n) => n !== "__ROW_PATH__");
  return Nr().settings(e).domain(r)();
}
function DS(e, t) {
  let r = e.data,
    n = e.realValues[t],
    a = r
      .reduce((o, i) => {
        let u = i[n];
        return o.includes(u) ? o : [...o, u];
      }, [])
      .sort();
  return Nr().settings(e).domain(a)();
}
function yi(e, t) {
  let r = Array.from(new Set(t));
  return Nr().settings(e).domain(r)();
}
function ES(e) {
  let t = e.data[0] ?? {},
    r = Object.keys(t).reduce((n, a) => {
      if (a === "__ROW_PATH__") return n;
      let o = ta(a);
      return n.includes(o) ? n : [...n, o];
    }, []);
  return Nr().settings(e).domain(r)();
}
function Nr() {
  let e = null,
    t = null,
    r = {},
    n = (o) => Ja(o, r.colorStyles && r.colorStyles.opacity),
    a = () => {
      let o = r.colorStyles,
        i = t || [o.series];
      if (i || e.length > 1) {
        let u = e.length > 1 ? o.scheme : i;
        return fr(u.map(n)).domain(e);
      }
      return null;
    };
  return (
    (a.domain = (...o) => (o.length ? ((e = o[0]), a) : e)),
    (a.defaultColors = (...o) => (o.length ? ((t = o[0]), a) : t)),
    (a.mapFunction = (...o) => (o.length ? ((n = o[0]), a) : n)),
    (a.settings = (...o) => (o.length ? ((r = o[0]), a) : r)),
    a
  );
}
function en(e) {
  return eo(1)(e);
}
function Ja(e, t = 0.5) {
  return eo(t)(e);
}
function eo(e) {
  return (t) => {
    let r = Tt(t);
    return r != null && (r.opacity = e), r + "";
  };
}
var IS = Re(Le());
var rI = { none: $g, ordinal: Jg, time: Kg, linear: jg },
  yr = (e) => {
    let t = mi(e),
      r = "__ROW_PATH__",
      n = (a, o) => rI[t()](r)(a, o);
    return (
      (0, IS.rebindAll)(n, t),
      (n.valueName = (...a) => (a.length ? ((r = a[0]), n) : r)),
      n
    );
  };
function to(e, t, { stack: r = !1, excludeEmpty: n = !1 } = {}) {
  let a = t || e.data;
  return e.splitValues.length > 0
    ? nI(e, a, { stack: r, excludeEmpty: n })
    : [a];
}
function nI(e, t, { stack: r = !1, excludeEmpty: n = !1 }) {
  let a = {};
  return (
    t.forEach((o) => {
      let i = {},
        u = {};
      Object.keys(o)
        .filter((l) => l !== "__ROW_PATH__")
        .filter((l) => !n || (o[l] != null && o[l] != null))
        .forEach((l) => {
          let s = l.split("|"),
            h = s[s.length - 1],
            y = o[l] || 0,
            x = `${h}${y >= 0 ? "+ve" : "-ve"}`,
            M = s.slice(0, s.length - 1).join("|"),
            A = (u[M] = u[M] || { __ROW_PATH__: o.__ROW_PATH__ }),
            N = i[x] || 0;
          (A.__KEY__ = M),
            r
              ? ((A[h] = N + y), (A[`__BASE_VALUE__${h}`] = N), (i[x] = A[h]))
              : (A[h] = y),
            (A.row = o);
        }),
        Object.keys(u).forEach((l) => {
          (a[l] = a[l] || []).push(u[l]);
        });
    }),
    Object.keys(a).map((o) => {
      let i = a[o];
      return (i.key = o), i;
    })
  );
}
function zS(e, t) {
  let r = { stack: !1 },
    n = to(e, t, r).map((a) => PS(e, a, r));
  return e.mainValues.length > 1 ? n.reduce((o, i) => o.concat(i)) : n;
}
function Zc(e, t) {
  let r = { stack: !0 };
  return to(e, t, r).map((n) => PS(e, n, r));
}
function aI(e, t, { stack: r = !1 }) {
  let n = yr(e);
  return (a) => {
    let o = (u) => (r && u[`__BASE_VALUE__${a.name}`]) || 0,
      i = t.map((u, l) => ({
        crossValue: n(u, l),
        mainValue: u[a.name] ? u[a.name] : null,
        baseValue: o(u),
        key: u.__KEY__ ? `${u.__KEY__}|${a.name}` : a.name,
        row: u.row || u,
      }));
    return (i.key = i[0].key), i;
  };
}
function PS(e, t, { stack: r = !1 }) {
  let n = aI(e, t, { stack: r });
  return e.mainValues.length > 1 ? e.mainValues.map(n) : n(e.mainValues[0]);
}
var Jc = "http://www.w3.org/1999/xhtml",
  es = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: Jc,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
  };
function rf(e) {
  var t = (e += ""),
    r = t.indexOf(":");
  return (
    r >= 0 && (t = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)),
    es.hasOwnProperty(t) ? { space: es[t], local: e } : e
  );
}
function oI(e) {
  return function () {
    var t = this.ownerDocument,
      r = this.namespaceURI;
    return r === Jc && t.documentElement.namespaceURI === Jc
      ? t.createElement(e)
      : t.createElementNS(r, e);
  };
}
function iI(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function nf(e) {
  var t = rf(e);
  return (t.local ? iI : oI)(t);
}
var uI = 0;
function o0() {
  return new a0();
}
function a0() {
  this._ = "@" + (++uI).toString(36);
}
a0.prototype = o0.prototype = {
  constructor: a0,
  get: function (e) {
    for (var t = this._; !(t in e); ) if (!(e = e.parentNode)) return;
    return e[t];
  },
  set: function (e, t) {
    return (e[this._] = t);
  },
  remove: function (e) {
    return this._ in e && delete e[this._];
  },
  toString: function () {
    return this._;
  },
};
var LS = function (e) {
  return function () {
    return this.matches(e);
  };
};
typeof document < "u" &&
  ((wi = document.documentElement),
  wi.matches ||
    ((RS =
      wi.webkitMatchesSelector ||
      wi.msMatchesSelector ||
      wi.mozMatchesSelector ||
      wi.oMatchesSelector),
    (LS = function (e) {
      return function () {
        return RS.call(this, e);
      };
    })));
var wi,
  RS,
  i0 = LS;
var BS = {},
  af = null;
typeof document < "u" &&
  ((OS = document.documentElement),
  "onmouseenter" in OS ||
    (BS = { mouseenter: "mouseover", mouseleave: "mouseout" }));
var OS;
function fI(e, t, r) {
  return (
    (e = FS(e, t, r)),
    function (n) {
      var a = n.relatedTarget;
      (!a || (a !== this && !(a.compareDocumentPosition(this) & 8))) &&
        e.call(this, n);
    }
  );
}
function FS(e, t, r) {
  return function (n) {
    var a = af;
    af = n;
    try {
      e.call(this, this.__data__, t, r);
    } finally {
      af = a;
    }
  };
}
function lI(e) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var r = "",
        n = t.indexOf(".");
      return (
        n >= 0 && ((r = t.slice(n + 1)), (t = t.slice(0, n))),
        { type: t, name: r }
      );
    });
}
function cI(e) {
  return function () {
    var t = this.__on;
    if (!!t) {
      for (var r = 0, n = -1, a = t.length, o; r < a; ++r)
        (o = t[r]),
          (!e.type || o.type === e.type) && o.name === e.name
            ? this.removeEventListener(o.type, o.listener, o.capture)
            : (t[++n] = o);
      ++n ? (t.length = n) : delete this.__on;
    }
  };
}
function sI(e, t, r) {
  var n = BS.hasOwnProperty(e.type) ? fI : FS;
  return function (a, o, i) {
    var u = this.__on,
      l,
      s = n(t, o, i);
    if (u) {
      for (var h = 0, y = u.length; h < y; ++h)
        if ((l = u[h]).type === e.type && l.name === e.name) {
          this.removeEventListener(l.type, l.listener, l.capture),
            this.addEventListener(l.type, (l.listener = s), (l.capture = r)),
            (l.value = t);
          return;
        }
    }
    this.addEventListener(e.type, s, r),
      (l = { type: e.type, name: e.name, value: t, listener: s, capture: r }),
      u ? u.push(l) : (this.__on = [l]);
  };
}
function HS(e, t, r) {
  var n = lI(e + ""),
    a,
    o = n.length,
    i;
  if (arguments.length < 2) {
    var u = this.node().__on;
    if (u) {
      for (var l = 0, s = u.length, h; l < s; ++l)
        for (a = 0, h = u[l]; a < o; ++a)
          if ((i = n[a]).type === h.type && i.name === h.name) return h.value;
    }
    return;
  }
  for (u = t ? sI : cI, r == null && (r = !1), a = 0; a < o; ++a)
    this.each(u(n[a], t, r));
  return this;
}
function dI() {}
function of(e) {
  return e == null
    ? dI
    : function () {
        return this.querySelector(e);
      };
}
function WS(e) {
  typeof e != "function" && (e = of(e));
  for (var t = this._groups, r = t.length, n = new Array(r), a = 0; a < r; ++a)
    for (
      var o = t[a], i = o.length, u = (n[a] = new Array(i)), l, s, h = 0;
      h < i;
      ++h
    )
      (l = o[h]) &&
        (s = e.call(l, l.__data__, h, o)) &&
        ("__data__" in l && (s.__data__ = l.__data__), (u[h] = s));
  return new Je(n, this._parents);
}
function mI() {
  return [];
}
function u0(e) {
  return e == null
    ? mI
    : function () {
        return this.querySelectorAll(e);
      };
}
function $S(e) {
  typeof e != "function" && (e = u0(e));
  for (var t = this._groups, r = t.length, n = [], a = [], o = 0; o < r; ++o)
    for (var i = t[o], u = i.length, l, s = 0; s < u; ++s)
      (l = i[s]) && (n.push(e.call(l, l.__data__, s, i)), a.push(l));
  return new Je(n, a);
}
function GS(e) {
  typeof e != "function" && (e = i0(e));
  for (var t = this._groups, r = t.length, n = new Array(r), a = 0; a < r; ++a)
    for (var o = t[a], i = o.length, u = (n[a] = []), l, s = 0; s < i; ++s)
      (l = o[s]) && e.call(l, l.__data__, s, o) && u.push(l);
  return new Je(n, this._parents);
}
function ts(e) {
  return new Array(e.length);
}
function US() {
  return new Je(this._enter || this._groups.map(ts), this._parents);
}
function uf(e, t) {
  (this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = t);
}
uf.prototype = {
  constructor: uf,
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
function XS(e) {
  return function () {
    return e;
  };
}
var jS = "$";
function hI(e, t, r, n, a, o) {
  for (var i = 0, u, l = t.length, s = o.length; i < s; ++i)
    (u = t[i]) ? ((u.__data__ = o[i]), (n[i] = u)) : (r[i] = new uf(e, o[i]));
  for (; i < l; ++i) (u = t[i]) && (a[i] = u);
}
function pI(e, t, r, n, a, o, i) {
  var u,
    l,
    s = {},
    h = t.length,
    y = o.length,
    x = new Array(h),
    M;
  for (u = 0; u < h; ++u)
    (l = t[u]) &&
      ((x[u] = M = jS + i.call(l, l.__data__, u, t)),
      M in s ? (a[u] = l) : (s[M] = l));
  for (u = 0; u < y; ++u)
    (M = jS + i.call(e, o[u], u, o)),
      (l = s[M])
        ? ((n[u] = l), (l.__data__ = o[u]), (s[M] = null))
        : (r[u] = new uf(e, o[u]));
  for (u = 0; u < h; ++u) (l = t[u]) && s[x[u]] === l && (a[u] = l);
}
function QS(e, t) {
  if (!e)
    return (
      (M = new Array(this.size())),
      (s = -1),
      this.each(function (L) {
        M[++s] = L;
      }),
      M
    );
  var r = t ? pI : hI,
    n = this._parents,
    a = this._groups;
  typeof e != "function" && (e = XS(e));
  for (
    var o = a.length,
      i = new Array(o),
      u = new Array(o),
      l = new Array(o),
      s = 0;
    s < o;
    ++s
  ) {
    var h = n[s],
      y = a[s],
      x = y.length,
      M = e.call(h, h && h.__data__, s, n),
      A = M.length,
      N = (u[s] = new Array(A)),
      k = (i[s] = new Array(A)),
      D = (l[s] = new Array(x));
    r(h, y, N, k, D, M, t);
    for (var B = 0, F = 0, R, I; B < A; ++B)
      if ((R = N[B])) {
        for (B >= F && (F = B + 1); !(I = k[F]) && ++F < A; );
        R._next = I || null;
      }
  }
  return (i = new Je(i, n)), (i._enter = u), (i._exit = l), i;
}
function KS() {
  return new Je(this._exit || this._groups.map(ts), this._parents);
}
function ZS(e) {
  for (
    var t = this._groups,
      r = e._groups,
      n = t.length,
      a = r.length,
      o = Math.min(n, a),
      i = new Array(n),
      u = 0;
    u < o;
    ++u
  )
    for (
      var l = t[u], s = r[u], h = l.length, y = (i[u] = new Array(h)), x, M = 0;
      M < h;
      ++M
    )
      (x = l[M] || s[M]) && (y[M] = x);
  for (; u < n; ++u) i[u] = t[u];
  return new Je(i, this._parents);
}
function JS() {
  for (var e = this._groups, t = -1, r = e.length; ++t < r; )
    for (var n = e[t], a = n.length - 1, o = n[a], i; --a >= 0; )
      (i = n[a]) &&
        (o && o !== i.nextSibling && o.parentNode.insertBefore(i, o), (o = i));
  return this;
}
function e7(e) {
  e || (e = gI);
  function t(y, x) {
    return y && x ? e(y.__data__, x.__data__) : !y - !x;
  }
  for (
    var r = this._groups, n = r.length, a = new Array(n), o = 0;
    o < n;
    ++o
  ) {
    for (
      var i = r[o], u = i.length, l = (a[o] = new Array(u)), s, h = 0;
      h < u;
      ++h
    )
      (s = i[h]) && (l[h] = s);
    l.sort(t);
  }
  return new Je(a, this._parents).order();
}
function gI(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function t7() {
  var e = arguments[0];
  return (arguments[0] = this), e.apply(null, arguments), this;
}
function r7() {
  var e = new Array(this.size()),
    t = -1;
  return (
    this.each(function () {
      e[++t] = this;
    }),
    e
  );
}
function n7() {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var n = e[t], a = 0, o = n.length; a < o; ++a) {
      var i = n[a];
      if (i) return i;
    }
  return null;
}
function a7() {
  var e = 0;
  return (
    this.each(function () {
      ++e;
    }),
    e
  );
}
function o7() {
  return !this.node();
}
function i7(e) {
  for (var t = this._groups, r = 0, n = t.length; r < n; ++r)
    for (var a = t[r], o = 0, i = a.length, u; o < i; ++o)
      (u = a[o]) && e.call(u, u.__data__, o, a);
  return this;
}
function vI(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function xI(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function bI(e, t) {
  return function () {
    this.setAttribute(e, t);
  };
}
function yI(e, t) {
  return function () {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function wI(e, t) {
  return function () {
    var r = t.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function _I(e, t) {
  return function () {
    var r = t.apply(this, arguments);
    r == null
      ? this.removeAttributeNS(e.space, e.local)
      : this.setAttributeNS(e.space, e.local, r);
  };
}
function u7(e, t) {
  var r = rf(e);
  if (arguments.length < 2) {
    var n = this.node();
    return r.local ? n.getAttributeNS(r.space, r.local) : n.getAttribute(r);
  }
  return this.each(
    (t == null
      ? r.local
        ? xI
        : vI
      : typeof t == "function"
      ? r.local
        ? _I
        : wI
      : r.local
      ? yI
      : bI)(r, t),
  );
}
function ff(e) {
  return (
    (e.ownerDocument && e.ownerDocument.defaultView) ||
    (e.document && e) ||
    e.defaultView
  );
}
function SI(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function MI(e, t, r) {
  return function () {
    this.style.setProperty(e, t, r);
  };
}
function AI(e, t, r) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, r);
  };
}
function f7(e, t, r) {
  var n;
  return arguments.length > 1
    ? this.each(
        (t == null ? SI : typeof t == "function" ? AI : MI)(e, t, r ?? ""),
      )
    : ff((n = this.node()))
        .getComputedStyle(n, null)
        .getPropertyValue(e);
}
function kI(e) {
  return function () {
    delete this[e];
  };
}
function CI(e, t) {
  return function () {
    this[e] = t;
  };
}
function TI(e, t) {
  return function () {
    var r = t.apply(this, arguments);
    r == null ? delete this[e] : (this[e] = r);
  };
}
function l7(e, t) {
  return arguments.length > 1
    ? this.each((t == null ? kI : typeof t == "function" ? TI : CI)(e, t))
    : this.node()[e];
}
function c7(e) {
  return e.trim().split(/^|\s+/);
}
function f0(e) {
  return e.classList || new s7(e);
}
function s7(e) {
  (this._node = e), (this._names = c7(e.getAttribute("class") || ""));
}
s7.prototype = {
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
function d7(e, t) {
  for (var r = f0(e), n = -1, a = t.length; ++n < a; ) r.add(t[n]);
}
function m7(e, t) {
  for (var r = f0(e), n = -1, a = t.length; ++n < a; ) r.remove(t[n]);
}
function VI(e) {
  return function () {
    d7(this, e);
  };
}
function NI(e) {
  return function () {
    m7(this, e);
  };
}
function DI(e, t) {
  return function () {
    (t.apply(this, arguments) ? d7 : m7)(this, e);
  };
}
function h7(e, t) {
  var r = c7(e + "");
  if (arguments.length < 2) {
    for (var n = f0(this.node()), a = -1, o = r.length; ++a < o; )
      if (!n.contains(r[a])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? DI : t ? VI : NI)(r, t));
}
function EI() {
  this.textContent = "";
}
function II(e) {
  return function () {
    this.textContent = e;
  };
}
function zI(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function p7(e) {
  return arguments.length
    ? this.each(e == null ? EI : (typeof e == "function" ? zI : II)(e))
    : this.node().textContent;
}
function PI() {
  this.innerHTML = "";
}
function RI(e) {
  return function () {
    this.innerHTML = e;
  };
}
function LI(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function g7(e) {
  return arguments.length
    ? this.each(e == null ? PI : (typeof e == "function" ? LI : RI)(e))
    : this.node().innerHTML;
}
function OI() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function v7() {
  return this.each(OI);
}
function BI() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function x7() {
  return this.each(BI);
}
function b7(e) {
  var t = typeof e == "function" ? e : nf(e);
  return this.select(function () {
    return this.appendChild(t.apply(this, arguments));
  });
}
function FI() {
  return null;
}
function y7(e, t) {
  var r = typeof e == "function" ? e : nf(e),
    n = t == null ? FI : typeof t == "function" ? t : of(t);
  return this.select(function () {
    return this.insertBefore(
      r.apply(this, arguments),
      n.apply(this, arguments) || null,
    );
  });
}
function HI() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function w7() {
  return this.each(HI);
}
function _7(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function S7(e, t, r) {
  var n = ff(e),
    a = n.CustomEvent;
  a
    ? (a = new a(t, r))
    : ((a = n.document.createEvent("Event")),
      r
        ? (a.initEvent(t, r.bubbles, r.cancelable), (a.detail = r.detail))
        : a.initEvent(t, !1, !1)),
    e.dispatchEvent(a);
}
function YI(e, t) {
  return function () {
    return S7(this, e, t);
  };
}
function qI(e, t) {
  return function () {
    return S7(this, e, t.apply(this, arguments));
  };
}
function M7(e, t) {
  return this.each((typeof t == "function" ? qI : YI)(e, t));
}
var rs = [null];
function Je(e, t) {
  (this._groups = e), (this._parents = t);
}
function WI() {
  return new Je([[document.documentElement]], rs);
}
Je.prototype = WI.prototype = {
  constructor: Je,
  select: WS,
  selectAll: $S,
  filter: GS,
  data: QS,
  enter: US,
  exit: KS,
  merge: ZS,
  order: JS,
  sort: e7,
  call: t7,
  nodes: r7,
  node: n7,
  size: a7,
  empty: o7,
  each: i7,
  attr: u7,
  style: f7,
  property: l7,
  classed: h7,
  text: p7,
  html: g7,
  raise: v7,
  lower: x7,
  append: b7,
  insert: y7,
  remove: w7,
  datum: _7,
  on: HS,
  dispatch: M7,
};
function l0(e) {
  return typeof e == "string"
    ? new Je([[document.querySelector(e)]], [document.documentElement])
    : new Je([[e]], rs);
}
function ro(e, t) {
  if (
    (r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0
  )
    return null;
  var r,
    n = e.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)];
}
function lf(e) {
  return (e = ro(Math.abs(e))), e ? e[1] : NaN;
}
function A7(e, t) {
  return function (r, n) {
    for (
      var a = r.length, o = [], i = 0, u = e[0], l = 0;
      a > 0 &&
      u > 0 &&
      (l + u + 1 > n && (u = Math.max(1, n - l)),
      o.push(r.substring((a -= u), a + u)),
      !((l += u + 1) > n));

    )
      u = e[(i = (i + 1) % e.length)];
    return o.reverse().join(t);
  };
}
function k7(e, t) {
  e = e.toPrecision(t);
  e: for (var r = e.length, n = 1, a = -1, o; n < r; ++n)
    switch (e[n]) {
      case ".":
        a = o = n;
        break;
      case "0":
        a === 0 && (a = n), (o = n);
        break;
      case "e":
        break e;
      default:
        a > 0 && (a = 0);
        break;
    }
  return a > 0 ? e.slice(0, a) + e.slice(o + 1) : e;
}
var c0;
function C7(e, t) {
  var r = ro(e, t);
  if (!r) return e + "";
  var n = r[0],
    a = r[1],
    o = a - (c0 = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1,
    i = n.length;
  return o === i
    ? n
    : o > i
    ? n + new Array(o - i + 1).join("0")
    : o > 0
    ? n.slice(0, o) + "." + n.slice(o)
    : "0." + new Array(1 - o).join("0") + ro(e, Math.max(0, t + o - 1))[0];
}
function s0(e, t) {
  var r = ro(e, t);
  if (!r) return e + "";
  var n = r[0],
    a = r[1];
  return a < 0
    ? "0." + new Array(-a).join("0") + n
    : n.length > a + 1
    ? n.slice(0, a + 1) + "." + n.slice(a + 1)
    : n + new Array(a - n.length + 2).join("0");
}
var ns = {
  "": k7,
  "%": function (e, t) {
    return (e * 100).toFixed(t);
  },
  b: function (e) {
    return Math.round(e).toString(2);
  },
  c: function (e) {
    return e + "";
  },
  d: function (e) {
    return Math.round(e).toString(10);
  },
  e: function (e, t) {
    return e.toExponential(t);
  },
  f: function (e, t) {
    return e.toFixed(t);
  },
  g: function (e, t) {
    return e.toPrecision(t);
  },
  o: function (e) {
    return Math.round(e).toString(8);
  },
  p: function (e, t) {
    return s0(e * 100, t);
  },
  r: s0,
  s: C7,
  X: function (e) {
    return Math.round(e).toString(16).toUpperCase();
  },
  x: function (e) {
    return Math.round(e).toString(16);
  },
};
var $I =
  /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
function no(e) {
  return new T7(e);
}
function T7(e) {
  if (!(t = $I.exec(e))) throw new Error("invalid format: " + e);
  var t,
    r = t[1] || " ",
    n = t[2] || ">",
    a = t[3] || "-",
    o = t[4] || "",
    i = !!t[5],
    u = t[6] && +t[6],
    l = !!t[7],
    s = t[8] && +t[8].slice(1),
    h = t[9] || "";
  h === "n" ? ((l = !0), (h = "g")) : ns[h] || (h = ""),
    (i || (r === "0" && n === "=")) && ((i = !0), (r = "0"), (n = "=")),
    (this.fill = r),
    (this.align = n),
    (this.sign = a),
    (this.symbol = o),
    (this.zero = i),
    (this.width = u),
    (this.comma = l),
    (this.precision = s),
    (this.type = h);
}
T7.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? "0" : "") +
    (this.width == null ? "" : Math.max(1, this.width | 0)) +
    (this.comma ? "," : "") +
    (this.precision == null ? "" : "." + Math.max(0, this.precision | 0)) +
    this.type
  );
};
var V7 = [
  "y",
  "z",
  "a",
  "f",
  "p",
  "n",
  "\xB5",
  "m",
  "",
  "k",
  "M",
  "G",
  "T",
  "P",
  "E",
  "Z",
  "Y",
];
function GI(e) {
  return e;
}
function _i(e) {
  var t = e.grouping && e.thousands ? A7(e.grouping, e.thousands) : GI,
    r = e.currency,
    n = e.decimal;
  function a(i) {
    i = no(i);
    var u = i.fill,
      l = i.align,
      s = i.sign,
      h = i.symbol,
      y = i.zero,
      x = i.width,
      M = i.comma,
      A = i.precision,
      N = i.type,
      k =
        h === "$"
          ? r[0]
          : h === "#" && /[boxX]/.test(N)
          ? "0" + N.toLowerCase()
          : "",
      D = h === "$" ? r[1] : /[%p]/.test(N) ? "%" : "",
      B = ns[N],
      F = !N || /[defgprs%]/.test(N);
    A =
      A == null
        ? N
          ? 6
          : 12
        : /[gprs]/.test(N)
        ? Math.max(1, Math.min(21, A))
        : Math.max(0, Math.min(20, A));
    function R(I) {
      var L = k,
        $ = D,
        G,
        ue,
        ne;
      if (N === "c") ($ = B(I) + $), (I = "");
      else {
        I = +I;
        var U = (I < 0 || 1 / I < 0) && ((I *= -1), !0);
        if (((I = B(I, A)), U)) {
          for (G = -1, ue = I.length, U = !1; ++G < ue; )
            if (
              ((ne = I.charCodeAt(G)),
              (48 < ne && ne < 58) ||
                (N === "x" && 96 < ne && ne < 103) ||
                (N === "X" && 64 < ne && ne < 71))
            ) {
              U = !0;
              break;
            }
        }
        if (
          ((L =
            (U ? (s === "(" ? s : "-") : s === "-" || s === "(" ? "" : s) + L),
          ($ =
            $ +
            (N === "s" ? V7[8 + c0 / 3] : "") +
            (U && s === "(" ? ")" : "")),
          F)
        ) {
          for (G = -1, ue = I.length; ++G < ue; )
            if (((ne = I.charCodeAt(G)), 48 > ne || ne > 57)) {
              ($ = (ne === 46 ? n + I.slice(G + 1) : I.slice(G)) + $),
                (I = I.slice(0, G));
              break;
            }
        }
      }
      M && !y && (I = t(I, 1 / 0));
      var ae = L.length + I.length + $.length,
        J = ae < x ? new Array(x - ae + 1).join(u) : "";
      switch (
        (M && y && ((I = t(J + I, J.length ? x - $.length : 1 / 0)), (J = "")),
        l)
      ) {
        case "<":
          return L + I + $ + J;
        case "=":
          return L + J + I + $;
        case "^":
          return J.slice(0, (ae = J.length >> 1)) + L + I + $ + J.slice(ae);
      }
      return J + L + I + $;
    }
    return (
      (R.toString = function () {
        return i + "";
      }),
      R
    );
  }
  function o(i, u) {
    var l = a(((i = no(i)), (i.type = "f"), i)),
      s = Math.max(-8, Math.min(8, Math.floor(lf(u) / 3))) * 3,
      h = Math.pow(10, -s),
      y = V7[8 + s / 3];
    return function (x) {
      return l(h * x) + y;
    };
  }
  return { format: a, formatPrefix: o };
}
var as, os, is;
d0({ decimal: ".", thousands: ",", grouping: [3], currency: ["$", ""] });
function d0(e) {
  return (as = _i(e)), (os = as.format), (is = as.formatPrefix), as;
}
var UI = { value: function () {} };
function D7() {
  for (var e = 0, t = arguments.length, r = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in r)
      throw new Error("illegal type: " + n);
    r[n] = [];
  }
  return new us(r);
}
function us(e) {
  this._ = e;
}
function XI(e, t) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (r) {
      var n = "",
        a = r.indexOf(".");
      if (
        (a >= 0 && ((n = r.slice(a + 1)), (r = r.slice(0, a))),
        r && !t.hasOwnProperty(r))
      )
        throw new Error("unknown type: " + r);
      return { type: r, name: n };
    });
}
us.prototype = D7.prototype = {
  constructor: us,
  on: function (e, t) {
    var r = this._,
      n = XI(e + "", r),
      a,
      o = -1,
      i = n.length;
    if (arguments.length < 2) {
      for (; ++o < i; )
        if ((a = (e = n[o]).type) && (a = jI(r[a], e.name))) return a;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++o < i; )
      if ((a = (e = n[o]).type)) r[a] = N7(r[a], e.name, t);
      else if (t == null) for (a in r) r[a] = N7(r[a], e.name, null);
    return this;
  },
  copy: function () {
    var e = {},
      t = this._;
    for (var r in t) e[r] = t[r].slice();
    return new us(e);
  },
  call: function (e, t) {
    if ((a = arguments.length - 2) > 0)
      for (var r = new Array(a), n = 0, a, o; n < a; ++n)
        r[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (o = this._[e], n = 0, a = o.length; n < a; ++n) o[n].value.apply(t, r);
  },
  apply: function (e, t, r) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], a = 0, o = n.length; a < o; ++a)
      n[a].value.apply(t, r);
  },
};
function jI(e, t) {
  for (var r = 0, n = e.length, a; r < n; ++r)
    if ((a = e[r]).name === t) return a.value;
}
function N7(e, t, r) {
  for (var n = 0, a = e.length; n < a; ++n)
    if (e[n].name === t) {
      (e[n] = UI), (e = e.slice(0, n).concat(e.slice(n + 1)));
      break;
    }
  return r != null && e.push({ name: t, value: r }), e;
}
var fs = D7;
function Mn(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ls(e) {
  return (
    e.length === 1 && (e = QI(e)),
    {
      left: function (t, r, n, a) {
        for (n == null && (n = 0), a == null && (a = t.length); n < a; ) {
          var o = (n + a) >>> 1;
          e(t[o], r) < 0 ? (n = o + 1) : (a = o);
        }
        return n;
      },
      right: function (t, r, n, a) {
        for (n == null && (n = 0), a == null && (a = t.length); n < a; ) {
          var o = (n + a) >>> 1;
          e(t[o], r) > 0 ? (a = o) : (n = o + 1);
        }
        return n;
      },
    }
  );
}
function QI(e) {
  return function (t, r) {
    return Mn(e(t), r);
  };
}
var E7 = ls(Mn),
  I7 = E7.right,
  KI = E7.left,
  ao = I7;
var z7 = Array.prototype,
  JI = z7.slice,
  ez = z7.map;
var m0 = Math.sqrt(50),
  h0 = Math.sqrt(10),
  p0 = Math.sqrt(2);
function ss(e, t, r) {
  var n,
    a = -1,
    o,
    i,
    u;
  if (((t = +t), (e = +e), (r = +r), e === t && r > 0)) return [e];
  if (
    ((n = t < e) && ((o = e), (e = t), (t = o)),
    (u = P7(e, t, r)) === 0 || !isFinite(u))
  )
    return [];
  if (u > 0)
    for (
      e = Math.ceil(e / u),
        t = Math.floor(t / u),
        i = new Array((o = Math.ceil(t - e + 1)));
      ++a < o;

    )
      i[a] = (e + a) * u;
  else
    for (
      e = Math.floor(e * u),
        t = Math.ceil(t * u),
        i = new Array((o = Math.ceil(e - t + 1)));
      ++a < o;

    )
      i[a] = (e - a) / u;
  return n && i.reverse(), i;
}
function P7(e, t, r) {
  var n = (t - e) / Math.max(0, r),
    a = Math.floor(Math.log(n) / Math.LN10),
    o = n / Math.pow(10, a);
  return a >= 0
    ? (o >= m0 ? 10 : o >= h0 ? 5 : o >= p0 ? 2 : 1) * Math.pow(10, a)
    : -Math.pow(10, -a) / (o >= m0 ? 10 : o >= h0 ? 5 : o >= p0 ? 2 : 1);
}
function ra(e, t, r) {
  var n = Math.abs(t - e) / Math.max(0, r),
    a = Math.pow(10, Math.floor(Math.log(n) / Math.LN10)),
    o = n / a;
  return (
    o >= m0 ? (a *= 10) : o >= h0 ? (a *= 5) : o >= p0 && (a *= 2),
    t < e ? -a : a
  );
}
var Jt = "$";
function ds() {}
ds.prototype = L7.prototype = {
  constructor: ds,
  has: function (e) {
    return Jt + e in this;
  },
  get: function (e) {
    return this[Jt + e];
  },
  set: function (e, t) {
    return (this[Jt + e] = t), this;
  },
  remove: function (e) {
    var t = Jt + e;
    return t in this && delete this[t];
  },
  clear: function () {
    for (var e in this) e[0] === Jt && delete this[e];
  },
  keys: function () {
    var e = [];
    for (var t in this) t[0] === Jt && e.push(t.slice(1));
    return e;
  },
  values: function () {
    var e = [];
    for (var t in this) t[0] === Jt && e.push(this[t]);
    return e;
  },
  entries: function () {
    var e = [];
    for (var t in this)
      t[0] === Jt && e.push({ key: t.slice(1), value: this[t] });
    return e;
  },
  size: function () {
    var e = 0;
    for (var t in this) t[0] === Jt && ++e;
    return e;
  },
  empty: function () {
    for (var e in this) if (e[0] === Jt) return !1;
    return !0;
  },
  each: function (e) {
    for (var t in this) t[0] === Jt && e(this[t], t.slice(1), this);
  },
};
function L7(e, t) {
  var r = new ds();
  if (e instanceof ds)
    e.each(function (u, l) {
      r.set(l, u);
    });
  else if (Array.isArray(e)) {
    var n = -1,
      a = e.length,
      o;
    if (t == null) for (; ++n < a; ) r.set(n, e[n]);
    else for (; ++n < a; ) r.set(t((o = e[n]), n, e), o);
  } else if (e) for (var i in e) r.set(i, e[i]);
  return r;
}
var cf = L7;
function ms() {}
var oo = cf.prototype;
ms.prototype = iz.prototype = {
  constructor: ms,
  has: oo.has,
  add: function (e) {
    return (e += ""), (this[Jt + e] = e), this;
  },
  remove: oo.remove,
  clear: oo.clear,
  values: oo.keys,
  size: oo.size,
  empty: oo.empty,
  each: oo.each,
};
function iz(e, t) {
  var r = new ms();
  if (e instanceof ms)
    e.each(function (o) {
      r.add(o);
    });
  else if (e) {
    var n = -1,
      a = e.length;
    if (t == null) for (; ++n < a; ) r.add(e[n]);
    else for (; ++n < a; ) r.add(t(e[n], n, e));
  }
  return r;
}
var O7 = Array.prototype,
  hs = O7.map,
  io = O7.slice;
function Si(e, t, r) {
  (e.prototype = t.prototype = r), (r.constructor = e);
}
function sf(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function fo() {}
var na = 0.7,
  uo = 1 / na,
  Mi = "\\s*([+-]?\\d+)\\s*",
  df = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  rn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  fz = /^#([0-9a-f]{3,8})$/,
  lz = new RegExp("^rgb\\(" + [Mi, Mi, Mi] + "\\)$"),
  cz = new RegExp("^rgb\\(" + [rn, rn, rn] + "\\)$"),
  sz = new RegExp("^rgba\\(" + [Mi, Mi, Mi, df] + "\\)$"),
  dz = new RegExp("^rgba\\(" + [rn, rn, rn, df] + "\\)$"),
  mz = new RegExp("^hsl\\(" + [df, rn, rn] + "\\)$"),
  hz = new RegExp("^hsla\\(" + [df, rn, rn, df] + "\\)$"),
  B7 = {
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
Si(fo, aa, {
  copy: function (e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: F7,
  formatHex: F7,
  formatHsl: pz,
  formatRgb: H7,
  toString: H7,
});
function F7() {
  return this.rgb().formatHex();
}
function pz() {
  return G7(this).formatHsl();
}
function H7() {
  return this.rgb().formatRgb();
}
function aa(e) {
  var t, r;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = fz.exec(e))
      ? ((r = t[1].length),
        (t = parseInt(t[1], 16)),
        r === 6
          ? Y7(t)
          : r === 3
          ? new zt(
              ((t >> 8) & 15) | ((t >> 4) & 240),
              ((t >> 4) & 15) | (t & 240),
              ((t & 15) << 4) | (t & 15),
              1,
            )
          : r === 8
          ? ps(
              (t >> 24) & 255,
              (t >> 16) & 255,
              (t >> 8) & 255,
              (t & 255) / 255,
            )
          : r === 4
          ? ps(
              ((t >> 12) & 15) | ((t >> 8) & 240),
              ((t >> 8) & 15) | ((t >> 4) & 240),
              ((t >> 4) & 15) | (t & 240),
              (((t & 15) << 4) | (t & 15)) / 255,
            )
          : null)
      : (t = lz.exec(e))
      ? new zt(t[1], t[2], t[3], 1)
      : (t = cz.exec(e))
      ? new zt((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, 1)
      : (t = sz.exec(e))
      ? ps(t[1], t[2], t[3], t[4])
      : (t = dz.exec(e))
      ? ps((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, t[4])
      : (t = mz.exec(e))
      ? $7(t[1], t[2] / 100, t[3] / 100, 1)
      : (t = hz.exec(e))
      ? $7(t[1], t[2] / 100, t[3] / 100, t[4])
      : B7.hasOwnProperty(e)
      ? Y7(B7[e])
      : e === "transparent"
      ? new zt(NaN, NaN, NaN, 0)
      : null
  );
}
function Y7(e) {
  return new zt((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function ps(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new zt(e, t, r, n);
}
function b0(e) {
  return (
    e instanceof fo || (e = aa(e)),
    e ? ((e = e.rgb()), new zt(e.r, e.g, e.b, e.opacity)) : new zt()
  );
}
function Ai(e, t, r, n) {
  return arguments.length === 1 ? b0(e) : new zt(e, t, r, n ?? 1);
}
function zt(e, t, r, n) {
  (this.r = +e), (this.g = +t), (this.b = +r), (this.opacity = +n);
}
Si(
  zt,
  Ai,
  sf(fo, {
    brighter: function (e) {
      return (
        (e = e == null ? uo : Math.pow(uo, e)),
        new zt(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker: function (e) {
      return (
        (e = e == null ? na : Math.pow(na, e)),
        new zt(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb: function () {
      return this;
    },
    displayable: function () {
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
    hex: q7,
    formatHex: q7,
    formatRgb: W7,
    toString: W7,
  }),
);
function q7() {
  return "#" + v0(this.r) + v0(this.g) + v0(this.b);
}
function W7() {
  var e = this.opacity;
  return (
    (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))),
    (e === 1 ? "rgb(" : "rgba(") +
      Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
      ", " +
      Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
      ", " +
      Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
      (e === 1 ? ")" : ", " + e + ")")
  );
}
function v0(e) {
  return (
    (e = Math.max(0, Math.min(255, Math.round(e) || 0))),
    (e < 16 ? "0" : "") + e.toString(16)
  );
}
function $7(e, t, r, n) {
  return (
    n <= 0
      ? (e = t = r = NaN)
      : r <= 0 || r >= 1
      ? (e = t = NaN)
      : t <= 0 && (e = NaN),
    new tn(e, t, r, n)
  );
}
function G7(e) {
  if (e instanceof tn) return new tn(e.h, e.s, e.l, e.opacity);
  if ((e instanceof fo || (e = aa(e)), !e)) return new tn();
  if (e instanceof tn) return e;
  e = e.rgb();
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    a = Math.min(t, r, n),
    o = Math.max(t, r, n),
    i = NaN,
    u = o - a,
    l = (o + a) / 2;
  return (
    u
      ? (t === o
          ? (i = (r - n) / u + (r < n) * 6)
          : r === o
          ? (i = (n - t) / u + 2)
          : (i = (t - r) / u + 4),
        (u /= l < 0.5 ? o + a : 2 - o - a),
        (i *= 60))
      : (u = l > 0 && l < 1 ? 0 : i),
    new tn(i, u, l, e.opacity)
  );
}
function U7(e, t, r, n) {
  return arguments.length === 1 ? G7(e) : new tn(e, t, r, n ?? 1);
}
function tn(e, t, r, n) {
  (this.h = +e), (this.s = +t), (this.l = +r), (this.opacity = +n);
}
Si(
  tn,
  U7,
  sf(fo, {
    brighter: function (e) {
      return (
        (e = e == null ? uo : Math.pow(uo, e)),
        new tn(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker: function (e) {
      return (
        (e = e == null ? na : Math.pow(na, e)),
        new tn(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb: function () {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        r = this.l,
        n = r + (r < 0.5 ? r : 1 - r) * t,
        a = 2 * r - n;
      return new zt(
        x0(e >= 240 ? e - 240 : e + 120, a, n),
        x0(e, a, n),
        x0(e < 120 ? e + 240 : e - 120, a, n),
        this.opacity,
      );
    },
    displayable: function () {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl: function () {
      var e = this.opacity;
      return (
        (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))),
        (e === 1 ? "hsl(" : "hsla(") +
          (this.h || 0) +
          ", " +
          (this.s || 0) * 100 +
          "%, " +
          (this.l || 0) * 100 +
          "%" +
          (e === 1 ? ")" : ", " + e + ")")
      );
    },
  }),
);
function x0(e, t, r) {
  return (
    (e < 60
      ? t + ((r - t) * e) / 60
      : e < 180
      ? r
      : e < 240
      ? t + ((r - t) * (240 - e)) / 60
      : t) * 255
  );
}
var X7 = Math.PI / 180,
  j7 = 180 / Math.PI;
var J7 = -0.14861,
  y0 = 1.78277,
  w0 = -0.29227,
  gs = -0.90649,
  mf = 1.97294,
  Q7 = mf * gs,
  K7 = mf * y0,
  Z7 = y0 * w0 - gs * J7;
function gz(e) {
  if (e instanceof lo) return new lo(e.h, e.s, e.l, e.opacity);
  e instanceof zt || (e = b0(e));
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    a = (Z7 * n + Q7 * t - K7 * r) / (Z7 + Q7 - K7),
    o = n - a,
    i = (mf * (r - a) - w0 * o) / gs,
    u = Math.sqrt(i * i + o * o) / (mf * a * (1 - a)),
    l = u ? Math.atan2(i, o) * j7 - 120 : NaN;
  return new lo(l < 0 ? l + 360 : l, u, a, e.opacity);
}
function Yt(e, t, r, n) {
  return arguments.length === 1 ? gz(e) : new lo(e, t, r, n ?? 1);
}
function lo(e, t, r, n) {
  (this.h = +e), (this.s = +t), (this.l = +r), (this.opacity = +n);
}
Si(
  lo,
  Yt,
  sf(fo, {
    brighter: function (e) {
      return (
        (e = e == null ? uo : Math.pow(uo, e)),
        new lo(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker: function (e) {
      return (
        (e = e == null ? na : Math.pow(na, e)),
        new lo(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb: function () {
      var e = isNaN(this.h) ? 0 : (this.h + 120) * X7,
        t = +this.l,
        r = isNaN(this.s) ? 0 : this.s * t * (1 - t),
        n = Math.cos(e),
        a = Math.sin(e);
      return new zt(
        255 * (t + r * (J7 * n + y0 * a)),
        255 * (t + r * (w0 * n + gs * a)),
        255 * (t + r * (mf * n)),
        this.opacity,
      );
    },
  }),
);
function _0(e, t, r, n, a) {
  var o = e * e,
    i = o * e;
  return (
    ((1 - 3 * e + 3 * o - i) * t +
      (4 - 6 * o + 3 * i) * r +
      (1 + 3 * e + 3 * o - 3 * i) * n +
      i * a) /
    6
  );
}
function e9(e) {
  var t = e.length - 1;
  return function (r) {
    var n = r <= 0 ? (r = 0) : r >= 1 ? ((r = 1), t - 1) : Math.floor(r * t),
      a = e[n],
      o = e[n + 1],
      i = n > 0 ? e[n - 1] : 2 * a - o,
      u = n < t - 1 ? e[n + 2] : 2 * o - a;
    return _0((r - n / t) * t, i, a, o, u);
  };
}
function t9(e) {
  var t = e.length;
  return function (r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * t),
      a = e[(n + t - 1) % t],
      o = e[n % t],
      i = e[(n + 1) % t],
      u = e[(n + 2) % t];
    return _0((r - n / t) * t, a, o, i, u);
  };
}
function ki(e) {
  return function () {
    return e;
  };
}
function r9(e, t) {
  return function (r) {
    return e + r * t;
  };
}
function vz(e, t, r) {
  return (
    (e = Math.pow(e, r)),
    (t = Math.pow(t, r) - e),
    (r = 1 / r),
    function (n) {
      return Math.pow(e + n * t, r);
    }
  );
}
function n9(e, t) {
  var r = t - e;
  return r
    ? r9(e, r > 180 || r < -180 ? r - 360 * Math.round(r / 360) : r)
    : ki(isNaN(e) ? t : e);
}
function a9(e) {
  return (e = +e) == 1
    ? An
    : function (t, r) {
        return r - t ? vz(t, r, e) : ki(isNaN(t) ? r : t);
      };
}
function An(e, t) {
  var r = t - e;
  return r ? r9(e, r) : ki(isNaN(e) ? t : e);
}
var S0 = (function e(t) {
  var r = a9(t);
  function n(a, o) {
    var i = r((a = Ai(a)).r, (o = Ai(o)).r),
      u = r(a.g, o.g),
      l = r(a.b, o.b),
      s = An(a.opacity, o.opacity);
    return function (h) {
      return (
        (a.r = i(h)), (a.g = u(h)), (a.b = l(h)), (a.opacity = s(h)), a + ""
      );
    };
  }
  return (n.gamma = e), n;
})(1);
function o9(e) {
  return function (t) {
    var r = t.length,
      n = new Array(r),
      a = new Array(r),
      o = new Array(r),
      i,
      u;
    for (i = 0; i < r; ++i)
      (u = Ai(t[i])), (n[i] = u.r || 0), (a[i] = u.g || 0), (o[i] = u.b || 0);
    return (
      (n = e(n)),
      (a = e(a)),
      (o = e(o)),
      (u.opacity = 1),
      function (l) {
        return (u.r = n(l)), (u.g = a(l)), (u.b = o(l)), u + "";
      }
    );
  };
}
var Wde = o9(e9),
  $de = o9(t9);
function i9(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0,
    n = t.slice(),
    a;
  return function (o) {
    for (a = 0; a < r; ++a) n[a] = e[a] * (1 - o) + t[a] * o;
    return n;
  };
}
function u9(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function f9(e, t) {
  var r = t ? t.length : 0,
    n = e ? Math.min(r, e.length) : 0,
    a = new Array(n),
    o = new Array(r),
    i;
  for (i = 0; i < n; ++i) a[i] = co(e[i], t[i]);
  for (; i < r; ++i) o[i] = t[i];
  return function (u) {
    for (i = 0; i < n; ++i) o[i] = a[i](u);
    return o;
  };
}
function l9(e, t) {
  var r = new Date();
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return r.setTime(e * (1 - n) + t * n), r;
    }
  );
}
function oa(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return e * (1 - r) + t * r;
    }
  );
}
function c9(e, t) {
  var r = {},
    n = {},
    a;
  (e === null || typeof e != "object") && (e = {}),
    (t === null || typeof t != "object") && (t = {});
  for (a in t) a in e ? (r[a] = co(e[a], t[a])) : (n[a] = t[a]);
  return function (o) {
    for (a in r) n[a] = r[a](o);
    return n;
  };
}
var A0 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  M0 = new RegExp(A0.source, "g");
function xz(e) {
  return function () {
    return e;
  };
}
function bz(e) {
  return function (t) {
    return e(t) + "";
  };
}
function s9(e, t) {
  var r = (A0.lastIndex = M0.lastIndex = 0),
    n,
    a,
    o,
    i = -1,
    u = [],
    l = [];
  for (e = e + "", t = t + ""; (n = A0.exec(e)) && (a = M0.exec(t)); )
    (o = a.index) > r &&
      ((o = t.slice(r, o)), u[i] ? (u[i] += o) : (u[++i] = o)),
      (n = n[0]) === (a = a[0])
        ? u[i]
          ? (u[i] += a)
          : (u[++i] = a)
        : ((u[++i] = null), l.push({ i, x: oa(n, a) })),
      (r = M0.lastIndex);
  return (
    r < t.length && ((o = t.slice(r)), u[i] ? (u[i] += o) : (u[++i] = o)),
    u.length < 2
      ? l[0]
        ? bz(l[0].x)
        : xz(t)
      : ((t = l.length),
        function (s) {
          for (var h = 0, y; h < t; ++h) u[(y = l[h]).i] = y.x(s);
          return u.join("");
        })
  );
}
function co(e, t) {
  var r = typeof t,
    n;
  return t == null || r === "boolean"
    ? ki(t)
    : (r === "number"
        ? oa
        : r === "string"
        ? (n = aa(t))
          ? ((t = n), S0)
          : s9
        : t instanceof aa
        ? S0
        : t instanceof Date
        ? l9
        : u9(t)
        ? i9
        : Array.isArray(t)
        ? f9
        : (typeof t.valueOf != "function" && typeof t.toString != "function") ||
          isNaN(t)
        ? c9
        : oa)(e, t);
}
function k0(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return Math.round(e * (1 - r) + t * r);
    }
  );
}
function d9(e) {
  return (function t(r) {
    r = +r;
    function n(a, o) {
      var i = e((a = Yt(a)).h, (o = Yt(o)).h),
        u = An(a.s, o.s),
        l = An(a.l, o.l),
        s = An(a.opacity, o.opacity);
      return function (h) {
        return (
          (a.h = i(h)),
          (a.s = u(h)),
          (a.l = l(Math.pow(h, r))),
          (a.opacity = s(h)),
          a + ""
        );
      };
    }
    return (n.gamma = t), n;
  })(1);
}
var yz = d9(n9),
  Ci = d9(An);
function vs(e) {
  return function () {
    return e;
  };
}
function C0(e) {
  return +e;
}
var m9 = [0, 1];
function xs(e, t) {
  return (t -= e = +e)
    ? function (r) {
        return (r - e) / t;
      }
    : vs(t);
}
function wz(e) {
  return function (t, r) {
    var n = e((t = +t), (r = +r));
    return function (a) {
      return a <= t ? 0 : a >= r ? 1 : n(a);
    };
  };
}
function _z(e) {
  return function (t, r) {
    var n = e((t = +t), (r = +r));
    return function (a) {
      return a <= 0 ? t : a >= 1 ? r : n(a);
    };
  };
}
function Sz(e, t, r, n) {
  var a = e[0],
    o = e[1],
    i = t[0],
    u = t[1];
  return (
    o < a ? ((a = r(o, a)), (i = n(u, i))) : ((a = r(a, o)), (i = n(i, u))),
    function (l) {
      return i(a(l));
    }
  );
}
function Mz(e, t, r, n) {
  var a = Math.min(e.length, t.length) - 1,
    o = new Array(a),
    i = new Array(a),
    u = -1;
  for (
    e[a] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
    ++u < a;

  )
    (o[u] = r(e[u], e[u + 1])), (i[u] = n(t[u], t[u + 1]));
  return function (l) {
    var s = ao(e, l, 1, a) - 1;
    return i[s](o[s](l));
  };
}
function hf(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp());
}
function Ti(e, t) {
  var r = m9,
    n = m9,
    a = co,
    o = !1,
    i,
    u,
    l;
  function s() {
    return (i = Math.min(r.length, n.length) > 2 ? Mz : Sz), (u = l = null), h;
  }
  function h(y) {
    return (u || (u = i(r, n, o ? wz(e) : e, a)))(+y);
  }
  return (
    (h.invert = function (y) {
      return (l || (l = i(n, r, xs, o ? _z(t) : t)))(+y);
    }),
    (h.domain = function (y) {
      return arguments.length ? ((r = hs.call(y, C0)), s()) : r.slice();
    }),
    (h.range = function (y) {
      return arguments.length ? ((n = io.call(y)), s()) : n.slice();
    }),
    (h.rangeRound = function (y) {
      return (n = io.call(y)), (a = k0), s();
    }),
    (h.clamp = function (y) {
      return arguments.length ? ((o = !!y), s()) : o;
    }),
    (h.interpolate = function (y) {
      return arguments.length ? ((a = y), s()) : a;
    }),
    s()
  );
}
function h9(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString("en").replace(/,/g, "")
    : e.toString(10);
}
function so(e, t) {
  if (
    (r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0
  )
    return null;
  var r,
    n = e.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)];
}
function nn(e) {
  return (e = so(Math.abs(e))), e ? e[1] : NaN;
}
function p9(e, t) {
  return function (r, n) {
    for (
      var a = r.length, o = [], i = 0, u = e[0], l = 0;
      a > 0 &&
      u > 0 &&
      (l + u + 1 > n && (u = Math.max(1, n - l)),
      o.push(r.substring((a -= u), a + u)),
      !((l += u + 1) > n));

    )
      u = e[(i = (i + 1) % e.length)];
    return o.reverse().join(t);
  };
}
function g9(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (r) {
      return e[+r];
    });
  };
}
var Az =
  /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ia(e) {
  if (!(t = Az.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new bs({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  });
}
ia.prototype = bs.prototype;
function bs(e) {
  (this.fill = e.fill === void 0 ? " " : e.fill + ""),
    (this.align = e.align === void 0 ? ">" : e.align + ""),
    (this.sign = e.sign === void 0 ? "-" : e.sign + ""),
    (this.symbol = e.symbol === void 0 ? "" : e.symbol + ""),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? "" : e.type + "");
}
bs.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? "0" : "") +
    (this.width === void 0 ? "" : Math.max(1, this.width | 0)) +
    (this.comma ? "," : "") +
    (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) +
    (this.trim ? "~" : "") +
    this.type
  );
};
function v9(e) {
  e: for (var t = e.length, r = 1, n = -1, a; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = a = r;
        break;
      case "0":
        n === 0 && (n = r), (a = r);
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(a + 1) : e;
}
var T0;
function x9(e, t) {
  var r = so(e, t);
  if (!r) return e + "";
  var n = r[0],
    a = r[1],
    o = a - (T0 = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1,
    i = n.length;
  return o === i
    ? n
    : o > i
    ? n + new Array(o - i + 1).join("0")
    : o > 0
    ? n.slice(0, o) + "." + n.slice(o)
    : "0." + new Array(1 - o).join("0") + so(e, Math.max(0, t + o - 1))[0];
}
function V0(e, t) {
  var r = so(e, t);
  if (!r) return e + "";
  var n = r[0],
    a = r[1];
  return a < 0
    ? "0." + new Array(-a).join("0") + n
    : n.length > a + 1
    ? n.slice(0, a + 1) + "." + n.slice(a + 1)
    : n + new Array(a - n.length + 2).join("0");
}
var N0 = {
  "%": function (e, t) {
    return (e * 100).toFixed(t);
  },
  b: function (e) {
    return Math.round(e).toString(2);
  },
  c: function (e) {
    return e + "";
  },
  d: h9,
  e: function (e, t) {
    return e.toExponential(t);
  },
  f: function (e, t) {
    return e.toFixed(t);
  },
  g: function (e, t) {
    return e.toPrecision(t);
  },
  o: function (e) {
    return Math.round(e).toString(8);
  },
  p: function (e, t) {
    return V0(e * 100, t);
  },
  r: V0,
  s: x9,
  X: function (e) {
    return Math.round(e).toString(16).toUpperCase();
  },
  x: function (e) {
    return Math.round(e).toString(16);
  },
};
function D0(e) {
  return e;
}
var b9 = Array.prototype.map,
  y9 = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "\xB5",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
  ];
function w9(e) {
  var t =
      e.grouping === void 0 || e.thousands === void 0
        ? D0
        : p9(b9.call(e.grouping, Number), e.thousands + ""),
    r = e.currency === void 0 ? "" : e.currency[0] + "",
    n = e.currency === void 0 ? "" : e.currency[1] + "",
    a = e.decimal === void 0 ? "." : e.decimal + "",
    o = e.numerals === void 0 ? D0 : g9(b9.call(e.numerals, String)),
    i = e.percent === void 0 ? "%" : e.percent + "",
    u = e.minus === void 0 ? "-" : e.minus + "",
    l = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(y) {
    y = ia(y);
    var x = y.fill,
      M = y.align,
      A = y.sign,
      N = y.symbol,
      k = y.zero,
      D = y.width,
      B = y.comma,
      F = y.precision,
      R = y.trim,
      I = y.type;
    I === "n"
      ? ((B = !0), (I = "g"))
      : N0[I] || (F === void 0 && (F = 12), (R = !0), (I = "g")),
      (k || (x === "0" && M === "=")) && ((k = !0), (x = "0"), (M = "="));
    var L =
        N === "$"
          ? r
          : N === "#" && /[boxX]/.test(I)
          ? "0" + I.toLowerCase()
          : "",
      $ = N === "$" ? n : /[%p]/.test(I) ? i : "",
      G = N0[I],
      ue = /[defgprs%]/.test(I);
    F =
      F === void 0
        ? 6
        : /[gprs]/.test(I)
        ? Math.max(1, Math.min(21, F))
        : Math.max(0, Math.min(20, F));
    function ne(U) {
      var ae = L,
        J = $,
        H,
        ee,
        j;
      if (I === "c") (J = G(U) + J), (U = "");
      else {
        U = +U;
        var X = U < 0 || 1 / U < 0;
        if (
          ((U = isNaN(U) ? l : G(Math.abs(U), F)),
          R && (U = v9(U)),
          X && +U == 0 && A !== "+" && (X = !1),
          (ae =
            (X ? (A === "(" ? A : u) : A === "-" || A === "(" ? "" : A) + ae),
          (J =
            (I === "s" ? y9[8 + T0 / 3] : "") +
            J +
            (X && A === "(" ? ")" : "")),
          ue)
        ) {
          for (H = -1, ee = U.length; ++H < ee; )
            if (((j = U.charCodeAt(H)), 48 > j || j > 57)) {
              (J = (j === 46 ? a + U.slice(H + 1) : U.slice(H)) + J),
                (U = U.slice(0, H));
              break;
            }
        }
      }
      B && !k && (U = t(U, 1 / 0));
      var K = ae.length + U.length + J.length,
        Z = K < D ? new Array(D - K + 1).join(x) : "";
      switch (
        (B && k && ((U = t(Z + U, Z.length ? D - J.length : 1 / 0)), (Z = "")),
        M)
      ) {
        case "<":
          U = ae + U + J + Z;
          break;
        case "=":
          U = ae + Z + U + J;
          break;
        case "^":
          U = Z.slice(0, (K = Z.length >> 1)) + ae + U + J + Z.slice(K);
          break;
        default:
          U = Z + ae + U + J;
          break;
      }
      return o(U);
    }
    return (
      (ne.toString = function () {
        return y + "";
      }),
      ne
    );
  }
  function h(y, x) {
    var M = s(((y = ia(y)), (y.type = "f"), y)),
      A = Math.max(-8, Math.min(8, Math.floor(nn(x) / 3))) * 3,
      N = Math.pow(10, -A),
      k = y9[8 + A / 3];
    return function (D) {
      return M(N * D) + k;
    };
  }
  return { format: s, formatPrefix: h };
}
var ys, ws, _s;
E0({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-",
});
function E0(e) {
  return (ys = w9(e)), (ws = ys.format), (_s = ys.formatPrefix), ys;
}
function I0(e) {
  return Math.max(0, -nn(Math.abs(e)));
}
function z0(e, t) {
  return Math.max(
    0,
    Math.max(-8, Math.min(8, Math.floor(nn(t) / 3))) * 3 - nn(Math.abs(e)),
  );
}
function P0(e, t) {
  return (
    (e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, nn(t) - nn(e)) + 1
  );
}
function _9(e, t, r) {
  var n = e[0],
    a = e[e.length - 1],
    o = ra(n, a, t ?? 10),
    i;
  switch (((r = ia(r ?? ",f")), r.type)) {
    case "s": {
      var u = Math.max(Math.abs(n), Math.abs(a));
      return (
        r.precision == null && !isNaN((i = z0(o, u))) && (r.precision = i),
        _s(r, u)
      );
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null &&
        !isNaN((i = P0(o, Math.max(Math.abs(n), Math.abs(a))))) &&
        (r.precision = i - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null &&
        !isNaN((i = I0(o))) &&
        (r.precision = i - (r.type === "%") * 2);
      break;
    }
  }
  return ws(r);
}
function pf(e) {
  var t = e.domain;
  return (
    (e.ticks = function (r) {
      var n = t();
      return ss(n[0], n[n.length - 1], r ?? 10);
    }),
    (e.tickFormat = function (r, n) {
      return _9(t(), r, n);
    }),
    (e.nice = function (r) {
      var n = t(),
        a = n.length - 1,
        o = r ?? 10,
        i = n[0],
        u = n[a],
        l = ra(i, u, o);
      return (
        l &&
          ((l = ra(Math.floor(i / l) * l, Math.ceil(u / l) * l, o)),
          (n[0] = Math.floor(i / l) * l),
          (n[a] = Math.ceil(u / l) * l),
          t(n)),
        e
      );
    }),
    e
  );
}
function Vi() {
  var e = Ti(xs, oa);
  return (
    (e.copy = function () {
      return hf(e, Vi());
    }),
    pf(e)
  );
}
var Cz = 1e3,
  Tz = Cz * 60,
  Vz = Tz * 60,
  R0 = Vz * 24,
  Qhe = R0 * 7,
  Khe = R0 * 30,
  Zhe = R0 * 365;
function er(e) {
  return e.match(/.{6}/g).map(function (t) {
    return "#" + t;
  });
}
var Nz = er("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
var Dz = er(
  "393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6",
);
var Ez = er(
  "3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9",
);
var Iz = er(
  "1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5",
);
var zz = Ci(Yt(300, 0.5, 0), Yt(-240, 0.5, 1));
var Pz = Ci(Yt(-100, 0.75, 0.35), Yt(80, 1.5, 0.8)),
  Rz = Ci(Yt(260, 0.75, 0.35), Yt(80, 1.5, 0.8)),
  vpe = Yt();
function Ss(e) {
  var t = e.length;
  return function (r) {
    return e[Math.max(0, Math.min(t - 1, Math.floor(r * t)))];
  };
}
var Lz = Ss(
    er(
      "44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725",
    ),
  ),
  Oz = Ss(
    er(
      "00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf",
    ),
  ),
  Bz = Ss(
    er(
      "00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4",
    ),
  ),
  Fz = Ss(
    er(
      "0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921",
    ),
  );
function ua(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function L0(e) {
  return (
    e.length === 1 && (e = Hz(e)),
    {
      left: function (t, r, n, a) {
        for (n == null && (n = 0), a == null && (a = t.length); n < a; ) {
          var o = (n + a) >>> 1;
          e(t[o], r) < 0 ? (n = o + 1) : (a = o);
        }
        return n;
      },
      right: function (t, r, n, a) {
        for (n == null && (n = 0), a == null && (a = t.length); n < a; ) {
          var o = (n + a) >>> 1;
          e(t[o], r) > 0 ? (a = o) : (n = o + 1);
        }
        return n;
      },
    }
  );
}
function Hz(e) {
  return function (t, r) {
    return ua(e(t), r);
  };
}
var S9 = L0(ua),
  Yz = S9.right,
  qz = S9.left;
var M9 = Array.prototype,
  $z = M9.slice,
  Gz = M9.map;
var wge = Math.sqrt(50),
  _ge = Math.sqrt(10),
  Sge = Math.sqrt(2);
function As(e, t) {
  var r = -1,
    n = e.length,
    a,
    o;
  if (t == null) {
    for (; ++r < n; )
      if ((o = e[r]) != null && o >= o) {
        a = o;
        break;
      }
    for (; ++r < n; ) (o = e[r]) != null && o > a && (a = o);
  } else {
    for (; ++r < n; )
      if ((o = t(e[r], r, e)) != null && o >= o) {
        a = o;
        break;
      }
    for (; ++r < n; ) (o = t(e[r], r, e)) != null && o > a && (a = o);
  }
  return a;
}
function ks(e, t) {
  var r = 0,
    n = e.length,
    a,
    o = -1;
  if (t == null) for (; ++o < n; ) (a = +e[o]) && (r += a);
  else for (; ++o < n; ) (a = +t(e[o], o, e)) && (r += a);
  return r;
}
var tP =
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            typeof Symbol == "function" &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        },
  T9 = function (t) {
    return t;
  },
  k9 = function (t) {
    for (var r = [], n = 0, a = t.length; n < a; n++) r[n] = t[a - n - 1];
    return r;
  },
  C9 = function (t, r) {
    t.each(function () {
      for (
        var n = l0(this),
          a = n.text().split(/\s+/).reverse(),
          o,
          i = [],
          u = 0,
          l = 1.2,
          s = n.attr("y"),
          h = parseFloat(n.attr("dy")) || 0,
          y = n
            .text(null)
            .append("tspan")
            .attr("x", 0)
            .attr("dy", h + "em");
        (o = a.pop());

      )
        i.push(o),
          y.text(i.join(" ")),
          y.node().getComputedTextLength() > r &&
            i.length > 1 &&
            (i.pop(),
            y.text(i.join(" ")),
            (i = [o]),
            (y = n
              .append("tspan")
              .attr("x", 0)
              .attr("dy", l + h + "em")
              .text(o)));
    });
  },
  rP = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      r = arguments[1],
      n = arguments[2],
      a = arguments[3],
      o = arguments[4];
    if ((typeof r > "u" ? "undefined" : tP(r)) === "object") {
      if (r.length === 0) return t;
      for (var i = r.length; i < t.length; i++) r.push(t[i]);
      return r;
    } else if (typeof r == "function") {
      for (var u = [], l = t.length, s = 0; s < l; s++)
        u.push(
          r({
            i: s,
            genLength: l,
            generatedLabels: t,
            domain: n,
            range: a,
            labelDelimiter: o,
          }),
        );
      return u;
    }
    return t;
  },
  nP = function (t, r, n) {
    var a = [];
    if (r.length > 1) a = r;
    else
      for (
        var o = t.domain(), i = (o[o.length - 1] - o[0]) / (r - 1), u = 0;
        u < r;
        u++
      )
        a.push(o[0] + u * i);
    var l = a.map(n);
    return {
      data: a,
      labels: l,
      feature: function (h) {
        return t(h);
      },
    };
  },
  aP = function (t, r, n) {
    var a = t.range().map(function (o) {
      var i = t.invertExtent(o);
      return r(i[0]) + " " + n + " " + r(i[1]);
    });
    return { data: t.range(), labels: a, feature: T9 };
  },
  oP = function (t) {
    return {
      data: t.domain(),
      labels: t.domain(),
      feature: function (n) {
        return t(n);
      },
    };
  },
  iP = function (t, r, n) {
    t.call("cellover", n, r);
  },
  uP = function (t, r, n) {
    t.call("cellout", n, r);
  },
  fP = function (t, r, n) {
    t.call("cellclick", n, r);
  },
  ot = {
    d3_drawShapes: function (t, r, n, a, o, i) {
      t === "rect"
        ? r.attr("height", n).attr("width", a)
        : t === "circle"
        ? r.attr("r", o)
        : t === "line"
        ? r.attr("x1", 0).attr("x2", a).attr("y1", 0).attr("y2", 0)
        : t === "path" && r.attr("d", i);
    },
    d3_addText: function (t, r, n, a, o) {
      r.append("text").attr("class", a + "label");
      var i = t
        .selectAll("g." + a + "cell text." + a + "label")
        .data(n)
        .text(T9);
      return (
        o && t.selectAll("g." + a + "cell text." + a + "label").call(C9, o), i
      );
    },
    d3_calcType: function (t, r, n, a, o, i) {
      var u = t.invertExtent ? aP(t, o, i) : t.ticks ? nP(t, n, o) : oP(t),
        l = (t.range && t.range()) || t.domain();
      return (
        (u.labels = rP(u.labels, a, t.domain(), l, i)),
        r && ((u.labels = k9(u.labels)), (u.data = k9(u.data))),
        u
      );
    },
    d3_filterCells: function (t, r) {
      var n = t.data
          .map(function (i, u) {
            return { data: i, label: t.labels[u] };
          })
          .filter(r),
        a = n.map(function (i) {
          return i.data;
        }),
        o = n.map(function (i) {
          return i.label;
        });
      return (
        (t.data = t.data.filter(function (i) {
          return a.indexOf(i) !== -1;
        })),
        (t.labels = t.labels.filter(function (i) {
          return o.indexOf(i) !== -1;
        })),
        t
      );
    },
    d3_placement: function (t, r, n, a, o, i) {
      r.attr("transform", n),
        a.attr("transform", o),
        t === "horizontal" && a.style("text-anchor", i);
    },
    d3_addEvents: function (t, r) {
      t.on("mouseover.legend", function (n) {
        iP(r, n, this);
      })
        .on("mouseout.legend", function (n) {
          uP(r, n, this);
        })
        .on("click.legend", function (n) {
          fP(r, n, this);
        });
    },
    d3_title: function (t, r, n, a) {
      if (r !== "") {
        var o = t.selectAll("text." + n + "legendTitle");
        o
          .data([r])
          .enter()
          .append("text")
          .attr("class", n + "legendTitle"),
          t.selectAll("text." + n + "legendTitle").text(r),
          a && t.selectAll("text." + n + "legendTitle").call(C9, a);
        var i = t.select("." + n + "legendCells"),
          u = t
            .select("." + n + "legendTitle")
            .nodes()
            .map(function (s) {
              return s.getBBox().height;
            })[0],
          l = -i.nodes().map(function (s) {
            return s.getBBox().x;
          })[0];
        i.attr("transform", "translate(" + l + "," + u + ")");
      }
    },
    d3_defaultLocale: { format: os, formatPrefix: is },
    d3_defaultFormatSpecifier: ".01f",
    d3_defaultDelimiter: "to",
  };
function Cs() {
  var e = Vi(),
    t = "rect",
    r = 15,
    n = 15,
    a = 10,
    o = 2,
    i = [5],
    u = void 0,
    l = [],
    s = "",
    h = !1,
    y = "",
    x = ot.d3_defaultLocale,
    M = ot.d3_defaultFormatSpecifier,
    A = 10,
    N = "middle",
    k = ot.d3_defaultDelimiter,
    D = void 0,
    B = "vertical",
    F = !1,
    R = void 0,
    I = void 0,
    L = fs("cellover", "cellout", "cellclick");
  function $(G) {
    var ue = ot.d3_calcType(e, F, i, l, x.format(M), k),
      ne = G.selectAll("g").data([e]);
    ne
      .enter()
      .append("g")
      .attr("class", s + "legendCells"),
      u && ot.d3_filterCells(ue, u);
    var U = G.select("." + s + "legendCells")
        .selectAll("." + s + "cell")
        .data(ue.data),
      ae = U.enter()
        .append("g")
        .attr("class", s + "cell");
    ae.append(t).attr("class", s + "swatch");
    var J = G.selectAll("g." + s + "cell " + t + "." + s + "swatch").data(
      ue.data,
    );
    ot.d3_addEvents(ae, L),
      U.exit().transition().style("opacity", 0).remove(),
      J.exit().transition().style("opacity", 0).remove(),
      (J = J.merge(J)),
      ot.d3_drawShapes(t, J, n, r, a, R);
    var H = ot.d3_addText(G, ae, ue.labels, s, D);
    U = ae.merge(U);
    var ee = H.nodes().map(function (te) {
        return te.getBBox();
      }),
      j = J.nodes().map(function (te) {
        return te.getBBox();
      });
    h
      ? J.attr("class", function (te) {
          return s + "swatch " + ue.feature(te);
        })
      : t == "line"
      ? J.style("stroke", ue.feature)
      : J.style("fill", ue.feature);
    var X = void 0,
      K = void 0,
      Z = N == "start" ? 0 : N == "middle" ? 0.5 : 1;
    B === "vertical"
      ? (function () {
          var te = ee.map(function (le, de) {
            return Math.max(le.height, j[de].height);
          });
          (X = function (de, re) {
            var me = ks(te.slice(0, re));
            return "translate(0, " + (me + re * o) + ")";
          }),
            (K = function (de, re) {
              return (
                "translate( " +
                (j[re].width + j[re].x + A) +
                ", " +
                (j[re].y + j[re].height / 2 + 5) +
                ")"
              );
            });
        })()
      : B === "horizontal" &&
        ((X = function (le, de) {
          return "translate(" + de * (j[de].width + o) + ",0)";
        }),
        (K = function (le, de) {
          return (
            "translate(" +
            (j[de].width * Z + j[de].x) +
            `,
          ` +
            (j[de].height + j[de].y + A + 8) +
            ")"
          );
        })),
      ot.d3_placement(B, U, X, H, K, N),
      ot.d3_title(G, y, s, I),
      U.transition().style("opacity", 1);
  }
  return (
    ($.scale = function (G) {
      return arguments.length ? ((e = G), $) : e;
    }),
    ($.cells = function (G) {
      return arguments.length ? ((G.length > 1 || G >= 2) && (i = G), $) : i;
    }),
    ($.cellFilter = function (G) {
      return arguments.length ? ((u = G), $) : u;
    }),
    ($.shape = function (G, ue) {
      return arguments.length
        ? ((G == "rect" ||
            G == "circle" ||
            G == "line" ||
            (G == "path" && typeof ue == "string")) &&
            ((t = G), (R = ue)),
          $)
        : t;
    }),
    ($.shapeWidth = function (G) {
      return arguments.length ? ((r = +G), $) : r;
    }),
    ($.shapeHeight = function (G) {
      return arguments.length ? ((n = +G), $) : n;
    }),
    ($.shapeRadius = function (G) {
      return arguments.length ? ((a = +G), $) : a;
    }),
    ($.shapePadding = function (G) {
      return arguments.length ? ((o = +G), $) : o;
    }),
    ($.labels = function (G) {
      return arguments.length ? ((l = G), $) : l;
    }),
    ($.labelAlign = function (G) {
      return arguments.length
        ? ((G == "start" || G == "end" || G == "middle") && (N = G), $)
        : N;
    }),
    ($.locale = function (G) {
      return arguments.length ? ((x = _i(G)), $) : x;
    }),
    ($.labelFormat = function (G) {
      return arguments.length ? ((M = no(G)), $) : $.locale().format(M);
    }),
    ($.labelOffset = function (G) {
      return arguments.length ? ((A = +G), $) : A;
    }),
    ($.labelDelimiter = function (G) {
      return arguments.length ? ((k = G), $) : k;
    }),
    ($.labelWrap = function (G) {
      return arguments.length ? ((D = G), $) : D;
    }),
    ($.useClass = function (G) {
      return arguments.length ? ((G === !0 || G === !1) && (h = G), $) : h;
    }),
    ($.orient = function (G) {
      return arguments.length
        ? ((G = G.toLowerCase()),
          (G == "horizontal" || G == "vertical") && (B = G),
          $)
        : B;
    }),
    ($.ascending = function (G) {
      return arguments.length ? ((F = !!G), $) : F;
    }),
    ($.classPrefix = function (G) {
      return arguments.length ? ((s = G), $) : s;
    }),
    ($.title = function (G) {
      return arguments.length ? ((y = G), $) : y;
    }),
    ($.titleWidth = function (G) {
      return arguments.length ? ((I = G), $) : I;
    }),
    ($.textWrap = function (G) {
      return arguments.length ? ((textWrap = G), $) : textWrap;
    }),
    ($.on = function () {
      var G = L.on.apply(L, arguments);
      return G === L ? $ : G;
    }),
    $
  );
}
function V9() {
  var e = Vi(),
    t = "path",
    r = 15,
    n = 15,
    a = 10,
    o = 5,
    i = [5],
    u = void 0,
    l = [],
    s = "",
    h = "",
    y = ot.d3_defaultLocale,
    x = ot.d3_defaultFormatSpecifier,
    M = "middle",
    A = 10,
    N = ot.d3_defaultDelimiter,
    k = void 0,
    D = "vertical",
    B = !1,
    F = void 0,
    R = fs("cellover", "cellout", "cellclick");
  function I(L) {
    var $ = ot.d3_calcType(e, B, i, l, y.format(x), N),
      G = L.selectAll("g").data([e]);
    u && ot.d3_filterCells($, u),
      G.enter()
        .append("g")
        .attr("class", s + "legendCells");
    var ue = L.select("." + s + "legendCells")
        .selectAll("." + s + "cell")
        .data($.data),
      ne = ue
        .enter()
        .append("g")
        .attr("class", s + "cell");
    ne.append(t).attr("class", s + "swatch");
    var U = L.selectAll("g." + s + "cell " + t + "." + s + "swatch");
    ot.d3_addEvents(ne, R),
      ue.exit().transition().style("opacity", 0).remove(),
      U.exit().transition().style("opacity", 0).remove(),
      (U = U.merge(U)),
      ot.d3_drawShapes(t, U, n, r, a, $.feature);
    var ae = ot.d3_addText(L, ne, $.labels, s, k);
    ue = ne.merge(ue);
    var J = ae.nodes().map(function (te) {
        return te.getBBox();
      }),
      H = U.nodes().map(function (te) {
        return te.getBBox();
      }),
      ee = As(H, function (te) {
        return te.height;
      }),
      j = As(H, function (te) {
        return te.width;
      }),
      X = void 0,
      K = void 0,
      Z = M == "start" ? 0 : M == "middle" ? 0.5 : 1;
    D === "vertical"
      ? (function () {
          var te = J.map(function (le, de) {
            return Math.max(ee, le.height);
          });
          (X = function (de, re) {
            var me = ks(te.slice(0, re));
            return "translate(0, " + (me + re * o) + " )";
          }),
            (K = function (de, re) {
              return (
                "translate( " +
                (j + A) +
                `,
              ` +
                (H[re].y + H[re].height / 2 + 5) +
                ")"
              );
            });
        })()
      : D === "horizontal" &&
        ((X = function (le, de) {
          return "translate( " + de * (j + o) + ",0)";
        }),
        (K = function (le, de) {
          return (
            "translate( " +
            (H[de].width * Z + H[de].x) +
            `,
              ` +
            (ee + A) +
            ")"
          );
        })),
      ot.d3_placement(D, ue, X, ae, K, M),
      ot.d3_title(L, h, s, F),
      ue.transition().style("opacity", 1);
  }
  return (
    (I.scale = function (L) {
      return arguments.length ? ((e = L), I) : e;
    }),
    (I.cells = function (L) {
      return arguments.length ? ((L.length > 1 || L >= 2) && (i = L), I) : i;
    }),
    (I.cellFilter = function (L) {
      return arguments.length ? ((u = L), I) : u;
    }),
    (I.shapePadding = function (L) {
      return arguments.length ? ((o = +L), I) : o;
    }),
    (I.labels = function (L) {
      return arguments.length ? ((l = L), I) : l;
    }),
    (I.labelAlign = function (L) {
      return arguments.length
        ? ((L == "start" || L == "end" || L == "middle") && (M = L), I)
        : M;
    }),
    (I.locale = function (L) {
      return arguments.length ? ((y = _i(L)), I) : y;
    }),
    (I.labelFormat = function (L) {
      return arguments.length ? ((x = no(L)), I) : I.locale().format(x);
    }),
    (I.labelOffset = function (L) {
      return arguments.length ? ((A = +L), I) : A;
    }),
    (I.labelDelimiter = function (L) {
      return arguments.length ? ((N = L), I) : N;
    }),
    (I.labelWrap = function (L) {
      return arguments.length ? ((k = L), I) : k;
    }),
    (I.orient = function (L) {
      return arguments.length
        ? ((L = L.toLowerCase()),
          (L == "horizontal" || L == "vertical") && (D = L),
          I)
        : D;
    }),
    (I.ascending = function (L) {
      return arguments.length ? ((B = !!L), I) : B;
    }),
    (I.classPrefix = function (L) {
      return arguments.length ? ((s = L), I) : s;
    }),
    (I.title = function (L) {
      return arguments.length ? ((h = L), I) : h;
    }),
    (I.titleWidth = function (L) {
      return arguments.length ? ((F = L), I) : F;
    }),
    (I.on = function () {
      var L = R.on.apply(R, arguments);
      return L === R ? I : L;
    }),
    I
  );
}
var H9 = Re(Le());
var D9 = `<span id="up-arrow">&#9650;</span>
<span id="page-text"></span>
<span id="down-arrow">&#9660;</span>
`;
function E9(e) {
  let t = e.select("g.legendCells"),
    r = e.node().getBoundingClientRect();
  if (!Zr(r, t.node().getBoundingClientRect())) return;
  let n = e.select(".legend");
  t.selectAll(".label").text((a, o, i) => {
    let u = i[o];
    if (Zr(r, u.getBoundingClientRect())) {
      let l = cP(u, n, r);
      return `${a.substring(0, l - 3)}...`;
    } else return a;
  });
}
function cP(e, t, r) {
  let n = e.getBoundingClientRect(),
    a = t.node().createSVGPoint(),
    o = 3;
  return (a.x = r.right - n.left - o), (a.y = 0), e.getCharNumAtPosition(a);
}
var mo = 10;
function fa(e, t, r) {
  let n = fe(gi(e).getContainer()).node().getBoundingClientRect(),
    a = e.getBoundingClientRect(),
    o = {
      top: a.top + r - mo,
      right: a.right + t + mo,
      bottom: a.bottom + r + mo,
      left: a.left + t - mo,
    },
    i = { x: t, y: r };
  return (
    [
      { edge: "right", dimension: "x" },
      { edge: "left", dimension: "x" },
      { edge: "top", dimension: "y" },
      { edge: "bottom", dimension: "y" },
    ].forEach((l) => {
      if (Zr(n, o, l.edge)) {
        let s = o[l.edge] - n[l.edge];
        i[l.dimension] = i[l.dimension] - s;
      }
    }),
    i
  );
}
var O0 = "resize.for-dragging";
function I9() {
  let e = !0,
    t = null,
    r = (n) => {
      let a = n.node(),
        o = a.getRootNode().host.closest("perspective-viewer");
      (a.style.cursor = "move"),
        t.legend &&
          ((a.style.left = t.legend.left), (a.style.top = t.legend.top));
      let i = ui().on("drag", function (u) {
        let l = fa(this, u.dx, u.dy);
        (this.style.left = `${this.offsetLeft + l.x}px`),
          (this.style.top = `${this.offsetTop + l.y}px`);
        let s = { left: this.style.left, top: this.style.top };
        (t.legend = { ...t.legend, ...s }), (e = mP(a) ? dP(a) : sP(a, e));
      });
      i.on("end", function (u) {
        fe(window).on(O0, null),
          o?.dispatchEvent(new Event("perspective-config-update"));
      }),
        n.call(i);
    };
  return (r.settings = (...n) => (n.length ? ((t = n[0]), r) : t)), r;
}
function sP(e, t) {
  return (
    t !== !1 &&
      fe(window).on(O0, function () {
        let r = fa(e, 0, 0);
        (e.style.left = `${e.offsetLeft + r.x}px`),
          (e.style.top = `${e.offsetTop + r.y}px`);
      }),
    !1
  );
}
function dP(e) {
  return fe(window).on(O0, null), (e.style.left = "auto"), !0;
}
function mP(e) {
  let t = e.getBoundingClientRect(),
    r = fe(Kn(e)).node().getBoundingClientRect(),
    n = 5;
  return t.right + mo + n >= r.right && t.top - mo - n <= r.top;
}
var z9 = "horizontal-drag-handle",
  P9 = "vertical-drag-handle",
  hP = "corner-drag-handle",
  L9 = "dragHandles",
  R9 = 0,
  la = "resize";
function O9() {
  let e = 9,
    t = 3,
    r = null,
    n = { height: 100, width: 100 },
    a = { height: null, width: null },
    o = [],
    i = (h, y) => o.filter((x) => x.event === h).forEach((x) => x.execute(y)),
    u = (h) => {
      if (gP(h)) return;
      let y = {
          left: (re) => i(la, { horizontal: ee(re), vertical: !1 }),
          top: (re) => i(la, { horizontal: !1, vertical: X(re) }),
          right: (re) => i(la, { horizontal: j(re), vertical: !1 }),
          bottom: (re) => i(la, { horizontal: !1, vertical: K(re) }),
          topleft: (re) => i(la, { horizontal: ee(re), vertical: X(re) }),
          topright: (re) => i(la, { horizontal: j(re), vertical: X(re) }),
          bottomright: (re) => i(la, { horizontal: j(re), vertical: K(re) }),
          bottomleft: (re) => i(la, { horizontal: ee(re), vertical: K(re) }),
        },
        x = h.node();
      r.legend &&
        ((x.style.height = r.legend.height), (x.style.width = r.legend.width));
      let M = x.getBoundingClientRect(),
        A = h
          .append("svg")
          .attr("id", L9)
          .attr("width", M.width)
          .attr("height", M.height),
        N = A.append("g"),
        k = (re) => re === "left" || re === "right",
        D = { left: 0, top: e, right: M.width - e, bottom: e },
        B = { left: e, top: 0, right: e, bottom: M.height - e },
        F = ["left", "top", "right", "bottom"],
        [R, I, L, $] = F.map((re) =>
          N.append("rect")
            .attr("id", `drag${re}`)
            .attr("class", k(re) ? P9 : z9)
            .attr("y", B[re])
            .attr("x", D[re])
            .attr("height", k(re) ? M.height - e * 2 : e)
            .attr("width", k(re) ? e : M.width - e * 2)
            .attr("fill", k(re) ? "lightgreen" : "lightblue")
            .attr("fill-opacity", R9)
            .style("z-index", t)
            .attr("cursor", k(re) ? "ew-resize" : "ns-resize")
            .call(ui().on("drag", y[re])),
        ),
        G = (re) => `${re[0]}${re[1]}`,
        ue = {
          topleft: "nwse",
          topright: "nesw",
          bottomright: "nwse",
          bottomleft: "nesw",
        },
        ne = [
          ["top", "left"],
          ["top", "right"],
          ["bottom", "right"],
          ["bottom", "left"],
        ],
        [U, ae, J, H] = ne.map((re) =>
          N.append("rect")
            .attr("id", `drag${G(re)}`)
            .attr("class", `${hP} ${re[0]} ${re[1]}`)
            .attr("height", e)
            .attr("width", e)
            .attr("fill", "red")
            .attr("fill-opacity", R9)
            .style("z-index", t)
            .attr("cursor", `${ue[G(re)]}-resize`)
            .call(ui().on("drag", y[G(re)])),
        );
      de("height", "y", $), de("width", "x", L), le(A);
      function ee(re) {
        let me = s(fa(R.node(), re.x, 0).x, A, "width", (Me, Oe) => Me - Oe);
        return (
          (x.style.left = `${x.offsetLeft + me}px`),
          (x.style.width = `${x.offsetWidth - me}px`),
          Z(),
          te(L, me, "width", "x")
        );
      }
      function j(re) {
        let me = -s(fa(L.node(), re.dx, 0).x, A, "width", (Me, Oe) => Me + Oe);
        return l(me, "x", L, re)
          ? !1
          : ((x.style.width = `${x.offsetWidth - me}px`),
            Z(),
            te(L, me, "width", "x"));
      }
      function X(re) {
        let me = s(fa(I.node(), 0, re.y).y, A, "height", (Me, Oe) => Me - Oe);
        return (
          (x.style.top = `${x.offsetTop + me}px`),
          (x.style.height = `${x.offsetHeight - me}px`),
          Z(),
          te($, me, "height", "y")
        );
      }
      function K(re) {
        let me = -s(fa($.node(), 0, re.dy).y, A, "height", (Me, Oe) => Me + Oe);
        return l(me, "y", $, re)
          ? !1
          : ((x.style.height = `${x.offsetHeight - me}px`),
            Z(),
            te($, me, "height", "y"));
      }
      function Z() {
        let re = {
          top: x.style.top,
          left: x.style.left,
          height: x.style.height,
          width: x.style.width,
        };
        r.legend = { ...r.legend, ...re };
      }
      function te(re, me, Me, Oe) {
        return (
          xP(A, Me, me),
          vP(re, Oe, me),
          pP(A, me, Me, Me === "height" ? P9 : z9),
          le(A),
          me != 0
        );
      }
      function le(re) {
        U.attr("y", 0, "x", 0),
          ae.attr("y", 0).attr("x", re.attr("width") - e),
          J.attr("y", re.attr("height") - e).attr("x", re.attr("width") - e),
          H.attr("y", re.attr("height") - e).attr("x", 0);
      }
      function de(re, me, Me) {
        !!a[re] &&
          a[re] < M[re] &&
          ((x.style[re] = `${a[re]}px`), te(Me, M[re] - a[re], re, me));
      }
    };
  (u.on = (h, y) => (o.push({ event: h, execute: y }), u)),
    (u.zIndex = (h) => ((t = h), u)),
    (u.settings = (...h) => (h.length ? ((r = h[0]), u) : r)),
    (u.minWidth = (h) => (
      (n.width = h), a.width && (a.width = Math.max(n.width, a.width)), u
    )),
    (u.minHeight = (h) => (
      (n.height = h), a.height && (a.height = Math.max(n.height, a.height)), u
    )),
    (u.handleWidth = (h) => ((e = h), u)),
    (u.maxWidth = (h) => (
      (a.width = h), (n.width = Math.min(n.width, a.width)), u
    )),
    (u.maxHeight = (h) => (
      (a.height = h), (n.height = Math.min(n.height, a.height)), u
    ));
  function l(h, y, x, M) {
    let A = (k, D, B, F) => k < 0 && F[D] < Number(B.attr(D)),
      N = (k, D, B, F) => k > 0 && F[D] > Number(B.attr(D));
    return A(h, y, x, M) || N(h, y, x, M);
  }
  function s(h, y, x, M) {
    let A = M(Number(y.attr(x)), h);
    if (A < n[x]) {
      let N = n[x] - A;
      return M(h, N);
    }
    if (!!a[x] && A > a[x]) {
      let N = a[x] - A;
      return M(h, N);
    }
    return h;
  }
  return u;
}
var pP = (e, t, r, n) => {
    e.selectAll(`.${n}`).each((o, i, u) => {
      let l = u[i];
      fe(l).attr(r, l.getBoundingClientRect()[r] - t);
    });
  },
  gP = (e) => e.select(`#${L9}`).size() > 0,
  vP = (e, t, r) => e.attr(t, Number(e.attr(t)) - r),
  xP = (e, t, r) => e.attr(t, e.node().getBoundingClientRect()[t] - r);
var B9 = 16,
  F9 = 20,
  B0 = (e, t) => {
    let r = e || Cs(),
      n = [],
      a = 1,
      o,
      i = t.legend && t.legend.pageIndex ? t.legend.pageIndex : 0,
      u = () => {},
      l = I9().settings(t),
      s,
      h = (R) => {
        (n = r.scale().domain()),
          (s = O9()
            .settings(t)
            .maxHeight(n.length * B9 + F9)
            .on("resize", () => y(R))),
          s(R),
          l(R),
          y(R);
      },
      y = (R) => {
        k(R), x(R), M(R), E9(R);
      },
      x = (R) => {
        let I = B(R);
        I.style("display", a <= 1 ? "none" : "block"),
          I.select("#page-text").text(`${i + 1}/${a}`),
          I.select("#up-arrow")
            .attr("class", i === 0 ? "disabled" : "")
            .on("click", () => {
              i > 0 && (A(i - 1), y(R));
            }),
          I.select("#down-arrow")
            .attr("class", i >= a - 1 ? "disabled" : "")
            .on("click", () => {
              i < a - 1 && (A(i + 1), y(R));
            });
      },
      M = (R) => {
        a > 1 && r.cellFilter(N()), R.select("g.legendCells").remove();
        let I = F(R);
        I.call(r);
        let L = R.select("g.legendCells").node().getBBox();
        I.attr("height", L.height + F9), u(R);
      },
      A = (R) => {
        (i = R), (t.legend = { ...t.legend, pageIndex: i });
      },
      N = () => (R, I) => I >= o * i && I < o * i + o,
      k = (R) => {
        let I = R.node().getBoundingClientRect(),
          L = Math.floor(I.height / B9) - 1;
        (o = L < n.length ? L - 1 : L), (a = D(L)), (i = Math.min(i, a - 1));
      },
      D = (R) => Math.ceil(n.length / R),
      B = (R) =>
        ht(R, ".legend-controls", () =>
          R.append("g").attr("class", "legend-controls").html(D9),
        ),
      F = (R) =>
        ht(R, ".legend", () => R.append("svg").attr("class", "legend"));
    return (
      (h.decorate = (...R) => (R.length ? ((u = R[0]), h) : u)),
      (0, H9.rebindAll)(h, r),
      h
    );
  };
var Y9 = (e) => B0(Cs().shape("circle").shapeRadius(6), e),
  bP = (e) => B0(V9().shapePadding(1).labelOffset(3), e),
  Pt = () => F0(Y9),
  gf = () => F0(bP, W9),
  q9 = () => F0(Y9, W9);
function W9(e) {
  if (!e) return null;
  let t = e.domain(),
    r = e.range().map((n) => rc().type(n)());
  return fr().domain(t).range(r);
}
function F0(e, t) {
  let r = {},
    n = null,
    a = null;
  function o(i) {
    if (n && n.range().length > 1) {
      let u = e(r);
      u
        .scale(n)
        .orient("vertical")
        .on("cellclick", function (s) {
          let h = this.__data__;
          (r.hideKeys = r.hideKeys || []),
            r.hideKeys.includes(h)
              ? (r.hideKeys = r.hideKeys.filter((y) => y !== h))
              : r.hideKeys.push(h),
            gi(this)._draw();
        }),
        u.labels((s) => {
          let h = s.domain[s.i].split("|");
          return r.mainValues.length <= 1 && h.length > 1
            ? h.slice(0, h.length - 1).join("|")
            : s.domain[s.i];
        });
      let l = ht(i, "div.legend-container", () => i.append("div"));
      u.decorate((s) => {
        let h = (x) => r.hideKeys && r.hideKeys.includes(x),
          y = s
            .select("g.legendCells")
            .attr("transform", "translate(20,20)")
            .selectAll("g.cell");
        y.classed("hidden", h),
          y.append("title").html((x) => x),
          a &&
            y
              .select("circle, path")
              .style("fill", (x) => (h(x) ? null : a(x)))
              .style("stroke", (x) => (h(x) ? null : en(a(x))));
      }),
        l
          .attr("class", "legend-container")
          .attr("borderbox-on-hover", !0)
          .style("z-index", "2")
          .call(u);
    }
  }
  return (
    (o.settings = (...i) => (i.length ? ((r = i[0]), o) : r)),
    (o.scale = (...i) => (i.length ? ((n = t ? t(i[0]) : i[0]), o) : n)),
    (o.color = (...i) => (i.length ? ((a = i[0]), o) : a)),
    o
  );
}
function wr(e, t) {
  let r = t || e.data;
  return e.hideKeys && e.hideKeys.length > 0
    ? r.map((n) => {
        let a = { ...n };
        return (
          e.hideKeys.forEach((o) => {
            delete a[o];
          }),
          a
        );
      })
    : r;
}
function Ni(e, t) {
  let r = t || e.data;
  return e.hideKeys && e.hideKeys.length > 0
    ? r.map((n) => {
        let a = {};
        return (
          Object.keys(n).map((o) => {
            e.hideKeys.includes(ta(o)) || (a[o] = n[o]);
          }),
          a
        );
      })
    : r;
}
var ca = Re(Le()),
  yP = (e) => (t) =>
    t
      .style("stroke-width", "1.0")
      .style("stroke", e ? e.colorStyles.grid.gridLineColor : "#bbb"),
  wP = (e) => (t) => {
    (t.strokeStyle = e ? e.colorStyles.grid.gridLineColor : "#bbb"),
      (t.lineWidth = 1);
  },
  _P = (e) => e.style("display", "none"),
  SP = (e) => (t) => {
    (t.lineWidth = 1),
      (t.strokeStyle = e ? e.colorStyles.grid.gridLineColor : "#bbb");
  },
  pt = (e, t) => {
    let r = "both",
      n = !1,
      a = null,
      o = null,
      i = null,
      u = ca.seriesSvgMulti(),
      l = ca.annotationSvgGridline(),
      s = yP(t),
      h = _P,
      y = function (...x) {
        n &&
          ((u = ca.seriesCanvasMulti().context(i)),
          (l = ca.annotationCanvasGridline()),
          (s = wP(t)),
          (h = SP(t)));
        let M = u.xScale(a).yScale(o),
          A = r === "vertical" ? h : s,
          N = r === "horizontal" ? h : s,
          k = l.xDecorate(A).yDecorate(N);
        return M.series([k, e])(...x);
      };
    return (
      (y.orient = (...x) => (x.length ? ((r = x[0]), y) : r)),
      (y.canvas = (...x) => (x.length ? ((n = x[0]), y) : n)),
      (y.xScale = (...x) => (x.length ? ((a = x[0]), y) : a)),
      (y.yScale = (...x) => (x.length ? ((o = x[0]), y) : o)),
      (y.context = (...x) => (x.length ? ((i = x[0]), y) : i)),
      y
    );
  };
var $9 = Re(Le()),
  Rt = () => {
    let e = $c(),
      t = (r) => {
        let n = e.pad(),
          a = e.padUnit(),
          o = 1;
        switch (a) {
          case "domain":
            break;
          case "percent": {
            o = r[1] - r[0];
            break;
          }
          default:
            throw new Error("Unknown padUnit: " + a);
        }
        let i = r[0] - n[0] * o,
          u = r[1] + n[1] * o;
        return (
          (r[0] = r[0] >= 0 && i < 0 ? 0 : i),
          (r[1] = r[1] <= 0 && u > 0 ? 0 : u),
          r
        );
      };
    return $9.rebindAll(t, e), t;
  };
var G9 = `<button id="zoom-reset">Reset zoom</button>
<button id="one-year">1 Year</button>
<button id="six-months">6 Months</button>
<button id="one-month">1 Month</button>
`;
var gt = () => {
  let e = null,
    t = null,
    r = null,
    n = null,
    a = null,
    o = null,
    i = !1,
    u = !1,
    l = () => {};
  function s(M) {
    let A = `d3fc-${u ? "canvas" : "svg"}.plot-area`;
    if (r || a) {
      let N = n && n.domain()[0] instanceof Date,
        k = Bc().on("zoom", (B) => {
          let { transform: F } = B;
          (t.zoom = { k: F.k, x: F.x, y: F.y }), h(F), M.call(e);
          let R = F.k === 1 && F.x === 0 && F.y === 0,
            I = y(M).style("display", R ? "none" : "");
          I.select("#zoom-reset").on("click", () =>
            M.select(A).call(k.transform, Qr),
          );
          let L = I.select("#one-year").style("display", N ? "" : "none"),
            $ = I.select("#six-months").style("display", N ? "" : "none"),
            G = I.select("#one-month").style("display", N ? "" : "none");
          if (N) {
            let ue = (ne) => () => {
              let U = new Date(r.domain()[0]),
                ae = new Date(U);
              ne(U, ae);
              let J = n.range(),
                H = (J[1] - J[0]) / (n(ae) - n(U)),
                ee = -n(U) * H,
                j = 0;
              if (a) {
                let X = a.domain().reduce((K, Z) => K + Z) / 2;
                j = -o(X) * H + a(X);
              }
              M.select(A).call(k.transform, Qr.translate(ee, j).scale(H));
            };
            L.on(
              "click",
              ue((ne, U) => U.setYear(ne.getFullYear() + 1)),
            ),
              $.on(
                "click",
                ue((ne, U) => U.setMonth(ne.getMonth() + 6)),
              ),
              G.on(
                "click",
                ue((ne, U) => U.setMonth(ne.getMonth() + 1)),
              );
          }
        }),
        D = e.decorate();
      e.decorate((B, F) => {
        if ((D(B, F), !i)) {
          i = !0;
          let R = B.select(A),
            I = u ? window.devicePixelRatio : 1;
          R.on("measure.zoom-range", (L) => {
            if (
              (n && n.range([0, L.detail.width / I]),
              o && o.range([0, L.detail.height / I]),
              t.zoom)
            ) {
              let $ = Qr.translate(t.zoom.x, t.zoom.y).scale(t.zoom.k);
              R.call(k.transform, $);
            }
          }).call(k);
        }
      });
    }
    M.call(e);
  }
  (s.chart = (...M) => (M.length ? ((e = M[0]), s) : e)),
    (s.settings = (...M) => (M.length ? ((t = M[0]), s) : t)),
    (s.xScale = (...M) =>
      M.length ? ((r = x(M[0])), (n = r ? r.copy() : null), s) : r),
    (s.yScale = (...M) => {
      if (!M.length) return a;
      if (((a = x(M[0])), (o = a ? a.copy() : null), o)) {
        let A = o.domain();
        o.domain([A[1], A[0]]);
      }
      return s;
    }),
    (s.canvas = (...M) => (M.length ? ((u = M[0]), s) : u)),
    (s.onChange = (...M) => (M.length ? ((l = M[0]), s) : l));
  let h = (M) => {
      let A = { ...M };
      if (
        (r && (r.domain(M.rescaleX(n).domain()), (A.xDomain = r.domain())), a)
      ) {
        let N = M.rescaleY(o).domain();
        a.domain([N[1], N[0]]), (A.yDomain = a.domain());
      }
      l(A);
    },
    y = (M) =>
      ht(M, ".zoom-controls", () =>
        M.append("div")
          .attr("class", "zoom-controls")
          .style("display", "none")
          .html(G9),
      ),
    x = (M) => (M && M.nice ? M : null);
  return s;
};
function X9(e, t) {
  let r = Zc(t, wr(t)),
    n = Jr(t),
    a = Pt().settings(t).scale(n),
    o = Kc(t, n).orient("horizontal"),
    i = U9.seriesSvgMulti()
      .mapping((y, x) => y[x])
      .series(r.map(() => o)),
    u = Ge(t)
      .settingName("mainValues")
      .valueName("mainValue")
      .memoValue(t.axisMemo[0])
      .excludeType(We.ordinal)
      .include([0])
      .paddingStrategy(Rt())(r),
    l = Ge(t)
      .excludeType(We.linear)
      .settingName("crossValues")
      .valueName("crossValue")
      .orient("vertical")(r),
    s = br(u, l).plotArea(pt(i, t).orient("horizontal"));
  s.yPaddingInner &&
    (s.yPaddingInner(0.5), s.yPaddingOuter(0.25), o.align("left")),
    s.xNice && s.xNice();
  let h = gt().chart(s).settings(t).yScale(l.scale);
  e.datum(r).call(h), e.call(a);
}
X9.plugin = {
  name: "X Bar",
  category: "X Chart",
  max_cells: 1e3,
  max_columns: 50,
  render_warning: !0,
  initial: { names: ["X Axis"] },
};
var j9 = X9;
var nM = Re(Le());
var J9 = (e, t) => {
    if (!Q9(e) || !Q9(t)) return;
    let r = K9(e),
      n = K9(t);
    r > n ? (t[0] = Z9(t, r)) : (e[0] = Z9(e, n));
  },
  Q9 = (e) => e.length === 2 && !isNaN(e[0]) && !isNaN(e[1]) && e[0] !== e[1],
  K9 = (e) => (0 - e[0]) / (e[1] - e[0]),
  Z9 = (e, t) => (t * e[1]) / (t - 1);
var eM = Re(Le());
var tM = (e) => {
  let t = [],
    r = !1,
    n,
    a = (i) => {
      i.text("");
      let u = eM.dataJoin("span", "splitter-label").key((h) => h),
        l = !r && t.length === 1,
        s = n && e.splitValues.length === 0;
      u(i, t)
        .classed("disabled", l)
        .text((h) => h.name)
        .style("color", (h) => (s ? en(n(h.name)) : void 0))
        .on("click", (h, y) => {
          l ||
            (r
              ? (e.splitMainValues = e.splitMainValues.filter(
                  (x) => x != y.name,
                ))
              : (e.splitMainValues = [y.name].concat(e.splitMainValues || [])),
            h.target
              .getRootNode()
              .host.closest("perspective-viewer")
              ?.dispatchEvent(new Event("perspective-config-update")),
            o(i));
        });
    },
    o = (i) => {
      let u = gi(i.node());
      (u._container.innerHTML = ""), u._draw();
    };
  return (
    (a.labels = (...i) => (i.length ? ((t = i[0]), a) : t)),
    (a.alt = (...i) => (i.length ? ((r = i[0]), a) : r)),
    (a.color = (...i) => (i.length ? ((n = i[0]), a) : n)),
    a
  );
};
var sa = (e, t, r = AP) => {
    let n,
      a,
      o,
      i = e.splitMainValues || [],
      u = (h) => {
        let y = h.split("|");
        return i.includes(y[y.length - 1]);
      },
      l = e.mainValues.some((h) => u(h.name));
    (a = l ? r(t, (h) => !u(h)) : t), (o = l ? r(t, u) : null);
    let s = (h) => {
      if (e.mainValues.length === 1) return;
      let y = e.mainValues.map((N, k) => ({ index: k, name: N.name })),
        x = y.filter((N) => !u(N.name)),
        M = y.filter((N) => u(N.name)),
        A = () => tM(e).color(n);
      h.select(".y-label.left-label").call(A().labels(x)),
        h.select(".y-label.right-label").call(A().labels(M).alt(!0));
    };
    return (
      (s.color = (...h) => (h.length ? ((n = h[0]), s) : n)),
      (s.haveSplit = () => l),
      (s.data = (...h) => (h.length ? ((a = h[0]), s) : a)),
      (s.altData = (...h) => (h.length ? ((o = h[0]), s) : o)),
      s
    );
  },
  AP = (e, t) => e.map((r) => r.filter((n) => t(n.key))),
  H0 = (e, t) =>
    e.map((r) =>
      t(r.key) ? r : r.map((n) => Object.assign({}, n, { mainValue: null })),
    ),
  rM = (e, t) => e.map((r) => H0(r, t));
function aM(e, t) {
  let r = Zc(t, wr(t)),
    n = Jr(t),
    a = Pt().settings(t).scale(n),
    o = Kc(t, n).orient("vertical"),
    i = nM
      .seriesSvgMulti()
      .mapping((N, k) => N[k])
      .series(r.map(() => o)),
    u = Ge(t)
      .excludeType(We.linear)
      .settingName("crossValues")
      .valueName("crossValue")(r),
    l = Ge(t)
      .settingName("mainValues")
      .valueName("mainValue")
      .memoValue(t.axisMemo[1])
      .excludeType(We.ordinal)
      .orient("vertical")
      .include([0])
      .paddingStrategy(Rt()),
    s = t.mainValues.length > 1 ? rM : H0,
    h = sa(t, r, s).color(n),
    y = l(h.data()),
    x = h.haveSplit() ? i : pt(i, t).orient("vertical"),
    M = br(u, y).axisSplitter(h).plotArea(x);
  M.xPaddingInner &&
    (M.xPaddingInner(0.5), M.xPaddingOuter(0.25), o.align("left")),
    M.yNice && M.yNice();
  let A = gt().chart(M).settings(t).xScale(u.scale);
  if (h.haveSplit()) {
    let N = l(h.altData());
    J9(y.domain, N.domain), M.yDomain(y.domain).altAxis(N);
  }
  e.datum(h.data()).call(A), e.call(a);
}
aM.plugin = {
  name: "Y Bar",
  category: "Y Chart",
  max_cells: 1e3,
  max_columns: 50,
  render_warning: !0,
  initial: { names: ["Y Axis"] },
};
var oM = aM;
var fM = Re(Le());
var iM = Re(Le());
function Di(e, t) {
  let r = iM.seriesSvgLine(),
    n =
      e.data.length *
      (e.data?.length > 0
        ? Object.keys(e.data[0]).length - (e.crossValues?.length > 0 ? 1 : 0)
        : 0),
    a = Math.max(1, Math.min(3, Math.floor(e.size.width / n / 2)));
  return (
    (r = r.decorate((o) => {
      o.style("stroke", (i) => en(t(i[0] && i[0].key))).style(
        "stroke-width",
        a,
      );
    })),
    r.crossValue((o) => o.crossValue).mainValue((o) => o.mainValue)
  );
}
function uM(e, t) {
  let r = yr(e);
  return t.map((n, a) =>
    Object.keys(n)
      .filter((o) => o !== "__ROW_PATH__")
      .map((o) => ({ key: o, crossValue: r(n, a), mainValue: n[o], row: n })),
  );
}
var Ts = function (e) {
  let t = [];
  for (let r of e)
    for (let n = 0; n < r.length; n++)
      r[n].mainValue !== null && ((t[n] = t[n] || []), t[n].push(r[n]));
  return t;
};
var Vs = Re(Le());
var Y0 = (e, t, r = Math.min) => {
  let n = (i) =>
      i.reduce((u, l) => {
        let s = a(l, t);
        return s && (!u || r(u.value, s.value) === s.value) ? s : u;
      }, null),
    a = (i) => {
      if (Array.isArray(i)) return n(i, t);
      let u = t(i);
      return u !== null ? { item: i, value: u } : null;
    },
    o = n(e, t);
  return o ? o.item : null;
};
var jt = () => {
  let e = ea().alwaysShow(!0),
    t = null,
    r = null,
    n = null,
    a = null,
    o = !1,
    i = null,
    u = "crossValue",
    l = "mainValue",
    s = null,
    h = 1;
  function y(A) {
    let N = `d3fc-${o ? "canvas" : "svg"}.plot-area`;
    if (t || r) {
      let k = null,
        D = Vs.pointer().on("point", (B) => {
          let F = B.length ? M(B[0]) : null;
          k = F ? [F.data] : [];
          let R = F ? F.scale : r;
          x(A, k, R);
        });
      A.select(N)
        .on("measure.nearbyTip", () => x(A, []))
        .on("click", () => {
          k.length && tf(A.node(), k[0], e.settings());
        })
        .call(D);
    }
  }
  let x = (A, N, k = r) => {
      let D = A.select("d3fc-svg.plot-area svg")
        .selectAll("circle.nearbyTip")
        .data(N);
      D.exit().remove(),
        D.enter()
          .append("circle")
          .attr("class", "nearbyTip")
          .merge(D)
          .attr("r", (B) => (a ? h * Math.sqrt(a(B.size)) : 10))
          .attr("transform", (B) => `translate(${t(B[u])},${k(B[l])})`)
          .style("stroke", "none")
          .style("fill", (B) => n && B.key && Ja(n(B.key))),
        e(D);
    },
    M = (A) => {
      let N = (B) => (F) =>
          F[l] === void 0 || F[l] === null || F[u] === void 0 || F[u] === null
            ? null
            : Math.sqrt(
                Math.pow(t(F[u]) - A.x, 2) + Math.pow(B(F[l]) - A.y, 2),
              ),
        k = N(r),
        D = Y0(i, k, Math.min);
      if (s) {
        let B = N(s.yScale),
          F = Y0(s.data, B, Math.min);
        return k(D) <= B(F)
          ? { data: D, scale: r }
          : { data: F, scale: s.yScale };
      }
      return { data: D, scale: r };
    };
  return (
    (y.scaleFactor = (...A) => (A.length ? ((h = A[0]), y) : h)),
    (y.xScale = (...A) => (A.length ? ((t = A[0]), y) : t)),
    (y.yScale = (...A) => (A.length ? ((r = A[0]), y) : r)),
    (y.color = (...A) => (A.length ? ((n = A[0]), y) : n)),
    (y.size = (...A) =>
      A.length ? ((a = A[0] ? A[0].copy().range([40, 4e3]) : null), y) : a),
    (y.canvas = (...A) => (A.length ? ((o = A[0]), y) : o)),
    (y.data = (...A) => (A.length ? ((i = A[0]), y) : i)),
    (y.xValueName = (...A) => (A.length ? ((u = A[0]), y) : u)),
    (y.yValueName = (...A) => (A.length ? ((l = A[0]), y) : l)),
    (y.altDataWithScale = (...A) => (A.length ? ((s = A[0]), y) : s)),
    Vs.rebindAll(y, e),
    y
  );
};
function lM(e, t) {
  let r = uM(t, wr(t)),
    n = Jr(t),
    a = Pt().settings(t).scale(n),
    o = fM.seriesSvgRepeat().series(Di(t, n)).orient("horizontal"),
    i = Rt().pad([0.1, 0.1]).padUnit("percent"),
    u = sa(t, Ts(r)).color(n),
    l = Ge(t)
      .excludeType(We.linear)
      .settingName("crossValues")
      .valueName("crossValue")(r),
    s = Ge(t)
      .settingName("mainValues")
      .valueName("mainValue")
      .memoValue(u.haveSplit() ? null : t.axisMemo[0])
      .orient("vertical")
      .paddingStrategy(i),
    h = s(u.data()),
    y = u.haveSplit() ? o : pt(o, t).orient("vertical"),
    x = br(l, h).axisSplitter(u).plotArea(y);
  x.yNice && x.yNice();
  let M = gt().chart(x).settings(t).xScale(l.scale),
    A = jt().settings(t).xScale(l.scale).yScale(h.scale).color(n).data(r);
  if (u.haveSplit()) {
    let k = s(u.altData());
    x.altAxis(k),
      A.data(u.data()).altDataWithScale({ yScale: k.scale, data: u.altData() });
  }
  let N = u.data();
  e.datum(N).call(M), e.call(A), e.call(a);
}
lM.plugin = {
  name: "Y Line",
  category: "Y Chart",
  max_cells: 4e3,
  max_columns: 50,
  render_warning: !0,
  initial: { names: ["Y Axis"] },
};
var cM = lM;
var hM = Re(Le());
var sM = Re(Le());
var kP = [$a, Ko, Zo, ei, Jo, ti, ri];
function Ns(e) {
  return e.length > 1 ? fr().domain(e).range(kP) : null;
}
var CP = 8,
  TP = 1;
function dM(e, t, r, n, a, o, i = 1) {
  let u = (0, sM.seriesCanvasPoint)()
    .crossValue((l) => l.x)
    .mainValue((l) => l.y);
  return (
    r && u.size((l) => Math.round(i * r(l.size))),
    o && u.type(o(t)),
    u.decorate((l, s) => {
      let h = n(s.colorValue),
        y = e.colorStyles && e.colorStyles.opacity;
      if (a) {
        let { type: x } = e.mainValues.find((A) => A.name === a),
          M = _n(x, s.row[a]);
        if (M !== null) {
          (l.fillStyle = e.textStyles.color), (l.font = e.textStyles.font);
          let A = 0;
          r && (A = Math.sqrt((i * r(s.size)) / Math.PI) * TP);
          let N = A + CP;
          l.fillText(M, N, 4);
        }
      }
      (l.strokeStyle = en(h)), (l.fillStyle = Ja(h, y));
    }),
    u
  );
}
function Ds(e) {
  let t = e.data && e.data.length > 0 ? e.data[0] : {},
    r = [];
  return (
    Object.keys(t).forEach((n) => {
      if (n !== "__ROW_PATH__") {
        let a = ta(n);
        r.includes(a) || r.push(a);
      }
    }),
    Ns(r)
  );
}
function mM(e, t) {
  let r = e.mainValues.length;
  return t.map((n) => {
    let a = Object.keys(n).filter((i) => i !== "__ROW_PATH__"),
      o = new Array(a.length / r);
    for (let i = 0; i < a.length / r; i++)
      o[i] = {
        key: ta(a[i * r]),
        crossValue: n[a[i * r]],
        mainValue: n[a[i * r + 1]],
        row: n,
      };
    return o;
  });
}
function pM(e, t) {
  let r = Ts(mM(t, Ni(t))),
    n = ES(t),
    a = Ds(t),
    o = null;
  n.domain().length >= 2 && (o = q9().settings(t).scale(a).color(n));
  let i = hM.seriesSvgRepeat().series(Di(t, n)).orient("horizontal"),
    u = Rt().pad([0.1, 0.1]).padUnit("percent"),
    l = Ge(t)
      .settingName("mainValues")
      .settingValue(t.mainValues[0].name)
      .valueName("crossValue")
      .memoValue(t.axisMemo[0])
      .paddingStrategy(u),
    h = Ge(t)
      .settingName("mainValues")
      .settingValue(t.mainValues[1].name)
      .valueName("mainValue")
      .memoValue(t.axisMemo[1])
      .orient("vertical")
      .paddingStrategy(u)(r),
    y = l(r),
    x = pt(i, t).orient("vertical"),
    M = br(y, h)
      .xLabel(t.mainValues[0].name)
      .yLabel(t.mainValues[1].name)
      .plotArea(x);
  M.xNice && M.xNice(), M.yNice && M.yNice();
  let A = gt().chart(M).settings(t).xScale(y.scale).yScale(h.scale),
    N = jt().settings(t).xScale(y.scale).yScale(h.scale).color(n).data(r);
  e.datum(r).call(A), e.call(N), o && e.call(o);
}
pM.plugin = {
  name: "X/Y Line",
  category: "X/Y Chart",
  max_cells: 5e4,
  max_columns: 50,
  render_warning: !0,
  initial: { type: "number", count: 2, names: ["X Axis", "Y Axis", "Tooltip"] },
  selectMode: "toggle",
};
var gM = pM;
var vf = Re(Le());
var vM = Re(Le());
function xM(e, t) {
  let r = vM.seriesSvgArea();
  return (
    (r = r.decorate((n) => {
      n.style("fill", (a) => t(a[0].key)).style("opacity", 0.5);
    })),
    r
      .crossValue((n) => n.crossValue)
      .mainValue((n) => n.mainValue)
      .baseValue((n) => n.baseValue)
  );
}
function bM(e, t) {
  let r = yr(e);
  return t.map((n, a) => {
    let o = {};
    return Object.keys(n)
      .filter((i) => i !== "__ROW_PATH__")
      .map((i) => {
        let u = i.split("|"),
          l = u[u.length - 1],
          s = o[l] || 0,
          h = s + n[i];
        return (
          (o[l] = h),
          { key: i, crossValue: r(n, a), mainValue: h, baseValue: s, row: n }
        );
      });
  });
}
function yM(e, t) {
  let r = bM(t, wr(t)),
    n = Jr(t),
    a = Pt().settings(t).scale(n),
    o = vf.seriesSvgRepeat().series(xM(t, n).orient("vertical")),
    i = vf.seriesSvgRepeat().series(Di(t, n)).orient("vertical"),
    u = vf.seriesSvgMulti().series([o, i]),
    l = Ge(t)
      .excludeType(We.linear)
      .settingName("crossValues")
      .valueName("crossValue")(r),
    s = Ge(t)
      .settingName("mainValues")
      .valueName("mainValue")
      .memoValue(t.axisMemo[1])
      .excludeType(We.ordinal)
      .orient("vertical")
      .include([0])
      .paddingStrategy(Rt()),
    h = sa(t, r).color(n),
    y = s(h.data()),
    x = h.haveSplit() ? u : pt(u, t).orient("vertical"),
    M = br(l, y).axisSplitter(h).plotArea(x);
  M.yNice && M.yNice();
  let A = gt().chart(M).settings(t).xScale(l.scale),
    N = jt().settings(t).xScale(l.scale).yScale(y.scale).color(n).data(r);
  if (h.haveSplit()) {
    let k = s(h.altData());
    M.altAxis(k),
      N.data(h.data()).altDataWithScale({ yScale: k.scale, data: h.altData() });
  }
  e.datum(h.data()).call(A), e.call(N), e.call(a);
}
yM.plugin = {
  name: "Y Area",
  category: "Y Chart",
  max_cells: 4e3,
  max_columns: 50,
  render_warning: !0,
  initial: { names: ["Y Axis"] },
};
var wM = yM;
var AM = Re(Le());
var _M = Re(Le());
function SM(e, t, r, n) {
  let a = _M.seriesSvgPoint().size(100),
    o = e.colorStyles && e.colorStyles.opacity;
  return (
    n && a.type(n(t)),
    a.decorate((i) => {
      i.style("stroke", (u) => en(r(u.colorValue || t))).style("fill", (u) =>
        Ja(r(u.colorValue || t), o),
      );
    }),
    a.crossValue((i) => i.crossValue).mainValue((i) => i.mainValue)
  );
}
function MM(e) {
  let t = e.data && e.data.length > 0 ? e.data[0] : {},
    r = Object.keys(t).filter((n) => n !== "__ROW_PATH__");
  return Ns(r);
}
function kM(e, t) {
  let r = zS(t, wr(t)),
    n = MM(t),
    a = Jr(t),
    o = gf().settings(t).scale(n).color(a),
    i = AM.seriesSvgMulti()
      .mapping((k, D) => k[D])
      .series(r.map((k) => SM(t, k.key, a, n))),
    u = Rt().pad([0.05, 0.05]).padUnit("percent"),
    l = Ge(t)
      .excludeType(We.linear)
      .settingName("crossValues")
      .valueName("crossValue")(r),
    s = Ge(t)
      .settingName("mainValues")
      .valueName("mainValue")
      .memoValue(t.axisMemo[1])
      .orient("vertical")
      .paddingStrategy(u),
    h = sa(t, r).color(a),
    y = s(h.data()),
    x = h.haveSplit() ? i : pt(i, t).orient("vertical"),
    M = br(l, y).axisSplitter(h).plotArea(x);
  M.yNice && M.yNice();
  let A = gt().chart(M).settings(t).xScale(l.scale),
    N = jt().settings(t).xScale(l.scale).yScale(y.scale).color(a).data(r);
  if (h.haveSplit()) {
    let k = s(h.altData());
    M.altAxis(k),
      N.data(h.data()).altDataWithScale({ yScale: k.scale, data: h.altData() });
  }
  e.datum(h.data()).call(A), e.call(N), o && e.call(o);
}
kM.plugin = {
  name: "Y Scatter",
  category: "Y Chart",
  max_cells: 4e3,
  max_columns: 50,
  render_warning: !0,
  initial: { names: ["Y Axis"] },
};
var CM = kM;
var DM = Re(Le());
function TM(e, t) {
  return to(e, t, { excludeEmpty: !0 }).map((r) => VP(e, r));
}
function VP(e, t) {
  let r = yr(e),
    n = t.map((a, o) => ({
      crossValue: r(a, o),
      mainValues: e.mainValues.map((i) => a[i.name]),
      x: a[e.mainValues[0].name],
      y: a[e.mainValues[1].name],
      colorValue: e.realValues[2] ? a[e.realValues[2]] : void 0,
      size: e.realValues[3] ? a[e.realValues[3]] : void 0,
      key: t.key,
      row: a,
    }));
  return (n.key = t.key), n;
}
function VM(e, t, r, n) {
  return Yr().domain(NM(t, r, n));
}
function da(e, t, r, n) {
  let a = NM(t, r, n),
    o = e.colorStyles.gradient.full;
  if (a[0] >= 0) o = e.colorStyles.gradient.positive;
  else if (a[1] <= 0) o = e.colorStyles.gradient.negative;
  else {
    let u = Math.max(-a[0], a[1]);
    a = [-u, u];
  }
  let i = NP(o);
  return Bo(i).domain(a);
}
var NM = (e, t, r) => r || Xg().valueName(t).pad([0, 0])(e),
  NP = (e) => {
    let t = e.slice(1).map((r, n) => tt(e[n][1], r[1]));
    return (r) => {
      let n = e.findIndex(
        (u, l) => l < e.length - 1 && r <= e[l + 1][0] && r > u[0],
      );
      if (n === -1) return r <= e[0][0] ? e[0][1] : e[e.length - 1][1];
      let a = t[n],
        [o] = e[n],
        [i] = e[n + 1];
      return a((r - o) / (i - o));
    };
  };
var ma = Re(Le());
function ha() {
  let e = null;
  function t(r) {
    let n = ht(r, "div.legend-container", () =>
        r
          .append("div")
          .attr("class", "legend-container legend-color")
          .style("z-index", "2"),
      ),
      { width: a, height: o } = n.node().getBoundingClientRect(),
      i = Ar().domain([0, 1]).range([0, a]),
      u = e.copy().nice().domain(),
      l = ma.extentLinear().pad([0.1, 0.1]).padUnit("percent")(u),
      [s, h] = l,
      y = Hc(s, h, (h - s) / o),
      x = Yr().domain(l).range([o, 0]),
      M = ma
        .autoBandwidth(ma.seriesSvgBar())
        .xScale(i)
        .yScale(x)
        .crossValue(0)
        .baseValue((R, I) => y[Math.max(0, I - 1)])
        .mainValue((R) => R)
        .decorate((R) => {
          R.selectAll("path").style("fill", (I) => e(I));
        }),
      A = u[0] < 0 && u[1] > 0 ? 0 : Math.round((u[1] + u[0]) / 2),
      N = [...u, A],
      k = ma
        .axisRight(x)
        .tickValues(N)
        .tickSizeOuter(0)
        .tickFormat((R) => Gc(R)),
      D = ht(n, "svg", () => n.append("svg"))
        .style("width", a)
        .style("height", o),
      B = ht(D, "g", () => D.append("g"))
        .datum(y)
        .call(M),
      F = Math.abs(B.node().getBBox().x);
    ht(D, "#legend-axis", () => D.append("g").attr("id", "legend-axis"))
      .attr("transform", `translate(${F})`)
      .datum(y)
      .call(k)
      .select(".domain")
      .attr("visibility", "hidden");
  }
  return (t.scale = (...r) => (r.length ? ((e = r[0]), t) : e)), t;
}
function DP([e, t], [r, n]) {
  let a = (n - t) / (r - e),
    o = n - a * r;
  return function (i) {
    let u = i.node(),
      l = Math.min(u.clientWidth, u.clientHeight);
    return Math.min(n, Math.max(t, a * l + o));
  };
}
function EM(e, t) {
  let r = TM(t, Ni(t)),
    n = Ds(t),
    a = null,
    o = null,
    i = 2,
    u = t.realValues[i],
    l = u != null,
    s = t.mainValues.find((I) => I.name === u)?.type === "string",
    h = t.splitValues.length > 0;
  l
    ? s
      ? h
        ? ((a = yi(t, r)), (o = gf().settings(t).scale(n)))
        : ((a = DS(t, i)), (o = Pt().settings(t).scale(a)))
      : ((a = da(t, r, "colorValue")), (o = ha().scale(a)))
    : ((a = Nr().settings(t).domain([""])()), (o = gf().settings(t).scale(n)));
  let y = t.realValues[3] ? VM(t, r, "size").range([10, 1e4]) : null,
    x = t.realValues[4],
    M = DP([600, 0.1], [1600, 1])(e),
    A = DM.seriesCanvasMulti()
      .mapping((I, L) => I[L])
      .series(r.map((I) => dM(t, I.key, y, a, x, n, M))),
    N = () =>
      Ge(t).settingName("mainValues").paddingStrategy(Rt()).pad([0.1, 0.1]),
    k = N()
      .settingValue(t.mainValues[0].name)
      .memoValue(t.axisMemo[0])
      .valueName("x")(r),
    D = N()
      .orient("vertical")
      .settingValue(t.mainValues[1].name)
      .memoValue(t.axisMemo[1])
      .valueName("y")(r),
    B = xi(k, D)
      .xLabel(t.mainValues[0].name)
      .yLabel(t.mainValues[1].name)
      .plotArea(pt(A, t).canvas(!0));
  B.xNice && B.xNice(), B.yNice && B.yNice();
  let F = gt().chart(B).settings(t).xScale(k.scale).yScale(D.scale).canvas(!0),
    R = jt()
      .scaleFactor(M)
      .settings(t)
      .canvas(!0)
      .xScale(k.scale)
      .xValueName("x")
      .yValueName("y")
      .yScale(D.scale)
      .color(!l && a)
      .size(y)
      .data(r);
  e.datum(r).call(F), e.call(R), o && e.call(o);
}
EM.plugin = {
  name: "X/Y Scatter",
  category: "X/Y Chart",
  max_cells: 5e4,
  max_columns: 50,
  render_warning: !0,
  initial: {
    type: "number",
    count: 2,
    names: ["X Axis", "Y Axis", "Color", "Size", "Label", "Tooltip"],
  },
  selectMode: "toggle",
};
var IM = EM;
var Es = Re(Le());
function zM(e, t) {
  let r = Es.seriesCanvasHeatmap();
  return (
    r.decorate((n, a) => {
      n.fillStyle = t(a.colorValue);
    }),
    Es.autoBandwidth(r)
      .xValue((n) => n.crossValue)
      .yValue((n) => n.mainValue)
      .colorValue((n) => n.colorValue)
      .colorInterpolate(t.interpolator())
      .widthFraction(1)
  );
}
function PM(e, t) {
  let r = yr(e),
    n = mi(e).excludeType(We.linear).settingName("splitValues")(),
    a = [];
  return (
    t.forEach((o, i) => {
      let u = r(o, i);
      Object.keys(o)
        .filter((l) => l !== "__ROW_PATH__")
        .forEach((l) => {
          let s = EP(l);
          a.push({
            crossValue: u,
            mainValue: n === We.time ? new Date(s) : s,
            colorValue: o[l],
            row: o,
          });
        });
    }),
    a
  );
}
function EP(e) {
  let t = e.split("|");
  return t.pop(), t.join("|");
}
function RM(e, t) {
  let r = PM(t, wr(t)),
    n = da(t, r, "colorValue"),
    a = zM(t, n),
    o = ha().scale(n),
    i = Ge(t)
      .excludeType(We.linear)
      .settingName("crossValues")
      .valueName("crossValue")(r),
    u = Ge(t)
      .excludeType(We.linear)
      .settingName("splitValues")
      .valueName("mainValue")
      .modifyDomain((y) => (!isNaN(y[0]) ? y.reverse() : y))
      .orient("vertical")(r),
    l = xi(i, u).plotArea(pt(a, t).canvas(!0));
  l.xPaddingInner &&
    (l.xPaddingInner(0), l.xPaddingOuter(0), a.xAlign("right")),
    l.yPaddingInner &&
      (l.yPaddingInner(0), l.yPaddingOuter(0), a.yAlign("top"));
  let s = gt().chart(l).settings(t).xScale(i.scale).yScale(u.scale).canvas(!0),
    h = jt()
      .settings(t)
      .canvas(!0)
      .xScale(i.scale)
      .yScale(u.scale)
      .color(n)
      .data(r);
  e.datum(r).call(s), e.call(o), e.call(h);
}
RM.plugin = {
  name: "Heatmap",
  category: "Hierarchial Chart",
  max_cells: 5e4,
  max_columns: 500,
  render_warning: !0,
  initial: { names: ["Color"] },
};
var LM = RM;
var FM = Re(Le());
var Is = Re(Le());
function OM(e, t) {
  return to(e, t, { excludeEmpty: !0 }).map((r) => IP(e, r));
}
function IP(e, t) {
  let r = yr(e),
    n = (o) => t[o < t.length - 1 ? o + 1 : o][e.realValues[0]],
    a = t.map((o, i) => {
      let u = e.realValues[0] ? o[e.realValues[0]] : void 0,
        l = e.realValues[1] ? o[e.realValues[1]] : n(i);
      return {
        crossValue: r(o, i),
        mainValues: e.mainValues.map((s) => o[s.name]),
        openValue: u,
        closeValue: l,
        highValue: e.realValues[2] ? o[e.realValues[2]] : Math.max(u, l),
        lowValue: e.realValues[3] ? o[e.realValues[3]] : Math.min(u, l),
        key: t.key,
        row: o,
      };
    });
  return (a.key = t.key), a;
}
var Ei = Re(Le());
var zP = (e) => e.closeValue >= e.openValue;
function BM(e, t, r) {
  let n = r.domain(),
    a = Nr()
      .domain(n)
      .settings(e)
      .defaultColors([e.colorStyles["series-2"]])
      .mapFunction(eo(0.5))(),
    o = Nr().settings(e).domain(n)(),
    i = t()
      .crossValue((s) => s.crossValue)
      .openValue((s) => s.openValue)
      .highValue((s) => s.highValue)
      .lowValue((s) => s.lowValue)
      .closeValue((s) => s.closeValue)
      .decorate((s, h) => {
        let y = zP(h) ? r(h.key) : a(h.key);
        (s.fillStyle = y), (s.strokeStyle = y);
      }),
    u = Ei.seriesCanvasLine()
      .mainValue((s) => s.bollinger.average)
      .crossValue((s) => s.crossValue)
      .decorate((s, h) => {
        s.strokeStyle = o(h[0].key);
      }),
    l = Ei.seriesCanvasArea()
      .mainValue((s) => s.bollinger.upper)
      .baseValue((s) => s.bollinger.lower)
      .crossValue((s) => s.crossValue)
      .decorate((s, h) => {
        s.fillStyle = eo(0.25)(o(h[0].key));
      });
  return Ei.seriesCanvasMulti().series([l, i, u]);
}
function PP(e) {
  return function (t, r) {
    let n = OM(r, Ni(r)),
      a = Is.indicatorBollingerBands().value((D) => D.openValue),
      o = n.map((D) => {
        let B = a(D);
        return D.map((F, R) => Object.assign({ bollinger: B[R] }, F));
      }),
      i = n
        .map((D) => D.key)
        .concat(r.hideKeys ? r.hideKeys : [])
        .sort(),
      u = Nr().domain(i).settings(r).mapFunction(eo(1))(),
      l = Pt()
        .settings(r)
        .scale(i.length > 1 ? u : null),
      s = BM(r, e, u),
      h = Is.seriesCanvasMulti()
        .mapping((D, B) => D[B])
        .series(o.map(() => s)),
      y = Rt().pad([0.1, 0.1]).padUnit("percent"),
      x = Ge(r).settingName("crossValues").valueName("crossValue")(o),
      M = Ge(r)
        .settingName("mainValues")
        .valueNames(["lowValue", "highValue"])
        .memoValue(r.axisMemo[1])
        .orient("vertical")
        .paddingStrategy(y)(o),
      A = xi(x, M).plotArea(pt(h, r).orient("vertical").canvas(!0));
    A.yNice && A.yNice();
    let N = gt()
        .chart(A)
        .settings(r)
        .xScale(x.scale)
        .onChange((D) => {
          let B = o.map((F) =>
            F.filter(
              (R) =>
                R.crossValue >= D.xDomain[0] && R.crossValue <= D.xDomain[1],
            ),
          );
          A.yDomain(M.domainFunction(B));
        })
        .canvas(!0),
      k = jt()
        .settings(r)
        .xScale(x.scale)
        .yScale(M.scale)
        .yValueName("closeValue")
        .color(u)
        .data(o)
        .canvas(!0);
    t.datum(o).call(N), t.call(k), t.call(l);
  };
}
var zs = PP;
var HM = zs(FM.seriesCanvasOhlc);
HM.plugin = {
  name: "OHLC",
  category: "Y Chart",
  max_cells: 3500,
  max_columns: 50,
  render_warning: !0,
  initial: {
    type: "number",
    count: 1,
    names: ["Open", "Close", "High", "Low", "Tooltip"],
  },
  selectMode: "toggle",
};
var YM = HM;
var qM = Re(Le());
var WM = zs(qM.seriesCanvasCandlestick);
WM.plugin = {
  name: "Candlestick",
  category: "Y Chart",
  max_cells: 4e3,
  max_columns: 50,
  render_warning: !0,
  initial: {
    type: "number",
    count: 1,
    names: ["Open", "Close", "High", "Low", "Tooltip"],
  },
  selectMode: "toggle",
};
var $M = WM;
function GM(e, t) {
  if (e.realValues.length > 1 && e.realValues[1] !== null) {
    let r = e.realValues[1];
    if (e.mainValues.find((n) => n.name === r)?.type === "string") {
      let n = t
        .map((a) => a.data)
        .filter((a) => a.height > 0)
        .map((a) => UM(a))
        .reduce((a, o) => a.concat(o));
      return yi(e, n);
    } else return da(e, null, null, mS(t.map((n) => n.extents)));
  }
}
function UM(e, t = []) {
  return (
    e.children && e.children.length > 0
      ? e.children.forEach((r) => t.concat(UM(r, t)))
      : e.data.color && t.push(e.data.color),
    t
  );
}
function Ps(e) {
  let t = {},
    r = e.realValues.map((a) =>
      a === null ? null : e.mainValues.find((o) => o.name === a),
    );
  return (
    e.data.forEach((a, o) => {
      let i = a.__ROW_PATH__;
      LP(a).forEach((l) => {
        let s;
        t[l] || (t[l] = []),
          (s = t[l]),
          i.forEach((h, y) => {
            let x = s.find((M) => M.name === h);
            if (
              (x || ((x = { name: h, children: [] }), s.push(x)),
              e.realValues.length > 1 && e.realValues[1] !== null)
            ) {
              let M = y === i.length - 1,
                A = Ii(M ? a : e.agg_paths[o][y + 1] || a, e.mainValues[1], l);
              A !== void 0 && (x.color = A);
            }
            if (e.realValues.length > 2 && e.realValues[2] !== null) {
              x.tooltip = [];
              for (let M = 2; M < e.realValues.length; ++M)
                x.tooltip.push(Ii(a, r[M], l));
            }
            if (y === i.length - 1) {
              if (((x.name = i.slice(-1)[0]), e.crossValues.length === 0))
                x.size = Ii(a, e.mainValues[0], "");
              else if (i.length === e.crossValues.length) {
                let M = Ii(a, e.mainValues[0], l);
                x.size = M > 0 ? M : 0;
              }
            }
            s = x.children;
          });
      });
    }),
    Object.entries(t).map((a) => {
      let o = { name: "root", children: a[1] },
        i = jn(o).sum((l) => l.size),
        u = Yg().size([2 * Math.PI, i.height + 1])(i);
      return (
        u.each((l) => {
          (l.current = l),
            (l.mainValues =
              e.realValues.length === 1 ||
              (e.realValues[1] === null && e.realValues[2] === null)
                ? l.value
                : [l.value, l.data.color]
                    .concat(l.data.tooltip || [])
                    .filter((s) => s !== void 0)),
            (l.crossValue = l
              .ancestors()
              .slice(0, -1)
              .reverse()
              .map((s) => s.data.name)),
            (l.key = a[0]),
            (l.label = _n(
              e.crossValues[l.depth - 1 < 0 ? 0 : l.depth - 1]?.type ||
                e.mainValues[0].type,
              l.data.name,
            ));
        }),
        { split: a[0], data: u, extents: RP(e, a) }
      );
    })
  );
}
var Ii = (e, t, r) => (r.length ? e[`${r}|${t.name}`] : e[t.name]);
function RP(e, [t, r]) {
  if (e.realValues.length > 1 && e.realValues[1] !== null) {
    let n = Math.min(...e.data.map((o) => Ii(o, e.mainValues[1], t))),
      a = Math.max(...r.map((o) => o.color));
    return [n, a];
  }
}
function LP(e) {
  let t = [];
  return (
    Object.keys(e).forEach((r) => {
      if (r !== "__ROW_PATH__") {
        let n = r.split("|").slice(0, -1).join("|");
        t.includes(n) || t.push(n);
      }
    }),
    t
  );
}
var Rs = (e) =>
    Kl()
      .startAngle((t) => t.x0)
      .endAngle((t) => t.x1)
      .padAngle((t) => Math.min((t.x1 - t.x0) / 2, 0.005))
      .padRadius(e)
      .innerRadius((t) => Math.max(1, (t.y0 - 1) * e))
      .outerRadius((t) => Math.max((t.y0 - 1) * e, (t.y1 - 1) * e - 1)),
  kn = (e) => e.y0 >= 1 && e.x1 > e.x0;
var xf = (e) => e.y1 <= 3 && e.y0 >= 1 && (e.y1 - e.y0) * (e.x1 - e.x0) > 0.06;
function Ls(e, t) {
  let r = (((e.x0 + e.x1) / 2) * 180) / Math.PI,
    n = ((e.y0 - 1 + (e.y1 - 1)) / 2) * t;
  return `rotate(${r - 90}) translate(${n},0) rotate(${r < 180 ? 0 : 180})`;
}
function XM(e, t) {
  let r = this.getBBox().width;
  if (r > t) {
    let n = e.label,
      a = fe(this);
    for (; r > t; )
      (n = n.substring(0, n.length - 1)),
        a.text(() => n),
        (r = this.getBBox().width);
    a.text(() => `${n.substring(0, n.length - 3).replace(/\s+$/, "")}...`);
  }
}
var jM = (e, t, r, n, a, o, i, u, l) => (s, h) => {
  (l.sunburstLevel[u] = s.data.name),
    s.parent
      ? (r.datum(s.parent),
        r.style("cursor", "pointer"),
        n.html(`&#8682; ${s.label}`))
      : (r.datum(e), r.style("cursor", "default"), n.html("")),
    e.each(
      (x) =>
        (x.target = {
          x0:
            Math.max(0, Math.min(1, (x.x0 - s.x0) / (s.x1 - s.x0))) *
            2 *
            Math.PI,
          x1:
            Math.max(0, Math.min(1, (x.x1 - s.x0) / (s.x1 - s.x0))) *
            2 *
            Math.PI,
          y0: Math.max(0, x.y0 - s.depth),
          y1: Math.max(0, x.y1 - s.depth),
        }),
    );
  let y = t.transition().duration(h ? 0 : 750);
  a
    .transition(y)
    .tween("data", (x) => {
      let M = tt(x.current, x.target);
      return (A) => (x.current = M(A));
    })
    .filter(function (x) {
      return +this.getAttribute("fill-opacity") || kn(x.target);
    })
    .attr("fill-opacity", (x) => (kn(x.target) ? 1 : 0))
    .attr("user-select", (x) => (kn(x.target) ? "initial" : "none"))
    .style("pointer-events", (x) => (kn(x.target) ? "initial" : "none"))
    .attrTween("d", (x) => () => Rs(i)(x.current)),
    o
      .filter(function (x) {
        return +this.getAttribute("fill-opacity") || xf(x.target);
      })
      .transition(y)
      .attr("fill-opacity", (x) => +xf(x.target))
      .attrTween("transform", (x) => () => Ls(x.current, i));
};
function QM() {
  let e = null,
    t = null,
    r = null,
    n = null,
    a = null,
    o = (i) => {
      let u = i.selectAll("g.segment").data(r.descendants().slice(1)),
        l = u.enter().append("g").attr("class", "segment");
      l.append("path"),
        l.append("text").attr("class", "segment").attr("dy", "0.35em");
      let s = l.merge(u),
        h = s
          .select("path")
          .attr("fill-opacity", (N) => (kn(N.current) ? 1 : 0))
          .attr("user-select", (N) => (kn(N.current) ? "initial" : "none"))
          .style("pointer-events", (N) => (kn(N.current) ? "initial" : "none"))
          .attr("d", (N) => Rs(a)(N.current));
      n && h.style("fill", (N) => n(N.data.color));
      let y = s
          .select("text")
          .attr("fill-opacity", (N) => +xf(N.current))
          .attr("transform", (N) => Ls(N.current, a))
          .text((N) => N.label)
          .each(function (N) {
            XM.call(this, N, a);
          }),
        x = i.select("text.parent"),
        M = i.select("circle").attr("r", a).datum(r),
        A = jM(r, i, M, x, h, y, a, t, e);
      if (e.sunburstLevel) {
        let N = r.descendants().find((k) => k.data.name === e.sunburstLevel[t]);
        N && A(N, !0);
      } else e.sunburstLevel = {};
      M.on("click", (N) => A(N, !1)),
        h
          .filter((N) => N.children)
          .style("cursor", "pointer")
          .on("click", (N) => A(N, !1));
    };
  return (
    (o.settings = (...i) => (i.length ? ((e = i[0]), o) : e)),
    (o.split = (...i) => (i.length ? ((t = i[0]), o) : t)),
    (o.data = (...i) => (i.length ? ((r = i[0]), o) : r)),
    (o.color = (...i) => (i.length ? ((n = i[0]), o) : n)),
    (o.radius = (...i) => (i.length ? ((a = i[0]), o) : a)),
    o
  );
}
function Os() {
  let e = "element-prefix-unset",
    t = null,
    r = null,
    n = null,
    a = null,
    o = null,
    i = null,
    u = (l) => {
      let s = ht(l, "div.inner-container", () =>
          l.append("div").attr("class", "inner-container"),
        ),
        h = s.node().getBoundingClientRect(),
        y = h.height,
        x = h.width - (o ? 70 : 0),
        M = 300,
        A = l.datum(),
        N = Math.max(1, Math.min(A.length, Math.floor(x / M))),
        k = Math.ceil(A.length / N);
      (i = {
        width: x / Math.max(N, 1),
        height: Math.min(y, Math.max(y / k, x / Math.max(N, 1))),
      }),
        y / k > i.height * 0.75 && (i.height = y / k),
        A.length > 1
          ? (s.style("grid-template-columns", `repeat(${N}, ${100 / N}%)`),
            s.style("grid-template-rows", `repeat(${k}, ${i.height}px)`))
          : (s.style("grid-template-columns", "repeat(1, 100%)"),
            s.style("grid-template-rows", "repeat(1, 100%)")),
        (n = s.selectAll(`div.${e}-container`).data(A, (D) => D.split)),
        n.exit().remove(),
        (r = n.enter().append("div").attr("class", `${e}-container`)),
        (a = r
          .append("div")
          .attr("class", "title-container")
          .style("text-align", "center")
          .attr("display", "inline-block")
          .append("text")
          .attr("class", "title")
          .style("text-align", "left")),
        (t = r.append("svg").append("g").attr("class", e));
    };
  return (
    (u.elementsPrefix = (...l) => (l.length ? ((e = l[0]), u) : e)),
    (u.chartContainer = () => t),
    (u.chartEnter = () => r),
    (u.chartDiv = () => n),
    (u.chartTitle = () => a),
    (u.containerSize = () => i),
    u
  );
}
function KM(e, t) {
  let r = Ps(t),
    n = GM(t, r),
    a = Os().elementsPrefix("sunburst");
  if ((e.datum(r).call(a), n)) {
    let h = t.realValues[1];
    if (t.mainValues.find((y) => y.name === h)?.type === "string") {
      let y = Pt().settings(t).scale(n);
      e.call(y);
    } else {
      let y = ha().scale(n);
      e.call(y);
    }
  }
  let o = a.chartContainer(),
    i = a.chartEnter(),
    u = a.chartDiv(),
    l = a.chartTitle(),
    s = a.containerSize();
  l.each((h, y, x) => fe(x[y]).text(h.split)),
    o.append("circle").attr("fill", "none").style("pointer-events", "all"),
    o.append("text").attr("class", "parent"),
    i
      .merge(u)
      .select("svg")
      .select("g.sunburst")
      .attr("transform", `translate(${s.width / 2}, ${s.height / 2})`)
      .each(function ({ split: h, data: y }) {
        let x = fe(this),
          M = this.parentNode,
          { width: A, height: N } = M.getBoundingClientRect(),
          k = (Math.min(A, N) - 24) / Math.max(2, t.crossValues.length * 2);
        QM().settings(t).split(h).data(y).color(n).radius(k)(x),
          ea().settings(t)(x.selectAll("g.segment"));
      });
}
KM.plugin = {
  name: "Sunburst",
  category: "Hierarchial Chart",
  max_cells: 7500,
  max_columns: 50,
  render_warning: !0,
  initial: { type: "number", count: 1, names: ["Size", "Color", "Tooltip"] },
};
var ZM = KM;
function JM(e, t) {
  if (
    e.realValues.length < 1 ||
    e.realValues[1] === null ||
    e.realValues[1] === void 0
  )
    return;
  let r = e.realValues[1],
    n = t
      .filter((a) => a.height > 0)
      .map((a) => eA(a))
      .reduce((a, o) => a.concat(o));
  if (e.mainValues.find((a) => a.name === r)?.type === "string")
    return yi(e, n);
  {
    let a = Math.min(...n),
      o = Math.max(...n);
    return da(e, null, null, [a, o]);
  }
}
function eA(e, t = []) {
  return (
    e.children && e.children.length > 0
      ? e.children.forEach((r) => t.concat(eA(r, t)))
      : e.data.color && t.push(e.data.color),
    t
  );
}
var tA = 7,
  Bs = (e) => !!(e.target && e.target.textAttributes),
  Fs = (e, t, r) => {
    e.selectAll("text").each(function (a, o) {
      let i = HP(a, t, r);
      this.style = i;
    });
    let n = yf(e);
    OP(n), q0(n);
  },
  rA = (e) => {
    e.each((t, r, n) => {
      fe(n[r])
        .selectAll("text")
        .attr("dx", t.target.textAttributes.dx)
        .attr("dy", t.target.textAttributes.dy)
        .attr("style", t.target.textAttributes.style);
    });
  },
  q0 = (e) => {
    let n = (o) => o.getBoundingClientRect(),
      a = [];
    e
      .selectAll("text")
      .filter((o, i, u) => fe(u[i]).attr("style") === ho.high)
      .each((o, i, u) => a.push(u[i])),
      e
        .selectAll("text")
        .filter((o, i, u) => fe(u[i]).attr("style") === ho.low)
        .each((o, i, u) => {
          let l = u[i];
          a.filter(
            (s) => t0("x", n(s), n(l)) && t0("y", n(s), n(l), -2),
          ).forEach(() => fe(l).attr("dy", Number(fe(l).attr("dy")) + 14));
        });
  },
  nA = (e) => fe(e).style("opacity", bf[fe(e).attr("class")]),
  aA = (e) => fe(e).style("opacity", null),
  bf = { top: 1, mid: 0.7, lower: 0 },
  yf = (e) =>
    e.filter((t, r, n) => fe(n[r]).selectAll("text").attr("style") !== ho.zero),
  Hs = (e) => e.selectAll("text").each((t, r, n) => BP(n[r])),
  OP = (e) => e.selectAll("text").each((t, r, n) => oA(n[r])),
  oA = (e) => {
    let t = fe(e),
      r = e.getBoundingClientRect();
    t.attr("dx", 0 - r.width / 2).attr("dy", 0 + r.height / 4);
  },
  BP = (e) => {
    let r = e.parentNode.childNodes[0],
      n = e.getBBox(),
      a = r.getBBox();
    FP(e, a, n) || fe(e).attr("style", fe(e).attr("style"));
  },
  FP = (e, t, r) => {
    let n = Math.min(t.height / r.height, t.width / r.width);
    if (n < 1) {
      let a = parseInt(fe(e).style("font-size")),
        o = Math.floor(a * n);
      return (
        a > tA && o > tA
          ? (fe(e).style("font-size", `${o}px`), oA(e))
          : (fe(e).style("font-size", null), fe(e).style("opacity", "0")),
        !0
      );
    }
    return !1;
  },
  HP = (e, t, r) => {
    if (!r.filter((n) => n !== "").every((n) => e.crossValue.includes(n)))
      return ho.zero;
    switch (e.depth) {
      case t + 1:
        return ho.high;
      case t + 2:
        return ho.low;
      default:
        return ho.zero;
    }
  },
  ho = {
    high: "font-size:14px;z-index:5;pointer-events: none;",
    low: "font-size:8px;opacity:0.7;z-index:4;",
    zero: "font-size:0px;opacity:0;z-index:4;",
  };
var Ys = (e, t) => {
  let r = qg()
    .size([e, t])
    .paddingInner((n) => 1 + 2 * (n.height - 1));
  return r.tile(Wg), r;
};
var YP = (e, t) => t.every((r) => e.crossValue.includes(r));
function W0(e, t, r, n, a, o) {
  qP(e, t, r, n, a),
    (e.mapLevel[n].levelRoot = !0),
    WP(
      e,
      o.node().getBoundingClientRect().width,
      o.node().getBoundingClientRect().height,
      n,
    ),
    uA(r, n);
}
function iA(e, t) {
  e.each((r) => {
    (r.mapLevel = []),
      (r.mapLevel[0] = {
        x0: r.x0,
        x1: po(r) + r.x0,
        y0: r.y0,
        y1: go(r) + r.y0,
        visible: !0,
        opacity: 1,
      });
  }),
    (t.mapLevel[0].levelRoot = !0),
    uA(e, 0);
}
var qs = (e, t) => {
  e.each((r, n, a) => {
    let o = fe(a[n]).selectAll("text");
    r.mapLevel[t].textAttributes = {
      dx: o.attr("dx"),
      dy: o.attr("dy"),
      class: o.attr("class"),
      "font-size": o.style("font-size"),
    };
  });
};
function qP(e, t, r, n, a) {
  let o = { x: e.x0, y: e.y0, width: e.x1 - e.x0, height: e.y1 - e.y0 },
    i = { width: a.x1 - a.x0, height: a.y1 - a.y0 },
    u = { width: i.width / o.width, height: i.height / o.height };
  r.each((l) => {
    let s = (l.x0 - o.x) * u.width,
      h = (l.y0 - o.y) * u.height,
      y = po(l) * u.width,
      x = go(l) * u.height,
      M = YP(l, t) && l.data.name !== t[n - 1];
    l.mapLevel[n] = {
      x0: s,
      x1: y + s,
      y0: h,
      y1: x + h,
      visible: M,
      opacity: M ? 1 : 0,
    };
  }),
    (e.mapLevel[n].levelRoot = !0);
}
function WP(e, t, r, n) {
  let i = Ys(t, r)(jn(e.data).sum((l) => l.size)).descendants(),
    u = e.descendants();
  i.forEach((l, s) => {
    (u[s].mapLevel[n].x0 = i[s].x0),
      (u[s].mapLevel[n].x1 = i[s].x1),
      (u[s].mapLevel[n].y0 = i[s].y0),
      (u[s].mapLevel[n].y1 = i[s].y1);
  });
}
function uA(e, t) {
  e.selectAll("text").each((r, n, a) => {
    let o = fe(a[n]),
      i = fe(a[n]).datum(),
      u = o.attr("class");
    i.mapLevel[t].textLockedAt = { opacity: bf[u] };
  });
}
function fA(e, t, r, n, a, o, i, u, l) {
  if (n.treemapLevel > 0) {
    let s = i.crossValue;
    G0(i, e, t, r, n, a, o, i, 0, s, u, l, 1, !1),
      n.treemapRoute.slice(1, n.treemapRoute.length).forEach((h) => {
        let y = t.filter((M) => M.crossValue === h).datum(),
          x = y.crossValue;
        W0(y, x, t, y.depth, i, a),
          G0(y, e, t, r, n, a, o, i, y.depth, x, u, l, 1, !1);
      });
  }
}
function U0(e, t, r, n, a, o, i, u, l, s) {
  if (!e.children) return;
  a.treemapLevel < e.depth
    ? a.treemapRoute.push(e.crossValue)
    : a.treemapRoute.pop(),
    (a.treemapLevel = e.depth);
  let h = e.crossValue;
  (!e.mapLevel[a.treemapLevel] || !e.mapLevel[a.treemapLevel].levelRoot) &&
    W0(e, h, r, a.treemapLevel, u, o),
    G0(e, t, r, n, a, o, i, u, a.treemapLevel, h, l, s);
}
function G0(e, t, r, n, a, o, i, u, l, s, h, y, x = 500, M = !0) {
  let A = e.parent,
    N = i.transition("main transition").duration(x).ease(Nc);
  r.each((D) => (D.target = D.mapLevel[l])),
    Bs(e) || XP(r, h),
    r
      .transition(N)
      .tween("data", (D) => {
        let B = tt(D.current, D.target);
        return (F) => (D.current = B(F));
      })
      .styleTween("opacity", (D) => () => D.current.opacity)
      .attrTween(
        "pointer-events",
        (D) => () => (D.target.visible ? "all" : "none"),
      ),
    t
      .transition(N)
      .filter((D) => D.target.visible)
      .styleTween("x", (D) => () => `${D.current.x0}px`)
      .styleTween("y", (D) => () => `${D.current.y0}px`)
      .styleTween("width", (D) => () => `${D.current.x1 - D.current.x0}px`)
      .styleTween("height", (D) => () => `${D.current.y1 - D.current.y0}px`),
    n
      .transition(N)
      .filter((D) => D.target.visible)
      .attrTween("x", (D) => () => D.current.x0 + po(D.current) / 2)
      .attrTween("y", (D) => () => D.current.y0 + go(D.current) / 2)
      .end()
      .catch(() => $0(r))
      .then(() => {
        Bs(e) || (q0(k), Hs(k), $P(n, i, x), M && qs(r, l), $0(r, h, A));
      })
      .catch((D) => {
        console.error("Exception completing promises after main transition", D),
          $0(r, h, A);
      }),
    Bs(e) ? rA(r) : (n.each((D, B, F) => nA(F[B])), Fs(r, l, s));
  let k = yf(r);
  A
    ? h
        .hide(!1)
        .text(e.label)
        .onClick(() => {
          U0(A, t, r, n, a, o, i, u, h, y);
          let D = o.node().getRootNode().host.parentElement;
          tf(D, A, y);
        })()
    : h.hide(!0)();
}
async function $P(e, t, r = 400) {
  let n = t.transition("text fade transition").duration(r).ease(Nc);
  await e
    .transition(n)
    .filter((a) => a.target.visible)
    .tween("data", (a, o, i) => {
      let u = i[o],
        l = tt(GP(a), UP(u));
      return (s) => (a.current.opacity = l(s));
    })
    .styleTween("opacity", (a) => () => a.current.opacity)
    .end()
    .catch((a) => console.error("Exception in text fade transition", a))
    .then(() => e.each((a, o, i) => aA(i[o])));
}
var GP = (e) => e.target.textLockedAt.opacity,
  UP = (e) => bf[fe(e).attr("class")],
  XP = (e, t) => {
    t.deactivate(!0),
      e.each((r, n, a) => {
        fe(a[n]).selectAll("rect").style("pointer-events", "none");
      });
  },
  $0 = (e, t) => {
    t && t.deactivate(!1),
      e.each((r, n, a) => {
        fe(a[n]).selectAll("rect").style("pointer-events", null);
      });
  };
var lA = `<button id="goto-parent">Goto parent</button>
`;
function cA(e) {
  let t = null,
    r = null,
    n = !0,
    a = !1,
    o = ht(e, ".parent-controls", () =>
      e
        .append("div")
        .attr("class", "parent-controls")
        .style("display", n ? "none" : "")
        .html(lA),
    ),
    i = () => {
      o.style("display", n ? "none" : "")
        .select("#goto-parent")
        .style("pointer-events", a ? "none" : null)
        .html(`\u21EA ${r}`)
        .on("click", () => t());
    };
  return (
    (i.deactivate = (...u) => {
      if (!u.length) return a;
      a = u[0];
      let l = o.select("#goto-parent");
      return (
        a ? l.style("pointer-events", "none") : l.style("pointer-events", null),
        i
      );
    }),
    (i.hide = (...u) => (u.length ? ((n = u[0]), i) : n)),
    (i.text = (...u) => (u.length ? ((r = u[0]), i) : r)),
    (i.onClick = (...u) => (u.length ? ((t = u[0]), i) : t)),
    i
  );
}
var Ws = { leaf: "leafnode", branch: "branchnode", root: "rootnode" },
  po = (e) => e.x1 - e.x0,
  go = (e) => e.y1 - e.y0,
  QP = (e, t) => t.depth === e,
  sA = (e, t) => (t.depth === 0 ? Ws.root : QP(e, t) ? Ws.leaf : Ws.branch);
function dA() {
  let e = null,
    t = null,
    r = null,
    n = null,
    a = null,
    o = null,
    i = (u) => {
      (o = cA(a)), o();
      let l = r.height;
      e.treemapLevel || (e.treemapLevel = 0),
        e.treemapRoute || (e.treemapRoute = []),
        Ys(
          a.node().getBoundingClientRect().width,
          a.node().getBoundingClientRect().height,
        )(r);
      let h = u.selectAll("g").data(r.descendants()),
        y = h.enter().append("g");
      y.append("rect"), y.append("text");
      let x = y.merge(h).sort((k, D) => D.depth - k.depth),
        M = x
          .select("rect")
          .attr("class", (k) => `treerect ${sA(l, k)}`)
          .style("x", (k) => k.x0)
          .style("y", (k) => k.y0)
          .style("width", (k) => po(k))
          .style("height", (k) => go(k));
      M.style("fill", (k) =>
        sA(l, k) === Ws.leaf
          ? k.data.color
            ? n(k.data.color)
            : t.colorStyles.series
          : "transparent",
      );
      let A = x
          .filter((k) => k.value !== 0)
          .select("text")
          .attr("x", (k) => k.x0 + po(k) / 2)
          .attr("y", (k) => k.y0 + go(k) / 2)
          .text((k) => k.label),
        N = M.filter((k) => k.crossValue.length === 0).datum();
      iA(x, N),
        Fs(x, 0, []),
        Hs(yf(x)),
        qs(x, 0),
        e.treemapRoute.length === 0 && e.treemapRoute.push(N.crossValue),
        M.filter((k) => k.children).on("click", (k, D) =>
          U0(D, M, x, A, e, a, u, N, o, t),
        ),
        fA(M, x, A, e, a, u, N, o, t);
    };
  return (
    (i.settings = (...u) => (u.length ? ((e = u[0]), (t = u[1]), i) : e)),
    (i.data = (...u) => (u.length ? ((r = u[0]), i) : r)),
    (i.color = (...u) => (u.length ? ((n = u[0]), i) : n)),
    (i.container = (...u) => (u.length ? ((a = u[0]), i) : a)),
    i
  );
}
function mA(e, t) {
  t.treemaps || (t.treemaps = {});
  let r = Ps(t),
    n = JM(
      t,
      r.map((l) => l.data),
    );
  n && this._container.classList.add("has-legend");
  let a = Os().elementsPrefix("treemap");
  if ((e.datum(r).call(a), n)) {
    let l = t.realValues[1];
    if (t.mainValues.find((s) => s.name === l)?.type === "string") {
      let s = Pt().settings(t).scale(n);
      e.call(s);
    } else {
      let s = ha().scale(n);
      e.call(s);
    }
  }
  let o = a.chartEnter(),
    i = a.chartDiv();
  a.chartTitle().each((l, s, h) => fe(h[s]).text(l.split)),
    o
      .merge(i)
      .select("svg")
      .select("g.treemap")
      .each(function ({ split: l, data: s }) {
        let h = fe(this);
        t.treemaps[l] || (t.treemaps[l] = {}),
          dA()
            .settings(t.treemaps[l], t)
            .data(s)
            .container(fe(fe(this.parentNode).node().parentNode))
            .color(n)(h),
          ea().settings(t).centered(!0)(h.selectAll("g"));
      });
}
mA.plugin = {
  type: "Treemap",
  name: "Treemap",
  category: "Hierarchial Chart",
  max_cells: 3e3,
  max_columns: 50,
  render_warning: !0,
  initial: { type: "number", count: 1, names: ["Size", "Color", "Tooltip"] },
};
var hA = mA;
var KP = [j9, oM, cM, gM, wM, CM, IM, YM, $M, hA, ZM, LM],
  X0 = KP;
var gA = Re(pA()),
  vA = (e, t) => {
    if (!t.colorStyles) {
      let r = { scheme: [], gradient: {}, interpolator: {}, grid: {} },
        n = eR(e);
      r.series = n("--d3fc-local-series");
      for (let o = 1; ; o++) {
        let i = `series-${o}`,
          u = n(`--d3fc-local-${i}`);
        if (!u) break;
        (r[i] = u), r.scheme.push(u);
      }
      (r.opacity = ZP(r.series)),
        (r.grid.gridLineColor = n`--d3fc-gridline--color`),
        ["full", "positive", "negative"].forEach((o) => {
          let i = n(`--d3fc-local-${o}--gradient`);
          r.gradient[o] = tR(i, r.opacity);
        }),
        (t.colorStyles = r);
    }
    if (!t.textStyles) {
      let r = window.getComputedStyle(e),
        n = r.getPropertyValue("color"),
        a = `12px ${r.getPropertyValue("font-family")}`;
      t.textStyles = { color: n, font: a };
    }
  },
  ZP = (e) => Tt(e).opacity,
  JP = (e, t) => {
    let r = Tt(`#${e}`);
    return (r.opacity = t), r + "";
  },
  eR = (e) => {
    let t = getComputedStyle(e);
    return (r) => t?.getPropertyValue(r);
  },
  tR = (e, t) => {
    let r = gA.parse(e)[0].colorStops;
    return r
      .map((n, a) => [
        n.length ? n.length.value / 100 : a / (r.length - 1),
        JP(n.value, t),
      ])
      .sort((n, a) => n[0] - a[0]);
  };
var xA =
  ':host .chart{--d3fc-local-full--gradient:var(--d3fc-full--gradient,linear-gradient(#4d342f 0%,#e4521b 22.5%,#feeb65 42.5%,#f0f0f0 50%,#dcedc8 57.5%,#42b3d5 67.5%,#1a237e 100%));--d3fc-local-positive--gradient:var(--d3fc-positive--gradient,linear-gradient(#dcedc8 0%,#42b3d5 35%,#1a237e 100%));--d3fc-local-negative--gradient:var(--d3fc-negative--gradient,linear-gradient(#feeb65 100%,#e4521b 70%,#4d342f 0%));--d3fc-local-series:var(--d3fc-series,rgba(31,119,180,0.5));--d3fc-local-series-1:var(--d3fc-series-1,#0366d6);--d3fc-local-series-2:var(--d3fc-series-2,#ff7f0e);--d3fc-local-series-3:var(--d3fc-series-3,#2ca02c);--d3fc-local-series-4:var(--d3fc-series-4,#d62728);--d3fc-local-series-5:var(--d3fc-series-5,#9467bd);--d3fc-local-series-6:var(--d3fc-series-6,#8c564b);--d3fc-local-series-7:var(--d3fc-series-7,#e377c2);--d3fc-local-series-8:var(--d3fc-series-8,#7f7f7f);--d3fc-local-series-9:var(--d3fc-series-9,#bcbd22);--d3fc-local-series-10:var(--d3fc-series-10,#17becf);}:host .chart .series{fill:var(--d3fc-local-series);}:host .chart .series-1{fill:var(--d3fc-local-series-1);}:host .chart .series-2{fill:var(--d3fc-local-series-2);}:host .chart .series-3{fill:var(--d3fc-local-series-3);}:host .chart .series-4{fill:var(--d3fc-local-series-4);}:host .chart .series-5{fill:var(--d3fc-local-series-5);}:host .chart .series-6{fill:var(--d3fc-local-series-6);}:host .chart .series-7{fill:var(--d3fc-local-series-7);}:host .chart .series-8{fill:var(--d3fc-local-series-8);}:host .chart .series-9{fill:var(--d3fc-local-series-9);}:host .chart .series-10{fill:var(--d3fc-local-series-10);}:host{user-select:none;}:host .chart{position:absolute;box-sizing:border-box;left:0;top:0;width:100%;height:100%;padding:12px;overflow:hidden;}:host .chart.heatmap d3fc-group.cartesian-chart,:host .chart.treemap d3fc-group.cartesian-chart{grid-template-columns:minmax(0em,max-content)auto 1fr auto minmax(0em,max-content);grid-template-rows:minmax(0em,max-content)auto 1fr auto minmax(0em,max-content);}:host .chart .chart-label{display:none;}:host .chart.heatmap{padding-right:120px;}:host .chart.sunburst{padding:0;font-size:14px;}:host .chart.sunburst .inner-container{width:100%;height:100%;display:inline-grid;padding:0;margin:0;overflow-x:hidden;overflow-y:auto;}:host .chart.sunburst .inner-container div{overflow:hidden;}:host .chart.sunburst .inner-container .sunburst-container:not(:only-child) svg{transform:translate(0,-27px);}:host .chart.sunburst .inner-container svg{width:100%;height:100%;}:host .chart.sunburst .inner-container path{fill:var(--d3fc-series,rgba(31,119,180,0.5));}:host .chart.sunburst .inner-container text.segment,:host .chart.sunburst .inner-container text.parent{text-anchor:middle;user-select:none;pointer-events:none;fill:var(--d3fc-treedata--labels,rgb(51,51,51));}:host .chart.sunburst .inner-container div.title-container{margin-top:5px;}:host .chart.has-legend{padding-right:120px;}:host .chart.treemap .treemap-container{position:relative;}:host .chart.treemap .treemap-container:not(:only-child){width:calc(100% - 12px);height:calc(100% - 12px);}:host .chart.treemap .inner-container{width:100%;height:100%;display:inline-grid;padding:0;margin:0;overflow-x:hidden;overflow-y:auto;}:host .chart.treemap .inner-container div{overflow:hidden;}:host .chart.treemap .inner-container svg{width:100%;height:100%;}:host .chart.treemap .inner-container .treerect{stroke:var(--d3fc-treedata-axis--lines,var(--d3fc-axis--lines,white));fill:var(--d3fc-series,rgba(31,119,180,0.5));}:host .chart.treemap .inner-container .treerect:hover{cursor:pointer;stroke:var(--d3fc-treedata--hover-highlight,black);stroke-opacity:1;}:host .chart.treemap .inner-container .rootnode{opacity:0;pointer-events:none;z-index:0;}:host .chart.treemap .inner-container .branchnode{opacity:0;}:host .chart.treemap .inner-container .branchnode:hover{fill-opacity:0.1;opacity:1;fill:var(--d3fc-treedata--hover-highlight,black);}:host .chart.treemap .inner-container .leafnode{fill-opacity:0.8;}:host .chart.treemap .inner-container .leafnode:hover{fill-opacity:0.5;}:host .chart.treemap .inner-container #hidden{opacity:0;pointer-events:none;z-index:0;}:host .chart.treemap .inner-container .top{font-size:14px;z-index:5;pointer-events:none;}:host .chart.treemap .inner-container .mid{font-size:8px;opacity:0.7;z-index:4;}:host .chart.treemap .inner-container .lower{font-size:0px;opacity:0;z-index:4;}:host .chart.treemap .inner-container text{fill:var(--d3fc-treedata--labels,rgb(51,51,51));}:host .chart.treemap .inner-container text.title{dominant-baseline:hanging;}:host .chart.treemap .inner-container .parent-controls{position:absolute;top:12px;right:auto;left:30px;width:auto;z-index:4;transition:box-shadow 1s;}:host .chart.treemap .inner-container .parent-controls:hover{box-shadow:2px 2px 6px#000;transition:box-shadow 0.2s;}:host .chart .x-label{height:1.2em!important;line-height:1em!important;}:host .chart .x-label,:host .chart .y-label{color:var(--d3fc-label--color,inherit);font-size:14px;}:host .chart d3fc-canvas.plot-area{display:none;}:host .chart.xyscatter d3fc-canvas.plot-area,:host .chart.xyline d3fc-canvas.plot-area,:host .chart.ohlc d3fc-canvas.plot-area,:host .chart.candlestick d3fc-canvas.plot-area,:host .chart.heatmap d3fc-canvas.plot-area{display:block;}:host .chart .y-axis text,:host .chart .x-axis text{fill:var(--d3fc-axis-ticks--color,rgb(80,80,80));font-size:11px;}:host .chart .y-axis path,:host .chart .x-axis path{stroke:var(--d3fc-axis--lines,rgb(180,210,225));}:host .chart .splitter-label{display:inline-block;margin:0 10px;cursor:pointer;}:host .chart .splitter-label::after{margin-left:5px;color:var(--d3fc-axis--lines,rgb(180,210,225));}:host .chart .splitter-label:hover::after{color:var(--d3fc-axis-ticks--color,rgb(80,80,80));}:host .chart .splitter-label.disabled::after{color:rgba(80,80,80,0.3);}:host .chart .splitter-label.disabled{cursor:default;}:host .chart .y-label.left-label .splitter-label::after{background-repeat:no-repeat;background-color:var(--icon--color);content:"";display:inline-block;-webkit-mask-size:cover;mask-size:cover;width:16px;height:12px;-webkit-mask-image:var(--sort-desc-icon--mask-image);mask-image:var(--sort-desc-icon--mask-image);}:host .chart .y-label.right-label .splitter-label::after{background-repeat:no-repeat;background-color:var(--icon--color);content:"";display:inline-block;-webkit-mask-size:cover;mask-size:cover;width:16px;height:12px;-webkit-mask-image:var(--sort-asc-icon--mask-image);mask-image:var(--sort-asc-icon--mask-image);}:host .chart.ybar .y-axis path,:host .chart.yline .y-axis path,:host .chart.xyline .y-axis path,:host .chart.xyline .x-axis path,:host .chart.yarea .y-axis path,:host .chart.yscatter .y-axis path,:host .chart.xyscatter .y-axis path,:host .chart.xyscatter .x-axis path,:host .chart.xbar .x-axis path{visibility:hidden;}:host .chart .y-label{white-space:nowrap;}:host .chart .nearbyTip{fill:var(--d3fc-series,rgba(31,119,180,0.5));}:host #dragHandles{position:absolute;top:0px;right:0px;left:auto;pointer-events:none;}:host #dragHandles rect{pointer-events:all;}:host .label rect{fill:none;}:host .legend-container{position:absolute;top:12px;right:12px;left:auto;width:150px;height:280px;}:host .legend-container.legend-color{width:90px;height:150px;}:host .legend-container[borderbox-on-hover="true"]{transition:box-shadow 1s;}:host .legend-container[borderbox-on-hover="true"]:hover{background-color:var(--d3fc-legend--background,#ffffff);transition:box-shadow 0.2s,background-color 0.2s;}:host .legend-container .legend{font-size:8pt;width:100%;}:host .legend-container .legend .cell{cursor:pointer;}:host .legend-container .legend .cell path{fill:var(--d3fc-series,rgba(31,119,180,0.5));stroke:var(--d3fc-series,rgb(31,119,180));}:host .legend-container .legend .cell.hidden path{fill:rgba(204,204,204,0.5);stroke:rgb(204,204,204);}:host .legend-container .legend .cell.hidden circle{fill:rgb(204,204,204)!important;}:host .legend-container text{fill:var(--d3fc-legend--text,rgb(51,51,51));}:host .legend-container .label:hover{fill:rgb(34,160,206);}:host .legend-container #legend-axis path{stroke:var(--d3fc-legend--text,rgb(51,51,51));}:host .legend-container .legend-controls{margin-left:12px;}:host .legend-container .legend-controls #up-arrow,:host .legend-container .legend-controls #down-arrow{cursor:pointer;color:rgb(31,119,180);}:host .legend-container .legend-controls #up-arrow.disabled,:host .legend-container .legend-controls #down-arrow.disabled{cursor:default;color:rgb(51,51,51);}:host .heatmap .legend-container.legend-color{height:200px;}:host .treemap .legend-container.legend-color{height:200px;}:host .treemap .legend-container:not(.legend-color){width:100px;}:host .zoom-controls{position:absolute;top:10px;left:0;width:100%;text-align:center;}:host .zoom-controls button{-webkit-appearance:none;background:var(--plugin--background,rgb(247,247,247));border:1px solid var(--inactive--color,rgb(204,204,204));color:var(--d3fc-label--color,inherit);font-size:12px;padding:8px;opacity:0.5;cursor:pointer;}:host .zoom-controls button:hover{opacity:1;}:host .parent-controls{position:absolute;top:30px;right:145px;width:100%;text-align:right;}:host .parent-controls button{-webkit-appearance:none;background:rgb(247,247,247);border:1px solid rgb(204,204,204);padding:10px;opacity:0.5;cursor:pointer;}:host .parent-controls button:hover{background:rgb(230,230,230);}:host div.tooltip{position:absolute;text-align:left;font-size:12px;font-weight:300;white-space:nowrap;padding:0.5em;background:var(--d3fc-tooltip--background,#ffffff);color:var(--d3fc-tooltip--color,black);border:1px solid var(--d3fc-tooltip--border-color,#777777);box-shadow:var(--d3fc-tooltip--box-shadow,none);pointer-events:none;}:host div.tooltip ul{margin:0;padding:0;list-style-type:none;}';
var bA = { initial: { type: "number", count: 1 }, selectMode: "select" },
  nR = `${xA}${aR()}`,
  Q0 = [
    "crossValues",
    "mainValues",
    "realValues",
    "splitValues",
    "filter",
    "data",
    "size",
    "colorStyles",
    "textStyles",
    "agg_paths",
    "treemaps",
    "axisMemo",
  ];
function aR() {
  let e = document.querySelector("head").querySelectorAll("style"),
    t = [];
  return (
    e.forEach((r) => {
      r.innerText.indexOf("d3fc-") !== -1 && t.push(r.innerText);
    }),
    t.join("")
  );
}
function oR(e) {
  customElements.get("perspective-viewer").registerPlugin(e);
}
function yA(...e) {
  (e = new Set(e.length > 0 ? e : X0.map((t) => t.plugin.name))),
    X0.forEach((t) => {
      if (e.has(t.plugin.name)) {
        let r = t.plugin.name.toLowerCase().replace(/[ \t\r\n\/]*/g, ""),
          n = `perspective-viewer-d3fc-${r}`;
        customElements.define(
          n,
          class extends HTMLElement {
            constructor() {
              super(),
                (this._chart = null),
                (this._settings = null),
                (this.render_warning = !0);
            }
            connectedCallback() {
              this._initialized ||
                (this.attachShadow({ mode: "open" }),
                (this.shadowRoot.innerHTML = `<style>${nR}</style>`),
                (this.shadowRoot.innerHTML +=
                  '<div id="container" class="chart"></div>'),
                (this._container = this.shadowRoot.querySelector(".chart")),
                (this._initialized = !0));
            }
            get name() {
              return t.plugin.name;
            }
            get category() {
              return t.plugin.category;
            }
            get select_mode() {
              return t.plugin.selectMode || "select";
            }
            get min_config_columns() {
              return t.plugin.initial?.count || bA.initial.count;
            }
            get config_column_names() {
              return t.plugin.initial?.names || bA.initial.names;
            }
            get max_cells() {
              return t.plugin.max_cells || 4e3;
            }
            set max_cells(a) {
              t.plugin.max_cells = a;
            }
            get max_columns() {
              return t.plugin.max_columns || 50;
            }
            set max_columns(a) {
              t.plugin.max_columns = a;
            }
            async render() {
              var a = document.createElement("canvas"),
                o = this.shadowRoot.querySelector("#container");
              (a.width = o.offsetWidth), (a.height = o.offsetHeight);
              let i = a.getContext("2d");
              (i.fillStyle =
                window
                  .getComputedStyle(this)
                  .getPropertyValue("--plugin--background") || "white"),
                i.fillRect(0, 0, a.width, a.height);
              let u = window.getComputedStyle(this).getPropertyValue("color"),
                l = Array.from(
                  this.shadowRoot.querySelectorAll("svg:not(#dragHandles)"),
                );
              for (let x of l.reverse()) {
                var s = document.createElement("img");
                (s.width = x.parentNode.offsetWidth),
                  (s.height = x.parentNode.offsetHeight);
                let M = x.cloneNode(!0);
                M.hasAttribute("viewBox") ||
                  M.setAttribute("viewBox", `0 0 ${s.width} ${s.height}`),
                  M.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                for (let N of M.querySelectorAll("text"))
                  N.setAttribute("fill", u);
                var h = new XMLSerializer().serializeToString(M);
                h = h.replace(/[^\x00-\x7F]/g, "");
                let A = new Promise((N, k) => {
                  (s.onload = N), (s.onerror = k);
                });
                try {
                  (s.src = `data:image/svg+xml;base64,${btoa(h)}`), await A;
                } catch {
                  let k = new Promise((D, B) => {
                    (s.onload = D), (s.onerror = B);
                  });
                  (s.src = `data:image/svg+xml;utf8,${h}`), await k;
                }
                i.drawImage(
                  s,
                  x.parentNode.offsetLeft,
                  x.parentNode.offsetTop,
                  s.width,
                  s.height,
                );
              }
              let y = Array.from(this.shadowRoot.querySelectorAll("canvas"));
              for (let x of y.reverse())
                i.drawImage(
                  x,
                  x.parentNode.offsetLeft,
                  x.parentNode.offsetTop,
                  x.width / window.devicePixelRatio,
                  x.height / window.devicePixelRatio,
                );
              return await new Promise(
                (x) => a.toBlob((M) => x(M)),
                "image/png",
              );
            }
            async draw(a, o, i) {
              if (this.offsetParent === null) {
                this._staged_view = [a, o, i];
                return;
              }
              (this._staged_view = void 0),
                this._settings &&
                  (this._settings.axisMemo = [
                    [1 / 0, -1 / 0],
                    [1 / 0, -1 / 0],
                  ]),
                await this.update(a, o, i, !0);
            }
            async update(a, o, i, u = !1) {
              if (this.offsetParent === null) return;
              let l = this.parentElement,
                s,
                h,
                y = t.plugin.name !== "Sunburst";
              o && i
                ? (s = a.to_columns_string({
                    end_row: i,
                    end_col: o,
                    leaves_only: y,
                  }))
                : o
                ? (s = a.to_columns_string({ end_col: o, leaves_only: y }))
                : i
                ? (s = a.to_columns_string({ end_row: i, leaves_only: y }))
                : (s = a.to_columns_string({ leaves_only: y })),
                (h = await Promise.all([
                  l.save(),
                  l.getTable().then((K) => K.schema(!1)),
                  a.expression_schema(!1),
                  a.schema(!1),
                  s,
                  a.get_config(),
                ]));
              let [x, M, A, N, k, D] = h,
                B = JSON.parse(k),
                F = Object.keys(B),
                R = {
                  row(K) {
                    let Z = {};
                    for (let te of F) Z[te] = B[te][K];
                    return Z;
                  },
                };
              this.config = x;
              let I = this.config.columns,
                L = function (K) {
                  let Z = M[K];
                  return Z || (Z = A[K]), Z;
                },
                { columns: $, group_by: G, split_by: ue, filter: ne } = D,
                U = B[Object.keys(B)[0]] || [],
                ae =
                  G.length > 0
                    ? U.reduce(
                        (K, Z, te) => {
                          let le = R.row(te);
                          if (
                            le.__ROW_PATH__ &&
                            le.__ROW_PATH__.length == G.length
                          )
                            K.agg_paths.push(K.aggs.slice()), K.rows.push(le);
                          else {
                            let de = le.__ROW_PATH__.filter(
                              (re) => re !== void 0,
                            ).length;
                            (K.aggs[de] = le),
                              (K.aggs = K.aggs.slice(0, de + 1));
                          }
                          return K;
                        },
                        { rows: [], aggs: [], agg_paths: [] },
                      )
                    : { rows: U.map((K, Z) => R.row(Z)) },
                J = (K, Z) => (G.length ? K : { ...K, __ROW_PATH__: [Z] }),
                H = ae.rows.map(J),
                ee = {
                  realValues: I,
                  crossValues: G.map((K) => ({ name: K, type: L(K) })),
                  mainValues: $.map((K) => ({ name: K, type: N[K] })),
                  splitValues: ue.map((K) => ({ name: K, type: L(K) })),
                  filter: ne,
                  data: H,
                  agg_paths: ae.agg_paths,
                };
              this._chart = t;
              let j = {
                  set: (K, Z, te) => (
                    Q0.includes(Z) ||
                      (this._container &&
                        this._container.dispatchEvent(
                          new Event("perspective-plugin-update", {
                            bubbles: !0,
                            composed: !0,
                          }),
                        )),
                    (K[Z] = te),
                    !0
                  ),
                },
                X = [
                  [1 / 0, -1 / 0],
                  [1 / 0, -1 / 0],
                ];
              (this._settings = new Proxy(
                { axisMemo: X, ...this._settings, ...ee },
                j,
              )),
                this._settings.splitMainValues &&
                  this._settings.splitMainValues.length >= $.length &&
                  (this._settings.splitMainValues = []),
                vA(this._container, this._settings),
                u && (this._container.innerHTML = ""),
                this._draw(),
                await new Promise((K) => requestAnimationFrame(K));
            }
            async clear() {
              this._container && (this._container.innerHTML = "");
            }
            _draw() {
              if (this.offsetParent !== null) {
                let a = fe(this._container),
                  o = `chart ${r}`;
                (this._settings.size = this._container.getBoundingClientRect()),
                  this._settings.data.length > 0
                    ? this._chart(a.attr("class", o), this._settings)
                    : a.attr("class", `${o} disabled`);
              }
            }
            async resize(a) {
              if (this.offsetParent !== null)
                if (this._settings?.data !== void 0) this._draw();
                else {
                  let [o, i, u] = this._staged_view;
                  (this._staged_view = void 0), this.draw(o, i, u);
                }
            }
            async restyle(...a) {
              let o = this._settings;
              o &&
                (delete o.colorStyles,
                delete o.textStyles,
                await this.draw(...a));
            }
            async delete() {
              this._container.innerHTML = "";
            }
            getContainer() {
              return this._container;
            }
            save() {
              let a = { ...this._settings };
              return (
                Q0.forEach((o) => {
                  delete a[o];
                }),
                a
              );
            }
            restore(a) {
              let o = {};
              for (let i of Q0)
                this._settings?.[i] !== void 0 && (o[i] = this._settings?.[i]);
              this._settings = { ...o, ...a };
            }
          },
        ),
          customElements.whenDefined("perspective-viewer").then(() => oR(n));
      }
    });
}
Element.prototype.matches ||
  (Element.prototype.matches = Element.prototype.msMatchesSelector);
yA();
//# sourceMappingURL=perspective-viewer-d3fc.js.map
