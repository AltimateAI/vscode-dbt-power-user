(() => {
  var xs = Object.defineProperty;
  var js = (w, o) => {
    for (var s in o) xs(w, s, { get: o[s], enumerable: !0 });
  };
  var Cr = {},
    Fs = (() => {
      var w = Cr.url;
      return function (o = {}) {
        var s = typeof o < "u" ? o : {},
          E,
          N;
        s.ready = new Promise(function (t, e) {
          (E = t), (N = e);
        });
        var F = Object.assign({}, s),
          D = [],
          z = "./this.program",
          G = (t, e) => {
            throw e;
          },
          re = !0,
          j = !1,
          K = "";
        function Xe(t) {
          return s.locateFile ? s.locateFile(t, K) : K + t;
        }
        var xe, vt, ye, ce;
        (re || j) &&
          (j
            ? (K = self.location.href)
            : typeof document < "u" &&
              document.currentScript &&
              (K = document.currentScript.src),
          w && (K = w),
          K.indexOf("blob:") !== 0
            ? (K = K.substr(0, K.replace(/[?#].*/, "").lastIndexOf("/") + 1))
            : (K = ""),
          (xe = (t) => {
            var e = new XMLHttpRequest();
            return e.open("GET", t, !1), e.send(null), e.responseText;
          }),
          j &&
            (ye = (t) => {
              var e = new XMLHttpRequest();
              return (
                e.open("GET", t, !1),
                (e.responseType = "arraybuffer"),
                e.send(null),
                new Uint8Array(e.response)
              );
            }),
          (vt = (t, e, r) => {
            var n = new XMLHttpRequest();
            n.open("GET", t, !0),
              (n.responseType = "arraybuffer"),
              (n.onload = () => {
                if (n.status == 200 || (n.status == 0 && n.response)) {
                  e(n.response);
                  return;
                }
                r();
              }),
              (n.onerror = r),
              n.send(null);
          }),
          (ce = (t) => (document.title = t)));
        var H = s.print || console.log.bind(console),
          fe = s.printErr || console.warn.bind(console);
        Object.assign(s, F),
          (F = null),
          s.arguments && (D = s.arguments),
          s.thisProgram && (z = s.thisProgram),
          s.quit && (G = s.quit);
        var ne;
        s.wasmBinary && (ne = s.wasmBinary);
        var Wt = s.noExitRuntime || !0;
        typeof WebAssembly != "object" && $e("no native wasm support detected");
        var Q,
          Ze = !1,
          i;
        function a(t, e) {
          t || $e(e);
        }
        var c = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
        function v(t, e, r) {
          e >>>= 0;
          for (var n = e + r, l = e; t[l] && !(l >= n); ) ++l;
          if (l - e > 16 && t.buffer && c) return c.decode(t.subarray(e, l));
          for (var u = ""; e < l; ) {
            var _ = t[e++];
            if (!(_ & 128)) {
              u += String.fromCharCode(_);
              continue;
            }
            var f = t[e++] & 63;
            if ((_ & 224) == 192) {
              u += String.fromCharCode(((_ & 31) << 6) | f);
              continue;
            }
            var d = t[e++] & 63;
            if (
              ((_ & 240) == 224
                ? (_ = ((_ & 15) << 12) | (f << 6) | d)
                : (_ = ((_ & 7) << 18) | (f << 12) | (d << 6) | (t[e++] & 63)),
              _ < 65536)
            )
              u += String.fromCharCode(_);
            else {
              var h = _ - 65536;
              u += String.fromCharCode(55296 | (h >> 10), 56320 | (h & 1023));
            }
          }
          return u;
        }
        function m(t, e) {
          return (t >>>= 0), t ? v(S, t, e) : "";
        }
        function O(t, e, r, n) {
          if (((r >>>= 0), !(n > 0))) return 0;
          for (var l = r, u = r + n - 1, _ = 0; _ < t.length; ++_) {
            var f = t.charCodeAt(_);
            if (f >= 55296 && f <= 57343) {
              var d = t.charCodeAt(++_);
              f = (65536 + ((f & 1023) << 10)) | (d & 1023);
            }
            if (f <= 127) {
              if (r >= u) break;
              e[r++ >>> 0] = f;
            } else if (f <= 2047) {
              if (r + 1 >= u) break;
              (e[r++ >>> 0] = 192 | (f >> 6)), (e[r++ >>> 0] = 128 | (f & 63));
            } else if (f <= 65535) {
              if (r + 2 >= u) break;
              (e[r++ >>> 0] = 224 | (f >> 12)),
                (e[r++ >>> 0] = 128 | ((f >> 6) & 63)),
                (e[r++ >>> 0] = 128 | (f & 63));
            } else {
              if (r + 3 >= u) break;
              (e[r++ >>> 0] = 240 | (f >> 18)),
                (e[r++ >>> 0] = 128 | ((f >> 12) & 63)),
                (e[r++ >>> 0] = 128 | ((f >> 6) & 63)),
                (e[r++ >>> 0] = 128 | (f & 63));
            }
          }
          return (e[r >>> 0] = 0), r - l;
        }
        function P(t, e, r) {
          return O(t, S, e, r);
        }
        function y(t) {
          for (var e = 0, r = 0; r < t.length; ++r) {
            var n = t.charCodeAt(r);
            n <= 127
              ? e++
              : n <= 2047
              ? (e += 2)
              : n >= 55296 && n <= 57343
              ? ((e += 4), ++r)
              : (e += 3);
          }
          return e;
        }
        var k, S, I, B, g, R, ie, we;
        function je() {
          var t = Q.buffer;
          (s.HEAP8 = k = new Int8Array(t)),
            (s.HEAP16 = I = new Int16Array(t)),
            (s.HEAP32 = g = new Int32Array(t)),
            (s.HEAPU8 = S = new Uint8Array(t)),
            (s.HEAPU16 = B = new Uint16Array(t)),
            (s.HEAPU32 = R = new Uint32Array(t)),
            (s.HEAPF32 = ie = new Float32Array(t)),
            (s.HEAPF64 = we = new Float64Array(t));
        }
        var Lt,
          zt = [],
          Yt = [],
          Gt = [],
          jr = !1;
        function Fr() {
          if (s.preRun)
            for (
              typeof s.preRun == "function" && (s.preRun = [s.preRun]);
              s.preRun.length;

            )
              Dr(s.preRun.shift());
          mt(zt);
        }
        function $r() {
          (jr = !0), mt(Yt);
        }
        function Nr() {
          if (s.postRun)
            for (
              typeof s.postRun == "function" && (s.postRun = [s.postRun]);
              s.postRun.length;

            )
              Mr(s.postRun.shift());
          mt(Gt);
        }
        function Dr(t) {
          zt.unshift(t);
        }
        function Ir(t) {
          Yt.unshift(t);
        }
        function Mr(t) {
          Gt.unshift(t);
        }
        var be = 0,
          gt = null,
          Fe = null;
        function Ur(t) {
          be++, s.monitorRunDependencies && s.monitorRunDependencies(be);
        }
        function Vr(t) {
          if (
            (be--,
            s.monitorRunDependencies && s.monitorRunDependencies(be),
            be == 0 && (gt !== null && (clearInterval(gt), (gt = null)), Fe))
          ) {
            var e = Fe;
            (Fe = null), e();
          }
        }
        function $e(t) {
          s.onAbort && s.onAbort(t),
            (t = "Aborted(" + t + ")"),
            fe(t),
            (Ze = !0),
            (i = 1),
            (t += ". Build with -sASSERTIONS for more info.");
          var e = new WebAssembly.RuntimeError(t);
          throw (N(e), e);
        }
        var Hr = "data:application/octet-stream;base64,";
        function Bt(t) {
          return t.startsWith(Hr);
        }
        var Te;
        s.locateFile
          ? ((Te = "perspective.cpp.wasm"), Bt(Te) || (Te = Xe(Te)))
          : (Te = new URL("perspective.cpp.wasm", Cr.url).href);
        function qt(t) {
          try {
            if (t == Te && ne) return new Uint8Array(ne);
            if (ye) return ye(t);
            throw "both async and sync fetching of the wasm failed";
          } catch (e) {
            $e(e);
          }
        }
        function Wr(t) {
          return !ne && (re || j) && typeof fetch == "function"
            ? fetch(t, { credentials: "same-origin" })
                .then(function (e) {
                  if (!e.ok)
                    throw "failed to load wasm binary file at '" + t + "'";
                  return e.arrayBuffer();
                })
                .catch(function () {
                  return qt(t);
                })
            : Promise.resolve().then(function () {
                return qt(t);
              });
        }
        function Jt(t, e, r) {
          return Wr(t)
            .then(function (n) {
              return WebAssembly.instantiate(n, e);
            })
            .then(function (n) {
              return n;
            })
            .then(r, function (n) {
              fe("failed to asynchronously prepare wasm: " + n), $e(n);
            });
        }
        function Lr(t, e, r, n) {
          return !t &&
            typeof WebAssembly.instantiateStreaming == "function" &&
            !Bt(e) &&
            typeof fetch == "function"
            ? fetch(e, { credentials: "same-origin" }).then(function (l) {
                var u = WebAssembly.instantiateStreaming(l, r);
                return u.then(n, function (_) {
                  return (
                    fe("wasm streaming compile failed: " + _),
                    fe("falling back to ArrayBuffer instantiation"),
                    Jt(e, r, n)
                  );
                });
              })
            : Jt(e, r, n);
        }
        function zr() {
          var t = { a: cs };
          function e(n, l) {
            var u = n.exports;
            return (
              (s.asm = u),
              (Q = s.asm.ma),
              je(),
              (Lt = s.asm.qa),
              Ir(s.asm.na),
              Vr("wasm-instantiate"),
              u
            );
          }
          Ur("wasm-instantiate");
          function r(n) {
            e(n.instance);
          }
          if (s.instantiateWasm)
            try {
              return s.instantiateWasm(t, e);
            } catch (n) {
              fe("Module.instantiateWasm callback failed with error: " + n),
                N(n);
            }
          return Lr(ne, Te, t, r).catch(N), {};
        }
        var Yr = {
          846964: (t) => {
            throw new Error(m(t));
          },
        };
        function mt(t) {
          for (; t.length > 0; ) t.shift()(s);
        }
        function Gr(t) {
          (this.excPtr = t),
            (this.ptr = t - 24),
            (this.set_type = function (e) {
              R[(this.ptr + 4) >>> 2] = e;
            }),
            (this.get_type = function () {
              return R[(this.ptr + 4) >>> 2];
            }),
            (this.set_destructor = function (e) {
              R[(this.ptr + 8) >>> 2] = e;
            }),
            (this.get_destructor = function () {
              return R[(this.ptr + 8) >>> 2];
            }),
            (this.set_refcount = function (e) {
              g[this.ptr >>> 2] = e;
            }),
            (this.set_caught = function (e) {
              (e = e ? 1 : 0), (k[(this.ptr + 12) >>> 0] = e);
            }),
            (this.get_caught = function () {
              return k[(this.ptr + 12) >>> 0] != 0;
            }),
            (this.set_rethrown = function (e) {
              (e = e ? 1 : 0), (k[(this.ptr + 13) >>> 0] = e);
            }),
            (this.get_rethrown = function () {
              return k[(this.ptr + 13) >>> 0] != 0;
            }),
            (this.init = function (e, r) {
              this.set_adjusted_ptr(0),
                this.set_type(e),
                this.set_destructor(r),
                this.set_refcount(0),
                this.set_caught(!1),
                this.set_rethrown(!1);
            }),
            (this.add_ref = function () {
              var e = g[this.ptr >>> 2];
              g[this.ptr >>> 2] = e + 1;
            }),
            (this.release_ref = function () {
              var e = g[this.ptr >>> 2];
              return (g[this.ptr >>> 2] = e - 1), e === 1;
            }),
            (this.set_adjusted_ptr = function (e) {
              R[(this.ptr + 16) >>> 2] = e;
            }),
            (this.get_adjusted_ptr = function () {
              return R[(this.ptr + 16) >>> 2];
            }),
            (this.get_exception_ptr = function () {
              var e = yr(this.get_type());
              if (e) return R[this.excPtr >>> 2];
              var r = this.get_adjusted_ptr();
              return r !== 0 ? r : this.excPtr;
            });
        }
        var Br = 0,
          qr = 0;
        function Jr(t, e, r) {
          var n = new Gr(t);
          throw (n.init(e, r), (Br = t), qr++, t);
        }
        var Ne = {
          varargs: void 0,
          get: function () {
            Ne.varargs += 4;
            var t = g[(Ne.varargs - 4) >>> 2];
            return t;
          },
          getStr: function (t) {
            var e = m(t);
            return e;
          },
        };
        function Xr(t, e, r) {
          return (Ne.varargs = r), 0;
        }
        function Zr(t, e, r) {}
        function Kr(t, e, r) {}
        function Qr(t, e, r) {
          return (Ne.varargs = r), 0;
        }
        function en(t, e, r, n) {
          Ne.varargs = n;
        }
        function tn(t, e) {}
        var Ke = {};
        function yt(t) {
          for (; t.length; ) {
            var e = t.pop(),
              r = t.pop();
            r(e);
          }
        }
        function De(t) {
          return this.fromWireType(g[t >>> 2]);
        }
        var Oe = {},
          Ee = {},
          Qe = {},
          rn = 48,
          nn = 57;
        function et(t) {
          if (t === void 0) return "_unknown";
          t = t.replace(/[^a-zA-Z0-9_]/g, "$");
          var e = t.charCodeAt(0);
          return e >= rn && e <= nn ? "_" + t : t;
        }
        function tt(t, e) {
          return (
            (t = et(t)),
            {
              [t]: function () {
                return e.apply(this, arguments);
              },
            }[t]
          );
        }
        function wt(t, e) {
          var r = tt(e, function (n) {
            (this.name = e), (this.message = n);
            var l = new Error(n).stack;
            l !== void 0 &&
              (this.stack =
                this.toString() +
                `
` +
                l.replace(/^Error(:[^\n]*)?\n/, ""));
          });
          return (
            (r.prototype = Object.create(t.prototype)),
            (r.prototype.constructor = r),
            (r.prototype.toString = function () {
              return this.message === void 0
                ? this.name
                : this.name + ": " + this.message;
            }),
            r
          );
        }
        var Xt = void 0;
        function rt(t) {
          throw new Xt(t);
        }
        function he(t, e, r) {
          t.forEach(function (f) {
            Qe[f] = e;
          });
          function n(f) {
            var d = r(f);
            d.length !== t.length && rt("Mismatched type converter count");
            for (var h = 0; h < t.length; ++h) se(t[h], d[h]);
          }
          var l = new Array(e.length),
            u = [],
            _ = 0;
          e.forEach((f, d) => {
            Ee.hasOwnProperty(f)
              ? (l[d] = Ee[f])
              : (u.push(f),
                Oe.hasOwnProperty(f) || (Oe[f] = []),
                Oe[f].push(() => {
                  (l[d] = Ee[f]), ++_, _ === u.length && n(l);
                }));
          }),
            u.length === 0 && n(l);
        }
        function sn(t) {
          var e = Ke[t];
          delete Ke[t];
          var r = e.rawConstructor,
            n = e.rawDestructor,
            l = e.fields,
            u = l
              .map((_) => _.getterReturnType)
              .concat(l.map((_) => _.setterArgumentType));
          he([t], u, (_) => {
            var f = {};
            return (
              l.forEach((d, h) => {
                var C = d.fieldName,
                  A = _[h],
                  T = d.getter,
                  U = d.getterContext,
                  W = _[h + l.length],
                  L = d.setter,
                  J = d.setterContext;
                f[C] = {
                  read: (x) => A.fromWireType(T(U, x)),
                  write: (x, p) => {
                    var b = [];
                    L(J, x, W.toWireType(b, p)), yt(b);
                  },
                };
              }),
              [
                {
                  name: e.name,
                  fromWireType: function (d) {
                    var h = {};
                    for (var C in f) h[C] = f[C].read(d);
                    return n(d), h;
                  },
                  toWireType: function (d, h) {
                    for (var C in f)
                      if (!(C in h))
                        throw new TypeError('Missing field:  "' + C + '"');
                    var A = r();
                    for (C in f) f[C].write(A, h[C]);
                    return d !== null && d.push(n, A), A;
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: De,
                  destructorFunction: n,
                },
              ]
            );
          });
        }
        function on(t, e, r, n, l) {}
        function nt(t) {
          switch (t) {
            case 1:
              return 0;
            case 2:
              return 1;
            case 4:
              return 2;
            case 8:
              return 3;
            default:
              throw new TypeError("Unknown type size: " + t);
          }
        }
        function an() {
          for (var t = new Array(256), e = 0; e < 256; ++e)
            t[e] = String.fromCharCode(e);
          Zt = t;
        }
        var Zt = void 0;
        function q(t) {
          for (var e = "", r = t; S[r >>> 0]; ) e += Zt[S[r++ >>> 0]];
          return e;
        }
        var Se = void 0;
        function M(t) {
          throw new Se(t);
        }
        function se(t, e, r = {}) {
          if (!("argPackAdvance" in e))
            throw new TypeError(
              "registerType registeredInstance requires argPackAdvance",
            );
          var n = e.name;
          if (
            (t ||
              M('type "' + n + '" must have a positive integer typeid pointer'),
            Ee.hasOwnProperty(t))
          ) {
            if (r.ignoreDuplicateRegistrations) return;
            M("Cannot register type '" + n + "' twice");
          }
          if (((Ee[t] = e), delete Qe[t], Oe.hasOwnProperty(t))) {
            var l = Oe[t];
            delete Oe[t], l.forEach((u) => u());
          }
        }
        function ln(t, e, r, n, l) {
          var u = nt(r);
          (e = q(e)),
            se(t, {
              name: e,
              fromWireType: function (_) {
                return !!_;
              },
              toWireType: function (_, f) {
                return f ? n : l;
              },
              argPackAdvance: 8,
              readValueFromPointer: function (_) {
                var f;
                if (r === 1) f = k;
                else if (r === 2) f = I;
                else if (r === 4) f = g;
                else throw new TypeError("Unknown boolean type size: " + e);
                return this.fromWireType(f[_ >>> u]);
              },
              destructorFunction: null,
            });
        }
        function un(t) {
          if (!(this instanceof ve) || !(t instanceof ve)) return !1;
          for (
            var e = this.$$.ptrType.registeredClass,
              r = this.$$.ptr,
              n = t.$$.ptrType.registeredClass,
              l = t.$$.ptr;
            e.baseClass;

          )
            (r = e.upcast(r)), (e = e.baseClass);
          for (; n.baseClass; ) (l = n.upcast(l)), (n = n.baseClass);
          return e === n && r === l;
        }
        function cn(t) {
          return {
            count: t.count,
            deleteScheduled: t.deleteScheduled,
            preservePointerOnDelete: t.preservePointerOnDelete,
            ptr: t.ptr,
            ptrType: t.ptrType,
            smartPtr: t.smartPtr,
            smartPtrType: t.smartPtrType,
          };
        }
        function bt(t) {
          function e(r) {
            return r.$$.ptrType.registeredClass.name;
          }
          M(e(t) + " instance already deleted");
        }
        var Tt = !1;
        function Kt(t) {}
        function fn(t) {
          t.smartPtr
            ? t.smartPtrType.rawDestructor(t.smartPtr)
            : t.ptrType.registeredClass.rawDestructor(t.ptr);
        }
        function Qt(t) {
          t.count.value -= 1;
          var e = t.count.value === 0;
          e && fn(t);
        }
        function er(t, e, r) {
          if (e === r) return t;
          if (r.baseClass === void 0) return null;
          var n = er(t, e, r.baseClass);
          return n === null ? null : r.downcast(n);
        }
        var tr = {};
        function _n() {
          return Object.keys(Ue).length;
        }
        function dn() {
          var t = [];
          for (var e in Ue) Ue.hasOwnProperty(e) && t.push(Ue[e]);
          return t;
        }
        var Ie = [];
        function Et() {
          for (; Ie.length; ) {
            var t = Ie.pop();
            (t.$$.deleteScheduled = !1), t.delete();
          }
        }
        var Me = void 0;
        function pn(t) {
          (Me = t), Ie.length && Me && Me(Et);
        }
        function hn() {
          (s.getInheritedInstanceCount = _n),
            (s.getLiveInheritedInstances = dn),
            (s.flushPendingDeletes = Et),
            (s.setDelayFunction = pn);
        }
        var Ue = {};
        function vn(t, e) {
          for (e === void 0 && M("ptr should not be undefined"); t.baseClass; )
            (e = t.upcast(e)), (t = t.baseClass);
          return e;
        }
        function gn(t, e) {
          return (e = vn(t, e)), Ue[e];
        }
        function it(t, e) {
          (!e.ptrType || !e.ptr) &&
            rt("makeClassHandle requires ptr and ptrType");
          var r = !!e.smartPtrType,
            n = !!e.smartPtr;
          return (
            r !== n && rt("Both smartPtrType and smartPtr must be specified"),
            (e.count = { value: 1 }),
            Ve(Object.create(t, { $$: { value: e } }))
          );
        }
        function mn(t) {
          var e = this.getPointee(t);
          if (!e) return this.destructor(t), null;
          var r = gn(this.registeredClass, e);
          if (r !== void 0) {
            if (r.$$.count.value === 0)
              return (r.$$.ptr = e), (r.$$.smartPtr = t), r.clone();
            var n = r.clone();
            return this.destructor(t), n;
          }
          function l() {
            return this.isSmartPointer
              ? it(this.registeredClass.instancePrototype, {
                  ptrType: this.pointeeType,
                  ptr: e,
                  smartPtrType: this,
                  smartPtr: t,
                })
              : it(this.registeredClass.instancePrototype, {
                  ptrType: this,
                  ptr: t,
                });
          }
          var u = this.registeredClass.getActualType(e),
            _ = tr[u];
          if (!_) return l.call(this);
          var f;
          this.isConst ? (f = _.constPointerType) : (f = _.pointerType);
          var d = er(e, this.registeredClass, f.registeredClass);
          return d === null
            ? l.call(this)
            : this.isSmartPointer
            ? it(f.registeredClass.instancePrototype, {
                ptrType: f,
                ptr: d,
                smartPtrType: this,
                smartPtr: t,
              })
            : it(f.registeredClass.instancePrototype, { ptrType: f, ptr: d });
        }
        function Ve(t) {
          return typeof FinalizationRegistry > "u"
            ? ((Ve = (e) => e), t)
            : ((Tt = new FinalizationRegistry((e) => {
                Qt(e.$$);
              })),
              (Ve = (e) => {
                var r = e.$$,
                  n = !!r.smartPtr;
                if (n) {
                  var l = { $$: r };
                  Tt.register(e, l, e);
                }
                return e;
              }),
              (Kt = (e) => Tt.unregister(e)),
              Ve(t));
        }
        function yn() {
          if ((this.$$.ptr || bt(this), this.$$.preservePointerOnDelete))
            return (this.$$.count.value += 1), this;
          var t = Ve(
            Object.create(Object.getPrototypeOf(this), {
              $$: { value: cn(this.$$) },
            }),
          );
          return (t.$$.count.value += 1), (t.$$.deleteScheduled = !1), t;
        }
        function wn() {
          this.$$.ptr || bt(this),
            this.$$.deleteScheduled &&
              !this.$$.preservePointerOnDelete &&
              M("Object already scheduled for deletion"),
            Kt(this),
            Qt(this.$$),
            this.$$.preservePointerOnDelete ||
              ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0));
        }
        function bn() {
          return !this.$$.ptr;
        }
        function Tn() {
          return (
            this.$$.ptr || bt(this),
            this.$$.deleteScheduled &&
              !this.$$.preservePointerOnDelete &&
              M("Object already scheduled for deletion"),
            Ie.push(this),
            Ie.length === 1 && Me && Me(Et),
            (this.$$.deleteScheduled = !0),
            this
          );
        }
        function En() {
          (ve.prototype.isAliasOf = un),
            (ve.prototype.clone = yn),
            (ve.prototype.delete = wn),
            (ve.prototype.isDeleted = bn),
            (ve.prototype.deleteLater = Tn);
        }
        function ve() {}
        function rr(t, e, r) {
          if (t[e].overloadTable === void 0) {
            var n = t[e];
            (t[e] = function () {
              return (
                t[e].overloadTable.hasOwnProperty(arguments.length) ||
                  M(
                    "Function '" +
                      r +
                      "' called with an invalid number of arguments (" +
                      arguments.length +
                      ") - expects one of (" +
                      t[e].overloadTable +
                      ")!",
                  ),
                t[e].overloadTable[arguments.length].apply(this, arguments)
              );
            }),
              (t[e].overloadTable = []),
              (t[e].overloadTable[n.argCount] = n);
          }
        }
        function Ct(t, e, r) {
          s.hasOwnProperty(t)
            ? ((r === void 0 ||
                (s[t].overloadTable !== void 0 &&
                  s[t].overloadTable[r] !== void 0)) &&
                M("Cannot register public name '" + t + "' twice"),
              rr(s, t, t),
              s.hasOwnProperty(r) &&
                M(
                  "Cannot register multiple overloads of a function with the same number of arguments (" +
                    r +
                    ")!",
                ),
              (s[t].overloadTable[r] = e))
            : ((s[t] = e), r !== void 0 && (s[t].numArguments = r));
        }
        function Cn(t, e, r, n, l, u, _, f) {
          (this.name = t),
            (this.constructor = e),
            (this.instancePrototype = r),
            (this.rawDestructor = n),
            (this.baseClass = l),
            (this.getActualType = u),
            (this.upcast = _),
            (this.downcast = f),
            (this.pureVirtualFunctions = []);
        }
        function At(t, e, r) {
          for (; e !== r; )
            e.upcast ||
              M(
                "Expected null or instance of " +
                  r.name +
                  ", got an instance of " +
                  e.name,
              ),
              (t = e.upcast(t)),
              (e = e.baseClass);
          return t;
        }
        function An(t, e) {
          if (e === null)
            return this.isReference && M("null is not a valid " + this.name), 0;
          e.$$ || M('Cannot pass "' + kt(e) + '" as a ' + this.name),
            e.$$.ptr ||
              M("Cannot pass deleted object as a pointer of type " + this.name);
          var r = e.$$.ptrType.registeredClass,
            n = At(e.$$.ptr, r, this.registeredClass);
          return n;
        }
        function On(t, e) {
          var r;
          if (e === null)
            return (
              this.isReference && M("null is not a valid " + this.name),
              this.isSmartPointer
                ? ((r = this.rawConstructor()),
                  t !== null && t.push(this.rawDestructor, r),
                  r)
                : 0
            );
          e.$$ || M('Cannot pass "' + kt(e) + '" as a ' + this.name),
            e.$$.ptr ||
              M("Cannot pass deleted object as a pointer of type " + this.name),
            !this.isConst &&
              e.$$.ptrType.isConst &&
              M(
                "Cannot convert argument of type " +
                  (e.$$.smartPtrType
                    ? e.$$.smartPtrType.name
                    : e.$$.ptrType.name) +
                  " to parameter type " +
                  this.name,
              );
          var n = e.$$.ptrType.registeredClass;
          if (
            ((r = At(e.$$.ptr, n, this.registeredClass)), this.isSmartPointer)
          )
            switch (
              (e.$$.smartPtr === void 0 &&
                M("Passing raw pointer to smart pointer is illegal"),
              this.sharingPolicy)
            ) {
              case 0:
                e.$$.smartPtrType === this
                  ? (r = e.$$.smartPtr)
                  : M(
                      "Cannot convert argument of type " +
                        (e.$$.smartPtrType
                          ? e.$$.smartPtrType.name
                          : e.$$.ptrType.name) +
                        " to parameter type " +
                        this.name,
                    );
                break;
              case 1:
                r = e.$$.smartPtr;
                break;
              case 2:
                if (e.$$.smartPtrType === this) r = e.$$.smartPtr;
                else {
                  var l = e.clone();
                  (r = this.rawShare(
                    r,
                    V.toHandle(function () {
                      l.delete();
                    }),
                  )),
                    t !== null && t.push(this.rawDestructor, r);
                }
                break;
              default:
                M("Unsupporting sharing policy");
            }
          return r;
        }
        function Sn(t, e) {
          if (e === null)
            return this.isReference && M("null is not a valid " + this.name), 0;
          e.$$ || M('Cannot pass "' + kt(e) + '" as a ' + this.name),
            e.$$.ptr ||
              M("Cannot pass deleted object as a pointer of type " + this.name),
            e.$$.ptrType.isConst &&
              M(
                "Cannot convert argument of type " +
                  e.$$.ptrType.name +
                  " to parameter type " +
                  this.name,
              );
          var r = e.$$.ptrType.registeredClass,
            n = At(e.$$.ptr, r, this.registeredClass);
          return n;
        }
        function Pn(t) {
          return this.rawGetPointee && (t = this.rawGetPointee(t)), t;
        }
        function Rn(t) {
          this.rawDestructor && this.rawDestructor(t);
        }
        function kn(t) {
          t !== null && t.delete();
        }
        function xn() {
          (oe.prototype.getPointee = Pn),
            (oe.prototype.destructor = Rn),
            (oe.prototype.argPackAdvance = 8),
            (oe.prototype.readValueFromPointer = De),
            (oe.prototype.deleteObject = kn),
            (oe.prototype.fromWireType = mn);
        }
        function oe(t, e, r, n, l, u, _, f, d, h, C) {
          (this.name = t),
            (this.registeredClass = e),
            (this.isReference = r),
            (this.isConst = n),
            (this.isSmartPointer = l),
            (this.pointeeType = u),
            (this.sharingPolicy = _),
            (this.rawGetPointee = f),
            (this.rawConstructor = d),
            (this.rawShare = h),
            (this.rawDestructor = C),
            !l && e.baseClass === void 0
              ? n
                ? ((this.toWireType = An), (this.destructorFunction = null))
                : ((this.toWireType = Sn), (this.destructorFunction = null))
              : (this.toWireType = On);
        }
        function nr(t, e, r) {
          s.hasOwnProperty(t) || rt("Replacing nonexistant public symbol"),
            s[t].overloadTable !== void 0 && r !== void 0
              ? (s[t].overloadTable[r] = e)
              : ((s[t] = e), (s[t].argCount = r));
        }
        function jn(t, e, r) {
          var n = s["dynCall_" + t];
          return r && r.length ? n.apply(null, [e].concat(r)) : n.call(null, e);
        }
        var st = [];
        function ir(t) {
          var e = st[t];
          return (
            e ||
              (t >= st.length && (st.length = t + 1), (st[t] = e = Lt.get(t))),
            e
          );
        }
        function Fn(t, e, r) {
          if (t.includes("j")) return jn(t, e, r);
          var n = ir(e).apply(null, r);
          return n;
        }
        function $n(t, e) {
          var r = [];
          return function () {
            return (r.length = 0), Object.assign(r, arguments), Fn(t, e, r);
          };
        }
        function Z(t, e) {
          t = q(t);
          function r() {
            return t.includes("j") ? $n(t, e) : ir(e);
          }
          var n = r();
          return (
            typeof n != "function" &&
              M("unknown function pointer with signature " + t + ": " + e),
            n
          );
        }
        var sr = void 0;
        function or(t) {
          var e = mr(t),
            r = q(e);
          return _e(e), r;
        }
        function ot(t, e) {
          var r = [],
            n = {};
          function l(u) {
            if (!n[u] && !Ee[u]) {
              if (Qe[u]) {
                Qe[u].forEach(l);
                return;
              }
              r.push(u), (n[u] = !0);
            }
          }
          throw (e.forEach(l), new sr(t + ": " + r.map(or).join([", "])));
        }
        function Nn(t, e, r, n, l, u, _, f, d, h, C, A, T) {
          (C = q(C)),
            (u = Z(l, u)),
            f && (f = Z(_, f)),
            h && (h = Z(d, h)),
            (T = Z(A, T));
          var U = et(C);
          Ct(U, function () {
            ot("Cannot construct " + C + " due to unbound types", [n]);
          }),
            he([t, e, r], n ? [n] : [], function (W) {
              W = W[0];
              var L, J;
              n
                ? ((L = W.registeredClass), (J = L.instancePrototype))
                : (J = ve.prototype);
              var x = tt(U, function () {
                  if (Object.getPrototypeOf(this) !== p)
                    throw new Se("Use 'new' to construct " + C);
                  if (b.constructor_body === void 0)
                    throw new Se(C + " has no accessible constructor");
                  var Ae = b.constructor_body[arguments.length];
                  if (Ae === void 0)
                    throw new Se(
                      "Tried to invoke ctor of " +
                        C +
                        " with invalid number of parameters (" +
                        arguments.length +
                        ") - expected (" +
                        Object.keys(b.constructor_body).toString() +
                        ") parameters instead!",
                    );
                  return Ae.apply(this, arguments);
                }),
                p = Object.create(J, { constructor: { value: x } });
              x.prototype = p;
              var b = new Cn(C, x, p, T, L, u, f, h),
                X = new oe(C, b, !0, !1, !1),
                Y = new oe(C + "*", b, !1, !1, !1),
                ae = new oe(C + " const*", b, !1, !0, !1);
              return (
                (tr[t] = { pointerType: Y, constPointerType: ae }),
                nr(U, x),
                [X, Y, ae]
              );
            });
        }
        function Ot(t, e) {
          for (var r = [], n = 0; n < t; n++) r.push(R[(e + n * 4) >>> 2]);
          return r;
        }
        function ar(t, e) {
          if (!(t instanceof Function))
            throw new TypeError(
              "new_ called with constructor type " +
                typeof t +
                " which is not a function",
            );
          var r = tt(t.name || "unknownFunctionName", function () {});
          r.prototype = t.prototype;
          var n = new r(),
            l = t.apply(n, e);
          return l instanceof Object ? l : n;
        }
        function St(t, e, r, n, l) {
          var u = e.length;
          u < 2 &&
            M(
              "argTypes array size mismatch! Must at least get return value and 'this' types!",
            );
          for (
            var _ = e[1] !== null && r !== null, f = !1, d = 1;
            d < e.length;
            ++d
          )
            if (e[d] !== null && e[d].destructorFunction === void 0) {
              f = !0;
              break;
            }
          for (
            var h = e[0].name !== "void", C = "", A = "", d = 0;
            d < u - 2;
            ++d
          )
            (C += (d !== 0 ? ", " : "") + "arg" + d),
              (A += (d !== 0 ? ", " : "") + "arg" + d + "Wired");
          var T =
            "return function " +
            et(t) +
            "(" +
            C +
            `) {
if (arguments.length !== ` +
            (u - 2) +
            `) {
throwBindingError('function ` +
            t +
            " called with ' + arguments.length + ' arguments, expected " +
            (u - 2) +
            ` args!');
}
`;
          f &&
            (T += `var destructors = [];
`);
          var U = f ? "destructors" : "null",
            W = [
              "throwBindingError",
              "invoker",
              "fn",
              "runDestructors",
              "retType",
              "classParam",
            ],
            L = [M, n, l, yt, e[0], e[1]];
          _ &&
            (T +=
              "var thisWired = classParam.toWireType(" +
              U +
              `, this);
`);
          for (var d = 0; d < u - 2; ++d)
            (T +=
              "var arg" +
              d +
              "Wired = argType" +
              d +
              ".toWireType(" +
              U +
              ", arg" +
              d +
              "); // " +
              e[d + 2].name +
              `
`),
              W.push("argType" + d),
              L.push(e[d + 2]);
          if (
            (_ && (A = "thisWired" + (A.length > 0 ? ", " : "") + A),
            (T +=
              (h ? "var rv = " : "") +
              "invoker(fn" +
              (A.length > 0 ? ", " : "") +
              A +
              `);
`),
            f)
          )
            T += `runDestructors(destructors);
`;
          else
            for (var d = _ ? 1 : 2; d < e.length; ++d) {
              var J = d === 1 ? "thisWired" : "arg" + (d - 2) + "Wired";
              e[d].destructorFunction !== null &&
                ((T +=
                  J +
                  "_dtor(" +
                  J +
                  "); // " +
                  e[d].name +
                  `
`),
                W.push(J + "_dtor"),
                L.push(e[d].destructorFunction));
            }
          h &&
            (T += `var ret = retType.fromWireType(rv);
return ret;
`),
            (T += `}
`),
            W.push(T);
          var x = ar(Function, W).apply(null, L);
          return x;
        }
        function Dn(t, e, r, n, l, u) {
          a(e > 0);
          var _ = Ot(e, r);
          (l = Z(n, l)),
            he([], [t], function (f) {
              f = f[0];
              var d = "constructor " + f.name;
              if (
                (f.registeredClass.constructor_body === void 0 &&
                  (f.registeredClass.constructor_body = []),
                f.registeredClass.constructor_body[e - 1] !== void 0)
              )
                throw new Se(
                  "Cannot register multiple constructors with identical number of parameters (" +
                    (e - 1) +
                    ") for class '" +
                    f.name +
                    "'! Overload resolution is currently only performed using the parameter count, not actual type info!",
                );
              return (
                (f.registeredClass.constructor_body[e - 1] = () => {
                  ot("Cannot construct " + f.name + " due to unbound types", _);
                }),
                he([], _, function (h) {
                  return (
                    h.splice(1, 0, null),
                    (f.registeredClass.constructor_body[e - 1] = St(
                      d,
                      h,
                      null,
                      l,
                      u,
                    )),
                    []
                  );
                }),
                []
              );
            });
        }
        function In(t, e, r, n, l, u, _, f) {
          var d = Ot(r, n);
          (e = q(e)),
            (u = Z(l, u)),
            he([], [t], function (h) {
              h = h[0];
              var C = h.name + "." + e;
              e.startsWith("@@") && (e = Symbol[e.substring(2)]),
                f && h.registeredClass.pureVirtualFunctions.push(e);
              function A() {
                ot("Cannot call " + C + " due to unbound types", d);
              }
              var T = h.registeredClass.instancePrototype,
                U = T[e];
              return (
                U === void 0 ||
                (U.overloadTable === void 0 &&
                  U.className !== h.name &&
                  U.argCount === r - 2)
                  ? ((A.argCount = r - 2), (A.className = h.name), (T[e] = A))
                  : (rr(T, e, C), (T[e].overloadTable[r - 2] = A)),
                he([], d, function (W) {
                  var L = St(C, W, h, u, _);
                  return (
                    T[e].overloadTable === void 0
                      ? ((L.argCount = r - 2), (T[e] = L))
                      : (T[e].overloadTable[r - 2] = L),
                    []
                  );
                }),
                []
              );
            });
        }
        var Pt = [],
          te = [
            {},
            { value: void 0 },
            { value: null },
            { value: !0 },
            { value: !1 },
          ];
        function Rt(t) {
          t > 4 && --te[t].refcount === 0 && ((te[t] = void 0), Pt.push(t));
        }
        function Mn() {
          for (var t = 0, e = 5; e < te.length; ++e) te[e] !== void 0 && ++t;
          return t;
        }
        function Un() {
          for (var t = 5; t < te.length; ++t)
            if (te[t] !== void 0) return te[t];
          return null;
        }
        function Vn() {
          (s.count_emval_handles = Mn), (s.get_first_emval = Un);
        }
        var V = {
          toValue: (t) => (
            t || M("Cannot use deleted val. handle = " + t), te[t].value
          ),
          toHandle: (t) => {
            switch (t) {
              case void 0:
                return 1;
              case null:
                return 2;
              case !0:
                return 3;
              case !1:
                return 4;
              default: {
                var e = Pt.length ? Pt.pop() : te.length;
                return (te[e] = { refcount: 1, value: t }), e;
              }
            }
          },
        };
        function Hn(t, e) {
          (e = q(e)),
            se(t, {
              name: e,
              fromWireType: function (r) {
                var n = V.toValue(r);
                return Rt(r), n;
              },
              toWireType: function (r, n) {
                return V.toHandle(n);
              },
              argPackAdvance: 8,
              readValueFromPointer: De,
              destructorFunction: null,
            });
        }
        function Wn(t, e, r) {
          switch (e) {
            case 0:
              return function (n) {
                var l = r ? k : S;
                return this.fromWireType(l[n >>> 0]);
              };
            case 1:
              return function (n) {
                var l = r ? I : B;
                return this.fromWireType(l[n >>> 1]);
              };
            case 2:
              return function (n) {
                var l = r ? g : R;
                return this.fromWireType(l[n >>> 2]);
              };
            default:
              throw new TypeError("Unknown integer type: " + t);
          }
        }
        function Ln(t, e, r, n) {
          var l = nt(r);
          e = q(e);
          function u() {}
          (u.values = {}),
            se(t, {
              name: e,
              constructor: u,
              fromWireType: function (_) {
                return this.constructor.values[_];
              },
              toWireType: function (_, f) {
                return f.value;
              },
              argPackAdvance: 8,
              readValueFromPointer: Wn(e, l, n),
              destructorFunction: null,
            }),
            Ct(e, u);
        }
        function He(t, e) {
          var r = Ee[t];
          return r === void 0 && M(e + " has unknown type " + or(t)), r;
        }
        function zn(t, e, r) {
          var n = He(t, "enum");
          e = q(e);
          var l = n.constructor,
            u = Object.create(n.constructor.prototype, {
              value: { value: r },
              constructor: { value: tt(n.name + "_" + e, function () {}) },
            });
          (l.values[r] = u), (l[e] = u);
        }
        function kt(t) {
          if (t === null) return "null";
          var e = typeof t;
          return e === "object" || e === "array" || e === "function"
            ? t.toString()
            : "" + t;
        }
        function Yn(t, e) {
          switch (e) {
            case 2:
              return function (r) {
                return this.fromWireType(ie[r >>> 2]);
              };
            case 3:
              return function (r) {
                return this.fromWireType(we[r >>> 3]);
              };
            default:
              throw new TypeError("Unknown float type: " + t);
          }
        }
        function Gn(t, e, r) {
          var n = nt(r);
          (e = q(e)),
            se(t, {
              name: e,
              fromWireType: function (l) {
                return l;
              },
              toWireType: function (l, u) {
                return u;
              },
              argPackAdvance: 8,
              readValueFromPointer: Yn(e, n),
              destructorFunction: null,
            });
        }
        function Bn(t, e, r, n, l, u) {
          var _ = Ot(e, r);
          (t = q(t)),
            (l = Z(n, l)),
            Ct(
              t,
              function () {
                ot("Cannot call " + t + " due to unbound types", _);
              },
              e - 1,
            ),
            he([], _, function (f) {
              var d = [f[0], null].concat(f.slice(1));
              return nr(t, St(t, d, null, l, u), e - 1), [];
            });
        }
        function qn(t, e, r) {
          switch (e) {
            case 0:
              return r
                ? function (l) {
                    return k[l >>> 0];
                  }
                : function (l) {
                    return S[l >>> 0];
                  };
            case 1:
              return r
                ? function (l) {
                    return I[l >>> 1];
                  }
                : function (l) {
                    return B[l >>> 1];
                  };
            case 2:
              return r
                ? function (l) {
                    return g[l >>> 2];
                  }
                : function (l) {
                    return R[l >>> 2];
                  };
            default:
              throw new TypeError("Unknown integer type: " + t);
          }
        }
        function Jn(t, e, r, n, l) {
          (e = q(e)), l === -1 && (l = 4294967295);
          var u = nt(r),
            _ = (A) => A;
          if (n === 0) {
            var f = 32 - 8 * r;
            _ = (A) => (A << f) >>> f;
          }
          var d = e.includes("unsigned"),
            h = (A, T) => {},
            C;
          d
            ? (C = function (A, T) {
                return h(T, this.name), T >>> 0;
              })
            : (C = function (A, T) {
                return h(T, this.name), T;
              }),
            se(t, {
              name: e,
              fromWireType: _,
              toWireType: C,
              argPackAdvance: 8,
              readValueFromPointer: qn(e, u, n !== 0),
              destructorFunction: null,
            });
        }
        function Xn(t, e, r) {
          var n = [
              Int8Array,
              Uint8Array,
              Int16Array,
              Uint16Array,
              Int32Array,
              Uint32Array,
              Float32Array,
              Float64Array,
            ],
            l = n[e];
          function u(_) {
            _ = _ >> 2;
            var f = R,
              d = f[_ >>> 0],
              h = f[(_ + 1) >>> 0];
            return new l(f.buffer, h, d);
          }
          (r = q(r)),
            se(
              t,
              {
                name: r,
                fromWireType: u,
                argPackAdvance: 8,
                readValueFromPointer: u,
              },
              { ignoreDuplicateRegistrations: !0 },
            );
        }
        function Zn(t, e, r, n, l, u, _, f, d, h, C, A) {
          (r = q(r)),
            (u = Z(l, u)),
            (f = Z(_, f)),
            (h = Z(d, h)),
            (A = Z(C, A)),
            he([t], [e], function (T) {
              T = T[0];
              var U = new oe(
                r,
                T.registeredClass,
                !1,
                !1,
                !0,
                T,
                n,
                u,
                f,
                h,
                A,
              );
              return [U];
            });
        }
        function Kn(t, e) {
          e = q(e);
          var r = e === "std::string";
          se(t, {
            name: e,
            fromWireType: function (n) {
              var l = R[n >>> 2],
                u = n + 4,
                _;
              if (r)
                for (var f = u, d = 0; d <= l; ++d) {
                  var h = u + d;
                  if (d == l || S[h >>> 0] == 0) {
                    var C = h - f,
                      A = m(f, C);
                    _ === void 0
                      ? (_ = A)
                      : ((_ += String.fromCharCode(0)), (_ += A)),
                      (f = h + 1);
                  }
                }
              else {
                for (var T = new Array(l), d = 0; d < l; ++d)
                  T[d] = String.fromCharCode(S[(u + d) >>> 0]);
                _ = T.join("");
              }
              return _e(n), _;
            },
            toWireType: function (n, l) {
              l instanceof ArrayBuffer && (l = new Uint8Array(l));
              var u,
                _ = typeof l == "string";
              _ ||
                l instanceof Uint8Array ||
                l instanceof Uint8ClampedArray ||
                l instanceof Int8Array ||
                M("Cannot pass non-string to std::string"),
                r && _ ? (u = y(l)) : (u = l.length);
              var f = lt(4 + u + 1),
                d = f + 4;
              if (((d >>>= 0), (R[f >>> 2] = u), r && _)) P(l, d, u + 1);
              else if (_)
                for (var h = 0; h < u; ++h) {
                  var C = l.charCodeAt(h);
                  C > 255 &&
                    (_e(d),
                    M(
                      "String has UTF-16 code units that do not fit in 8 bits",
                    )),
                    (S[(d + h) >>> 0] = C);
                }
              else for (var h = 0; h < u; ++h) S[(d + h) >>> 0] = l[h];
              return n !== null && n.push(_e, f), f;
            },
            argPackAdvance: 8,
            readValueFromPointer: De,
            destructorFunction: function (n) {
              _e(n);
            },
          });
        }
        var lr =
          typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0;
        function Qn(t, e) {
          for (var r = t, n = r >> 1, l = n + e / 2; !(n >= l) && B[n >>> 0]; )
            ++n;
          if (((r = n << 1), r - t > 32 && lr))
            return lr.decode(S.subarray(t >>> 0, r >>> 0));
          for (var u = "", _ = 0; !(_ >= e / 2); ++_) {
            var f = I[(t + _ * 2) >>> 1];
            if (f == 0) break;
            u += String.fromCharCode(f);
          }
          return u;
        }
        function ei(t, e, r) {
          if ((r === void 0 && (r = 2147483647), r < 2)) return 0;
          r -= 2;
          for (
            var n = e, l = r < t.length * 2 ? r / 2 : t.length, u = 0;
            u < l;
            ++u
          ) {
            var _ = t.charCodeAt(u);
            (I[e >>> 1] = _), (e += 2);
          }
          return (I[e >>> 1] = 0), e - n;
        }
        function ti(t) {
          return t.length * 2;
        }
        function ri(t, e) {
          for (var r = 0, n = ""; !(r >= e / 4); ) {
            var l = g[(t + r * 4) >>> 2];
            if (l == 0) break;
            if ((++r, l >= 65536)) {
              var u = l - 65536;
              n += String.fromCharCode(55296 | (u >> 10), 56320 | (u & 1023));
            } else n += String.fromCharCode(l);
          }
          return n;
        }
        function ni(t, e, r) {
          if (((e >>>= 0), r === void 0 && (r = 2147483647), r < 4)) return 0;
          for (var n = e, l = n + r - 4, u = 0; u < t.length; ++u) {
            var _ = t.charCodeAt(u);
            if (_ >= 55296 && _ <= 57343) {
              var f = t.charCodeAt(++u);
              _ = (65536 + ((_ & 1023) << 10)) | (f & 1023);
            }
            if (((g[e >>> 2] = _), (e += 4), e + 4 > l)) break;
          }
          return (g[e >>> 2] = 0), e - n;
        }
        function ii(t) {
          for (var e = 0, r = 0; r < t.length; ++r) {
            var n = t.charCodeAt(r);
            n >= 55296 && n <= 57343 && ++r, (e += 4);
          }
          return e;
        }
        function si(t, e, r) {
          r = q(r);
          var n, l, u, _, f;
          e === 2
            ? ((n = Qn), (l = ei), (_ = ti), (u = () => B), (f = 1))
            : e === 4 && ((n = ri), (l = ni), (_ = ii), (u = () => R), (f = 2)),
            se(t, {
              name: r,
              fromWireType: function (d) {
                for (
                  var h = R[d >>> 2], C = u(), A, T = d + 4, U = 0;
                  U <= h;
                  ++U
                ) {
                  var W = d + 4 + U * e;
                  if (U == h || C[W >>> f] == 0) {
                    var L = W - T,
                      J = n(T, L);
                    A === void 0
                      ? (A = J)
                      : ((A += String.fromCharCode(0)), (A += J)),
                      (T = W + e);
                  }
                }
                return _e(d), A;
              },
              toWireType: function (d, h) {
                typeof h != "string" &&
                  M("Cannot pass non-string to C++ string type " + r);
                var C = _(h),
                  A = lt(4 + C + e);
                return (
                  (A >>>= 0),
                  (R[A >>> 2] = C >> f),
                  l(h, A + 4, C + e),
                  d !== null && d.push(_e, A),
                  A
                );
              },
              argPackAdvance: 8,
              readValueFromPointer: De,
              destructorFunction: function (d) {
                _e(d);
              },
            });
        }
        function oi(t, e, r, n, l, u) {
          Ke[t] = {
            name: q(e),
            rawConstructor: Z(r, n),
            rawDestructor: Z(l, u),
            fields: [],
          };
        }
        function ai(t, e, r, n, l, u, _, f, d, h) {
          Ke[t].fields.push({
            fieldName: q(e),
            getterReturnType: r,
            getter: Z(n, l),
            getterContext: u,
            setterArgumentType: _,
            setter: Z(f, d),
            setterContext: h,
          });
        }
        function li(t, e) {
          (e = q(e)),
            se(t, {
              isVoid: !0,
              name: e,
              argPackAdvance: 0,
              fromWireType: function () {},
              toWireType: function (r, n) {},
            });
        }
        var ui = !0;
        function ci() {
          return ui;
        }
        function fi(t, e, r) {
          (t = V.toValue(t)), (e = He(e, "emval::as"));
          var n = [],
            l = V.toHandle(n);
          return (R[r >>> 2] = l), e.toWireType(n, t);
        }
        function ur(t, e) {
          for (var r = new Array(t), n = 0; n < t; ++n)
            r[n] = He(R[(e + n * 4) >>> 2], "parameter " + n);
          return r;
        }
        function _i(t, e, r, n) {
          t = V.toValue(t);
          for (var l = ur(e, r), u = new Array(e), _ = 0; _ < e; ++_) {
            var f = l[_];
            (u[_] = f.readValueFromPointer(n)), (n += f.argPackAdvance);
          }
          var d = t.apply(void 0, u);
          return V.toHandle(d);
        }
        function di(t) {
          var e = [];
          return (R[t >>> 2] = V.toHandle(e)), e;
        }
        var pi = {};
        function We(t) {
          var e = pi[t];
          return e === void 0 ? q(t) : e;
        }
        var at = [];
        function hi(t, e, r, n, l) {
          return (
            (t = at[t]), (e = V.toValue(e)), (r = We(r)), t(e, r, di(n), l)
          );
        }
        function vi(t, e, r, n) {
          (t = at[t]), (e = V.toValue(e)), (r = We(r)), t(e, r, null, n);
        }
        function cr() {
          return typeof globalThis == "object"
            ? globalThis
            : (function () {
                return Function;
              })()("return this")();
        }
        function gi(t) {
          return t === 0
            ? V.toHandle(cr())
            : ((t = We(t)), V.toHandle(cr()[t]));
        }
        function mi(t) {
          var e = at.length;
          return at.push(t), e;
        }
        var fr = [];
        function yi(t, e) {
          var r = ur(t, e),
            n = r[0],
            l =
              n.name +
              "_$" +
              r
                .slice(1)
                .map(function (W) {
                  return W.name;
                })
                .join("_") +
              "$",
            u = fr[l];
          if (u !== void 0) return u;
          for (var _ = ["retType"], f = [n], d = "", h = 0; h < t - 1; ++h)
            (d += (h !== 0 ? ", " : "") + "arg" + h),
              _.push("argType" + h),
              f.push(r[1 + h]);
          for (
            var C = et("methodCaller_" + l),
              A =
                "return function " +
                C +
                `(handle, name, destructors, args) {
`,
              T = 0,
              h = 0;
            h < t - 1;
            ++h
          )
            (A +=
              "    var arg" +
              h +
              " = argType" +
              h +
              ".readValueFromPointer(args" +
              (T ? "+" + T : "") +
              `);
`),
              (T += r[h + 1].argPackAdvance);
          A +=
            "    var rv = handle[name](" +
            d +
            `);
`;
          for (var h = 0; h < t - 1; ++h)
            r[h + 1].deleteObject &&
              (A +=
                "    argType" +
                h +
                ".deleteObject(arg" +
                h +
                `);
`);
          n.isVoid ||
            (A += `    return retType.toWireType(destructors, rv);
`),
            (A += `};
`),
            _.push(A);
          var U = ar(Function, _).apply(null, f);
          return (u = mi(U)), (fr[l] = u), u;
        }
        function wi(t) {
          return (t = We(t)), V.toHandle(s[t]);
        }
        function bi(t, e) {
          return (t = V.toValue(t)), (e = V.toValue(e)), V.toHandle(t[e]);
        }
        function Ti(t) {
          t > 4 && (te[t].refcount += 1);
        }
        function Ei(t, e) {
          return (t = V.toValue(t)), (e = V.toValue(e)), t instanceof e;
        }
        function Ci(t) {
          for (var e = "", r = 0; r < t; ++r)
            e += (r !== 0 ? ", " : "") + "arg" + r;
          for (
            var n = () => R,
              l =
                "return function emval_allocator_" +
                t +
                `(constructor, argTypes, args) {
  var HEAPU32 = getMemory();
`,
              r = 0;
            r < t;
            ++r
          )
            l +=
              "var argType" +
              r +
              " = requireRegisteredType(HEAPU32[((argTypes)>>2)], 'parameter " +
              r +
              `');
var arg` +
              r +
              " = argType" +
              r +
              `.readValueFromPointer(args);
args += argType` +
              r +
              `['argPackAdvance'];
argTypes += 4;
`;
          return (
            (l +=
              "var obj = new constructor(" +
              e +
              `);
return valueToHandle(obj);
}
`),
            new Function(
              "requireRegisteredType",
              "Module",
              "valueToHandle",
              "getMemory",
              l,
            )(He, s, V.toHandle, n)
          );
        }
        var _r = {};
        function Ai(t, e, r, n) {
          t = V.toValue(t);
          var l = _r[e];
          return l || ((l = Ci(e)), (_r[e] = l)), l(t, r, n);
        }
        function Oi() {
          return V.toHandle([]);
        }
        function Si(t) {
          return V.toHandle(We(t));
        }
        function Pi() {
          return V.toHandle({});
        }
        function Ri(t) {
          var e = V.toValue(t);
          yt(e), Rt(t);
        }
        function ki(t, e, r) {
          (t = V.toValue(t)),
            (e = V.toValue(e)),
            (r = V.toValue(r)),
            (t[e] = r);
        }
        function xi(t, e) {
          t = He(t, "_emval_take_value");
          var r = t.readValueFromPointer(e);
          return V.toHandle(r);
        }
        function ji(t) {
          return (t = V.toValue(t)), V.toHandle(typeof t);
        }
        function Fi(t) {
          return R[t >>> 2] + g[(t + 4) >>> 2] * 4294967296;
        }
        function Ce(t) {
          return t % 4 === 0 && (t % 100 !== 0 || t % 400 === 0);
        }
        var $i = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
          Ni = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        function dr(t) {
          var e = Ce(t.getFullYear()),
            r = e ? $i : Ni,
            n = r[t.getMonth()] + t.getDate() - 1;
          return n;
        }
        function Di(t, e) {
          var r = new Date(Fi(t) * 1e3);
          (g[e >>> 2] = r.getSeconds()),
            (g[(e + 4) >>> 2] = r.getMinutes()),
            (g[(e + 8) >>> 2] = r.getHours()),
            (g[(e + 12) >>> 2] = r.getDate()),
            (g[(e + 16) >>> 2] = r.getMonth()),
            (g[(e + 20) >>> 2] = r.getFullYear() - 1900),
            (g[(e + 24) >>> 2] = r.getDay());
          var n = dr(r) | 0;
          (g[(e + 28) >>> 2] = n),
            (g[(e + 36) >>> 2] = -(r.getTimezoneOffset() * 60));
          var l = new Date(r.getFullYear(), 0, 1),
            u = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(),
            _ = l.getTimezoneOffset(),
            f = (u != _ && r.getTimezoneOffset() == Math.min(_, u)) | 0;
          g[(e + 32) >>> 2] = f;
        }
        function Ii(t) {
          var e = new Date(
              g[(t + 20) >>> 2] + 1900,
              g[(t + 16) >>> 2],
              g[(t + 12) >>> 2],
              g[(t + 8) >>> 2],
              g[(t + 4) >>> 2],
              g[t >>> 2],
              0,
            ),
            r = g[(t + 32) >>> 2],
            n = e.getTimezoneOffset(),
            l = new Date(e.getFullYear(), 0, 1),
            u = new Date(e.getFullYear(), 6, 1).getTimezoneOffset(),
            _ = l.getTimezoneOffset(),
            f = Math.min(_, u);
          if (r < 0) g[(t + 32) >>> 2] = Number(u != _ && f == n);
          else if (r > 0 != (f == n)) {
            var d = Math.max(_, u),
              h = r > 0 ? f : d;
            e.setTime(e.getTime() + (h - n) * 6e4);
          }
          g[(t + 24) >>> 2] = e.getDay();
          var C = dr(e) | 0;
          return (
            (g[(t + 28) >>> 2] = C),
            (g[t >>> 2] = e.getSeconds()),
            (g[(t + 4) >>> 2] = e.getMinutes()),
            (g[(t + 8) >>> 2] = e.getHours()),
            (g[(t + 12) >>> 2] = e.getDate()),
            (g[(t + 16) >>> 2] = e.getMonth()),
            (g[(t + 20) >>> 2] = e.getYear()),
            (e.getTime() / 1e3) | 0
          );
        }
        function Mi(t, e, r, n, l, u, _) {
          return -52;
        }
        function Ui(t, e, r, n, l, u) {}
        function pr(t) {
          var e = y(t) + 1,
            r = lt(e);
          return r && O(t, k, r, e), r;
        }
        function Vi(t, e, r) {
          var n = new Date().getFullYear(),
            l = new Date(n, 0, 1),
            u = new Date(n, 6, 1),
            _ = l.getTimezoneOffset(),
            f = u.getTimezoneOffset(),
            d = Math.max(_, f);
          (R[t >>> 2] = d * 60), (g[e >>> 2] = Number(_ != f));
          function h(W) {
            var L = W.toTimeString().match(/\(([A-Za-z ]+)\)$/);
            return L ? L[1] : "GMT";
          }
          var C = h(l),
            A = h(u),
            T = pr(C),
            U = pr(A);
          f < _
            ? ((R[r >>> 2] = T), (R[(r + 4) >>> 2] = U))
            : ((R[r >>> 2] = U), (R[(r + 4) >>> 2] = T));
        }
        function Hi() {
          $e("");
        }
        var xt = [];
        function Wi(t, e) {
          xt.length = 0;
          var r;
          for (e >>= 2; (r = S[t++ >>> 0]); )
            (e += (r != 105) & e),
              xt.push(r == 105 ? g[e >>> 0] : we[e++ >>> 1]),
              ++e;
          return xt;
        }
        function Li(t, e, r) {
          var n = Wi(e, r);
          return Yr[t].apply(null, n);
        }
        function zi(t, e, r) {
          return Li(t, e, r);
        }
        function Yi() {
          return Date.now();
        }
        function hr() {
          return 4294901760;
        }
        function Gi() {
          return hr();
        }
        var vr;
        vr = () => performance.now();
        function Bi(t, e, r) {
          S.copyWithin(t >>> 0, e >>> 0, (e + r) >>> 0);
        }
        function qi(t) {
          var e = Q.buffer;
          try {
            return Q.grow((t - e.byteLength + 65535) >>> 16), je(), 1;
          } catch {}
        }
        function Ji(t) {
          var e = S.length;
          t = t >>> 0;
          var r = hr();
          if (t > r) return !1;
          let n = (d, h) => d + ((h - (d % h)) % h);
          for (var l = 1; l <= 4; l *= 2) {
            var u = e * (1 + 0.2 / l);
            u = Math.min(u, t + 100663296);
            var _ = Math.min(r, n(Math.max(t, u), 65536)),
              f = qi(_);
            if (f) return !0;
          }
          return !1;
        }
        var jt = {};
        function Xi() {
          return z || "./this.program";
        }
        function Le() {
          if (!Le.strings) {
            var t =
                (
                  (typeof navigator == "object" &&
                    navigator.languages &&
                    navigator.languages[0]) ||
                  "C"
                ).replace("-", "_") + ".UTF-8",
              e = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG: t,
                _: Xi(),
              };
            for (var r in jt) jt[r] === void 0 ? delete e[r] : (e[r] = jt[r]);
            var n = [];
            for (var r in e) n.push(r + "=" + e[r]);
            Le.strings = n;
          }
          return Le.strings;
        }
        function Zi(t, e, r) {
          for (var n = 0; n < t.length; ++n) k[e++ >>> 0] = t.charCodeAt(n);
          r || (k[e >>> 0] = 0);
        }
        function Ki(t, e) {
          var r = 0;
          return (
            Le().forEach(function (n, l) {
              var u = e + r;
              (R[(t + l * 4) >>> 2] = u), Zi(n, u), (r += n.length + 1);
            }),
            0
          );
        }
        function Qi(t, e) {
          var r = Le();
          R[t >>> 2] = r.length;
          var n = 0;
          return (
            r.forEach(function (l) {
              n += l.length + 1;
            }),
            (R[e >>> 2] = n),
            0
          );
        }
        function es(t) {
          return 52;
        }
        function ts(t, e, r, n) {
          return 52;
        }
        function rs(t, e, r, n, l) {
          return 70;
        }
        var ns = [null, [], []];
        function is(t, e) {
          var r = ns[t];
          e === 0 || e === 10
            ? ((t === 1 ? H : fe)(v(r, 0)), (r.length = 0))
            : r.push(e);
        }
        function ss(t, e, r, n) {
          for (var l = 0, u = 0; u < r; u++) {
            var _ = R[e >>> 2],
              f = R[(e + 4) >>> 2];
            e += 8;
            for (var d = 0; d < f; d++) is(t, S[(_ + d) >>> 0]);
            l += f;
          }
          return (R[n >>> 2] = l), 0;
        }
        function Ft(t, e) {
          for (var r = 0, n = 0; n <= e; r += t[n++]);
          return r;
        }
        var ze = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          Ye = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function Ge(t, e) {
          for (var r = new Date(t.getTime()); e > 0; ) {
            var n = Ce(r.getFullYear()),
              l = r.getMonth(),
              u = (n ? ze : Ye)[l];
            if (e > u - r.getDate())
              (e -= u - r.getDate() + 1),
                r.setDate(1),
                l < 11
                  ? r.setMonth(l + 1)
                  : (r.setMonth(0), r.setFullYear(r.getFullYear() + 1));
            else return r.setDate(r.getDate() + e), r;
          }
          return r;
        }
        function gr(t, e, r) {
          var n = r > 0 ? r : y(t) + 1,
            l = new Array(n),
            u = O(t, l, 0, l.length);
          return e && (l.length = u), l;
        }
        function os(t, e) {
          k.set(t, e >>> 0);
        }
        function as(t, e, r, n) {
          var l = g[(n + 40) >>> 2],
            u = {
              tm_sec: g[n >>> 2],
              tm_min: g[(n + 4) >>> 2],
              tm_hour: g[(n + 8) >>> 2],
              tm_mday: g[(n + 12) >>> 2],
              tm_mon: g[(n + 16) >>> 2],
              tm_year: g[(n + 20) >>> 2],
              tm_wday: g[(n + 24) >>> 2],
              tm_yday: g[(n + 28) >>> 2],
              tm_isdst: g[(n + 32) >>> 2],
              tm_gmtoff: g[(n + 36) >>> 2],
              tm_zone: l ? m(l) : "",
            },
            _ = m(r),
            f = {
              "%c": "%a %b %d %H:%M:%S %Y",
              "%D": "%m/%d/%y",
              "%F": "%Y-%m-%d",
              "%h": "%b",
              "%r": "%I:%M:%S %p",
              "%R": "%H:%M",
              "%T": "%H:%M:%S",
              "%x": "%m/%d/%y",
              "%X": "%H:%M:%S",
              "%Ec": "%c",
              "%EC": "%C",
              "%Ex": "%m/%d/%y",
              "%EX": "%H:%M:%S",
              "%Ey": "%y",
              "%EY": "%Y",
              "%Od": "%d",
              "%Oe": "%e",
              "%OH": "%H",
              "%OI": "%I",
              "%Om": "%m",
              "%OM": "%M",
              "%OS": "%S",
              "%Ou": "%u",
              "%OU": "%U",
              "%OV": "%V",
              "%Ow": "%w",
              "%OW": "%W",
              "%Oy": "%y",
            };
          for (var d in f) _ = _.replace(new RegExp(d, "g"), f[d]);
          var h = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            C = [
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
            ];
          function A(p, b, X) {
            for (
              var Y = typeof p == "number" ? p.toString() : p || "";
              Y.length < b;

            )
              Y = X[0] + Y;
            return Y;
          }
          function T(p, b) {
            return A(p, b, "0");
          }
          function U(p, b) {
            function X(ae) {
              return ae < 0 ? -1 : ae > 0 ? 1 : 0;
            }
            var Y;
            return (
              (Y = X(p.getFullYear() - b.getFullYear())) === 0 &&
                (Y = X(p.getMonth() - b.getMonth())) === 0 &&
                (Y = X(p.getDate() - b.getDate())),
              Y
            );
          }
          function W(p) {
            switch (p.getDay()) {
              case 0:
                return new Date(p.getFullYear() - 1, 11, 29);
              case 1:
                return p;
              case 2:
                return new Date(p.getFullYear(), 0, 3);
              case 3:
                return new Date(p.getFullYear(), 0, 2);
              case 4:
                return new Date(p.getFullYear(), 0, 1);
              case 5:
                return new Date(p.getFullYear() - 1, 11, 31);
              case 6:
                return new Date(p.getFullYear() - 1, 11, 30);
            }
          }
          function L(p) {
            var b = Ge(new Date(p.tm_year + 1900, 0, 1), p.tm_yday),
              X = new Date(b.getFullYear(), 0, 4),
              Y = new Date(b.getFullYear() + 1, 0, 4),
              ae = W(X),
              Ae = W(Y);
            return U(ae, b) <= 0
              ? U(Ae, b) <= 0
                ? b.getFullYear() + 1
                : b.getFullYear()
              : b.getFullYear() - 1;
          }
          var J = {
            "%a": function (p) {
              return h[p.tm_wday].substring(0, 3);
            },
            "%A": function (p) {
              return h[p.tm_wday];
            },
            "%b": function (p) {
              return C[p.tm_mon].substring(0, 3);
            },
            "%B": function (p) {
              return C[p.tm_mon];
            },
            "%C": function (p) {
              var b = p.tm_year + 1900;
              return T((b / 100) | 0, 2);
            },
            "%d": function (p) {
              return T(p.tm_mday, 2);
            },
            "%e": function (p) {
              return A(p.tm_mday, 2, " ");
            },
            "%g": function (p) {
              return L(p).toString().substring(2);
            },
            "%G": function (p) {
              return L(p);
            },
            "%H": function (p) {
              return T(p.tm_hour, 2);
            },
            "%I": function (p) {
              var b = p.tm_hour;
              return b == 0 ? (b = 12) : b > 12 && (b -= 12), T(b, 2);
            },
            "%j": function (p) {
              return T(
                p.tm_mday + Ft(Ce(p.tm_year + 1900) ? ze : Ye, p.tm_mon - 1),
                3,
              );
            },
            "%m": function (p) {
              return T(p.tm_mon + 1, 2);
            },
            "%M": function (p) {
              return T(p.tm_min, 2);
            },
            "%n": function () {
              return `
`;
            },
            "%p": function (p) {
              return p.tm_hour >= 0 && p.tm_hour < 12 ? "AM" : "PM";
            },
            "%S": function (p) {
              return T(p.tm_sec, 2);
            },
            "%t": function () {
              return "	";
            },
            "%u": function (p) {
              return p.tm_wday || 7;
            },
            "%U": function (p) {
              var b = p.tm_yday + 7 - p.tm_wday;
              return T(Math.floor(b / 7), 2);
            },
            "%V": function (p) {
              var b = Math.floor((p.tm_yday + 7 - ((p.tm_wday + 6) % 7)) / 7);
              if (((p.tm_wday + 371 - p.tm_yday - 2) % 7 <= 2 && b++, b)) {
                if (b == 53) {
                  var Y = (p.tm_wday + 371 - p.tm_yday) % 7;
                  Y != 4 && (Y != 3 || !Ce(p.tm_year)) && (b = 1);
                }
              } else {
                b = 52;
                var X = (p.tm_wday + 7 - p.tm_yday - 1) % 7;
                (X == 4 || (X == 5 && Ce((p.tm_year % 400) - 1))) && b++;
              }
              return T(b, 2);
            },
            "%w": function (p) {
              return p.tm_wday;
            },
            "%W": function (p) {
              var b = p.tm_yday + 7 - ((p.tm_wday + 6) % 7);
              return T(Math.floor(b / 7), 2);
            },
            "%y": function (p) {
              return (p.tm_year + 1900).toString().substring(2);
            },
            "%Y": function (p) {
              return p.tm_year + 1900;
            },
            "%z": function (p) {
              var b = p.tm_gmtoff,
                X = b >= 0;
              return (
                (b = Math.abs(b) / 60),
                (b = (b / 60) * 100 + (b % 60)),
                (X ? "+" : "-") + String("0000" + b).slice(-4)
              );
            },
            "%Z": function (p) {
              return p.tm_zone;
            },
            "%%": function () {
              return "%";
            },
          };
          _ = _.replace(/%%/g, "\0\0");
          for (var d in J)
            _.includes(d) && (_ = _.replace(new RegExp(d, "g"), J[d](u)));
          _ = _.replace(/\0\0/g, "%");
          var x = gr(_, !1);
          return x.length > e ? 0 : (os(x, t), x.length - 1);
        }
        function ls(t, e, r, n, l) {
          return as(t, e, r, n);
        }
        function ee(t) {
          return parseInt(t);
        }
        function us(t, e, r) {
          for (
            var n = m(e), l = "\\!@#$^&*()+=-[]/{}|:<>?,.", u = 0, _ = l.length;
            u < _;
            ++u
          )
            n = n.replace(new RegExp("\\" + l[u], "g"), "\\" + l[u]);
          var f = {
            "%A": "%a",
            "%B": "%b",
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m\\/%d\\/%y",
            "%e": "%d",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%R": "%H\\:%M",
            "%r": "%I\\:%M\\:%S\\s%p",
            "%T": "%H\\:%M\\:%S",
            "%x": "%m\\/%d\\/(?:%y|%Y)",
            "%X": "%H\\:%M\\:%S",
          };
          for (var d in f) n = n.replace(d, f[d]);
          var h = {
              "%a": "(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)",
              "%b": "(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)",
              "%C": "\\d\\d",
              "%d": "0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31",
              "%H": "\\d(?!\\d)|[0,1]\\d|20|21|22|23",
              "%I": "\\d(?!\\d)|0\\d|10|11|12",
              "%j": "00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d",
              "%m": "0[1-9]|[1-9](?!\\d)|10|11|12",
              "%M": "0\\d|\\d(?!\\d)|[1-5]\\d",
              "%n": "\\s",
              "%p": "AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.",
              "%S": "0\\d|\\d(?!\\d)|[1-5]\\d|60",
              "%U": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
              "%W": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
              "%w": "[0-6]",
              "%y": "\\d\\d",
              "%Y": "\\d\\d\\d\\d",
              "%%": "%",
              "%t": "\\s",
            },
            C = {
              JAN: 0,
              FEB: 1,
              MAR: 2,
              APR: 3,
              MAY: 4,
              JUN: 5,
              JUL: 6,
              AUG: 7,
              SEP: 8,
              OCT: 9,
              NOV: 10,
              DEC: 11,
            },
            A = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 },
            T = { MON: 0, TUE: 1, WED: 2, THU: 3, FRI: 4, SAT: 5, SUN: 6 };
          for (var U in h) n = n.replace(U, "(" + U + h[U] + ")");
          for (var W = [], u = n.indexOf("%"); u >= 0; u = n.indexOf("%"))
            W.push(n[u + 1]),
              (n = n.replace(new RegExp("\\%" + n[u + 1], "g"), ""));
          var L = new RegExp("^" + n, "i").exec(m(t));
          function J() {
            function ge(me, $t, Er) {
              return typeof me != "number" || isNaN(me)
                ? $t
                : me >= $t
                ? me <= Er
                  ? me
                  : Er
                : $t;
            }
            return {
              year: ge(g[(r + 20) >>> 2] + 1900, 1970, 9999),
              month: ge(g[(r + 16) >>> 2], 0, 11),
              day: ge(g[(r + 12) >>> 2], 1, 31),
              hour: ge(g[(r + 8) >>> 2], 0, 23),
              min: ge(g[(r + 4) >>> 2], 0, 59),
              sec: ge(g[r >>> 2], 0, 59),
            };
          }
          if (L) {
            var x = J(),
              p,
              b = (ge) => {
                var me = W.indexOf(ge);
                if (me >= 0) return L[me + 1];
              };
            if (
              ((p = b("S")) && (x.sec = ee(p)),
              (p = b("M")) && (x.min = ee(p)),
              (p = b("H")))
            )
              x.hour = ee(p);
            else if ((p = b("I"))) {
              var X = ee(p);
              (p = b("p")) && (X += p.toUpperCase()[0] === "P" ? 12 : 0),
                (x.hour = X);
            }
            if ((p = b("Y"))) x.year = ee(p);
            else if ((p = b("y"))) {
              var Y = ee(p);
              (p = b("C")) ? (Y += ee(p) * 100) : (Y += Y < 69 ? 2e3 : 1900),
                (x.year = Y);
            }
            if (
              ((p = b("m"))
                ? (x.month = ee(p) - 1)
                : (p = b("b")) &&
                  (x.month = C[p.substring(0, 3).toUpperCase()] || 0),
              (p = b("d")))
            )
              x.day = ee(p);
            else if ((p = b("j")))
              for (var ae = ee(p), Ae = Ce(x.year), ct = 0; ct < 12; ++ct) {
                var br = Ft(Ae ? ze : Ye, ct - 1);
                ae <= br + (Ae ? ze : Ye)[ct] && (x.day = ae - br);
              }
            else if ((p = b("a"))) {
              var Tr = p.substring(0, 3).toUpperCase();
              if ((p = b("U"))) {
                var Be = A[Tr],
                  qe = ee(p),
                  de = new Date(x.year, 0, 1),
                  pe;
                de.getDay() === 0
                  ? (pe = Ge(de, Be + 7 * (qe - 1)))
                  : (pe = Ge(de, 7 - de.getDay() + Be + 7 * (qe - 1))),
                  (x.day = pe.getDate()),
                  (x.month = pe.getMonth());
              } else if ((p = b("W"))) {
                var Be = T[Tr],
                  qe = ee(p),
                  de = new Date(x.year, 0, 1),
                  pe;
                de.getDay() === 1
                  ? (pe = Ge(de, Be + 7 * (qe - 1)))
                  : (pe = Ge(de, 7 - de.getDay() + 1 + Be + 7 * (qe - 1))),
                  (x.day = pe.getDate()),
                  (x.month = pe.getMonth());
              }
            }
            var le = new Date(x.year, x.month, x.day, x.hour, x.min, x.sec, 0);
            return (
              (g[r >>> 2] = le.getSeconds()),
              (g[(r + 4) >>> 2] = le.getMinutes()),
              (g[(r + 8) >>> 2] = le.getHours()),
              (g[(r + 12) >>> 2] = le.getDate()),
              (g[(r + 16) >>> 2] = le.getMonth()),
              (g[(r + 20) >>> 2] = le.getFullYear() - 1900),
              (g[(r + 24) >>> 2] = le.getDay()),
              (g[(r + 28) >>> 2] =
                Ft(Ce(le.getFullYear()) ? ze : Ye, le.getMonth() - 1) +
                le.getDate() -
                1),
              (g[(r + 32) >>> 2] = 0),
              t + gr(L[0]).length - 1
            );
          }
          return 0;
        }
        (Xt = s.InternalError = wt(Error, "InternalError")),
          an(),
          (Se = s.BindingError = wt(Error, "BindingError")),
          En(),
          hn(),
          xn(),
          (sr = s.UnboundTypeError = wt(Error, "UnboundTypeError")),
          Vn();
        var cs = {
            g: Jr,
            K: Xr,
            Q: Zr,
            W: Kr,
            S: Qr,
            J: en,
            $: tn,
            E: sn,
            R: on,
            ia: ln,
            o: Nn,
            t: Dn,
            c: In,
            ha: Hn,
            N: Ln,
            s: zn,
            L: Gn,
            n: Bn,
            z: Jn,
            v: Xn,
            w: Zn,
            M: Kn,
            G: si,
            F: oi,
            y: ai,
            ja: li,
            ba: ci,
            j: fi,
            la: _i,
            m: hi,
            p: vi,
            a: Rt,
            q: gi,
            h: yi,
            u: wi,
            k: bi,
            d: Ti,
            O: Ei,
            r: Ai,
            C: Oi,
            l: Si,
            H: Pi,
            f: Ri,
            A: ki,
            i: xi,
            B: ji,
            da: Di,
            ea: Ii,
            X: Mi,
            Y: Ui,
            fa: Vi,
            e: Hi,
            b: zi,
            ca: Yi,
            U: Gi,
            aa: vr,
            ga: Bi,
            T: Ji,
            Z: Ki,
            _: Qi,
            D: es,
            I: ts,
            P: rs,
            V: ss,
            x: ls,
            ka: us,
          },
          zs = zr(),
          fs = function () {
            return (fs = s.asm.na).apply(null, arguments);
          },
          lt = function () {
            return (lt = s.asm.oa).apply(null, arguments);
          },
          _e = function () {
            return (_e = s.asm.pa).apply(null, arguments);
          },
          _s = function () {
            return (_s = s.asm.__errno_location).apply(null, arguments);
          },
          mr = (s.___getTypeName = function () {
            return (mr = s.___getTypeName = s.asm.ra).apply(null, arguments);
          }),
          ds = (s.__embind_initialize_bindings = function () {
            return (ds = s.__embind_initialize_bindings = s.asm.sa).apply(
              null,
              arguments,
            );
          }),
          yr = function () {
            return (yr = s.asm.ta).apply(null, arguments);
          },
          ps = (s.dynCall_ji = function () {
            return (ps = s.dynCall_ji = s.asm.ua).apply(null, arguments);
          }),
          hs = (s.dynCall_viij = function () {
            return (hs = s.dynCall_viij = s.asm.va).apply(null, arguments);
          }),
          vs = (s.dynCall_viiij = function () {
            return (vs = s.dynCall_viiij = s.asm.wa).apply(null, arguments);
          }),
          gs = (s.dynCall_viiijj = function () {
            return (gs = s.dynCall_viiijj = s.asm.xa).apply(null, arguments);
          }),
          ms = (s.dynCall_viji = function () {
            return (ms = s.dynCall_viji = s.asm.ya).apply(null, arguments);
          }),
          ys = (s.dynCall_viijji = function () {
            return (ys = s.dynCall_viijji = s.asm.za).apply(null, arguments);
          }),
          ws = (s.dynCall_viijjji = function () {
            return (ws = s.dynCall_viijjji = s.asm.Aa).apply(null, arguments);
          }),
          bs = (s.dynCall_viijj = function () {
            return (bs = s.dynCall_viijj = s.asm.Ba).apply(null, arguments);
          }),
          Ts = (s.dynCall_viiji = function () {
            return (Ts = s.dynCall_viiji = s.asm.Ca).apply(null, arguments);
          }),
          Es = (s.dynCall_viijij = function () {
            return (Es = s.dynCall_viijij = s.asm.Da).apply(null, arguments);
          }),
          Cs = (s.dynCall_viijiji = function () {
            return (Cs = s.dynCall_viijiji = s.asm.Ea).apply(null, arguments);
          }),
          As = (s.dynCall_jiji = function () {
            return (As = s.dynCall_jiji = s.asm.Fa).apply(null, arguments);
          }),
          Os = (s.dynCall_viiiijii = function () {
            return (Os = s.dynCall_viiiijii = s.asm.Ga).apply(null, arguments);
          }),
          Ss = (s.dynCall_viijii = function () {
            return (Ss = s.dynCall_viijii = s.asm.Ha).apply(null, arguments);
          }),
          Ps = (s.dynCall_iiiiij = function () {
            return (Ps = s.dynCall_iiiiij = s.asm.Ia).apply(null, arguments);
          }),
          Rs = (s.dynCall_iiiiijj = function () {
            return (Rs = s.dynCall_iiiiijj = s.asm.Ja).apply(null, arguments);
          }),
          ks = (s.dynCall_iiiiiijj = function () {
            return (ks = s.dynCall_iiiiiijj = s.asm.Ka).apply(null, arguments);
          }),
          ut;
        Fe = function t() {
          ut || wr(), ut || (Fe = t);
        };
        function wr() {
          if (be > 0 || (Fr(), be > 0)) return;
          function t() {
            ut ||
              ((ut = !0),
              (s.calledRun = !0),
              !Ze &&
                ($r(),
                E(s),
                s.onRuntimeInitialized && s.onRuntimeInitialized(),
                Nr()));
          }
          s.setStatus
            ? (s.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  s.setStatus("");
                }, 1),
                  t();
              }, 1))
            : t();
        }
        if (s.preInit)
          for (
            typeof s.preInit == "function" && (s.preInit = [s.preInit]);
            s.preInit.length > 0;

          )
            s.preInit.pop()();
        return wr(), o.ready;
      };
    })(),
    Ar = Fs;
  var ft = {};
  js(ft, {
    COLUMN_SEPARATOR_STRING: () => ue,
    CONFIG_ALIASES: () => Pe,
    CONFIG_VALID_KEYS: () => Dt,
    DATA_TYPES: () => $s,
    FILTER_OPERATORS: () => $,
    SORT_ORDERS: () => Ds,
    SORT_ORDER_IDS: () => Is,
    TYPE_AGGREGATES: () => Ms,
    TYPE_FILTERS: () => Hs,
  });
  var $s = {
      integer: "integer",
      float: "float",
      string: "string",
      boolean: "boolean",
      date: "date",
      datetime: "datetime",
      object: "object",
    },
    Pe = {
      row_pivot: "group_by",
      "row-pivot": "group_by",
      "row-pivots": "group_by",
      col_pivot: "split_by",
      col_pivots: "split_by",
      column_pivot: "split_by",
      "column-pivot": "split_by",
      "column-pivots": "split_by",
      filters: "filter",
      sorts: "sort",
    },
    Dt = [
      "viewport",
      "group_by",
      "split_by",
      "aggregates",
      "columns",
      "filter",
      "sort",
      "computed_columns",
      "expressions",
      "group_by_depth",
      "split_by_depth",
      "filter_op",
    ],
    Or = [
      "any",
      "avg",
      "abs sum",
      "count",
      "distinct count",
      "dominant",
      "first by index",
      "last by index",
      "last minus first",
      "last",
      "high",
      "join",
      "low",
      "high minus low",
      "max",
      "mean",
      "median",
      "min",
      "pct sum parent",
      "pct sum grand total",
      "stddev",
      "sum",
      "sum abs",
      "sum not null",
      "unique",
      "var",
    ],
    Nt = [
      "any",
      "count",
      "distinct count",
      "distinct leaf",
      "dominant",
      "first by index",
      "join",
      "last by index",
      "last",
      "unique",
    ],
    Ns = [
      "any",
      "count",
      "distinct count",
      "distinct leaf",
      "dominant",
      "first by index",
      "last by index",
      "last",
      "unique",
    ],
    Ds = [
      "none",
      "asc",
      "desc",
      "col asc",
      "col desc",
      "asc abs",
      "desc abs",
      "col asc abs",
      "col desc abs",
    ],
    Is = [2, 0, 1, 0, 1, 3, 4, 3, 4],
    Ms = {
      string: Nt,
      float: Or,
      integer: Or,
      boolean: Ns,
      datetime: Nt,
      date: Nt,
    },
    $ = {
      lessThan: "<",
      greaterThan: ">",
      equals: "==",
      lessThanOrEquals: "<=",
      greaterThanOrEquals: ">=",
      doesNotEqual: "!=",
      isNull: "is null",
      isNotNull: "is not null",
      isIn: "in",
      isNotIn: "not in",
      contains: "contains",
      bitwiseAnd: "&",
      bitwiseOr: "|",
      and: "and",
      or: "or",
      beginsWith: "begins with",
      endsWith: "ends with",
    },
    Us = [
      $.bitwiseAnd,
      $.bitwiseOr,
      $.equals,
      $.doesNotEqual,
      $.or,
      $.and,
      $.isNull,
      $.isNotNull,
    ],
    Sr = [
      $.lessThan,
      $.greaterThan,
      $.equals,
      $.lessThanOrEquals,
      $.greaterThanOrEquals,
      $.doesNotEqual,
      $.isNull,
      $.isNotNull,
    ],
    Vs = [
      $.equals,
      $.contains,
      $.doesNotEqual,
      $.isIn,
      $.isNotIn,
      $.beginsWith,
      $.endsWith,
      $.isNull,
      $.isNotNull,
    ],
    Pr = [
      $.lessThan,
      $.greaterThan,
      $.equals,
      $.lessThanOrEquals,
      $.greaterThanOrEquals,
      $.doesNotEqual,
      $.isNull,
      $.isNotNull,
    ],
    ue = "|",
    Hs = {
      string: Vs,
      float: Sr,
      integer: Sr,
      boolean: Us,
      datetime: Pr,
      date: Pr,
    };
  var It = {
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
  function Re(w) {
    let o = {};
    if ((Rr().types[w] && Object.assign(o, Rr().types[w]), o.type)) {
      let s = Re(o.type);
      return Object.assign(s, o), s;
    } else return o;
  }
  function Mt(w) {
    return w && typeof w == "object" && !Array.isArray(w);
  }
  function _t(w, ...o) {
    if (!o.length) return w;
    let s = o.shift();
    if (Mt(w) && Mt(s))
      for (let E in s)
        Mt(s[E])
          ? (w[E] || Object.assign(w, { [E]: {} }), _t(w[E], s[E]))
          : Object.assign(w, { [E]: s[E] });
    return _t(w, ...o);
  }
  function kr(w) {
    globalThis.__PERSPECTIVE_CONFIG__ &&
      console.warn("Config already initialized!"),
      (globalThis.__PERSPECTIVE_CONFIG__ = _t(It, w));
  }
  function Rr() {
    return (
      globalThis.__PERSPECTIVE_CONFIG__ ||
        (globalThis.__PERSPECTIVE_CONFIG__ = _t(
          It,
          globalThis.__TEMPLATE_CONFIG__ || {},
        )),
      globalThis.__PERSPECTIVE_CONFIG__
    );
  }
  function dt(w) {
    if (w >= 1 && w <= 8) return "integer";
    if (w === 19) return "string";
    if (w === 10 || w === 9) return "float";
    if (w === 11) return "boolean";
    if (w === 12) return "datetime";
    if (w === 13) return "date";
    console.warn(`Unknown type for value ${w} with JS type ${typeof w}`);
  }
  function Ut(w) {
    let o = w;
    do
      for (let s of Object.getOwnPropertyNames(o)) {
        let E = w[s];
        s !== "constructor" && typeof E == "function" && (w[s] = E.bind(w));
      }
    while ((o = o !== Object && Object.getPrototypeOf(o)));
  }
  String.prototype.includes ||
    (String.prototype.includes = function (w, o) {
      return (
        typeof o != "number" && (o = 0),
        o + w.length > this.length ? !1 : this.indexOf(w, o) !== -1
      );
    });
  Array.prototype.includes ||
    Object.defineProperty(Array.prototype, "includes", {
      value: function (w, o) {
        if (this == null) throw new TypeError('"this" is null or not defined');
        var s = Object(this),
          E = s.length >>> 0;
        if (E === 0) return !1;
        var N = o | 0,
          F = Math.max(N >= 0 ? N : E - Math.abs(N), 0);
        function D(z, G) {
          return (
            z === G ||
            (typeof z == "number" &&
              typeof G == "number" &&
              isNaN(z) &&
              isNaN(G))
          );
        }
        for (; F < E; ) {
          if (D(s[F], w)) return !0;
          F++;
        }
        return !1;
      },
    });
  var pt = class {
    constructor() {
      (this.data_formats = { row: 0, column: 1, schema: 2 }),
        (this.format = void 0),
        (this.data = void 0),
        (this.names = void 0),
        (this.types = void 0),
        (this.row_count = void 0);
    }
    is_format(o) {
      if (Array.isArray(o)) return this.data_formats.row;
      if (Array.isArray(o[Object.keys(o)[0]])) return this.data_formats.column;
      if (
        typeof o[Object.keys(o)[0]] == "string" ||
        typeof o[Object.keys(o)[0]] == "function"
      )
        return this.data_formats.schema;
      throw `Could not determine data format for ${JSON.stringify(
        o,
      )}, with JS typeof ${typeof o}`;
    }
    count_rows(o) {
      return this.format === this.data_formats.row
        ? o.length
        : this.format === this.data_formats.column
        ? o[Object.keys(o)[0]].length
        : 0;
    }
    get_format() {
      return this.format;
    }
    get(o, s) {
      let E;
      if (this.format === this.data_formats.row) {
        let N = this.data[s];
        N.hasOwnProperty(o) && (E = N[o]);
      } else if (this.format === this.data_formats.column)
        this.data.hasOwnProperty(o) && (E = this.data[o][s]);
      else if (this.format === this.data_formats.schema) E = void 0;
      else
        throw `Could not get() from dataset - ${this.data} is poorly formatted.`;
      return E;
    }
    marshal(o, s, E) {
      let N = this.names[o],
        F = Ws(this.get(N, s));
      if (F === null) return null;
      if (!(typeof F > "u")) {
        switch (dt(E.value)) {
          case "float":
          case "integer": {
            F = Number(F);
            break;
          }
          case "boolean": {
            typeof F == "string"
              ? F.toLowerCase() === "true"
                ? (F = !0)
                : (F = !1)
              : (F = !!F);
            break;
          }
          case "datetime":
          case "date":
            break;
          default:
            F += "";
        }
        return F;
      }
    }
    clean() {
      (this.names = void 0), (this.types = void 0);
    }
    init(o) {
      (this.data = o),
        (this.format = this.is_format(this.data)),
        (this.row_count = this.count_rows(this.data));
      let s = {};
      if (this.format === this.data_formats.row)
        o.length > 0
          ? (this.names = Object.keys(o[0]))
          : (this.clean.names = []);
      else if (this.format === this.data_formats.column)
        this.names = Object.keys(o);
      else if (this.format === this.data_formats.schema) {
        this.names = Object.keys(o);
        for (let E of this.names) {
          let N = Re(o[E]);
          N.type &&
            (console.debug(`Converting "${o[E]}" to "${N.type}"`),
            (s[E] = o[E]),
            (o[E] = N.type));
        }
      } else throw `Could not initialize - failed to determine format for ${o}`;
      return s;
    }
  };
  function Ws(w) {
    return w === null || w === "null"
      ? null
      : w === void 0 || w === "undefined"
      ? void 0
      : w;
  }
  var Vt = function (w) {
      let o = [];
      for (let s = 0; s < w.size(); s++) {
        let E = w.get(s);
        o.push(E);
      }
      return w.delete(), o;
    },
    Ht = function (w) {
      let o = {},
        s = w.keys();
      for (let E = 0; E < s.size(); E++) {
        let N = s.get(E);
        o[N] = w.get(N);
      }
      return w.delete(), s.delete(), o;
    },
    ke = function (w, o) {
      for (let s of o) w.push_back(s);
      return w;
    };
  function Ls(w) {
    let o = {};
    return (
      typeof w != "string"
        ? Object.getOwnPropertyNames(w).forEach((s) => {
            o[s] = w[s];
          }, w)
        : (o.message = w),
      o
    );
  }
  var Je = class {
    constructor(o) {
      (this.perspective = o),
        (this._tables = {}),
        (this._views = {}),
        (this._callback_cache = new Map());
    }
    init(o) {
      o.config && kr(o.config), (o.data = ["wait_for_response"]), this.post(o);
    }
    post(o) {
      throw new Error(`Posting ${o} failed - post() not implemented!`);
    }
    process(o, s) {
      switch (o.cmd) {
        case "init_profile_thread":
          this.perspective.initialize_profile_thread();
          break;
        case "get_hosted_table_names":
          this.post({ id: o.id, data: Object.keys(this._tables) });
          break;
        case "memory_usage":
          this.post({ id: o.id, data: this.perspective.memory_usage() });
          break;
        case "init":
          this.init(o);
          break;
        case "table":
          if (typeof o.args[0] > "u") this._tables[o.name] = [];
          else
            try {
              let D = this._tables[o.name],
                z = this.perspective.table(o.args[0], o.options);
              if (z && z.then)
                z.then((G) => {
                  if (((this._tables[o.name] = G), D))
                    for (let re of D) this.process(re);
                  this.post({ id: o.id, data: o.name });
                }).catch((G) => this.process_error(o, G));
              else {
                if (((this._tables[o.name] = z), D))
                  for (let G of D) this.process(G);
                this.post({ id: o.id, data: o.name });
              }
            } catch (D) {
              this.process_error(o, D);
              return;
            }
          break;
        case "table_generate":
          (0, eval)(o.args)(function (D) {
            (this._tables[o.name] = D),
              this.post({ id: o.id, data: "created!" });
          });
          break;
        case "table_execute":
          (0, eval)(o.f)(this._tables[o.name]);
          break;
        case "table_method":
        case "view_method":
          this.process_method_call(o);
          break;
        case "view":
          let F = this._tables[o.table_name];
          if (F && Array.isArray(F)) F.push(o), (this._views[o.view_name] = []);
          else
            try {
              let D = this._views[o.view_name],
                z = this._tables[o.table_name].view(o.config);
              if (z && z.then)
                z.then((G) => {
                  if (
                    ((this._views[o.view_name] = G),
                    (this._views[o.view_name].client_id = s),
                    D)
                  )
                    for (let re of D) this.process(re);
                  this.post({ id: o.id, data: o.view_name });
                }).catch((G) => this.process_error(o, G));
              else {
                if (
                  ((this._views[o.view_name] = z),
                  (this._views[o.view_name].client_id = s),
                  D)
                )
                  for (let G of D) this.process(G);
                this.post({ id: o.id, data: o.view_name });
              }
            } catch (D) {
              this.process_error(o, D);
              return;
            }
          break;
      }
    }
    process_subscribe(o, s) {
      try {
        let E;
        o.method.slice(0, 2) === "on"
          ? ((E = (N) => {
              let F = { id: o.id, data: N };
              try {
                if (
                  o.args &&
                  o.args[0] &&
                  o.method === "on_update" &&
                  o.args[0].mode === "row"
                ) {
                  this.post(F, [N.delta]);
                  return;
                }
                this.post(F);
              } catch {
                console.error(
                  `Removing failed callback to \`${o.method}()\` (presumably due to failed connection)`,
                );
                let z = o.method.substring(3);
                s[`remove_${z}`](E);
              }
            }),
            o.callback_id && this._callback_cache.set(o.callback_id, E))
          : o.callback_id &&
            ((E = this._callback_cache.get(o.callback_id)),
            this._callback_cache.delete(o.callback_id)),
          E
            ? s[o.method](E, ...o.args)
            : console.error(
                `Callback not found for remote call "${JSON.stringify(o)}"`,
              );
      } catch (E) {
        this.process_error(o, E);
        return;
      }
    }
    process_method_call(o) {
      let s,
        E,
        N = o.view_name || o.name;
      if (
        (o.cmd === "table_method"
          ? (s = this._tables[N])
          : (s = this._views[N]),
        !s && o.cmd === "view_method")
      ) {
        this.process_error(o, { message: "View method cancelled" });
        return;
      }
      if (s && s.push) {
        s.push(o);
        return;
      }
      try {
        if (o.subscribe) {
          this.process_subscribe(o, s);
          return;
        } else
          (E = s[o.method].apply(s, o.args)),
            E instanceof Promise
              ? E.then((F) => this.process_method_call_response(o, F)).catch(
                  (F) => this.process_error(o, F),
                )
              : this.process_method_call_response(o, E);
      } catch (F) {
        this.process_error(o, F);
        return;
      }
    }
    process_method_call_response(o, s) {
      o.method === "delete" && delete this._views[o.name],
        o.method === "to_arrow"
          ? this.post({ id: o.id, data: s }, [s])
          : this.post({ id: o.id, data: s });
    }
    process_error(o, s) {
      try {
        this.post({ id: o.id, error: Ls(s) });
      } catch {
        console.error("Error handler failed: {}", s);
      }
    }
    clear_views(o) {
      for (let s of Object.keys(this._views))
        if (this._views[s].client_id === o) {
          try {
            this._views[s].delete();
          } catch (E) {
            console.error(E);
          }
          delete this._views[s];
        }
      console.debug(`GC ${Object.keys(this._views).length} views in memory`);
    }
  };
  typeof self < "u" &&
    self.performance === void 0 &&
    (self.performance = { now: Date.now });
  var ht = new Set();
  function xr(w) {
    let o = w,
      s = new pt(),
      E = ["zero", "one", "two"],
      N = {};
    function F(i, a) {
      N[a] ? i.delete() : ((N[a] = i), setTimeout(() => D(a)));
    }
    function D(i) {
      let a = N[i];
      a && (a._process(), z(i));
    }
    function z(i) {
      N[i]?.delete(), delete N[i];
    }
    function G() {
      let i = performance.memory
        ? JSON.parse(
            JSON.stringify(performance.memory, [
              "totalJSHeapSize",
              "usedJSHeapSize",
              "jsHeapSizeLimit",
            ]),
          )
        : process.memoryUsage();
      return (i.wasmHeap = o.HEAP8.length), i;
    }
    function re(i, a, c, v, m, O, P, y, k) {
      c || (c = ""),
        v || (v = 4294967295),
        (a = o.make_table(a, i, v, c, m, O, P, y, k));
      let S = a.get_pool(),
        I = a.get_id();
      return (
        O || m == o.t_op.OP_DELETE ? F(S, I) : (S._process(), S.delete()), a
      );
    }
    function j(i, a, c, v, m) {
      (this.name = m),
        (this._View = void 0),
        (this.table = i),
        (this.config = c || {}),
        (this.view_config = v || new v()),
        (this.is_unit_context =
          this.table.index === "" &&
          a === 0 &&
          this.view_config.group_by.length === 0 &&
          this.view_config.split_by.length === 0 &&
          this.view_config.filter.length === 0 &&
          this.view_config.sort.length === 0 &&
          this.view_config.expressions.length === 0),
        this.is_unit_context
          ? (this._View = o.make_view_unit(
              i._Table,
              m,
              ue,
              this.view_config,
              null,
            ))
          : a === 0
          ? (this._View = o.make_view_zero(
              i._Table,
              m,
              ue,
              this.view_config,
              null,
            ))
          : a === 1
          ? (this._View = o.make_view_one(
              i._Table,
              m,
              ue,
              this.view_config,
              null,
            ))
          : a === 2 &&
            (this._View = o.make_view_two(
              i._Table,
              m,
              ue,
              this.view_config,
              null,
            )),
        (this.ctx = this._View.get_context()),
        (this.column_only = this._View.is_column_only()),
        (this.update_callbacks = this.table.update_callbacks),
        (this.overridden_types = this.table.overridden_types),
        (this._delete_callbacks = []),
        Ut(this);
    }
    (j.prototype.get_config = function () {
      return JSON.parse(JSON.stringify(this.config));
    }),
      (j.prototype.delete = function () {
        z(this.table.get_id()),
          this._View.delete(),
          this.ctx.delete(),
          this.table.views.splice(this.table.views.indexOf(this), 1),
          (this.table = void 0);
        let i = 0,
          a = 0;
        for (; i < this.update_callbacks.length; ) {
          let c = this.update_callbacks[i];
          c.view !== this && (this.update_callbacks[a++] = c), i++;
        }
        (this.update_callbacks.length = a),
          this._delete_callbacks.forEach((c) => c());
      }),
      (j.prototype.sides = function () {
        return this._View.sides();
      }),
      (j.prototype._num_hidden = function () {
        let i = 0;
        for (let a of this.config.sort)
          this.config.columns.indexOf(a[0]) === -1 && i++;
        return i;
      });
    function K(i) {
      let a = [];
      for (let c = 0; c < i.size(); c++) {
        let v = i.get(c);
        a.push(o.scalar_to_val(v, !1, !0)), v.delete();
      }
      return i.delete(), a;
    }
    let Xe = function (i) {
      let a = [];
      for (let c = 0; c < i.size(); c++) {
        let v = i.get(c);
        a.push(K(v));
      }
      return i.delete(), a;
    };
    (j.prototype.schema = function (i = !0) {
      let a = Ht(this._View.schema());
      if (i)
        for (let c of Object.keys(a)) {
          let v = c.split(ue);
          (v = v[v.length - 1]),
            this.overridden_types[v] &&
              Re(this.overridden_types[v]).type === a[c] &&
              (a[c] = this.overridden_types[v]);
        }
      return a;
    }),
      (j.prototype.expression_schema = function (i = !0) {
        let a = Ht(this._View.expression_schema());
        if (i)
          for (let c of Object.keys(a)) {
            let v = c.split(ue);
            (v = v[v.length - 1]),
              this.overridden_types[v] &&
                Re(this.overridden_types[v]).type === a[c] &&
                (a[c] = this.overridden_types[v]);
          }
        return a;
      }),
      (j.prototype._column_names = function (i = !1, a = 0) {
        return Xe(this._View.column_names(i, a)).map((c) => c.join(ue));
      }),
      (j.prototype.column_paths = function () {
        return Xe(this._View.column_paths()).map((i) => i.join(ue));
      }),
      (j.prototype.get_data_slice = function (i, a, c, v) {
        if (this.is_unit_context)
          return o.get_data_slice_unit(this._View, i, a, c, v);
        {
          let m = this.sides(),
            O = E[m];
          return o[`get_data_slice_${O}`](this._View, i, a, c, v);
        }
      });
    let xe = function (i) {
      i = i || {};
      let a = this._View.num_columns() + (this.sides() === 0 ? 0 : 1),
        c = this._View.num_rows(),
        v = this._num_hidden(),
        m = this.sides() > 0 || this.column_only ? 1 : 0,
        O = this.config.viewport ? this.config.viewport : {},
        P = i.start_row || (O.top ? O.top : 0),
        y = Math.min(
          c,
          i.end_row !== void 0 ? i.end_row : O.height ? P + O.height : c,
        ),
        k = i.start_col || (O.left ? O.left : 0),
        S = Math.min(
          a,
          (i.end_col !== void 0 ? i.end_col + m : O.width ? k + O.width : a) *
            (v + 1),
        );
      return (
        (i.start_row = Math.floor(P)),
        (i.end_row = Math.ceil(y)),
        (i.start_col = Math.floor(k)),
        (i.end_col = Math.ceil(S)),
        i
      );
    };
    j.prototype.get_min_max = function (i) {
      if (this.is_unit_context) return o.get_min_max_unit(this._View, i);
      {
        let a = this.sides(),
          c = E[a];
        return o[`get_min_max_${c}`](this._View, i);
      }
    };
    let vt = function (i, a, c) {
      let v = this.num_rows(),
        m = a.start_row || 0,
        O = a.end_row || v,
        y = this._column_names().indexOf(i);
      if (y === -1) return;
      this.sides() > 0 && y++;
      let S, I;
      a.data_slice
        ? (S = a.data_slice.get_column_slice(y))
        : ((I = this.get_data_slice(m, O, y, y + 1)), (S = I.get_slice()));
      let B = this._View.get_column_dtype(y),
        g = c(S, B, y);
      return S.delete(), I && I.delete(), g;
    };
    (j.prototype.to_columns = function (i) {
      return JSON.parse(this.to_columns_string(i));
    }),
      (j.prototype.to_columns_string = function (i) {
        D(this.table.get_id()), (i = xe.bind(this)(i));
        let a = i.start_row,
          c = i.end_row,
          v = i.start_col,
          m = i.end_col,
          O = this._num_hidden(),
          P = i.formatted,
          y = !!i.index,
          k = !!i.id,
          S = !!i.leaves_only,
          I = this.sides(),
          B = I !== 0 && !this.column_only,
          g = E[I],
          R = this.get_config(),
          ie = R.columns.length,
          we = R.group_by.length;
        return this._View.to_columns(
          a,
          c,
          v,
          m,
          O,
          P,
          y,
          k,
          S,
          I,
          B,
          g,
          ie,
          we,
        );
      }),
      (j.prototype.to_json = function (i) {
        let a = this.to_columns(i),
          c = Object.keys(a);
        return (a[c[0]] || []).map((m, O) => {
          let P = {};
          for (let y of c) P[y] = a[y][O];
          return P;
        });
      }),
      (j.prototype.to_csv = function (i) {
        D(this.table.get_id()), (i = xe.bind(this)(i));
        let a = i.start_row,
          c = i.end_row,
          v = i.start_col,
          m = i.end_col,
          O = this.sides();
        if (this.is_unit_context) return o.to_csv_unit(this._View, a, c, v, m);
        if (O === 0) return o.to_csv_zero(this._View, a, c, v, m);
        if (O === 1) return o.to_csv_one(this._View, a, c, v, m);
        if (O === 2) return o.to_csv_two(this._View, a, c, v, m);
      }),
      (j.prototype.col_to_js_typed_array = function (i, a = {}) {
        D(this.table.get_id());
        let c = o.col_to_js_typed_array;
        return vt.call(this, i, a, c);
      }),
      (j.prototype.to_arrow = function (i = {}) {
        D(this.table.get_id()), (i = xe.bind(this)(i));
        let a = i.start_row,
          c = i.end_row,
          v = i.start_col,
          m = i.end_col,
          O = this.sides(),
          P = "compression" in i ? i.compression === "lz4" : !0;
        if (this.is_unit_context)
          return o.to_arrow_unit(this._View, a, c, v, m, P);
        if (O === 0) return o.to_arrow_zero(this._View, a, c, v, m, P);
        if (O === 1) return o.to_arrow_one(this._View, a, c, v, m, P);
        if (O === 2) return o.to_arrow_two(this._View, a, c, v, m, P);
      }),
      (j.prototype.num_rows = function () {
        return D(this.table.get_id()), this._View.num_rows();
      }),
      (j.prototype.num_columns = function () {
        let i = this._View.num_columns(),
          a = this._num_hidden();
        return i - (i / (this.config.columns.length + a)) * a;
      }),
      (j.prototype.dimensions = function () {
        return {
          num_table_rows: this.table.num_rows(),
          num_table_columns: this.table.num_columns(),
          num_view_rows: this._View.num_rows(),
          num_view_columns: this.num_columns(),
        };
      }),
      (j.prototype.get_row_expanded = function (i) {
        return this._View.get_row_expanded(i);
      }),
      (j.prototype.expand = function (i) {
        return this._View.expand(i, this.config.group_by.length);
      }),
      (j.prototype.collapse = function (i) {
        return this._View.collapse(i);
      }),
      (j.prototype.set_depth = function (i) {
        return this._View.set_depth(i, this.config.group_by.length);
      }),
      (j.prototype._get_step_delta = async function () {
        let i = this._View.get_step_delta(0, 2147483647),
          a;
        if (i.cells.size() === 0) a = this.to_json();
        else {
          let c = {};
          for (let m = 0; m < i.cells.size(); m++) c[i.cells.get(m).row] = !0;
          c = Object.keys(c);
          let v = c.map((m) =>
            this.to_json({
              start_row: Number.parseInt(m),
              end_row: Number.parseInt(m) + 1,
            }),
          );
          a = [].concat.apply([], v);
        }
        return i.cells.delete(), a;
      }),
      (j.prototype._get_row_delta = async function () {
        if (this.is_unit_context) return o.get_row_delta_unit(this._View);
        {
          let i = this.sides(),
            a = E[i];
          return o[`get_row_delta_${a}`](this._View);
        }
      }),
      (j.prototype.on_update = function (i, { mode: a = "none" } = {}) {
        if ((D(this.table.get_id()), ["none", "row"].indexOf(a) === -1))
          throw new Error(
            `Invalid update mode "${a}" - valid modes are "none" and "row".`,
          );
        a === "row" &&
          (this._View._get_deltas_enabled() ||
            this._View._set_deltas_enabled(!0)),
          this.update_callbacks.push({
            view: this,
            orig_callback: i,
            callback: async (c, v) => {
              v[c] === void 0 && (v[c] = {});
              let m = { port_id: c };
              a === "row" &&
                (v[c].row_delta === void 0 &&
                  (v[c].row_delta = await this._get_row_delta()),
                (m.delta = v[c].row_delta)),
                i(m);
            },
          });
      });
    function ye(i, a) {
      let c = 0,
        v = 0;
      for (; c < i.length; ) {
        let m = i[c];
        a(m, c, i) && (i[v++] = m), c++;
      }
      return (i.length = v), i;
    }
    (j.prototype.remove_update = function (i) {
      D(this.table.get_id());
      let a = this.update_callbacks.length;
      ye(this.update_callbacks, (c) => c.orig_callback !== i),
        console.assert(
          a > this.update_callbacks.length,
          '"callback" does not match a registered updater',
        );
    }),
      (j.prototype.on_delete = function (i) {
        this._delete_callbacks.push(i);
      }),
      (j.prototype.remove_delete = function (i) {
        let a = this._delete_callbacks.length;
        ye(this._delete_callbacks, (c) => c !== i),
          console.assert(
            a > this._delete_callbacks.length,
            '"callback" does not match a registered delete callbacks',
          );
      });
    function ce(i) {
      (this.group_by = i.group_by || []),
        (this.split_by = i.split_by || []),
        (this.aggregates = i.aggregates || {}),
        (this.columns = i.columns),
        (this.filter = i.filter || []),
        (this.sort = i.sort || []),
        (this.expressions = i.expressions || []),
        (this.filter_op = i.filter_op || "and"),
        (this.group_by_depth = i.group_by_depth),
        (this.split_by_depth = i.split_by_depth);
    }
    (ce.prototype.get_group_by = function () {
      let i = o.make_string_vector();
      return ke(i, this.group_by);
    }),
      (ce.prototype.get_split_by = function () {
        let i = o.make_string_vector();
        return ke(i, this.split_by);
      }),
      (ce.prototype.get_columns = function () {
        let i = o.make_string_vector();
        return ke(i, this.columns);
      }),
      (ce.prototype.get_filter = function () {
        let i = o.make_2d_val_vector();
        for (let a of this.filter) {
          let c = o.make_val_vector(),
            v = ke(c, a);
          i.push_back(v);
        }
        return i;
      }),
      (ce.prototype.get_sort = function () {
        let i = o.make_2d_string_vector();
        for (let a of this.sort) {
          let c = o.make_string_vector(),
            v = ke(c, a);
          i.push_back(v);
        }
        return i;
      }),
      (ce.prototype.get_expressions = function () {
        let i = o.make_2d_val_vector();
        for (let a of this.expressions) {
          let c = o.make_val_vector();
          for (let v of a) c.push_back(v);
          i.push_back(c);
        }
        return i;
      });
    function H(i, a, c, v) {
      this._Table = i;
      let m = this._Table.get_gnode();
      (this.gnode_id = m.get_id()), m.delete();
      let O = this._Table.get_pool();
      O.set_update_delegate(this),
        O.delete(),
        (this.name = Math.random() + ""),
        (this.initialized = !1),
        (this.index = a),
        (this.limit = c),
        (this.update_callbacks = []),
        (this._delete_callbacks = []),
        (this.views = []),
        (this.overridden_types = v),
        Ut(this);
    }
    (H.prototype.get_id = function () {
      return this._Table.get_id();
    }),
      (H.prototype.get_pool = function () {
        return this._Table.get_pool();
      }),
      (H.prototype.make_port = function () {
        return this._Table.make_port();
      }),
      (H.prototype.remove_port = function () {
        this._Table.remove_port();
      }),
      (H.prototype._update_callback = function (i) {
        let a = {};
        for (let c in this.update_callbacks)
          this.update_callbacks[c].callback(i, a);
      }),
      (H.prototype.get_index = function () {
        return this.index;
      }),
      (H.prototype.get_limit = function () {
        return this.limit;
      }),
      (H.prototype.clear = function () {
        D(this.get_id()), this._Table.reset_gnode(this.gnode_id);
      }),
      (H.prototype.get_num_views = function () {
        return this.views.length;
      }),
      (H.prototype.replace = function (i) {
        z(this.get_id()),
          this._Table.reset_gnode(this.gnode_id),
          this.update(i),
          D(this.get_id());
      }),
      (H.prototype.delete = function () {
        if (this.views.length > 0)
          throw `Cannot delete Table as it still has ${this.views.length} registered View(s).`;
        z(this.get_id()),
          this._Table.unregister_gnode(this.gnode_id),
          this._Table.delete();
        for (let i of this._delete_callbacks) i();
      }),
      (H.prototype.on_delete = function (i) {
        this._delete_callbacks.push(i);
      }),
      (H.prototype.remove_delete = function (i) {
        let a = this._delete_callbacks.length;
        ye(this._delete_callbacks, (c) => c !== i),
          console.assert(
            a > this._delete_callbacks.length,
            '"callback" does not match a registered delete callbacks',
          );
      }),
      (H.prototype.size = function () {
        return D(this._Table.get_id()), this._Table.size();
      }),
      (H.prototype.num_rows = function () {
        return this.size();
      }),
      (H.prototype.num_columns = function () {
        let i = this._Table.get_schema(),
          a = i.columns(),
          c = a.size();
        return a.delete(), i.delete(), c - 1;
      }),
      (H.prototype.schema = function (i = !0) {
        let a = this._Table.get_schema(),
          c = a.columns(),
          v = a.types(),
          m = {};
        for (let O = 0; O < c.size(); O++) {
          let P = c.get(O);
          P !== "psp_okey" &&
            (i && this.overridden_types[P]
              ? (m[P] = this.overridden_types[P])
              : (m[P] = dt(v.get(O).value)));
        }
        return a.delete(), c.delete(), v.delete(), m;
      });
    function fe(i) {
      let a = [],
        c = {};
      for (let v of i) {
        let m = {},
          O = {},
          P = 0,
          y,
          k = v.match(/^\/\/(?<alias>.+?)\n/);
        k?.groups?.alias && (y = k.groups.alias.trim()),
          (!y || y.length == 0) && (y = v);
        let S = v.replace(/([a-zA-Z_]+[a-zA-Z0-9_]*)/g, (g) =>
          g == "true" ? "True" : g == "false" ? "False" : g,
        );
        (S = S.replace(/\"(.*?[^\\])\"/g, (g, R) => {
          if (((R = R.replace(/\\"/g, '"')), m[R] === void 0)) {
            let ie = `COLUMN${P}`;
            (m[R] = ie), (O[ie] = R);
          }
          return P++, m[R];
        })),
          (S = S.replace(/'(.*?[^\\])'/g, (g) => `intern(${g})`));
        let I = (g, R, ie, we) => {
          let je = g.indexOf(ie);
          return `${g.substring(0, je)}'${we}'${g.substring(je + ie.length)}`;
        };
        (S = S.replace(
          /(bucket|match|match_all|search|indexof)\(.*?,\s*(intern\(\'(.+)\'\)).*\)/g,
          I,
        )),
          (S = S.replace(
            /(replace_all|replace)\(.*?,\s*(intern\(\'(.*)\'\)),.*\)/g,
            I,
          ));
        let B = [y, v, S, O];
        if (c[y] !== void 0) {
          let g = c[y];
          a[g] = B;
        } else a.push(B), (c[y] = a.length - 1);
      }
      return a;
    }
    (H.prototype.validate_expressions = function (i, a = !0) {
      let c = { expression_schema: {}, expression_alias: {}, errors: {} };
      if (!i || i.length === 0) return c;
      i = fe(i);
      let v = o.make_2d_val_vector();
      for (let S of i) {
        let I = o.make_val_vector();
        for (let B of S) I.push_back(B);
        v.push_back(I), (c.expression_alias[S[0]] = S[1]);
      }
      let m = o.validate_expressions(this._Table, v),
        O = m.get_expression_schema(),
        P = m.get_expression_errors(),
        y = O.keys();
      for (let S = 0; S < y.size(); S++) {
        let I = y.get(S),
          B = O.get(I);
        a && this.overridden_types[I] && (B = this.overridden_types[I]),
          (c.expression_schema[I] = B);
      }
      let k = P.keys();
      for (let S = 0; S < k.size(); S++) {
        let I = k.get(S),
          B = P.get(I);
        c.errors[I] = B;
      }
      return k.delete(), y.delete(), P.delete(), O.delete(), m.delete(), c;
    }),
      (H.prototype.is_valid_filter = function (i) {
        if (
          i[1] === Q.FILTER_OPERATORS.isNull ||
          i[1] === Q.FILTER_OPERATORS.isNotNull
        )
          return !0;
        let a = i[2];
        if (a === null) return !1;
        let c = this.schema();
        return c[i[0]] && (c[i[0]] === "date" || c[i[0]] === "datetime")
          ? o.is_valid_datetime(i[2])
          : typeof a < "u" && a !== null;
      }),
      (H.prototype.view = function (i = {}) {
        D(this._Table.get_id());
        let a = {};
        for (let y of Object.keys(i))
          if (Pe[y])
            if (!a[Pe[y]])
              ht.has(y) ||
                (console.warn(
                  `Deprecated: "${y}" config parameter, please use "${Pe[y]}" instead`,
                ),
                ht.add(y)),
                (a[Pe[y]] = i[y]);
            else throw new Error(`Duplicate configuration parameter "${y}"`);
          else if (y === "aggregate") {
            ht.has("aggregate") ||
              (console.warn(
                'Deprecated: "aggregate" config parameter has been replaced by "aggregates" and "columns"',
              ),
              ht.add("aggregate")),
              (a.aggregates = {}),
              (a.columns = []);
            for (let k of i.aggregate)
              (a.aggregates[k.column] = k.op), a.columns.push(k.column);
          } else if (Dt.indexOf(y) > -1) a[y] = i[y];
          else throw new Error(`Unrecognized config parameter "${y}"`);
        (a.group_by = a.group_by || []),
          (a.split_by = a.split_by || []),
          (a.aggregates = a.aggregates || {}),
          (a.filter = a.filter || []),
          (a.sort = a.sort || []),
          (a.expressions = a.expressions || []);
        let c = this.schema();
        if (
          (a.expressions.length > 0 && (a.expressions = fe(a.expressions)),
          a.columns === void 0 &&
            ((a.columns = this.columns()), a.expressions.length > 0))
        )
          for (let y of a.expressions) a.columns.push(y[0]);
        if (a.filter.length > 0)
          for (let y of a.filter) {
            let k = c[y[0]];
            y[1] !== Q.FILTER_OPERATORS.isNull &&
              y[1] !== Q.FILTER_OPERATORS.isNotNull &&
              (k === "date" || k === "datetime") &&
              (y[2] = new Date(y[2]));
          }
        let v = Math.random() + "",
          m;
        a.group_by.length > 0 || a.split_by.length > 0
          ? a.split_by && a.split_by.length > 0
            ? (m = 2)
            : (m = 1)
          : (m = 0);
        let O = new ce(a),
          P = new j(this, m, a, O, v);
        return this.views.push(P), P;
      });
    let ne;
    function Wt() {
      if (ne === void 0) {
        let i = 0,
          a = performance.now();
        setTimeout(function c() {
          let v = performance.now();
          console.log(`${((1e3 * i) / (v - a)).toFixed(2)} msgs/sec`),
            (i = 0),
            (a = v),
            setTimeout(c, 5e3);
        }, 5e3),
          (ne = function (v) {
            i += v;
          }),
          console.log("Profiling initialized");
      }
    }
    (H.prototype.query_columns = function (i, a) {
      let c = this.view(i),
        v = c.to_columns(a);
      return c.delete(), v;
    }),
      (H.prototype.update = function (i, a) {
        (a = a || {}), (a.port_id = a.port_id || 0);
        let c,
          v = this.columns(),
          m = this._Table.get_schema(),
          O = m.types(),
          P = !1,
          y = !1;
        if (
          ((c = s),
          i instanceof ArrayBuffer
            ? ((c = new Uint8Array(i)), (P = !0))
            : typeof i == "string"
            ? (i[0] === "," && (i = "_" + i), (y = !0), (P = !0), (c = i))
            : (s.init(i),
              (s.names = v.concat(s.names.filter((k) => k === "__INDEX__"))),
              (s.types = Vt(O).slice(0, v.length)),
              ne && ne(s.row_count)),
          !P)
        ) {
          if (c.row_count === 0) {
            console.warn("table.update called with no data - ignoring");
            return;
          }
          s.names.indexOf("__INDEX__") != -1 &&
            (!!this.index
              ? s.types.push(s.types[s.names.indexOf(this.index)])
              : s.types.push(o.t_dtype.DTYPE_INT32));
        }
        try {
          let k = o.t_op.OP_INSERT;
          re(
            c,
            this._Table,
            this.index,
            this.limit,
            k,
            !0,
            P,
            y,
            a.port_id,
          ).delete(),
            (this.initialized = !0);
        } catch (k) {
          console.error(`Update failed: ${k}`);
        } finally {
          m.delete();
        }
      }),
      (H.prototype.remove = function (i, a) {
        if (!this.index) {
          console.error(
            "Cannot call `remove()` on a Table without a user-specified index.",
          );
          return;
        }
        (a = a || {}), (a.port_id = a.port_id || 0);
        let c,
          v = this.columns(),
          m = this._Table.get_schema(),
          O = m.types(),
          P = !1;
        (i = i.map((y) => ({ [this.index]: y }))),
          i instanceof ArrayBuffer
            ? ((c = new Uint8Array(i)), (P = !0))
            : (s.init(i),
              (s.names = [this.index]),
              (s.types = [Vt(O)[v.indexOf(this.index)]]),
              (c = s));
        try {
          let y = o.t_op.OP_DELETE;
          re(
            c,
            this._Table,
            this.index,
            this.limit,
            y,
            !1,
            P,
            !1,
            a.port_id,
          ).delete(),
            (this.initialized = !0);
        } catch (y) {
          console.error("Remove failed", y);
        } finally {
          m.delete();
        }
      }),
      (H.prototype.columns = function () {
        let i = this._Table.get_schema(),
          a = i.columns(),
          c = [];
        for (let v = 0; v < a.size(); v++) {
          let m = a.get(v);
          m !== "psp_okey" && c.push(m);
        }
        return i.delete(), a.delete(), c;
      }),
      (H.prototype.execute = function (i) {
        i(this);
      });
    let Q = {
      __module__: o,
      Server: Je,
      worker: function () {
        return this;
      },
      initialize_profile_thread: Wt,
      memory_usage: G,
      table: function (i, a) {
        (a = a || {}), (a.index = a.index || null), (a.limit = a.limit || null);
        let c,
          v = !1,
          m = {},
          O = !1;
        if (
          (i instanceof ArrayBuffer ||
          (typeof Buffer < "u" && i instanceof Buffer)
            ? ((c = new Uint8Array(i)), (v = !0))
            : typeof i == "string"
            ? (i[0] === "," && (i = "_" + i), (O = !0), (v = !0), (c = i))
            : (s.clean(), (m = s.init(i)), (c = s)),
          a.index && a.limit)
        )
          throw `Cannot specify both index '${a.index}' and limit '${a.limit}'.`;
        let P;
        try {
          let y = o.t_op.OP_INSERT;
          return (
            (P = re(c, void 0, a.index, a.limit, y, !1, v, O, 0)),
            new H(P, a.index, a.limit, m)
          );
        } catch (y) {
          throw (
            (P && P.delete(),
            console.error(`Table initialization failed: ${y}`),
            y)
          );
        }
      },
    };
    for (let i of Object.keys(ft)) Q[i] = ft[i];
    class Ze extends Je {
      constructor(a) {
        super(a),
          self.addEventListener("message", (c) => this.process(c.data), !1);
      }
      post(a, c) {
        self.postMessage(a, c);
      }
      init(a) {
        if (typeof WebAssembly > "u")
          throw new Error("WebAssembly not supported");
        o({
          wasmBinary: a.buffer,
          wasmJSMethod: "native-wasm",
          locateFile: (c) => c,
        }).then((c) => {
          (o = c), o.init(), super.init(a);
        });
      }
    }
    return typeof self < "u" && self.addEventListener && new Ze(Q), Q;
  }
  var fo = (globalThis.perspective = xr(Ar));
})();
//# sourceMappingURL=perspective.worker.js.map
