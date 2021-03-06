(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
"use strict";

_dereq_(188);

_dereq_(189);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel/polyfill is allowed");
}
global._babelPolyfill = true;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"188":188,"189":189}],2:[function(_dereq_,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],3:[function(_dereq_,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _dereq_(83)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)_dereq_(31)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"31":31,"83":83}],4:[function(_dereq_,module,exports){
var isObject = _dereq_(38);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"38":38}],5:[function(_dereq_,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = _dereq_(80)
  , toIndex  = _dereq_(76)
  , toLength = _dereq_(79);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , $$    = arguments
    , end   = $$.length > 2 ? $$[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"76":76,"79":79,"80":80}],6:[function(_dereq_,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = _dereq_(80)
  , toIndex  = _dereq_(76)
  , toLength = _dereq_(79);
module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , $$     = arguments
    , $$len  = $$.length
    , index  = toIndex($$len > 1 ? $$[1] : undefined, length)
    , end    = $$len > 2 ? $$[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"76":76,"79":79,"80":80}],7:[function(_dereq_,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = _dereq_(78)
  , toLength  = _dereq_(79)
  , toIndex   = _dereq_(76);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"76":76,"78":78,"79":79}],8:[function(_dereq_,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = _dereq_(17)
  , IObject  = _dereq_(34)
  , toObject = _dereq_(80)
  , toLength = _dereq_(79)
  , asc      = _dereq_(9);
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"17":17,"34":34,"79":79,"80":80,"9":9}],9:[function(_dereq_,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var isObject = _dereq_(38)
  , isArray  = _dereq_(36)
  , SPECIES  = _dereq_(83)('species');
module.exports = function(original, length){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return new (C === undefined ? Array : C)(length);
};
},{"36":36,"38":38,"83":83}],10:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_(11)
  , TAG = _dereq_(83)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"11":11,"83":83}],11:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],12:[function(_dereq_,module,exports){
'use strict';
var $            = _dereq_(46)
  , hide         = _dereq_(31)
  , redefineAll  = _dereq_(60)
  , ctx          = _dereq_(17)
  , strictNew    = _dereq_(69)
  , defined      = _dereq_(18)
  , forOf        = _dereq_(27)
  , $iterDefine  = _dereq_(42)
  , step         = _dereq_(44)
  , ID           = _dereq_(82)('id')
  , $has         = _dereq_(30)
  , isObject     = _dereq_(38)
  , setSpecies   = _dereq_(65)
  , DESCRIPTORS  = _dereq_(19)
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"17":17,"18":18,"19":19,"27":27,"30":30,"31":31,"38":38,"42":42,"44":44,"46":46,"60":60,"65":65,"69":69,"82":82}],13:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = _dereq_(27)
  , classof = _dereq_(10);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"10":10,"27":27}],14:[function(_dereq_,module,exports){
'use strict';
var hide              = _dereq_(31)
  , redefineAll       = _dereq_(60)
  , anObject          = _dereq_(4)
  , isObject          = _dereq_(38)
  , strictNew         = _dereq_(69)
  , forOf             = _dereq_(27)
  , createArrayMethod = _dereq_(8)
  , $has              = _dereq_(30)
  , WEAK              = _dereq_(82)('weak')
  , isExtensible      = Object.isExtensible || isObject
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for frozen keys
var frozenStore = function(that){
  return that._l || (that._l = new FrozenStore);
};
var FrozenStore = function(){
  this.a = [];
};
var findFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
FrozenStore.prototype = {
  get: function(key){
    var entry = findFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findFrozen(this, key);
  },
  set: function(key, value){
    var entry = findFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = id++;      // collection id
      that._l = undefined; // leak store for frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(anObject(key))){
      frozenStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that._i] = value;
    } return that;
  },
  frozenStore: frozenStore,
  WEAK: WEAK
};
},{"27":27,"30":30,"31":31,"38":38,"4":4,"60":60,"69":69,"8":8,"82":82}],15:[function(_dereq_,module,exports){
'use strict';
var global         = _dereq_(29)
  , $export        = _dereq_(22)
  , redefine       = _dereq_(61)
  , redefineAll    = _dereq_(60)
  , forOf          = _dereq_(27)
  , strictNew      = _dereq_(69)
  , isObject       = _dereq_(38)
  , fails          = _dereq_(24)
  , $iterDetect    = _dereq_(43)
  , setToStringTag = _dereq_(66);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO;
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        strictNew(target, C, NAME);
        var that = new Base;
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    IS_WEAK || instance.forEach(function(val, key){
      BUGGY_ZERO = 1 / key === -Infinity;
    });
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"22":22,"24":24,"27":27,"29":29,"38":38,"43":43,"60":60,"61":61,"66":66,"69":69}],16:[function(_dereq_,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],17:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_(2);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"2":2}],18:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],19:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_(24)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"24":24}],20:[function(_dereq_,module,exports){
var isObject = _dereq_(38)
  , document = _dereq_(29).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"29":29,"38":38}],21:[function(_dereq_,module,exports){
// all enumerable object keys, includes symbols
var $ = _dereq_(46);
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"46":46}],22:[function(_dereq_,module,exports){
var global    = _dereq_(29)
  , core      = _dereq_(16)
  , hide      = _dereq_(31)
  , redefine  = _dereq_(61)
  , ctx       = _dereq_(17)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)redefine(target, key, out);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"16":16,"17":17,"29":29,"31":31,"61":61}],23:[function(_dereq_,module,exports){
var MATCH = _dereq_(83)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"83":83}],24:[function(_dereq_,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],25:[function(_dereq_,module,exports){
'use strict';
var hide     = _dereq_(31)
  , redefine = _dereq_(61)
  , fails    = _dereq_(24)
  , defined  = _dereq_(18)
  , wks      = _dereq_(83);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , original = ''[KEY];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, exec(defined, SYMBOL, original));
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return original.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return original.call(string, this); }
    );
  }
};
},{"18":18,"24":24,"31":31,"61":61,"83":83}],26:[function(_dereq_,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = _dereq_(4);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"4":4}],27:[function(_dereq_,module,exports){
var ctx         = _dereq_(17)
  , call        = _dereq_(40)
  , isArrayIter = _dereq_(35)
  , anObject    = _dereq_(4)
  , toLength    = _dereq_(79)
  , getIterFn   = _dereq_(84);
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"17":17,"35":35,"4":4,"40":40,"79":79,"84":84}],28:[function(_dereq_,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = _dereq_(78)
  , getNames  = _dereq_(46).getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"46":46,"78":78}],29:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],30:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],31:[function(_dereq_,module,exports){
var $          = _dereq_(46)
  , createDesc = _dereq_(59);
module.exports = _dereq_(19) ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"19":19,"46":46,"59":59}],32:[function(_dereq_,module,exports){
module.exports = _dereq_(29).document && document.documentElement;
},{"29":29}],33:[function(_dereq_,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],34:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_(11);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"11":11}],35:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators  = _dereq_(45)
  , ITERATOR   = _dereq_(83)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"45":45,"83":83}],36:[function(_dereq_,module,exports){
// 7.2.2 IsArray(argument)
var cof = _dereq_(11);
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"11":11}],37:[function(_dereq_,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = _dereq_(38)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"38":38}],38:[function(_dereq_,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],39:[function(_dereq_,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = _dereq_(38)
  , cof      = _dereq_(11)
  , MATCH    = _dereq_(83)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"11":11,"38":38,"83":83}],40:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_(4);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"4":4}],41:[function(_dereq_,module,exports){
'use strict';
var $              = _dereq_(46)
  , descriptor     = _dereq_(59)
  , setToStringTag = _dereq_(66)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_(31)(IteratorPrototype, _dereq_(83)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"31":31,"46":46,"59":59,"66":66,"83":83}],42:[function(_dereq_,module,exports){
'use strict';
var LIBRARY        = _dereq_(48)
  , $export        = _dereq_(22)
  , redefine       = _dereq_(61)
  , hide           = _dereq_(31)
  , has            = _dereq_(30)
  , Iterators      = _dereq_(45)
  , $iterCreate    = _dereq_(41)
  , setToStringTag = _dereq_(66)
  , getProto       = _dereq_(46).getProto
  , ITERATOR       = _dereq_(83)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"22":22,"30":30,"31":31,"41":41,"45":45,"46":46,"48":48,"61":61,"66":66,"83":83}],43:[function(_dereq_,module,exports){
var ITERATOR     = _dereq_(83)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"83":83}],44:[function(_dereq_,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],45:[function(_dereq_,module,exports){
module.exports = {};
},{}],46:[function(_dereq_,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],47:[function(_dereq_,module,exports){
var $         = _dereq_(46)
  , toIObject = _dereq_(78);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"46":46,"78":78}],48:[function(_dereq_,module,exports){
module.exports = false;
},{}],49:[function(_dereq_,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],50:[function(_dereq_,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],51:[function(_dereq_,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],52:[function(_dereq_,module,exports){
var global    = _dereq_(29)
  , macrotask = _dereq_(75).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = _dereq_(11)(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"11":11,"29":29,"75":75}],53:[function(_dereq_,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = _dereq_(46)
  , toObject = _dereq_(80)
  , IObject  = _dereq_(34);

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = _dereq_(24)(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"24":24,"34":34,"46":46,"80":80}],54:[function(_dereq_,module,exports){
// most Object methods by ES6 should accept primitives
var $export = _dereq_(22)
  , core    = _dereq_(16)
  , fails   = _dereq_(24);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"16":16,"22":22,"24":24}],55:[function(_dereq_,module,exports){
var $         = _dereq_(46)
  , toIObject = _dereq_(78)
  , isEnum    = $.isEnum;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = $.getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"46":46,"78":78}],56:[function(_dereq_,module,exports){
// all object keys, includes non-enumerable and symbols
var $        = _dereq_(46)
  , anObject = _dereq_(4)
  , Reflect  = _dereq_(29).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = $.getNames(anObject(it))
    , getSymbols = $.getSymbols;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"29":29,"4":4,"46":46}],57:[function(_dereq_,module,exports){
'use strict';
var path      = _dereq_(58)
  , invoke    = _dereq_(33)
  , aFunction = _dereq_(2);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that  = this
      , $$    = arguments
      , $$len = $$.length
      , j = 0, k = 0, args;
    if(!holder && !$$len)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = $$[k++];
    while($$len > k)args.push($$[k++]);
    return invoke(fn, args, that);
  };
};
},{"2":2,"33":33,"58":58}],58:[function(_dereq_,module,exports){
module.exports = _dereq_(29);
},{"29":29}],59:[function(_dereq_,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],60:[function(_dereq_,module,exports){
var redefine = _dereq_(61);
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"61":61}],61:[function(_dereq_,module,exports){
// add fake Function#toString
// for correct work wrapped methods / constructors with methods like LoDash isNative
var global    = _dereq_(29)
  , hide      = _dereq_(31)
  , SRC       = _dereq_(82)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

_dereq_(16).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  if(typeof val == 'function'){
    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    val.hasOwnProperty('name') || hide(val, 'name', key);
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"16":16,"29":29,"31":31,"82":82}],62:[function(_dereq_,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],63:[function(_dereq_,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],64:[function(_dereq_,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = _dereq_(46).getDesc
  , isObject = _dereq_(38)
  , anObject = _dereq_(4);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _dereq_(17)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"17":17,"38":38,"4":4,"46":46}],65:[function(_dereq_,module,exports){
'use strict';
var global      = _dereq_(29)
  , $           = _dereq_(46)
  , DESCRIPTORS = _dereq_(19)
  , SPECIES     = _dereq_(83)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"19":19,"29":29,"46":46,"83":83}],66:[function(_dereq_,module,exports){
var def = _dereq_(46).setDesc
  , has = _dereq_(30)
  , TAG = _dereq_(83)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"30":30,"46":46,"83":83}],67:[function(_dereq_,module,exports){
var global = _dereq_(29)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"29":29}],68:[function(_dereq_,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = _dereq_(4)
  , aFunction = _dereq_(2)
  , SPECIES   = _dereq_(83)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"2":2,"4":4,"83":83}],69:[function(_dereq_,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],70:[function(_dereq_,module,exports){
var toInteger = _dereq_(77)
  , defined   = _dereq_(18);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"18":18,"77":77}],71:[function(_dereq_,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = _dereq_(39)
  , defined  = _dereq_(18);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"18":18,"39":39}],72:[function(_dereq_,module,exports){
// https://github.com/ljharb/proposal-string-pad-left-right
var toLength = _dereq_(79)
  , repeat   = _dereq_(73)
  , defined  = _dereq_(18);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength)return S;
  if(fillStr == '')fillStr = ' ';
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};
},{"18":18,"73":73,"79":79}],73:[function(_dereq_,module,exports){
'use strict';
var toInteger = _dereq_(77)
  , defined   = _dereq_(18);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"18":18,"77":77}],74:[function(_dereq_,module,exports){
var $export = _dereq_(22)
  , defined = _dereq_(18)
  , fails   = _dereq_(24)
  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec){
  var exp  = {};
  exp[KEY] = exec(trim);
  $export($export.P + $export.F * fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  }), 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"18":18,"22":22,"24":24}],75:[function(_dereq_,module,exports){
var ctx                = _dereq_(17)
  , invoke             = _dereq_(33)
  , html               = _dereq_(32)
  , cel                = _dereq_(20)
  , global             = _dereq_(29)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_dereq_(11)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"11":11,"17":17,"20":20,"29":29,"32":32,"33":33}],76:[function(_dereq_,module,exports){
var toInteger = _dereq_(77)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"77":77}],77:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],78:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_(34)
  , defined = _dereq_(18);
module.exports = function(it){
  return IObject(defined(it));
};
},{"18":18,"34":34}],79:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_(77)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"77":77}],80:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_(18);
module.exports = function(it){
  return Object(defined(it));
};
},{"18":18}],81:[function(_dereq_,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = _dereq_(38);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"38":38}],82:[function(_dereq_,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],83:[function(_dereq_,module,exports){
var store  = _dereq_(67)('wks')
  , uid    = _dereq_(82)
  , Symbol = _dereq_(29).Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"29":29,"67":67,"82":82}],84:[function(_dereq_,module,exports){
var classof   = _dereq_(10)
  , ITERATOR  = _dereq_(83)('iterator')
  , Iterators = _dereq_(45);
module.exports = _dereq_(16).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"10":10,"16":16,"45":45,"83":83}],85:[function(_dereq_,module,exports){
'use strict';
var $                 = _dereq_(46)
  , $export           = _dereq_(22)
  , DESCRIPTORS       = _dereq_(19)
  , createDesc        = _dereq_(59)
  , html              = _dereq_(32)
  , cel               = _dereq_(20)
  , has               = _dereq_(30)
  , cof               = _dereq_(11)
  , invoke            = _dereq_(33)
  , fails             = _dereq_(24)
  , anObject          = _dereq_(4)
  , aFunction         = _dereq_(2)
  , isObject          = _dereq_(38)
  , toObject          = _dereq_(80)
  , toIObject         = _dereq_(78)
  , toInteger         = _dereq_(77)
  , toIndex           = _dereq_(76)
  , toLength          = _dereq_(79)
  , IObject           = _dereq_(34)
  , IE_PROTO          = _dereq_(82)('__proto__')
  , createArrayMethod = _dereq_(8)
  , arrayIndexOf      = _dereq_(7)(false)
  , ObjectProto       = Object.prototype
  , ArrayProto        = Array.prototype
  , arraySlice        = ArrayProto.slice
  , arrayJoin         = ArrayProto.join
  , defineProperty    = $.setDesc
  , getOwnDescriptor  = $.getDesc
  , defineProperties  = $.setDescs
  , factories         = {}
  , IE8_DOM_DEFINE;

if(!DESCRIPTORS){
  IE8_DOM_DEFINE = !fails(function(){
    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
  });
  $.setDesc = function(O, P, Attributes){
    if(IE8_DOM_DEFINE)try {
      return defineProperty(O, P, Attributes);
    } catch(e){ /* empty */ }
    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
    if('value' in Attributes)anObject(O)[P] = Attributes.value;
    return O;
  };
  $.getDesc = function(O, P){
    if(IE8_DOM_DEFINE)try {
      return getOwnDescriptor(O, P);
    } catch(e){ /* empty */ }
    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
  };
  $.setDescs = defineProperties = function(O, Properties){
    anObject(O);
    var keys   = $.getKeys(Properties)
      , length = keys.length
      , i = 0
      , P;
    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
    return O;
  };
}
$export($export.S + $export.F * !DESCRIPTORS, 'Object', {
  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $.getDesc,
  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  defineProperty: $.setDesc,
  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
  defineProperties: defineProperties
});

  // IE 8- don't enum bug keys
var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
            'toLocaleString,toString,valueOf').split(',')
  // Additional keys for getOwnPropertyNames
  , keys2 = keys1.concat('length', 'prototype')
  , keysLen1 = keys1.length;

// Create object with `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = cel('iframe')
    , i      = keysLen1
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict.prototype[keys1[i]];
  return createDict();
};
var createGetKeys = function(names, length){
  return function(object){
    var O      = toIObject(object)
      , i      = 0
      , result = []
      , key;
    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while(length > i)if(has(O, key = names[i++])){
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };
};
var Empty = function(){};
$export($export.S, 'Object', {
  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  getPrototypeOf: $.getProto = $.getProto || function(O){
    O = toObject(O);
    if(has(O, IE_PROTO))return O[IE_PROTO];
    if(typeof O.constructor == 'function' && O instanceof O.constructor){
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  },
  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  create: $.create = $.create || function(O, /*?*/Properties){
    var result;
    if(O !== null){
      Empty.prototype = anObject(O);
      result = new Empty();
      Empty.prototype = null;
      // add "__proto__" for Object.getPrototypeOf shim
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : defineProperties(result, Properties);
  },
  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
});

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }
  return factories[len](F, args);
};

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
$export($export.P, 'Function', {
  bind: function bind(that /*, args... */){
    var fn       = aFunction(this)
      , partArgs = arraySlice.call(arguments, 1);
    var bound = function(/* args... */){
      var args = partArgs.concat(arraySlice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
    };
    if(isObject(fn.prototype))bound.prototype = fn.prototype;
    return bound;
  }
});

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * fails(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
$export($export.P + $export.F * (IObject != Object), 'Array', {
  join: function join(separator){
    return arrayJoin.call(IObject(this), separator === undefined ? ',' : separator);
  }
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
$export($export.S, 'Array', {isArray: _dereq_(36)});

var createArrayReduce = function(isRight){
  return function(callbackfn, memo){
    aFunction(callbackfn);
    var O      = IObject(this)
      , length = toLength(O.length)
      , index  = isRight ? length - 1 : 0
      , i      = isRight ? -1 : 1;
    if(arguments.length < 2)for(;;){
      if(index in O){
        memo = O[index];
        index += i;
        break;
      }
      index += i;
      if(isRight ? index < 0 : length <= index){
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
      memo = callbackfn(memo, O[index], index, this);
    }
    return memo;
  };
};

var methodize = function($fn){
  return function(arg1/*, arg2 = undefined */){
    return $fn(this, arg1, arguments[1]);
  };
};

$export($export.P, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: $.each = $.each || methodize(createArrayMethod(0)),
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: methodize(createArrayMethod(1)),
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: methodize(createArrayMethod(2)),
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: methodize(createArrayMethod(3)),
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: methodize(createArrayMethod(4)),
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: createArrayReduce(false),
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: createArrayReduce(true),
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: methodize(arrayIndexOf),
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
    if(index < 0)index = toLength(length + index);
    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
    return -1;
  }
});

// 20.3.3.1 / 15.9.4.4 Date.now()
$export($export.S, 'Date', {now: function(){ return +new Date; }});

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(this))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"11":11,"19":19,"2":2,"20":20,"22":22,"24":24,"30":30,"32":32,"33":33,"34":34,"36":36,"38":38,"4":4,"46":46,"59":59,"7":7,"76":76,"77":77,"78":78,"79":79,"8":8,"80":80,"82":82}],86:[function(_dereq_,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = _dereq_(22);

$export($export.P, 'Array', {copyWithin: _dereq_(5)});

_dereq_(3)('copyWithin');
},{"22":22,"3":3,"5":5}],87:[function(_dereq_,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = _dereq_(22);

$export($export.P, 'Array', {fill: _dereq_(6)});

_dereq_(3)('fill');
},{"22":22,"3":3,"6":6}],88:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = _dereq_(22)
  , $find   = _dereq_(8)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_dereq_(3)(KEY);
},{"22":22,"3":3,"8":8}],89:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = _dereq_(22)
  , $find   = _dereq_(8)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_dereq_(3)(KEY);
},{"22":22,"3":3,"8":8}],90:[function(_dereq_,module,exports){
'use strict';
var ctx         = _dereq_(17)
  , $export     = _dereq_(22)
  , toObject    = _dereq_(80)
  , call        = _dereq_(40)
  , isArrayIter = _dereq_(35)
  , toLength    = _dereq_(79)
  , getIterFn   = _dereq_(84);
$export($export.S + $export.F * !_dereq_(43)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"17":17,"22":22,"35":35,"40":40,"43":43,"79":79,"80":80,"84":84}],91:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_(3)
  , step             = _dereq_(44)
  , Iterators        = _dereq_(45)
  , toIObject        = _dereq_(78);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_(42)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"3":3,"42":42,"44":44,"45":45,"78":78}],92:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(22);

// WebKit Array.of isn't generic
$export($export.S + $export.F * _dereq_(24)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , $$     = arguments
      , $$len  = $$.length
      , result = new (typeof this == 'function' ? this : Array)($$len);
    while($$len > index)result[index] = $$[index++];
    result.length = $$len;
    return result;
  }
});
},{"22":22,"24":24}],93:[function(_dereq_,module,exports){
_dereq_(65)('Array');
},{"65":65}],94:[function(_dereq_,module,exports){
'use strict';
var $             = _dereq_(46)
  , isObject      = _dereq_(38)
  , HAS_INSTANCE  = _dereq_(83)('hasInstance')
  , FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = $.getProto(O))if(this.prototype === O)return true;
  return false;
}});
},{"38":38,"46":46,"83":83}],95:[function(_dereq_,module,exports){
var setDesc    = _dereq_(46).setDesc
  , createDesc = _dereq_(59)
  , has        = _dereq_(30)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';
// 19.2.4.2 name
NAME in FProto || _dereq_(19) && setDesc(FProto, NAME, {
  configurable: true,
  get: function(){
    var match = ('' + this).match(nameRE)
      , name  = match ? match[1] : '';
    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
    return name;
  }
});
},{"19":19,"30":30,"46":46,"59":59}],96:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_(12);

// 23.1 Map Objects
_dereq_(15)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"12":12,"15":15}],97:[function(_dereq_,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = _dereq_(22)
  , log1p   = _dereq_(50)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"22":22,"50":50}],98:[function(_dereq_,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = _dereq_(22);

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

$export($export.S, 'Math', {asinh: asinh});
},{"22":22}],99:[function(_dereq_,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = _dereq_(22);

$export($export.S, 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"22":22}],100:[function(_dereq_,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = _dereq_(22)
  , sign    = _dereq_(51);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"22":22,"51":51}],101:[function(_dereq_,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = _dereq_(22);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"22":22}],102:[function(_dereq_,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = _dereq_(22)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"22":22}],103:[function(_dereq_,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = _dereq_(22);

$export($export.S, 'Math', {expm1: _dereq_(49)});
},{"22":22,"49":49}],104:[function(_dereq_,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = _dereq_(22)
  , sign      = _dereq_(51)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"22":22,"51":51}],105:[function(_dereq_,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = _dereq_(22)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum   = 0
      , i     = 0
      , $$    = arguments
      , $$len = $$.length
      , larg  = 0
      , arg, div;
    while(i < $$len){
      arg = abs($$[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"22":22}],106:[function(_dereq_,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = _dereq_(22)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * _dereq_(24)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"22":22,"24":24}],107:[function(_dereq_,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = _dereq_(22);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"22":22}],108:[function(_dereq_,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = _dereq_(22);

$export($export.S, 'Math', {log1p: _dereq_(50)});
},{"22":22,"50":50}],109:[function(_dereq_,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = _dereq_(22);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"22":22}],110:[function(_dereq_,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = _dereq_(22);

$export($export.S, 'Math', {sign: _dereq_(51)});
},{"22":22,"51":51}],111:[function(_dereq_,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = _dereq_(22)
  , expm1   = _dereq_(49)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * _dereq_(24)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"22":22,"24":24,"49":49}],112:[function(_dereq_,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = _dereq_(22)
  , expm1   = _dereq_(49)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"22":22,"49":49}],113:[function(_dereq_,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = _dereq_(22);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"22":22}],114:[function(_dereq_,module,exports){
'use strict';
var $           = _dereq_(46)
  , global      = _dereq_(29)
  , has         = _dereq_(30)
  , cof         = _dereq_(11)
  , toPrimitive = _dereq_(81)
  , fails       = _dereq_(24)
  , $trim       = _dereq_(74).trim
  , NUMBER      = 'Number'
  , $Number     = global[NUMBER]
  , Base        = $Number
  , proto       = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF  = cof($.create(proto)) == NUMBER
  , TRIM        = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? new Base(toNumber(it)) : toNumber(it);
  };
  $.each.call(_dereq_(19) ? $.getNames(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), function(key){
    if(has(Base, key) && !has($Number, key)){
      $.setDesc($Number, key, $.getDesc(Base, key));
    }
  });
  $Number.prototype = proto;
  proto.constructor = $Number;
  _dereq_(61)(global, NUMBER, $Number);
}
},{"11":11,"19":19,"24":24,"29":29,"30":30,"46":46,"61":61,"74":74,"81":81}],115:[function(_dereq_,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = _dereq_(22);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"22":22}],116:[function(_dereq_,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = _dereq_(22)
  , _isFinite = _dereq_(29).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"22":22,"29":29}],117:[function(_dereq_,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = _dereq_(22);

$export($export.S, 'Number', {isInteger: _dereq_(37)});
},{"22":22,"37":37}],118:[function(_dereq_,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = _dereq_(22);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"22":22}],119:[function(_dereq_,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = _dereq_(22)
  , isInteger = _dereq_(37)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"22":22,"37":37}],120:[function(_dereq_,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = _dereq_(22);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"22":22}],121:[function(_dereq_,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = _dereq_(22);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"22":22}],122:[function(_dereq_,module,exports){
// 20.1.2.12 Number.parseFloat(string)
var $export = _dereq_(22);

$export($export.S, 'Number', {parseFloat: parseFloat});
},{"22":22}],123:[function(_dereq_,module,exports){
// 20.1.2.13 Number.parseInt(string, radix)
var $export = _dereq_(22);

$export($export.S, 'Number', {parseInt: parseInt});
},{"22":22}],124:[function(_dereq_,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = _dereq_(22);

$export($export.S + $export.F, 'Object', {assign: _dereq_(53)});
},{"22":22,"53":53}],125:[function(_dereq_,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = _dereq_(38);

_dereq_(54)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});
},{"38":38,"54":54}],126:[function(_dereq_,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = _dereq_(78);

_dereq_(54)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"54":54,"78":78}],127:[function(_dereq_,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
_dereq_(54)('getOwnPropertyNames', function(){
  return _dereq_(28).get;
});
},{"28":28,"54":54}],128:[function(_dereq_,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = _dereq_(80);

_dereq_(54)('getPrototypeOf', function($getPrototypeOf){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"54":54,"80":80}],129:[function(_dereq_,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = _dereq_(38);

_dereq_(54)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"38":38,"54":54}],130:[function(_dereq_,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = _dereq_(38);

_dereq_(54)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"38":38,"54":54}],131:[function(_dereq_,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = _dereq_(38);

_dereq_(54)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"38":38,"54":54}],132:[function(_dereq_,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = _dereq_(22);
$export($export.S, 'Object', {is: _dereq_(63)});
},{"22":22,"63":63}],133:[function(_dereq_,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = _dereq_(80);

_dereq_(54)('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"54":54,"80":80}],134:[function(_dereq_,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = _dereq_(38);

_dereq_(54)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
  };
});
},{"38":38,"54":54}],135:[function(_dereq_,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = _dereq_(38);

_dereq_(54)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(it) : it;
  };
});
},{"38":38,"54":54}],136:[function(_dereq_,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = _dereq_(22);
$export($export.S, 'Object', {setPrototypeOf: _dereq_(64).set});
},{"22":22,"64":64}],137:[function(_dereq_,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = _dereq_(10)
  , test    = {};
test[_dereq_(83)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  _dereq_(61)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"10":10,"61":61,"83":83}],138:[function(_dereq_,module,exports){
'use strict';
var $          = _dereq_(46)
  , LIBRARY    = _dereq_(48)
  , global     = _dereq_(29)
  , ctx        = _dereq_(17)
  , classof    = _dereq_(10)
  , $export    = _dereq_(22)
  , isObject   = _dereq_(38)
  , anObject   = _dereq_(4)
  , aFunction  = _dereq_(2)
  , strictNew  = _dereq_(69)
  , forOf      = _dereq_(27)
  , setProto   = _dereq_(64).set
  , same       = _dereq_(63)
  , SPECIES    = _dereq_(83)('species')
  , speciesConstructor = _dereq_(68)
  , asap       = _dereq_(52)
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && _dereq_(19)){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  _dereq_(60)(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
_dereq_(66)(P, PROMISE);
_dereq_(65)(PROMISE);
Wrapper = _dereq_(16)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && _dereq_(43)(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"10":10,"16":16,"17":17,"19":19,"2":2,"22":22,"27":27,"29":29,"38":38,"4":4,"43":43,"46":46,"48":48,"52":52,"60":60,"63":63,"64":64,"65":65,"66":66,"68":68,"69":69,"83":83}],139:[function(_dereq_,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = _dereq_(22)
  , _apply  = Function.apply;

$export($export.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  }
});
},{"22":22}],140:[function(_dereq_,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $         = _dereq_(46)
  , $export   = _dereq_(22)
  , aFunction = _dereq_(2)
  , anObject  = _dereq_(4)
  , isObject  = _dereq_(38)
  , bind      = Function.bind || _dereq_(16).Function.prototype.bind;

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$export($export.S + $export.F * _dereq_(24)(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      if(args != undefined)switch(anObject(args).length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = $.create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"16":16,"2":2,"22":22,"24":24,"38":38,"4":4,"46":46}],141:[function(_dereq_,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var $        = _dereq_(46)
  , $export  = _dereq_(22)
  , anObject = _dereq_(4);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * _dereq_(24)(function(){
  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    try {
      $.setDesc(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"22":22,"24":24,"4":4,"46":46}],142:[function(_dereq_,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = _dereq_(22)
  , getDesc  = _dereq_(46).getDesc
  , anObject = _dereq_(4);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = getDesc(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"22":22,"4":4,"46":46}],143:[function(_dereq_,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = _dereq_(22)
  , anObject = _dereq_(4);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
_dereq_(41)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"22":22,"4":4,"41":41}],144:[function(_dereq_,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var $        = _dereq_(46)
  , $export  = _dereq_(22)
  , anObject = _dereq_(4);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return $.getDesc(anObject(target), propertyKey);
  }
});
},{"22":22,"4":4,"46":46}],145:[function(_dereq_,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = _dereq_(22)
  , getProto = _dereq_(46).getProto
  , anObject = _dereq_(4);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"22":22,"4":4,"46":46}],146:[function(_dereq_,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var $        = _dereq_(46)
  , has      = _dereq_(30)
  , $export  = _dereq_(22)
  , isObject = _dereq_(38)
  , anObject = _dereq_(4);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"22":22,"30":30,"38":38,"4":4,"46":46}],147:[function(_dereq_,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = _dereq_(22);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"22":22}],148:[function(_dereq_,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = _dereq_(22)
  , anObject      = _dereq_(4)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"22":22,"4":4}],149:[function(_dereq_,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = _dereq_(22);

$export($export.S, 'Reflect', {ownKeys: _dereq_(56)});
},{"22":22,"56":56}],150:[function(_dereq_,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = _dereq_(22)
  , anObject           = _dereq_(4)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"22":22,"4":4}],151:[function(_dereq_,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = _dereq_(22)
  , setProto = _dereq_(64);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"22":22,"64":64}],152:[function(_dereq_,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var $          = _dereq_(46)
  , has        = _dereq_(30)
  , $export    = _dereq_(22)
  , createDesc = _dereq_(59)
  , anObject   = _dereq_(4)
  , isObject   = _dereq_(38);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = $.getDesc(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = $.getProto(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    $.setDesc(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"22":22,"30":30,"38":38,"4":4,"46":46,"59":59}],153:[function(_dereq_,module,exports){
var $        = _dereq_(46)
  , global   = _dereq_(29)
  , isRegExp = _dereq_(39)
  , $flags   = _dereq_(26)
  , $RegExp  = global.RegExp
  , Base     = $RegExp
  , proto    = $RegExp.prototype
  , re1      = /a/g
  , re2      = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW = new $RegExp(re1) !== re1;

if(_dereq_(19) && (!CORRECT_NEW || _dereq_(24)(function(){
  re2[_dereq_(83)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
      : CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
  };
  $.each.call($.getNames(Base), function(key){
    key in $RegExp || $.setDesc($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  });
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  _dereq_(61)(global, 'RegExp', $RegExp);
}

_dereq_(65)('RegExp');
},{"19":19,"24":24,"26":26,"29":29,"39":39,"46":46,"61":61,"65":65,"83":83}],154:[function(_dereq_,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
var $ = _dereq_(46);
if(_dereq_(19) && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
  configurable: true,
  get: _dereq_(26)
});
},{"19":19,"26":26,"46":46}],155:[function(_dereq_,module,exports){
// @@match logic
_dereq_(25)('match', 1, function(defined, MATCH){
  // 21.1.3.11 String.prototype.match(regexp)
  return function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  };
});
},{"25":25}],156:[function(_dereq_,module,exports){
// @@replace logic
_dereq_(25)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  };
});
},{"25":25}],157:[function(_dereq_,module,exports){
// @@search logic
_dereq_(25)('search', 1, function(defined, SEARCH){
  // 21.1.3.15 String.prototype.search(regexp)
  return function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  };
});
},{"25":25}],158:[function(_dereq_,module,exports){
// @@split logic
_dereq_(25)('split', 2, function(defined, SPLIT, $split){
  // 21.1.3.17 String.prototype.split(separator, limit)
  return function split(separator, limit){
    'use strict';
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined
      ? fn.call(separator, O, limit)
      : $split.call(String(O), separator, limit);
  };
});
},{"25":25}],159:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_(12);

// 23.2 Set Objects
_dereq_(15)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"12":12,"15":15}],160:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(22)
  , $at     = _dereq_(70)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"22":22,"70":70}],161:[function(_dereq_,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = _dereq_(22)
  , toLength  = _dereq_(79)
  , context   = _dereq_(71)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * _dereq_(23)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , $$   = arguments
      , endPosition = $$.length > 1 ? $$[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"22":22,"23":23,"71":71,"79":79}],162:[function(_dereq_,module,exports){
var $export        = _dereq_(22)
  , toIndex        = _dereq_(76)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res   = []
      , $$    = arguments
      , $$len = $$.length
      , i     = 0
      , code;
    while($$len > i){
      code = +$$[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"22":22,"76":76}],163:[function(_dereq_,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = _dereq_(22)
  , context  = _dereq_(71)
  , INCLUDES = 'includes';

$export($export.P + $export.F * _dereq_(23)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"22":22,"23":23,"71":71}],164:[function(_dereq_,module,exports){
'use strict';
var $at  = _dereq_(70)(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_(42)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"42":42,"70":70}],165:[function(_dereq_,module,exports){
var $export   = _dereq_(22)
  , toIObject = _dereq_(78)
  , toLength  = _dereq_(79);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl   = toIObject(callSite.raw)
      , len   = toLength(tpl.length)
      , $$    = arguments
      , $$len = $$.length
      , res   = []
      , i     = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < $$len)res.push(String($$[i]));
    } return res.join('');
  }
});
},{"22":22,"78":78,"79":79}],166:[function(_dereq_,module,exports){
var $export = _dereq_(22);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: _dereq_(73)
});
},{"22":22,"73":73}],167:[function(_dereq_,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = _dereq_(22)
  , toLength    = _dereq_(79)
  , context     = _dereq_(71)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * _dereq_(23)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , $$     = arguments
      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"22":22,"23":23,"71":71,"79":79}],168:[function(_dereq_,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
_dereq_(74)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"74":74}],169:[function(_dereq_,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = _dereq_(46)
  , global         = _dereq_(29)
  , has            = _dereq_(30)
  , DESCRIPTORS    = _dereq_(19)
  , $export        = _dereq_(22)
  , redefine       = _dereq_(61)
  , $fails         = _dereq_(24)
  , shared         = _dereq_(67)
  , setToStringTag = _dereq_(66)
  , uid            = _dereq_(82)
  , wks            = _dereq_(83)
  , keyOf          = _dereq_(47)
  , $names         = _dereq_(28)
  , enumKeys       = _dereq_(21)
  , isArray        = _dereq_(36)
  , anObject       = _dereq_(4)
  , toIObject      = _dereq_(78)
  , createDesc     = _dereq_(59)
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !_dereq_(48)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"19":19,"21":21,"22":22,"24":24,"28":28,"29":29,"30":30,"36":36,"4":4,"46":46,"47":47,"48":48,"59":59,"61":61,"66":66,"67":67,"78":78,"82":82,"83":83}],170:[function(_dereq_,module,exports){
'use strict';
var $            = _dereq_(46)
  , redefine     = _dereq_(61)
  , weak         = _dereq_(14)
  , isObject     = _dereq_(38)
  , has          = _dereq_(30)
  , frozenStore  = weak.frozenStore
  , WEAK         = weak.WEAK
  , isExtensible = Object.isExtensible || isObject
  , tmp          = {};

// 23.3 WeakMap Objects
var $WeakMap = _dereq_(15)('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return frozenStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this._i];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = frozenStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"14":14,"15":15,"30":30,"38":38,"46":46,"61":61}],171:[function(_dereq_,module,exports){
'use strict';
var weak = _dereq_(14);

// 23.4 WeakSet Objects
_dereq_(15)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"14":14,"15":15}],172:[function(_dereq_,module,exports){
'use strict';
var $export   = _dereq_(22)
  , $includes = _dereq_(7)(true);

$export($export.P, 'Array', {
  // https://github.com/domenic/Array.prototype.includes
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_dereq_(3)('includes');
},{"22":22,"3":3,"7":7}],173:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = _dereq_(22);

$export($export.P, 'Map', {toJSON: _dereq_(13)('Map')});
},{"13":13,"22":22}],174:[function(_dereq_,module,exports){
// http://goo.gl/XkBrjD
var $export  = _dereq_(22)
  , $entries = _dereq_(55)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"22":22,"55":55}],175:[function(_dereq_,module,exports){
// https://gist.github.com/WebReflection/9353781
var $          = _dereq_(46)
  , $export    = _dereq_(22)
  , ownKeys    = _dereq_(56)
  , toIObject  = _dereq_(78)
  , createDesc = _dereq_(59);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , setDesc = $.setDesc
      , getDesc = $.getDesc
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i){
      D = getDesc(O, key = keys[i++]);
      if(key in result)setDesc(result, key, createDesc(0, D));
      else result[key] = D;
    } return result;
  }
});
},{"22":22,"46":46,"56":56,"59":59,"78":78}],176:[function(_dereq_,module,exports){
// http://goo.gl/XkBrjD
var $export = _dereq_(22)
  , $values = _dereq_(55)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"22":22,"55":55}],177:[function(_dereq_,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = _dereq_(22)
  , $re     = _dereq_(62)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"22":22,"62":62}],178:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = _dereq_(22);

$export($export.P, 'Set', {toJSON: _dereq_(13)('Set')});
},{"13":13,"22":22}],179:[function(_dereq_,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = _dereq_(22)
  , $at     = _dereq_(70)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"22":22,"70":70}],180:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(22)
  , $pad    = _dereq_(72);

$export($export.P, 'String', {
  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"22":22,"72":72}],181:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(22)
  , $pad    = _dereq_(72);

$export($export.P, 'String', {
  padRight: function padRight(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"22":22,"72":72}],182:[function(_dereq_,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_dereq_(74)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
});
},{"74":74}],183:[function(_dereq_,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_dereq_(74)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
});
},{"74":74}],184:[function(_dereq_,module,exports){
// JavaScript 1.6 / Strawman array statics shim
var $       = _dereq_(46)
  , $export = _dereq_(22)
  , $ctx    = _dereq_(17)
  , $Array  = _dereq_(16).Array || Array
  , statics = {};
var setStatics = function(keys, length){
  $.each.call(keys.split(','), function(key){
    if(length == undefined && key in $Array)statics[key] = $Array[key];
    else if(key in [])statics[key] = $ctx(Function.call, [][key], length);
  });
};
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
           'reduce,reduceRight,copyWithin,fill');
$export($export.S, 'Array', statics);
},{"16":16,"17":17,"22":22,"46":46}],185:[function(_dereq_,module,exports){
_dereq_(91);
var global      = _dereq_(29)
  , hide        = _dereq_(31)
  , Iterators   = _dereq_(45)
  , ITERATOR    = _dereq_(83)('iterator')
  , NL          = global.NodeList
  , HTC         = global.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype
  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);
},{"29":29,"31":31,"45":45,"83":83,"91":91}],186:[function(_dereq_,module,exports){
var $export = _dereq_(22)
  , $task   = _dereq_(75);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"22":22,"75":75}],187:[function(_dereq_,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = _dereq_(29)
  , $export    = _dereq_(22)
  , invoke     = _dereq_(33)
  , partial    = _dereq_(57)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"22":22,"29":29,"33":33,"57":57}],188:[function(_dereq_,module,exports){
_dereq_(85);
_dereq_(169);
_dereq_(124);
_dereq_(132);
_dereq_(136);
_dereq_(137);
_dereq_(125);
_dereq_(135);
_dereq_(134);
_dereq_(130);
_dereq_(131);
_dereq_(129);
_dereq_(126);
_dereq_(128);
_dereq_(133);
_dereq_(127);
_dereq_(95);
_dereq_(94);
_dereq_(114);
_dereq_(115);
_dereq_(116);
_dereq_(117);
_dereq_(118);
_dereq_(119);
_dereq_(120);
_dereq_(121);
_dereq_(122);
_dereq_(123);
_dereq_(97);
_dereq_(98);
_dereq_(99);
_dereq_(100);
_dereq_(101);
_dereq_(102);
_dereq_(103);
_dereq_(104);
_dereq_(105);
_dereq_(106);
_dereq_(107);
_dereq_(108);
_dereq_(109);
_dereq_(110);
_dereq_(111);
_dereq_(112);
_dereq_(113);
_dereq_(162);
_dereq_(165);
_dereq_(168);
_dereq_(164);
_dereq_(160);
_dereq_(161);
_dereq_(163);
_dereq_(166);
_dereq_(167);
_dereq_(90);
_dereq_(92);
_dereq_(91);
_dereq_(93);
_dereq_(86);
_dereq_(87);
_dereq_(89);
_dereq_(88);
_dereq_(153);
_dereq_(154);
_dereq_(155);
_dereq_(156);
_dereq_(157);
_dereq_(158);
_dereq_(138);
_dereq_(96);
_dereq_(159);
_dereq_(170);
_dereq_(171);
_dereq_(139);
_dereq_(140);
_dereq_(141);
_dereq_(142);
_dereq_(143);
_dereq_(146);
_dereq_(144);
_dereq_(145);
_dereq_(147);
_dereq_(148);
_dereq_(149);
_dereq_(150);
_dereq_(152);
_dereq_(151);
_dereq_(172);
_dereq_(179);
_dereq_(180);
_dereq_(181);
_dereq_(182);
_dereq_(183);
_dereq_(177);
_dereq_(175);
_dereq_(176);
_dereq_(174);
_dereq_(173);
_dereq_(178);
_dereq_(184);
_dereq_(187);
_dereq_(186);
_dereq_(185);
module.exports = _dereq_(16);
},{"100":100,"101":101,"102":102,"103":103,"104":104,"105":105,"106":106,"107":107,"108":108,"109":109,"110":110,"111":111,"112":112,"113":113,"114":114,"115":115,"116":116,"117":117,"118":118,"119":119,"120":120,"121":121,"122":122,"123":123,"124":124,"125":125,"126":126,"127":127,"128":128,"129":129,"130":130,"131":131,"132":132,"133":133,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"140":140,"141":141,"142":142,"143":143,"144":144,"145":145,"146":146,"147":147,"148":148,"149":149,"150":150,"151":151,"152":152,"153":153,"154":154,"155":155,"156":156,"157":157,"158":158,"159":159,"16":16,"160":160,"161":161,"162":162,"163":163,"164":164,"165":165,"166":166,"167":167,"168":168,"169":169,"170":170,"171":171,"172":172,"173":173,"174":174,"175":175,"176":176,"177":177,"178":178,"179":179,"180":180,"181":181,"182":182,"183":183,"184":184,"185":185,"186":186,"187":187,"85":85,"86":86,"87":87,"88":88,"89":89,"90":90,"91":91,"92":92,"93":93,"94":94,"95":95,"96":96,"97":97,"98":98,"99":99}],189:[function(_dereq_,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : new Promise(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
"use strict";
var Reflect;
(function (Reflect) {
    // Load global or shim versions of Map, Set, and WeakMap
    var functionPrototype = Object.getPrototypeOf(Function);
    var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
    var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    var __Metadata__ = new _WeakMap();
    /**
      * Applies a set of decorators to a property of a target object.
      * @param decorators An array of decorators.
      * @param target The target object.
      * @param targetKey (Optional) The property key to decorate.
      * @param targetDescriptor (Optional) The property descriptor for the target key
      * @remarks Decorators are applied in reverse order.
      * @example
      *
      *     class C {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     C = Reflect.decorate(decoratorsArray, C);
      *
      *     // property (on constructor)
      *     Reflect.decorate(decoratorsArray, C, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.decorate(decoratorsArray, C.prototype, "property");
      *
      *     // method (on constructor)
      *     Object.defineProperty(C, "staticMethod",
      *         Reflect.decorate(decoratorsArray, C, "staticMethod",
      *             Object.getOwnPropertyDescriptor(C, "staticMethod")));
      *
      *     // method (on prototype)
      *     Object.defineProperty(C.prototype, "method",
      *         Reflect.decorate(decoratorsArray, C.prototype, "method",
      *             Object.getOwnPropertyDescriptor(C.prototype, "method")));
      *
      */
    function decorate(decorators, target, targetKey, targetDescriptor) {
        if (!IsUndefined(targetDescriptor)) {
            if (!IsArray(decorators)) {
                throw new TypeError();
            }
            else if (!IsObject(target)) {
                throw new TypeError();
            }
            else if (IsUndefined(targetKey)) {
                throw new TypeError();
            }
            else if (!IsObject(targetDescriptor)) {
                throw new TypeError();
            }
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
        }
        else if (!IsUndefined(targetKey)) {
            if (!IsArray(decorators)) {
                throw new TypeError();
            }
            else if (!IsObject(target)) {
                throw new TypeError();
            }
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
        }
        else {
            if (!IsArray(decorators)) {
                throw new TypeError();
            }
            else if (!IsConstructor(target)) {
                throw new TypeError();
            }
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class C {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class C {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class C {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class C {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class C {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
    function metadata(metadataKey, metadataValue) {
        function decorator(target, targetKey) {
            if (!IsUndefined(targetKey)) {
                if (!IsObject(target)) {
                    throw new TypeError();
                }
                targetKey = ToPropertyKey(targetKey);
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
            }
            else {
                if (!IsConstructor(target)) {
                    throw new TypeError();
                }
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
            }
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    /**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param targetKey (Optional) The property key for the target.
      * @example
      *
      *     class C {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Reflect.defineMetadata("custom:annotation", options, C);
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, C, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, C.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, C, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, C.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): Decorator {
      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
    }
    Reflect.defineMetadata = defineMetadata;
    /**
      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
      * @example
      *
      *     class C {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasMetadata("custom:annotation", C);
      *
      *     // property (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", C, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", C.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", C, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", C.prototype, "method");
      *
      */
    function hasMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryHasMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasMetadata = hasMetadata;
    /**
      * Gets a value indicating whether the target object has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
      * @example
      *
      *     class C {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasOwnMetadata("custom:annotation", C);
      *
      *     // property (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", C, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", C.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", C, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", C.prototype, "method");
      *
      */
    function hasOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class C {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadata("custom:annotation", C);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", C, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", C.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", C, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", C.prototype, "method");
      *
      */
    function getMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryGetMetadata(metadataKey, target, targetKey);
    }
    Reflect.getMetadata = getMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class C {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadata("custom:annotation", C);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", C, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", C.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", C, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", C.prototype, "method");
      *
      */
    function getOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    /**
      * Gets the metadata keys defined on the target object or its prototype chain.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class C {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadataKeys(C);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadataKeys(C, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadataKeys(C.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadataKeys(C, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadataKeys(C.prototype, "method");
      *
      */
    function getMetadataKeys(target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryMetadataKeys(target, targetKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    /**
      * Gets the unique metadata keys defined on the target object.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class C {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadataKeys(C);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadataKeys(C, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadataKeys(C.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadataKeys(C, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadataKeys(C.prototype, "method");
      *
      */
    function getOwnMetadataKeys(target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryOwnMetadataKeys(target, targetKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    /**
      * Deletes the metadata entry from the target object with the provided key.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
      * @example
      *
      *     class C {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.deleteMetadata("custom:annotation", C);
      *
      *     // property (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", C, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", C.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", C, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", C.prototype, "method");
      *
      */
    function deleteMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#deletemetadata-metadatakey-p-
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
        if (IsUndefined(metadataMap)) {
            return false;
        }
        if (!metadataMap.delete(metadataKey)) {
            return false;
        }
        if (metadataMap.size > 0) {
            return true;
        }
        var targetMetadata = __Metadata__.get(target);
        targetMetadata.delete(targetKey);
        if (targetMetadata.size > 0) {
            return true;
        }
        __Metadata__.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated)) {
                if (!IsConstructor(decorated)) {
                    throw new TypeError();
                }
                target = decorated;
            }
        }
        return target;
    }
    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated)) {
                if (!IsObject(decorated)) {
                    throw new TypeError();
                }
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            decorator(target, propertyKey);
        }
    }
    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#getorcreatemetadatamap--o-p-create-
    function GetOrCreateMetadataMap(target, targetKey, create) {
        var targetMetadata = __Metadata__.get(target);
        if (!targetMetadata) {
            if (!create) {
                return undefined;
            }
            targetMetadata = new _Map();
            __Metadata__.set(target, targetMetadata);
        }
        var keyMetadata = targetMetadata.get(targetKey);
        if (!keyMetadata) {
            if (!create) {
                return undefined;
            }
            keyMetadata = new _Map();
            targetMetadata.set(targetKey, keyMetadata);
        }
        return keyMetadata;
    }
    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
            return true;
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
            return OrdinaryHasMetadata(MetadataKey, parent, P);
        }
        return false;
    }
    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, false);
        if (metadataMap === undefined) {
            return false;
        }
        return Boolean(metadataMap.has(MetadataKey));
    }
    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetmetadata--metadatakey-o-p-
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
            return OrdinaryGetMetadata(MetadataKey, parent, P);
        }
        return undefined;
    }
    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, false);
        if (metadataMap === undefined) {
            return undefined;
        }
        return metadataMap.get(MetadataKey);
    }
    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarymetadatakeys--o-p-
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = GetPrototypeOf(O);
        if (parent === null) {
            return ownKeys;
        }
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0) {
            return ownKeys;
        }
        if (ownKeys.length <= 0) {
            return parentKeys;
        }
        var set = new _Set();
        var keys = [];
        for (var _i = 0; _i < ownKeys.length; _i++) {
            var key = ownKeys[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        for (var _a = 0; _a < parentKeys.length; _a++) {
            var key = parentKeys[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        return keys;
    }
    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryownmetadatakeys--o-p-
    function OrdinaryOwnMetadataKeys(target, targetKey) {
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
        var keys = [];
        if (metadataMap) {
            metadataMap.forEach(function (_, key) { return keys.push(key); });
        }
        return keys;
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
        return x === undefined;
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
    function IsArray(x) {
        return Array.isArray(x);
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
    function IsConstructor(x) {
        return typeof x === "function";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
    function ToPropertyKey(value) {
        if (IsSymbol(value)) {
            return value;
        }
        return String(value);
    }
    function GetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype) {
            return proto;
        }
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard. 
        // Try to determine the superclass constructor. Compatible implementations
        // must either set __proto__ on a subclass constructor to the superclass constructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
        if (proto !== functionPrototype) {
            return proto;
        }
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
        var prototype = O.prototype;
        var prototypeProto = Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype) {
            return proto;
        }
        // if the constructor was not a function, then we cannot determine the heritage.
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function") {
            return proto;
        }
        // if we have some kind of self-reference, then we cannot determine the heritage.
        if (constructor === O) {
            return proto;
        }
        // we have a pretty good guess at the heritage.
        return constructor;
    }
    // naive Map shim
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        function Map() {
            this._keys = [];
            this._values = [];
            this._cache = cacheSentinel;
        }
        Map.prototype = {
            get size() {
                return this._keys.length;
            },
            has: function (key) {
                if (key === this._cache) {
                    return true;
                }
                if (this._find(key) >= 0) {
                    this._cache = key;
                    return true;
                }
                return false;
            },
            get: function (key) {
                var index = this._find(key);
                if (index >= 0) {
                    this._cache = key;
                    return this._values[index];
                }
                return undefined;
            },
            set: function (key, value) {
                this.delete(key);
                this._keys.push(key);
                this._values.push(value);
                this._cache = key;
                return this;
            },
            delete: function (key) {
                var index = this._find(key);
                if (index >= 0) {
                    this._keys.splice(index, 1);
                    this._values.splice(index, 1);
                    this._cache = cacheSentinel;
                    return true;
                }
                return false;
            },
            clear: function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cache = cacheSentinel;
            },
            forEach: function (callback, thisArg) {
                var size = this.size;
                for (var i = 0; i < size; ++i) {
                    var key = this._keys[i];
                    var value = this._values[i];
                    this._cache = key;
                    callback.call(this, value, key, this);
                }
            },
            _find: function (key) {
                var keys = this._keys;
                var size = keys.length;
                for (var i = 0; i < size; ++i) {
                    if (keys[i] === key) {
                        return i;
                    }
                }
                return -1;
            }
        };
        return Map;
    }
    // naive Set shim
    function CreateSetPolyfill() {
        var cacheSentinel = {};
        function Set() {
            this._map = new _Map();
        }
        Set.prototype = {
            get size() {
                return this._map.length;
            },
            has: function (value) {
                return this._map.has(value);
            },
            add: function (value) {
                this._map.set(value, value);
                return this;
            },
            delete: function (value) {
                return this._map.delete(value);
            },
            clear: function () {
                this._map.clear();
            },
            forEach: function (callback, thisArg) {
                this._map.forEach(callback, thisArg);
            }
        };
        return Set;
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var isNode = typeof global !== "undefined" && Object.prototype.toString.call(global.process) === '[object process]';
        var nodeCrypto = isNode && require("crypto");
        var hasOwn = Object.prototype.hasOwnProperty;
        var keys = {};
        var rootKey = CreateUniqueKey();
        function WeakMap() {
            this._key = CreateUniqueKey();
        }
        WeakMap.prototype = {
            has: function (target) {
                var table = GetOrCreateWeakMapTable(target, false);
                if (table) {
                    return this._key in table;
                }
                return false;
            },
            get: function (target) {
                var table = GetOrCreateWeakMapTable(target, false);
                if (table) {
                    return table[this._key];
                }
                return undefined;
            },
            set: function (target, value) {
                var table = GetOrCreateWeakMapTable(target, true);
                table[this._key] = value;
                return this;
            },
            delete: function (target) {
                var table = GetOrCreateWeakMapTable(target, false);
                if (table && this._key in table) {
                    return delete table[this._key];
                }
                return false;
            },
            clear: function () {
                // NOTE: not a real clear, just makes the previous data unreachable
                this._key = CreateUniqueKey();
            }
        };
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i) {
                buffer[i] = Math.random() * 255 | 0;
            }
        }
        function GenRandomBytes(size) {
            if (nodeCrypto) {
                var data = nodeCrypto.randomBytes(size);
                return data;
            }
            else if (typeof Uint8Array === "function") {
                var data = new Uint8Array(size);
                if (typeof crypto !== "undefined") {
                    crypto.getRandomValues(data);
                }
                else if (typeof msCrypto !== "undefined") {
                    msCrypto.getRandomValues(data);
                }
                else {
                    FillRandomBytes(data, size);
                }
                return data;
            }
            else {
                var data = new Array(size);
                FillRandomBytes(data, size);
                return data;
            }
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            // mark as random - RFC 4122 § 4.4
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8) {
                    result += "-";
                }
                if (byte < 16) {
                    result += "0";
                }
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
        function CreateUniqueKey() {
            var key;
            do {
                key = "@@WeakMap@@" + CreateUUID();
            } while (hasOwn.call(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create) {
                    return undefined;
                }
                Object.defineProperty(target, rootKey, { value: Object.create(null) });
            }
            return target[rootKey];
        }
        return WeakMap;
    }
    // hook global Reflect
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    __global.Reflect[p] = Reflect[p];
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof window !== "undefined" ? window :
        typeof WorkerGlobalScope !== "undefined" ? self :
            typeof global !== "undefined" ? global :
                Function("return this;")());
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.ngForward = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var babelHelpers_inherits = function babelHelpers_inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var babelHelpers_createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    var babelHelpers_toConsumableArray = function babelHelpers_toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        } else {
            return Array.from(arr);
        }
    };

    var babelHelpers_slicedToArray = (function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    })();

    var babelHelpers_bind = Function.prototype.bind;

    var babelHelpers_defineProperty = function babelHelpers_defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    };

    var babelHelpers_get = function get(_x, _x3, _x4) {
        var _again2 = true;

        _function2: while (_again2) {
            var object = _x,
                property = _x3,
                receiver = _x4;
            _again2 = false;

            if (object === null) object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);

            if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);

                if (parent === null) {
                    return undefined;
                } else {
                    _x = parent;
                    _x3 = property;
                    _x4 = receiver;
                    _again2 = true;
                    desc = parent = undefined;
                    continue _function2;
                }
            } else if ("value" in desc) {
                return desc.value;
            } else {
                var getter = desc.get;

                if (getter === undefined) {
                    return undefined;
                }

                return getter.call(receiver);
            }
        }
    };

    var babelHelpers_classCallCheck = function babelHelpers_classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var Metastore = (function () {
        function Metastore(namespace) {
            babelHelpers_classCallCheck(this, Metastore);

            this.namespace = namespace;
        }

        babelHelpers_createClass(Metastore, [{
            key: '_map',
            value: function _map(obj, key) {
                if (!Reflect.hasOwnMetadata(this.namespace, obj, key)) {
                    Reflect.defineMetadata(this.namespace, new Map(), obj, key);
                }
                return Reflect.getOwnMetadata(this.namespace, obj, key);
            }
        }, {
            key: 'get',
            value: function get(key, obj, prop) {
                return this._map(obj, prop).get(key);
            }
        }, {
            key: 'set',
            value: function set(key, value, obj, prop) {
                this._map(obj, prop).set(key, value);
            }
        }, {
            key: 'has',
            value: function has(key, obj, prop) {
                return this._map(obj, prop).has(key);
            }
        }, {
            key: 'push',
            value: function push(key, value, obj, prop) {
                if (!this.has(key, obj, prop)) {
                    this.set(key, [], obj, prop);
                }
                var store = this.get(key, obj, prop);
                if (!Array.isArray(store)) {
                    throw new Error('Metastores can only push metadata to array values');
                }
                store.push(value);
            }
        }, {
            key: 'merge',
            value: function merge(key, value, obj, prop) {
                var previous = this.get(key, obj, prop) || {};
                var mergedObj = Object.assign({}, previous, value);
                this.set(key, mergedObj, obj, prop);
            }
        }, {
            key: 'forEach',
            value: function forEach(callbackFn, obj, prop) {
                this._map(obj, prop).forEach(callbackFn);
            }
        }]);
        return Metastore;
    })();

    var componentStore = new Metastore('$component');
    var providerStore = new Metastore('$provider');
    var bundleStore = new Metastore('$bundle');

    var randomInt = function randomInt() {
        return Math.floor(Math.random() * 100);
    };
    function decoratorFactory(type) {
        var strategyType = arguments.length <= 1 || arguments[1] === undefined ? 'provider' : arguments[1];

        var names = new Set();
        function createUniqueName(_x2) {
            var _again = true;

            _function: while (_again) {
                var name = _x2;
                _again = false;

                if (names.has(name)) {
                    _x2 = '' + name + randomInt();
                    _again = true;
                    continue _function;
                } else {
                    return name;
                }
            }
        }
        ;
        var NAME_TAKEN_ERROR = function NAME_TAKEN_ERROR(name) {
            return new Error('A provider with type ' + type + ' and name ' + name + ' has already been registered');
        };
        return (function () {
            var d = function d(maybeT) {
                var writeWithUniqueName = function writeWithUniqueName(t) {
                    var name = createUniqueName(t.name);
                    providerStore.set('type', type, t);
                    providerStore.set('name', name, t);
                    names.add(name);
                };
                if (typeof maybeT === 'string') {
                    if (names.has(maybeT)) {
                        throw NAME_TAKEN_ERROR(maybeT);
                    }
                    return function (t) {
                        providerStore.set('type', type, t);
                        providerStore.set('name', maybeT, t);
                        names.add(maybeT);
                    };
                } else if (maybeT === undefined) {
                    return function (t) {
                        return writeWithUniqueName(t);
                    };
                }
                writeWithUniqueName(maybeT);
            };
            d.clearNameCache = function () {
                return names.clear();
            };
            return d;
        })();
    }
    ;

    var _parsers = {};

    var DecoratedModule = (function () {
        function DecoratedModule(name) {
            var modules = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
            babelHelpers_classCallCheck(this, DecoratedModule);

            this.name = name;
            if (modules) {
                this.moduleList(modules);
                this._module = angular.module(name, this._dependencies);
            } else {
                this._module = angular.module(name);
            }
        }

        babelHelpers_createClass(DecoratedModule, [{
            key: 'add',
            value: function add() {
                var _this = this;

                for (var _len = arguments.length, providers = Array(_len), _key = 0; _key < _len; _key++) {
                    providers[_key] = arguments[_key];
                }

                // We used a rest parameter so that you can add multiple providers at once.
                // So we must iterate over our array of providers.
                var providersInferred = providers.filter(function (p) {
                    return !p.isProvider;
                });
                var providersProper = providers.filter(function (p) {
                    return p.isProvider;
                });
                var handleProvider = function handleProvider(provider) {
                    if (!providerStore.has('type', provider)) {
                        throw new Error('Cannot read provider metadata. Are you adding a class that hasn\'t been decorated yet?');
                    }
                    var type = providerStore.get('type', provider);
                    var name = providerStore.get('name', provider);
                    var inject = bundleStore.get('$inject', provider) || [];
                    if (_parsers[type]) {
                        _parsers[type](provider, name, inject, _this._module);
                    } else {
                        throw new Error('No parser registered for type \'' + type + '\'');
                    }
                };
                providersInferred.forEach(handleProvider);
                providersProper.forEach(handleProvider);
                return this;
            }
        }, {
            key: 'publish',
            value: function publish() {
                return this._module;
            }
        }, {
            key: 'moduleList',
            value: function moduleList(modules) {
                this._dependencies = [];
                if (modules && modules.length !== 0) {
                    for (var i = 0; i < modules.length; i++) {
                        if (typeof modules[i] === 'string') {
                            this._dependencies.push(modules[i]);
                        } else if (modules[i] && modules[i].name) {
                            this._dependencies.push(modules[i].name);
                        } else {
                            throw new Error('Cannot read module: Unknown module in ' + this.name);
                        }
                    }
                }
            }
        }, {
            key: 'config',
            value: function config(configFunc) {
                this._module.config(configFunc);
                return this;
            }
        }, {
            key: 'run',
            value: function run(runFunc) {
                this._module.run(runFunc);
                return this;
            }
        }, {
            key: 'value',
            value: function value(name, _value) {
                this._module.value(name, _value);
                return this;
            }
        }, {
            key: 'constant',
            value: function constant(name, value) {
                this._module.constant(name, value);
                return this;
            }
        }]);
        return DecoratedModule;
    })();

    var Module = function Module(name, modules) {
        return new DecoratedModule(name, modules);
    };
    Module.addProvider = function (providerType, parser) {
        _parsers[providerType] = parser;
    };
    Module.getParser = function (providerType) {
        return _parsers[providerType];
    };

    var INJECTABLE = 'injectable';
    var Injectable = decoratorFactory(INJECTABLE);
    Module.addProvider(INJECTABLE, function (provider, name, injects, ngModule) {
        ngModule.service(name, [].concat(babelHelpers_toConsumableArray(injects), [provider]));
    });

    var OpaqueToken = (function () {
        function OpaqueToken(_desc) {
            babelHelpers_classCallCheck(this, OpaqueToken);

            this._desc = _desc;
        }

        babelHelpers_createClass(OpaqueToken, [{
            key: "toString",
            value: function toString() {
                return "Token " + this._desc;
            }
        }]);
        return OpaqueToken;
    })();

    var getInjectableName = function getInjectableName(injectable) {
        if (typeof injectable === 'string' || injectable instanceof OpaqueToken) {
            return injectable.toString();
        } else if (providerStore.has('type', injectable)) {
            return providerStore.get('name', injectable);
        }
    };
    var getInjectableNameWithJitCreation = function getInjectableNameWithJitCreation(injectable) {
        var name = getInjectableName(injectable);
        if (name) {
            return name;
        }
        if (typeof injectable === 'function') {
            Injectable(injectable);
            return providerStore.get('name', injectable);
        }
    };

    function parseSelector(selector) {
        var selectorArray = undefined;
        var type = undefined;
        if (selector.match(/\[(.*?)\]/) !== null) {
            selectorArray = selector.slice(1, selector.length - 1).split('-');
            type = 'A';
        } else if (selector[0] === '.') {
            selectorArray = selector.slice(1, selector.length).split('-');
            type = 'C';
        } else {
            selectorArray = selector.split('-');
            type = 'E';
        }
        var first = selectorArray.shift();
        var name = undefined;
        if (selectorArray.length > 0) {
            for (var i = 0; i < selectorArray.length; i++) {
                var s = selectorArray[i];
                s = s.slice(0, 1).toUpperCase() + s.slice(1, s.length);
                selectorArray[i] = s;
            }
            name = [first].concat(babelHelpers_toConsumableArray(selectorArray)).join('');
        } else {
            name = first;
        }
        return { name: name, type: type };
    }

    var SNAKE_CASE_REGEXP = /[A-Z]/g;

    function dasherize(name) {
        var separator = arguments.length <= 1 || arguments[1] === undefined ? '-' : arguments[1];

        return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
            return '' + (pos ? separator : '') + letter.toLowerCase();
        });
    }

    function flatten(items) {
        var resolved = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                if (Array.isArray(item)) {
                    resolved.push.apply(resolved, babelHelpers_toConsumableArray(flatten(item)));
                } else {
                    resolved.push(item);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return resolved;
    }

    function createConfigErrorMessage(target, ngModule, message) {
        return 'Processing "' + target.name + '" in "' + ngModule.name + '": ' + message;
    }

    var BIND_STRING = '_bind_string_';
    var BIND_ONEWAY = '_bind_oneway_';
    var BIND_TWOWAY = '_bind_twoway_';
    function isDefined(value) {
        return typeof value !== 'undefined';
    }

    function inputsMap(inputs) {
        var definition = {};
        for (var key in inputs) {
            var lowercaseInput = inputs[key];
            definition['@' + key] = '@' + lowercaseInput;
            definition['[' + inputs[key] + ']'] = '=?';
            definition['[(' + inputs[key] + ')]'] = '=?';
        }
        return definition;
    }

    function inputsBuilder(controller, localKey, publicKey) {
        var _Object$defineProperties;

        // We are going to be installing a lot of properties on the controller to handle the magic
        // of our input bindings. Here we are marking them as hidden but writeable, that way
        // we don't leak our abstraction
        var stringKey = '@' + localKey;
        var oneWayKey = '[' + publicKey + ']';
        var twoWayKey = '[(' + publicKey + ')]';
        var __stringKey = Symbol();
        var __oneWayKey = Symbol();
        var __twoWayKey = Symbol();
        var __using_binding = Symbol();
        Object.defineProperties(controller, (_Object$defineProperties = {}, babelHelpers_defineProperty(_Object$defineProperties, stringKey, {
            enumerable: false, configurable: false,
            set: createHiddenPropSetter(BIND_STRING, __stringKey),
            get: function get() {
                return this[__stringKey];
            }
        }), babelHelpers_defineProperty(_Object$defineProperties, oneWayKey, {
            enumerable: false, configurable: false,
            set: createHiddenPropSetter(BIND_ONEWAY, __oneWayKey),
            get: function get() {
                return this[__oneWayKey];
            }
        }), babelHelpers_defineProperty(_Object$defineProperties, twoWayKey, {
            enumerable: false, configurable: false,
            set: createHiddenPropSetter(BIND_TWOWAY, __twoWayKey),
            get: function get() {
                return this[localKey];
            }
        }), babelHelpers_defineProperty(_Object$defineProperties, __using_binding, {
            enumerable: false, configurable: false, writable: true,
            value: controller.__using_binding || {}
        }), _Object$defineProperties));
        function createHiddenPropSetter(BIND_TYPE, __privateKey) {
            return function (val) {
                this[__privateKey] = val;
                if (isDefined(val)) {
                    setBindingUsed(BIND_TYPE, localKey);
                }
                if (controller[__using_binding][localKey] === BIND_TYPE) {
                    this[localKey] = val;
                }
            };
        }
        function setBindingUsed(using, key) {
            if (controller[__using_binding][key] && controller[__using_binding][key] !== using) {
                throw new Error('Can not use more than one type of attribute binding simultaneously: ' + key + ', [' + key + '], [(' + key + ')]. Choose one.');
            }
            controller[__using_binding][key] = using;
        }
    }

    var Subscription = (function () {
        function Subscription(_unsubscribe) {
            babelHelpers_classCallCheck(this, Subscription);

            this.isUnsubscribed = false;
            if (_unsubscribe) {
                this._unsubscribe = _unsubscribe;
            }
        }

        babelHelpers_createClass(Subscription, [{
            key: "_unsubscribe",
            value: function _unsubscribe() {}
        }, {
            key: "unsubscribe",
            value: function unsubscribe() {
                if (this.isUnsubscribed) {
                    return;
                }
                this.isUnsubscribed = true;
                var unsubscribe = this._unsubscribe;
                var subscriptions = this._subscriptions;
                this._subscriptions = void 0;
                if (unsubscribe) {
                    unsubscribe.call(this);
                }
                if (subscriptions != null) {
                    var index = -1;
                    var len = subscriptions.length;
                    while (++index < len) {
                        subscriptions[index].unsubscribe();
                    }
                }
            }
        }, {
            key: "add",
            value: function add(subscription) {
                // return early if:
                //  1. the subscription is null
                //  2. we're attempting to add our this
                //  3. we're attempting to add the static `empty` Subscription
                if (!subscription || subscription === this || subscription === Subscription.EMPTY) {
                    return;
                }
                var sub = subscription;
                switch (typeof subscription) {
                    case "function":
                        sub = new Subscription(subscription);
                    case "object":
                        if (sub.isUnsubscribed || typeof sub.unsubscribe !== "function") {
                            break;
                        } else if (this.isUnsubscribed) {
                            sub.unsubscribe();
                        } else {
                            var subscriptions = this._subscriptions || (this._subscriptions = []);
                            subscriptions.push(sub);
                        }
                        break;
                    default:
                        throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
                }
            }
        }, {
            key: "remove",
            value: function remove(subscription) {
                // return early if:
                //  1. the subscription is null
                //  2. we're attempting to remove ourthis
                //  3. we're attempting to remove the static `empty` Subscription
                if (subscription == null || subscription === this || subscription === Subscription.EMPTY) {
                    return;
                }
                var subscriptions = this._subscriptions;
                if (subscriptions) {
                    var subscriptionIndex = subscriptions.indexOf(subscription);
                    if (subscriptionIndex !== -1) {
                        subscriptions.splice(subscriptionIndex, 1);
                    }
                }
            }
        }]);
        return Subscription;
    })();

    Subscription.EMPTY = (function (empty) {
        empty.isUnsubscribed = true;
        return empty;
    })(new Subscription());

    function noop() {}

    function throwError(e) {
        throw e;
    }

    function tryOrOnError(target) {
        function tryCatcher() {
            try {
                tryCatcher.target.apply(this, arguments);
            } catch (e) {
                this.error(e);
            }
        }
        tryCatcher.target = target;
        return tryCatcher;
    }

    var Subscriber = (function (_Subscription) {
        babelHelpers_inherits(Subscriber, _Subscription);

        function Subscriber(destination) {
            babelHelpers_classCallCheck(this, Subscriber);

            babelHelpers_get(Object.getPrototypeOf(Subscriber.prototype), 'constructor', this).call(this);
            this.destination = destination;
            this._isUnsubscribed = false;
            if (!this.destination) {
                return;
            }
            var subscription = destination._subscription;
            if (subscription) {
                this._subscription = subscription;
            } else if (destination instanceof Subscriber) {
                this._subscription = destination;
            }
        }

        babelHelpers_createClass(Subscriber, [{
            key: 'add',
            value: function add(sub) {
                // route add to the shared Subscription if it exists
                var _subscription = this._subscription;
                if (_subscription) {
                    _subscription.add(sub);
                } else {
                    babelHelpers_get(Object.getPrototypeOf(Subscriber.prototype), 'add', this).call(this, sub);
                }
            }
        }, {
            key: 'remove',
            value: function remove(sub) {
                // route remove to the shared Subscription if it exists
                if (this._subscription) {
                    this._subscription.remove(sub);
                } else {
                    babelHelpers_get(Object.getPrototypeOf(Subscriber.prototype), 'remove', this).call(this, sub);
                }
            }
        }, {
            key: 'unsubscribe',
            value: function unsubscribe() {
                if (this._isUnsubscribed) {
                    return;
                } else if (this._subscription) {
                    this._isUnsubscribed = true;
                } else {
                    babelHelpers_get(Object.getPrototypeOf(Subscriber.prototype), 'unsubscribe', this).call(this);
                }
            }
        }, {
            key: '_next',
            value: function _next(value) {
                this.destination.next(value);
            }
        }, {
            key: '_error',
            value: function _error(err) {
                this.destination.error(err);
            }
        }, {
            key: '_complete',
            value: function _complete() {
                this.destination.complete();
            }
        }, {
            key: 'next',
            value: function next(value) {
                if (!this.isUnsubscribed) {
                    this._next(value);
                }
            }
        }, {
            key: 'error',
            value: function error(_error2) {
                if (!this.isUnsubscribed) {
                    this._error(_error2);
                    this.unsubscribe();
                }
            }
        }, {
            key: 'complete',
            value: function complete() {
                if (!this.isUnsubscribed) {
                    this._complete();
                    this.unsubscribe();
                }
            }
        }, {
            key: 'isUnsubscribed',
            get: function get() {
                var subscription = this._subscription;
                if (subscription) {
                    // route to the shared Subscription if it exists
                    return this._isUnsubscribed || subscription.isUnsubscribed;
                } else {
                    return this._isUnsubscribed;
                }
            },
            set: function set(value) {
                var subscription = this._subscription;
                if (subscription) {
                    // route to the shared Subscription if it exists
                    subscription.isUnsubscribed = Boolean(value);
                } else {
                    this._isUnsubscribed = Boolean(value);
                }
            }
        }], [{
            key: 'create',
            value: function create(next, error, complete) {
                var subscriber = new Subscriber();
                subscriber._next = typeof next === "function" && tryOrOnError(next) || noop;
                subscriber._error = typeof error === "function" && error || throwError;
                subscriber._complete = typeof complete === "function" && complete || noop;
                return subscriber;
            }
        }]);
        return Subscriber;
    })(Subscription);

    var objectTypes = {
        'boolean': false,
        'function': true,
        'object': true,
        'number': false,
        'string': false,
        'undefined': false
    };
    var root = objectTypes[typeof self] && self || objectTypes[typeof window] && window;
    var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
    var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
    var freeGlobal = objectTypes[typeof global] && global;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
        root = freeGlobal;
    }

    if (!root.Symbol) {
        root.Symbol = {};
    }
    if (!root.Symbol.observable) {
        if (typeof root.Symbol['for'] === 'function') {
            root.Symbol.observable = root.Symbol['for']('observable');
        } else {
            root.Symbol.observable = '@@observable';
        }
    }
    var $$observable = root.Symbol.observable;

    /**
     * A representation of any set of values over any amount of time. This the most basic building block
     * of RxJS.
     *
     * @class Observable<T>
     */

    var Observable = (function () {
        /**
         * @constructor
         * @param {Function} subscribe the function that is
         * called when the Observable is initially subscribed to. This function is given a Subscriber, to which new values
         * can be `next`ed, or an `error` method can be called to raise an error, or `complete` can be called to notify
         * of a successful completion.
         */

        function Observable(subscribe) {
            babelHelpers_classCallCheck(this, Observable);

            this._isScalar = false;
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }

        // HACK: Since TypeScript inherits static properties too, we have to
        // fight against TypeScript here so Subject can have a different static create signature
        /**
         * @static
         * @method create
         * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
         * @returns {Observable} a new cold observable
         * @description creates a new cold Observable by calling the Observable constructor
         */

        /**
         * @method lift
         * @param {Operator} operator the operator defining the operation to take on the observable
         * @returns {Observable} a new observable with the Operator applied
         * @description creates a new Observable, with this Observable as the source, and the passed
         * operator defined as the new observable's operator.
         */
        babelHelpers_createClass(Observable, [{
            key: 'lift',
            value: function lift(operator) {
                var observable = new Observable();
                observable.source = this;
                observable.operator = operator;
                return observable;
            }

            /**
             * @method Symbol.observable
             * @returns {Observable} this instance of the observable
             * @description an interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
             */
        }, {
            key: $$observable,
            value: function value() {
                return this;
            }

            /**
             * @method subscribe
             * @param {Observer|Function} observerOrNext (optional) either an observer defining all functions to be called,
             *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
             * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
             *  the error will be thrown as unhandled
             * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
             * @returns {Subscription} a subscription reference to the registered handlers
             * @description registers handlers for handling emitted values, error and completions from the observable, and
             *  executes the observable's subscriber function, which will take action to set up the underlying data stream
             */
        }, {
            key: 'subscribe',
            value: function subscribe(observerOrNext, error, complete) {
                var subscriber = undefined;
                if (observerOrNext && typeof observerOrNext === "object") {
                    if (observerOrNext instanceof Subscriber) {
                        subscriber = observerOrNext;
                    } else {
                        subscriber = new Subscriber(observerOrNext);
                    }
                } else {
                    var next = observerOrNext;
                    subscriber = Subscriber.create(next, error, complete);
                }
                subscriber.add(this._subscribe(subscriber));
                return subscriber;
            }

            /**
             * @method forEach
             * @param {Function} next a handler for each value emitted by the observable
             * @param {PromiseConstructor} PromiseCtor? a constructor function used to instantiate the Promise
             * @returns {Promise} a promise that either resolves on observable completion or
             *  rejects with the handled error
             */
        }, {
            key: 'forEach',
            value: function forEach(next, PromiseCtor) {
                var _this = this;

                if (!PromiseCtor) {
                    if (root.Rx && root.Rx.config && root.Rx.config.Promise) {
                        PromiseCtor = root.Rx.config.Promise;
                    } else if (root.Promise) {
                        PromiseCtor = root.Promise;
                    }
                }
                if (!PromiseCtor) {
                    throw new Error('no Promise impl found');
                }
                return new PromiseCtor(function (resolve, reject) {
                    _this.subscribe(next, reject, resolve);
                });
            }
        }, {
            key: '_subscribe',
            value: function _subscribe(subscriber) {
                return this.source._subscribe(this.operator.call(subscriber));
            }
        }]);
        return Observable;
    })();

    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };

    var SubjectSubscription = (function (_Subscription) {
        babelHelpers_inherits(SubjectSubscription, _Subscription);

        function SubjectSubscription(subject, observer) {
            babelHelpers_classCallCheck(this, SubjectSubscription);

            babelHelpers_get(Object.getPrototypeOf(SubjectSubscription.prototype), 'constructor', this).call(this);
            this.subject = subject;
            this.observer = observer;
            this.isUnsubscribed = false;
        }

        babelHelpers_createClass(SubjectSubscription, [{
            key: 'unsubscribe',
            value: function unsubscribe() {
                if (this.isUnsubscribed) {
                    return;
                }
                this.isUnsubscribed = true;
                var subject = this.subject;
                var observers = subject.observers;
                this.subject = void 0;
                if (!observers || observers.length === 0 || subject.isUnsubscribed) {
                    return;
                }
                if (this.observer instanceof Subscriber) {
                    this.observer.unsubscribe();
                }
                var subscriberIndex = observers.indexOf(this.observer);
                if (subscriberIndex !== -1) {
                    observers.splice(subscriberIndex, 1);
                }
            }
        }]);
        return SubjectSubscription;
    })(Subscription);

    var subscriptionAdd = Subscription.prototype.add;
    var subscriptionRemove = Subscription.prototype.remove;
    var subscriptionUnsubscribe = Subscription.prototype.unsubscribe;
    var subscriberNext = Subscriber.prototype.next;
    var subscriberError = Subscriber.prototype.error;
    var subscriberComplete = Subscriber.prototype.complete;
    var _subscriberNext = Subscriber.prototype._next;
    var _subscriberError = Subscriber.prototype._error;
    var _subscriberComplete = Subscriber.prototype._complete;

    var Subject = (function (_Observable) {
        babelHelpers_inherits(Subject, _Observable);

        function Subject() {
            babelHelpers_classCallCheck(this, Subject);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            babelHelpers_get(Object.getPrototypeOf(Subject.prototype), 'constructor', this).apply(this, args);
            this.observers = [];
            this.isUnsubscribed = false;
            this.dispatching = false;
            this.errorSignal = false;
            this.completeSignal = false;
        }

        babelHelpers_createClass(Subject, [{
            key: 'lift',
            value: function lift(operator) {
                var subject = new BidirectionalSubject(this, this.destination || this);
                subject.operator = operator;
                return subject;
            }
        }, {
            key: '_subscribe',
            value: function _subscribe(subscriber) {
                if (subscriber.isUnsubscribed) {
                    return;
                } else if (this.errorSignal) {
                    subscriber.error(this.errorInstance);
                    return;
                } else if (this.completeSignal) {
                    subscriber.complete();
                    return;
                } else if (this.isUnsubscribed) {
                    throw new Error("Cannot subscribe to a disposed Subject.");
                }
                this.observers.push(subscriber);
                return new SubjectSubscription(this, subscriber);
            }
        }, {
            key: 'add',
            value: function add(subscription) {
                subscriptionAdd.call(this, subscription);
            }
        }, {
            key: 'remove',
            value: function remove(subscription) {
                subscriptionRemove.call(this, subscription);
            }
        }, {
            key: 'unsubscribe',
            value: function unsubscribe() {
                this.observers = void 0;
                subscriptionUnsubscribe.call(this);
            }
        }, {
            key: 'next',
            value: function next(value) {
                if (this.isUnsubscribed) {
                    return;
                }
                this.dispatching = true;
                this._next(value);
                this.dispatching = false;
                if (this.errorSignal) {
                    this.error(this.errorInstance);
                } else if (this.completeSignal) {
                    this.complete();
                }
            }
        }, {
            key: 'error',
            value: function error(_error) {
                if (this.isUnsubscribed || this.completeSignal) {
                    return;
                }
                this.errorSignal = true;
                this.errorInstance = _error;
                if (this.dispatching) {
                    return;
                }
                this._error(_error);
                this.unsubscribe();
            }
        }, {
            key: 'complete',
            value: function complete() {
                if (this.isUnsubscribed || this.errorSignal) {
                    return;
                }
                this.completeSignal = true;
                if (this.dispatching) {
                    return;
                }
                this._complete();
                this.unsubscribe();
            }
        }, {
            key: '_next',
            value: function _next(value) {
                var index = -1;
                var observers = this.observers.slice(0);
                var len = observers.length;
                while (++index < len) {
                    observers[index].next(value);
                }
            }
        }, {
            key: '_error',
            value: function _error(error) {
                var index = -1;
                var observers = this.observers;
                var len = observers.length;
                // optimization -- block next, complete, and unsubscribe while dispatching
                this.observers = void 0;
                this.isUnsubscribed = true;
                while (++index < len) {
                    observers[index].error(error);
                }
                this.isUnsubscribed = false;
            }
        }, {
            key: '_complete',
            value: function _complete() {
                var index = -1;
                var observers = this.observers;
                var len = observers.length;
                // optimization -- block next, complete, and unsubscribe while dispatching
                this.observers = void 0; // optimization
                this.isUnsubscribed = true;
                while (++index < len) {
                    observers[index].complete();
                }
                this.isUnsubscribed = false;
            }
        }], [{
            key: 'create',
            value: function create(source, destination) {
                return new BidirectionalSubject(source, destination);
            }
        }]);
        return Subject;
    })(Observable);

    var BidirectionalSubject = (function (_Subject) {
        babelHelpers_inherits(BidirectionalSubject, _Subject);

        function BidirectionalSubject(source, destination) {
            babelHelpers_classCallCheck(this, BidirectionalSubject);

            babelHelpers_get(Object.getPrototypeOf(BidirectionalSubject.prototype), 'constructor', this).call(this);
            this.source = source;
            this.destination = destination;
        }

        babelHelpers_createClass(BidirectionalSubject, [{
            key: '_subscribe',
            value: function _subscribe(subscriber) {
                var operator = this.operator;
                return this.source._subscribe.call(this.source, operator ? operator.call(subscriber) : subscriber);
            }
        }, {
            key: 'next',
            value: function next(x) {
                subscriberNext.call(this, x);
            }
        }, {
            key: 'error',
            value: function error(e) {
                subscriberError.call(this, e);
            }
        }, {
            key: 'complete',
            value: function complete() {
                subscriberComplete.call(this);
            }
        }, {
            key: '_next',
            value: function _next(x) {
                _subscriberNext.call(this, x);
            }
        }, {
            key: '_error',
            value: function _error(e) {
                _subscriberError.call(this, e);
            }
        }, {
            key: '_complete',
            value: function _complete() {
                _subscriberComplete.call(this);
            }
        }]);
        return BidirectionalSubject;
    })(Subject);

    var EventEmitter = (function (_Subject) {
        babelHelpers_inherits(EventEmitter, _Subject);

        function EventEmitter() {
            var isAsync = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
            babelHelpers_classCallCheck(this, EventEmitter);

            babelHelpers_get(Object.getPrototypeOf(EventEmitter.prototype), 'constructor', this).call(this);
            this._isAsync = isAsync;
        }

        babelHelpers_createClass(EventEmitter, [{
            key: 'subscribe',
            value: function subscribe(generatorOrNext, error, complete) {
                if (generatorOrNext && typeof generatorOrNext === 'object') {
                    var schedulerFn = this._isAsync ? function (value) {
                        setTimeout(function () {
                            return generatorOrNext.next(value);
                        });
                    } : function (value) {
                        generatorOrNext.next(value);
                    };
                    return babelHelpers_get(Object.getPrototypeOf(EventEmitter.prototype), 'subscribe', this).call(this, schedulerFn, function (err) {
                        return generatorOrNext.error ? generatorOrNext.error(err) : null;
                    }, function () {
                        return generatorOrNext.complete ? generatorOrNext.complete() : null;
                    });
                } else {
                    var schedulerFn = this._isAsync ? function (value) {
                        setTimeout(function () {
                            return generatorOrNext(value);
                        });
                    } : function (value) {
                        generatorOrNext(value);
                    };
                    return babelHelpers_get(Object.getPrototypeOf(EventEmitter.prototype), 'subscribe', this).call(this, schedulerFn, function (err) {
                        return error ? error(err) : null;
                    }, function () {
                        return complete ? complete() : null;
                    });
                }
            }
        }]);
        return EventEmitter;
    })(Subject);

    var NativeCustomEvent = CustomEvent;
    function useNative() {
        try {
            var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
            return 'cat' === p.type && 'bar' === p.detail.foo;
        } catch (e) {
            return false;
        }
    }
    function fromCreateEvent(type) {
        var params = arguments.length <= 1 || arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: {} } : arguments[1];

        var e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
        return e;
    }
    function fromCreateEventObject(type) {
        var params = arguments.length <= 1 || arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: {} } : arguments[1];

        var e = document.createEventObject();
        e.type = type;
        e.bubbles = params.bubbles;
        e.cancelable = params.cancelable;
        e.detail = params.detail;
        return e;
    }
    var eventExport = undefined;
    if (useNative()) {
        eventExport = NativeCustomEvent;
    } else if (typeof document.createEvent === 'function') {
        eventExport = fromCreateEvent;
    } else {
        eventExport = fromCreateEventObject;
    }
    var CustomEvent$1 = eventExport;

    function outputsBuilder(instance, element, $scope, outputs) {
        var subscriptions = [];
        var create = function create(eventKey, emitter) {
            return emitter.subscribe(function (data) {
                var event = new CustomEvent$1(eventKey, { detail: data, bubbles: false });
                element[0].dispatchEvent(event);
            });
        };
        for (var key in outputs) {
            if (instance[key] && instance[key] instanceof EventEmitter) {
                subscriptions.push(create(outputs[key], instance[key]));
            }
        }
        $scope.$on('$destroy', function (event) {
            subscriptions.forEach(function (subscription) {
                return subscription.unsubscribe();
            });
        });
    }

    function directiveControllerFactory(caller, injects, controller, ddo, $injector, locals) {
        var instance = Object.create(controller.prototype);
        componentHooks._beforeCtrlInvoke.forEach(function (hook) {
            return hook(caller, injects, controller, ddo, $injector, locals);
        });
        $injector.invoke([].concat(babelHelpers_toConsumableArray(injects), [controller]), instance, locals);
        componentHooks._afterCtrlInvoke.forEach(function (hook) {
            return hook(caller, injects, controller, ddo, $injector, locals);
        });
        for (var key in ddo.inputMap) {
            inputsBuilder(instance, key, ddo.inputMap[key]);
        }
        Object.assign(instance, caller);
        var $element = locals.$element;
        var $scope = locals.$scope;

        outputsBuilder(instance, $element, $scope, ddo.outputMap || {});
        if (typeof instance.ngOnInit === 'function') {
            instance.ngOnInit();
        }
        if (typeof instance.ngOnDestroy === 'function') {
            $scope.$on('$destroy', instance.ngOnDestroy.bind(instance));
        }
        if (typeof instance.ngAfterViewInit === 'function') {
            ddo.ngAfterViewInitBound = instance.ngAfterViewInit.bind(instance);
        }
        return instance;
    }

    function parsePropertyMap(props) {
        var map = {};
        for (var i = 0; i < props.length; i++) {
            var split = props[i].split(':');
            for (var y = 0; y < split.length; y++) {
                split[y] = split[y].trim();
            }
            if (split.length === 1) {
                map[split[0]] = split[0];
            } else if (split.length === 2) {
                map[split[0]] = split[1];
            } else {
                throw new Error('Inputs and outputs must be in the form of "propName: attrName" or in the form of "attrName"');
            }
        }
        return map;
    }

    var writeMapSingle = function writeMapSingle(t, localName, publicName, storeKey) {
        var put = localName + (publicName ? ':' + publicName : '');
        var putMap = parsePropertyMap([put]);
        var previousPutMap = componentStore.get(storeKey, t) || {};
        componentStore.set(storeKey, Object.assign({}, previousPutMap, putMap), t);
        return putMap;
    };
    var writeMapMulti = function writeMapMulti(t, names, storeKey) {
        var putMap = parsePropertyMap(names);
        var previousPutMap = componentStore.get(storeKey, t) || {};
        componentStore.set(storeKey, Object.assign({}, previousPutMap, putMap), t);
        return putMap;
    };
    function Input(publicName) {
        return function (proto, localName) {
            writeMapSingle(proto.constructor, localName, publicName, 'inputMap');
        };
    }

    function Output(publicName) {
        return function (proto, localName) {
            var outputMap = writeMapSingle(proto.constructor, localName, publicName, 'outputMap');
            Object.keys(outputMap).forEach(function (key) {
                return events$1.add(key);
            });
        };
    }

    var TYPE$1 = 'component';
    var componentHooks = {
        _after: [],
        _extendDDO: [],
        _beforeCtrlInvoke: [],
        _afterCtrlInvoke: [],
        after: function after(fn) {
            this._after.push(fn);
        },
        extendDDO: function extendDDO(fn) {
            this._extendDDO.push(fn);
        },
        beforeCtrlInvoke: function beforeCtrlInvoke(fn) {
            this._beforeCtrlInvoke.push(fn);
        },
        afterCtrlInvoke: function afterCtrlInvoke(fn) {
            this._afterCtrlInvoke.push(fn);
        }
    };
    function Component(_ref) {
        var selector = _ref.selector;
        var controllerAs = _ref.controllerAs;
        var template = _ref.template;
        var templateUrl = _ref.templateUrl;
        var _ref$providers = _ref.providers;
        var providers = _ref$providers === undefined ? [] : _ref$providers;
        var _ref$inputs = _ref.inputs;
        var inputs = _ref$inputs === undefined ? [] : _ref$inputs;
        var _ref$outputs = _ref.outputs;
        var outputs = _ref$outputs === undefined ? [] : _ref$outputs;
        var _ref$pipes = _ref.pipes;
        var pipes = _ref$pipes === undefined ? [] : _ref$pipes;
        var _ref$directives = _ref.directives;
        var directives = _ref$directives === undefined ? [] : _ref$directives;

        return function (t) {
            if (!selector) {
                throw new Error('Component Decorator Error in "' + t.name + '": Component selector must be provided');
            }

            var _parseSelector = parseSelector(selector);

            var name = _parseSelector.name;
            var restrict = _parseSelector.type;

            providerStore.set('name', name, t);
            providerStore.set('type', TYPE$1, t);
            bundleStore.set('selector', selector, t);
            Providers.apply(undefined, babelHelpers_toConsumableArray(providers))(t, 'while analyzing Component \'' + t.name + '\' providers');
            componentStore.set('restrict', restrict, t);
            componentStore.set('scope', {}, t);
            componentStore.set('transclude', true, t);
            componentStore.set('bindToController', true, t);
            [['inputs', inputs], ['providers', providers], ['directives', directives], ['outputs', outputs]].forEach(function (_ref2) {
                var _ref22 = babelHelpers_slicedToArray(_ref2, 2);

                var propName = _ref22[0];
                var propVal = _ref22[1];

                if (propVal !== undefined && !Array.isArray(propVal)) {
                    throw new TypeError('Component Decorator Error in "' + t.name + '": Component ' + propName + ' must be an array');
                }
            });
            writeMapMulti(t, inputs, 'inputMap');
            var outputMap = writeMapMulti(t, outputs, 'outputMap');
            Object.keys(outputMap).forEach(function (key) {
                return events$1.add(key);
            });
            if (controllerAs === '$auto') {
                componentStore.set('controllerAs', name, t);
            } else if (controllerAs) {
                componentStore.set('controllerAs', controllerAs, t);
            } else {
                componentStore.set('controllerAs', 'ctrl', t);
            }
            if (t.link) {
                componentStore.set('link', t.link, t);
            }
            if (t.compile) {
                componentStore.set('compile', t.compile, t);
            }
            View({
                selector: selector,
                template: template,
                templateUrl: templateUrl,
                pipes: pipes,
                directives: directives
            })(t);
        };
    }

    function View(_ref3) {
        var selector = _ref3.selector;
        var template = _ref3.template;
        var templateUrl = _ref3.templateUrl;
        var _ref3$pipes = _ref3.pipes;
        var pipes = _ref3$pipes === undefined ? [] : _ref3$pipes;
        var _ref3$directives = _ref3.directives;
        var directives = _ref3$directives === undefined ? [] : _ref3$directives;

        return function (t) {
            if (templateUrl) {
                componentStore.set('templateUrl', templateUrl, t);
            } else if (template) {
                componentStore.set('template', template, t);
            } else {
                throw new Error('@Component config must include either a template or a template url for component with selector ' + selector + ' on ' + t.name);
            }
            Providers.apply(undefined, babelHelpers_toConsumableArray(directives))(t, 'while analyzing Component \'' + t.name + '\' directives');
            Providers.apply(undefined, babelHelpers_toConsumableArray(pipes))(t, 'while analyzing Component \'' + t.name + '\' pipes');
        };
    }

    Module.addProvider(TYPE$1, function (target, name, injects, ngModule) {
        var ddo = {};
        componentStore.forEach(function (val, key) {
            return ddo[key] = val;
        }, target);
        var bindProp = angular.version.minor >= 4 ? 'bindToController' : 'scope';
        ddo[bindProp] = inputsMap(ddo.inputMap);
        if (ddo.restrict !== 'E') {
            throw new Error(createConfigErrorMessage(target, ngModule, '@Component selectors can only be elements. ' + 'Perhaps you meant to use @Directive?'));
        }
        controller.$inject = ['$scope', '$element', '$attrs', '$transclude', '$injector'];
        function controller($scope, $element, $attrs, $transclude, $injector) {
            var locals = { $scope: $scope, $element: $element, $attrs: $attrs, $transclude: $transclude };
            return directiveControllerFactory(this, injects, target, ddo, $injector, locals);
        }
        ddo.controller = controller;
        if (typeof target.prototype.ngAfterViewInit === 'function') {
            ddo.link = function () {
                return ddo.ngAfterViewInitBound();
            };
        }
        if (ddo.template && ddo.template.replace) {
            ddo.template = ddo.template.replace(/ng-content/g, 'ng-transclude');
        }
        componentHooks._extendDDO.forEach(function (hook) {
            return hook(ddo, target, name, injects, ngModule);
        });
        ngModule.directive(name, function () {
            return ddo;
        });
        componentHooks._after.forEach(function (hook) {
            return hook(target, name, injects, ngModule);
        });
    });

    function Inject() {
        for (var _len = arguments.length, injects = Array(_len), _key = 0; _key < _len; _key++) {
            injects[_key] = arguments[_key];
        }

        return function (t1, name) {
            var _ref = arguments.length <= 2 || arguments[2] === undefined ? { value: undefined } : arguments[2];

            var t2 = _ref.value;

            var targetIsClass = arguments.length === 1;
            var t = targetIsClass ? t1 : t2;
            var notStringBased = function notStringBased(inj) {
                return typeof inj !== 'string' && !(inj instanceof OpaqueToken);
            };
            var ensureInjectable = function ensureInjectable(inj) {
                if (!providerStore.get('name', inj) || !providerStore.get('type', inj)) {
                    throw new Error('Processing "' + t.name + '" @Inject parameter: "' + (inj.name || inj.toString()) + '" is not a valid injectable.\n\t\t\t\tPlease ensure ' + (inj.name || inj.toString()) + ' is injectable. Valid examples can be:\n\t\t\t\t- a string representing an ng1 provider, e.g. \'$q\'\n\t\t\t\t- an @Injectable ng-forward class\n\t\t\t\t- a Provider, e.g. provide(SOME_CONFIG, {asValue: 100})');
                }
                return inj;
            };
            var providers = injects.filter(notStringBased).map(ensureInjectable);
            Providers.apply(undefined, babelHelpers_toConsumableArray(providers))(t, 'while analyzing \'' + t.name + '\' injected providers');
            var dependencies = injects.map(getInjectableName).filter(function (n) {
                return n !== undefined;
            });
            if (bundleStore.has('$inject', t)) {
                var parentInjects = bundleStore.get('$inject', t);
                bundleStore.set('$inject', [].concat(babelHelpers_toConsumableArray(dependencies), babelHelpers_toConsumableArray(parentInjects)), t);
            } else {
                bundleStore.set('$inject', dependencies, t);
            }
        };
    }

    componentHooks.beforeCtrlInvoke(injectParentComponents);
    function injectParentComponents(caller, injects, controller, ddo, $injector, locals) {
        injects.forEach(function (inject) {
            if (!$injector.has(inject)) {
                var _parent = locals.$element;
                do {
                    if (!_parent.controller) continue;
                    var parentCtrl = _parent.controller(inject);
                    if (parentCtrl) {
                        locals[inject] = parentCtrl;
                        return;
                    }
                } while ((_parent = _parent.parent()) && _parent.length > 0);
            }
        });
    }

    var TYPE = 'provider';

    var Provider = (function () {
        function Provider(token, _ref) {
            var useClass = _ref.useClass;
            var useValue = _ref.useValue;
            var useConstant = _ref.useConstant;
            var useFactory = _ref.useFactory;
            var deps = _ref.deps;
            babelHelpers_classCallCheck(this, Provider);

            this.isProvider = true;
            this._dependencies = [];
            try {
                this.token = getInjectableNameWithJitCreation(token);
            } catch (e) {
                throw new Error('new Provider() Error: Invalid token ' + token);
            }
            Object.assign(this, { useClass: useClass, useValue: useValue, useConstant: useConstant, useFactory: useFactory });
            if (!useClass && !useValue && !useConstant && !useFactory) {
                throw new Error('new Provider(' + token + ') Error: No usage provided (i.e. useClass, useValue, useConstant, useFactory)');
            }
            if (deps) {
                Inject.apply(undefined, babelHelpers_toConsumableArray(deps))(this.useFactory);
                Providers.apply(undefined, babelHelpers_toConsumableArray(deps.filter(function (d) {
                    return typeof d !== 'string';
                })))(this.useFactory, 'while analyzing Provider \'' + this.token + '\' useFactory deps');
                this._dependencies = bundleStore.get('$inject', this.useFactory);
            }
            providerStore.set('name', this.token, this);
            providerStore.set('type', TYPE, this);
        }

        babelHelpers_createClass(Provider, [{
            key: 'type',
            get: function get() {
                var _this = this;

                if (this._type) return this._type;
                this._type = Object.keys(this).find(function (k) {
                    return k.startsWith('use') && _this[k] !== undefined;
                });
                return this._type;
            }
        }, {
            key: 'dependencies',
            get: function get() {
                return this._dependencies;
            }
        }]);
        return Provider;
    })();

    Module.addProvider(TYPE, function (provider, name, injects, ngModule) {
        switch (provider.type) {
            case 'useValue':
                ngModule.value(provider.token, provider.useValue);
                break;
            case 'useConstant':
                ngModule.constant(provider.token, provider.useConstant);
                break;
            case 'useClass':
                injects = bundleStore.get('$inject', provider.useClass) || [];
                Module.getParser(INJECTABLE)(provider.useClass, provider.token, injects, ngModule);
                break;
            case 'useFactory':
                ngModule.factory(provider.token, [].concat(babelHelpers_toConsumableArray(provider.dependencies), [provider.useFactory]));
                break;
            default:
                break;
        }
    });
    var provide = function provide(token, _ref2) {
        var useClass = _ref2.useClass;
        var useValue = _ref2.useValue;
        var useConstant = _ref2.useConstant;
        var useFactory = _ref2.useFactory;
        var deps = _ref2.deps;

        return new Provider(token, { useClass: useClass, useValue: useValue, useConstant: useConstant, useFactory: useFactory, deps: deps });
    };

    var STRING_TEST = function STRING_TEST(a) {
        return typeof a === 'string';
    };
    var PROVIDER_TEST = function PROVIDER_TEST(a) {
        return (typeof a === 'function' || a instanceof Provider) && providerStore.has('name', a);
    };
    function groupModulesAndProviders(modulesAndProviders) {
        var errorContext = arguments.length <= 1 || arguments[1] === undefined ? 'while analyzing providers' : arguments[1];

        modulesAndProviders = flatten(modulesAndProviders);
        var modules = modulesAndProviders.filter(STRING_TEST);
        var providers = modulesAndProviders.filter(PROVIDER_TEST);
        var invalid = modulesAndProviders.filter(function (a) {
            return !STRING_TEST(a);
        }).filter(function (a) {
            return !PROVIDER_TEST(a);
        });
        if (invalid.length > 0) {
            throw new TypeError('TypeError ' + errorContext + '.\n    Invalid Providers: please make sure all providers are an Injectable(), Component(), Directive(), a Provider, or a module string.\n    Here\'s the invalid values: ' + invalid.join(', '));
        }
        return { modules: modules, providers: providers };
    }

    function Providers() {
        for (var _len = arguments.length, modulesAndProviders = Array(_len), _key = 0; _key < _len; _key++) {
            modulesAndProviders[_key] = arguments[_key];
        }

        return function (t) {
            var errorContext = arguments.length <= 1 || arguments[1] === undefined ? 'while parsing ' + t.name + '\'s providers' : arguments[1];
            return (function () {
                var _groupIntoModulesAndProviders = groupModulesAndProviders(modulesAndProviders, errorContext);

                var modules = _groupIntoModulesAndProviders.modules;
                var providers = _groupIntoModulesAndProviders.providers;

                var parentModules = bundleStore.get('modules', t) || [];
                bundleStore.set('modules', [].concat(babelHelpers_toConsumableArray(modules), babelHelpers_toConsumableArray(parentModules)), t);
                var parentProviders = bundleStore.get('providers', t) || [];
                bundleStore.set('providers', [].concat(babelHelpers_toConsumableArray(providers), babelHelpers_toConsumableArray(parentProviders)), t);
            })();
        };
    }

    var TYPE$2 = 'directive';

    function Directive(_ref) {
        var selector = _ref.selector;
        var _ref$providers = _ref.providers;
        var providers = _ref$providers === undefined ? [] : _ref$providers;

        return function (t) {
            if (!selector) {
                throw new Error('Directive selector must be provided');
            }

            var _parseSelector = parseSelector(selector);

            var name = _parseSelector.name;
            var restrict = _parseSelector.type;

            if (providers !== undefined && !Array.isArray(providers)) {
                throw new TypeError('Directive providers must be an array');
            }
            providerStore.set('name', name, t);
            providerStore.set('type', TYPE$2, t);
            bundleStore.set('selector', selector, t);
            Providers.apply(undefined, babelHelpers_toConsumableArray(providers))(t, 'while analyzing Directive \'' + t.name + '\' providers');
            componentStore.set('restrict', restrict, t);
        };
    }

    Module.addProvider(TYPE$2, function (target, name, injects, ngModule) {
        var ddo = {};
        componentStore.forEach(function (val, key) {
            return ddo[key] = val;
        }, target);
        if (ddo.restrict !== 'A') {
            throw new Error(createConfigErrorMessage(target, ngModule, '@Directive selectors can only be attributes, e.g. selector: \'[my-directive]\''));
        }
        ngModule.directive(name, ['$injector', function ($injector) {
            ddo.link = function ($scope, $element, $attrs, $requires, $transclude) {
                var locals = { $scope: $scope, $element: $element, $attrs: $attrs, $transclude: $transclude, $requires: $requires };
                return directiveControllerFactory(this, injects, target, ddo, $injector, locals);
            };
            return ddo;
        }]);
    });

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2:
                return decorators.reduceRight(function (o, d) {
                    return d && d(o) || o;
                }, target);
            case 3:
                return decorators.reduceRight(function (o, d) {
                    return d && d(target, key), void 0;
                }, void 0);
            case 4:
                return decorators.reduceRight(function (o, d) {
                    return d && d(target, key, o) || o;
                }, desc);
        }
    };
    var __metadata = undefined && undefined.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };var events = new Set(['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'keydown', 'keyup', 'keypress', 'submit', 'focus', 'blur', 'copy', 'cut', 'paste', 'change', 'dragstart', 'drag', 'dragenter', 'dragleave', 'dragover', 'drop', 'dragend', 'error', 'input', 'load', 'wheel', 'scroll']);
    function resolve() {
        var directives = [];
        events.forEach(function (event) {
            var selector = "[(" + dasherize(event) + ")]";
            var EventHandler = (function () {
                function EventHandler($parse, $element, $attrs, $scope) {
                    var _this = this;

                    babelHelpers_classCallCheck(this, EventHandler);

                    this.$element = $element;
                    this.$scope = $scope;

                    var _parseSelector = parseSelector(selector);

                    var attrName = _parseSelector.name;

                    this.expression = $parse($attrs[attrName]);
                    $element.on(event, function (e) {
                        return _this.eventHandler(e);
                    });
                    $scope.$on('$destroy', function () {
                        return _this.onDestroy();
                    });
                }

                babelHelpers_createClass(EventHandler, [{
                    key: "eventHandler",
                    value: function eventHandler() {
                        var $event = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                        var detail = $event.detail;
                        if (!detail && $event.originalEvent && $event.originalEvent.detail) {
                            detail = $event.originalEvent.detail;
                        } else if (!detail) {
                            detail = {};
                        }
                        this.expression(this.$scope, Object.assign(detail, { $event: $event }));
                        this.$scope.$applyAsync();
                    }
                }, {
                    key: "onDestroy",
                    value: function onDestroy() {
                        this.$element.off(event);
                    }
                }]);
                return EventHandler;
            })();
            EventHandler = __decorate([Directive({ selector: selector }), Inject('$parse', '$element', '$attrs', '$scope'), __metadata('design:paramtypes', [Function, Object, Object, Object])], EventHandler);
            directives.push(EventHandler);
        });
        return directives;
    }
    function add() {
        for (var _len = arguments.length, customEvents = Array(_len), _key = 0; _key < _len; _key++) {
            customEvents[_key] = arguments[_key];
        }

        customEvents.forEach(function (event) {
            return events.add(event);
        });
    }
    var events$1 = { resolve: resolve, add: add };

    function bundle(moduleName, provider) {
        var _Module;

        var otherProviders = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

        var getProvidersFrom = function getProvidersFrom(t) {
            return bundleStore.get('providers', t) || [];
        };
        var getModulesFrom = function getModulesFrom(t) {
            return bundleStore.get('modules', t) || [];
        };
        var setHasProviderWithToken = function setHasProviderWithToken(_set, token) {
            return [].concat(babelHelpers_toConsumableArray(_set)).filter(function (p) {
                return token && p.token === token;
            }).length > 0;
        };

        var _groupModulesAndProviders = groupModulesAndProviders([provider].concat(babelHelpers_toConsumableArray(otherProviders)), 'during bundle entry point for \'' + moduleName + '\' module');

        var startingModules = _groupModulesAndProviders.modules;
        var startingProviders = _groupModulesAndProviders.providers;

        var providers = new Set();
        var modules = new Set(startingModules);
        function parseProvider(provider) {
            if (provider) {
                if (providers.has(provider) || setHasProviderWithToken(providers, provider.token)) {
                    return;
                }
                providers.add(provider);
                var annotated = provider.useClass || provider.useFactory || provider;
                getModulesFrom(annotated).forEach(function (mod) {
                    return modules.add(mod);
                });
                getProvidersFrom(annotated).forEach(parseProvider);
            }
        }
        startingProviders.forEach(parseProvider);
        return (_Module = Module(moduleName, [].concat(babelHelpers_toConsumableArray(modules)))).add.apply(_Module, babelHelpers_toConsumableArray(events$1.resolve()).concat(babelHelpers_toConsumableArray(providers)));
    }

    function bootstrap(component) {
        var otherProviders = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        var selector = bundleStore.get('selector', component);
        var rootElement = document.querySelector(selector);
        bundle(selector, component, otherProviders);
        return angular.bootstrap(rootElement, [selector]);
    }

    var configsKey = 'ui-router.stateConfigs';
    var childConfigsKey = 'ui-router.stateChildConfigs';
    var annotatedResolvesKey = 'ui-router.annotatedResolves';
    var resolvedMapKey = 'ui-router.resolvedMap';

    function StateConfig(stateConfigs) {
        return function (t) {
            Providers.apply(undefined, babelHelpers_toConsumableArray(stateConfigs.map(function (sc) {
                return sc.component;
            })))(t, 'while analyzing StateConfig \'' + t.name + '\' state components');
            componentStore.set(childConfigsKey, stateConfigs, t);
            stateConfigs.forEach(function (config) {
                if (!config.component) return;
                var existingConfigs = componentStore.get(configsKey, config.component) || [];
                componentStore.set(configsKey, [].concat(babelHelpers_toConsumableArray(existingConfigs), [config]), config.component);
            });
        };
    }

    function targetIsStaticFn(t) {
        return t.name !== undefined && t.constructor.name === 'Function';
    }

    function Resolve() {
        var resolveName = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        return function (target, resolveFnName, _ref) {
            var resolveFn = _ref.value;

            if (!targetIsStaticFn(target)) {
                throw new Error('@Resolve target must be a static method.');
            }
            componentStore.merge(annotatedResolvesKey, babelHelpers_defineProperty({}, resolveName || resolveFnName, resolveFn), target);
        };
    }

    componentHooks.extendDDO(function (ddo) {
        if (ddo.template && ddo.template.replace) {
            ddo.template = ddo.template.replace(/ng-outlet/g, 'ui-view');
        }
    });
    componentHooks.after(function (target, name, injects, ngModule) {
        var childStateConfigs = componentStore.get(childConfigsKey, target);
        if (childStateConfigs) {
            if (!Array.isArray(childStateConfigs)) {
                throw new TypeError(createConfigErrorMessage(target, ngModule, '@StateConfig param must be an array of state objects.'));
            }
            ngModule.config(['$stateProvider', function ($stateProvider) {
                if (!$stateProvider) return;
                childStateConfigs.forEach(function (config) {
                    var tagName = bundleStore.get('selector', config.component);
                    config.template = config.template || '<' + tagName + '></' + tagName + '>';
                    var annotatedResolves = componentStore.get(annotatedResolvesKey, config.component) || {};
                    Object.keys(annotatedResolves).forEach(function (resolveName) {
                        var resolveFn = annotatedResolves[resolveName];
                        var fnInjects = bundleStore.get('$inject', resolveFn);
                        resolveFn.$inject = fnInjects;
                    });
                    config.resolve = Object.assign({}, config.resolve, annotatedResolves);
                    var childInjects = bundleStore.get('$inject', config.component);
                    var injects = childInjects ? childInjects.map(getInjectableName) : [];
                    function stateController() {
                        for (var _len = arguments.length, resolves = Array(_len), _key = 0; _key < _len; _key++) {
                            resolves[_key] = arguments[_key];
                        }

                        var resolvedMap = resolves.reduce(function (obj, val, i) {
                            obj[injects[i]] = val;
                            return obj;
                        }, {});
                        componentStore.set(resolvedMapKey, resolvedMap, config.component);
                    }
                    config.controller = config.controller || [].concat(babelHelpers_toConsumableArray(injects), [stateController]);
                    $stateProvider.state(config.name, config);
                });
            }]);
        }
    });
    componentHooks.beforeCtrlInvoke(function (caller, injects, controller, ddo, $injector, locals) {
        var resolvesMap = componentStore.get(resolvedMapKey, controller);
        Object.assign(locals, resolvesMap);
    });

    var TYPE$3 = 'pipe';
    var Pipe = decoratorFactory(TYPE$3);
    Module.addProvider(TYPE$3, function (provider, name, injects, ngModule) {
        ngModule.filter(name, [].concat(babelHelpers_toConsumableArray(injects), [function () {
            for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
                dependencies[_key] = arguments[_key];
            }

            var pipe = new (babelHelpers_bind.apply(provider, [null].concat(dependencies)))();
            if (!pipe.transform) {
                throw new Error('Filters must implement a transform method');
            }
            return function (input) {
                for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    params[_key2 - 1] = arguments[_key2];
                }

                if (pipe.supports && !pipe.supports(input)) {
                    throw new Error('Filter ' + name + ' does not support ' + input);
                }
                return pipe.transform.apply(pipe, [input].concat(params));
            };
        }]));
    });

    var By = (function () {
        function By() {
            babelHelpers_classCallCheck(this, By);
        }

        babelHelpers_createClass(By, null, [{
            key: 'all',
            value: function all() {
                return '*';
            }
        }, {
            key: 'css',
            value: function css(selector) {
                return selector;
            }
        }, {
            key: 'directive',
            value: function directive(type) {
                return bundleStore.get('selector', type);
            }
        }]);
        return By;
    })();

    (function extendJQLite(proto) {
        Object.defineProperties(proto, {
            nativeElement: {
                get: function get() {
                    return this[0];
                }
            },
            componentInstance: {
                get: function get() {
                    if (this._componentInstance) return this._componentInstance;
                    var isolateScope = this.isolateScope();
                    this._componentInstance = isolateScope && isolateScope['ctrl'] || null;
                    return this._componentInstance;
                }
            },
            componentViewChildren: {
                get: function get() {
                    return [].concat(babelHelpers_toConsumableArray(this.children())).map(function (child) {
                        return angular.element(child);
                    });
                }
            },
            getLocal: {
                value: function value(injectable) {
                    return (this.injector() || this.inheritedData('$injector')).get(getInjectableName(injectable));
                }
            },
            query: {
                value: function value(predicate, scope) {
                    var results = this.queryAll(predicate, scope);
                    return results.length > 0 ? results[0] : null;
                }
            },
            queryAll: {
                value: function value(predicate, scope) {
                    if (scope) throw Error('scope argument not yet supported. All queries are done with Scope.all for now.');
                    return Array.from(this[0].querySelectorAll(predicate)).map(function (el) {
                        return angular.element(el);
                    });
                }
            },
            getDirectiveInstance: {
                value: function value(index) {
                    throw new Error('Not yet implemented in ng-forward.');
                }
            },
            triggerEventHandler: {
                value: function value(eventName, eventObj) {
                    throw new Error('Not yet implemented in ng-forward.');
                }
            },
            inject: {
                value: function value(type) {
                    throw new Error('Not yet implemented in ng-forward.');
                }
            },
            hasDirective: {
                value: function value(type) {
                    throw new Error('Not yet implemented in ng-forward.');
                }
            }
        });
    })(angular.element.prototype);

    exports.Module = Module;
    exports.Metastore = Metastore;
    exports.OpaqueToken = OpaqueToken;
    exports.Provider = Provider;
    exports.provide = provide;
    exports.Component = Component;
    exports.Directive = Directive;
    exports.Inject = Inject;
    exports.Injectable = Injectable;
    exports.Pipe = Pipe;
    exports.Providers = Providers;
    exports.Input = Input;
    exports.Output = Output;
    exports.StateConfig = StateConfig;
    exports.Resolve = Resolve;
    exports.events = events$1;
    exports.EventEmitter = EventEmitter;
    exports.bootstrap = bootstrap;
    exports.bundle = bundle;
    exports.getInjectableName = getInjectableName;
    exports.bundleStore = bundleStore;
    exports.providerStore = providerStore;
    exports.componentStore = componentStore;
});