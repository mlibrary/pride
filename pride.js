var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// (disabled):xhr2
var require_xhr2 = __commonJS({
  "(disabled):xhr2"() {
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
          XHR2 = require_xhr2();
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

// src/index.js
var src_exports = {};
__export(src_exports, {
  Pride: () => Pride_default
});
module.exports = __toCommonJS(src_exports);

// src/Pride/AllDatastores.js
var AllDatastores = {
  array: [],
  get(uid) {
    return this.array.find((datastore) => {
      return datastore.get("uid") === uid;
    });
  }
};
var AllDatastores_default = AllDatastores;

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

// node_modules/underscore/modules/_setup.js
var VERSION = "1.13.6";
var root = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {};
var ArrayProto = Array.prototype;
var ObjProto = Object.prototype;
var SymbolProto = typeof Symbol !== "undefined" ? Symbol.prototype : null;
var push = ArrayProto.push;
var slice = ArrayProto.slice;
var toString = ObjProto.toString;
var hasOwnProperty = ObjProto.hasOwnProperty;
var supportsArrayBuffer = typeof ArrayBuffer !== "undefined";
var supportsDataView = typeof DataView !== "undefined";
var nativeIsArray = Array.isArray;
var nativeKeys = Object.keys;
var nativeCreate = Object.create;
var nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;
var _isNaN = isNaN;
var _isFinite = isFinite;
var hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
var nonEnumerableProps = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
];
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

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

// node_modules/underscore/modules/isObject.js
function isObject(obj) {
  var type2 = typeof obj;
  return type2 === "function" || type2 === "object" && !!obj;
}

// node_modules/underscore/modules/isNull.js
function isNull(obj) {
  return obj === null;
}

// node_modules/underscore/modules/isUndefined.js
function isUndefined(obj) {
  return obj === void 0;
}

// node_modules/underscore/modules/isBoolean.js
function isBoolean(obj) {
  return obj === true || obj === false || toString.call(obj) === "[object Boolean]";
}

// node_modules/underscore/modules/isElement.js
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

// node_modules/underscore/modules/_tagTester.js
function tagTester(name) {
  var tag = "[object " + name + "]";
  return function(obj) {
    return toString.call(obj) === tag;
  };
}

// node_modules/underscore/modules/isString.js
var isString_default = tagTester("String");

// node_modules/underscore/modules/isNumber.js
var isNumber_default = tagTester("Number");

// node_modules/underscore/modules/isDate.js
var isDate_default = tagTester("Date");

// node_modules/underscore/modules/isRegExp.js
var isRegExp_default = tagTester("RegExp");

// node_modules/underscore/modules/isError.js
var isError_default = tagTester("Error");

// node_modules/underscore/modules/isSymbol.js
var isSymbol_default = tagTester("Symbol");

// node_modules/underscore/modules/isArrayBuffer.js
var isArrayBuffer_default = tagTester("ArrayBuffer");

// node_modules/underscore/modules/isFunction.js
var isFunction = tagTester("Function");
var nodelist = root.document && root.document.childNodes;
if (typeof /./ != "function" && typeof Int8Array != "object" && typeof nodelist != "function") {
  isFunction = function(obj) {
    return typeof obj == "function" || false;
  };
}
var isFunction_default = isFunction;

// node_modules/underscore/modules/_hasObjectTag.js
var hasObjectTag_default = tagTester("Object");

// node_modules/underscore/modules/_stringTagBug.js
var hasStringTagBug = supportsDataView && hasObjectTag_default(new DataView(new ArrayBuffer(8)));
var isIE11 = typeof Map !== "undefined" && hasObjectTag_default(/* @__PURE__ */ new Map());

// node_modules/underscore/modules/isDataView.js
var isDataView = tagTester("DataView");
function ie10IsDataView(obj) {
  return obj != null && isFunction_default(obj.getInt8) && isArrayBuffer_default(obj.buffer);
}
var isDataView_default = hasStringTagBug ? ie10IsDataView : isDataView;

// node_modules/underscore/modules/isArray.js
var isArray_default = nativeIsArray || tagTester("Array");

// node_modules/underscore/modules/_has.js
function has(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
}

// node_modules/underscore/modules/isArguments.js
var isArguments = tagTester("Arguments");
(function() {
  if (!isArguments(arguments)) {
    isArguments = function(obj) {
      return has(obj, "callee");
    };
  }
})();
var isArguments_default = isArguments;

// node_modules/underscore/modules/isFinite.js
function isFinite2(obj) {
  return !isSymbol_default(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
}

// node_modules/underscore/modules/isNaN.js
function isNaN2(obj) {
  return isNumber_default(obj) && _isNaN(obj);
}

// node_modules/underscore/modules/constant.js
function constant(value) {
  return function() {
    return value;
  };
}

// node_modules/underscore/modules/_createSizePropertyCheck.js
function createSizePropertyCheck(getSizeProperty) {
  return function(collection) {
    var sizeProperty = getSizeProperty(collection);
    return typeof sizeProperty == "number" && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
  };
}

// node_modules/underscore/modules/_shallowProperty.js
function shallowProperty(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
}

// node_modules/underscore/modules/_getByteLength.js
var getByteLength_default = shallowProperty("byteLength");

// node_modules/underscore/modules/_isBufferLike.js
var isBufferLike_default = createSizePropertyCheck(getByteLength_default);

// node_modules/underscore/modules/isTypedArray.js
var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function isTypedArray(obj) {
  return nativeIsView ? nativeIsView(obj) && !isDataView_default(obj) : isBufferLike_default(obj) && typedArrayPattern.test(toString.call(obj));
}
var isTypedArray_default = supportsArrayBuffer ? isTypedArray : constant(false);

// node_modules/underscore/modules/_getLength.js
var getLength_default = shallowProperty("length");

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

// node_modules/underscore/modules/isEmpty.js
function isEmpty(obj) {
  if (obj == null)
    return true;
  var length = getLength_default(obj);
  if (typeof length == "number" && (isArray_default(obj) || isString_default(obj) || isArguments_default(obj)))
    return length === 0;
  return getLength_default(keys(obj)) === 0;
}

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

// node_modules/underscore/modules/underscore.js
function _(obj) {
  if (obj instanceof _)
    return obj;
  if (!(this instanceof _))
    return new _(obj);
  this._wrapped = obj;
}
_.VERSION = VERSION;
_.prototype.value = function() {
  return this._wrapped;
};
_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
_.prototype.toString = function() {
  return String(this._wrapped);
};

// node_modules/underscore/modules/_toBufferView.js
function toBufferView(bufferSource) {
  return new Uint8Array(
    bufferSource.buffer || bufferSource,
    bufferSource.byteOffset || 0,
    getByteLength_default(bufferSource)
  );
}

// node_modules/underscore/modules/isEqual.js
var tagDataView = "[object DataView]";
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
var forEachName = "forEach";
var hasName = "has";
var commonInit = ["clear", "delete"];
var mapTail = ["get", hasName, "set"];
var mapMethods = commonInit.concat(forEachName, mapTail);
var weakMapMethods = commonInit.concat(mapTail);
var setMethods = ["add"].concat(commonInit, forEachName, hasName);

// node_modules/underscore/modules/isMap.js
var isMap_default = isIE11 ? ie11fingerprint(mapMethods) : tagTester("Map");

// node_modules/underscore/modules/isWeakMap.js
var isWeakMap_default = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester("WeakMap");

// node_modules/underscore/modules/isSet.js
var isSet_default = isIE11 ? ie11fingerprint(setMethods) : tagTester("Set");

// node_modules/underscore/modules/isWeakSet.js
var isWeakSet_default = tagTester("WeakSet");

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

// node_modules/underscore/modules/invert.js
function invert(obj) {
  var result2 = {};
  var _keys = keys(obj);
  for (var i = 0, length = _keys.length; i < length; i++) {
    result2[obj[_keys[i]]] = _keys[i];
  }
  return result2;
}

// node_modules/underscore/modules/functions.js
function functions(obj) {
  var names = [];
  for (var key in obj) {
    if (isFunction_default(obj[key]))
      names.push(key);
  }
  return names.sort();
}

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

// node_modules/underscore/modules/extend.js
var extend_default = createAssigner(allKeys);

// node_modules/underscore/modules/extendOwn.js
var extendOwn_default = createAssigner(keys);

// node_modules/underscore/modules/defaults.js
var defaults_default = createAssigner(allKeys, true);

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

// node_modules/underscore/modules/create.js
function create(prototype, props) {
  var result2 = baseCreate(prototype);
  if (props)
    extendOwn_default(result2, props);
  return result2;
}

// node_modules/underscore/modules/clone.js
function clone(obj) {
  if (!isObject(obj))
    return obj;
  return isArray_default(obj) ? obj.slice() : extend_default({}, obj);
}

// node_modules/underscore/modules/tap.js
function tap(obj, interceptor) {
  interceptor(obj);
  return obj;
}

// node_modules/underscore/modules/toPath.js
function toPath(path) {
  return isArray_default(path) ? path : [path];
}
_.toPath = toPath;

// node_modules/underscore/modules/_toPath.js
function toPath2(path) {
  return _.toPath(path);
}

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

// node_modules/underscore/modules/get.js
function get(object2, path, defaultValue) {
  var value = deepGet(object2, toPath2(path));
  return isUndefined(value) ? defaultValue : value;
}

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

// node_modules/underscore/modules/identity.js
function identity(value) {
  return value;
}

// node_modules/underscore/modules/matcher.js
function matcher(attrs) {
  attrs = extendOwn_default({}, attrs);
  return function(obj) {
    return isMatch(obj, attrs);
  };
}

// node_modules/underscore/modules/property.js
function property(path) {
  path = toPath2(path);
  return function(obj) {
    return deepGet(obj, path);
  };
}

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

// node_modules/underscore/modules/iteratee.js
function iteratee(value, context2) {
  return baseIteratee(value, context2, Infinity);
}
_.iteratee = iteratee;

// node_modules/underscore/modules/_cb.js
function cb(value, context2, argCount) {
  if (_.iteratee !== iteratee)
    return _.iteratee(value, context2);
  return baseIteratee(value, context2, argCount);
}

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

// node_modules/underscore/modules/noop.js
function noop2() {
}

// node_modules/underscore/modules/propertyOf.js
function propertyOf(obj) {
  if (obj == null)
    return noop2;
  return function(path) {
    return get(obj, path);
  };
}

// node_modules/underscore/modules/times.js
function times(n, iteratee2, context2) {
  var accum = Array(Math.max(0, n));
  iteratee2 = optimizeCb(iteratee2, context2, 1);
  for (var i = 0; i < n; i++)
    accum[i] = iteratee2(i);
  return accum;
}

// node_modules/underscore/modules/random.js
function random(min2, max2) {
  if (max2 == null) {
    max2 = min2;
    min2 = 0;
  }
  return min2 + Math.floor(Math.random() * (max2 - min2 + 1));
}

// node_modules/underscore/modules/now.js
var now_default = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};

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

// node_modules/underscore/modules/_escapeMap.js
var escapeMap_default = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

// node_modules/underscore/modules/escape.js
var escape_default = createEscaper(escapeMap_default);

// node_modules/underscore/modules/_unescapeMap.js
var unescapeMap_default = invert(escapeMap_default);

// node_modules/underscore/modules/unescape.js
var unescape_default = createEscaper(unescapeMap_default);

// node_modules/underscore/modules/templateSettings.js
var templateSettings_default = _.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};

// node_modules/underscore/modules/template.js
var noMatch = /(.)^/;
var escapes = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
};
var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
function escapeChar(match) {
  return "\\" + escapes[match];
}
var bareIdentifier = /^\s*(\w|\$)+\s*$/;
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
  text.replace(matcher2, function(match, escape2, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
    index = offset + match.length;
    if (escape2) {
      source += "'+\n((__t=(" + escape2 + "))==null?'':_.escape(__t))+\n'";
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

// node_modules/underscore/modules/uniqueId.js
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter + "";
  return prefix ? prefix + id : id;
}

// node_modules/underscore/modules/chain.js
function chain(obj) {
  var instance = _(obj);
  instance._chain = true;
  return instance;
}

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

// node_modules/underscore/modules/partial.js
var partial = restArguments(function(func, boundArgs) {
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
var partial_default = partial;

// node_modules/underscore/modules/bind.js
var bind_default = restArguments(function(func, context2, args) {
  if (!isFunction_default(func))
    throw new TypeError("Bind must be called on a function");
  var bound = restArguments(function(callArgs) {
    return executeBound(func, bound, context2, this, args.concat(callArgs));
  });
  return bound;
});

// node_modules/underscore/modules/_isArrayLike.js
var isArrayLike_default = createSizePropertyCheck(getLength_default);

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

// node_modules/underscore/modules/bindAll.js
var bindAll_default = restArguments(function(obj, keys2) {
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

// node_modules/underscore/modules/delay.js
var delay_default = restArguments(function(func, wait, args) {
  return setTimeout(function() {
    return func.apply(null, args);
  }, wait);
});

// node_modules/underscore/modules/defer.js
var defer_default = partial_default(delay_default, _, 1);

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

// node_modules/underscore/modules/wrap.js
function wrap(func, wrapper) {
  return partial_default(wrapper, func);
}

// node_modules/underscore/modules/negate.js
function negate(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}

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

// node_modules/underscore/modules/after.js
function after(times2, func) {
  return function() {
    if (--times2 < 1) {
      return func.apply(this, arguments);
    }
  };
}

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

// node_modules/underscore/modules/once.js
var once_default = partial_default(before, 2);

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

// node_modules/underscore/modules/findIndex.js
var findIndex_default = createPredicateIndexFinder(1);

// node_modules/underscore/modules/findLastIndex.js
var findLastIndex_default = createPredicateIndexFinder(-1);

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

// node_modules/underscore/modules/indexOf.js
var indexOf_default = createIndexFinder(1, findIndex_default, sortedIndex);

// node_modules/underscore/modules/lastIndexOf.js
var lastIndexOf_default = createIndexFinder(-1, findLastIndex_default);

// node_modules/underscore/modules/find.js
function find(obj, predicate, context2) {
  var keyFinder = isArrayLike_default(obj) ? findIndex_default : findKey;
  var key = keyFinder(obj, predicate, context2);
  if (key !== void 0 && key !== -1)
    return obj[key];
}

// node_modules/underscore/modules/findWhere.js
function findWhere(obj, attrs) {
  return find(obj, matcher(attrs));
}

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

// node_modules/underscore/modules/reduce.js
var reduce_default = createReduce(1);

// node_modules/underscore/modules/reduceRight.js
var reduceRight_default = createReduce(-1);

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

// node_modules/underscore/modules/reject.js
function reject(obj, predicate, context2) {
  return filter(obj, negate(cb(predicate)), context2);
}

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

// node_modules/underscore/modules/contains.js
function contains(obj, item, fromIndex, guard) {
  if (!isArrayLike_default(obj))
    obj = values(obj);
  if (typeof fromIndex != "number" || guard)
    fromIndex = 0;
  return indexOf_default(obj, item, fromIndex) >= 0;
}

// node_modules/underscore/modules/invoke.js
var invoke_default = restArguments(function(obj, path, args) {
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

// node_modules/underscore/modules/pluck.js
function pluck(obj, key) {
  return map(obj, property(key));
}

// node_modules/underscore/modules/where.js
function where(obj, attrs) {
  return filter(obj, matcher(attrs));
}

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

// node_modules/underscore/modules/toArray.js
var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
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

// node_modules/underscore/modules/shuffle.js
function shuffle(obj) {
  return sample(obj, Infinity);
}

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

// node_modules/underscore/modules/groupBy.js
var groupBy_default = group(function(result2, value, key) {
  if (has(result2, key))
    result2[key].push(value);
  else
    result2[key] = [value];
});

// node_modules/underscore/modules/indexBy.js
var indexBy_default = group(function(result2, value, key) {
  result2[key] = value;
});

// node_modules/underscore/modules/countBy.js
var countBy_default = group(function(result2, value, key) {
  if (has(result2, key))
    result2[key]++;
  else
    result2[key] = 1;
});

// node_modules/underscore/modules/partition.js
var partition_default = group(function(result2, value, pass) {
  result2[pass ? 0 : 1].push(value);
}, true);

// node_modules/underscore/modules/size.js
function size(obj) {
  if (obj == null)
    return 0;
  return isArrayLike_default(obj) ? obj.length : keys(obj).length;
}

// node_modules/underscore/modules/_keyInObj.js
function keyInObj(value, key, obj) {
  return key in obj;
}

// node_modules/underscore/modules/pick.js
var pick_default = restArguments(function(obj, keys2) {
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

// node_modules/underscore/modules/omit.js
var omit_default = restArguments(function(obj, keys2) {
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

// node_modules/underscore/modules/initial.js
function initial(array, n, guard) {
  return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
}

// node_modules/underscore/modules/first.js
function first(array, n, guard) {
  if (array == null || array.length < 1)
    return n == null || guard ? void 0 : [];
  if (n == null || guard)
    return array[0];
  return initial(array, array.length - n);
}

// node_modules/underscore/modules/rest.js
function rest(array, n, guard) {
  return slice.call(array, n == null || guard ? 1 : n);
}

// node_modules/underscore/modules/last.js
function last(array, n, guard) {
  if (array == null || array.length < 1)
    return n == null || guard ? void 0 : [];
  if (n == null || guard)
    return array[array.length - 1];
  return rest(array, Math.max(0, array.length - n));
}

// node_modules/underscore/modules/compact.js
function compact(array) {
  return filter(array, Boolean);
}

// node_modules/underscore/modules/flatten.js
function flatten2(array, depth) {
  return flatten(array, depth, false);
}

// node_modules/underscore/modules/difference.js
var difference_default = restArguments(function(array, rest2) {
  rest2 = flatten(rest2, true, true);
  return filter(array, function(value) {
    return !contains(rest2, value);
  });
});

// node_modules/underscore/modules/without.js
var without_default = restArguments(function(array, otherArrays) {
  return difference_default(array, otherArrays);
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

// node_modules/underscore/modules/union.js
var union_default = restArguments(function(arrays) {
  return uniq(flatten(arrays, true, true));
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

// node_modules/underscore/modules/unzip.js
function unzip(array) {
  var length = array && max(array, getLength_default).length || 0;
  var result2 = Array(length);
  for (var index = 0; index < length; index++) {
    result2[index] = pluck(array, index);
  }
  return result2;
}

// node_modules/underscore/modules/zip.js
var zip_default = restArguments(unzip);

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

// node_modules/underscore/modules/_chainResult.js
function chainResult(instance, obj) {
  return instance._chain ? _(obj).chain() : obj;
}

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

// node_modules/underscore/modules/underscore-array-methods.js
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
var underscore_array_methods_default = _;

// node_modules/underscore/modules/index-default.js
var _2 = mixin(modules_exports);
_2._ = _2;
var index_default_default = _2;

// src/Pride/Util/deepClone.js
var deepClone = function(original) {
  if (!original || typeof original === "function") {
    return original;
  }
  return JSON.parse(JSON.stringify(original));
};
var deepClone_default = deepClone;

// src/Pride/Util/Paginator/getPossibleKeys.js
var getPossibleKeys = [
  "start",
  "count",
  "end",
  "page",
  "index_limit",
  "total_pages",
  "total_available",
  "page_limit"
];
var getPossibleKeys_default = getPossibleKeys;

// src/Pride/Util/Paginator/index.js
var Paginator = class {
  constructor(initialValues) {
    this.values = {
      count: 0,
      end: 0,
      index_limit: Infinity,
      page: 0,
      page_limit: Infinity,
      start: 0,
      total_available: void 0,
      total_pages: void 0
    };
    this.set(initialValues);
  }
  set(newValues) {
    const newValueKeys = Object.keys(newValues);
    ["index_limit", "total_pages"].forEach((property2) => {
      if (newValueKeys.includes(property2)) {
        throw new Error(`Cannot set ${property2} (it is a calculated value)`);
      }
    });
    if (newValueKeys.includes("start") && newValueKeys.includes("end") && newValueKeys.includes("count")) {
      throw new Error("Cannot set start, end, and count all at the same time");
    }
    if (newValueKeys.includes("page") && (newValueKeys.includes("start") || newValueKeys.includes("end"))) {
      throw new Error("Cannot set page as well as the start and/or end");
    }
    newValueKeys.forEach((property2) => {
      if (property2 !== "end") {
        this.values[property2] = newValues[property2];
      }
    });
    if (newValueKeys.includes("page")) {
      this.values.start = this.values.count * (this.values.page - 1);
    }
    if (newValueKeys.includes("end")) {
      if (this.values.start >= newValues.end) {
        throw new Error("The start value cannot be greater than the end value");
      }
      if (newValueKeys.includes("count")) {
        this.values.start = Math.max(0, newValues.end - (this.values.count - 1));
      } else {
        this.values.count = newValues.end - this.values.start + 1;
      }
      this.values.end = newValues.end;
    } else {
      const end = this.values.start + this.values.count - 1;
      this.values.end = end < this.values.start ? this.values.end : end;
    }
    if (typeof this.values.total_available === "number" && this.values.total_available > 0) {
      this.values.index_limit = this.values.total_available - 1;
    }
    if (this.values.count > 0 && this.values.start % this.values.count === 0) {
      this.values.page = Math.floor(this.values.start / this.values.count) + 1;
      if (typeof this.values.total_available === "number") {
        this.values.total_pages = Math.ceil(this.values.total_available / this.values.count);
        this.values.page_limit = this.values.total_pages;
      }
    }
    if (!("start" in this.values) || !("count" in this.values)) {
      throw new Error("Not enough information given to create Paginator");
    }
    return this;
  }
  get(name) {
    return this.values[name];
  }
};
Paginator.getPossibleKeys = getPossibleKeys_default;
var Paginator_default = Paginator;

// src/Pride/Util/Section.js
var Section = class _Section {
  constructor(start, end) {
    this.start = Math.max(Math.min(start, end), 0);
    this.end = Math.max(Math.max(start, end), 0);
  }
  inSection(index) {
    return index >= this.start && index <= this.end;
  }
  overlaps(section) {
    return this.inSection(section.start) || this.inSection(section.end);
  }
  calcLength() {
    return this.end - this.start + 1;
  }
  shifted(startAmount, endAmount = startAmount) {
    return new _Section(this.start + startAmount, this.end + endAmount);
  }
  expanded(amount) {
    return this.shifted(-amount, amount);
  }
};
var Section_default = Section;

// src/Pride/Core/Query.js
var Query = class _Query {
  static paginatorKeys = Paginator_default.getPossibleKeys;
  constructor(queryInfo) {
    this.paginator = new Paginator_default({
      start: queryInfo.start,
      count: queryInfo.count
    });
    this.queryInfo = deepClone_default(queryInfo);
    _Query.paginatorKeys.forEach((paginatorKey) => {
      delete this.queryInfo[paginatorKey];
    });
    this.queryInfo.request_id = this.queryInfo.request_id || 0;
  }
  get(key) {
    if (_Query.paginatorKeys.includes(key)) {
      return this.paginator.get(key);
    }
    return this.queryInfo[key];
  }
  set(newValues) {
    const newPaginationValues = { ...newValues };
    const newQueryValues = { ...newValues };
    _Query.paginatorKeys.forEach((paginatorKey) => {
      if (paginatorKey in newValues) {
        delete newQueryValues[paginatorKey];
      } else {
        delete newPaginationValues[paginatorKey];
      }
    });
    if (Object.keys(newQueryValues).length > 0) {
      this.paginator.set({ total_available: void 0 });
      if (typeof newQueryValues.request_id !== "number") {
        this.queryInfo.request_id += 1;
      }
    }
    this.paginator.set(newPaginationValues);
    this.queryInfo = { ...this.queryInfo, ...newQueryValues };
    return this;
  }
  clone() {
    const fullInfo = deepClone_default(this.queryInfo);
    fullInfo.start = this.paginator.get("start");
    fullInfo.count = this.paginator.get("count");
    return new _Query(fullInfo);
  }
  toSection() {
    return new Section_default(this.get("start"), this.get("end"));
  }
  toLimitSection() {
    return new Section_default(this.get("start"), this.get("index_limit"));
  }
  toJSON() {
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
  }
};
var Query_default = Query;

// src/Pride/Settings.js
var Settings = {
  cache_size: {},
  connection_attempts: 3,
  datastores_url: "",
  default_cache_size: 20,
  init_attempts: 3,
  message_formats: {
    failed_init: "Failed to initialize Pride",
    failed_record_load: "Failed to load $1",
    failed_search_run: "Failed to search $1"
  },
  ms_between_attempts: 1500,
  obnoxious: false
};
var Settings_default = Settings;

// src/Pride/Core/log.js
var log = (source, info, ...message) => {
  if (Settings_default.obnoxious) {
    console.log(`[Pride: ${source}] ${info}`, ...message);
  }
};
var log_default = log;

// src/Pride/Util/FuncBuffer.js
var FuncBuffer = function(extension) {
  let buffer = {};
  this.clear = (name) => {
    delete buffer[name];
    return this;
  };
  this.clearAll = () => {
    buffer = {};
    return this;
  };
  const safeGet = (name) => {
    buffer[name] ??= [];
    return buffer[name];
  };
  this.add = (func, name) => {
    safeGet(name).push(func);
    return this;
  };
  this.remove = (func, name) => {
    buffer[name] = safeGet(name).filter((otherFunc) => {
      return func !== otherFunc;
    });
    return this;
  };
  this.apply = (name, args = []) => {
    safeGet(name).forEach((func) => {
      func?.(...args);
    });
    return this;
  };
  this.call = (name, ...args) => {
    this.apply(name, args);
    return this;
  };
  if (typeof extension === "function")
    extension.call(this);
};
var FuncBuffer_default = FuncBuffer;

// src/Pride/Messenger.js
var Messenger = new FuncBuffer_default(function() {
  this.addObserver = this.add;
  this.removeObserver = this.remove;
  this.clearObservers = this.clear;
  this.add = this.remove = this.clear = void 0;
  this.sendMessage = (message) => {
    if (message.summary) {
      message.class = message.class || "info";
      message.details = message.details || "";
      this.call(message.class, message);
      log_default("Messenger", "MESSAGE SENT", message);
    }
    return this;
  };
  this.sendMessageArray = (messageArray) => {
    if (messageArray && messageArray.length > 0) {
      messageArray.forEach((message) => {
        this.sendMessage(message);
      });
    }
    return this;
  };
  this.preset = function(type2) {
  };
});
var Messenger_default = Messenger;

// src/Pride/Core/SearchBase.js
var SearchBase = function(setup, parent) {
  this.datastore = setup.datastore;
  this.query = setup.query || this.datastore.baseQuery();
  const self2 = this;
  const requestFunc = setup.requestFunc || this.datastore.runQuery;
  let results = setup.starting_results || [];
  const defaultCacheSize = setup.cache_size || Settings_default.cache_size[this.datastore.uid] || Settings_default.default_cache_size;
  this.log = function(...args) {
    const message = ["Search (" + self2.datastore.get("uid") + ")", ...args];
    log_default.apply(window, message);
  };
  this.set = function(setHash) {
    self2.query.set(setHash);
    self2.setDataChanged?.apply(this);
    if (!index_default_default.isEmpty(index_default_default.omit(setHash, getPossibleKeys_default))) {
      results = [];
    }
    return self2;
  };
  this.run = function(cacheSize) {
    self2.resultsChanged?.apply(this);
    if (index_default_default.isUndefined(cacheSize)) {
      cacheSize = defaultCacheSize;
    }
    requestResults(
      getMissingSection(
        self2.query.toSection().expanded(cacheSize)
      )
    );
    return self2;
  };
  this.results = function() {
    return resultsPiece(new Section_default(
      self2.query.get("start"),
      Math.min(self2.query.get("end"), self2.query.get("index_limit"))
    ));
  };
  const requestResults = function(requestedSection) {
    self2.log("REQUESTING", requestedSection);
    self2.log("TOTAL AVAILABLE (pre-request)", self2.query.get("total_available"));
    if (requestedSection && self2.query.toLimitSection().overlaps(requestedSection)) {
      self2.log("Sending query...");
      const newQuery = self2.query.clone().set({
        start: requestedSection.start,
        count: requestedSection.calcLength()
      });
      requestFunc({
        query: newQuery,
        failure_message: Messenger_default.preset(
          "failed_search_run",
          self2.datastore.get("metadata").name
        ),
        success: function(responseData) {
          if (responseData.request.request_id === self2.query.get("request_id")) {
            updateData(responseData);
            addResults(responseData.response, newQuery.get("start"));
            const responseLength = responseData.response.length;
            if (responseLength !== 0 && responseLength < newQuery.get("count")) {
              requestResults(
                requestedSection.shifted(responseLength, 0)
              );
            }
          }
        }
      });
    } else {
      self2.runDataChanged?.apply(this);
    }
  };
  const addResults = function(newItemsArray, offset) {
    let queryResultsAdded = false;
    self2.log("NEW RECORDS", newItemsArray);
    index_default_default.each(newItemsArray, function(itemData, arrayIndex) {
      const itemIndex = arrayIndex + offset;
      if (index_default_default.isUndefined(results[itemIndex])) {
        results[itemIndex] = self2.createItem?.apply(this, [itemData]);
        if (self2.query.toSection().inSection(itemIndex)) {
          queryResultsAdded = true;
        }
      }
    });
    self2.log("CACHE LENGTH", results.length);
    if (queryResultsAdded || index_default_default.isEmpty(newItemsArray)) {
      self2.resultsChanged?.apply(this);
    }
  };
  const updateData = function(responseData) {
    self2.datastore.update(responseData.datastore);
    const newQueryData = index_default_default.omit(responseData.new_request, "start", "count");
    newQueryData.specialists = responseData.specialists;
    newQueryData.total_available = responseData.total_available;
    self2.query.set(newQueryData);
    self2.runDataChanged?.apply(this);
  };
  const getMissingSection = function(section) {
    const list = resultsPiece(section);
    let start = index_default_default.indexOf(list, void 0);
    if (start !== -1) {
      const end = section.start + index_default_default.lastIndexOf(list, void 0);
      start += section.start;
      return new Section_default(start, end);
    }
  };
  const resultsPiece = function(section) {
    const output = [];
    for (let index = section.start; index <= section.end; index++) {
      output.push(results[index]);
    }
    return output;
  };
  let muted = false;
  const observables = [];
  const mutableObservables = [];
  this.clearAllObservers = function() {
    index_default_default.each(observables, function(observable) {
      observable.clearAll();
    });
    self2.initialize_observables?.apply(this);
    return self2;
  };
  this.getMute = function() {
    return muted;
  };
  this.setMute = function(state) {
    if (state !== muted) {
      muted = state;
      self2.muteChanged?.apply(this);
      if (!muted) {
        index_default_default.each(mutableObservables, function(observable) {
          observable.notify();
        });
      }
    }
    return self2;
  };
  this.createObservable = function(name, dataFunc, neverMute) {
    const object2 = new FuncBuffer_default(function() {
      const addObserver = this.add;
      const callObservers = this.call;
      observables.push(this);
      if (!neverMute)
        mutableObservables.push(this);
      this.add = function(func) {
        if (!self2.muted || neverMute)
          func(dataFunc());
        addObserver(func, "observers");
        return this;
      };
      this.notify = function() {
        if (!self2.muted || neverMute) {
          const data = dataFunc();
          self2.log("NOTIFY (" + name + ")", data);
          callObservers("observers", data);
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
  parent.set = function(setHash) {
    self2.set(setHash);
    return parent;
  };
  parent.run = function(cacheSize) {
    self2.run(cacheSize);
    return parent;
  };
  parent.nextPage = function(cacheSize) {
    const currentPage = self2.query.get("page");
    if (index_default_default.isNumber(currentPage) && currentPage < self2.query.get("page_limit")) {
      parent.set({ page: currentPage + 1 });
      parent.run(cacheSize);
    }
    return parent;
  };
  parent.prevPage = function(cacheSize) {
    const currentPage = self2.query.get("page");
    if (index_default_default.isNumber(currentPage) && currentPage > 1) {
      parent.set({ page: currentPage - 1 });
      parent.run(cacheSize);
    }
    return parent;
  };
};
var SearchBase_default = SearchBase;

// src/Pride/Util/request.js
var import_reqwest = __toESM(require_reqwest());
var request = function(requestInfo) {
  log_default("Request", "Sending HTTP request...");
  log_default("Request", "URL", requestInfo.url);
  log_default("Request", "CONTENT", JSON.stringify(requestInfo.query));
  if (!requestInfo.url)
    throw new Error("No URL given to Pride.Util.request()");
  let requestMethod = "get";
  if (requestInfo.query)
    requestMethod = "post";
  if (typeof requestInfo.attempts !== "number") {
    requestInfo.attempts = Settings_default.connection_attempts;
  }
  requestInfo.attempts -= 1;
  (0, import_reqwest.default)({
    url: requestInfo.url,
    data: JSON.stringify(requestInfo.query),
    type: "json",
    method: requestMethod,
    contentType: "application/json",
    withCredentials: true,
    error: function(error2) {
      if (requestInfo.attempts <= 0) {
        log_default("Request", "ERROR", error2);
        requestInfo.failure?.(error2);
        Messenger_default.sendMessage({
          summary: requestInfo.failure_message,
          class: "error"
        });
      } else {
        log_default("Request", "Trying request again...");
        window.setTimeout(() => {
          return request(requestInfo);
        }, Settings_default.ms_between_attempts);
      }
    },
    success: function(response) {
      log_default("Request", "SUCCESS", response);
      requestInfo.success?.(response);
      Messenger_default.sendMessage({
        summary: requestInfo.success_message,
        class: "success"
      });
      Messenger_default.sendMessageArray(response.messages);
    }
  });
};
var request_default = request;

// src/Pride/Util/RequestBuffer.js
var RequestBuffer = class {
  #funcBuffer;
  #requestIssued = false;
  #requestSuccessful = false;
  #requestFailed = false;
  #cachedResponseData;
  requestOptions;
  constructor(requestOptions = {}) {
    this.#funcBuffer = new FuncBuffer_default();
    this.requestOptions = requestOptions;
  }
  request = (funcHash) => {
    this.#funcBuffer.add(funcHash.success, "success").add(funcHash.failure, "failure");
    if (this.#requestIssued) {
      this.#callWithResponse();
    } else {
      this.#sendRequest();
    }
    return this;
  };
  #callWithResponse = (data) => {
    this.#cachedResponseData = data ?? this.#cachedResponseData;
    if (this.#requestSuccessful) {
      this.#callThenClear("success");
    } else if (this.#requestFailed) {
      this.#callThenClear("failure");
    }
  };
  #sendRequest = () => {
    this.#requestIssued = true;
    const requestOptions = this.requestOptions;
    request_default({
      url: typeof requestOptions.url === "function" ? requestOptions.url() : requestOptions.url,
      attempts: requestOptions.attempts?.() || Settings_default.connection_attempts,
      failure_message: requestOptions.failure_message?.(),
      failure: (error2) => {
        this.#requestFailed = true;
        requestOptions.before_failure?.(error2);
        this.#callWithResponse(error2);
        requestOptions.after_failure?.(error2);
      },
      success: (response) => {
        this.#requestSuccessful = true;
        requestOptions.before_success?.(response);
        response = typeof requestOptions.edit_response === "function" ? requestOptions.edit_response(response) : response;
        this.#callWithResponse(response);
        requestOptions.after_success?.(response);
      }
    });
  };
  #callThenClear = (name) => {
    this.#funcBuffer.call(name, this.#cachedResponseData).clearAll();
  };
};
var RequestBuffer_default = RequestBuffer;

// src/Pride/Core/Holdings.js
var Holdings = class {
  constructor(data) {
    this.data = data;
  }
  getData(func) {
    const dataField = this.data.fields.find((field) => {
      return field.uid === "resource_access";
    });
    const resourceAccessValue = dataField?.value ?? dataField;
    func([resourceAccessValue].concat(this.data.holdings || []));
  }
};
var Holdings_default = Holdings;

// src/Pride/Core/GetThis.js
var GetThis = class {
  constructor(barcode, data) {
    this.barcode = barcode;
    this.data = data;
    this.requestBuffer = new RequestBuffer_default({
      url: `${this.getGetThisUrl(data)}/${this.barcode}`,
      failure_message: Messenger_default.preset("failed_get_this_load", data.names[0]),
      edit_response: (response) => {
        this.data = this.translateData(response);
        return this.data;
      }
    });
  }
  getGetThisUrl(data) {
    const ret = data.fields.find((field) => {
      return field.uid === "get_this_url";
    });
    return ret?.value;
  }
  translateData(input) {
    return input;
  }
  getData(func) {
    this.requestBuffer.request({ success: func });
  }
};
var GetThis_default = GetThis;

// src/Pride/Util/escape.js
var escape = (string) => {
  const tempElement = document.createElement("div");
  tempElement.appendChild(document.createTextNode(string));
  return tempElement.innerHTML;
};
var escape_default2 = escape;

// src/Pride/PreferenceEngine.js
var PreferenceEngine = {
  selectedRecords: null,
  engine: null,
  updateSelectedRecords(data) {
    this.selectedRecords ||= {
      mirlyn: {},
      articlesplus: {},
      databases: {},
      journals: {},
      website: {}
    };
    if (Array.isArray(data)) {
      data.forEach((record) => {
        this.selectedRecords[record.datastore] ||= {};
        this.selectedRecords[record.datastore][record.uid] = true;
      });
    } else {
      Object.keys(data).forEach((datastore) => {
        this.selectedRecords[datastore] = {};
        data[datastore].forEach((record) => {
          this.selectedRecords[datastore][record.uid] = true;
        });
      });
    }
    return this;
  },
  registerEngine(engine) {
    if (!engine) {
      return this;
    }
    this.engine = engine;
    this.updateSelectedRecords(this.engine.listRecords());
    this.engine.addObserver((data) => {
      this.updateSelectedRecords(data);
    });
    return this;
  },
  selected(record) {
    return !!this.selectedRecords?.[record.datastore]?.[record.uid];
  }
};
var PreferenceEngine_default = PreferenceEngine;

// src/Pride/Core/Record.js
var Record = function(data) {
  const requestBuffer = new RequestBuffer_default({
    url: data.source,
    failure_message: Messenger_default.preset(
      "failed_record_load",
      data.names[0]
    ),
    edit_response: function(response) {
      data = translateData(response);
      return data;
    }
  });
  let holdings = null;
  const getThis = {};
  this.placeHold = function(item, pickupLocation, notNeededAfter, callbackFunction) {
    this.renderFull(function(data2) {
      const getHoldingsUrl = function() {
        let ret;
        index_default_default.each(data2.fields, function(field) {
          if (field.uid === "holdings_url") {
            ret = field.value;
          }
        });
        return ret;
      };
      const response = request_default({
        url: [getHoldingsUrl(), item, pickupLocation, notNeededAfter].join("/"),
        query: true,
        failure: function(data3) {
          Messenger_default.sendMessage({
            summary: "Failed to place hold",
            class: "error"
          });
        },
        success: callbackFunction,
        failure_message: "placeHold failed",
        success_message: "placeHold succeeded"
      });
      console.log(response);
    });
  };
  this.getHoldings = function(func) {
    if (holdings) {
      holdings.getData(func);
    } else if (data.complete) {
      holdings = new Holdings_default(data);
      holdings.getData(func);
    } else {
      requestBuffer.request({
        success: function(data2) {
          holdings = new Holdings_default(data2);
          holdings.getData(func);
        }
      });
    }
  };
  this.getGetThis = function(barcode, func) {
    if (getThis[barcode]) {
      getThis[barcode].getData(func);
    } else if (data.complete) {
      getThis[barcode] = new GetThis_default(barcode, data);
      getThis[barcode].getData(func);
    } else {
      requestBuffer.request({
        success: function(data2) {
          getThis[barcode] = new GetThis_default(barcode, data2);
          getThis[barcode].getData(func);
        }
      });
    }
  };
  this.renderPart = function(func) {
    callWithData(func);
  };
  this.renderPartThenCache = function(func) {
    callWithData(func);
    requestBuffer.request();
  };
  this.renderFull = function(func) {
    if (data.complete) {
      callWithData(func);
    } else {
      requestBuffer.request({ success: func });
    }
  };
  this.renderCSL = function(func) {
    this.renderFull(function(data2) {
      let ret;
      index_default_default.each(data2.fields, function(field) {
        if (field.uid === "csl") {
          ret = field.value;
        }
      });
      func(ret);
    });
  };
  const callWithData = function(func) {
    func(index_default_default.omit(data, "complete", "source"), data.complete);
  };
  const translateData = function(newData) {
    newData.fields = index_default_default.map(
      newData.fields,
      function(field) {
        if (!field.value_has_html) {
          field.value = escape_default2(field.value);
        }
        return index_default_default.omit(field, "value_has_html");
      }
    );
    if (!newData.names_have_html) {
      newData.names = index_default_default.map(
        newData.names,
        function(name) {
          return escape_default2(name);
        }
      );
    }
    if (newData.uid) {
      newData.status = 200;
    } else {
      newData.status = 404;
    }
    if (PreferenceEngine_default.selected(newData)) {
      newData.selected = true;
    }
    return index_default_default.omit(newData, "names_have_html");
  };
  data = translateData(data);
};
var Record_default = Record;

// src/Pride/Core/FacetSearch.js
var FacetSearch = function(setup) {
  this.uid = setup.data.uid;
  this.getData = () => {
    return setup.data;
  };
  this.getResults = () => {
    return setup.results;
  };
  let muted = false;
  this.getMute = () => {
    return muted;
  };
  this.setMute = (state) => {
    muted = state;
    return this;
  };
  this.observables = [];
  const createObservable = (dataFunc) => {
    const self2 = this;
    const object2 = new FuncBuffer_default(function() {
      self2.observables.push(this);
      const addObserver = this.add;
      this.add = function(func) {
        if (!self2.muted)
          func(dataFunc());
        addObserver(func, "observers");
        return this;
      };
    });
    return object2;
  };
  this.resultsObservers = createObservable(this.getResults);
  this.setDataObservers = this.runDataObservers = createObservable(this.getData);
  this.clearAllObservers = () => {
    this.observables.forEach((observable) => {
      observable.clearAll();
    });
    return this;
  };
};
var FacetSearch_default = FacetSearch;

// src/Pride/Core/DatastoreSearch.js
var DatastoreSearch = function(setup) {
  const self2 = this;
  const base = new SearchBase_default(setup, this);
  base.createItem = function(itemData) {
    return new Record_default(itemData);
  };
  let facetSearches = [];
  let currentFacets = [];
  this.getFacets = function() {
    return facetSearches;
  };
  this.uid = base.datastore.get("uid");
  this.getData = function() {
    return {
      uid: self2.uid,
      metadata: deepClone_default(base.datastore.get("metadata")),
      sorts: deepClone_default(base.datastore.get("sorts")),
      selected_sort: base.query.get("sort"),
      facets: deepClone_default(base.query.get("facets")),
      fields: deepClone_default(base.datastore.get("fields")),
      field_tree: deepClone_default(base.query.get("field_tree")),
      settings: deepClone_default(base.query.get("settings")),
      page: base.query.get("page"),
      count: base.query.get("count"),
      total_available: base.query.get("total_available"),
      total_pages: base.query.get("total_pages"),
      page_limit: base.query.get("page_limit"),
      specialists: deepClone_default(base.query.get("specialists"))
    };
  };
  this.getResults = base.results;
  base.initialize_observables = function() {
    self2.runDataObservers.add(function() {
      const facets = base.datastore.get("facets");
      if (JSON.stringify(currentFacets) !== JSON.stringify(facets)) {
        index_default_default.each(facetSearches, function(facetSearch) {
          facetSearch.clearAllObservers();
        });
        facetSearches = index_default_default.map(
          facets,
          function(facetData) {
            return new FacetSearch_default({
              data: index_default_default.omit(facetData, "values"),
              results: facetData.values
            });
          }
        );
        currentFacets = facets;
        self2.facetsObservers.notify();
      }
    });
  };
  this.getMute = base.getMute;
  this.setMute = function(state) {
    index_default_default.each(facetSearches, function(facet) {
      facet.setMute(state);
    });
    base.setMute(state);
    return self2;
  };
  base.createObservable("facets", this.getFacets).initialize_observables();
};
var DatastoreSearch_default = DatastoreSearch;

// src/Pride/Core/nodeFactory.js
var nodeFactory = (type2, childTypes = [], extension) => {
  return function(value, ...children) {
    this.type = type2;
    this.childTypes = childTypes;
    this.value = value.trim();
    this.children = children.length === 1 && Array.isArray(children[0]) ? children[0] : children;
    this.addChild = (newChild) => {
      if (!this.childTypes.includes(newChild.type)) {
        throw new Error(`Not a valid child for a ${this.type}`);
      }
      this.children.push(newChild);
      return this;
    };
    this.contains = (query) => {
      if (this.matches(query)) {
        return this;
      }
      return this.children.find((child) => {
        return child.contains(query);
      }) ?? false;
    };
    this.matches = (query) => {
      const queryKeys = Object.keys(query).filter((key) => {
        return key !== "children";
      });
      const { children: queryChildren = [] } = query;
      return queryKeys.every((key) => {
        return this[key] === query[key];
      }) && queryChildren.every((queryChild) => {
        return this.children.some((child) => {
          return child.matches(queryChild);
        });
      });
    };
    this.serialize = () => {
      return value;
    };
    this.serializedChildren = () => {
      return this.children.map((child) => {
        return child.serialize();
      });
    };
    this.toJSON = () => {
      const json = {
        type: this.type,
        value: this.value,
        children: this.children.map((child) => {
          return child.toJSON();
        })
      };
      return json;
    };
    if (typeof extension === "function")
      extension.call(this);
  };
};
var nodeFactory_default = nodeFactory;

// src/Pride/FieldTree/FieldBoolean.js
var FieldBoolean = nodeFactory_default(
  "field_boolean",
  ["field_boolean", "field"],
  function() {
    if (!["AND", "OR", "NOT"].includes(this.value)) {
      throw new Error("Not a valid boolean value");
    }
    this.serializedChildren = () => {
      return this.children.map((child) => {
        if (child.type === this.type || child.type === "literal" && child.value.match(/\s/)) {
          return `(${child.serialize()})`;
        }
        return child.serialize();
      });
    };
    this.serialize = () => {
      return this.serializedChildren().join(` ${this.value} `);
    };
  }
);
var FieldBoolean_default = FieldBoolean;

// src/Pride/FieldTree/Field.js
var Field = nodeFactory_default("field", ["value_boolean", "literal", "tag", "special"], function() {
  this.serialize = () => {
    return `${this.value}: (${this.serializedChildren().join(" ")})`;
  };
});
var Field_default = Field;

// src/Pride/FieldTree/Literal.js
var Literal = nodeFactory_default("literal");
var Literal_default = Literal;

// src/Pride/Core/Datastore.js
var Datastore = function(datastoreInfo) {
  datastoreInfo = deepClone_default(datastoreInfo);
  this.baseQuery = function() {
    return new Query_default({
      uid: datastoreInfo.uid,
      sort: datastoreInfo.default_sort,
      start: 0,
      count: 0,
      settings: {},
      field_tree: fillFieldTree(),
      facets: index_default_default.reduce(
        datastoreInfo.facets,
        function(memo, facet) {
          if (facet.required && !facet.fixed) {
            memo[facet.uid] = facet.default_value;
          }
          return memo;
        },
        {}
      )
    });
  };
  this.baseSearch = function() {
    return new DatastoreSearch_default({ datastore: this });
  };
  this.runQuery = function(requestArguments) {
    requestArguments.url = datastoreInfo.url;
    request_default(requestArguments);
    return this;
  };
  this.get = function(key) {
    return datastoreInfo[key];
  };
  this.update = function(newInfo) {
    index_default_default.extend(datastoreInfo, newInfo);
  };
  const fillFieldTree = function(givenTree) {
    givenTree = givenTree || new FieldBoolean_default("AND");
    const output = index_default_default.reduce(
      datastoreInfo.fields,
      function(tree, field) {
        if ((field.required || field.fixed) && !tree.contains({ type: "field", value: field.uid })) {
          const missingField = new Field_default(
            field.uid,
            new Literal_default(field.default_value)
          );
          if (index_default_default.isMatch(tree, { type: "field_boolean", value: "AND" })) {
            return tree.addChild(missingField);
          } else {
            return new FieldBoolean_default("AND", tree, missingField);
          }
        }
        return tree;
      },
      givenTree
    );
    return output.matches({ type: "field_boolean", children: [] }) ? {} : output;
  };
};
var Datastore_default = Datastore;

// src/Pride/Core/index.js
var Core = {
  Datastore: Datastore_default,
  DatastoreSearch: DatastoreSearch_default,
  FacetSearch: FacetSearch_default,
  GetThis: GetThis_default,
  Holdings: Holdings_default,
  log: log_default,
  nodeFactory: nodeFactory_default,
  Query: Query_default,
  Record: Record_default,
  SearchBase: SearchBase_default
};
var Core_default = Core;

// src/Pride/FieldTree/index.js
var FieldTree = {
  Field: Field_default,
  FieldBoolean: FieldBoolean_default,
  Literal: Literal_default
};
var FieldTree_default = FieldTree;

// src/Pride/init.js
var init2 = new RequestBuffer_default({
  url: () => {
    return Settings_default.datastores_url;
  },
  attempts: () => {
    return Settings_default.init_attempts;
  },
  failure_message: () => {
    return Messenger_default.preset("failed_init");
  },
  edit_response: () => {
    return void 0;
  },
  before_success: (data) => {
    Settings_default.default_institution = data.default_institution;
    Settings_default.affiliation = data.affiliation;
    AllDatastores_default.array = data.response.map((datastoreData) => {
      return new Datastore_default(datastoreData);
    });
  }
}).request;
var init_default = init2;

// src/Pride/Parser.js
var Parser = function() {
  "use strict";
  function peg$subclass(child, parent) {
    function Ctor() {
      this.constructor = child;
    }
    Ctor.prototype = parent.prototype;
    child.prototype = new Ctor();
  }
  function SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, SyntaxError);
    }
  }
  peg$subclass(SyntaxError, Error);
  SyntaxError.buildMessage = function(expected, found) {
    const DESCRIBE_EXPECTATION_FNS = {
      literal: function(expectation) {
        return '"' + literalEscape(expectation.text) + '"';
      },
      class: function(expectation) {
        let escapedParts = "";
        let i;
        for (i = 0; i < expectation.parts.length; i++) {
          escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
        }
        return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
      },
      any: function(expectation) {
        return "any character";
      },
      end: function(expectation) {
        return "end of input";
      },
      other: function(expectation) {
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
      const descriptions = new Array(expected2.length);
      let i;
      let j;
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
    const peg$FAILED = {};
    const peg$startRuleFunctions = { start: peg$parsestart };
    let peg$startRuleFunction = peg$parsestart;
    const peg$c0 = function(c) {
      return c;
    };
    const peg$c1 = function(cl, con, co) {
      return new FieldTree_default.FieldBoolean(con, cl, co);
    };
    const peg$c2 = function(first2, rest2) {
      if (rest2) {
        return [first2, rest2];
      } else {
        return first2;
      }
    };
    const peg$c3 = function(rest2) {
      return rest2;
    };
    const peg$c4 = ":";
    const peg$c5 = peg$literalExpectation(":", false);
    const peg$c6 = function(fieldName, list) {
      return new FieldTree_default.Field(fieldName, list);
    };
    const peg$c7 = function(list) {
      return new FieldTree_default.Field(defaultFieldName, list);
    };
    const peg$c8 = function(string) {
      return string.join("");
    };
    const peg$c9 = function(first2, rest2) {
      if (rest2) {
        return first2.concat(rest2);
      } else {
        return first2;
      }
    };
    const peg$c10 = function(first2, rest2) {
      return [new FieldTree_default.Literal(first2 + rest2.join(""))];
    };
    const peg$c11 = function(string) {
      return [new FieldTree_default.Literal(string.join(""))];
    };
    const peg$c12 = function(literal) {
      return [new FieldTree_default.Literal('"' + literal.join("") + '"')];
    };
    const peg$c13 = function(conj) {
      return conj;
    };
    const peg$c14 = "AND";
    const peg$c15 = peg$literalExpectation("AND", false);
    const peg$c16 = "OR";
    const peg$c17 = peg$literalExpectation("OR", false);
    const peg$c18 = "NOT";
    const peg$c19 = peg$literalExpectation("NOT", false);
    const peg$c20 = "'";
    const peg$c21 = peg$literalExpectation("'", false);
    const peg$c22 = /^[^']/;
    const peg$c23 = peg$classExpectation(["'"], true, false);
    const peg$c24 = '"';
    const peg$c25 = peg$literalExpectation('"', false);
    const peg$c26 = /^[^"]/;
    const peg$c27 = peg$classExpectation(['"'], true, false);
    const peg$c28 = /^[^ \t\r\n:'"()]/;
    const peg$c29 = peg$classExpectation([" ", "	", "\r", "\n", ":", "'", '"', "(", ")"], true, false);
    const peg$c30 = /^[^ \t\r\n():]/;
    const peg$c31 = peg$classExpectation([" ", "	", "\r", "\n", "(", ")", ":"], true, false);
    const peg$c32 = /^[^ \t\r\n'"():]/;
    const peg$c33 = peg$classExpectation([" ", "	", "\r", "\n", "'", '"', "(", ")", ":"], true, false);
    const peg$c34 = /^[ \t\r\n]/;
    const peg$c35 = peg$classExpectation([" ", "	", "\r", "\n"], false, false);
    let peg$currPos = 0;
    const peg$posDetailsCache = [{ line: 1, column: 1 }];
    let peg$maxFailPos = 0;
    let peg$maxFailExpected = [];
    let peg$silentFails = 0;
    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
      }
      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function peg$literalExpectation(text, ignoreCase) {
      return { type: "literal", text, ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
      return { type: "class", parts, inverted, ignoreCase };
    }
    function peg$endExpectation() {
      return { type: "end" };
    }
    function peg$computePosDetails(pos) {
      let details = peg$posDetailsCache[pos];
      let p;
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
      const startPosDetails = peg$computePosDetails(startPos);
      const endPosDetails = peg$computePosDetails(endPos);
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
    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }
      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }
      peg$maxFailExpected.push(expected);
    }
    function peg$buildStructuredError(expected, found, location) {
      return new SyntaxError(
        SyntaxError.buildMessage(expected, found),
        expected,
        found,
        location
      );
    }
    function peg$parsestart() {
      let s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parsecoordination();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseOPTSPACE();
        if (s2 !== peg$FAILED) {
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
      let s0, s1, s2, s3, s4, s5;
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
        s0 = peg$parseclauseList();
      }
      return s0;
    }
    function peg$parseclauseList() {
      let s0, s1, s2;
      s0 = peg$parseclause();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseclause();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseclauseRest();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
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
    function peg$parseclauseRest() {
      let s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseclauseList();
        if (s2 !== peg$FAILED) {
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
      let s0, s1, s2, s3;
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
          s3 = peg$parseliteralList();
          if (s3 !== peg$FAILED) {
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
        s1 = peg$parseliteralList();
        if (s1 !== peg$FAILED) {
          s1 = peg$c7(s1);
        }
        s0 = s1;
      }
      return s0;
    }
    function peg$parsefield() {
      let s0, s1, s2;
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
        s1 = peg$c8(s1);
      }
      s0 = s1;
      return s0;
    }
    function peg$parseliteralList() {
      let s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parseliteral();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliteralRest();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
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
    function peg$parseliteralRest() {
      let s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliteralList();
        if (s2 !== peg$FAILED) {
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
      let s0, s1, s2, s3, s4;
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
      let s0, s1;
      s0 = peg$currPos;
      s1 = peg$parseCONJ();
      if (s1 !== peg$FAILED) {
        s1 = peg$c13(s1);
      }
      s0 = s1;
      return s0;
    }
    function peg$parseCONJ() {
      let s0;
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
      let s0;
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
      let s0;
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
      let s0;
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
      let s0;
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
      let s0;
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
      let s0;
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
      let s0;
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
      let s0, s1;
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
      let s0;
      s0 = peg$parse_();
      if (s0 === peg$FAILED) {
        s0 = null;
      }
      return s0;
    }
    const defaultFieldName = options.defaultFieldName || "all_fields";
    const peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }
      throw peg$buildStructuredError(
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }
  return {
    SyntaxError,
    parse: peg$parse
  };
}();
var Parser_default = Parser;

// src/Pride/requestRecord.js
var requestRecord = (source, id, func = () => {
}) => {
  const record = new Record_default({
    complete: false,
    source: `${AllDatastores_default.get(source)?.get("url") ?? ""}/record/${id}`,
    names: [void 0]
  });
  record.renderFull(func);
  return record;
};
var requestRecord_default = requestRecord;

// src/Pride/Util/index.js
var Util = {
  deepClone: deepClone_default,
  escape: escape_default2,
  FuncBuffer: FuncBuffer_default,
  Paginator: Paginator_default,
  request: request_default,
  RequestBuffer: RequestBuffer_default,
  Section: Section_default
};
var Util_default = Util;

// src/Pride/index.js
var Pride = {
  AllDatastores: AllDatastores_default,
  Core: Core_default,
  FieldTree: FieldTree_default,
  // Pride.FieldTree = Pride.FieldTree || {};
  init: init_default,
  Messenger: Messenger_default,
  Parser: Parser_default,
  PreferenceEngine: PreferenceEngine_default,
  requestRecord: requestRecord_default,
  Settings: Settings_default,
  Util: Util_default
};
var Pride_default = Pride;
/*! Bundled license information:

reqwest/reqwest.js:
  (*!
    * Reqwest! A general purpose XHR connection manager
    * license MIT (c) Dustin Diaz 2015
    * https://github.com/ded/reqwest
    *)
*/
