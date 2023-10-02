"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn2, res) => function __init() {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  };
  var __commonJS = (cb2, mod) => function __require() {
    return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/underscore/modules/_setup.js
  var VERSION, root, ArrayProto, ObjProto, SymbolProto, push, slice, toString, hasOwnProperty, supportsArrayBuffer, supportsDataView, nativeIsArray, nativeKeys, nativeCreate, nativeIsView, _isNaN, _isFinite, hasEnumBug, nonEnumerableProps, MAX_ARRAY_INDEX;
  var init_setup = __esm({
    "node_modules/underscore/modules/_setup.js"() {
      VERSION = "1.13.6";
      root = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {};
      ArrayProto = Array.prototype;
      ObjProto = Object.prototype;
      SymbolProto = typeof Symbol !== "undefined" ? Symbol.prototype : null;
      push = ArrayProto.push;
      slice = ArrayProto.slice;
      toString = ObjProto.toString;
      hasOwnProperty = ObjProto.hasOwnProperty;
      supportsArrayBuffer = typeof ArrayBuffer !== "undefined";
      supportsDataView = typeof DataView !== "undefined";
      nativeIsArray = Array.isArray;
      nativeKeys = Object.keys;
      nativeCreate = Object.create;
      nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;
      _isNaN = isNaN;
      _isFinite = isFinite;
      hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
      nonEnumerableProps = [
        "valueOf",
        "isPrototypeOf",
        "toString",
        "propertyIsEnumerable",
        "hasOwnProperty",
        "toLocaleString"
      ];
      MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    }
  });

  // node_modules/underscore/modules/restArguments.js
  function restArguments(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0), rest2 = Array(length), index = 0;
      for (; index < length; index++) {
        rest2[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0:
          return func.call(this, rest2);
        case 1:
          return func.call(this, arguments[0], rest2);
        case 2:
          return func.call(this, arguments[0], arguments[1], rest2);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest2;
      return func.apply(this, args);
    };
  }
  var init_restArguments = __esm({
    "node_modules/underscore/modules/restArguments.js"() {
    }
  });

  // node_modules/underscore/modules/isObject.js
  function isObject(obj) {
    var type2 = typeof obj;
    return type2 === "function" || type2 === "object" && !!obj;
  }
  var init_isObject = __esm({
    "node_modules/underscore/modules/isObject.js"() {
    }
  });

  // node_modules/underscore/modules/isNull.js
  function isNull(obj) {
    return obj === null;
  }
  var init_isNull = __esm({
    "node_modules/underscore/modules/isNull.js"() {
    }
  });

  // node_modules/underscore/modules/isUndefined.js
  function isUndefined(obj) {
    return obj === void 0;
  }
  var init_isUndefined = __esm({
    "node_modules/underscore/modules/isUndefined.js"() {
    }
  });

  // node_modules/underscore/modules/isBoolean.js
  function isBoolean(obj) {
    return obj === true || obj === false || toString.call(obj) === "[object Boolean]";
  }
  var init_isBoolean = __esm({
    "node_modules/underscore/modules/isBoolean.js"() {
      init_setup();
    }
  });

  // node_modules/underscore/modules/isElement.js
  function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
  }
  var init_isElement = __esm({
    "node_modules/underscore/modules/isElement.js"() {
    }
  });

  // node_modules/underscore/modules/_tagTester.js
  function tagTester(name) {
    var tag = "[object " + name + "]";
    return function(obj) {
      return toString.call(obj) === tag;
    };
  }
  var init_tagTester = __esm({
    "node_modules/underscore/modules/_tagTester.js"() {
      init_setup();
    }
  });

  // node_modules/underscore/modules/isString.js
  var isString_default;
  var init_isString = __esm({
    "node_modules/underscore/modules/isString.js"() {
      init_tagTester();
      isString_default = tagTester("String");
    }
  });

  // node_modules/underscore/modules/isNumber.js
  var isNumber_default;
  var init_isNumber = __esm({
    "node_modules/underscore/modules/isNumber.js"() {
      init_tagTester();
      isNumber_default = tagTester("Number");
    }
  });

  // node_modules/underscore/modules/isDate.js
  var isDate_default;
  var init_isDate = __esm({
    "node_modules/underscore/modules/isDate.js"() {
      init_tagTester();
      isDate_default = tagTester("Date");
    }
  });

  // node_modules/underscore/modules/isRegExp.js
  var isRegExp_default;
  var init_isRegExp = __esm({
    "node_modules/underscore/modules/isRegExp.js"() {
      init_tagTester();
      isRegExp_default = tagTester("RegExp");
    }
  });

  // node_modules/underscore/modules/isError.js
  var isError_default;
  var init_isError = __esm({
    "node_modules/underscore/modules/isError.js"() {
      init_tagTester();
      isError_default = tagTester("Error");
    }
  });

  // node_modules/underscore/modules/isSymbol.js
  var isSymbol_default;
  var init_isSymbol = __esm({
    "node_modules/underscore/modules/isSymbol.js"() {
      init_tagTester();
      isSymbol_default = tagTester("Symbol");
    }
  });

  // node_modules/underscore/modules/isArrayBuffer.js
  var isArrayBuffer_default;
  var init_isArrayBuffer = __esm({
    "node_modules/underscore/modules/isArrayBuffer.js"() {
      init_tagTester();
      isArrayBuffer_default = tagTester("ArrayBuffer");
    }
  });

  // node_modules/underscore/modules/isFunction.js
  var isFunction, nodelist, isFunction_default;
  var init_isFunction = __esm({
    "node_modules/underscore/modules/isFunction.js"() {
      init_tagTester();
      init_setup();
      isFunction = tagTester("Function");
      nodelist = root.document && root.document.childNodes;
      if (typeof /./ != "function" && typeof Int8Array != "object" && typeof nodelist != "function") {
        isFunction = function(obj) {
          return typeof obj == "function" || false;
        };
      }
      isFunction_default = isFunction;
    }
  });

  // node_modules/underscore/modules/_hasObjectTag.js
  var hasObjectTag_default;
  var init_hasObjectTag = __esm({
    "node_modules/underscore/modules/_hasObjectTag.js"() {
      init_tagTester();
      hasObjectTag_default = tagTester("Object");
    }
  });

  // node_modules/underscore/modules/_stringTagBug.js
  var hasStringTagBug, isIE11;
  var init_stringTagBug = __esm({
    "node_modules/underscore/modules/_stringTagBug.js"() {
      init_setup();
      init_hasObjectTag();
      hasStringTagBug = supportsDataView && hasObjectTag_default(new DataView(new ArrayBuffer(8)));
      isIE11 = typeof Map !== "undefined" && hasObjectTag_default(/* @__PURE__ */ new Map());
    }
  });

  // node_modules/underscore/modules/isDataView.js
  function ie10IsDataView(obj) {
    return obj != null && isFunction_default(obj.getInt8) && isArrayBuffer_default(obj.buffer);
  }
  var isDataView, isDataView_default;
  var init_isDataView = __esm({
    "node_modules/underscore/modules/isDataView.js"() {
      init_tagTester();
      init_isFunction();
      init_isArrayBuffer();
      init_stringTagBug();
      isDataView = tagTester("DataView");
      isDataView_default = hasStringTagBug ? ie10IsDataView : isDataView;
    }
  });

  // node_modules/underscore/modules/isArray.js
  var isArray_default;
  var init_isArray = __esm({
    "node_modules/underscore/modules/isArray.js"() {
      init_setup();
      init_tagTester();
      isArray_default = nativeIsArray || tagTester("Array");
    }
  });

  // node_modules/underscore/modules/_has.js
  function has(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  }
  var init_has = __esm({
    "node_modules/underscore/modules/_has.js"() {
      init_setup();
    }
  });

  // node_modules/underscore/modules/isArguments.js
  var isArguments, isArguments_default;
  var init_isArguments = __esm({
    "node_modules/underscore/modules/isArguments.js"() {
      init_tagTester();
      init_has();
      isArguments = tagTester("Arguments");
      (function() {
        if (!isArguments(arguments)) {
          isArguments = function(obj) {
            return has(obj, "callee");
          };
        }
      })();
      isArguments_default = isArguments;
    }
  });

  // node_modules/underscore/modules/isFinite.js
  function isFinite2(obj) {
    return !isSymbol_default(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
  }
  var init_isFinite = __esm({
    "node_modules/underscore/modules/isFinite.js"() {
      init_setup();
      init_isSymbol();
    }
  });

  // node_modules/underscore/modules/isNaN.js
  function isNaN2(obj) {
    return isNumber_default(obj) && _isNaN(obj);
  }
  var init_isNaN = __esm({
    "node_modules/underscore/modules/isNaN.js"() {
      init_setup();
      init_isNumber();
    }
  });

  // node_modules/underscore/modules/constant.js
  function constant(value) {
    return function() {
      return value;
    };
  }
  var init_constant = __esm({
    "node_modules/underscore/modules/constant.js"() {
    }
  });

  // node_modules/underscore/modules/_createSizePropertyCheck.js
  function createSizePropertyCheck(getSizeProperty) {
    return function(collection) {
      var sizeProperty = getSizeProperty(collection);
      return typeof sizeProperty == "number" && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
    };
  }
  var init_createSizePropertyCheck = __esm({
    "node_modules/underscore/modules/_createSizePropertyCheck.js"() {
      init_setup();
    }
  });

  // node_modules/underscore/modules/_shallowProperty.js
  function shallowProperty(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  }
  var init_shallowProperty = __esm({
    "node_modules/underscore/modules/_shallowProperty.js"() {
    }
  });

  // node_modules/underscore/modules/_getByteLength.js
  var getByteLength_default;
  var init_getByteLength = __esm({
    "node_modules/underscore/modules/_getByteLength.js"() {
      init_shallowProperty();
      getByteLength_default = shallowProperty("byteLength");
    }
  });

  // node_modules/underscore/modules/_isBufferLike.js
  var isBufferLike_default;
  var init_isBufferLike = __esm({
    "node_modules/underscore/modules/_isBufferLike.js"() {
      init_createSizePropertyCheck();
      init_getByteLength();
      isBufferLike_default = createSizePropertyCheck(getByteLength_default);
    }
  });

  // node_modules/underscore/modules/isTypedArray.js
  function isTypedArray(obj) {
    return nativeIsView ? nativeIsView(obj) && !isDataView_default(obj) : isBufferLike_default(obj) && typedArrayPattern.test(toString.call(obj));
  }
  var typedArrayPattern, isTypedArray_default;
  var init_isTypedArray = __esm({
    "node_modules/underscore/modules/isTypedArray.js"() {
      init_setup();
      init_isDataView();
      init_constant();
      init_isBufferLike();
      typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
      isTypedArray_default = supportsArrayBuffer ? isTypedArray : constant(false);
    }
  });

  // node_modules/underscore/modules/_getLength.js
  var getLength_default;
  var init_getLength = __esm({
    "node_modules/underscore/modules/_getLength.js"() {
      init_shallowProperty();
      getLength_default = shallowProperty("length");
    }
  });

  // node_modules/underscore/modules/_collectNonEnumProps.js
  function emulatedSet(keys2) {
    var hash = {};
    for (var l = keys2.length, i = 0; i < l; ++i)
      hash[keys2[i]] = true;
    return {
      contains: function(key) {
        return hash[key] === true;
      },
      push: function(key) {
        hash[key] = true;
        return keys2.push(key);
      }
    };
  }
  function collectNonEnumProps(obj, keys2) {
    keys2 = emulatedSet(keys2);
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = isFunction_default(constructor) && constructor.prototype || ObjProto;
    var prop = "constructor";
    if (has(obj, prop) && !keys2.contains(prop))
      keys2.push(prop);
    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !keys2.contains(prop)) {
        keys2.push(prop);
      }
    }
  }
  var init_collectNonEnumProps = __esm({
    "node_modules/underscore/modules/_collectNonEnumProps.js"() {
      init_setup();
      init_isFunction();
      init_has();
    }
  });

  // node_modules/underscore/modules/keys.js
  function keys(obj) {
    if (!isObject(obj))
      return [];
    if (nativeKeys)
      return nativeKeys(obj);
    var keys2 = [];
    for (var key in obj)
      if (has(obj, key))
        keys2.push(key);
    if (hasEnumBug)
      collectNonEnumProps(obj, keys2);
    return keys2;
  }
  var init_keys = __esm({
    "node_modules/underscore/modules/keys.js"() {
      init_isObject();
      init_setup();
      init_has();
      init_collectNonEnumProps();
    }
  });

  // node_modules/underscore/modules/isEmpty.js
  function isEmpty(obj) {
    if (obj == null)
      return true;
    var length = getLength_default(obj);
    if (typeof length == "number" && (isArray_default(obj) || isString_default(obj) || isArguments_default(obj)))
      return length === 0;
    return getLength_default(keys(obj)) === 0;
  }
  var init_isEmpty = __esm({
    "node_modules/underscore/modules/isEmpty.js"() {
      init_getLength();
      init_isArray();
      init_isString();
      init_isArguments();
      init_keys();
    }
  });

  // node_modules/underscore/modules/isMatch.js
  function isMatch(object2, attrs) {
    var _keys = keys(attrs), length = _keys.length;
    if (object2 == null)
      return !length;
    var obj = Object(object2);
    for (var i = 0; i < length; i++) {
      var key = _keys[i];
      if (attrs[key] !== obj[key] || !(key in obj))
        return false;
    }
    return true;
  }
  var init_isMatch = __esm({
    "node_modules/underscore/modules/isMatch.js"() {
      init_keys();
    }
  });

  // node_modules/underscore/modules/underscore.js
  function _(obj) {
    if (obj instanceof _)
      return obj;
    if (!(this instanceof _))
      return new _(obj);
    this._wrapped = obj;
  }
  var init_underscore = __esm({
    "node_modules/underscore/modules/underscore.js"() {
      init_setup();
      _.VERSION = VERSION;
      _.prototype.value = function() {
        return this._wrapped;
      };
      _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
      _.prototype.toString = function() {
        return String(this._wrapped);
      };
    }
  });

  // node_modules/underscore/modules/_toBufferView.js
  function toBufferView(bufferSource) {
    return new Uint8Array(
      bufferSource.buffer || bufferSource,
      bufferSource.byteOffset || 0,
      getByteLength_default(bufferSource)
    );
  }
  var init_toBufferView = __esm({
    "node_modules/underscore/modules/_toBufferView.js"() {
      init_getByteLength();
    }
  });

  // node_modules/underscore/modules/isEqual.js
  function eq(a, b, aStack, bStack) {
    if (a === b)
      return a !== 0 || 1 / a === 1 / b;
    if (a == null || b == null)
      return false;
    if (a !== a)
      return b !== b;
    var type2 = typeof a;
    if (type2 !== "function" && type2 !== "object" && typeof b != "object")
      return false;
    return deepEq(a, b, aStack, bStack);
  }
  function deepEq(a, b, aStack, bStack) {
    if (a instanceof _)
      a = a._wrapped;
    if (b instanceof _)
      b = b._wrapped;
    var className = toString.call(a);
    if (className !== toString.call(b))
      return false;
    if (hasStringTagBug && className == "[object Object]" && isDataView_default(a)) {
      if (!isDataView_default(b))
        return false;
      className = tagDataView;
    }
    switch (className) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a)
          return +b !== +b;
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
      case "[object Symbol]":
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
      case "[object ArrayBuffer]":
      case tagDataView:
        return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
    }
    var areArrays = className === "[object Array]";
    if (!areArrays && isTypedArray_default(a)) {
      var byteLength = getByteLength_default(a);
      if (byteLength !== getByteLength_default(b))
        return false;
      if (a.buffer === b.buffer && a.byteOffset === b.byteOffset)
        return true;
      areArrays = true;
    }
    if (!areArrays) {
      if (typeof a != "object" || typeof b != "object")
        return false;
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction_default(aCtor) && aCtor instanceof aCtor && isFunction_default(bCtor) && bCtor instanceof bCtor) && ("constructor" in a && "constructor" in b)) {
        return false;
      }
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      if (aStack[length] === a)
        return bStack[length] === b;
    }
    aStack.push(a);
    bStack.push(b);
    if (areArrays) {
      length = a.length;
      if (length !== b.length)
        return false;
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack))
          return false;
      }
    } else {
      var _keys = keys(a), key;
      length = _keys.length;
      if (keys(b).length !== length)
        return false;
      while (length--) {
        key = _keys[length];
        if (!(has(b, key) && eq(a[key], b[key], aStack, bStack)))
          return false;
      }
    }
    aStack.pop();
    bStack.pop();
    return true;
  }
  function isEqual(a, b) {
    return eq(a, b);
  }
  var tagDataView;
  var init_isEqual = __esm({
    "node_modules/underscore/modules/isEqual.js"() {
      init_underscore();
      init_setup();
      init_getByteLength();
      init_isTypedArray();
      init_isFunction();
      init_stringTagBug();
      init_isDataView();
      init_keys();
      init_has();
      init_toBufferView();
      tagDataView = "[object DataView]";
    }
  });

  // node_modules/underscore/modules/allKeys.js
  function allKeys(obj) {
    if (!isObject(obj))
      return [];
    var keys2 = [];
    for (var key in obj)
      keys2.push(key);
    if (hasEnumBug)
      collectNonEnumProps(obj, keys2);
    return keys2;
  }
  var init_allKeys = __esm({
    "node_modules/underscore/modules/allKeys.js"() {
      init_isObject();
      init_setup();
      init_collectNonEnumProps();
    }
  });

  // node_modules/underscore/modules/_methodFingerprint.js
  function ie11fingerprint(methods) {
    var length = getLength_default(methods);
    return function(obj) {
      if (obj == null)
        return false;
      var keys2 = allKeys(obj);
      if (getLength_default(keys2))
        return false;
      for (var i = 0; i < length; i++) {
        if (!isFunction_default(obj[methods[i]]))
          return false;
      }
      return methods !== weakMapMethods || !isFunction_default(obj[forEachName]);
    };
  }
  var forEachName, hasName, commonInit, mapTail, mapMethods, weakMapMethods, setMethods;
  var init_methodFingerprint = __esm({
    "node_modules/underscore/modules/_methodFingerprint.js"() {
      init_getLength();
      init_isFunction();
      init_allKeys();
      forEachName = "forEach";
      hasName = "has";
      commonInit = ["clear", "delete"];
      mapTail = ["get", hasName, "set"];
      mapMethods = commonInit.concat(forEachName, mapTail);
      weakMapMethods = commonInit.concat(mapTail);
      setMethods = ["add"].concat(commonInit, forEachName, hasName);
    }
  });

  // node_modules/underscore/modules/isMap.js
  var isMap_default;
  var init_isMap = __esm({
    "node_modules/underscore/modules/isMap.js"() {
      init_tagTester();
      init_stringTagBug();
      init_methodFingerprint();
      isMap_default = isIE11 ? ie11fingerprint(mapMethods) : tagTester("Map");
    }
  });

  // node_modules/underscore/modules/isWeakMap.js
  var isWeakMap_default;
  var init_isWeakMap = __esm({
    "node_modules/underscore/modules/isWeakMap.js"() {
      init_tagTester();
      init_stringTagBug();
      init_methodFingerprint();
      isWeakMap_default = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester("WeakMap");
    }
  });

  // node_modules/underscore/modules/isSet.js
  var isSet_default;
  var init_isSet = __esm({
    "node_modules/underscore/modules/isSet.js"() {
      init_tagTester();
      init_stringTagBug();
      init_methodFingerprint();
      isSet_default = isIE11 ? ie11fingerprint(setMethods) : tagTester("Set");
    }
  });

  // node_modules/underscore/modules/isWeakSet.js
  var isWeakSet_default;
  var init_isWeakSet = __esm({
    "node_modules/underscore/modules/isWeakSet.js"() {
      init_tagTester();
      isWeakSet_default = tagTester("WeakSet");
    }
  });

  // node_modules/underscore/modules/values.js
  function values(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var values2 = Array(length);
    for (var i = 0; i < length; i++) {
      values2[i] = obj[_keys[i]];
    }
    return values2;
  }
  var init_values = __esm({
    "node_modules/underscore/modules/values.js"() {
      init_keys();
    }
  });

  // node_modules/underscore/modules/pairs.js
  function pairs(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var pairs2 = Array(length);
    for (var i = 0; i < length; i++) {
      pairs2[i] = [_keys[i], obj[_keys[i]]];
    }
    return pairs2;
  }
  var init_pairs = __esm({
    "node_modules/underscore/modules/pairs.js"() {
      init_keys();
    }
  });

  // node_modules/underscore/modules/invert.js
  function invert(obj) {
    var result2 = {};
    var _keys = keys(obj);
    for (var i = 0, length = _keys.length; i < length; i++) {
      result2[obj[_keys[i]]] = _keys[i];
    }
    return result2;
  }
  var init_invert = __esm({
    "node_modules/underscore/modules/invert.js"() {
      init_keys();
    }
  });

  // node_modules/underscore/modules/functions.js
  function functions(obj) {
    var names = [];
    for (var key in obj) {
      if (isFunction_default(obj[key]))
        names.push(key);
    }
    return names.sort();
  }
  var init_functions = __esm({
    "node_modules/underscore/modules/functions.js"() {
      init_isFunction();
    }
  });

  // node_modules/underscore/modules/_createAssigner.js
  function createAssigner(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults)
        obj = Object(obj);
      if (length < 2 || obj == null)
        return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index], keys2 = keysFunc(source), l = keys2.length;
        for (var i = 0; i < l; i++) {
          var key = keys2[i];
          if (!defaults || obj[key] === void 0)
            obj[key] = source[key];
        }
      }
      return obj;
    };
  }
  var init_createAssigner = __esm({
    "node_modules/underscore/modules/_createAssigner.js"() {
    }
  });

  // node_modules/underscore/modules/extend.js
  var extend_default;
  var init_extend = __esm({
    "node_modules/underscore/modules/extend.js"() {
      init_createAssigner();
      init_allKeys();
      extend_default = createAssigner(allKeys);
    }
  });

  // node_modules/underscore/modules/extendOwn.js
  var extendOwn_default;
  var init_extendOwn = __esm({
    "node_modules/underscore/modules/extendOwn.js"() {
      init_createAssigner();
      init_keys();
      extendOwn_default = createAssigner(keys);
    }
  });

  // node_modules/underscore/modules/defaults.js
  var defaults_default;
  var init_defaults = __esm({
    "node_modules/underscore/modules/defaults.js"() {
      init_createAssigner();
      init_allKeys();
      defaults_default = createAssigner(allKeys, true);
    }
  });

  // node_modules/underscore/modules/_baseCreate.js
  function ctor() {
    return function() {
    };
  }
  function baseCreate(prototype) {
    if (!isObject(prototype))
      return {};
    if (nativeCreate)
      return nativeCreate(prototype);
    var Ctor = ctor();
    Ctor.prototype = prototype;
    var result2 = new Ctor();
    Ctor.prototype = null;
    return result2;
  }
  var init_baseCreate = __esm({
    "node_modules/underscore/modules/_baseCreate.js"() {
      init_isObject();
      init_setup();
    }
  });

  // node_modules/underscore/modules/create.js
  function create(prototype, props) {
    var result2 = baseCreate(prototype);
    if (props)
      extendOwn_default(result2, props);
    return result2;
  }
  var init_create = __esm({
    "node_modules/underscore/modules/create.js"() {
      init_baseCreate();
      init_extendOwn();
    }
  });

  // node_modules/underscore/modules/clone.js
  function clone(obj) {
    if (!isObject(obj))
      return obj;
    return isArray_default(obj) ? obj.slice() : extend_default({}, obj);
  }
  var init_clone = __esm({
    "node_modules/underscore/modules/clone.js"() {
      init_isObject();
      init_isArray();
      init_extend();
    }
  });

  // node_modules/underscore/modules/tap.js
  function tap(obj, interceptor) {
    interceptor(obj);
    return obj;
  }
  var init_tap = __esm({
    "node_modules/underscore/modules/tap.js"() {
    }
  });

  // node_modules/underscore/modules/toPath.js
  function toPath(path) {
    return isArray_default(path) ? path : [path];
  }
  var init_toPath = __esm({
    "node_modules/underscore/modules/toPath.js"() {
      init_underscore();
      init_isArray();
      _.toPath = toPath;
    }
  });

  // node_modules/underscore/modules/_toPath.js
  function toPath2(path) {
    return _.toPath(path);
  }
  var init_toPath2 = __esm({
    "node_modules/underscore/modules/_toPath.js"() {
      init_underscore();
      init_toPath();
    }
  });

  // node_modules/underscore/modules/_deepGet.js
  function deepGet(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null)
        return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  }
  var init_deepGet = __esm({
    "node_modules/underscore/modules/_deepGet.js"() {
    }
  });

  // node_modules/underscore/modules/get.js
  function get(object2, path, defaultValue) {
    var value = deepGet(object2, toPath2(path));
    return isUndefined(value) ? defaultValue : value;
  }
  var init_get = __esm({
    "node_modules/underscore/modules/get.js"() {
      init_toPath2();
      init_deepGet();
      init_isUndefined();
    }
  });

  // node_modules/underscore/modules/has.js
  function has2(obj, path) {
    path = toPath2(path);
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (!has(obj, key))
        return false;
      obj = obj[key];
    }
    return !!length;
  }
  var init_has2 = __esm({
    "node_modules/underscore/modules/has.js"() {
      init_has();
      init_toPath2();
    }
  });

  // node_modules/underscore/modules/identity.js
  function identity(value) {
    return value;
  }
  var init_identity = __esm({
    "node_modules/underscore/modules/identity.js"() {
    }
  });

  // node_modules/underscore/modules/matcher.js
  function matcher(attrs) {
    attrs = extendOwn_default({}, attrs);
    return function(obj) {
      return isMatch(obj, attrs);
    };
  }
  var init_matcher = __esm({
    "node_modules/underscore/modules/matcher.js"() {
      init_extendOwn();
      init_isMatch();
    }
  });

  // node_modules/underscore/modules/property.js
  function property(path) {
    path = toPath2(path);
    return function(obj) {
      return deepGet(obj, path);
    };
  }
  var init_property = __esm({
    "node_modules/underscore/modules/property.js"() {
      init_deepGet();
      init_toPath2();
    }
  });

  // node_modules/underscore/modules/_optimizeCb.js
  function optimizeCb(func, context2, argCount) {
    if (context2 === void 0)
      return func;
    switch (argCount == null ? 3 : argCount) {
      case 1:
        return function(value) {
          return func.call(context2, value);
        };
      case 3:
        return function(value, index, collection) {
          return func.call(context2, value, index, collection);
        };
      case 4:
        return function(accumulator, value, index, collection) {
          return func.call(context2, accumulator, value, index, collection);
        };
    }
    return function() {
      return func.apply(context2, arguments);
    };
  }
  var init_optimizeCb = __esm({
    "node_modules/underscore/modules/_optimizeCb.js"() {
    }
  });

  // node_modules/underscore/modules/_baseIteratee.js
  function baseIteratee(value, context2, argCount) {
    if (value == null)
      return identity;
    if (isFunction_default(value))
      return optimizeCb(value, context2, argCount);
    if (isObject(value) && !isArray_default(value))
      return matcher(value);
    return property(value);
  }
  var init_baseIteratee = __esm({
    "node_modules/underscore/modules/_baseIteratee.js"() {
      init_identity();
      init_isFunction();
      init_isObject();
      init_isArray();
      init_matcher();
      init_property();
      init_optimizeCb();
    }
  });

  // node_modules/underscore/modules/iteratee.js
  function iteratee(value, context2) {
    return baseIteratee(value, context2, Infinity);
  }
  var init_iteratee = __esm({
    "node_modules/underscore/modules/iteratee.js"() {
      init_underscore();
      init_baseIteratee();
      _.iteratee = iteratee;
    }
  });

  // node_modules/underscore/modules/_cb.js
  function cb(value, context2, argCount) {
    if (_.iteratee !== iteratee)
      return _.iteratee(value, context2);
    return baseIteratee(value, context2, argCount);
  }
  var init_cb = __esm({
    "node_modules/underscore/modules/_cb.js"() {
      init_underscore();
      init_baseIteratee();
      init_iteratee();
    }
  });

  // node_modules/underscore/modules/mapObject.js
  function mapObject(obj, iteratee2, context2) {
    iteratee2 = cb(iteratee2, context2);
    var _keys = keys(obj), length = _keys.length, results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = _keys[index];
      results[currentKey] = iteratee2(obj[currentKey], currentKey, obj);
    }
    return results;
  }
  var init_mapObject = __esm({
    "node_modules/underscore/modules/mapObject.js"() {
      init_cb();
      init_keys();
    }
  });

  // node_modules/underscore/modules/noop.js
  function noop2() {
  }
  var init_noop = __esm({
    "node_modules/underscore/modules/noop.js"() {
    }
  });

  // node_modules/underscore/modules/propertyOf.js
  function propertyOf(obj) {
    if (obj == null)
      return noop2;
    return function(path) {
      return get(obj, path);
    };
  }
  var init_propertyOf = __esm({
    "node_modules/underscore/modules/propertyOf.js"() {
      init_noop();
      init_get();
    }
  });

  // node_modules/underscore/modules/times.js
  function times(n, iteratee2, context2) {
    var accum = Array(Math.max(0, n));
    iteratee2 = optimizeCb(iteratee2, context2, 1);
    for (var i = 0; i < n; i++)
      accum[i] = iteratee2(i);
    return accum;
  }
  var init_times = __esm({
    "node_modules/underscore/modules/times.js"() {
      init_optimizeCb();
    }
  });

  // node_modules/underscore/modules/random.js
  function random(min2, max2) {
    if (max2 == null) {
      max2 = min2;
      min2 = 0;
    }
    return min2 + Math.floor(Math.random() * (max2 - min2 + 1));
  }
  var init_random = __esm({
    "node_modules/underscore/modules/random.js"() {
    }
  });

  // node_modules/underscore/modules/now.js
  var now_default;
  var init_now = __esm({
    "node_modules/underscore/modules/now.js"() {
      now_default = Date.now || function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
    }
  });

  // node_modules/underscore/modules/_createEscaper.js
  function createEscaper(map2) {
    var escaper = function(match) {
      return map2[match];
    };
    var source = "(?:" + keys(map2).join("|") + ")";
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, "g");
    return function(string) {
      string = string == null ? "" : "" + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  }
  var init_createEscaper = __esm({
    "node_modules/underscore/modules/_createEscaper.js"() {
      init_keys();
    }
  });

  // node_modules/underscore/modules/_escapeMap.js
  var escapeMap_default;
  var init_escapeMap = __esm({
    "node_modules/underscore/modules/_escapeMap.js"() {
      escapeMap_default = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      };
    }
  });

  // node_modules/underscore/modules/escape.js
  var escape_default;
  var init_escape = __esm({
    "node_modules/underscore/modules/escape.js"() {
      init_createEscaper();
      init_escapeMap();
      escape_default = createEscaper(escapeMap_default);
    }
  });

  // node_modules/underscore/modules/_unescapeMap.js
  var unescapeMap_default;
  var init_unescapeMap = __esm({
    "node_modules/underscore/modules/_unescapeMap.js"() {
      init_invert();
      init_escapeMap();
      unescapeMap_default = invert(escapeMap_default);
    }
  });

  // node_modules/underscore/modules/unescape.js
  var unescape_default;
  var init_unescape = __esm({
    "node_modules/underscore/modules/unescape.js"() {
      init_createEscaper();
      init_unescapeMap();
      unescape_default = createEscaper(unescapeMap_default);
    }
  });

  // node_modules/underscore/modules/templateSettings.js
  var templateSettings_default;
  var init_templateSettings = __esm({
    "node_modules/underscore/modules/templateSettings.js"() {
      init_underscore();
      templateSettings_default = _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
      };
    }
  });

  // node_modules/underscore/modules/template.js
  function escapeChar(match) {
    return "\\" + escapes[match];
  }
  function template(text, settings, oldSettings) {
    if (!settings && oldSettings)
      settings = oldSettings;
    settings = defaults_default({}, settings, _.templateSettings);
    var matcher2 = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join("|") + "|$", "g");
    var index = 0;
    var source = "__p+='";
    text.replace(matcher2, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;
      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      return match;
    });
    source += "';\n";
    var argument = settings.variable;
    if (argument) {
      if (!bareIdentifier.test(argument))
        throw new Error(
          "variable is not a bare identifier: " + argument
        );
    } else {
      source = "with(obj||{}){\n" + source + "}\n";
      argument = "obj";
    }
    source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
    var render;
    try {
      render = new Function(argument, "_", source);
    } catch (e) {
      e.source = source;
      throw e;
    }
    var template2 = function(data) {
      return render.call(this, data, _);
    };
    template2.source = "function(" + argument + "){\n" + source + "}";
    return template2;
  }
  var noMatch, escapes, escapeRegExp, bareIdentifier;
  var init_template = __esm({
    "node_modules/underscore/modules/template.js"() {
      init_defaults();
      init_underscore();
      init_templateSettings();
      noMatch = /(.)^/;
      escapes = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
      bareIdentifier = /^\s*(\w|\$)+\s*$/;
    }
  });

  // node_modules/underscore/modules/result.js
  function result(obj, path, fallback) {
    path = toPath2(path);
    var length = path.length;
    if (!length) {
      return isFunction_default(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length;
      }
      obj = isFunction_default(prop) ? prop.call(obj) : prop;
    }
    return obj;
  }
  var init_result = __esm({
    "node_modules/underscore/modules/result.js"() {
      init_isFunction();
      init_toPath2();
    }
  });

  // node_modules/underscore/modules/uniqueId.js
  function uniqueId(prefix) {
    var id = ++idCounter + "";
    return prefix ? prefix + id : id;
  }
  var idCounter;
  var init_uniqueId = __esm({
    "node_modules/underscore/modules/uniqueId.js"() {
      idCounter = 0;
    }
  });

  // node_modules/underscore/modules/chain.js
  function chain(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  }
  var init_chain = __esm({
    "node_modules/underscore/modules/chain.js"() {
      init_underscore();
    }
  });

  // node_modules/underscore/modules/_executeBound.js
  function executeBound(sourceFunc, boundFunc, context2, callingContext, args) {
    if (!(callingContext instanceof boundFunc))
      return sourceFunc.apply(context2, args);
    var self2 = baseCreate(sourceFunc.prototype);
    var result2 = sourceFunc.apply(self2, args);
    if (isObject(result2))
      return result2;
    return self2;
  }
  var init_executeBound = __esm({
    "node_modules/underscore/modules/_executeBound.js"() {
      init_baseCreate();
      init_isObject();
    }
  });

  // node_modules/underscore/modules/partial.js
  var partial, partial_default;
  var init_partial = __esm({
    "node_modules/underscore/modules/partial.js"() {
      init_restArguments();
      init_executeBound();
      init_underscore();
      partial = restArguments(function(func, boundArgs) {
        var placeholder = partial.placeholder;
        var bound = function() {
          var position = 0, length = boundArgs.length;
          var args = Array(length);
          for (var i = 0; i < length; i++) {
            args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
          }
          while (position < arguments.length)
            args.push(arguments[position++]);
          return executeBound(func, bound, this, this, args);
        };
        return bound;
      });
      partial.placeholder = _;
      partial_default = partial;
    }
  });

  // node_modules/underscore/modules/bind.js
  var bind_default;
  var init_bind = __esm({
    "node_modules/underscore/modules/bind.js"() {
      init_restArguments();
      init_isFunction();
      init_executeBound();
      bind_default = restArguments(function(func, context2, args) {
        if (!isFunction_default(func))
          throw new TypeError("Bind must be called on a function");
        var bound = restArguments(function(callArgs) {
          return executeBound(func, bound, context2, this, args.concat(callArgs));
        });
        return bound;
      });
    }
  });

  // node_modules/underscore/modules/_isArrayLike.js
  var isArrayLike_default;
  var init_isArrayLike = __esm({
    "node_modules/underscore/modules/_isArrayLike.js"() {
      init_createSizePropertyCheck();
      init_getLength();
      isArrayLike_default = createSizePropertyCheck(getLength_default);
    }
  });

  // node_modules/underscore/modules/_flatten.js
  function flatten(input, depth, strict, output) {
    output = output || [];
    if (!depth && depth !== 0) {
      depth = Infinity;
    } else if (depth <= 0) {
      return output.concat(input);
    }
    var idx = output.length;
    for (var i = 0, length = getLength_default(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike_default(value) && (isArray_default(value) || isArguments_default(value))) {
        if (depth > 1) {
          flatten(value, depth - 1, strict, output);
          idx = output.length;
        } else {
          var j = 0, len = value.length;
          while (j < len)
            output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  }
  var init_flatten = __esm({
    "node_modules/underscore/modules/_flatten.js"() {
      init_getLength();
      init_isArrayLike();
      init_isArray();
      init_isArguments();
    }
  });

  // node_modules/underscore/modules/bindAll.js
  var bindAll_default;
  var init_bindAll = __esm({
    "node_modules/underscore/modules/bindAll.js"() {
      init_restArguments();
      init_flatten();
      init_bind();
      bindAll_default = restArguments(function(obj, keys2) {
        keys2 = flatten(keys2, false, false);
        var index = keys2.length;
        if (index < 1)
          throw new Error("bindAll must be passed function names");
        while (index--) {
          var key = keys2[index];
          obj[key] = bind_default(obj[key], obj);
        }
        return obj;
      });
    }
  });

  // node_modules/underscore/modules/memoize.js
  function memoize(func, hasher) {
    var memoize2 = function(key) {
      var cache = memoize2.cache;
      var address = "" + (hasher ? hasher.apply(this, arguments) : key);
      if (!has(cache, address))
        cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize2.cache = {};
    return memoize2;
  }
  var init_memoize = __esm({
    "node_modules/underscore/modules/memoize.js"() {
      init_has();
    }
  });

  // node_modules/underscore/modules/delay.js
  var delay_default;
  var init_delay = __esm({
    "node_modules/underscore/modules/delay.js"() {
      init_restArguments();
      delay_default = restArguments(function(func, wait, args) {
        return setTimeout(function() {
          return func.apply(null, args);
        }, wait);
      });
    }
  });

  // node_modules/underscore/modules/defer.js
  var defer_default;
  var init_defer = __esm({
    "node_modules/underscore/modules/defer.js"() {
      init_partial();
      init_delay();
      init_underscore();
      defer_default = partial_default(delay_default, _, 1);
    }
  });

  // node_modules/underscore/modules/throttle.js
  function throttle(func, wait, options) {
    var timeout, context2, args, result2;
    var previous = 0;
    if (!options)
      options = {};
    var later = function() {
      previous = options.leading === false ? 0 : now_default();
      timeout = null;
      result2 = func.apply(context2, args);
      if (!timeout)
        context2 = args = null;
    };
    var throttled = function() {
      var _now = now_default();
      if (!previous && options.leading === false)
        previous = _now;
      var remaining = wait - (_now - previous);
      context2 = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = _now;
        result2 = func.apply(context2, args);
        if (!timeout)
          context2 = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result2;
    };
    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context2 = args = null;
    };
    return throttled;
  }
  var init_throttle = __esm({
    "node_modules/underscore/modules/throttle.js"() {
      init_now();
    }
  });

  // node_modules/underscore/modules/debounce.js
  function debounce(func, wait, immediate) {
    var timeout, previous, args, result2, context2;
    var later = function() {
      var passed = now_default() - previous;
      if (wait > passed) {
        timeout = setTimeout(later, wait - passed);
      } else {
        timeout = null;
        if (!immediate)
          result2 = func.apply(context2, args);
        if (!timeout)
          args = context2 = null;
      }
    };
    var debounced = restArguments(function(_args) {
      context2 = this;
      args = _args;
      previous = now_default();
      if (!timeout) {
        timeout = setTimeout(later, wait);
        if (immediate)
          result2 = func.apply(context2, args);
      }
      return result2;
    });
    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = args = context2 = null;
    };
    return debounced;
  }
  var init_debounce = __esm({
    "node_modules/underscore/modules/debounce.js"() {
      init_restArguments();
      init_now();
    }
  });

  // node_modules/underscore/modules/wrap.js
  function wrap(func, wrapper) {
    return partial_default(wrapper, func);
  }
  var init_wrap = __esm({
    "node_modules/underscore/modules/wrap.js"() {
      init_partial();
    }
  });

  // node_modules/underscore/modules/negate.js
  function negate(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }
  var init_negate = __esm({
    "node_modules/underscore/modules/negate.js"() {
    }
  });

  // node_modules/underscore/modules/compose.js
  function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result2 = args[start].apply(this, arguments);
      while (i--)
        result2 = args[i].call(this, result2);
      return result2;
    };
  }
  var init_compose = __esm({
    "node_modules/underscore/modules/compose.js"() {
    }
  });

  // node_modules/underscore/modules/after.js
  function after(times2, func) {
    return function() {
      if (--times2 < 1) {
        return func.apply(this, arguments);
      }
    };
  }
  var init_after = __esm({
    "node_modules/underscore/modules/after.js"() {
    }
  });

  // node_modules/underscore/modules/before.js
  function before(times2, func) {
    var memo;
    return function() {
      if (--times2 > 0) {
        memo = func.apply(this, arguments);
      }
      if (times2 <= 1)
        func = null;
      return memo;
    };
  }
  var init_before = __esm({
    "node_modules/underscore/modules/before.js"() {
    }
  });

  // node_modules/underscore/modules/once.js
  var once_default;
  var init_once = __esm({
    "node_modules/underscore/modules/once.js"() {
      init_partial();
      init_before();
      once_default = partial_default(before, 2);
    }
  });

  // node_modules/underscore/modules/findKey.js
  function findKey(obj, predicate, context2) {
    predicate = cb(predicate, context2);
    var _keys = keys(obj), key;
    for (var i = 0, length = _keys.length; i < length; i++) {
      key = _keys[i];
      if (predicate(obj[key], key, obj))
        return key;
    }
  }
  var init_findKey = __esm({
    "node_modules/underscore/modules/findKey.js"() {
      init_cb();
      init_keys();
    }
  });

  // node_modules/underscore/modules/_createPredicateIndexFinder.js
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context2) {
      predicate = cb(predicate, context2);
      var length = getLength_default(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array))
          return index;
      }
      return -1;
    };
  }
  var init_createPredicateIndexFinder = __esm({
    "node_modules/underscore/modules/_createPredicateIndexFinder.js"() {
      init_cb();
      init_getLength();
    }
  });

  // node_modules/underscore/modules/findIndex.js
  var findIndex_default;
  var init_findIndex = __esm({
    "node_modules/underscore/modules/findIndex.js"() {
      init_createPredicateIndexFinder();
      findIndex_default = createPredicateIndexFinder(1);
    }
  });

  // node_modules/underscore/modules/findLastIndex.js
  var findLastIndex_default;
  var init_findLastIndex = __esm({
    "node_modules/underscore/modules/findLastIndex.js"() {
      init_createPredicateIndexFinder();
      findLastIndex_default = createPredicateIndexFinder(-1);
    }
  });

  // node_modules/underscore/modules/sortedIndex.js
  function sortedIndex(array, obj, iteratee2, context2) {
    iteratee2 = cb(iteratee2, context2, 1);
    var value = iteratee2(obj);
    var low = 0, high = getLength_default(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee2(array[mid]) < value)
        low = mid + 1;
      else
        high = mid;
    }
    return low;
  }
  var init_sortedIndex = __esm({
    "node_modules/underscore/modules/sortedIndex.js"() {
      init_cb();
      init_getLength();
    }
  });

  // node_modules/underscore/modules/_createIndexFinder.js
  function createIndexFinder(dir, predicateFind, sortedIndex2) {
    return function(array, item, idx) {
      var i = 0, length = getLength_default(array);
      if (typeof idx == "number") {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex2 && idx && length) {
        idx = sortedIndex2(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), isNaN2);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item)
          return idx;
      }
      return -1;
    };
  }
  var init_createIndexFinder = __esm({
    "node_modules/underscore/modules/_createIndexFinder.js"() {
      init_getLength();
      init_setup();
      init_isNaN();
    }
  });

  // node_modules/underscore/modules/indexOf.js
  var indexOf_default;
  var init_indexOf = __esm({
    "node_modules/underscore/modules/indexOf.js"() {
      init_sortedIndex();
      init_findIndex();
      init_createIndexFinder();
      indexOf_default = createIndexFinder(1, findIndex_default, sortedIndex);
    }
  });

  // node_modules/underscore/modules/lastIndexOf.js
  var lastIndexOf_default;
  var init_lastIndexOf = __esm({
    "node_modules/underscore/modules/lastIndexOf.js"() {
      init_findLastIndex();
      init_createIndexFinder();
      lastIndexOf_default = createIndexFinder(-1, findLastIndex_default);
    }
  });

  // node_modules/underscore/modules/find.js
  function find(obj, predicate, context2) {
    var keyFinder = isArrayLike_default(obj) ? findIndex_default : findKey;
    var key = keyFinder(obj, predicate, context2);
    if (key !== void 0 && key !== -1)
      return obj[key];
  }
  var init_find = __esm({
    "node_modules/underscore/modules/find.js"() {
      init_isArrayLike();
      init_findIndex();
      init_findKey();
    }
  });

  // node_modules/underscore/modules/findWhere.js
  function findWhere(obj, attrs) {
    return find(obj, matcher(attrs));
  }
  var init_findWhere = __esm({
    "node_modules/underscore/modules/findWhere.js"() {
      init_find();
      init_matcher();
    }
  });

  // node_modules/underscore/modules/each.js
  function each(obj, iteratee2, context2) {
    iteratee2 = optimizeCb(iteratee2, context2);
    var i, length;
    if (isArrayLike_default(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee2(obj[i], i, obj);
      }
    } else {
      var _keys = keys(obj);
      for (i = 0, length = _keys.length; i < length; i++) {
        iteratee2(obj[_keys[i]], _keys[i], obj);
      }
    }
    return obj;
  }
  var init_each = __esm({
    "node_modules/underscore/modules/each.js"() {
      init_optimizeCb();
      init_isArrayLike();
      init_keys();
    }
  });

  // node_modules/underscore/modules/map.js
  function map(obj, iteratee2, context2) {
    iteratee2 = cb(iteratee2, context2);
    var _keys = !isArrayLike_default(obj) && keys(obj), length = (_keys || obj).length, results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      results[index] = iteratee2(obj[currentKey], currentKey, obj);
    }
    return results;
  }
  var init_map = __esm({
    "node_modules/underscore/modules/map.js"() {
      init_cb();
      init_isArrayLike();
      init_keys();
    }
  });

  // node_modules/underscore/modules/_createReduce.js
  function createReduce(dir) {
    var reducer = function(obj, iteratee2, memo, initial2) {
      var _keys = !isArrayLike_default(obj) && keys(obj), length = (_keys || obj).length, index = dir > 0 ? 0 : length - 1;
      if (!initial2) {
        memo = obj[_keys ? _keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = _keys ? _keys[index] : index;
        memo = iteratee2(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };
    return function(obj, iteratee2, memo, context2) {
      var initial2 = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee2, context2, 4), memo, initial2);
    };
  }
  var init_createReduce = __esm({
    "node_modules/underscore/modules/_createReduce.js"() {
      init_isArrayLike();
      init_keys();
      init_optimizeCb();
    }
  });

  // node_modules/underscore/modules/reduce.js
  var reduce_default;
  var init_reduce = __esm({
    "node_modules/underscore/modules/reduce.js"() {
      init_createReduce();
      reduce_default = createReduce(1);
    }
  });

  // node_modules/underscore/modules/reduceRight.js
  var reduceRight_default;
  var init_reduceRight = __esm({
    "node_modules/underscore/modules/reduceRight.js"() {
      init_createReduce();
      reduceRight_default = createReduce(-1);
    }
  });

  // node_modules/underscore/modules/filter.js
  function filter(obj, predicate, context2) {
    var results = [];
    predicate = cb(predicate, context2);
    each(obj, function(value, index, list) {
      if (predicate(value, index, list))
        results.push(value);
    });
    return results;
  }
  var init_filter = __esm({
    "node_modules/underscore/modules/filter.js"() {
      init_cb();
      init_each();
    }
  });

  // node_modules/underscore/modules/reject.js
  function reject(obj, predicate, context2) {
    return filter(obj, negate(cb(predicate)), context2);
  }
  var init_reject = __esm({
    "node_modules/underscore/modules/reject.js"() {
      init_filter();
      init_negate();
      init_cb();
    }
  });

  // node_modules/underscore/modules/every.js
  function every(obj, predicate, context2) {
    predicate = cb(predicate, context2);
    var _keys = !isArrayLike_default(obj) && keys(obj), length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj))
        return false;
    }
    return true;
  }
  var init_every = __esm({
    "node_modules/underscore/modules/every.js"() {
      init_cb();
      init_isArrayLike();
      init_keys();
    }
  });

  // node_modules/underscore/modules/some.js
  function some(obj, predicate, context2) {
    predicate = cb(predicate, context2);
    var _keys = !isArrayLike_default(obj) && keys(obj), length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj))
        return true;
    }
    return false;
  }
  var init_some = __esm({
    "node_modules/underscore/modules/some.js"() {
      init_cb();
      init_isArrayLike();
      init_keys();
    }
  });

  // node_modules/underscore/modules/contains.js
  function contains(obj, item, fromIndex, guard) {
    if (!isArrayLike_default(obj))
      obj = values(obj);
    if (typeof fromIndex != "number" || guard)
      fromIndex = 0;
    return indexOf_default(obj, item, fromIndex) >= 0;
  }
  var init_contains = __esm({
    "node_modules/underscore/modules/contains.js"() {
      init_isArrayLike();
      init_values();
      init_indexOf();
    }
  });

  // node_modules/underscore/modules/invoke.js
  var invoke_default;
  var init_invoke = __esm({
    "node_modules/underscore/modules/invoke.js"() {
      init_restArguments();
      init_isFunction();
      init_map();
      init_deepGet();
      init_toPath2();
      invoke_default = restArguments(function(obj, path, args) {
        var contextPath, func;
        if (isFunction_default(path)) {
          func = path;
        } else {
          path = toPath2(path);
          contextPath = path.slice(0, -1);
          path = path[path.length - 1];
        }
        return map(obj, function(context2) {
          var method = func;
          if (!method) {
            if (contextPath && contextPath.length) {
              context2 = deepGet(context2, contextPath);
            }
            if (context2 == null)
              return void 0;
            method = context2[path];
          }
          return method == null ? method : method.apply(context2, args);
        });
      });
    }
  });

  // node_modules/underscore/modules/pluck.js
  function pluck(obj, key) {
    return map(obj, property(key));
  }
  var init_pluck = __esm({
    "node_modules/underscore/modules/pluck.js"() {
      init_map();
      init_property();
    }
  });

  // node_modules/underscore/modules/where.js
  function where(obj, attrs) {
    return filter(obj, matcher(attrs));
  }
  var init_where = __esm({
    "node_modules/underscore/modules/where.js"() {
      init_filter();
      init_matcher();
    }
  });

  // node_modules/underscore/modules/max.js
  function max(obj, iteratee2, context2) {
    var result2 = -Infinity, lastComputed = -Infinity, value, computed;
    if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
      obj = isArrayLike_default(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result2) {
          result2 = value;
        }
      }
    } else {
      iteratee2 = cb(iteratee2, context2);
      each(obj, function(v, index, list) {
        computed = iteratee2(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result2 === -Infinity) {
          result2 = v;
          lastComputed = computed;
        }
      });
    }
    return result2;
  }
  var init_max = __esm({
    "node_modules/underscore/modules/max.js"() {
      init_isArrayLike();
      init_values();
      init_cb();
      init_each();
    }
  });

  // node_modules/underscore/modules/min.js
  function min(obj, iteratee2, context2) {
    var result2 = Infinity, lastComputed = Infinity, value, computed;
    if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
      obj = isArrayLike_default(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result2) {
          result2 = value;
        }
      }
    } else {
      iteratee2 = cb(iteratee2, context2);
      each(obj, function(v, index, list) {
        computed = iteratee2(v, index, list);
        if (computed < lastComputed || computed === Infinity && result2 === Infinity) {
          result2 = v;
          lastComputed = computed;
        }
      });
    }
    return result2;
  }
  var init_min = __esm({
    "node_modules/underscore/modules/min.js"() {
      init_isArrayLike();
      init_values();
      init_cb();
      init_each();
    }
  });

  // node_modules/underscore/modules/toArray.js
  function toArray(obj) {
    if (!obj)
      return [];
    if (isArray_default(obj))
      return slice.call(obj);
    if (isString_default(obj)) {
      return obj.match(reStrSymbol);
    }
    if (isArrayLike_default(obj))
      return map(obj, identity);
    return values(obj);
  }
  var reStrSymbol;
  var init_toArray = __esm({
    "node_modules/underscore/modules/toArray.js"() {
      init_isArray();
      init_setup();
      init_isString();
      init_isArrayLike();
      init_map();
      init_identity();
      init_values();
      reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    }
  });

  // node_modules/underscore/modules/sample.js
  function sample(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike_default(obj))
        obj = values(obj);
      return obj[random(obj.length - 1)];
    }
    var sample2 = toArray(obj);
    var length = getLength_default(sample2);
    n = Math.max(Math.min(n, length), 0);
    var last2 = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = random(index, last2);
      var temp = sample2[index];
      sample2[index] = sample2[rand];
      sample2[rand] = temp;
    }
    return sample2.slice(0, n);
  }
  var init_sample = __esm({
    "node_modules/underscore/modules/sample.js"() {
      init_isArrayLike();
      init_values();
      init_getLength();
      init_random();
      init_toArray();
    }
  });

  // node_modules/underscore/modules/shuffle.js
  function shuffle(obj) {
    return sample(obj, Infinity);
  }
  var init_shuffle = __esm({
    "node_modules/underscore/modules/shuffle.js"() {
      init_sample();
    }
  });

  // node_modules/underscore/modules/sortBy.js
  function sortBy(obj, iteratee2, context2) {
    var index = 0;
    iteratee2 = cb(iteratee2, context2);
    return pluck(map(obj, function(value, key, list) {
      return {
        value,
        index: index++,
        criteria: iteratee2(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0)
          return 1;
        if (a < b || b === void 0)
          return -1;
      }
      return left.index - right.index;
    }), "value");
  }
  var init_sortBy = __esm({
    "node_modules/underscore/modules/sortBy.js"() {
      init_cb();
      init_pluck();
      init_map();
    }
  });

  // node_modules/underscore/modules/_group.js
  function group(behavior, partition) {
    return function(obj, iteratee2, context2) {
      var result2 = partition ? [[], []] : {};
      iteratee2 = cb(iteratee2, context2);
      each(obj, function(value, index) {
        var key = iteratee2(value, index, obj);
        behavior(result2, value, key);
      });
      return result2;
    };
  }
  var init_group = __esm({
    "node_modules/underscore/modules/_group.js"() {
      init_cb();
      init_each();
    }
  });

  // node_modules/underscore/modules/groupBy.js
  var groupBy_default;
  var init_groupBy = __esm({
    "node_modules/underscore/modules/groupBy.js"() {
      init_group();
      init_has();
      groupBy_default = group(function(result2, value, key) {
        if (has(result2, key))
          result2[key].push(value);
        else
          result2[key] = [value];
      });
    }
  });

  // node_modules/underscore/modules/indexBy.js
  var indexBy_default;
  var init_indexBy = __esm({
    "node_modules/underscore/modules/indexBy.js"() {
      init_group();
      indexBy_default = group(function(result2, value, key) {
        result2[key] = value;
      });
    }
  });

  // node_modules/underscore/modules/countBy.js
  var countBy_default;
  var init_countBy = __esm({
    "node_modules/underscore/modules/countBy.js"() {
      init_group();
      init_has();
      countBy_default = group(function(result2, value, key) {
        if (has(result2, key))
          result2[key]++;
        else
          result2[key] = 1;
      });
    }
  });

  // node_modules/underscore/modules/partition.js
  var partition_default;
  var init_partition = __esm({
    "node_modules/underscore/modules/partition.js"() {
      init_group();
      partition_default = group(function(result2, value, pass) {
        result2[pass ? 0 : 1].push(value);
      }, true);
    }
  });

  // node_modules/underscore/modules/size.js
  function size(obj) {
    if (obj == null)
      return 0;
    return isArrayLike_default(obj) ? obj.length : keys(obj).length;
  }
  var init_size = __esm({
    "node_modules/underscore/modules/size.js"() {
      init_isArrayLike();
      init_keys();
    }
  });

  // node_modules/underscore/modules/_keyInObj.js
  function keyInObj(value, key, obj) {
    return key in obj;
  }
  var init_keyInObj = __esm({
    "node_modules/underscore/modules/_keyInObj.js"() {
    }
  });

  // node_modules/underscore/modules/pick.js
  var pick_default;
  var init_pick = __esm({
    "node_modules/underscore/modules/pick.js"() {
      init_restArguments();
      init_isFunction();
      init_optimizeCb();
      init_allKeys();
      init_keyInObj();
      init_flatten();
      pick_default = restArguments(function(obj, keys2) {
        var result2 = {}, iteratee2 = keys2[0];
        if (obj == null)
          return result2;
        if (isFunction_default(iteratee2)) {
          if (keys2.length > 1)
            iteratee2 = optimizeCb(iteratee2, keys2[1]);
          keys2 = allKeys(obj);
        } else {
          iteratee2 = keyInObj;
          keys2 = flatten(keys2, false, false);
          obj = Object(obj);
        }
        for (var i = 0, length = keys2.length; i < length; i++) {
          var key = keys2[i];
          var value = obj[key];
          if (iteratee2(value, key, obj))
            result2[key] = value;
        }
        return result2;
      });
    }
  });

  // node_modules/underscore/modules/omit.js
  var omit_default;
  var init_omit = __esm({
    "node_modules/underscore/modules/omit.js"() {
      init_restArguments();
      init_isFunction();
      init_negate();
      init_map();
      init_flatten();
      init_contains();
      init_pick();
      omit_default = restArguments(function(obj, keys2) {
        var iteratee2 = keys2[0], context2;
        if (isFunction_default(iteratee2)) {
          iteratee2 = negate(iteratee2);
          if (keys2.length > 1)
            context2 = keys2[1];
        } else {
          keys2 = map(flatten(keys2, false, false), String);
          iteratee2 = function(value, key) {
            return !contains(keys2, key);
          };
        }
        return pick_default(obj, iteratee2, context2);
      });
    }
  });

  // node_modules/underscore/modules/initial.js
  function initial(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  }
  var init_initial = __esm({
    "node_modules/underscore/modules/initial.js"() {
      init_setup();
    }
  });

  // node_modules/underscore/modules/first.js
  function first(array, n, guard) {
    if (array == null || array.length < 1)
      return n == null || guard ? void 0 : [];
    if (n == null || guard)
      return array[0];
    return initial(array, array.length - n);
  }
  var init_first = __esm({
    "node_modules/underscore/modules/first.js"() {
      init_initial();
    }
  });

  // node_modules/underscore/modules/rest.js
  function rest(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  }
  var init_rest = __esm({
    "node_modules/underscore/modules/rest.js"() {
      init_setup();
    }
  });

  // node_modules/underscore/modules/last.js
  function last(array, n, guard) {
    if (array == null || array.length < 1)
      return n == null || guard ? void 0 : [];
    if (n == null || guard)
      return array[array.length - 1];
    return rest(array, Math.max(0, array.length - n));
  }
  var init_last = __esm({
    "node_modules/underscore/modules/last.js"() {
      init_rest();
    }
  });

  // node_modules/underscore/modules/compact.js
  function compact(array) {
    return filter(array, Boolean);
  }
  var init_compact = __esm({
    "node_modules/underscore/modules/compact.js"() {
      init_filter();
    }
  });

  // node_modules/underscore/modules/flatten.js
  function flatten2(array, depth) {
    return flatten(array, depth, false);
  }
  var init_flatten2 = __esm({
    "node_modules/underscore/modules/flatten.js"() {
      init_flatten();
    }
  });

  // node_modules/underscore/modules/difference.js
  var difference_default;
  var init_difference = __esm({
    "node_modules/underscore/modules/difference.js"() {
      init_restArguments();
      init_flatten();
      init_filter();
      init_contains();
      difference_default = restArguments(function(array, rest2) {
        rest2 = flatten(rest2, true, true);
        return filter(array, function(value) {
          return !contains(rest2, value);
        });
      });
    }
  });

  // node_modules/underscore/modules/without.js
  var without_default;
  var init_without = __esm({
    "node_modules/underscore/modules/without.js"() {
      init_restArguments();
      init_difference();
      without_default = restArguments(function(array, otherArrays) {
        return difference_default(array, otherArrays);
      });
    }
  });

  // node_modules/underscore/modules/uniq.js
  function uniq(array, isSorted, iteratee2, context2) {
    if (!isBoolean(isSorted)) {
      context2 = iteratee2;
      iteratee2 = isSorted;
      isSorted = false;
    }
    if (iteratee2 != null)
      iteratee2 = cb(iteratee2, context2);
    var result2 = [];
    var seen = [];
    for (var i = 0, length = getLength_default(array); i < length; i++) {
      var value = array[i], computed = iteratee2 ? iteratee2(value, i, array) : value;
      if (isSorted && !iteratee2) {
        if (!i || seen !== computed)
          result2.push(value);
        seen = computed;
      } else if (iteratee2) {
        if (!contains(seen, computed)) {
          seen.push(computed);
          result2.push(value);
        }
      } else if (!contains(result2, value)) {
        result2.push(value);
      }
    }
    return result2;
  }
  var init_uniq = __esm({
    "node_modules/underscore/modules/uniq.js"() {
      init_isBoolean();
      init_cb();
      init_getLength();
      init_contains();
    }
  });

  // node_modules/underscore/modules/union.js
  var union_default;
  var init_union = __esm({
    "node_modules/underscore/modules/union.js"() {
      init_restArguments();
      init_uniq();
      init_flatten();
      union_default = restArguments(function(arrays) {
        return uniq(flatten(arrays, true, true));
      });
    }
  });

  // node_modules/underscore/modules/intersection.js
  function intersection(array) {
    var result2 = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength_default(array); i < length; i++) {
      var item = array[i];
      if (contains(result2, item))
        continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!contains(arguments[j], item))
          break;
      }
      if (j === argsLength)
        result2.push(item);
    }
    return result2;
  }
  var init_intersection = __esm({
    "node_modules/underscore/modules/intersection.js"() {
      init_getLength();
      init_contains();
    }
  });

  // node_modules/underscore/modules/unzip.js
  function unzip(array) {
    var length = array && max(array, getLength_default).length || 0;
    var result2 = Array(length);
    for (var index = 0; index < length; index++) {
      result2[index] = pluck(array, index);
    }
    return result2;
  }
  var init_unzip = __esm({
    "node_modules/underscore/modules/unzip.js"() {
      init_max();
      init_getLength();
      init_pluck();
    }
  });

  // node_modules/underscore/modules/zip.js
  var zip_default;
  var init_zip = __esm({
    "node_modules/underscore/modules/zip.js"() {
      init_restArguments();
      init_unzip();
      zip_default = restArguments(unzip);
    }
  });

  // node_modules/underscore/modules/object.js
  function object(list, values2) {
    var result2 = {};
    for (var i = 0, length = getLength_default(list); i < length; i++) {
      if (values2) {
        result2[list[i]] = values2[i];
      } else {
        result2[list[i][0]] = list[i][1];
      }
    }
    return result2;
  }
  var init_object = __esm({
    "node_modules/underscore/modules/object.js"() {
      init_getLength();
    }
  });

  // node_modules/underscore/modules/range.js
  function range(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range2 = Array(length);
    for (var idx = 0; idx < length; idx++, start += step) {
      range2[idx] = start;
    }
    return range2;
  }
  var init_range = __esm({
    "node_modules/underscore/modules/range.js"() {
    }
  });

  // node_modules/underscore/modules/chunk.js
  function chunk(array, count) {
    if (count == null || count < 1)
      return [];
    var result2 = [];
    var i = 0, length = array.length;
    while (i < length) {
      result2.push(slice.call(array, i, i += count));
    }
    return result2;
  }
  var init_chunk = __esm({
    "node_modules/underscore/modules/chunk.js"() {
      init_setup();
    }
  });

  // node_modules/underscore/modules/_chainResult.js
  function chainResult(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  }
  var init_chainResult = __esm({
    "node_modules/underscore/modules/_chainResult.js"() {
      init_underscore();
    }
  });

  // node_modules/underscore/modules/mixin.js
  function mixin(obj) {
    each(functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  }
  var init_mixin = __esm({
    "node_modules/underscore/modules/mixin.js"() {
      init_underscore();
      init_each();
      init_functions();
      init_setup();
      init_chainResult();
    }
  });

  // node_modules/underscore/modules/underscore-array-methods.js
  var underscore_array_methods_default;
  var init_underscore_array_methods = __esm({
    "node_modules/underscore/modules/underscore-array-methods.js"() {
      init_underscore();
      init_each();
      init_setup();
      init_chainResult();
      each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          var obj = this._wrapped;
          if (obj != null) {
            method.apply(obj, arguments);
            if ((name === "shift" || name === "splice") && obj.length === 0) {
              delete obj[0];
            }
          }
          return chainResult(this, obj);
        };
      });
      each(["concat", "join", "slice"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          var obj = this._wrapped;
          if (obj != null)
            obj = method.apply(obj, arguments);
          return chainResult(this, obj);
        };
      });
      underscore_array_methods_default = _;
    }
  });

  // node_modules/underscore/modules/index.js
  var modules_exports = {};
  __export(modules_exports, {
    VERSION: () => VERSION,
    after: () => after,
    all: () => every,
    allKeys: () => allKeys,
    any: () => some,
    assign: () => extendOwn_default,
    before: () => before,
    bind: () => bind_default,
    bindAll: () => bindAll_default,
    chain: () => chain,
    chunk: () => chunk,
    clone: () => clone,
    collect: () => map,
    compact: () => compact,
    compose: () => compose,
    constant: () => constant,
    contains: () => contains,
    countBy: () => countBy_default,
    create: () => create,
    debounce: () => debounce,
    default: () => underscore_array_methods_default,
    defaults: () => defaults_default,
    defer: () => defer_default,
    delay: () => delay_default,
    detect: () => find,
    difference: () => difference_default,
    drop: () => rest,
    each: () => each,
    escape: () => escape_default,
    every: () => every,
    extend: () => extend_default,
    extendOwn: () => extendOwn_default,
    filter: () => filter,
    find: () => find,
    findIndex: () => findIndex_default,
    findKey: () => findKey,
    findLastIndex: () => findLastIndex_default,
    findWhere: () => findWhere,
    first: () => first,
    flatten: () => flatten2,
    foldl: () => reduce_default,
    foldr: () => reduceRight_default,
    forEach: () => each,
    functions: () => functions,
    get: () => get,
    groupBy: () => groupBy_default,
    has: () => has2,
    head: () => first,
    identity: () => identity,
    include: () => contains,
    includes: () => contains,
    indexBy: () => indexBy_default,
    indexOf: () => indexOf_default,
    initial: () => initial,
    inject: () => reduce_default,
    intersection: () => intersection,
    invert: () => invert,
    invoke: () => invoke_default,
    isArguments: () => isArguments_default,
    isArray: () => isArray_default,
    isArrayBuffer: () => isArrayBuffer_default,
    isBoolean: () => isBoolean,
    isDataView: () => isDataView_default,
    isDate: () => isDate_default,
    isElement: () => isElement,
    isEmpty: () => isEmpty,
    isEqual: () => isEqual,
    isError: () => isError_default,
    isFinite: () => isFinite2,
    isFunction: () => isFunction_default,
    isMap: () => isMap_default,
    isMatch: () => isMatch,
    isNaN: () => isNaN2,
    isNull: () => isNull,
    isNumber: () => isNumber_default,
    isObject: () => isObject,
    isRegExp: () => isRegExp_default,
    isSet: () => isSet_default,
    isString: () => isString_default,
    isSymbol: () => isSymbol_default,
    isTypedArray: () => isTypedArray_default,
    isUndefined: () => isUndefined,
    isWeakMap: () => isWeakMap_default,
    isWeakSet: () => isWeakSet_default,
    iteratee: () => iteratee,
    keys: () => keys,
    last: () => last,
    lastIndexOf: () => lastIndexOf_default,
    map: () => map,
    mapObject: () => mapObject,
    matcher: () => matcher,
    matches: () => matcher,
    max: () => max,
    memoize: () => memoize,
    methods: () => functions,
    min: () => min,
    mixin: () => mixin,
    negate: () => negate,
    noop: () => noop2,
    now: () => now_default,
    object: () => object,
    omit: () => omit_default,
    once: () => once_default,
    pairs: () => pairs,
    partial: () => partial_default,
    partition: () => partition_default,
    pick: () => pick_default,
    pluck: () => pluck,
    property: () => property,
    propertyOf: () => propertyOf,
    random: () => random,
    range: () => range,
    reduce: () => reduce_default,
    reduceRight: () => reduceRight_default,
    reject: () => reject,
    rest: () => rest,
    restArguments: () => restArguments,
    result: () => result,
    sample: () => sample,
    select: () => filter,
    shuffle: () => shuffle,
    size: () => size,
    some: () => some,
    sortBy: () => sortBy,
    sortedIndex: () => sortedIndex,
    tail: () => rest,
    take: () => first,
    tap: () => tap,
    template: () => template,
    templateSettings: () => templateSettings_default,
    throttle: () => throttle,
    times: () => times,
    toArray: () => toArray,
    toPath: () => toPath,
    transpose: () => unzip,
    unescape: () => unescape_default,
    union: () => union_default,
    uniq: () => uniq,
    unique: () => uniq,
    uniqueId: () => uniqueId,
    unzip: () => unzip,
    values: () => values,
    where: () => where,
    without: () => without_default,
    wrap: () => wrap,
    zip: () => zip_default
  });
  var init_modules = __esm({
    "node_modules/underscore/modules/index.js"() {
      init_setup();
      init_restArguments();
      init_isObject();
      init_isNull();
      init_isUndefined();
      init_isBoolean();
      init_isElement();
      init_isString();
      init_isNumber();
      init_isDate();
      init_isRegExp();
      init_isError();
      init_isSymbol();
      init_isArrayBuffer();
      init_isDataView();
      init_isArray();
      init_isFunction();
      init_isArguments();
      init_isFinite();
      init_isNaN();
      init_isTypedArray();
      init_isEmpty();
      init_isMatch();
      init_isEqual();
      init_isMap();
      init_isWeakMap();
      init_isSet();
      init_isWeakSet();
      init_keys();
      init_allKeys();
      init_values();
      init_pairs();
      init_invert();
      init_functions();
      init_extend();
      init_extendOwn();
      init_defaults();
      init_create();
      init_clone();
      init_tap();
      init_get();
      init_has2();
      init_mapObject();
      init_identity();
      init_constant();
      init_noop();
      init_toPath();
      init_property();
      init_propertyOf();
      init_matcher();
      init_times();
      init_random();
      init_now();
      init_escape();
      init_unescape();
      init_templateSettings();
      init_template();
      init_result();
      init_uniqueId();
      init_chain();
      init_iteratee();
      init_partial();
      init_bind();
      init_bindAll();
      init_memoize();
      init_delay();
      init_defer();
      init_throttle();
      init_debounce();
      init_wrap();
      init_negate();
      init_compose();
      init_after();
      init_before();
      init_once();
      init_findKey();
      init_findIndex();
      init_findLastIndex();
      init_sortedIndex();
      init_indexOf();
      init_lastIndexOf();
      init_find();
      init_findWhere();
      init_each();
      init_map();
      init_reduce();
      init_reduceRight();
      init_filter();
      init_reject();
      init_every();
      init_some();
      init_contains();
      init_invoke();
      init_pluck();
      init_where();
      init_max();
      init_min();
      init_shuffle();
      init_sample();
      init_sortBy();
      init_groupBy();
      init_indexBy();
      init_countBy();
      init_partition();
      init_toArray();
      init_size();
      init_pick();
      init_omit();
      init_first();
      init_initial();
      init_last();
      init_rest();
      init_compact();
      init_flatten2();
      init_without();
      init_uniq();
      init_union();
      init_intersection();
      init_difference();
      init_unzip();
      init_zip();
      init_object();
      init_range();
      init_chunk();
      init_mixin();
      init_underscore_array_methods();
    }
  });

  // node_modules/underscore/modules/index-default.js
  var _2, index_default_default;
  var init_index_default = __esm({
    "node_modules/underscore/modules/index-default.js"() {
      init_modules();
      init_modules();
      _2 = mixin(modules_exports);
      _2._ = _2;
      index_default_default = _2;
    }
  });

  // node_modules/underscore/modules/index-all.js
  var index_all_exports = {};
  __export(index_all_exports, {
    VERSION: () => VERSION,
    after: () => after,
    all: () => every,
    allKeys: () => allKeys,
    any: () => some,
    assign: () => extendOwn_default,
    before: () => before,
    bind: () => bind_default,
    bindAll: () => bindAll_default,
    chain: () => chain,
    chunk: () => chunk,
    clone: () => clone,
    collect: () => map,
    compact: () => compact,
    compose: () => compose,
    constant: () => constant,
    contains: () => contains,
    countBy: () => countBy_default,
    create: () => create,
    debounce: () => debounce,
    default: () => index_default_default,
    defaults: () => defaults_default,
    defer: () => defer_default,
    delay: () => delay_default,
    detect: () => find,
    difference: () => difference_default,
    drop: () => rest,
    each: () => each,
    escape: () => escape_default,
    every: () => every,
    extend: () => extend_default,
    extendOwn: () => extendOwn_default,
    filter: () => filter,
    find: () => find,
    findIndex: () => findIndex_default,
    findKey: () => findKey,
    findLastIndex: () => findLastIndex_default,
    findWhere: () => findWhere,
    first: () => first,
    flatten: () => flatten2,
    foldl: () => reduce_default,
    foldr: () => reduceRight_default,
    forEach: () => each,
    functions: () => functions,
    get: () => get,
    groupBy: () => groupBy_default,
    has: () => has2,
    head: () => first,
    identity: () => identity,
    include: () => contains,
    includes: () => contains,
    indexBy: () => indexBy_default,
    indexOf: () => indexOf_default,
    initial: () => initial,
    inject: () => reduce_default,
    intersection: () => intersection,
    invert: () => invert,
    invoke: () => invoke_default,
    isArguments: () => isArguments_default,
    isArray: () => isArray_default,
    isArrayBuffer: () => isArrayBuffer_default,
    isBoolean: () => isBoolean,
    isDataView: () => isDataView_default,
    isDate: () => isDate_default,
    isElement: () => isElement,
    isEmpty: () => isEmpty,
    isEqual: () => isEqual,
    isError: () => isError_default,
    isFinite: () => isFinite2,
    isFunction: () => isFunction_default,
    isMap: () => isMap_default,
    isMatch: () => isMatch,
    isNaN: () => isNaN2,
    isNull: () => isNull,
    isNumber: () => isNumber_default,
    isObject: () => isObject,
    isRegExp: () => isRegExp_default,
    isSet: () => isSet_default,
    isString: () => isString_default,
    isSymbol: () => isSymbol_default,
    isTypedArray: () => isTypedArray_default,
    isUndefined: () => isUndefined,
    isWeakMap: () => isWeakMap_default,
    isWeakSet: () => isWeakSet_default,
    iteratee: () => iteratee,
    keys: () => keys,
    last: () => last,
    lastIndexOf: () => lastIndexOf_default,
    map: () => map,
    mapObject: () => mapObject,
    matcher: () => matcher,
    matches: () => matcher,
    max: () => max,
    memoize: () => memoize,
    methods: () => functions,
    min: () => min,
    mixin: () => mixin,
    negate: () => negate,
    noop: () => noop2,
    now: () => now_default,
    object: () => object,
    omit: () => omit_default,
    once: () => once_default,
    pairs: () => pairs,
    partial: () => partial_default,
    partition: () => partition_default,
    pick: () => pick_default,
    pluck: () => pluck,
    property: () => property,
    propertyOf: () => propertyOf,
    random: () => random,
    range: () => range,
    reduce: () => reduce_default,
    reduceRight: () => reduceRight_default,
    reject: () => reject,
    rest: () => rest,
    restArguments: () => restArguments,
    result: () => result,
    sample: () => sample,
    select: () => filter,
    shuffle: () => shuffle,
    size: () => size,
    some: () => some,
    sortBy: () => sortBy,
    sortedIndex: () => sortedIndex,
    tail: () => rest,
    take: () => first,
    tap: () => tap,
    template: () => template,
    templateSettings: () => templateSettings_default,
    throttle: () => throttle,
    times: () => times,
    toArray: () => toArray,
    toPath: () => toPath,
    transpose: () => unzip,
    unescape: () => unescape_default,
    union: () => union_default,
    uniq: () => uniq,
    unique: () => uniq,
    uniqueId: () => uniqueId,
    unzip: () => unzip,
    values: () => values,
    where: () => where,
    without: () => without_default,
    wrap: () => wrap,
    zip: () => zip_default
  });
  var init_index_all = __esm({
    "node_modules/underscore/modules/index-all.js"() {
      init_index_default();
      init_modules();
    }
  });

  // (disabled):node_modules/xhr2/lib/browser.js
  var require_browser = __commonJS({
    "(disabled):node_modules/xhr2/lib/browser.js"() {
    }
  });

  // node_modules/reqwest/reqwest.js
  var require_reqwest = __commonJS({
    "node_modules/reqwest/reqwest.js"(exports, module) {
      !function(name, context2, definition) {
        if (typeof module != "undefined" && module.exports)
          module.exports = definition();
        else if (typeof define == "function" && define.amd)
          define(definition);
        else
          context2[name] = definition();
      }("reqwest", exports, function() {
        var context = this;
        if ("window" in context) {
          var doc = document, byTag = "getElementsByTagName", head = doc[byTag]("head")[0];
        } else {
          var XHR2;
          try {
            XHR2 = require_browser();
          } catch (ex) {
            throw new Error("Peer dependency `xhr2` required! Please npm install xhr2");
          }
        }
        var httpsRe = /^http/, protocolRe = /(^\w+):\/\//, twoHundo = /^(20\d|1223)$/, readyState = "readyState", contentType = "Content-Type", requestedWith = "X-Requested-With", uniqid = 0, callbackPrefix = "reqwest_" + +/* @__PURE__ */ new Date(), lastValue, xmlHttpRequest = "XMLHttpRequest", xDomainRequest = "XDomainRequest", noop = function() {
        }, isArray = typeof Array.isArray == "function" ? Array.isArray : function(a) {
          return a instanceof Array;
        }, defaultHeaders = {
          "contentType": "application/x-www-form-urlencoded",
          "requestedWith": xmlHttpRequest,
          "accept": {
            "*": "text/javascript, text/html, application/xml, text/xml, */*",
            "xml": "application/xml, text/xml",
            "html": "text/html",
            "text": "text/plain",
            "json": "application/json, text/javascript",
            "js": "application/javascript, text/javascript"
          }
        }, xhr = function(o2) {
          if (o2["crossOrigin"] === true) {
            var xhr2 = context[xmlHttpRequest] ? new XMLHttpRequest() : null;
            if (xhr2 && "withCredentials" in xhr2) {
              return xhr2;
            } else if (context[xDomainRequest]) {
              return new XDomainRequest();
            } else {
              throw new Error("Browser does not support cross-origin requests");
            }
          } else if (context[xmlHttpRequest]) {
            return new XMLHttpRequest();
          } else if (XHR2) {
            return new XHR2();
          } else {
            return new ActiveXObject("Microsoft.XMLHTTP");
          }
        }, globalSetupOptions = {
          dataFilter: function(data) {
            return data;
          }
        };
        function succeed(r2) {
          var protocol = protocolRe.exec(r2.url);
          protocol = protocol && protocol[1] || context.location.protocol;
          return httpsRe.test(protocol) ? twoHundo.test(r2.request.status) : !!r2.request.response;
        }
        function handleReadyState(r2, success2, error2) {
          return function() {
            if (r2._aborted)
              return error2(r2.request);
            if (r2._timedOut)
              return error2(r2.request, "Request is aborted: timeout");
            if (r2.request && r2.request[readyState] == 4) {
              r2.request.onreadystatechange = noop;
              if (succeed(r2))
                success2(r2.request);
              else
                error2(r2.request);
            }
          };
        }
        function setHeaders(http, o2) {
          var headers = o2["headers"] || {}, h;
          headers["Accept"] = headers["Accept"] || defaultHeaders["accept"][o2["type"]] || defaultHeaders["accept"]["*"];
          var isAFormData = typeof FormData !== "undefined" && o2["data"] instanceof FormData;
          if (!o2["crossOrigin"] && !headers[requestedWith])
            headers[requestedWith] = defaultHeaders["requestedWith"];
          if (!headers[contentType] && !isAFormData)
            headers[contentType] = o2["contentType"] || defaultHeaders["contentType"];
          for (h in headers)
            headers.hasOwnProperty(h) && "setRequestHeader" in http && http.setRequestHeader(h, headers[h]);
        }
        function setCredentials(http, o2) {
          if (typeof o2["withCredentials"] !== "undefined" && typeof http.withCredentials !== "undefined") {
            http.withCredentials = !!o2["withCredentials"];
          }
        }
        function generalCallback(data) {
          lastValue = data;
        }
        function urlappend(url, s) {
          return url + (/\?/.test(url) ? "&" : "?") + s;
        }
        function handleJsonp(o2, fn2, err, url) {
          var reqId = uniqid++, cbkey = o2["jsonpCallback"] || "callback", cbval = o2["jsonpCallbackName"] || reqwest.getcallbackPrefix(reqId), cbreg = new RegExp("((^|\\?|&)" + cbkey + ")=([^&]+)"), match = url.match(cbreg), script = doc.createElement("script"), loaded = 0, isIE10 = navigator.userAgent.indexOf("MSIE 10.0") !== -1;
          if (match) {
            if (match[3] === "?") {
              url = url.replace(cbreg, "$1=" + cbval);
            } else {
              cbval = match[3];
            }
          } else {
            url = urlappend(url, cbkey + "=" + cbval);
          }
          context[cbval] = generalCallback;
          script.type = "text/javascript";
          script.src = url;
          script.async = true;
          if (typeof script.onreadystatechange !== "undefined" && !isIE10) {
            script.htmlFor = script.id = "_reqwest_" + reqId;
          }
          script.onload = script.onreadystatechange = function() {
            if (script[readyState] && script[readyState] !== "complete" && script[readyState] !== "loaded" || loaded) {
              return false;
            }
            script.onload = script.onreadystatechange = null;
            script.onclick && script.onclick();
            fn2(lastValue);
            lastValue = void 0;
            head.removeChild(script);
            loaded = 1;
          };
          head.appendChild(script);
          return {
            abort: function() {
              script.onload = script.onreadystatechange = null;
              err({}, "Request is aborted: timeout", {});
              lastValue = void 0;
              head.removeChild(script);
              loaded = 1;
            }
          };
        }
        function getRequest(fn2, err) {
          var o2 = this.o, method = (o2["method"] || "GET").toUpperCase(), url = typeof o2 === "string" ? o2 : o2["url"], data = o2["processData"] !== false && o2["data"] && typeof o2["data"] !== "string" ? reqwest.toQueryString(o2["data"]) : o2["data"] || null, http, sendWait = false;
          if ((o2["type"] == "jsonp" || method == "GET") && data) {
            url = urlappend(url, data);
            data = null;
          }
          if (o2["type"] == "jsonp")
            return handleJsonp(o2, fn2, err, url);
          http = o2.xhr && o2.xhr(o2) || xhr(o2);
          http.open(method, url, o2["async"] === false ? false : true);
          setHeaders(http, o2);
          setCredentials(http, o2);
          if (context[xDomainRequest] && http instanceof context[xDomainRequest]) {
            http.onload = fn2;
            http.onerror = err;
            http.onprogress = function() {
            };
            sendWait = true;
          } else {
            http.onreadystatechange = handleReadyState(this, fn2, err);
          }
          o2["before"] && o2["before"](http);
          if (sendWait) {
            setTimeout(function() {
              http.send(data);
            }, 200);
          } else {
            http.send(data);
          }
          return http;
        }
        function Reqwest(o2, fn2) {
          this.o = o2;
          this.fn = fn2;
          init.apply(this, arguments);
        }
        function setType(header) {
          if (header === null)
            return void 0;
          if (header.match("json"))
            return "json";
          if (header.match("javascript"))
            return "js";
          if (header.match("text"))
            return "html";
          if (header.match("xml"))
            return "xml";
        }
        function init(o, fn) {
          this.url = typeof o == "string" ? o : o["url"];
          this.timeout = null;
          this._fulfilled = false;
          this._successHandler = function() {
          };
          this._fulfillmentHandlers = [];
          this._errorHandlers = [];
          this._completeHandlers = [];
          this._erred = false;
          this._responseArgs = {};
          var self = this;
          fn = fn || function() {
          };
          if (o["timeout"]) {
            this.timeout = setTimeout(function() {
              timedOut();
            }, o["timeout"]);
          }
          if (o["success"]) {
            this._successHandler = function() {
              o["success"].apply(o, arguments);
            };
          }
          if (o["error"]) {
            this._errorHandlers.push(function() {
              o["error"].apply(o, arguments);
            });
          }
          if (o["complete"]) {
            this._completeHandlers.push(function() {
              o["complete"].apply(o, arguments);
            });
          }
          function complete(resp2) {
            o["timeout"] && clearTimeout(self.timeout);
            self.timeout = null;
            while (self._completeHandlers.length > 0) {
              self._completeHandlers.shift()(resp2);
            }
          }
          function success(resp) {
            var type = o["type"] || resp && setType(resp.getResponseHeader("Content-Type"));
            resp = type !== "jsonp" ? self.request : resp;
            var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type), r = filteredResponse;
            try {
              resp.responseText = r;
            } catch (e) {
            }
            if (r) {
              switch (type) {
                case "json":
                  try {
                    resp = context.JSON ? context.JSON.parse(r) : eval("(" + r + ")");
                  } catch (err) {
                    return error(resp, "Could not parse JSON in response", err);
                  }
                  break;
                case "js":
                  resp = eval(r);
                  break;
                case "html":
                  resp = r;
                  break;
                case "xml":
                  resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML;
                  break;
              }
            }
            self._responseArgs.resp = resp;
            self._fulfilled = true;
            fn(resp);
            self._successHandler(resp);
            while (self._fulfillmentHandlers.length > 0) {
              resp = self._fulfillmentHandlers.shift()(resp);
            }
            complete(resp);
          }
          function timedOut() {
            self._timedOut = true;
            self.request.abort();
          }
          function error(resp2, msg, t) {
            resp2 = self.request;
            self._responseArgs.resp = resp2;
            self._responseArgs.msg = msg;
            self._responseArgs.t = t;
            self._erred = true;
            while (self._errorHandlers.length > 0) {
              self._errorHandlers.shift()(resp2, msg, t);
            }
            complete(resp2);
          }
          this.request = getRequest.call(this, success, error);
        }
        Reqwest.prototype = {
          abort: function() {
            this._aborted = true;
            this.request.abort();
          },
          retry: function() {
            init.call(this, this.o, this.fn);
          },
          then: function(success2, fail) {
            success2 = success2 || function() {
            };
            fail = fail || function() {
            };
            if (this._fulfilled) {
              this._responseArgs.resp = success2(this._responseArgs.resp);
            } else if (this._erred) {
              fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t);
            } else {
              this._fulfillmentHandlers.push(success2);
              this._errorHandlers.push(fail);
            }
            return this;
          },
          always: function(fn2) {
            if (this._fulfilled || this._erred) {
              fn2(this._responseArgs.resp);
            } else {
              this._completeHandlers.push(fn2);
            }
            return this;
          },
          fail: function(fn2) {
            if (this._erred) {
              fn2(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t);
            } else {
              this._errorHandlers.push(fn2);
            }
            return this;
          },
          "catch": function(fn2) {
            return this.fail(fn2);
          }
        };
        function reqwest(o2, fn2) {
          return new Reqwest(o2, fn2);
        }
        function normalize(s) {
          return s ? s.replace(/\r?\n/g, "\r\n") : "";
        }
        function serial(el, cb2) {
          var n = el.name, t = el.tagName.toLowerCase(), optCb = function(o2) {
            if (o2 && !o2["disabled"])
              cb2(n, normalize(o2["attributes"]["value"] && o2["attributes"]["value"]["specified"] ? o2["value"] : o2["text"]));
          }, ch, ra, val, i;
          if (el.disabled || !n)
            return;
          switch (t) {
            case "input":
              if (!/reset|button|image|file/i.test(el.type)) {
                ch = /checkbox/i.test(el.type);
                ra = /radio/i.test(el.type);
                val = el.value;
                (!(ch || ra) || el.checked) && cb2(n, normalize(ch && val === "" ? "on" : val));
              }
              break;
            case "textarea":
              cb2(n, normalize(el.value));
              break;
            case "select":
              if (el.type.toLowerCase() === "select-one") {
                optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null);
              } else {
                for (i = 0; el.length && i < el.length; i++) {
                  el.options[i].selected && optCb(el.options[i]);
                }
              }
              break;
          }
        }
        function eachFormElement() {
          var cb2 = this, e, i, serializeSubtags = function(e2, tags) {
            var i2, j, fa;
            for (i2 = 0; i2 < tags.length; i2++) {
              fa = e2[byTag](tags[i2]);
              for (j = 0; j < fa.length; j++)
                serial(fa[j], cb2);
            }
          };
          for (i = 0; i < arguments.length; i++) {
            e = arguments[i];
            if (/input|select|textarea/i.test(e.tagName))
              serial(e, cb2);
            serializeSubtags(e, ["input", "select", "textarea"]);
          }
        }
        function serializeQueryString() {
          return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments));
        }
        function serializeHash() {
          var hash = {};
          eachFormElement.apply(function(name, value) {
            if (name in hash) {
              hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]]);
              hash[name].push(value);
            } else
              hash[name] = value;
          }, arguments);
          return hash;
        }
        reqwest.serializeArray = function() {
          var arr = [];
          eachFormElement.apply(function(name, value) {
            arr.push({ name, value });
          }, arguments);
          return arr;
        };
        reqwest.serialize = function() {
          if (arguments.length === 0)
            return "";
          var opt, fn2, args = Array.prototype.slice.call(arguments, 0);
          opt = args.pop();
          opt && opt.nodeType && args.push(opt) && (opt = null);
          opt && (opt = opt.type);
          if (opt == "map")
            fn2 = serializeHash;
          else if (opt == "array")
            fn2 = reqwest.serializeArray;
          else
            fn2 = serializeQueryString;
          return fn2.apply(null, args);
        };
        reqwest.toQueryString = function(o2, trad) {
          var prefix, i, traditional = trad || false, s = [], enc = encodeURIComponent, add = function(key, value) {
            value = "function" === typeof value ? value() : value == null ? "" : value;
            s[s.length] = enc(key) + "=" + enc(value);
          };
          if (isArray(o2)) {
            for (i = 0; o2 && i < o2.length; i++)
              add(o2[i]["name"], o2[i]["value"]);
          } else {
            for (prefix in o2) {
              if (o2.hasOwnProperty(prefix))
                buildParams(prefix, o2[prefix], traditional, add);
            }
          }
          return s.join("&").replace(/%20/g, "+");
        };
        function buildParams(prefix, obj, traditional, add) {
          var name, i, v, rbracket = /\[\]$/;
          if (isArray(obj)) {
            for (i = 0; obj && i < obj.length; i++) {
              v = obj[i];
              if (traditional || rbracket.test(prefix)) {
                add(prefix, v);
              } else {
                buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
              }
            }
          } else if (obj && obj.toString() === "[object Object]") {
            for (name in obj) {
              buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
          } else {
            add(prefix, obj);
          }
        }
        reqwest.getcallbackPrefix = function() {
          return callbackPrefix;
        };
        reqwest.compat = function(o2, fn2) {
          if (o2) {
            o2["type"] && (o2["method"] = o2["type"]) && delete o2["type"];
            o2["dataType"] && (o2["type"] = o2["dataType"]);
            o2["jsonpCallback"] && (o2["jsonpCallbackName"] = o2["jsonpCallback"]) && delete o2["jsonpCallback"];
            o2["jsonp"] && (o2["jsonpCallback"] = o2["jsonp"]);
          }
          return new Reqwest(o2, fn2);
        };
        reqwest.ajaxSetup = function(options) {
          options = options || {};
          for (var k in options) {
            globalSetupOptions[k] = options[k];
          }
        };
        return reqwest;
      });
    }
  });

  // pride.js
  var require_pride = __commonJS({
    "pride.js"(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      var Pride = exports2.Pride = {};
      Pride.Util = {};
      Pride.Core = {};
      Pride.Settings = {
        // default_cache_size:  If a cache size isn't set for a datastore, this value
        //                      is used instead.
        //
        // cache_size:          Key-value pairs where each key is the UID of a
        //                      datastore, and the value gives the cache size for that
        //                      particular datastore.
        //
        // datastores_url:      URL from which Pride can get all the possible
        //                      datastores.
        //
        // connection_attempts: How many times Pride will attempt an HTTP request
        //                      before giving up (overridden by some things such as
        //                      Pride.init()).
        //
        // init_attempts:       How many times Pride will attempt to initialize before
        //                      giving up.
        //
        // ms_between_attempts: How long Pride will wait to try another HTTP request
        //                      after one fails.
        //
        // message_formats:     Key-value pairs where each key is the ID of a message
        //                      type and the value is what that message should say. A
        //                      dollar sign preceded by a number will be replaced when
        //                      the message is created.
        //
        // obnoxious:           If true, debug messages will be logged to the console
        //                      as Pride runs. WARNING: Pride can send out a lot of
        //                      debug messages.
        default_cache_size: 20,
        cache_size: {},
        datastores_url: "",
        connection_attempts: 3,
        init_attempts: 3,
        ms_between_attempts: 1500,
        message_formats: {
          failed_record_load: "Failed to load $1",
          failed_search_run: "Failed to search $1",
          failed_init: "Failed to initialize Pride"
        },
        obnoxious: false
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Core.Datastore = function(datastore_info) {
        datastore_info = Pride.Util.deepClone(datastore_info);
        this.baseQuery = function() {
          return new Pride.Core.Query({
            uid: datastore_info.uid,
            sort: datastore_info.default_sort,
            start: 0,
            count: 0,
            settings: {},
            field_tree: fillFieldTree(),
            facets: _underscore2.default.reduce(datastore_info.facets, function(memo, facet) {
              if (facet.required && !facet.fixed) {
                memo[facet.uid] = facet.default_value;
              }
              return memo;
            }, {})
          });
        };
        this.baseSearch = function() {
          return new Pride.Core.DatastoreSearch({
            datastore: this
          });
        };
        this.runQuery = function(request_arguments) {
          request_arguments.url = datastore_info.url;
          Pride.Util.request(request_arguments);
          return this;
        };
        this.get = function(key) {
          return datastore_info[key];
        };
        this.update = function(new_info) {
          _underscore2.default.extend(datastore_info, new_info);
        };
        var fillFacets = function fillFacets2(set_facets) {
          return _underscore2.default.reduce(datastore_info.facets, function(memo, facet) {
            memo[facet.uid] = _underscore2.default.find(set_facets, function(possible_facet) {
              return possible_facet.uid === facet.uid;
            }) || facet;
            return memo;
          }, {});
        };
        var fillFieldTree = function fillFieldTree2(given_tree) {
          given_tree = given_tree || new Pride.FieldTree.FieldBoolean("AND");
          var output = _underscore2.default.reduce(datastore_info.fields, function(tree, field) {
            if ((field.required || field.fixed) && !tree.contains({
              type: "field",
              value: field.uid
            })) {
              missing_field = new Pride.FieldTree.Field(field.uid, new Pride.FieldTree.Literal(field.default_value));
              if (_underscore2.default.isMatch(tree, {
                type: "field_boolean",
                value: "AND"
              })) {
                return tree.addChild(missing_field);
              } else {
                return new Pride.FieldTree.FieldBoolean("AND", tree, missing_field);
              }
            }
            return tree;
          }, given_tree);
          return output.matches({
            type: "field_boolean",
            children: []
          }) ? {} : output;
        };
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Core.DatastoreSearch = function(setup) {
        var self2 = this;
        var base = new Pride.Core.SearchBase(setup, this);
        base.createItem = function(item_data) {
          return new Pride.Core.Record(item_data);
        };
        var facet_searches = [];
        var current_facets = [];
        this.getFacets = function() {
          return facet_searches;
        };
        this.uid = base.datastore.get("uid");
        this.getData = function() {
          return {
            uid: self2.uid,
            metadata: Pride.Util.deepClone(base.datastore.get("metadata")),
            sorts: Pride.Util.deepClone(base.datastore.get("sorts")),
            selected_sort: base.query.get("sort"),
            facets: Pride.Util.deepClone(base.query.get("facets")),
            fields: Pride.Util.deepClone(base.datastore.get("fields")),
            field_tree: Pride.Util.deepClone(base.query.get("field_tree")),
            settings: Pride.Util.deepClone(base.query.get("settings")),
            page: base.query.get("page"),
            count: base.query.get("count"),
            total_available: base.query.get("total_available"),
            total_pages: base.query.get("total_pages"),
            page_limit: base.query.get("page_limit"),
            specialists: Pride.Util.deepClone(base.query.get("specialists"))
          };
        };
        this.getResults = base.results;
        base.initialize_observables = function() {
          self2.runDataObservers.add(function() {
            var facets = base.datastore.get("facets");
            if (!Pride.Util.isDeepMatch(current_facets, facets)) {
              _underscore2.default.each(facet_searches, function(facet_search) {
                facet_search.clearAllObservers();
              });
              facet_searches = _underscore2.default.map(facets, function(facet_data) {
                return new Pride.Core.FacetSearch({
                  data: _underscore2.default.omit(facet_data, "values"),
                  results: facet_data.values
                });
              });
              current_facets = facets;
              self2.facetsObservers.notify();
            }
          });
        };
        this.getMute = base.getMute;
        this.setMute = function(state) {
          _underscore2.default.each(facet_searches, function(facet) {
            facet.setMute(state);
          });
          base.setMute(state);
          return self2;
        };
        base.createObservable("facets", this.getFacets).initialize_observables();
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Core.FacetSearch = function(setup) {
        var example_facet = this;
        var data = setup.data;
        var results = setup.results;
        this.uid = data.uid;
        this.getData = function() {
          return data;
        };
        this.getResults = function() {
          return results;
        };
        var muted = false;
        this.getMute = function() {
          return muted;
        };
        this.setMute = function(state) {
          muted = state;
          return self;
        };
        var observables = [];
        this.clearAllObservers = function() {
          _underscore2.default.each(observables, function(observable) {
            observable.clearAll();
          });
          return self;
        };
        var createObservable = function createObservable2(name, data_func) {
          var object2 = new Pride.Util.FuncBuffer(function() {
            var add_observer = this.add;
            var call_observers = this.call;
            observables.push(this);
            this.add = function(func) {
              if (!self.muted)
                func(data_func());
              add_observer(func, "observers");
              return this;
            };
            this.notify = function() {
              if (!self.muted) {
                data = data_func();
                self.log("NOTIFY (" + name + ")", data);
                call_observers("observers", data);
              }
              return this;
            };
          });
          return object2;
        };
        this.resultsObservers = createObservable("results", this.getResults);
        this.setDataObservers = createObservable("setData", this.getData);
        this.runDataObservers = createObservable("runData", this.getData);
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.FieldTree = {};
      Pride.Core.nodeFactory = function(type2, child_types, extention) {
        return function(value) {
          this.children = Pride.Util.slice(arguments, 1);
          if (this.children.length === 1 && Array.isArray(this.children[0])) {
            this.children = this.children[0];
          }
          this.type = type2;
          this.value = value.trim();
          this.child_types = child_types || [];
          this.validIfEmpty = true;
          this.addChild = function(new_child) {
            if (_underscore2.default.find(this.child_types, function(a_type) {
              return new_child.type === a_type;
            })) {
              this.children.push(new_child);
            } else {
              throw "Not a valid child for a " + this.type;
            }
            return this;
          };
          this.contains = function(query) {
            if (this.matches(query)) {
              return this;
            } else if (_underscore2.default.isEmpty(this.children)) {
              return false;
            } else {
              return _underscore2.default.find(this.children, function(possible) {
                return possible.contains(query);
              });
            }
          };
          this.matches = function(query) {
            var this_node = this;
            var query_children = query.children || [];
            return _underscore2.default.every(_underscore2.default.omit(query, "children"), function(value2, key) {
              return this_node[key] == value2;
            }) && _underscore2.default.every(query_children, function(query_child) {
              return _underscore2.default.any(children, function(real_child) {
                return query_child.matches(real_child);
              });
            });
          };
          this.serialize = function() {
            return value;
          };
          this.serializedChildren = function() {
            return _underscore2.default.chain(this.children).map(function(child) {
              return child.serialize();
            }).compact().value();
          };
          this.toJSON = function() {
            return _underscore2.default.mapObject(_underscore2.default.pick(this, "value", "children", "type"), function(val, key) {
              if (key == "children") {
                return _underscore2.default.map(val, function(item) {
                  return item.toJSON();
                });
              } else {
                return val;
              }
            });
          };
          if (_underscore2.default.isFunction(extention)) {
            extention.call(this);
          }
        };
      };
      Pride.Core.boolNodeFactory = function(type2, child_types) {
        return Pride.Core.nodeFactory(type2, child_types, function() {
          if (!_underscore2.default.contains(["AND", "OR", "NOT"], this.value)) {
            throw "Not a valid boolean value";
          }
          this.serialize = function() {
            return this.serializedChildren().join(" " + this.value + " ");
          };
          this.serializedChildren = function() {
            var this_node = this;
            return _underscore2.default.chain(this_node.children).map(function(child) {
              if (child.type == this_node.type || child.type == "literal" && child.value.match(/\s/)) {
                return "(" + child.serialize() + ")";
              } else {
                return child.serialize();
              }
            }).compact().value();
          };
        });
      };
      var top_level_nodes = ["field_boolean", "field"];
      var inside_field_nodes = ["value_boolean", "literal", "tag", "special"];
      Pride.FieldTree.FieldBoolean = Pride.Core.boolNodeFactory("field_boolean", top_level_nodes);
      Pride.FieldTree.ValueBoolean = Pride.Core.boolNodeFactory("value_boolean", inside_field_nodes);
      Pride.FieldTree.Field = Pride.Core.nodeFactory("field", inside_field_nodes, function() {
        this.serialize = function() {
          return this.value + ": (" + this.serializedChildren().join(" ") + ")";
        };
      });
      Pride.FieldTree.Tag = Pride.Core.nodeFactory("tag", inside_field_nodes, function() {
        this.serialize = function() {
          var serialized_children = this.serializedChildren();
          if (serialized_children.length === 0) {
            return "";
          } else {
            return this.value + "(" + serialized_children.join(" ") + ")";
          }
        };
      });
      Pride.FieldTree.Literal = Pride.Core.nodeFactory("literal");
      Pride.FieldTree.Special = Pride.Core.nodeFactory("special");
      Pride.FieldTree.Raw = Pride.Core.nodeFactory("raw");
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.FuncBuffer = function(extension) {
        var buffer = {};
        var self2 = this;
        var safeGet = function safeGet2(name) {
          if (!_underscore2.default.has(buffer, name))
            buffer[name] = [];
          return buffer[name];
        };
        this.add = function(func, name) {
          safeGet(name).push(func);
          return self2;
        };
        this.remove = function(func, name) {
          buffer[name] = _underscore2.default.reject(safeGet(name), function(other_func) {
            return func == other_func;
          });
          return self2;
        };
        this.clear = function(name) {
          delete buffer[name];
          return self2;
        };
        this.clearAll = function() {
          buffer = {};
          return self2;
        };
        this.call = function(name) {
          self2.apply(name, Pride.Util.slice(arguments, 1));
          return self2;
        };
        this.apply = function(name, args) {
          _underscore2.default.each(safeGet(name), function(func) {
            Pride.Util.safeApply(func, args);
          });
          return self2;
        };
        if (_underscore2.default.isFunction(extension))
          extension.call(this);
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Core.GetThis = function(barcode, data) {
        this.barcode = barcode;
        this.data = data;
        var getGetThisUrl = function getGetThisUrl2(data2) {
          var ret;
          _underscore2.default.each(data2.fields, function(field) {
            if (field.uid === "get_this_url") {
              ret = field.value;
            }
          });
          return ret;
        };
        var getLinks = function getLinks2(data2) {
          var ret;
          _underscore2.default.each(data2.fields, function(field) {
            if (field.uid == "links") {
              ret = field.value;
            }
          });
          return ret;
        };
        var request_buffer = new Pride.Util.RequestBuffer({
          url: getGetThisUrl(data) + "/" + this.barcode,
          failure_message: Pride.Messenger.preset("failed_get_this_load", data.names[0]),
          edit_response: function edit_response(response) {
            data = translateData(response);
            return data;
          }
        });
        var translateData = function translateData2(input) {
          return input;
        };
        this.getData = function(func) {
          request_buffer.request({
            success: func
          });
        };
      };
      Pride.Core.Holdings = function(data) {
        this.data = data;
        var getResourceAccess = function getResourceAccess2(data2) {
          var dataField = data2.fields.find(function(field) {
            return field.uid === "resource_access";
          });
          if (dataField && dataField.value) {
            return dataField.value;
          } else {
            return dataField;
          }
        };
        var translateData = function translateData2(input) {
          return [getResourceAccess(data)].concat(input);
        };
        this.getData = function(func) {
          Pride.Util.safeCall(func, translateData(this.data.holdings));
        };
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.MultiSearch = function(uid, muted, search_array) {
        var query_data = {};
        var self2 = this;
        this.searches = search_array;
        this.uid = uid;
        this.set = function(values2) {
          _underscore2.default.extend(query_data, values2);
          _underscore2.default.each(search_array, function(search) {
            search.set(values2);
          });
          return self2;
        };
        var funcOnEach = function funcOnEach2(func_name, before_func) {
          return function() {
            var args = Pride.Util.slice(arguments);
            Pride.Util.safeApply(before_func, args);
            _underscore2.default.each(search_array, function(search) {
              search[func_name].apply(search, args);
            });
            return self2;
          };
        };
        this.run = funcOnEach("run");
        this.nextPage = funcOnEach("nextPage");
        this.prevPage = funcOnEach("prevPage");
        this.setMute = funcOnEach("setMute", function(state) {
          muted = state;
        });
        this.getMute = function() {
          return muted;
        };
        this.setMute(muted);
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.Paginater = function(initial_values) {
        this.set = function(new_values) {
          if (_underscore2.default.has(new_values, "total_pages")) {
            throw "Can not set total_pages (it is a calculated value)";
          }
          if (_underscore2.default.has(new_values, "index_limit")) {
            throw "Can not set index_limit (it is a calculated value)";
          }
          if (_underscore2.default.intersection(["start", "end", "count"], _underscore2.default.keys(new_values)).length > 2) {
            throw "Can not set start, end and count all at the same time";
          }
          if (_underscore2.default.has(new_values, "page") && (_underscore2.default.has(new_values, "start") || _underscore2.default.has(new_values, "end"))) {
            throw "Can not set page as well as the start and/or end";
          }
          _underscore2.default.extend(values2, _underscore2.default.omit(new_values, "end"));
          if (_underscore2.default.has(new_values, "page")) {
            values2.start = (values2.count || 0) * (values2.page - 1);
          }
          if (_underscore2.default.has(new_values, "end")) {
            if (_underscore2.default.has(new_values, "count")) {
              values2.start = Math.max(0, new_values.end - (values2.count - 1));
            } else {
              if (values2.start <= new_values.end) {
                values2.count = new_values.end - values2.start + 1;
              } else {
                throw "The start value can not be greater than the end value";
              }
            }
            values2.end = new_values.end;
          } else {
            var end = values2.start + values2.count - 1;
            values2.end = end < values2.start ? void 0 : end;
          }
          if (!_underscore2.default.isNumber(values2.total_available)) {
            values2.index_limit = Infinity;
          } else if (values2.total_available > 0) {
            values2.index_limit = values2.total_available - 1;
          } else {
            values2.index_limit = void 0;
          }
          if (values2.count > 0 && values2.start % values2.count === 0) {
            values2.page = Math.floor(values2.start / values2.count) + 1;
            if (_underscore2.default.isNumber(values2.total_available)) {
              values2.total_pages = Math.ceil(values2.total_available / values2.count);
              values2.page_limit = values2.total_pages;
            } else {
              values2.total_pages = void 0;
              values2.page_limit = Infinity;
            }
          } else {
            values2.page = void 0;
            values2.total_pages = void 0;
            values2.page_limit = void 0;
          }
          if (!_underscore2.default.has(values2, "start") || !_underscore2.default.has(values2, "count")) {
            throw "Not enough information given to create Paginater";
          }
          return this;
        };
        this.get = function(name) {
          return values2[name];
        };
        var values2 = {};
        this.set(initial_values);
      };
      Pride.Util.Paginater.getPossibleKeys = function() {
        return ["start", "count", "end", "page", "index_limit", "total_pages", "total_available", "page_limit"];
      };
      Pride.Util.Paginater.hasKey = function(key) {
        return Pride.Util.Paginater.getPossibleKeys().indexOf(key) > -1;
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Core.Query = function(query_info) {
        var paginater = new Pride.Util.Paginater({
          start: query_info.start,
          count: query_info.count
        });
        var paginater_keys = Pride.Util.Paginater.getPossibleKeys();
        query_info = _underscore2.default.omit(Pride.Util.deepClone(query_info), paginater_keys);
        query_info.request_id = query_info.request_id || 0;
        this.get = function(key) {
          if (Pride.Util.Paginater.hasKey(key)) {
            return paginater.get(key);
          } else {
            return query_info[key];
          }
        };
        this.set = function(new_values) {
          var new_pagination_values = _underscore2.default.pick(new_values, paginater_keys);
          var new_query_values = _underscore2.default.omit(new_values, paginater_keys);
          if (!_underscore2.default.isEmpty(new_query_values)) {
            paginater.set({
              total_available: void 0
            });
            if (!_underscore2.default.isNumber(new_query_values.request_id)) {
              query_info.request_id += 1;
            }
          }
          paginater.set(new_pagination_values);
          _underscore2.default.extend(query_info, new_query_values);
          return this;
        };
        this.clone = function() {
          var full_info = Pride.Util.deepClone(query_info);
          full_info.start = paginater.get("start");
          full_info.count = paginater.get("count");
          return new Pride.Core.Query(full_info);
        };
        this.toSection = function() {
          return new Pride.Util.Section(this.get("start"), this.get("end"));
        };
        this.toLimitSection = function() {
          return new Pride.Util.Section(this.get("start"), this.get("index_limit"));
        };
        this.toJSON = function() {
          return {
            uid: this.get("uid"),
            request_id: this.get("request_id"),
            start: this.get("start"),
            count: this.get("count"),
            field_tree: this.get("field_tree"),
            facets: this.get("facets"),
            sort: this.get("sort"),
            settings: this.get("settings"),
            raw_query: this.get("raw_query")
          };
        };
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Core.Record = function(data) {
        var request_buffer = new Pride.Util.RequestBuffer({
          url: data.source,
          failure_message: Pride.Messenger.preset("failed_record_load", data.names[0]),
          edit_response: function edit_response(response) {
            data = translateData(response);
            return data;
          }
        });
        var holdings = null;
        var get_this = {};
        this.placeHold = function(item, pickup_location, not_needed_after, callback_function) {
          this.renderFull(function(data2) {
            var getHoldingsUrl = function getHoldingsUrl2() {
              var ret;
              _underscore2.default.each(data2.fields, function(field) {
                if (field.uid === "holdings_url") {
                  ret = field.value;
                }
              });
              return ret;
            };
            var response = Pride.Util.request({
              url: [getHoldingsUrl(), item, pickup_location, not_needed_after].join("/"),
              query: true,
              failure: function failure(data3) {
                Pride.Messenger.sendMessage({
                  summary: "Failed to place hold",
                  class: "error"
                });
              },
              success: callback_function,
              failure_message: "placeHold failed",
              success_message: "placeHold succeeded"
            });
          });
        };
        this.getHoldings = function(func) {
          if (holdings) {
            holdings.getData(func);
          } else if (data.complete) {
            holdings = new Pride.Core.Holdings(data);
            holdings.getData(func);
          } else {
            request_buffer.request({
              success: function success2(data2) {
                holdings = new Pride.Core.Holdings(data2);
                holdings.getData(func);
              }
            });
          }
        };
        this.getGetThis = function(barcode, func) {
          if (get_this[barcode]) {
            get_this[barcode].getData(func);
          } else if (data.complete) {
            get_this[barcode] = new Pride.Core.GetThis(barcode, data);
            get_this[barcode].getData(func);
          } else {
            request_buffer.request({
              success: function success2(data2) {
                get_this[barcode] = new Pride.Core.GetThis(barcode, data2);
                get_this[barcode].getData(func);
              }
            });
          }
        };
        this.renderPart = function(func) {
          callWithData(func);
        };
        this.renderPartThenCache = function(func) {
          callWithData(func);
          request_buffer.request();
        };
        this.renderFull = function(func) {
          if (data.complete) {
            callWithData(func);
          } else {
            request_buffer.request({
              success: func
            });
          }
        };
        this.renderCSL = function(func) {
          this.renderFull(function(data2) {
            var ret;
            _underscore2.default.each(data2.fields, function(field) {
              if (field.uid === "csl") {
                ret = field.value;
              }
            });
            func(ret);
          });
        };
        var callWithData = function callWithData2(func) {
          func(_underscore2.default.omit(data, "complete", "source"), data.complete);
        };
        var translateData = function translateData2(new_data) {
          new_data.fields = _underscore2.default.map(new_data.fields, function(field) {
            if (!field.value_has_html) {
              field.value = Pride.Util.escape(field.value);
            }
            return _underscore2.default.omit(field, "value_has_html");
          });
          if (!new_data.names_have_html) {
            new_data.names = _underscore2.default.map(new_data.names, function(name) {
              return Pride.Util.escape(name);
            });
          }
          if (new_data.uid) {
            new_data.status = 200;
          } else {
            new_data.status = 404;
          }
          if (Pride.PreferenceEngine.selected(new_data)) {
            new_data.selected = true;
          }
          return _underscore2.default.omit(new_data, "names_have_html");
        };
        data = translateData(data);
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.RequestBuffer = function(request_options) {
        request_options = request_options || {};
        var func_buffer = new Pride.Util.FuncBuffer();
        var request_issued = false;
        var request_successful = false;
        var request_failed = false;
        var cached_response_data;
        this.request = function(func_hash) {
          func_buffer.add(func_hash.success, "success").add(func_hash.failure, "failure");
          if (request_issued) {
            callWithResponse();
          } else {
            sendRequest();
          }
          return this;
        };
        var callWithResponse = function callWithResponse2(data) {
          cached_response_data = data || cached_response_data;
          if (request_successful) {
            callThenClear("success");
          } else if (request_failed) {
            callThenClear("failure");
          }
        };
        var sendRequest = function sendRequest2() {
          request_issued = true;
          Pride.Util.request({
            url: Pride.Util.safeCall(request_options.url),
            attempts: Pride.Util.safeCall(request_options.attempts) || Pride.Settings.connection_attempts,
            failure_message: Pride.Util.safeCall(request_options.failure_message),
            failure: function failure(error2) {
              request_failed = true;
              Pride.Util.safeCall(request_options.before_failure, error2);
              callWithResponse(error2);
              Pride.Util.safeCall(request_options.after_failure, error2);
            },
            success: function success2(response) {
              request_successful = true;
              Pride.Util.safeCall(request_options.before_success, response);
              if (_underscore2.default.isFunction(request_options.edit_response)) {
                response = request_options.edit_response(response);
              }
              callWithResponse(response);
              Pride.Util.safeCall(request_options.after_success, response);
            }
          });
        };
        var callThenClear = function callThenClear2(name) {
          func_buffer.call(name, cached_response_data).clearAll();
        };
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Core.SearchBase = function(setup, parent) {
        this.datastore = setup.datastore;
        this.query = setup.query || this.datastore.baseQuery();
        var self2 = this;
        var requestFunc = setup.requestFunc || this.datastore.runQuery;
        var results = setup.starting_results || [];
        var defaultCacheSize = setup.cache_size || Pride.Settings.cache_size[this.datastore.uid] || Pride.Settings.default_cache_size;
        this.log = function() {
          var message = Pride.Util.slice(arguments);
          message.unshift("Search (" + self2.datastore.get("uid") + ")");
          Pride.Core.log.apply(window, message);
        };
        this.set = function(set_hash) {
          self2.query.set(set_hash);
          Pride.Util.safeCall(self2.setDataChanged);
          if (!_underscore2.default.isEmpty(_underscore2.default.omit(set_hash, Pride.Util.Paginater.getPossibleKeys()))) {
            results = [];
          }
          return self2;
        };
        this.run = function(cache_size) {
          Pride.Util.safeCall(self2.resultsChanged);
          if (_underscore2.default.isUndefined(cache_size)) {
            cache_size = defaultCacheSize;
          }
          requestResults(getMissingSection(self2.query.toSection().expanded(cache_size)));
          return self2;
        };
        this.results = function() {
          return resultsPiece(new Pride.Util.Section(self2.query.get("start"), Math.min(self2.query.get("end"), self2.query.get("index_limit"))));
        };
        var requestResults = function requestResults2(requested_section) {
          self2.log("REQUESTING", requested_section);
          self2.log("TOTAL AVAILABLE (pre-request)", self2.query.get("total_available"));
          if (requested_section && self2.query.toLimitSection().overlaps(requested_section)) {
            self2.log("Sending query...");
            var new_query = self2.query.clone().set({
              start: requested_section.start,
              count: requested_section.calcLength()
            });
            requestFunc({
              query: new_query,
              failure_message: Pride.Messenger.preset("failed_search_run", self2.datastore.get("metadata").name),
              success: function success2(response_data) {
                if (response_data.request.request_id == self2.query.get("request_id")) {
                  updateData(response_data);
                  addResults(response_data.response, new_query.get("start"));
                  var response_length = response_data.response.length;
                  if (response_length !== 0 && response_length < new_query.get("count")) {
                    requestResults2(requested_section.shifted(response_length, 0));
                  }
                }
              }
            });
          } else {
            Pride.Util.safeCall(self2.runDataChanged);
          }
        };
        var addResults = function addResults2(new_items_array, offset) {
          var query_results_added = false;
          self2.log("NEW RECORDS", new_items_array);
          _underscore2.default.each(new_items_array, function(item_data, array_index) {
            var item_index = array_index + offset;
            if (_underscore2.default.isUndefined(results[item_index])) {
              results[item_index] = Pride.Util.safeCall(self2.createItem, item_data);
              if (self2.query.toSection().inSection(item_index)) {
                query_results_added = true;
              }
            }
          });
          self2.log("CACHE LENGTH", results.length);
          if (query_results_added || _underscore2.default.isEmpty(new_items_array)) {
            Pride.Util.safeCall(self2.resultsChanged);
          }
        };
        var updateData = function updateData2(response_data) {
          self2.datastore.update(response_data.datastore);
          var new_query_data = _underscore2.default.omit(response_data.new_request, "start", "count");
          new_query_data.specialists = response_data.specialists;
          new_query_data.total_available = response_data.total_available;
          self2.query.set(new_query_data);
          Pride.Util.safeCall(self2.runDataChanged);
        };
        var getMissingSection = function getMissingSection2(section) {
          var list = resultsPiece(section);
          var start = _underscore2.default.indexOf(list, void 0);
          if (start != -1) {
            var end = section.start + _underscore2.default.lastIndexOf(list, void 0);
            start += section.start;
            return new Pride.Util.Section(start, end);
          }
        };
        var resultsPiece = function resultsPiece2(section) {
          var output = [];
          for (var index = section.start; index <= section.end; index++) {
            output.push(results[index]);
          }
          return output;
        };
        var muted = false;
        var observables = [];
        var mutable_observables = [];
        this.clearAllObservers = function() {
          _underscore2.default.each(observables, function(observable) {
            observable.clearAll();
          });
          Pride.Util.safeCall(self2.initialize_observables);
          return self2;
        };
        this.getMute = function() {
          return muted;
        };
        this.setMute = function(state) {
          if (state != muted) {
            muted = state;
            Pride.Util.safeCall(self2.muteChanged());
            if (!muted) {
              _underscore2.default.each(mutable_observables, function(observable) {
                observable.notify();
              });
            }
          }
          return self2;
        };
        this.createObservable = function(name, data_func, never_mute) {
          var object2 = new Pride.Util.FuncBuffer(function() {
            var add_observer = this.add;
            var call_observers = this.call;
            observables.push(this);
            if (!never_mute)
              mutable_observables.push(this);
            this.add = function(func) {
              if (!self2.muted || never_mute)
                func(data_func());
              add_observer(func, "observers");
              return this;
            };
            this.notify = function() {
              if (!self2.muted || never_mute) {
                var data = data_func();
                self2.log("NOTIFY (" + name + ")", data);
                call_observers("observers", data);
              }
              return this;
            };
          });
          self2[name + "Changed"] = object2.notify;
          parent[name + "Observers"] = object2;
          return self2;
        };
        this.createObservable("mute", this.getMute, true).createObservable("setData", function() {
          parent.getData();
        }).createObservable("runData", function() {
          parent.getData();
        }).createObservable("results", this.results);
        parent.set = function(set_hash) {
          self2.set(set_hash);
          return parent;
        };
        parent.run = function(cache_size) {
          self2.run(cache_size);
          return parent;
        };
        parent.nextPage = function(cache_size) {
          var current_page = self2.query.get("page");
          if (_underscore2.default.isNumber(current_page) && current_page < self2.query.get("page_limit")) {
            parent.set({
              page: current_page + 1
            });
            parent.run(cache_size);
          }
          return parent;
        };
        parent.prevPage = function(cache_size) {
          var current_page = self2.query.get("page");
          if (_underscore2.default.isNumber(current_page) && current_page > 1) {
            parent.set({
              page: current_page - 1
            });
            parent.run(cache_size);
          }
          return parent;
        };
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.SearchSwitcher = function(current_search, cached_searches) {
        var self2 = this;
        var search_cache = new Pride.Util.MultiSearch(null, true, cached_searches);
        current_search.set({
          page: 1
        }).setMute(false);
        search_cache.set({
          page: 1
        });
        this.uid = current_search.uid;
        this.run = function(cache_size) {
          current_search.run(cache_size);
          search_cache.run(0);
          return self2;
        };
        this.set = function(settings) {
          current_search.set(settings);
          search_cache.set(_underscore2.default.omit(settings, "page", "facets"));
          return self2;
        };
        this.nextPage = function() {
          current_search.nextPage();
          return self2;
        };
        this.prevPage = function() {
          current_search.prevPage();
          return self2;
        };
        this.switchTo = function(requested_uid) {
          if (requested_uid != current_search) {
            current_search.setMute(true).set({
              page: 1
            });
            search_cache.searches.push(current_search);
            current_search = void 0;
            search_cache.searches = _underscore2.default.reject(search_cache.searches, function(search) {
              if (search.uid == requested_uid) {
                current_search = search;
                return true;
              }
            });
            if (!current_search) {
              throw "Could not find a search with a UID of: " + requested_uid;
            }
            self2.uid = current_search.uid;
            current_search.setMute(false);
          }
          return self2;
        };
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.Section = function(start, end) {
        this.start = Math.max(Math.min(start, end), 0);
        this.end = Math.max(Math.max(start, end), 0);
        this.inSection = function(index) {
          return index >= this.start && index <= this.end;
        };
        this.overlaps = function(section) {
          return this.inSection(section.start) || this.inSection(section.end);
        };
        this.calcLength = function() {
          return this.end - this.start + 1;
        };
        this.expanded = function(amount) {
          return this.shifted(-1 * amount, amount);
        };
        this.shifted = function(start_amount, end_amount) {
          if (!_underscore2.default.isNumber(end_amount))
            end_amount = start_amount;
          return new Pride.Util.Section(this.start + start_amount, this.end + end_amount);
        };
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.deepClone = function(original) {
        if (_underscore2.default.isFunction(original)) {
          return original;
        } else {
          var collection_function = false;
          if (_underscore2.default.isArray(original)) {
            collection_function = "map";
          } else if (_underscore2.default.isObject(original)) {
            collection_function = "mapObject";
          }
          if (collection_function) {
            return _underscore2.default[collection_function](original, function(item) {
              return Pride.Util.deepClone(item);
            });
          } else {
            return _underscore2.default.clone(original);
          }
        }
      };
      Pride.Util.escape = function(string) {
        var temp_element = document.createElement("div");
        temp_element.appendChild(document.createTextNode(string));
        return temp_element.innerHTML;
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.init = new Pride.Util.RequestBuffer({
        url: function url() {
          return Pride.Settings.datastores_url;
        },
        attempts: function attempts() {
          return Pride.Settings.init_attempts;
        },
        failure_message: function failure_message() {
          return Pride.Messenger.preset("failed_init");
        },
        edit_response: function edit_response() {
          return void 0;
        },
        before_success: function before_success(data) {
          Pride.Settings.default_institution = data.default_institution;
          Pride.Settings.affiliation = data.affiliation;
          Pride.AllDatastores.array = _underscore2.default.map(data.response, function(datastore_data) {
            return new Pride.Core.Datastore(datastore_data);
          });
        }
      }).request;
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.isDeepMatch = function(object2, pattern) {
        var both_arrays = _underscore2.default.isArray(object2) && _underscore2.default.isArray(pattern);
        var both_objects = _underscore2.default.isObject(object2) && _underscore2.default.isObject(pattern);
        if (both_arrays && pattern.length != object2.length) {
          return false;
        }
        if (both_objects && _underscore2.default.keys(pattern).length != _underscore2.default.keys(object2).length) {
          return false;
        }
        if (both_arrays || both_objects) {
          return _underscore2.default.every(pattern, function(value, key) {
            return Pride.Util.isDeepMatch(object2[key], value);
          });
        } else {
          return object2 === pattern;
        }
      };
      Pride.Core.log = function(source, info) {
        if (Pride.Settings.obnoxious) {
          var message = Pride.Util.slice(arguments, 2);
          message.unshift("[Pride: " + source + "] " + info);
          console.log.apply(console, message);
        }
      };
      Pride.FieldTree.parseField = function(field_name, content) {
        if (!content) {
          return {};
        } else {
          try {
            return Pride.Parser.parse(content, {
              defaultFieldName: field_name
            });
          } catch (e) {
            console.log(e);
            return new Pride.FieldTree.Raw(content);
          }
        }
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.FieldTree = Pride.FieldTree || {};
      Pride.FieldTree.tokens = [":", "AND", "OR", "+", "-", "(", ")", "*", " ", "\n", "	", "\r"];
      Pride.FieldTree.tokenize = function(string) {
        var result2 = [];
        var index = 0;
        var type2 = null;
        while (index < string.length) {
          var slice2 = string.slice(index);
          var found = _underscore2.default.find(Pride.FieldTree.tokens, function(pattern) {
            return new RegExp("^\\" + pattern).exec(slice2);
          });
          if (found) {
            if (/\s/.exec(found)) {
              type2 = "whitespace";
            }
            type2 = found;
            index += found.length;
          } else {
            found = string.charAt(index);
            type2 = "string";
            index++;
            var last2 = _underscore2.default.last(result2);
            if (last2 && last2.type == "string") {
              found = result2.pop().content + found;
            }
          }
          result2.push({
            type: type2,
            content: found
          });
        }
        return result2;
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      var _reqwest = require_reqwest();
      var _reqwest2 = _interopRequireDefault(_reqwest);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.request = function(request_info) {
        Pride.Core.log("Request", "Sending HTTP request...");
        Pride.Core.log("Request", "URL", request_info.url);
        Pride.Core.log("Request", "CONTENT", JSON.stringify(request_info.query));
        if (!request_info.url)
          throw "No URL given to Pride.Util.request()";
        var request_method = "get";
        if (request_info.query)
          request_method = "post";
        if (!_underscore2.default.isNumber(request_info.attempts)) {
          request_info.attempts = Pride.Settings.connection_attempts;
        }
        request_info.attempts -= 1;
        (0, _reqwest2.default)({
          url: request_info.url,
          data: JSON.stringify(request_info.query),
          type: "json",
          method: request_method,
          contentType: "application/json",
          withCredentials: true,
          error: function error2(_error) {
            if (request_info.attempts <= 0) {
              Pride.Core.log("Request", "ERROR", _error);
              Pride.Util.safeCall(request_info.failure, _error);
              Pride.Messenger.sendMessage({
                summary: request_info.failure_message,
                class: "error"
              });
            } else {
              Pride.Core.log("Request", "Trying request again...");
              window.setTimeout(function() {
                Pride.Util.request(request_info);
              }, Pride.Settings.ms_between_attempts);
            }
          },
          success: function success2(response) {
            Pride.Core.log("Request", "SUCCESS", response);
            Pride.Util.safeCall(request_info.success, response);
            Pride.Messenger.sendMessage({
              summary: request_info.success_message,
              class: "success"
            });
            Pride.Messenger.sendMessageArray(response.messages);
          }
        });
      };
      Pride.requestRecord = function(source, id, func) {
        if (func === void 0) {
          func = function func2(data2) {
          };
        }
        var data = {
          complete: false,
          source: Pride.AllDatastores.get(source).get("url") + "/record/" + id,
          names: [void 0]
        };
        var record = new Pride.Core.Record(data);
        record.renderFull(func);
        return record;
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Util.safeCall = function(maybe_func) {
        if (_underscore2.default.isFunction(maybe_func)) {
          return maybe_func.apply(this, Pride.Util.slice(arguments, 1));
        } else {
          return maybe_func;
        }
      };
      Pride.Util.safeApply = function(maybe_func, args) {
        if (_underscore2.default.isFunction(maybe_func)) {
          return maybe_func.apply(this, args);
        } else {
          return maybe_func;
        }
      };
      Pride.Util.slice = function(array, begin, end) {
        return Array.prototype.slice.call(array, begin, end);
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.AllDatastores = {
        array: [],
        get: function get2(uid) {
          return _underscore2.default.find(this.array, function(datastore) {
            return datastore.get("uid") == uid;
          });
        },
        newSearch: function newSearch(uid) {
          var datastore = _underscore2.default.find(this.array, function(datastore2) {
            return datastore2.get("uid") == uid;
          });
          return datastore ? datastore.baseSearch() : void 0;
        },
        each: function each2(func) {
          _underscore2.default.each(this.array, func);
          return this;
        }
      };
      var _underscore = (init_index_all(), __toCommonJS(index_all_exports));
      var _underscore2 = _interopRequireDefault(_underscore);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      Pride.Messenger = new Pride.Util.FuncBuffer(function() {
        var notifyObservers = this.call;
        this.addObserver = this.add;
        this.removeObserver = this.remove;
        this.clearObservers = this.clear;
        this.call = void 0;
        this.add = void 0;
        this.remove = void 0;
        this.clear = void 0;
        this.sendMessage = function(message) {
          if (message.summary) {
            message.class = message.class || "info";
            message.details = message.details || "";
            notifyObservers(message.class, message);
            Pride.Core.log("Messenger", "MESSAGE SENT", message);
          }
          return this;
        };
        this.sendMessageArray = function(message_array) {
          var messenger = this;
          _underscore2.default.each(message_array, function(message) {
            messenger.sendMessage(message);
          });
          return this;
        };
        this.preset = function(type2) {
        };
      });
      Pride.Parser = /*
       * Generated by PEG.js 0.10.0.
       *
       * http://pegjs.org/
       */
      function() {
        "use strict";
        function peg$subclass(child, parent) {
          function ctor2() {
            this.constructor = child;
          }
          ctor2.prototype = parent.prototype;
          child.prototype = new ctor2();
        }
        function peg$SyntaxError(message, expected, found, location) {
          this.message = message;
          this.expected = expected;
          this.found = found;
          this.location = location;
          this.name = "SyntaxError";
          if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, peg$SyntaxError);
          }
        }
        peg$subclass(peg$SyntaxError, Error);
        peg$SyntaxError.buildMessage = function(expected, found) {
          var DESCRIBE_EXPECTATION_FNS = {
            literal: function literal(expectation) {
              return '"' + literalEscape(expectation.text) + '"';
            },
            "class": function _class(expectation) {
              var escapedParts = "", i;
              for (i = 0; i < expectation.parts.length; i++) {
                escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
              }
              return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
            },
            any: function any(expectation) {
              return "any character";
            },
            end: function end(expectation) {
              return "end of input";
            },
            other: function other(expectation) {
              return expectation.description;
            }
          };
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }
          function literalEscape(s) {
            return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
              return "\\x0" + hex(ch);
            }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
              return "\\x" + hex(ch);
            });
          }
          function classEscape(s) {
            return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
              return "\\x0" + hex(ch);
            }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
              return "\\x" + hex(ch);
            });
          }
          function describeExpectation(expectation) {
            return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
          }
          function describeExpected(expected2) {
            var descriptions = new Array(expected2.length), i, j;
            for (i = 0; i < expected2.length; i++) {
              descriptions[i] = describeExpectation(expected2[i]);
            }
            descriptions.sort();
            if (descriptions.length > 0) {
              for (i = 1, j = 1; i < descriptions.length; i++) {
                if (descriptions[i - 1] !== descriptions[i]) {
                  descriptions[j] = descriptions[i];
                  j++;
                }
              }
              descriptions.length = j;
            }
            switch (descriptions.length) {
              case 1:
                return descriptions[0];
              case 2:
                return descriptions[0] + " or " + descriptions[1];
              default:
                return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
            }
          }
          function describeFound(found2) {
            return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
          }
          return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
        };
        function peg$parse(input, options) {
          options = options !== void 0 ? options : {};
          var peg$FAILED = {}, peg$startRuleFunctions = {
            start: peg$parsestart
          }, peg$startRuleFunction = peg$parsestart, peg$c0 = function peg$c02(c) {
            return c;
          }, peg$c1 = function peg$c110(cl, con, co) {
            return new Pride.FieldTree.FieldBoolean(con, cl, co);
          }, peg$c2 = function peg$c210(first2, rest2) {
            if (rest2) {
              return [first2, rest2];
            } else {
              return first2;
            }
          }, peg$c3 = function peg$c36(rest2) {
            return rest2;
          }, peg$c4 = ":", peg$c5 = peg$literalExpectation(":", false), peg$c6 = function peg$c62(fieldName, list) {
            return new Pride.FieldTree.Field(fieldName, list);
          }, peg$c7 = function peg$c72(list) {
            return new Pride.FieldTree.Field(defaultFieldName, list);
          }, peg$c8 = function peg$c82(string) {
            return string.join("");
          }, peg$c9 = function peg$c92(first2, rest2) {
            if (rest2) {
              return first2.concat(rest2);
            } else {
              return first2;
            }
          }, peg$c10 = function peg$c102(first2, rest2) {
            return [new Pride.FieldTree.Literal(first2 + rest2.join(""))];
          }, peg$c11 = function peg$c112(string) {
            return [new Pride.FieldTree.Literal(string.join(""))];
          }, peg$c12 = function peg$c122(literal) {
            return [new Pride.FieldTree.Literal('"' + literal.join("") + '"')];
          }, peg$c13 = function peg$c132(conj) {
            return conj;
          }, peg$c14 = "AND", peg$c15 = peg$literalExpectation("AND", false), peg$c16 = "OR", peg$c17 = peg$literalExpectation("OR", false), peg$c18 = "NOT", peg$c19 = peg$literalExpectation("NOT", false), peg$c20 = "'", peg$c21 = peg$literalExpectation("'", false), peg$c22 = /^[^']/, peg$c23 = peg$classExpectation(["'"], true, false), peg$c24 = '"', peg$c25 = peg$literalExpectation('"', false), peg$c26 = /^[^"]/, peg$c27 = peg$classExpectation(['"'], true, false), peg$c28 = /^[^ \t\r\n:'"()]/, peg$c29 = peg$classExpectation([" ", "	", "\r", "\n", ":", "'", '"', "(", ")"], true, false), peg$c30 = /^[^ \t\r\n():]/, peg$c31 = peg$classExpectation([" ", "	", "\r", "\n", "(", ")", ":"], true, false), peg$c32 = /^[^ \t\r\n'"():]/, peg$c33 = peg$classExpectation([" ", "	", "\r", "\n", "'", '"', "(", ")", ":"], true, false), peg$c34 = /^[ \t\r\n]/, peg$c35 = peg$classExpectation([" ", "	", "\r", "\n"], false, false), peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{
            line: 1,
            column: 1
          }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
          if ("startRule" in options) {
            if (!(options.startRule in peg$startRuleFunctions)) {
              throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
            }
            peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
          }
          function text() {
            return input.substring(peg$savedPos, peg$currPos);
          }
          function location() {
            return peg$computeLocation(peg$savedPos, peg$currPos);
          }
          function expected(description, location2) {
            location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
            throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location2);
          }
          function error2(message, location2) {
            location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
            throw peg$buildSimpleError(message, location2);
          }
          function peg$literalExpectation(text2, ignoreCase) {
            return {
              type: "literal",
              text: text2,
              ignoreCase
            };
          }
          function peg$classExpectation(parts, inverted, ignoreCase) {
            return {
              type: "class",
              parts,
              inverted,
              ignoreCase
            };
          }
          function peg$anyExpectation() {
            return {
              type: "any"
            };
          }
          function peg$endExpectation() {
            return {
              type: "end"
            };
          }
          function peg$otherExpectation(description) {
            return {
              type: "other",
              description
            };
          }
          function peg$computePosDetails(pos) {
            var details = peg$posDetailsCache[pos], p;
            if (details) {
              return details;
            } else {
              p = pos - 1;
              while (!peg$posDetailsCache[p]) {
                p--;
              }
              details = peg$posDetailsCache[p];
              details = {
                line: details.line,
                column: details.column
              };
              while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                  details.line++;
                  details.column = 1;
                } else {
                  details.column++;
                }
                p++;
              }
              peg$posDetailsCache[pos] = details;
              return details;
            }
          }
          function peg$computeLocation(startPos, endPos) {
            var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
            return {
              start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
              },
              end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
              }
            };
          }
          function peg$fail(expected2) {
            if (peg$currPos < peg$maxFailPos) {
              return;
            }
            if (peg$currPos > peg$maxFailPos) {
              peg$maxFailPos = peg$currPos;
              peg$maxFailExpected = [];
            }
            peg$maxFailExpected.push(expected2);
          }
          function peg$buildSimpleError(message, location2) {
            return new peg$SyntaxError(message, null, null, location2);
          }
          function peg$buildStructuredError(expected2, found, location2) {
            return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected2, found), expected2, found, location2);
          }
          function peg$parsestart() {
            var s0, s1, s2;
            s0 = peg$currPos;
            s1 = peg$parsecoordination();
            if (s1 !== peg$FAILED) {
              s2 = peg$parseOPTSPACE();
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c0(s1);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            return s0;
          }
          function peg$parsecoordination() {
            var s0, s1, s2, s3, s4, s5;
            s0 = peg$currPos;
            s1 = peg$parseclause();
            if (s1 !== peg$FAILED) {
              s2 = peg$parse_();
              if (s2 !== peg$FAILED) {
                s3 = peg$parseconj();
                if (s3 !== peg$FAILED) {
                  s4 = peg$parse_();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsecoordination();
                    if (s5 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c1(s1, s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$parseclause_list();
            }
            return s0;
          }
          function peg$parseclause_list() {
            var s0, s1, s2;
            s0 = peg$parseclause();
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parseclause();
              if (s1 !== peg$FAILED) {
                s2 = peg$parseclause_rest();
                if (s2 === peg$FAILED) {
                  s2 = null;
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c2(s1, s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            }
            return s0;
          }
          function peg$parseclause_rest() {
            var s0, s1, s2;
            s0 = peg$currPos;
            s1 = peg$parse_();
            if (s1 !== peg$FAILED) {
              s2 = peg$parseclause_list();
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c3(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            return s0;
          }
          function peg$parseclause() {
            var s0, s1, s2, s3;
            s0 = peg$currPos;
            s1 = peg$parsefield();
            if (s1 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 58) {
                s2 = peg$c4;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c5);
                }
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parseliteral_list();
                if (s3 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c6(s1, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parseliteral_list();
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c7(s1);
              }
              s0 = s1;
            }
            return s0;
          }
          function peg$parsefield() {
            var s0, s1, s2;
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parseFIELDCHAR();
            if (s2 !== peg$FAILED) {
              while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parseFIELDCHAR();
              }
            } else {
              s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c8(s1);
            }
            s0 = s1;
            return s0;
          }
          function peg$parseliteral_list() {
            var s0, s1, s2;
            s0 = peg$currPos;
            s1 = peg$parseliteral();
            if (s1 !== peg$FAILED) {
              s2 = peg$parseliteral_rest();
              if (s2 === peg$FAILED) {
                s2 = null;
              }
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c9(s1, s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            return s0;
          }
          function peg$parseliteral_rest() {
            var s0, s1, s2;
            s0 = peg$currPos;
            s1 = peg$parse_();
            if (s1 !== peg$FAILED) {
              s2 = peg$parseliteral_list();
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c3(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            return s0;
          }
          function peg$parseliteral() {
            var s0, s1, s2, s3, s4;
            s0 = peg$currPos;
            s1 = peg$currPos;
            peg$silentFails++;
            s2 = peg$parseCONJ();
            peg$silentFails--;
            if (s2 === peg$FAILED) {
              s1 = void 0;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parseWORD();
              if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseQWORD();
                if (s4 !== peg$FAILED) {
                  while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parseQWORD();
                  }
                } else {
                  s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c10(s2, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$currPos;
              peg$silentFails++;
              s2 = peg$parseCONJ();
              peg$silentFails--;
              if (s2 === peg$FAILED) {
                s1 = void 0;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$parseWORD();
                if (s3 !== peg$FAILED) {
                  while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$parseWORD();
                  }
                } else {
                  s2 = peg$FAILED;
                }
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c11(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parseSQUOTE();
                if (s1 !== peg$FAILED) {
                  s2 = [];
                  s3 = peg$parseNONSQUOTE();
                  while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$parseNONSQUOTE();
                  }
                  if (s2 !== peg$FAILED) {
                    s3 = peg$parseSQUOTE();
                    if (s3 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c12(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$parseDQUOTE();
                  if (s1 !== peg$FAILED) {
                    s2 = [];
                    s3 = peg$parseNONDQUOTE();
                    while (s3 !== peg$FAILED) {
                      s2.push(s3);
                      s3 = peg$parseNONDQUOTE();
                    }
                    if (s2 !== peg$FAILED) {
                      s3 = peg$parseDQUOTE();
                      if (s3 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c12(s2);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }
            }
            return s0;
          }
          function peg$parseconj() {
            var s0, s1;
            s0 = peg$currPos;
            s1 = peg$parseCONJ();
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c13(s1);
            }
            s0 = s1;
            return s0;
          }
          function peg$parseCONJ() {
            var s0;
            if (input.substr(peg$currPos, 3) === peg$c14) {
              s0 = peg$c14;
              peg$currPos += 3;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c15);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c16) {
                s0 = peg$c16;
                peg$currPos += 2;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c17);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c18) {
                  s0 = peg$c18;
                  peg$currPos += 3;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c19);
                  }
                }
              }
            }
            return s0;
          }
          function peg$parseSQUOTE() {
            var s0;
            if (input.charCodeAt(peg$currPos) === 39) {
              s0 = peg$c20;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c21);
              }
            }
            return s0;
          }
          function peg$parseNONSQUOTE() {
            var s0;
            if (peg$c22.test(input.charAt(peg$currPos))) {
              s0 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c23);
              }
            }
            return s0;
          }
          function peg$parseDQUOTE() {
            var s0;
            if (input.charCodeAt(peg$currPos) === 34) {
              s0 = peg$c24;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c25);
              }
            }
            return s0;
          }
          function peg$parseNONDQUOTE() {
            var s0;
            if (peg$c26.test(input.charAt(peg$currPos))) {
              s0 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c27);
              }
            }
            return s0;
          }
          function peg$parseFIELDCHAR() {
            var s0;
            if (peg$c28.test(input.charAt(peg$currPos))) {
              s0 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c29);
              }
            }
            return s0;
          }
          function peg$parseQWORD() {
            var s0;
            if (peg$c30.test(input.charAt(peg$currPos))) {
              s0 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c31);
              }
            }
            return s0;
          }
          function peg$parseWORD() {
            var s0;
            if (peg$c32.test(input.charAt(peg$currPos))) {
              s0 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c33);
              }
            }
            return s0;
          }
          function peg$parse_() {
            var s0, s1;
            s0 = [];
            if (peg$c34.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c35);
              }
            }
            if (s1 !== peg$FAILED) {
              while (s1 !== peg$FAILED) {
                s0.push(s1);
                if (peg$c34.test(input.charAt(peg$currPos))) {
                  s1 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c35);
                  }
                }
              }
            } else {
              s0 = peg$FAILED;
            }
            return s0;
          }
          function peg$parseOPTSPACE() {
            var s0;
            s0 = peg$parse_();
            if (s0 === peg$FAILED) {
              s0 = null;
            }
            return s0;
          }
          var defaultFieldName = options.defaultFieldName || "all_fields";
          peg$result = peg$startRuleFunction();
          if (peg$result !== peg$FAILED && peg$currPos === input.length) {
            return peg$result;
          } else {
            if (peg$result !== peg$FAILED && peg$currPos < input.length) {
              peg$fail(peg$endExpectation());
            }
            throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
          }
        }
        return {
          SyntaxError: peg$SyntaxError,
          parse: peg$parse
        };
      }();
      Pride.PreferenceEngine = {
        selectedRecords: null,
        engine: null,
        selected: function selected(record) {
          if (!this.engine) {
            return false;
          }
          return (this.selectedRecords[record.datastore] || {})[record.uid];
        },
        registerEngine: function registerEngine(engine) {
          this.engine = engine;
          if (!engine) {
            return this;
          }
          this.updateSelectedRecords(this.engine.listRecords());
          this.engine.addObserver(function(preferenceEngine) {
            return function(data) {
              preferenceEngine.updateSelectedRecords(data);
            };
          }(this));
          return this;
        },
        blankList: function blankList() {
          return {
            mirlyn: {},
            articlesplus: {},
            databases: {},
            journals: {},
            website: {}
          };
        },
        updateSelectedRecords: function updateSelectedRecords(data) {
          this.selectedRecords = this.selectedRecords || this.blankList();
          if (data.forEach) {
            data.forEach(function(record) {
              this.selectedRecords[record.datastore] = this.selectedRecords[record.datastore] || {};
              this.selectedRecords[record.datastore][record.uid] = true;
            }, this);
            return this;
          }
          for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
              this.selectedRecords[prop] = {};
              data[prop].forEach(function(prop2) {
                return function(record) {
                  this.selectedRecords[prop2][record.uid] = true;
                };
              }(prop), this);
            }
          }
          return this;
        }
      };
    }
  });
  require_pride();
})();
/*! Bundled license information:

reqwest/reqwest.js:
  (*!
    * Reqwest! A general purpose XHR connection manager
    * license MIT (c) Dustin Diaz 2015
    * https://github.com/ded/reqwest
    *)
*/
