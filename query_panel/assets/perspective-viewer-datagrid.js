var ho = Object.create;
var mr = Object.defineProperty;
var _o = Object.getOwnPropertyDescriptor;
var uo = Object.getOwnPropertyNames;
var po = Object.getPrototypeOf,
  go = Object.prototype.hasOwnProperty;
var mo = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports);
var bo = (e, r, i, n) => {
  if ((r && typeof r == "object") || typeof r == "function")
    for (let s of uo(r))
      !go.call(e, s) &&
        s !== i &&
        mr(e, s, {
          get: () => r[s],
          enumerable: !(n = _o(r, s)) || n.enumerable,
        });
  return e;
};
var yt = (e, r, i) => (
  (i = e != null ? ho(po(e)) : {}),
  bo(
    r || !e || !e.__esModule
      ? mr(i, "default", { value: e, enumerable: !0 })
      : i,
    e,
  )
);
var at = mo((lt, nt) => {
  (function () {
    var e,
      r,
      i,
      n,
      s,
      h,
      p,
      u,
      x,
      L,
      b,
      S,
      I,
      z,
      P,
      E,
      D,
      H,
      U,
      m,
      A,
      te,
      oe,
      re,
      ae,
      Z,
      Se,
      ce,
      xe,
      de,
      _e,
      Ae,
      Ce,
      ze,
      $e,
      ge,
      ke,
      De,
      ft,
      ve,
      me,
      Ut,
      Ot,
      dt,
      Kt,
      Pt,
      Zt,
      ht,
      Ie,
      _t,
      Jt,
      q,
      Qt,
      er,
      tr,
      rr,
      fe,
      or,
      ir,
      sr,
      lr,
      nr,
      ar,
      cr,
      Ft,
      Rt,
      It,
      fr,
      dr,
      hr,
      ut,
      pt,
      _r,
      be,
      ur,
      Ge,
      we,
      Tt,
      Q,
      ee,
      Ne,
      gt,
      mt,
      Le = [].slice;
    (Q = (function () {
      var t, o, l, a, c;
      for (
        t = {},
          c =
            "Boolean Number String Function Array Date RegExp Undefined Null".split(
              " ",
            ),
          a = 0,
          o = c.length;
        a < o;
        a++
      )
        (l = c[a]), (t["[object " + l + "]"] = l.toLowerCase());
      return function (f) {
        var d;
        return (d = Object.prototype.toString.call(f)), t[d] || "object";
      };
    })()),
      (ht = function (t, o, l) {
        return (
          o == null && (o = 0),
          l == null && (l = 1),
          t < o && (t = o),
          t > l && (t = l),
          t
        );
      }),
      (ee = function (t) {
        return t.length >= 3 ? Array.prototype.slice.call(t) : t[0];
      }),
      (A = function (t) {
        var o, l;
        for (
          t._clipped = !1, t._unclipped = t.slice(0), o = l = 0;
          l < 3;
          o = ++l
        )
          o < 3
            ? ((t[o] < 0 || t[o] > 255) && (t._clipped = !0),
              t[o] < 0 && (t[o] = 0),
              t[o] > 255 && (t[o] = 255))
            : o === 3 && (t[o] < 0 && (t[o] = 0), t[o] > 1 && (t[o] = 1));
        return t._clipped || delete t._unclipped, t;
      }),
      (n = Math.PI),
      (be = Math.round),
      (re = Math.cos),
      (xe = Math.floor),
      (fe = Math.pow),
      (Ie = Math.log),
      (Ge = Math.sin),
      (we = Math.sqrt),
      (z = Math.atan2),
      (q = Math.max),
      (I = Math.abs),
      (p = n * 2),
      (s = n / 3),
      (r = n / 180),
      (h = 180 / n),
      (m = function () {
        return arguments[0] instanceof e
          ? arguments[0]
          : (function (t, o, l) {
              l.prototype = t.prototype;
              var a = new l(),
                c = t.apply(a, o);
              return Object(c) === c ? c : a;
            })(e, arguments, function () {});
      }),
      (m.default = m),
      (S = []),
      typeof nt < "u" && nt !== null && nt.exports != null && (nt.exports = m),
      typeof define == "function" && define.amd
        ? define([], function () {
            return m;
          })
        : ((_r = typeof lt < "u" && lt !== null ? lt : this), (_r.chroma = m)),
      (m.version = "1.4.1"),
      (b = {}),
      (x = []),
      (L = !1),
      (e = (function () {
        function t() {
          var o, l, a, c, f, d, _, g, v;
          for (d = this, l = [], g = 0, c = arguments.length; g < c; g++)
            (o = arguments[g]), o != null && l.push(o);
          if ((l.length > 1 && (_ = l[l.length - 1]), b[_] != null))
            d._rgb = A(b[_](ee(l.slice(0, -1))));
          else {
            for (
              L ||
                ((x = x.sort(function (k, F) {
                  return F.p - k.p;
                })),
                (L = !0)),
                v = 0,
                f = x.length;
              v < f && ((a = x[v]), (_ = a.test.apply(a, l)), !_);
              v++
            );
            _ && (d._rgb = A(b[_].apply(b, l)));
          }
          d._rgb == null && console.warn("unknown format: " + l),
            d._rgb == null && (d._rgb = [0, 0, 0]),
            d._rgb.length === 3 && d._rgb.push(1);
        }
        return (
          (t.prototype.toString = function () {
            return this.hex();
          }),
          t
        );
      })()),
      (m._input = b);
    (m.brewer = H =
      {
        OrRd: [
          "#fff7ec",
          "#fee8c8",
          "#fdd49e",
          "#fdbb84",
          "#fc8d59",
          "#ef6548",
          "#d7301f",
          "#b30000",
          "#7f0000",
        ],
        PuBu: [
          "#fff7fb",
          "#ece7f2",
          "#d0d1e6",
          "#a6bddb",
          "#74a9cf",
          "#3690c0",
          "#0570b0",
          "#045a8d",
          "#023858",
        ],
        BuPu: [
          "#f7fcfd",
          "#e0ecf4",
          "#bfd3e6",
          "#9ebcda",
          "#8c96c6",
          "#8c6bb1",
          "#88419d",
          "#810f7c",
          "#4d004b",
        ],
        Oranges: [
          "#fff5eb",
          "#fee6ce",
          "#fdd0a2",
          "#fdae6b",
          "#fd8d3c",
          "#f16913",
          "#d94801",
          "#a63603",
          "#7f2704",
        ],
        BuGn: [
          "#f7fcfd",
          "#e5f5f9",
          "#ccece6",
          "#99d8c9",
          "#66c2a4",
          "#41ae76",
          "#238b45",
          "#006d2c",
          "#00441b",
        ],
        YlOrBr: [
          "#ffffe5",
          "#fff7bc",
          "#fee391",
          "#fec44f",
          "#fe9929",
          "#ec7014",
          "#cc4c02",
          "#993404",
          "#662506",
        ],
        YlGn: [
          "#ffffe5",
          "#f7fcb9",
          "#d9f0a3",
          "#addd8e",
          "#78c679",
          "#41ab5d",
          "#238443",
          "#006837",
          "#004529",
        ],
        Reds: [
          "#fff5f0",
          "#fee0d2",
          "#fcbba1",
          "#fc9272",
          "#fb6a4a",
          "#ef3b2c",
          "#cb181d",
          "#a50f15",
          "#67000d",
        ],
        RdPu: [
          "#fff7f3",
          "#fde0dd",
          "#fcc5c0",
          "#fa9fb5",
          "#f768a1",
          "#dd3497",
          "#ae017e",
          "#7a0177",
          "#49006a",
        ],
        Greens: [
          "#f7fcf5",
          "#e5f5e0",
          "#c7e9c0",
          "#a1d99b",
          "#74c476",
          "#41ab5d",
          "#238b45",
          "#006d2c",
          "#00441b",
        ],
        YlGnBu: [
          "#ffffd9",
          "#edf8b1",
          "#c7e9b4",
          "#7fcdbb",
          "#41b6c4",
          "#1d91c0",
          "#225ea8",
          "#253494",
          "#081d58",
        ],
        Purples: [
          "#fcfbfd",
          "#efedf5",
          "#dadaeb",
          "#bcbddc",
          "#9e9ac8",
          "#807dba",
          "#6a51a3",
          "#54278f",
          "#3f007d",
        ],
        GnBu: [
          "#f7fcf0",
          "#e0f3db",
          "#ccebc5",
          "#a8ddb5",
          "#7bccc4",
          "#4eb3d3",
          "#2b8cbe",
          "#0868ac",
          "#084081",
        ],
        Greys: [
          "#ffffff",
          "#f0f0f0",
          "#d9d9d9",
          "#bdbdbd",
          "#969696",
          "#737373",
          "#525252",
          "#252525",
          "#000000",
        ],
        YlOrRd: [
          "#ffffcc",
          "#ffeda0",
          "#fed976",
          "#feb24c",
          "#fd8d3c",
          "#fc4e2a",
          "#e31a1c",
          "#bd0026",
          "#800026",
        ],
        PuRd: [
          "#f7f4f9",
          "#e7e1ef",
          "#d4b9da",
          "#c994c7",
          "#df65b0",
          "#e7298a",
          "#ce1256",
          "#980043",
          "#67001f",
        ],
        Blues: [
          "#f7fbff",
          "#deebf7",
          "#c6dbef",
          "#9ecae1",
          "#6baed6",
          "#4292c6",
          "#2171b5",
          "#08519c",
          "#08306b",
        ],
        PuBuGn: [
          "#fff7fb",
          "#ece2f0",
          "#d0d1e6",
          "#a6bddb",
          "#67a9cf",
          "#3690c0",
          "#02818a",
          "#016c59",
          "#014636",
        ],
        Viridis: [
          "#440154",
          "#482777",
          "#3f4a8a",
          "#31678e",
          "#26838f",
          "#1f9d8a",
          "#6cce5a",
          "#b6de2b",
          "#fee825",
        ],
        Spectral: [
          "#9e0142",
          "#d53e4f",
          "#f46d43",
          "#fdae61",
          "#fee08b",
          "#ffffbf",
          "#e6f598",
          "#abdda4",
          "#66c2a5",
          "#3288bd",
          "#5e4fa2",
        ],
        RdYlGn: [
          "#a50026",
          "#d73027",
          "#f46d43",
          "#fdae61",
          "#fee08b",
          "#ffffbf",
          "#d9ef8b",
          "#a6d96a",
          "#66bd63",
          "#1a9850",
          "#006837",
        ],
        RdBu: [
          "#67001f",
          "#b2182b",
          "#d6604d",
          "#f4a582",
          "#fddbc7",
          "#f7f7f7",
          "#d1e5f0",
          "#92c5de",
          "#4393c3",
          "#2166ac",
          "#053061",
        ],
        PiYG: [
          "#8e0152",
          "#c51b7d",
          "#de77ae",
          "#f1b6da",
          "#fde0ef",
          "#f7f7f7",
          "#e6f5d0",
          "#b8e186",
          "#7fbc41",
          "#4d9221",
          "#276419",
        ],
        PRGn: [
          "#40004b",
          "#762a83",
          "#9970ab",
          "#c2a5cf",
          "#e7d4e8",
          "#f7f7f7",
          "#d9f0d3",
          "#a6dba0",
          "#5aae61",
          "#1b7837",
          "#00441b",
        ],
        RdYlBu: [
          "#a50026",
          "#d73027",
          "#f46d43",
          "#fdae61",
          "#fee090",
          "#ffffbf",
          "#e0f3f8",
          "#abd9e9",
          "#74add1",
          "#4575b4",
          "#313695",
        ],
        BrBG: [
          "#543005",
          "#8c510a",
          "#bf812d",
          "#dfc27d",
          "#f6e8c3",
          "#f5f5f5",
          "#c7eae5",
          "#80cdc1",
          "#35978f",
          "#01665e",
          "#003c30",
        ],
        RdGy: [
          "#67001f",
          "#b2182b",
          "#d6604d",
          "#f4a582",
          "#fddbc7",
          "#ffffff",
          "#e0e0e0",
          "#bababa",
          "#878787",
          "#4d4d4d",
          "#1a1a1a",
        ],
        PuOr: [
          "#7f3b08",
          "#b35806",
          "#e08214",
          "#fdb863",
          "#fee0b6",
          "#f7f7f7",
          "#d8daeb",
          "#b2abd2",
          "#8073ac",
          "#542788",
          "#2d004b",
        ],
        Set2: [
          "#66c2a5",
          "#fc8d62",
          "#8da0cb",
          "#e78ac3",
          "#a6d854",
          "#ffd92f",
          "#e5c494",
          "#b3b3b3",
        ],
        Accent: [
          "#7fc97f",
          "#beaed4",
          "#fdc086",
          "#ffff99",
          "#386cb0",
          "#f0027f",
          "#bf5b17",
          "#666666",
        ],
        Set1: [
          "#e41a1c",
          "#377eb8",
          "#4daf4a",
          "#984ea3",
          "#ff7f00",
          "#ffff33",
          "#a65628",
          "#f781bf",
          "#999999",
        ],
        Set3: [
          "#8dd3c7",
          "#ffffb3",
          "#bebada",
          "#fb8072",
          "#80b1d3",
          "#fdb462",
          "#b3de69",
          "#fccde5",
          "#d9d9d9",
          "#bc80bd",
          "#ccebc5",
          "#ffed6f",
        ],
        Dark2: [
          "#1b9e77",
          "#d95f02",
          "#7570b3",
          "#e7298a",
          "#66a61e",
          "#e6ab02",
          "#a6761d",
          "#666666",
        ],
        Paired: [
          "#a6cee3",
          "#1f78b4",
          "#b2df8a",
          "#33a02c",
          "#fb9a99",
          "#e31a1c",
          "#fdbf6f",
          "#ff7f00",
          "#cab2d6",
          "#6a3d9a",
          "#ffff99",
          "#b15928",
        ],
        Pastel2: [
          "#b3e2cd",
          "#fdcdac",
          "#cbd5e8",
          "#f4cae4",
          "#e6f5c9",
          "#fff2ae",
          "#f1e2cc",
          "#cccccc",
        ],
        Pastel1: [
          "#fbb4ae",
          "#b3cde3",
          "#ccebc5",
          "#decbe4",
          "#fed9a6",
          "#ffffcc",
          "#e5d8bd",
          "#fddaec",
          "#f2f2f2",
        ],
      }),
      (function () {
        var t, o;
        o = [];
        for (t in H) o.push((H[t.toLowerCase()] = H[t]));
        return o;
      })(),
      (Ne = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflower: "#6495ed",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
      }),
      (m.colors = oe = Ne),
      (Ot = function () {
        var t, o, l, a, c, f, d, _, g;
        return (
          (o = ee(arguments)),
          (c = o[0]),
          (t = o[1]),
          (l = o[2]),
          (_ = (c + 16) / 116),
          (d = isNaN(t) ? _ : _ + t / 500),
          (g = isNaN(l) ? _ : _ - l / 200),
          (_ = i.Yn * dt(_)),
          (d = i.Xn * dt(d)),
          (g = i.Zn * dt(g)),
          (f = mt(3.2404542 * d - 1.5371385 * _ - 0.4985314 * g)),
          (a = mt(-0.969266 * d + 1.8760108 * _ + 0.041556 * g)),
          (l = mt(0.0556434 * d - 0.2040259 * _ + 1.0572252 * g)),
          [f, a, l, o.length > 3 ? o[3] : 1]
        );
      }),
      (mt = function (t) {
        return (
          255 * (t <= 0.00304 ? 12.92 * t : 1.055 * fe(t, 1 / 2.4) - 0.055)
        );
      }),
      (dt = function (t) {
        return t > i.t1 ? t * t * t : i.t2 * (t - i.t0);
      }),
      (i = {
        Kn: 18,
        Xn: 0.95047,
        Yn: 1,
        Zn: 1.08883,
        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 0.008856452,
      }),
      (Ft = function () {
        var t, o, l, a, c, f, d, _;
        return (
          (a = ee(arguments)),
          (l = a[0]),
          (o = a[1]),
          (t = a[2]),
          (c = hr(l, o, t)),
          (f = c[0]),
          (d = c[1]),
          (_ = c[2]),
          [116 * d - 16, 500 * (f - d), 200 * (d - _)]
        );
      }),
      (ut = function (t) {
        return (t /= 255) <= 0.04045 ? t / 12.92 : fe((t + 0.055) / 1.055, 2.4);
      }),
      (gt = function (t) {
        return t > i.t3 ? fe(t, 1 / 3) : t / i.t2 + i.t0;
      }),
      (hr = function () {
        var t, o, l, a, c, f, d;
        return (
          (a = ee(arguments)),
          (l = a[0]),
          (o = a[1]),
          (t = a[2]),
          (l = ut(l)),
          (o = ut(o)),
          (t = ut(t)),
          (c = gt((0.4124564 * l + 0.3575761 * o + 0.1804375 * t) / i.Xn)),
          (f = gt((0.2126729 * l + 0.7151522 * o + 0.072175 * t) / i.Yn)),
          (d = gt((0.0193339 * l + 0.119192 * o + 0.9503041 * t) / i.Zn)),
          [c, f, d]
        );
      }),
      (m.lab = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["lab"]), function () {});
      }),
      (b.lab = Ot),
      (e.prototype.lab = function () {
        return Ft(this._rgb);
      }),
      (P = function (t) {
        var o, l, a, c, f, d, _, g, v, k, F;
        return (
          (t = (function () {
            var M, w, C;
            for (C = [], w = 0, M = t.length; w < M; w++)
              (c = t[w]), C.push(m(c));
            return C;
          })()),
          t.length === 2
            ? ((v = (function () {
                var M, w, C;
                for (C = [], w = 0, M = t.length; w < M; w++)
                  (c = t[w]), C.push(c.lab());
                return C;
              })()),
              (f = v[0]),
              (d = v[1]),
              (o = function (M) {
                var w, C;
                return (
                  (C = (function () {
                    var O, T;
                    for (T = [], w = O = 0; O <= 2; w = ++O)
                      T.push(f[w] + M * (d[w] - f[w]));
                    return T;
                  })()),
                  m.lab.apply(m, C)
                );
              }))
            : t.length === 3
            ? ((k = (function () {
                var M, w, C;
                for (C = [], w = 0, M = t.length; w < M; w++)
                  (c = t[w]), C.push(c.lab());
                return C;
              })()),
              (f = k[0]),
              (d = k[1]),
              (_ = k[2]),
              (o = function (M) {
                var w, C;
                return (
                  (C = (function () {
                    var O, T;
                    for (T = [], w = O = 0; O <= 2; w = ++O)
                      T.push(
                        (1 - M) * (1 - M) * f[w] +
                          2 * (1 - M) * M * d[w] +
                          M * M * _[w],
                      );
                    return T;
                  })()),
                  m.lab.apply(m, C)
                );
              }))
            : t.length === 4
            ? ((F = (function () {
                var M, w, C;
                for (C = [], w = 0, M = t.length; w < M; w++)
                  (c = t[w]), C.push(c.lab());
                return C;
              })()),
              (f = F[0]),
              (d = F[1]),
              (_ = F[2]),
              (g = F[3]),
              (o = function (M) {
                var w, C;
                return (
                  (C = (function () {
                    var O, T;
                    for (T = [], w = O = 0; O <= 2; w = ++O)
                      T.push(
                        (1 - M) * (1 - M) * (1 - M) * f[w] +
                          3 * (1 - M) * (1 - M) * M * d[w] +
                          3 * (1 - M) * M * M * _[w] +
                          M * M * M * g[w],
                      );
                    return T;
                  })()),
                  m.lab.apply(m, C)
                );
              }))
            : t.length === 5 &&
              ((l = P(t.slice(0, 3))),
              (a = P(t.slice(2, 5))),
              (o = function (M) {
                return M < 0.5 ? l(M * 2) : a((M - 0.5) * 2);
              })),
          o
        );
      }),
      (m.bezier = function (t) {
        var o;
        return (
          (o = P(t)),
          (o.scale = function () {
            return m.scale(o);
          }),
          o
        );
      }),
      (m.cubehelix = function (t, o, l, a, c) {
        var f, d, _;
        return (
          t == null && (t = 300),
          o == null && (o = -1.5),
          l == null && (l = 1),
          a == null && (a = 1),
          c == null && (c = [0, 1]),
          (f = 0),
          Q(c) === "array" ? (d = c[1] - c[0]) : ((d = 0), (c = [c, c])),
          (_ = function (g) {
            var v, k, F, M, w, C, O, T, V;
            return (
              (v = p * ((t + 120) / 360 + o * g)),
              (O = fe(c[0] + d * g, a)),
              (C = f !== 0 ? l[0] + g * f : l),
              (k = (C * O * (1 - O)) / 2),
              (M = re(v)),
              (V = Ge(v)),
              (T = O + k * (-0.14861 * M + 1.78277 * V)),
              (w = O + k * (-0.29227 * M - 0.90649 * V)),
              (F = O + k * (1.97294 * M)),
              m(A([T * 255, w * 255, F * 255, 1]))
            );
          }),
          (_.start = function (g) {
            return g == null ? t : ((t = g), _);
          }),
          (_.rotations = function (g) {
            return g == null ? o : ((o = g), _);
          }),
          (_.gamma = function (g) {
            return g == null ? a : ((a = g), _);
          }),
          (_.hue = function (g) {
            return g == null
              ? l
              : ((l = g),
                Q(l) === "array"
                  ? ((f = l[1] - l[0]), f === 0 && (l = l[1]))
                  : (f = 0),
                _);
          }),
          (_.lightness = function (g) {
            return g == null
              ? c
              : (Q(g) === "array"
                  ? ((c = g), (d = g[1] - g[0]))
                  : ((c = [g, g]), (d = 0)),
                _);
          }),
          (_.scale = function () {
            return m.scale(_);
          }),
          _.hue(l),
          _
        );
      }),
      (m.random = function () {
        var t, o, l, a;
        for (o = "0123456789abcdef", t = "#", l = a = 0; a < 6; l = ++a)
          t += o.charAt(xe(Math.random() * 16));
        return new e(t);
      }),
      (S = []),
      (ge = function (t, o, l, a) {
        var c, f, d, _;
        for (
          l == null && (l = 0.5),
            a == null && (a = "rgb"),
            Q(t) !== "object" && (t = m(t)),
            Q(o) !== "object" && (o = m(o)),
            d = 0,
            f = S.length;
          d < f;
          d++
        )
          if (((c = S[d]), a === c[0])) {
            _ = c[1](t, o, l, a);
            break;
          }
        if (_ == null) throw "color mode " + a + " is not supported";
        return _.alpha(t.alpha() + l * (o.alpha() - t.alpha()));
      }),
      (m.interpolate = ge),
      (e.prototype.interpolate = function (t, o, l) {
        return ge(this, t, o, l);
      }),
      (m.mix = ge),
      (e.prototype.mix = e.prototype.interpolate),
      (b.rgb = function () {
        var t, o, l, a;
        (o = ee(arguments)), (l = []);
        for (t in o) (a = o[t]), l.push(a);
        return l;
      }),
      (m.rgb = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["rgb"]), function () {});
      }),
      (e.prototype.rgb = function (t) {
        return (
          t == null && (t = !0),
          t ? this._rgb.map(Math.round).slice(0, 3) : this._rgb.slice(0, 3)
        );
      }),
      (e.prototype.rgba = function (t) {
        return (
          t == null && (t = !0),
          t
            ? [
                Math.round(this._rgb[0]),
                Math.round(this._rgb[1]),
                Math.round(this._rgb[2]),
                this._rgb[3],
              ]
            : this._rgb.slice(0)
        );
      }),
      x.push({
        p: 3,
        test: function (t) {
          var o;
          if (
            ((o = ee(arguments)),
            (Q(o) === "array" && o.length === 3) ||
              (o.length === 4 &&
                Q(o[3]) === "number" &&
                o[3] >= 0 &&
                o[3] <= 1))
          )
            return "rgb";
        },
      }),
      (b.lrgb = b.rgb),
      (ft = function (t, o, l, a) {
        var c, f;
        return (
          (c = t._rgb),
          (f = o._rgb),
          new e(
            we(fe(c[0], 2) * (1 - l) + fe(f[0], 2) * l),
            we(fe(c[1], 2) * (1 - l) + fe(f[1], 2) * l),
            we(fe(c[2], 2) * (1 - l) + fe(f[2], 2) * l),
            a,
          )
        );
      }),
      (u = function (t) {
        var o, l, a, c, f, d;
        for (
          l = 1 / t.length, d = [0, 0, 0, 0], c = 0, a = t.length;
          c < a;
          c++
        )
          (o = t[c]),
            (f = o._rgb),
            (d[0] += fe(f[0], 2) * l),
            (d[1] += fe(f[1], 2) * l),
            (d[2] += fe(f[2], 2) * l),
            (d[3] += f[3] * l);
        return (
          (d[0] = we(d[0])),
          (d[1] = we(d[1])),
          (d[2] = we(d[2])),
          d[3] > 1 && (d[3] = 1),
          new e(A(d))
        );
      }),
      S.push(["lrgb", ft]),
      (m.average = function (t, o) {
        var l, a, c, f, d, _, g, v, k, F, M, w, C;
        if (
          (o == null && (o = "rgb"),
          (k = t.length),
          (t = t.map(function (O) {
            return m(O);
          })),
          (g = t.splice(0, 1)[0]),
          o === "lrgb")
        )
          return u(t);
        (w = g.get(o)), (f = []), (d = 0), (_ = 0);
        for (v in w)
          (w[v] = w[v] || 0),
            f.push(isNaN(w[v]) ? 0 : 1),
            o.charAt(v) === "h" &&
              !isNaN(w[v]) &&
              ((l = (w[v] / 180) * n), (d += re(l)), (_ += Ge(l)));
        for (a = g.alpha(), M = 0, F = t.length; M < F; M++) {
          (c = t[M]), (C = c.get(o)), (a += c.alpha());
          for (v in w)
            isNaN(C[v]) ||
              ((f[v] += 1),
              o.charAt(v) === "h"
                ? ((l = (C[v] / 180) * n), (d += re(l)), (_ += Ge(l)))
                : (w[v] += C[v]));
        }
        for (v in w)
          if (o.charAt(v) === "h") {
            for (l = (z(_ / f[v], d / f[v]) / n) * 180; l < 0; ) l += 360;
            for (; l >= 360; ) l -= 360;
            w[v] = l;
          } else w[v] = w[v] / f[v];
        return m(w, o).alpha(a / k);
      }),
      (_e = function (t) {
        var o, l, a, c, f, d;
        if (t.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))
          return (
            (t.length === 4 || t.length === 7) && (t = t.substr(1)),
            t.length === 3 &&
              ((t = t.split("")),
              (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2])),
            (d = parseInt(t, 16)),
            (c = d >> 16),
            (a = (d >> 8) & 255),
            (l = d & 255),
            [c, a, l, 1]
          );
        if (t.match(/^#?([A-Fa-f0-9]{8})$/))
          return (
            t.length === 9 && (t = t.substr(1)),
            (d = parseInt(t, 16)),
            (c = (d >> 24) & 255),
            (a = (d >> 16) & 255),
            (l = (d >> 8) & 255),
            (o = be(((d & 255) / 255) * 100) / 100),
            [c, a, l, o]
          );
        if (b.css != null && (f = b.css(t))) return f;
        throw "unknown color: " + t;
      }),
      (lr = function (t, o) {
        var l, a, c, f, d, _, g;
        return (
          o == null && (o = "auto"),
          (d = t[0]),
          (c = t[1]),
          (a = t[2]),
          (l = t[3]),
          o === "auto" && (o = l < 1 ? "rgba" : "rgb"),
          (d = Math.round(d)),
          (c = Math.round(c)),
          (a = Math.round(a)),
          (g = (d << 16) | (c << 8) | a),
          (_ = "000000" + g.toString(16)),
          (_ = _.substr(_.length - 6)),
          (f = "0" + be(l * 255).toString(16)),
          (f = f.substr(f.length - 2)),
          "#" +
            (function () {
              switch (o.toLowerCase()) {
                case "rgba":
                  return _ + f;
                case "argb":
                  return f + _;
                default:
                  return _;
              }
            })()
        );
      }),
      (b.hex = function (t) {
        return _e(t);
      }),
      (m.hex = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["hex"]), function () {});
      }),
      (e.prototype.hex = function (t) {
        return t == null && (t = "auto"), lr(this._rgb, t);
      }),
      x.push({
        p: 4,
        test: function (t) {
          if (arguments.length === 1 && Q(t) === "string") return "hex";
        },
      }),
      (ze = function () {
        var t, o, l, a, c, f, d, _, g, v, k, F, M, w;
        if (((t = ee(arguments)), (c = t[0]), (k = t[1]), (d = t[2]), k === 0))
          g = a = o = d * 255;
        else {
          for (
            w = [0, 0, 0],
              l = [0, 0, 0],
              M = d < 0.5 ? d * (1 + k) : d + k - d * k,
              F = 2 * d - M,
              c /= 360,
              w[0] = c + 1 / 3,
              w[1] = c,
              w[2] = c - 1 / 3,
              f = _ = 0;
            _ <= 2;
            f = ++_
          )
            w[f] < 0 && (w[f] += 1),
              w[f] > 1 && (w[f] -= 1),
              6 * w[f] < 1
                ? (l[f] = F + (M - F) * 6 * w[f])
                : 2 * w[f] < 1
                ? (l[f] = M)
                : 3 * w[f] < 2
                ? (l[f] = F + (M - F) * (2 / 3 - w[f]) * 6)
                : (l[f] = F);
          (v = [be(l[0] * 255), be(l[1] * 255), be(l[2] * 255)]),
            (g = v[0]),
            (a = v[1]),
            (o = v[2]);
        }
        return t.length > 3 ? [g, a, o, t[3]] : [g, a, o];
      }),
      (ar = function (t, o, l) {
        var a, c, f, d, _;
        return (
          t !== void 0 &&
            t.length >= 3 &&
            ((d = t), (t = d[0]), (o = d[1]), (l = d[2])),
          (t /= 255),
          (o /= 255),
          (l /= 255),
          (f = Math.min(t, o, l)),
          (q = Math.max(t, o, l)),
          (c = (q + f) / 2),
          q === f
            ? ((_ = 0), (a = Number.NaN))
            : (_ = c < 0.5 ? (q - f) / (q + f) : (q - f) / (2 - q - f)),
          t === q
            ? (a = (o - l) / (q - f))
            : o === q
            ? (a = 2 + (l - t) / (q - f))
            : l === q && (a = 4 + (t - o) / (q - f)),
          (a *= 60),
          a < 0 && (a += 360),
          [a, _, c]
        );
      }),
      (m.hsl = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["hsl"]), function () {});
      }),
      (b.hsl = ze),
      (e.prototype.hsl = function () {
        return ar(this._rgb);
      }),
      ($e = function () {
        var t, o, l, a, c, f, d, _, g, v, k, F, M, w, C, O, T, V;
        if (
          ((t = ee(arguments)),
          (c = t[0]),
          (O = t[1]),
          (V = t[2]),
          (V *= 255),
          O === 0)
        )
          g = a = o = V;
        else
          switch (
            (c === 360 && (c = 0),
            c > 360 && (c -= 360),
            c < 0 && (c += 360),
            (c /= 60),
            (f = xe(c)),
            (l = c - f),
            (d = V * (1 - O)),
            (_ = V * (1 - O * l)),
            (T = V * (1 - O * (1 - l))),
            f)
          ) {
            case 0:
              (v = [V, T, d]), (g = v[0]), (a = v[1]), (o = v[2]);
              break;
            case 1:
              (k = [_, V, d]), (g = k[0]), (a = k[1]), (o = k[2]);
              break;
            case 2:
              (F = [d, V, T]), (g = F[0]), (a = F[1]), (o = F[2]);
              break;
            case 3:
              (M = [d, _, V]), (g = M[0]), (a = M[1]), (o = M[2]);
              break;
            case 4:
              (w = [T, d, V]), (g = w[0]), (a = w[1]), (o = w[2]);
              break;
            case 5:
              (C = [V, d, _]), (g = C[0]), (a = C[1]), (o = C[2]);
          }
        return [g, a, o, t.length > 3 ? t[3] : 1];
      }),
      (cr = function () {
        var t, o, l, a, c, f, d, _, g;
        return (
          (d = ee(arguments)),
          (f = d[0]),
          (l = d[1]),
          (t = d[2]),
          (c = Math.min(f, l, t)),
          (q = Math.max(f, l, t)),
          (o = q - c),
          (g = q / 255),
          q === 0
            ? ((a = Number.NaN), (_ = 0))
            : ((_ = o / q),
              f === q && (a = (l - t) / o),
              l === q && (a = 2 + (t - f) / o),
              t === q && (a = 4 + (f - l) / o),
              (a *= 60),
              a < 0 && (a += 360)),
          [a, _, g]
        );
      }),
      (m.hsv = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["hsv"]), function () {});
      }),
      (b.hsv = $e),
      (e.prototype.hsv = function () {
        return cr(this._rgb);
      }),
      (tr = function (t) {
        var o, l, a;
        return Q(t) === "number" && t >= 0 && t <= 16777215
          ? ((a = t >> 16), (l = (t >> 8) & 255), (o = t & 255), [a, l, o, 1])
          : (console.warn("unknown num color: " + t), [0, 0, 0, 1]);
      }),
      (fr = function () {
        var t, o, l, a;
        return (
          (a = ee(arguments)),
          (l = a[0]),
          (o = a[1]),
          (t = a[2]),
          (l << 16) + (o << 8) + t
        );
      }),
      (m.num = function (t) {
        return new e(t, "num");
      }),
      (e.prototype.num = function (t) {
        return t == null && (t = "rgb"), fr(this._rgb, t);
      }),
      (b.num = tr),
      x.push({
        p: 1,
        test: function (t) {
          if (
            arguments.length === 1 &&
            Q(t) === "number" &&
            t >= 0 &&
            t <= 16777215
          )
            return "num";
        },
      }),
      (de = function () {
        var t, o, l, a, c, f, d, _, g, v, k, F, M, w, C, O, T, V, ie, R;
        if (
          ((l = ee(arguments)),
          (_ = l[0]),
          (c = l[1]),
          (o = l[2]),
          (c = c / 100),
          (d = (d / 100) * 255),
          (t = c * 255),
          c === 0)
        )
          F = d = a = o;
        else
          switch (
            (_ === 360 && (_ = 0),
            _ > 360 && (_ -= 360),
            _ < 0 && (_ += 360),
            (_ /= 60),
            (g = xe(_)),
            (f = _ - g),
            (v = o * (1 - c)),
            (k = v + t * (1 - f)),
            (ie = v + t * f),
            (R = v + t),
            g)
          ) {
            case 0:
              (M = [R, ie, v]), (F = M[0]), (d = M[1]), (a = M[2]);
              break;
            case 1:
              (w = [k, R, v]), (F = w[0]), (d = w[1]), (a = w[2]);
              break;
            case 2:
              (C = [v, R, ie]), (F = C[0]), (d = C[1]), (a = C[2]);
              break;
            case 3:
              (O = [v, k, R]), (F = O[0]), (d = O[1]), (a = O[2]);
              break;
            case 4:
              (T = [ie, v, R]), (F = T[0]), (d = T[1]), (a = T[2]);
              break;
            case 5:
              (V = [R, v, k]), (F = V[0]), (d = V[1]), (a = V[2]);
          }
        return [F, d, a, l.length > 3 ? l[3] : 1];
      }),
      (sr = function () {
        var t, o, l, a, c, f, d, _, g;
        return (
          (g = ee(arguments)),
          (_ = g[0]),
          (c = g[1]),
          (o = g[2]),
          (d = Math.min(_, c, o)),
          (q = Math.max(_, c, o)),
          (a = q - d),
          (l = (a * 100) / 255),
          (t = (d / (255 - a)) * 100),
          a === 0
            ? (f = Number.NaN)
            : (_ === q && (f = (c - o) / a),
              c === q && (f = 2 + (o - _) / a),
              o === q && (f = 4 + (_ - c) / a),
              (f *= 60),
              f < 0 && (f += 360)),
          [f, l, t]
        );
      }),
      (m.hcg = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["hcg"]), function () {});
      }),
      (b.hcg = de),
      (e.prototype.hcg = function () {
        return sr(this._rgb);
      }),
      (ae = function (t) {
        var o, l, a, c, f, d, _, g;
        if (((t = t.toLowerCase()), m.colors != null && m.colors[t]))
          return _e(m.colors[t]);
        if ((f = t.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/))) {
          for (_ = f.slice(1, 4), c = d = 0; d <= 2; c = ++d) _[c] = +_[c];
          _[3] = 1;
        } else if (
          (f = t.match(
            /rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/,
          ))
        )
          for (_ = f.slice(1, 5), c = g = 0; g <= 3; c = ++g) _[c] = +_[c];
        else if (
          (f = t.match(
            /rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/,
          ))
        ) {
          for (_ = f.slice(1, 4), c = o = 0; o <= 2; c = ++o)
            _[c] = be(_[c] * 2.55);
          _[3] = 1;
        } else if (
          (f = t.match(
            /rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/,
          ))
        ) {
          for (_ = f.slice(1, 5), c = l = 0; l <= 2; c = ++l)
            _[c] = be(_[c] * 2.55);
          _[3] = +_[3];
        } else
          (f = t.match(
            /hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/,
          ))
            ? ((a = f.slice(1, 4)),
              (a[1] *= 0.01),
              (a[2] *= 0.01),
              (_ = ze(a)),
              (_[3] = 1))
            : (f = t.match(
                /hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/,
              )) &&
              ((a = f.slice(1, 4)),
              (a[1] *= 0.01),
              (a[2] *= 0.01),
              (_ = ze(a)),
              (_[3] = +f[4]));
        return _;
      }),
      (ir = function (t) {
        var o;
        if (((o = t[3] < 1 ? "rgba" : "rgb"), o === "rgb"))
          return o + "(" + t.slice(0, 3).map(be).join(",") + ")";
        if (o === "rgba")
          return o + "(" + t.slice(0, 3).map(be).join(",") + "," + t[3] + ")";
      }),
      (pt = function (t) {
        return be(t * 100) / 100;
      }),
      (Ce = function (t, o) {
        var l;
        return (
          (l = o < 1 ? "hsla" : "hsl"),
          (t[0] = pt(t[0] || 0)),
          (t[1] = pt(t[1] * 100) + "%"),
          (t[2] = pt(t[2] * 100) + "%"),
          l === "hsla" && (t[3] = o),
          l + "(" + t.join(",") + ")"
        );
      }),
      (b.css = function (t) {
        return ae(t);
      }),
      (m.css = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["css"]), function () {});
      }),
      (e.prototype.css = function (t) {
        if ((t == null && (t = "rgb"), t.slice(0, 3) === "rgb"))
          return ir(this._rgb);
        if (t.slice(0, 3) === "hsl") return Ce(this.hsl(), this.alpha());
      }),
      (b.named = function (t) {
        return _e(Ne[t]);
      }),
      x.push({
        p: 5,
        test: function (t) {
          if (arguments.length === 1 && Ne[t] != null) return "named";
        },
      }),
      (e.prototype.name = function (t) {
        var o, l;
        arguments.length &&
          (Ne[t] && (this._rgb = _e(Ne[t])), (this._rgb[3] = 1)),
          (o = this.hex("rgb"));
        for (l in Ne) if (o === Ne[l]) return l;
        return o;
      }),
      (Kt = function () {
        var t, o, l, a;
        return (
          (a = ee(arguments)),
          (l = a[0]),
          (t = a[1]),
          (o = a[2]),
          (o = o * r),
          [l, re(o) * t, Ge(o) * t]
        );
      }),
      (Pt = function () {
        var t, o, l, a, c, f, d, _, g, v, k;
        return (
          (l = ee(arguments)),
          (_ = l[0]),
          (c = l[1]),
          (d = l[2]),
          (v = Kt(_, c, d)),
          (t = v[0]),
          (o = v[1]),
          (a = v[2]),
          (k = Ot(t, o, a)),
          (g = k[0]),
          (f = k[1]),
          (a = k[2]),
          [g, f, a, l.length > 3 ? l[3] : 1]
        );
      }),
      (Ut = function () {
        var t, o, l, a, c, f;
        return (
          (f = ee(arguments)),
          (c = f[0]),
          (t = f[1]),
          (o = f[2]),
          (l = we(t * t + o * o)),
          (a = (z(o, t) * h + 360) % 360),
          be(l * 1e4) === 0 && (a = Number.NaN),
          [c, l, a]
        );
      }),
      (Rt = function () {
        var t, o, l, a, c, f, d;
        return (
          (f = ee(arguments)),
          (c = f[0]),
          (l = f[1]),
          (o = f[2]),
          (d = Ft(c, l, o)),
          (a = d[0]),
          (t = d[1]),
          (o = d[2]),
          Ut(a, t, o)
        );
      }),
      (m.lch = function () {
        var t;
        return (t = ee(arguments)), new e(t, "lch");
      }),
      (m.hcl = function () {
        var t;
        return (t = ee(arguments)), new e(t, "hcl");
      }),
      (b.lch = Pt),
      (b.hcl = function () {
        var t, o, l, a;
        return (
          (a = ee(arguments)), (o = a[0]), (t = a[1]), (l = a[2]), Pt([l, t, o])
        );
      }),
      (e.prototype.lch = function () {
        return Rt(this._rgb);
      }),
      (e.prototype.hcl = function () {
        return Rt(this._rgb).reverse();
      }),
      (or = function (t) {
        var o, l, a, c, f, d, _, g, v;
        return (
          t == null && (t = "rgb"),
          (g = ee(arguments)),
          (_ = g[0]),
          (c = g[1]),
          (o = g[2]),
          (_ = _ / 255),
          (c = c / 255),
          (o = o / 255),
          (f = 1 - Math.max(_, Math.max(c, o))),
          (a = f < 1 ? 1 / (1 - f) : 0),
          (l = (1 - _ - f) * a),
          (d = (1 - c - f) * a),
          (v = (1 - o - f) * a),
          [l, d, v, f]
        );
      }),
      (te = function () {
        var t, o, l, a, c, f, d, _, g;
        return (
          (o = ee(arguments)),
          (a = o[0]),
          (d = o[1]),
          (g = o[2]),
          (f = o[3]),
          (t = o.length > 4 ? o[4] : 1),
          f === 1
            ? [0, 0, 0, t]
            : ((_ = a >= 1 ? 0 : 255 * (1 - a) * (1 - f)),
              (c = d >= 1 ? 0 : 255 * (1 - d) * (1 - f)),
              (l = g >= 1 ? 0 : 255 * (1 - g) * (1 - f)),
              [_, c, l, t])
        );
      }),
      (b.cmyk = function () {
        return te(ee(arguments));
      }),
      (m.cmyk = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["cmyk"]), function () {});
      }),
      (e.prototype.cmyk = function () {
        return or(this._rgb);
      }),
      (b.gl = function () {
        var t, o, l, a, c;
        for (
          a = function () {
            var f, d;
            (f = ee(arguments)), (d = []);
            for (o in f) (c = f[o]), d.push(c);
            return d;
          }.apply(this, arguments),
            t = l = 0;
          l <= 2;
          t = ++l
        )
          a[t] *= 255;
        return a;
      }),
      (m.gl = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["gl"]), function () {});
      }),
      (e.prototype.gl = function () {
        var t;
        return (t = this._rgb), [t[0] / 255, t[1] / 255, t[2] / 255, t[3]];
      }),
      (It = function (t, o, l) {
        var a;
        return (
          (a = ee(arguments)),
          (t = a[0]),
          (o = a[1]),
          (l = a[2]),
          (t = _t(t)),
          (o = _t(o)),
          (l = _t(l)),
          0.2126 * t + 0.7152 * o + 0.0722 * l
        );
      }),
      (_t = function (t) {
        return (
          (t /= 255), t <= 0.03928 ? t / 12.92 : fe((t + 0.055) / 1.055, 2.4)
        );
      }),
      (me = function (t, o, l, a) {
        var c, f;
        return (
          (c = t._rgb),
          (f = o._rgb),
          new e(
            c[0] + l * (f[0] - c[0]),
            c[1] + l * (f[1] - c[1]),
            c[2] + l * (f[2] - c[2]),
            a,
          )
        );
      }),
      S.push(["rgb", me]),
      (e.prototype.luminance = function (t, o) {
        var l, a, c, f, d;
        return (
          o == null && (o = "rgb"),
          arguments.length
            ? ((f = this._rgb),
              t === 0
                ? (f = [0, 0, 0, this._rgb[3]])
                : t === 1
                ? (f = [255, 255, 255, this[3]])
                : ((l = It(this._rgb)),
                  (a = 1e-7),
                  (c = 20),
                  (d = function (_, g) {
                    var v, k;
                    return (
                      (k = _.interpolate(g, 0.5, o)),
                      (v = k.luminance()),
                      Math.abs(t - v) < a || !c--
                        ? k
                        : v > t
                        ? d(_, k)
                        : d(k, g)
                    );
                  }),
                  l > t
                    ? (f = d(m("black"), this).rgba())
                    : (f = d(this, m("white")).rgba())),
              m(f).alpha(this.alpha()))
            : It(this._rgb)
        );
      }),
      (Tt = function (t) {
        var o, l, a, c;
        return (
          (c = t / 100),
          c < 66
            ? ((a = 255),
              (l =
                -155.25485562709179 -
                0.44596950469579133 * (l = c - 2) +
                104.49216199393888 * Ie(l)),
              (o =
                c < 20
                  ? 0
                  : -254.76935184120902 +
                    0.8274096064007395 * (o = c - 10) +
                    115.67994401066147 * Ie(o)))
            : ((a =
                351.97690566805693 +
                0.114206453784165 * (a = c - 55) -
                40.25366309332127 * Ie(a)),
              (l =
                325.4494125711974 +
                0.07943456536662342 * (l = c - 50) -
                28.0852963507957 * Ie(l)),
              (o = 255)),
          [a, l, o]
        );
      }),
      (dr = function () {
        var t, o, l, a, c, f, d, _, g;
        for (
          d = ee(arguments),
            f = d[0],
            l = d[1],
            t = d[2],
            c = 1e3,
            a = 4e4,
            o = 0.4;
          a - c > o;

        )
          (g = (a + c) * 0.5),
            (_ = Tt(g)),
            _[2] / _[0] >= t / f ? (a = g) : (c = g);
        return be(g);
      }),
      (m.temperature = m.kelvin =
        function () {
          return (function (t, o, l) {
            l.prototype = t.prototype;
            var a = new l(),
              c = t.apply(a, o);
            return Object(c) === c ? c : a;
          })(e, Le.call(arguments).concat(["temperature"]), function () {});
        }),
      (b.temperature = b.kelvin = b.K = Tt),
      (e.prototype.temperature = function () {
        return dr(this._rgb);
      }),
      (e.prototype.kelvin = e.prototype.temperature),
      (m.contrast = function (t, o) {
        var l, a, c, f;
        return (
          ((c = Q(t)) === "string" || c === "number") && (t = new e(t)),
          ((f = Q(o)) === "string" || f === "number") && (o = new e(o)),
          (l = t.luminance()),
          (a = o.luminance()),
          l > a ? (l + 0.05) / (a + 0.05) : (a + 0.05) / (l + 0.05)
        );
      }),
      (m.distance = function (t, o, l) {
        var a, c, f, d, _, g, v;
        l == null && (l = "lab"),
          ((_ = Q(t)) === "string" || _ === "number") && (t = new e(t)),
          ((g = Q(o)) === "string" || g === "number") && (o = new e(o)),
          (f = t.get(l)),
          (d = o.get(l)),
          (v = 0);
        for (c in f) (a = (f[c] || 0) - (d[c] || 0)), (v += a * a);
        return Math.sqrt(v);
      }),
      (m.deltaE = function (t, o, l, a) {
        var c,
          f,
          d,
          _,
          g,
          v,
          k,
          F,
          M,
          w,
          C,
          O,
          T,
          V,
          ie,
          R,
          Me,
          ye,
          $,
          X,
          ue,
          y,
          N,
          W,
          G,
          j,
          B;
        for (
          l == null && (l = 1),
            a == null && (a = 1),
            ((Me = Q(t)) === "string" || Me === "number") && (t = new e(t)),
            ((ye = Q(o)) === "string" || ye === "number") && (o = new e(o)),
            $ = t.lab(),
            c = $[0],
            d = $[1],
            g = $[2],
            X = o.lab(),
            f = X[0],
            _ = X[1],
            v = X[2],
            k = we(d * d + g * g),
            F = we(_ * _ + v * v),
            N = c < 16 ? 0.511 : (0.040975 * c) / (1 + 0.01765 * c),
            ue = (0.0638 * k) / (1 + 0.0131 * k) + 0.638,
            R = k < 1e-6 ? 0 : (z(g, d) * 180) / n;
          R < 0;

        )
          R += 360;
        for (; R >= 360; ) R -= 360;
        return (
          (W =
            R >= 164 && R <= 345
              ? 0.56 + I(0.2 * re((n * (R + 168)) / 180))
              : 0.36 + I(0.4 * re((n * (R + 35)) / 180))),
          (M = k * k * k * k),
          (ie = we(M / (M + 1900))),
          (y = ue * (ie * W + 1 - ie)),
          (V = c - f),
          (T = k - F),
          (C = d - _),
          (O = g - v),
          (w = C * C + O * O - T * T),
          (G = V / (l * N)),
          (j = T / (a * ue)),
          (B = y),
          we(G * G + j * j + w / (B * B))
        );
      }),
      (e.prototype.get = function (t) {
        var o, l, a, c, f, d;
        return (
          (a = this),
          (f = t.split(".")),
          (c = f[0]),
          (o = f[1]),
          (d = a[c]()),
          o
            ? ((l = c.indexOf(o)),
              l > -1
                ? d[l]
                : console.warn("unknown channel " + o + " in mode " + c))
            : d
        );
      }),
      (e.prototype.set = function (t, o) {
        var l, a, c, f, d, _;
        if (((c = this), (d = t.split(".")), (f = d[0]), (l = d[1]), l))
          if (((_ = c[f]()), (a = f.indexOf(l)), a > -1))
            if (Q(o) === "string")
              switch (o.charAt(0)) {
                case "+":
                  _[a] += +o;
                  break;
                case "-":
                  _[a] += +o;
                  break;
                case "*":
                  _[a] *= +o.substr(1);
                  break;
                case "/":
                  _[a] /= +o.substr(1);
                  break;
                default:
                  _[a] = +o;
              }
            else _[a] = o;
          else console.warn("unknown channel " + l + " in mode " + f);
        else _ = o;
        return m(_, f).alpha(c.alpha());
      }),
      (e.prototype.clipped = function () {
        return this._rgb._clipped || !1;
      }),
      (e.prototype.alpha = function (t) {
        return arguments.length
          ? m.rgb([this._rgb[0], this._rgb[1], this._rgb[2], t])
          : this._rgb[3];
      }),
      (e.prototype.darken = function (t) {
        var o, l;
        return (
          t == null && (t = 1),
          (l = this),
          (o = l.lab()),
          (o[0] -= i.Kn * t),
          m.lab(o).alpha(l.alpha())
        );
      }),
      (e.prototype.brighten = function (t) {
        return t == null && (t = 1), this.darken(-t);
      }),
      (e.prototype.darker = e.prototype.darken),
      (e.prototype.brighter = e.prototype.brighten),
      (e.prototype.saturate = function (t) {
        var o, l;
        return (
          t == null && (t = 1),
          (l = this),
          (o = l.lch()),
          (o[1] += t * i.Kn),
          o[1] < 0 && (o[1] = 0),
          m.lch(o).alpha(l.alpha())
        );
      }),
      (e.prototype.desaturate = function (t) {
        return t == null && (t = 1), this.saturate(-t);
      }),
      (e.prototype.premultiply = function () {
        var t, o;
        return (
          (o = this.rgb()),
          (t = this.alpha()),
          m(o[0] * t, o[1] * t, o[2] * t, t)
        );
      }),
      (E = function (t, o, l) {
        if (!E[l]) throw "unknown blend mode " + l;
        return E[l](t, o);
      }),
      (D = function (t) {
        return function (o, l) {
          var a, c;
          return (a = m(l).rgb()), (c = m(o).rgb()), m(t(a, c), "rgb");
        };
      }),
      (ce = function (t) {
        return function (o, l) {
          var a, c, f;
          for (f = [], a = c = 0; c <= 3; a = ++c) f[a] = t(o[a], l[a]);
          return f;
        };
      }),
      (er = function (t, o) {
        return t;
      }),
      (Qt = function (t, o) {
        return (t * o) / 255;
      }),
      (Z = function (t, o) {
        return t > o ? o : t;
      }),
      (Zt = function (t, o) {
        return t > o ? t : o;
      }),
      (ur = function (t, o) {
        return 255 * (1 - (1 - t / 255) * (1 - o / 255));
      }),
      (rr = function (t, o) {
        return o < 128
          ? (2 * t * o) / 255
          : 255 * (1 - 2 * (1 - t / 255) * (1 - o / 255));
      }),
      (U = function (t, o) {
        return 255 * (1 - (1 - o / 255) / (t / 255));
      }),
      (Se = function (t, o) {
        return t === 255 || ((t = (255 * (o / 255)) / (1 - t / 255)), t > 255)
          ? 255
          : t;
      }),
      (E.normal = D(ce(er))),
      (E.multiply = D(ce(Qt))),
      (E.screen = D(ce(ur))),
      (E.overlay = D(ce(rr))),
      (E.darken = D(ce(Z))),
      (E.lighten = D(ce(Zt))),
      (E.dodge = D(ce(Se))),
      (E.burn = D(ce(U))),
      (m.blend = E),
      (m.analyze = function (t) {
        var o, l, a, c;
        for (
          a = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE * -1,
            sum: 0,
            values: [],
            count: 0,
          },
            l = 0,
            o = t.length;
          l < o;
          l++
        )
          (c = t[l]),
            c != null &&
              !isNaN(c) &&
              (a.values.push(c),
              (a.sum += c),
              c < a.min && (a.min = c),
              c > a.max && (a.max = c),
              (a.count += 1));
        return (
          (a.domain = [a.min, a.max]),
          (a.limits = function (f, d) {
            return m.limits(a, f, d);
          }),
          a
        );
      }),
      (m.scale = function (t, o) {
        var l,
          a,
          c,
          f,
          d,
          _,
          g,
          v,
          k,
          F,
          M,
          w,
          C,
          O,
          T,
          V,
          ie,
          R,
          Me,
          ye,
          $,
          X,
          ue;
        return (
          (F = "rgb"),
          (M = m("#ccc")),
          (T = 0),
          (_ = !1),
          (d = [0, 1]),
          (O = []),
          (C = [0, 0]),
          (l = !1),
          (c = []),
          (w = !1),
          (k = 0),
          (v = 1),
          (f = !1),
          (a = {}),
          (V = !0),
          (g = 1),
          (X = function (y) {
            var N, W, G, j, B, J;
            if (
              (y == null && (y = ["#fff", "#000"]),
              y != null &&
                Q(y) === "string" &&
                m.brewer != null &&
                (y = m.brewer[y] || m.brewer[y.toLowerCase()] || y),
              Q(y) === "array")
            ) {
              for (
                y.length === 1 && (y = [y[0], y[0]]),
                  y = y.slice(0),
                  N = G = 0,
                  j = y.length - 1;
                0 <= j ? G <= j : G >= j;
                N = 0 <= j ? ++G : --G
              )
                (W = y[N]), Q(W) === "string" && (y[N] = m(W));
              for (
                O.length = 0, N = J = 0, B = y.length - 1;
                0 <= B ? J <= B : J >= B;
                N = 0 <= B ? ++J : --J
              )
                O.push(N / (y.length - 1));
            }
            return $(), (c = y);
          }),
          (Me = function (y) {
            var N, W;
            if (l != null) {
              for (W = l.length - 1, N = 0; N < W && y >= l[N]; ) N++;
              return N - 1;
            }
            return 0;
          }),
          (ue = function (y) {
            return y;
          }),
          (ie = function (y) {
            var N, W, G, j, B;
            return (
              (B = y),
              l.length > 2 &&
                ((j = l.length - 1),
                (N = Me(y)),
                (G = l[0] + (l[1] - l[0]) * (0 + T * 0.5)),
                (W = l[j - 1] + (l[j] - l[j - 1]) * (1 - T * 0.5)),
                (B =
                  k +
                  ((l[N] + (l[N + 1] - l[N]) * 0.5 - G) / (W - G)) * (v - k))),
              B
            );
          }),
          (ye = function (y, N) {
            var W, G, j, B, J, K, le, Y;
            if ((N == null && (N = !1), isNaN(y) || y === null)) return M;
            if (
              (N
                ? (Y = y)
                : l && l.length > 2
                ? ((W = Me(y)), (Y = W / (l.length - 2)))
                : v !== k
                ? (Y = (y - k) / (v - k))
                : (Y = 1),
              N || (Y = ue(Y)),
              g !== 1 && (Y = fe(Y, g)),
              (Y = C[0] + Y * (1 - C[0] - C[1])),
              (Y = Math.min(1, Math.max(0, Y))),
              (B = Math.floor(Y * 1e4)),
              V && a[B])
            )
              G = a[B];
            else {
              if (Q(c) === "array")
                for (
                  j = J = 0, le = O.length - 1;
                  0 <= le ? J <= le : J >= le;
                  j = 0 <= le ? ++J : --J
                ) {
                  if (((K = O[j]), Y <= K)) {
                    G = c[j];
                    break;
                  }
                  if (Y >= K && j === O.length - 1) {
                    G = c[j];
                    break;
                  }
                  if (Y > K && Y < O[j + 1]) {
                    (Y = (Y - K) / (O[j + 1] - K)),
                      (G = m.interpolate(c[j], c[j + 1], Y, F));
                    break;
                  }
                }
              else Q(c) === "function" && (G = c(Y));
              V && (a[B] = G);
            }
            return G;
          }),
          ($ = function () {
            return (a = {});
          }),
          X(t),
          (R = function (y) {
            var N;
            return (N = m(ye(y))), w && N[w] ? N[w]() : N;
          }),
          (R.classes = function (y) {
            var N;
            return y != null
              ? (Q(y) === "array"
                  ? ((l = y), (d = [y[0], y[y.length - 1]]))
                  : ((N = m.analyze(d)),
                    y === 0 ? (l = [N.min, N.max]) : (l = m.limits(N, "e", y))),
                R)
              : l;
          }),
          (R.domain = function (y) {
            var N, W, G, j, B, J, K;
            if (!arguments.length) return d;
            if (
              ((k = y[0]),
              (v = y[y.length - 1]),
              (O = []),
              (G = c.length),
              y.length === G && k !== v)
            )
              for (B = 0, j = y.length; B < j; B++)
                (W = y[B]), O.push((W - k) / (v - k));
            else
              for (
                N = K = 0, J = G - 1;
                0 <= J ? K <= J : K >= J;
                N = 0 <= J ? ++K : --K
              )
                O.push(N / (G - 1));
            return (d = [k, v]), R;
          }),
          (R.mode = function (y) {
            return arguments.length ? ((F = y), $(), R) : F;
          }),
          (R.range = function (y, N) {
            return X(y, N), R;
          }),
          (R.out = function (y) {
            return (w = y), R;
          }),
          (R.spread = function (y) {
            return arguments.length ? ((T = y), R) : T;
          }),
          (R.correctLightness = function (y) {
            return (
              y == null && (y = !0),
              (f = y),
              $(),
              f
                ? (ue = function (N) {
                    var W, G, j, B, J, K, le, Y, he;
                    for (
                      W = ye(0, !0).lab()[0],
                        G = ye(1, !0).lab()[0],
                        le = W > G,
                        j = ye(N, !0).lab()[0],
                        J = W + (G - W) * N,
                        B = j - J,
                        Y = 0,
                        he = 1,
                        K = 20;
                      Math.abs(B) > 0.01 && K-- > 0;

                    )
                      (function () {
                        return (
                          le && (B *= -1),
                          B < 0
                            ? ((Y = N), (N += (he - N) * 0.5))
                            : ((he = N), (N += (Y - N) * 0.5)),
                          (j = ye(N, !0).lab()[0]),
                          (B = j - J)
                        );
                      })();
                    return N;
                  })
                : (ue = function (N) {
                    return N;
                  }),
              R
            );
          }),
          (R.padding = function (y) {
            return y != null
              ? (Q(y) === "number" && (y = [y, y]), (C = y), R)
              : C;
          }),
          (R.colors = function (y, N) {
            var W, G, j, B, J, K, le, Y, he;
            if (
              (arguments.length < 2 && (N = "hex"),
              (K = []),
              arguments.length === 0)
            )
              K = c.slice(0);
            else if (y === 1) K = [R(0.5)];
            else if (y > 1)
              (G = d[0]),
                (W = d[1] - G),
                (K = function () {
                  le = [];
                  for (
                    var pe = 0;
                    0 <= y ? pe < y : pe > y;
                    0 <= y ? pe++ : pe--
                  )
                    le.push(pe);
                  return le;
                }
                  .apply(this)
                  .map(function (pe) {
                    return R(G + (pe / (y - 1)) * W);
                  }));
            else {
              if (((t = []), (Y = []), l && l.length > 2))
                for (
                  j = he = 1, J = l.length;
                  1 <= J ? he < J : he > J;
                  j = 1 <= J ? ++he : --he
                )
                  Y.push((l[j - 1] + l[j]) * 0.5);
              else Y = d;
              K = Y.map(function (pe) {
                return R(pe);
              });
            }
            return (
              m[N] &&
                (K = K.map(function (pe) {
                  return pe[N]();
                })),
              K
            );
          }),
          (R.cache = function (y) {
            return y != null ? ((V = y), R) : V;
          }),
          (R.gamma = function (y) {
            return y != null ? ((g = y), R) : g;
          }),
          (R.nodata = function (y) {
            return y != null ? ((M = m(y)), R) : M;
          }),
          R
        );
      }),
      m.scales == null && (m.scales = {}),
      (m.scales.cool = function () {
        return m.scale([m.hsl(180, 1, 0.9), m.hsl(250, 0.7, 0.4)]);
      }),
      (m.scales.hot = function () {
        return m
          .scale(["#000", "#f00", "#ff0", "#fff"], [0, 0.25, 0.75, 1])
          .mode("rgb");
      }),
      (m.analyze = function (t, o, l) {
        var a, c, f, d, _, g, v;
        if (
          ((_ = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE * -1,
            sum: 0,
            values: [],
            count: 0,
          }),
          l == null &&
            (l = function () {
              return !0;
            }),
          (a = function (k) {
            k != null &&
              !isNaN(k) &&
              (_.values.push(k),
              (_.sum += k),
              k < _.min && (_.min = k),
              k > _.max && (_.max = k),
              (_.count += 1));
          }),
          (v = function (k, F) {
            if (l(k, F))
              return o != null && Q(o) === "function"
                ? a(o(k))
                : (o != null && Q(o) === "string") || Q(o) === "number"
                ? a(k[o])
                : a(k);
          }),
          Q(t) === "array")
        )
          for (d = 0, f = t.length; d < f; d++) (g = t[d]), v(g);
        else for (c in t) (g = t[c]), v(g, c);
        return (
          (_.domain = [_.min, _.max]),
          (_.limits = function (k, F) {
            return m.limits(_, k, F);
          }),
          _
        );
      }),
      (m.limits = function (t, o, l) {
        var a,
          c,
          f,
          d,
          _,
          g,
          v,
          k,
          F,
          M,
          w,
          C,
          O,
          T,
          V,
          ie,
          R,
          Me,
          ye,
          $,
          X,
          ue,
          y,
          N,
          W,
          G,
          j,
          B,
          J,
          K,
          le,
          Y,
          he,
          pe,
          qe,
          Be,
          Ye,
          Ve,
          Xe,
          Ue,
          pr,
          Ke,
          Ze,
          Je,
          Qe,
          et,
          tt,
          rt,
          ot,
          it,
          fo,
          Oe,
          bt,
          gr,
          Ee,
          st;
        if (
          (o == null && (o = "equal"),
          l == null && (l = 7),
          Q(t) === "array" && (t = m.analyze(t)),
          (W = t.min),
          (q = t.max),
          (fo = t.sum),
          (Ee = t.values.sort(function (Dt, jt) {
            return Dt - jt;
          })),
          l === 1)
        )
          return [W, q];
        if (
          ((y = []),
          o.substr(0, 1) === "c" && (y.push(W), y.push(q)),
          o.substr(0, 1) === "e")
        ) {
          for (
            y.push(W), $ = le = 1, qe = l - 1;
            1 <= qe ? le <= qe : le >= qe;
            $ = 1 <= qe ? ++le : --le
          )
            y.push(W + ($ / l) * (q - W));
          y.push(q);
        } else if (o.substr(0, 1) === "l") {
          if (W <= 0)
            throw "Logarithmic scales are only possible for values > 0";
          for (
            G = Math.LOG10E * Ie(W),
              N = Math.LOG10E * Ie(q),
              y.push(W),
              $ = st = 1,
              Be = l - 1;
            1 <= Be ? st <= Be : st >= Be;
            $ = 1 <= Be ? ++st : --st
          )
            y.push(fe(10, G + ($ / l) * (N - G)));
          y.push(q);
        } else if (o.substr(0, 1) === "q") {
          for (
            y.push(W), $ = a = 1, Ke = l - 1;
            1 <= Ke ? a <= Ke : a >= Ke;
            $ = 1 <= Ke ? ++a : --a
          )
            (Y = ((Ee.length - 1) * $) / l),
              (he = xe(Y)),
              he === Y
                ? y.push(Ee[he])
                : ((pe = Y - he), y.push(Ee[he] * (1 - pe) + Ee[he + 1] * pe));
          y.push(q);
        } else if (o.substr(0, 1) === "k") {
          for (
            B = Ee.length,
              T = new Array(B),
              Me = new Array(l),
              it = !0,
              J = 0,
              ie = null,
              ie = [],
              ie.push(W),
              $ = c = 1,
              Ze = l - 1;
            1 <= Ze ? c <= Ze : c >= Ze;
            $ = 1 <= Ze ? ++c : --c
          )
            ie.push(W + ($ / l) * (q - W));
          for (ie.push(q); it; ) {
            for (
              X = f = 0, Je = l - 1;
              0 <= Je ? f <= Je : f >= Je;
              X = 0 <= Je ? ++f : --f
            )
              Me[X] = 0;
            for (
              $ = d = 0, Qe = B - 1;
              0 <= Qe ? d <= Qe : d >= Qe;
              $ = 0 <= Qe ? ++d : --d
            ) {
              for (
                gr = Ee[$], j = Number.MAX_VALUE, X = _ = 0, et = l - 1;
                0 <= et ? _ <= et : _ >= et;
                X = 0 <= et ? ++_ : --_
              )
                (ye = I(ie[X] - gr)), ye < j && ((j = ye), (V = X));
              Me[V]++, (T[$] = V);
            }
            for (
              K = new Array(l), X = g = 0, tt = l - 1;
              0 <= tt ? g <= tt : g >= tt;
              X = 0 <= tt ? ++g : --g
            )
              K[X] = null;
            for (
              $ = v = 0, rt = B - 1;
              0 <= rt ? v <= rt : v >= rt;
              $ = 0 <= rt ? ++v : --v
            )
              (R = T[$]), K[R] === null ? (K[R] = Ee[$]) : (K[R] += Ee[$]);
            for (
              X = k = 0, ot = l - 1;
              0 <= ot ? k <= ot : k >= ot;
              X = 0 <= ot ? ++k : --k
            )
              K[X] *= 1 / Me[X];
            for (
              it = !1, X = F = 0, Ye = l - 1;
              0 <= Ye ? F <= Ye : F >= Ye;
              X = 0 <= Ye ? ++F : --F
            )
              if (K[X] !== ie[$]) {
                it = !0;
                break;
              }
            (ie = K), J++, J > 200 && (it = !1);
          }
          for (
            ue = {}, X = M = 0, Ve = l - 1;
            0 <= Ve ? M <= Ve : M >= Ve;
            X = 0 <= Ve ? ++M : --M
          )
            ue[X] = [];
          for (
            $ = w = 0, Xe = B - 1;
            0 <= Xe ? w <= Xe : w >= Xe;
            $ = 0 <= Xe ? ++w : --w
          )
            (R = T[$]), ue[R].push(Ee[$]);
          for (
            Oe = [], X = C = 0, Ue = l - 1;
            0 <= Ue ? C <= Ue : C >= Ue;
            X = 0 <= Ue ? ++C : --C
          )
            Oe.push(ue[X][0]), Oe.push(ue[X][ue[X].length - 1]);
          for (
            Oe = Oe.sort(function (Dt, jt) {
              return Dt - jt;
            }),
              y.push(Oe[0]),
              $ = O = 1,
              pr = Oe.length - 1;
            O <= pr;
            $ = O += 2
          )
            (bt = Oe[$]), !isNaN(bt) && y.indexOf(bt) === -1 && y.push(bt);
        }
        return y;
      }),
      (Ae = function (t, o, l) {
        var a, c, f, d;
        return (
          (a = ee(arguments)),
          (t = a[0]),
          (o = a[1]),
          (l = a[2]),
          isNaN(t) && (t = 0),
          (t /= 360),
          t < 1 / 3
            ? ((c = (1 - o) / 3),
              (d = (1 + (o * re(p * t)) / re(s - p * t)) / 3),
              (f = 1 - (c + d)))
            : t < 2 / 3
            ? ((t -= 1 / 3),
              (d = (1 - o) / 3),
              (f = (1 + (o * re(p * t)) / re(s - p * t)) / 3),
              (c = 1 - (d + f)))
            : ((t -= 2 / 3),
              (f = (1 - o) / 3),
              (c = (1 + (o * re(p * t)) / re(s - p * t)) / 3),
              (d = 1 - (f + c))),
          (d = ht(l * d * 3)),
          (f = ht(l * f * 3)),
          (c = ht(l * c * 3)),
          [d * 255, f * 255, c * 255, a.length > 3 ? a[3] : 1]
        );
      }),
      (nr = function () {
        var t, o, l, a, c, f, d, _;
        return (
          (d = ee(arguments)),
          (f = d[0]),
          (o = d[1]),
          (t = d[2]),
          (p = Math.PI * 2),
          (f /= 255),
          (o /= 255),
          (t /= 255),
          (c = Math.min(f, o, t)),
          (a = (f + o + t) / 3),
          (_ = 1 - c / a),
          _ === 0
            ? (l = 0)
            : ((l = (f - o + (f - t)) / 2),
              (l /= Math.sqrt((f - o) * (f - o) + (f - t) * (o - t))),
              (l = Math.acos(l)),
              t > o && (l = p - l),
              (l /= p)),
          [l * 360, _, a]
        );
      }),
      (m.hsi = function () {
        return (function (t, o, l) {
          l.prototype = t.prototype;
          var a = new l(),
            c = t.apply(a, o);
          return Object(c) === c ? c : a;
        })(e, Le.call(arguments).concat(["hsi"]), function () {});
      }),
      (b.hsi = Ae),
      (e.prototype.hsi = function () {
        return nr(this._rgb);
      }),
      (ke = function (t, o, l, a) {
        var c, f, d, _, g, v, k, F, M, w, C, O, T;
        return (
          a === "hsl"
            ? ((O = t.hsl()), (T = o.hsl()))
            : a === "hsv"
            ? ((O = t.hsv()), (T = o.hsv()))
            : a === "hcg"
            ? ((O = t.hcg()), (T = o.hcg()))
            : a === "hsi"
            ? ((O = t.hsi()), (T = o.hsi()))
            : (a === "lch" || a === "hcl") &&
              ((a = "hcl"), (O = t.hcl()), (T = o.hcl())),
          a.substr(0, 1) === "h" &&
            ((d = O[0]),
            (w = O[1]),
            (v = O[2]),
            (_ = T[0]),
            (C = T[1]),
            (k = T[2])),
          !isNaN(d) && !isNaN(_)
            ? (_ > d && _ - d > 180
                ? (c = _ - (d + 360))
                : _ < d && d - _ > 180
                ? (c = _ + 360 - d)
                : (c = _ - d),
              (f = d + l * c))
            : isNaN(d)
            ? isNaN(_)
              ? (f = Number.NaN)
              : ((f = _), (v === 1 || v === 0) && a !== "hsv" && (M = C))
            : ((f = d), (k === 1 || k === 0) && a !== "hsv" && (M = w)),
          M == null && (M = w + l * (C - w)),
          (g = v + l * (k - v)),
          (F = m[a](f, M, g))
        );
      }),
      (S = S.concat(
        (function () {
          var t, o, l, a;
          for (
            l = ["hsv", "hsl", "hsi", "hcl", "lch", "hcg"],
              a = [],
              o = 0,
              t = l.length;
            o < t;
            o++
          )
            (Jt = l[o]), a.push([Jt, ke]);
          return a;
        })(),
      )),
      (ve = function (t, o, l, a) {
        var c, f;
        return (c = t.num()), (f = o.num()), m.num(c + (f - c) * l, "num");
      }),
      S.push(["num", ve]),
      (De = function (t, o, l, a) {
        var c, f, d;
        return (
          (f = t.lab()),
          (d = o.lab()),
          (c = new e(
            f[0] + l * (d[0] - f[0]),
            f[1] + l * (d[1] - f[1]),
            f[2] + l * (d[2] - f[2]),
            a,
          ))
        );
      }),
      S.push(["lab", De]);
  }).call(lt);
});
var Te = new WeakMap(),
  br = !0,
  yo = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
  vo = yo ? 5e6 : 1e7,
  vt = 0,
  je = 0,
  yr = performance.now();
function wo() {
  let e = performance.now(),
    r = e - yr,
    i = vt,
    n = (je * 1e3) / r,
    s = 1e3 / i,
    h = je;
  return (
    (vt = 0),
    (je = 0),
    (yr = e),
    { avg: i, real_fps: n, virtual_fps: s, num_frames: h, elapsed: r }
  );
}
function xo(e) {
  (vt = (vt * je + e) / (je + 1)), (je += 1);
}
var xr = (e, ...r) =>
    e
      .map((i, n) => [i, r[n]])
      .flat()
      .filter((i) => !!i)
      .join(""),
  ko = () => {
    let e,
      r = new Promise((i) => {
        e = i;
      });
    return (r.resolve = e), r;
  },
  Pe = new Map();
async function Lo(e) {
  return await new Promise(requestAnimationFrame), await Pe.get(e);
}
async function kr(e, r) {
  if (Pe.has(e) && (await Pe.get(e), Pe.has(e))) {
    await Pe.get(e);
    return;
  }
  Pe.set(e, ko());
  try {
    return await r();
  } finally {
    let i = Pe.get(e);
    Pe.delete(e), i.resolve();
  }
}
var Mo =
    ":host{position:absolute;top:0px;left:0px;right:0px;bottom:0px;overflow:scroll;overflow-anchor:none;overscroll-behavior:none;-webkit-overflow-scrolling:touch;}div.rt-virtual-panel{position:absolute;top:0;left:0;right:0;pointer-events:none;}div.rt-scroll-table-clip{position:sticky;contain:strict;overflow-anchor:none;width:100%;height:100%;}div.rt-tree-container{display:flex;align-items:center;height:100%;}slot{position:absolute;overflow:hidden;overflow-anchor:none;}",
  zo =
    ":host ::slotted(table){--regular-table--transform-x:0px;--regular-table--transform-y:0px;--regular-table--clip-x:0px;--regular-table--clip-y:0px;}",
  Eo = class extends HTMLElement {
    create_shadow_dom() {
      this.attachShadow({ mode: "open" });
      let e = "<slot></slot>";
      this.shadowRoot.innerHTML = xr`
            <style>
                ${Mo}
            </style>
            <style>
                ${zo}
            </style>
            <div class="rt-virtual-panel"></div>
            <div class="rt-scroll-table-clip">
                ${e}
            </div>
        `;
      let [, r, i, n] = this.shadowRoot.children;
      (this._sub_cell_style = r),
        (this._table_clip = n),
        (this._virtual_panel = i),
        this._setup_virtual_scroll();
    }
    _setup_virtual_scroll() {
      this._table_clip &&
        (this._virtual_mode === "both" || this._virtual_mode === "vertical"
          ? (this._table_clip.style.top = "0px")
          : this._table_clip.style.removeProperty("top"),
        this._virtual_mode === "both" || this._virtual_mode === "horizontal"
          ? (this._table_clip.style.left = "0px")
          : this._table_clip.style.removeProperty("left"),
        this._virtual_mode !== "both"
          ? (this._table_clip.style.contain = "none")
          : this._table_clip.style.removeProperty("contain"));
    }
    _calculate_viewport(e, r) {
      let { start_row: i, end_row: n } = this._calculate_row_range(e),
        { start_col: s, end_col: h } = this._calculate_column_range(r);
      return (
        (this._nrows = e),
        { start_col: s, end_col: h, start_row: i, end_row: n }
      );
    }
    _calculate_row_range(e) {
      let { height: r } = this._container_size,
        i = this._column_sizes.row_height || 19,
        n = this._view_cache.config.column_pivots.length,
        s = Math.max(1, this._virtual_panel.offsetHeight - this.clientHeight),
        h = Math.max(Math.ceil(this.scrollTop), 0) / s,
        p = r / i - n,
        u = Math.max(0, Math.ceil((e || 0) - p)) * h,
        x = Math.max(0, Math.min(u + p, e));
      return { start_row: u, end_row: x };
    }
    _calc_start_column() {
      let e = this._view_cache.config.row_pivots.length,
        r = 0,
        i = 0,
        n = 0;
      for (; i < this.scrollLeft; ) {
        let s = this._column_sizes.indices[r + e];
        (n = this.scrollLeft - i), (r += 1), (i += s !== void 0 ? s : 60);
      }
      return (
        (r += n / (this._column_sizes.indices[r + e - 1] || 60)),
        Math.max(0, r - 1)
      );
    }
    _calculate_column_range(e) {
      if (this._virtual_mode === "none" || this._virtual_mode === "vertical")
        return { start_col: 0, end_col: 1 / 0 };
      {
        let r = this._calc_start_column(),
          i =
            this.table_model.num_columns() ||
            Math.min(e, Math.ceil(this._container_size.width / 60)),
          n = r + i + 1;
        return { start_col: r, end_col: n };
      }
    }
    _max_scroll_column(e) {
      let r = 0;
      if (this._view_cache.config.row_pivots.length > 0)
        for (let s of this._column_sizes.indices.slice(
          0,
          this._view_cache.config.row_pivots.length,
        ))
          r += s;
      let i = this._view_cache.config.row_pivots.length,
        n = e;
      for (; r < this._container_size.width && n >= 0; )
        n--, (r += this._column_sizes.indices[n + i] || 60);
      return Math.min(e - 1, n + 1);
    }
    _validate_viewport({ start_col: e, end_col: r, start_row: i, end_row: n }) {
      (i = Math.floor(i)),
        (n = Math.ceil(n)),
        (e = Math.floor(e)),
        (r = Math.ceil(r));
      let s = this._start_col !== e,
        h = this._start_row !== i || this._end_row !== n || this._end_col !== r;
      return (
        (this._start_col = e),
        (this._end_col = r),
        (this._start_row = i),
        (this._end_row = n),
        { invalid_column: s, invalid_row: h }
      );
    }
    _calc_scrollable_column_width(e) {
      let r = this._view_cache.config.row_pivots.length,
        i = this._max_scroll_column(e),
        n = r,
        s = 0;
      for (; n < i + r; ) (s += this._column_sizes.indices[n] || 60), n++;
      return s;
    }
    _update_virtual_panel_width(e, r) {
      if (e)
        if (this._virtual_mode === "vertical" || this._virtual_mode === "none")
          this._virtual_panel.style.width =
            this._column_sizes.indices.reduce((i, n) => i + n, 0) + "px";
        else {
          let i = this._calc_scrollable_column_width(r);
          if (i !== 0) {
            let n = this._container_size.width + i + 2;
            this._virtual_panel.style.width = n + "px";
          } else this._virtual_panel.style.width = "1px";
        }
    }
    _update_virtual_panel_height(e) {
      let { row_height: r = 19 } = this._column_sizes,
        i = this._view_cache.config.column_pivots.length * r,
        n;
      if (this._virtual_mode === "horizontal" || this._virtual_mode === "none")
        n = e * r + i;
      else {
        let s = this.clientHeight / (this._table_clip.offsetHeight - i);
        n = Math.min(vo, e * r * s);
      }
      this._virtual_panel.style.height = `${n}px`;
    }
    async draw(e = {}) {
      return typeof e.throttle < "u" && !e.throttle
        ? await vr.call(this, [e])
        : await kr(this, () => vr.call(this, [e]));
    }
    async _draw_flush() {
      await Lo(this);
    }
    update_sub_cell_offset(e) {
      let r = this._column_sizes.row_height * (e.start_row % 1) || 0,
        i =
          this._column_sizes.indices[
            (this.table_model._row_headers_length || 0) +
              Math.floor(e.start_col)
          ] *
            (e.start_col % 1) || 0,
        n = this._sub_cell_style.sheet?.cssRules[0].style;
      n &&
        (n.setProperty("--regular-table--clip-x", `${i}px`),
        n.setProperty("--regular-table--clip-y", `${r}px`),
        n.setProperty("--regular-table--transform-x", `-${i}px`),
        n.setProperty("--regular-table--transform-y", `-${r}px`));
    }
  };
async function vr(e) {
  let r = br && performance.now(),
    { invalid_viewport: i = !0, preserve_width: n = !1 } = e,
    {
      num_columns: s,
      num_rows: h,
      row_height: p,
    } = await this._view_cache.view(0, 0, 0, 0);
  (this._container_size = {
    width:
      this._virtual_mode === "none" || this._virtual_mode === "vertical"
        ? 1 / 0
        : this._table_clip.clientWidth,
    height:
      this._virtual_mode === "none" || this._virtual_mode === "horizontal"
        ? 1 / 0
        : this._table_clip.clientHeight,
  }),
    this._update_virtual_panel_height(h),
    n || this._update_virtual_panel_width(i, s);
  let u = this._calculate_viewport(h, s),
    { invalid_row: x, invalid_column: L } = this._validate_viewport(u);
  if (this._invalid_schema || x || L || i) {
    let b = [],
      S = !0;
    for await (let I of this.table_model.draw(
      this._container_size,
      this._view_cache,
      this._selected_id,
      n,
      u,
      s,
    )) {
      I !== void 0 && (b = b.concat(I)),
        S && (this.update_sub_cell_offset(u), (S = !1)),
        (this._is_styling = !0);
      let z = this._style_callbacks;
      for (let P of z) await P({ detail: this });
      if (((this._is_styling = !1), !this._invalidated && I !== void 0)) break;
      this._invalidated = !1;
    }
    this.table_model.autosize_cells(b, p),
      this.table_model.header.reset_header_cache(),
      n || this._update_virtual_panel_width(this._invalid_schema || L, s),
      (this._invalid_schema = !1);
  } else this.update_sub_cell_offset(u);
  br && xo(performance.now() - r);
}
var So = !1,
  Ao = class extends Eo {
    register_listeners() {
      this.addEventListener("mousedown", this._on_click_or_dblclick.bind(this)),
        this.addEventListener("scroll", this._on_scroll.bind(this), {
          passive: !0,
        }),
        this._register_glitch_scroll_listeners();
    }
    async _on_scroll(e) {
      e.stopPropagation(),
        await this.draw({ invalid_viewport: !1 }),
        this.dispatchEvent(new CustomEvent("regular-table-scroll"));
    }
    _register_glitch_scroll_listeners() {
      this.addEventListener("mousewheel", this._on_mousewheel.bind(this)),
        So &&
          (this.addEventListener("touchmove", this._on_touchmove.bind(this)),
          this.addEventListener("touchstart", this._on_touchstart.bind(this), {
            passive: !0,
          }));
    }
    _on_mousewheel(e) {
      if (!window.safari) return;
      let {
        clientWidth: r,
        clientHeight: i,
        scrollTop: n,
        scrollLeft: s,
      } = this;
      e.preventDefault(), (e.returnValue = !1);
      let h = Math.max(1, this._virtual_panel.offsetHeight - i),
        p = Math.max(1, this._virtual_panel.offsetWidth - r);
      (this.scrollTop = Math.max(0, Math.min(h, n + e.deltaY))),
        (this.scrollLeft = Math.max(0, Math.min(p, s + e.deltaX))),
        this._on_scroll(e);
    }
    _on_touchmove(e) {
      e.stopPropagation(), e.preventDefault(), (e.returnValue = !1);
      let { clientWidth: r, clientHeight: i } = this,
        n = Math.max(1, this._virtual_panel.offsetHeight - i),
        s = Math.max(1, this._virtual_panel.offsetWidth - r);
      (this.scrollTop = Math.min(
        n,
        this._memo_scroll_top + (this._memo_touch_startY - e.touches[0].pageY),
      )),
        (this.scrollLeft = Math.min(
          s,
          this._memo_scroll_left +
            (this._memo_touch_startX - e.touches[0].pageX),
        )),
        this._on_scroll(e);
    }
    _on_touchstart(e) {
      (this._memo_touch_startY = e.touches[0].pageY),
        (this._memo_touch_startX = e.touches[0].pageX),
        (this._memo_scroll_top = this.scrollTop),
        (this._memo_scroll_left = this.scrollLeft);
    }
    async _on_dblclick(e) {
      let r = e.target;
      for (; r.tagName !== "TD" && r.tagName !== "TH"; )
        if (((r = r.parentElement), !this.contains(r))) return;
      let i = e.target.classList.contains("rt-column-resize"),
        n = Te.get(r);
      if (i) {
        e.stopImmediatePropagation(),
          (r.style.minWidth = ""),
          (r.style.maxWidth = ""),
          e.shiftKey
            ? ((this._column_sizes.override = []),
              (this._column_sizes.auto = []),
              (this._column_sizes.indices = []))
            : ((this._column_sizes.override[n.size_key] = void 0),
              (this._column_sizes.auto[n.size_key] = void 0),
              (this._column_sizes.indices[n.size_key] = void 0));
        for (let s of e.shiftKey
          ? [
              this.table_model.header.cells[
                this.table_model.header.cells.length - 1
              ],
              ...this.table_model.body.cells,
            ]
          : this.table_model.body.cells)
          for (let h of e.shiftKey ? s : [s[n._virtual_x]])
            h &&
              ((h.style.minWidth = ""),
              (h.style.maxWidth = ""),
              h.classList.remove("rt-cell-clip"));
        await this.draw();
      }
    }
    async _on_click(e) {
      if (e.button !== 0) return;
      let r = e.target;
      for (; r.tagName !== "TD" && r.tagName !== "TH"; )
        if (((r = r.parentElement), !this.contains(r))) return;
      let i = e.target.classList.contains("rt-column-resize"),
        n = Te.get(r);
      i && (this._on_resize_column(e, r, n), e.stopImmediatePropagation());
    }
    async _on_click_or_dblclick(e) {
      let r = performance.now();
      this._last_clicked_time && r - this._last_clicked_time < 500
        ? ((this._last_clicked_time = r), await this._on_dblclick(e))
        : ((this._last_clicked_time = r), await this._on_click(e));
    }
    _on_resize_column(e, r, i) {
      let { _virtual_x: n, size_key: s } = i,
        h = e.pageX,
        p = n + r.colSpan - 1,
        u = this.table_model.header.get_column_header(p),
        x = this._column_sizes.indices[s],
        L = (S) =>
          kr(
            this,
            async () => await this._on_resize_column_move(S, u, h, x, s, p),
          ),
        b = () => {
          document.removeEventListener("mousemove", L),
            document.removeEventListener("mouseup", b);
          let S = this._column_sizes.override[s],
            I = this._column_sizes.indices[s] !== S;
          (this._column_sizes.indices[s] = S), I && this.draw();
        };
      document.addEventListener("mousemove", L),
        document.addEventListener("mouseup", b);
    }
    async _on_resize_column_move(e, r, i, n, s, h) {
      await new Promise(requestAnimationFrame);
      let p = e.pageX - i,
        u = Math.max(1, n + p);
      if (((this._column_sizes.override[s] = u), p < 0))
        await this.draw({ preserve_width: !0, throttle: !1 });
      else {
        (r.style.minWidth = u + "px"), (r.style.maxWidth = u + "px");
        let x = this._column_sizes.auto[s];
        for (let L of this.table_model.body.cells) {
          let b = L[h];
          b &&
            ((b.style.maxWidth = b.style.minWidth = u + "px"),
            b.classList.toggle("rt-cell-clip", x > u));
        }
      }
    }
  },
  Co = class {
    constructor(e) {
      (this._name = e), (this._elements = []), (this._index = 0);
    }
    reset() {
      this._index = 0;
    }
    get() {
      this._elements[this._index] ||
        (this._elements[this._index] = document.createElement(this._name));
      let e = this._elements[this._index];
      return (this._index += 1), e;
    }
  },
  Lr = class {
    constructor(e, r, i) {
      (this._column_sizes = e),
        (this._container = r),
        (this._span_factory = new Co("span")),
        (this.table = i),
        (this.cells = []),
        (this.rows = []);
    }
    num_columns() {
      return this._get_row(Math.max(0, this.rows.length - 1)).row_container
        .length;
    }
    num_rows() {
      return this.cells.length;
    }
    _set_metadata(e, r) {
      Te.set(e, r);
    }
    _get_or_create_metadata(e) {
      if (e === void 0) return {};
      if (Te.has(e)) return Te.get(e);
      {
        let r = {};
        return Te.set(e, r), r;
      }
    }
    _replace_cell(e, r) {
      let { tr: i, row_container: n } = this._get_row(e),
        s = n[r];
      return s && (i.removeChild(s), n.splice(r, 1, void 0)), s;
    }
    _fetch_cell(e, r) {
      if (e < 0 || r < 0) return;
      let { row_container: i } = this._get_row(e);
      return i[r];
    }
    _get_cell(e = "TD", r, i) {
      let { tr: n, row_container: s } = this._get_row(r),
        h = s[i];
      if (
        (h ||
          (i < s.length
            ? ((h = s[i] = document.createElement(e)),
              n.insertBefore(
                h,
                s.slice(i + 1).find((p) => p),
              ))
            : ((h = s[i] = document.createElement(e)), n.appendChild(h))),
        h.tagName !== e)
      ) {
        let p = document.createElement(e);
        n.replaceChild(p, h), this.cells[r].splice(i, 1, p), (h = p);
      }
      return h;
    }
    _get_row(e) {
      let r = this.rows[e];
      r ||
        ((r = this.rows[e] = document.createElement("tr")),
        this.table.appendChild(r));
      let i = this.cells[e];
      return i || (i = this.cells[e] = []), { tr: r, row_container: i };
    }
    _clean_columns(e) {
      for (let r = 0; r < this.rows.length; r++) {
        let i = this.rows[r],
          n = this.cells[r];
        this.cells[r] = n.slice(0, e[r] || e);
        let s = this.cells[r].filter((h) => h !== void 0).length;
        for (; i.children[s]; ) i.removeChild(i.children[s]);
      }
    }
    _clean_rows(e) {
      for (; this.table.children[e]; )
        this.table.removeChild(this.table.children[e]);
      (this.rows = this.rows.slice(0, e)),
        (this.cells = this.cells.slice(0, e));
    }
  },
  No = class extends Lr {
    constructor(...e) {
      super(...e), (this._group_header_cache = []), (this._offset_cache = []);
    }
    _draw_group_th(e, r, i) {
      let n = this._get_cell("TH", r, e[r] || 0);
      if (
        ((e[r] += 1),
        n.removeAttribute("colspan"),
        (n.style.minWidth = "0"),
        (n.textContent = ""),
        i instanceof HTMLElement)
      )
        n.appendChild(i);
      else {
        let h = this._span_factory.get("span");
        (h.textContent = i), n.appendChild(h);
      }
      let s = this._span_factory.get("span");
      return (s.className = "rt-column-resize"), n.appendChild(s), n;
    }
    _draw_group(e, r, i) {
      let n = this._get_or_create_metadata(i);
      return (n.column_header = e), (n.value = r), (n.value = r), n;
    }
    _draw_th(e, r, i, n, s) {
      let h = this._get_or_create_metadata(i);
      if (
        ((h.column_header = e),
        (h.value = r),
        (h.size_key = s.length ? s[0] : s),
        !(s.length > 1))
      ) {
        let p = this._column_sizes.override[h.size_key],
          u = this._column_sizes.auto[h.size_key];
        p
          ? (i.classList.toggle("rt-cell-clip", u > p),
            (i.style.minWidth = p + "px"),
            (i.style.maxWidth = p + "px"))
          : u
          ? (i.classList.remove("rt-cell-clip"),
            (i.style.maxWidth = ""),
            (i.style.minWidth = u + "px"))
          : ((i.style.maxWidth = ""), (i.style.maxWidth = ""));
      }
      return h;
    }
    get_column_header(e) {
      return this._get_cell("TH", this.num_rows() - 1, e);
    }
    draw(e, r, i, n, s, h, p, u) {
      let x = r?.length;
      if (x === 0) return;
      let L, b, S, I;
      u = typeof u > "u" ? x - 1 : u;
      for (let z = 0; z < x; z++) {
        if (
          ((S = r[z] ? r[z] : ""),
          (this._offset_cache[z] = this._offset_cache[z] || 0),
          z < u)
        )
          this._group_header_cache?.[z]?.[0]?.value === S
            ? ((L = this._group_header_cache[z][1]),
              (this._group_header_cache[z][2] += 1),
              i === 1 && (this._group_header_cache[z][0].row_header_x = s),
              L.setAttribute("colspan", this._group_header_cache[z][2]))
            : ((L = this._draw_group_th(this._offset_cache, z, S)),
              (b = this._draw_group(r, S, L)),
              (this._group_header_cache[z] = [b, L, 1]));
        else {
          (L = this._draw_group_th(this._offset_cache, z, S)),
            (b = this._draw_th(e || r, S, L, n, s)),
            typeof I > "u" && (I = { th: L, metadata: b });
          for (let [P] of this._group_header_cache) P.size_key = b.size_key;
          L.removeAttribute("colspan");
        }
        this._get_row(z).tr.classList.toggle("rt-autosize", z === u),
          L.classList.toggle("rt-group-corner", n === void 0),
          b &&
            ((b.x = typeof n > "u" ? n : Math.floor(n)),
            (b.column_header_y = z),
            (b.x0 = Math.floor(h)),
            (b._virtual_x = p),
            i === 1 && (b.row_header_x = s));
      }
      return (
        this._clean_rows(this._offset_cache.length),
        (I = I || { th: L, metadata: b }),
        I
      );
    }
    clean() {
      this._clean_columns(this._offset_cache);
    }
    reset_header_cache() {
      (this._offset_cache = []), (this._group_header_cache = []);
    }
  },
  Oo = class extends Lr {
    _draw_td(e, r, i, n, { column_name: s }, { ridx_offset: h }, p) {
      let u = this._get_cell(e, r, n),
        x = this._get_or_create_metadata(u);
      (x.y = r + Math.floor(h)),
        (x.size_key = p),
        e === "TD" && (x.column_header = s);
      let L = this._column_sizes.override[x.size_key];
      if (L) {
        let b = this._column_sizes.auto[x.size_key];
        u.classList.toggle("rt-cell-clip", b > L),
          (u.style.minWidth = L + "px"),
          (u.style.maxWidth = L + "px");
      } else
        u.classList.remove("rt-cell-clip"),
          (u.style.minWidth = ""),
          (u.style.maxWidth = "");
      return (
        x.value !== i &&
          (i instanceof HTMLElement
            ? ((u.textContent = ""), u.appendChild(i))
            : (u.textContent = i)),
        (x.value = i),
        { td: u, metadata: x }
      );
    }
    draw(e, r, i, n = !1, s, h, p) {
      let {
          cidx: u,
          column_data: x,
          row_headers: L,
          column_data_listener_metadata: b,
        } = r,
        { row_height: S } = i,
        I,
        z = [],
        P = [],
        E = 0,
        D = [];
      for (let H = 0; H < (n ? i.row_headers_length : 1); H++) {
        E = 0;
        for (let U of x) {
          let m = L?.[E],
            A;
          if (n) {
            let te = U[H],
              oe = this._fetch_cell(E - (z[H] || 1), u + H),
              re = this._get_or_create_metadata(oe),
              ae = this._fetch_cell(E, u + H - (D[E] || 1)),
              Z = this._get_or_create_metadata(ae);
            ae &&
            (Z.value === te || te === void 0) &&
            !ae.hasAttribute("rowspan")
              ? ((D[E] = D[E] ? D[E] + 1 : 2),
                ae.setAttribute("colspan", D[E]),
                this._replace_cell(E, u + H))
              : oe && re.value === te && !oe.hasAttribute("colspan")
              ? ((z[H] = z[H] ? z[H] + 1 : 2),
                oe.setAttribute("rowspan", z[H]),
                this._replace_cell(E, u + H))
              : ((A = this._draw_td("TH", E, te, u + H, r, i, H)),
                (A.td.style.display = ""),
                A.td.removeAttribute("rowspan"),
                A.td.removeAttribute("colspan"),
                (A.metadata.row_header = U),
                (A.metadata.row_header_x = H),
                (A.metadata.y0 = Math.floor(i.ridx_offset)),
                (A.metadata.y1 = Math.ceil(i.y1)),
                (A.metadata._virtual_x = H),
                typeof h < "u" && (A.metadata.x0 = Math.floor(h)),
                (z[H] = 1),
                (D[E] = 1),
                (P[H] = A));
          } else
            (A = this._draw_td("TD", E, U, u, r, i, p)),
              b && (A.metadata.user = b[E]),
              (A.metadata.x = typeof s > "u" ? s : Math.floor(s)),
              (A.metadata.x1 = Math.ceil(i.x1)),
              (A.metadata.row_header = m || []),
              (A.metadata.y0 = Math.floor(i.ridx_offset)),
              (A.metadata.y1 = Math.ceil(i.y1)),
              (A.metadata.dx = Math.floor(s - h)),
              (A.metadata.dy = A.metadata.y - Math.floor(A.metadata.y0)),
              (A.metadata._virtual_x = u),
              typeof h < "u" && (A.metadata.x0 = Math.floor(h)),
              (P[0] = A);
          if (
            (E++,
            (I = A ? A.metadata : I),
            (S = S || A?.td.offsetHeight),
            E * S > e)
          )
            break;
        }
      }
      return (
        this._clean_rows(E), { tds: P, ridx: E, metadata: I, row_height: S }
      );
    }
    clean({ ridx: e, cidx: r }) {
      this._clean_rows(e), this._clean_columns(r);
    }
  },
  wr = class {
    constructor(e, r, i) {
      this.clear(i);
      let [n] = i.children,
        [s, h] = n.children;
      (this.table = n),
        (this._column_sizes = r),
        (this.header = new No(r, e, s)),
        (this.body = new Oo(r, e, h)),
        (this.fragment = document.createDocumentFragment());
    }
    num_columns() {
      return this.header.num_columns();
    }
    clear(e) {
      e.innerHTML = xr`
            <table cellspacing="0">
                <thead></thead>
                <tbody></tbody>
            </table>
        `;
    }
    autosize_cells(e, r) {
      for (; e.length > 0; ) {
        let [i, n] = e.pop(),
          s = i.getBoundingClientRect();
        (this._column_sizes.row_height =
          r ||
          Math.max(
            10,
            Math.min(this._column_sizes.row_height || s.height, s.height),
          )),
          (this._column_sizes.indices[n.size_key] = s.width);
        let h = this._column_sizes.override[n.size_key] !== void 0;
        s.width && !h && (this._column_sizes.auto[n.size_key] = s.width),
          i.style.minWidth === "0px" && (i.style.minWidth = `${s.width}px`);
      }
    }
    async *draw(e, r, i, n, s, h) {
      let { width: p, height: u } = e,
        { view: x, config: L } = r,
        {
          data: b,
          row_headers: S,
          column_headers: I,
          metadata: z,
          column_header_merge_depth: P,
        } = await x(
          Math.floor(s.start_col),
          Math.floor(s.start_row),
          Math.ceil(s.end_col),
          Math.ceil(s.end_row),
        ),
        {
          start_row: E = 0,
          start_col: D = 0,
          end_col: H = 0,
          end_row: U = 0,
        } = s;
      S &&
        ((this._row_headers_length = S.reduce(
          (Z, Se) => Math.max(Z, Se.length),
          0,
        )),
        (S = S.map((Z) => ((Z.length = this._row_headers_length), Z)))),
        (r.config.column_pivots = Array.from(
          Array(I?.[0]?.length || 0).keys(),
        )),
        (r.config.row_pivots = Array.from(Array(S?.[0]?.length || 0).keys()));
      let m =
          this._column_sizes.indices[
            (this._row_headers_length || 0) + Math.floor(s.start_col)
          ] || 0,
        A = {
          viewport_width: 0,
          selected_id: i,
          ridx_offset: E,
          sub_cell_offset: m,
          x0: D,
          x1: H,
          y1: U,
          row_height: this._column_sizes.row_height,
          row_headers_length: this._row_headers_length,
        },
        te,
        oe = 0,
        re = [],
        ae = !0;
      if (S?.length > 0) {
        let Z = L.row_pivots.join(","),
          Se = {
            column_name: Z,
            cidx: 0,
            column_data: S,
            row_headers: S,
            first_col: ae,
          },
          ce = oe + Math.floor(D);
        te = this.body.draw(u, Se, { ...A, x0: 0 }, !0, void 0, void 0, ce);
        let xe = [];
        for (let de = 0; de < r.config.row_pivots.length; de++) {
          let _e = this.header.draw(
            Z,
            Array(r.config.column_pivots.length).fill(""),
            1,
            void 0,
            de,
            D,
            de,
            P,
          );
          _e && xe.push(_e);
        }
        if (
          ((ae = !1),
          (A.viewport_width += xe.reduce(
            (de, { th: _e }, Ae) =>
              de + (this._column_sizes.indices[Ae] || _e.offsetWidth),
            0,
          )),
          (A.row_height = A.row_height || te.row_height),
          (oe = S[0].length),
          !n)
        )
          for (let de = 0; de < r.config.row_pivots.length; de++) {
            let { td: _e, metadata: Ae } = te.tds[de] || {},
              { th: Ce, metadata: ze } = xe[de] || {};
            (_e || Ce) && re.push([Ce || _e, ze || Ae]);
          }
      }
      try {
        let Z = 0,
          Se = h - s.start_col;
        for (; Z < Se; ) {
          if (!b[Z]) {
            let ge = Math.max(s.end_col, 0);
            s.start_col = ge;
            let ke = 0,
              De = 0;
            for (
              ;
              this._column_sizes.indices.length > oe + D + ke + 1 &&
              De + A.viewport_width < p;

            )
              ke++, (De += this._column_sizes.indices[oe + D + ke]);
            if (De + A.viewport_width < p) {
              let me = Math.min(h, ge + 5);
              s.end_col = Math.max(1, Math.min(h, me));
            } else s.end_col = Math.max(1, Math.min(h, ge + ke));
            let ft = x(
              Math.floor(s.start_col),
              Math.floor(s.start_row),
              Math.ceil(s.end_col),
              Math.ceil(s.end_row),
            );
            yield void 0;
            let ve = await ft;
            if (
              (typeof ve.column_header_merge_depth < "u" &&
                (P = ve.column_header_merge_depth),
              ve.data.length === 0)
            ) {
              yield re;
              return;
            }
            s.end_col = s.start_col + ve.data.length;
            for (let me = 0; me < ve.data.length; me++)
              (b[Z + me] = ve.data[me]),
                ve.metadata && (z[Z + me] = ve.metadata[me]),
                I && (I[Z + me] = ve.column_headers?.[me]);
          }
          let ce = I?.[Z] || "",
            xe = b[Z],
            de = z?.[Z],
            _e = {
              column_name: ce,
              cidx: oe,
              column_data: xe,
              column_data_listener_metadata: de,
              row_headers: S,
              first_col: ae,
            },
            Ae = Z + D,
            Ce = oe + Math.floor(D),
            ze = this.header.draw(void 0, ce, void 0, Ae, Ce, D, oe, P);
          if (((te = this.body.draw(u, _e, A, !1, Ae, D, Ce)), (ae = !1), !n))
            for (let { td: ge, metadata: ke } of te.tds)
              re.push([ze?.th || ge, ze?.metadata || ke]);
          let $e = this._column_sizes.indices[oe + Math.floor(D)];
          if (
            ($e
              ? (A.viewport_width += $e)
              : (A.viewport_width +=
                  ze?.th?.offsetWidth ||
                  te.tds.reduce((ge, ke) => ge + ke.td?.offsetWidth, 0)),
            (A.row_height = A.row_height || te.row_height),
            oe++,
            Z++,
            A.viewport_width - A.sub_cell_offset > p)
          ) {
            this.body.clean({ ridx: te?.ridx || 0, cidx: oe }),
              this.header.clean(),
              yield re,
              (A.viewport_width = 0);
            for (let [ge] of re) A.viewport_width += ge.offsetWidth;
            if (A.viewport_width - A.sub_cell_offset > p) return;
          }
        }
        this.body.clean({ ridx: te?.ridx || 0, cidx: oe }),
          this.header.clean(),
          yield re;
      } finally {
        this.body.clean({ ridx: te?.ridx || 0, cidx: oe }),
          this.header.clean(),
          this.body._span_factory.reset(),
          this.header._span_factory.reset();
      }
    }
  },
  Po = ["both", "horizontal", "vertical", "none"],
  Fo = class extends Ao {
    constructor() {
      super(),
        (this._column_sizes = { auto: [], override: [], indices: [] }),
        (this._style_callbacks = []),
        (this._initialized = !1);
    }
    connectedCallback() {
      this._initialized ||
        (this.create_shadow_dom(),
        this.register_listeners(),
        this.setAttribute("tabindex", "0"),
        (this._initialized = !0),
        (this.table_model = new wr(
          this._table_clip,
          this._column_sizes,
          this,
        )));
    }
    _reset_viewport() {
      (this._start_row = void 0),
        (this._end_row = void 0),
        (this._start_col = void 0),
        (this._end_col = void 0);
    }
    _reset_scroll() {
      (this._column_sizes.indices = []),
        (this.scrollTop = 0),
        (this.scrollLeft = 0),
        this._reset_viewport();
    }
    _resetAutoSize() {
      (this._column_sizes.auto = []),
        (this._column_sizes.override = []),
        (this._column_sizes.indices = []);
      for (let e = 0; e < this.table_model.header.num_columns(); e++) {
        let r = this.table_model.header.get_column_header(e);
        (r.style.minWidth = ""), (r.style.maxWidth = "");
      }
    }
    clear() {
      this.table_model = new wr(this._table_clip, this._column_sizes, this);
    }
    addStyleListener(e) {
      this._style_callbacks = this._style_callbacks.concat(e);
      let r = !0;
      return () => {
        if (!r) return;
        r = !1;
        let i = (this._style_callbacks = this._style_callbacks.slice()),
          n = i.indexOf(e);
        i.splice(n, 1);
      };
    }
    invalidate() {
      if (!this._is_styling)
        throw new Error(
          "Cannot call `invalidate()` outside of a `StyleListener`",
        );
      this._invalidated = !0;
    }
    getMeta(e) {
      if (!(typeof e > "u")) {
        if (e instanceof HTMLElement) return Te.get(e);
        if (e.row_header_x >= 0) {
          if (e.row_header_x < this._view_cache.config.row_pivots.length) {
            let r = this.table_model.body._fetch_cell(e.y, e.row_header_x);
            return this.getMeta(r);
          }
        } else if (e.column_header_y >= 0) {
          if (
            e.column_header_y < this._view_cache.config.column_pivots.length
          ) {
            let r = this.table_model.body._fetch_cell(e.column_header_y, e.y);
            return this.getMeta(r);
          }
        } else
          return this.getMeta(
            this.table_model.body._fetch_cell(
              e.dy,
              e.dx + this.table_model._row_headers_length,
            ),
          );
      }
    }
    getDrawFPS() {
      return wo();
    }
    async scrollToCell(e, r) {
      if (!this._view_cache) {
        console.warn("data listener not configured");
        return;
      }
      let i = this._column_sizes.row_height || 19,
        n = this._view_cache.config.column_pivots.length * i,
        s = (this._table_clip.offsetHeight - n) % i,
        h = (this._virtual_panel.offsetHeight - s) / this._nrows;
      this.scrollTop = Math.ceil(h * r);
      let p = 0;
      for (; e > 0; )
        e--,
          (p +=
            this._column_sizes.indices[
              e + this._view_cache.config.row_pivots.length
            ] || 60);
      (this.scrollLeft = Math.ceil(p)),
        await new Promise(requestAnimationFrame),
        await this._draw_flush();
    }
    setDataListener(e, { virtual_mode: r = "both" } = {}) {
      let i = {},
        n = { row_pivots: [], column_pivots: [] };
      console.assert(
        Po.indexOf(r) > -1,
        `Unknown virtual_mode ${r};  valid options are "both" (default), "horizontal", "vertical" or "none"`,
      ),
        (this._virtual_mode = r),
        (this._invalid_schema = !0),
        (this._view_cache = { view: e, config: n, schema: i }),
        this._setup_virtual_scroll();
    }
    __noop_jsdoc_hints() {}
  };
document.createElement("regular-table").constructor === HTMLElement &&
  window.customElements.define("regular-table", Fo);
var Mr =
  'regular-table{padding:0;margin:12px 0 0 12px;scrollbar-color:transparent transparent;scrollbar-width:thin;outline:none;}regular-table:hover{scrollbar-color:rgba(0,0,0,0.3)transparent;}perspective-viewer-datagrid:not(.sub-cell-scroll-disabled) regular-table table tbody td,perspective-viewer-datagrid:not(.sub-cell-scroll-disabled) regular-table table thead th:not(.rt-group-corner){transform:translate(var(--regular-table--transform-x,0px));}perspective-viewer-datagrid:not(.sub-cell-scroll-disabled) regular-table table tbody{transform:translate(0,var(--regular-table--transform-y,0px));}perspective-viewer-datagrid:not(.sub-cell-scroll-disabled) regular-table table tbody tr:first-child td,perspective-viewer-datagrid:not(.sub-cell-scroll-disabled) regular-table table tbody tr:first-child th{clip-path:polygon(0 var(--regular-table--clip-y,0),0 200%,200% 200%,200% var(--regular-table--clip-y,0));}perspective-viewer-datagrid:not(.sub-cell-scroll-disabled) regular-table table thead th.rt-group-corner{background:var(--plugin--background,white);z-index:1;}perspective-viewer-datagrid:not(.sub-cell-scroll-disabled) regular-table table tbody tr td:first-of-type{clip-path:polygon(var(--regular-table--clip-x,0)0,var(--regular-table--clip-x,0)200%,200% 200%,200% 0);}perspective-viewer-datagrid:not(.sub-cell-scroll-disabled) regular-table table tbody tr:first-child td:first-of-type{clip-path:polygon(var(--regular-table--clip-x,0)var(--regular-table--clip-y,0),var(--regular-table--clip-x,0)200%,200% 200%,200% var(--regular-table--clip-y,0));}regular-table{font-family:inherit;}regular-table div[tabindex]{outline:none;}regular-table>div{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;}regular-table th{text-align:center;}regular-table thead tr:not(.rt-autosize) th{overflow:hidden;max-width:0px;}regular-table thead tr:last-child .rt-float,regular-table tbody .rt-float{text-align:right;}regular-table thead .rt-integer,regular-table tbody .rt-integer{text-align:right;}regular-table tbody th{text-align:left;}regular-table span.rt-tree-container{display:flex;align-items:center;height:100%;}regular-table thead .rt-string,regular-table tbody .rt-string,regular-table thead .rt-date,regular-table tbody .rt-date,regular-table thead .rt-datetime,regular-table tbody .rt-datetime{text-align:left;}regular-table thead tr:last-child th{border-bottom:1px solid#8b868045;}regular-table tbody tr:first-child td,regular-table tbody tr:first-child th{border-top:1px solid transparent!important;}regular-table th{position:relative;}regular-table tr th span.rt-tree-group{margin-left:5px;margin-right:15px;border-left:1px solid#eee;height:100%;}regular-table td,regular-table th{white-space:nowrap;font-size:12px;padding-right:5px;padding-left:5px;padding-top:0px;padding-bottom:0px;height:19px;}regular-table tr:hover td{background:#eee;opacity:1;}regular-table tr:hover{color:#333;}regular-table table *{box-sizing:border-box;}regular-table table{position:absolute;overflow:hidden;color:#666;outline:none;}regular-table span.rt-row-header-icon{color:#aaa;padding-right:4px;font-family:var(--button--font-family,"Material Icons");}regular-table span.rt-column-header-icon{font-size:10px;padding-left:3px;display:inline-block;width:10px;font-family:var(--button--font-family,"Material Icons");}regular-table span.rt-row-header-icon:hover{color:#1a7da1;text-shadow:0px 0px 3px#1a7da1;}regular-table .rt-selected td{background-color:#eee;}regular-table .rt-cell-clip{overflow:hidden;text-overflow:ellipsis;}regular-table td span.rt-group-name,regular-table th span.rt-group-name{margin-right:-5px;padding-right:5px;padding-left:8px;flex:1;height:100%;}regular-table th span.rt-group-name{text-align:left;}regular-table td th span.rt-group-leaf,regular-table th span.rt-group-leaf{margin-left:16px;height:100%;}regular-table .rt-column-resize{height:100%;width:10px;position:absolute;top:0;right:0;cursor:col-resize;}regular-table a{color:var(--rt-pos-cell--color);}regular-table a:visited{color:var(--active--color);}regular-table::-webkit-scrollbar,regular-table::-webkit-scrollbar-corner{background-color:transparent;height:12px;width:12px;}regular-table::-webkit-scrollbar-thumb{background-clip:content-box;background:var(--icon--color);border:5.5px solid var(--plugin--background);max-height:50%;max-width:50%;min-width:10%;min-height:10%;}.psp-header-border:not(.psp-is-top):not(.psp-header-leaf){box-shadow:1px 0px var(--inactive--border-color,#8b868045);}.psp-header-group{box-shadow:0px 10px 0 -9px var(--inactive--border-color,#8b868045);}.psp-is-top{box-shadow:5px 4px 0px -4px var(--inactive--border-color,#8b868045);}.psp-is-top.psp-header-group:not(.psp-header-group-corner){box-shadow:5px 4px 0px -4px var(--inactive--border-color,#8b868045),0px 10px 0 -9px var(--inactive--border-color,#8b868045);}.psp-header-border.psp-header-group:not(.psp-is-top):not(.psp-header-group-corner){box-shadow:1px 0px var(--inactive--border-color,#8b868045),0px 10px 0 -9px var(--inactive--border-color,#8b868045);}perspective-viewer[settings] tr.rt-autosize .psp-header-leaf.psp-header-border:not(.psp-menu-enabled){box-shadow:1px 0px var(--inactive--border-color,#8b868045);}.psp-header-leaf.psp-header-border{box-shadow:5px -4px 0px -4px var(--inactive--border-color,#8b868045);}tr:only-child th{box-shadow:none!important;}regular-table tbody tr:hover th.psp-tree-leaf:not(.psp-row-selected):not(.psp-row-subselected),regular-table tbody tr:hover th.psp-tree-label:not(.psp-row-selected):not(.psp-row-subselected),regular-table tbody tr:hover td:not(.psp-row-selected):not(.psp-row-subselected){border-color:var(--rt-hover--border-color,#c5c9d080)!important;background-color:transparent;box-shadow:0px 1px 0px var(--rt-hover--border-color,#c5c9d080),0px 3px 0px rgba(0,0,0,0.05),0px 5px 0px rgba(0,0,0,0.01);}regular-table tbody tr:hover+tr th.psp-tree-leaf:not(.psp-row-selected):not(.psp-row-subselected),regular-table tbody tr:hover+tr th.psp-tree-label:not(.psp-row-selected):not(.psp-row-subselected),regular-table tbody tr:hover+tr td:not(.psp-row-selected):not(.psp-row-subselected){border-top-color:transparent;}regular-table tbody tr th:first-child:not(:empty),regular-table tbody tr th:first-child:empty+th:not(:empty),regular-table tbody tr th:first-child:empty~th:empty+th:not(:empty),regular-table tbody tr td:first-child{border-left-width:1px;border-left-color:transparent;}regular-table tbody tr th:last-child,regular-table tbody tr td:last-child{border-right-width:1px;border-right-color:transparent;}regular-table tbody tr:hover{color:#161616;}regular-table tbody tr:hover th:first-child:not(:empty),regular-table tbody tr:hover th:first-child:empty+th:not(:empty),regular-table tbody tr:hover th:first-child:empty~th:empty+th:not(:empty),regular-table tbody tr:hover td:first-child{border-left-color:var(--rt-hover--border-color,#c5c9d080)!important;}regular-table tbody tr:hover th:last-child,regular-table tbody tr:hover td:last-child{border-right-color:var(--rt-hover--border-color,#c5c9d080)!important;}perspective-viewer:not([settings]) tr.rt-autosize+tr th{height:0px;}perspective-viewer:not([settings]) tr.rt-autosize+tr th span{display:none;}perspective-viewer[settings] .psp-menu-enabled{padding:0 6px;font-size:8px;border-radius:3px 3px 0 0;}perspective-viewer[settings] .psp-menu-enabled:hover,perspective-viewer[settings] tr:not(.rt-autosize) .psp-menu-open{color:var(--plugin--background);background-color:var(--icon--color);cursor:pointer;}perspective-viewer[settings] tr:not(.rt-autosize) .psp-menu-open:before{background-repeat:no-repeat;background-color:var(--icon--color);content:"";display:inline-block;-webkit-mask-size:cover;mask-size:cover;height:8px;width:10px;-webkit-mask-image:var(--column-settings-icon--mask-image);mask-image:var(--column-settings-icon--mask-image);margin-right:4px;background-color:var(--plugin--background);}.psp-sort-enabled:hover{cursor:pointer;}.psp-row-selected,:hover .psp-row-selected,:hover th.psp-tree-leaf.psp-row-selected,:hover th.psp-tree-label.psp-row-selected{color:white!important;background-color:#ea7319!important;border-color:#ea7319!important;}.psp-row-selected.psp-tree-label:not(:hover):before{color:white;}.psp-row-subselected,:hover .psp-row-subselected,:hover th.psp-tree-leaf.psp-row-subselected,:hover th.psp-tree-label.psp-row-subselected{background:rgba(234,115,25,0.2)!important;}.psp-error{color:red;}td:focus{outline:#666;outline-style:dotted;outline-width:1px;}perspective-viewer.dragging regular-table{pointer-events:none;}.psp-header-border:last-child{border-right-width:0px;}.psp-header-sort-desc:after{background-repeat:no-repeat;background-color:var(--icon--color);content:"";display:inline-block;-webkit-mask-size:cover;mask-size:cover;width:14px;height:12px;-webkit-mask-image:var(--sort-desc-icon--mask-image);mask-image:var(--sort-desc-icon--mask-image);}.psp-header-sort-asc:after{background-repeat:no-repeat;background-color:var(--icon--color);content:"";display:inline-block;-webkit-mask-size:cover;mask-size:cover;width:14px;height:12px;-webkit-mask-image:var(--sort-asc-icon--mask-image);mask-image:var(--sort-asc-icon--mask-image);}.psp-header-sort-col-desc:after{background-repeat:no-repeat;background-color:var(--icon--color);content:"";display:inline-block;-webkit-mask-size:cover;mask-size:cover;width:14px;height:12px;-webkit-mask-image:var(--sort-col-desc-icon--mask-image);mask-image:var(--sort-col-desc-icon--mask-image);}.psp-header-sort-col-asc:after{background-repeat:no-repeat;background-color:var(--icon--color);content:"";display:inline-block;-webkit-mask-size:cover;mask-size:cover;width:14px;height:12px;-webkit-mask-image:var(--sort-col-asc-icon--mask-image);mask-image:var(--sort-col-asc-icon--mask-image);}tbody th:last-of-type{border-right:1px solid var(--inactive--border-color,#8b868045);overflow:hidden;text-overflow:ellipsis;}tbody th:empty{background-image:linear-gradient(to right,transparent 9px,#eee 10px,transparent 11px);background-repeat:no-repeat;min-width:20px;max-width:20px;pointer-events:none;}.psp-tree-label{max-width:0px;min-width:0px;}.psp-tree-label:before{color:var(--icon--color);font-family:var(--button--font-family,inherit);padding-right:11px;}.psp-tree-label-expand:before{content:var(--tree-label-expand--content,"+");}.psp-tree-label-collapse:before{content:var(--tree-label-collapse--content,"-");}.psp-tree-label-expand,.psp-tree-label-collapse{cursor:pointer;}.psp-tree-label:hover:before{color:var(--active--color);text-shadow:0px 0px 5px var(--active--color);}regular-table thead tr:last-child th{border-bottom-width:1px;border-bottom-color:var(--inactive--border-color,#8b868045);}.psp-tree-leaf{padding-left:24px;}.psp-align-right{text-align:right;}.psp-align-left{text-align:left;}.psp-positive:not(:focus){color:var(--rt-pos-cell--color);}.psp-negative:not(:focus){color:var(--rt-neg-cell--color);}regular-table table tbody td{min-width:52px!important;}.psp-is-width-override .rt-column-resize,.rt-column-resize:hover{border:1px dashed#999;border-bottom-width:0px;border-left-width:0px;}.psp-bool-type{font-family:var(--button--font-family,"Material Icons");}.boolean-editable{cursor:pointer;}regular-table table{user-select:none;color:#161616;border-collapse:separate;}regular-table table th{font-weight:400;}regular-table table td,regular-table table th{border-color:var(--inactive--border-color,#8b868045);height:23px;}regular-table table .psp-header-group{text-overflow:ellipsis;}regular-table table th.psp-header-leaf{border-bottom-width:0px;}regular-table table th.psp-header-leaf span{height:23px;min-height:23px;}regular-table table td,regular-table table th.psp-tree-label,regular-table table th.psp-tree-label,regular-table table th.psp-tree-leaf,regular-table table tbody tr:first-child th{border-style:solid;border-width:0px;border-top-width:1px;}regular-table table tbody th:empty{background-position:0px -10px;}@keyframes pulse_pos{0%{background-color:var(--pulse--background-color-start,rgba(0,128,255,0.5));}100%{background-color:var(--pulse--background-color-end,rgba(0,128,255,0));}}@keyframes pulse_pos2{0%{background-color:var(--pulse--background-color-start,rgba(0,128,255,0.5));}100%{background-color:var(--pulse--background-color-end,rgba(0,128,255,0));}}@keyframes pulse_neg{0%{background-color:var(--pulse--background-color-start,rgba(255,25,0,0.5));}100%{background-color:var(--pulse--background-color-end,rgba(255,25,0,0));}}@keyframes pulse_neg2{0%{background-color:var(--pulse--background-color-start,rgba(255,25,0,0.5));}100%{background-color:var(--pulse--background-color-end,rgba(255,25,0,0));}}';
function Io(e) {
  return e.x >= 0
    ? this._column_types[e.x]
    : this._row_header_types[e.row_header_x - 1];
}
function Er(e) {
  let r = Array.from(e.children[0].children[0].children);
  if (r.length > 0) {
    let [i] = r.splice(this._config.split_by.length, 1);
    zr.call(this, e, i, !1);
    let [n] = r.splice(this._config.split_by.length, 1);
    n && zr.call(this, e, n, !0);
  }
}
function zr(e, r, i) {
  let n = e._view_cache.config.row_pivots.length - 1;
  for (let s of r?.children) {
    let h = e.getMeta(s),
      p = h.column_header?.[this._config.split_by.length],
      u = this._config.sort.find((E) => E[0] === p),
      x = h.row_header_x === n,
      L = typeof h.x > "u";
    (x = x || (h.x + 1) % this._config.columns.length === 0),
      s.classList.toggle("psp-header-border", x),
      s.classList.toggle("psp-header-group", !1),
      s.classList.toggle("psp-header-leaf", !0),
      s.classList.toggle("psp-is-top", !1),
      s.classList.toggle("psp-header-corner", L),
      s.classList.toggle("psp-header-sort-asc", !i && !!u && u[1] === "asc"),
      s.classList.toggle("psp-header-sort-desc", !i && !!u && u[1] === "desc"),
      s.classList.toggle(
        "psp-header-sort-col-asc",
        !i && !!u && u[1] === "col asc",
      ),
      s.classList.toggle(
        "psp-header-sort-col-desc",
        !i && !!u && u[1] === "col desc",
      );
    let b = Io.call(this, h),
      S = b === "integer" || b === "float",
      I = b === "string",
      z = b === "date",
      P = b === "datetime";
    s.classList.toggle("psp-align-right", S),
      s.classList.toggle("psp-align-left", !S),
      s.classList.toggle(
        "psp-menu-open",
        this._open_column_styles_menu[0] === h._virtual_x,
      ),
      s.classList.toggle(
        "psp-menu-enabled",
        (I || S || z || P) &&
          !L &&
          h.column_header_y == this._config.split_by.length + 1,
      ),
      s.classList.toggle(
        "psp-sort-enabled",
        (I || S || z || P) &&
          !L &&
          h.column_header_y === this._config.split_by.length,
      ),
      s.classList.toggle(
        "psp-is-width-override",
        e._column_sizes?.override[h.size_key] !== void 0,
      );
  }
}
function Sr(e) {
  let r = e._view_cache.config.row_pivots.length - 1,
    i = Array.from(e.children[0].children[0].children),
    n = [],
    s = new Set(),
    h = e.children[0];
  for (let p = 0; p < i.length; p++) {
    let u = h.rows[p],
      x = new Set();
    for (let L = 0; L < u.cells.length; L++) {
      let b = u.cells[L];
      b.style.backgroundColor = "";
      let S = e.getMeta(b),
        I = S.row_header_x === r || S.x >= 0;
      b.classList.toggle("psp-align-right", !1),
        b.classList.toggle("psp-align-left", !1),
        b.classList.toggle("psp-header-group", !0),
        b.classList.toggle("psp-header-leaf", !1),
        b.classList.toggle("psp-header-border", I),
        b.classList.toggle("psp-header-group-corner", typeof S.x > "u"),
        b.classList.toggle("psp-color-mode-bar", !1),
        b.classList.toggle("psp-header-sort-asc", !1),
        b.classList.toggle("psp-header-sort-desc", !1),
        b.classList.toggle("psp-header-sort-col-asc", !1),
        b.classList.toggle("psp-header-sort-col-desc", !1),
        b.classList.toggle("psp-sort-enabled", !1);
      let z = u.cells[L],
        P = L,
        E,
        D;
      for (; n[p] && n[p][P]; ++P);
      for (x.add(P), E = P; E < P + z.colSpan; ++E)
        for (D = p; D < p + z.rowSpan; ++D) n[D] || (n[D] = []), (n[D][E] = !0);
      z.classList.toggle("psp-is-top", p === 0 || !s.has(E));
    }
    s = x;
  }
}
var ne = Symbol("Plugin Symbol");
function Ar(e, r, [, , , , , i, n], [, , , , , s, h]) {
  let p = this._ids?.[e.dy]?.join("|"),
    u = e.column_header.join("|");
  if (this.last_reverse_columns?.has(u) && this.last_reverse_ids?.has(p)) {
    let x = this.last_reverse_ids?.get(p),
      L = this.last_reverse_columns.get(u);
    this._is_old_viewport
      ? this.last_meta?.[L]?.[x] > e.user
        ? (r.style.setProperty("--pulse--background-color-start", s),
          r.style.setProperty("--pulse--background-color-end", h),
          r.style.animationName === "pulse_neg"
            ? (r.style.animation = "pulse_neg2 0.5s linear")
            : (r.style.animation = "pulse_neg 0.5s linear"))
        : this.last_meta?.[L]?.[x] < e.user
        ? (r.style.setProperty("--pulse--background-color-start", i),
          r.style.setProperty("--pulse--background-color-end", n),
          r.style.animationName === "pulse_pos"
            ? (r.style.animation = "pulse_pos2 0.5s linear")
            : (r.style.animation = "pulse_pos 0.5s linear"))
        : x !== e.dy && (r.style.animation = "")
      : (r.style.animation = "");
  } else r.style.animation = "";
}
var Ht = yt(at());
function Wt(e, r) {
  return Ht.default.mix(e, `rgb(${r[0]},${r[1]},${r[2]})`, 0.5).hex();
}
function Fe([e, r, i, n], s = [255, 255, 255]) {
  function h(p, u) {
    return ((1 - n) * (s[p] / 255) + n * (u / 255)) * 255;
  }
  return [h(0, e), h(1, r), h(2, i)];
}
function Re([e, r, i]) {
  return Math.sqrt(e * e * 0.299 + r * r * 0.587 + i * i * 0.114) > 130
    ? "#161616"
    : "#ffffff";
}
function To(e) {
  let [r, i, n] = e.rgb(),
    [s, h, p] = e.set("hsl.h", (e.get("hsl.h") - 15) % 360).rgb(),
    [u, x, L] = e.set("hsl.h", (e.get("hsl.h") + 15) % 360).rgb();
  return `linear-gradient(to right top,rgb(${s},${h},${p}),rgb(${r},${i},${n}) 50%,rgb(${u},${x},${L}))`;
}
function se(e) {
  let r = (0, Ht.default)(e),
    i = To(r),
    n = r.rgb();
  return [
    e,
    ...n,
    i,
    `rgba(${n[0]},${n[1]},${n[2]},1)`,
    `rgba(${n[0]},${n[1]},${n[2]},0)`,
  ];
}
function Cr(e, r, i) {
  let n = i.user > 0,
    s = i.user < 0,
    h;
  e?.pos_bg_color !== void 0 ? (h = e.pos_bg_color) : (h = this._pos_bg_color);
  let p;
  e?.neg_bg_color !== void 0 ? (p = e.neg_bg_color) : (p = this._neg_bg_color);
  let u = n ? h : s ? p : ["", ...this._plugin_background, ""];
  {
    let [z, P, E, D, H] = u;
    if (((r.style.position = ""), e?.number_bg_mode === "color"))
      (r.style.animation = ""), (r.style.backgroundColor = z);
    else if (e?.number_bg_mode === "gradient") {
      let U = Math.max(0, Math.min(1, Math.abs(i.user / e.bg_gradient))),
        m = this._plugin_background,
        A = Re(Fe([P, E, D, U], m));
      (r.style.animation = ""),
        (r.style.color = A),
        (r.style.backgroundColor = `rgba(${P},${E},${D},${U})`);
    } else
      e?.number_bg_mode === "pulse"
        ? (Ar.call(this, i, r, h, p), (r.style.backgroundColor = ""))
        : (e?.number_bg_mode === "disabled" || e?.number_bg_mode,
          (r.style.animation = ""),
          (r.style.backgroundColor = ""));
  }
  let [x, L, b, S, I] = (() =>
    e?.pos_fg_color !== void 0
      ? n
        ? e.pos_fg_color
        : s
        ? e.neg_fg_color
        : ["", ...this._plugin_background, ""]
      : n
      ? this._pos_fg_color
      : s
      ? this._neg_fg_color
      : ["", ...this._plugin_background, ""])();
  if (e?.number_fg_mode === "disabled")
    if (e?.number_bg_mode === "color") {
      let z = this._plugin_background,
        P = Re(Fe([u[1], u[2], u[3], 1], z));
      r.style.color = P;
    } else e?.number_bg_mode === "gradient" || (r.style.color = "");
  else
    e?.number_fg_mode === "bar"
      ? ((r.style.color = ""),
        (r.style.position = "relative"),
        I !== "" &&
          r.children.length > 0 &&
          r.children[0].nodeType === Node.ELEMENT_NODE &&
          (r.children[0].style.background = I))
      : (e?.number_fg_mode === "color" || !e?.number_fg_mode) &&
        (r.style.color = x);
}
var $t = yt(at());
function Nr(e, r, i) {
  let n = i.column_header?.[this._config.split_by.length],
    [s, h, p, u, x] = (() => (e?.color !== void 0 ? e.color : this._color))();
  if (e?.string_color_mode === "foreground" && i.user !== null)
    (r.style.color = s),
      (r.style.backgroundColor = ""),
      e?.format === "link" && (r.children[0].style.color = s);
  else if (e?.string_color_mode === "background" && i.user !== null) {
    let L = this._plugin_background,
      b = Re(Fe([h, p, u, 1], L));
    (r.style.color = b), (r.style.backgroundColor = s);
  } else if (e?.string_color_mode === "series" && i.user !== null) {
    this._series_color_map.has(n) ||
      (this._series_color_map.set(n, new Map()),
      this._series_color_seed.set(n, 0));
    let L = this._series_color_map.get(n);
    if (!L.has(i.user)) {
      let te = this._series_color_seed.get(n);
      L.set(i.user, te), this._series_color_seed.set(n, te + 1);
    }
    let b = L.get(i.user),
      [S, I, z] = (0, $t.default)(s).hsl();
    S = S + ((b * 150) % 360);
    let P = (0, $t.default)(S, I, z, "hsl"),
      [E, D, H] = P.rgb(),
      U = P.hex(),
      m = this._plugin_background,
      A = Re(Fe([E, D, H, 1], m));
    (r.style.color = A), (r.style.backgroundColor = U);
  } else (r.style.backgroundColor = ""), (r.style.color = "");
}
var pi = yt(at());
function Or(e, r, i) {
  let n = i.column_header?.[this._config.split_by.length],
    [s, h, p, u, x] = (() => (e?.color !== void 0 ? e.color : this._color))();
  if (e?.datetime_color_mode === "foreground" && i.user !== null)
    (r.style.color = s), (r.style.backgroundColor = "");
  else if (e?.datetime_color_mode === "background" && i.user !== null) {
    let L = this._plugin_background,
      b = Re(Fe([h, p, u, 1], L));
    (r.style.color = b), (r.style.backgroundColor = s);
  } else (r.style.backgroundColor = ""), (r.style.color = "");
}
function Pr(e, r, i) {
  let [n] =
    i.user === !0
      ? this._pos_fg_color
      : i.user === !1
      ? this._neg_fg_color
      : ["", 0, 0, 0, ""];
  (r.style.backgroundColor = ""), (r.style.color = n);
}
function Fr(e, r, i) {
  let n =
      typeof i.value != null &&
      typeof i.value != null &&
      i.value?.toString()?.trim().length > 0,
    s = i.row_header_x >= this._config.group_by.length,
    h = e.getMeta({ dx: 0, dy: i.y - i.y0 + 1 }),
    p = h && h.row_header && typeof h.row_header[i.row_header_x + 1] < "u";
  r.classList.toggle("psp-tree-label", n && !s),
    r.classList.toggle("psp-tree-label-expand", n && !s && !p),
    r.classList.toggle("psp-tree-label-collapse", n && !s && p),
    r.classList.toggle("psp-tree-leaf", n && s);
}
function Do(e) {
  return e.x >= 0
    ? this._column_types[e.x]
    : this._row_header_types[e.row_header_x - 1];
}
function Rr(e) {
  let r = e[ne] || {};
  for (let i of e.children[0].children[1].children)
    for (let n of i.children) {
      let s = e.getMeta(n),
        h = s.column_header?.[this._config.split_by.length],
        p = Do.call(this, s),
        u = r[h],
        x = p === "integer" || p === "float";
      x
        ? Cr.call(this, u, n, s)
        : p === "boolean"
        ? Pr.call(this, u, n, s)
        : p === "string"
        ? Nr.call(this, u, n, s)
        : p === "date" || p === "datetime"
        ? Or.call(this, u, n, s)
        : ((n.style.backgroundColor = ""), (n.style.color = "")),
        n.classList.toggle("psp-bool-type", p === "boolean" && s.user !== null);
      let L = n.tagName === "TH";
      L && Fr.call(this, e, n, s),
        n.classList.toggle("psp-align-right", !L && x),
        n.classList.toggle("psp-align-left", L || !x),
        n.classList.toggle(
          "psp-color-mode-bar",
          u?.number_fg_mode === "bar" && x,
        );
    }
}
async function Ir(e, r, i) {
  let s = e.getMeta(i).column_header[this._config.split_by.length],
    p = (r.shiftKey ? jo : Ho).call(this, s);
  (this._preserve_focus_state = !0),
    await e.parentElement.parentElement.restore({ sort: p });
}
function jo(e) {
  let r = [],
    i = !1;
  for (let n of this._config.sort) {
    let [s, h] = n;
    if (s === e) {
      i = !0;
      let p = Tr.call(this, e, h);
      p && r.push(p);
    } else r.push(n);
  }
  return i || r.push([e, "desc"]), r;
}
function Ho(e) {
  for (let [r, i] of this._config.sort)
    if (r === e) {
      let n = Tr.call(this, e, i);
      return n ? [n] : [];
    }
  return [[e, "desc"]];
}
function Tr(e, r) {
  let n = this._config.split_by.length > 0 ? $o : Wo,
    s = r ? n[r] : "desc";
  if (s) return [e, s];
}
var Wo = { desc: "asc", asc: void 0 },
  $o = {
    desc: "asc",
    asc: "col desc",
    "col desc": "col asc",
    "col asc": void 0,
  };
function Gt(e, r, i) {
  let s = e.getMeta(r).column_header[this._config.split_by.length],
    h = this._schema[s],
    p = h === "integer" || h === "float",
    u = document.createElement(
      `perspective-${
        {
          float: "number",
          integer: "number",
          string: "string",
          date: "date",
          datetime: "datetime",
        }[h]
      }-column-style`,
    ),
    x;
  if (
    (p
      ? (x = {
          fg_gradient: i,
          pos_fg_color: this._pos_fg_color[0],
          neg_fg_color: this._neg_fg_color[0],
          number_fg_mode: "color",
          bg_gradient: i,
          pos_bg_color: this._pos_bg_color[0],
          neg_bg_color: this._neg_bg_color[0],
          number_bg_mode: "disabled",
        })
      : (x = { color: this._color[0], bg_color: this._color[0] }),
    !(h === "string" || h === "date" || h === "datetime"))
  )
    if (h === "float") x.fixed = 2;
    else if (h === "integer") x.fixed = 0;
    else {
      this._open_column_styles_menu.pop(), r.classList.remove("psp-menu-open");
      return;
    }
  let L = () => u.blur(),
    b = (P) => {
      let E = P.detail;
      E.pos_fg_color &&
        ((E.pos_fg_color = se(E.pos_fg_color)),
        (E.neg_fg_color = se(E.neg_fg_color))),
        E.pos_bg_color &&
          ((E.pos_bg_color = se(E.pos_bg_color)),
          (E.neg_bg_color = se(E.neg_bg_color))),
        E.color && (E.color = se(E.color)),
        E.bg_color && (E.bg_color = se(E.bg_color)),
        (e[ne] = e[ne] || {}),
        (e[ne][s] = E),
        e.draw({ preserve_width: !0 }),
        e.parentElement.parentElement.dispatchEvent(
          new Event("perspective-config-update"),
        );
    },
    S = async () => {
      e.removeEventListener("regular-table-scroll", L),
        u.removeEventListener("perspective-column-style-change", b),
        u.removeEventListener("blur", S);
      let P = this._open_column_styles_menu.pop();
      e.parentElement.parentElement.dispatchEvent(
        new Event("perspective-config-update"),
      ),
        P !== this._open_column_styles_menu[0] &&
          r.classList.remove("psp-menu-open"),
        u.destroy();
    };
  u.addEventListener("perspective-column-style-change", b),
    u.addEventListener("blur", S),
    e.addEventListener("regular-table-scroll", L);
  let I = e[ne] || {},
    z = Object.assign({}, (I[s] = I[s] || {}));
  (z.pos_fg_color || z.pos_bg_color) &&
    ((z.pos_fg_color = z.pos_fg_color?.[0]),
    (z.neg_fg_color = z.neg_fg_color?.[0]),
    (z.pos_bg_color = z.pos_bg_color?.[0]),
    (z.neg_bg_color = z.neg_bg_color?.[0])),
    z.color && (z.color = z.color[0]),
    z.bg_color && (z.bg_color = z.bg_color[0]),
    u.open(r, z, x);
}
async function Dr(e, r) {
  let i = e.getMeta(r.target),
    n = r.target.classList.contains("psp-tree-label-collapse");
  r.shiftKey && n
    ? this._view.set_depth(i.row_header.filter((s) => s !== void 0).length - 2)
    : r.shiftKey
    ? this._view.set_depth(i.row_header.filter((s) => s !== void 0).length - 1)
    : n
    ? this._view.collapse(i.y)
    : this._view.expand(i.y),
    (this._num_rows = await this._view.num_rows()),
    (this._num_columns = await this._view.num_columns()),
    e.draw();
}
async function jr(e, r) {
  if (r.which !== 1) return;
  let i = r.target;
  if (i.tagName !== "A") {
    for (; i.tagName !== "TD" && i.tagName !== "TH"; )
      if (((i = i.parentElement), !e.contains(i))) return;
    if (i.classList.contains("psp-tree-label")) {
      Dr.call(this, e, r), r.stopImmediatePropagation();
      return;
    }
    if (i.classList.contains("psp-menu-enabled")) {
      i.classList.add("psp-menu-open");
      let n = e.getMeta(i),
        s = n.column_header?.[this._config.split_by.length],
        h = this._schema[s];
      if (
        (this._open_column_styles_menu.unshift(n._virtual_x),
        h === "string" || h === "date" || h === "datetime")
      )
        Gt.call(this, e, i);
      else {
        let [p, u] = await this._view.get_min_max(s),
          x = Math.max(Math.abs(p), Math.abs(u));
        x > 1 && (x = Math.round(x * 100) / 100), Gt.call(this, e, i, x);
      }
      r.preventDefault(), r.stopImmediatePropagation();
    } else
      i.classList.contains("psp-sort-enabled") &&
        (Ir.call(this, e, r, i), r.stopImmediatePropagation());
  }
}
function Hr(e, r) {
  if (r.which !== 1) return;
  let i = r.target;
  for (; i.tagName !== "TD" && i.tagName !== "TH"; )
    if (((i = i.parentElement), !e.contains(i))) return;
  ((i.classList.contains("psp-tree-label") && r.offsetX < 26) ||
    (i.classList.contains("psp-header-leaf") &&
      !i.classList.contains("psp-header-corner"))) &&
    r.stopImmediatePropagation();
}
function Wr(e, r = !1) {
  let i =
      this._config.group_by.length === 0 && this._config.split_by.length === 0,
    n = e.hasAttribute("selectable"),
    s = r || !!e.children[0]._is_edit_mode;
  return i && !n && s;
}
function $r(e, r) {
  let i = e[ne] || {},
    n = Wr.call(this, r);
  e.parentElement.classList.toggle("edit-mode-allowed", Wr.call(this, r, !0));
  for (let s of e.querySelectorAll("td")) {
    let h = e.getMeta(s),
      p = this.get_psp_type(h);
    if (n && this._is_editable[h.x]) {
      let u = h.column_header[this._config.split_by.length];
      p === "string" && i[u]?.format === "link"
        ? (s.toggleAttribute("contenteditable", !1),
          s.classList.toggle("boolean-editable", !1))
        : p === "boolean"
        ? (s.toggleAttribute("contenteditable", !1),
          s.classList.toggle("boolean-editable", h.user !== null))
        : (n !== s.hasAttribute("contenteditable") &&
            s.toggleAttribute("contenteditable", n),
          s.classList.toggle("boolean-editable", !1));
    } else
      s.toggleAttribute("contenteditable", !1),
        s.classList.toggle("boolean-editable", !1);
  }
}
var wt = (e, r, i) => {
  let n = e.querySelectorAll("td"),
    s = i.get(e);
  if (s) {
    for (let h of n) {
      let p = e.getMeta(h);
      if (p.x === s.x && p.y === s.y)
        return (
          document.activeElement !== h && h.focus({ preventScroll: !0 }), !0
        );
    }
    document.activeElement !== document.body &&
      e.contains(document.activeElement) &&
      document.activeElement.blur();
  }
};
function Go(e) {
  let r;
  return async function (...i) {
    if (!!r && (await r) && !!r) return;
    let n;
    (r = new Promise((s) => (n = s))),
      await e.apply(this, i),
      (r = void 0),
      n();
  };
}
function Gr() {
  if (this.isContentEditable) {
    let e = document.getSelection().getRangeAt(0),
      r = e.cloneRange();
    return (
      r.selectNodeContents(this),
      r.setEnd(e.endContainer, e.endOffset),
      r.toString().length
    );
  } else return this.target.selectionStart;
}
function qt(e, r, i) {
  let n = e.getMeta(i),
    s = r._schema[r._column_paths[n.x]];
  if (n) {
    let h = i.textContent,
      p = r._ids[n.y - n.y0];
    if (s === "float" || s === "integer") {
      if (((h = parseFloat(h.replace(/,/g, ""))), isNaN(h))) return !1;
    } else if (s === "date" || s === "datetime") {
      if (((h = Date.parse(h)), isNaN(h))) return !1;
    } else
      s === "boolean" && (h = h === "check" ? !1 : h === "close" ? !0 : null);
    let u = { __INDEX__: p, [r._column_paths[n.x]]: h };
    return r._table.update([u], { port_id: r._edit_port }), !0;
  }
}
function xt(e, r = !1) {
  let i =
      this._config.group_by.length === 0 && this._config.split_by.length === 0,
    n = e.hasAttribute("selectable"),
    s = r || !!e.children[0]._is_edit_mode;
  return i && !n && s;
}
var He = Go(async function (e, r, i, n, s) {
  let h = e.getMeta(i),
    p = this._column_paths.length,
    u = this._num_rows,
    x = r.get(e);
  if (!x) return;
  h.x + n < p && 0 <= h.x + n && (x.x = h.x + n),
    h.y + s < u && 0 <= h.y + s && (x.y = h.y + s);
  let L = Math.max(h.x0 - 10, 0),
    b = Math.min(h.x0 + 10, p),
    S = Math.max(h.y0 - 5, 0),
    I = Math.min(h.y0 + 10, u),
    z = h.x0 + n,
    P = h.y0 + s;
  for (; !wt(e, void 0, r) && z >= L && z < b && P >= S && P < I; )
    await e.scrollToCell(z, P, p, u), r.set(e, x), (z += n), (P += s);
});
function qr(e, r, i, n) {
  if (!xt.call(this, r)) return;
  let s = document.activeElement;
  switch ((n.target.classList.remove("psp-error"), n.keyCode)) {
    case 13:
      n.preventDefault(),
        n.shiftKey
          ? He.call(this, e, i, s, 0, -1)
          : He.call(this, e, i, s, 0, 1);
      break;
    case 37:
      Gr.call(s) == 0 && (n.preventDefault(), He.call(this, e, i, s, -1, 0));
      break;
    case 38:
      n.preventDefault(), He.call(this, e, i, s, 0, -1);
      break;
    case 39:
      Gr.call(s) == s.textContent.length &&
        (n.preventDefault(), He.call(this, e, i, s, 1, 0));
      break;
    case 40:
      n.preventDefault(), He.call(this, e, i, s, 0, 1);
      break;
    default:
  }
}
function Br(e, r, i) {
  let n = e.getMeta(i.target);
  if (typeof n?.x < "u") {
    let s = xt.call(this, r),
      h = this._is_editable[n.x],
      p = this.get_psp_type(n) === "boolean",
      u = i.target.textContent === "-";
    s && h && p && !u && qt(e, this, i.target);
  }
}
function Yr(e, r, i, n) {
  if (xt.call(this, r) && i.has(e)) {
    n.target.classList.remove("psp-error");
    let s = i.get(e);
    i.delete(e),
      s.content !== n.target.textContent &&
        (qt(e, this, n.target) ||
          ((n.target.textContent = s.content),
          n.target.classList.add("psp-error"),
          n.target.focus()));
  }
}
function Vr(e, r, i, n) {
  let s = e.getMeta(n.target);
  if (s) {
    let h = { x: s.x, y: s.y, content: n.target.textContent };
    i.set(e, h);
  }
}
async function ct({ _view: e, _config: r }, i, n) {
  let s = r.group_by,
    h = r.split_by,
    p = i >= 0 ? i : 0,
    u = p + 1,
    x = await e.to_json({ start_row: p, end_row: u }),
    b = x.map((H) => H.__ROW_PATH__)[0] || [],
    S = s
      .map((H, U) => {
        let m = b[U];
        return m ? [H, "==", m] : void 0;
      })
      .filter((H) => H),
    I = s.length > 0 ? n + 1 : n,
    z = Object.keys(x[0])[I],
    P = { row: x[0] },
    E = [];
  if (z) {
    let H = z.split("|");
    (P.column_names = [H[h.length]]),
      (E = h
        .map((U, m) => {
          let A = H[m];
          return A ? [U, "==", A] : void 0;
        })
        .filter((U) => U)
        .filter(([, , U]) => U !== "__ROW_PATH__"));
  }
  let D = r.filter.concat(S).concat(E);
  return (P.config = { filter: D }), P;
}
async function Xr(e, r, i, n) {
  let s = e.getMeta(n.target);
  if (!r.hasAttribute("selectable") || n.handled || n.which !== 1 || !s) return;
  let h = this._ids[s.y - s.y0];
  if (s && s.y >= 0) {
    let p = i.get(e),
      u = !!p && p.reduce((z, P, E) => z && P === h[E], !0),
      x = !!p && h.length === p.length && u,
      L = { selected: !x },
      { row: b, column_names: S, config: I } = await ct(this, s.y, s.x);
    x
      ? (i.delete(e),
        (L = {
          ...L,
          row: b,
          config: { filter: structuredClone(this._config.filter) },
        }))
      : (i.set(e, h), (L = { ...L, row: b, column_names: S, config: I })),
      await e.draw({ preserve_width: !0 }),
      (n.handled = !0),
      r.dispatchEvent(
        new CustomEvent("perspective-select", {
          bubbles: !0,
          composed: !0,
          detail: L,
        }),
      );
  }
}
function Ur(e, r, i) {
  if (!r.hasAttribute("selectable")) return;
  let n = i.has(e),
    s = i.get(e);
  for (let h of e.querySelectorAll("td"))
    if (!n)
      h.classList.toggle("psp-row-selected", !1),
        h.classList.toggle("psp-row-subselected", !1);
    else {
      let p = e.getMeta(h),
        u = this._ids[p.y - p.y0],
        x = s.reduce((L, b, S) => L && b === u[S], !0);
      h.classList.toggle("psp-row-selected", u.length === s.length && x),
        h.classList.toggle("psp-row-subselected", u.length !== s.length && x);
    }
  for (let h of e.querySelectorAll("tbody th")) {
    let p = e.getMeta(h),
      u = this._ids[p.y - p.y0];
    if (!n || !!u[p.row_header_x])
      h.classList.toggle("psp-row-selected", !1),
        h.classList.toggle("psp-row-subselected", !1);
    else {
      let x = s.reduce((L, b, S) => L && b === u[S], !0);
      h.classList.toggle("psp-row-selected", u.length === s.length && x),
        h.classList.toggle("psp-row-subselected", u.length !== s.length && x);
    }
  }
}
async function Kr(e, r, i) {
  i.delete(e);
  for (let n of e.querySelectorAll("td,th"))
    n.classList.toggle("psp-row-selected", !1),
      n.classList.toggle("psp-row-subselected", !1);
}
var ro = yt(at());
var Zr = {
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
function We(e) {
  let r = {};
  if ((Jr().types[e] && Object.assign(r, Jr().types[e]), r.type)) {
    let i = We(r.type);
    return Object.assign(i, r), i;
  } else return r;
}
function Bt(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function Yt(e, ...r) {
  if (!r.length) return e;
  let i = r.shift();
  if (Bt(e) && Bt(i))
    for (let n in i)
      Bt(i[n])
        ? (e[n] || Object.assign(e, { [n]: {} }), Yt(e[n], i[n]))
        : Object.assign(e, { [n]: i[n] });
  return Yt(e, ...r);
}
function Jr() {
  return (
    globalThis.__PERSPECTIVE_CONFIG__ ||
      (globalThis.__PERSPECTIVE_CONFIG__ = Yt(
        Zr,
        globalThis.__TEMPLATE_CONFIG__ || {},
      )),
    globalThis.__PERSPECTIVE_CONFIG__
  );
}
var Qr = {
    datetime: Intl.DateTimeFormat,
    date: Intl.DateTimeFormat,
    integer: Intl.NumberFormat,
    float: Intl.NumberFormat,
    boolean: class {
      format(e) {
        return e ? "check" : "close";
      }
    },
  },
  kt = class {
    constructor() {
      this._formatters = new Map();
    }
    create_datetime_formatter(r, i) {
      let n = We(r);
      if (r === "datetime")
        if (i.format !== "custom") {
          let s = {
            ...n.format,
            timeZone: i.timeZone,
            dateStyle: i.dateStyle,
            timeStyle: i.timeStyle,
          };
          return (
            s.dateStyle === "disabled"
              ? (s.dateStyle = void 0)
              : s.dateStyle === void 0 && (s.dateStyle = n.format.dateStyle),
            s.timeStyle === "disabled"
              ? (s.timeStyle = void 0)
              : s.timeStyle === void 0 && (s.timeStyle = n.format.timeStyle),
            new Intl.DateTimeFormat([], s)
          );
        } else {
          let s = {
            timeZone: i.timeZone,
            second: i.second,
            minute: i.minute,
            hour: i.hour,
            day: i.day,
            weekday: i.weekday,
            month: i.month,
            year: i.year,
            hour12: i.hour12,
            fractionalSecondDigits: i.fractionalSecondDigits,
          };
          return (
            s.year === "disabled"
              ? (s.year = void 0)
              : s.year === void 0 && (s.year = "2-digit"),
            s.month === "disabled"
              ? (s.month = void 0)
              : s.month === void 0 && (s.month = "numeric"),
            s.day === "disabled"
              ? (s.day = void 0)
              : s.day === void 0 && (s.day = "numeric"),
            s.weekday === "disabled" && (s.weekday = void 0),
            s.hour === "disabled"
              ? (s.hour = void 0)
              : s.hour === void 0 && (s.hour = "numeric"),
            s.minute === "disabled"
              ? (s.minute = void 0)
              : s.minute === void 0 && (s.minute = "numeric"),
            s.second === "disabled"
              ? (s.second = void 0)
              : s.second === void 0 && (s.second = "numeric"),
            s.hour12 === void 0 && (s.hour12 = !0),
            new Intl.DateTimeFormat([], s)
          );
        }
      else {
        let s = { ...n.format, dateStyle: i.dateStyle };
        return (
          s.dateStyle === "disabled"
            ? (s.dateStyle = void 0)
            : s.dateStyle === void 0 && (s.dateStyle = n.format.dateStyle),
          new Intl.DateTimeFormat([], s)
        );
      }
    }
    create_number_formatter(r, i) {
      let { format: n } = We(r);
      return (
        i.fixed !== void 0 &&
          ((n.minimumFractionDigits = i.fixed),
          (n.maximumFractionDigits = i.fixed)),
        new Qr[r]([], n)
      );
    }
    create_boolean_formatter(r, i) {
      let n = We(r);
      return new Qr[r]([], n.format);
    }
    get(r, i) {
      let n = [
        r,
        i.fixed,
        i.timeZone,
        i.dateStyle,
        i.timeStyle,
        i.fractionalSecondDigits,
        i.format,
        i.year,
        i.month,
        i.day,
        i.weekday,
        i.hour,
        i.minute,
        i.second,
        i.hour12,
      ].join("-");
      if (!this._formatters.has(n)) {
        let s = We(r);
        r === "date" || r === "datetime"
          ? this._formatters.set(n, this.create_datetime_formatter(r, i))
          : r === "integer" || r === "float"
          ? this._formatters.set(n, this.create_number_formatter(r, i))
          : r === "boolean"
          ? this._formatters.set(n, this.create_boolean_formatter(r, i))
          : this._formatters.set(n, !1);
      }
      return this._formatters.get(n);
    }
  };
var qo = new kt();
function Lt(e, r, i = {}, n = !1) {
  if (r === null) return "-";
  let s = (n && this._table_schema[e]) || this._schema[e] || "string",
    h = i[e] || {};
  if ((s === "integer" || s === "float") && h?.number_fg_mode === "bar") {
    let u = Math.max(0, Math.min(0.95, Math.abs(r / h.fg_gradient) * 0.95)),
      x = this._div_factory.get(),
      L = r >= 0 ? "left" : "right";
    return (
      x.setAttribute(
        "style",
        `width:${(u * 100).toFixed(
          2,
        )}%;position:absolute;${L}:0;height:80%;top:10%;pointer-events:none;`,
      ),
      x
    );
  } else if (h?.format === "link" && s === "string") {
    let u = document.createElement("a");
    return (
      u.setAttribute("href", r),
      u.setAttribute("target", "_blank"),
      (u.textContent = r),
      u
    );
  } else if (h?.format === "bold" && s === "string") {
    let u = document.createElement("b");
    return (u.textContent = r), u;
  } else if (h?.format === "italics" && s === "string") {
    let u = document.createElement("i");
    return (u.textContent = r), u;
  } else {
    let u = qo.get(s, h);
    return u ? u.format(r) : r;
  }
}
function* eo(e = [], r, i) {
  let n = i[ne];
  for (let s of e) {
    s = ["TOTAL", ...s];
    let h = s[s.length - 1];
    s = s.slice(0, s.length - 1).fill("");
    let p = Lt.call(this, r[s.length - 1], h, n, !0);
    p instanceof HTMLElement
      ? (s = s.concat(p))
      : (s = s.concat({ toString: () => p })),
      (s.length = r.length + 1),
      yield s;
  }
}
function to() {
  let e, r, i, n, s;
  return async function (p, u, x, L, b) {
    let S = {},
      I;
    L - u > 0 && b - x > 0
      ? ((this._is_old_viewport =
          this._last_window?.start_row === x &&
          this._last_window?.end_row === b &&
          this._last_window?.start_col === u &&
          this._last_window?.end_col === L),
        (I = { start_row: x, start_col: u, end_row: b, end_col: L, id: !0 }),
        (S = JSON.parse(await this._view.to_columns_string(I))),
        (this._last_window = I),
        (this._ids = S.__ID__),
        (this._reverse_columns = this._column_paths
          .slice(u, L)
          .reduce((U, m, A) => (U.set(m, A), U), new Map())),
        (this._reverse_ids = this._ids.reduce(
          (U, m, A) => (U.set(m?.join("|"), A), U),
          new Map(),
        )))
      : this._div_factory.clear();
    let z = [],
      P = [],
      E = [],
      D = [],
      H = p.parentElement.parentElement.hasAttribute("settings");
    for (let U = u; U < Math.min(L, this._column_paths.length); ++U) {
      let m = this._column_paths[U],
        A = m.split("|"),
        te = S[m] || new Array(b - x).fill(null);
      z.push(
        te.map((oe) =>
          Lt.call(this, A[this._config.split_by.length], oe, p[ne]),
        ),
      ),
        P.push(te),
        H && A.push("Edit"),
        E.push(A),
        D.push(m);
    }
    return (
      L - u > 0 &&
        b - x > 0 &&
        ((this.last_column_paths = r),
        (this.last_meta = e),
        (this.last_ids = i),
        (this.last_reverse_ids = n),
        (this.last_reverse_columns = s),
        (r = D),
        (e = P),
        (i = this._ids),
        (n = this._reverse_ids),
        (s = this._reverse_columns)),
      {
        num_rows: this._num_rows,
        num_columns: this._column_paths.length,
        row_headers: Array.from(
          eo.call(this, S.__ROW_PATH__, this._config.group_by, p),
        ),
        column_headers: E,
        data: z,
        metadata: P,
        column_header_merge_depth: Math.max(0, this._config.split_by.length),
      }
    );
  };
}
function Mt(e, r, i) {
  let n = window.getComputedStyle(e).getPropertyValue(r).trim();
  return n.length > 0 ? n : i;
}
var Vt = class {
  constructor(r) {
    (this._name = r), (this._elements = []), (this._index = 0);
  }
  clear() {
    this._index = 0;
  }
  get() {
    this._elements[this._index] ||
      (this._elements[this._index] = document.createElement(this._name));
    let r = this._elements[this._index];
    return (this._index += 1), r;
  }
};
function Bo(e) {
  return e.x >= 0
    ? this._column_types[e.x]
    : this._row_header_types[e.row_header_x - 1];
}
async function Xt(e, r, i, n = {}) {
  let s = await i.get_config(),
    h = s.expressions.map((Z) => Z[1]),
    [p, u, x, L, b, S, I] = await Promise.all([
      r.schema(),
      r.validate_expressions(h),
      i.num_rows(),
      i.schema(),
      i.expression_schema(),
      i.column_paths(),
      this.parentElement.getEditPort(),
    ]),
    z = (0, ro.default)(Mt(e, "--plugin--background", "#FFFFFF")).rgb(),
    P = se(Mt(e, "--rt-pos-cell--color", "#338DCD")),
    E = se(Mt(e, "--rt-neg-cell--color", "#FF5942")),
    D = se(Wt(P[0], z)),
    H = se(Wt(E[0], z)),
    U = se(Mt(e, "--active--color", "#ff0000")),
    m = { ...L, ...b },
    A = { ...p, ...u.expression_schema },
    te = S.filter((Z) => Z !== "__ROW_PATH__" && Z !== "__ID__"),
    oe = [],
    re = [];
  for (let Z of te) {
    let ce = Z.split("|")[s.split_by.length];
    re.push(m[ce]), oe.push(!!p[ce]);
  }
  let ae = Object.assign(n, {
    _edit_port: I,
    _view: i,
    _table: r,
    _table_schema: A,
    _config: s,
    _num_rows: x,
    _schema: m,
    _ids: [],
    _open_column_styles_menu: [],
    _plugin_background: z,
    _color: U,
    _pos_fg_color: P,
    _neg_fg_color: E,
    _pos_bg_color: D,
    _neg_bg_color: H,
    _column_paths: te,
    _column_types: re,
    _is_editable: oe,
    _row_header_types: s.group_by.map((Z) => A[Z]),
    _series_color_map: new Map(),
    _series_color_seed: new Map(),
    get_psp_type: Bo,
  });
  return (
    (ae._div_factory = ae._div_factory || new Vt("div")),
    e.setDataListener(to().bind(ae, e), {
      virtual_mode:
        window
          .getComputedStyle(e)
          .getPropertyValue("--datagrid-virtual-mode")
          ?.trim() || "both",
    }),
    ae
  );
}
async function oo(e, r, i) {
  let n = e.getMeta(i.target);
  if (!n) return;
  let { x: s, y: h } = n,
    { row: p, column_names: u, config: x } = await ct(this, h, s);
  r.dispatchEvent(
    new CustomEvent("perspective-click", {
      bubbles: !0,
      composed: !0,
      detail: { row: p, column_names: u, config: x },
    }),
  );
}
async function io(e) {
  let r = this.parentElement,
    i = await r.getTable(!0);
  if (this._initialized)
    await Xt.call(this, this.regular_table, i, e, this.model);
  else {
    (this.innerHTML = ""),
      this.appendChild(this.regular_table),
      (this.model = await Xt.call(this, this.regular_table, i, e)),
      this.regular_table.addStyleListener(
        Rr.bind(this.model, this.regular_table),
      ),
      this.regular_table.addStyleListener(
        Sr.bind(this.model, this.regular_table),
      ),
      this.regular_table.addStyleListener(
        Er.bind(this.model, this.regular_table),
      ),
      this.regular_table.addEventListener(
        "click",
        Hr.bind(this.model, this.regular_table),
      ),
      this.regular_table.addEventListener(
        "mousedown",
        jr.bind(this.model, this.regular_table),
      );
    let n = new WeakMap();
    this.regular_table.addStyleListener(
      Ur.bind(this.model, this.regular_table, r, n),
    ),
      this.regular_table.addEventListener(
        "mousedown",
        Xr.bind(this.model, this.regular_table, r, n),
      ),
      this.regular_table.addEventListener(
        "psp-deselect-all",
        Kr.bind(this.model, this.regular_table, r, n),
      ),
      this.regular_table.addEventListener(
        "click",
        oo.bind(this.model, this.regular_table, r),
      );
    let s = new WeakMap();
    this.regular_table.addStyleListener(
      $r.bind(this.model, this.regular_table, r),
    ),
      this.regular_table.addStyleListener(
        wt.bind(this.model, this.regular_table, r, s),
      ),
      this.regular_table.addEventListener(
        "click",
        Br.bind(this.model, this.regular_table, r),
      ),
      this.regular_table.addEventListener(
        "focusin",
        Vr.bind(this.model, this.regular_table, r, s),
      ),
      this.regular_table.addEventListener(
        "focusout",
        Yr.bind(this.model, this.regular_table, r, s),
      ),
      this.regular_table.addEventListener(
        "keydown",
        qr.bind(this.model, this.regular_table, r, s),
      ),
      (this._initialized = !0);
  }
}
function zt(e, r = !1) {
  if (!this._initialized) return;
  r && (this._cached_column_sizes = e);
  let i = {},
    { group_by: n, columns: s } = this.model._config,
    h = n?.length > 0 ? n.length + 1 : 0;
  for (let p of Object.keys(e))
    if (p === "__ROW_PATH__") i[h - 1] = e[p];
    else {
      let u = this.model._column_paths.indexOf(p);
      i[u + h] = e[p];
    }
  this.regular_table._column_sizes.override = i;
}
function Et() {
  if (!this._initialized) return [];
  if (this._cached_column_sizes) {
    let h = this._cached_column_sizes;
    return (this._cached_column_sizes = void 0), h;
  }
  let e = this.regular_table._column_sizes.override,
    { group_by: r, columns: i } = this.model._config,
    n = r?.length > 0 ? r.length + 1 : 0,
    s = {};
  for (let h of Object.keys(e))
    if (e[h] !== void 0) {
      let p = h - n;
      p > -1
        ? (s[this.model._column_paths[p]] = e[h])
        : p === -1 && (s.__ROW_PATH__ = e[h]);
    }
  return s;
}
function St(e = void 0) {
  typeof e > "u" && (e = !this._is_edit_mode),
    (this._is_edit_mode = e),
    this.classList.toggle("editable", e),
    this._edit_mode !== void 0 &&
      (this._edit_mode.classList.toggle("editable", e),
      e
        ? (this._edit_mode.children[0].textContent = "Editable")
        : (this._edit_mode.children[0].textContent = "Read Only"));
}
function At(e = void 0) {
  typeof e > "u" && (e = !this._is_scroll_lock),
    (this._is_scroll_lock = e),
    this.classList.toggle("sub-cell-scroll-disabled", e),
    this._scroll_lock !== void 0 &&
      (this._scroll_lock.classList.toggle("lock-scroll", e),
      e
        ? (this._scroll_lock.children[0].textContent = "Align Scroll")
        : (this._scroll_lock.children[0].textContent = "Free Scroll"));
}
function so(e) {
  e = JSON.parse(JSON.stringify(e));
  let r = {};
  if (e.columns)
    for (let n of Object.keys(e.columns)) {
      let s = e.columns[n];
      s.column_size_override !== void 0 &&
        ((r[n] = s.column_size_override), delete s.column_size_override),
        s?.pos_fg_color &&
          ((s.pos_fg_color = se(s.pos_fg_color)),
          (s.neg_fg_color = se(s.neg_fg_color))),
        s?.pos_bg_color &&
          ((s.pos_bg_color = se(s.pos_bg_color)),
          (s.neg_bg_color = se(s.neg_bg_color))),
        s?.color && (s.color = se(s.color)),
        Object.keys(s).length === 0 && delete e.columns[n];
    }
  "editable" in e && St.call(this, e.editable),
    "scroll_lock" in e && At.call(this, e.scroll_lock);
  let i = this.regular_table;
  try {
    i._resetAutoSize();
  } catch {}
  zt.call(this, r, !0), (i[ne] = e.columns);
}
function lo() {
  this._toolbar ||
    (this._toolbar = document.createElement(
      "perspective-viewer-datagrid-toolbar",
    )),
    this.parentElement.appendChild(this._toolbar);
}
function no() {
  if (this.regular_table) {
    let e = this.regular_table,
      r = {
        columns: {},
        scroll_lock: !!this._is_scroll_lock,
        editable: !!this._is_edit_mode,
      };
    for (let n of Object.keys(e[ne] || {})) {
      let s = Object.assign({}, e[ne][n]);
      (s?.pos_fg_color || s?.pos_bg_color) &&
        ((s.pos_fg_color = s.pos_fg_color?.[0]),
        (s.neg_fg_color = s.neg_fg_color?.[0]),
        (s.pos_bg_color = s.pos_bg_color?.[0]),
        (s.neg_bg_color = s.neg_bg_color?.[0])),
        s?.color && (s.color = s.color[0]),
        (r.columns[n] = s);
    }
    let i = Et.call(this);
    for (let n of Object.keys(i || {}))
      r.columns[n] || (r.columns[n] = {}),
        (r.columns[n].column_size_override = i[n]);
    return JSON.parse(JSON.stringify(r));
  }
  return {};
}
async function ao(e) {
  if (
    (this.parentElement && (await this.activate(e)),
    !this.isConnected || this.offsetParent == null)
  )
    return;
  let r = Et.call(this),
    i = this.regular_table.draw({ invalid_columns: !0 });
  this.model._preserve_focus_state
    ? (this.model._preserve_focus_state = !1)
    : ((this.regular_table.scrollTop = 0),
      (this.regular_table.scrollLeft = 0),
      this.regular_table.dispatchEvent(
        new CustomEvent("psp-deselect-all", { bubbles: !1 }),
      ),
      this.regular_table._resetAutoSize()),
    zt.call(this, r),
    await i,
    this._toolbar.classList.toggle(
      "aggregated",
      this.model._config.group_by.length > 0 ||
        this.model._config.split_by.length > 0,
    );
}
var Ct = class extends HTMLElement {
  constructor() {
    super(),
      (this.regular_table = document.createElement("regular-table")),
      (this._is_scroll_lock = !1);
  }
  connectedCallback() {
    return lo.call(this);
  }
  disconnectedCallback() {
    this._toolbar.parentElement.removeChild(this._toolbar);
  }
  async activate(r) {
    return await io.call(this, r);
  }
  get name() {
    return "Datagrid";
  }
  get category() {
    return "Basic";
  }
  get select_mode() {
    return "toggle";
  }
  get min_config_columns() {}
  get config_column_names() {
    return ["Columns"];
  }
  get priority() {
    return 1;
  }
  async draw(r) {
    return await ao.call(this, r);
  }
  async update(r) {
    (this.model._num_rows = await r.num_rows()),
      await this.regular_table.draw();
  }
  async resize() {
    !this.isConnected ||
      this.offsetParent == null ||
      (this._initialized && (await this.regular_table.draw()));
  }
  async clear() {
    this.regular_table._resetAutoSize(), this.regular_table.clear();
  }
  save() {
    return no.call(this);
  }
  restore(r) {
    return so.call(this, r);
  }
  async restyle(r) {
    await this.draw(r);
  }
  delete() {
    this.regular_table.table_model && this.regular_table._resetAutoSize(),
      this.regular_table.clear();
  }
};
var co =
  ':host{position:relative;display:block;}:host #container{position:absolute;display:flex;flex-direction:column;justify-content:stretch;align-items:stretch;top:0;left:0;right:0;bottom:0;}:host #toolbar{display:flex;align-items:center;height:36px;}:host #slot-container{flex:1;position:relative;}#scroll_lock.lock-scroll:before{-webkit-mask-image:var(--toolbar-scroll-lock-active--content);}#scroll_lock:before{-webkit-mask-image:var(--toolbar-scroll-lock--content);}#select_mode:before{content:"highlight_alt";}#edit_mode:before{-webkit-mask-image:var(--toolbar-edit-mode--content);}#edit_mode.editable:before{-webkit-mask-image:var(--toolbar-edit-mode-active--content);}:host(.aggregated) #toolbar #edit_mode{display:none;}.button:before{width:25px;height:21px;content:"";-webkit-mask-image:cover;mask-image:cover;background-color:var(--icon--color,#ccc);margin:0 5px;}.button.editable:before,.button.lock-scroll:before{color:inherit;}.button{display:inline-flex;align-items:center;user-select:none;width:37px;height:22px;box-sizing:border-box;white-space:nowrap;border:1px solid transparent;border-radius:3px;}.button>span{display:none;margin:0;padding:0;}.button:hover{background-color:var(--icon--color);color:var(--plugin--background);opacity:1;display:flex;align-items:center;cursor:pointer;min-width:var(--button--min-width,105px);}.button:hover:before{background-color:var(--plugin--background);margin:0 5px 0 5px;}.button:hover>span{display:contents;font-size:9px;line-height:36px;}';
var Nt = class extends HTMLElement {
  connectedCallback() {
    if (this._initialized) return;
    (this._initialized = !0),
      this.setAttribute("slot", "plugin-settings"),
      this.attachShadow({ mode: "open" }),
      (this.shadowRoot.innerHTML = `
            <style>
                ${co}
            </style>
            <div id="toolbar">
                <span id="scroll_lock" class="button">
                    <span>Free Scroll</span>
                </span>
                <span id="edit_mode" class="button"><span>Read Only</span></span>
            </div>
        `);
    let r = this.parentElement,
      i = r.querySelector("perspective-viewer-datagrid");
    (i._scroll_lock = this.shadowRoot.querySelector("#scroll_lock")),
      i._scroll_lock.addEventListener("click", () => At.call(i)),
      (i._edit_mode = this.shadowRoot.querySelector("#edit_mode")),
      i._edit_mode.addEventListener("click", () => {
        St.call(i),
          i.regular_table.draw(),
          r.dispatchEvent(new Event("perspective-config-update"));
      });
  }
};
function Vo() {
  let e = document.createElement("style");
  (e.textContent = Mr), document.head.insertBefore(e, document.head.firstChild);
}
async function Xo() {
  customElements.define("perspective-viewer-datagrid-toolbar", Nt),
    customElements.define("perspective-viewer-datagrid", Ct),
    await customElements.whenDefined("perspective-viewer"),
    customElements
      .get("perspective-viewer")
      .registerPlugin("perspective-viewer-datagrid");
}
Xo();
Vo();
/**
	ColorBrewer colors for chroma.js

	Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The 
	Pennsylvania State University.

	Licensed under the Apache License, Version 2.0 (the "License"); 
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at	
	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed
	under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
	CONDITIONS OF ANY KIND, either express or implied. See the License for the
	specific language governing permissions and limitations under the License.

    @preserve
 */
/**
 * @license
 *
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2017, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
//# sourceMappingURL=perspective-viewer-datagrid.js.map
