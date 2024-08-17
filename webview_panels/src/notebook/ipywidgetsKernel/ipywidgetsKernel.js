var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// build/esbuild/process.development.js
var process;
var init_process_development = __esm({
  "build/esbuild/process.development.js"() {
    "use strict";
    process = {
      platform: "web",
      cwd: () => "",
      env: {
        NODE_ENV: "development",
      },
    };
  },
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports2, module2) {
    "use strict";
    init_process_development();
    var isArray = Array.isArray;
    var keyList = Object.keys;
    var hasProp = Object.prototype.hasOwnProperty;
    module2.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        var arrA = isArray(a),
          arrB = isArray(b),
          i,
          length,
          key;
        if (arrA && arrB) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (arrA != arrB) return false;
        var dateA = a instanceof Date,
          dateB = b instanceof Date;
        if (dateA != dateB) return false;
        if (dateA && dateB) return a.getTime() == b.getTime();
        var regexpA = a instanceof RegExp,
          regexpB = b instanceof RegExp;
        if (regexpA != regexpB) return false;
        if (regexpA && regexpB) return a.toString() == b.toString();
        var keys = keyList(a);
        length = keys.length;
        if (length !== keyList(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!hasProp.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  },
});

// node_modules/@lumino/algorithm/dist/index.js
var require_dist = __commonJS({
  "node_modules/@lumino/algorithm/dist/index.js"(exports2, module2) {
    init_process_development();
    (function (global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined"
        ? factory(exports2)
        : typeof define === "function" && define.amd
          ? define(["exports"], factory)
          : ((global2 =
              typeof globalThis !== "undefined" ? globalThis : global2 || self),
            factory((global2.lumino_algorithm = {})));
    })(exports2, function (exports3) {
      "use strict";
      exports3.ArrayExt = void 0;
      (function (ArrayExt) {
        function firstIndexOf(array, value, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var n = array.length;
          if (n === 0) {
            return -1;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          var span;
          if (stop < start) {
            span = stop + 1 + (n - start);
          } else {
            span = stop - start + 1;
          }
          for (var i = 0; i < span; ++i) {
            var j = (start + i) % n;
            if (array[j] === value) {
              return j;
            }
          }
          return -1;
        }
        ArrayExt.firstIndexOf = firstIndexOf;
        function lastIndexOf(array, value, start, stop) {
          if (start === void 0) {
            start = -1;
          }
          if (stop === void 0) {
            stop = 0;
          }
          var n = array.length;
          if (n === 0) {
            return -1;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          var span;
          if (start < stop) {
            span = start + 1 + (n - stop);
          } else {
            span = start - stop + 1;
          }
          for (var i = 0; i < span; ++i) {
            var j = (start - i + n) % n;
            if (array[j] === value) {
              return j;
            }
          }
          return -1;
        }
        ArrayExt.lastIndexOf = lastIndexOf;
        function findFirstIndex(array, fn, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var n = array.length;
          if (n === 0) {
            return -1;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          var span;
          if (stop < start) {
            span = stop + 1 + (n - start);
          } else {
            span = stop - start + 1;
          }
          for (var i = 0; i < span; ++i) {
            var j = (start + i) % n;
            if (fn(array[j], j)) {
              return j;
            }
          }
          return -1;
        }
        ArrayExt.findFirstIndex = findFirstIndex;
        function findLastIndex(array, fn, start, stop) {
          if (start === void 0) {
            start = -1;
          }
          if (stop === void 0) {
            stop = 0;
          }
          var n = array.length;
          if (n === 0) {
            return -1;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          var d;
          if (start < stop) {
            d = start + 1 + (n - stop);
          } else {
            d = start - stop + 1;
          }
          for (var i = 0; i < d; ++i) {
            var j = (start - i + n) % n;
            if (fn(array[j], j)) {
              return j;
            }
          }
          return -1;
        }
        ArrayExt.findLastIndex = findLastIndex;
        function findFirstValue(array, fn, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var index = findFirstIndex(array, fn, start, stop);
          return index !== -1 ? array[index] : void 0;
        }
        ArrayExt.findFirstValue = findFirstValue;
        function findLastValue(array, fn, start, stop) {
          if (start === void 0) {
            start = -1;
          }
          if (stop === void 0) {
            stop = 0;
          }
          var index = findLastIndex(array, fn, start, stop);
          return index !== -1 ? array[index] : void 0;
        }
        ArrayExt.findLastValue = findLastValue;
        function lowerBound(array, value, fn, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var n = array.length;
          if (n === 0) {
            return 0;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          var begin = start;
          var span = stop - start + 1;
          while (span > 0) {
            var half = span >> 1;
            var middle = begin + half;
            if (fn(array[middle], value) < 0) {
              begin = middle + 1;
              span -= half + 1;
            } else {
              span = half;
            }
          }
          return begin;
        }
        ArrayExt.lowerBound = lowerBound;
        function upperBound(array, value, fn, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var n = array.length;
          if (n === 0) {
            return 0;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          var begin = start;
          var span = stop - start + 1;
          while (span > 0) {
            var half = span >> 1;
            var middle = begin + half;
            if (fn(array[middle], value) > 0) {
              span = half;
            } else {
              begin = middle + 1;
              span -= half + 1;
            }
          }
          return begin;
        }
        ArrayExt.upperBound = upperBound;
        function shallowEqual(a, b, fn) {
          if (a === b) {
            return true;
          }
          if (a.length !== b.length) {
            return false;
          }
          for (var i = 0, n = a.length; i < n; ++i) {
            if (fn ? !fn(a[i], b[i]) : a[i] !== b[i]) {
              return false;
            }
          }
          return true;
        }
        ArrayExt.shallowEqual = shallowEqual;
        function slice(array, options) {
          if (options === void 0) {
            options = {};
          }
          var start = options.start,
            stop = options.stop,
            step = options.step;
          if (step === void 0) {
            step = 1;
          }
          if (step === 0) {
            throw new Error("Slice `step` cannot be zero.");
          }
          var n = array.length;
          if (start === void 0) {
            start = step < 0 ? n - 1 : 0;
          } else if (start < 0) {
            start = Math.max(start + n, step < 0 ? -1 : 0);
          } else if (start >= n) {
            start = step < 0 ? n - 1 : n;
          }
          if (stop === void 0) {
            stop = step < 0 ? -1 : n;
          } else if (stop < 0) {
            stop = Math.max(stop + n, step < 0 ? -1 : 0);
          } else if (stop >= n) {
            stop = step < 0 ? n - 1 : n;
          }
          var length;
          if ((step < 0 && stop >= start) || (step > 0 && start >= stop)) {
            length = 0;
          } else if (step < 0) {
            length = Math.floor((stop - start + 1) / step + 1);
          } else {
            length = Math.floor((stop - start - 1) / step + 1);
          }
          var result = [];
          for (var i = 0; i < length; ++i) {
            result[i] = array[start + i * step];
          }
          return result;
        }
        ArrayExt.slice = slice;
        function move(array, fromIndex, toIndex) {
          var n = array.length;
          if (n <= 1) {
            return;
          }
          if (fromIndex < 0) {
            fromIndex = Math.max(0, fromIndex + n);
          } else {
            fromIndex = Math.min(fromIndex, n - 1);
          }
          if (toIndex < 0) {
            toIndex = Math.max(0, toIndex + n);
          } else {
            toIndex = Math.min(toIndex, n - 1);
          }
          if (fromIndex === toIndex) {
            return;
          }
          var value = array[fromIndex];
          var d = fromIndex < toIndex ? 1 : -1;
          for (var i = fromIndex; i !== toIndex; i += d) {
            array[i] = array[i + d];
          }
          array[toIndex] = value;
        }
        ArrayExt.move = move;
        function reverse(array, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var n = array.length;
          if (n <= 1) {
            return;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          while (start < stop) {
            var a = array[start];
            var b = array[stop];
            array[start++] = b;
            array[stop--] = a;
          }
        }
        ArrayExt.reverse = reverse;
        function rotate(array, delta, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var n = array.length;
          if (n <= 1) {
            return;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          if (start >= stop) {
            return;
          }
          var length = stop - start + 1;
          if (delta > 0) {
            delta = delta % length;
          } else if (delta < 0) {
            delta = ((delta % length) + length) % length;
          }
          if (delta === 0) {
            return;
          }
          var pivot = start + delta;
          reverse(array, start, pivot - 1);
          reverse(array, pivot, stop);
          reverse(array, start, stop);
        }
        ArrayExt.rotate = rotate;
        function fill(array, value, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var n = array.length;
          if (n === 0) {
            return;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          var span;
          if (stop < start) {
            span = stop + 1 + (n - start);
          } else {
            span = stop - start + 1;
          }
          for (var i = 0; i < span; ++i) {
            array[(start + i) % n] = value;
          }
        }
        ArrayExt.fill = fill;
        function insert(array, index, value) {
          var n = array.length;
          if (index < 0) {
            index = Math.max(0, index + n);
          } else {
            index = Math.min(index, n);
          }
          for (var i = n; i > index; --i) {
            array[i] = array[i - 1];
          }
          array[index] = value;
        }
        ArrayExt.insert = insert;
        function removeAt(array, index) {
          var n = array.length;
          if (index < 0) {
            index += n;
          }
          if (index < 0 || index >= n) {
            return void 0;
          }
          var value = array[index];
          for (var i = index + 1; i < n; ++i) {
            array[i - 1] = array[i];
          }
          array.length = n - 1;
          return value;
        }
        ArrayExt.removeAt = removeAt;
        function removeFirstOf(array, value, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var index = firstIndexOf(array, value, start, stop);
          if (index !== -1) {
            removeAt(array, index);
          }
          return index;
        }
        ArrayExt.removeFirstOf = removeFirstOf;
        function removeLastOf(array, value, start, stop) {
          if (start === void 0) {
            start = -1;
          }
          if (stop === void 0) {
            stop = 0;
          }
          var index = lastIndexOf(array, value, start, stop);
          if (index !== -1) {
            removeAt(array, index);
          }
          return index;
        }
        ArrayExt.removeLastOf = removeLastOf;
        function removeAllOf(array, value, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var n = array.length;
          if (n === 0) {
            return 0;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          var count = 0;
          for (var i = 0; i < n; ++i) {
            if (
              start <= stop &&
              i >= start &&
              i <= stop &&
              array[i] === value
            ) {
              count++;
            } else if (
              stop < start &&
              (i <= stop || i >= start) &&
              array[i] === value
            ) {
              count++;
            } else if (count > 0) {
              array[i - count] = array[i];
            }
          }
          if (count > 0) {
            array.length = n - count;
          }
          return count;
        }
        ArrayExt.removeAllOf = removeAllOf;
        function removeFirstWhere(array, fn, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var value;
          var index = findFirstIndex(array, fn, start, stop);
          if (index !== -1) {
            value = removeAt(array, index);
          }
          return { index, value };
        }
        ArrayExt.removeFirstWhere = removeFirstWhere;
        function removeLastWhere(array, fn, start, stop) {
          if (start === void 0) {
            start = -1;
          }
          if (stop === void 0) {
            stop = 0;
          }
          var value;
          var index = findLastIndex(array, fn, start, stop);
          if (index !== -1) {
            value = removeAt(array, index);
          }
          return { index, value };
        }
        ArrayExt.removeLastWhere = removeLastWhere;
        function removeAllWhere(array, fn, start, stop) {
          if (start === void 0) {
            start = 0;
          }
          if (stop === void 0) {
            stop = -1;
          }
          var n = array.length;
          if (n === 0) {
            return 0;
          }
          if (start < 0) {
            start = Math.max(0, start + n);
          } else {
            start = Math.min(start, n - 1);
          }
          if (stop < 0) {
            stop = Math.max(0, stop + n);
          } else {
            stop = Math.min(stop, n - 1);
          }
          var count = 0;
          for (var i = 0; i < n; ++i) {
            if (start <= stop && i >= start && i <= stop && fn(array[i], i)) {
              count++;
            } else if (
              stop < start &&
              (i <= stop || i >= start) &&
              fn(array[i], i)
            ) {
              count++;
            } else if (count > 0) {
              array[i - count] = array[i];
            }
          }
          if (count > 0) {
            array.length = n - count;
          }
          return count;
        }
        ArrayExt.removeAllWhere = removeAllWhere;
      })(exports3.ArrayExt || (exports3.ArrayExt = {}));
      function iter(object) {
        var it;
        if (typeof object.iter === "function") {
          it = object.iter();
        } else {
          it = new ArrayIterator(object);
        }
        return it;
      }
      function iterKeys(object) {
        return new KeyIterator(object);
      }
      function iterValues(object) {
        return new ValueIterator(object);
      }
      function iterItems(object) {
        return new ItemIterator(object);
      }
      function iterFn(fn) {
        return new FnIterator(fn);
      }
      function each(object, fn) {
        var index = 0;
        var it = iter(object);
        var value;
        while ((value = it.next()) !== void 0) {
          if (fn(value, index++) === false) {
            return;
          }
        }
      }
      function every(object, fn) {
        var index = 0;
        var it = iter(object);
        var value;
        while ((value = it.next()) !== void 0) {
          if (!fn(value, index++)) {
            return false;
          }
        }
        return true;
      }
      function some(object, fn) {
        var index = 0;
        var it = iter(object);
        var value;
        while ((value = it.next()) !== void 0) {
          if (fn(value, index++)) {
            return true;
          }
        }
        return false;
      }
      function toArray(object) {
        var index = 0;
        var result = [];
        var it = iter(object);
        var value;
        while ((value = it.next()) !== void 0) {
          result[index++] = value;
        }
        return result;
      }
      function toObject(object) {
        var it = iter(object);
        var pair;
        var result = {};
        while ((pair = it.next()) !== void 0) {
          result[pair[0]] = pair[1];
        }
        return result;
      }
      var ArrayIterator =
        /** @class */
        (function () {
          function ArrayIterator2(source) {
            this._index = 0;
            this._source = source;
          }
          ArrayIterator2.prototype.iter = function () {
            return this;
          };
          ArrayIterator2.prototype.clone = function () {
            var result = new ArrayIterator2(this._source);
            result._index = this._index;
            return result;
          };
          ArrayIterator2.prototype.next = function () {
            if (this._index >= this._source.length) {
              return void 0;
            }
            return this._source[this._index++];
          };
          return ArrayIterator2;
        })();
      var KeyIterator =
        /** @class */
        (function () {
          function KeyIterator2(source, keys) {
            if (keys === void 0) {
              keys = Object.keys(source);
            }
            this._index = 0;
            this._source = source;
            this._keys = keys;
          }
          KeyIterator2.prototype.iter = function () {
            return this;
          };
          KeyIterator2.prototype.clone = function () {
            var result = new KeyIterator2(this._source, this._keys);
            result._index = this._index;
            return result;
          };
          KeyIterator2.prototype.next = function () {
            if (this._index >= this._keys.length) {
              return void 0;
            }
            var key = this._keys[this._index++];
            if (key in this._source) {
              return key;
            }
            return this.next();
          };
          return KeyIterator2;
        })();
      var ValueIterator =
        /** @class */
        (function () {
          function ValueIterator2(source, keys) {
            if (keys === void 0) {
              keys = Object.keys(source);
            }
            this._index = 0;
            this._source = source;
            this._keys = keys;
          }
          ValueIterator2.prototype.iter = function () {
            return this;
          };
          ValueIterator2.prototype.clone = function () {
            var result = new ValueIterator2(this._source, this._keys);
            result._index = this._index;
            return result;
          };
          ValueIterator2.prototype.next = function () {
            if (this._index >= this._keys.length) {
              return void 0;
            }
            var key = this._keys[this._index++];
            if (key in this._source) {
              return this._source[key];
            }
            return this.next();
          };
          return ValueIterator2;
        })();
      var ItemIterator =
        /** @class */
        (function () {
          function ItemIterator2(source, keys) {
            if (keys === void 0) {
              keys = Object.keys(source);
            }
            this._index = 0;
            this._source = source;
            this._keys = keys;
          }
          ItemIterator2.prototype.iter = function () {
            return this;
          };
          ItemIterator2.prototype.clone = function () {
            var result = new ItemIterator2(this._source, this._keys);
            result._index = this._index;
            return result;
          };
          ItemIterator2.prototype.next = function () {
            if (this._index >= this._keys.length) {
              return void 0;
            }
            var key = this._keys[this._index++];
            if (key in this._source) {
              return [key, this._source[key]];
            }
            return this.next();
          };
          return ItemIterator2;
        })();
      var FnIterator =
        /** @class */
        (function () {
          function FnIterator2(fn) {
            this._fn = fn;
          }
          FnIterator2.prototype.iter = function () {
            return this;
          };
          FnIterator2.prototype.clone = function () {
            throw new Error("An `FnIterator` cannot be cloned.");
          };
          FnIterator2.prototype.next = function () {
            return this._fn.call(void 0);
          };
          return FnIterator2;
        })();
      function chain() {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          objects[_i] = arguments[_i];
        }
        return new ChainIterator(iter(objects.map(iter)));
      }
      var ChainIterator =
        /** @class */
        (function () {
          function ChainIterator2(source) {
            this._cloned = false;
            this._source = source;
            this._active = void 0;
          }
          ChainIterator2.prototype.iter = function () {
            return this;
          };
          ChainIterator2.prototype.clone = function () {
            var result = new ChainIterator2(this._source.clone());
            result._active = this._active && this._active.clone();
            result._cloned = true;
            this._cloned = true;
            return result;
          };
          ChainIterator2.prototype.next = function () {
            if (this._active === void 0) {
              var active = this._source.next();
              if (active === void 0) {
                return void 0;
              }
              this._active = this._cloned ? active.clone() : active;
            }
            var value = this._active.next();
            if (value !== void 0) {
              return value;
            }
            this._active = void 0;
            return this.next();
          };
          return ChainIterator2;
        })();
      function empty() {
        return new EmptyIterator();
      }
      var EmptyIterator =
        /** @class */
        (function () {
          function EmptyIterator2() {}
          EmptyIterator2.prototype.iter = function () {
            return this;
          };
          EmptyIterator2.prototype.clone = function () {
            return new EmptyIterator2();
          };
          EmptyIterator2.prototype.next = function () {
            return void 0;
          };
          return EmptyIterator2;
        })();
      function enumerate(object, start) {
        if (start === void 0) {
          start = 0;
        }
        return new EnumerateIterator(iter(object), start);
      }
      var EnumerateIterator =
        /** @class */
        (function () {
          function EnumerateIterator2(source, start) {
            this._source = source;
            this._index = start;
          }
          EnumerateIterator2.prototype.iter = function () {
            return this;
          };
          EnumerateIterator2.prototype.clone = function () {
            return new EnumerateIterator2(this._source.clone(), this._index);
          };
          EnumerateIterator2.prototype.next = function () {
            var value = this._source.next();
            if (value === void 0) {
              return void 0;
            }
            return [this._index++, value];
          };
          return EnumerateIterator2;
        })();
      function filter(object, fn) {
        return new FilterIterator(iter(object), fn);
      }
      var FilterIterator =
        /** @class */
        (function () {
          function FilterIterator2(source, fn) {
            this._index = 0;
            this._source = source;
            this._fn = fn;
          }
          FilterIterator2.prototype.iter = function () {
            return this;
          };
          FilterIterator2.prototype.clone = function () {
            var result = new FilterIterator2(this._source.clone(), this._fn);
            result._index = this._index;
            return result;
          };
          FilterIterator2.prototype.next = function () {
            var fn = this._fn;
            var it = this._source;
            var value;
            while ((value = it.next()) !== void 0) {
              if (fn(value, this._index++)) {
                return value;
              }
            }
            return void 0;
          };
          return FilterIterator2;
        })();
      function find(object, fn) {
        var index = 0;
        var it = iter(object);
        var value;
        while ((value = it.next()) !== void 0) {
          if (fn(value, index++)) {
            return value;
          }
        }
        return void 0;
      }
      function findIndex(object, fn) {
        var index = 0;
        var it = iter(object);
        var value;
        while ((value = it.next()) !== void 0) {
          if (fn(value, index++)) {
            return index - 1;
          }
        }
        return -1;
      }
      function min(object, fn) {
        var it = iter(object);
        var value = it.next();
        if (value === void 0) {
          return void 0;
        }
        var result = value;
        while ((value = it.next()) !== void 0) {
          if (fn(value, result) < 0) {
            result = value;
          }
        }
        return result;
      }
      function max(object, fn) {
        var it = iter(object);
        var value = it.next();
        if (value === void 0) {
          return void 0;
        }
        var result = value;
        while ((value = it.next()) !== void 0) {
          if (fn(value, result) > 0) {
            result = value;
          }
        }
        return result;
      }
      function minmax(object, fn) {
        var it = iter(object);
        var value = it.next();
        if (value === void 0) {
          return void 0;
        }
        var vmin = value;
        var vmax = value;
        while ((value = it.next()) !== void 0) {
          if (fn(value, vmin) < 0) {
            vmin = value;
          } else if (fn(value, vmax) > 0) {
            vmax = value;
          }
        }
        return [vmin, vmax];
      }
      function map(object, fn) {
        return new MapIterator(iter(object), fn);
      }
      var MapIterator =
        /** @class */
        (function () {
          function MapIterator2(source, fn) {
            this._index = 0;
            this._source = source;
            this._fn = fn;
          }
          MapIterator2.prototype.iter = function () {
            return this;
          };
          MapIterator2.prototype.clone = function () {
            var result = new MapIterator2(this._source.clone(), this._fn);
            result._index = this._index;
            return result;
          };
          MapIterator2.prototype.next = function () {
            var value = this._source.next();
            if (value === void 0) {
              return void 0;
            }
            return this._fn.call(void 0, value, this._index++);
          };
          return MapIterator2;
        })();
      function range(start, stop, step) {
        if (stop === void 0) {
          return new RangeIterator(0, start, 1);
        }
        if (step === void 0) {
          return new RangeIterator(start, stop, 1);
        }
        return new RangeIterator(start, stop, step);
      }
      var RangeIterator =
        /** @class */
        (function () {
          function RangeIterator2(start, stop, step) {
            this._index = 0;
            this._start = start;
            this._stop = stop;
            this._step = step;
            this._length = Private.rangeLength(start, stop, step);
          }
          RangeIterator2.prototype.iter = function () {
            return this;
          };
          RangeIterator2.prototype.clone = function () {
            var result = new RangeIterator2(
              this._start,
              this._stop,
              this._step,
            );
            result._index = this._index;
            return result;
          };
          RangeIterator2.prototype.next = function () {
            if (this._index >= this._length) {
              return void 0;
            }
            return this._start + this._step * this._index++;
          };
          return RangeIterator2;
        })();
      var Private;
      (function (Private2) {
        function rangeLength(start, stop, step) {
          if (step === 0) {
            return Infinity;
          }
          if (start > stop && step > 0) {
            return 0;
          }
          if (start < stop && step < 0) {
            return 0;
          }
          return Math.ceil((stop - start) / step);
        }
        Private2.rangeLength = rangeLength;
      })(Private || (Private = {}));
      function reduce(object, fn, initial) {
        var index = 0;
        var it = iter(object);
        var first = it.next();
        if (first === void 0 && initial === void 0) {
          throw new TypeError(
            "Reduce of empty iterable with no initial value.",
          );
        }
        if (first === void 0) {
          return initial;
        }
        var second = it.next();
        if (second === void 0 && initial === void 0) {
          return first;
        }
        if (second === void 0) {
          return fn(initial, first, index++);
        }
        var accumulator;
        if (initial === void 0) {
          accumulator = fn(first, second, index++);
        } else {
          accumulator = fn(fn(initial, first, index++), second, index++);
        }
        var next;
        while ((next = it.next()) !== void 0) {
          accumulator = fn(accumulator, next, index++);
        }
        return accumulator;
      }
      function repeat(value, count) {
        return new RepeatIterator(value, count);
      }
      function once2(value) {
        return new RepeatIterator(value, 1);
      }
      var RepeatIterator =
        /** @class */
        (function () {
          function RepeatIterator2(value, count) {
            this._value = value;
            this._count = count;
          }
          RepeatIterator2.prototype.iter = function () {
            return this;
          };
          RepeatIterator2.prototype.clone = function () {
            return new RepeatIterator2(this._value, this._count);
          };
          RepeatIterator2.prototype.next = function () {
            if (this._count <= 0) {
              return void 0;
            }
            this._count--;
            return this._value;
          };
          return RepeatIterator2;
        })();
      function retro(object) {
        var it;
        if (typeof object.retro === "function") {
          it = object.retro();
        } else {
          it = new RetroArrayIterator(object);
        }
        return it;
      }
      var RetroArrayIterator =
        /** @class */
        (function () {
          function RetroArrayIterator2(source) {
            this._source = source;
            this._index = source.length - 1;
          }
          RetroArrayIterator2.prototype.iter = function () {
            return this;
          };
          RetroArrayIterator2.prototype.clone = function () {
            var result = new RetroArrayIterator2(this._source);
            result._index = this._index;
            return result;
          };
          RetroArrayIterator2.prototype.next = function () {
            if (this._index < 0 || this._index >= this._source.length) {
              return void 0;
            }
            return this._source[this._index--];
          };
          return RetroArrayIterator2;
        })();
      function topologicSort(edges) {
        var sorted = [];
        var visited = /* @__PURE__ */ new Set();
        var graph = /* @__PURE__ */ new Map();
        each(edges, addEdge);
        graph.forEach(function (v, k) {
          visit(k);
        });
        return sorted;
        function addEdge(edge) {
          var fromNode = edge[0],
            toNode = edge[1];
          var children = graph.get(toNode);
          if (children) {
            children.push(fromNode);
          } else {
            graph.set(toNode, [fromNode]);
          }
        }
        function visit(node) {
          if (visited.has(node)) {
            return;
          }
          visited.add(node);
          var children = graph.get(node);
          if (children) {
            children.forEach(visit);
          }
          sorted.push(node);
        }
      }
      function stride(object, step) {
        return new StrideIterator(iter(object), step);
      }
      var StrideIterator =
        /** @class */
        (function () {
          function StrideIterator2(source, step) {
            this._source = source;
            this._step = step;
          }
          StrideIterator2.prototype.iter = function () {
            return this;
          };
          StrideIterator2.prototype.clone = function () {
            return new StrideIterator2(this._source.clone(), this._step);
          };
          StrideIterator2.prototype.next = function () {
            var value = this._source.next();
            for (var n = this._step - 1; n > 0; --n) {
              this._source.next();
            }
            return value;
          };
          return StrideIterator2;
        })();
      exports3.StringExt = void 0;
      (function (StringExt) {
        function findIndices(source, query, start) {
          if (start === void 0) {
            start = 0;
          }
          var indices = new Array(query.length);
          for (var i = 0, j = start, n = query.length; i < n; ++i, ++j) {
            j = source.indexOf(query[i], j);
            if (j === -1) {
              return null;
            }
            indices[i] = j;
          }
          return indices;
        }
        StringExt.findIndices = findIndices;
        function matchSumOfSquares(source, query, start) {
          if (start === void 0) {
            start = 0;
          }
          var indices = findIndices(source, query, start);
          if (!indices) {
            return null;
          }
          var score = 0;
          for (var i = 0, n = indices.length; i < n; ++i) {
            var j = indices[i] - start;
            score += j * j;
          }
          return { score, indices };
        }
        StringExt.matchSumOfSquares = matchSumOfSquares;
        function matchSumOfDeltas(source, query, start) {
          if (start === void 0) {
            start = 0;
          }
          var indices = findIndices(source, query, start);
          if (!indices) {
            return null;
          }
          var score = 0;
          var last = start - 1;
          for (var i = 0, n = indices.length; i < n; ++i) {
            var j = indices[i];
            score += j - last - 1;
            last = j;
          }
          return { score, indices };
        }
        StringExt.matchSumOfDeltas = matchSumOfDeltas;
        function highlight(source, indices, fn) {
          var result = [];
          var k = 0;
          var last = 0;
          var n = indices.length;
          while (k < n) {
            var i = indices[k];
            var j = indices[k];
            while (++k < n && indices[k] === j + 1) {
              j++;
            }
            if (last < i) {
              result.push(source.slice(last, i));
            }
            if (i < j + 1) {
              result.push(fn(source.slice(i, j + 1)));
            }
            last = j + 1;
          }
          if (last < source.length) {
            result.push(source.slice(last));
          }
          return result;
        }
        StringExt.highlight = highlight;
        function cmp(a, b) {
          return a < b ? -1 : a > b ? 1 : 0;
        }
        StringExt.cmp = cmp;
      })(exports3.StringExt || (exports3.StringExt = {}));
      function take(object, count) {
        return new TakeIterator(iter(object), count);
      }
      var TakeIterator =
        /** @class */
        (function () {
          function TakeIterator2(source, count) {
            this._source = source;
            this._count = count;
          }
          TakeIterator2.prototype.iter = function () {
            return this;
          };
          TakeIterator2.prototype.clone = function () {
            return new TakeIterator2(this._source.clone(), this._count);
          };
          TakeIterator2.prototype.next = function () {
            if (this._count <= 0) {
              return void 0;
            }
            var value = this._source.next();
            if (value === void 0) {
              return void 0;
            }
            this._count--;
            return value;
          };
          return TakeIterator2;
        })();
      function zip() {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          objects[_i] = arguments[_i];
        }
        return new ZipIterator(objects.map(iter));
      }
      var ZipIterator =
        /** @class */
        (function () {
          function ZipIterator2(source) {
            this._source = source;
          }
          ZipIterator2.prototype.iter = function () {
            return this;
          };
          ZipIterator2.prototype.clone = function () {
            return new ZipIterator2(
              this._source.map(function (it) {
                return it.clone();
              }),
            );
          };
          ZipIterator2.prototype.next = function () {
            var result = new Array(this._source.length);
            for (var i = 0, n = this._source.length; i < n; ++i) {
              var value = this._source[i].next();
              if (value === void 0) {
                return void 0;
              }
              result[i] = value;
            }
            return result;
          };
          return ZipIterator2;
        })();
      exports3.ArrayIterator = ArrayIterator;
      exports3.ChainIterator = ChainIterator;
      exports3.EmptyIterator = EmptyIterator;
      exports3.EnumerateIterator = EnumerateIterator;
      exports3.FilterIterator = FilterIterator;
      exports3.FnIterator = FnIterator;
      exports3.ItemIterator = ItemIterator;
      exports3.KeyIterator = KeyIterator;
      exports3.MapIterator = MapIterator;
      exports3.RangeIterator = RangeIterator;
      exports3.RepeatIterator = RepeatIterator;
      exports3.RetroArrayIterator = RetroArrayIterator;
      exports3.StrideIterator = StrideIterator;
      exports3.TakeIterator = TakeIterator;
      exports3.ValueIterator = ValueIterator;
      exports3.ZipIterator = ZipIterator;
      exports3.chain = chain;
      exports3.each = each;
      exports3.empty = empty;
      exports3.enumerate = enumerate;
      exports3.every = every;
      exports3.filter = filter;
      exports3.find = find;
      exports3.findIndex = findIndex;
      exports3.iter = iter;
      exports3.iterFn = iterFn;
      exports3.iterItems = iterItems;
      exports3.iterKeys = iterKeys;
      exports3.iterValues = iterValues;
      exports3.map = map;
      exports3.max = max;
      exports3.min = min;
      exports3.minmax = minmax;
      exports3.once = once2;
      exports3.range = range;
      exports3.reduce = reduce;
      exports3.repeat = repeat;
      exports3.retro = retro;
      exports3.some = some;
      exports3.stride = stride;
      exports3.take = take;
      exports3.toArray = toArray;
      exports3.toObject = toObject;
      exports3.topologicSort = topologicSort;
      exports3.zip = zip;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  },
});

// node_modules/@lumino/properties/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@lumino/properties/dist/index.js"(exports2, module2) {
    init_process_development();
    (function (global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined"
        ? factory(exports2)
        : typeof define === "function" && define.amd
          ? define(["exports"], factory)
          : ((global2 =
              typeof globalThis !== "undefined" ? globalThis : global2 || self),
            factory((global2.lumino_properties = {})));
    })(exports2, function (exports3) {
      "use strict";
      exports3.AttachedProperty =
        /** @class */
        (function () {
          function AttachedProperty(options) {
            this._pid = Private.nextPID();
            this.name = options.name;
            this._create = options.create;
            this._coerce = options.coerce || null;
            this._compare = options.compare || null;
            this._changed = options.changed || null;
          }
          AttachedProperty.prototype.get = function (owner) {
            var value;
            var map = Private.ensureMap(owner);
            if (this._pid in map) {
              value = map[this._pid];
            } else {
              value = map[this._pid] = this._createValue(owner);
            }
            return value;
          };
          AttachedProperty.prototype.set = function (owner, value) {
            var oldValue;
            var map = Private.ensureMap(owner);
            if (this._pid in map) {
              oldValue = map[this._pid];
            } else {
              oldValue = map[this._pid] = this._createValue(owner);
            }
            var newValue = this._coerceValue(owner, value);
            this._maybeNotify(owner, oldValue, (map[this._pid] = newValue));
          };
          AttachedProperty.prototype.coerce = function (owner) {
            var oldValue;
            var map = Private.ensureMap(owner);
            if (this._pid in map) {
              oldValue = map[this._pid];
            } else {
              oldValue = map[this._pid] = this._createValue(owner);
            }
            var newValue = this._coerceValue(owner, oldValue);
            this._maybeNotify(owner, oldValue, (map[this._pid] = newValue));
          };
          AttachedProperty.prototype._createValue = function (owner) {
            var create2 = this._create;
            return create2(owner);
          };
          AttachedProperty.prototype._coerceValue = function (owner, value) {
            var coerce = this._coerce;
            return coerce ? coerce(owner, value) : value;
          };
          AttachedProperty.prototype._compareValue = function (
            oldValue,
            newValue,
          ) {
            var compare2 = this._compare;
            return compare2
              ? compare2(oldValue, newValue)
              : oldValue === newValue;
          };
          AttachedProperty.prototype._maybeNotify = function (
            owner,
            oldValue,
            newValue,
          ) {
            var changed = this._changed;
            if (changed && !this._compareValue(oldValue, newValue)) {
              changed(owner, oldValue, newValue);
            }
          };
          return AttachedProperty;
        })();
      (function (AttachedProperty) {
        function clearData(owner) {
          Private.ownerData.delete(owner);
        }
        AttachedProperty.clearData = clearData;
      })(exports3.AttachedProperty || (exports3.AttachedProperty = {}));
      var Private;
      (function (Private2) {
        Private2.ownerData = /* @__PURE__ */ new WeakMap();
        Private2.nextPID = (function () {
          var id = 0;
          return function () {
            var rand = Math.random();
            var stem = ("" + rand).slice(2);
            return "pid-" + stem + "-" + id++;
          };
        })();
        function ensureMap(owner) {
          var map = Private2.ownerData.get(owner);
          if (map) {
            return map;
          }
          map = /* @__PURE__ */ Object.create(null);
          Private2.ownerData.set(owner, map);
          return map;
        }
        Private2.ensureMap = ensureMap;
      })(Private || (Private = {}));
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  },
});

// node_modules/@lumino/signaling/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/@lumino/signaling/dist/index.js"(exports2, module2) {
    init_process_development();
    (function (global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined"
        ? factory(exports2, require_dist(), require_dist2())
        : typeof define === "function" && define.amd
          ? define(
              ["exports", "@lumino/algorithm", "@lumino/properties"],
              factory,
            )
          : ((global2 =
              typeof globalThis !== "undefined" ? globalThis : global2 || self),
            factory(
              (global2.lumino_signaling = {}),
              global2.lumino_algorithm,
              global2.lumino_properties,
            ));
    })(exports2, function (exports3, algorithm, properties) {
      "use strict";
      exports3.Signal =
        /** @class */
        (function () {
          function Signal(sender) {
            this._blockedCount = 0;
            this.sender = sender;
          }
          Signal.prototype.block = function (fn) {
            this._blockedCount++;
            try {
              fn();
            } finally {
              this._blockedCount--;
            }
          };
          Signal.prototype.connect = function (slot, thisArg) {
            return Private.connect(this, slot, thisArg);
          };
          Signal.prototype.disconnect = function (slot, thisArg) {
            return Private.disconnect(this, slot, thisArg);
          };
          Signal.prototype.emit = function (args) {
            if (!this._blockedCount) {
              Private.emit(this, args);
            }
          };
          return Signal;
        })();
      (function (Signal) {
        function blockAll(sender, fn) {
          var blockedProperty = Private.blockedProperty;
          blockedProperty.set(sender, blockedProperty.get(sender) + 1);
          try {
            fn();
          } finally {
            blockedProperty.set(sender, blockedProperty.get(sender) - 1);
          }
        }
        Signal.blockAll = blockAll;
        function disconnectBetween(sender, receiver) {
          Private.disconnectBetween(sender, receiver);
        }
        Signal.disconnectBetween = disconnectBetween;
        function disconnectSender(sender) {
          Private.disconnectSender(sender);
        }
        Signal.disconnectSender = disconnectSender;
        function disconnectReceiver(receiver) {
          Private.disconnectReceiver(receiver);
        }
        Signal.disconnectReceiver = disconnectReceiver;
        function disconnectAll(object) {
          Private.disconnectAll(object);
        }
        Signal.disconnectAll = disconnectAll;
        function clearData(object) {
          Private.disconnectAll(object);
        }
        Signal.clearData = clearData;
        function getExceptionHandler() {
          return Private.exceptionHandler;
        }
        Signal.getExceptionHandler = getExceptionHandler;
        function setExceptionHandler(handler) {
          var old = Private.exceptionHandler;
          Private.exceptionHandler = handler;
          return old;
        }
        Signal.setExceptionHandler = setExceptionHandler;
      })(exports3.Signal || (exports3.Signal = {}));
      var Private;
      (function (Private2) {
        Private2.exceptionHandler = function (err) {
          console.error(err);
        };
        function connect(signal, slot, thisArg) {
          thisArg = thisArg || void 0;
          var receivers = receiversForSender.get(signal.sender);
          if (!receivers) {
            receivers = [];
            receiversForSender.set(signal.sender, receivers);
          }
          if (findConnection(receivers, signal, slot, thisArg)) {
            return false;
          }
          var receiver = thisArg || slot;
          var senders = sendersForReceiver.get(receiver);
          if (!senders) {
            senders = [];
            sendersForReceiver.set(receiver, senders);
          }
          var connection = { signal, slot, thisArg };
          receivers.push(connection);
          senders.push(connection);
          return true;
        }
        Private2.connect = connect;
        function disconnect(signal, slot, thisArg) {
          thisArg = thisArg || void 0;
          var receivers = receiversForSender.get(signal.sender);
          if (!receivers || receivers.length === 0) {
            return false;
          }
          var connection = findConnection(receivers, signal, slot, thisArg);
          if (!connection) {
            return false;
          }
          var receiver = thisArg || slot;
          var senders = sendersForReceiver.get(receiver);
          connection.signal = null;
          scheduleCleanup(receivers);
          scheduleCleanup(senders);
          return true;
        }
        Private2.disconnect = disconnect;
        function disconnectBetween(sender, receiver) {
          var receivers = receiversForSender.get(sender);
          if (!receivers || receivers.length === 0) {
            return;
          }
          var senders = sendersForReceiver.get(receiver);
          if (!senders || senders.length === 0) {
            return;
          }
          algorithm.each(senders, function (connection) {
            if (!connection.signal) {
              return;
            }
            if (connection.signal.sender === sender) {
              connection.signal = null;
            }
          });
          scheduleCleanup(receivers);
          scheduleCleanup(senders);
        }
        Private2.disconnectBetween = disconnectBetween;
        function disconnectSender(sender) {
          var receivers = receiversForSender.get(sender);
          if (!receivers || receivers.length === 0) {
            return;
          }
          algorithm.each(receivers, function (connection) {
            if (!connection.signal) {
              return;
            }
            var receiver = connection.thisArg || connection.slot;
            connection.signal = null;
            scheduleCleanup(sendersForReceiver.get(receiver));
          });
          scheduleCleanup(receivers);
        }
        Private2.disconnectSender = disconnectSender;
        function disconnectReceiver(receiver) {
          var senders = sendersForReceiver.get(receiver);
          if (!senders || senders.length === 0) {
            return;
          }
          algorithm.each(senders, function (connection) {
            if (!connection.signal) {
              return;
            }
            var sender = connection.signal.sender;
            connection.signal = null;
            scheduleCleanup(receiversForSender.get(sender));
          });
          scheduleCleanup(senders);
        }
        Private2.disconnectReceiver = disconnectReceiver;
        function disconnectAll(object) {
          disconnectSender(object);
          disconnectReceiver(object);
        }
        Private2.disconnectAll = disconnectAll;
        function emit(signal, args) {
          if (Private2.blockedProperty.get(signal.sender) > 0) {
            return;
          }
          var receivers = receiversForSender.get(signal.sender);
          if (!receivers || receivers.length === 0) {
            return;
          }
          for (var i = 0, n = receivers.length; i < n; ++i) {
            var connection = receivers[i];
            if (connection.signal === signal) {
              invokeSlot(connection, args);
            }
          }
        }
        Private2.emit = emit;
        var receiversForSender = /* @__PURE__ */ new WeakMap();
        var sendersForReceiver = /* @__PURE__ */ new WeakMap();
        var dirtySet = /* @__PURE__ */ new Set();
        var schedule = (function () {
          var ok = typeof requestAnimationFrame === "function";
          return ok ? requestAnimationFrame : setImmediate;
        })();
        function findConnection(connections, signal, slot, thisArg) {
          return algorithm.find(connections, function (connection) {
            return (
              connection.signal === signal &&
              connection.slot === slot &&
              connection.thisArg === thisArg
            );
          });
        }
        function invokeSlot(connection, args) {
          var signal = connection.signal,
            slot = connection.slot,
            thisArg = connection.thisArg;
          try {
            slot.call(thisArg, signal.sender, args);
          } catch (err) {
            Private2.exceptionHandler(err);
          }
        }
        function scheduleCleanup(array) {
          if (dirtySet.size === 0) {
            schedule(cleanupDirtySet);
          }
          dirtySet.add(array);
        }
        function cleanupDirtySet() {
          dirtySet.forEach(cleanupConnections);
          dirtySet.clear();
        }
        function cleanupConnections(connections) {
          algorithm.ArrayExt.removeAllWhere(connections, isDeadConnection);
        }
        function isDeadConnection(connection) {
          return connection.signal === null;
        }
        Private2.blockedProperty = new properties.AttachedProperty({
          name: "blocked",
          create: function () {
            return 0;
          },
        });
      })(Private || (Private = {}));
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  },
});

// node_modules/@jupyterlab/coreutils/lib/activitymonitor.js
var require_activitymonitor = __commonJS({
  "node_modules/@jupyterlab/coreutils/lib/activitymonitor.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ActivityMonitor = void 0;
    var signaling_1 = require_dist3();
    var ActivityMonitor = class {
      /**
       * Construct a new activity monitor.
       */
      constructor(options) {
        this._timer = -1;
        this._timeout = -1;
        this._isDisposed = false;
        this._activityStopped = new signaling_1.Signal(this);
        options.signal.connect(this._onSignalFired, this);
        this._timeout = options.timeout || 1e3;
      }
      /**
       * A signal emitted when activity has ceased.
       */
      get activityStopped() {
        return this._activityStopped;
      }
      /**
       * The timeout associated with the monitor, in milliseconds.
       */
      get timeout() {
        return this._timeout;
      }
      set timeout(value) {
        this._timeout = value;
      }
      /**
       * Test whether the monitor has been disposed.
       *
       * #### Notes
       * This is a read-only property.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Dispose of the resources used by the activity monitor.
       */
      dispose() {
        if (this._isDisposed) {
          return;
        }
        this._isDisposed = true;
        signaling_1.Signal.clearData(this);
      }
      /**
       * A signal handler for the monitored signal.
       */
      _onSignalFired(sender, args) {
        clearTimeout(this._timer);
        this._sender = sender;
        this._args = args;
        this._timer = setTimeout(() => {
          this._activityStopped.emit({
            sender: this._sender,
            args: this._args,
          });
        }, this._timeout);
      }
    };
    exports2.ActivityMonitor = ActivityMonitor;
  },
});

// node_modules/@jupyterlab/coreutils/lib/interfaces.js
var require_interfaces = __commonJS({
  "node_modules/@jupyterlab/coreutils/lib/interfaces.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
  },
});

// node_modules/@jupyterlab/coreutils/lib/markdowncodeblocks.js
var require_markdowncodeblocks = __commonJS({
  "node_modules/@jupyterlab/coreutils/lib/markdowncodeblocks.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MarkdownCodeBlocks = void 0;
    var MarkdownCodeBlocks;
    (function (MarkdownCodeBlocks2) {
      MarkdownCodeBlocks2.CODE_BLOCK_MARKER = "```";
      const markdownExtensions = [
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
      class MarkdownCodeBlock {
        constructor(startLine) {
          this.startLine = startLine;
          this.code = "";
          this.endLine = -1;
        }
      }
      MarkdownCodeBlocks2.MarkdownCodeBlock = MarkdownCodeBlock;
      function isMarkdown(extension) {
        return markdownExtensions.indexOf(extension) > -1;
      }
      MarkdownCodeBlocks2.isMarkdown = isMarkdown;
      function findMarkdownCodeBlocks(text) {
        if (!text || text === "") {
          return [];
        }
        const lines = text.split("\n");
        const codeBlocks = [];
        let currentBlock = null;
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
          const line = lines[lineIndex];
          const lineContainsMarker =
            line.indexOf(MarkdownCodeBlocks2.CODE_BLOCK_MARKER) === 0;
          const constructingBlock = currentBlock != null;
          if (!lineContainsMarker && !constructingBlock) {
            continue;
          }
          if (!constructingBlock) {
            currentBlock = new MarkdownCodeBlock(lineIndex);
            const firstIndex = line.indexOf(
              MarkdownCodeBlocks2.CODE_BLOCK_MARKER,
            );
            const lastIndex = line.lastIndexOf(
              MarkdownCodeBlocks2.CODE_BLOCK_MARKER,
            );
            const isSingleLine = firstIndex !== lastIndex;
            if (isSingleLine) {
              currentBlock.code = line.substring(
                firstIndex + MarkdownCodeBlocks2.CODE_BLOCK_MARKER.length,
                lastIndex,
              );
              currentBlock.endLine = lineIndex;
              codeBlocks.push(currentBlock);
              currentBlock = null;
            }
          } else if (currentBlock) {
            if (lineContainsMarker) {
              currentBlock.endLine = lineIndex - 1;
              codeBlocks.push(currentBlock);
              currentBlock = null;
            } else {
              currentBlock.code += line + "\n";
            }
          }
        }
        return codeBlocks;
      }
      MarkdownCodeBlocks2.findMarkdownCodeBlocks = findMarkdownCodeBlocks;
    })(
      (MarkdownCodeBlocks =
        exports2.MarkdownCodeBlocks || (exports2.MarkdownCodeBlocks = {})),
    );
  },
});

// node_modules/@lumino/coreutils/dist/index.js
var require_dist4 = __commonJS({
  "node_modules/@lumino/coreutils/dist/index.js"(exports2, module2) {
    init_process_development();
    (function (global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined"
        ? factory(exports2)
        : typeof define === "function" && define.amd
          ? define(["exports"], factory)
          : ((global2 =
              typeof globalThis !== "undefined" ? globalThis : global2 || self),
            factory((global2.lumino_coreutils = {})));
    })(exports2, function (exports3) {
      "use strict";
      exports3.JSONExt = void 0;
      (function (JSONExt) {
        JSONExt.emptyObject = Object.freeze({});
        JSONExt.emptyArray = Object.freeze([]);
        function isPrimitive(value) {
          return (
            value === null ||
            typeof value === "boolean" ||
            typeof value === "number" ||
            typeof value === "string"
          );
        }
        JSONExt.isPrimitive = isPrimitive;
        function isArray(value) {
          return Array.isArray(value);
        }
        JSONExt.isArray = isArray;
        function isObject(value) {
          return !isPrimitive(value) && !isArray(value);
        }
        JSONExt.isObject = isObject;
        function deepEqual(first, second) {
          if (first === second) {
            return true;
          }
          if (isPrimitive(first) || isPrimitive(second)) {
            return false;
          }
          var a1 = isArray(first);
          var a2 = isArray(second);
          if (a1 !== a2) {
            return false;
          }
          if (a1 && a2) {
            return deepArrayEqual(first, second);
          }
          return deepObjectEqual(first, second);
        }
        JSONExt.deepEqual = deepEqual;
        function deepCopy(value) {
          if (isPrimitive(value)) {
            return value;
          }
          if (isArray(value)) {
            return deepArrayCopy(value);
          }
          return deepObjectCopy(value);
        }
        JSONExt.deepCopy = deepCopy;
        function deepArrayEqual(first, second) {
          if (first === second) {
            return true;
          }
          if (first.length !== second.length) {
            return false;
          }
          for (var i = 0, n = first.length; i < n; ++i) {
            if (!deepEqual(first[i], second[i])) {
              return false;
            }
          }
          return true;
        }
        function deepObjectEqual(first, second) {
          if (first === second) {
            return true;
          }
          for (var key in first) {
            if (first[key] !== void 0 && !(key in second)) {
              return false;
            }
          }
          for (var key in second) {
            if (second[key] !== void 0 && !(key in first)) {
              return false;
            }
          }
          for (var key in first) {
            var firstValue = first[key];
            var secondValue = second[key];
            if (firstValue === void 0 && secondValue === void 0) {
              continue;
            }
            if (firstValue === void 0 || secondValue === void 0) {
              return false;
            }
            if (!deepEqual(firstValue, secondValue)) {
              return false;
            }
          }
          return true;
        }
        function deepArrayCopy(value) {
          var result = new Array(value.length);
          for (var i = 0, n = value.length; i < n; ++i) {
            result[i] = deepCopy(value[i]);
          }
          return result;
        }
        function deepObjectCopy(value) {
          var result = {};
          for (var key in value) {
            var subvalue = value[key];
            if (subvalue === void 0) {
              continue;
            }
            result[key] = deepCopy(subvalue);
          }
          return result;
        }
      })(exports3.JSONExt || (exports3.JSONExt = {}));
      var MimeData =
        /** @class */
        (function () {
          function MimeData2() {
            this._types = [];
            this._values = [];
          }
          MimeData2.prototype.types = function () {
            return this._types.slice();
          };
          MimeData2.prototype.hasData = function (mime) {
            return this._types.indexOf(mime) !== -1;
          };
          MimeData2.prototype.getData = function (mime) {
            var i = this._types.indexOf(mime);
            return i !== -1 ? this._values[i] : void 0;
          };
          MimeData2.prototype.setData = function (mime, data) {
            this.clearData(mime);
            this._types.push(mime);
            this._values.push(data);
          };
          MimeData2.prototype.clearData = function (mime) {
            var i = this._types.indexOf(mime);
            if (i !== -1) {
              this._types.splice(i, 1);
              this._values.splice(i, 1);
            }
          };
          MimeData2.prototype.clear = function () {
            this._types.length = 0;
            this._values.length = 0;
          };
          return MimeData2;
        })();
      var PromiseDelegate =
        /** @class */
        (function () {
          function PromiseDelegate2() {
            var _this = this;
            this.promise = new Promise(function (resolve, reject) {
              _this._resolve = resolve;
              _this._reject = reject;
            });
          }
          PromiseDelegate2.prototype.resolve = function (value) {
            var resolve = this._resolve;
            resolve(value);
          };
          PromiseDelegate2.prototype.reject = function (reason) {
            var reject = this._reject;
            reject(reason);
          };
          return PromiseDelegate2;
        })();
      var Token =
        /** @class */
        (function () {
          function Token2(name2) {
            this.name = name2;
            this._tokenStructuralPropertyT = null;
          }
          return Token2;
        })();
      function fallbackRandomValues(buffer) {
        var value = 0;
        for (var i = 0, n = buffer.length; i < n; ++i) {
          if (i % 4 === 0) {
            value = (Math.random() * 4294967295) >>> 0;
          }
          buffer[i] = value & 255;
          value >>>= 8;
        }
      }
      exports3.Random = void 0;
      (function (Random) {
        Random.getRandomValues = (function () {
          var crypto =
            (typeof window !== "undefined" &&
              (window.crypto || window.msCrypto)) ||
            null;
          if (crypto && typeof crypto.getRandomValues === "function") {
            return function getRandomValues(buffer) {
              return crypto.getRandomValues(buffer);
            };
          }
          return fallbackRandomValues;
        })();
      })(exports3.Random || (exports3.Random = {}));
      function uuid4Factory(getRandomValues) {
        var bytes = new Uint8Array(16);
        var lut = new Array(256);
        for (var i = 0; i < 16; ++i) {
          lut[i] = "0" + i.toString(16);
        }
        for (var i = 16; i < 256; ++i) {
          lut[i] = i.toString(16);
        }
        return function uuid4() {
          getRandomValues(bytes);
          bytes[6] = 64 | (bytes[6] & 15);
          bytes[8] = 128 | (bytes[8] & 63);
          return (
            lut[bytes[0]] +
            lut[bytes[1]] +
            lut[bytes[2]] +
            lut[bytes[3]] +
            "-" +
            lut[bytes[4]] +
            lut[bytes[5]] +
            "-" +
            lut[bytes[6]] +
            lut[bytes[7]] +
            "-" +
            lut[bytes[8]] +
            lut[bytes[9]] +
            "-" +
            lut[bytes[10]] +
            lut[bytes[11]] +
            lut[bytes[12]] +
            lut[bytes[13]] +
            lut[bytes[14]] +
            lut[bytes[15]]
          );
        };
      }
      exports3.UUID = void 0;
      (function (UUID) {
        UUID.uuid4 = uuid4Factory(exports3.Random.getRandomValues);
      })(exports3.UUID || (exports3.UUID = {}));
      exports3.MimeData = MimeData;
      exports3.PromiseDelegate = PromiseDelegate;
      exports3.Token = Token;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  },
});

// node_modules/minimist/index.js
var require_minimist = __commonJS({
  "node_modules/minimist/index.js"(exports2, module2) {
    "use strict";
    init_process_development();
    function hasKey(obj, keys) {
      var o = obj;
      keys.slice(0, -1).forEach(function (key2) {
        o = o[key2] || {};
      });
      var key = keys[keys.length - 1];
      return key in o;
    }
    function isNumber(x) {
      if (typeof x === "number") {
        return true;
      }
      if (/^0x[0-9a-f]+$/i.test(x)) {
        return true;
      }
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    function isConstructorOrProto(obj, key) {
      return (
        (key === "constructor" && typeof obj[key] === "function") ||
        key === "__proto__"
      );
    }
    module2.exports = function (args, opts) {
      if (!opts) {
        opts = {};
      }
      var flags = {
        bools: {},
        strings: {},
        unknownFn: null,
      };
      if (typeof opts.unknown === "function") {
        flags.unknownFn = opts.unknown;
      }
      if (typeof opts.boolean === "boolean" && opts.boolean) {
        flags.allBools = true;
      } else {
        []
          .concat(opts.boolean)
          .filter(Boolean)
          .forEach(function (key2) {
            flags.bools[key2] = true;
          });
      }
      var aliases = {};
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function (x) {
          return flags.bools[x];
        });
      }
      Object.keys(opts.alias || {}).forEach(function (key2) {
        aliases[key2] = [].concat(opts.alias[key2]);
        aliases[key2].forEach(function (x) {
          aliases[x] = [key2].concat(
            aliases[key2].filter(function (y) {
              return x !== y;
            }),
          );
        });
      });
      []
        .concat(opts.string)
        .filter(Boolean)
        .forEach(function (key2) {
          flags.strings[key2] = true;
          if (aliases[key2]) {
            [].concat(aliases[key2]).forEach(function (k) {
              flags.strings[k] = true;
            });
          }
        });
      var defaults = opts.default || {};
      var argv = { _: [] };
      function argDefined(key2, arg2) {
        return (
          (flags.allBools && /^--[^=]+$/.test(arg2)) ||
          flags.strings[key2] ||
          flags.bools[key2] ||
          aliases[key2]
        );
      }
      function setKey(obj, keys, value2) {
        var o = obj;
        for (var i2 = 0; i2 < keys.length - 1; i2++) {
          var key2 = keys[i2];
          if (isConstructorOrProto(o, key2)) {
            return;
          }
          if (o[key2] === void 0) {
            o[key2] = {};
          }
          if (
            o[key2] === Object.prototype ||
            o[key2] === Number.prototype ||
            o[key2] === String.prototype
          ) {
            o[key2] = {};
          }
          if (o[key2] === Array.prototype) {
            o[key2] = [];
          }
          o = o[key2];
        }
        var lastKey = keys[keys.length - 1];
        if (isConstructorOrProto(o, lastKey)) {
          return;
        }
        if (
          o === Object.prototype ||
          o === Number.prototype ||
          o === String.prototype
        ) {
          o = {};
        }
        if (o === Array.prototype) {
          o = [];
        }
        if (
          o[lastKey] === void 0 ||
          flags.bools[lastKey] ||
          typeof o[lastKey] === "boolean"
        ) {
          o[lastKey] = value2;
        } else if (Array.isArray(o[lastKey])) {
          o[lastKey].push(value2);
        } else {
          o[lastKey] = [o[lastKey], value2];
        }
      }
      function setArg(key2, val, arg2) {
        if (arg2 && flags.unknownFn && !argDefined(key2, arg2)) {
          if (flags.unknownFn(arg2) === false) {
            return;
          }
        }
        var value2 = !flags.strings[key2] && isNumber(val) ? Number(val) : val;
        setKey(argv, key2.split("."), value2);
        (aliases[key2] || []).forEach(function (x) {
          setKey(argv, x.split("."), value2);
        });
      }
      Object.keys(flags.bools).forEach(function (key2) {
        setArg(key2, defaults[key2] === void 0 ? false : defaults[key2]);
      });
      var notFlags = [];
      if (args.indexOf("--") !== -1) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
      }
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var key;
        var next;
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
          key = m[1];
          var value = m[2];
          if (flags.bools[key]) {
            value = value !== "false";
          }
          setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg)) {
          key = arg.match(/^--no-(.+)/)[1];
          setArg(key, false, arg);
        } else if (/^--.+/.test(arg)) {
          key = arg.match(/^--(.+)/)[1];
          next = args[i + 1];
          if (
            next !== void 0 &&
            !/^(-|--)[^-]/.test(next) &&
            !flags.bools[key] &&
            !flags.allBools &&
            (aliases[key] ? !aliasIsBoolean(key) : true)
          ) {
            setArg(key, next, arg);
            i += 1;
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === "true", arg);
            i += 1;
          } else {
            setArg(key, flags.strings[key] ? "" : true, arg);
          }
        } else if (/^-[^-]+/.test(arg)) {
          var letters = arg.slice(1, -1).split("");
          var broken = false;
          for (var j = 0; j < letters.length; j++) {
            next = arg.slice(j + 2);
            if (next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && next[0] === "=") {
              setArg(letters[j], next.slice(1), arg);
              broken = true;
              break;
            }
            if (
              /[A-Za-z]/.test(letters[j]) &&
              /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)
            ) {
              setArg(letters[j], next, arg);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg);
              broken = true;
              break;
            } else {
              setArg(letters[j], flags.strings[letters[j]] ? "" : true, arg);
            }
          }
          key = arg.slice(-1)[0];
          if (!broken && key !== "-") {
            if (
              args[i + 1] &&
              !/^(-|--)[^-]/.test(args[i + 1]) &&
              !flags.bools[key] &&
              (aliases[key] ? !aliasIsBoolean(key) : true)
            ) {
              setArg(key, args[i + 1], arg);
              i += 1;
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === "true", arg);
              i += 1;
            } else {
              setArg(key, flags.strings[key] ? "" : true, arg);
            }
          }
        } else {
          if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
            argv._.push(flags.strings._ || !isNumber(arg) ? arg : Number(arg));
          }
          if (opts.stopEarly) {
            argv._.push.apply(argv._, args.slice(i + 1));
            break;
          }
        }
      }
      Object.keys(defaults).forEach(function (k) {
        if (!hasKey(argv, k.split("."))) {
          setKey(argv, k.split("."), defaults[k]);
          (aliases[k] || []).forEach(function (x) {
            setKey(argv, x.split("."), defaults[k]);
          });
        }
      });
      if (opts["--"]) {
        argv["--"] = notFlags.slice();
      } else {
        notFlags.forEach(function (k) {
          argv._.push(k);
        });
      }
      return argv;
    };
  },
});

// node_modules/path-browserify/index.js
var require_path_browserify = __commonJS({
  "node_modules/path-browserify/index.js"(exports2, module2) {
    "use strict";
    init_process_development();
    function assertPath(path2) {
      if (typeof path2 !== "string") {
        throw new TypeError(
          "Path must be a string. Received " + JSON.stringify(path2),
        );
      }
    }
    function normalizeStringPosix(path2, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path2.length; ++i) {
        if (i < path2.length) code = path2.charCodeAt(i);
        else if (code === 47) break;
        else code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (
              res.length < 2 ||
              lastSegmentLength !== 2 ||
              res.charCodeAt(res.length - 1) !== 46 ||
              res.charCodeAt(res.length - 2) !== 46
            ) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0) res += "/..";
              else res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) res += "/" + path2.slice(lastSlash + 1, i);
            else res = path2.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base =
        pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    var posix = {
      // path.resolve([from ...], to)
      resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path2;
          if (i >= 0) path2 = arguments[i];
          else {
            if (cwd === void 0) cwd = process.cwd();
            path2 = cwd;
          }
          assertPath(path2);
          if (path2.length === 0) {
            continue;
          }
          resolvedPath = path2 + "/" + resolvedPath;
          resolvedAbsolute = path2.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0) return "/" + resolvedPath;
          else return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      },
      normalize: function normalize(path2) {
        assertPath(path2);
        if (path2.length === 0) return ".";
        var isAbsolute = path2.charCodeAt(0) === 47;
        var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
        path2 = normalizeStringPosix(path2, !isAbsolute);
        if (path2.length === 0 && !isAbsolute) path2 = ".";
        if (path2.length > 0 && trailingSeparator) path2 += "/";
        if (isAbsolute) return "/" + path2;
        return path2;
      },
      isAbsolute: function isAbsolute(path2) {
        assertPath(path2);
        return path2.length > 0 && path2.charCodeAt(0) === 47;
      },
      join: function join() {
        if (arguments.length === 0) return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0) joined = arg;
            else joined += "/" + arg;
          }
        }
        if (joined === void 0) return ".";
        return posix.normalize(joined);
      },
      relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to) return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to) return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47) break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47) break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode) break;
          else if (fromCode === 47) lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
          }
        }
        if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47) ++toStart;
          return to.slice(toStart);
        }
      },
      _makeLong: function _makeLong(path2) {
        return path2;
      },
      dirname: function dirname(path2) {
        assertPath(path2);
        if (path2.length === 0) return ".";
        var code = path2.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path2.length - 1; i >= 1; --i) {
          code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1) return hasRoot ? "/" : ".";
        if (hasRoot && end === 1) return "//";
        return path2.slice(0, end);
      },
      basename: function basename(path2, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path2);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
          if (ext.length === path2.length && ext === path2) return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path2.length - 1; i >= 0; --i) {
            var code = path2.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end) end = firstNonSlashEnd;
          else if (end === -1) end = path2.length;
          return path2.slice(start, end);
        } else {
          for (i = path2.length - 1; i >= 0; --i) {
            if (path2.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1) return "";
          return path2.slice(start, end);
        }
      },
      extname: function extname(path2) {
        assertPath(path2);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path2.length - 1; i >= 0; --i) {
          var code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (
          startDot === -1 ||
          end === -1 || // We saw a non-dot character immediately before the dot
          preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
          (preDotState === 1 &&
            startDot === end - 1 &&
            startDot === startPart + 1)
        ) {
          return "";
        }
        return path2.slice(startDot, end);
      },
      format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError(
            'The "pathObject" argument must be of type Object. Received type ' +
              typeof pathObject,
          );
        }
        return _format("/", pathObject);
      },
      parse: function parse(path2) {
        assertPath(path2);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path2.length === 0) return ret;
        var code = path2.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path2.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (
          startDot === -1 ||
          end === -1 || // We saw a non-dot character immediately before the dot
          preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
          (preDotState === 1 &&
            startDot === end - 1 &&
            startDot === startPart + 1)
        ) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute)
              ret.base = ret.name = path2.slice(1, end);
            else ret.base = ret.name = path2.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path2.slice(1, startDot);
            ret.base = path2.slice(1, end);
          } else {
            ret.name = path2.slice(startPart, startDot);
            ret.base = path2.slice(startPart, end);
          }
          ret.ext = path2.slice(startDot, end);
        }
        if (startPart > 0) ret.dir = path2.slice(0, startPart - 1);
        else if (isAbsolute) ret.dir = "/";
        return ret;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null,
    };
    posix.posix = posix;
    module2.exports = posix;
  },
});

// node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/requires-port/index.js"(exports2, module2) {
    "use strict";
    init_process_development();
    module2.exports = function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port) return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    };
  },
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/querystringify/index.js"(exports2) {
    "use strict";
    init_process_development();
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    function encode(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g,
        result = {},
        part;
      while ((part = parser.exec(query))) {
        var key = decode(part[1]),
          value = decode(part[2]);
        if (key === null || value === null || key in result) continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [],
        value,
        key;
      if ("string" !== typeof prefix) prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode(key);
          value = encode(value);
          if (key === null || value === null) continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports2.stringify = querystringify;
    exports2.parse = querystring;
  },
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/url-parse/index.js"(exports2, module2) {
    "use strict";
    init_process_development();
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace =
      /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1],
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined") globalVar = window;
      else if (typeof this !== "undefined") globalVar = this;
      else if (typeof self !== "undefined") globalVar = self;
      else globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {},
        type = typeof loc,
        key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore) delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore) continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return (
        scheme === "file:" ||
        scheme === "ftp:" ||
        scheme === "http:" ||
        scheme === "https:" ||
        scheme === "ws:" ||
        scheme === "wss:"
      );
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest,
      };
    }
    function resolve(relative, base) {
      if (relative === "") return base;
      var path2 = (base || "/")
          .split("/")
          .slice(0, -1)
          .concat(relative.split("/")),
        i = path2.length,
        last = path2[i - 1],
        unshift = false,
        up = 0;
      while (i--) {
        if (path2[i] === ".") {
          path2.splice(i, 1);
        } else if (path2[i] === "..") {
          path2.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0) unshift = true;
          path2.splice(i, 1);
          up--;
        }
      }
      if (unshift) path2.unshift("");
      if (last === "." || last === "..") path2.push("");
      return path2.join("/");
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative,
        extracted,
        parse,
        instruction,
        index,
        key,
        instructions = rules.slice(),
        type = typeof location,
        url = this,
        i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser) parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || (relative && location.slashes);
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (
        (extracted.protocol === "file:" &&
          (extracted.slashesCount !== 2 || windowsDriveLetter.test(address))) ||
        (!extracted.slashes &&
          (extracted.protocol ||
            extracted.slashesCount < 2 ||
            !isSpecial(url.protocol)))
      ) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse = instruction[0];
        key = instruction[1];
        if (parse !== parse) {
          url[key] = address;
        } else if ("string" === typeof parse) {
          index =
            parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if ((index = parse.exec(address))) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] =
          url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4]) url[key] = url[key].toLowerCase();
      }
      if (parser) url.query = parser(url.query);
      if (
        relative &&
        location.slashes &&
        url.pathname.charAt(0) !== "/" &&
        (url.pathname !== "" || location.pathname !== "")
      ) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password
          ? url.username + ":" + url.password
          : url.username;
      }
      url.origin =
        url.protocol !== "file:" && isSpecial(url.protocol) && url.host
          ? url.protocol + "//" + url.host
          : "null";
      url.href = url.toString();
    }
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port) value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password
        ? url.username + ":" + url.password
        : url.username;
      url.origin =
        url.protocol !== "file:" && isSpecial(url.protocol) && url.host
          ? url.protocol + "//" + url.host
          : "null";
      url.href = url.toString();
      return url;
    }
    function toString(stringify) {
      if (!stringify || "function" !== typeof stringify)
        stringify = qs.stringify;
      var query,
        url = this,
        host = url.host,
        protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":")
        protocol += ":";
      var result =
        protocol +
        ((url.protocol && url.slashes) || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password) result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (
        url.protocol !== "file:" &&
        isSpecial(url.protocol) &&
        !host &&
        url.pathname !== "/"
      ) {
        result += "@";
      }
      if (
        host[host.length - 1] === ":" ||
        (port.test(url.hostname) && !url.port)
      ) {
        host += ":";
      }
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify(url.query) : url.query;
      if (query) result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash) result += url.hash;
      return result;
    }
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  },
});

// node_modules/@jupyterlab/coreutils/lib/url.js
var require_url = __commonJS({
  "node_modules/@jupyterlab/coreutils/lib/url.js"(exports2) {
    "use strict";
    init_process_development();
    var __importDefault2 =
      (exports2 && exports2.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.URLExt = void 0;
    var path_1 = require_path_browserify();
    var url_parse_1 = __importDefault2(require_url_parse());
    var URLExt;
    (function (URLExt2) {
      function parse(url) {
        if (typeof document !== "undefined" && document) {
          const a = document.createElement("a");
          a.href = url;
          return a;
        }
        return url_parse_1.default(url);
      }
      URLExt2.parse = parse;
      function getHostName(url) {
        return url_parse_1.default(url).hostname;
      }
      URLExt2.getHostName = getHostName;
      function normalize(url) {
        return url && parse(url).toString();
      }
      URLExt2.normalize = normalize;
      function join(...parts) {
        const u = url_parse_1.default(parts[0], {});
        const prefix = `${u.protocol}${u.slashes ? "//" : ""}${u.auth}${u.auth ? "@" : ""}${u.host}`;
        const path2 = path_1.posix.join(
          `${!!prefix && u.pathname[0] !== "/" ? "/" : ""}${u.pathname}`,
          ...parts.slice(1),
        );
        return `${prefix}${path2 === "." ? "" : path2}`;
      }
      URLExt2.join = join;
      function encodeParts(url) {
        return join(...url.split("/").map(encodeURIComponent));
      }
      URLExt2.encodeParts = encodeParts;
      function objectToQueryString(value) {
        const keys = Object.keys(value).filter((key) => key.length > 0);
        if (!keys.length) {
          return "";
        }
        return (
          "?" +
          keys
            .map((key) => {
              const content = encodeURIComponent(String(value[key]));
              return key + (content ? "=" + content : "");
            })
            .join("&")
        );
      }
      URLExt2.objectToQueryString = objectToQueryString;
      function queryStringToObject(value) {
        return value
          .replace(/^\?/, "")
          .split("&")
          .reduce((acc, val) => {
            const [key, value2] = val.split("=");
            if (key.length > 0) {
              acc[key] = decodeURIComponent(value2 || "");
            }
            return acc;
          }, {});
      }
      URLExt2.queryStringToObject = queryStringToObject;
      function isLocal(url) {
        const { protocol } = parse(url);
        return (
          (!protocol || url.toLowerCase().indexOf(protocol) !== 0) &&
          url.indexOf("/") !== 0
        );
      }
      URLExt2.isLocal = isLocal;
    })((URLExt = exports2.URLExt || (exports2.URLExt = {})));
  },
});

// node_modules/@jupyterlab/coreutils/lib/pageconfig.js
var require_pageconfig = __commonJS({
  "node_modules/@jupyterlab/coreutils/lib/pageconfig.js"(exports, module) {
    "use strict";
    init_process_development();
    var __importDefault =
      (exports && exports.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PageConfig = void 0;
    var coreutils_1 = require_dist4();
    var minimist_1 = __importDefault(require_minimist());
    var url_1 = require_url();
    var PageConfig;
    (function (PageConfig) {
      function getOption(name) {
        if (configData) {
          return configData[name] || getBodyData(name);
        }
        configData = /* @__PURE__ */ Object.create(null);
        let found = false;
        if (typeof document !== "undefined" && document) {
          const el = document.getElementById("jupyter-config-data");
          if (el) {
            configData = JSON.parse(el.textContent || "");
            found = true;
          }
        }
        if (!found && typeof process !== "undefined" && process.argv) {
          try {
            const cli = minimist_1.default(process.argv.slice(2));
            const path = require_path_browserify();
            let fullPath = "";
            if ("jupyter-config-data" in cli) {
              fullPath = path.resolve(cli["jupyter-config-data"]);
            } else if ("JUPYTER_CONFIG_DATA" in process.env) {
              fullPath = path.resolve(process.env["JUPYTER_CONFIG_DATA"]);
            }
            if (fullPath) {
              configData = eval("require")(fullPath);
            }
          } catch (e) {
            console.error(e);
          }
        }
        if (!coreutils_1.JSONExt.isObject(configData)) {
          configData = /* @__PURE__ */ Object.create(null);
        } else {
          for (const key in configData) {
            if (typeof configData[key] !== "string") {
              configData[key] = JSON.stringify(configData[key]);
            }
          }
        }
        return configData[name] || getBodyData(name);
      }
      PageConfig.getOption = getOption;
      function setOption(name2, value) {
        const last = getOption(name2);
        configData[name2] = value;
        return last;
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
          url_1.URLExt.join(getShareUrl(), getOption("treeUrl")),
        );
      }
      PageConfig.getTreeShareUrl = getTreeShareUrl;
      function getUrl(options) {
        var _a, _b, _c;
        let path2 = getOption("baseUrl") || "/";
        const mode =
          (_a = options.mode) !== null && _a !== void 0
            ? _a
            : getOption("mode");
        const workspace =
          (_b = options.workspace) !== null && _b !== void 0
            ? _b
            : getOption("workspace");
        const labOrDoc = mode === "multiple-document" ? "lab" : "doc";
        path2 = url_1.URLExt.join(path2, labOrDoc);
        if (workspace !== PageConfig.defaultWorkspace) {
          path2 = url_1.URLExt.join(
            path2,
            "workspaces",
            encodeURIComponent(getOption("workspace")),
          );
        }
        const treePath =
          (_c = options.treePath) !== null && _c !== void 0
            ? _c
            : getOption("treePath");
        if (treePath) {
          path2 = url_1.URLExt.join(
            path2,
            "tree",
            url_1.URLExt.encodeParts(treePath),
          );
        }
        return path2;
      }
      PageConfig.getUrl = getUrl;
      PageConfig.defaultWorkspace = "default";
      function getWsUrl(baseUrl) {
        let wsUrl = getOption("wsUrl");
        if (!wsUrl) {
          baseUrl = baseUrl ? url_1.URLExt.normalize(baseUrl) : getBaseUrl();
          if (baseUrl.indexOf("http") !== 0) {
            return "";
          }
          wsUrl = "ws" + baseUrl.slice(4);
        }
        return url_1.URLExt.normalize(wsUrl);
      }
      PageConfig.getWsUrl = getWsUrl;
      function getNBConvertURL({ path: path2, format, download }) {
        const notebookPath = url_1.URLExt.encodeParts(path2);
        const url = url_1.URLExt.join(
          getBaseUrl(),
          "nbconvert",
          format,
          notebookPath,
        );
        if (download) {
          return url + "?download=true";
        }
        return url;
      }
      PageConfig.getNBConvertURL = getNBConvertURL;
      function getToken() {
        return getOption("token") || getBodyData("jupyterApiToken");
      }
      PageConfig.getToken = getToken;
      function getNotebookVersion() {
        const notebookVersion = getOption("notebookVersion");
        if (notebookVersion === "") {
          return [0, 0, 0];
        }
        return JSON.parse(notebookVersion);
      }
      PageConfig.getNotebookVersion = getNotebookVersion;
      let configData = null;
      function getBodyData(key) {
        if (typeof document === "undefined" || !document.body) {
          return "";
        }
        const val = document.body.dataset[key];
        if (typeof val === "undefined") {
          return "";
        }
        return decodeURIComponent(val);
      }
      let Extension;
      (function (Extension2) {
        function populate(key) {
          try {
            const raw = getOption(key);
            if (raw) {
              return JSON.parse(raw);
            }
          } catch (error) {
            console.warn(`Unable to parse ${key}.`, error);
          }
          return [];
        }
        Extension2.deferred = populate("deferredExtensions");
        Extension2.disabled = populate("disabledExtensions");
        function isDeferred(id) {
          const separatorIndex = id.indexOf(":");
          let extName = "";
          if (separatorIndex !== -1) {
            extName = id.slice(0, separatorIndex);
          }
          return Extension2.deferred.some(
            (val) => val === id || (extName && val === extName),
          );
        }
        Extension2.isDeferred = isDeferred;
        function isDisabled(id) {
          const separatorIndex = id.indexOf(":");
          let extName = "";
          if (separatorIndex !== -1) {
            extName = id.slice(0, separatorIndex);
          }
          return Extension2.disabled.some(
            (val) => val === id || (extName && val === extName),
          );
        }
        Extension2.isDisabled = isDisabled;
      })((Extension = PageConfig.Extension || (PageConfig.Extension = {})));
    })((PageConfig = exports.PageConfig || (exports.PageConfig = {})));
  },
});

// node_modules/@jupyterlab/coreutils/lib/path.js
var require_path = __commonJS({
  "node_modules/@jupyterlab/coreutils/lib/path.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PathExt = void 0;
    var path_1 = require_path_browserify();
    var PathExt;
    (function (PathExt2) {
      function join(...paths) {
        const path2 = path_1.posix.join(...paths);
        return path2 === "." ? "" : removeSlash(path2);
      }
      PathExt2.join = join;
      function basename(path2, ext) {
        return path_1.posix.basename(path2, ext);
      }
      PathExt2.basename = basename;
      function dirname(path2) {
        const dir = removeSlash(path_1.posix.dirname(path2));
        return dir === "." ? "" : dir;
      }
      PathExt2.dirname = dirname;
      function extname(path2) {
        return path_1.posix.extname(path2);
      }
      PathExt2.extname = extname;
      function normalize(path2) {
        if (path2 === "") {
          return "";
        }
        return removeSlash(path_1.posix.normalize(path2));
      }
      PathExt2.normalize = normalize;
      function resolve(...parts) {
        return removeSlash(path_1.posix.resolve(...parts));
      }
      PathExt2.resolve = resolve;
      function relative(from, to) {
        return removeSlash(path_1.posix.relative(from, to));
      }
      PathExt2.relative = relative;
      function normalizeExtension(extension) {
        if (extension.length > 0 && extension.indexOf(".") !== 0) {
          extension = `.${extension}`;
        }
        return extension;
      }
      PathExt2.normalizeExtension = normalizeExtension;
      function removeSlash(path2) {
        if (path2.indexOf("/") === 0) {
          path2 = path2.slice(1);
        }
        return path2;
      }
      PathExt2.removeSlash = removeSlash;
    })((PathExt = exports2.PathExt || (exports2.PathExt = {})));
  },
});

// node_modules/@jupyterlab/coreutils/lib/text.js
var require_text = __commonJS({
  "node_modules/@jupyterlab/coreutils/lib/text.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Text = void 0;
    var Text;
    (function (Text2) {
      const HAS_SURROGATES = "\u{1D41A}".length > 1;
      function jsIndexToCharIndex(jsIdx, text) {
        if (HAS_SURROGATES) {
          return jsIdx;
        }
        let charIdx = jsIdx;
        for (let i = 0; i + 1 < text.length && i < jsIdx; i++) {
          const charCode = text.charCodeAt(i);
          if (charCode >= 55296 && charCode <= 56319) {
            const nextCharCode = text.charCodeAt(i + 1);
            if (nextCharCode >= 56320 && nextCharCode <= 57343) {
              charIdx--;
              i++;
            }
          }
        }
        return charIdx;
      }
      Text2.jsIndexToCharIndex = jsIndexToCharIndex;
      function charIndexToJsIndex(charIdx, text) {
        if (HAS_SURROGATES) {
          return charIdx;
        }
        let jsIdx = charIdx;
        for (let i = 0; i + 1 < text.length && i < jsIdx; i++) {
          const charCode = text.charCodeAt(i);
          if (charCode >= 55296 && charCode <= 56319) {
            const nextCharCode = text.charCodeAt(i + 1);
            if (nextCharCode >= 56320 && nextCharCode <= 57343) {
              jsIdx++;
              i++;
            }
          }
        }
        return jsIdx;
      }
      Text2.charIndexToJsIndex = charIndexToJsIndex;
      function camelCase(str, upper = false) {
        return str.replace(/^(\w)|[\s-_:]+(\w)/g, function (match, p1, p2) {
          if (p2) {
            return p2.toUpperCase();
          } else {
            return upper ? p1.toUpperCase() : p1.toLowerCase();
          }
        });
      }
      Text2.camelCase = camelCase;
      function titleCase(str) {
        return (str || "")
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      Text2.titleCase = titleCase;
    })((Text = exports2.Text || (exports2.Text = {})));
  },
});

// build/webpack/moment.js
var moment_exports = {};
__export(moment_exports, {
  default: () => moment_default,
});
function moment_default(dateTime) {
  return {
    formatNow: () => {
      try {
        return dateTime.toLocaleString();
      } catch (e) {
        return `${dateTime}`;
      }
    },
    format: () => {
      try {
        return dateTime.toLocaleTimeString();
      } catch (e) {
        return `${dateTime}`;
      }
    },
  };
}
var init_moment = __esm({
  "build/webpack/moment.js"() {
    "use strict";
    init_process_development();
  },
});

// node_modules/@jupyterlab/coreutils/lib/time.js
var require_time = __commonJS({
  "node_modules/@jupyterlab/coreutils/lib/time.js"(exports2) {
    "use strict";
    init_process_development();
    var __importDefault2 =
      (exports2 && exports2.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Time = void 0;
    var moment_1 = __importDefault2(
      (init_moment(), __toCommonJS(moment_exports)),
    );
    var Time;
    (function (Time2) {
      function formatHuman(value) {
        moment_1.default.locale(document.documentElement.lang);
        let time = moment_1.default(value).fromNow();
        time = time === "a few seconds ago" ? "seconds ago" : time;
        return time;
      }
      Time2.formatHuman = formatHuman;
      function format(value, timeFormat = "YYYY-MM-DD HH:mm") {
        return moment_1.default(value).format(timeFormat);
      }
      Time2.format = format;
    })((Time = exports2.Time || (exports2.Time = {})));
  },
});

// node_modules/@jupyterlab/coreutils/lib/index.js
var require_lib = __commonJS({
  "node_modules/@jupyterlab/coreutils/lib/index.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __exportStar =
      (exports2 && exports2.__exportStar) ||
      function (m, exports3) {
        for (var p in m)
          if (
            p !== "default" &&
            !Object.prototype.hasOwnProperty.call(exports3, p)
          )
            __createBinding(exports3, m, p);
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_activitymonitor(), exports2);
    __exportStar(require_interfaces(), exports2);
    __exportStar(require_markdowncodeblocks(), exports2);
    __exportStar(require_pageconfig(), exports2);
    __exportStar(require_path(), exports2);
    __exportStar(require_text(), exports2);
    __exportStar(require_time(), exports2);
    __exportStar(require_url(), exports2);
  },
});

// node_modules/@jupyterlab/services/lib/config/index.js
var require_config = __commonJS({
  "node_modules/@jupyterlab/services/lib/config/index.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfigWithDefaults = exports2.ConfigSection = void 0;
    var coreutils_12 = require_lib();
    var __1 = require_lib3();
    var SERVICE_CONFIG_URL = "api/config";
    var ConfigSection;
    (function (ConfigSection2) {
      function create2(options) {
        const section = new DefaultConfigSection(options);
        return section.load().then(() => {
          return section;
        });
      }
      ConfigSection2.create = create2;
    })(
      (ConfigSection = exports2.ConfigSection || (exports2.ConfigSection = {})),
    );
    var DefaultConfigSection = class {
      /**
       * Construct a new config section.
       */
      constructor(options) {
        var _a;
        this._url = "unknown";
        const settings = (this.serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : __1.ServerConnection.makeSettings());
        this._url = coreutils_12.URLExt.join(
          settings.baseUrl,
          SERVICE_CONFIG_URL,
          encodeURIComponent(options.name),
        );
      }
      /**
       * Get the data for this section.
       */
      get data() {
        return this._data;
      }
      /**
       * Load the initial data for this section.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/config).
       *
       * The promise is fulfilled on a valid response and rejected otherwise.
       */
      async load() {
        const response = await __1.ServerConnection.makeRequest(
          this._url,
          {},
          this.serverSettings,
        );
        if (response.status !== 200) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        this._data = await response.json();
      }
      /**
       * Modify the stored config values.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/config).
       *
       * The promise is fulfilled on a valid response and rejected otherwise.
       *
       * Updates the local data immediately, sends the change to the server,
       * and updates the local data with the response, and fulfils the promise
       * with that data.
       */
      async update(newdata) {
        this._data = Object.assign(Object.assign({}, this._data), newdata);
        const init = {
          method: "PATCH",
          body: JSON.stringify(newdata),
        };
        const response = await __1.ServerConnection.makeRequest(
          this._url,
          init,
          this.serverSettings,
        );
        if (response.status !== 200) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        this._data = await response.json();
        return this._data;
      }
    };
    var ConfigWithDefaults = class {
      /**
       * Create a new config with defaults.
       */
      constructor(options) {
        var _a, _b;
        this._className = "";
        this._section = options.section;
        this._defaults =
          (_a = options.defaults) !== null && _a !== void 0 ? _a : {};
        this._className =
          (_b = options.className) !== null && _b !== void 0 ? _b : "";
      }
      /**
       * Get data from the config section or fall back to defaults.
       */
      get(key) {
        const data = this._classData();
        return key in data ? data[key] : this._defaults[key];
      }
      /**
       * Set a config value.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/config).
       *
       * The promise is fulfilled on a valid response and rejected otherwise.
       *
       * Sends the update to the server, and changes our local copy of the data
       * immediately.
       */
      set(key, value) {
        const d = {};
        d[key] = value;
        if (this._className) {
          const d2 = {};
          d2[this._className] = d;
          return this._section.update(d2);
        } else {
          return this._section.update(d);
        }
      }
      /**
       * Get data from the Section with our classname, if available.
       *
       * #### Notes
       * If we have no classname, get all of the data in the Section
       */
      _classData() {
        const data = this._section.data;
        if (this._className && this._className in data) {
          return data[this._className];
        }
        return data;
      }
    };
    exports2.ConfigWithDefaults = ConfigWithDefaults;
  },
});

// node_modules/@jupyterlab/services/lib/validate.js
var require_validate = __commonJS({
  "node_modules/@jupyterlab/services/lib/validate.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateProperty = void 0;
    function validateProperty(object, name2, typeName, values = []) {
      if (!object.hasOwnProperty(name2)) {
        throw Error(`Missing property '${name2}'`);
      }
      const value = object[name2];
      if (typeName !== void 0) {
        let valid = true;
        switch (typeName) {
          case "array":
            valid = Array.isArray(value);
            break;
          case "object":
            valid = typeof value !== "undefined";
            break;
          default:
            valid = typeof value === typeName;
        }
        if (!valid) {
          throw new Error(`Property '${name2}' is not of type '${typeName}'`);
        }
        if (values.length > 0) {
          let valid2 = true;
          switch (typeName) {
            case "string":
            case "number":
            case "boolean":
              valid2 = values.includes(value);
              break;
            default:
              valid2 = values.findIndex((v) => v === value) >= 0;
              break;
          }
          if (!valid2) {
            throw new Error(
              `Property '${name2}' is not one of the valid values ${JSON.stringify(values)}`,
            );
          }
        }
      }
    }
    exports2.validateProperty = validateProperty;
  },
});

// node_modules/@jupyterlab/services/lib/contents/validate.js
var require_validate2 = __commonJS({
  "node_modules/@jupyterlab/services/lib/contents/validate.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateCheckpointModel = exports2.validateContentsModel = void 0;
    var validate_1 = require_validate();
    function validateContentsModel(model) {
      validate_1.validateProperty(model, "name", "string");
      validate_1.validateProperty(model, "path", "string");
      validate_1.validateProperty(model, "type", "string");
      validate_1.validateProperty(model, "created", "string");
      validate_1.validateProperty(model, "last_modified", "string");
      validate_1.validateProperty(model, "mimetype", "object");
      validate_1.validateProperty(model, "content", "object");
      validate_1.validateProperty(model, "format", "object");
    }
    exports2.validateContentsModel = validateContentsModel;
    function validateCheckpointModel(model) {
      validate_1.validateProperty(model, "id", "string");
      validate_1.validateProperty(model, "last_modified", "string");
    }
    exports2.validateCheckpointModel = validateCheckpointModel;
  },
});

// node_modules/@jupyterlab/services/lib/contents/index.js
var require_contents = __commonJS({
  "node_modules/@jupyterlab/services/lib/contents/index.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Drive = exports2.ContentsManager = exports2.Contents = void 0;
    var coreutils_12 = require_lib();
    var algorithm_1 = require_dist();
    var signaling_1 = require_dist3();
    var __1 = require_lib3();
    var validate = __importStar(require_validate2());
    var SERVICE_DRIVE_URL = "api/contents";
    var FILES_URL = "files";
    var Contents;
    (function (Contents2) {
      function validateContentsModel(contents) {
        validate.validateContentsModel(contents);
      }
      Contents2.validateContentsModel = validateContentsModel;
      function validateCheckpointModel(checkpoint) {
        validate.validateCheckpointModel(checkpoint);
      }
      Contents2.validateCheckpointModel = validateCheckpointModel;
    })((Contents = exports2.Contents || (exports2.Contents = {})));
    var ContentsManager = class {
      /**
       * Construct a new contents manager object.
       *
       * @param options - The options used to initialize the object.
       */
      constructor(options = {}) {
        var _a, _b;
        this._isDisposed = false;
        this._additionalDrives = /* @__PURE__ */ new Map();
        this._fileChanged = new signaling_1.Signal(this);
        const serverSettings = (this.serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : __1.ServerConnection.makeSettings());
        this._defaultDrive =
          (_b = options.defaultDrive) !== null && _b !== void 0
            ? _b
            : new Drive({ serverSettings });
        this._defaultDrive.fileChanged.connect(this._onFileChanged, this);
      }
      /**
       * A signal emitted when a file operation takes place.
       */
      get fileChanged() {
        return this._fileChanged;
      }
      /**
       * Test whether the manager has been disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Dispose of the resources held by the manager.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._isDisposed = true;
        signaling_1.Signal.clearData(this);
      }
      /**
       * Add an `IDrive` to the manager.
       */
      addDrive(drive) {
        this._additionalDrives.set(drive.name, drive);
        drive.fileChanged.connect(this._onFileChanged, this);
      }
      /**
       * Given a path, get a ModelDB.IFactory from the
       * relevant backend. Returns `undefined` if the backend
       * does not provide one.
       */
      getModelDBFactory(path2) {
        var _a;
        const [drive] = this._driveForPath(path2);
        return (_a =
          drive === null || drive === void 0
            ? void 0
            : drive.modelDBFactory) !== null && _a !== void 0
          ? _a
          : null;
      }
      /**
       * Given a path of the form `drive:local/portion/of/it.txt`
       * get the local part of it.
       *
       * @param path: the path.
       *
       * @returns The local part of the path.
       */
      localPath(path2) {
        const parts = path2.split("/");
        const firstParts = parts[0].split(":");
        if (
          firstParts.length === 1 ||
          !this._additionalDrives.has(firstParts[0])
        ) {
          return coreutils_12.PathExt.removeSlash(path2);
        }
        return coreutils_12.PathExt.join(
          firstParts.slice(1).join(":"),
          ...parts.slice(1),
        );
      }
      /**
       * Normalize a global path. Reduces '..' and '.' parts, and removes
       * leading slashes from the local part of the path, while retaining
       * the drive name if it exists.
       *
       * @param path: the path.
       *
       * @returns The normalized path.
       */
      normalize(path2) {
        const parts = path2.split(":");
        if (parts.length === 1) {
          return coreutils_12.PathExt.normalize(path2);
        }
        return `${parts[0]}:${coreutils_12.PathExt.normalize(parts.slice(1).join(":"))}`;
      }
      /**
       * Resolve a global path, starting from the root path. Behaves like
       * posix-path.resolve, with 3 differences:
       *  - will never prepend cwd
       *  - if root has a drive name, the result is prefixed with "<drive>:"
       *  - before adding drive name, leading slashes are removed
       *
       * @param path: the path.
       *
       * @returns The normalized path.
       */
      resolvePath(root, path2) {
        const driveName = this.driveName(root);
        const localPath = this.localPath(root);
        const resolved = coreutils_12.PathExt.resolve("/", localPath, path2);
        return driveName ? `${driveName}:${resolved}` : resolved;
      }
      /**
       * Given a path of the form `drive:local/portion/of/it.txt`
       * get the name of the drive. If the path is missing
       * a drive portion, returns an empty string.
       *
       * @param path: the path.
       *
       * @returns The drive name for the path, or the empty string.
       */
      driveName(path2) {
        const parts = path2.split("/");
        const firstParts = parts[0].split(":");
        if (firstParts.length === 1) {
          return "";
        }
        if (this._additionalDrives.has(firstParts[0])) {
          return firstParts[0];
        }
        return "";
      }
      /**
       * Get a file or directory.
       *
       * @param path: The path to the file.
       *
       * @param options: The options used to fetch the file.
       *
       * @returns A promise which resolves with the file content.
       */
      get(path2, options) {
        const [drive, localPath] = this._driveForPath(path2);
        return drive.get(localPath, options).then((contentsModel) => {
          const listing = [];
          if (contentsModel.type === "directory" && contentsModel.content) {
            algorithm_1.each(contentsModel.content, (item) => {
              listing.push(
                Object.assign(Object.assign({}, item), {
                  path: this._toGlobalPath(drive, item.path),
                }),
              );
            });
            return Object.assign(Object.assign({}, contentsModel), {
              path: this._toGlobalPath(drive, localPath),
              content: listing,
            });
          } else {
            return Object.assign(Object.assign({}, contentsModel), {
              path: this._toGlobalPath(drive, localPath),
            });
          }
        });
      }
      /**
       * Get an encoded download url given a file path.
       *
       * @param path - An absolute POSIX file path on the server.
       *
       * #### Notes
       * It is expected that the path contains no relative paths.
       *
       * The returned URL may include a query parameter.
       */
      getDownloadUrl(path2) {
        const [drive, localPath] = this._driveForPath(path2);
        return drive.getDownloadUrl(localPath);
      }
      /**
       * Create a new untitled file or directory in the specified directory path.
       *
       * @param options: The options used to create the file.
       *
       * @returns A promise which resolves with the created file content when the
       *    file is created.
       */
      newUntitled(options = {}) {
        if (options.path) {
          const globalPath = this.normalize(options.path);
          const [drive, localPath] = this._driveForPath(globalPath);
          return drive
            .newUntitled(
              Object.assign(Object.assign({}, options), { path: localPath }),
            )
            .then((contentsModel) => {
              return Object.assign(Object.assign({}, contentsModel), {
                path: coreutils_12.PathExt.join(globalPath, contentsModel.name),
              });
            });
        } else {
          return this._defaultDrive.newUntitled(options);
        }
      }
      /**
       * Delete a file.
       *
       * @param path - The path to the file.
       *
       * @returns A promise which resolves when the file is deleted.
       */
      delete(path2) {
        const [drive, localPath] = this._driveForPath(path2);
        return drive.delete(localPath);
      }
      /**
       * Rename a file or directory.
       *
       * @param path - The original file path.
       *
       * @param newPath - The new file path.
       *
       * @returns A promise which resolves with the new file contents model when
       *   the file is renamed.
       */
      rename(path2, newPath) {
        const [drive1, path1] = this._driveForPath(path2);
        const [drive2, path22] = this._driveForPath(newPath);
        if (drive1 !== drive2) {
          throw Error(
            "ContentsManager: renaming files must occur within a Drive",
          );
        }
        return drive1.rename(path1, path22).then((contentsModel) => {
          return Object.assign(Object.assign({}, contentsModel), {
            path: this._toGlobalPath(drive1, path22),
          });
        });
      }
      /**
       * Save a file.
       *
       * @param path - The desired file path.
       *
       * @param options - Optional overrides to the model.
       *
       * @returns A promise which resolves with the file content model when the
       *   file is saved.
       *
       * #### Notes
       * Ensure that `model.content` is populated for the file.
       */
      save(path2, options = {}) {
        const globalPath = this.normalize(path2);
        const [drive, localPath] = this._driveForPath(path2);
        return drive
          .save(
            localPath,
            Object.assign(Object.assign({}, options), { path: localPath }),
          )
          .then((contentsModel) => {
            return Object.assign(Object.assign({}, contentsModel), {
              path: globalPath,
            });
          });
      }
      /**
       * Copy a file into a given directory.
       *
       * @param path - The original file path.
       *
       * @param toDir - The destination directory path.
       *
       * @returns A promise which resolves with the new contents model when the
       *  file is copied.
       *
       * #### Notes
       * The server will select the name of the copied file.
       */
      copy(fromFile, toDir) {
        const [drive1, path1] = this._driveForPath(fromFile);
        const [drive2, path2] = this._driveForPath(toDir);
        if (drive1 === drive2) {
          return drive1.copy(path1, path2).then((contentsModel) => {
            return Object.assign(Object.assign({}, contentsModel), {
              path: this._toGlobalPath(drive1, contentsModel.path),
            });
          });
        } else {
          throw Error(
            "Copying files between drives is not currently implemented",
          );
        }
      }
      /**
       * Create a checkpoint for a file.
       *
       * @param path - The path of the file.
       *
       * @returns A promise which resolves with the new checkpoint model when the
       *   checkpoint is created.
       */
      createCheckpoint(path2) {
        const [drive, localPath] = this._driveForPath(path2);
        return drive.createCheckpoint(localPath);
      }
      /**
       * List available checkpoints for a file.
       *
       * @param path - The path of the file.
       *
       * @returns A promise which resolves with a list of checkpoint models for
       *    the file.
       */
      listCheckpoints(path2) {
        const [drive, localPath] = this._driveForPath(path2);
        return drive.listCheckpoints(localPath);
      }
      /**
       * Restore a file to a known checkpoint state.
       *
       * @param path - The path of the file.
       *
       * @param checkpointID - The id of the checkpoint to restore.
       *
       * @returns A promise which resolves when the checkpoint is restored.
       */
      restoreCheckpoint(path2, checkpointID) {
        const [drive, localPath] = this._driveForPath(path2);
        return drive.restoreCheckpoint(localPath, checkpointID);
      }
      /**
       * Delete a checkpoint for a file.
       *
       * @param path - The path of the file.
       *
       * @param checkpointID - The id of the checkpoint to delete.
       *
       * @returns A promise which resolves when the checkpoint is deleted.
       */
      deleteCheckpoint(path2, checkpointID) {
        const [drive, localPath] = this._driveForPath(path2);
        return drive.deleteCheckpoint(localPath, checkpointID);
      }
      /**
       * Given a drive and a local path, construct a fully qualified
       * path. The inverse of `_driveForPath`.
       *
       * @param drive: an `IDrive`.
       *
       * @param localPath: the local path on the drive.
       *
       * @returns the fully qualified path.
       */
      _toGlobalPath(drive, localPath) {
        if (drive === this._defaultDrive) {
          return coreutils_12.PathExt.removeSlash(localPath);
        } else {
          return `${drive.name}:${coreutils_12.PathExt.removeSlash(localPath)}`;
        }
      }
      /**
       * Given a path, get the `IDrive to which it refers,
       * where the path satisfies the pattern
       * `'driveName:path/to/file'`. If there is no `driveName`
       * prepended to the path, it returns the default drive.
       *
       * @param path: a path to a file.
       *
       * @returns A tuple containing an `IDrive` object for the path,
       * and a local path for that drive.
       */
      _driveForPath(path2) {
        const driveName = this.driveName(path2);
        const localPath = this.localPath(path2);
        if (driveName) {
          return [this._additionalDrives.get(driveName), localPath];
        } else {
          return [this._defaultDrive, localPath];
        }
      }
      /**
       * Respond to fileChanged signals from the drives attached to
       * the manager. This prepends the drive name to the path if necessary,
       * and then forwards the signal.
       */
      _onFileChanged(sender, args) {
        var _a, _b;
        if (sender === this._defaultDrive) {
          this._fileChanged.emit(args);
        } else {
          let newValue = null;
          let oldValue = null;
          if (
            (_a = args.newValue) === null || _a === void 0 ? void 0 : _a.path
          ) {
            newValue = Object.assign(Object.assign({}, args.newValue), {
              path: this._toGlobalPath(sender, args.newValue.path),
            });
          }
          if (
            (_b = args.oldValue) === null || _b === void 0 ? void 0 : _b.path
          ) {
            oldValue = Object.assign(Object.assign({}, args.oldValue), {
              path: this._toGlobalPath(sender, args.oldValue.path),
            });
          }
          this._fileChanged.emit({
            type: args.type,
            newValue,
            oldValue,
          });
        }
      }
    };
    exports2.ContentsManager = ContentsManager;
    var Drive = class {
      /**
       * Construct a new contents manager object.
       *
       * @param options - The options used to initialize the object.
       */
      constructor(options = {}) {
        var _a, _b, _c;
        this._isDisposed = false;
        this._fileChanged = new signaling_1.Signal(this);
        this.name =
          (_a = options.name) !== null && _a !== void 0 ? _a : "Default";
        this._apiEndpoint =
          (_b = options.apiEndpoint) !== null && _b !== void 0
            ? _b
            : SERVICE_DRIVE_URL;
        this.serverSettings =
          (_c = options.serverSettings) !== null && _c !== void 0
            ? _c
            : __1.ServerConnection.makeSettings();
      }
      /**
       * A signal emitted when a file operation takes place.
       */
      get fileChanged() {
        return this._fileChanged;
      }
      /**
       * Test whether the manager has been disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Dispose of the resources held by the manager.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._isDisposed = true;
        signaling_1.Signal.clearData(this);
      }
      /**
       * Get a file or directory.
       *
       * @param localPath: The path to the file.
       *
       * @param options: The options used to fetch the file.
       *
       * @returns A promise which resolves with the file content.
       *
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
       */
      async get(localPath, options) {
        let url = this._getUrl(localPath);
        if (options) {
          if (options.type === "notebook") {
            delete options["format"];
          }
          const content = options.content ? "1" : "0";
          const params = Object.assign(Object.assign({}, options), { content });
          url += coreutils_12.URLExt.objectToQueryString(params);
        }
        const settings = this.serverSettings;
        const response = await __1.ServerConnection.makeRequest(
          url,
          {},
          settings,
        );
        if (response.status !== 200) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        return data;
      }
      /**
       * Get an encoded download url given a file path.
       *
       * @param localPath - An absolute POSIX file path on the server.
       *
       * #### Notes
       * It is expected that the path contains no relative paths.
       *
       * The returned URL may include a query parameter.
       */
      getDownloadUrl(localPath) {
        const baseUrl = this.serverSettings.baseUrl;
        let url = coreutils_12.URLExt.join(
          baseUrl,
          FILES_URL,
          coreutils_12.URLExt.encodeParts(localPath),
        );
        const xsrfTokenMatch = document.cookie.match("\\b_xsrf=([^;]*)\\b");
        if (xsrfTokenMatch) {
          const fullUrl = new URL(url);
          fullUrl.searchParams.append("_xsrf", xsrfTokenMatch[1]);
          url = fullUrl.toString();
        }
        return Promise.resolve(url);
      }
      /**
       * Create a new untitled file or directory in the specified directory path.
       *
       * @param options: The options used to create the file.
       *
       * @returns A promise which resolves with the created file content when the
       *    file is created.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
       */
      async newUntitled(options = {}) {
        var _a;
        let body = "{}";
        if (options) {
          if (options.ext) {
            options.ext = Private.normalizeExtension(options.ext);
          }
          body = JSON.stringify(options);
        }
        const settings = this.serverSettings;
        const url = this._getUrl(
          (_a = options.path) !== null && _a !== void 0 ? _a : "",
        );
        const init = {
          method: "POST",
          body,
        };
        const response = await __1.ServerConnection.makeRequest(
          url,
          init,
          settings,
        );
        if (response.status !== 201) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        this._fileChanged.emit({
          type: "new",
          oldValue: null,
          newValue: data,
        });
        return data;
      }
      /**
       * Delete a file.
       *
       * @param localPath - The path to the file.
       *
       * @returns A promise which resolves when the file is deleted.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents).
       */
      async delete(localPath) {
        const url = this._getUrl(localPath);
        const settings = this.serverSettings;
        const init = { method: "DELETE" };
        const response = await __1.ServerConnection.makeRequest(
          url,
          init,
          settings,
        );
        if (response.status !== 204) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        this._fileChanged.emit({
          type: "delete",
          oldValue: { path: localPath },
          newValue: null,
        });
      }
      /**
       * Rename a file or directory.
       *
       * @param oldLocalPath - The original file path.
       *
       * @param newLocalPath - The new file path.
       *
       * @returns A promise which resolves with the new file contents model when
       *   the file is renamed.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
       */
      async rename(oldLocalPath, newLocalPath) {
        const settings = this.serverSettings;
        const url = this._getUrl(oldLocalPath);
        const init = {
          method: "PATCH",
          body: JSON.stringify({ path: newLocalPath }),
        };
        const response = await __1.ServerConnection.makeRequest(
          url,
          init,
          settings,
        );
        if (response.status !== 200) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        this._fileChanged.emit({
          type: "rename",
          oldValue: { path: oldLocalPath },
          newValue: data,
        });
        return data;
      }
      /**
       * Save a file.
       *
       * @param localPath - The desired file path.
       *
       * @param options - Optional overrides to the model.
       *
       * @returns A promise which resolves with the file content model when the
       *   file is saved.
       *
       * #### Notes
       * Ensure that `model.content` is populated for the file.
       *
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
       */
      async save(localPath, options = {}) {
        const settings = this.serverSettings;
        const url = this._getUrl(localPath);
        const init = {
          method: "PUT",
          body: JSON.stringify(options),
        };
        const response = await __1.ServerConnection.makeRequest(
          url,
          init,
          settings,
        );
        if (response.status !== 200 && response.status !== 201) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        this._fileChanged.emit({
          type: "save",
          oldValue: null,
          newValue: data,
        });
        return data;
      }
      /**
       * Copy a file into a given directory.
       *
       * @param localPath - The original file path.
       *
       * @param toDir - The destination directory path.
       *
       * @returns A promise which resolves with the new contents model when the
       *  file is copied.
       *
       * #### Notes
       * The server will select the name of the copied file.
       *
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
       */
      async copy(fromFile, toDir) {
        const settings = this.serverSettings;
        const url = this._getUrl(toDir);
        const init = {
          method: "POST",
          body: JSON.stringify({ copy_from: fromFile }),
        };
        const response = await __1.ServerConnection.makeRequest(
          url,
          init,
          settings,
        );
        if (response.status !== 201) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        this._fileChanged.emit({
          type: "new",
          oldValue: null,
          newValue: data,
        });
        return data;
      }
      /**
       * Create a checkpoint for a file.
       *
       * @param localPath - The path of the file.
       *
       * @returns A promise which resolves with the new checkpoint model when the
       *   checkpoint is created.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
       */
      async createCheckpoint(localPath) {
        const url = this._getUrl(localPath, "checkpoints");
        const init = { method: "POST" };
        const response = await __1.ServerConnection.makeRequest(
          url,
          init,
          this.serverSettings,
        );
        if (response.status !== 201) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        const data = await response.json();
        validate.validateCheckpointModel(data);
        return data;
      }
      /**
       * List available checkpoints for a file.
       *
       * @param localPath - The path of the file.
       *
       * @returns A promise which resolves with a list of checkpoint models for
       *    the file.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
       */
      async listCheckpoints(localPath) {
        const url = this._getUrl(localPath, "checkpoints");
        const response = await __1.ServerConnection.makeRequest(
          url,
          {},
          this.serverSettings,
        );
        if (response.status !== 200) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid Checkpoint list");
        }
        for (let i = 0; i < data.length; i++) {
          validate.validateCheckpointModel(data[i]);
        }
        return data;
      }
      /**
       * Restore a file to a known checkpoint state.
       *
       * @param localPath - The path of the file.
       *
       * @param checkpointID - The id of the checkpoint to restore.
       *
       * @returns A promise which resolves when the checkpoint is restored.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents).
       */
      async restoreCheckpoint(localPath, checkpointID) {
        const url = this._getUrl(localPath, "checkpoints", checkpointID);
        const init = { method: "POST" };
        const response = await __1.ServerConnection.makeRequest(
          url,
          init,
          this.serverSettings,
        );
        if (response.status !== 204) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
      }
      /**
       * Delete a checkpoint for a file.
       *
       * @param localPath - The path of the file.
       *
       * @param checkpointID - The id of the checkpoint to delete.
       *
       * @returns A promise which resolves when the checkpoint is deleted.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents).
       */
      async deleteCheckpoint(localPath, checkpointID) {
        const url = this._getUrl(localPath, "checkpoints", checkpointID);
        const init = { method: "DELETE" };
        const response = await __1.ServerConnection.makeRequest(
          url,
          init,
          this.serverSettings,
        );
        if (response.status !== 204) {
          const err = await __1.ServerConnection.ResponseError.create(response);
          throw err;
        }
      }
      /**
       * Get a REST url for a file given a path.
       */
      _getUrl(...args) {
        const parts = args.map((path2) =>
          coreutils_12.URLExt.encodeParts(path2),
        );
        const baseUrl = this.serverSettings.baseUrl;
        return coreutils_12.URLExt.join(baseUrl, this._apiEndpoint, ...parts);
      }
    };
    exports2.Drive = Drive;
    var Private;
    (function (Private2) {
      function normalizeExtension(extension) {
        if (extension.length > 0 && extension.indexOf(".") !== 0) {
          extension = `.${extension}`;
        }
        return extension;
      }
      Private2.normalizeExtension = normalizeExtension;
    })(Private || (Private = {}));
  },
});

// node_modules/@jupyterlab/services/lib/kernel/kernel.js
var require_kernel = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/kernel.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
  },
});

// node_modules/@jupyterlab/services/lib/kernel/messages.js
var require_messages = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/messages.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isInputReplyMsg =
      exports2.isInputRequestMsg =
      exports2.isDebugReplyMsg =
      exports2.isDebugRequestMsg =
      exports2.isExecuteReplyMsg =
      exports2.isInfoRequestMsg =
      exports2.isCommMsgMsg =
      exports2.isCommCloseMsg =
      exports2.isCommOpenMsg =
      exports2.isDebugEventMsg =
      exports2.isClearOutputMsg =
      exports2.isStatusMsg =
      exports2.isErrorMsg =
      exports2.isExecuteResultMsg =
      exports2.isExecuteInputMsg =
      exports2.isUpdateDisplayDataMsg =
      exports2.isDisplayDataMsg =
      exports2.isStreamMsg =
      exports2.createMessage =
        void 0;
    var coreutils_12 = require_dist4();
    function createMessage(options) {
      var _a, _b, _c, _d, _e;
      return {
        buffers: (_a = options.buffers) !== null && _a !== void 0 ? _a : [],
        channel: options.channel,
        content: options.content,
        header: {
          date: /* @__PURE__ */ new Date().toISOString(),
          msg_id:
            (_b = options.msgId) !== null && _b !== void 0
              ? _b
              : coreutils_12.UUID.uuid4(),
          msg_type: options.msgType,
          session: options.session,
          username: (_c = options.username) !== null && _c !== void 0 ? _c : "",
          version: "5.2",
        },
        metadata: (_d = options.metadata) !== null && _d !== void 0 ? _d : {},
        parent_header:
          (_e = options.parentHeader) !== null && _e !== void 0 ? _e : {},
      };
    }
    exports2.createMessage = createMessage;
    function isStreamMsg(msg) {
      return msg.header.msg_type === "stream";
    }
    exports2.isStreamMsg = isStreamMsg;
    function isDisplayDataMsg(msg) {
      return msg.header.msg_type === "display_data";
    }
    exports2.isDisplayDataMsg = isDisplayDataMsg;
    function isUpdateDisplayDataMsg(msg) {
      return msg.header.msg_type === "update_display_data";
    }
    exports2.isUpdateDisplayDataMsg = isUpdateDisplayDataMsg;
    function isExecuteInputMsg(msg) {
      return msg.header.msg_type === "execute_input";
    }
    exports2.isExecuteInputMsg = isExecuteInputMsg;
    function isExecuteResultMsg(msg) {
      return msg.header.msg_type === "execute_result";
    }
    exports2.isExecuteResultMsg = isExecuteResultMsg;
    function isErrorMsg(msg) {
      return msg.header.msg_type === "error";
    }
    exports2.isErrorMsg = isErrorMsg;
    function isStatusMsg(msg) {
      return msg.header.msg_type === "status";
    }
    exports2.isStatusMsg = isStatusMsg;
    function isClearOutputMsg(msg) {
      return msg.header.msg_type === "clear_output";
    }
    exports2.isClearOutputMsg = isClearOutputMsg;
    function isDebugEventMsg(msg) {
      return msg.header.msg_type === "debug_event";
    }
    exports2.isDebugEventMsg = isDebugEventMsg;
    function isCommOpenMsg(msg) {
      return msg.header.msg_type === "comm_open";
    }
    exports2.isCommOpenMsg = isCommOpenMsg;
    function isCommCloseMsg(msg) {
      return msg.header.msg_type === "comm_close";
    }
    exports2.isCommCloseMsg = isCommCloseMsg;
    function isCommMsgMsg(msg) {
      return msg.header.msg_type === "comm_msg";
    }
    exports2.isCommMsgMsg = isCommMsgMsg;
    function isInfoRequestMsg(msg) {
      return msg.header.msg_type === "kernel_info_request";
    }
    exports2.isInfoRequestMsg = isInfoRequestMsg;
    function isExecuteReplyMsg(msg) {
      return msg.header.msg_type === "execute_reply";
    }
    exports2.isExecuteReplyMsg = isExecuteReplyMsg;
    function isDebugRequestMsg(msg) {
      return msg.header.msg_type === "debug_request";
    }
    exports2.isDebugRequestMsg = isDebugRequestMsg;
    function isDebugReplyMsg(msg) {
      return msg.header.msg_type === "debug_reply";
    }
    exports2.isDebugReplyMsg = isDebugReplyMsg;
    function isInputRequestMsg(msg) {
      return msg.header.msg_type === "input_request";
    }
    exports2.isInputRequestMsg = isInputRequestMsg;
    function isInputReplyMsg(msg) {
      return msg.header.msg_type === "input_reply";
    }
    exports2.isInputReplyMsg = isInputReplyMsg;
  },
});

// (disabled):node_modules/node-fetch/browser.js
var require_browser = __commonJS({
  "(disabled):node_modules/node-fetch/browser.js"() {
    init_process_development();
  },
});

// node_modules/@jupyterlab/services/lib/shim/ws.js
var require_ws = __commonJS({
  "node_modules/@jupyterlab/services/lib/shim/ws.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = WebSocket;
  },
});

// node_modules/@jupyterlab/services/lib/serverconnection.js
var require_serverconnection = __commonJS({
  "node_modules/@jupyterlab/services/lib/serverconnection.js"(exports2) {
    "use strict";
    init_process_development();
    var _a;
    var _b;
    var _c;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ServerConnection = void 0;
    var coreutils_12 = require_lib();
    var FETCH;
    var HEADERS;
    var REQUEST;
    var WEBSOCKET;
    if (typeof window === "undefined") {
      const fetchMod = require_browser();
      FETCH = (_a = exports2.fetch) !== null && _a !== void 0 ? _a : fetchMod;
      REQUEST =
        (_b = exports2.Request) !== null && _b !== void 0
          ? _b
          : fetchMod.Request;
      HEADERS =
        (_c = exports2.Headers) !== null && _c !== void 0
          ? _c
          : fetchMod.Headers;
      WEBSOCKET = require_ws();
    } else {
      FETCH = fetch;
      REQUEST = Request;
      HEADERS = Headers;
      WEBSOCKET = WebSocket;
    }
    var ServerConnection2;
    (function (ServerConnection3) {
      function makeSettings(options) {
        return Private.makeSettings(options);
      }
      ServerConnection3.makeSettings = makeSettings;
      function makeRequest(url, init, settings) {
        return Private.handleRequest(url, init, settings);
      }
      ServerConnection3.makeRequest = makeRequest;
      class ResponseError extends Error {
        /**
         * Create a new response error.
         */
        constructor(
          response,
          message = `Invalid response: ${response.status} ${response.statusText}`,
          traceback = "",
        ) {
          super(message);
          this.response = response;
          this.traceback = traceback;
        }
        /**
         * Create a ResponseError from a response, handling the traceback and message
         * as appropriate.
         *
         * @param response The response object.
         *
         * @returns A promise that resolves with a `ResponseError` object.
         */
        static async create(response) {
          try {
            const data = await response.json();
            if (data["traceback"]) {
              console.error(data["traceback"]);
            }
            if (data["message"]) {
              return new ResponseError(response, data["message"]);
            }
            return new ResponseError(response);
          } catch (e) {
            console.debug(e);
            return new ResponseError(response);
          }
        }
      }
      ServerConnection3.ResponseError = ResponseError;
      class NetworkError extends TypeError {
        /**
         * Create a new network error.
         */
        constructor(original) {
          super(original.message);
          this.stack = original.stack;
        }
      }
      ServerConnection3.NetworkError = NetworkError;
    })(
      (ServerConnection2 =
        exports2.ServerConnection || (exports2.ServerConnection = {})),
    );
    var Private;
    (function (Private2) {
      function makeSettings(options = {}) {
        const pageBaseUrl = coreutils_12.PageConfig.getBaseUrl();
        const pageWsUrl = coreutils_12.PageConfig.getWsUrl();
        const baseUrl =
          coreutils_12.URLExt.normalize(options.baseUrl) || pageBaseUrl;
        let wsUrl = options.wsUrl;
        if (!wsUrl && baseUrl === pageBaseUrl) {
          wsUrl = pageWsUrl;
        }
        if (!wsUrl && baseUrl.indexOf("http") === 0) {
          wsUrl = "ws" + baseUrl.slice(4);
        }
        wsUrl = wsUrl !== null && wsUrl !== void 0 ? wsUrl : pageWsUrl;
        return Object.assign(
          Object.assign(
            {
              init: { cache: "no-store", credentials: "same-origin" },
              fetch: FETCH,
              Headers: HEADERS,
              Request: REQUEST,
              WebSocket: WEBSOCKET,
              token: coreutils_12.PageConfig.getToken(),
              appUrl: coreutils_12.PageConfig.getOption("appUrl"),
              appendToken:
                typeof window === "undefined" ||
                process.env.JEST_WORKER_ID !== void 0 ||
                coreutils_12.URLExt.getHostName(pageBaseUrl) !==
                  coreutils_12.URLExt.getHostName(wsUrl),
            },
            options,
          ),
          {
            baseUrl,
            wsUrl,
          },
        );
      }
      Private2.makeSettings = makeSettings;
      function handleRequest(url, init, settings) {
        var _a2;
        if (url.indexOf(settings.baseUrl) !== 0) {
          throw new Error("Can only be used for notebook server requests");
        }
        const cache =
          (_a2 = init.cache) !== null && _a2 !== void 0
            ? _a2
            : settings.init.cache;
        if (cache === "no-store") {
          url +=
            (/\?/.test(url) ? "&" : "?") + /* @__PURE__ */ new Date().getTime();
        }
        const request = new settings.Request(
          url,
          Object.assign(Object.assign({}, settings.init), init),
        );
        let authenticated = false;
        if (settings.token) {
          authenticated = true;
          request.headers.append("Authorization", `token ${settings.token}`);
        }
        if (
          typeof document !== "undefined" &&
          (document === null || document === void 0 ? void 0 : document.cookie)
        ) {
          const xsrfToken = getCookie("_xsrf");
          if (xsrfToken !== void 0) {
            authenticated = true;
            request.headers.append("X-XSRFToken", xsrfToken);
          }
        }
        if (!request.headers.has("Content-Type") && authenticated) {
          request.headers.set("Content-Type", "application/json");
        }
        return settings.fetch.call(null, request).catch((e) => {
          throw new ServerConnection2.NetworkError(e);
        });
      }
      Private2.handleRequest = handleRequest;
      function getCookie(name2) {
        const matches = document.cookie.match("\\b" + name2 + "=([^;]*)\\b");
        return matches === null || matches === void 0 ? void 0 : matches[1];
      }
    })(Private || (Private = {}));
  },
});

// node_modules/@jupyterlab/services/lib/kernel/validate.js
var require_validate3 = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/validate.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateModels =
      exports2.validateModel =
      exports2.validateMessage =
        void 0;
    var validate_1 = require_validate();
    var HEADER_FIELDS = [
      "username",
      "version",
      "session",
      "msg_id",
      "msg_type",
    ];
    var IOPUB_CONTENT_FIELDS = {
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
      // Emitted by the IPython kernel.
    };
    function validateHeader(header) {
      for (let i = 0; i < HEADER_FIELDS.length; i++) {
        validate_1.validateProperty(header, HEADER_FIELDS[i], "string");
      }
    }
    function validateMessage(msg) {
      validate_1.validateProperty(msg, "metadata", "object");
      validate_1.validateProperty(msg, "content", "object");
      validate_1.validateProperty(msg, "channel", "string");
      validateHeader(msg.header);
      if (msg.channel === "iopub") {
        validateIOPubContent(msg);
      }
    }
    exports2.validateMessage = validateMessage;
    function validateIOPubContent(msg) {
      if (msg.channel === "iopub") {
        const fields = IOPUB_CONTENT_FIELDS[msg.header.msg_type];
        if (fields === void 0) {
          return;
        }
        const names = Object.keys(fields);
        const content = msg.content;
        for (let i = 0; i < names.length; i++) {
          let args = fields[names[i]];
          if (!Array.isArray(args)) {
            args = [args];
          }
          validate_1.validateProperty(content, names[i], ...args);
        }
      }
    }
    function validateModel(model) {
      validate_1.validateProperty(model, "name", "string");
      validate_1.validateProperty(model, "id", "string");
    }
    exports2.validateModel = validateModel;
    function validateModels(models) {
      if (!Array.isArray(models)) {
        throw new Error("Invalid kernel list");
      }
      models.forEach((d) => validateModel(d));
    }
    exports2.validateModels = validateModels;
  },
});

// node_modules/@jupyterlab/services/lib/kernel/restapi.js
var require_restapi = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/restapi.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getKernelModel =
      exports2.shutdownKernel =
      exports2.interruptKernel =
      exports2.restartKernel =
      exports2.startNew =
      exports2.listRunning =
      exports2.KERNEL_SERVICE_URL =
        void 0;
    var serverconnection_1 = require_serverconnection();
    var coreutils_12 = require_lib();
    var validate_1 = require_validate3();
    exports2.KERNEL_SERVICE_URL = "api/kernels";
    async function listRunning(
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.KERNEL_SERVICE_URL,
      );
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        {},
        settings,
      );
      if (response.status !== 200) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      validate_1.validateModels(data);
      return data;
    }
    exports2.listRunning = listRunning;
    async function startNew(
      options = {},
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.KERNEL_SERVICE_URL,
      );
      const init = {
        method: "POST",
        body: JSON.stringify(options),
      };
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        init,
        settings,
      );
      if (response.status !== 201) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      validate_1.validateModel(data);
      return data;
    }
    exports2.startNew = startNew;
    async function restartKernel(
      id,
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.KERNEL_SERVICE_URL,
        encodeURIComponent(id),
        "restart",
      );
      const init = { method: "POST" };
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        init,
        settings,
      );
      if (response.status !== 200) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      validate_1.validateModel(data);
    }
    exports2.restartKernel = restartKernel;
    async function interruptKernel(
      id,
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.KERNEL_SERVICE_URL,
        encodeURIComponent(id),
        "interrupt",
      );
      const init = { method: "POST" };
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        init,
        settings,
      );
      if (response.status !== 204) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
    }
    exports2.interruptKernel = interruptKernel;
    async function shutdownKernel(
      id,
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.KERNEL_SERVICE_URL,
        encodeURIComponent(id),
      );
      const init = { method: "DELETE" };
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        init,
        settings,
      );
      if (response.status === 404) {
        const msg = `The kernel "${id}" does not exist on the server`;
        console.warn(msg);
      } else if (response.status !== 204) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
    }
    exports2.shutdownKernel = shutdownKernel;
    async function getKernelModel(
      id,
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.KERNEL_SERVICE_URL,
        encodeURIComponent(id),
      );
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        {},
        settings,
      );
      if (response.status === 404) {
        return void 0;
      } else if (response.status !== 200) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      validate_1.validateModel(data);
      return data;
    }
    exports2.getKernelModel = getKernelModel;
  },
});

// node_modules/@lumino/polling/dist/index.js
var require_dist5 = __commonJS({
  "node_modules/@lumino/polling/dist/index.js"(exports2, module2) {
    init_process_development();
    (function (global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined"
        ? factory(exports2, require_dist4(), require_dist3())
        : typeof define === "function" && define.amd
          ? define(
              ["exports", "@lumino/coreutils", "@lumino/signaling"],
              factory,
            )
          : ((global2 =
              typeof globalThis !== "undefined" ? globalThis : global2 || self),
            factory(
              (global2.lumino_polling = {}),
              global2.lumino_coreutils,
              global2.lumino_signaling,
            ));
    })(exports2, function (exports3, coreutils, signaling) {
      "use strict";
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d2, b2) {
              d2.__proto__ = b2;
            }) ||
          function (d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
        return extendStatics(d, b);
      };
      function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError(
            "Class extends value " +
              String(b) +
              " is not a constructor or null",
          );
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype =
          b === null
            ? Object.create(b)
            : ((__.prototype = b.prototype), new __());
      }
      var __assign = function () {
        __assign =
          Object.assign ||
          function __assign2(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
          };
        return __assign.apply(this, arguments);
      };
      function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      }
      function __generator(thisArg, body) {
        var _ = {
            label: 0,
            sent: function () {
              if (t[0] & 1) throw t[1];
              return t[1];
            },
            trys: [],
            ops: [],
          },
          f,
          y,
          t,
          g;
        return (
          (g = { next: verb(0), throw: verb(1), return: verb(2) }),
          typeof Symbol === "function" &&
            (g[Symbol.iterator] = function () {
              return this;
            }),
          g
        );
        function verb(n) {
          return function (v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (
                ((f = 1),
                y &&
                  (t =
                    op[0] & 2
                      ? y["return"]
                      : op[0]
                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                        : y.next) &&
                  !(t = t.call(y, op[1])).done)
              )
                return t;
              if (((y = 0), t)) op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (
                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                    (op[0] === 6 || op[0] === 2)
                  ) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2]) _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      }
      var defer =
        typeof requestAnimationFrame === "function"
          ? requestAnimationFrame
          : setImmediate;
      var cancel =
        typeof cancelAnimationFrame === "function"
          ? cancelAnimationFrame
          : clearImmediate;
      exports3.Poll =
        /** @class */
        (function () {
          function Poll(options) {
            var _this = this;
            this._disposed = new signaling.Signal(this);
            this._tick = new coreutils.PromiseDelegate();
            this._ticked = new signaling.Signal(this);
            this._timeout = -1;
            this._factory = options.factory;
            this._standby = options.standby || Private.DEFAULT_STANDBY;
            this._state = __assign(__assign({}, Private.DEFAULT_STATE), {
              timestamp: /* @__PURE__ */ new Date().getTime(),
            });
            var frequency = options.frequency || {};
            var max = Math.max(
              frequency.interval || 0,
              frequency.max || 0,
              Private.DEFAULT_FREQUENCY.max,
            );
            this.frequency = __assign(
              __assign(__assign({}, Private.DEFAULT_FREQUENCY), frequency),
              { max },
            );
            this.name = options.name || Private.DEFAULT_NAME;
            if ("auto" in options ? options.auto : true) {
              defer(function () {
                return void _this.start();
              });
            }
          }
          Object.defineProperty(Poll.prototype, "disposed", {
            /**
             * A signal emitted when the poll is disposed.
             */
            get: function () {
              return this._disposed;
            },
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(Poll.prototype, "frequency", {
            /**
             * The polling frequency parameters.
             */
            get: function () {
              return this._frequency;
            },
            set: function (frequency) {
              if (
                this.isDisposed ||
                coreutils.JSONExt.deepEqual(frequency, this.frequency || {})
              ) {
                return;
              }
              var backoff = frequency.backoff,
                interval = frequency.interval,
                max = frequency.max;
              interval = Math.round(interval);
              max = Math.round(max);
              if (typeof backoff === "number" && backoff < 1) {
                throw new Error(
                  "Poll backoff growth factor must be at least 1",
                );
              }
              if ((interval < 0 || interval > max) && interval !== Poll.NEVER) {
                throw new Error("Poll interval must be between 0 and max");
              }
              if (max > Poll.MAX_INTERVAL && max !== Poll.NEVER) {
                throw new Error(
                  "Max interval must be less than " + Poll.MAX_INTERVAL,
                );
              }
              this._frequency = { backoff, interval, max };
            },
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(Poll.prototype, "isDisposed", {
            /**
             * Whether the poll is disposed.
             */
            get: function () {
              return this.state.phase === "disposed";
            },
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(Poll.prototype, "standby", {
            /**
             * Indicates when the poll switches to standby.
             */
            get: function () {
              return this._standby;
            },
            set: function (standby) {
              if (this.isDisposed || this.standby === standby) {
                return;
              }
              this._standby = standby;
            },
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(Poll.prototype, "state", {
            /**
             * The poll state, which is the content of the current poll tick.
             */
            get: function () {
              return this._state;
            },
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(Poll.prototype, "tick", {
            /**
             * A promise that resolves when the poll next ticks.
             */
            get: function () {
              return this._tick.promise;
            },
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(Poll.prototype, "ticked", {
            /**
             * A signal emitted when the poll ticks and fires off a new request.
             */
            get: function () {
              return this._ticked;
            },
            enumerable: true,
            configurable: true,
          });
          Poll.prototype.dispose = function () {
            if (this.isDisposed) {
              return;
            }
            this._state = __assign(__assign({}, Private.DISPOSED_STATE), {
              timestamp: /* @__PURE__ */ new Date().getTime(),
            });
            this._tick.promise.catch(function (_) {
              return void 0;
            });
            this._tick.reject(
              new Error("Poll (" + this.name + ") is disposed."),
            );
            this._disposed.emit(void 0);
            signaling.Signal.clearData(this);
          };
          Poll.prototype.refresh = function () {
            return this.schedule({
              cancel: function (_a) {
                var phase = _a.phase;
                return phase === "refreshed";
              },
              interval: Poll.IMMEDIATE,
              phase: "refreshed",
            });
          };
          Poll.prototype.schedule = function (next) {
            if (next === void 0) {
              next = {};
            }
            return __awaiter(this, void 0, void 0, function () {
              var last, pending, scheduled, state, execute;
              var _this = this;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    if (this.isDisposed) {
                      return [
                        2,
                        /*return*/
                      ];
                    }
                    if (next.cancel && next.cancel(this.state)) {
                      return [
                        2,
                        /*return*/
                      ];
                    }
                    last = this.state;
                    pending = this._tick;
                    scheduled = new coreutils.PromiseDelegate();
                    state = __assign(
                      {
                        interval: this.frequency.interval,
                        payload: null,
                        phase: "standby",
                        timestamp: /* @__PURE__ */ new Date().getTime(),
                      },
                      next,
                    );
                    this._state = state;
                    this._tick = scheduled;
                    if (last.interval === Poll.IMMEDIATE) {
                      cancel(this._timeout);
                    } else {
                      clearTimeout(this._timeout);
                    }
                    this._ticked.emit(this.state);
                    pending.resolve(this);
                    return [4, pending.promise];
                  case 1:
                    _a.sent();
                    execute = function () {
                      if (
                        _this.isDisposed ||
                        _this.tick !== scheduled.promise
                      ) {
                        return;
                      }
                      _this._execute();
                    };
                    this._timeout =
                      state.interval === Poll.IMMEDIATE
                        ? defer(execute)
                        : state.interval === Poll.NEVER
                          ? -1
                          : setTimeout(execute, state.interval);
                    return [
                      2,
                      /*return*/
                    ];
                }
              });
            });
          };
          Poll.prototype.start = function () {
            return this.schedule({
              cancel: function (_a) {
                var phase = _a.phase;
                return (
                  phase !== "constructed" &&
                  phase !== "standby" &&
                  phase !== "stopped"
                );
              },
              interval: Poll.IMMEDIATE,
              phase: "started",
            });
          };
          Poll.prototype.stop = function () {
            return this.schedule({
              cancel: function (_a) {
                var phase = _a.phase;
                return phase === "stopped";
              },
              interval: Poll.NEVER,
              phase: "stopped",
            });
          };
          Poll.prototype._execute = function () {
            var _this = this;
            var standby =
              typeof this.standby === "function"
                ? this.standby()
                : this.standby;
            standby =
              standby === "never"
                ? false
                : standby === "when-hidden"
                  ? !!(
                      typeof document !== "undefined" &&
                      document &&
                      document.hidden
                    )
                  : standby;
            if (standby) {
              void this.schedule();
              return;
            }
            var pending = this.tick;
            this._factory(this.state)
              .then(function (resolved) {
                if (_this.isDisposed || _this.tick !== pending) {
                  return;
                }
                void _this.schedule({
                  payload: resolved,
                  phase:
                    _this.state.phase === "rejected"
                      ? "reconnected"
                      : "resolved",
                });
              })
              .catch(function (rejected) {
                if (_this.isDisposed || _this.tick !== pending) {
                  return;
                }
                void _this.schedule({
                  interval: Private.sleep(_this.frequency, _this.state),
                  payload: rejected,
                  phase: "rejected",
                });
              });
          };
          return Poll;
        })();
      (function (Poll) {
        Poll.IMMEDIATE = 0;
        Poll.MAX_INTERVAL = 2147483647;
        Poll.NEVER = Infinity;
      })(exports3.Poll || (exports3.Poll = {}));
      var Private;
      (function (Private2) {
        Private2.DEFAULT_BACKOFF = 3;
        Private2.DEFAULT_FREQUENCY = {
          backoff: true,
          interval: 1e3,
          max: 30 * 1e3,
        };
        Private2.DEFAULT_NAME = "unknown";
        Private2.DEFAULT_STANDBY = "when-hidden";
        Private2.DEFAULT_STATE = {
          interval: exports3.Poll.NEVER,
          payload: null,
          phase: "constructed",
          timestamp: /* @__PURE__ */ new Date(0).getTime(),
        };
        Private2.DISPOSED_STATE = {
          interval: exports3.Poll.NEVER,
          payload: null,
          phase: "disposed",
          timestamp: /* @__PURE__ */ new Date(0).getTime(),
        };
        function getRandomIntInclusive(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        function sleep(frequency, last) {
          var backoff = frequency.backoff,
            interval = frequency.interval,
            max = frequency.max;
          if (interval === exports3.Poll.NEVER) {
            return interval;
          }
          var growth =
            backoff === true
              ? Private2.DEFAULT_BACKOFF
              : backoff === false
                ? 1
                : backoff;
          var random = getRandomIntInclusive(interval, last.interval * growth);
          return Math.min(max, random);
        }
        Private2.sleep = sleep;
      })(Private || (Private = {}));
      var RateLimiter =
        /** @class */
        (function () {
          function RateLimiter2(fn, limit) {
            var _this = this;
            if (limit === void 0) {
              limit = 500;
            }
            this.payload = null;
            this.limit = limit;
            this.poll = new exports3.Poll({
              auto: false,
              factory: function () {
                return __awaiter(_this, void 0, void 0, function () {
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return [4, fn()];
                      case 1:
                        return [2, _a.sent()];
                    }
                  });
                });
              },
              frequency: {
                backoff: false,
                interval: exports3.Poll.NEVER,
                max: exports3.Poll.NEVER,
              },
              standby: "never",
            });
            this.payload = new coreutils.PromiseDelegate();
            this.poll.ticked.connect(function (_, state) {
              var payload = _this.payload;
              if (state.phase === "resolved") {
                _this.payload = new coreutils.PromiseDelegate();
                payload.resolve(state.payload);
                return;
              }
              if (state.phase === "rejected" || state.phase === "stopped") {
                _this.payload = new coreutils.PromiseDelegate();
                payload.promise.catch(function (_2) {
                  return void 0;
                });
                payload.reject(state.payload);
                return;
              }
            }, this);
          }
          Object.defineProperty(RateLimiter2.prototype, "isDisposed", {
            /**
             * Whether the rate limiter is disposed.
             */
            get: function () {
              return this.payload === null;
            },
            enumerable: true,
            configurable: true,
          });
          RateLimiter2.prototype.dispose = function () {
            if (this.isDisposed) {
              return;
            }
            this.payload = null;
            this.poll.dispose();
          };
          RateLimiter2.prototype.stop = function () {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                return [2, this.poll.stop()];
              });
            });
          };
          return RateLimiter2;
        })();
      var Debouncer =
        /** @class */
        (function (_super) {
          __extends(Debouncer2, _super);
          function Debouncer2() {
            return (_super !== null && _super.apply(this, arguments)) || this;
          }
          Debouncer2.prototype.invoke = function () {
            void this.poll.schedule({ interval: this.limit, phase: "invoked" });
            return this.payload.promise;
          };
          return Debouncer2;
        })(RateLimiter);
      var Throttler =
        /** @class */
        (function (_super) {
          __extends(Throttler2, _super);
          function Throttler2(fn, options) {
            var _this =
              _super.call(
                this,
                fn,
                typeof options === "number"
                  ? options
                  : options && options.limit,
              ) || this;
            var edge = "leading";
            if (typeof options !== "number") {
              options = options || {};
              edge = "edge" in options ? options.edge : edge;
            }
            _this._interval =
              edge === "trailing" ? _this.limit : exports3.Poll.IMMEDIATE;
            return _this;
          }
          Throttler2.prototype.invoke = function () {
            if (this.poll.state.phase !== "invoked") {
              void this.poll.schedule({
                interval: this._interval,
                phase: "invoked",
              });
            }
            return this.payload.promise;
          };
          return Throttler2;
        })(RateLimiter);
      exports3.Debouncer = Debouncer;
      exports3.RateLimiter = RateLimiter;
      exports3.Throttler = Throttler;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  },
});

// node_modules/@jupyterlab/services/lib/basemanager.js
var require_basemanager = __commonJS({
  "node_modules/@jupyterlab/services/lib/basemanager.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BaseManager = void 0;
    var signaling_1 = require_dist3();
    var serverconnection_1 = require_serverconnection();
    var BaseManager = class {
      constructor(options) {
        var _a;
        this._isDisposed = false;
        this._disposed = new signaling_1.Signal(this);
        this.serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : serverconnection_1.ServerConnection.makeSettings();
      }
      /**
       * A signal emitted when the delegate is disposed.
       */
      get disposed() {
        return this._disposed;
      }
      /**
       * Test whether the delegate has been disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Dispose of the delegate and invoke the callback function.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._disposed.emit(void 0);
        signaling_1.Signal.clearData(this);
      }
    };
    exports2.BaseManager = BaseManager;
  },
});

// node_modules/@lumino/disposable/dist/index.js
var require_dist6 = __commonJS({
  "node_modules/@lumino/disposable/dist/index.js"(exports2, module2) {
    init_process_development();
    (function (global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined"
        ? factory(exports2, require_dist(), require_dist3())
        : typeof define === "function" && define.amd
          ? define(
              ["exports", "@lumino/algorithm", "@lumino/signaling"],
              factory,
            )
          : ((global2 =
              typeof globalThis !== "undefined" ? globalThis : global2 || self),
            factory(
              (global2.lumino_disposable = {}),
              global2.lumino_algorithm,
              global2.lumino_signaling,
            ));
    })(exports2, function (exports3, algorithm, signaling) {
      "use strict";
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d2, b2) {
              d2.__proto__ = b2;
            }) ||
          function (d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
        return extendStatics(d, b);
      };
      function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError(
            "Class extends value " +
              String(b) +
              " is not a constructor or null",
          );
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype =
          b === null
            ? Object.create(b)
            : ((__.prototype = b.prototype), new __());
      }
      var DisposableDelegate =
        /** @class */
        (function () {
          function DisposableDelegate2(fn) {
            this._fn = fn;
          }
          Object.defineProperty(DisposableDelegate2.prototype, "isDisposed", {
            /**
             * Test whether the delegate has been disposed.
             */
            get: function () {
              return !this._fn;
            },
            enumerable: true,
            configurable: true,
          });
          DisposableDelegate2.prototype.dispose = function () {
            if (!this._fn) {
              return;
            }
            var fn = this._fn;
            this._fn = null;
            fn();
          };
          return DisposableDelegate2;
        })();
      var ObservableDisposableDelegate =
        /** @class */
        (function (_super) {
          __extends(ObservableDisposableDelegate2, _super);
          function ObservableDisposableDelegate2() {
            var _this =
              (_super !== null && _super.apply(this, arguments)) || this;
            _this._disposed = new signaling.Signal(_this);
            return _this;
          }
          Object.defineProperty(
            ObservableDisposableDelegate2.prototype,
            "disposed",
            {
              /**
               * A signal emitted when the delegate is disposed.
               */
              get: function () {
                return this._disposed;
              },
              enumerable: true,
              configurable: true,
            },
          );
          ObservableDisposableDelegate2.prototype.dispose = function () {
            if (this.isDisposed) {
              return;
            }
            _super.prototype.dispose.call(this);
            this._disposed.emit(void 0);
            signaling.Signal.clearData(this);
          };
          return ObservableDisposableDelegate2;
        })(DisposableDelegate);
      exports3.DisposableSet =
        /** @class */
        (function () {
          function DisposableSet() {
            this._isDisposed = false;
            this._items = /* @__PURE__ */ new Set();
          }
          Object.defineProperty(DisposableSet.prototype, "isDisposed", {
            /**
             * Test whether the set has been disposed.
             */
            get: function () {
              return this._isDisposed;
            },
            enumerable: true,
            configurable: true,
          });
          DisposableSet.prototype.dispose = function () {
            if (this._isDisposed) {
              return;
            }
            this._isDisposed = true;
            this._items.forEach(function (item) {
              item.dispose();
            });
            this._items.clear();
          };
          DisposableSet.prototype.contains = function (item) {
            return this._items.has(item);
          };
          DisposableSet.prototype.add = function (item) {
            this._items.add(item);
          };
          DisposableSet.prototype.remove = function (item) {
            this._items.delete(item);
          };
          DisposableSet.prototype.clear = function () {
            this._items.clear();
          };
          return DisposableSet;
        })();
      (function (DisposableSet) {
        function from(items) {
          var set = new DisposableSet();
          algorithm.each(items, function (item) {
            set.add(item);
          });
          return set;
        }
        DisposableSet.from = from;
      })(exports3.DisposableSet || (exports3.DisposableSet = {}));
      exports3.ObservableDisposableSet =
        /** @class */
        (function (_super) {
          __extends(ObservableDisposableSet, _super);
          function ObservableDisposableSet() {
            var _this =
              (_super !== null && _super.apply(this, arguments)) || this;
            _this._disposed = new signaling.Signal(_this);
            return _this;
          }
          Object.defineProperty(ObservableDisposableSet.prototype, "disposed", {
            /**
             * A signal emitted when the set is disposed.
             */
            get: function () {
              return this._disposed;
            },
            enumerable: true,
            configurable: true,
          });
          ObservableDisposableSet.prototype.dispose = function () {
            if (this.isDisposed) {
              return;
            }
            _super.prototype.dispose.call(this);
            this._disposed.emit(void 0);
            signaling.Signal.clearData(this);
          };
          return ObservableDisposableSet;
        })(exports3.DisposableSet);
      (function (ObservableDisposableSet) {
        function from(items) {
          var set = new ObservableDisposableSet();
          algorithm.each(items, function (item) {
            set.add(item);
          });
          return set;
        }
        ObservableDisposableSet.from = from;
      })(
        exports3.ObservableDisposableSet ||
          (exports3.ObservableDisposableSet = {}),
      );
      exports3.DisposableDelegate = DisposableDelegate;
      exports3.ObservableDisposableDelegate = ObservableDisposableDelegate;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  },
});

// node_modules/@jupyterlab/services/lib/kernel/comm.js
var require_comm = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/comm.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CommHandler = void 0;
    var disposable_1 = require_dist6();
    var KernelMessage2 = __importStar(require_messages());
    var CommHandler = class extends disposable_1.DisposableDelegate {
      /**
       * Construct a new comm channel.
       */
      constructor(target, id, kernel, disposeCb) {
        super(disposeCb);
        this._target = "";
        this._id = "";
        this._id = id;
        this._target = target;
        this._kernel = kernel;
      }
      /**
       * The unique id for the comm channel.
       */
      get commId() {
        return this._id;
      }
      /**
       * The target name for the comm channel.
       */
      get targetName() {
        return this._target;
      }
      /**
       * Get the callback for a comm close event.
       *
       * #### Notes
       * This is called when the comm is closed from either the server or client.
       *
       * **See also:** [[ICommClose]], [[close]]
       */
      get onClose() {
        return this._onClose;
      }
      /**
       * Set the callback for a comm close event.
       *
       * #### Notes
       * This is called when the comm is closed from either the server or client. If
       * the function returns a promise, and the kernel was closed from the server,
       * kernel message processing will pause until the returned promise is
       * fulfilled.
       *
       * **See also:** [[close]]
       */
      set onClose(cb) {
        this._onClose = cb;
      }
      /**
       * Get the callback for a comm message received event.
       */
      get onMsg() {
        return this._onMsg;
      }
      /**
       * Set the callback for a comm message received event.
       *
       * #### Notes
       * This is called when a comm message is received. If the function returns a
       * promise, kernel message processing will pause until it is fulfilled.
       */
      set onMsg(cb) {
        this._onMsg = cb;
      }
      /**
       * Open a comm with optional data and metadata.
       *
       * #### Notes
       * This sends a `comm_open` message to the server.
       *
       * **See also:** [[ICommOpen]]
       */
      open(data, metadata, buffers = []) {
        if (this.isDisposed || this._kernel.isDisposed) {
          throw new Error("Cannot open");
        }
        const msg = KernelMessage2.createMessage({
          msgType: "comm_open",
          channel: "shell",
          username: this._kernel.username,
          session: this._kernel.clientId,
          content: {
            comm_id: this._id,
            target_name: this._target,
            data: data !== null && data !== void 0 ? data : {},
          },
          metadata,
          buffers,
        });
        return this._kernel.sendShellMessage(msg, false, true);
      }
      /**
       * Send a `comm_msg` message to the kernel.
       *
       * #### Notes
       * This is a no-op if the comm has been closed.
       *
       * **See also:** [[ICommMsg]]
       */
      send(data, metadata, buffers = [], disposeOnDone = true) {
        if (this.isDisposed || this._kernel.isDisposed) {
          throw new Error("Cannot send");
        }
        const msg = KernelMessage2.createMessage({
          msgType: "comm_msg",
          channel: "shell",
          username: this._kernel.username,
          session: this._kernel.clientId,
          content: {
            comm_id: this._id,
            data,
          },
          metadata,
          buffers,
        });
        return this._kernel.sendShellMessage(msg, false, disposeOnDone);
      }
      /**
       * Close the comm.
       *
       * #### Notes
       * This will send a `comm_close` message to the kernel, and call the
       * `onClose` callback if set.
       *
       * This is a no-op if the comm is already closed.
       *
       * **See also:** [[ICommClose]], [[onClose]]
       */
      close(data, metadata, buffers = []) {
        if (this.isDisposed || this._kernel.isDisposed) {
          throw new Error("Cannot close");
        }
        const msg = KernelMessage2.createMessage({
          msgType: "comm_close",
          channel: "shell",
          username: this._kernel.username,
          session: this._kernel.clientId,
          content: {
            comm_id: this._id,
            data: data !== null && data !== void 0 ? data : {},
          },
          metadata,
          buffers,
        });
        const future = this._kernel.sendShellMessage(msg, false, true);
        const onClose = this._onClose;
        if (onClose) {
          const ioMsg = KernelMessage2.createMessage({
            msgType: "comm_close",
            channel: "iopub",
            username: this._kernel.username,
            session: this._kernel.clientId,
            content: {
              comm_id: this._id,
              data: data !== null && data !== void 0 ? data : {},
            },
            metadata,
            buffers,
          });
          void onClose(ioMsg);
        }
        this.dispose();
        return future;
      }
    };
    exports2.CommHandler = CommHandler;
  },
});

// node_modules/@jupyterlab/services/lib/kernel/future.js
var require_future = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/future.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.KernelShellFutureHandler =
      exports2.KernelControlFutureHandler =
      exports2.KernelFutureHandler =
        void 0;
    var coreutils_12 = require_dist4();
    var disposable_1 = require_dist6();
    var KernelMessage2 = __importStar(require_messages());
    var KernelFutureHandler = class extends disposable_1.DisposableDelegate {
      /**
       * Construct a new KernelFutureHandler.
       */
      constructor(cb, msg, expectReply, disposeOnDone, kernel) {
        super(cb);
        this._status = 0;
        this._stdin = Private.noOp;
        this._iopub = Private.noOp;
        this._reply = Private.noOp;
        this._done = new coreutils_12.PromiseDelegate();
        this._hooks = new Private.HookList();
        this._disposeOnDone = true;
        this._msg = msg;
        if (!expectReply) {
          this._setFlag(Private.KernelFutureFlag.GotReply);
        }
        this._disposeOnDone = disposeOnDone;
        this._kernel = kernel;
      }
      /**
       * Get the original outgoing message.
       */
      get msg() {
        return this._msg;
      }
      /**
       * A promise that resolves when the future is done.
       */
      get done() {
        return this._done.promise;
      }
      /**
       * Get the reply handler.
       */
      get onReply() {
        return this._reply;
      }
      /**
       * Set the reply handler.
       */
      set onReply(cb) {
        this._reply = cb;
      }
      /**
       * Get the iopub handler.
       */
      get onIOPub() {
        return this._iopub;
      }
      /**
       * Set the iopub handler.
       */
      set onIOPub(cb) {
        this._iopub = cb;
      }
      /**
       * Get the stdin handler.
       */
      get onStdin() {
        return this._stdin;
      }
      /**
       * Set the stdin handler.
       */
      set onStdin(cb) {
        this._stdin = cb;
      }
      /**
       * Register hook for IOPub messages.
       *
       * @param hook - The callback invoked for an IOPub message.
       *
       * #### Notes
       * The IOPub hook system allows you to preempt the handlers for IOPub
       * messages handled by the future.
       *
       * The most recently registered hook is run first. A hook can return a
       * boolean or a promise to a boolean, in which case all kernel message
       * processing pauses until the promise is fulfilled. If a hook return value
       * resolves to false, any later hooks will not run and the function will
       * return a promise resolving to false. If a hook throws an error, the error
       * is logged to the console and the next hook is run. If a hook is
       * registered during the hook processing, it will not run until the next
       * message. If a hook is removed during the hook processing, it will be
       * deactivated immediately.
       */
      registerMessageHook(hook) {
        if (this.isDisposed) {
          throw new Error("Kernel future is disposed");
        }
        this._hooks.add(hook);
      }
      /**
       * Remove a hook for IOPub messages.
       *
       * @param hook - The hook to remove.
       *
       * #### Notes
       * If a hook is removed during the hook processing, it will be deactivated immediately.
       */
      removeMessageHook(hook) {
        if (this.isDisposed) {
          return;
        }
        this._hooks.remove(hook);
      }
      /**
       * Send an `input_reply` message.
       */
      sendInputReply(content) {
        this._kernel.sendInputReply(content);
      }
      /**
       * Dispose and unregister the future.
       */
      dispose() {
        this._stdin = Private.noOp;
        this._iopub = Private.noOp;
        this._reply = Private.noOp;
        this._hooks = null;
        if (!this._testFlag(Private.KernelFutureFlag.IsDone)) {
          this._done.promise.catch(() => {});
          this._done.reject(
            new Error(
              `Canceled future for ${this.msg.header.msg_type} message before replies were done`,
            ),
          );
        }
        super.dispose();
      }
      /**
       * Handle an incoming kernel message.
       */
      async handleMsg(msg) {
        switch (msg.channel) {
          case "control":
          case "shell":
            if (
              msg.channel === this.msg.channel &&
              msg.parent_header.msg_id === this.msg.header.msg_id
            ) {
              await this._handleReply(msg);
            }
            break;
          case "stdin":
            await this._handleStdin(msg);
            break;
          case "iopub":
            await this._handleIOPub(msg);
            break;
          default:
            break;
        }
      }
      async _handleReply(msg) {
        const reply = this._reply;
        if (reply) {
          await reply(msg);
        }
        this._replyMsg = msg;
        this._setFlag(Private.KernelFutureFlag.GotReply);
        if (this._testFlag(Private.KernelFutureFlag.GotIdle)) {
          this._handleDone();
        }
      }
      async _handleStdin(msg) {
        const stdin = this._stdin;
        if (stdin) {
          await stdin(msg);
        }
      }
      async _handleIOPub(msg) {
        const process2 = await this._hooks.process(msg);
        const iopub = this._iopub;
        if (process2 && iopub) {
          await iopub(msg);
        }
        if (
          KernelMessage2.isStatusMsg(msg) &&
          msg.content.execution_state === "idle"
        ) {
          this._setFlag(Private.KernelFutureFlag.GotIdle);
          if (this._testFlag(Private.KernelFutureFlag.GotReply)) {
            this._handleDone();
          }
        }
      }
      _handleDone() {
        if (this._testFlag(Private.KernelFutureFlag.IsDone)) {
          return;
        }
        this._setFlag(Private.KernelFutureFlag.IsDone);
        this._done.resolve(this._replyMsg);
        if (this._disposeOnDone) {
          this.dispose();
        }
      }
      /**
       * Test whether the given future flag is set.
       */
      _testFlag(flag) {
        return (this._status & flag) !== 0;
      }
      /**
       * Set the given future flag.
       */
      _setFlag(flag) {
        this._status |= flag;
      }
    };
    exports2.KernelFutureHandler = KernelFutureHandler;
    var KernelControlFutureHandler = class extends KernelFutureHandler {};
    exports2.KernelControlFutureHandler = KernelControlFutureHandler;
    var KernelShellFutureHandler = class extends KernelFutureHandler {};
    exports2.KernelShellFutureHandler = KernelShellFutureHandler;
    var Private;
    (function (Private2) {
      Private2.noOp = () => {};
      const defer = (() => {
        const ok = typeof requestAnimationFrame === "function";
        return ok ? requestAnimationFrame : setImmediate;
      })();
      class HookList {
        constructor() {
          this._hooks = [];
        }
        /**
         * Register a hook.
         *
         * @param hook - The callback to register.
         */
        add(hook) {
          this.remove(hook);
          this._hooks.push(hook);
        }
        /**
         * Remove a hook, if it exists in the hook list.
         *
         * @param hook - The callback to remove.
         */
        remove(hook) {
          const index = this._hooks.indexOf(hook);
          if (index >= 0) {
            this._hooks[index] = null;
            this._scheduleCompact();
          }
        }
        /**
         * Process a message through the hooks.
         *
         * @returns a promise resolving to false if any hook resolved as false,
         * otherwise true
         *
         * #### Notes
         * The most recently registered hook is run first. A hook can return a
         * boolean or a promise to a boolean, in which case processing pauses until
         * the promise is fulfilled. If a hook return value resolves to false, any
         * later hooks will not run and the function will return a promise resolving
         * to false. If a hook throws an error, the error is logged to the console
         * and the next hook is run. If a hook is registered during the hook
         * processing, it will not run until the next message. If a hook is removed
         * during the hook processing, it will be deactivated immediately.
         */
        async process(msg) {
          await this._processing;
          const processing = new coreutils_12.PromiseDelegate();
          this._processing = processing.promise;
          let continueHandling;
          for (let i = this._hooks.length - 1; i >= 0; i--) {
            const hook = this._hooks[i];
            if (hook === null) {
              continue;
            }
            try {
              continueHandling = await hook(msg);
            } catch (err) {
              continueHandling = true;
              console.error(err);
            }
            if (continueHandling === false) {
              processing.resolve(void 0);
              return false;
            }
          }
          processing.resolve(void 0);
          return true;
        }
        /**
         * Schedule a cleanup of the list, removing any hooks that have been nulled out.
         */
        _scheduleCompact() {
          if (!this._compactScheduled) {
            this._compactScheduled = true;
            defer(() => {
              this._processing = this._processing.then(() => {
                this._compactScheduled = false;
                this._compact();
              });
            });
          }
        }
        /**
         * Compact the list, removing any nulls.
         */
        _compact() {
          let numNulls = 0;
          for (let i = 0, len = this._hooks.length; i < len; i++) {
            const hook = this._hooks[i];
            if (this._hooks[i] === null) {
              numNulls++;
            } else {
              this._hooks[i - numNulls] = hook;
            }
          }
          this._hooks.length -= numNulls;
        }
      }
      Private2.HookList = HookList;
      let KernelFutureFlag;
      (function (KernelFutureFlag2) {
        KernelFutureFlag2[(KernelFutureFlag2["GotReply"] = 1)] = "GotReply";
        KernelFutureFlag2[(KernelFutureFlag2["GotIdle"] = 2)] = "GotIdle";
        KernelFutureFlag2[(KernelFutureFlag2["IsDone"] = 4)] = "IsDone";
        KernelFutureFlag2[(KernelFutureFlag2["DisposeOnDone"] = 8)] =
          "DisposeOnDone";
      })(
        (KernelFutureFlag =
          Private2.KernelFutureFlag || (Private2.KernelFutureFlag = {})),
      );
    })(Private || (Private = {}));
  },
});

// node_modules/@jupyterlab/services/lib/kernel/serialize.js
var require_serialize = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/serialize.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serialize = exports2.deserialize = void 0;
    function deserialize(data) {
      let value;
      if (typeof data === "string") {
        value = JSON.parse(data);
      } else {
        value = deserializeBinary(data);
      }
      return value;
    }
    exports2.deserialize = deserialize;
    function serialize(msg) {
      var _a;
      let value;
      if ((_a = msg.buffers) === null || _a === void 0 ? void 0 : _a.length) {
        value = serializeBinary(msg);
      } else {
        value = JSON.stringify(msg);
      }
      return value;
    }
    exports2.serialize = serialize;
    function deserializeBinary(buf) {
      const data = new DataView(buf);
      const nbufs = data.getUint32(0);
      const offsets = [];
      if (nbufs < 2) {
        throw new Error("Invalid incoming Kernel Message");
      }
      for (let i = 1; i <= nbufs; i++) {
        offsets.push(data.getUint32(i * 4));
      }
      const jsonBytes = new Uint8Array(buf.slice(offsets[0], offsets[1]));
      const msg = JSON.parse(new TextDecoder("utf8").decode(jsonBytes));
      msg.buffers = [];
      for (let i = 1; i < nbufs; i++) {
        const start = offsets[i];
        const stop = offsets[i + 1] || buf.byteLength;
        msg.buffers.push(new DataView(buf.slice(start, stop)));
      }
      return msg;
    }
    function serializeBinary(msg) {
      const offsets = [];
      const buffers = [];
      const encoder = new TextEncoder();
      let origBuffers = [];
      if (msg.buffers !== void 0) {
        origBuffers = msg.buffers;
        delete msg["buffers"];
      }
      const jsonUtf8 = encoder.encode(JSON.stringify(msg));
      buffers.push(jsonUtf8.buffer);
      for (let i = 0; i < origBuffers.length; i++) {
        const b = origBuffers[i];
        buffers.push(ArrayBuffer.isView(b) ? b.buffer : b);
      }
      const nbufs = buffers.length;
      offsets.push(4 * (nbufs + 1));
      for (let i = 0; i + 1 < buffers.length; i++) {
        offsets.push(offsets[offsets.length - 1] + buffers[i].byteLength);
      }
      const msgBuf = new Uint8Array(
        offsets[offsets.length - 1] + buffers[buffers.length - 1].byteLength,
      );
      const view = new DataView(msgBuf.buffer);
      view.setUint32(0, nbufs);
      for (let i = 0; i < offsets.length; i++) {
        view.setUint32(4 * (i + 1), offsets[i]);
      }
      for (let i = 0; i < buffers.length; i++) {
        msgBuf.set(new Uint8Array(buffers[i]), offsets[i]);
      }
      return msgBuf.buffer;
    }
  },
});

// node_modules/@jupyterlab/services/lib/kernelspec/kernelspec.js
var require_kernelspec = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernelspec/kernelspec.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
  },
});

// node_modules/@jupyterlab/services/lib/kernelspec/validate.js
var require_validate4 = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernelspec/validate.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateSpecModels = exports2.validateSpecModel = void 0;
    var validate_1 = require_validate();
    function validateSpecModel(data) {
      const spec = data.spec;
      if (!spec) {
        throw new Error("Invalid kernel spec");
      }
      validate_1.validateProperty(data, "name", "string");
      validate_1.validateProperty(data, "resources", "object");
      validate_1.validateProperty(spec, "language", "string");
      validate_1.validateProperty(spec, "display_name", "string");
      validate_1.validateProperty(spec, "argv", "array");
      let metadata = null;
      if (spec.hasOwnProperty("metadata")) {
        validate_1.validateProperty(spec, "metadata", "object");
        metadata = spec.metadata;
      }
      let env = null;
      if (spec.hasOwnProperty("env")) {
        validate_1.validateProperty(spec, "env", "object");
        env = spec.env;
      }
      return {
        name: data.name,
        resources: data.resources,
        language: spec.language,
        display_name: spec.display_name,
        argv: spec.argv,
        metadata,
        env,
      };
    }
    exports2.validateSpecModel = validateSpecModel;
    function validateSpecModels(data) {
      if (!data.hasOwnProperty("kernelspecs")) {
        throw new Error("No kernelspecs found");
      }
      let keys = Object.keys(data.kernelspecs);
      const kernelspecs = /* @__PURE__ */ Object.create(null);
      let defaultSpec = data.default;
      for (let i = 0; i < keys.length; i++) {
        const ks = data.kernelspecs[keys[i]];
        try {
          kernelspecs[keys[i]] = validateSpecModel(ks);
        } catch (err) {
          console.warn(`Removing errant kernel spec: ${keys[i]}`);
        }
      }
      keys = Object.keys(kernelspecs);
      if (!keys.length) {
        throw new Error("No valid kernelspecs found");
      }
      if (
        !defaultSpec ||
        typeof defaultSpec !== "string" ||
        !(defaultSpec in kernelspecs)
      ) {
        defaultSpec = keys[0];
        console.warn(`Default kernel not found, using '${keys[0]}'`);
      }
      return {
        default: defaultSpec,
        kernelspecs,
      };
    }
    exports2.validateSpecModels = validateSpecModels;
  },
});

// node_modules/@jupyterlab/services/lib/kernelspec/restapi.js
var require_restapi2 = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernelspec/restapi.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSpecs = void 0;
    var serverconnection_1 = require_serverconnection();
    var validate_1 = require_validate4();
    var coreutils_12 = require_lib();
    var KERNELSPEC_SERVICE_URL = "api/kernelspecs";
    async function getSpecs(
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        KERNELSPEC_SERVICE_URL,
      );
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        {},
        settings,
      );
      if (response.status !== 200) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      return validate_1.validateSpecModels(data);
    }
    exports2.getSpecs = getSpecs;
  },
});

// node_modules/@jupyterlab/services/lib/kernelspec/manager.js
var require_manager = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernelspec/manager.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.KernelSpecManager = void 0;
    var coreutils_12 = require_dist4();
    var polling_1 = require_dist5();
    var signaling_1 = require_dist3();
    var restapi = __importStar(require_restapi2());
    var basemanager_1 = require_basemanager();
    var KernelSpecManager = class extends basemanager_1.BaseManager {
      /**
       * Construct a new kernel spec manager.
       *
       * @param options - The default options for kernel.
       */
      constructor(options = {}) {
        var _a;
        super(options);
        this._isReady = false;
        this._connectionFailure = new signaling_1.Signal(this);
        this._specs = null;
        this._specsChanged = new signaling_1.Signal(this);
        this._ready = Promise.all([this.requestSpecs()])
          .then((_) => void 0)
          .catch((_) => void 0)
          .then(() => {
            if (this.isDisposed) {
              return;
            }
            this._isReady = true;
          });
        this._pollSpecs = new polling_1.Poll({
          auto: false,
          factory: () => this.requestSpecs(),
          frequency: {
            interval: 61 * 1e3,
            backoff: true,
            max: 300 * 1e3,
          },
          name: `@jupyterlab/services:KernelSpecManager#specs`,
          standby:
            (_a = options.standby) !== null && _a !== void 0
              ? _a
              : "when-hidden",
        });
        void this.ready.then(() => {
          void this._pollSpecs.start();
        });
      }
      /**
       * Test whether the manager is ready.
       */
      get isReady() {
        return this._isReady;
      }
      /**
       * A promise that fulfills when the manager is ready.
       */
      get ready() {
        return this._ready;
      }
      /**
       * Get the most recently fetched kernel specs.
       */
      get specs() {
        return this._specs;
      }
      /**
       * A signal emitted when the specs change.
       */
      get specsChanged() {
        return this._specsChanged;
      }
      /**
       * A signal emitted when there is a connection failure.
       */
      get connectionFailure() {
        return this._connectionFailure;
      }
      /**
       * Dispose of the resources used by the manager.
       */
      dispose() {
        this._pollSpecs.dispose();
        super.dispose();
      }
      /**
       * Force a refresh of the specs from the server.
       *
       * @returns A promise that resolves when the specs are fetched.
       *
       * #### Notes
       * This is intended to be called only in response to a user action,
       * since the manager maintains its internal state.
       */
      async refreshSpecs() {
        await this._pollSpecs.refresh();
        await this._pollSpecs.tick;
      }
      /**
       * Execute a request to the server to poll specs and update state.
       */
      async requestSpecs() {
        const specs = await restapi.getSpecs(this.serverSettings);
        if (this.isDisposed) {
          return;
        }
        if (!coreutils_12.JSONExt.deepEqual(specs, this._specs)) {
          this._specs = specs;
          this._specsChanged.emit(specs);
        }
      }
    };
    exports2.KernelSpecManager = KernelSpecManager;
  },
});

// node_modules/@jupyterlab/services/lib/kernelspec/index.js
var require_kernelspec2 = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernelspec/index.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __exportStar =
      (exports2 && exports2.__exportStar) ||
      function (m, exports3) {
        for (var p in m)
          if (
            p !== "default" &&
            !Object.prototype.hasOwnProperty.call(exports3, p)
          )
            __createBinding(exports3, m, p);
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.KernelSpecAPI = exports2.KernelSpec = void 0;
    var KernelSpec = __importStar(require_kernelspec());
    exports2.KernelSpec = KernelSpec;
    var KernelSpecAPI = __importStar(require_restapi2());
    exports2.KernelSpecAPI = KernelSpecAPI;
    __exportStar(require_manager(), exports2);
  },
});

// node_modules/@jupyterlab/services/lib/kernel/default.js
var require_default = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/default.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.KernelConnection = void 0;
    var coreutils_12 = require_lib();
    var coreutils_2 = require_dist4();
    var signaling_1 = require_dist3();
    var __1 = require_lib3();
    var comm_1 = require_comm();
    var KernelMessage2 = __importStar(require_messages());
    var future_1 = require_future();
    var serialize = __importStar(require_serialize());
    var validate = __importStar(require_validate3());
    var kernelspec_1 = require_kernelspec2();
    var restapi = __importStar(require_restapi());
    var KERNEL_INFO_TIMEOUT = 3e3;
    var RESTARTING_KERNEL_SESSION = "_RESTARTING_";
    var STARTING_KERNEL_SESSION = "";
    var KernelConnection2 = class _KernelConnection {
      /**
       * Construct a kernel object.
       */
      constructor(options) {
        var _a, _b, _c, _d;
        this._createSocket = () => {
          this._errorIfDisposed();
          this._clearSocket();
          this._updateConnectionStatus("connecting");
          const settings = this.serverSettings;
          const partialUrl = coreutils_12.URLExt.join(
            settings.wsUrl,
            restapi.KERNEL_SERVICE_URL,
            encodeURIComponent(this._id),
          );
          const display = partialUrl.replace(
            /^((?:\w+:)?\/\/)(?:[^@\/]+@)/,
            "$1",
          );
          let url = coreutils_12.URLExt.join(
            partialUrl,
            "channels?session_id=" + encodeURIComponent(this._clientId),
          );
          const token = settings.token;
          if (settings.appendToken && token !== "") {
            url = url + `&token=${encodeURIComponent(token)}`;
          }
          this._ws = new settings.WebSocket(url);
          this._ws.binaryType = "arraybuffer";
          this._ws.onmessage = this._onWSMessage;
          this._ws.onopen = this._onWSOpen;
          this._ws.onclose = this._onWSClose;
          this._ws.onerror = this._onWSClose;
        };
        this._onWSOpen = (evt) => {
          this._updateConnectionStatus("connected");
        };
        this._onWSMessage = (evt) => {
          let msg;
          try {
            msg = serialize.deserialize(evt.data);
            validate.validateMessage(msg);
          } catch (error) {
            error.message = `Kernel message validation error: ${error.message}`;
            throw error;
          }
          this._kernelSession = msg.header.session;
          this._msgChain = this._msgChain
            .then(() => {
              return this._handleMessage(msg);
            })
            .catch((error) => {
              if (error.message.startsWith("Canceled future for ")) {
                console.error(error);
              }
            });
          this._anyMessage.emit({ msg, direction: "recv" });
        };
        this._onWSClose = (evt) => {
          if (!this.isDisposed) {
            this._reconnect();
          }
        };
        this._id = "";
        this._name = "";
        this._status = "unknown";
        this._connectionStatus = "connecting";
        this._kernelSession = "";
        this._isDisposed = false;
        this._ws = null;
        this._username = "";
        this._reconnectLimit = 7;
        this._reconnectAttempt = 0;
        this._reconnectTimeout = null;
        this._futures = /* @__PURE__ */ new Map();
        this._comms = /* @__PURE__ */ new Map();
        this._targetRegistry = /* @__PURE__ */ Object.create(null);
        this._info = new coreutils_2.PromiseDelegate();
        this._pendingMessages = [];
        this._statusChanged = new signaling_1.Signal(this);
        this._connectionStatusChanged = new signaling_1.Signal(this);
        this._disposed = new signaling_1.Signal(this);
        this._iopubMessage = new signaling_1.Signal(this);
        this._anyMessage = new signaling_1.Signal(this);
        this._unhandledMessage = new signaling_1.Signal(this);
        this._displayIdToParentIds = /* @__PURE__ */ new Map();
        this._msgIdToDisplayIds = /* @__PURE__ */ new Map();
        this._msgChain = Promise.resolve();
        this._noOp = () => {};
        this._name = options.model.name;
        this._id = options.model.id;
        this.serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : __1.ServerConnection.makeSettings();
        this._clientId =
          (_b = options.clientId) !== null && _b !== void 0
            ? _b
            : coreutils_2.UUID.uuid4();
        this._username =
          (_c = options.username) !== null && _c !== void 0 ? _c : "";
        this.handleComms =
          (_d = options.handleComms) !== null && _d !== void 0 ? _d : true;
        this._createSocket();
      }
      get disposed() {
        return this._disposed;
      }
      /**
       * A signal emitted when the kernel status changes.
       */
      get statusChanged() {
        return this._statusChanged;
      }
      /**
       * A signal emitted when the kernel status changes.
       */
      get connectionStatusChanged() {
        return this._connectionStatusChanged;
      }
      /**
       * A signal emitted for iopub kernel messages.
       *
       * #### Notes
       * This signal is emitted after the iopub message is handled asynchronously.
       */
      get iopubMessage() {
        return this._iopubMessage;
      }
      /**
       * A signal emitted for unhandled kernel message.
       *
       * #### Notes
       * This signal is emitted for a message that was not handled. It is emitted
       * during the asynchronous message handling code.
       */
      get unhandledMessage() {
        return this._unhandledMessage;
      }
      /**
       * The kernel model
       */
      get model() {
        return {
          id: this.id,
          name: this.name,
        };
      }
      /**
       * A signal emitted for any kernel message.
       *
       * #### Notes
       * This signal is emitted when a message is received, before it is handled
       * asynchronously.
       *
       * This message is emitted when a message is queued for sending (either in
       * the websocket buffer, or our own pending message buffer). The message may
       * actually be sent across the wire at a later time.
       *
       * The message emitted in this signal should not be modified in any way.
       */
      get anyMessage() {
        return this._anyMessage;
      }
      /**
       * The id of the server-side kernel.
       */
      get id() {
        return this._id;
      }
      /**
       * The name of the server-side kernel.
       */
      get name() {
        return this._name;
      }
      /**
       * The client username.
       */
      get username() {
        return this._username;
      }
      /**
       * The client unique id.
       */
      get clientId() {
        return this._clientId;
      }
      /**
       * The current status of the kernel.
       */
      get status() {
        return this._status;
      }
      /**
       * The current connection status of the kernel connection.
       */
      get connectionStatus() {
        return this._connectionStatus;
      }
      /**
       * Test whether the kernel has been disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * The cached kernel info.
       *
       * @returns A promise that resolves to the kernel info.
       */
      get info() {
        return this._info.promise;
      }
      /**
       * The kernel spec.
       *
       * @returns A promise that resolves to the kernel spec.
       */
      get spec() {
        if (this._specPromise) {
          return this._specPromise;
        }
        this._specPromise = kernelspec_1.KernelSpecAPI.getSpecs(
          this.serverSettings,
        ).then((specs) => {
          return specs.kernelspecs[this._name];
        });
        return this._specPromise;
      }
      /**
       * Clone the current kernel with a new clientId.
       */
      clone(options = {}) {
        return new _KernelConnection(
          Object.assign(
            {
              model: this.model,
              username: this.username,
              serverSettings: this.serverSettings,
              // handleComms defaults to false since that is safer
              handleComms: false,
            },
            options,
          ),
        );
      }
      /**
       * Dispose of the resources held by the kernel.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._isDisposed = true;
        this._disposed.emit();
        this._updateConnectionStatus("disconnected");
        this._clearKernelState();
        this._pendingMessages = [];
        this._clearSocket();
        signaling_1.Signal.clearData(this);
      }
      /**
       * Send a shell message to the kernel.
       *
       * #### Notes
       * Send a message to the kernel's shell channel, yielding a future object
       * for accepting replies.
       *
       * If `expectReply` is given and `true`, the future is disposed when both a
       * shell reply and an idle status message are received. If `expectReply`
       * is not given or is `false`, the future is resolved when an idle status
       * message is received.
       * If `disposeOnDone` is not given or is `true`, the Future is disposed at this point.
       * If `disposeOnDone` is given and `false`, it is up to the caller to dispose of the Future.
       *
       * All replies are validated as valid kernel messages.
       *
       * If the kernel status is `dead`, this will throw an error.
       */
      sendShellMessage(msg, expectReply = false, disposeOnDone = true) {
        return this._sendKernelShellControl(
          future_1.KernelShellFutureHandler,
          msg,
          expectReply,
          disposeOnDone,
        );
      }
      /**
       * Send a control message to the kernel.
       *
       * #### Notes
       * Send a message to the kernel's control channel, yielding a future object
       * for accepting replies.
       *
       * If `expectReply` is given and `true`, the future is disposed when both a
       * control reply and an idle status message are received. If `expectReply`
       * is not given or is `false`, the future is resolved when an idle status
       * message is received.
       * If `disposeOnDone` is not given or is `true`, the Future is disposed at this point.
       * If `disposeOnDone` is given and `false`, it is up to the caller to dispose of the Future.
       *
       * All replies are validated as valid kernel messages.
       *
       * If the kernel status is `dead`, this will throw an error.
       */
      sendControlMessage(msg, expectReply = false, disposeOnDone = true) {
        return this._sendKernelShellControl(
          future_1.KernelControlFutureHandler,
          msg,
          expectReply,
          disposeOnDone,
        );
      }
      _sendKernelShellControl(
        ctor,
        msg,
        expectReply = false,
        disposeOnDone = true,
      ) {
        this._sendMessage(msg);
        this._anyMessage.emit({ msg, direction: "send" });
        const future = new ctor(
          () => {
            const msgId = msg.header.msg_id;
            this._futures.delete(msgId);
            const displayIds = this._msgIdToDisplayIds.get(msgId);
            if (!displayIds) {
              return;
            }
            displayIds.forEach((displayId) => {
              const msgIds = this._displayIdToParentIds.get(displayId);
              if (msgIds) {
                const idx = msgIds.indexOf(msgId);
                if (idx === -1) {
                  return;
                }
                if (msgIds.length === 1) {
                  this._displayIdToParentIds.delete(displayId);
                } else {
                  msgIds.splice(idx, 1);
                  this._displayIdToParentIds.set(displayId, msgIds);
                }
              }
            });
            this._msgIdToDisplayIds.delete(msgId);
          },
          msg,
          expectReply,
          disposeOnDone,
          this,
        );
        this._futures.set(msg.header.msg_id, future);
        return future;
      }
      /**
       * Send a message on the websocket.
       *
       * If queue is true, queue the message for later sending if we cannot send
       * now. Otherwise throw an error.
       *
       * #### Notes
       * As an exception to the queueing, if we are sending a kernel_info_request
       * message while we think the kernel is restarting, we send the message
       * immediately without queueing. This is so that we can trigger a message
       * back, which will then clear the kernel restarting state.
       */
      _sendMessage(msg, queue = true) {
        if (this.status === "dead") {
          throw new Error("Kernel is dead");
        }
        if (
          (this._kernelSession === STARTING_KERNEL_SESSION ||
            this._kernelSession === RESTARTING_KERNEL_SESSION) &&
          KernelMessage2.isInfoRequestMsg(msg)
        ) {
          if (this.connectionStatus === "connected") {
            this._ws.send(serialize.serialize(msg));
            return;
          } else {
            throw new Error("Could not send message: status is not connected");
          }
        }
        if (queue && this._pendingMessages.length > 0) {
          this._pendingMessages.push(msg);
          return;
        }
        if (
          this.connectionStatus === "connected" &&
          this._kernelSession !== RESTARTING_KERNEL_SESSION
        ) {
          this._ws.send(serialize.serialize(msg));
        } else if (queue) {
          this._pendingMessages.push(msg);
        } else {
          throw new Error("Could not send message");
        }
      }
      /**
       * Interrupt a kernel.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels).
       *
       * The promise is fulfilled on a valid response and rejected otherwise.
       *
       * It is assumed that the API call does not mutate the kernel id or name.
       *
       * The promise will be rejected if the kernel status is `Dead` or if the
       * request fails or the response is invalid.
       */
      async interrupt() {
        if (this.status === "dead") {
          throw new Error("Kernel is dead");
        }
        return restapi.interruptKernel(this.id, this.serverSettings);
      }
      /**
       * Request a kernel restart.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels)
       * and validates the response model.
       *
       * Any existing Future or Comm objects are cleared once the kernel has
       * actually be restarted.
       *
       * The promise is fulfilled on a valid server response (after the kernel restarts)
       * and rejected otherwise.
       *
       * It is assumed that the API call does not mutate the kernel id or name.
       *
       * The promise will be rejected if the request fails or the response is
       * invalid.
       */
      async restart() {
        if (this.status === "dead") {
          throw new Error("Kernel is dead");
        }
        this._updateStatus("restarting");
        this._clearKernelState();
        this._kernelSession = RESTARTING_KERNEL_SESSION;
        await restapi.restartKernel(this.id, this.serverSettings);
        await this.reconnect();
      }
      /**
       * Reconnect to a kernel.
       *
       * #### Notes
       * This may try multiple times to reconnect to a kernel, and will sever any
       * existing connection.
       */
      reconnect() {
        this._errorIfDisposed();
        const result = new coreutils_2.PromiseDelegate();
        const fulfill = (sender, status) => {
          if (status === "connected") {
            result.resolve();
            this.connectionStatusChanged.disconnect(fulfill, this);
          } else if (status === "disconnected") {
            result.reject(new Error("Kernel connection disconnected"));
            this.connectionStatusChanged.disconnect(fulfill, this);
          }
        };
        this.connectionStatusChanged.connect(fulfill, this);
        this._reconnectAttempt = 0;
        this._reconnect();
        return result.promise;
      }
      /**
       * Shutdown a kernel.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels).
       *
       * The promise is fulfilled on a valid response and rejected otherwise.
       *
       * On a valid response, disposes this kernel connection.
       *
       * If the kernel is already `dead`, disposes this kernel connection without
       * a server request.
       */
      async shutdown() {
        if (this.status !== "dead") {
          await restapi.shutdownKernel(this.id, this.serverSettings);
        }
        this.handleShutdown();
      }
      /**
       * Handles a kernel shutdown.
       *
       * #### Notes
       * This method should be called if we know from outside information that a
       * kernel is dead (for example, we cannot find the kernel model on the
       * server).
       */
      handleShutdown() {
        this._updateStatus("dead");
        this.dispose();
      }
      /**
       * Send a `kernel_info_request` message.
       *
       * #### Notes
       * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#kernel-info).
       *
       * Fulfills with the `kernel_info_response` content when the shell reply is
       * received and validated.
       */
      async requestKernelInfo() {
        const msg = KernelMessage2.createMessage({
          msgType: "kernel_info_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content: {},
        });
        let reply;
        try {
          reply = await Private.handleShellMessage(this, msg);
        } catch (e) {
          if (this.isDisposed) {
            return;
          } else {
            throw e;
          }
        }
        this._errorIfDisposed();
        if (!reply) {
          return;
        }
        if (reply.content.status === void 0) {
          reply.content.status = "ok";
        }
        if (reply.content.status !== "ok") {
          this._info.reject("Kernel info reply errored");
          return reply;
        }
        this._info.resolve(reply.content);
        this._kernelSession = reply.header.session;
        return reply;
      }
      /**
       * Send a `complete_request` message.
       *
       * #### Notes
       * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#completion).
       *
       * Fulfills with the `complete_reply` content when the shell reply is
       * received and validated.
       */
      requestComplete(content) {
        const msg = KernelMessage2.createMessage({
          msgType: "complete_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content,
        });
        return Private.handleShellMessage(this, msg);
      }
      /**
       * Send an `inspect_request` message.
       *
       * #### Notes
       * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#introspection).
       *
       * Fulfills with the `inspect_reply` content when the shell reply is
       * received and validated.
       */
      requestInspect(content) {
        const msg = KernelMessage2.createMessage({
          msgType: "inspect_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content,
        });
        return Private.handleShellMessage(this, msg);
      }
      /**
       * Send a `history_request` message.
       *
       * #### Notes
       * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#history).
       *
       * Fulfills with the `history_reply` content when the shell reply is
       * received and validated.
       */
      requestHistory(content) {
        const msg = KernelMessage2.createMessage({
          msgType: "history_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content,
        });
        return Private.handleShellMessage(this, msg);
      }
      /**
       * Send an `execute_request` message.
       *
       * #### Notes
       * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#execute).
       *
       * Future `onReply` is called with the `execute_reply` content when the
       * shell reply is received and validated. The future will resolve when
       * this message is received and the `idle` iopub status is received.
       * The future will also be disposed at this point unless `disposeOnDone`
       * is specified and `false`, in which case it is up to the caller to dispose
       * of the future.
       *
       * **See also:** [[IExecuteReply]]
       */
      requestExecute(content, disposeOnDone = true, metadata) {
        const defaults = {
          silent: false,
          store_history: true,
          user_expressions: {},
          allow_stdin: true,
          stop_on_error: false,
        };
        const msg = KernelMessage2.createMessage({
          msgType: "execute_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content: Object.assign(Object.assign({}, defaults), content),
          metadata,
        });
        return this.sendShellMessage(msg, true, disposeOnDone);
      }
      /**
       * Send an experimental `debug_request` message.
       *
       * @hidden
       *
       * #### Notes
       * Debug messages are experimental messages that are not in the official
       * kernel message specification. As such, this function is *NOT* considered
       * part of the public API, and may change without notice.
       */
      requestDebug(content, disposeOnDone = true) {
        const msg = KernelMessage2.createMessage({
          msgType: "debug_request",
          channel: "control",
          username: this._username,
          session: this._clientId,
          content,
        });
        return this.sendControlMessage(msg, true, disposeOnDone);
      }
      /**
       * Send an `is_complete_request` message.
       *
       * #### Notes
       * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#code-completeness).
       *
       * Fulfills with the `is_complete_response` content when the shell reply is
       * received and validated.
       */
      requestIsComplete(content) {
        const msg = KernelMessage2.createMessage({
          msgType: "is_complete_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content,
        });
        return Private.handleShellMessage(this, msg);
      }
      /**
       * Send a `comm_info_request` message.
       *
       * #### Notes
       * Fulfills with the `comm_info_reply` content when the shell reply is
       * received and validated.
       */
      requestCommInfo(content) {
        const msg = KernelMessage2.createMessage({
          msgType: "comm_info_request",
          channel: "shell",
          username: this._username,
          session: this._clientId,
          content,
        });
        return Private.handleShellMessage(this, msg);
      }
      /**
       * Send an `input_reply` message.
       *
       * #### Notes
       * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#messages-on-the-stdin-router-dealer-sockets).
       */
      sendInputReply(content) {
        const msg = KernelMessage2.createMessage({
          msgType: "input_reply",
          channel: "stdin",
          username: this._username,
          session: this._clientId,
          content,
        });
        this._sendMessage(msg);
        this._anyMessage.emit({ msg, direction: "send" });
      }
      /**
       * Create a new comm.
       *
       * #### Notes
       * If a client-side comm already exists with the given commId, an error is thrown.
       * If the kernel does not handle comms, an error is thrown.
       */
      createComm(targetName, commId = coreutils_2.UUID.uuid4()) {
        if (!this.handleComms) {
          throw new Error("Comms are disabled on this kernel connection");
        }
        if (this._comms.has(commId)) {
          throw new Error("Comm is already created");
        }
        const comm = new comm_1.CommHandler(targetName, commId, this, () => {
          this._unregisterComm(commId);
        });
        this._comms.set(commId, comm);
        return comm;
      }
      /**
       * Check if a comm exists.
       */
      hasComm(commId) {
        return this._comms.has(commId);
      }
      /**
       * Register a comm target handler.
       *
       * @param targetName - The name of the comm target.
       *
       * @param callback - The callback invoked for a comm open message.
       *
       * @returns A disposable used to unregister the comm target.
       *
       * #### Notes
       * Only one comm target can be registered to a target name at a time, an
       * existing callback for the same target name will be overridden.  A registered
       * comm target handler will take precedence over a comm which specifies a
       * `target_module`.
       *
       * If the callback returns a promise, kernel message processing will pause
       * until the returned promise is fulfilled.
       */
      registerCommTarget(targetName, callback) {
        if (!this.handleComms) {
          return;
        }
        this._targetRegistry[targetName] = callback;
      }
      /**
       * Remove a comm target handler.
       *
       * @param targetName - The name of the comm target to remove.
       *
       * @param callback - The callback to remove.
       *
       * #### Notes
       * The comm target is only removed if the callback argument matches.
       */
      removeCommTarget(targetName, callback) {
        if (!this.handleComms) {
          return;
        }
        if (!this.isDisposed && this._targetRegistry[targetName] === callback) {
          delete this._targetRegistry[targetName];
        }
      }
      /**
       * Register an IOPub message hook.
       *
       * @param msg_id - The parent_header message id the hook will intercept.
       *
       * @param hook - The callback invoked for the message.
       *
       * #### Notes
       * The IOPub hook system allows you to preempt the handlers for IOPub
       * messages that are responses to a given message id.
       *
       * The most recently registered hook is run first. A hook can return a
       * boolean or a promise to a boolean, in which case all kernel message
       * processing pauses until the promise is fulfilled. If a hook return value
       * resolves to false, any later hooks will not run and the function will
       * return a promise resolving to false. If a hook throws an error, the error
       * is logged to the console and the next hook is run. If a hook is
       * registered during the hook processing, it will not run until the next
       * message. If a hook is removed during the hook processing, it will be
       * deactivated immediately.
       *
       * See also [[IFuture.registerMessageHook]].
       */
      registerMessageHook(msgId, hook) {
        var _a;
        const future =
          (_a = this._futures) === null || _a === void 0
            ? void 0
            : _a.get(msgId);
        if (future) {
          future.registerMessageHook(hook);
        }
      }
      /**
       * Remove an IOPub message hook.
       *
       * @param msg_id - The parent_header message id the hook intercepted.
       *
       * @param hook - The callback invoked for the message.
       *
       */
      removeMessageHook(msgId, hook) {
        var _a;
        const future =
          (_a = this._futures) === null || _a === void 0
            ? void 0
            : _a.get(msgId);
        if (future) {
          future.removeMessageHook(hook);
        }
      }
      /**
       * Handle a message with a display id.
       *
       * @returns Whether the message was handled.
       */
      async _handleDisplayId(displayId, msg) {
        var _a, _b;
        const msgId = msg.parent_header.msg_id;
        let parentIds = this._displayIdToParentIds.get(displayId);
        if (parentIds) {
          const updateMsg = {
            header: coreutils_2.JSONExt.deepCopy(msg.header),
            parent_header: coreutils_2.JSONExt.deepCopy(msg.parent_header),
            metadata: coreutils_2.JSONExt.deepCopy(msg.metadata),
            content: coreutils_2.JSONExt.deepCopy(msg.content),
            channel: msg.channel,
            buffers: msg.buffers ? msg.buffers.slice() : [],
          };
          updateMsg.header.msg_type = "update_display_data";
          await Promise.all(
            parentIds.map(async (parentId) => {
              const future = this._futures && this._futures.get(parentId);
              if (future) {
                await future.handleMsg(updateMsg);
              }
            }),
          );
        }
        if (msg.header.msg_type === "update_display_data") {
          return true;
        }
        parentIds =
          (_a = this._displayIdToParentIds.get(displayId)) !== null &&
          _a !== void 0
            ? _a
            : [];
        if (parentIds.indexOf(msgId) === -1) {
          parentIds.push(msgId);
        }
        this._displayIdToParentIds.set(displayId, parentIds);
        const displayIds =
          (_b = this._msgIdToDisplayIds.get(msgId)) !== null && _b !== void 0
            ? _b
            : [];
        if (displayIds.indexOf(msgId) === -1) {
          displayIds.push(msgId);
        }
        this._msgIdToDisplayIds.set(msgId, displayIds);
        return false;
      }
      /**
       * Forcefully clear the socket state.
       *
       * #### Notes
       * This will clear all socket state without calling any handlers and will
       * not update the connection status. If you call this method, you are
       * responsible for updating the connection status as needed and recreating
       * the socket if you plan to reconnect.
       */
      _clearSocket() {
        if (this._ws !== null) {
          this._ws.onopen = this._noOp;
          this._ws.onclose = this._noOp;
          this._ws.onerror = this._noOp;
          this._ws.onmessage = this._noOp;
          this._ws.close();
          this._ws = null;
        }
      }
      /**
       * Handle status iopub messages from the kernel.
       */
      _updateStatus(status) {
        if (this._status === status || this._status === "dead") {
          return;
        }
        this._status = status;
        Private.logKernelStatus(this);
        this._statusChanged.emit(status);
        if (status === "dead") {
          this.dispose();
        }
      }
      /**
       * Send pending messages to the kernel.
       */
      _sendPending() {
        while (
          this.connectionStatus === "connected" &&
          this._kernelSession !== RESTARTING_KERNEL_SESSION &&
          this._pendingMessages.length > 0
        ) {
          this._sendMessage(this._pendingMessages[0], false);
          this._pendingMessages.shift();
        }
      }
      /**
       * Clear the internal state.
       */
      _clearKernelState() {
        this._kernelSession = "";
        this._pendingMessages = [];
        this._futures.forEach((future) => {
          future.dispose();
        });
        this._comms.forEach((comm) => {
          comm.dispose();
        });
        this._msgChain = Promise.resolve();
        this._futures = /* @__PURE__ */ new Map();
        this._comms = /* @__PURE__ */ new Map();
        this._displayIdToParentIds.clear();
        this._msgIdToDisplayIds.clear();
      }
      /**
       * Check to make sure it is okay to proceed to handle a message.
       *
       * #### Notes
       * Because we handle messages asynchronously, before a message is handled the
       * kernel might be disposed or restarted (and have a different session id).
       * This function throws an error in each of these cases. This is meant to be
       * called at the start of an asynchronous message handler to cancel message
       * processing if the message no longer is valid.
       */
      _assertCurrentMessage(msg) {
        this._errorIfDisposed();
        if (msg.header.session !== this._kernelSession) {
          throw new Error(
            `Canceling handling of old message: ${msg.header.msg_type}`,
          );
        }
      }
      /**
       * Handle a `comm_open` kernel message.
       */
      async _handleCommOpen(msg) {
        this._assertCurrentMessage(msg);
        const content = msg.content;
        const comm = new comm_1.CommHandler(
          content.target_name,
          content.comm_id,
          this,
          () => {
            this._unregisterComm(content.comm_id);
          },
        );
        this._comms.set(content.comm_id, comm);
        try {
          const target = await Private.loadObject(
            content.target_name,
            content.target_module,
            this._targetRegistry,
          );
          await target(comm, msg);
        } catch (e) {
          comm.close();
          console.error("Exception opening new comm");
          throw e;
        }
      }
      /**
       * Handle 'comm_close' kernel message.
       */
      async _handleCommClose(msg) {
        this._assertCurrentMessage(msg);
        const content = msg.content;
        const comm = this._comms.get(content.comm_id);
        if (!comm) {
          console.error("Comm not found for comm id " + content.comm_id);
          return;
        }
        this._unregisterComm(comm.commId);
        const onClose = comm.onClose;
        if (onClose) {
          await onClose(msg);
        }
        comm.dispose();
      }
      /**
       * Handle a 'comm_msg' kernel message.
       */
      async _handleCommMsg(msg) {
        this._assertCurrentMessage(msg);
        const content = msg.content;
        const comm = this._comms.get(content.comm_id);
        if (!comm) {
          return;
        }
        const onMsg = comm.onMsg;
        if (onMsg) {
          await onMsg(msg);
        }
      }
      /**
       * Unregister a comm instance.
       */
      _unregisterComm(commId) {
        this._comms.delete(commId);
      }
      /**
       * Handle connection status changes.
       */
      _updateConnectionStatus(connectionStatus) {
        if (this._connectionStatus === connectionStatus) {
          return;
        }
        this._connectionStatus = connectionStatus;
        if (connectionStatus !== "connecting") {
          this._reconnectAttempt = 0;
          clearTimeout(this._reconnectTimeout);
        }
        if (this.status !== "dead") {
          if (connectionStatus === "connected") {
            let restarting = this._kernelSession === RESTARTING_KERNEL_SESSION;
            let p = this.requestKernelInfo();
            let sendPendingCalled = false;
            let sendPendingOnce = () => {
              if (sendPendingCalled) {
                return;
              }
              sendPendingCalled = true;
              if (
                restarting &&
                this._kernelSession === RESTARTING_KERNEL_SESSION
              ) {
                this._kernelSession = "";
              }
              clearTimeout(timeoutHandle);
              if (this._pendingMessages.length > 0) {
                this._sendPending();
              }
            };
            void p.then(sendPendingOnce);
            let timeoutHandle = setTimeout(
              sendPendingOnce,
              KERNEL_INFO_TIMEOUT,
            );
          } else {
            this._updateStatus("unknown");
          }
        }
        this._connectionStatusChanged.emit(connectionStatus);
      }
      async _handleMessage(msg) {
        var _a, _b;
        let handled = false;
        if (
          msg.parent_header &&
          msg.channel === "iopub" &&
          (KernelMessage2.isDisplayDataMsg(msg) ||
            KernelMessage2.isUpdateDisplayDataMsg(msg) ||
            KernelMessage2.isExecuteResultMsg(msg))
        ) {
          const transient =
            (_a = msg.content.transient) !== null && _a !== void 0 ? _a : {};
          const displayId = transient["display_id"];
          if (displayId) {
            handled = await this._handleDisplayId(displayId, msg);
            this._assertCurrentMessage(msg);
          }
        }
        if (!handled && msg.parent_header) {
          const parentHeader = msg.parent_header;
          const future =
            (_b = this._futures) === null || _b === void 0
              ? void 0
              : _b.get(parentHeader.msg_id);
          if (future) {
            await future.handleMsg(msg);
            this._assertCurrentMessage(msg);
          } else {
            const owned = parentHeader.session === this.clientId;
            if (msg.channel !== "iopub" && owned) {
              this._unhandledMessage.emit(msg);
            }
          }
        }
        if (msg.channel === "iopub") {
          switch (msg.header.msg_type) {
            case "status": {
              const executionState = msg.content.execution_state;
              if (executionState === "restarting") {
                void Promise.resolve().then(async () => {
                  this._updateStatus("autorestarting");
                  this._clearKernelState();
                  await this.reconnect();
                });
              }
              this._updateStatus(executionState);
              break;
            }
            case "comm_open":
              if (this.handleComms) {
                await this._handleCommOpen(msg);
              }
              break;
            case "comm_msg":
              if (this.handleComms) {
                await this._handleCommMsg(msg);
              }
              break;
            case "comm_close":
              if (this.handleComms) {
                await this._handleCommClose(msg);
              }
              break;
            default:
              break;
          }
          if (!this.isDisposed) {
            this._assertCurrentMessage(msg);
            this._iopubMessage.emit(msg);
          }
        }
      }
      /**
       * Attempt a connection if we have not exhausted connection attempts.
       */
      _reconnect() {
        this._errorIfDisposed();
        clearTimeout(this._reconnectTimeout);
        if (this._reconnectAttempt < this._reconnectLimit) {
          this._updateConnectionStatus("connecting");
          const timeout = Private.getRandomIntInclusive(
            0,
            1e3 * (Math.pow(2, this._reconnectAttempt) - 1),
          );
          console.warn(
            `Connection lost, reconnecting in ${Math.floor(timeout / 1e3)} seconds.`,
          );
          this._reconnectTimeout = setTimeout(this._createSocket, timeout);
          this._reconnectAttempt += 1;
        } else {
          this._updateConnectionStatus("disconnected");
        }
        this._clearSocket();
      }
      /**
       * Utility function to throw an error if this instance is disposed.
       */
      _errorIfDisposed() {
        if (this.isDisposed) {
          throw new Error("Kernel connection is disposed");
        }
      }
    };
    exports2.KernelConnection = KernelConnection2;
    var Private;
    (function (Private2) {
      function logKernelStatus(kernel) {
        switch (kernel.status) {
          case "idle":
          case "busy":
          case "unknown":
            return;
          default:
            console.debug(`Kernel: ${kernel.status} (${kernel.id})`);
            break;
        }
      }
      Private2.logKernelStatus = logKernelStatus;
      async function handleShellMessage(kernel, msg) {
        const future = kernel.sendShellMessage(msg, true);
        return future.done;
      }
      Private2.handleShellMessage = handleShellMessage;
      function loadObject(name2, moduleName, registry) {
        return new Promise((resolve, reject) => {
          if (moduleName) {
            if (typeof requirejs === "undefined") {
              throw new Error("requirejs not found");
            }
            requirejs(
              [moduleName],
              (mod) => {
                if (mod[name2] === void 0) {
                  const msg = `Object '${name2}' not found in module '${moduleName}'`;
                  reject(new Error(msg));
                } else {
                  resolve(mod[name2]);
                }
              },
              reject,
            );
          } else {
            if (
              registry === null || registry === void 0
                ? void 0
                : registry[name2]
            ) {
              resolve(registry[name2]);
            } else {
              reject(new Error(`Object '${name2}' not found in registry`));
            }
          }
        });
      }
      Private2.loadObject = loadObject;
      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      Private2.getRandomIntInclusive = getRandomIntInclusive;
    })(Private || (Private = {}));
  },
});

// node_modules/@jupyterlab/services/lib/kernel/manager.js
var require_manager2 = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/manager.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.KernelManager = void 0;
    var algorithm_1 = require_dist();
    var polling_1 = require_dist5();
    var signaling_1 = require_dist3();
    var __1 = require_lib3();
    var basemanager_1 = require_basemanager();
    var restapi_1 = require_restapi();
    var default_1 = require_default();
    var KernelManager = class extends basemanager_1.BaseManager {
      /**
       * Construct a new kernel manager.
       *
       * @param options - The default options for kernel.
       */
      constructor(options = {}) {
        var _a;
        super(options);
        this._isReady = false;
        this._kernelConnections = /* @__PURE__ */ new Set();
        this._models = /* @__PURE__ */ new Map();
        this._runningChanged = new signaling_1.Signal(this);
        this._connectionFailure = new signaling_1.Signal(this);
        this._pollModels = new polling_1.Poll({
          auto: false,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: true,
            max: 300 * 1e3,
          },
          name: `@jupyterlab/services:KernelManager#models`,
          standby:
            (_a = options.standby) !== null && _a !== void 0
              ? _a
              : "when-hidden",
        });
        this._ready = (async () => {
          await this._pollModels.start();
          await this._pollModels.tick;
          this._isReady = true;
        })();
      }
      /**
       * Test whether the manager is ready.
       */
      get isReady() {
        return this._isReady;
      }
      /**
       * A promise that fulfills when the manager is ready.
       */
      get ready() {
        return this._ready;
      }
      /**
       * A signal emitted when the running kernels change.
       */
      get runningChanged() {
        return this._runningChanged;
      }
      /**
       * A signal emitted when there is a connection failure.
       */
      get connectionFailure() {
        return this._connectionFailure;
      }
      /**
       * Dispose of the resources used by the manager.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._models.clear();
        this._kernelConnections.forEach((x) => x.dispose());
        this._pollModels.dispose();
        super.dispose();
      }
      /**
       * Connect to an existing kernel.
       *
       * @returns The new kernel connection.
       *
       * #### Notes
       * This will use the manager's server settings and ignore any server
       * settings passed in the options.
       */
      connectTo(options) {
        var _a;
        const { id } = options.model;
        let handleComms =
          (_a = options.handleComms) !== null && _a !== void 0 ? _a : true;
        if (options.handleComms === void 0) {
          for (const kc of this._kernelConnections) {
            if (kc.id === id && kc.handleComms) {
              handleComms = false;
              break;
            }
          }
        }
        const kernelConnection = new default_1.KernelConnection(
          Object.assign(Object.assign({ handleComms }, options), {
            serverSettings: this.serverSettings,
          }),
        );
        this._onStarted(kernelConnection);
        if (!this._models.has(id)) {
          void this.refreshRunning().catch(() => {});
        }
        return kernelConnection;
      }
      /**
       * Create an iterator over the most recent running kernels.
       *
       * @returns A new iterator over the running kernels.
       */
      running() {
        return algorithm_1.iter([...this._models.values()]);
      }
      /**
       * Force a refresh of the running kernels.
       *
       * @returns A promise that resolves when the running list has been refreshed.
       *
       * #### Notes
       * This is not typically meant to be called by the user, since the
       * manager maintains its own internal state.
       */
      async refreshRunning() {
        await this._pollModels.refresh();
        await this._pollModels.tick;
      }
      /**
       * Start a new kernel.
       *
       * @param createOptions - The kernel creation options
       *
       * @param connectOptions - The kernel connection options
       *
       * @returns A promise that resolves with the kernel connection.
       *
       * #### Notes
       * The manager `serverSettings` will be always be used.
       */
      async startNew(createOptions = {}, connectOptions = {}) {
        const model = await restapi_1.startNew(
          createOptions,
          this.serverSettings,
        );
        return this.connectTo(
          Object.assign(Object.assign({}, connectOptions), { model }),
        );
      }
      /**
       * Shut down a kernel by id.
       *
       * @param id - The id of the target kernel.
       *
       * @returns A promise that resolves when the operation is complete.
       */
      async shutdown(id) {
        await restapi_1.shutdownKernel(id, this.serverSettings);
        await this.refreshRunning();
      }
      /**
       * Shut down all kernels.
       *
       * @returns A promise that resolves when all of the kernels are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning();
        await Promise.all(
          [...this._models.keys()].map((id) =>
            restapi_1.shutdownKernel(id, this.serverSettings),
          ),
        );
        await this.refreshRunning();
      }
      /**
       * Find a kernel by id.
       *
       * @param id - The id of the target kernel.
       *
       * @returns A promise that resolves with the kernel's model.
       */
      async findById(id) {
        if (this._models.has(id)) {
          return this._models.get(id);
        }
        await this.refreshRunning();
        return this._models.get(id);
      }
      /**
       * Execute a request to the server to poll running kernels and update state.
       */
      async requestRunning() {
        var _a, _b;
        let models;
        try {
          models = await restapi_1.listRunning(this.serverSettings);
        } catch (err) {
          if (
            err instanceof __1.ServerConnection.NetworkError ||
            ((_a = err.response) === null || _a === void 0
              ? void 0
              : _a.status) === 503 ||
            ((_b = err.response) === null || _b === void 0
              ? void 0
              : _b.status) === 424
          ) {
            this._connectionFailure.emit(err);
          }
          throw err;
        }
        if (this.isDisposed) {
          return;
        }
        if (
          this._models.size === models.length &&
          algorithm_1.every(models, (x) => {
            const existing = this._models.get(x.id);
            if (!existing) {
              return false;
            }
            return existing.name === x.name;
          })
        ) {
          return;
        }
        this._models = new Map(models.map((x) => [x.id, x]));
        this._kernelConnections.forEach((kc) => {
          if (!this._models.has(kc.id)) {
            kc.handleShutdown();
          }
        });
        this._runningChanged.emit(models);
      }
      /**
       * Handle a kernel starting.
       */
      _onStarted(kernelConnection) {
        this._kernelConnections.add(kernelConnection);
        kernelConnection.statusChanged.connect(this._onStatusChanged, this);
        kernelConnection.disposed.connect(this._onDisposed, this);
      }
      _onDisposed(kernelConnection) {
        this._kernelConnections.delete(kernelConnection);
        void this.refreshRunning().catch(() => {});
      }
      _onStatusChanged(kernelConnection, status) {
        if (status === "dead") {
          void this.refreshRunning().catch(() => {});
        }
      }
    };
    exports2.KernelManager = KernelManager;
  },
});

// node_modules/@jupyterlab/services/lib/kernel/index.js
var require_kernel2 = __commonJS({
  "node_modules/@jupyterlab/services/lib/kernel/index.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __exportStar =
      (exports2 && exports2.__exportStar) ||
      function (m, exports3) {
        for (var p in m)
          if (
            p !== "default" &&
            !Object.prototype.hasOwnProperty.call(exports3, p)
          )
            __createBinding(exports3, m, p);
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.KernelAPI = exports2.KernelMessage = exports2.Kernel = void 0;
    var Kernel2 = __importStar(require_kernel());
    exports2.Kernel = Kernel2;
    var KernelMessage2 = __importStar(require_messages());
    exports2.KernelMessage = KernelMessage2;
    var KernelAPI = __importStar(require_restapi());
    exports2.KernelAPI = KernelAPI;
    __exportStar(require_manager2(), exports2);
  },
});

// node_modules/@jupyterlab/services/lib/builder/index.js
var require_builder = __commonJS({
  "node_modules/@jupyterlab/services/lib/builder/index.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BuildManager = void 0;
    var coreutils_12 = require_lib();
    var serverconnection_1 = require_serverconnection();
    var BUILD_SETTINGS_URL = "api/build";
    var BuildManager = class {
      /**
       * Create a new setting manager.
       */
      constructor(options = {}) {
        var _a;
        this._url = "";
        this.serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : serverconnection_1.ServerConnection.makeSettings();
        const { baseUrl, appUrl } = this.serverSettings;
        this._url = coreutils_12.URLExt.join(
          baseUrl,
          appUrl,
          BUILD_SETTINGS_URL,
        );
      }
      /**
       * Test whether the build service is available.
       */
      get isAvailable() {
        return (
          coreutils_12.PageConfig.getOption("buildAvailable").toLowerCase() ===
          "true"
        );
      }
      /**
       * Test whether to check build status automatically.
       */
      get shouldCheck() {
        return (
          coreutils_12.PageConfig.getOption("buildCheck").toLowerCase() ===
          "true"
        );
      }
      /**
       * Get whether the application should be built.
       */
      getStatus() {
        const { _url, serverSettings } = this;
        const promise = serverconnection_1.ServerConnection.makeRequest(
          _url,
          {},
          serverSettings,
        );
        return promise
          .then((response) => {
            if (response.status !== 200) {
              throw new serverconnection_1.ServerConnection.ResponseError(
                response,
              );
            }
            return response.json();
          })
          .then((data) => {
            if (typeof data.status !== "string") {
              throw new Error("Invalid data");
            }
            if (typeof data.message !== "string") {
              throw new Error("Invalid data");
            }
            return data;
          });
      }
      /**
       * Build the application.
       */
      build() {
        const { _url, serverSettings } = this;
        const init = { method: "POST" };
        const promise = serverconnection_1.ServerConnection.makeRequest(
          _url,
          init,
          serverSettings,
        );
        return promise.then((response) => {
          if (response.status === 400) {
            throw new serverconnection_1.ServerConnection.ResponseError(
              response,
              "Build aborted",
            );
          }
          if (response.status !== 200) {
            const message = `Build failed with ${response.status}, please run 'jupyter lab build' on the server for full output`;
            throw new serverconnection_1.ServerConnection.ResponseError(
              response,
              message,
            );
          }
        });
      }
      /**
       * Cancel an active build.
       */
      cancel() {
        const { _url, serverSettings } = this;
        const init = { method: "DELETE" };
        const promise = serverconnection_1.ServerConnection.makeRequest(
          _url,
          init,
          serverSettings,
        );
        return promise.then((response) => {
          if (response.status !== 204) {
            throw new serverconnection_1.ServerConnection.ResponseError(
              response,
            );
          }
        });
      }
    };
    exports2.BuildManager = BuildManager;
  },
});

// node_modules/@jupyterlab/services/lib/nbconvert/index.js
var require_nbconvert = __commonJS({
  "node_modules/@jupyterlab/services/lib/nbconvert/index.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NbConvertManager = void 0;
    var coreutils_12 = require_lib();
    var serverconnection_1 = require_serverconnection();
    var NBCONVERT_SETTINGS_URL = "api/nbconvert";
    var NbConvertManager = class {
      /**
       * Create a new nbconvert manager.
       */
      constructor(options = {}) {
        var _a;
        this.serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : serverconnection_1.ServerConnection.makeSettings();
      }
      /**
       * Get whether the application should be built.
       */
      async getExportFormats() {
        const base = this.serverSettings.baseUrl;
        const url = coreutils_12.URLExt.join(base, NBCONVERT_SETTINGS_URL);
        const { serverSettings } = this;
        const response = await serverconnection_1.ServerConnection.makeRequest(
          url,
          {},
          serverSettings,
        );
        if (response.status !== 200) {
          const err =
            await serverconnection_1.ServerConnection.ResponseError.create(
              response,
            );
          throw err;
        }
        const data = await response.json();
        const exportList = {};
        const keys = Object.keys(data);
        keys.forEach(function (key) {
          const mimeType = data[key].output_mimetype;
          exportList[key] = { output_mimetype: mimeType };
        });
        return exportList;
      }
    };
    exports2.NbConvertManager = NbConvertManager;
  },
});

// node_modules/@jupyterlab/services/lib/session/session.js
var require_session = __commonJS({
  "node_modules/@jupyterlab/services/lib/session/session.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
  },
});

// node_modules/@jupyterlab/services/lib/session/validate.js
var require_validate5 = __commonJS({
  "node_modules/@jupyterlab/services/lib/session/validate.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateModels =
      exports2.updateLegacySessionModel =
      exports2.validateModel =
        void 0;
    var validate_1 = require_validate3();
    var validate_2 = require_validate();
    function validateModel(data) {
      validate_2.validateProperty(data, "id", "string");
      validate_2.validateProperty(data, "type", "string");
      validate_2.validateProperty(data, "name", "string");
      validate_2.validateProperty(data, "path", "string");
      validate_2.validateProperty(data, "kernel", "object");
      validate_1.validateModel(data.kernel);
    }
    exports2.validateModel = validateModel;
    function updateLegacySessionModel(data) {
      if (data.path === void 0 && data.notebook !== void 0) {
        data.path = data.notebook.path;
        data.type = "notebook";
        data.name = "";
      }
    }
    exports2.updateLegacySessionModel = updateLegacySessionModel;
    function validateModels(models) {
      if (!Array.isArray(models)) {
        throw new Error("Invalid session list");
      }
      models.forEach((d) => validateModel(d));
    }
    exports2.validateModels = validateModels;
  },
});

// node_modules/@jupyterlab/services/lib/session/restapi.js
var require_restapi3 = __commonJS({
  "node_modules/@jupyterlab/services/lib/session/restapi.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.updateSession =
      exports2.startSession =
      exports2.getSessionModel =
      exports2.shutdownSession =
      exports2.getSessionUrl =
      exports2.listRunning =
      exports2.SESSION_SERVICE_URL =
        void 0;
    var serverconnection_1 = require_serverconnection();
    var coreutils_12 = require_lib();
    var validate_1 = require_validate5();
    exports2.SESSION_SERVICE_URL = "api/sessions";
    async function listRunning(
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.SESSION_SERVICE_URL,
      );
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        {},
        settings,
      );
      if (response.status !== 200) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid Session list");
      }
      data.forEach((m) => {
        validate_1.updateLegacySessionModel(m);
        validate_1.validateModel(m);
      });
      return data;
    }
    exports2.listRunning = listRunning;
    function getSessionUrl(baseUrl, id) {
      return coreutils_12.URLExt.join(
        baseUrl,
        exports2.SESSION_SERVICE_URL,
        id,
      );
    }
    exports2.getSessionUrl = getSessionUrl;
    async function shutdownSession(
      id,
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      var _a;
      const url = getSessionUrl(settings.baseUrl, id);
      const init = { method: "DELETE" };
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        init,
        settings,
      );
      if (response.status === 404) {
        const data = await response.json();
        const msg =
          (_a = data.message) !== null && _a !== void 0
            ? _a
            : `The session "${id}"" does not exist on the server`;
        console.warn(msg);
      } else if (response.status === 410) {
        throw new serverconnection_1.ServerConnection.ResponseError(
          response,
          "The kernel was deleted but the session was not",
        );
      } else if (response.status !== 204) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
    }
    exports2.shutdownSession = shutdownSession;
    async function getSessionModel(
      id,
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = getSessionUrl(settings.baseUrl, id);
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        {},
        settings,
      );
      if (response.status !== 200) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      validate_1.updateLegacySessionModel(data);
      validate_1.validateModel(data);
      return data;
    }
    exports2.getSessionModel = getSessionModel;
    async function startSession(
      options,
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.SESSION_SERVICE_URL,
      );
      const init = {
        method: "POST",
        body: JSON.stringify(options),
      };
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        init,
        settings,
      );
      if (response.status !== 201) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      validate_1.updateLegacySessionModel(data);
      validate_1.validateModel(data);
      return data;
    }
    exports2.startSession = startSession;
    async function updateSession(
      model,
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      const url = getSessionUrl(settings.baseUrl, model.id);
      const init = {
        method: "PATCH",
        body: JSON.stringify(model),
      };
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        init,
        settings,
      );
      if (response.status !== 200) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      validate_1.updateLegacySessionModel(data);
      validate_1.validateModel(data);
      return data;
    }
    exports2.updateSession = updateSession;
  },
});

// node_modules/@jupyterlab/services/lib/session/default.js
var require_default2 = __commonJS({
  "node_modules/@jupyterlab/services/lib/session/default.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SessionConnection = void 0;
    var signaling_1 = require_dist3();
    var __1 = require_lib3();
    var restapi_1 = require_restapi3();
    var coreutils_12 = require_dist4();
    var SessionConnection = class {
      /**
       * Construct a new session.
       */
      constructor(options) {
        var _a, _b, _c, _d;
        this._id = "";
        this._path = "";
        this._name = "";
        this._type = "";
        this._kernel = null;
        this._isDisposed = false;
        this._disposed = new signaling_1.Signal(this);
        this._kernelChanged = new signaling_1.Signal(this);
        this._statusChanged = new signaling_1.Signal(this);
        this._connectionStatusChanged = new signaling_1.Signal(this);
        this._iopubMessage = new signaling_1.Signal(this);
        this._unhandledMessage = new signaling_1.Signal(this);
        this._anyMessage = new signaling_1.Signal(this);
        this._propertyChanged = new signaling_1.Signal(this);
        this._id = options.model.id;
        this._name = options.model.name;
        this._path = options.model.path;
        this._type = options.model.type;
        this._username =
          (_a = options.username) !== null && _a !== void 0 ? _a : "";
        this._clientId =
          (_b = options.clientId) !== null && _b !== void 0
            ? _b
            : coreutils_12.UUID.uuid4();
        this._connectToKernel = options.connectToKernel;
        this._kernelConnectionOptions =
          (_c = options.kernelConnectionOptions) !== null && _c !== void 0
            ? _c
            : {};
        this.serverSettings =
          (_d = options.serverSettings) !== null && _d !== void 0
            ? _d
            : __1.ServerConnection.makeSettings();
        this.setupKernel(options.model.kernel);
      }
      /**
       * A signal emitted when the session is disposed.
       */
      get disposed() {
        return this._disposed;
      }
      /**
       * A signal emitted when the kernel changes.
       */
      get kernelChanged() {
        return this._kernelChanged;
      }
      /**
       * A signal proxied from the connection about the kernel status.
       */
      get statusChanged() {
        return this._statusChanged;
      }
      /**
       * A signal proxied from the kernel about the connection status.
       */
      get connectionStatusChanged() {
        return this._connectionStatusChanged;
      }
      /**
       * A signal proxied from the kernel about iopub kernel messages.
       */
      get iopubMessage() {
        return this._iopubMessage;
      }
      /**
       * A signal proxied from the kernel for an unhandled kernel message.
       */
      get unhandledMessage() {
        return this._unhandledMessage;
      }
      /**
       * A signal proxied from the kernel emitted for any kernel message.
       *
       * #### Notes
       * The behavior is undefined if the message is modified during message
       * handling. As such, it should be treated as read-only.
       */
      get anyMessage() {
        return this._anyMessage;
      }
      /**
       * A signal emitted when a session property changes.
       */
      get propertyChanged() {
        return this._propertyChanged;
      }
      /**
       * Get the session id.
       */
      get id() {
        return this._id;
      }
      /**
       * Get the session kernel connection object.
       *
       * #### Notes
       * This is a read-only property, and can be altered by [changeKernel].
       */
      get kernel() {
        return this._kernel;
      }
      /**
       * Get the session path.
       */
      get path() {
        return this._path;
      }
      /**
       * Get the session type.
       */
      get type() {
        return this._type;
      }
      /**
       * Get the session name.
       */
      get name() {
        return this._name;
      }
      /**
       * Get the model associated with the session.
       */
      get model() {
        return {
          id: this.id,
          kernel: this.kernel && { id: this.kernel.id, name: this.kernel.name },
          path: this._path,
          type: this._type,
          name: this._name,
        };
      }
      /**
       * Test whether the session has been disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Update the session based on a session model from the server.
       *
       * #### Notes
       * This only updates this session connection instance. Use `setPath`,
       * `setName`, `setType`, and `changeKernel` to change the session values on
       * the server.
       */
      update(model) {
        const oldModel = this.model;
        this._path = model.path;
        this._name = model.name;
        this._type = model.type;
        if (
          (this._kernel === null && model.kernel !== null) ||
          (this._kernel !== null && model.kernel === null) ||
          (this._kernel !== null &&
            model.kernel !== null &&
            this._kernel.id !== model.kernel.id)
        ) {
          if (this._kernel !== null) {
            this._kernel.dispose();
          }
          const oldValue = this._kernel || null;
          this.setupKernel(model.kernel);
          const newValue = this._kernel || null;
          this._kernelChanged.emit({ name: "kernel", oldValue, newValue });
        }
        this._handleModelChange(oldModel);
      }
      /**
       * Dispose of the resources held by the session.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._isDisposed = true;
        this._disposed.emit();
        if (this._kernel) {
          this._kernel.dispose();
          const oldValue = this._kernel;
          this._kernel = null;
          const newValue = this._kernel;
          this._kernelChanged.emit({ name: "kernel", oldValue, newValue });
        }
        signaling_1.Signal.clearData(this);
      }
      /**
       * Change the session path.
       *
       * @param path - The new session path.
       *
       * @returns A promise that resolves when the session has renamed.
       *
       * #### Notes
       * This uses the Jupyter REST API, and the response is validated.
       * The promise is fulfilled on a valid response and rejected otherwise.
       */
      async setPath(path2) {
        if (this.isDisposed) {
          throw new Error("Session is disposed");
        }
        await this._patch({ path: path2 });
      }
      /**
       * Change the session name.
       */
      async setName(name2) {
        if (this.isDisposed) {
          throw new Error("Session is disposed");
        }
        await this._patch({ name: name2 });
      }
      /**
       * Change the session type.
       */
      async setType(type) {
        if (this.isDisposed) {
          throw new Error("Session is disposed");
        }
        await this._patch({ type });
      }
      /**
       * Change the kernel.
       *
       * @params options - The name or id of the new kernel.
       *
       * #### Notes
       * This shuts down the existing kernel and creates a new kernel,
       * keeping the existing session ID and session path.
       */
      async changeKernel(options) {
        if (this.isDisposed) {
          throw new Error("Session is disposed");
        }
        await this._patch({ kernel: options });
        return this.kernel;
      }
      /**
       * Kill the kernel and shutdown the session.
       *
       * @returns - The promise fulfilled on a valid response from the server.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/sessions), and validates the response.
       * Disposes of the session and emits a [sessionDied] signal on success.
       */
      async shutdown() {
        if (this.isDisposed) {
          throw new Error("Session is disposed");
        }
        await restapi_1.shutdownSession(this.id, this.serverSettings);
        this.dispose();
      }
      /**
       * Create a new kernel connection and connect to its signals.
       *
       * #### Notes
       * This method is not meant to be subclassed.
       */
      setupKernel(model) {
        if (model === null) {
          this._kernel = null;
          return;
        }
        const kc = this._connectToKernel(
          Object.assign(Object.assign({}, this._kernelConnectionOptions), {
            model,
            username: this._username,
            clientId: this._clientId,
            serverSettings: this.serverSettings,
          }),
        );
        this._kernel = kc;
        kc.statusChanged.connect(this.onKernelStatus, this);
        kc.connectionStatusChanged.connect(this.onKernelConnectionStatus, this);
        kc.unhandledMessage.connect(this.onUnhandledMessage, this);
        kc.iopubMessage.connect(this.onIOPubMessage, this);
        kc.anyMessage.connect(this.onAnyMessage, this);
      }
      /**
       * Handle to changes in the Kernel status.
       */
      onKernelStatus(sender, state) {
        this._statusChanged.emit(state);
      }
      /**
       * Handle to changes in the Kernel status.
       */
      onKernelConnectionStatus(sender, state) {
        this._connectionStatusChanged.emit(state);
      }
      /**
       * Handle iopub kernel messages.
       */
      onIOPubMessage(sender, msg) {
        this._iopubMessage.emit(msg);
      }
      /**
       * Handle unhandled kernel messages.
       */
      onUnhandledMessage(sender, msg) {
        this._unhandledMessage.emit(msg);
      }
      /**
       * Handle any kernel messages.
       */
      onAnyMessage(sender, args) {
        this._anyMessage.emit(args);
      }
      /**
       * Send a PATCH to the server, updating the session path or the kernel.
       */
      async _patch(body) {
        const model = await restapi_1.updateSession(
          Object.assign(Object.assign({}, body), { id: this._id }),
          this.serverSettings,
        );
        this.update(model);
        return model;
      }
      /**
       * Handle a change to the model.
       */
      _handleModelChange(oldModel) {
        if (oldModel.name !== this._name) {
          this._propertyChanged.emit("name");
        }
        if (oldModel.type !== this._type) {
          this._propertyChanged.emit("type");
        }
        if (oldModel.path !== this._path) {
          this._propertyChanged.emit("path");
        }
      }
    };
    exports2.SessionConnection = SessionConnection;
  },
});

// node_modules/@jupyterlab/services/lib/session/manager.js
var require_manager3 = __commonJS({
  "node_modules/@jupyterlab/services/lib/session/manager.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SessionManager = void 0;
    var algorithm_1 = require_dist();
    var polling_1 = require_dist5();
    var signaling_1 = require_dist3();
    var serverconnection_1 = require_serverconnection();
    var basemanager_1 = require_basemanager();
    var default_1 = require_default2();
    var restapi_1 = require_restapi3();
    var SessionManager = class extends basemanager_1.BaseManager {
      /**
       * Construct a new session manager.
       *
       * @param options - The default options for each session.
       */
      constructor(options) {
        var _a;
        super(options);
        this._isReady = false;
        this._sessionConnections = /* @__PURE__ */ new Set();
        this._models = /* @__PURE__ */ new Map();
        this._runningChanged = new signaling_1.Signal(this);
        this._connectionFailure = new signaling_1.Signal(this);
        this._connectToKernel = (options2) => {
          return this._kernelManager.connectTo(options2);
        };
        this._kernelManager = options.kernelManager;
        this._pollModels = new polling_1.Poll({
          auto: false,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: true,
            max: 300 * 1e3,
          },
          name: `@jupyterlab/services:SessionManager#models`,
          standby:
            (_a = options.standby) !== null && _a !== void 0
              ? _a
              : "when-hidden",
        });
        this._ready = (async () => {
          await this._pollModels.start();
          await this._pollModels.tick;
          await this._kernelManager.ready;
          this._isReady = true;
        })();
      }
      /**
       * Test whether the manager is ready.
       */
      get isReady() {
        return this._isReady;
      }
      /**
       * A promise that fulfills when the manager is ready.
       */
      get ready() {
        return this._ready;
      }
      /**
       * A signal emitted when the running sessions change.
       */
      get runningChanged() {
        return this._runningChanged;
      }
      /**
       * A signal emitted when there is a connection failure.
       */
      get connectionFailure() {
        return this._connectionFailure;
      }
      /**
       * Dispose of the resources used by the manager.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._models.clear();
        this._sessionConnections.forEach((x) => x.dispose());
        this._pollModels.dispose();
        super.dispose();
      }
      /*
       * Connect to a running session.  See also [[connectToSession]].
       */
      connectTo(options) {
        const sessionConnection = new default_1.SessionConnection(
          Object.assign(Object.assign({}, options), {
            connectToKernel: this._connectToKernel,
            serverSettings: this.serverSettings,
          }),
        );
        this._onStarted(sessionConnection);
        if (!this._models.has(options.model.id)) {
          void this.refreshRunning().catch(() => {});
        }
        return sessionConnection;
      }
      /**
       * Create an iterator over the most recent running sessions.
       *
       * @returns A new iterator over the running sessions.
       */
      running() {
        return algorithm_1.iter([...this._models.values()]);
      }
      /**
       * Force a refresh of the running sessions.
       *
       * @returns A promise that with the list of running sessions.
       *
       * #### Notes
       * This is not typically meant to be called by the user, since the
       * manager maintains its own internal state.
       */
      async refreshRunning() {
        await this._pollModels.refresh();
        await this._pollModels.tick;
      }
      /**
       * Start a new session.  See also [[startNewSession]].
       *
       * @param createOptions - Options for creating the session
       *
       * @param connectOptions - Options for connecting to the session
       */
      async startNew(createOptions, connectOptions = {}) {
        const model = await restapi_1.startSession(
          createOptions,
          this.serverSettings,
        );
        await this.refreshRunning();
        return this.connectTo(
          Object.assign(Object.assign({}, connectOptions), { model }),
        );
      }
      /**
       * Shut down a session by id.
       */
      async shutdown(id) {
        await restapi_1.shutdownSession(id, this.serverSettings);
        await this.refreshRunning();
      }
      /**
       * Shut down all sessions.
       *
       * @returns A promise that resolves when all of the kernels are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning();
        await Promise.all(
          [...this._models.keys()].map((id) =>
            restapi_1.shutdownSession(id, this.serverSettings),
          ),
        );
        await this.refreshRunning();
      }
      /**
       * Find a session associated with a path and stop it if it is the only session
       * using that kernel.
       *
       * @param path - The path in question.
       *
       * @returns A promise that resolves when the relevant sessions are stopped.
       */
      async stopIfNeeded(path2) {
        try {
          const sessions = await restapi_1.listRunning(this.serverSettings);
          const matches = sessions.filter((value) => value.path === path2);
          if (matches.length === 1) {
            const id = matches[0].id;
            await this.shutdown(id);
          }
        } catch (error) {}
      }
      /**
       * Find a session by id.
       */
      async findById(id) {
        if (this._models.has(id)) {
          return this._models.get(id);
        }
        await this.refreshRunning();
        return this._models.get(id);
      }
      /**
       * Find a session by path.
       */
      async findByPath(path2) {
        for (const m of this._models.values()) {
          if (m.path === path2) {
            return m;
          }
        }
        await this.refreshRunning();
        for (const m of this._models.values()) {
          if (m.path === path2) {
            return m;
          }
        }
        return void 0;
      }
      /**
       * Execute a request to the server to poll running kernels and update state.
       */
      async requestRunning() {
        var _a, _b;
        let models;
        try {
          models = await restapi_1.listRunning(this.serverSettings);
        } catch (err) {
          if (
            err instanceof serverconnection_1.ServerConnection.NetworkError ||
            ((_a = err.response) === null || _a === void 0
              ? void 0
              : _a.status) === 503 ||
            ((_b = err.response) === null || _b === void 0
              ? void 0
              : _b.status) === 424
          ) {
            this._connectionFailure.emit(err);
          }
          throw err;
        }
        if (this.isDisposed) {
          return;
        }
        if (
          this._models.size === models.length &&
          algorithm_1.every(models, (x) => {
            var _a2, _b2, _c, _d;
            const existing = this._models.get(x.id);
            if (!existing) {
              return false;
            }
            return (
              ((_a2 = existing.kernel) === null || _a2 === void 0
                ? void 0
                : _a2.id) ===
                ((_b2 = x.kernel) === null || _b2 === void 0
                  ? void 0
                  : _b2.id) &&
              ((_c = existing.kernel) === null || _c === void 0
                ? void 0
                : _c.name) ===
                ((_d = x.kernel) === null || _d === void 0
                  ? void 0
                  : _d.name) &&
              existing.name === x.name &&
              existing.path === x.path &&
              existing.type === x.type
            );
          })
        ) {
          return;
        }
        this._models = new Map(models.map((x) => [x.id, x]));
        this._sessionConnections.forEach((sc) => {
          if (this._models.has(sc.id)) {
            sc.update(this._models.get(sc.id));
          } else {
            sc.dispose();
          }
        });
        this._runningChanged.emit(models);
      }
      /**
       * Handle a session starting.
       */
      _onStarted(sessionConnection) {
        this._sessionConnections.add(sessionConnection);
        sessionConnection.disposed.connect(this._onDisposed, this);
        sessionConnection.propertyChanged.connect(this._onChanged, this);
        sessionConnection.kernelChanged.connect(this._onChanged, this);
      }
      _onDisposed(sessionConnection) {
        this._sessionConnections.delete(sessionConnection);
        void this.refreshRunning().catch(() => {});
      }
      _onChanged() {
        void this.refreshRunning().catch(() => {});
      }
    };
    exports2.SessionManager = SessionManager;
  },
});

// node_modules/@jupyterlab/services/lib/session/index.js
var require_session2 = __commonJS({
  "node_modules/@jupyterlab/services/lib/session/index.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __exportStar =
      (exports2 && exports2.__exportStar) ||
      function (m, exports3) {
        for (var p in m)
          if (
            p !== "default" &&
            !Object.prototype.hasOwnProperty.call(exports3, p)
          )
            __createBinding(exports3, m, p);
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SessionAPI = exports2.Session = void 0;
    var Session = __importStar(require_session());
    exports2.Session = Session;
    var SessionAPI = __importStar(require_restapi3());
    exports2.SessionAPI = SessionAPI;
    __exportStar(require_manager3(), exports2);
  },
});

// node_modules/@jupyterlab/statedb/lib/dataconnector.js
var require_dataconnector = __commonJS({
  "node_modules/@jupyterlab/statedb/lib/dataconnector.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DataConnector = void 0;
    var DataConnector = class {
      /**
       * Retrieve the list of items available from the data connector.
       *
       * @param query - The optional query filter to apply to the connector request.
       *
       * @returns A promise that always rejects with an error.
       *
       * #### Notes
       * Subclasses should reimplement if they support a back-end that can list.
       */
      async list(query) {
        throw new Error("DataConnector#list method has not been implemented.");
      }
      /**
       * Remove a value using the data connector.
       *
       * @param id - The identifier for the data being removed.
       *
       * @returns A promise that always rejects with an error.
       *
       * #### Notes
       * Subclasses should reimplement if they support a back-end that can remove.
       */
      async remove(id) {
        throw new Error(
          "DataConnector#remove method has not been implemented.",
        );
      }
      /**
       * Save a value using the data connector.
       *
       * @param id - The identifier for the data being saved.
       *
       * @param value - The data being saved.
       *
       * @returns A promise that always rejects with an error.
       *
       * #### Notes
       * Subclasses should reimplement if they support a back-end that can save.
       */
      async save(id, value) {
        throw new Error("DataConnector#save method has not been implemented.");
      }
    };
    exports2.DataConnector = DataConnector;
  },
});

// node_modules/@jupyterlab/statedb/lib/interfaces.js
var require_interfaces2 = __commonJS({
  "node_modules/@jupyterlab/statedb/lib/interfaces.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
  },
});

// node_modules/@jupyterlab/statedb/lib/restorablepool.js
var require_restorablepool = __commonJS({
  "node_modules/@jupyterlab/statedb/lib/restorablepool.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RestorablePool = void 0;
    var coreutils_12 = require_dist4();
    var properties_1 = require_dist2();
    var signaling_1 = require_dist3();
    var RestorablePool = class {
      /**
       * Create a new restorable pool.
       *
       * @param options - The instantiation options for a restorable pool.
       */
      constructor(options) {
        this._added = new signaling_1.Signal(this);
        this._current = null;
        this._currentChanged = new signaling_1.Signal(this);
        this._hasRestored = false;
        this._isDisposed = false;
        this._objects = /* @__PURE__ */ new Set();
        this._restore = null;
        this._restored = new coreutils_12.PromiseDelegate();
        this._updated = new signaling_1.Signal(this);
        this.namespace = options.namespace;
      }
      /**
       * A signal emitted when an object object is added.
       *
       * #### Notes
       * This signal will only fire when an object is added to the pool.
       * It will not fire if an object injected into the pool.
       */
      get added() {
        return this._added;
      }
      /**
       * The current object.
       *
       * #### Notes
       * The restorable pool does not set `current`. It is intended for client use.
       *
       * If `current` is set to an object that does not exist in the pool, it is a
       * no-op.
       */
      get current() {
        return this._current;
      }
      set current(obj) {
        if (this._current === obj) {
          return;
        }
        if (obj !== null && this._objects.has(obj)) {
          this._current = obj;
          this._currentChanged.emit(this._current);
        }
      }
      /**
       * A signal emitted when the current widget changes.
       */
      get currentChanged() {
        return this._currentChanged;
      }
      /**
       * Test whether the pool is disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * A promise resolved when the restorable pool has been restored.
       */
      get restored() {
        return this._restored.promise;
      }
      /**
       * The number of objects held by the pool.
       */
      get size() {
        return this._objects.size;
      }
      /**
       * A signal emitted when an object is updated.
       */
      get updated() {
        return this._updated;
      }
      /**
       * Add a new object to the pool.
       *
       * @param obj - The object object being added.
       *
       * #### Notes
       * The object passed into the pool is added synchronously; its existence in
       * the pool can be checked with the `has()` method. The promise this method
       * returns resolves after the object has been added and saved to an underlying
       * restoration connector, if one is available.
       */
      async add(obj) {
        var _a, _b;
        if (obj.isDisposed) {
          const warning = "A disposed object cannot be added.";
          console.warn(warning, obj);
          throw new Error(warning);
        }
        if (this._objects.has(obj)) {
          const warning = "This object already exists in the pool.";
          console.warn(warning, obj);
          throw new Error(warning);
        }
        this._objects.add(obj);
        obj.disposed.connect(this._onInstanceDisposed, this);
        if (Private.injectedProperty.get(obj)) {
          return;
        }
        if (this._restore) {
          const { connector } = this._restore;
          const objName = this._restore.name(obj);
          if (objName) {
            const name2 = `${this.namespace}:${objName}`;
            const data =
              (_b = (_a = this._restore).args) === null || _b === void 0
                ? void 0
                : _b.call(_a, obj);
            Private.nameProperty.set(obj, name2);
            await connector.save(name2, { data });
          }
        }
        this._added.emit(obj);
      }
      /**
       * Dispose of the resources held by the pool.
       *
       * #### Notes
       * Disposing a pool does not affect the underlying data in the data connector,
       * it simply disposes the client-side pool without making any connector calls.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._current = null;
        this._isDisposed = true;
        this._objects.clear();
        signaling_1.Signal.clearData(this);
      }
      /**
       * Find the first object in the pool that satisfies a filter function.
       *
       * @param - fn The filter function to call on each object.
       */
      find(fn) {
        const values = this._objects.values();
        for (const value of values) {
          if (fn(value)) {
            return value;
          }
        }
        return void 0;
      }
      /**
       * Iterate through each object in the pool.
       *
       * @param fn - The function to call on each object.
       */
      forEach(fn) {
        this._objects.forEach(fn);
      }
      /**
       * Filter the objects in the pool based on a predicate.
       *
       * @param fn - The function by which to filter.
       */
      filter(fn) {
        const filtered = [];
        this.forEach((obj) => {
          if (fn(obj)) {
            filtered.push(obj);
          }
        });
        return filtered;
      }
      /**
       * Inject an object into the restorable pool without the pool handling its
       * restoration lifecycle.
       *
       * @param obj - The object to inject into the pool.
       */
      inject(obj) {
        Private.injectedProperty.set(obj, true);
        return this.add(obj);
      }
      /**
       * Check if this pool has the specified object.
       *
       * @param obj - The object whose existence is being checked.
       */
      has(obj) {
        return this._objects.has(obj);
      }
      /**
       * Restore the objects in this pool's namespace.
       *
       * @param options - The configuration options that describe restoration.
       *
       * @returns A promise that resolves when restoration has completed.
       *
       * #### Notes
       * This function should almost never be invoked by client code. Its primary
       * use case is to be invoked by a layout restorer plugin that handles
       * multiple restorable pools and, when ready, asks them each to restore their
       * respective objects.
       */
      async restore(options) {
        if (this._hasRestored) {
          throw new Error("This pool has already been restored.");
        }
        this._hasRestored = true;
        const { command, connector, registry, when } = options;
        const namespace = this.namespace;
        const promises = when
          ? [connector.list(namespace)].concat(when)
          : [connector.list(namespace)];
        this._restore = options;
        const [saved] = await Promise.all(promises);
        const values = await Promise.all(
          saved.ids.map(async (id, index) => {
            const value = saved.values[index];
            const args = value && value.data;
            if (args === void 0) {
              return connector.remove(id);
            }
            return registry
              .execute(command, args)
              .catch(() => connector.remove(id));
          }),
        );
        this._restored.resolve();
        return values;
      }
      /**
       * Save the restore data for a given object.
       *
       * @param obj - The object being saved.
       */
      async save(obj) {
        var _a, _b;
        const injected = Private.injectedProperty.get(obj);
        if (!this._restore || !this.has(obj) || injected) {
          return;
        }
        const { connector } = this._restore;
        const objName = this._restore.name(obj);
        const oldName = Private.nameProperty.get(obj);
        const newName = objName ? `${this.namespace}:${objName}` : "";
        if (oldName && oldName !== newName) {
          await connector.remove(oldName);
        }
        Private.nameProperty.set(obj, newName);
        if (newName) {
          const data =
            (_b = (_a = this._restore).args) === null || _b === void 0
              ? void 0
              : _b.call(_a, obj);
          await connector.save(newName, { data });
        }
        if (oldName !== newName) {
          this._updated.emit(obj);
        }
      }
      /**
       * Clean up after disposed objects.
       */
      _onInstanceDisposed(obj) {
        this._objects.delete(obj);
        if (obj === this._current) {
          this._current = null;
          this._currentChanged.emit(this._current);
        }
        if (Private.injectedProperty.get(obj)) {
          return;
        }
        if (!this._restore) {
          return;
        }
        const { connector } = this._restore;
        const name2 = Private.nameProperty.get(obj);
        if (name2) {
          void connector.remove(name2);
        }
      }
    };
    exports2.RestorablePool = RestorablePool;
    var Private;
    (function (Private2) {
      Private2.injectedProperty = new properties_1.AttachedProperty({
        name: "injected",
        create: () => false,
      });
      Private2.nameProperty = new properties_1.AttachedProperty({
        name: "name",
        create: () => "",
      });
    })(Private || (Private = {}));
  },
});

// node_modules/@jupyterlab/statedb/lib/statedb.js
var require_statedb = __commonJS({
  "node_modules/@jupyterlab/statedb/lib/statedb.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StateDB = void 0;
    var signaling_1 = require_dist3();
    var StateDB = class _StateDB {
      /**
       * Create a new state database.
       *
       * @param options - The instantiation options for a state database.
       */
      constructor(options = {}) {
        this._changed = new signaling_1.Signal(this);
        const { connector, transform } = options;
        this._connector = connector || new _StateDB.Connector();
        if (!transform) {
          this._ready = Promise.resolve(void 0);
        } else {
          this._ready = transform.then((transformation) => {
            const { contents, type } = transformation;
            switch (type) {
              case "cancel":
                return;
              case "clear":
                return this._clear();
              case "merge":
                return this._merge(contents || {});
              case "overwrite":
                return this._overwrite(contents || {});
              default:
                return;
            }
          });
        }
      }
      /**
       * A signal that emits the change type any time a value changes.
       */
      get changed() {
        return this._changed;
      }
      /**
       * Clear the entire database.
       */
      async clear() {
        await this._ready;
        await this._clear();
      }
      /**
       * Retrieve a saved bundle from the database.
       *
       * @param id - The identifier used to retrieve a data bundle.
       *
       * @returns A promise that bears a data payload if available.
       *
       * #### Notes
       * The `id` values of stored items in the state database are formatted:
       * `'namespace:identifier'`, which is the same convention that command
       * identifiers in JupyterLab use as well. While this is not a technical
       * requirement for `fetch()`, `remove()`, and `save()`, it *is* necessary for
       * using the `list(namespace: string)` method.
       *
       * The promise returned by this method may be rejected if an error occurs in
       * retrieving the data. Non-existence of an `id` will succeed with the `value`
       * `undefined`.
       */
      async fetch(id) {
        await this._ready;
        return this._fetch(id);
      }
      /**
       * Retrieve all the saved bundles for a namespace.
       *
       * @param filter - The namespace prefix to retrieve.
       *
       * @returns A promise that bears a collection of payloads for a namespace.
       *
       * #### Notes
       * Namespaces are entirely conventional entities. The `id` values of stored
       * items in the state database are formatted: `'namespace:identifier'`, which
       * is the same convention that command identifiers in JupyterLab use as well.
       *
       * If there are any errors in retrieving the data, they will be logged to the
       * console in order to optimistically return any extant data without failing.
       * This promise will always succeed.
       */
      async list(namespace) {
        await this._ready;
        return this._list(namespace);
      }
      /**
       * Remove a value from the database.
       *
       * @param id - The identifier for the data being removed.
       *
       * @returns A promise that is rejected if remove fails and succeeds otherwise.
       */
      async remove(id) {
        await this._ready;
        await this._remove(id);
        this._changed.emit({ id, type: "remove" });
      }
      /**
       * Save a value in the database.
       *
       * @param id - The identifier for the data being saved.
       *
       * @param value - The data being saved.
       *
       * @returns A promise that is rejected if saving fails and succeeds otherwise.
       *
       * #### Notes
       * The `id` values of stored items in the state database are formatted:
       * `'namespace:identifier'`, which is the same convention that command
       * identifiers in JupyterLab use as well. While this is not a technical
       * requirement for `fetch()`, `remove()`, and `save()`, it *is* necessary for
       * using the `list(namespace: string)` method.
       */
      async save(id, value) {
        await this._ready;
        await this._save(id, value);
        this._changed.emit({ id, type: "save" });
      }
      /**
       * Return a serialized copy of the state database's entire contents.
       *
       * @returns A promise that resolves with the database contents as JSON.
       */
      async toJSON() {
        await this._ready;
        const { ids, values } = await this._list();
        return values.reduce((acc, val, idx) => {
          acc[ids[idx]] = val;
          return acc;
        }, {});
      }
      /**
       * Clear the entire database.
       */
      async _clear() {
        await Promise.all(
          (await this._list()).ids.map((id) => this._remove(id)),
        );
      }
      /**
       * Fetch a value from the database.
       */
      async _fetch(id) {
        const value = await this._connector.fetch(id);
        if (value) {
          return JSON.parse(value).v;
        }
      }
      /**
       * Fetch a list from the database.
       */
      async _list(namespace = "") {
        const { ids, values } = await this._connector.list(namespace);
        return {
          ids,
          values: values.map((val) => JSON.parse(val).v),
        };
      }
      /**
       * Merge data into the state database.
       */
      async _merge(contents) {
        await Promise.all(
          Object.keys(contents).map(
            (key) => contents[key] && this._save(key, contents[key]),
          ),
        );
      }
      /**
       * Overwrite the entire database with new contents.
       */
      async _overwrite(contents) {
        await this._clear();
        await this._merge(contents);
      }
      /**
       * Remove a key in the database.
       */
      async _remove(id) {
        return this._connector.remove(id);
      }
      /**
       * Save a key and its value in the database.
       */
      async _save(id, value) {
        return this._connector.save(id, JSON.stringify({ v: value }));
      }
    };
    exports2.StateDB = StateDB;
    (function (StateDB2) {
      class Connector {
        constructor() {
          this._storage = {};
        }
        /**
         * Retrieve an item from the data connector.
         */
        async fetch(id) {
          return this._storage[id];
        }
        /**
         * Retrieve the list of items available from the data connector.
         *
         * @param namespace - If not empty, only keys whose first token before `:`
         * exactly match `namespace` will be returned, e.g. `foo` in `foo:bar`.
         */
        async list(namespace = "") {
          return Object.keys(this._storage).reduce(
            (acc, val) => {
              if (namespace === "" ? true : namespace === val.split(":")[0]) {
                acc.ids.push(val);
                acc.values.push(this._storage[val]);
              }
              return acc;
            },
            { ids: [], values: [] },
          );
        }
        /**
         * Remove a value using the data connector.
         */
        async remove(id) {
          delete this._storage[id];
        }
        /**
         * Save a value using the data connector.
         */
        async save(id, value) {
          this._storage[id] = value;
        }
      }
      StateDB2.Connector = Connector;
    })((StateDB = exports2.StateDB || (exports2.StateDB = {})));
  },
});

// node_modules/@jupyterlab/statedb/lib/tokens.js
var require_tokens = __commonJS({
  "node_modules/@jupyterlab/statedb/lib/tokens.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IStateDB = void 0;
    var coreutils_12 = require_dist4();
    exports2.IStateDB = new coreutils_12.Token(
      "@jupyterlab/coreutils:IStateDB",
    );
  },
});

// node_modules/@jupyterlab/statedb/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/@jupyterlab/statedb/lib/index.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __exportStar =
      (exports2 && exports2.__exportStar) ||
      function (m, exports3) {
        for (var p in m)
          if (
            p !== "default" &&
            !Object.prototype.hasOwnProperty.call(exports3, p)
          )
            __createBinding(exports3, m, p);
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_dataconnector(), exports2);
    __exportStar(require_interfaces2(), exports2);
    __exportStar(require_restorablepool(), exports2);
    __exportStar(require_statedb(), exports2);
    __exportStar(require_tokens(), exports2);
  },
});

// node_modules/@jupyterlab/services/lib/setting/index.js
var require_setting = __commonJS({
  "node_modules/@jupyterlab/services/lib/setting/index.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SettingManager = void 0;
    var coreutils_12 = require_lib();
    var statedb_1 = require_lib2();
    var serverconnection_1 = require_serverconnection();
    var SERVICE_SETTINGS_URL = "api/settings";
    var SettingManager = class extends statedb_1.DataConnector {
      /**
       * Create a new setting manager.
       */
      constructor(options = {}) {
        var _a;
        super();
        this.serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : serverconnection_1.ServerConnection.makeSettings();
      }
      /**
       * Fetch a plugin's settings.
       *
       * @param id - The plugin's ID.
       *
       * @returns A promise that resolves if successful.
       */
      async fetch(id) {
        if (!id) {
          throw new Error(
            "Plugin `id` parameter is required for settings fetch.",
          );
        }
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } =
          serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        const response = await makeRequest(url, {}, serverSettings);
        if (response.status !== 200) {
          const err = await ResponseError.create(response);
          throw err;
        }
        return response.json();
      }
      /**
       * Fetch the list of all plugin setting bundles.
       *
       * @returns A promise that resolves if successful.
       */
      async list() {
        var _a, _b;
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } =
          serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, "");
        const response = await makeRequest(url, {}, serverSettings);
        if (response.status !== 200) {
          throw new ResponseError(response);
        }
        const json = await response.json();
        const values =
          (_b =
            (_a =
              json === null || json === void 0 ? void 0 : json["settings"]) ===
              null || _a === void 0
              ? void 0
              : _a.map((plugin) => {
                  plugin.data = { composite: {}, user: {} };
                  return plugin;
                })) !== null && _b !== void 0
            ? _b
            : [];
        const ids = values.map((plugin) => plugin.id);
        return { ids, values };
      }
      /**
       * Save a plugin's settings.
       *
       * @param id - The plugin's ID.
       *
       * @param raw - The user setting values as a raw string of JSON with comments.
       *
       * @returns A promise that resolves if successful.
       */
      async save(id, raw) {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } =
          serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        const init = { body: JSON.stringify({ raw }), method: "PUT" };
        const response = await makeRequest(url, init, serverSettings);
        if (response.status !== 204) {
          throw new ResponseError(response);
        }
      }
    };
    exports2.SettingManager = SettingManager;
    var Private;
    (function (Private2) {
      function url(base, id) {
        return coreutils_12.URLExt.join(base, SERVICE_SETTINGS_URL, id);
      }
      Private2.url = url;
    })(Private || (Private = {}));
  },
});

// node_modules/@jupyterlab/services/lib/terminal/restapi.js
var require_restapi4 = __commonJS({
  "node_modules/@jupyterlab/services/lib/terminal/restapi.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.shutdownTerminal =
      exports2.listRunning =
      exports2.startNew =
      exports2.isAvailable =
      exports2.TERMINAL_SERVICE_URL =
        void 0;
    var coreutils_12 = require_lib();
    var serverconnection_1 = require_serverconnection();
    exports2.TERMINAL_SERVICE_URL = "api/terminals";
    function isAvailable() {
      const available = String(
        coreutils_12.PageConfig.getOption("terminalsAvailable"),
      );
      return available.toLowerCase() === "true";
    }
    exports2.isAvailable = isAvailable;
    async function startNew(
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      Private.errorIfNotAvailable();
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.TERMINAL_SERVICE_URL,
      );
      const init = { method: "POST" };
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        init,
        settings,
      );
      if (response.status !== 200) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      return data;
    }
    exports2.startNew = startNew;
    async function listRunning(
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      Private.errorIfNotAvailable();
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.TERMINAL_SERVICE_URL,
      );
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        {},
        settings,
      );
      if (response.status !== 200) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid terminal list");
      }
      return data;
    }
    exports2.listRunning = listRunning;
    async function shutdownTerminal(
      name2,
      settings = serverconnection_1.ServerConnection.makeSettings(),
    ) {
      var _a;
      Private.errorIfNotAvailable();
      const url = coreutils_12.URLExt.join(
        settings.baseUrl,
        exports2.TERMINAL_SERVICE_URL,
        name2,
      );
      const init = { method: "DELETE" };
      const response = await serverconnection_1.ServerConnection.makeRequest(
        url,
        init,
        settings,
      );
      if (response.status === 404) {
        const data = await response.json();
        const msg =
          (_a = data.message) !== null && _a !== void 0
            ? _a
            : `The terminal session "${name2}"" does not exist on the server`;
        console.warn(msg);
      } else if (response.status !== 204) {
        const err =
          await serverconnection_1.ServerConnection.ResponseError.create(
            response,
          );
        throw err;
      }
    }
    exports2.shutdownTerminal = shutdownTerminal;
    var Private;
    (function (Private2) {
      function errorIfNotAvailable() {
        if (!isAvailable()) {
          throw new Error("Terminals Unavailable");
        }
      }
      Private2.errorIfNotAvailable = errorIfNotAvailable;
    })(Private || (Private = {}));
  },
});

// node_modules/@jupyterlab/services/lib/terminal/terminal.js
var require_terminal = __commonJS({
  "node_modules/@jupyterlab/services/lib/terminal/terminal.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isAvailable = void 0;
    var restapi_1 = require_restapi4();
    Object.defineProperty(exports2, "isAvailable", {
      enumerable: true,
      get: function () {
        return restapi_1.isAvailable;
      },
    });
  },
});

// node_modules/@jupyterlab/services/lib/terminal/default.js
var require_default3 = __commonJS({
  "node_modules/@jupyterlab/services/lib/terminal/default.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TerminalConnection = void 0;
    var coreutils_12 = require_lib();
    var coreutils_2 = require_dist4();
    var signaling_1 = require_dist3();
    var __1 = require_lib3();
    var restapi_1 = require_restapi4();
    var TerminalConnection = class _TerminalConnection {
      /**
       * Construct a new terminal session.
       */
      constructor(options) {
        var _a;
        this._createSocket = () => {
          this._errorIfDisposed();
          this._clearSocket();
          this._updateConnectionStatus("connecting");
          const name2 = this._name;
          const settings = this.serverSettings;
          let url = coreutils_12.URLExt.join(
            settings.wsUrl,
            "terminals",
            "websocket",
            encodeURIComponent(name2),
          );
          const token = settings.token;
          if (settings.appendToken && token !== "") {
            url = url + `?token=${encodeURIComponent(token)}`;
          }
          this._ws = new settings.WebSocket(url);
          this._ws.onmessage = this._onWSMessage;
          this._ws.onclose = this._onWSClose;
          this._ws.onerror = this._onWSClose;
        };
        this._onWSMessage = (event) => {
          if (this._isDisposed) {
            return;
          }
          const data = JSON.parse(event.data);
          if (data[0] === "disconnect") {
            this.dispose();
          }
          if (this._connectionStatus === "connecting") {
            if (data[0] === "setup") {
              this._updateConnectionStatus("connected");
            }
            return;
          }
          this._messageReceived.emit({
            type: data[0],
            content: data.slice(1),
          });
        };
        this._onWSClose = (event) => {
          console.warn(`Terminal websocket closed: ${event.code}`);
          if (!this.isDisposed) {
            this._reconnect();
          }
        };
        this._connectionStatus = "connecting";
        this._connectionStatusChanged = new signaling_1.Signal(this);
        this._isDisposed = false;
        this._disposed = new signaling_1.Signal(this);
        this._messageReceived = new signaling_1.Signal(this);
        this._reconnectTimeout = null;
        this._ws = null;
        this._noOp = () => {};
        this._reconnectLimit = 7;
        this._reconnectAttempt = 0;
        this._pendingMessages = [];
        this._name = options.model.name;
        this.serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : __1.ServerConnection.makeSettings();
        this._createSocket();
      }
      /**
       * A signal emitted when the session is disposed.
       */
      get disposed() {
        return this._disposed;
      }
      /**
       * A signal emitted when a message is received from the server.
       */
      get messageReceived() {
        return this._messageReceived;
      }
      /**
       * Get the name of the terminal session.
       */
      get name() {
        return this._name;
      }
      /**
       * Get the model for the terminal session.
       */
      get model() {
        return { name: this._name };
      }
      /**
       * Test whether the session is disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Dispose of the resources held by the session.
       */
      dispose() {
        if (this._isDisposed) {
          return;
        }
        this._isDisposed = true;
        this._disposed.emit();
        this._updateConnectionStatus("disconnected");
        this._clearSocket();
        signaling_1.Signal.clearData(this);
      }
      /**
       * Send a message to the terminal session.
       *
       * #### Notes
       * If the connection is down, the message will be queued for sending when
       * the connection comes back up.
       */
      send(message) {
        this._sendMessage(message);
      }
      /**
       * Send a message on the websocket, or possibly queue for later sending.
       *
       * @param queue - whether to queue the message if it cannot be sent
       */
      _sendMessage(message, queue = true) {
        if (this._isDisposed || !message.content) {
          return;
        }
        if (this.connectionStatus === "connected" && this._ws) {
          const msg = [message.type, ...message.content];
          this._ws.send(JSON.stringify(msg));
        } else if (queue) {
          this._pendingMessages.push(message);
        } else {
          throw new Error(`Could not send message: ${JSON.stringify(message)}`);
        }
      }
      /**
       * Send pending messages to the kernel.
       */
      _sendPending() {
        while (
          this.connectionStatus === "connected" &&
          this._pendingMessages.length > 0
        ) {
          this._sendMessage(this._pendingMessages[0], false);
          this._pendingMessages.shift();
        }
      }
      /**
       * Reconnect to a terminal.
       *
       * #### Notes
       * This may try multiple times to reconnect to a terminal, and will sever
       * any existing connection.
       */
      reconnect() {
        this._errorIfDisposed();
        const result = new coreutils_2.PromiseDelegate();
        const fulfill = (sender, status) => {
          if (status === "connected") {
            result.resolve();
            this.connectionStatusChanged.disconnect(fulfill, this);
          } else if (status === "disconnected") {
            result.reject(new Error("Terminal connection disconnected"));
            this.connectionStatusChanged.disconnect(fulfill, this);
          }
        };
        this.connectionStatusChanged.connect(fulfill, this);
        this._reconnectAttempt = 0;
        this._reconnect();
        return result.promise;
      }
      /**
       * Attempt a connection if we have not exhausted connection attempts.
       */
      _reconnect() {
        this._errorIfDisposed();
        clearTimeout(this._reconnectTimeout);
        if (this._reconnectAttempt < this._reconnectLimit) {
          this._updateConnectionStatus("connecting");
          const timeout = Private.getRandomIntInclusive(
            0,
            1e3 * (Math.pow(2, this._reconnectAttempt) - 1),
          );
          console.error(
            `Connection lost, reconnecting in ${Math.floor(timeout / 1e3)} seconds.`,
          );
          this._reconnectTimeout = setTimeout(this._createSocket, timeout);
          this._reconnectAttempt += 1;
        } else {
          this._updateConnectionStatus("disconnected");
        }
        this._clearSocket();
      }
      /**
       * Forcefully clear the socket state.
       *
       * #### Notes
       * This will clear all socket state without calling any handlers and will
       * not update the connection status. If you call this method, you are
       * responsible for updating the connection status as needed and recreating
       * the socket if you plan to reconnect.
       */
      _clearSocket() {
        if (this._ws !== null) {
          this._ws.onopen = this._noOp;
          this._ws.onclose = this._noOp;
          this._ws.onerror = this._noOp;
          this._ws.onmessage = this._noOp;
          this._ws.close();
          this._ws = null;
        }
      }
      /**
       * Shut down the terminal session.
       */
      async shutdown() {
        await restapi_1.shutdownTerminal(this.name, this.serverSettings);
        this.dispose();
      }
      /**
       * Clone the current terminal connection.
       */
      clone() {
        return new _TerminalConnection(this);
      }
      /**
       * Handle connection status changes.
       */
      _updateConnectionStatus(connectionStatus) {
        if (this._connectionStatus === connectionStatus) {
          return;
        }
        this._connectionStatus = connectionStatus;
        if (connectionStatus !== "connecting") {
          this._reconnectAttempt = 0;
          clearTimeout(this._reconnectTimeout);
        }
        if (connectionStatus === "connected") {
          this._sendPending();
        }
        this._connectionStatusChanged.emit(connectionStatus);
      }
      /**
       * Utility function to throw an error if this instance is disposed.
       */
      _errorIfDisposed() {
        if (this.isDisposed) {
          throw new Error("Terminal connection is disposed");
        }
      }
      /**
       * A signal emitted when the terminal connection status changes.
       */
      get connectionStatusChanged() {
        return this._connectionStatusChanged;
      }
      /**
       * The current connection status of the terminal connection.
       */
      get connectionStatus() {
        return this._connectionStatus;
      }
    };
    exports2.TerminalConnection = TerminalConnection;
    var Private;
    (function (Private2) {
      function getTermUrl(baseUrl, name2) {
        return coreutils_12.URLExt.join(
          baseUrl,
          restapi_1.TERMINAL_SERVICE_URL,
          encodeURIComponent(name2),
        );
      }
      Private2.getTermUrl = getTermUrl;
      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      Private2.getRandomIntInclusive = getRandomIntInclusive;
    })(Private || (Private = {}));
  },
});

// node_modules/@jupyterlab/services/lib/terminal/manager.js
var require_manager4 = __commonJS({
  "node_modules/@jupyterlab/services/lib/terminal/manager.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TerminalManager = void 0;
    var algorithm_1 = require_dist();
    var polling_1 = require_dist5();
    var signaling_1 = require_dist3();
    var __1 = require_lib3();
    var basemanager_1 = require_basemanager();
    var restapi_1 = require_restapi4();
    var default_1 = require_default3();
    var TerminalManager = class extends basemanager_1.BaseManager {
      /**
       * Construct a new terminal manager.
       */
      constructor(options = {}) {
        var _a;
        super(options);
        this._isReady = false;
        this._names = [];
        this._terminalConnections = /* @__PURE__ */ new Set();
        this._runningChanged = new signaling_1.Signal(this);
        this._connectionFailure = new signaling_1.Signal(this);
        if (!this.isAvailable()) {
          this._ready = Promise.reject("Terminals unavailable");
          this._ready.catch((_) => void 0);
          return;
        }
        this._pollModels = new polling_1.Poll({
          auto: false,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: true,
            max: 300 * 1e3,
          },
          name: `@jupyterlab/services:TerminalManager#models`,
          standby:
            (_a = options.standby) !== null && _a !== void 0
              ? _a
              : "when-hidden",
        });
        this._ready = (async () => {
          await this._pollModels.start();
          await this._pollModels.tick;
          this._isReady = true;
        })();
      }
      /**
       * Test whether the manager is ready.
       */
      get isReady() {
        return this._isReady;
      }
      /**
       * A promise that fulfills when the manager is ready.
       */
      get ready() {
        return this._ready;
      }
      /**
       * A signal emitted when the running terminals change.
       */
      get runningChanged() {
        return this._runningChanged;
      }
      /**
       * A signal emitted when there is a connection failure.
       */
      get connectionFailure() {
        return this._connectionFailure;
      }
      /**
       * Dispose of the resources used by the manager.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._names.length = 0;
        this._terminalConnections.forEach((x) => x.dispose());
        this._pollModels.dispose();
        super.dispose();
      }
      /**
       * Whether the terminal service is available.
       */
      isAvailable() {
        return restapi_1.isAvailable();
      }
      /*
       * Connect to a running terminal.
       *
       * @param name - The name of the target terminal.
       *
       * @param options - The options used to connect to the terminal.
       *
       * @returns A promise that resolves to the new terminal connection instance.
       *
       * #### Notes
       * The manager `serverSettings` will be used.
       */
      connectTo(options) {
        const terminalConnection = new default_1.TerminalConnection(
          Object.assign(Object.assign({}, options), {
            serverSettings: this.serverSettings,
          }),
        );
        this._onStarted(terminalConnection);
        if (!this._names.includes(options.model.name)) {
          void this.refreshRunning().catch(() => {});
        }
        return terminalConnection;
      }
      /**
       * Create an iterator over the most recent running terminals.
       *
       * @returns A new iterator over the running terminals.
       */
      running() {
        return algorithm_1.iter(this._models);
      }
      /**
       * Force a refresh of the running terminals.
       *
       * @returns A promise that with the list of running terminals.
       *
       * #### Notes
       * This is intended to be called only in response to a user action,
       * since the manager maintains its internal state.
       */
      async refreshRunning() {
        await this._pollModels.refresh();
        await this._pollModels.tick;
      }
      /**
       * Create a new terminal session.
       *
       * @returns A promise that resolves with the terminal instance.
       *
       * #### Notes
       * The manager `serverSettings` will be used unless overridden in the
       * options.
       */
      async startNew() {
        const model = await restapi_1.startNew(this.serverSettings);
        await this.refreshRunning();
        return this.connectTo({ model });
      }
      /**
       * Shut down a terminal session by name.
       */
      async shutdown(name2) {
        await restapi_1.shutdownTerminal(name2, this.serverSettings);
        await this.refreshRunning();
      }
      /**
       * Shut down all terminal sessions.
       *
       * @returns A promise that resolves when all of the sessions are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning();
        await Promise.all(
          this._names.map((name2) =>
            restapi_1.shutdownTerminal(name2, this.serverSettings),
          ),
        );
        await this.refreshRunning();
      }
      /**
       * Execute a request to the server to poll running terminals and update state.
       */
      async requestRunning() {
        var _a, _b;
        let models;
        try {
          models = await restapi_1.listRunning(this.serverSettings);
        } catch (err) {
          if (
            err instanceof __1.ServerConnection.NetworkError ||
            ((_a = err.response) === null || _a === void 0
              ? void 0
              : _a.status) === 503 ||
            ((_b = err.response) === null || _b === void 0
              ? void 0
              : _b.status) === 424
          ) {
            this._connectionFailure.emit(err);
          }
          throw err;
        }
        if (this.isDisposed) {
          return;
        }
        const names = models.map(({ name: name2 }) => name2).sort();
        if (names === this._names) {
          return;
        }
        this._names = names;
        this._terminalConnections.forEach((tc) => {
          if (!names.includes(tc.name)) {
            tc.dispose();
          }
        });
        this._runningChanged.emit(this._models);
      }
      /**
       * Handle a session starting.
       */
      _onStarted(terminalConnection) {
        this._terminalConnections.add(terminalConnection);
        terminalConnection.disposed.connect(this._onDisposed, this);
      }
      /**
       * Handle a session terminating.
       */
      _onDisposed(terminalConnection) {
        this._terminalConnections.delete(terminalConnection);
        void this.refreshRunning().catch(() => {});
      }
      get _models() {
        return this._names.map((name2) => {
          return { name: name2 };
        });
      }
    };
    exports2.TerminalManager = TerminalManager;
  },
});

// node_modules/@jupyterlab/services/lib/terminal/index.js
var require_terminal2 = __commonJS({
  "node_modules/@jupyterlab/services/lib/terminal/index.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __exportStar =
      (exports2 && exports2.__exportStar) ||
      function (m, exports3) {
        for (var p in m)
          if (
            p !== "default" &&
            !Object.prototype.hasOwnProperty.call(exports3, p)
          )
            __createBinding(exports3, m, p);
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TerminalAPI = exports2.Terminal = void 0;
    var Terminal = __importStar(require_terminal());
    exports2.Terminal = Terminal;
    var TerminalAPI = __importStar(require_restapi4());
    exports2.TerminalAPI = TerminalAPI;
    __exportStar(require_manager4(), exports2);
  },
});

// node_modules/@jupyterlab/services/lib/workspace/index.js
var require_workspace = __commonJS({
  "node_modules/@jupyterlab/services/lib/workspace/index.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WorkspaceManager = void 0;
    var coreutils_12 = require_lib();
    var statedb_1 = require_lib2();
    var serverconnection_1 = require_serverconnection();
    var SERVICE_WORKSPACES_URL = "api/workspaces";
    var WorkspaceManager = class extends statedb_1.DataConnector {
      /**
       * Create a new workspace manager.
       */
      constructor(options = {}) {
        var _a;
        super();
        this.serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : serverconnection_1.ServerConnection.makeSettings();
      }
      /**
       * Fetch a workspace.
       *
       * @param id - The workspace's ID.
       *
       * @returns A promise that resolves if successful.
       */
      async fetch(id) {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } =
          serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        const response = await makeRequest(url, {}, serverSettings);
        if (response.status !== 200) {
          const err = await ResponseError.create(response);
          throw err;
        }
        return response.json();
      }
      /**
       * Fetch the list of workspace IDs that exist on the server.
       *
       * @returns A promise that resolves if successful.
       */
      async list() {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } =
          serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, "");
        const response = await makeRequest(url, {}, serverSettings);
        if (response.status !== 200) {
          const err = await ResponseError.create(response);
          throw err;
        }
        const result = await response.json();
        return result.workspaces;
      }
      /**
       * Remove a workspace from the server.
       *
       * @param id - The workspaces's ID.
       *
       * @returns A promise that resolves if successful.
       */
      async remove(id) {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } =
          serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        const init = { method: "DELETE" };
        const response = await makeRequest(url, init, serverSettings);
        if (response.status !== 204) {
          const err = await ResponseError.create(response);
          throw err;
        }
      }
      /**
       * Save a workspace.
       *
       * @param id - The workspace's ID.
       *
       * @param workspace - The workspace being saved.
       *
       * @returns A promise that resolves if successful.
       */
      async save(id, workspace) {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } =
          serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        const init = { body: JSON.stringify(workspace), method: "PUT" };
        const response = await makeRequest(url, init, serverSettings);
        if (response.status !== 204) {
          const err = await ResponseError.create(response);
          throw err;
        }
      }
    };
    exports2.WorkspaceManager = WorkspaceManager;
    var Private;
    (function (Private2) {
      function url(base, id) {
        return coreutils_12.URLExt.join(base, SERVICE_WORKSPACES_URL, id);
      }
      Private2.url = url;
    })(Private || (Private = {}));
  },
});

// node_modules/@jupyterlab/services/lib/manager.js
var require_manager5 = __commonJS({
  "node_modules/@jupyterlab/services/lib/manager.js"(exports2) {
    "use strict";
    init_process_development();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ServiceManager = void 0;
    var signaling_1 = require_dist3();
    var builder_1 = require_builder();
    var nbconvert_1 = require_nbconvert();
    var contents_1 = require_contents();
    var kernelspec_1 = require_kernelspec2();
    var session_1 = require_session2();
    var setting_1 = require_setting();
    var terminal_1 = require_terminal2();
    var serverconnection_1 = require_serverconnection();
    var workspace_1 = require_workspace();
    var kernel_1 = require_kernel2();
    var ServiceManager = class {
      /**
       * Construct a new services provider.
       */
      constructor(options = {}) {
        var _a, _b;
        this._isDisposed = false;
        this._connectionFailure = new signaling_1.Signal(this);
        this._isReady = false;
        const defaultDrive = options.defaultDrive;
        const serverSettings =
          (_a = options.serverSettings) !== null && _a !== void 0
            ? _a
            : serverconnection_1.ServerConnection.makeSettings();
        const standby =
          (_b = options.standby) !== null && _b !== void 0 ? _b : "when-hidden";
        const normalized = { defaultDrive, serverSettings, standby };
        const kernelManager = new kernel_1.KernelManager(normalized);
        this.serverSettings = serverSettings;
        this.contents = new contents_1.ContentsManager(normalized);
        this.sessions = new session_1.SessionManager(
          Object.assign(Object.assign({}, normalized), { kernelManager }),
        );
        this.settings = new setting_1.SettingManager(normalized);
        this.terminals = new terminal_1.TerminalManager(normalized);
        this.builder = new builder_1.BuildManager(normalized);
        this.workspaces = new workspace_1.WorkspaceManager(normalized);
        this.nbconvert = new nbconvert_1.NbConvertManager(normalized);
        this.kernelspecs = new kernelspec_1.KernelSpecManager(normalized);
        this.kernelspecs.connectionFailure.connect(
          this._onConnectionFailure,
          this,
        );
        this.sessions.connectionFailure.connect(
          this._onConnectionFailure,
          this,
        );
        this.terminals.connectionFailure.connect(
          this._onConnectionFailure,
          this,
        );
        const readyList = [this.sessions.ready, this.kernelspecs.ready];
        if (this.terminals.isAvailable()) {
          readyList.push(this.terminals.ready);
        }
        this._readyPromise = Promise.all(readyList).then(() => {
          this._isReady = true;
        });
      }
      /**
       * A signal emitted when there is a connection failure with the kernel.
       */
      get connectionFailure() {
        return this._connectionFailure;
      }
      /**
       * Test whether the service manager is disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Dispose of the resources used by the manager.
       */
      dispose() {
        if (this.isDisposed) {
          return;
        }
        this._isDisposed = true;
        signaling_1.Signal.clearData(this);
        this.contents.dispose();
        this.sessions.dispose();
        this.terminals.dispose();
      }
      /**
       * Test whether the manager is ready.
       */
      get isReady() {
        return this._isReady;
      }
      /**
       * A promise that fulfills when the manager is ready.
       */
      get ready() {
        return this._readyPromise;
      }
      _onConnectionFailure(sender, err) {
        this._connectionFailure.emit(err);
      }
    };
    exports2.ServiceManager = ServiceManager;
  },
});

// node_modules/@jupyterlab/services/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/@jupyterlab/services/lib/index.js"(exports2) {
    "use strict";
    init_process_development();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __exportStar =
      (exports2 && exports2.__exportStar) ||
      function (m, exports3) {
        for (var p in m)
          if (
            p !== "default" &&
            !Object.prototype.hasOwnProperty.call(exports3, p)
          )
            __createBinding(exports3, m, p);
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_config(), exports2);
    __exportStar(require_contents(), exports2);
    __exportStar(require_kernel2(), exports2);
    __exportStar(require_kernelspec2(), exports2);
    __exportStar(require_manager5(), exports2);
    __exportStar(require_serverconnection(), exports2);
    __exportStar(require_session2(), exports2);
    __exportStar(require_setting(), exports2);
    __exportStar(require_terminal2(), exports2);
    __exportStar(require_workspace(), exports2);
    __exportStar(require_nbconvert(), exports2);
  },
});

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports2, module2) {
    "use strict";
    init_process_development();
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply =
      R && typeof R.apply === "function"
        ? R.apply
        : function ReflectApply2(target, receiver, args) {
            return Function.prototype.apply.call(target, receiver, args);
          };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(
          Object.getOwnPropertySymbols(target),
        );
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN =
      Number.isNaN ||
      function NumberIsNaN2(value) {
        return value !== value;
      };
    function EventEmitter3() {
      EventEmitter3.init.call(this);
    }
    module2.exports = EventEmitter3;
    module2.exports.once = once2;
    EventEmitter3.EventEmitter = EventEmitter3;
    EventEmitter3.prototype._events = void 0;
    EventEmitter3.prototype._eventsCount = 0;
    EventEmitter3.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError(
          'The "listener" argument must be of type Function. Received type ' +
            typeof listener,
        );
      }
    }
    Object.defineProperty(EventEmitter3, "defaultMaxListeners", {
      enumerable: true,
      get: function () {
        return defaultMaxListeners;
      },
      set: function (arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
              arg +
              ".",
          );
        }
        defaultMaxListeners = arg;
      },
    });
    EventEmitter3.init = function () {
      if (
        this._events === void 0 ||
        this._events === Object.getPrototypeOf(this)._events
      ) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter3.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError(
          'The value of "n" is out of range. It must be a non-negative number. Received ' +
            n +
            ".",
        );
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter3.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter3.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter3.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0) doError = doError && events.error === void 0;
      else if (!doError) return false;
      if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error(
          "Unhandled error." + (er ? " (" + er.message + ")" : ""),
        );
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0) return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener,
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend
            ? [listener, existing]
            : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error(
            "Possible EventEmitter memory leak detected. " +
              existing.length +
              " " +
              String(type) +
              " listeners added. Use emitter.setMaxListeners() to increase limit",
          );
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter3.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter3.prototype.on = EventEmitter3.prototype.addListener;
    EventEmitter3.prototype.prependListener = function prependListener(
      type,
      listener,
    ) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter3.prototype.once = function once3(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter3.prototype.prependOnceListener = function prependOnceListener(
      type,
      listener,
    ) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter3.prototype.removeListener = function removeListener(
      type,
      listener,
    ) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0) return this;
      list = events[type];
      if (list === void 0) return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners(
      type,
    ) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0) return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0) return [];
      var evlistener = events[type];
      if (evlistener === void 0) return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap
        ? unwrapListeners(evlistener)
        : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter3.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter3.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter3.listenerCount = function (emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter3.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i) copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++) list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once2(emitter, name2) {
      return new Promise(function (resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name2, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        eventTargetAgnosticAddListener(emitter, name2, resolver, {
          once: true,
        });
        if (name2 !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name2, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name2, listener);
        } else {
          emitter.on(name2, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name2, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name2, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
            typeof emitter,
        );
      }
    }
  },
});

// node_modules/semver/semver.js
var require_semver = __commonJS({
  "node_modules/semver/semver.js"(exports2, module2) {
    init_process_development();
    exports2 = module2.exports = SemVer;
    var debug;
    if (
      typeof process === "object" &&
      process.env &&
      process.env.NODE_DEBUG &&
      /\bsemver\b/i.test(process.env.NODE_DEBUG)
    ) {
      debug = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug = function () {};
    }
    exports2.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER =
      Number.MAX_SAFE_INTEGER /* istanbul ignore next */ || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var re = (exports2.re = []);
    var safeRe = (exports2.safeRe = []);
    var src = (exports2.src = []);
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
    ];
    function makeSafeRe(value) {
      for (var i2 = 0; i2 < safeRegexReplacements.length; i2++) {
        var token = safeRegexReplacements[i2][0];
        var max = safeRegexReplacements[i2][1];
        value = value
          .split(token + "*")
          .join(token + "{0," + max + "}")
          .split(token + "+")
          .join(token + "{1," + max + "}");
      }
      return value;
    }
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = "\\d+";
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-]" + LETTERDASHNUMBER + "*";
    var MAINVERSION = R++;
    src[MAINVERSION] =
      "(" +
      src[NUMERICIDENTIFIER] +
      ")\\.(" +
      src[NUMERICIDENTIFIER] +
      ")\\.(" +
      src[NUMERICIDENTIFIER] +
      ")";
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] =
      "(" +
      src[NUMERICIDENTIFIERLOOSE] +
      ")\\.(" +
      src[NUMERICIDENTIFIERLOOSE] +
      ")\\.(" +
      src[NUMERICIDENTIFIERLOOSE] +
      ")";
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] =
      "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] =
      "(?:" +
      src[NUMERICIDENTIFIERLOOSE] +
      "|" +
      src[NONNUMERICIDENTIFIER] +
      ")";
    var PRERELEASE = R++;
    src[PRERELEASE] =
      "(?:-(" +
      src[PRERELEASEIDENTIFIER] +
      "(?:\\." +
      src[PRERELEASEIDENTIFIER] +
      ")*))";
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] =
      "(?:-?(" +
      src[PRERELEASEIDENTIFIERLOOSE] +
      "(?:\\." +
      src[PRERELEASEIDENTIFIERLOOSE] +
      ")*))";
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = LETTERDASHNUMBER + "+";
    var BUILD = R++;
    src[BUILD] =
      "(?:\\+(" +
      src[BUILDIDENTIFIER] +
      "(?:\\." +
      src[BUILDIDENTIFIER] +
      ")*))";
    var FULL = R++;
    var FULLPLAIN =
      "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
    src[FULL] = "^" + FULLPLAIN + "$";
    var LOOSEPLAIN =
      "[v=\\s]*" +
      src[MAINVERSIONLOOSE] +
      src[PRERELEASELOOSE] +
      "?" +
      src[BUILD] +
      "?";
    var LOOSE = R++;
    src[LOOSE] = "^" + LOOSEPLAIN + "$";
    var GTLT = R++;
    src[GTLT] = "((?:<|>)?=?)";
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] =
      "[v=\\s]*(" +
      src[XRANGEIDENTIFIER] +
      ")(?:\\.(" +
      src[XRANGEIDENTIFIER] +
      ")(?:\\.(" +
      src[XRANGEIDENTIFIER] +
      ")(?:" +
      src[PRERELEASE] +
      ")?" +
      src[BUILD] +
      "?)?)?";
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] =
      "[v=\\s]*(" +
      src[XRANGEIDENTIFIERLOOSE] +
      ")(?:\\.(" +
      src[XRANGEIDENTIFIERLOOSE] +
      ")(?:\\.(" +
      src[XRANGEIDENTIFIERLOOSE] +
      ")(?:" +
      src[PRERELEASELOOSE] +
      ")?" +
      src[BUILD] +
      "?)?)?";
    var XRANGE = R++;
    src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
    var COERCE = R++;
    src[COERCE] =
      "(?:^|[^\\d])(\\d{1," +
      MAX_SAFE_COMPONENT_LENGTH +
      "})(?:\\.(\\d{1," +
      MAX_SAFE_COMPONENT_LENGTH +
      "}))?(?:\\.(\\d{1," +
      MAX_SAFE_COMPONENT_LENGTH +
      "}))?(?:$|[^\\d])";
    var LONETILDE = R++;
    src[LONETILDE] = "(?:~>?)";
    var TILDETRIM = R++;
    src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
    re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
    safeRe[TILDETRIM] = new RegExp(makeSafeRe(src[TILDETRIM]), "g");
    var tildeTrimReplace = "$1~";
    var TILDE = R++;
    src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
    var TILDELOOSE = R++;
    src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
    var LONECARET = R++;
    src[LONECARET] = "(?:\\^)";
    var CARETTRIM = R++;
    src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
    re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
    safeRe[CARETTRIM] = new RegExp(makeSafeRe(src[CARETTRIM]), "g");
    var caretTrimReplace = "$1^";
    var CARET = R++;
    src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
    var CARETLOOSE = R++;
    src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
    var COMPARATOR = R++;
    src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] =
      "(\\s*)" +
      src[GTLT] +
      "\\s*(" +
      LOOSEPLAIN +
      "|" +
      src[XRANGEPLAIN] +
      ")";
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
    safeRe[COMPARATORTRIM] = new RegExp(makeSafeRe(src[COMPARATORTRIM]), "g");
    var comparatorTrimReplace = "$1$2$3";
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] =
      "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] =
      "^\\s*(" +
      src[XRANGEPLAINLOOSE] +
      ")\\s+-\\s+(" +
      src[XRANGEPLAINLOOSE] +
      ")\\s*$";
    var STAR = R++;
    src[STAR] = "(<|>)?=?\\s*\\*";
    for (i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
        safeRe[i] = new RegExp(makeSafeRe(src[i]));
      }
    }
    var i;
    exports2.parse = parse;
    function parse(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false,
        };
      }
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      var r = options.loose ? safeRe[LOOSE] : safeRe[FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    }
    exports2.valid = valid;
    function valid(version, options) {
      var v = parse(version, options);
      return v ? v.version : null;
    }
    exports2.clean = clean;
    function clean(version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }
    exports2.SemVer = SemVer;
    function SemVer(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false,
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(
          "version is longer than " + MAX_LENGTH + " characters",
        );
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version, options);
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version
        .trim()
        .match(options.loose ? safeRe[LOOSE] : safeRe[FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function (id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function () {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function () {
      return this.version;
    };
    SemVer.prototype.compare = function (other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function (other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return (
        compareIdentifiers(this.major, other.major) ||
        compareIdentifiers(this.minor, other.minor) ||
        compareIdentifiers(this.patch, other.patch)
      );
    };
    SemVer.prototype.comparePre = function (other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function (release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (
            this.minor !== 0 ||
            this.patch !== 0 ||
            this.prerelease.length === 0
          ) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports2.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports2.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports2.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b
        ? 0
        : anum && !bnum
          ? -1
          : bnum && !anum
            ? 1
            : a < b
              ? -1
              : 1;
    }
    exports2.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports2.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports2.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports2.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports2.compare = compare2;
    function compare2(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports2.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare2(a, b, true);
    }
    exports2.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare2(b, a, loose);
    }
    exports2.sort = sort;
    function sort(list, loose) {
      return list.sort(function (a, b) {
        return exports2.compare(a, b, loose);
      });
    }
    exports2.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function (a, b) {
        return exports2.rcompare(a, b, loose);
      });
    }
    exports2.gt = gt;
    function gt(a, b, loose) {
      return compare2(a, b, loose) > 0;
    }
    exports2.lt = lt;
    function lt(a, b, loose) {
      return compare2(a, b, loose) < 0;
    }
    exports2.eq = eq;
    function eq(a, b, loose) {
      return compare2(a, b, loose) === 0;
    }
    exports2.neq = neq;
    function neq(a, b, loose) {
      return compare2(a, b, loose) !== 0;
    }
    exports2.gte = gte;
    function gte(a, b, loose) {
      return compare2(a, b, loose) >= 0;
    }
    exports2.lte = lte;
    function lte(a, b, loose) {
      return compare2(a, b, loose) <= 0;
    }
    exports2.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object") a = a.version;
          if (typeof b === "object") b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object") a = a.version;
          if (typeof b === "object") b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports2.Comparator = Comparator;
    function Comparator(comp, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false,
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options);
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function (comp) {
      var r = this.options.loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1];
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function () {
      return this.value;
    };
    Comparator.prototype.test = function (version) {
      debug("Comparator.test", version, this.options.loose);
      if (this.semver === ANY) {
        return true;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      return cmp(version, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function (comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false,
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        rangeTmp = new Range(comp.value, options);
        return satisfies2(this.value, rangeTmp, options);
      } else if (comp.operator === "") {
        rangeTmp = new Range(this.value, options);
        return satisfies2(comp.semver, rangeTmp, options);
      }
      var sameDirectionIncreasing =
        (this.operator === ">=" || this.operator === ">") &&
        (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing =
        (this.operator === "<=" || this.operator === "<") &&
        (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive =
        (this.operator === ">=" || this.operator === "<=") &&
        (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan =
        cmp(this.semver, "<", comp.semver, options) &&
        (this.operator === ">=" || this.operator === ">") &&
        (comp.operator === "<=" || comp.operator === "<");
      var oppositeDirectionsGreaterThan =
        cmp(this.semver, ">", comp.semver, options) &&
        (this.operator === "<=" || this.operator === "<") &&
        (comp.operator === ">=" || comp.operator === ">");
      return (
        sameDirectionIncreasing ||
        sameDirectionDecreasing ||
        (sameSemVer && differentDirectionsInclusive) ||
        oppositeDirectionsLessThan ||
        oppositeDirectionsGreaterThan
      );
    };
    exports2.Range = Range;
    function Range(range, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false,
        };
      }
      if (range instanceof Range) {
        if (
          range.loose === !!options.loose &&
          range.includePrerelease === !!options.includePrerelease
        ) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options);
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range.trim().split(/\s+/).join(" ");
      this.set = this.raw
        .split("||")
        .map(function (range2) {
          return this.parseRange(range2.trim());
        }, this)
        .filter(function (c) {
          return c.length;
        });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + this.raw);
      }
      this.format();
    }
    Range.prototype.format = function () {
      this.range = this.set
        .map(function (comps) {
          return comps.join(" ").trim();
        })
        .join("||")
        .trim();
      return this.range;
    };
    Range.prototype.toString = function () {
      return this.range;
    };
    Range.prototype.parseRange = function (range) {
      var loose = this.options.loose;
      var hr = loose ? safeRe[HYPHENRANGELOOSE] : safeRe[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug("hyphen replace", range);
      range = range.replace(safeRe[COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range, safeRe[COMPARATORTRIM]);
      range = range.replace(safeRe[TILDETRIM], tildeTrimReplace);
      range = range.replace(safeRe[CARETTRIM], caretTrimReplace);
      var compRe = loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
      var set = range
        .split(" ")
        .map(function (comp) {
          return parseComparator(comp, this.options);
        }, this)
        .join(" ")
        .split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function (comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function (comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function (range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function (thisComparators) {
        return thisComparators.every(function (thisComparator) {
          return range.set.some(function (rangeComparators) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    };
    exports2.toComparators = toComparators;
    function toComparators(range, options) {
      return new Range(range, options).set.map(function (comp) {
        return comp
          .map(function (c) {
            return c.value;
          })
          .join(" ")
          .trim()
          .split(" ");
      });
    }
    function parseComparator(comp, options) {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options) {
      return comp
        .trim()
        .split(/\s+/)
        .map(function (comp2) {
          return replaceTilde(comp2, options);
        })
        .join(" ");
    }
    function replaceTilde(comp, options) {
      var r = options.loose ? safeRe[TILDELOOSE] : safeRe[TILDE];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret =
            ">=" +
            M +
            "." +
            m +
            "." +
            p +
            "-" +
            pr +
            " <" +
            M +
            "." +
            (+m + 1) +
            ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options) {
      return comp
        .trim()
        .split(/\s+/)
        .map(function (comp2) {
          return replaceCaret(comp2, options);
        })
        .join(" ");
    }
    function replaceCaret(comp, options) {
      debug("caret", comp, options);
      var r = options.loose ? safeRe[CARETLOOSE] : safeRe[CARET];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret =
                ">=" +
                M +
                "." +
                m +
                "." +
                p +
                "-" +
                pr +
                " <" +
                M +
                "." +
                m +
                "." +
                (+p + 1);
            } else {
              ret =
                ">=" +
                M +
                "." +
                m +
                "." +
                p +
                "-" +
                pr +
                " <" +
                M +
                "." +
                (+m + 1) +
                ".0";
            }
          } else {
            ret =
              ">=" +
              M +
              "." +
              m +
              "." +
              p +
              "-" +
              pr +
              " <" +
              (+M + 1) +
              ".0.0";
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret =
                ">=" +
                M +
                "." +
                m +
                "." +
                p +
                " <" +
                M +
                "." +
                m +
                "." +
                (+p + 1);
            } else {
              ret =
                ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options) {
      debug("replaceXRanges", comp, options);
      return comp
        .split(/\s+/)
        .map(function (comp2) {
          return replaceXRange(comp2, options);
        })
        .join(" ");
    }
    function replaceXRange(comp, options) {
      comp = comp.trim();
      var r = options.loose ? safeRe[XRANGELOOSE] : safeRe[XRANGE];
      return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p;
        } else if (xm) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        }
        debug("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options) {
      debug("replaceStars", comp, options);
      return comp.trim().replace(safeRe[STAR], "");
    }
    function hyphenReplace(
      $0,
      from,
      fM,
      fm,
      fp,
      fpr,
      fb,
      to,
      tM,
      tm,
      tp,
      tpr,
      tb,
    ) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function (version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version, options) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (
              allowed.major === version.major &&
              allowed.minor === version.minor &&
              allowed.patch === version.patch
            ) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports2.satisfies = satisfies2;
    function satisfies2(version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports2.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }
    exports2.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }
    exports2.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function (comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports2.validRange = validRange;
    function validRange(range, options) {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports2.ltr = ltr;
    function ltr(version, range, options) {
      return outside(version, range, "<", options);
    }
    exports2.gtr = gtr;
    function gtr(version, range, options) {
      return outside(version, range, ">", options);
    }
    exports2.outside = outside;
    function outside(version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies2(version, range, options)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function (comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if (
          (!low.operator || low.operator === comp) &&
          ltefn(version, low.semver)
        ) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports2.prerelease = prerelease;
    function prerelease(version, options) {
      var parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports2.intersects = intersects;
    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }
    exports2.coerce = coerce;
    function coerce(version) {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      var match = version.match(safeRe[COERCE]);
      if (match == null) {
        return null;
      }
      return parse(
        match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"),
      );
    }
  },
});

// src/webviews/webview-side/ipywidgets/kernel/index.ts
init_process_development();

// src/webviews/webview-side/react-common/postOffice.ts
init_process_development();

// src/webviews/webview-side/react-common/logger.ts
init_process_development();
var messageLogger;
function logMessage(message) {
  if (messageLogger) {
    messageLogger("verbose", message);
  }
}
function logErrorMessage(message) {
  if (messageLogger) {
    messageLogger("error", message);
  }
}
function setLogger(logger) {
  messageLogger = logger;
}

// src/webviews/webview-side/react-common/postOffice.ts
var VsCodeMessageApi = class {
  constructor() {
    this.registered = false;
    this.baseHandler = this.handleVSCodeApiMessages.bind(this);
  }
  register(msgCallback) {
    this.messageCallback = msgCallback;
    if (!this.vscodeApi && typeof acquireVsCodeApi !== "undefined") {
      this.vscodeApi = acquireVsCodeApi();
    } else if (
      !this.vscodeApi &&
      typeof window.acquireVsCodeApi !== "undefined"
    ) {
      this.vscodeApi = window.acquireVsCodeApi();
    }
    if (!this.vscodeApi) {
      console.error("The vscode api is not set");
    }
    if (!this.registered) {
      this.registered = true;
      window.addEventListener("message", this.baseHandler);
      try {
        const api = this.vscodeApi;
        if (api && api.handleMessage) {
          api.handleMessage(this.handleVSCodeApiMessages.bind(this));
        }
      } catch (e) {}
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessage(type, payload) {
    if (this.vscodeApi) {
      this.vscodeApi.postMessage({ type, payload });
    } else if (type === "IPyWidgets_logMessage") {
      logMessage(`Logging message ${type}, ${payload}`);
    } else {
      logMessage(`No vscode API to post message ${type}`);
    }
  }
  dispose() {
    if (this.registered) {
      this.registered = false;
      window.removeEventListener("message", this.baseHandler);
    }
  }
  async handleVSCodeApiMessages(ev) {
    const msg = ev.data;
    if (msg && this.messageCallback) {
      await this.messageCallback(msg);
    }
  }
};
var KernelMessageApi = class {
  constructor(kernelMessagingApi) {
    this.kernelMessagingApi = kernelMessagingApi
      ? kernelMessagingApi
      : {
          onDidReceiveKernelMessage,
          postKernelMessage,
        };
  }
  register(msgCallback) {
    this.messageCallback = msgCallback;
    if (!this.kernelHandler) {
      this.kernelHandler = this.kernelMessagingApi.onDidReceiveKernelMessage(
        this.handleKernelMessage.bind(this),
      );
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessage(type, payload) {
    this.kernelMessagingApi.postKernelMessage({ type, payload });
  }
  dispose() {
    if (this.kernelHandler) {
      this.kernelHandler.dispose();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleKernelMessage(ev) {
    const msg = ev;
    if (msg && this.messageCallback) {
      await this.messageCallback(msg);
    }
  }
};
var PostOffice = class {
  constructor(kernelMessagingApi) {
    this.kernelMessagingApi = kernelMessagingApi;
    this.handlers = [];
  }
  dispose() {
    if (this.messageApi) {
      this.messageApi.dispose();
    }
  }
  sendMessage(type, payload) {
    return this.sendUnsafeMessage(type.toString(), payload);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendUnsafeMessage(type, payload) {
    if (this.messageApi) {
      this.messageApi.sendMessage(type, payload);
    } else if (type === "IPyWidgets_logMessage") {
      console.log("Message not sent", type, payload);
    } else {
      logMessage(`No message API to post message ${type}`);
    }
  }
  addHandler(handler) {
    this.acquireApi();
    this.handlers.push(handler);
  }
  removeHandler(handler) {
    this.handlers = this.handlers.filter((f) => f !== handler);
  }
  // Hook up to our messaging API
  acquireApi() {
    if (this.messageApi) {
      return;
    }
    if (this.useKernelMessageApi()) {
      this.messageApi = new KernelMessageApi(this.kernelMessagingApi);
    } else {
      this.messageApi = new VsCodeMessageApi();
    }
    this.messageApi.register(this.handleMessage.bind(this));
  }
  // Check to see if global kernel message API is supported, if so use that
  // instead of the VSCodeAPI which is not available in NativeNotebooks
  useKernelMessageApi() {
    if (
      (this.kernelMessagingApi &&
        typeof this.kernelMessagingApi.postKernelMessage !== "undefined") ||
      typeof postKernelMessage !== "undefined"
    ) {
      return true;
    }
    return false;
  }
  async handleMessage(msg) {
    if (this.handlers) {
      if (msg) {
        this.handlers.forEach((h) => {
          if (h) {
            h.handleMessage(msg.type, msg.payload);
          }
        });
      }
    }
  }
};

// src/messageTypes.ts
init_process_development();

// src/webviews/webview-side/ipywidgets/kernel/manager.ts
init_process_development();

// style-stub:@jupyter-widgets/controls/css/labvariables.css
init_process_development();

// style-helper:__style_helper__
init_process_development();
function injectStyle(text) {
  if (typeof document !== "undefined") {
    var style = document.createElement("style");
    var node = document.createTextNode(text);
    style.appendChild(node);
    document.head.appendChild(style);
  }
}

// style-content:@jupyter-widgets/controls/css/labvariables.css
var labvariables_default =
  ':root{--md-red-50: #FFEBEE;--md-red-100: #FFCDD2;--md-red-200: #EF9A9A;--md-red-300: #E57373;--md-red-400: #EF5350;--md-red-500: #F44336;--md-red-600: #E53935;--md-red-700: #D32F2F;--md-red-800: #C62828;--md-red-900: #B71C1C;--md-red-A100: #FF8A80;--md-red-A200: #FF5252;--md-red-A400: #FF1744;--md-red-A700: #D50000;--md-pink-50: #FCE4EC;--md-pink-100: #F8BBD0;--md-pink-200: #F48FB1;--md-pink-300: #F06292;--md-pink-400: #EC407A;--md-pink-500: #E91E63;--md-pink-600: #D81B60;--md-pink-700: #C2185B;--md-pink-800: #AD1457;--md-pink-900: #880E4F;--md-pink-A100: #FF80AB;--md-pink-A200: #FF4081;--md-pink-A400: #F50057;--md-pink-A700: #C51162;--md-purple-50: #F3E5F5;--md-purple-100: #E1BEE7;--md-purple-200: #CE93D8;--md-purple-300: #BA68C8;--md-purple-400: #AB47BC;--md-purple-500: #9C27B0;--md-purple-600: #8E24AA;--md-purple-700: #7B1FA2;--md-purple-800: #6A1B9A;--md-purple-900: #4A148C;--md-purple-A100: #EA80FC;--md-purple-A200: #E040FB;--md-purple-A400: #D500F9;--md-purple-A700: #AA00FF;--md-deep-purple-50: #EDE7F6;--md-deep-purple-100: #D1C4E9;--md-deep-purple-200: #B39DDB;--md-deep-purple-300: #9575CD;--md-deep-purple-400: #7E57C2;--md-deep-purple-500: #673AB7;--md-deep-purple-600: #5E35B1;--md-deep-purple-700: #512DA8;--md-deep-purple-800: #4527A0;--md-deep-purple-900: #311B92;--md-deep-purple-A100: #B388FF;--md-deep-purple-A200: #7C4DFF;--md-deep-purple-A400: #651FFF;--md-deep-purple-A700: #6200EA;--md-indigo-50: #E8EAF6;--md-indigo-100: #C5CAE9;--md-indigo-200: #9FA8DA;--md-indigo-300: #7986CB;--md-indigo-400: #5C6BC0;--md-indigo-500: #3F51B5;--md-indigo-600: #3949AB;--md-indigo-700: #303F9F;--md-indigo-800: #283593;--md-indigo-900: #1A237E;--md-indigo-A100: #8C9EFF;--md-indigo-A200: #536DFE;--md-indigo-A400: #3D5AFE;--md-indigo-A700: #304FFE;--md-blue-50: #E3F2FD;--md-blue-100: #BBDEFB;--md-blue-200: #90CAF9;--md-blue-300: #64B5F6;--md-blue-400: #42A5F5;--md-blue-500: #2196F3;--md-blue-600: #1E88E5;--md-blue-700: #1976D2;--md-blue-800: #1565C0;--md-blue-900: #0D47A1;--md-blue-A100: #82B1FF;--md-blue-A200: #448AFF;--md-blue-A400: #2979FF;--md-blue-A700: #2962FF;--md-light-blue-50: #E1F5FE;--md-light-blue-100: #B3E5FC;--md-light-blue-200: #81D4FA;--md-light-blue-300: #4FC3F7;--md-light-blue-400: #29B6F6;--md-light-blue-500: #03A9F4;--md-light-blue-600: #039BE5;--md-light-blue-700: #0288D1;--md-light-blue-800: #0277BD;--md-light-blue-900: #01579B;--md-light-blue-A100: #80D8FF;--md-light-blue-A200: #40C4FF;--md-light-blue-A400: #00B0FF;--md-light-blue-A700: #0091EA;--md-cyan-50: #E0F7FA;--md-cyan-100: #B2EBF2;--md-cyan-200: #80DEEA;--md-cyan-300: #4DD0E1;--md-cyan-400: #26C6DA;--md-cyan-500: #00BCD4;--md-cyan-600: #00ACC1;--md-cyan-700: #0097A7;--md-cyan-800: #00838F;--md-cyan-900: #006064;--md-cyan-A100: #84FFFF;--md-cyan-A200: #18FFFF;--md-cyan-A400: #00E5FF;--md-cyan-A700: #00B8D4;--md-teal-50: #E0F2F1;--md-teal-100: #B2DFDB;--md-teal-200: #80CBC4;--md-teal-300: #4DB6AC;--md-teal-400: #26A69A;--md-teal-500: #009688;--md-teal-600: #00897B;--md-teal-700: #00796B;--md-teal-800: #00695C;--md-teal-900: #004D40;--md-teal-A100: #A7FFEB;--md-teal-A200: #64FFDA;--md-teal-A400: #1DE9B6;--md-teal-A700: #00BFA5;--md-green-50: #E8F5E9;--md-green-100: #C8E6C9;--md-green-200: #A5D6A7;--md-green-300: #81C784;--md-green-400: #66BB6A;--md-green-500: #4CAF50;--md-green-600: #43A047;--md-green-700: #388E3C;--md-green-800: #2E7D32;--md-green-900: #1B5E20;--md-green-A100: #B9F6CA;--md-green-A200: #69F0AE;--md-green-A400: #00E676;--md-green-A700: #00C853;--md-light-green-50: #F1F8E9;--md-light-green-100: #DCEDC8;--md-light-green-200: #C5E1A5;--md-light-green-300: #AED581;--md-light-green-400: #9CCC65;--md-light-green-500: #8BC34A;--md-light-green-600: #7CB342;--md-light-green-700: #689F38;--md-light-green-800: #558B2F;--md-light-green-900: #33691E;--md-light-green-A100: #CCFF90;--md-light-green-A200: #B2FF59;--md-light-green-A400: #76FF03;--md-light-green-A700: #64DD17;--md-lime-50: #F9FBE7;--md-lime-100: #F0F4C3;--md-lime-200: #E6EE9C;--md-lime-300: #DCE775;--md-lime-400: #D4E157;--md-lime-500: #CDDC39;--md-lime-600: #C0CA33;--md-lime-700: #AFB42B;--md-lime-800: #9E9D24;--md-lime-900: #827717;--md-lime-A100: #F4FF81;--md-lime-A200: #EEFF41;--md-lime-A400: #C6FF00;--md-lime-A700: #AEEA00;--md-yellow-50: #FFFDE7;--md-yellow-100: #FFF9C4;--md-yellow-200: #FFF59D;--md-yellow-300: #FFF176;--md-yellow-400: #FFEE58;--md-yellow-500: #FFEB3B;--md-yellow-600: #FDD835;--md-yellow-700: #FBC02D;--md-yellow-800: #F9A825;--md-yellow-900: #F57F17;--md-yellow-A100: #FFFF8D;--md-yellow-A200: #FFFF00;--md-yellow-A400: #FFEA00;--md-yellow-A700: #FFD600;--md-amber-50: #FFF8E1;--md-amber-100: #FFECB3;--md-amber-200: #FFE082;--md-amber-300: #FFD54F;--md-amber-400: #FFCA28;--md-amber-500: #FFC107;--md-amber-600: #FFB300;--md-amber-700: #FFA000;--md-amber-800: #FF8F00;--md-amber-900: #FF6F00;--md-amber-A100: #FFE57F;--md-amber-A200: #FFD740;--md-amber-A400: #FFC400;--md-amber-A700: #FFAB00;--md-orange-50: #FFF3E0;--md-orange-100: #FFE0B2;--md-orange-200: #FFCC80;--md-orange-300: #FFB74D;--md-orange-400: #FFA726;--md-orange-500: #FF9800;--md-orange-600: #FB8C00;--md-orange-700: #F57C00;--md-orange-800: #EF6C00;--md-orange-900: #E65100;--md-orange-A100: #FFD180;--md-orange-A200: #FFAB40;--md-orange-A400: #FF9100;--md-orange-A700: #FF6D00;--md-deep-orange-50: #FBE9E7;--md-deep-orange-100: #FFCCBC;--md-deep-orange-200: #FFAB91;--md-deep-orange-300: #FF8A65;--md-deep-orange-400: #FF7043;--md-deep-orange-500: #FF5722;--md-deep-orange-600: #F4511E;--md-deep-orange-700: #E64A19;--md-deep-orange-800: #D84315;--md-deep-orange-900: #BF360C;--md-deep-orange-A100: #FF9E80;--md-deep-orange-A200: #FF6E40;--md-deep-orange-A400: #FF3D00;--md-deep-orange-A700: #DD2C00;--md-brown-50: #EFEBE9;--md-brown-100: #D7CCC8;--md-brown-200: #BCAAA4;--md-brown-300: #A1887F;--md-brown-400: #8D6E63;--md-brown-500: #795548;--md-brown-600: #6D4C41;--md-brown-700: #5D4037;--md-brown-800: #4E342E;--md-brown-900: #3E2723;--md-grey-50: #FAFAFA;--md-grey-100: #F5F5F5;--md-grey-200: #EEEEEE;--md-grey-300: #E0E0E0;--md-grey-400: #BDBDBD;--md-grey-500: #9E9E9E;--md-grey-600: #757575;--md-grey-700: #616161;--md-grey-800: #424242;--md-grey-900: #212121;--md-blue-grey-50: #ECEFF1;--md-blue-grey-100: #CFD8DC;--md-blue-grey-200: #B0BEC5;--md-blue-grey-300: #90A4AE;--md-blue-grey-400: #78909C;--md-blue-grey-500: #607D8B;--md-blue-grey-600: #546E7A;--md-blue-grey-700: #455A64;--md-blue-grey-800: #37474F;--md-blue-grey-900: #263238}:root{--jp-icon-search: none;--jp-ui-select-caret: none}:root{--jp-border-width: 1px;--jp-border-color0: var(--md-grey-700);--jp-border-color1: var(--md-grey-500);--jp-border-color2: var(--md-grey-300);--jp-border-color3: var(--md-grey-100);--jp-ui-icon-font-size: 14px;--jp-ui-font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;--jp-ui-font-color0: rgba(0,0,0,1);--jp-ui-font-color1: rgba(0,0,0,.8);--jp-ui-font-color2: rgba(0,0,0,.5);--jp-ui-font-color3: rgba(0,0,0,.3);--jp-ui-inverse-font-color0: rgba(255, 255, 255, 1);--jp-ui-inverse-font-color1: rgba(255, 255, 255, 1);--jp-ui-inverse-font-color2: rgba(255, 255, 255, .7);--jp-ui-inverse-font-color3: rgba(255, 255, 255, .5);--jp-inverse-ui-font-color0: rgba(255,255,255,1);--jp-inverse-ui-font-color1: rgba(255,255,255,1);--jp-inverse-ui-font-color2: rgba(255,255,255,.7);--jp-inverse-ui-font-color3: rgba(255,255,255,.5);--jp-content-font-size: 13px;--jp-content-line-height: 1.5;--jp-content-font-color0: black;--jp-content-font-color1: black;--jp-content-font-color2: var(--md-grey-700);--jp-content-font-color3: var(--md-grey-500);--jp-ui-font-scale-factor: 1.2;--jp-ui-font-size0: calc(var(--jp-ui-font-size1)/var(--jp-ui-font-scale-factor));--jp-ui-font-size1: 13px;--jp-ui-font-size2: calc(var(--jp-ui-font-size1)*var(--jp-ui-font-scale-factor));--jp-ui-font-size3: calc(var(--jp-ui-font-size2)*var(--jp-ui-font-scale-factor));--jp-code-font-size: 13px;--jp-code-line-height: 1.307;--jp-code-padding: 5px;--jp-code-font-family: monospace;--jp-layout-color0: white;--jp-layout-color1: white;--jp-layout-color2: var(--md-grey-200);--jp-layout-color3: var(--md-grey-400);--jp-brand-color0: var(--md-blue-700);--jp-brand-color1: var(--md-blue-500);--jp-brand-color2: var(--md-blue-300);--jp-brand-color3: var(--md-blue-100);--jp-accent-color0: var(--md-green-700);--jp-accent-color1: var(--md-green-500);--jp-accent-color2: var(--md-green-300);--jp-accent-color3: var(--md-green-100);--jp-warn-color0: var(--md-orange-700);--jp-warn-color1: var(--md-orange-500);--jp-warn-color2: var(--md-orange-300);--jp-warn-color3: var(--md-orange-100);--jp-error-color0: var(--md-red-700);--jp-error-color1: var(--md-red-500);--jp-error-color2: var(--md-red-300);--jp-error-color3: var(--md-red-100);--jp-success-color0: var(--md-green-700);--jp-success-color1: var(--md-green-500);--jp-success-color2: var(--md-green-300);--jp-success-color3: var(--md-green-100);--jp-info-color0: var(--md-cyan-700);--jp-info-color1: var(--md-cyan-500);--jp-info-color2: var(--md-cyan-300);--jp-info-color3: var(--md-cyan-100);--jp-cell-padding: 5px;--jp-cell-editor-background: #f7f7f7;--jp-cell-editor-border-color: #cfcfcf;--jp-cell-editor-background-edit: var(--jp-ui-layout-color1);--jp-cell-editor-border-color-edit: var(--jp-brand-color1);--jp-cell-prompt-width: 100px;--jp-cell-prompt-font-family: "Roboto Mono", monospace;--jp-cell-prompt-letter-spacing: 0px;--jp-cell-prompt-opacity: 1;--jp-cell-prompt-opacity-not-active: .4;--jp-cell-prompt-font-color-not-active: var(--md-grey-700);--jp-cell-inprompt-font-color: #307FC1;--jp-cell-outprompt-font-color: #BF5B3D;--jp-notebook-padding: 10px;--jp-notebook-scroll-padding: 100px;--jp-console-background: var(--md-grey-100);--jp-toolbar-border-color: var(--md-grey-400);--jp-toolbar-micro-height: 8px;--jp-toolbar-background: var(--jp-layout-color0);--jp-toolbar-box-shadow: 0px 0px 2px 0px rgba(0,0,0,.24);--jp-toolbar-header-margin: 4px 4px 0px 4px;--jp-toolbar-active-background: var(--md-grey-300)}\n';

// style-stub:@jupyter-widgets/controls/css/labvariables.css
injectStyle(labvariables_default);

// src/webviews/webview-side/ipywidgets/kernel/manager.ts
var import_fast_deep_equal = __toESM(require_fast_deep_equal());

// node_modules/@c4312/evt/index.js
init_process_development();
var EventEmitter = class {
  constructor() {
    this.event = (listener, thisArgs, disposables) => {
      const d = this.add(thisArgs ? listener.bind(thisArgs) : listener);
      disposables == null ? void 0 : disposables.push(d);
      return d;
    };
  }
  /**
   * Gets the number of event listeners.
   */
  get size() {
    if (!this.listeners) {
      return 0;
    } else if (typeof this.listeners === "function") {
      return 1;
    } else {
      return this.listeners.length;
    }
  }
  /**
   * Emits event data.
   */
  fire(value) {
    if (!this.listeners) {
    } else if (typeof this.listeners === "function") {
      this.listeners(value);
    } else {
      for (const listener of this.listeners) {
        listener(value);
      }
    }
  }
  /**
   * Disposes of the emitter.
   */
  dispose() {
    this.listeners = void 0;
  }
  add(listener) {
    if (!this.listeners) {
      this.listeners = listener;
    } else if (typeof this.listeners === "function") {
      this.listeners = [this.listeners, listener];
    } else {
      this.listeners.push(listener);
    }
    return { dispose: () => this.rm(listener) };
  }
  rm(listener) {
    if (!this.listeners) {
      return;
    }
    if (typeof this.listeners === "function") {
      if (this.listeners === listener) {
        this.listeners = void 0;
      }
      return;
    }
    const index = this.listeners.indexOf(listener);
    if (index === -1) {
      return;
    }
    if (this.listeners.length === 2) {
      this.listeners = index === 0 ? this.listeners[1] : this.listeners[0];
    } else {
      this.listeners = this.listeners
        .slice(0, index)
        .concat(this.listeners.slice(index + 1));
    }
  }
};

// src/webviews/webview-side/ipywidgets/kernel/kernel.ts
init_process_development();
var import_services = __toESM(require_lib3());
var import_default = __toESM(require_default());

// src/platform/common/utils/async.ts
init_process_development();

// src/platform/common/utils/misc.ts
init_process_development();

// src/platform/common/constants.ts
init_process_development();

// src/platform/constants.ts
init_process_development();
var MillisecondsInADay = 24 * 60 * 60 * 1e3;

// src/platform/common/constants.ts
var JVSC_EXTENSION_ID = "ms-toolsai.jupyter";
var HelpLinks;
((HelpLinks2) => {
  HelpLinks2.PythonInteractiveHelpLink = "https://aka.ms/pyaiinstall";
  HelpLinks2.JupyterDataRateHelpLink = "https://aka.ms/AA5ggm0";
})(HelpLinks || (HelpLinks = {}));
var Settings;
((Settings2) => {
  Settings2.JupyterServerRemoteLaunchNameSeparator = "\n";
  Settings2.JupyterServerRemoteLaunchService = JVSC_EXTENSION_ID;
  Settings2.JupyterServerUriListMax = 10;
  Settings2.IntellisenseTimeout = 2e3;
  Settings2.IntellisenseResolveTimeout = 5e3;
})(Settings || (Settings = {}));
var Identifiers;
((Identifiers2) => {
  Identifiers2.GeneratedThemeName = "ipython-theme";
  Identifiers2.MatplotLibDefaultParams = "_VSCode_defaultMatplotlib_Params";
  Identifiers2.MatplotLibFigureFormats = "_VSCode_matplotLib_FigureFormats";
  Identifiers2.DefaultCodeCellMarker = "# %%";
  Identifiers2.DefaultCommTarget = "jupyter.widget";
  Identifiers2.ALL_VARIABLES = "ALL_VARIABLES";
  Identifiers2.KERNEL_VARIABLES = "KERNEL_VARIABLES";
  Identifiers2.DEBUGGER_VARIABLES = "DEBUGGER_VARIABLES";
  Identifiers2.PYTHON_VARIABLES_REQUESTER = "PYTHON_VARIABLES_REQUESTER";
  Identifiers2.MULTIPLEXING_DEBUGSERVICE = "MULTIPLEXING_DEBUGSERVICE";
  Identifiers2.RUN_BY_LINE_DEBUGSERVICE = "RUN_BY_LINE_DEBUGSERVICE";
  Identifiers2.REMOTE_URI = "https://remote/";
  Identifiers2.REMOTE_URI_ID_PARAM = "id";
  Identifiers2.REMOTE_URI_HANDLE_PARAM = "uriHandle";
  Identifiers2.REMOTE_URI_EXTENSION_ID_PARAM = "extensionId";
})(Identifiers || (Identifiers = {}));
var CodeSnippets;
((CodeSnippets2) => {
  CodeSnippets2.ImportIPython = "{0}\nfrom IPython import get_ipython\n\n{1}";
  CodeSnippets2.MatplotLibInit = `import matplotlib
%matplotlib inline
${Identifiers.MatplotLibDefaultParams} = dict(matplotlib.rcParams)
`;
  CodeSnippets2.DisableJedi = "%config Completer.use_jedi = False";
})(CodeSnippets || (CodeSnippets = {}));
var Commands;
((Commands2) => {
  Commands2.RunAllCells = "jupyter.runallcells";
  Commands2.RunAllCellsAbove = "jupyter.runallcellsabove";
  Commands2.RunCellAndAllBelow = "jupyter.runcellandallbelow";
  Commands2.RunAllCellsAbovePalette = "jupyter.runallcellsabove.palette";
  Commands2.RunCellAndAllBelowPalette =
    "jupyter.runcurrentcellandallbelow.palette";
  Commands2.RunToLine = "jupyter.runtoline";
  Commands2.RunFromLine = "jupyter.runfromline";
  Commands2.RunCell = "jupyter.runcell";
  Commands2.RunCurrentCell = "jupyter.runcurrentcell";
  Commands2.RunCurrentCellAdvance = "jupyter.runcurrentcelladvance";
  Commands2.CreateNewInteractive = "jupyter.createnewinteractive";
  Commands2.ImportNotebook = "jupyter.importnotebook";
  Commands2.ImportNotebookFile = "jupyter.importnotebookfile";
  Commands2.ExportFileAsNotebook = "jupyter.exportfileasnotebook";
  Commands2.ExportFileAndOutputAsNotebook =
    "jupyter.exportfileandoutputasnotebook";
  Commands2.InterruptKernel = "jupyter.interruptkernel";
  Commands2.RestartKernel = "jupyter.restartkernel";
  Commands2.RestartKernelAndRunAllCells = "jupyter.restartkernelandrunallcells";
  Commands2.RestartKernelAndRunUpToSelectedCell =
    "jupyter.restartkernelandrunuptoselectedcell";
  Commands2.NotebookEditorRemoveAllCells =
    "jupyter.notebookeditor.removeallcells";
  Commands2.NotebookEditorRunAllCells = "jupyter.notebookeditor.runallcells";
  Commands2.NotebookEditorRunSelectedCell =
    "jupyter.notebookeditor.runselectedcell";
  Commands2.NotebookEditorAddCellBelow = "jupyter.notebookeditor.addcellbelow";
  Commands2.ExpandAllCells = "jupyter.expandallcells";
  Commands2.CollapseAllCells = "jupyter.collapseallcells";
  Commands2.ExportOutputAsNotebook = "jupyter.exportoutputasnotebook";
  Commands2.ExecSelectionInInteractiveWindow =
    "jupyter.execSelectionInteractive";
  Commands2.RunFileInInteractiveWindows = "jupyter.runFileInteractive";
  Commands2.DebugFileInInteractiveWindows = "jupyter.debugFileInteractive";
  Commands2.AddCellBelow = "jupyter.addcellbelow";
  Commands2.DebugCurrentCellPalette = "jupyter.debugcurrentcell.palette";
  Commands2.DebugCell = "jupyter.debugcell";
  Commands2.DebugStepOver = "jupyter.debugstepover";
  Commands2.DebugContinue = "jupyter.debugcontinue";
  Commands2.DebugStop = "jupyter.debugstop";
  Commands2.RunCurrentCellAndAddBelow = "jupyter.runcurrentcellandaddbelow";
  Commands2.InsertCellBelowPosition = "jupyter.insertCellBelowPosition";
  Commands2.InsertCellBelow = "jupyter.insertCellBelow";
  Commands2.InsertCellAbove = "jupyter.insertCellAbove";
  Commands2.DeleteCells = "jupyter.deleteCells";
  Commands2.SelectCell = "jupyter.selectCell";
  Commands2.SelectCellContents = "jupyter.selectCellContents";
  Commands2.ExtendSelectionByCellAbove = "jupyter.extendSelectionByCellAbove";
  Commands2.ExtendSelectionByCellBelow = "jupyter.extendSelectionByCellBelow";
  Commands2.MoveCellsUp = "jupyter.moveCellsUp";
  Commands2.MoveCellsDown = "jupyter.moveCellsDown";
  Commands2.ChangeCellToMarkdown = "jupyter.changeCellToMarkdown";
  Commands2.ChangeCellToCode = "jupyter.changeCellToCode";
  Commands2.GotoNextCellInFile = "jupyter.gotoNextCellInFile";
  Commands2.GotoPrevCellInFile = "jupyter.gotoPrevCellInFile";
  Commands2.ScrollToCell = "jupyter.scrolltocell";
  Commands2.CreateNewNotebook = "jupyter.createnewnotebook";
  Commands2.ViewJupyterOutput = "jupyter.viewOutput";
  Commands2.ExportAsPythonScript = "jupyter.exportAsPythonScript";
  Commands2.ExportToHTML = "jupyter.exportToHTML";
  Commands2.ExportToPDF = "jupyter.exportToPDF";
  Commands2.Export = "jupyter.export";
  Commands2.NativeNotebookExport = "jupyter.notebookeditor.export";
  Commands2.LatestExtension = "jupyter.latestExtension";
  Commands2.EnableLoadingWidgetsFrom3rdPartySource =
    "jupyter.enableLoadingWidgetScriptsFromThirdPartySource";
  Commands2.ShowDataViewer = "jupyter.showDataViewer";
  Commands2.ShowJupyterDataViewer = "jupyter.showJupyterDataViewer";
  Commands2.RefreshDataViewer = "jupyter.refreshDataViewer";
  Commands2.ClearSavedJupyterUris = "jupyter.clearSavedJupyterUris";
  Commands2.OpenVariableView = "jupyter.openVariableView";
  Commands2.OpenOutlineView = "jupyter.openOutlineView";
  Commands2.InteractiveClearAll = "jupyter.interactive.clearAllCells";
  Commands2.InteractiveGoToCode = "jupyter.interactive.goToCode";
  Commands2.InteractiveCopyCell = "jupyter.interactive.copyCell";
  Commands2.InteractiveExportAsNotebook =
    "jupyter.interactive.exportasnotebook";
  Commands2.InteractiveExportAs = "jupyter.interactive.exportas";
  Commands2.RunByLine = "jupyter.runByLine";
  Commands2.RunAndDebugCell = "jupyter.runAndDebugCell";
  Commands2.RunByLineNext = "jupyter.runByLineNext";
  Commands2.RunByLineStop = "jupyter.runByLineStop";
  Commands2.ReplayPylanceLog = "jupyter.replayPylanceLog";
  Commands2.ReplayPylanceLogStep = "jupyter.replayPylanceLogStep";
  Commands2.InstallPythonExtensionViaKernelPicker =
    "jupyter.installPythonExtensionViaKernelPicker";
  Commands2.InstallPythonViaKernelPicker =
    "jupyter.installPythonViaKernelPicker";
  Commands2.ContinueEditSessionInCodespace =
    "jupyter.continueEditSessionInCodespace";
})(Commands || (Commands = {}));
var CodeLensCommands;
((CodeLensCommands2) => {
  CodeLensCommands2.DefaultDesignLenses = [
    Commands.RunCurrentCell,
    Commands.RunAllCellsAbove,
    Commands.DebugCell,
  ];
  CodeLensCommands2.DefaultDebuggingLenses = [
    Commands.DebugContinue,
    Commands.DebugStop,
    Commands.DebugStepOver,
  ];
  CodeLensCommands2.DebuggerCommands = [
    Commands.DebugContinue,
    Commands.DebugStop,
    Commands.DebugStepOver,
  ];
})(CodeLensCommands || (CodeLensCommands = {}));
var EditorContexts;
((EditorContexts2) => {
  EditorContexts2.HasCodeCells = "jupyter.hascodecells";
  EditorContexts2.IsInteractiveActive = "jupyter.isinteractiveactive";
  EditorContexts2.OwnsSelection = "jupyter.ownsSelection";
  EditorContexts2.HaveNativeCells = "jupyter.havenativecells";
  EditorContexts2.HaveNative = "jupyter.havenative";
  EditorContexts2.IsNativeActive = "jupyter.isnativeactive";
  EditorContexts2.IsInteractiveOrNativeActive =
    "jupyter.isinteractiveornativeactive";
  EditorContexts2.IsPythonOrNativeActive = "jupyter.ispythonornativeactive";
  EditorContexts2.IsPythonOrInteractiveActive =
    "jupyter.ispythonorinteractiveeactive";
  EditorContexts2.IsPythonOrInteractiveOrNativeActive =
    "jupyter.ispythonorinteractiveornativeeactive";
  EditorContexts2.CanRestartNotebookKernel =
    "jupyter.notebookeditor.canrestartNotebookkernel";
  EditorContexts2.CanInterruptNotebookKernel =
    "jupyter.notebookeditor.canInterruptNotebookKernel";
  EditorContexts2.CanRestartInteractiveWindowKernel =
    "jupyter.interactive.canRestartNotebookKernel";
  EditorContexts2.CanInterruptInteractiveWindowKernel =
    "jupyter.interactive.canInterruptNotebookKernel";
  EditorContexts2.RunByLineCells = "jupyter.notebookeditor.runByLineCells";
  EditorContexts2.RunByLineDocuments =
    "jupyter.notebookeditor.runByLineDocuments";
  EditorContexts2.DebugDocuments = "jupyter.notebookeditor.debugDocuments";
  EditorContexts2.IsPythonNotebook = "jupyter.ispythonnotebook";
  EditorContexts2.IsJupyterKernelSelected = "jupyter.kernel.isjupyter";
  EditorContexts2.IsDataViewerActive = "jupyter.dataViewerActive";
  EditorContexts2.HasNativeNotebookOrInteractiveWindowOpen =
    "jupyter.hasNativeNotebookOrInteractiveWindowOpen";
  EditorContexts2.ZmqAvailable = "jupyter.zmqavailable";
  EditorContexts2.ReplayLogLoaded = "jupyter.replayLogLoaded";
  EditorContexts2.KernelSource = "jupyter.kernelSource";
})(EditorContexts || (EditorContexts = {}));
var RegExpValues;
((RegExpValues2) => {
  RegExpValues2.PythonCellMarker =
    /^(#\s*%%|#\s*\<codecell\>|#\s*In\[\d*?\]|#\s*In\[ \])/;
  RegExpValues2.PythonMarkdownCellMarker =
    /^(#\s*%%\s*\[markdown\]|#\s*\<markdowncell\>)/;
  RegExpValues2.UrlPatternRegEx =
    "(?<PREFIX>https?:\\/\\/)((\\(.+\\s+or\\s+(?<IP>.+)\\))|(?<LOCAL>[^\\s]+))(?<REST>:.+)";
  RegExpValues2.HttpPattern = /https?:\/\//;
  RegExpValues2.ShapeSplitterRegEx = /.*,\s*(\d+).*/;
  RegExpValues2.SvgHeightRegex = /(\<svg.*height=\")(.*?)\"/;
  RegExpValues2.SvgWidthRegex = /(\<svg.*width=\")(.*?)\"/;
  RegExpValues2.SvgSizeTagRegex = /\<svg.*tag=\"sizeTag=\{(.*),\s*(.*)\}\"/;
})(RegExpValues || (RegExpValues = {}));
var DataScienceStartupTime = Symbol("DataScienceStartupTime");
var WIDGET_MIMETYPE = "application/vnd.jupyter.widget-view+json";
var WIDGET_STATE_MIMETYPE = "application/vnd.jupyter.widget-state+json";

// src/platform/common/utils/misc.ts
function noop() {}

// src/platform/common/utils/symbols.ts
init_process_development();
var MicrotaskDelay = Symbol("MicrotaskDelay");

// src/platform/common/utils/async.ts
var DeferredImpl = class {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(scope = null) {
    this.scope = scope;
    this._resolved = false;
    this._rejected = false;
    this._promise = new Promise((res, rej) => {
      this._resolve = res;
      this._reject = rej;
    });
  }
  get value() {
    return this._value;
  }
  resolve(value) {
    this._value = value;
    this._resolve.apply(this.scope ? this.scope : this, arguments);
    this._resolved = true;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject(_reason) {
    this._reject.apply(this.scope ? this.scope : this, arguments);
    this._rejected = true;
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
function createDeferred(scope = null) {
  return new DeferredImpl(scope);
}

// src/platform/common/utils/serializers.ts
init_process_development();
function serializeDataViews(buffers) {
  if (!buffers || !Array.isArray(buffers) || buffers.length === 0) {
    return;
  }
  const newBufferView = [];
  for (let i = 0; i < buffers.length; i += 1) {
    const item = buffers[i];
    if ("buffer" in item && "byteOffset" in item) {
      const buffer = Array.apply(null, new Uint8Array(item.buffer));
      newBufferView.push({
        ...item,
        byteLength: item.byteLength,
        byteOffset: item.byteOffset,
        buffer,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      });
    } else {
      newBufferView.push([...new Uint8Array(item)]);
    }
  }
  return newBufferView;
}
function deserializeDataViews(buffers) {
  if (!Array.isArray(buffers) || buffers.length === 0) {
    return buffers;
  }
  const newBufferView = [];
  for (let i = 0; i < buffers.length; i += 1) {
    const item = buffers[i];
    if ("buffer" in item && "byteOffset" in item) {
      const buffer = new Uint8Array(item.buffer).buffer;
      const bufferView = new DataView(buffer, item.byteOffset, item.byteLength);
      newBufferView.push(bufferView);
    } else {
      const buffer = new Uint8Array(item).buffer;
      newBufferView.push(buffer);
    }
  }
  return newBufferView;
}

// src/webviews/webview-side/ipywidgets/kernel/kernel.ts
var ProxyKernel = class _ProxyKernel {
  constructor(options, postOffice) {
    this.postOffice = postOffice;
    this.hookResults = /* @__PURE__ */ new Map();
    let proxySocketInstance;
    class ProxyWebSocket {
      constructor() {
        this.sendEnabled = true;
        proxySocketInstance = this;
      }
      close(_code, _reason) {}
      send(data) {
        if (this.sendEnabled) {
          if (typeof data === "string") {
            postOffice.sendMessage("IPyWidgets_msg" /* IPyWidgets_msg */, data);
          } else {
            postOffice.sendMessage(
              "IPyWidgets_binary_msg" /* IPyWidgets_binary_msg */,
              serializeDataViews([data]),
            );
          }
        }
      }
    }
    const settings = import_services.ServerConnection.makeSettings({
      WebSocket: ProxyWebSocket,
      wsUrl: "BOGUS_PVSC",
    });
    this.awaitingExtensionMessage = /* @__PURE__ */ new Map();
    this.realKernel = new import_default.KernelConnection({
      serverSettings: settings,
      clientId: options.clientId,
      handleComms: true,
      username: options.userName,
      model: options.model,
    });
    const signaling = require_dist3();
    this._ioPubMessageSignal = new signaling.Signal(this);
    this.realKernel.iopubMessage.connect(this.onIOPubMessage, this);
    this._options = options;
    postOffice.addHandler(this);
    this.websocket = proxySocketInstance;
    this.messageHook = this.messageHookInterceptor.bind(this);
    this.messageHooks = /* @__PURE__ */ new Map();
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
  createComm(targetName, commId) {
    return this.realKernel.createComm(targetName, commId);
  }
  get disposed() {
    return this.realKernel.disposed;
  }
  clone(options) {
    return new _ProxyKernel(
      {
        ...this._options,
        clientId:
          (options == null ? void 0 : options.clientId) ||
          this._options.clientId,
        userName:
          (options == null ? void 0 : options.username) ||
          this._options.userName,
      },
      this.postOffice,
    );
  }
  shutdown() {
    return this.realKernel.shutdown();
  }
  sendShellMessage(msg, expectReply, disposeOnDone) {
    return this.realKernel.sendShellMessage(msg, expectReply, disposeOnDone);
  }
  sendControlMessage(msg, expectReply, disposeOnDone) {
    return this.realKernel.sendControlMessage(msg, expectReply, disposeOnDone);
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
  requestComplete(content) {
    return this.realKernel.requestComplete(content);
  }
  requestInspect(content) {
    return this.realKernel.requestInspect(content);
  }
  requestHistory(content) {
    return this.realKernel.requestHistory(content);
  }
  requestExecute(content, disposeOnDone, metadata) {
    return this.realKernel.requestExecute(content, disposeOnDone, metadata);
  }
  requestDebug(content, disposeOnDone) {
    return this.realKernel.requestDebug(content, disposeOnDone);
  }
  requestIsComplete(content) {
    return this.realKernel.requestIsComplete(content);
  }
  requestCommInfo(content) {
    return this.realKernel.requestCommInfo(content);
  }
  sendInputReply(content) {
    return this.realKernel.sendInputReply(content);
  }
  registerCommTarget(targetName, callback) {
    this.postOffice.sendMessage(
      "IPyWidgets_registerCommTarget" /* IPyWidgets_registerCommTarget */,
      targetName,
    );
    return this.realKernel.registerCommTarget(targetName, callback);
  }
  removeCommTarget(targetName, callback) {
    return this.realKernel.removeCommTarget(targetName, callback);
  }
  dispose() {
    this.postOffice.removeHandler(this);
    return this.realKernel.dispose();
  }
  handleMessage(type, payload) {
    switch (type) {
      case "IPyWidgets_MessageHookCall" /* IPyWidgets_MessageHookCall */:
        this.sendHookResult(payload);
        break;
      case "IPyWidgets_msg" /* IPyWidgets_msg */:
        if (this.websocket && this.websocket.onmessage) {
          this.websocket.onmessage({
            target: this.websocket,
            data: payload.data,
            type: "",
          });
        }
        this.sendResponse(payload.id);
        break;
      case "IPyWidgets_binary_msg" /* IPyWidgets_binary_msg */:
        if (this.websocket && this.websocket.onmessage) {
          const deserialized = deserializeDataViews(payload.data)[0];
          this.websocket.onmessage({
            target: this.websocket,
            data: deserialized,
            type: "",
          });
        }
        this.sendResponse(payload.id);
        break;
      case "IPyWidgets_mirror_execute" /* IPyWidgets_mirror_execute */:
        this.handleMirrorExecute(payload);
        break;
      case "IPyWidgets_ExtensionOperationHandled" /* IPyWidgets_ExtensionOperationHandled */:
        this.extensionOperationFinished(payload);
        break;
      case "IPyWidgets_registerCommTarget" /* IPyWidgets_registerCommTarget */:
        this.realKernel.registerCommTarget(payload, noop);
        break;
      default:
        break;
    }
    return true;
  }
  registerMessageHook(msgId, hook) {
    const waitPromise = createDeferred();
    const key = this.generateExtensionResponseKey(
      msgId,
      "IPyWidgets_RegisterMessageHook" /* IPyWidgets_RegisterMessageHook */
        .toString(),
    );
    this.awaitingExtensionMessage.set(key, waitPromise);
    this.postOffice.sendMessage(
      "IPyWidgets_RegisterMessageHook" /* IPyWidgets_RegisterMessageHook */,
      msgId,
    );
    this.messageHooks.set(msgId, hook);
    this.realKernel.registerMessageHook(msgId, this.messageHook);
  }
  removeMessageHook(msgId, _hook) {
    const waitPromise = createDeferred();
    const key = this.generateExtensionResponseKey(
      msgId,
      "IPyWidgets_RemoveMessageHook" /* IPyWidgets_RemoveMessageHook */
        .toString(),
    );
    this.awaitingExtensionMessage.set(key, waitPromise);
    this.postOffice.sendMessage(
      "IPyWidgets_RemoveMessageHook" /* IPyWidgets_RemoveMessageHook */,
      {
        hookMsgId: msgId,
        lastHookedMsgId: this.lastHookedMessageId,
      },
    );
    this.messageHooks.delete(msgId);
    this.lastHookedMessageId = void 0;
    this.realKernel.removeMessageHook(msgId, this.messageHook);
  }
  // Called when the extension has finished an operation that we are waiting for in message processing
  extensionOperationFinished(payload) {
    const key = `${payload.id}${payload.type}`;
    const waitPromise = this.awaitingExtensionMessage.get(key);
    if (waitPromise) {
      waitPromise.resolve();
      this.awaitingExtensionMessage.delete(key);
    }
  }
  sendResponse(id) {
    this.postOffice.sendMessage(
      "IPyWidgets_msg_received" /* IPyWidgets_msg_received */,
      {
        id,
      },
    );
  }
  generateExtensionResponseKey(msgId, msgType) {
    return `${msgId}${msgType}`;
  }
  fakeOpenSocket() {
    const originalRequestKernelInfo = this.realKernel.requestKernelInfo.bind(
      this.realKernel,
    );
    this.realKernel.requestKernelInfo = () => {
      this.realKernel.requestKernelInfo = originalRequestKernelInfo;
      return Promise.resolve();
    };
    if (this.websocket) {
      this.websocket.onopen({ target: this.websocket });
    }
    this.realKernel.requestKernelInfo = originalRequestKernelInfo;
  }
  messageHookInterceptor(msg) {
    try {
      this.lastHookedMessageId = msg.header.msg_id;
      const hook = this.messageHooks.get(msg.parent_header.msg_id);
      if (hook) {
        const result = hook(msg);
        this.hookResults.set(msg.header.msg_id, result);
        if (result.then) {
          return result.then((r) => {
            return r;
          });
        }
        return result;
      }
    } catch (ex) {}
    return false;
  }
  sendHookResult(args) {
    const result = this.hookResults.get(args.msg.header.msg_id);
    if (result !== void 0) {
      this.hookResults.delete(args.msg.header.msg_id);
      if (result.then) {
        result.then((r) => {
          this.postOffice.sendMessage(
            "IPyWidgets_MessageHookResult" /* IPyWidgets_MessageHookResult */,
            {
              requestId: args.requestId,
              parentId: args.parentId,
              msgType: args.msg.header.msg_type,
              result: r,
            },
          );
        });
      } else {
        this.postOffice.sendMessage(
          "IPyWidgets_MessageHookResult" /* IPyWidgets_MessageHookResult */,
          {
            requestId: args.requestId,
            parentId: args.parentId,
            msgType: args.msg.header.msg_type,
            result: result === true,
          },
        );
      }
    } else {
      this.postOffice.sendMessage(
        "IPyWidgets_MessageHookResult" /* IPyWidgets_MessageHookResult */,
        {
          requestId: args.requestId,
          parentId: args.parentId,
          msgType: args.msg.header.msg_type,
          result: true,
        },
      );
    }
  }
  handleMirrorExecute(payload) {
    try {
      this.websocket.sendEnabled = false;
      this.realKernel.sendShellMessage(
        payload.msg,
        false,
        payload.msg.content.silent,
      );
    } finally {
      this.websocket.sendEnabled = true;
    }
    this.sendResponse(payload.id);
  }
  // When the real kernel handles iopub messages notify the Extension side and then forward on the message
  // Note, this message comes from the kernel after it is done handling the message async
  onIOPubMessage(_sender, message) {
    if (this.awaitingExtensionMessage.size <= 0) {
      this.finishIOPubMessage(message);
    } else {
      const extensionPromises = Array.from(
        this.awaitingExtensionMessage.values(),
      ).map((value) => {
        return value.promise;
      });
      Promise.all(extensionPromises)
        .then(() => {
          this.finishIOPubMessage(message);
        })
        .catch((ex) => {
          window.console.error("Failed to send iopub_msg_handled message", ex);
        });
    }
  }
  // Finish an iopub message by sending a message to the UI and then emitting that we are done with it
  finishIOPubMessage(message) {
    this.postOffice.sendMessage(
      "IPyWidgets_iopub_msg_handled" /* IPyWidgets_iopub_msg_handled */,
      {
        id: message.header.msg_id,
      },
    );
    this._ioPubMessageSignal.emit(message);
  }
};
function create(options, postOffice, pendingMessages) {
  const result = new ProxyKernel(options, postOffice);
  pendingMessages.forEach((m) => result.handleMessage(m.message, m.payload));
  return result;
}

// src/webviews/webview-side/ipywidgets/kernel/manager.ts
var _WidgetManager = class _WidgetManager {
  constructor(
    widgetContainer,
    postOffice,
    scriptLoader,
    JupyterLabWidgetManager,
    widgetState,
  ) {
    this.widgetContainer = widgetContainer;
    this.postOffice = postOffice;
    this.scriptLoader = scriptLoader;
    this.JupyterLabWidgetManager = JupyterLabWidgetManager;
    this.widgetState = widgetState;
    this.pendingMessages = [];
    /**
     * Contains promises related to model_ids that need to be displayed.
     * When we receive a message from the kernel of type = `display_data` for a widget (`application/vnd.jupyter.widget-view+json`),
     * then its time to display this.
     * We need to keep track of this. A boolean is sufficient, but we're using a promise so we can be notified when it is ready.
     *
     * @private
     * @memberof WidgetManager
     */
    this.modelIdsToBeDisplayed = /* @__PURE__ */ new Map();
    this.offlineModelIds = /* @__PURE__ */ new Set();
    this.postOffice.addHandler(this);
    this.postOffice.sendMessage("IPyWidgets_Ready" /* IPyWidgets_Ready */);
    setLogger((category, message) => {
      this.postOffice.sendMessage(
        "IPyWidgets_logMessage" /* IPyWidgets_logMessage */,
        {
          category,
          message,
        },
      );
      if (category === "error") {
        console.error(message);
      }
    });
    if (widgetState) {
      this.initializeKernelAndWidgetManager(
        {
          clientId: "",
          id: "",
          model: {
            id: "",
            name: "",
          },
          userName: "",
        },
        widgetState,
      );
    }
  }
  static get onDidChangeInstance() {
    return _WidgetManager._onDidChangeInstance.event;
  }
  dispose() {
    var _a;
    (_a = this.proxyKernel) == null ? void 0 : _a.dispose();
    this.postOffice.removeHandler(this);
    this.clear().catch(noop);
  }
  async clear() {
    var _a;
    await ((_a = this.manager) == null ? void 0 : _a.clear_state());
  }
  handleMessage(message, payload) {
    var _a, _b;
    if (message === "IPyWidgets_kernelOptions" /* IPyWidgets_kernelOptions */) {
      logMessage("Received IPyWidgetMessages.IPyWidgets_kernelOptions");
      this.initializeKernelAndWidgetManager(payload);
    } else if (
      message === "IPyWidgets_IsReadyRequest" /* IPyWidgets_IsReadyRequest */
    ) {
      logMessage("Received IPyWidgetMessages.IPyWidgets_IsReadyRequest");
      this.postOffice.sendMessage("IPyWidgets_Ready" /* IPyWidgets_Ready */);
    } else if (
      message === "IPyWidgets_onRestartKernel" /* IPyWidgets_onRestartKernel */
    ) {
      logMessage("Received IPyWidgetMessages.IPyWidgets_onRestartKernel");
      (_a = this.manager) == null ? void 0 : _a.dispose();
      this.manager = void 0;
      (_b = this.proxyKernel) == null ? void 0 : _b.dispose();
      this.proxyKernel = void 0;
      _WidgetManager.instance = void 0;
      _WidgetManager._onDidChangeInstance.fire(void 0);
    } else if (!this.proxyKernel) {
      logMessage(`Received some pending message ${message}`);
      this.pendingMessages.push({ message, payload });
    }
    return true;
  }
  /**
   * Restore widgets from kernel and saved state.
   * (for now loading state from kernel is not supported).
   */
  async restoreWidgets(notebook, options) {
    if (!notebook) {
      return;
    }
    if (!(options == null ? void 0 : options.loadNotebook)) {
      return;
    }
    if (!this.manager) {
      throw new Error("DS IPyWidgetManager not initialized.");
    }
    await this.manager.restoreWidgets(notebook, options);
    const state = notebook.metadata.get("widgets");
    const widgetState =
      state && state[WIDGET_STATE_MIMETYPE]
        ? state[WIDGET_STATE_MIMETYPE]
        : void 0;
    if (widgetState) {
      const deferred = createDeferred();
      deferred.resolve();
      Object.keys(widgetState.state).forEach((modelId) => {
        this.modelIdsToBeDisplayed.set(modelId, deferred);
        this.offlineModelIds.add(modelId);
      });
    }
  }
  /**
   * Renders a widget and returns a disposable (to remove the widget).
   *
   * @param {(nbformat.IMimeBundle & {model_id: string; version_major: number})} data
   * @param {HTMLElement} ele
   * @returns {Promise<{ dispose: Function }>}
   * @memberof WidgetManager
   */
  async renderWidget(data, ele) {
    if (!data) {
      throw new Error(
        "application/vnd.jupyter.widget-view+json not in msg.content.data, as msg.content.data is 'undefined'.",
      );
    }
    if (!this.manager) {
      throw new Error("DS IPyWidgetManager not initialized.");
    }
    if (!data || data.version_major !== 2) {
      console.warn("Widget data not available to render an ipywidget");
      return void 0;
    }
    const modelId = data.model_id;
    if (!this.modelIdsToBeDisplayed.has(modelId)) {
      this.modelIdsToBeDisplayed.set(modelId, createDeferred());
    }
    logMessage(
      `Waiting for model to be available before rendering it ${data.model_id}`,
    );
    await this.modelIdsToBeDisplayed.get(modelId).promise;
    const modelPromise = this.manager.get_model(data.model_id);
    if (!modelPromise) {
      console.warn("Widget model not available to render an ipywidget");
      return void 0;
    }
    const model = await modelPromise;
    if (this.widgetState && this.offlineModelIds.has(modelId)) {
      model.comm_live = false;
    }
    const view = await this.manager.create_view(model, { el: ele });
    if (this.widgetState) {
      view.initialize({ model, el: ele, options: {} });
    }
    return this.manager.display_view(data, view, { node: ele });
  }
  initializeKernelAndWidgetManager(options, widgetState) {
    var _a, _b;
    if (
      this.manager &&
      this.proxyKernel &&
      (0, import_fast_deep_equal.default)(options, this.options)
    ) {
      return;
    }
    this.options = options;
    (_a = this.proxyKernel) == null ? void 0 : _a.dispose();
    this.proxyKernel = create(options, this.postOffice, this.pendingMessages);
    this.pendingMessages = [];
    (_b = this.manager) == null ? void 0 : _b.dispose();
    try {
      this.manager = new this.JupyterLabWidgetManager(
        this.proxyKernel,
        this.widgetContainer,
        this.scriptLoader,
        logMessage,
        widgetState,
      );
      this.proxyKernel.iopubMessage.connect(
        this.handleDisplayDataMessage.bind(this),
      );
      this.manager.onUnhandledIOPubMessage.connect(
        this.handleUnhandledIOPubMessage.bind(this),
      );
      _WidgetManager.instance = this;
      _WidgetManager._onDidChangeInstance.fire(this);
    } catch (ex) {
      console.error("Failed to initialize WidgetManager", ex);
    }
  }
  /**
   * Ensure we create the model for the display data.
   */
  handleDisplayDataMessage(_sender, payload) {
    const jupyterLab = require_lib3();
    if (
      !jupyterLab.KernelMessage.isDisplayDataMsg(payload) &&
      !jupyterLab.KernelMessage.isExecuteResultMsg(payload)
    ) {
      return;
    }
    const displayMsg = payload;
    if (
      displayMsg.content &&
      displayMsg.content.data &&
      displayMsg.content.data[WIDGET_MIMETYPE]
    ) {
      const data = displayMsg.content.data[WIDGET_MIMETYPE];
      const modelId = data.model_id;
      logMessage(`Received display data message ${modelId}`);
      let deferred = this.modelIdsToBeDisplayed.get(modelId);
      if (!deferred) {
        deferred = createDeferred();
        this.modelIdsToBeDisplayed.set(modelId, deferred);
      }
      if (!this.manager) {
        throw new Error("DS IPyWidgetManager not initialized");
      }
      const modelPromise = this.manager.get_model(data.model_id);
      if (modelPromise) {
        modelPromise
          .then((_m) => (deferred == null ? void 0 : deferred.resolve()))
          .catch((e) => (deferred == null ? void 0 : deferred.reject(e)));
      } else {
        deferred.resolve();
      }
    }
  }
  handleUnhandledIOPubMessage(_manager, msg) {
    this.postOffice.sendMessage(
      "ipywidget_unhandled_kernel_message" /* IPyWidgetUnhandledKernelMessage */,
      msg,
    );
  }
};
_WidgetManager._onDidChangeInstance = new EventEmitter();
var WidgetManager = _WidgetManager;

// src/webviews/webview-side/ipywidgets/kernel/scriptManager.ts
init_process_development();
var import_fast_deep_equal2 = __toESM(require_fast_deep_equal());
var import_events = __toESM(require_events());

// src/webviews/webview-side/ipywidgets/kernel/helper.ts
init_process_development();
var unpgkUrl = "https://unpkg.com/";
var jsdelivrUrl = "https://cdn.jsdelivr.net/npm/requirejs@2.3.6/bin/r.min.js";
var networkAccessTimeoutMs = 1e3;
var isOnlineOnceBefore = false;
async function isCDNReachable() {
  if (isOnlineOnceBefore) {
    return true;
  }
  const abort = new AbortController();
  let timeout;
  const promise = new Promise((resolve) => {
    timeout = setTimeout(() => {
      resolve(false);
      abort.abort();
    }, networkAccessTimeoutMs);
  });
  promise.catch(() => {});
  try {
    isOnlineOnceBefore = await Promise.race([
      isWebSiteReachable(unpgkUrl, abort.signal),
      isWebSiteReachable(jsdelivrUrl, abort.signal),
      promise,
    ]);
    return isOnlineOnceBefore;
  } finally {
    if (timeout) {
      clearInterval(timeout);
    }
  }
}
async function isWebSiteReachable(url, signal) {
  let retries = 1;
  try {
    for (retries = 0; retries <= 5; retries++) {
      const response = await fetch(url, { signal });
      if (response.ok) {
        return true;
      }
    }
    return false;
  } catch (ex) {
    logErrorMessage(
      `Failed to access CDN ${url} after ${retries} attempt(s), ${(ex || "").toString()}`,
    );
    return false;
  }
}

// src/platform/common/utils/lifecycle.ts
init_process_development();

// src/platform/common/utils/functional.ts
init_process_development();

// src/platform/common/utils/iterable.ts
init_process_development();
var Iterable;
((Iterable2) => {
  function is(thing) {
    return (
      thing &&
      typeof thing === "object" &&
      typeof thing[Symbol.iterator] === "function"
    );
  }
  Iterable2.is = is;
  const _empty = Object.freeze([]);
  function empty() {
    return _empty;
  }
  Iterable2.empty = empty;
  function* single(element) {
    yield element;
  }
  Iterable2.single = single;
  function wrap(iterableOrElement) {
    if (is(iterableOrElement)) {
      return iterableOrElement;
    } else {
      return single(iterableOrElement);
    }
  }
  Iterable2.wrap = wrap;
  function from(iterable) {
    return iterable || _empty;
  }
  Iterable2.from = from;
  function isEmpty(iterable) {
    return !iterable || iterable[Symbol.iterator]().next().done === true;
  }
  Iterable2.isEmpty = isEmpty;
  function first(iterable) {
    return iterable[Symbol.iterator]().next().value;
  }
  Iterable2.first = first;
  function some(iterable, predicate) {
    for (const element of iterable) {
      if (predicate(element)) {
        return true;
      }
    }
    return false;
  }
  Iterable2.some = some;
  function find(iterable, predicate) {
    for (const element of iterable) {
      if (predicate(element)) {
        return element;
      }
    }
    return void 0;
  }
  Iterable2.find = find;
  function* filter(iterable, predicate) {
    for (const element of iterable) {
      if (predicate(element)) {
        yield element;
      }
    }
  }
  Iterable2.filter = filter;
  function* map(iterable, fn) {
    let index = 0;
    for (const element of iterable) {
      yield fn(element, index++);
    }
  }
  Iterable2.map = map;
  function* concat(...iterables) {
    for (const iterable of iterables) {
      for (const element of iterable) {
        yield element;
      }
    }
  }
  Iterable2.concat = concat;
  function reduce(iterable, reducer, initialValue) {
    let value = initialValue;
    for (const element of iterable) {
      value = reducer(value, element);
    }
    return value;
  }
  Iterable2.reduce = reduce;
  function* slice(arr, from2, to = arr.length) {
    if (from2 < 0) {
      from2 += arr.length;
    }
    if (to < 0) {
      to += arr.length;
    } else if (to > arr.length) {
      to = arr.length;
    }
    for (; from2 < to; from2++) {
      yield arr[from2];
    }
  }
  Iterable2.slice = slice;
  function consume(iterable, atMost = Number.POSITIVE_INFINITY) {
    const consumed = [];
    if (atMost === 0) {
      return [consumed, iterable];
    }
    const iterator = iterable[Symbol.iterator]();
    for (let i = 0; i < atMost; i++) {
      const next = iterator.next();
      if (next.done) {
        return [consumed, Iterable2.empty()];
      }
      consumed.push(next.value);
    }
    return [
      consumed,
      {
        [Symbol.iterator]() {
          return iterator;
        },
      },
    ];
  }
  Iterable2.consume = consume;
})(Iterable || (Iterable = {}));

// src/platform/common/utils/lifecycle.ts
var disposableTracker = void 0;
function trackDisposable(x) {
  disposableTracker == null ? void 0 : disposableTracker.push(x);
  return x;
}
function dispose(arg) {
  if (Iterable.is(arg)) {
    for (const d of arg) {
      if (d) {
        try {
          d.dispose();
        } catch (e) {
          console.warn(`dispose() failed for ${d}`, e);
        }
      }
    }
    return Array.isArray(arg) ? [] : arg;
  } else if (arg) {
    arg.dispose();
    return arg;
  }
}
var _DisposableStore = class _DisposableStore {
  constructor(...disposables) {
    this._toDispose = /* @__PURE__ */ new Set();
    this._isDisposed = false;
    disposables.forEach((disposable) => this.add(disposable));
    trackDisposable(this);
  }
  /**
   * Dispose of all registered disposables and mark this object as disposed.
   *
   * Any future disposables added to this object will be disposed of on `add`.
   */
  dispose() {
    if (this._isDisposed) {
      return;
    }
    this._isDisposed = true;
    this.clear();
  }
  /**
   * @return `true` if this object has been disposed of.
   */
  get isDisposed() {
    return this._isDisposed;
  }
  /**
   * Dispose of all registered disposables but do not mark this object as disposed.
   */
  clear() {
    if (this._toDispose.size === 0) {
      return;
    }
    try {
      dispose(this._toDispose);
    } finally {
      this._toDispose.clear();
    }
  }
  /**
   * Add a new {@link IDisposable disposable} to the collection.
   */
  add(o) {
    if (!o) {
      return o;
    }
    if (o === this) {
      throw new Error("Cannot register a disposable on itself!");
    }
    if (this._isDisposed) {
      if (!_DisposableStore.DISABLE_DISPOSED_WARNING) {
        console.warn(
          new Error(
            "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!",
          ).stack,
        );
      }
    } else {
      this._toDispose.add(o);
    }
    return o;
  }
};
_DisposableStore.DISABLE_DISPOSED_WARNING = false;
var DisposableStore = _DisposableStore;
var DisposableMap = class {
  constructor() {
    this._store = /* @__PURE__ */ new Map();
    this._isDisposed = false;
  }
  /**
   * Disposes of all stored values and mark this object as disposed.
   *
   * Trying to use this object after it has been disposed of is an error.
   */
  dispose() {
    this._isDisposed = true;
    this.clearAndDisposeAll();
  }
  /**
   * Disposes of all stored values and clear the map, but DO NOT mark this object as disposed.
   */
  clearAndDisposeAll() {
    if (!this._store.size) {
      return;
    }
    try {
      dispose(this._store.values());
    } finally {
      this._store.clear();
    }
  }
  has(key) {
    return this._store.has(key);
  }
  get(key) {
    return this._store.get(key);
  }
  set(key, value, skipDisposeOnOverwrite = false) {
    var _a;
    if (this._isDisposed) {
      console.warn(
        new Error(
          "Trying to add a disposable to a DisposableMap that has already been disposed of. The added object will be leaked!",
        ).stack,
      );
    }
    if (!skipDisposeOnOverwrite) {
      (_a = this._store.get(key)) == null ? void 0 : _a.dispose();
    }
    this._store.set(key, value);
  }
  /**
   * Delete the value stored for `key` from this map and also dispose of it.
   */
  deleteAndDispose(key) {
    var _a;
    (_a = this._store.get(key)) == null ? void 0 : _a.dispose();
    this._store.delete(key);
  }
  [Symbol.iterator]() {
    return this._store[Symbol.iterator]();
  }
};

// src/webviews/webview-side/ipywidgets/kernel/incompatibleWidgetHandler.ts
init_process_development();
var semver = __toESM(require_semver());
var supportedVersionOfQgrid = "1.1.1";
var qgridModuleName = "qgrid";
function warnAboutWidgetVersionsThatAreNotSupported(
  widgetSource,
  moduleVersion,
  cdnSupported,
  errorDispatcher,
) {
  if (widgetSource.source === "cdn" || !cdnSupported) {
    return false;
  }
  if (widgetSource.moduleName !== qgridModuleName) {
    return false;
  }
  try {
    if (
      !moduleVersion.startsWith("^") &&
      semver.compare(moduleVersion, supportedVersionOfQgrid) <= 0
    ) {
      return false;
    }
    if (
      moduleVersion.startsWith("^") &&
      semver.satisfies(supportedVersionOfQgrid, moduleVersion)
    ) {
      return false;
    }
  } catch (e) {
    return false;
  }
  errorDispatcher({ moduleName: widgetSource.moduleName, moduleVersion });
}

// src/webviews/webview-side/ipywidgets/kernel/requirejsRegistry.ts
init_process_development();
var scriptsAlreadyRegisteredInRequireJs = /* @__PURE__ */ new Map();
function getScriptsToBeRegistered(scripts) {
  return scripts.filter((script) => {
    if (
      scriptsAlreadyRegisteredInRequireJs.has(script.moduleName) &&
      scriptsAlreadyRegisteredInRequireJs.get(script.moduleName) ===
        script.scriptUri
    ) {
      return false;
    }
    return true;
  });
}
function getScriptsWithAValidScriptUriToBeRegistered(scripts) {
  return scripts
    .filter((source) => {
      if (source.scriptUri) {
        logMessage(
          `Source for IPyWidget ${source.moduleName} found in ${source.source} @ ${source.scriptUri}.`,
        );
        return true;
      } else {
        console.error(`Source for IPyWidget ${source.moduleName} not found.`);
        return false;
      }
    })
    .map((source) => source);
}
function getRequireJs() {
  const requireJsFunc = window.requirejs;
  if (!requireJsFunc) {
    window.console.error("Requirejs not found");
    throw new Error("Requirejs not found");
  }
  return requireJsFunc;
}
function registerScriptsInRequireJs(baseUrl, scripts) {
  const requireJsFunc = getRequireJs();
  const config = {
    paths: {},
  };
  if (baseUrl) {
    config.baseUrl = baseUrl;
  }
  registerCustomScripts();
  scripts.forEach((script) => {
    logMessage(
      `Registering IPyWidget ${script.moduleName} found in ${script.scriptUri}.`,
    );
    scriptsAlreadyRegisteredInRequireJs.set(
      script.moduleName,
      script.scriptUri,
    );
    const scriptUri = script.scriptUri.toLowerCase().endsWith(".js")
      ? script.scriptUri.substring(0, script.scriptUri.length - 3)
      : script.scriptUri;
    config.paths[script.moduleName] = scriptUri;
  });
  requireJsFunc.config(config);
}
function undefineModule(moduleName) {
  scriptsAlreadyRegisteredInRequireJs.delete(moduleName);
  getRequireJs().undef(moduleName);
}
function registerScripts(baseUrl, scripts) {
  const scriptsToRegister = getScriptsToBeRegistered(scripts);
  const validScriptsToRegister =
    getScriptsWithAValidScriptUriToBeRegistered(scriptsToRegister);
  registerScriptsInRequireJs(baseUrl, validScriptsToRegister);
}
function registerCustomScripts() {
  if (registerCustomScripts.invoked) {
    return;
  }
  registerCustomScripts.invoked = true;
  getRequireJs().config({
    map: {
      "*": {
        "jupyter-js-widgets": "@jupyter-widgets/base",
      },
    },
  });
}

// src/webviews/webview-side/ipywidgets/kernel/scriptManager.ts
var ScriptManager = class extends import_events.EventEmitter {
  // List of widgets that must always be loaded using requirejs instead of using a CDN or the like.
  constructor(postOffice, cdnIsReachable = isCDNReachable()) {
    super();
    this.postOffice = postOffice;
    this.widgetsRegisteredInRequireJs = /* @__PURE__ */ new Set();
    this.disposables = [];
    this.widgetSourceRequests = /* @__PURE__ */ new Map();
    this.registeredWidgetSources = /* @__PURE__ */ new Map();
    this.widgetModulesFailedToLoad = /* @__PURE__ */ new Set();
    this.isOnline = createDeferred();
    this.widgetsCanLoadFromCDN = false;
    // Total time to wait for a script to load. This includes ipywidgets making a request to extension for a Uri of a widget,
    // then extension replying back with the Uri (max 5 seconds round trip time).
    // If expires, then Widget downloader will attempt to download with what ever information it has (potentially failing).
    // Note, we might have a message displayed at the user end (asking for consent to use CDN).
    // Hence use 60 seconds.
    this.timeoutWaitingForScriptToLoad = 6e4;
    this.isOnline.promise.catch(noop);
    cdnIsReachable
      .then((isOnline) => {
        this.isOnline.resolve(isOnline);
        this.postOffice.sendMessage(
          "IPyWidgets_IsOnline" /* IPyWidgets_IsOnline */,
          {
            isOnline,
          },
        );
      })
      .catch((ex) =>
        logErrorMessage(`Failed to check if online ${ex.toString()}`),
      );
    postOffice.addHandler({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleMessage: (type, payload) => {
        if (type === "update_settings" /* UpdateSettings */) {
          const settings = JSON.parse(payload);
          this.widgetsCanLoadFromCDN = settings.widgetScriptSources.length > 0;
        } else if (
          type ===
          "IPyWidgets_WidgetScriptSource_Response" /* IPyWidgets_WidgetScriptSourceResponse */
        ) {
          this.registerScriptSourceInRequirejs(payload);
        } else if (
          type ===
          "IPyWidgets_AttemptToDownloadFailedWidgetsAgain" /* IPyWidgets_AttemptToDownloadFailedWidgetsAgain */
        ) {
          Array.from(this.widgetModulesFailedToLoad.values()).forEach(
            (moduleName) => {
              this.clearWidgetModuleScriptSource(moduleName);
            },
          );
          this.widgetModulesFailedToLoad.clear();
        } else if (
          type ===
          "IPyWidgets_BaseUrl_Response" /* IPyWidgets_BaseUrlResponse */
        ) {
          const baseUrl = payload;
          if (baseUrl) {
            this.baseUrl = baseUrl;
            document.body.dataset.baseUrl = baseUrl.endsWith("/")
              ? baseUrl
              : `${baseUrl}/`;
            logMessage(`data-base-url set to ${baseUrl}`);
          }
        } else if (
          type === "IPyWidgets_kernelOptions" /* IPyWidgets_kernelOptions */
        ) {
          logMessage(`Received IPyWidgets_kernelOptions in ScriptManager`);
          if (
            this.previousKernelOptions &&
            !(0, import_fast_deep_equal2.default)(
              this.previousKernelOptions,
              payload,
            )
          ) {
            logMessage(
              `Received IPyWidgets_kernelOptions in ScriptManager with new kernel options`,
            );
            this.previousKernelOptions = payload;
            this.clear();
          }
        } else if (
          type === "IPyWidgets_onKernelChanged" /* IPyWidgets_onKernelChanged */
        ) {
          logMessage(`Received IPyWidgets_onKernelChanged in ScriptManager`);
          this.clear();
        }
        return true;
      },
    });
  }
  dispose() {
    dispose(this.disposables);
  }
  getScriptLoader() {
    return {
      widgetsRegisteredInRequireJs: this.widgetsRegisteredInRequireJs,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorHandler: (className, moduleName, moduleVersion, error) =>
        this.handleLoadError(className, moduleName, moduleVersion, error).catch(
          () => {},
        ),
      loadWidgetScript: (moduleName, moduleVersion) =>
        this.loadWidgetScript(moduleName, moduleVersion),
      successHandler: (className, moduleName, moduleVersion) =>
        this.handleLoadSuccess(className, moduleName, moduleVersion),
    };
  }
  onWidgetLoadSuccess(listener) {
    return this.on("onWidgetLoadSuccess", listener);
  }
  onWidgetLoadError(listener) {
    return this.on("onWidgetLoadError", listener);
  }
  onWidgetVersionNotSupported(listener) {
    return this.on("onWidgetVersionNotSupported", listener);
  }
  /**
   * Method called by ipywidgets to get the source for a widget.
   * When we get a source for the widget, we register it in requriejs.
   * We need to check if it is available on CDN, if not then fallback to local FS.
   * Or check local FS then fall back to CDN (depending on the order defined by the user).
   */
  async loadWidgetScript(moduleName, moduleVersion) {
    logMessage(`Fetch IPyWidget source for ${moduleName}`);
    const isOnline = await this.isOnline.promise;
    let request = this.widgetSourceRequests.get(moduleName);
    const requestId = `${moduleName}:${moduleVersion}:${Date.now().toString()}`;
    if (
      isOnline &&
      request &&
      !request.explicitlyRequested &&
      request.source !== "cdn"
    ) {
      request = void 0;
    }
    if (!request) {
      request = {
        deferred: createDeferred(),
        timer: void 0,
        explicitlyRequested: true,
        requestId,
      };
      const timeoutTime = this.timedoutWaitingForWidgetsToGetLoaded
        ? 5e3
        : this.timeoutWaitingForScriptToLoad;
      request.timer = setTimeout(() => {
        if (request && !request.deferred.resolved) {
          console.error(
            `Timeout waiting to get widget source for ${moduleName}, ${moduleVersion}`,
          );
          this.handleLoadError(
            "<class>",
            moduleName,
            moduleVersion,
            new Error(
              `Timeout getting source for ${moduleName}:${moduleVersion}`,
            ),
            true,
          ).catch(() => {});
          request.deferred.resolve();
          this.timedoutWaitingForWidgetsToGetLoaded = true;
        }
      }, timeoutTime);
      this.disposables.push({
        dispose() {
          try {
            if (request == null ? void 0 : request.timer) {
              clearTimeout(request.timer);
            }
          } catch (e) {}
        },
      });
      this.widgetSourceRequests.set(moduleName, request);
    }
    this.postOffice.sendMessage(
      "IPyWidgets_WidgetScriptSourceRequest" /* IPyWidgets_WidgetScriptSourceRequest */,
      {
        moduleName,
        moduleVersion,
        requestId,
      },
    );
    try {
      await request.deferred.promise;
      const widgetSource = this.registeredWidgetSources.get(moduleName);
      if (widgetSource) {
        warnAboutWidgetVersionsThatAreNotSupported(
          widgetSource,
          moduleVersion,
          this.widgetsCanLoadFromCDN,
          (info) =>
            this.emit("onWidgetVersionNotSupported", {
              moduleName: info.moduleName,
              moduleVersion: info.moduleVersion,
            }),
        );
      }
    } catch (ex) {
      console.error(
        `Failed to load Widget Script from Extension for ${moduleName}, ${moduleVersion}`,
        ex,
      );
    }
  }
  handleLoadSuccess(className, moduleName, moduleVersion) {
    this.emit("onWidgetLoadSuccess", { className, moduleName, moduleVersion });
  }
  clearWidgetModuleScriptSource(moduleName) {
    this.widgetSourceRequests.delete(moduleName);
    this.registeredWidgetSources.delete(moduleName);
    this.widgetsRegisteredInRequireJs.delete(moduleName);
    undefineModule(moduleName);
  }
  /**
   * E.g. when we have restarted a kernel.
   * If user changed the kernel, then some widgets might exist now and some might now.
   */
  clear() {
    this.widgetSourceRequests.clear();
    this.registeredWidgetSources.clear();
  }
  /**
   * Given a list of the widgets along with the sources, we will need to register them with requirejs.
   * IPyWidgets uses requirejs to dynamically load modules.
   * (https://requirejs.org/docs/api.html)
   * All we're doing here is given a widget (module) name, we register the path where the widget (module) can be loaded from.
   * E.g.
   * requirejs.config({ paths:{
   *  'widget_xyz': '<Url of script without trailing .js>'
   * }});
   */
  registerScriptSourcesInRequirejs(sources) {
    logMessage(`Received IPyWidget scripts ${JSON.stringify(sources || [])}`);
    if (!Array.isArray(sources) || sources.length === 0) {
      return;
    }
    sources.forEach((source) => {
      const currentRegistration = this.registeredWidgetSources.get(
        source.moduleName,
      );
      if (
        !currentRegistration ||
        (currentRegistration.source && currentRegistration.source !== "cdn")
      ) {
        registerScripts(this.baseUrl, [source]);
        this.registeredWidgetSources.set(source.moduleName, source);
        this.widgetsRegisteredInRequireJs.add(source.moduleName);
      }
      let request = this.widgetSourceRequests.get(source.moduleName);
      if (!request) {
        request = {
          deferred: createDeferred(),
          timer: void 0,
          source: source.source,
          requestId: source.requestId || "",
          explicitlyRequested: false,
        };
        this.widgetSourceRequests.set(source.moduleName, request);
      }
      if (source.requestId && source.requestId === request.requestId) {
        request.source = source.source;
        request.deferred.resolve();
      } else if (!source.requestId) {
        request.source = source.source;
        request.deferred.resolve();
      }
      if (request.deferred.completed && request.timer !== void 0) {
        clearTimeout(request.timer);
      }
    });
  }
  registerScriptSourceInRequirejs(source) {
    if (!source) {
      logMessage("No widget script source");
      return;
    }
    this.registerScriptSourcesInRequirejs([source]);
  }
  async handleLoadError(
    className,
    moduleName,
    moduleVersion,
    error,
    timedout = false,
  ) {
    this.widgetModulesFailedToLoad.add(moduleName);
    const isOnline = await isCDNReachable();
    this.emit("onWidgetLoadError", {
      className,
      moduleName,
      moduleVersion,
      error,
      timedout,
      isOnline,
    });
  }
};

// src/webviews/webview-side/ipywidgets/kernel/index.ts
var WidgetManagerComponent = class {
  constructor(postOffice, JupyterLabWidgetManager, widgetState) {
    this.postOffice = postOffice;
    this.scriptManager = new ScriptManager(postOffice);
    this.scriptManager.onWidgetLoadError(this.handleLoadError.bind(this));
    this.scriptManager.onWidgetLoadSuccess(this.handleLoadSuccess.bind(this));
    this.scriptManager.onWidgetVersionNotSupported(
      this.handleUnsupportedWidgetVersion.bind(this),
    );
    this.widgetManager = new WidgetManager(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      void 0,
      postOffice,
      this.scriptManager.getScriptLoader(),
      JupyterLabWidgetManager,
      widgetState,
    );
    postOffice.addHandler({
      handleMessage: (_type, _payload) => {
        return true;
      },
    });
  }
  dispose() {
    this.widgetManager.dispose();
  }
  async handleLoadError(data) {
    this.postOffice.sendMessage(
      "ipywidget_load_failure" /* IPyWidgetLoadFailure */,
      {
        className: data.className,
        moduleName: data.moduleName,
        moduleVersion: data.moduleVersion,
        isOnline: data.isOnline,
        timedout: data.timedout,
        error: JSON.stringify(data.error),
      },
    );
    console.error(
      `Failed to to Widget load class ${data.moduleName}${data.className}`,
      data,
    );
  }
  handleUnsupportedWidgetVersion(data) {
    this.postOffice.sendMessage(
      "ipywidget_widget_version_not_supported" /* IPyWidgetWidgetVersionNotSupported */,
      {
        moduleName: data.moduleName,
        moduleVersion: data.moduleVersion,
      },
    );
  }
  handleLoadSuccess(data) {
    this.postOffice.sendMessage(
      "ipywidget_load_success" /* IPyWidgetLoadSuccess */,
      {
        className: data.className,
        moduleName: data.moduleName,
        moduleVersion: data.moduleVersion,
      },
    );
  }
};
var outputDisposables = /* @__PURE__ */ new Map();
var renderedWidgets = /* @__PURE__ */ new Map();
var stackOfWidgetsRenderStatusByOutputId = [];
async function renderOutput(outputItem, model, element, logger) {
  try {
    stackOfWidgetsRenderStatusByOutputId.push({
      outputId: outputItem.id,
      container: element,
    });
    renderIPyWidget(outputItem.id, model, element, logger);
  } catch (ex) {
    logger(
      `Error: render output ${outputItem.id} failed ${ex.toString()}`,
      "error",
    );
    throw ex;
  }
}
function disposeOutput(outputId) {
  if (outputId) {
    stackOfWidgetsRenderStatusByOutputId =
      stackOfWidgetsRenderStatusByOutputId.filter(
        (item) => !(outputId in item),
      );
  }
}
function renderIPyWidget(outputId, model, container, logger) {
  var _a, _b, _c, _d;
  logger(
    `Rendering IPyWidget ${outputId} with model ${model.model_id} in ${container.id}`,
  );
  if (
    renderedWidgets.has(outputId) &&
    ((_a = renderedWidgets.get(outputId)) == null ? void 0 : _a.container) ===
      container &&
    ((_b = renderedWidgets.get(outputId)) == null ? void 0 : _b.modelId) ===
      model.model_id
  ) {
    return logger("already rendering");
  }
  let timeout = 0;
  if (renderedWidgets.has(outputId)) {
    timeout = 100;
    logger(
      "Widget was already rendering for another container, dispose that widget so we can re-render it",
    );
    try {
      (_d =
        (_c = renderedWidgets.get(outputId)) == null ? void 0 : _c.widget) ==
      null
        ? void 0
        : _d.dispose();
    } catch (e) {}
  }
  if (container.firstChild) {
    try {
      container.removeChild(container.firstChild);
    } catch (e) {}
  }
  new Promise((resolve) => setTimeout(resolve, timeout))
    .then(() => {
      const output = document.createElement("div");
      output.className = "cell-output cell-output";
      if (typeof model._vsc_test_cellIndex === "number") {
        container.className += ` vsc-test-cell-index-${model._vsc_test_cellIndex}`;
      }
      const ele = document.createElement("div");
      ele.className = "cell-output-ipywidget-background";
      container.appendChild(ele);
      ele.appendChild(output);
      renderedWidgets.set(outputId, { container, modelId: model.model_id });
      createWidgetView(model, ele)
        .then((w) => {
          var _a2;
          if (
            ((_a2 = renderedWidgets.get(outputId)) == null
              ? void 0
              : _a2.container) !== container
          ) {
            logger("Widget container changed, hence disposing the widget");
            w == null ? void 0 : w.dispose();
            return;
          }
          if (renderedWidgets.has(outputId)) {
            renderedWidgets.get(outputId).widget = w;
          }
          const disposable = {
            dispose: () => {
              renderedWidgets.delete(outputId);
              w == null ? void 0 : w.dispose();
            },
          };
          outputDisposables.set(outputId, disposable);
          const statusInfo = stackOfWidgetsRenderStatusByOutputId.find(
            (item) => item.outputId === outputId,
          );
          if (statusInfo) {
            statusInfo.success = true;
          }
        })
        .catch((ex) => {
          logger(
            `Error: Failed to render ${outputId}, ${ex.toString()}`,
            "error",
          );
        });
    })
    .catch((ex) => {
      logger(`Error: Failed to render ${outputId}, ${ex.toString()}`, "error");
    });
}
var widgetManagerPromise;
async function getWidgetManager() {
  if (!widgetManagerPromise) {
    let reInitializeWidgetManager2 = function (resolve) {
      function initializeInstance() {
        const wm = WidgetManager.instance;
        if (wm) {
          const oldDispose = wm.dispose.bind(wm);
          wm.dispose = () => {
            widgetManagerPromise = void 0;
            return oldDispose();
          };
          if (resolve) {
            resolve(wm);
            resolve = void 0;
          }
          widgetManagerPromise = Promise.resolve(wm);
        }
      }
      initializeInstance();
      WidgetManager.onDidChangeInstance(initializeInstance);
    };
    var reInitializeWidgetManager = reInitializeWidgetManager2;
    widgetManagerPromise = new Promise((resolve) =>
      reInitializeWidgetManager2(resolve),
    );
  }
  return widgetManagerPromise;
}
async function createWidgetView(widgetData, element) {
  try {
    const wm = await getWidgetManager();
    return await (wm == null ? void 0 : wm.renderWidget(widgetData, element));
  } catch (ex) {
    logErrorMessage(
      `Error: Failed to render widget ${widgetData.model_id}, ${ex.toString()}`,
    );
  }
}
async function restoreWidgets(widgetState) {
  await new Promise((resolve) => {
    const tryAgain = () => {
      if (window.vscIPyWidgets) {
        return resolve();
      }
      setTimeout(tryAgain, 1e3);
    };
    setTimeout(tryAgain, 1e3);
  });
  try {
    initializeWidgetManager(widgetState);
    const wm = await getWidgetManager();
    const model = {
      metadata: {
        get: (_) => {
          return widgetState;
        },
      },
    };
    return await (wm == null
      ? void 0
      : wm.restoreWidgets(model, { loadKernel: false, loadNotebook: true }));
  } catch (ex) {
    logErrorMessage(
      `Error: Failed to render widget state ${widgetState}, ${ex.toString()}`,
    );
  }
}
var initialized = false;
function initialize(JupyterLabWidgetManager, context, widgetState) {
  if (initialized) {
    logErrorMessage(`Error: WidgetManager already initialized`);
    return;
  }
  try {
    const postOffice = new PostOffice(context);
    const mgr = new WidgetManagerComponent(
      postOffice,
      JupyterLabWidgetManager,
      widgetState,
    );
    window._mgr = mgr;
    initialized = true;
  } catch (ex) {
    logErrorMessage(
      `Error: Exception initializing WidgetManager, ${ex.toString()}`,
    );
  }
}
var capturedContext;
window.ipywidgetsKernel = {
  renderOutput,
  disposeOutput,
  restoreWidgets,
  initialize: () => {
    requestWidgetVersion(capturedContext);
  },
};
function requestWidgetVersion(context) {
  context.postKernelMessage({
    type: "IPyWidgets_Request_Widget_Version" /* IPyWidgets_Request_Widget_Version */,
  });
}
function initializeWidgetManager(widgetState) {
  logMessage("IPyWidget kernel initializing...");
  const JupyterLabWidgetManager = window.vscIPyWidgets.WidgetManager;
  if (!JupyterLabWidgetManager) {
    throw new Error(
      "JupyterLabWidgetManager not defined. Please include/check ipywidgets.js file",
    );
  }
  initialize(JupyterLabWidgetManager, capturedContext, widgetState);
}
var ipyWidgetVersionResponseHandled = false;
function activate(context) {
  capturedContext = context;
  hookWindowFunctions(context);
  logMessage(
    `Attempt Initialize IpyWidgets kernel.js : ${JSON.stringify(context)}`,
  );
  context.onDidReceiveKernelMessage(async (e) => {
    if (
      typeof e === "object" &&
      e &&
      "type" in e &&
      e.type ===
        "IPyWidgets_Reply_Widget_Version" /* IPyWidgets_Reply_Widget_Version */ &&
      "payload" in e &&
      typeof e.payload === "number"
    ) {
      if (ipyWidgetVersionResponseHandled) {
        return;
      }
      ipyWidgetVersionResponseHandled = true;
      try {
        const version = e.payload;
        logMessage(`Loading IPyWidget Version ${version}`);
        const widgets7Promise = new Promise((resolve) => {
          const checkIfLoaded = () => {
            if (window.vscIPyWidgets7) {
              return resolve();
            }
            setTimeout(checkIfLoaded, 500);
          };
          setTimeout(checkIfLoaded, 500);
        });
        const widgets8Promise = new Promise((resolve) => {
          const checkIfLoaded = () => {
            if (window.vscIPyWidgets8) {
              return resolve();
            }
            setTimeout(checkIfLoaded, 500);
          };
          setTimeout(checkIfLoaded, 500);
        });
        await Promise.all([widgets7Promise, widgets8Promise]);
        const unloadWidgets8 = () => {
          try {
            window.vscIPyWidgets8.unload();
          } catch (e2) {}
        };
        const unloadWidgets7 = () => {
          try {
            window.vscIPyWidgets7.unload();
          } catch (e2) {}
        };
        if (version === 7) {
          unloadWidgets8();
          window.vscIPyWidgets7.load();
          logMessage("Loaded IPYWidgets 7.x from Kernel");
        } else if (version === 8) {
          unloadWidgets7();
          window.vscIPyWidgets8.load();
          logMessage("Loaded IPYWidgets 8.x from Kernel");
        }
        initializeWidgetManager();
      } catch (ex) {
        logErrorMessage(`Failed to load IPyWidget Version ${e.payload}, ${ex}`);
      }
    }
  });
  requestWidgetVersion(context);
}
function hookWindowFunctions(context) {
  if (context.postKernelMessage) {
    window.alert = (message) => {
      var _a;
      console.log("window.alert", message);
      (_a = context.postKernelMessage) == null
        ? void 0
        : _a.call(context, {
            type: "IPyWidgets_Window_Alert" /* IPyWidgets_Window_Alert */,
            message: message.toString(),
          });
      throw new Error("window.alert not supported in VS Code Renderers");
    };
    window.open = (url) => {
      var _a;
      console.log("window.open", url);
      if (url) {
        (_a = context.postKernelMessage) == null
          ? void 0
          : _a.call(context, {
              type: "IPyWidgets_Window_Open" /* IPyWidgets_Window_Open */,
              url: url.toString(),
            });
        throw new Error("window.open not supported in VS Code Renderers");
      }
      return null;
    };
  }
}
export { activate, disposeOutput, renderOutput };
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
//# sourceMappingURL=ipywidgetsKernel.js.map
