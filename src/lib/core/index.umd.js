(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('near-api-js'), require('react/jsx-runtime'), require('react-dom'), require('react'), require('bn.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'rxjs', 'near-api-js', 'react/jsx-runtime', 'react-dom', 'react', 'bn.js'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Core = {}, global.rxjs, global.nearApiJs, global.jsxRuntime, global.ReactDOM, global.React, global.bn_js));
})(this, (function (exports, rxjs, nearApiJs, jsxRuntime, ReactDOM, react, bn_js) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$J =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$j = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$i = fails$j;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$i(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$h = fails$j;

	var functionBindNative = !fails$h(function () {
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var call$e = Function.prototype.call;

	var functionCall = NATIVE_BIND$3 ? call$e.bind(call$e) : function () {
	  return call$e.apply(call$e, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$3(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$4 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var bind$5 = FunctionPrototype$2.bind;
	var call$d = FunctionPrototype$2.call;
	var uncurryThis$l = NATIVE_BIND$2 && bind$5.bind(call$d, call$d);

	var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
	  return fn && uncurryThis$l(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$d.apply(fn, arguments);
	  };
	};

	var uncurryThis$k = functionUncurryThis;

	var toString$7 = uncurryThis$k({}.toString);
	var stringSlice$6 = uncurryThis$k(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice$6(toString$7(it), 8, -1);
	};

	var global$I = global$J;
	var uncurryThis$j = functionUncurryThis;
	var fails$g = fails$j;
	var classof$7 = classofRaw$1;

	var Object$5 = global$I.Object;
	var split = uncurryThis$j(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$g(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$5('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$7(it) == 'String' ? split(it, '') : Object$5(it);
	} : Object$5;

	var global$H = global$J;

	var TypeError$h = global$H.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$5 = function (it) {
	  if (it == undefined) throw TypeError$h("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$2 = indexedObject;
	var requireObjectCoercible$4 = requireObjectCoercible$5;

	var toIndexedObject$5 = function (it) {
	  return IndexedObject$2(requireObjectCoercible$4(it));
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$l = function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$k = isCallable$l;

	var isObject$8 = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$k(it);
	};

	var global$G = global$J;
	var isCallable$j = isCallable$l;

	var aFunction = function (argument) {
	  return isCallable$j(argument) ? argument : undefined;
	};

	var getBuiltIn$8 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$G[namespace]) : global$G[namespace] && global$G[namespace][method];
	};

	var uncurryThis$i = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$i({}.isPrototypeOf);

	var getBuiltIn$7 = getBuiltIn$8;

	var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

	var global$F = global$J;
	var userAgent$3 = engineUserAgent;

	var process$3 = global$F.process;
	var Deno = global$F.Deno;
	var versions = process$3 && process$3.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent$3) {
	  match = userAgent$3.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$3.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$1 = engineV8Version;
	var fails$f = fails$j;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$f(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$2 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$2
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$E = global$J;
	var getBuiltIn$6 = getBuiltIn$8;
	var isCallable$i = isCallable$l;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var Object$4 = global$E.Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$6('Symbol');
	  return isCallable$i($Symbol) && isPrototypeOf$3($Symbol.prototype, Object$4(it));
	};

	var global$D = global$J;

	var String$5 = global$D.String;

	var tryToString$4 = function (argument) {
	  try {
	    return String$5(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var global$C = global$J;
	var isCallable$h = isCallable$l;
	var tryToString$3 = tryToString$4;

	var TypeError$g = global$C.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$6 = function (argument) {
	  if (isCallable$h(argument)) return argument;
	  throw TypeError$g(tryToString$3(argument) + ' is not a function');
	};

	var aCallable$5 = aCallable$6;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$4 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable$5(func);
	};

	var global$B = global$J;
	var call$c = functionCall;
	var isCallable$g = isCallable$l;
	var isObject$7 = isObject$8;

	var TypeError$f = global$B.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$g(fn = input.toString) && !isObject$7(val = call$c(fn, input))) return val;
	  if (isCallable$g(fn = input.valueOf) && !isObject$7(val = call$c(fn, input))) return val;
	  if (pref !== 'string' && isCallable$g(fn = input.toString) && !isObject$7(val = call$c(fn, input))) return val;
	  throw TypeError$f("Can't convert object to primitive value");
	};

	var shared$4 = {exports: {}};

	var global$A = global$J;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$4 = Object.defineProperty;

	var setGlobal$3 = function (key, value) {
	  try {
	    defineProperty$4(global$A, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$A[key] = value;
	  } return value;
	};

	var global$z = global$J;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$z[SHARED] || setGlobal$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.21.1',
	  mode: 'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var global$y = global$J;
	var requireObjectCoercible$3 = requireObjectCoercible$5;

	var Object$3 = global$y.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$5 = function (argument) {
	  return Object$3(requireObjectCoercible$3(argument));
	};

	var uncurryThis$h = functionUncurryThis;
	var toObject$4 = toObject$5;

	var hasOwnProperty = uncurryThis$h({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$4(it), key);
	};

	var uncurryThis$g = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$6 = uncurryThis$g(1.0.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$6(++id + postfix, 36);
	};

	var global$x = global$J;
	var shared$3 = shared$4.exports;
	var hasOwn$a = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared$3('wks');
	var Symbol$1 = global$x.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$i = function (name) {
	  if (!hasOwn$a(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$1 && hasOwn$a(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var global$w = global$J;
	var call$b = functionCall;
	var isObject$6 = isObject$8;
	var isSymbol$1 = isSymbol$2;
	var getMethod$3 = getMethod$4;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$h = wellKnownSymbol$i;

	var TypeError$e = global$w.TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$h('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$6(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$b(exoticToPrim, input, pref);
	    if (!isObject$6(result) || isSymbol$1(result)) return result;
	    throw TypeError$e("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$3 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var global$v = global$J;
	var isObject$5 = isObject$8;

	var document$3 = global$v.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$5(document$3) && isObject$5(document$3.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$a = descriptors;
	var fails$e = fails$j;
	var createElement$1 = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$a && !fails$e(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$9 = descriptors;
	var call$a = functionCall;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$3 = createPropertyDescriptor$4;
	var toIndexedObject$4 = toIndexedObject$5;
	var toPropertyKey$2 = toPropertyKey$3;
	var hasOwn$9 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$4(O);
	  P = toPropertyKey$2(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$9(O, P)) return createPropertyDescriptor$3(!call$a(propertyIsEnumerableModule$1.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$8 = descriptors;
	var fails$d = fails$j;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$8 && fails$d(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var global$u = global$J;
	var isObject$4 = isObject$8;

	var String$4 = global$u.String;
	var TypeError$d = global$u.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$d = function (argument) {
	  if (isObject$4(argument)) return argument;
	  throw TypeError$d(String$4(argument) + ' is not an object');
	};

	var global$t = global$J;
	var DESCRIPTORS$7 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$c = anObject$d;
	var toPropertyKey$1 = toPropertyKey$3;

	var TypeError$c = global$t.TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$7 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$c(O);
	  P = toPropertyKey$1(P);
	  anObject$c(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$c(O);
	  P = toPropertyKey$1(P);
	  anObject$c(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$c('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$6 = descriptors;
	var definePropertyModule$5 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$4;

	var createNonEnumerableProperty$6 = DESCRIPTORS$6 ? function (object, key, value) {
	  return definePropertyModule$5.f(object, key, createPropertyDescriptor$2(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$7 = {exports: {}};

	var uncurryThis$f = functionUncurryThis;
	var isCallable$f = isCallable$l;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$f(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$f(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$4 = store$1.inspectSource;

	var global$s = global$J;
	var isCallable$e = isCallable$l;
	var inspectSource$3 = inspectSource$4;

	var WeakMap$1 = global$s.WeakMap;

	var nativeWeakMap = isCallable$e(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

	var shared$2 = shared$4.exports;
	var uid = uid$2;

	var keys = shared$2('keys');

	var sharedKey$3 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$r = global$J;
	var uncurryThis$e = functionUncurryThis;
	var isObject$3 = isObject$8;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;
	var hasOwn$8 = hasOwnProperty_1;
	var shared$1 = sharedStore;
	var sharedKey$2 = sharedKey$3;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$b = global$r.TypeError;
	var WeakMap = global$r.WeakMap;
	var set$1, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set$1(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$b('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  var wmget = uncurryThis$e(store.get);
	  var wmhas = uncurryThis$e(store.has);
	  var wmset = uncurryThis$e(store.set);
	  set$1 = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$b(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas(store, it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$3[STATE] = true;
	  set$1 = function (it, metadata) {
	    if (hasOwn$8(it, STATE)) throw new TypeError$b(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$5(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$8(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$8(it, STATE);
	  };
	}

	var internalState = {
	  set: set$1,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var DESCRIPTORS$5 = descriptors;
	var hasOwn$7 = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$7(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || (DESCRIPTORS$5 && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var global$q = global$J;
	var isCallable$d = isCallable$l;
	var hasOwn$6 = hasOwnProperty_1;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
	var setGlobal$1 = setGlobal$3;
	var inspectSource$2 = inspectSource$4;
	var InternalStateModule$2 = internalState;
	var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;

	var getInternalState$3 = InternalStateModule$2.get;
	var enforceInternalState = InternalStateModule$2.enforce;
	var TEMPLATE = String(String).split('String');

	(redefine$7.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var name = options && options.name !== undefined ? options.name : key;
	  var state;
	  if (isCallable$d(value)) {
	    if (String(name).slice(0, 7) === 'Symbol(') {
	      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	    }
	    if (!hasOwn$6(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
	      createNonEnumerableProperty$4(value, 'name', name);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	    }
	  }
	  if (O === global$q) {
	    if (simple) O[key] = value;
	    else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty$4(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return isCallable$d(this) && getInternalState$3(this).source || inspectSource$2(this);
	});

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$1 = Math.floor;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$4 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- safe
	  return number !== number || number === 0 ? 0 : (number > 0 ? floor$1 : ceil)(number);
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

	var max$1 = Math.max;
	var min$3 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toIntegerOrInfinity$3(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$3(integer, length);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

	var min$2 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$3 = function (argument) {
	  return argument > 0 ? min$2(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$2 = toLength$3;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$3 = function (obj) {
	  return toLength$2(obj.length);
	};

	var toIndexedObject$3 = toIndexedObject$5;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike$2 = lengthOfArrayLike$3;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$3($this);
	    var length = lengthOfArrayLike$2(O);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var uncurryThis$d = functionUncurryThis;
	var hasOwn$5 = hasOwnProperty_1;
	var toIndexedObject$2 = toIndexedObject$5;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$1 = uncurryThis$d([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$2(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$5(hiddenKeys$2, key) && hasOwn$5(O, key) && push$1(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$5(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$1(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$5 = getBuiltIn$8;
	var uncurryThis$c = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var anObject$b = anObject$d;

	var concat$2 = uncurryThis$c([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$b(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$4 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$4 = objectDefineProperty;

	var copyConstructorProperties$2 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$4.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$c = fails$j;
	var isCallable$c = isCallable$l;

	var replacement = /#|\.prototype\./;

	var isForced$2 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$c(detection) ? fails$c(detection)
	    : !!detection;
	};

	var normalize = isForced$2.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$2.data = {};
	var NATIVE = isForced$2.NATIVE = 'N';
	var POLYFILL = isForced$2.POLYFILL = 'P';

	var isForced_1 = isForced$2;

	var global$p = global$J;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;
	var redefine$6 = redefine$7.exports;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties$1 = copyConstructorProperties$2;
	var isForced$1 = isForced_1;

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	  options.name        - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$p;
	  } else if (STATIC) {
	    target = global$p[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$p[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$2(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties$1(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine$6(target, key, sourceProperty, options);
	  }
	};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$2 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$4 = descriptors;
	var uncurryThis$b = functionUncurryThis;
	var call$9 = functionCall;
	var fails$b = fails$j;
	var objectKeys$1 = objectKeys$2;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var toObject$3 = toObject$5;
	var IndexedObject$1 = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$3 = Object.defineProperty;
	var concat$1 = uncurryThis$b([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$b(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$4 && $assign({ b: 1 }, $assign(defineProperty$3({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$3(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$3(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject$1(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat$1(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$4 || call$9(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$8 = _export;
	var assign = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$8({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
	  assign: assign
	});

	/*! *****************************************************************************
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
	***************************************************************************** */

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	const getNetworkPreset = networkId => {
	  switch (networkId) {
	    case "mainnet":
	      return {
	        networkId,
	        nodeUrl: "https://rpc.mainnet.near.org",
	        helperUrl: "https://helper.mainnet.near.org",
	        explorerUrl: "https://explorer.near.org"
	      };

	    case "testnet":
	      return {
	        networkId,
	        nodeUrl: "https://rpc.testnet.near.org",
	        helperUrl: "https://helper.testnet.near.org",
	        explorerUrl: "https://explorer.testnet.near.org"
	      };

	    case "betanet":
	      return {
	        networkId,
	        nodeUrl: "https://rpc.betanet.near.org",
	        helperUrl: "https://helper.betanet.near.org",
	        explorerUrl: "https://explorer.betanet.near.org"
	      };

	    default:
	      throw Error(`Failed to find config for: '${networkId}'`);
	  }
	};
	const resolveNetwork = network => {
	  return typeof network === "string" ? getNetworkPreset(network) : network;
	};
	const resolveOptions = params => {
	  return {
	    network: resolveNetwork(params.network),
	    contractId: params.contractId,
	    methodNames: params.methodNames,
	    debug: params.debug || false
	  };
	};

	class Provider {
	  constructor(url) {
	    this.provider = new nearApiJs.providers.JsonRpcProvider({
	      url
	    });
	  }

	  query(params) {
	    return this.provider.query(params);
	  }

	  viewAccessKey({
	    accountId,
	    publicKey
	  }) {
	    return this.query({
	      request_type: "view_access_key",
	      finality: "final",
	      account_id: accountId,
	      public_key: publicKey
	    });
	  }

	  block(reference) {
	    return this.provider.block(reference);
	  }

	  sendTransaction(signedTransaction) {
	    return this.provider.sendTransaction(signedTransaction);
	  }

	}

	var objectDefineProperties = {};

	var DESCRIPTORS$3 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$3 = objectDefineProperty;
	var anObject$a = anObject$d;
	var toIndexedObject$1 = toIndexedObject$5;
	var objectKeys = objectKeys$2;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$3 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$a(O);
	  var props = toIndexedObject$1(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$4 = getBuiltIn$8;

	var html$2 = getBuiltIn$4('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$9 = anObject$d;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html$1 = html$2;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey$1 = sharedKey$3;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$1('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement$1('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html$1.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$9(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var wellKnownSymbol$g = wellKnownSymbol$i;
	var create$2 = objectCreate;
	var definePropertyModule$2 = objectDefineProperty;

	var UNSCOPABLES = wellKnownSymbol$g('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  definePropertyModule$2.f(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: create$2(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var fails$a = fails$j;

	var correctPrototypeGetter = !fails$a(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var global$o = global$J;
	var hasOwn$3 = hasOwnProperty_1;
	var isCallable$b = isCallable$l;
	var toObject$2 = toObject$5;
	var sharedKey = sharedKey$3;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var Object$2 = global$o.Object;
	var ObjectPrototype = Object$2.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$2.getPrototypeOf : function (O) {
	  var object = toObject$2(O);
	  if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$b(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof Object$2 ? ObjectPrototype : null;
	};

	var fails$9 = fails$j;
	var isCallable$a = isCallable$l;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var redefine$5 = redefine$7.exports;
	var wellKnownSymbol$f = wellKnownSymbol$i;

	var ITERATOR$5 = wellKnownSymbol$f('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$9(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$a(IteratorPrototype$2[ITERATOR$5])) {
	  redefine$5(IteratorPrototype$2, ITERATOR$5, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty$2 = objectDefineProperty.f;
	var hasOwn$2 = hasOwnProperty_1;
	var wellKnownSymbol$e = wellKnownSymbol$i;

	var TO_STRING_TAG$3 = wellKnownSymbol$e('toStringTag');

	var setToStringTag$3 = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn$2(target, TO_STRING_TAG$3)) {
	    defineProperty$2(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$1 = objectCreate;
	var createPropertyDescriptor$1 = createPropertyDescriptor$4;
	var setToStringTag$2 = setToStringTag$3;
	var Iterators$4 = iterators;

	var returnThis$1 = function () { return this; };

	var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor$1(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$4[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var global$n = global$J;
	var isCallable$9 = isCallable$l;

	var String$3 = global$n.String;
	var TypeError$a = global$n.TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$9(argument)) return argument;
	  throw TypeError$a("Can't set " + String$3(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$a = functionUncurryThis;
	var anObject$8 = anObject$d;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    setter = uncurryThis$a(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$8(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$7 = _export;
	var call$8 = functionCall;
	var FunctionName = functionName;
	var isCallable$8 = isCallable$l;
	var createIteratorConstructor = createIteratorConstructor$1;
	var getPrototypeOf = objectGetPrototypeOf;
	var setPrototypeOf$1 = objectSetPrototypeOf;
	var setToStringTag$1 = setToStringTag$3;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;
	var redefine$4 = redefine$7.exports;
	var wellKnownSymbol$d = wellKnownSymbol$i;
	var Iterators$3 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol$d('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf$1) {
	          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable$8(CurrentIteratorPrototype[ITERATOR$4])) {
	          redefine$4(CurrentIteratorPrototype, ITERATOR$4, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (CONFIGURABLE_FUNCTION_NAME) {
	      createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$8(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine$4(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$7({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    redefine$4(IterablePrototype, ITERATOR$4, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$3[NAME] = defaultIterator;

	  return methods;
	};

	var toIndexedObject = toIndexedObject$5;
	var addToUnscopables = addToUnscopables$1;
	var Iterators$2 = iterators;
	var InternalStateModule$1 = internalState;
	var defineProperty$1 = objectDefineProperty.f;
	var defineIterator = defineIterator$1;
	var DESCRIPTORS$2 = descriptors;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState$2 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$2(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	var values = Iterators$2.Arguments = Iterators$2.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// V8 ~ Chrome 45- bug
	if (DESCRIPTORS$2 && values.name !== 'values') try {
	  defineProperty$1(values, 'name', { value: 'values' });
	} catch (error) { /* empty */ }

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement = documentCreateElement$2;

	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

	var global$m = global$J;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;
	var wellKnownSymbol$c = wellKnownSymbol$i;

	var ITERATOR$3 = wellKnownSymbol$c('iterator');
	var TO_STRING_TAG$2 = wellKnownSymbol$c('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;

	var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$3] !== ArrayValues) try {
	      createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$3, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$3] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$2]) {
	      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG$2, COLLECTION_NAME);
	    }
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  handlePrototype(global$m[COLLECTION_NAME] && global$m[COLLECTION_NAME].prototype, COLLECTION_NAME);
	}

	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

	var wellKnownSymbol$b = wellKnownSymbol$i;

	var TO_STRING_TAG$1 = wellKnownSymbol$b('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var global$l = global$J;
	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var isCallable$7 = isCallable$l;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$a = wellKnownSymbol$i;

	var TO_STRING_TAG = wellKnownSymbol$a('toStringTag');
	var Object$1 = global$l.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$6 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$7(O.callee) ? 'Arguments' : result;
	};

	var global$k = global$J;
	var classof$5 = classof$6;

	var String$2 = global$k.String;

	var toString$5 = function (argument) {
	  if (classof$5(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$2(argument);
	};

	var isObject$2 = isObject$8;
	var classof$4 = classofRaw$1;
	var wellKnownSymbol$9 = wellKnownSymbol$i;

	var MATCH$1 = wellKnownSymbol$9('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$2(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$4(it) == 'RegExp');
	};

	var global$j = global$J;
	var isRegExp = isRegexp;

	var TypeError$9 = global$j.TypeError;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw TypeError$9("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol$8 = wellKnownSymbol$i;

	var MATCH = wellKnownSymbol$8('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$6 = _export;
	var uncurryThis$9 = functionUncurryThis;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var toLength$1 = toLength$3;
	var toString$4 = toString$5;
	var notARegExp = notARegexp;
	var requireObjectCoercible$2 = requireObjectCoercible$5;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	// eslint-disable-next-line es/no-string-prototype-startswith -- safe
	var un$StartsWith = uncurryThis$9(''.startsWith);
	var stringSlice$5 = uncurryThis$9(''.slice);
	var min$1 = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
	  var descriptor = getOwnPropertyDescriptor$1(String.prototype, 'startsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.startsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.startswith
	$$6({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = toString$4(requireObjectCoercible$2(this));
	    notARegExp(searchString);
	    var index = toLength$1(min$1(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = toString$4(searchString);
	    return un$StartsWith
	      ? un$StartsWith(that, search, index)
	      : stringSlice$5(that, index, index + search.length) === search;
	  }
	});

	var anObject$7 = anObject$d;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$7(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$8 = fails$j;
	var global$i = global$J;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$i.RegExp;

	var UNSUPPORTED_Y$1 = fails$8(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$8(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$8(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$1
	};

	var fails$7 = fails$j;
	var global$h = global$J;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$h.RegExp;

	var regexpUnsupportedDotAll = fails$7(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$6 = fails$j;
	var global$g = global$J;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$g.RegExp;

	var regexpUnsupportedNcg = fails$6(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$7 = functionCall;
	var uncurryThis$8 = functionUncurryThis;
	var toString$3 = toString$5;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var shared = shared$4.exports;
	var create = objectCreate;
	var getInternalState$1 = internalState.get;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$3 = uncurryThis$8(''.charAt);
	var indexOf = uncurryThis$8(''.indexOf);
	var replace$2 = uncurryThis$8(''.replace);
	var stringSlice$4 = uncurryThis$8(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$7(nativeExec, re1, 'a');
	  call$7(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState$1(re);
	    var str = toString$3(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$7(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y && re.sticky;
	    var flags = call$7(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$2(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$4(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = call$7(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$4(match.input, charsAdded);
	        match[0] = stringSlice$4(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      call$7(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$5 = _export;
	var exec$1 = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$5({ target: 'RegExp', proto: true, forced: /./.exec !== exec$1 }, {
	  exec: exec$1
	});

	var NATIVE_BIND$1 = functionBindNative;

	var FunctionPrototype = Function.prototype;
	var apply$2 = FunctionPrototype.apply;
	var call$6 = FunctionPrototype.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$6.bind(apply$2) : function () {
	  return call$6.apply(apply$2, arguments);
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$7 = functionUncurryThis;
	var redefine$3 = redefine$7.exports;
	var regexpExec$1 = regexpExec$2;
	var fails$5 = fails$j;
	var wellKnownSymbol$7 = wellKnownSymbol$i;
	var createNonEnumerableProperty = createNonEnumerableProperty$6;

	var SPECIES$3 = wellKnownSymbol$7('species');
	var RegExpPrototype = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$7(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$5(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$5(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$3] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = uncurryThis$7(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$7(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    redefine$3(String.prototype, KEY, methods[0]);
	    redefine$3(RegExpPrototype, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
	};

	var uncurryThis$6 = functionUncurryThis;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
	var toString$2 = toString$5;
	var requireObjectCoercible$1 = requireObjectCoercible$5;

	var charAt$2 = uncurryThis$6(''.charAt);
	var charCodeAt = uncurryThis$6(''.charCodeAt);
	var stringSlice$3 = uncurryThis$6(''.slice);

	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$2(requireObjectCoercible$1($this));
	    var position = toIntegerOrInfinity$1(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$2(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$3(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$1 = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	var uncurryThis$5 = functionUncurryThis;
	var toObject$1 = toObject$5;

	var floor = Math.floor;
	var charAt = uncurryThis$5(''.charAt);
	var replace$1 = uncurryThis$5(''.replace);
	var stringSlice$2 = uncurryThis$5(''.slice);
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$1(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace$1(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$2(str, 0, position);
	      case "'": return stringSlice$2(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$2(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var global$f = global$J;
	var call$5 = functionCall;
	var anObject$6 = anObject$d;
	var isCallable$6 = isCallable$l;
	var classof$3 = classofRaw$1;
	var regexpExec = regexpExec$2;

	var TypeError$8 = global$f.TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$6(exec)) {
	    var result = call$5(exec, R, S);
	    if (result !== null) anObject$6(result);
	    return result;
	  }
	  if (classof$3(R) === 'RegExp') return call$5(regexpExec, R, S);
	  throw TypeError$8('RegExp#exec called on incompatible receiver');
	};

	var apply$1 = functionApply;
	var call$4 = functionCall;
	var uncurryThis$4 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var fails$4 = fails$j;
	var anObject$5 = anObject$d;
	var isCallable$5 = isCallable$l;
	var toIntegerOrInfinity = toIntegerOrInfinity$4;
	var toLength = toLength$3;
	var toString$1 = toString$5;
	var requireObjectCoercible = requireObjectCoercible$5;
	var advanceStringIndex = advanceStringIndex$1;
	var getMethod$2 = getMethod$4;
	var getSubstitution = getSubstitution$1;
	var regExpExec = regexpExecAbstract;
	var wellKnownSymbol$6 = wellKnownSymbol$i;

	var REPLACE = wellKnownSymbol$6('replace');
	var max = Math.max;
	var min = Math.min;
	var concat = uncurryThis$4([].concat);
	var push = uncurryThis$4([].push);
	var stringIndexOf = uncurryThis$4(''.indexOf);
	var stringSlice$1 = uncurryThis$4(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$4(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : getMethod$2(searchValue, REPLACE);
	      return replacer
	        ? call$4(replacer, searchValue, O, replaceValue)
	        : call$4(nativeReplace, toString$1(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$5(this);
	      var S = toString$1(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable$5(replaceValue);
	      if (!functionalReplace) replaceValue = toString$1(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec(rx, S);
	        if (result === null) break;

	        push(results, result);
	        if (!global) break;

	        var matchStr = toString$1(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$1(result[0]);
	        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat([matched], captures, position, S);
	          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
	          var replacement = toString$1(apply$1(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice$1(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + stringSlice$1(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var uncurryThis$3 = functionUncurryThis;
	var aCallable$4 = aCallable$6;
	var NATIVE_BIND = functionBindNative;

	var bind$4 = uncurryThis$3(uncurryThis$3.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$4(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind$4(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var wellKnownSymbol$5 = wellKnownSymbol$i;
	var Iterators$1 = iterators;

	var ITERATOR$2 = wellKnownSymbol$5('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
	};

	var classof$2 = classof$6;
	var getMethod$1 = getMethod$4;
	var Iterators = iterators;
	var wellKnownSymbol$4 = wellKnownSymbol$i;

	var ITERATOR$1 = wellKnownSymbol$4('iterator');

	var getIteratorMethod$2 = function (it) {
	  if (it != undefined) return getMethod$1(it, ITERATOR$1)
	    || getMethod$1(it, '@@iterator')
	    || Iterators[classof$2(it)];
	};

	var global$e = global$J;
	var call$3 = functionCall;
	var aCallable$3 = aCallable$6;
	var anObject$4 = anObject$d;
	var tryToString$2 = tryToString$4;
	var getIteratorMethod$1 = getIteratorMethod$2;

	var TypeError$7 = global$e.TypeError;

	var getIterator$1 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
	  if (aCallable$3(iteratorMethod)) return anObject$4(call$3(iteratorMethod, argument));
	  throw TypeError$7(tryToString$2(argument) + ' is not iterable');
	};

	var call$2 = functionCall;
	var anObject$3 = anObject$d;
	var getMethod = getMethod$4;

	var iteratorClose$1 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$3(iterator);
	  try {
	    innerResult = getMethod(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$2(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$3(innerResult);
	  return value;
	};

	var global$d = global$J;
	var bind$3 = functionBindContext;
	var call$1 = functionCall;
	var anObject$2 = anObject$d;
	var tryToString$1 = tryToString$4;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var lengthOfArrayLike$1 = lengthOfArrayLike$3;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var getIterator = getIterator$1;
	var getIteratorMethod = getIteratorMethod$2;
	var iteratorClose = iteratorClose$1;

	var TypeError$6 = global$d.TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate$2 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$3(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$2(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (!iterFn) throw TypeError$6(tryToString$1(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$1(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf$2(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator(iterable, iterFn);
	  }

	  next = iterator.next;
	  while (!(step = call$1(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && isPrototypeOf$2(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	var toPropertyKey = toPropertyKey$3;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$4;

	var createProperty$1 = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var $$4 = _export;
	var iterate$1 = iterate$2;
	var createProperty = createProperty$1;

	// `Object.fromEntries` method
	// https://github.com/tc39/proposal-object-from-entries
	$$4({ target: 'Object', stat: true }, {
	  fromEntries: function fromEntries(iterable) {
	    var obj = {};
	    iterate$1(iterable, function (k, v) {
	      createProperty(obj, k, v);
	    }, { AS_ENTRIES: true });
	    return obj;
	  }
	});

	const PACKAGE_NAME = "near-wallet-selector";
	const SELECTED_WALLET_ID = `selectedWalletId`;
	const PENDING_SELECTED_WALLET_ID = `selectedWalletId:pending`;
	const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";

	class PersistentStorage {
	  constructor(prefix = PACKAGE_NAME, storage = window === null || window === void 0 ? void 0 : window.localStorage) {
	    this.prefix = prefix;
	    this.storage = storage;
	    this.map = new Map();

	    if (!storage) {
	      throw new Error("No storage available");
	    }

	    if (PersistentStorage.instances.has(prefix)) {
	      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	      return PersistentStorage.instances.get(prefix);
	    }

	    PersistentStorage.instances.set(prefix, this);
	    this.init();
	  }

	  init() {
	    for (let i = 0; i < this.storage.length; i++) {
	      const key = this.storage.key(i);

	      if (key === null || key === void 0 ? void 0 : key.startsWith(`${this.prefix}:`)) {
	        const value = this.storage.getItem(key);

	        if (value) {
	          this.map.set(key.replace(`${this.prefix}:`, ""), value);
	        }
	      }
	    }
	  }

	  clear() {
	    this.map.clear();
	    this.storage.clear();
	  }

	  getItem(key) {
	    const value = this.map.get(key);
	    return typeof value !== "undefined" ? JSON.parse(value) : null;
	  }

	  key(index) {
	    return Object.keys(Object.fromEntries(this.map))[index] || null;
	  }

	  setItem(key, value) {
	    const valueToString = JSON.stringify(value);
	    this.map.set(key, valueToString);
	    this.storage.setItem(`${this.prefix}:${key}`, valueToString);
	  }

	  removeItem(key) {
	    this.map.delete(key);
	    this.storage.removeItem(`${this.prefix}:${key}`);
	  }

	  get length() {
	    return this.map.size;
	  }

	}
	PersistentStorage.instances = new Map();
	const storage = new PersistentStorage();

	class Logger {
	  constructor(logger = window === null || window === void 0 ? void 0 : window.console) {
	    this.logger = logger;
	  }

	  static get debug() {
	    return Logger._debug;
	  }

	  static set debug(value) {
	    Logger._debug = value;
	  }

	  log(...params) {
	    this.trigger("log", ...params);
	  }

	  error(...params) {
	    this.trigger("error", ...params);
	  }

	  info(...params) {
	    this.trigger("info", ...params);
	  }

	  warn(...params) {
	    this.trigger("warn", ...params);
	  }

	  trigger(method, ...args) {
	    if (!Logger._debug) {
	      return;
	    } // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	    //@ts-ignore


	    this.logger[method].apply(console, args);
	  }

	}
	Logger._debug = false;
	const logger = new Logger();

	var events = {exports: {}};

	var R = typeof Reflect === 'object' ? Reflect : null;
	var ReflectApply = R && typeof R.apply === 'function'
	  ? R.apply
	  : function ReflectApply(target, receiver, args) {
	    return Function.prototype.apply.call(target, receiver, args);
	  };

	var ReflectOwnKeys;
	if (R && typeof R.ownKeys === 'function') {
	  ReflectOwnKeys = R.ownKeys;
	} else if (Object.getOwnPropertySymbols) {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target)
	      .concat(Object.getOwnPropertySymbols(target));
	  };
	} else {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target);
	  };
	}

	function ProcessEmitWarning(warning) {
	  if (console && console.warn) console.warn(warning);
	}

	var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
	  return value !== value;
	};

	function EventEmitter$1() {
	  EventEmitter$1.init.call(this);
	}
	events.exports = EventEmitter$1;
	events.exports.once = once;

	// Backwards-compat with node 0.10.x
	EventEmitter$1.EventEmitter = EventEmitter$1;

	EventEmitter$1.prototype._events = undefined;
	EventEmitter$1.prototype._eventsCount = 0;
	EventEmitter$1.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	var defaultMaxListeners = 10;

	function checkListener(listener) {
	  if (typeof listener !== 'function') {
	    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	  }
	}

	Object.defineProperty(EventEmitter$1, 'defaultMaxListeners', {
	  enumerable: true,
	  get: function() {
	    return defaultMaxListeners;
	  },
	  set: function(arg) {
	    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
	      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
	    }
	    defaultMaxListeners = arg;
	  }
	});

	EventEmitter$1.init = function() {

	  if (this._events === undefined ||
	      this._events === Object.getPrototypeOf(this)._events) {
	    this._events = Object.create(null);
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter$1.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
	    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
	  }
	  this._maxListeners = n;
	  return this;
	};

	function _getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter$1.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter$1.prototype.getMaxListeners = function getMaxListeners() {
	  return _getMaxListeners(this);
	};

	EventEmitter$1.prototype.emit = function emit(type) {
	  var args = [];
	  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
	  var doError = (type === 'error');

	  var events = this._events;
	  if (events !== undefined)
	    doError = (doError && events.error === undefined);
	  else if (!doError)
	    return false;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    var er;
	    if (args.length > 0)
	      er = args[0];
	    if (er instanceof Error) {
	      // Note: The comments on the `throw` lines are intentional, they show
	      // up in Node's output if this results in an unhandled exception.
	      throw er; // Unhandled 'error' event
	    }
	    // At least give some kind of context to the user
	    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
	    err.context = er;
	    throw err; // Unhandled 'error' event
	  }

	  var handler = events[type];

	  if (handler === undefined)
	    return false;

	  if (typeof handler === 'function') {
	    ReflectApply(handler, this, args);
	  } else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      ReflectApply(listeners[i], this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  checkListener(listener);

	  events = target._events;
	  if (events === undefined) {
	    events = target._events = Object.create(null);
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener !== undefined) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (existing === undefined) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] =
	        prepend ? [listener, existing] : [existing, listener];
	      // If we've already got an array, just append.
	    } else if (prepend) {
	      existing.unshift(listener);
	    } else {
	      existing.push(listener);
	    }

	    // Check for listener leak
	    m = _getMaxListeners(target);
	    if (m > 0 && existing.length > m && !existing.warned) {
	      existing.warned = true;
	      // No error code for this since it is a Warning
	      // eslint-disable-next-line no-restricted-syntax
	      var w = new Error('Possible EventEmitter memory leak detected. ' +
	                          existing.length + ' ' + String(type) + ' listeners ' +
	                          'added. Use emitter.setMaxListeners() to ' +
	                          'increase limit');
	      w.name = 'MaxListenersExceededWarning';
	      w.emitter = target;
	      w.type = type;
	      w.count = existing.length;
	      ProcessEmitWarning(w);
	    }
	  }

	  return target;
	}

	EventEmitter$1.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener;

	EventEmitter$1.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function onceWrapper() {
	  if (!this.fired) {
	    this.target.removeListener(this.type, this.wrapFn);
	    this.fired = true;
	    if (arguments.length === 0)
	      return this.listener.call(this.target);
	    return this.listener.apply(this.target, arguments);
	  }
	}

	function _onceWrap(target, type, listener) {
	  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
	  var wrapped = onceWrapper.bind(state);
	  wrapped.listener = listener;
	  state.wrapFn = wrapped;
	  return wrapped;
	}

	EventEmitter$1.prototype.once = function once(type, listener) {
	  checkListener(listener);
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter$1.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      checkListener(listener);
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// Emits a 'removeListener' event if and only if the listener was removed.
	EventEmitter$1.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      checkListener(listener);

	      events = this._events;
	      if (events === undefined)
	        return this;

	      list = events[type];
	      if (list === undefined)
	        return this;

	      if (list === listener || list.listener === listener) {
	        if (--this._eventsCount === 0)
	          this._events = Object.create(null);
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length - 1; i >= 0; i--) {
	          if (list[i] === listener || list[i].listener === listener) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (position === 0)
	          list.shift();
	        else {
	          spliceOne(list, position);
	        }

	        if (list.length === 1)
	          events[type] = list[0];

	        if (events.removeListener !== undefined)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };

	EventEmitter$1.prototype.off = EventEmitter$1.prototype.removeListener;

	EventEmitter$1.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events, i;

	      events = this._events;
	      if (events === undefined)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (events.removeListener === undefined) {
	        if (arguments.length === 0) {
	          this._events = Object.create(null);
	          this._eventsCount = 0;
	        } else if (events[type] !== undefined) {
	          if (--this._eventsCount === 0)
	            this._events = Object.create(null);
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        var key;
	        for (i = 0; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = Object.create(null);
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners !== undefined) {
	        // LIFO order
	        for (i = listeners.length - 1; i >= 0; i--) {
	          this.removeListener(type, listeners[i]);
	        }
	      }

	      return this;
	    };

	function _listeners(target, type, unwrap) {
	  var events = target._events;

	  if (events === undefined)
	    return [];

	  var evlistener = events[type];
	  if (evlistener === undefined)
	    return [];

	  if (typeof evlistener === 'function')
	    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

	  return unwrap ?
	    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
	}

	EventEmitter$1.prototype.listeners = function listeners(type) {
	  return _listeners(this, type, true);
	};

	EventEmitter$1.prototype.rawListeners = function rawListeners(type) {
	  return _listeners(this, type, false);
	};

	EventEmitter$1.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter$1.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;

	  if (events !== undefined) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener !== undefined) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter$1.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
	};

	function arrayClone(arr, n) {
	  var copy = new Array(n);
	  for (var i = 0; i < n; ++i)
	    copy[i] = arr[i];
	  return copy;
	}

	function spliceOne(list, index) {
	  for (; index + 1 < list.length; index++)
	    list[index] = list[index + 1];
	  list.pop();
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	function once(emitter, name) {
	  return new Promise(function (resolve, reject) {
	    function errorListener(err) {
	      emitter.removeListener(name, resolver);
	      reject(err);
	    }

	    function resolver() {
	      if (typeof emitter.removeListener === 'function') {
	        emitter.removeListener('error', errorListener);
	      }
	      resolve([].slice.call(arguments));
	    }
	    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
	    if (name !== 'error') {
	      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
	    }
	  });
	}

	function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
	  if (typeof emitter.on === 'function') {
	    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
	  }
	}

	function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
	  if (typeof emitter.on === 'function') {
	    if (flags.once) {
	      emitter.once(name, listener);
	    } else {
	      emitter.on(name, listener);
	    }
	  } else if (typeof emitter.addEventListener === 'function') {
	    // EventTarget does not have `error` event semantics like Node
	    // EventEmitters, we do not listen for `error` events here.
	    emitter.addEventListener(name, function wrapListener(arg) {
	      // IE does not have builtin `{ once: true }` support so we
	      // have to do it manually.
	      if (flags.once) {
	        emitter.removeEventListener(name, wrapListener);
	      }
	      listener(arg);
	    });
	  } else {
	    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
	  }
	}

	class EventEmitter {
	  constructor() {
	    this.emitter = new events.exports.EventEmitter();
	  }

	  on(eventName, callback) {
	    this.emitter.on(eventName, callback);
	    return {
	      remove: () => this.emitter.off(eventName, callback)
	    };
	  }

	  off(eventName, callback) {
	    this.emitter.off(eventName, callback);
	  }

	  emit(eventName, event) {
	    this.emitter.emit(eventName, event);
	  }

	}

	const reducer = (state, action) => {
	  logger.log("Store Action", action);

	  switch (action.type) {
	    case "SETUP_WALLET_MODULES":
	      {
	        const {
	          modules,
	          selectedWalletId,
	          accounts
	        } = action.payload;
	        return Object.assign(Object.assign({}, state), {
	          modules,
	          accounts,
	          selectedWalletId
	        });
	      }

	    case "WALLET_CONNECTED":
	      {
	        const {
	          walletId,
	          accounts
	        } = action.payload;

	        if (!accounts.length) {
	          return state;
	        }

	        return Object.assign(Object.assign({}, state), {
	          accounts,
	          selectedWalletId: walletId
	        });
	      }

	    case "WALLET_DISCONNECTED":
	      {
	        const {
	          walletId
	        } = action.payload;

	        if (walletId !== state.selectedWalletId) {
	          return state;
	        }

	        return Object.assign(Object.assign({}, state), {
	          accounts: [],
	          selectedWalletId: null
	        });
	      }

	    case "ACCOUNTS_CHANGED":
	      {
	        const {
	          walletId,
	          accounts
	        } = action.payload;

	        if (walletId !== state.selectedWalletId) {
	          return state;
	        }

	        return Object.assign(Object.assign({}, state), {
	          accounts
	        });
	      }

	    default:
	      return state;
	  }
	};

	const syncStorage = (prevState, state) => {
	  if (state.selectedWalletId === prevState.selectedWalletId) {
	    return;
	  }

	  if (state.selectedWalletId) {
	    storage.setItem(SELECTED_WALLET_ID, state.selectedWalletId);
	    return;
	  }

	  storage.removeItem(SELECTED_WALLET_ID);
	};

	const createStore = () => {
	  const subject = new rxjs.BehaviorSubject({
	    modules: [],
	    accounts: [],
	    selectedWalletId: storage.getItem(SELECTED_WALLET_ID)
	  });
	  let prevState = subject.getValue();
	  subject.subscribe(state => {
	    syncStorage(prevState, state);
	    prevState = state;
	  });
	  return {
	    observable: subject,
	    getState: () => subject.getValue(),
	    dispatch: action => {
	      const state = subject.getValue();
	      subject.next(reducer(state, action));
	    }
	  };
	};

	const setupWalletInstance = ({
	  modules,
	  module,
	  store,
	  options,
	  emitter
	}) => __awaiter(void 0, void 0, void 0, function* () {
	  const walletEmitter = new EventEmitter();

	  const handleDisconnected = walletId => {
	    store.dispatch({
	      type: "WALLET_DISCONNECTED",
	      payload: {
	        walletId
	      }
	    });
	  };

	  const disconnect = walletId => __awaiter(void 0, void 0, void 0, function* () {
	    const walletModule = modules.find(x => x.id === walletId);
	    const wallet = yield walletModule.wallet();
	    yield wallet.disconnect().catch(err => {
	      logger.log(`Failed to disconnect ${walletId}`);
	      logger.error(err); // At least clean up state on our side.

	      handleDisconnected(walletId);
	    });
	  });

	  const handleConnected = (walletId, {
	    accounts: _accounts = []
	  }) => __awaiter(void 0, void 0, void 0, function* () {
	    const {
	      selectedWalletId
	    } = store.getState();

	    if (!_accounts.length) {
	      // We can't guarantee the user will actually sign in with browser wallets.
	      // Best we can do is set in storage and validate on init.
	      if (module.type === "browser") {
	        storage.setItem(PENDING_SELECTED_WALLET_ID, walletId);
	      }

	      return;
	    }

	    if (selectedWalletId && selectedWalletId !== walletId) {
	      yield disconnect(selectedWalletId);
	    }

	    store.dispatch({
	      type: "WALLET_CONNECTED",
	      payload: {
	        walletId,
	        accounts: _accounts
	      }
	    });
	  });

	  walletEmitter.on("disconnected", () => {
	    handleDisconnected(module.id);
	  });
	  walletEmitter.on("connected", event => {
	    handleConnected(module.id, event);
	  });
	  walletEmitter.on("accountsChanged", ({
	    accounts
	  }) => __awaiter(void 0, void 0, void 0, function* () {
	    if (!accounts.length) {
	      return disconnect(module.id);
	    }

	    store.dispatch({
	      type: "ACCOUNTS_CHANGED",
	      payload: {
	        walletId: module.id,
	        accounts
	      }
	    });
	  }));
	  walletEmitter.on("networkChanged", ({
	    networkId
	  }) => {
	    emitter.emit("networkChanged", {
	      walletId: module.id,
	      networkId
	    });
	  });
	  const wallet = Object.assign({
	    id: module.id,
	    type: module.type,
	    metadata: module.metadata
	  }, yield module.init({
	    id: module.id,
	    type: module.type,
	    metadata: module.metadata,
	    options,
	    provider: new Provider(options.network.nodeUrl),
	    emitter: walletEmitter,
	    logger,
	    storage
	  }));
	  const _connect = wallet.connect;
	  const _disconnect = wallet.disconnect;

	  wallet.connect = params => __awaiter(void 0, void 0, void 0, function* () {
	    const accounts = yield _connect(params);
	    yield handleConnected(wallet.id, {
	      accounts
	    });
	    return accounts;
	  });

	  wallet.disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
	    yield _disconnect();
	    handleDisconnected(wallet.id);
	  });

	  return wallet;
	});

	const setupWalletModules = ({
	  factories,
	  options,
	  store,
	  emitter
	}) => __awaiter(void 0, void 0, void 0, function* () {
	  const modules = [];
	  const instances = {};

	  const getWallet = id => __awaiter(void 0, void 0, void 0, function* () {
	    const module = modules.find(x => x.id === id);

	    if (!module) {
	      return null;
	    }

	    return yield module.wallet();
	  });

	  const validateWallet = id => __awaiter(void 0, void 0, void 0, function* () {
	    let accounts = [];
	    const wallet = yield getWallet(id);

	    if (wallet) {
	      // Ensure our persistent state aligns with the selected wallet.
	      // For example a wallet is selected, but it returns no accounts (not connected).
	      accounts = yield wallet.getAccounts().catch(err => {
	        logger.log(`Failed to validate ${wallet.id} during setup`);
	        logger.error(err);
	        return [];
	      });
	    }

	    return accounts;
	  });

	  const getSelectedWallet = () => __awaiter(void 0, void 0, void 0, function* () {
	    const pendingSelectedWalletId = storage.getItem(PENDING_SELECTED_WALLET_ID);

	    if (pendingSelectedWalletId) {
	      const _accounts = yield validateWallet(pendingSelectedWalletId);

	      storage.removeItem(PENDING_SELECTED_WALLET_ID);

	      if (_accounts.length) {
	        const {
	          selectedWalletId: _selectedWalletId
	        } = store.getState();
	        const selectedWallet = yield getWallet(_selectedWalletId);

	        if (selectedWallet) {
	          yield selectedWallet.disconnect().catch(err => {
	            logger.log("Failed to disconnect existing wallet");
	            logger.error(err);
	          });
	        }

	        return {
	          accounts: _accounts,
	          selectedWalletId: pendingSelectedWalletId
	        };
	      }
	    }

	    const {
	      selectedWalletId
	    } = store.getState();
	    const accounts = yield validateWallet(selectedWalletId);
	    return {
	      accounts,
	      selectedWalletId: accounts.length ? selectedWalletId : null
	    };
	  });

	  for (let i = 0; i < factories.length; i += 1) {
	    const module = yield factories[i]().catch(err => {
	      logger.log("Failed to setup module");
	      logger.error(err);
	      return null;
	    }); // Filter out wallets that aren't available.

	    if (!module) {
	      continue;
	    }

	    if (modules.some(x => x.id === module.id)) {
	      throw new Error("Duplicate module id detected: " + module.id);
	    }

	    modules.push({
	      id: module.id,
	      type: module.type,
	      metadata: module.metadata,
	      wallet: () => __awaiter(void 0, void 0, void 0, function* () {
	        let instance = instances[module.id];

	        if (instance) {
	          return instance;
	        }

	        instance = yield setupWalletInstance({
	          modules,
	          module,
	          store,
	          options,
	          emitter
	        });
	        instances[module.id] = instance;
	        return instance;
	      })
	    });
	  }

	  const {
	    accounts,
	    selectedWalletId
	  } = yield getSelectedWallet();
	  store.dispatch({
	    type: "SETUP_WALLET_MODULES",
	    payload: {
	      modules,
	      accounts,
	      selectedWalletId
	    }
	  });
	  return {
	    getWallet
	  };
	});

	var global$c = global$J;

	var nativePromiseConstructor = global$c.Promise;

	var redefine$2 = redefine$7.exports;

	var redefineAll$1 = function (target, src, options) {
	  for (var key in src) redefine$2(target, key, src[key], options);
	  return target;
	};

	var getBuiltIn$3 = getBuiltIn$8;
	var definePropertyModule = objectDefineProperty;
	var wellKnownSymbol$3 = wellKnownSymbol$i;
	var DESCRIPTORS$1 = descriptors;

	var SPECIES$2 = wellKnownSymbol$3('species');

	var setSpecies$1 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
	  var defineProperty = definePropertyModule.f;

	  if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES$2]) {
	    defineProperty(Constructor, SPECIES$2, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var global$b = global$J;
	var isPrototypeOf$1 = objectIsPrototypeOf;

	var TypeError$5 = global$b.TypeError;

	var anInstance$1 = function (it, Prototype) {
	  if (isPrototypeOf$1(Prototype, it)) return it;
	  throw TypeError$5('Incorrect invocation');
	};

	var wellKnownSymbol$2 = wellKnownSymbol$i;

	var ITERATOR = wellKnownSymbol$2('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var uncurryThis$2 = functionUncurryThis;
	var fails$3 = fails$j;
	var isCallable$4 = isCallable$l;
	var classof$1 = classof$6;
	var getBuiltIn$2 = getBuiltIn$8;
	var inspectSource$1 = inspectSource$4;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct = getBuiltIn$2('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = uncurryThis$2(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$4(argument)) return false;
	  try {
	    construct(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$4(argument)) return false;
	  switch (classof$1(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$1 = !construct || fails$3(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var global$a = global$J;
	var isConstructor = isConstructor$1;
	var tryToString = tryToString$4;

	var TypeError$4 = global$a.TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$1 = function (argument) {
	  if (isConstructor(argument)) return argument;
	  throw TypeError$4(tryToString(argument) + ' is not a constructor');
	};

	var anObject$1 = anObject$d;
	var aConstructor = aConstructor$1;
	var wellKnownSymbol$1 = wellKnownSymbol$i;

	var SPECIES$1 = wellKnownSymbol$1('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$2 = function (O, defaultConstructor) {
	  var C = anObject$1(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$1(C)[SPECIES$1]) == undefined ? defaultConstructor : aConstructor(S);
	};

	var uncurryThis$1 = functionUncurryThis;

	var arraySlice$1 = uncurryThis$1([].slice);

	var global$9 = global$J;

	var TypeError$3 = global$9.TypeError;

	var validateArgumentsLength$1 = function (passed, required) {
	  if (passed < required) throw TypeError$3('Not enough arguments');
	  return passed;
	};

	var userAgent$2 = engineUserAgent;

	var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

	var classof = classofRaw$1;
	var global$8 = global$J;

	var engineIsNode = classof(global$8.process) == 'process';

	var global$7 = global$J;
	var apply = functionApply;
	var bind$2 = functionBindContext;
	var isCallable$3 = isCallable$l;
	var hasOwn$1 = hasOwnProperty_1;
	var fails$2 = fails$j;
	var html = html$2;
	var arraySlice = arraySlice$1;
	var createElement = documentCreateElement$2;
	var validateArgumentsLength = validateArgumentsLength$1;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$3 = engineIsNode;

	var set = global$7.setImmediate;
	var clear = global$7.clearImmediate;
	var process$2 = global$7.process;
	var Dispatch = global$7.Dispatch;
	var Function$1 = global$7.Function;
	var MessageChannel = global$7.MessageChannel;
	var String$1 = global$7.String;
	var counter = 0;
	var queue$1 = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var location, defer, channel, port;

	try {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  location = global$7.location;
	} catch (error) { /* empty */ }

	var run = function (id) {
	  if (hasOwn$1(queue$1, id)) {
	    var fn = queue$1[id];
	    delete queue$1[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global$7.postMessage(String$1(id), location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(handler) {
	    validateArgumentsLength(arguments.length, 1);
	    var fn = isCallable$3(handler) ? handler : Function$1(handler);
	    var args = arraySlice(arguments, 1);
	    queue$1[++counter] = function () {
	      apply(fn, undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue$1[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE$3) {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !IS_IOS$1) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = bind$2(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$7.addEventListener &&
	    isCallable$3(global$7.postMessage) &&
	    !global$7.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails$2(post)
	  ) {
	    defer = post;
	    global$7.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in createElement('script')) {
	    defer = function (id) {
	      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set,
	  clear: clear
	};

	var userAgent$1 = engineUserAgent;
	var global$6 = global$J;

	var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$6.Pebble !== undefined;

	var userAgent = engineUserAgent;

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

	var global$5 = global$J;
	var bind$1 = functionBindContext;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;
	var IS_IOS = engineIsIos;
	var IS_IOS_PEBBLE = engineIsIosPebble;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$2 = engineIsNode;

	var MutationObserver = global$5.MutationObserver || global$5.WebKitMutationObserver;
	var document$2 = global$5.document;
	var process$1 = global$5.process;
	var Promise$1 = global$5.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$5, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify$1, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE$2 && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify$1();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise$1;
	    then = bind$1(promise.then, promise);
	    notify$1 = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE$2) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // strange IE + webpack dev server bug - use .bind(global)
	    macrotask = bind$1(macrotask, global$5);
	    notify$1 = function () {
	      macrotask(flush);
	    };
	  }
	}

	var microtask$1 = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify$1();
	  } last = task;
	};

	var newPromiseCapability$2 = {};

	var aCallable$2 = aCallable$6;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable$2(resolve);
	  this.reject = aCallable$2(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var anObject = anObject$d;
	var isObject$1 = isObject$8;
	var newPromiseCapability$1 = newPromiseCapability$2;

	var promiseResolve$2 = function (C, x) {
	  anObject(C);
	  if (isObject$1(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var global$4 = global$J;

	var hostReportErrors$1 = function (a, b) {
	  var console = global$4.console;
	  if (console && console.error) {
	    arguments.length == 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform$1 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var Queue$1 = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue$1.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    if (this.head) this.tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      this.head = entry.next;
	      if (this.tail === entry) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue = Queue$1;

	var engineIsBrowser = typeof window == 'object';

	var $$3 = _export;
	var global$3 = global$J;
	var getBuiltIn$1 = getBuiltIn$8;
	var call = functionCall;
	var NativePromise$1 = nativePromiseConstructor;
	var redefine$1 = redefine$7.exports;
	var redefineAll = redefineAll$1;
	var setPrototypeOf = objectSetPrototypeOf;
	var setToStringTag = setToStringTag$3;
	var setSpecies = setSpecies$1;
	var aCallable$1 = aCallable$6;
	var isCallable$2 = isCallable$l;
	var isObject = isObject$8;
	var anInstance = anInstance$1;
	var inspectSource = inspectSource$4;
	var iterate = iterate$2;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
	var speciesConstructor$1 = speciesConstructor$2;
	var task = task$1.set;
	var microtask = microtask$1;
	var promiseResolve$1 = promiseResolve$2;
	var hostReportErrors = hostReportErrors$1;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var perform = perform$1;
	var Queue = queue;
	var InternalStateModule = internalState;
	var isForced = isForced_1;
	var wellKnownSymbol = wellKnownSymbol$i;
	var IS_BROWSER = engineIsBrowser;
	var IS_NODE$1 = engineIsNode;
	var V8_VERSION = engineV8Version;

	var SPECIES = wellKnownSymbol('species');
	var PROMISE = 'Promise';

	var getInternalState = InternalStateModule.getterFor(PROMISE);
	var setInternalState = InternalStateModule.set;
	var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
	var NativePromisePrototype = NativePromise$1 && NativePromise$1.prototype;
	var PromiseConstructor = NativePromise$1;
	var PromisePrototype = NativePromisePrototype;
	var TypeError$2 = global$3.TypeError;
	var document$1 = global$3.document;
	var process = global$3.process;
	var newPromiseCapability = newPromiseCapabilityModule.f;
	var newGenericPromiseCapability = newPromiseCapability;

	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$3.dispatchEvent);
	var NATIVE_REJECTION_EVENT = isCallable$2(global$3.PromiseRejectionEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var SUBCLASSING = false;

	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED = isForced(PROMISE, function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES] = FakePromise;
	  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	  if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
	});

	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && isCallable$2(then = it.then) ? then : false;
	};

	var callReaction = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state == FULFILLED;
	  var handler = ok ? reaction.ok : reaction.fail;
	  var resolve = reaction.resolve;
	  var reject = reaction.reject;
	  var domain = reaction.domain;
	  var result, then, exited;
	  try {
	    if (handler) {
	      if (!ok) {
	        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	        state.rejection = HANDLED;
	      }
	      if (handler === true) result = value;
	      else {
	        if (domain) domain.enter();
	        result = handler(value); // can throw
	        if (domain) {
	          domain.exit();
	          exited = true;
	        }
	      }
	      if (result === reaction.promise) {
	        reject(TypeError$2('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        call(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction(reaction, state);
	    }
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$3.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global$3['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  call(task, global$3, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  call(task, global$3, function () {
	    var promise = state.facade;
	    if (IS_NODE$1) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$2("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          call(then, value,
	            bind(internalResolve, wrapper, state),
	            bind(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromisePrototype);
	    aCallable$1(executor);
	    call(Internal, this);
	    var state = getInternalState(this);
	    try {
	      executor(bind(internalResolve, state), bind(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };
	  PromisePrototype = PromiseConstructor.prototype;
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new Queue(),
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromisePrototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    // eslint-disable-next-line unicorn/no-thenable -- safe
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability(speciesConstructor$1(this, PromiseConstructor));
	      state.parent = true;
	      reaction.ok = isCallable$2(onFulfilled) ? onFulfilled : true;
	      reaction.fail = isCallable$2(onRejected) && onRejected;
	      reaction.domain = IS_NODE$1 ? process.domain : undefined;
	      if (state.state == PENDING) state.reactions.add(reaction);
	      else microtask(function () {
	        callReaction(reaction, state);
	      });
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (isCallable$2(NativePromise$1) && NativePromisePrototype !== Object.prototype) {
	    nativeThen = NativePromisePrototype.then;

	    if (!SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      redefine$1(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          call(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });

	      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	      redefine$1(NativePromisePrototype, 'catch', PromisePrototype['catch'], { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (setPrototypeOf) {
	      setPrototypeOf(NativePromisePrototype, PromisePrototype);
	    }
	  }
	}

	$$3({ global: true, wrap: true, forced: FORCED }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn$1(PROMISE);

	// statics
	$$3({ target: PROMISE, stat: true, forced: FORCED }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    call(capability.reject, undefined, r);
	    return capability.promise;
	  }
	});

	$$3({ target: PROMISE, stat: true, forced: FORCED }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve$1(this, x);
	  }
	});

	$$3({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call($promiseResolve, C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.es/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable$1(C.resolve);
	      iterate(iterable, function (promise) {
	        call($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$2 = _export;
	var NativePromise = nativePromiseConstructor;
	var fails$1 = fails$j;
	var getBuiltIn = getBuiltIn$8;
	var isCallable$1 = isCallable$l;
	var speciesConstructor = speciesConstructor$2;
	var promiseResolve = promiseResolve$2;
	var redefine = redefine$7.exports;

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!NativePromise && fails$1(function () {
	  // eslint-disable-next-line unicorn/no-thenable -- required for testing
	  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.es/ecma262/#sec-promise.prototype.finally
	$$2({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, getBuiltIn('Promise'));
	    var isFunction = isCallable$1(onFinally);
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
	if (isCallable$1(NativePromise)) {
	  var method = getBuiltIn('Promise').prototype['finally'];
	  if (NativePromise.prototype['finally'] !== method) {
	    redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
	  }
	}

	const LedgerDerivationPath = ({
	  selector,
	  onBack,
	  onConnected
	}) => {
	  const [isLoading, setIsLoading] = react.useState(false);
	  const [ledgerError, setLedgerError] = react.useState("");
	  const [ledgerDerivationPath, setLedgerDerivationPath] = react.useState(DEFAULT_DERIVATION_PATH);

	  const handleDerivationPathChange = e => {
	    setLedgerDerivationPath(e.target.value);
	  };

	  const handleConnectClick = () => __awaiter(void 0, void 0, void 0, function* () {
	    setIsLoading(true); // TODO: Can't assume "ledger" once we implement more hardware wallets.

	    const wallet = yield selector.wallet("ledger");

	    if (wallet.type !== "hardware") {
	      return;
	    }

	    setIsLoading(true);
	    return wallet.connect({
	      derivationPath: ledgerDerivationPath
	    }).then(() => onConnected()).catch(err => setLedgerError(`Error: ${err.message}`)).finally(() => setIsLoading(false));
	  });

	  const handleEnterClick = e => __awaiter(void 0, void 0, void 0, function* () {
	    if (e.key === "Enter") {
	      yield handleConnectClick();
	    }
	  });

	  return jsxRuntime.jsxs("div", Object.assign({
	    className: "Modal-body Modal-choose-ledger-derivation-path"
	  }, {
	    children: [jsxRuntime.jsx("p", {
	      children: "Make sure your Ledger is plugged in, then enter an account id to connect:"
	    }, void 0), jsxRuntime.jsxs("div", Object.assign({
	      className: "derivation-paths-list"
	    }, {
	      children: [jsxRuntime.jsx("input", {
	        type: "text",
	        className: ledgerError ? "input-error" : "",
	        placeholder: "Derivation Path",
	        value: ledgerDerivationPath,
	        onChange: handleDerivationPathChange,
	        readOnly: isLoading,
	        onKeyPress: handleEnterClick
	      }, void 0), ledgerError && jsxRuntime.jsx("p", Object.assign({
	        className: "error"
	      }, {
	        children: ledgerError
	      }), void 0)]
	    }), void 0), jsxRuntime.jsxs("div", Object.assign({
	      className: "derivation-paths--actions"
	    }, {
	      children: [jsxRuntime.jsx("button", Object.assign({
	        className: "left-button",
	        disabled: isLoading,
	        onClick: onBack
	      }, {
	        children: "Back"
	      }), void 0), jsxRuntime.jsx("button", Object.assign({
	        className: "right-button",
	        onClick: handleConnectClick,
	        disabled: isLoading
	      }, {
	        children: isLoading ? "Connecting..." : "Connect"
	      }), void 0)]
	    }), void 0)]
	  }), void 0);
	};

	const WalletNetworkChanged = ({
	  selector,
	  onSwitchWallet,
	  onDismiss
	}) => {
	  return jsxRuntime.jsxs("div", Object.assign({
	    className: "Modal-body Modal-switch-network-message"
	  }, {
	    children: [jsxRuntime.jsx("div", Object.assign({
	      className: "header"
	    }, {
	      children: jsxRuntime.jsx("h2", {
	        children: "You Must Change Networks"
	      }, void 0)
	    }), void 0), jsxRuntime.jsxs("div", Object.assign({
	      className: "content"
	    }, {
	      children: [jsxRuntime.jsxs("p", {
	        children: ["We've detected that you need to change your wallet's network to", jsxRuntime.jsx("strong", {
	          children: ` ${selector.options.network.networkId}`
	        }, void 0), " for this dApp."]
	      }, void 0), jsxRuntime.jsx("p", {
	        children: "Some wallets may not support changing networks. If you can not change networks you may consider switching to another wallet."
	      }, void 0)]
	    }), void 0), jsxRuntime.jsxs("div", Object.assign({
	      className: "actions"
	    }, {
	      children: [jsxRuntime.jsx("button", Object.assign({
	        className: "left-button",
	        onClick: onDismiss
	      }, {
	        children: "Dismiss"
	      }), void 0), jsxRuntime.jsx("button", Object.assign({
	        className: "right-button",
	        onClick: onSwitchWallet
	      }, {
	        children: "Switch Wallet"
	      }), void 0)]
	    }), void 0)]
	  }), void 0);
	};

	var $$1 = _export;
	var DESCRIPTORS = descriptors;
	var global$2 = global$J;
	var uncurryThis = functionUncurryThis;
	var hasOwn = hasOwnProperty_1;
	var isCallable = isCallable$l;
	var isPrototypeOf = objectIsPrototypeOf;
	var toString = toString$5;
	var defineProperty = objectDefineProperty.f;
	var copyConstructorProperties = copyConstructorProperties$2;

	var NativeSymbol = global$2.Symbol;
	var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

	if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
	    var result = isPrototypeOf(SymbolPrototype, this)
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };

	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  SymbolWrapper.prototype = SymbolPrototype;
	  SymbolPrototype.constructor = SymbolWrapper;

	  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
	  var symbolToString = uncurryThis(SymbolPrototype.toString);
	  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  var replace = uncurryThis(''.replace);
	  var stringSlice = uncurryThis(''.slice);

	  defineProperty(SymbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = symbolValueOf(this);
	      var string = symbolToString(symbol);
	      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  $$1({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	var global$1 = global$J;
	var aCallable = aCallable$6;
	var toObject = toObject$5;
	var IndexedObject = indexedObject;
	var lengthOfArrayLike = lengthOfArrayLike$3;

	var TypeError$1 = global$1.TypeError;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aCallable(callbackfn);
	    var O = toObject(that);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike(O);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError$1('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod(true)
	};

	var fails = fails$j;

	var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $ = _export;
	var $reduce = arrayReduce.left;
	var arrayMethodIsStrict = arrayMethodIsStrict$1;
	var CHROME_VERSION = engineV8Version;
	var IS_NODE = engineIsNode;

	var STRICT_METHOD = arrayMethodIsStrict('reduce');
	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});

	const WalletOptions = ({
	  selector,
	  options,
	  onError,
	  onConnectHardwareWallet,
	  onConnected
	}) => {
	  const [connecting, setConnecting] = react.useState(false);
	  const [walletInfoVisible, setWalletInfoVisible] = react.useState(false);
	  const [modules, setModules] = react.useState([]);
	  react.useEffect(() => {
	    const subscription = selector.store.observable.subscribe(state => {
	      setModules(state.modules);
	    });
	    return () => subscription.unsubscribe(); // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);

	  const handleWalletClick = module => () => __awaiter(void 0, void 0, void 0, function* () {
	    if (connecting) {
	      return;
	    }

	    try {
	      setConnecting(true);
	      const wallet = yield module.wallet();

	      if (wallet.type === "hardware") {
	        return onConnectHardwareWallet();
	      }

	      yield wallet.connect();
	      onConnected();
	    } catch (err) {
	      const {
	        name
	      } = module.metadata;
	      logger.log(`Failed to select ${name}`);
	      logger.error(err);
	      const message = err instanceof Error ? err.message : "Something went wrong";
	      onError(new Error(`Failed to connect with ${name}: ${message}`));
	    } finally {
	      setConnecting(false);
	    }
	  });

	  return jsxRuntime.jsxs(react.Fragment, {
	    children: [jsxRuntime.jsxs("div", Object.assign({
	      className: "Modal-body Modal-select-wallet-option"
	    }, {
	      children: [jsxRuntime.jsx("p", Object.assign({
	        className: "Modal-description"
	      }, {
	        children: (options === null || options === void 0 ? void 0 : options.description) || "Please select a wallet to connect to this dApp:"
	      }), void 0), jsxRuntime.jsx("ul", Object.assign({
	        className: "Modal-option-list " + (connecting ? "selection-process" : "")
	      }, {
	        children: modules.reduce((result, module) => {
	          const {
	            selectedWalletId
	          } = selector.store.getState();
	          const {
	            name,
	            description,
	            iconUrl
	          } = module.metadata;
	          const selected = module.id === selectedWalletId;
	          result.push(jsxRuntime.jsx("li", Object.assign({
	            id: module.id,
	            className: selected ? "selected-wallet" : "",
	            onClick: selected ? undefined : handleWalletClick(module)
	          }, {
	            children: jsxRuntime.jsxs("div", Object.assign({
	              title: description || ""
	            }, {
	              children: [jsxRuntime.jsx("img", {
	                src: iconUrl,
	                alt: name
	              }, void 0), jsxRuntime.jsx("div", {
	                children: jsxRuntime.jsx("span", {
	                  children: name
	                }, void 0)
	              }, void 0), selected && jsxRuntime.jsx("div", Object.assign({
	                className: "selected-wallet-text"
	              }, {
	                children: jsxRuntime.jsx("span", {
	                  children: "selected"
	                }, void 0)
	              }), void 0)]
	            }), void 0)
	          }), module.id));
	          return result;
	        }, [])
	      }), void 0)]
	    }), void 0), jsxRuntime.jsxs("div", Object.assign({
	      className: "info"
	    }, {
	      children: [jsxRuntime.jsx("span", Object.assign({
	        onClick: () => {
	          setWalletInfoVisible(!walletInfoVisible);
	        }
	      }, {
	        children: "What is a Wallet?"
	      }), void 0), jsxRuntime.jsx("div", Object.assign({
	        className: `info-description ${walletInfoVisible ? "show" : "hide"}-explanation`
	      }, {
	        children: jsxRuntime.jsx("p", {
	          children: "Wallets are used to send, receive and store digital assets. There are different types of wallets. They can be an extension added to your browser, a hardware device plugged into your computer, web-based or an app on your mobile device."
	        }, void 0)
	      }), void 0)]
	    }), void 0)]
	  }, void 0);
	};

	const AlertMessage = ({
	  message,
	  onBack
	}) => {
	  return jsxRuntime.jsxs("div", Object.assign({
	    className: "Modal-body Modal-alert-message"
	  }, {
	    children: [jsxRuntime.jsx("p", {
	      children: message
	    }, void 0), jsxRuntime.jsx("div", Object.assign({
	      className: "action-buttons"
	    }, {
	      children: jsxRuntime.jsx("button", Object.assign({
	        className: "left",
	        onClick: onBack
	      }, {
	        children: "OK"
	      }), void 0)
	    }), void 0)]
	  }), void 0);
	};

	const CloseButton = ({
	  onClick
	}) => {
	  return jsxRuntime.jsx("button", Object.assign({
	    onClick: onClick
	  }, {
	    children: jsxRuntime.jsxs("svg", Object.assign({
	      xmlns: "http://www.w3.org/2000/svg",
	      height: "24",
	      viewBox: "0 0 24 24",
	      width: "24",
	      fill: "#A7A7A7"
	    }, {
	      children: [jsxRuntime.jsx("path", {
	        d: "M0 0h24v24H0z",
	        fill: "none"
	      }, void 0), jsxRuntime.jsx("path", {
	        d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
	      }, void 0)]
	    }), void 0)
	  }), void 0);
	};

	var styles = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap');

#near-wallet-selector-modal {
  --backdrop-bg: #26262630;
  --black: #262626;
  --black-rgb: 38, 38, 38;
  --dark-gray: #3F4246;
  --dark-gray-op-30: #A7A7A730;
  --light-gray: #A7A7A7;
  --text-color: #676767;
  --white: #FFFFFF;
  --blue: #5F8AFA;
  --red: #DB5555;
}

.Modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Manrope, sans-serif;
  font-weight: 500;
}

.Modal * {
  box-sizing: content-box;
}

.Modal, .Modal.Modal-light-theme {
  color: var(--text-color);
}

.Modal .Modal-content {
  max-width: 700px;
  max-height: 70vh;
  width: 400px;
  background-color: var(--white);
  margin: 10px;
  border-radius: 16px;
  padding: 32px;
  overflow-y: auto;
}

.Modal-option-list li span {
  font-size: 14px;
}

.Modal .Modal-content {
  font-size: 16px;
  line-height: 1.6;
}

.Modal-description {
  margin-top: 0px;
  margin-bottom: 20px;
}

.Modal-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.Modal-header button {
  border: 0;
  cursor: pointer;
  height: 24px;
  padding: 4px;
  background-color: transparent;
}

.Modal-header button:active {
  background: transparent;
}

.Modal-header button svg {
  pointer-events: none;
}

.Modal-header button:hover svg {
  fill: var(--black);
  transition: all 0.2s ease-in;
}

.Modal-header h2 {
  color: var(--black);
  font-size: 22px;
  margin-top: 0;
  margin-bottom: 20px;
}

.Modal-option-list {
  margin: 0;
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.Modal-option-list li {
  padding: 1em;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid var(--dark-gray-op-30);
  display: flex;
}

.Modal-option-list li div {
  margin: auto;
}

.Modal-option-list:not(.selection-process) li:hover {
  box-shadow: 0 2px 10px 0 var(--backdrop-bg);
}

.Modal-option-list li img {
  display: block;
  margin: 0 auto 5px;
  max-width: 50px;
}

.Modal-option-list li.selected-wallet {
  background-color: var(--dark-gray-op-30);
}
.Modal-option-list li .selected-wallet-text {
  text-align: center;
}

.Modal-option-list li .selected-wallet-text span  {
  font-size: 14px;
  font-weight: 500;
}

.derivation-paths-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.Modal-body button, .Modal-body input {
  background: inherit;
  font-size: 14.2px;
  font-family: inherit;
  border-width: 1px;
  border-style: solid;
  border-color: inherit;
  border-radius: 40px;
  margin-top: 8px;
  padding: 0.55em 1.4em;
  text-align: center;
  color: inherit;
  font-family: inherit;
  transition: background 150ms ease-in-out;
  line-height: 1.15;
  cursor: pointer;
}

.Modal-body input:focus {
   border: 2px solid rgb(64, 153, 255);
}

.derivation-paths--actions {
  display: flex;
  justify-content: space-between;
}

.path-option-highlighted {
  border-color: var(--blue)!important;
}

.error {
  font-family: inherit;
  color: var(--red);
}
.info {
  margin-top: 20px;
}

.info span {
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.info .info-description {
  max-height: 0px;
  transition: all 300ms ease-out;
  overflow: hidden;
}

.info .info-description p {
    font-size: 14px;
    margin-bottom: 0px;
}

.info-description.show-explanation {
  animation: inAnimation 350ms ease-in;
  max-height: 300px;
}
.info-description.hide-explanation {
  animation: outAnimation 200ms ease-out;
  animation-fill-mode: forwards;
}

.input-error {
  border-color: var(--red)!important;
}

.Modal-wallet-not-installed .icon-display {
  display: flex;
  align-items: center;
}

.Modal-wallet-not-installed .icon-display img {
  margin-right: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.Modal-wallet-not-installed .refresh-link {
  color: var(--blue);
  cursor: pointer;
}

.Modal-wallet-not-installed .action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Modal .Modal-content .left-button {
  border: 0.5px solid var(--light-gray);
}
.Modal .Modal-content .left-button:hover {
  background-color: var(--dark-gray-op-30);
}

.Modal .Modal-content .right-button {
  color: var(--white);
  background-color: var(--blue);
  border: 1px solid var(--blue);
}

.Modal .Modal-content .right-button:hover {
  background-color: rgb(89 166 255);
}

.Modal-switch-network-message .header h2 {
  font-size: 18px;
  margin-top: 0px;
  color: var(--black);
}

.Modal-switch-network-message .content p {
  font-size: 14.25px;
}

.Modal-switch-network-message .actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Modal-dark-theme .Modal-content {
  background-color: var(--dark-gray);
  color: var(--white);
}

.Modal-dark-theme .Modal-content .Modal-header h2 {
  color: var(--white);
}

.Modal-dark-theme .Modal-header button:hover svg {
  fill: var(--light-gray);
}

.Modal-dark-theme .Modal-content .Modal-option-list li {
  border-color: var(--dark-gray-op-30);
  transition: background-color 0.2s ease-in-out;
}

.Modal-dark-theme .Modal-content .Modal-option-list li:first-child img,
.Modal-dark-theme .Modal-content .Modal-option-list #math-wallet img,
.Modal-dark-theme .Modal-wallet-not-installed .math-wallet img {
  filter: invert(1);
}

.Modal-dark-theme .Modal-content .Modal-option-list li:hover,
.Modal-dark-theme .Modal-content .Modal-option-list li.selected-wallet {
  background-color: rgba(var(--black-rgb), 0.8);
}

.Modal-dark-theme .Modal-switch-network-message .header h2 {
  color: var(--white);
}

.Modal-dark-theme .Modal-content .info span:hover {
  color: var(--light-gray);
  transition: all 200ms ease-in;
}

.Modal-dark-theme .Modal-content .left-button:hover {
    background-color: rgba(var(--black-rgb), 0.8);
    border-color: var(--black);
}

.Modal-dark-theme .Modal-alert-window {
  background-color: var(--dark-gray);
  color: white;
}

@media (prefers-color-scheme: dark) {
  .Modal .Modal-content {
    background-color: var(--dark-gray);
    color: var(--white);
  }

  .Modal-content .Modal-header h2 {
    color: var(--white);
  }

  .Modal-header button:hover svg {
    fill: var(--light-gray);
  }

  .Modal-content .Modal-option-list li {
    border-color: var(--dark-gray-op-30);
    transition: background-color 0.2s ease-in-out;
  }

  .Modal-content .Modal-option-list li:first-child img,
  .Modal-content .Modal-option-list #math-wallet img,
  .Modal-content .Modal-wallet-not-installed .math-wallet img,
  .Modal-content .Modal-option-list #wallet-connect img {
    filter: invert(1);
  }

  .Modal-content .Modal-option-list li:hover,
  .Modal-content .Modal-option-list li.selected-wallet {
    background-color: rgba(var(--black-rgb), 0.8);
  }

  .Modal-switch-network-message .header h2 {
    color: var(--white);
  }

  .Modal-content .info span:hover {
    color: var(--light-gray);
    transition: all 200ms ease-in;
  }

  .Modal .Modal-content .left-button:hover {
      background-color: rgba(var(--black-rgb), 0.8);
      border-color: var(--black);
  }

  .Modal-alert-window {
    background-color: var(--dark-gray);
    color: white;
  }
}

@keyframes outAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}

`;

	const getThemeClass = theme => {
	  switch (theme) {
	    case "dark":
	      return "Modal-dark-theme";

	    case "light":
	      return "Modal-light-theme";

	    default:
	      return "";
	  }
	};

	const Modal = ({
	  selector,
	  options,
	  visible,
	  hide
	}) => {
	  const [routeName, setRouteName] = react.useState("WalletOptions");
	  const [alertMessage, setAlertMessage] = react.useState(null);
	  react.useEffect(() => {
	    setRouteName("WalletOptions");
	  }, [visible]);
	  react.useEffect(() => {
	    const subscription = selector.on("networkChanged", ({
	      networkId
	    }) => {
	      // Switched back to the correct network.
	      if (networkId === selector.options.network.networkId) {
	        return handleDismissClick();
	      }

	      setRouteName("WalletNetworkChanged");
	    });
	    return () => subscription.remove(); // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
	  const handleDismissClick = react.useCallback(() => {
	    setAlertMessage(null);
	    setRouteName("WalletOptions");
	    hide();
	  }, [hide]);
	  react.useEffect(() => {
	    const close = e => {
	      if (e.key === "Escape") {
	        handleDismissClick();
	      }
	    };

	    window.addEventListener("keydown", close);
	    return () => window.removeEventListener("keydown", close);
	  }, [handleDismissClick]);

	  const handleDismissOutsideClick = e => {
	    e.preventDefault();

	    if (e.target === e.currentTarget) {
	      handleDismissClick();
	    }
	  };

	  if (!visible) {
	    return null;
	  }

	  return jsxRuntime.jsxs("div", Object.assign({
	    className: getThemeClass(options === null || options === void 0 ? void 0 : options.theme)
	  }, {
	    children: [jsxRuntime.jsx("style", {
	      children: styles
	    }, void 0), jsxRuntime.jsx("div", Object.assign({
	      className: "Modal",
	      onClick: handleDismissOutsideClick
	    }, {
	      children: jsxRuntime.jsxs("div", Object.assign({
	        className: "Modal-content"
	      }, {
	        children: [jsxRuntime.jsxs("div", Object.assign({
	          className: "Modal-header"
	        }, {
	          children: [jsxRuntime.jsx("h2", {
	            children: "Connect Wallet"
	          }, void 0), jsxRuntime.jsx(CloseButton, {
	            onClick: handleDismissClick
	          }, void 0)]
	        }), void 0), routeName === "AlertMessage" && alertMessage && jsxRuntime.jsx(AlertMessage, {
	          message: alertMessage,
	          onBack: () => {
	            setAlertMessage(null);
	            setRouteName("WalletOptions");
	          }
	        }, void 0), routeName === "WalletOptions" && jsxRuntime.jsx(WalletOptions, {
	          selector: selector,
	          options: options,
	          onConnectHardwareWallet: () => {
	            setRouteName("LedgerDerivationPath");
	          },
	          onConnected: handleDismissClick,
	          onError: err => {
	            setAlertMessage(err.message);
	            setRouteName("AlertMessage");
	          }
	        }, void 0), routeName === "LedgerDerivationPath" && jsxRuntime.jsx(LedgerDerivationPath, {
	          selector: selector,
	          onConnected: handleDismissClick,
	          onBack: () => setRouteName("WalletOptions")
	        }, void 0), routeName === "WalletNetworkChanged" && jsxRuntime.jsx(WalletNetworkChanged, {
	          selector: selector,
	          onSwitchWallet: () => setRouteName("WalletOptions"),
	          onDismiss: handleDismissClick
	        }, void 0)]
	      }), void 0)
	    }), void 0)]
	  }), void 0);
	};

	const MODAL_ELEMENT_ID = "near-wallet-selector-modal";
	const setupModal = ( // TODO: Remove omit once modal is a separate package.
	selector, options) => {
	  const el = document.createElement("div");
	  el.id = MODAL_ELEMENT_ID;
	  document.body.appendChild(el);

	  const render = (visible = false) => {
	    ReactDOM__default["default"].render(jsxRuntime.jsx(Modal, {
	      selector: selector,
	      options: options,
	      visible: visible,
	      hide: () => render(false)
	    }, void 0), document.getElementById(MODAL_ELEMENT_ID));
	  };

	  render();
	  return {
	    show: () => {
	      render(true);
	    },
	    hide: () => {
	      render(false);
	    }
	  };
	};

	const setupWalletSelector = params => __awaiter(void 0, void 0, void 0, function* () {
	  const options = resolveOptions(params);
	  Logger.debug = options.debug;
	  const emitter = new EventEmitter();
	  const store = createStore();
	  const walletModules = yield setupWalletModules({
	    factories: params.modules,
	    options,
	    store,
	    emitter
	  }); // TODO: Remove omit once modal is a separate package.

	  const selector = {
	    store: {
	      getState: () => store.getState(),
	      observable: store.observable.asObservable()
	    },

	    get connected() {
	      const {
	        accounts
	      } = store.getState();
	      return Boolean(accounts.length);
	    },

	    options,
	    wallet: id => __awaiter(void 0, void 0, void 0, function* () {
	      const {
	        selectedWalletId
	      } = store.getState();
	      const wallet = yield walletModules.getWallet(id || selectedWalletId);

	      if (!wallet) {
	        if (id) {
	          throw new Error("Invalid wallet id");
	        }

	        throw new Error("No wallet selected");
	      }

	      return wallet;
	    }),
	    on: (eventName, callback) => {
	      return emitter.on(eventName, callback);
	    },
	    off: (eventName, callback) => {
	      emitter.off(eventName, callback);
	    }
	  }; // TODO: Extract into separate package.

	  const modal = setupModal(selector, params.ui);
	  return Object.assign(Object.assign({}, selector), modal);
	});

	const getAccessKey = permission => {
	  if (permission === "FullAccess") {
	    return nearApiJs.transactions.fullAccessKey();
	  }

	  const {
	    receiverId,
	    methodNames = []
	  } = permission;
	  const allowance = permission.allowance ? new bn_js.BN(permission.allowance) : undefined;
	  return nearApiJs.transactions.functionCallAccessKey(receiverId, methodNames, allowance);
	};

	const transformActions = actions => {
	  return actions.map(action => {
	    switch (action.type) {
	      case "CreateAccount":
	        return nearApiJs.transactions.createAccount();

	      case "DeployContract":
	        {
	          const {
	            code
	          } = action.params;
	          return nearApiJs.transactions.deployContract(code);
	        }

	      case "FunctionCall":
	        {
	          const {
	            methodName,
	            args,
	            gas,
	            deposit
	          } = action.params;
	          return nearApiJs.transactions.functionCall(methodName, args, new bn_js.BN(gas), new bn_js.BN(deposit));
	        }

	      case "Transfer":
	        {
	          const {
	            deposit
	          } = action.params;
	          return nearApiJs.transactions.transfer(new bn_js.BN(deposit));
	        }

	      case "Stake":
	        {
	          const {
	            stake,
	            publicKey
	          } = action.params;
	          return nearApiJs.transactions.stake(new bn_js.BN(stake), nearApiJs.utils.PublicKey.from(publicKey));
	        }

	      case "AddKey":
	        {
	          const {
	            publicKey,
	            accessKey
	          } = action.params;
	          return nearApiJs.transactions.addKey(nearApiJs.utils.PublicKey.from(publicKey), // TODO: Use accessKey.nonce? near-api-js seems to think 0 is fine?
	          getAccessKey(accessKey.permission));
	        }

	      case "DeleteKey":
	        {
	          const {
	            publicKey
	          } = action.params;
	          return nearApiJs.transactions.deleteKey(nearApiJs.utils.PublicKey.from(publicKey));
	        }

	      case "DeleteAccount":
	        {
	          const {
	            beneficiaryId
	          } = action.params;
	          return nearApiJs.transactions.deleteAccount(beneficiaryId);
	        }

	      default:
	        throw new Error("Invalid action type");
	    }
	  });
	};

	const wait = ms => {
	  return new Promise(resolve => setTimeout(resolve, ms));
	};

	const poll = (cb, interval, remaining) => __awaiter(void 0, void 0, void 0, function* () {
	  const result = cb();

	  if (result) {
	    return result;
	  }

	  if (!remaining) {
	    throw new Error("Exceeded timeout");
	  }

	  return wait(interval).then(() => poll(cb, interval, remaining - 1));
	});

	const waitFor = (cb, opts = {}) => __awaiter(void 0, void 0, void 0, function* () {
	  const {
	    timeout = 200,
	    interval = 50
	  } = opts;
	  return Promise.race([wait(timeout).then(() => {
	    throw new Error("Exceeded timeout");
	  }), poll(cb, interval, Math.floor(timeout / interval))]);
	});

	exports.setupWalletSelector = setupWalletSelector;
	exports.transformActions = transformActions;
	exports.waitFor = waitFor;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
