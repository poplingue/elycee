/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */
(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper window is present,
        // execute the factory and get jQuery
        // For environments that do not inherently posses a window with a document
        // (such as Node.js), expose a jQuery-making factory as module.exports
        // This accentuates the need for the creation of a real window
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    // Can't do this because several apps including ASP.NET trace
    // the stack via arguments.caller.callee and Firefox dies if
    // you try to trace through "use strict" call chains. (#13335)
    // Support: Firefox 18+
    //
    var deletedIds = [];
    var slice = deletedIds.slice;
    var concat = deletedIds.concat;
    var push = deletedIds.push;
    var indexOf = deletedIds.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var version = "1.11.3", // Define a local copy of jQuery
    jQuery = function(selector, context) {
        // The jQuery object is actually just the init constructor 'enhanced'
        // Need init if jQuery is called (just allow error to be thrown if not included)
        return new jQuery.fn.init(selector, context);
    }, // Support: Android<4.1, IE<9
    // Make sure we trim BOM and NBSP
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, // Used by jQuery.camelCase as callback to replace()
    fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,
        constructor: jQuery,
        // Start with an empty selector
        selector: "",
        // The default length of a jQuery object is 0
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function(num) {
            // Return just the one element from the set
            // Return all the elements in a clean array
            return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
        },
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function(elems) {
            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);
            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;
            // Return the newly-formed element set
            return ret;
        },
        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }
        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        // extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }
        for (;i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    };
    jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        // Assume jQuery is ready without the ready module
        isReady: true,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array";
        },
        isWindow: function(obj) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },
        isNumeric: function(obj) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            // adding 1 corrects loss of precision from parseFloat (#15100)
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        isPlainObject: function(obj) {
            var key;
            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }
            try {
                // Not own constructor property must be Object
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }
            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }
            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for (key in obj) {}
            return key === undefined || hasOwn.call(obj, key);
        },
        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function(data) {
            if (data && jQuery.trim(data)) {
                // We use execScript on Internet Explorer
                // We use an anonymous function so that context is window
                // rather than jQuery in Firefox
                (window.execScript || function(data) {
                    window["eval"].call(window, data);
                })(data);
            }
        },
        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        // args is for internal usage only
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (;i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (;i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        // Support: Android<4.1, IE<9
        trim: function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        // results is for internal usage only
        makeArray: function(arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [ arr ] : arr);
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (;i < len; i++) {
                    // Skip accessing in sparse arrays
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }
            return -1;
        },
        merge: function(first, second) {
            var len = +second.length, j = 0, i = first.length;
            while (j < len) {
                first[i++] = second[j++];
            }
            // Support: IE<9
            // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },
        grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            // Go through the array, only saving the items
            // that pass the validator function
            for (;i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        // arg is for internal usage only
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            // Go through the array, translating each of the items to their new values
            if (isArray) {
                for (;i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            // Flatten any nested arrays
            return concat.apply([], ret);
        },
        // A global GUID counter for objects
        guid: 1,
        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function(fn, context) {
            var args, proxy, tmp;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };
            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        now: function() {
            return +new Date();
        },
        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });
    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    function isArraylike(obj) {
        // Support: iOS 8.2 (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    var Sizzle = /*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
    function(window) {
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, // Local document vars
        setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, // Instance-specific data
        expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
                hasDuplicate = true;
            }
            return 0;
        }, // General-purpose constants
        MAX_NEGATIVE = 1 << 31, // Instance methods
        hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, // Use a stripped-down indexOf as it's faster than native
        // http://jsperf.com/thor-indexof-vs-for/5
        indexOf = function(list, elem) {
            var i = 0, len = list.length;
            for (;i < len; i++) {
                if (list[i] === elem) {
                    return i;
                }
            }
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", // Regular expressions
        // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
        whitespace = "[\\x20\\t\\r\\n\\f]", // http://www.w3.org/TR/css3-syntax/#characters
        characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", // Loosely modeled on CSS identifier characters
        // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
        // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
        identifier = characterEncoding.replace("w", "w#"), // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
        attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + // Operator (capture 2)
        "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((" + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
        // 1. quoted (capture 3; capture 4 or capture 5)
        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + // 2. simple (capture 6)
        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + // 3. anything else (capture 2)
        ".*" + ")\\)|)", // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
        rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            // For use in libraries implementing .is()
            // We use this for POS matching in `select`
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, // Easily-parseable/retrievable ID or TAG or CLASS selectors
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            // NaN means non-codepoint
            // Support: Firefox<24
            // Workaround erroneous numeric interpretation of +"0x"
            // BMP codepoint
            // Supplemental Plane codepoint (surrogate pair)
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
        }, // Used for iframes
        // See setDocument()
        // Removing the function wrapper causes a "Permission Denied"
        // error in IE
        unloadHandler = function() {
            setDocument();
        };
        // Optimize for push.apply( _, NodeList )
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
            // Support: Android<4.0
            // Detect silently failing push.apply
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? // Leverage slice if possible
                function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : // Support: IE<9
                // Otherwise append directly
                function(target, els) {
                    var j = target.length, i = 0;
                    // Can't trust NodeList.length
                    while (target[j++] = els[i++]) {}
                    target.length = j - 1;
                }
            };
        }
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, // QSA vars
            i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                setDocument(context);
            }
            context = context || document;
            results = results || [];
            nodeType = context.nodeType;
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                return results;
            }
            if (!seed && documentIsHTML) {
                // Try to shortcut find operations when possible (e.g., not under DocumentFragment)
                if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                    // Speed-up: Sizzle("#ID")
                    if (m = match[1]) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document (jQuery #6963)
                            if (elem && elem.parentNode) {
                                // Handle the case where IE, Opera, and Webkit return items
                                // by name instead of ID
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            // Context is not a document
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        }
                    } else if (match[2]) {
                        push.apply(results, context.getElementsByTagName(selector));
                        return results;
                    } else if ((m = match[3]) && support.getElementsByClassName) {
                        push.apply(results, context.getElementsByClassName(m));
                        return results;
                    }
                }
                // QSA path
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = nodeType !== 1 && selector;
                    // qSA works strangely on Element-rooted queries
                    // We can work around this by specifying an extra ID on the root
                    // and working up from there (Thanks to Andrew Dupont for the technique)
                    // IE 8 doesn't work on object elements
                    if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if (old = context.getAttribute("id")) {
                            nid = old.replace(rescape, "\\$&");
                        } else {
                            context.setAttribute("id", nid);
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + toSelector(groups[i]);
                        }
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) {
                        try {
                            push.apply(results, newContext.querySelectorAll(newSelector));
                            return results;
                        } catch (qsaError) {} finally {
                            if (!old) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }
            // All others
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        /**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
        function createCache() {
            var keys = [];
            function cache(key, value) {
                // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                if (keys.push(key + " ") > Expr.cacheLength) {
                    // Only keep the most recent entries
                    delete cache[keys.shift()];
                }
                return cache[key + " "] = value;
            }
            return cache;
        }
        /**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }
        /**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return false;
            } finally {
                // Remove from its parent by default
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
                // release memory in IE
                div = null;
            }
        }
        /**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
        function addHandle(attrs, handler) {
            var arr = attrs.split("|"), i = attrs.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler;
            }
        }
        /**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            // Use IE sourceIndex if available on both nodes
            if (diff) {
                return diff;
            }
            // Check if b follows a
            if (cur) {
                while (cur = cur.nextSibling) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }
        /**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }
        /**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }
        /**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    // Match elements found at the specified indexes
                    while (i--) {
                        if (seed[j = matchIndexes[i]]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        /**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
        }
        // Expose support vars for convenience
        support = Sizzle.support = {};
        /**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
        isXML = Sizzle.isXML = function(elem) {
            // documentElement is verified for cases where it doesn't yet exist
            // (such as loading iframes in IE - #4833)
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        /**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            // If no document and documentElement is available, return
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }
            // Set our document
            document = doc;
            docElem = doc.documentElement;
            parent = doc.defaultView;
            // Support: IE>8
            // If iframe document is assigned to "document" variable and if iframe has been reloaded,
            // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
            // IE6-8 do not support the defaultView property so parent will be undefined
            if (parent && parent !== parent.top) {
                // IE11 does not have attachEvent, so all must suffer
                if (parent.addEventListener) {
                    parent.addEventListener("unload", unloadHandler, false);
                } else if (parent.attachEvent) {
                    parent.attachEvent("onunload", unloadHandler);
                }
            }
            /* Support tests
	---------------------------------------------------------------------- */
            documentIsHTML = !isXML(doc);
            /* Attributes
	---------------------------------------------------------------------- */
            // Support: IE<8
            // Verify that getAttribute really returns attributes and not properties
            // (excepting IE8 booleans)
            support.attributes = assert(function(div) {
                div.className = "i";
                return !div.getAttribute("className");
            });
            /* getElement(s)By*
	---------------------------------------------------------------------- */
            // Check if getElementsByTagName("*") returns only elements
            support.getElementsByTagName = assert(function(div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });
            // Support: IE<9
            support.getElementsByClassName = rnative.test(doc.getElementsByClassName);
            // Support: IE<10
            // Check if getElementById returns elements by name
            // The broken getElementById methods don't pick up programatically-set names,
            // so use a roundabout getElementsByName test
            support.getById = assert(function(div) {
                docElem.appendChild(div).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName(expando).length;
            });
            // ID find and filter
            if (support.getById) {
                Expr.find["ID"] = function(id, context) {
                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                        var m = context.getElementById(id);
                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        return m && m.parentNode ? [ m ] : [];
                    }
                };
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                // Support: IE6/7
                // getElementById is not reliable as a find shortcut
                delete Expr.find["ID"];
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }
            // Tag
            Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== "undefined") {
                    return context.getElementsByTagName(tag);
                } else if (support.qsa) {
                    return context.querySelectorAll(tag);
                }
            } : function(tag, context) {
                var elem, tmp = [], i = 0, // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                results = context.getElementsByTagName(tag);
                // Filter out possible comments
                if (tag === "*") {
                    while (elem = results[i++]) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem);
                        }
                    }
                    return tmp;
                }
                return results;
            };
            // Class
            Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                if (documentIsHTML) {
                    return context.getElementsByClassName(className);
                }
            };
            /* QSA/matchesSelector
	---------------------------------------------------------------------- */
            // QSA and matchesSelector support
            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
            rbuggyMatches = [];
            // qSa(:focus) reports false when true (Chrome 21)
            // We allow this because of a bug in IE8/9 that throws an error
            // whenever `document.activeElement` is accessed on an iframe
            // So, we allow :focus to pass through QSA all the time to avoid the IE error
            // See http://bugs.jquery.com/ticket/13378
            rbuggyQSA = [];
            if (support.qsa = rnative.test(doc.querySelectorAll)) {
                // Build QSA regex
                // Regex strategy adopted from Diego Perini
                assert(function(div) {
                    // Select is set to empty string on purpose
                    // This is to test IE's treatment of not explicitly
                    // setting a boolean content attribute,
                    // since its presence should be enough
                    // http://bugs.jquery.com/ticket/12359
                    docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>";
                    // Support: IE8, Opera 11-12.16
                    // Nothing should be selected when empty strings follow ^= or $= or *=
                    // The test attribute must be unknown in Opera but "safe" for WinRT
                    // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                    if (div.querySelectorAll("[msallowcapture^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    }
                    // Support: IE8
                    // Boolean attributes and "value" are not treated correctly
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    }
                    // Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
                    if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
                        rbuggyQSA.push("~=");
                    }
                    // Webkit/Opera - :checked should return selected option elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    // IE8 throws error here and will not see later tests
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                    // Support: Safari 8+, iOS 8+
                    // https://bugs.webkit.org/show_bug.cgi?id=136851
                    // In-page `selector#id sibing-combinator selector` fails
                    if (!div.querySelectorAll("a#" + expando + "+*").length) {
                        rbuggyQSA.push(".#.+[+~]");
                    }
                });
                assert(function(div) {
                    // Support: Windows 8 Native Apps
                    // The type and name attributes are restricted during .innerHTML assignment
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("name", "D");
                    // Support: IE8
                    // Enforce case-sensitivity of name attribute
                    if (div.querySelectorAll("[name=d]").length) {
                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                    }
                    // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                    // IE8 throws error here and will not see later tests
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    // Opera 10-11 does not throw on post-comma invalid pseudos
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
                assert(function(div) {
                    // Check to see if it's possible to do matchesSelector
                    // on a disconnected node (IE 9)
                    support.disconnectedMatch = matches.call(div, "div");
                    // This should fail with an exception
                    // Gecko does not error, returns false instead
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            /* Contains
	---------------------------------------------------------------------- */
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            // Element contains another
            // Purposefully does not implement inclusive descendent
            // As in, an element does not contain itself
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
                if (b) {
                    while (b = b.parentNode) {
                        if (b === a) {
                            return true;
                        }
                    }
                }
                return false;
            };
            /* Sorting
	---------------------------------------------------------------------- */
            // Document order sorting
            sortOrder = hasCompare ? function(a, b) {
                // Flag for duplicate removal
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                // Sort on method existence if only one input has compareDocumentPosition
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare;
                }
                // Calculate position if both inputs belong to the same document
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
                1;
                // Disconnected nodes
                if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                    // Choose the first element that is related to our preferred document
                    if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1;
                    }
                    if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1;
                    }
                    // Maintain original order
                    return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                }
                return compare & 4 ? -1 : 1;
            } : function(a, b) {
                // Exit early if the nodes are identical
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                // Parentless nodes are either documents or disconnected
                if (!aup || !bup) {
                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                }
                // Otherwise we need full lists of their ancestors for comparison
                cur = a;
                while (cur = cur.parentNode) {
                    ap.unshift(cur);
                }
                cur = b;
                while (cur = cur.parentNode) {
                    bp.unshift(cur);
                }
                // Walk down the tree looking for a discrepancy
                while (ap[i] === bp[i]) {
                    i++;
                }
                // Do a sibling check if the nodes have a common ancestor
                // Otherwise nodes in our document sort first
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            };
            return doc;
        };
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function(elem, expr) {
            // Set document vars if needed
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            // Make sure that attribute selectors are quoted
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    // IE 9's matchesSelector returns false on disconnected nodes
                    if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
                    // fragment in IE 9
                    elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                } catch (e) {}
            }
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        };
        Sizzle.contains = function(context, elem) {
            // Set document vars if needed
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };
        Sizzle.attr = function(elem, name) {
            // Set document vars if needed
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], // Don't get fooled by Object.prototype properties (jQuery #13807)
            val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        /**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            // Unless we *know* we can detect duplicates, assume their presence
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while (elem = results[i++]) {
                    if (elem === results[i]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            // Clear input after sorting to release objects
            // See https://github.com/jquery/sizzle/pull/225
            sortInput = null;
            return results;
        };
        /**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (!nodeType) {
                // If no nodeType, this is expected to be an array
                while (node = elem[i++]) {
                    // Do not traverse comment nodes
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                // Use textContent for elements
                // innerText usage removed for consistency of new lines (jQuery #11153)
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                } else {
                    // Traverse its children
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            // Do not include comment or processing instruction nodes
            return ret;
        };
        Expr = Sizzle.selectors = {
            // Can be adjusted by the user
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    // Move the given value to match[3] whether quoted or unquoted
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                CHILD: function(match) {
                    /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        // nth-* requires argument
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        // numeric x and y parameters for Expr.filter.CHILD
                        // remember that false/true cast respectively to 0/1
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +(match[7] + match[8] || match[3] === "odd");
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    // Accept quoted arguments as-is
                    if (match[3]) {
                        match[2] = match[4] || match[5] || "";
                    } else if (unquoted && rpseudo.test(unquoted) && (// Get excess from tokenize (recursively)
                    excess = tokenize(unquoted, true)) && (// advance to the next closing parenthesis
                    excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        // excess is a negative index
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    // Return only captures needed by the pseudo filter method (type and argument)
                    return match.slice(0, 3);
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ? function() {
                        return true;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                    // Shortcut for :nth-*(n)
                    return first === 1 && last === 0 ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            // :(first|last|only)-(child|of-type)
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while (node = node[dir]) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    // Reverse direction for :only-* (if we haven't yet done so)
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }
                            start = [ forward ? parent.firstChild : parent.lastChild ];
                            // non-xml :nth-child(...) stores cache data on `parent`
                            if (forward && useCache) {
                                // Seek `elem` from a previously-cached index
                                outerCache = parent[expando] || (parent[expando] = {});
                                cache = outerCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while (node = ++nodeIndex && node && node[dir] || (// Fallback to seeking `elem` from the start
                                diff = nodeIndex = 0) || start.pop()) {
                                    // When found, cache indexes on `parent` and break
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        outerCache[type] = [ dirruns, nodeIndex, diff ];
                                        break;
                                    }
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                diff = cache[1];
                            } else {
                                // Use the same loop as above to seek `elem` from the start
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                        // Cache the index of each encountered element
                                        if (useCache) {
                                            (node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ];
                                        }
                                        if (node === elem) {
                                            break;
                                        }
                                    }
                                }
                            }
                            // Incorporate the offset, then check against cycle size
                            diff -= last;
                            return diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    // pseudo-class names are case-insensitive
                    // http://www.w3.org/TR/selectors/#pseudo-classes
                    // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                    // Remember that setFilters inherits from pseudos
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    // The user may use createPseudo to indicate that
                    // arguments are needed to create the filter function
                    // just as Sizzle does
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    // But maintain support for old signatures
                    if (fn.length > 1) {
                        args = [ pseudo, pseudo, "", argument ];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument), i = matched.length;
                            while (i--) {
                                idx = indexOf(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                // Potentially complex pseudos
                not: markFunction(function(selector) {
                    // Trim the selector passed to compile
                    // to avoid treating leading and trailing
                    // spaces as combinators
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                        // Match elements unmatched by `matcher`
                        while (i--) {
                            if (elem = unmatched[i]) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        // Don't keep the element (issue #299)
                        input[0] = null;
                        return !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    text = text.replace(runescape, funescape);
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                // "Whether an element is represented by a :lang() selector
                // is based solely on the element's language value
                // being equal to the identifier C,
                // or beginning with the identifier C immediately followed by "-".
                // The matching of C against the element's language value is performed case-insensitively.
                // The identifier C does not have to be a valid language name."
                // http://www.w3.org/TR/selectors/#lang-pseudo
                lang: markFunction(function(lang) {
                    // lang value must be a valid identifier
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do {
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                // Miscellaneous
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                // Boolean properties
                enabled: function(elem) {
                    return elem.disabled === false;
                },
                disabled: function(elem) {
                    return elem.disabled === true;
                },
                checked: function(elem) {
                    // In CSS3, :checked should return both checked and selected elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    var nodeName = elem.nodeName.toLowerCase();
                    return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
                },
                selected: function(elem) {
                    // Accessing this property makes selected-by-default
                    // options in Safari work properly
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                // Contents
                empty: function(elem) {
                    // http://www.w3.org/TR/selectors/#empty-pseudo
                    // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                    //   but not by others (comment: 8; processing instruction: 7; etc.)
                    // nodeType < 6 works because attributes (2) do not appear as children
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },
                parent: function(elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                // Element/input types
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                text: function(elem) {
                    var attr;
                    // Support: IE<8
                    // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                },
                // Position-in-collection
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ argument < 0 ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (;i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (;i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;--i >= 0; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;++i < length; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        // Add button/input type pseudos
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true
        }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }
        // Easy API for creating new setFilters
        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                // Comma and first run
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        // Don't consume trailing commas as valid
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push(tokens = []);
                }
                matched = false;
                // Combinators
                if (match = rcombinators.exec(soFar)) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        // Cast descendant combinators to space
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                // Filters
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            // Return the length of the invalid excess
            // if we're just parsing
            // Otherwise, throw an error or return tokens
            // Cache the tokens
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        };
        function toSelector(tokens) {
            var i = 0, len = tokens.length, selector = "";
            for (;i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && dir === "parentNode", doneName = done++;
            // Check against closest ancestor/preceding element
            // Check against all ancestor/preceding elements
            return combinator.first ? function(elem, context, xml) {
                while (elem = elem[dir]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml);
                    }
                }
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                if (xml) {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true;
                            }
                        }
                    }
                } else {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                // Assign to newCache so results back-propagate to previous elements
                                return newCache[2] = oldCache[2];
                            } else {
                                // Reuse newcache so results back-propagate to previous elements
                                outerCache[dir] = newCache;
                                // A match means we're done; a fail means we have to keep checking
                                if (newCache[2] = matcher(elem, context, xml)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false;
                    }
                }
                return true;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            var i = 0, len = contexts.length;
            for (;i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
            for (;i < len; i++) {
                if (elem = unmatched[i]) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, // Get initial elements from seed or context
                elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), // Prefilter to get matcher input, preserving a map for seed-results synchronization
                matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
                [] : // ...otherwise use results directly
                results : matcherIn;
                // Find primary matches
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                // Apply postFilter
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    // Un-match failing elements by moving them back to matcherIn
                    i = temp.length;
                    while (i--) {
                        if (elem = temp[i]) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            // Get the final matcherOut by condensing this intermediate into postFinder contexts
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if (elem = matcherOut[i]) {
                                    // Restore matcherIn since elem is not yet a final match
                                    temp.push(matcherIn[i] = elem);
                                }
                            }
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        // Move matched elements from seed to results to keep them synchronized
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, // The foundational matcher ensures that elements are reachable from top-level context(s)
            matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                // Avoid hanging onto element (issue #299)
                checkContext = null;
                return ret;
            } ];
            for (;i < len; i++) {
                if (matcher = Expr.relative[tokens[i].type]) {
                    matchers = [ addCombinator(elementMatcher(matchers), matcher) ];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    // Return special upon seeing a positional matcher
                    if (matcher[expando]) {
                        // Find the next relative operator (if any) for proper handling
                        j = ++i;
                        for (;j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: tokens[i - 2].type === " " ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, // We must always have either seed elements or outermost context
                elems = seed || byElement && Expr.find["TAG"]("*", outermost), // Use integer dirruns iff this is the outermost matcher
                dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || .1, len = elems.length;
                if (outermost) {
                    outermostContext = context !== document && context;
                }
                // Add elements passing elementMatchers directly to results
                // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                // Support: IE<9, Safari
                // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                for (;i !== len && (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        j = 0;
                        while (matcher = elementMatchers[j++]) {
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break;
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                        }
                    }
                    // Track unmatched elements for set filters
                    if (bySet) {
                        // They will have gone through all possible matchers
                        if (elem = !matcher && elem) {
                            matchedCount--;
                        }
                        // Lengthen the array for every element, matched or not
                        if (seed) {
                            unmatched.push(elem);
                        }
                    }
                }
                // Apply set filters to unmatched elements
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    j = 0;
                    while (matcher = setMatchers[j++]) {
                        matcher(unmatched, setMatched, context, xml);
                    }
                    if (seed) {
                        // Reintegrate element matches to eliminate the need for sorting
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results);
                                }
                            }
                        }
                        // Discard index placeholder values to get only actual matches
                        setMatched = condense(setMatched);
                    }
                    // Add matches to results
                    push.apply(results, setMatched);
                    // Seedless set matches succeeding multiple successful matchers stipulate sorting
                    if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                        Sizzle.uniqueSort(results);
                    }
                }
                // Override manipulation of globals by nested matchers
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }
                return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                // Generate a function of recursive functions that can be used to check each element
                if (!match) {
                    match = tokenize(selector);
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                // Cache the compiled function
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                // Save selector and tokenization
                cached.selector = selector;
            }
            return cached;
        };
        /**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            // Try to minimize operations if there is no seed and only one group
            if (match.length === 1) {
                // Take a shortcut and set the context if the root selector is an ID
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results;
                    } else if (compiled) {
                        context = context.parentNode;
                    }
                    selector = selector.slice(tokens.shift().value.length);
                }
                // Fetch a seed set for right-to-left matching
                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    // Abort if we hit a combinator
                    if (Expr.relative[type = token.type]) {
                        break;
                    }
                    if (find = Expr.find[type]) {
                        // Search, expanding context for leading sibling combinators
                        if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                            // If seed is empty or no tokens remain, we can return early
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results;
                            }
                            break;
                        }
                    }
                }
            }
            // Compile and execute a filtering function if one is not provided
            // Provide `match` to avoid retokenization if we modified the selector above
            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
            return results;
        };
        // One-time assignments
        // Sort stability
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        // Support: Chrome 14-35+
        // Always assume duplicates if they aren't passed to the comparison function
        support.detectDuplicates = !!hasDuplicate;
        // Initialize against the default document
        setDocument();
        // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
        // Detached nodes confoundingly follow *each other*
        support.sortDetached = assert(function(div1) {
            // Should return 1, but returns 4 (following)
            return div1.compareDocumentPosition(document.createElement("div")) & 1;
        });
        // Support: IE<8
        // Prevent attribute/property "interpolation"
        // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
        if (!assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild.getAttribute("href") === "#";
        })) {
            addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                }
            });
        }
        // Support: IE<9
        // Use defaultValue in place of getAttribute("value")
        if (!support.attributes || !assert(function(div) {
            div.innerHTML = "<input/>";
            div.firstChild.setAttribute("value", "");
            return div.firstChild.getAttribute("value") === "";
        })) {
            addHandle("value", function(elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue;
                }
            });
        }
        // Support: IE<9
        // Use getAttributeNode to fetch booleans when getAttribute lies
        if (!assert(function(div) {
            return div.getAttribute("disabled") == null;
        })) {
            addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                }
            });
        }
        return Sizzle;
    }(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var risSimple = /^.[^:#\[\.,]*$/;
    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                /* jshint -W018 */
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not;
            });
        }
        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 !== not;
        });
    }
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ":not(" + expr + ")";
        }
        return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return elem.nodeType === 1;
        }));
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [], self = this, len = self.length;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }
            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
            // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        }
    });
    // Initialize a jQuery object
    // A central reference to the root jQuery(document)
    var rootjQuery, // Use the correct document accordingly with window argument (sandbox)
    document = window.document, // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
            return this;
        }
        // Handle HTML strings
        if (typeof selector === "string") {
            if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [ null, selector, null ];
            } else {
                match = rquickExpr.exec(selector);
            }
            // Match html or make sure no context is specified for #id
            if (match && (match[1] || !context)) {
                // HANDLE: $(html) -> $(array)
                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;
                    // scripts is true for back-compat
                    // Intentionally let the error be thrown if parseHTML is not present
                    jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                    // HANDLE: $(html, props)
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            // Properties of context are called as methods if possible
                            if (jQuery.isFunction(this[match])) {
                                this[match](context[match]);
                            } else {
                                this.attr(match, context[match]);
                            }
                        }
                    }
                    return this;
                } else {
                    elem = document.getElementById(match[2]);
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    if (elem && elem.parentNode) {
                        // Handle the case where IE and Opera return items
                        // by name instead of ID
                        if (elem.id !== match[2]) {
                            return rootjQuery.find(selector);
                        }
                        // Otherwise, we inject the element directly into the jQuery object
                        this.length = 1;
                        this[0] = elem;
                    }
                    this.context = document;
                    this.selector = selector;
                    return this;
                }
            } else if (!context || context.jquery) {
                return (context || rootjQuery).find(selector);
            } else {
                return this.constructor(context).find(selector);
            }
        } else if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;
        } else if (jQuery.isFunction(selector)) {
            // Execute immediately if ready is not present
            return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
            this.selector = selector.selector;
            this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
    };
    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;
    // Initialize central reference
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, // methods guaranteed to produce a unique set when starting from a unique set
    guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            var matched = [], cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        sibling: function(n, elem) {
            var r = [];
            for (;n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        }
    });
    jQuery.fn.extend({
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (;i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    // Always skip document fragments
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : // Don't pass non-elements to Sizzle
                    cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break;
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        // Determine the position of an element within
        // the matched set of elements
        index: function(elem) {
            // No argument, return index in parent
            if (!elem) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            // index in selector
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }
            // Locate the position of the desired element
            // If it receives a jQuery object, the first element is used
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    function sibling(cur, dir) {
        do {
            cur = cur[dir];
        } while (cur && cur.nodeType !== 1);
        return cur;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            if (this.length > 1) {
                // Remove duplicates
                if (!guaranteedUnique[name]) {
                    ret = jQuery.unique(ret);
                }
                // Reverse order for parents* and prev-derivatives
                if (rparentsprev.test(name)) {
                    ret = ret.reverse();
                }
            }
            return this.pushStack(ret);
        };
    });
    var rnotwhite = /\S+/g;
    // String to Object options format cache
    var optionsCache = {};
    // Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }
    /*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
    jQuery.Callbacks = function(options) {
        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var // Flag to know if list is currently firing
        firing, // Last fire value (for non-forgettable lists)
        memory, // Flag to know if list was already fired
        fired, // End of the loop when firing
        firingLength, // Index of currently firing callback (modified by remove if needed)
        firingIndex, // First callback to fire (used internally by add and fireWith)
        firingStart, // Actual callback list
        list = [], // Stack of fire calls for repeatable lists
        stack = !options.once && [], // Fire callbacks
        fire = function(data) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for (;list && firingIndex < firingLength; firingIndex++) {
                if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                    memory = false;
                    // To prevent further calls using add
                    break;
                }
            }
            firing = false;
            if (list) {
                if (stack) {
                    if (stack.length) {
                        fire(stack.shift());
                    }
                } else if (memory) {
                    list = [];
                } else {
                    self.disable();
                }
            }
        }, // Actual Callbacks object
        self = {
            // Add a callback or a collection of callbacks to the list
            add: function() {
                if (list) {
                    // First, we save the current length
                    var start = list.length;
                    (function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            if (type === "function") {
                                if (!options.unique || !self.has(arg)) {
                                    list.push(arg);
                                }
                            } else if (arg && arg.length && type !== "string") {
                                // Inspect recursively
                                add(arg);
                            }
                        });
                    })(arguments);
                    // Do we need to add the callbacks to the
                    // current firing batch?
                    if (firing) {
                        firingLength = list.length;
                    } else if (memory) {
                        firingStart = start;
                        fire(memory);
                    }
                }
                return this;
            },
            // Remove a callback from the list
            remove: function() {
                if (list) {
                    jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            // Handle firing indexes
                            if (firing) {
                                if (index <= firingLength) {
                                    firingLength--;
                                }
                                if (index <= firingIndex) {
                                    firingIndex--;
                                }
                            }
                        }
                    });
                }
                return this;
            },
            // Check if a given callback is in the list.
            // If no argument is given, return whether or not list has callbacks attached.
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
            },
            // Remove all callbacks from the list
            empty: function() {
                list = [];
                firingLength = 0;
                return this;
            },
            // Have the list do nothing anymore
            disable: function() {
                list = stack = memory = undefined;
                return this;
            },
            // Is it disabled?
            disabled: function() {
                return !list;
            },
            // Lock the list in its current state
            lock: function() {
                stack = undefined;
                if (!memory) {
                    self.disable();
                }
                return this;
            },
            // Is it locked?
            locked: function() {
                return !stack;
            },
            // Call all callbacks with the given context and arguments
            fireWith: function(context, args) {
                if (list && (!fired || stack)) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    if (firing) {
                        stack.push(args);
                    } else {
                        fire(args);
                    }
                }
                return this;
            },
            // Call all the callbacks with the given arguments
            fire: function() {
                self.fireWith(this, arguments);
                return this;
            },
            // To know if the callbacks have already been called at least once
            fired: function() {
                return !!fired;
            }
        };
        return self;
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [ // action, add listener, listener list, final state
            [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    deferred.done(arguments).fail(arguments);
                    return this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            // deferred[ done | fail | progress ] for forwarding actions to newDefer
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) {
                                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                } else {
                                    newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                                }
                            });
                        });
                        fns = null;
                    }).promise();
                },
                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                promise: function(obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            // Keep pipe for back-compat
            promise.pipe = promise.then;
            // Add list-specific methods
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                // promise[ done | fail | progress ] = list.add
                promise[tuple[1]] = list.add;
                // Handle state
                if (stateString) {
                    list.add(function() {
                        // state = [ resolved | rejected ]
                        state = stateString;
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }
                // deferred[ resolve | reject | notify ]
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            // Make the deferred a promise
            promise.promise(deferred);
            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }
            // All done!
            return deferred;
        },
        // Deferred helper
        when: function(subordinate) {
            var i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, // the count of uncompleted subordinates
            remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
            deferred = remaining === 1 ? subordinate : jQuery.Deferred(), // Update function for both resolve and progress values
            updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this;
                    values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                    if (values === progressValues) {
                        deferred.notifyWith(contexts, values);
                    } else if (!--remaining) {
                        deferred.resolveWith(contexts, values);
                    }
                };
            }, progressValues, progressContexts, resolveContexts;
            // add listeners to Deferred subordinates; treat others as resolved
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (;i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }
            // if we're not waiting on anything, resolve the master
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    });
    // The deferred used on DOM ready
    var readyList;
    jQuery.fn.ready = function(fn) {
        // Add the callback
        jQuery.ready.promise().done(fn);
        return this;
    };
    jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,
        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,
        // Hold (or release) the ready event
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },
        // Handle when the DOM is ready
        ready: function(wait) {
            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if (!document.body) {
                return setTimeout(jQuery.ready);
            }
            // Remember that the DOM is ready
            jQuery.isReady = true;
            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            // If there are functions bound, to execute
            readyList.resolveWith(document, [ jQuery ]);
            // Trigger any bound ready events
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready");
            }
        }
    });
    /**
 * Clean-up method for dom ready events
 */
    function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }
    /**
 * The ready event handler and self cleanup method
 */
    function completed() {
        // readyState === "complete" is good enough for us to call the dom ready in oldIE
        if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
            detach();
            jQuery.ready();
        }
    }
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            // Catch cases where $(document).ready() is called after the browser event has already occurred.
            // we once tried to use readyState "interactive" here, but it caused issues like the one
            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
            if (document.readyState === "complete") {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout(jQuery.ready);
            } else if (document.addEventListener) {
                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", completed, false);
                // A fallback to window.onload, that will always work
                window.addEventListener("load", completed, false);
            } else {
                // Ensure firing before onload, maybe late but safe also for iframes
                document.attachEvent("onreadystatechange", completed);
                // A fallback to window.onload, that will always work
                window.attachEvent("onload", completed);
                // If IE and not a frame
                // continually check to see if the document is ready
                var top = false;
                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {}
                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {
                            try {
                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }
                            // detach all dom ready events
                            detach();
                            // and execute any waiting functions
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };
    var strundefined = typeof undefined;
    // Support: IE<9
    // Iteration over object's inherited properties before its own
    var i;
    for (i in jQuery(support)) {
        break;
    }
    support.ownLast = i !== "0";
    // Note: most support tests are defined in their respective modules.
    // false until the test is run
    support.inlineBlockNeedsLayout = false;
    // Execute ASAP in case we need to set body.style.zoom
    jQuery(function() {
        // Minified: var a,b,c,d
        var val, div, body, container;
        body = document.getElementsByTagName("body")[0];
        if (!body || !body.style) {
            // Return for frameset docs that don't have a body
            return;
        }
        // Setup
        div = document.createElement("div");
        container = document.createElement("div");
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild(container).appendChild(div);
        if (typeof div.style.zoom !== strundefined) {
            // Support: IE<8
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
            if (val) {
                // Prevent IE 6 from affecting layout for positioned elements #11048
                // Prevent IE from shrinking the body in IE 7 mode #12869
                // Support: IE<8
                body.style.zoom = 1;
            }
        }
        body.removeChild(container);
    });
    (function() {
        var div = document.createElement("div");
        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }
        // Null elements to avoid leaks in IE.
        div = null;
    })();
    /**
 * Determines whether an object can have data
 */
    jQuery.acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()], nodeType = +elem.nodeType || 1;
        // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
        // Nodes accept data unless otherwise specified; rejection can be conditional
        return nodeType !== 1 && nodeType !== 9 ? false : !noData || noData !== true && elem.getAttribute("classid") === noData;
    };
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    function dataAttr(elem, key, data) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : // Only convert to a number if it doesn't change the string
                    +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                // Make sure we set the data so it isn't changed later
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }
    // checks a cache object for emptiness
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            // if the public data object is empty, the private is still empty
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }
        return true;
    }
    function internalData(elem, name, data, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }
        var ret, thisCache, internalKey = jQuery.expando, // We have to handle DOM nodes and JS objects differently because IE6-7
        // can't GC object references properly across the DOM-JS boundary
        isNode = elem.nodeType, // Only DOM nodes need the global jQuery cache; JS object data is
        // attached directly to the object so GC can occur automatically
        cache = isNode ? jQuery.cache : elem, // Only defining an ID for JS objects if its cache already exists allows
        // the code to shortcut on the same path as a DOM node with no cache
        id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ((!id || !cache[id] || !pvt && !cache[id].data) && data === undefined && typeof name === "string") {
            return;
        }
        if (!id) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if (isNode) {
                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }
        if (!cache[id]) {
            // Avoid exposing jQuery metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            };
        }
        // An object can be passed to jQuery.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name);
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name);
            }
        }
        thisCache = cache[id];
        // jQuery data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }
            thisCache = thisCache.data;
        }
        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data;
        }
        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if (typeof name === "string") {
            // First Try to find as-is property data
            ret = thisCache[name];
            // Test for null|undefined property data
            if (ret == null) {
                // Try to find the camelCased property
                ret = thisCache[jQuery.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }
        return ret;
    }
    function internalRemoveData(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }
        var thisCache, i, isNode = elem.nodeType, // See jQuery.data for more information
        cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if (!cache[id]) {
            return;
        }
        if (name) {
            thisCache = pvt ? cache[id] : cache[id].data;
            if (thisCache) {
                // Support array or space separated string names for data keys
                if (!jQuery.isArray(name)) {
                    // try the string as a key before any manipulation
                    if (name in thisCache) {
                        name = [ name ];
                    } else {
                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [ name ];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = name.concat(jQuery.map(name, jQuery.camelCase));
                }
                i = name.length;
                while (i--) {
                    delete thisCache[name[i]];
                }
                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                    return;
                }
            }
        }
        // See jQuery.data for more information
        if (!pvt) {
            delete cache[id].data;
            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }
        // Destroy the cache
        if (isNode) {
            jQuery.cleanData([ elem ], true);
        } else if (support.deleteExpando || cache != cache.window) {
            /* jshint eqeqeq: true */
            delete cache[id];
        } else {
            cache[id] = null;
        }
    }
    jQuery.extend({
        cache: {},
        // The following elements (space-suffixed to avoid Object.prototype collisions)
        // throw uncatchable exceptions if you attempt to set expando properties
        noData: {
            "applet ": true,
            "embed ": true,
            // ...but Flash objects (which have this classid) *can* handle expandos
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },
        // For internal use only.
        _data: function(elem, name, data) {
            return internalData(elem, name, data, true);
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, true);
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            // Special expections of .data basically thwart jQuery.access,
            // so implement the relevant behavior ourselves
            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            // Support: IE11+
                            // The attrs elements can be null (#14894)
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }
                return data;
            }
            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key);
                });
            }
            // Sets one value
            // Gets one value
            // Try to fetch any internally stored data first
            return arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value);
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    });
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);
                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                // clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue");
                    jQuery._removeData(elem, key);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                // ensure a hooks for this queue
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                if (!--count) {
                    defer.resolveWith(elements, [ elements ]);
                }
            };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
    var isHidden = function(elem, el) {
        // isHidden might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    };
    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, length = elems.length, bulk = key == null;
        // Sets many values
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        } else if (value !== undefined) {
            chainable = true;
            if (!jQuery.isFunction(value)) {
                raw = true;
            }
            if (bulk) {
                // Bulk operations run against the entire set
                if (raw) {
                    fn.call(elems, value);
                    fn = null;
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }
            if (fn) {
                for (;i < length; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }
        // Gets
        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    };
    var rcheckableType = /^(?:checkbox|radio)$/i;
    (function() {
        // Minified: var a,b,c
        var input = document.createElement("input"), div = document.createElement("div"), fragment = document.createDocumentFragment();
        // Setup
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        // IE strips leading whitespace when .innerHTML is used
        support.leadingWhitespace = div.firstChild.nodeType === 3;
        // Make sure that tbody elements aren't automatically inserted
        // IE will insert them into empty tables
        support.tbody = !div.getElementsByTagName("tbody").length;
        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        support.htmlSerialize = !!div.getElementsByTagName("link").length;
        // Makes sure cloning an html5 element does not cause problems
        // Where outerHTML is undefined, this still works
        support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
        // Check if a disconnected checkbox will retain its checked
        // value of true after appended to the DOM (IE6/7)
        input.type = "checkbox";
        input.checked = true;
        fragment.appendChild(input);
        support.appendChecked = input.checked;
        // Make sure textarea (and checkbox) defaultValue is properly cloned
        // Support: IE6-IE11+
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        // #11217 - WebKit loses check when the name is after the checked attribute
        fragment.appendChild(div);
        div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
        // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
        // old WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        // Support: IE<9
        // Opera does not clone events (and typeof div.attachEvent === undefined).
        // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
        support.noCloneEvent = true;
        if (div.attachEvent) {
            div.attachEvent("onclick", function() {
                support.noCloneEvent = false;
            });
            div.cloneNode(true).click();
        }
        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }
    })();
    (function() {
        var i, eventName, div = document.createElement("div");
        // Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
        for (i in {
            submit: true,
            change: true,
            focusin: true
        }) {
            eventName = "on" + i;
            if (!(support[i + "Bubbles"] = eventName in window)) {
                // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
                div.setAttribute(eventName, "t");
                support[i + "Bubbles"] = div.attributes[eventName].expando === false;
            }
        }
        // Null elements to avoid leaks in IE.
        div = null;
    })();
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    /*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if (!elemData) {
                return;
            }
            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            // Init the element's event structure and main handler, if this is the first
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                };
                // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                eventHandle.elem = elem;
            }
            // Handle multiple events separated by a space
            types = (types || "").match(rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                    continue;
                }
                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};
                // If selector defined, determine special event api type, otherwise given type
                type = (selector ? special.delegateType : special.bindType) || type;
                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};
                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    // Only use addEventListener/attachEvent if the special events handler returns false
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        // Bind the global event handler to the element
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
            }
            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },
        // Detach an event or set of events from an element
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            // Once for each type.namespace in types; type may be omitted
            types = (types || "").match(rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            // Remove the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery._removeData(elem, "events");
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            // Don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf(".") >= 0) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ? [ event ] : jQuery.makeArray(data, [ event ]);
            // Allow special events to draw outside the lines
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (;cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }
            // Fire handlers on the event path
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                // jQuery handler
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;
            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
                    // Call a native DOM method on the target with the same name name as the event.
                    // Can't use an .isFunction() check here because IE6/7 fails that test.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {
                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {}
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function(event) {
            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [], args = slice.call(arguments), handlers = (jQuery._data(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;
            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            // Determine handlers
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    // Triggered event must either 1) have no namespace, or
                    // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            // Find delegate handlers
            // Black-hole SVG <use> instance trees (#13180)
            // Avoid non-left-click bubbling in Firefox (#3861)
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
                /* jshint eqeqeq: false */
                for (;cur != this; cur = cur.parentNode || this) {
                    /* jshint eqeqeq: true */
                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            });
                        }
                    }
                }
            }
            // Add the remaining (directly-bound) handlers
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                });
            }
            return handlerQueue;
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event;
            }
            // Create a writable copy of the event object and normalize some properties
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            // Support: IE<9
            // Fix target property (#1925)
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }
            // Support: Chrome 23+, Safari?
            // Target should not be a text node (#504, #13143)
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            // Support: IE<9
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
            event.metaKey = !!event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        // Includes some event props shared by KeyEvent and MouseEvent
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                // Add which for key events
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                // Calculate pageX/Y if missing and clientX/Y available
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                // Add relatedTarget, if necessary
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }
                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if (!event.which && button !== undefined) {
                    event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
                }
                return event;
            }
        },
        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) {}
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function() {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false;
                    }
                },
                // For cross-browser consistency, don't fire native .click() on links
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    } : function(elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
            // #8545, #7054, preventing memory leaks for custom events in IE6-8
            // detachEvent needed property on element, by name of that event, to properly expose it to GC
            if (typeof elem[name] === strundefined) {
                elem[name] = null;
            }
            elem.detachEvent(name, handle);
        }
    };
    jQuery.Event = function(src, props) {
        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && // Support: IE < 9, Android < 4.0
            src.returnValue === false ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }
        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();
        // Mark it as fixed
        this[jQuery.expando] = true;
    };
    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }
            // If preventDefault exists, run it on the original event
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (!e) {
                return;
            }
            // If stopPropagation exists, run it on the original event
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            // Support: IE
            // Set the cancelBubble property of the original event to true
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    };
    // Create mouseenter/leave events using mouseover/out and event-time checks
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                // For mousenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if (!related || related !== target && !jQuery.contains(target, related)) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    // IE submit delegation
    if (!support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function() {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                // Lazy-add a submit handler when a descendant form may potentially be submitted
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    // Node name check avoids a VML-related crash in IE (#9807)
                    var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "submitBubbles")) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = true;
                        });
                        jQuery._data(form, "submitBubbles", true);
                    }
                });
            },
            postDispatch: function(event) {
                // If form was submitted by the user, bubble the event up the tree
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },
            teardown: function() {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                jQuery.event.remove(this, "._submit");
            }
        };
    }
    // IE change delegation and checkbox/radio fix
    if (!support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function() {
                if (rformElems.test(this.nodeName)) {
                    // IE doesn't fire change on a check/radio until blur; trigger it on click
                    // after a propertychange. Eat the blur-change in special.change.handle.
                    // This still fires onchange a second time for check/radio after blur.
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            // Allow triggered, simulated change events (#11500)
                            jQuery.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                // Delegated event; lazy-add a change handler on descendant inputs
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        jQuery._data(elem, "changeBubbles", true);
                    }
                });
            },
            handle: function(event) {
                var elem = event.target;
                // Swallow native change events from checkbox/radio, we already triggered them above
                if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== "radio" && elem.type !== "checkbox") {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },
            teardown: function() {
                jQuery.event.remove(this, "._change");
                return !rformElems.test(this.nodeName);
            }
        };
    }
    // Create "bubbling" focus and blur events
    if (!support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    jQuery._data(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        jQuery._removeData(doc, fix);
                    } else {
                        jQuery._data(doc, fix, attaches);
                    }
                }
            };
        });
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, /*INTERNAL*/ one) {
            var type, origFn;
            // Types can be a map of types/handlers
            if (typeof types === "object") {
                // ( types-Object, selector, data )
                if (typeof selector !== "string") {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }
            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    // Can use an empty set, since event contains the info
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop());
            }
        }
        return safeFrag;
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, // checked="checked" or checked
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, // We have to close these tags to support XHTML (#13200)
    wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
        // unless wrapped in a div with non-breaking characters in front of it.
        _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function getAll(context, tag) {
        var elems, elem, i = 0, found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") : undefined;
        if (!found) {
            for (found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++) {
                if (!tag || jQuery.nodeName(elem, tag)) {
                    found.push(elem);
                } else {
                    jQuery.merge(found, getAll(elem, tag));
                }
            }
        }
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], found) : found;
    }
    // Used in buildFragment, fixes the defaultChecked property
    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }
    // Support: IE<8
    // Manipulating tables requires a tbody
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
        elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }
    // Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
        var elem, i = 0;
        for (;(elem = elems[i]) != null; i++) {
            jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
        }
    }
    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }
        var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }
        // make the cloned public data object a copy from the original
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        // We do not need to do anything for non-Elements
        if (dest.nodeType !== 1) {
            return;
        }
        nodeName = dest.nodeName.toLowerCase();
        // IE6-8 copies events bound via attachEvent when using cloneNode.
        if (!support.noCloneEvent && dest[jQuery.expando]) {
            data = jQuery._data(dest);
            for (e in data.events) {
                jQuery.removeEvent(dest, e, data.handle);
            }
            // Event data gets referenced instead of copied if the expando gets copied too
            dest.removeAttribute(jQuery.expando);
        }
        // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
        if (nodeName === "script" && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest);
        } else if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }
            // This path appears unavoidable for IE9. When cloning an object
            // element in IE9, the outerHTML strategy above is not sufficient.
            // If the src has innerHTML and the destination does not,
            // copy the src.innerHTML into the dest.innerHTML. #10324
            if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML;
            }
        } else if (nodeName === "input" && rcheckableType.test(src.type)) {
            // IE6-8 fails to persist the checked state of a cloned checkbox
            // or radio button. Worse, IE6-7 fail to give the cloned element
            // a checked appearance if the defaultChecked value isn't also set
            dest.defaultChecked = dest.checked = src.checked;
            // IE6-7 get confused and end up setting the value of a cloned
            // checkbox/radio button to an empty string instead of "on"
            if (dest.value !== src.value) {
                dest.value = src.value;
            }
        } else if (nodeName === "option") {
            dest.defaultSelected = dest.selected = src.defaultSelected;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true);
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }
            if ((!support.noCloneEvent || !support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);
                // Fix all IE cloning issues
                for (i = 0; (node = srcElements[i]) != null; ++i) {
                    // Ensure that the destination node is not null; Fixes #9587
                    if (destElements[i]) {
                        fixCloneNodeIssues(node, destElements[i]);
                    }
                }
            }
            // Copy the events from the original to the clone
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0; (node = srcElements[i]) != null; i++) {
                        cloneCopyEvent(node, destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }
            // Preserve script evaluation history
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            destElements = srcElements = node = null;
            // Return the cloned set
            return clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, // Ensure a safe fragment
            safe = createSafeFragment(context), nodes = [], i = 0;
            for (;i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    // Add nodes directly
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem);
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                    } else {
                        tmp = tmp || safe.appendChild(context.createElement("div"));
                        // Deserialize a standard representation
                        tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                        // Descend through wrappers to the right content
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        // Manually add leading whitespace removed by IE
                        if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                        }
                        // Remove IE's autoinserted <tbody> from table fragments
                        if (!support.tbody) {
                            // String was a <table>, *may* have spurious <tbody>
                            elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild : // String was a bare <thead> or <tfoot>
                            wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;
                            j = elem && elem.childNodes.length;
                            while (j--) {
                                if (jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length) {
                                    elem.removeChild(tbody);
                                }
                            }
                        }
                        jQuery.merge(nodes, tmp.childNodes);
                        // Fix #12392 for WebKit and IE > 9
                        tmp.textContent = "";
                        // Fix #12392 for oldIE
                        while (tmp.firstChild) {
                            tmp.removeChild(tmp.firstChild);
                        }
                        // Remember the top-level container for proper cleanup
                        tmp = safe.lastChild;
                    }
                }
            }
            // Fix #11356: Clear elements from fragment
            if (tmp) {
                safe.removeChild(tmp);
            }
            // Reset defaultChecked for any radios and checkboxes
            // about to be appended to the DOM in IE 6/7 (#8060)
            if (!support.appendChecked) {
                jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
            }
            i = 0;
            while (elem = nodes[i++]) {
                // #4087 - If origin and destination elements are the same, and this is
                // that element, do not do anything
                if (selection && jQuery.inArray(elem, selection) !== -1) {
                    continue;
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                // Append to fragment
                tmp = getAll(safe.appendChild(elem), "script");
                // Preserve script evaluation history
                if (contains) {
                    setGlobalEval(tmp);
                }
                // Capture executables
                if (scripts) {
                    j = 0;
                    while (elem = tmp[j++]) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            tmp = null;
            return safe;
        },
        cleanData: function(elems, /* internal */ acceptData) {
            var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = support.deleteExpando, special = jQuery.event.special;
            for (;(elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        // Remove cache only if it was not already removed by jQuery.event.remove
                        if (cache[id]) {
                            delete cache[id];
                            // IE does not allow us to delete expando properties from nodes,
                            // nor does it have a removeAttribute function on Document nodes;
                            // we must handle all of these cases
                            if (deleteExpando) {
                                delete elem[internalKey];
                            } else if (typeof elem.removeAttribute !== strundefined) {
                                elem.removeAttribute(internalKey);
                            } else {
                                elem[internalKey] = null;
                            }
                            deletedIds.push(id);
                        }
                    }
                }
            }
        }
    });
    jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        remove: function(selector, keepData) {
            var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0;
            for (;(elem = elems[i]) != null; i++) {
                if (!keepData && elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem));
                }
                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                        setGlobalEval(getAll(elem, "script"));
                    }
                    elem.parentNode.removeChild(elem);
                }
            }
            return this;
        },
        empty: function() {
            var elem, i = 0;
            for (;(elem = this[i]) != null; i++) {
                // Remove element nodes and prevent memory leaks
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                }
                // Remove any remaining nodes
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
                // If this is a select, ensure that it displays empty (#12336)
                // Support: IE<9
                if (elem.options && jQuery.nodeName(elem, "select")) {
                    elem.options.length = 0;
                }
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                }
                // See if we can take a shortcut and just use innerHTML
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;i < l; i++) {
                            // Remove element nodes and prevent memory leaks
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            // Make the changes, replacing each context element with the new content
            this.domManip(arguments, function(elem) {
                arg = this.parentNode;
                jQuery.cleanData(getAll(this));
                if (arg) {
                    arg.replaceChild(elem, this);
                }
            });
            // Force removal if there was no new content (e.g., from empty arguments)
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, callback) {
            // Flatten any nested arrays
            args = concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            // We can't cloneNode fragments that contain checked, in WebKit
            if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
                return this.each(function(index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    self.domManip(args, callback);
                });
            }
            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    // Use the original fragment for the last item instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    for (;i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            // Keep references to cloned scripts for later restoration
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(this[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        // Reenable scripts
                        jQuery.map(scripts, restoreScript);
                        // Evaluate executable scripts on first document insertion
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {
                                if (node.src) {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                } else {
                                    jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
                                }
                            }
                        }
                    }
                    // Fix #11809: Avoid leaking memory
                    fragment = first = null;
                }
            }
            return this;
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1;
            for (;i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
                push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {};
    /**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
    // Called only from within defaultDisplay
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), // getDefaultComputedStyle might be reliably used only on attached element
        display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? // Use of this method is a temporary fix (more like optmization) until something better comes along,
        // since it was removed from specification and supported only in FF
        style.display : jQuery.css(elem[0], "display");
        // We don't have any data stored on the element,
        // so use "detach" method as fast way to get rid of the element
        elem.detach();
        return display;
    }
    /**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            // If the simple way fails, read from inside an iframe
            if (display === "none" || !display) {
                // Use the already-created iframe if possible
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
                // Support: IE
                doc.write();
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            // Store the correct default display
            elemdisplay[nodeName] = display;
        }
        return display;
    }
    (function() {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function() {
            if (shrinkWrapBlocksVal != null) {
                return shrinkWrapBlocksVal;
            }
            // Will be changed later if needed.
            shrinkWrapBlocksVal = false;
            // Minified: var b,c,d
            var div, body, container;
            body = document.getElementsByTagName("body")[0];
            if (!body || !body.style) {
                // Test fired too early or in an unsupported environment, exit.
                return;
            }
            // Setup
            div = document.createElement("div");
            container = document.createElement("div");
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);
            // Support: IE6
            // Check if elements with layout shrink-wrap their children
            if (typeof div.style.zoom !== strundefined) {
                // Reset CSS: box-sizing; display; margin; border
                div.style.cssText = // Support: Firefox<29, Android 2.3
                // Vendor-prefix box-sizing
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;" + "padding:1px;width:1px;zoom:1";
                div.appendChild(document.createElement("div")).style.width = "5px";
                shrinkWrapBlocksVal = div.offsetWidth !== 3;
            }
            body.removeChild(container);
            return shrinkWrapBlocksVal;
        };
    })();
    var rmargin = /^margin/;
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles, curCSS, rposition = /^(top|right|bottom|left)$/;
    if (window.getComputedStyle) {
        getStyles = function(elem) {
            // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            if (elem.ownerDocument.defaultView.opener) {
                return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
            }
            return window.getComputedStyle(elem, null);
        };
        curCSS = function(elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            computed = computed || getStyles(elem);
            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
            if (computed) {
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name);
                }
                // A tribute to the "awesome hack by Dean Edwards"
                // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ? ret : ret + "";
        };
    } else if (document.documentElement.currentStyle) {
        getStyles = function(elem) {
            return elem.currentStyle;
        };
        curCSS = function(elem, name, computed) {
            var left, rs, rsLeft, ret, style = elem.style;
            computed = computed || getStyles(elem);
            ret = computed ? computed[name] : undefined;
            // Avoid setting ret to empty string here
            // so we don't default to auto
            if (ret == null && style && style[name]) {
                ret = style[name];
            }
            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            // but not position css attributes, as those are proportional to the parent element instead
            // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
            if (rnumnonpx.test(ret) && !rposition.test(name)) {
                // Remember the original values
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;
                // Put in the new values to get a computed value out
                if (rsLeft) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                // Revert the changed values
                style.left = left;
                if (rsLeft) {
                    rs.left = rsLeft;
                }
            }
            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ? ret : ret + "" || "auto";
        };
    }
    function addGetHookIf(conditionFn, hookFn) {
        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                var condition = conditionFn();
                if (condition == null) {
                    // The test was not ready at this point; screw the hook this time
                    // but check again when needed next time.
                    return;
                }
                if (condition) {
                    // Hook not needed (or it's not possible to use it due to missing dependency),
                    // remove it.
                    // Since there are no other hooks for marginRight, remove the whole object.
                    delete this.get;
                    return;
                }
                // Hook needed; redefine it so that the support test is not executed again.
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    (function() {
        // Minified: var b,c,d,e,f,g, h,i
        var div, style, a, pixelPositionVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal;
        // Setup
        div = document.createElement("div");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];
        style = a && a.style;
        // Finish early in limited (non-browser) environments
        if (!style) {
            return;
        }
        style.cssText = "float:left;opacity:.5";
        // Support: IE<9
        // Make sure that element opacity exists (as opposed to filter)
        support.opacity = style.opacity === "0.5";
        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        support.cssFloat = !!style.cssFloat;
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        // Support: Firefox<29, Android 2.3
        // Vendor-prefix box-sizing
        support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" || style.WebkitBoxSizing === "";
        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                if (reliableHiddenOffsetsVal == null) {
                    computeStyleTests();
                }
                return reliableHiddenOffsetsVal;
            },
            boxSizingReliable: function() {
                if (boxSizingReliableVal == null) {
                    computeStyleTests();
                }
                return boxSizingReliableVal;
            },
            pixelPosition: function() {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return pixelPositionVal;
            },
            // Support: Android 2.3
            reliableMarginRight: function() {
                if (reliableMarginRightVal == null) {
                    computeStyleTests();
                }
                return reliableMarginRightVal;
            }
        });
        function computeStyleTests() {
            // Minified: var b,c,d,j
            var div, body, container, contents;
            body = document.getElementsByTagName("body")[0];
            if (!body || !body.style) {
                // Test fired too early or in an unsupported environment, exit.
                return;
            }
            // Setup
            div = document.createElement("div");
            container = document.createElement("div");
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);
            div.style.cssText = // Support: Firefox<29, Android 2.3
            // Vendor-prefix box-sizing
            "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
            // Support: IE<9
            // Assume reasonable values in the absence of getComputedStyle
            pixelPositionVal = boxSizingReliableVal = false;
            reliableMarginRightVal = true;
            // Check for getComputedStyle so that this code is not run in IE<9.
            if (window.getComputedStyle) {
                pixelPositionVal = (window.getComputedStyle(div, null) || {}).top !== "1%";
                boxSizingReliableVal = (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width === "4px";
                // Support: Android 2.3
                // Div with explicit width and no margin-right incorrectly
                // gets computed margin-right based on width of container (#3333)
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                contents = div.appendChild(document.createElement("div"));
                // Reset CSS: box-sizing; display; margin; border; padding
                contents.style.cssText = div.style.cssText = // Support: Firefox<29, Android 2.3
                // Vendor-prefix box-sizing
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                contents.style.marginRight = contents.style.width = "0";
                div.style.width = "1px";
                reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents, null) || {}).marginRight);
                div.removeChild(contents);
            }
            // Support: IE8
            // Check if table cells still have offsetWidth/Height when they are set
            // to display:none and there are still other visible table cells in a
            // table row; if so, offsetWidth/Height are not reliable for use when
            // determining if an element has been hidden directly using
            // display:none (it is still safe to use offsets if a parent element is
            // hidden; don safety goggles and see bug #4512 for more information).
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            contents = div.getElementsByTagName("td");
            contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
            reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
            if (reliableHiddenOffsetsVal) {
                contents[0].style.display = "";
                contents[1].style.display = "none";
                reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
            }
            body.removeChild(container);
        }
    })();
    // A method for quickly swapping in/out CSS properties to get correct calculations.
    jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        // Remember the old values, and insert the new ones
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }
        ret = callback.apply(elem, args || []);
        // Revert the old values
        for (name in options) {
            elem.style[name] = old[name];
        }
        return ret;
    };
    var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/, // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    // return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(style, name) {
        // shortcut for names that are not vendor prefixed
        if (name in style) {
            return name;
        }
        // check for vendor prefixed names
        var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }
        return origName;
    }
    function showHide(elements, show) {
        var display, elem, hidden, values = [], index = 0, length = elements.length;
        for (;index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            values[index] = jQuery._data(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }
                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                }
            } else {
                hidden = isHidden(elem);
                if (display && display !== "none" || !hidden) {
                    jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                }
            }
        }
        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        // Guard against undefined "subtract", e.g., when used as in cssHooks
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? // If we already have the right measurement, avoid augmentation
        4 : // Otherwise initialize for horizontal or vertical properties
        name === "width" ? 1 : 0, val = 0;
        for (;i < 4; i += 2) {
            // both box models exclude margin, so add it if we want it
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
                // border-box includes padding, so remove it if we want content
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }
                // at this point, extra isn't border nor margin, so remove border
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {
                // at this point, extra isn't content, so add padding
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                // at this point, extra isn't content nor padding, so add border
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        // Start with offset property, which is equivalent to the border-box value
        var valueIsBorderBox = true, val = name === "width" ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        // some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if (val <= 0 || val == null) {
            // Fall back to computed then uncomputed css if necessary
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
                return val;
            }
            // we need the check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
        }
        // use the active box-sizing model to add/subtract irrelevant styles
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            // normalize float css property
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },
        // Get and set the style property on a DOM Node
        style: function(elem, name, value, extra) {
            // Don't set styles on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            // Make sure that we're working with the right name
            var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            // Check if we're setting a value
            if (value !== undefined) {
                type = typeof value;
                // convert relative number strings (+= or -=) to relative numbers. #7345
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    // Fixes bug #9237
                    type = "number";
                }
                // Make sure that null and NaN values aren't set. See: #7116
                if (value == null || value !== value) {
                    return;
                }
                // If a number was passed in, add 'px' to the (except for certain CSS properties)
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
                // but it would mean to define eight (for every problematic property) identical functions
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }
                // If a hook was provided, use that value, otherwise just set the specified value
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    // Support: IE
                    // Swallow errors from 'invalid' CSS values (#5509)
                    try {
                        style[name] = value;
                    } catch (e) {}
                }
            } else {
                // If a hook was provided get the non-computed value from there
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                // Otherwise just get the value from the style object
                return style[name];
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            // Make sure that we're working with the right name
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            // If a hook was provided get the computed value from there
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }
            // Otherwise, if a way to get the computed value exists, use that
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            //convert "normal" to computed value
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            // Return, converting to number if forced or a qualifier was provided and val looks numeric
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        }
    });
    jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    // certain elements can have dimension info if we invisibly show them
                    // however, it must have a current display style that would benefit from this
                    return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra);
                    }) : getWidthOrHeight(elem, name, extra);
                }
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
            }
        };
    });
    if (!support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                // IE uses filters for opacity
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
            },
            set: function(elem, value) {
                var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
                // IE has trouble with opacity if it does not have layout
                // Force it by setting the zoom level
                style.zoom = 1;
                // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
                // if value === "", then remove inline opacity #12685
                if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                    // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                    // if "filter:" is present at all, clearType is disabled, we want to avoid this
                    // style.removeAttribute is IE Only, but so apparently is this code path...
                    style.removeAttribute("filter");
                    // if there is no filter style applied in a css rule or unset inline opacity, we are done
                    if (value === "" || currentStyle && !currentStyle.filter) {
                        return;
                    }
                }
                // otherwise, set new filter values
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
            }
        };
    }
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        if (computed) {
            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
            // Work around by temporarily setting element display to inline-block
            return jQuery.swap(elem, {
                display: "inline-block"
            }, curCSS, [ elem, "marginRight" ]);
        }
    });
    // These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0, expanded = {}, // assumes a single number if not a string
                parts = typeof value === "string" ? value.split(" ") : [ value ];
                for (;i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (;i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }
            return this.each(function() {
                if (isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop];
                }
                // passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails
                // so, simple values such as "10px" are parsed to Float.
                // complex values such as "rotate(1rad)" are returned as is.
                result = jQuery.css(tween.elem, tween.prop, "");
                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
                // use step hook for back compat - use cssHook if its there - use .style if its
                // available and use plain properties where available
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    // Support: IE <=9
    // Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    };
    jQuery.fx = Tween.prototype.init;
    // Back Compat <1.8 extension point
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), // Starting value computation is required for potential unit mismatches
            start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                // Trust units reported by jQuery.css
                unit = unit || start[3];
                // Make sure we update the tween properties later on
                parts = parts || [];
                // Iteratively approximate from a nonzero starting point
                start = +target || 1;
                do {
                    // If previous iteration zeroed out, double until we get *something*
                    // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                    scale = scale || ".5";
                    // Adjust and apply
                    start = start / scale;
                    jQuery.style(tween.elem, prop, start + unit);
                } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
            }
            // Update tween properties
            if (parts) {
                start = tween.start = +start || +target || 0;
                tween.unit = unit;
                // If a +=/-= token was provided, we're doing a relative animation
                tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
            }
            return tween;
        } ]
    };
    // Animations created synchronously will run synchronously
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return fxNow = jQuery.now();
    }
    // Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for (;i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    function createTween(value, prop, animation) {
        var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length;
        for (;index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
                // we're done with this property
                return tween;
            }
        }
    }
    function defaultPrefilter(elem, props, opts) {
        /* jshint validthis: true */
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = jQuery._data(elem, "fxshow");
        // handle queue: false promises
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
            anim.always(function() {
                // doing this makes sure that the complete handler will be called
                // before this completes
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        // height/width overflow pass
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE does not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            display = jQuery.css(elem, "display");
            // Test default display if display is currently "none"
            checkDisplay = display === "none" ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
                // inline-level elements accept inline-block;
                // block-level elements need to be inline with layout
                if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            if (!support.shrinkWrapBlocks()) {
                anim.always(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
        }
        // show/hide pass
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            } else {
                display = undefined;
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = jQuery._data(elem, "fxshow", {});
            }
            // store state if its toggle - enables .stop().toggle() to "reverse"
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function() {
                    jQuery(elem).hide();
                });
            }
            anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
            style.display = display;
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        // camelCase, specialEasing and expand cssHook pass
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                // not quite $.extend, this wont overwrite keys already present.
                // also - reusing 'index' from above because we have the correct "name"
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            // don't match elem in the :animated selector
            delete tick.elem;
        }), tick = function() {
            if (stopped) {
                return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
            temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
            for (;index < length; index++) {
                animation.tweens[index].run(percent);
            }
            deferred.notifyWith(elem, [ animation, percent, remaining ]);
            if (percent < 1 && length) {
                return remaining;
            } else {
                deferred.resolveWith(elem, [ animation ]);
                return false;
            }
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                animation.tweens.push(tween);
                return tween;
            },
            stop: function(gotoEnd) {
                var index = 0, // if we are going to the end, we want to run all the tweens
                // otherwise we skip this part
                length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) {
                    return this;
                }
                stopped = true;
                for (;index < length; index++) {
                    animation.tweens[index].run(1);
                }
                // resolve when we played the last frame
                // otherwise, reject
                if (gotoEnd) {
                    deferred.resolveWith(elem, [ animation, gotoEnd ]);
                } else {
                    deferred.rejectWith(elem, [ animation, gotoEnd ]);
                }
                return this;
            }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (;index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        // attach callbacks from options
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.split(" ");
            }
            var prop, index = 0, length = props.length;
            for (;index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        // normalize opt.queue - true/undefined/null -> "fx"
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }
        // Queueing
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };
        return opt;
    };
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            // show any hidden elements after setting opacity to 0
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                // Operate on a copy of prop so per-property easing won't be lost
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                // Empty animations, or finishing resolves immediately
                if (empty || jQuery._data(this, "finish")) {
                    anim.stop(true);
                }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function() {
                var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function() {
                var index, data = jQuery._data(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                // enable finishing flag on private data
                data.finish = true;
                // empty the queue first
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }
                // look for any active animations, and finish them
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }
                // look for any animations in the old queue and finish them
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }
                // turn off finishing flag
                delete data.finish;
            });
        }
    });
    jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    // Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        fxNow = jQuery.now();
        for (;i < timers.length; i++) {
            timer = timers[i];
            // Checks the timer has not already been removed
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
    };
    // Based off of the plugin by Clint Helfers, with permission.
    // http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    };
    (function() {
        // Minified: var a,b,c,d,e
        var input, div, select, a, opt;
        // Setup
        div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];
        // First batch of tests.
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        a.style.cssText = "top:1px";
        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        support.getSetAttribute = div.className !== "t";
        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        support.style = /top/.test(a.getAttribute("style"));
        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        support.hrefNormalized = a.getAttribute("href") === "/a";
        // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
        support.checkOn = !!input.value;
        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        support.optSelected = opt.selected;
        // Tests for enctype support on a form (#6743)
        support.enctype = !!document.createElement("form").enctype;
        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        // Support: IE8 only
        // Check if we can trust getAttribute("value")
        input = document.createElement("input");
        input.setAttribute("value", "");
        support.input = input.getAttribute("value") === "";
        // Check if an input maintains its value after becoming a radio
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
    })();
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    // handle most common string cases
                    // handle cases where value is null/undef or number
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }
                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                // If set returns undefined, fall back to normal setting
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    // Support: IE10-11+
                    // option.text throws exceptions (#14686, #14858)
                    return val != null ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one" || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
                    // Loop through all the selected options
                    for (;i < max; i++) {
                        option = options[i];
                        // oldIE doesn't update selected after form reset (#2551)
                        if ((option.selected || i === index) && (// Don't return options that are disabled or in a disabled optgroup
                        support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            // Get the specific value for the option
                            value = jQuery(option).val();
                            // We don't need an array for one selects
                            if (one) {
                                return value;
                            }
                            // Multi-Selects return an array
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function(elem, value) {
                    var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                    while (i--) {
                        option = options[i];
                        if (jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) {
                            // Support: IE6
                            // When new option element is added to select box we need to
                            // force reflow of newly added node in order to workaround delay
                            // of initialization properties
                            try {
                                option.selected = optionSet = true;
                            } catch (_) {
                                // Will be executed only in IE6
                                option.scrollHeight;
                            }
                        } else {
                            option.selected = false;
                        }
                    }
                    // Force browsers to behave consistently when non-matching value is set
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return options;
                }
            }
        }
    });
    // Radios and checkboxes getter/setter
    jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                // Support: Webkit
                // "" is returned instead of "on" if a value isn't specified
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = support.getSetAttribute, getSetInput = support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    });
    jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            // don't get/set attributes on text, comment and attribute nodes
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === strundefined) {
                return jQuery.prop(elem, name, value);
            }
            // All attributes are lowercase
            // Grab necessary hook if one is defined
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }
            } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            } else {
                ret = jQuery.find.attr(elem, name);
                // Non-existent attributes return null, we normalize to undefined
                return ret == null ? undefined : ret;
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while (name = attrNames[i++]) {
                    propName = jQuery.propFix[name] || name;
                    // Boolean attributes get special treatment (#10870)
                    if (jQuery.expr.match.bool.test(name)) {
                        // Set corresponding property to false
                        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                            elem[propName] = false;
                        } else {
                            elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
                        }
                    } else {
                        jQuery.attr(elem, name, "");
                    }
                    elem.removeAttribute(getSetAttribute ? name : propName);
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        // Setting the type on a radio button after the value resets the value in IE6-9
                        // Reset value to default in case type is set after value during creation
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });
    // Hook for boolean attributes
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {
                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
            } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                // IE<8 needs the *property* name
                elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
            } else {
                elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
            }
            return name;
        }
    };
    // Retrieve booleans specially
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
            var ret, handle;
            if (!isXML) {
                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[name];
                attrHandle[name] = ret;
                ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                attrHandle[name] = handle;
            }
            return ret;
        } : function(elem, name, isXML) {
            if (!isXML) {
                return elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
            }
        };
    });
    // fix oldIE attroperties
    if (!getSetInput || !getSetAttribute) {
        jQuery.attrHooks.value = {
            set: function(elem, value, name) {
                if (jQuery.nodeName(elem, "input")) {
                    // Does not return so that setAttribute is also used
                    elem.defaultValue = value;
                } else {
                    // Use nodeHook if defined (#1954); otherwise setAttribute is fine
                    return nodeHook && nodeHook.set(elem, value, name);
                }
            }
        };
    }
    // IE6/7 do not support getting/setting some attributes with get/setAttribute
    if (!getSetAttribute) {
        // Use this for any attribute in IE6/7
        // This fixes almost every IE6/7 issue
        nodeHook = {
            set: function(elem, value, name) {
                // Set the existing or create a new attribute node
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name));
                }
                ret.value = value += "";
                // Break association with cloned elements by also using setAttribute (#9646)
                if (name === "value" || value === elem.getAttribute(name)) {
                    return value;
                }
            }
        };
        // Some attributes are constructed with empty-string values when not defined
        attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
            var ret;
            if (!isXML) {
                return (ret = elem.getAttributeNode(name)) && ret.value !== "" ? ret.value : null;
            }
        };
        // Fixing value retrieval on a button requires this module
        jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret = elem.getAttributeNode(name);
                if (ret && ret.specified) {
                    return ret.value;
                }
            },
            set: nodeHook.set
        };
        // Set contenteditable to false on removals(#10429)
        // Setting to empty string throws an error as an invalid value
        jQuery.attrHooks.contenteditable = {
            set: function(elem, value, name) {
                nodeHook.set(elem, value === "" ? false : value, name);
            }
        };
        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
        // This is for removals
        jQuery.each([ "width", "height" ], function(i, name) {
            jQuery.attrHooks[name] = {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            };
        });
    }
    if (!support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                // Return undefined in the case of empty string
                // Note: IE uppercases css property names, but if we were to .toLowerCase()
                // .cssText, that would destroy case senstitivity in URL's, like in "background"
                return elem.style.cssText || undefined;
            },
            set: function(elem, value) {
                return elem.style.cssText = value + "";
            }
        };
    }
    var rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                // try/catch handles cases where IE balks (such as removing a property on window)
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        }
    });
    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            // don't get/set properties on text, comment and attribute nodes
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value;
            } else {
                return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        }
    });
    // Some attributes require a special call on IE
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!support.hrefNormalized) {
        // href/src property should get the full normalized URL (#10299/#12915)
        jQuery.each([ "href", "src" ], function(i, name) {
            jQuery.propHooks[name] = {
                get: function(elem) {
                    return elem.getAttribute(name, 4);
                }
            };
        });
    }
    // Support: Safari, IE9+
    // mis-reports the default selected property of an option
    // Accessing the parent's selectedIndex property fixes it
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    // Make sure that it also works with optgroups, see #5701
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        };
    }
    jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    // IE6/7 call enctype encoding
    if (!support.enctype) {
        jQuery.propFix.enctype = "encoding";
    }
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = typeof value === "string" && value;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                // The disjunction here is for better compressibility (see removeClass)
                classes = (value || "").match(rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }
                        // only assign if different to avoid unneeded rendering.
                        finalValue = jQuery.trim(cur);
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = arguments.length === 0 || typeof value === "string" && value;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            // Remove *all* instances
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        // only assign if different to avoid unneeded rendering.
                        finalValue = value ? jQuery.trim(cur) : "";
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }
            return this.each(function() {
                if (type === "string") {
                    // toggle individual class names
                    var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || [];
                    while (className = classNames[i++]) {
                        // check each className given, space separated list
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }
                } else if (type === strundefined || type === "boolean") {
                    if (this.className) {
                        // store className if set
                        jQuery._data(this, "__className__", this.className);
                    }
                    // If the element has a class name or if we're passed "false",
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ", i = 0, l = this.length;
            for (;i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }
            return false;
        }
    });
    // Return jQuery for attributes-only inclusion
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        // Handle event binding
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now();
    var rquery = /\?/;
    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function(data) {
        // Attempt to parse using the native JSON parser first
        if (window.JSON && window.JSON.parse) {
            // Support: Android 2.3
            // Workaround failure to string-cast null input
            return window.JSON.parse(data + "");
        }
        var requireNonComma, depth = null, str = jQuery.trim(data + "");
        // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
        // after removing valid tokens
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            // Force termination if we see a misplaced comma
            if (requireNonComma && comma) {
                depth = 0;
            }
            // Perform no more replacements after returning to outermost depth
            if (depth === 0) {
                return token;
            }
            // Commas must not follow "[", "{", or ","
            requireNonComma = open || comma;
            // Determine new depth
            // array/object open ("[" or "{"): depth += true - false (increment)
            // array/object close ("]" or "}"): depth += false - true (decrement)
            // other cases ("," or primitive): depth += true - true (numeric cast)
            depth += !close - !open;
            // Remove this token
            return "";
        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data);
    };
    // Cross-browser xml parsing
    jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            if (window.DOMParser) {
                // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            } else {
                // IE
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data);
            }
        } catch (e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };
    var // Document location
    ajaxLocParts, ajaxLocation, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, // IE leaves an \r character at EOL
    // #7653, #8125, #8152: local protocol detection
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, /* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
    prefilters = {}, /* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
    transports = {}, // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    allTypes = "*/".concat("*");
    // #8138, IE may throw an exception when accessing
    // a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch (e) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    // Segment location into parts
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {
        // dataTypeExpression is optional and defaults to "*"
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) {
                // For each dataType in the dataTypeExpression
                while (dataType = dataTypes[i++]) {
                    // Prepend if requested
                    if (dataType.charAt(0) === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }
    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
        return target;
    }
    /* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes;
        // Remove auto dataType and get content-type in the process
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }
        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }
        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    /* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, // Work with a copy of dataTypes in case we need to modify it for conversion
        dataTypes = s.dataTypes.slice();
        // Create converters map with lowercased keys
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        current = dataTypes.shift();
        // Convert to each sequential dataType
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }
            // Apply the dataFilter if provided
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                // There's only work to do if current dataType is non-auto
                if (current === "*") {
                    current = prev;
                } else if (prev !== "*" && prev !== current) {
                    // Seek a direct converter
                    conv = converters[prev + " " + current] || converters["* " + current];
                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {
                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                // If prev can be converted to accepted input
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    // Apply converter (if not an equivalence)
                    if (conv !== true) {
                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    jQuery.extend({
        // Counter for holding the number of active queries
        active: 0,
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {
                // Convert anything to text
                "* text": String,
                // Text to html (true = no transformation)
                "text html": true,
                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,
                // Parse text as xml
                "text xml": jQuery.parseXML
            },
            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },
        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function(target, settings) {
            // Building a settings object
            // Extending ajaxSettings
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        // Main method
        ajax: function(url, options) {
            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            // Force options to be an object
            options = options || {};
            var // Cross-domain detection vars
            parts, // Loop variable
            i, // URL without anti-cache param
            cacheURL, // Response headers as string
            responseHeadersString, // timeout handle
            timeoutTimer, // To know if global events are to be dispatched
            fireGlobals, transport, // Response headers
            responseHeaders, // Create the final options object
            s = jQuery.ajaxSetup({}, options), // Callbacks context
            callbackContext = s.context || s, // Context for global events is callbackContext if it is a DOM node or jQuery collection
            globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, // Deferreds
            deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), // Status-dependent callbacks
            statusCode = s.statusCode || {}, // Headers (they are sent all at once)
            requestHeaders = {}, requestHeadersNames = {}, // The jqXHR state
            state = 0, // Default abort message
            strAbort = "canceled", // Fake xhr
            jqXHR = {
                readyState: 0,
                // Builds headers hashtable if needed
                getResponseHeader: function(key) {
                    var match;
                    if (state === 2) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while (match = rheaders.exec(responseHeadersString)) {
                                responseHeaders[match[1].toLowerCase()] = match[2];
                            }
                        }
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return match == null ? null : match;
                },
                // Raw string
                getAllResponseHeaders: function() {
                    return state === 2 ? responseHeadersString : null;
                },
                // Caches the header
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    if (!state) {
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                        requestHeaders[name] = value;
                    }
                    return this;
                },
                // Overrides response content-type header
                overrideMimeType: function(type) {
                    if (!state) {
                        s.mimeType = type;
                    }
                    return this;
                },
                // Status-dependent callbacks
                statusCode: function(map) {
                    var code;
                    if (map) {
                        if (state < 2) {
                            for (code in map) {
                                // Lazy-add the new callback in a way that preserves old ones
                                statusCode[code] = [ statusCode[code], map[code] ];
                            }
                        } else {
                            // Execute the appropriate callbacks
                            jqXHR.always(map[jqXHR.status]);
                        }
                    }
                    return this;
                },
                // Cancel the request
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    if (transport) {
                        transport.abort(finalText);
                    }
                    done(0, finalText);
                    return this;
                }
            };
            // Attach deferreds
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;
            // Extract dataTypes list
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ];
            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
            }
            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            // If request was aborted inside a prefilter, stop there
            if (state === 2) {
                return jqXHR;
            }
            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals = jQuery.event && s.global;
            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            // Uppercase the type
            s.type = s.type.toUpperCase();
            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);
            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL = s.url;
            // More options handling for requests with no content
            if (!s.hasContent) {
                // If data is available, append data to url
                if (s.data) {
                    cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }
                // Add anti-cache in url if needed
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ? // If there is already a '_' parameter, set its value
                    cacheURL.replace(rts, "$1_=" + nonce++) : // Otherwise add one to the end
                    cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                }
            }
            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }
            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                // Abort if not done already and return
                return jqXHR.abort();
            }
            // aborting is no longer a cancellation
            strAbort = "abort";
            // Install callbacks on deferreds
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i]);
            }
            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [ jqXHR, s ]);
                }
                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    // Propagate exception as error if not done
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }
            // Callback for when everything is done
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                // Called once
                if (state === 2) {
                    return;
                }
                // State is "done" now
                state = 2;
                // Clear timeout if it exists
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;
                // Cache response headers
                responseHeadersString = headers || "";
                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;
                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;
                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                // If successful, handle type chaining
                if (isSuccess) {
                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }
                    // if no content
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";
                    } else if (status === 304) {
                        statusText = "notmodified";
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    // We extract error from statusText
                    // then normalize statusText and status for non-aborts
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]);
                } else {
                    deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]);
                }
                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]);
                }
                // Complete
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]);
                    // Handle the global AJAX counter
                    if (!--jQuery.active) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });
    jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            // shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };
    jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                // The elements to wrap the target around
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function() {
                var self = jQuery(this), contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });
    jQuery.expr.filters.hidden = function(elem) {
        // Support: Opera <= 12.12
        // Opera reports offsetWidths and offsetHeights less than zero on some elements
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !support.reliableHiddenOffsets() && (elem.style && elem.style.display || jQuery.css(elem, "display")) === "none";
    };
    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            // Serialize array item.
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);
                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }
    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            // If value is a function, invoke it and return its value
            value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }
        // If an array was passed in, assume that it is an array of form elements.
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            // Serialize the form elements
            jQuery.each(a, function() {
                add(this.name, this.value);
            });
        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                // Use .is(":disabled") so that fieldset[disabled] works
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    // Create the request object
    // (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ? // Support: IE6+
    function() {
        // XHR cannot access local files, always use ActiveX for that case
        // Support: IE7-8
        // oldIE XHR does not support non-RFC2616 methods (#13240)
        // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
        // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
        // Although this check for six methods instead of eight
        // since IE also does not support "trace" and "connect"
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } : // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR;
    var xhrId = 0, xhrCallbacks = {}, xhrSupported = jQuery.ajaxSettings.xhr();
    // Support: IE<10
    // Open requests must be manually aborted on unload (#5280)
    // See https://support.microsoft.com/kb/2856746 for more info
    if (window.attachEvent) {
        window.attachEvent("onunload", function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true);
            }
        });
    }
    // Determine support properties
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    xhrSupported = support.ajax = !!xhrSupported;
    // Create transport if the browser can provide an xhr
    if (xhrSupported) {
        jQuery.ajaxTransport(function(options) {
            // Cross domain only allowed if supported through XMLHttpRequest
            if (!options.crossDomain || support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var i, xhr = options.xhr(), id = ++xhrId;
                        // Open the socket
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        // Apply custom fields if provided
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }
                        // Override mime type if needed
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }
                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        // Set headers
                        for (i in headers) {
                            // Support: IE<9
                            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                            // request header to a null-value.
                            //
                            // To keep consistent with other XHR implementations, cast the value
                            // to string and ignore `undefined`.
                            if (headers[i] !== undefined) {
                                xhr.setRequestHeader(i, headers[i] + "");
                            }
                        }
                        // Do send the request
                        // This may raise an exception which is actually
                        // handled in jQuery.ajax (so no try/catch here)
                        xhr.send(options.hasContent && options.data || null);
                        // Listener
                        callback = function(_, isAbort) {
                            var status, statusText, responses;
                            // Was never called and is aborted or complete
                            if (callback && (isAbort || xhr.readyState === 4)) {
                                // Clean up
                                delete xhrCallbacks[id];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;
                                // Abort manually if needed
                                if (isAbort) {
                                    if (xhr.readyState !== 4) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;
                                    // Support: IE<10
                                    // Accessing binary-data responseText throws an exception
                                    // (#11426)
                                    if (typeof xhr.responseText === "string") {
                                        responses.text = xhr.responseText;
                                    }
                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    try {
                                        statusText = xhr.statusText;
                                    } catch (e) {
                                        // We normalize with Webkit giving an empty statusText
                                        statusText = "";
                                    }
                                    // Filter status for non standard behaviors
                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    if (!status && options.isLocal && !options.crossDomain) {
                                        status = responses.text ? 200 : 404;
                                    } else if (status === 1223) {
                                        status = 204;
                                    }
                                }
                            }
                            // Call complete if needed
                            if (responses) {
                                complete(status, statusText, responses, xhr.getAllResponseHeaders());
                            }
                        };
                        if (!options.async) {
                            // if we're in sync mode we fire the callback
                            callback();
                        } else if (xhr.readyState === 4) {
                            // (IE6 & IE7) if it's in cache and has been
                            // retrieved directly we need to fire the callback
                            setTimeout(callback);
                        } else {
                            // Add to the list of active xhr callbacks
                            xhr.onreadystatechange = xhrCallbacks[id] = callback;
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback(undefined, true);
                        }
                    }
                };
            }
        });
    }
    // Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    // Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    // Handle cache's special case and global
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });
    // Bind script tag hack transport
    jQuery.ajaxTransport("script", function(s) {
        // This transport only deals with cross domain requests
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script");
                    script.async = true;
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }
                    script.src = s.url;
                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;
                            // Remove the script
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }
                            // Dereference the script
                            script = null;
                            // Callback if not abort
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };
                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    if (script) {
                        script.onload(undefined, true);
                    }
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            this[callback] = true;
            return callback;
        }
    });
    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };
            // force json dataType
            s.dataTypes[0] = "json";
            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };
            // Clean-up function (fires after converters)
            jqXHR.always(function() {
                // Restore preexisting value
                window[callbackName] = overwritten;
                // Save back as free
                if (s[callbackName]) {
                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    // save the callback name for future use
                    oldCallbacks.push(callbackName);
                }
                // Call if it was a function and we have a response
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            // Delegate to script
            return "script";
        }
    });
    // data: string of html
    // context (optional): If specified, the fragment will be created in this context, defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        // Single tag
        if (parsed) {
            return [ context.createElement(parsed[1]) ];
        }
        parsed = jQuery.buildFragment([ data ], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
    };
    // Keep a copy of the old load method
    var _load = jQuery.fn.load;
    /**
 * Load a url into a page
 */
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }
        var selector, response, type, self = this, off = url.indexOf(" ");
        if (off >= 0) {
            selector = jQuery.trim(url.slice(off, url.length));
            url = url.slice(0, off);
        }
        // If it's a function
        if (jQuery.isFunction(params)) {
            // We assume that it's the callback
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") {
            type = "POST";
        }
        // If we have elements to modify, make the request
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                // if "type" variable is undefined, then "GET" method will be used
                type: type,
                dataType: "html",
                data: params
            }).done(function(responseText) {
                // Save response for use in complete callback
                response = arguments;
                self.html(selector ? // If a selector was specified, locate the right elements in a dummy div
                // Exclude scripts to avoid IE 'Permission Denied' errors
                jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : // Otherwise use the full result
                responseText);
            }).complete(callback && function(jqXHR, status) {
                self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
            });
        }
        return this;
    };
    // Attach a bunch of functions for handling common AJAX events
    jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    });
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    /**
 * Gets a window from an element
 */
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            // set position first, in-case top/left are set even on static elem
            if (position === "static") {
                elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1;
            // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
                props.left = options.left - curOffset.left + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            var docElem, win, box = {
                top: 0,
                left: 0
            }, elem = this[0], doc = elem && elem.ownerDocument;
            if (!doc) {
                return;
            }
            docElem = doc.documentElement;
            // Make sure it's not a disconnected DOM node
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }
            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            if (typeof elem.getBoundingClientRect !== strundefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            };
        },
        position: function() {
            if (!this[0]) {
                return;
            }
            var offsetParent, offset, parentOffset = {
                top: 0,
                left: 0
            }, elem = this[0];
            // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
            if (jQuery.css(elem, "position") === "fixed") {
                // we assume that getBoundingClientRect is available when computed position is fixed
                offset = elem.getBoundingClientRect();
            } else {
                // Get *real* offsetParent
                offsetParent = this.offsetParent();
                // Get correct offsets
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }
                // Add offsetParent borders
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }
            // Subtract parent offsets and element margins
            // note: when an element has margin: auto the offsetLeft and marginLeft
            // are the same in Safari causing offset.left to incorrectly be 0
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;
                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElem;
            });
        }
    });
    // Create scrollLeft and scrollTop methods
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });
    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // getComputedStyle returns percent when specified for top/left/bottom/right
    // rather than make the css module depend on the offset module, we just check for it here
    jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                // if curCSS returns percentage, fallback to offset
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            }
        });
    });
    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            // margin is only for outerHeight, outerWidth
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                        // isn't a whole lot we can do. See pull request at this URL for discussion:
                        // https://github.com/jquery/jquery/pull/764
                        return elem.document.documentElement["client" + name];
                    }
                    // Get document width or height
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                        // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    // Get width or height on the element, requesting but not forcing parseFloat
                    // Set width or height on the element
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    // The number of elements contained in the matched element set
    jQuery.fn.size = function() {
        return this.length;
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.
    // Note that for maximum portability, libraries that are not jQuery should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. jQuery is a special case. For more information, see
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }
    var // Map over jQuery in case of overwrite
    _jQuery = window.jQuery, // Map over the $ in case of overwrite
    _$ = window.$;
    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    // Expose jQuery and $ identifiers, even in
    // AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (#13566)
    if (typeof noGlobal === strundefined) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
});

/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) if (void 0 !== a.style[c]) return {
            end: b[c]
        };
        return !1;
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1, d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0;
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end);
        };
        return setTimeout(e, b), this;
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var c = a(this), e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
        });
    }
    var c = '[data-dismiss="alert"]', d = function(b) {
        a(b).on("click", c, this.close);
    };
    d.VERSION = "3.2.0", d.prototype.close = function(b) {
        function c() {
            f.detach().trigger("closed.bs.alert").remove();
        }
        var d = a(this), e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), 
        f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), 
        a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150) : c());
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this;
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
        });
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), d[e](null == f[b] ? this.options[b] : f[b]), 
        setTimeout(a.proxy(function() {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, 
            d.removeClass(c).removeAttr(c));
        }, this), 0);
    }, c.prototype.toggle = function() {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), 
            a && c.prop("checked", !this.$element.hasClass("active")).trigger("change");
        }
        a && this.$element.toggleClass("active");
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this;
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault();
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b), g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
        });
    }
    var c = function(b, c) {
        this.$element = a(b).on("keydown.bs.carousel", a.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, 
        "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, c.prototype.keydown = function(a) {
        switch (a.which) {
          case 37:
            this.prev();
            break;

          case 39:
            this.next();
            break;

          default:
            return;
        }
        a.preventDefault();
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), 
        this;
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
    }, c.prototype.to = function(b) {
        var c = this, d = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            c.to(b);
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]));
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next");
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev");
    }, c.prototype.slide = function(b, c) {
        var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]();
        }
        if (e.hasClass("active")) return this.sliding = !1;
        var j = e[0], k = a.Event("slide.bs.carousel", {
            relatedTarget: j,
            direction: g
        });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, f && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(e)]);
                l && l.addClass("active");
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: g
            });
            return a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), 
            e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one("bsTransitionEnd", function() {
                e.removeClass([ b, g ].join(" ")).addClass("active"), d.removeClass([ "active", g ].join(" ")), 
                i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m);
                }, 0);
            }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), 
            e.addClass("active"), this.sliding = !1, this.$element.trigger(m)), f && this.cycle(), 
            this;
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this;
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(c) {
        var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
        }
    }), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
            !e && f.toggle && "show" == b && (b = !b), e || d.data("bs.collapse", e = new c(this, f)), 
            "string" == typeof b && e[b]();
        });
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.transitioning = null, 
        this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle();
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        toggle: !0
    }, c.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
    }, c.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var c = a.Event("show.bs.collapse");
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                var d = this.$parent && this.$parent.find("> .panel > .in");
                if (d && d.length) {
                    var e = d.data("bs.collapse");
                    if (e && e.transitioning) return;
                    b.call(d, "hide"), e || d.data("bs.collapse", null);
                }
                var f = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1;
                var g = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, 
                    this.$element.trigger("shown.bs.collapse");
                };
                if (!a.support.transition) return g.call(this);
                var h = a.camelCase([ "scroll", f ].join("-"));
                this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h]);
            }
        }
    }, c.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), 
                this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this);
            }
        }
    }, c.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };
    var d = a.fn.collapse;
    a.fn.collapse = b, a.fn.collapse.Constructor = c, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = d, this;
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(c) {
        var d, e = a(this), f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""), g = a(f), h = g.data("bs.collapse"), i = h ? "toggle" : e.data(), j = e.attr("data-parent"), k = j && a(j);
        h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), 
        e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), b.call(g, i);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = c(a(this)), e = {
                relatedTarget: this
            };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e));
        }));
    }
    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent();
    }
    function d(b) {
        return this.each(function() {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
        });
    }
    var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function(b) {
        a(b).on("click.bs.dropdown", this.toggle);
    };
    g.VERSION = "3.2.0", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e), g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus"), f.toggleClass("open").trigger("shown.bs.dropdown", h);
            }
            return !1;
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d), g = e.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && e.find(f).trigger("focus"), 
                d.trigger("click");
                var h = " li:not(.divider):visible a", i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), 
                    i.eq(j).trigger("focus");
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this;
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation();
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]', g.prototype.keydown);
}(jQuery), +function(a) {
    "use strict";
    function b(b, d) {
        return this.each(function() {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
        });
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, 
        this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a);
    }, c.prototype.show = function(b) {
        var c = this, d = a.Event("show.bs.modal", {
            relatedTarget: b
        });
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), 
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), 
        this.backdrop(function() {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(c.$body), c.$element.show().scrollTop(0), 
            d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), 
            c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                c.$element.trigger("focus").trigger(e);
            }).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e);
        }));
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), 
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), 
        this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), 
        a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal());
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
        }, this));
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$element.trigger("hidden.bs.modal");
        });
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, c.prototype.backdrop = function(b) {
        var c = this, d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            if (this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
            }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            e ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var f = function() {
                c.removeBackdrop(), b && b();
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f();
        } else b && b();
    }, c.prototype.checkScrollbar = function() {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar());
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth);
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "");
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b;
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this;
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), g = f.data("bs.modal") ? "toggle" : a.extend({
            remote: !/#/.test(e) && e
        }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus");
            });
        }), b.call(f, g, this);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
        });
    }
    var c = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
        this.init("tooltip", a, b);
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), 
        this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), 
                this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS;
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b;
    }, c.prototype.getDelegateOptions = function() {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d);
        }), b;
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", 
        c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show();
        }, c.options.delay.show)) : c.show();
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", 
        c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide();
        }, c.options.delay.hide)) : c.hide();
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var c = a.contains(document.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !c) return;
            var d = this, e = this.tip(), f = this.getUID(this.type);
            this.setContent(), e.attr("id", f), this.$element.attr("aria-describedby", f), this.options.animation && e.addClass("fade");
            var g = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, h = /\s?auto?\s?/i, i = h.test(g);
            i && (g = g.replace(h, "") || "top"), e.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(g).data("bs." + this.type, this), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element);
            var j = this.getPosition(), k = e[0].offsetWidth, l = e[0].offsetHeight;
            if (i) {
                var m = g, n = this.$element.parent(), o = this.getPosition(n);
                g = "bottom" == g && j.top + j.height + l - o.scroll > o.height ? "top" : "top" == g && j.top - o.scroll - l < 0 ? "bottom" : "right" == g && j.right + k > o.width ? "left" : "left" == g && j.left - k < o.left ? "right" : g, 
                e.removeClass(m).addClass(g);
            }
            var p = this.getCalculatedOffset(g, j, k, l);
            this.applyPlacement(p, g);
            var q = function() {
                d.$element.trigger("shown.bs." + d.type), d.hoverState = null;
            };
            a.support.transition && this.$tip.hasClass("fade") ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150) : q();
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, 
        a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                });
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j, m = k.left ? "left" : "top", n = k.left ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(l, d[0][n], m);
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "");
    }, c.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
    }, c.prototype.hide = function() {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type);
        }
        var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type);
        return this.$element.removeAttr("aria-describedby"), this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), 
        a.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(), 
        this.hoverState = null, this);
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
    }, c.prototype.hasContent = function() {
        return this.getTitle();
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0], d = "BODY" == c.tagName;
        return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : null, {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(),
            width: d ? a(window).width() : b.outerWidth(),
            height: d ? a(window).height() : b.outerHeight()
        }, d ? {
            top: 0,
            left: 0
        } : b.offset());
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        };
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
            var j = b.left - f, k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k);
        }
        return e;
    }, c.prototype.getTitle = function() {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a;
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template);
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, c.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
    }, c.prototype.enable = function() {
        this.enabled = !0;
    }, c.prototype.disable = function() {
        this.enabled = !1;
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
    }, c.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type);
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this;
    };
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
        });
    }
    var c = function(a, b) {
        this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.2.0", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, 
    c.prototype.getDefaults = function() {
        return c.DEFAULTS;
    }, c.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), 
        a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, c.prototype.getContent = function() {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    }, c.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this;
    };
}(jQuery), +function(a) {
    "use strict";
    function b(c, d) {
        var e = a.proxy(this.process, this);
        this.$body = a("body"), this.$scrollElement = a(a(c).is("body") ? window : c), this.options = a.extend({}, b.DEFAULTS, d), 
        this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], 
        this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e), 
        this.refresh(), this.process();
    }
    function c(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }
    b.VERSION = "3.2.0", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, b.prototype.refresh = function() {
        var b = "offset", c = 0;
        a.isWindow(this.$scrollElement[0]) || (b = "position", c = this.$scrollElement.scrollTop()), 
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var d = this;
        this.$body.find(this.selector).map(function() {
            var d = a(this), e = d.data("target") || d.attr("href"), f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [ [ f[b]().top + c, e ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            d.offsets.push(this[0]), d.targets.push(this[1]);
        });
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--; ) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a]);
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), 
        d.trigger("activate.bs.scrollspy");
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this;
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
        });
    }
    var c = function(b) {
        this.element = a(b);
    };
    c.VERSION = "3.2.0", c.prototype.show = function() {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", {
                relatedTarget: e
            });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.closest("li"), c), this.activate(g, g.parent(), function() {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    });
                });
            }
        }
    }, c.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
            b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), 
            b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d();
        }
        var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
        g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), f.removeClass("in");
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this;
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(c) {
        c.preventDefault(), b.call(a(this), "show");
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
        });
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = a(b), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition();
    };
    c.VERSION = "3.2.0", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(), b = this.$element.offset();
        return this.pinnedOffset = b.top - a;
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1);
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = a(document).height(), d = this.$target.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom;
            "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), 
            "function" == typeof h && (h = f.bottom(this.$element));
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= b - h ? "bottom" : null != g && g >= d ? "top" : !1;
            if (this.affixed !== i) {
                null != this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""), k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, 
                this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), 
                "bottom" == i && this.$element.offset({
                    top: b - this.$element.height() - h
                }));
            }
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this;
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this), d = c.data();
            d.offset = d.offset || {}, d.offsetBottom && (d.offset.bottom = d.offsetBottom), 
            d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
        });
    });
}(jQuery);

/* ============================================================
 * bootstrapSwitch v1.3 by Larentis Mattia @spiritualGuru
 * http://www.larentis.eu/switch/
 * ============================================================
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * ============================================================ */
!function($) {
    "use strict";
    $.fn["bootstrapSwitch"] = function(method) {
        var methods = {
            init: function() {
                return this.each(function() {
                    var $element = $(this), $div, $switchLeft, $switchRight, $label, myClasses = "", classes = $element.attr("class"), color, moving, onLabel = "VRAI", offLabel = "FAUX", icon = false;
                    $.each([ "switch-mini", "switch-small", "switch-large" ], function(i, el) {
                        if (classes.indexOf(el) >= 0) myClasses = el;
                    });
                    $element.addClass("has-switch");
                    if ($element.data("on") !== undefined) color = "switch-" + $element.data("on");
                    if ($element.data("on-label") !== undefined) onLabel = $element.data("on-label");
                    if ($element.data("off-label") !== undefined) offLabel = $element.data("off-label");
                    if ($element.data("icon") !== undefined) icon = $element.data("icon");
                    $switchLeft = $("<span>").addClass("switch-left").addClass(myClasses).addClass(color).html(onLabel);
                    color = "";
                    if ($element.data("off") !== undefined) color = "switch-" + $element.data("off");
                    $switchRight = $("<span>").addClass("switch-right").addClass(myClasses).addClass(color).html(offLabel);
                    $label = $("<label>").html("&nbsp;").addClass(myClasses).attr("for", $element.find("input").attr("id"));
                    if (icon) {
                        $label.html('<i class="' + icon + '"></i>');
                    }
                    $div = $element.find(":checkbox").wrap($("<div>")).parent().data("animated", false);
                    if ($element.data("animated") !== false) $div.addClass("switch-animate").data("animated", true);
                    $div.append($switchLeft).append($label).append($switchRight);
                    $element.find(">div").addClass($element.find("input").is(":checked") ? "switch-on" : "switch-off");
                    if ($element.find("input").is(":disabled")) $(this).addClass("deactivate");
                    var changeStatus = function($this) {
                        $this.siblings("label").trigger("mousedown").trigger("mouseup").trigger("click");
                    };
                    $element.on("keydown", function(e) {
                        if (e.keyCode === 32) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            changeStatus($(e.target).find("span:first"));
                        }
                    });
                    $switchLeft.on("click", function(e) {
                        changeStatus($(this));
                    });
                    $switchRight.on("click", function(e) {
                        changeStatus($(this));
                    });
                    $element.find("input").on("change", function(e) {
                        var $this = $(this), $element = $this.parent(), thisState = $this.is(":checked"), state = $element.is(".switch-off");
                        e.preventDefault();
                        $element.css("left", "");
                        if (state === thisState) {
                            if (thisState) $element.removeClass("switch-off").addClass("switch-on"); else $element.removeClass("switch-on").addClass("switch-off");
                            if ($element.data("animated") !== false) $element.addClass("switch-animate");
                            $element.parent().trigger("switch-change", {
                                el: $this,
                                value: thisState
                            });
                        }
                    });
                    $element.find("label").on("mousedown touchstart", function(e) {
                        var $this = $(this);
                        moving = false;
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        $this.closest("div").removeClass("switch-animate");
                        if ($this.closest(".has-switch").is(".deactivate")) $this.unbind("click"); else {
                            $this.on("mousemove touchmove", function(e) {
                                var $element = $(this).closest(".switch"), relativeX = (e.pageX || e.originalEvent.targetTouches[0].pageX) - $element.offset().left, percent = relativeX / $element.width() * 100, left = 25, right = 75;
                                moving = true;
                                if (percent < left) percent = left; else if (percent > right) percent = right;
                                $element.find(">div").css("left", percent - right + "%");
                            });
                            $this.on("click touchend", function(e) {
                                var $this = $(this), $target = $(e.target), $myCheckBox = $target.siblings("input");
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                $this.unbind("mouseleave");
                                if (moving) $myCheckBox.prop("checked", !(parseInt($this.parent().css("left")) < -25)); else $myCheckBox.prop("checked", !$myCheckBox.is(":checked"));
                                moving = false;
                                $myCheckBox.trigger("change");
                            });
                            $this.on("mouseleave", function(e) {
                                var $this = $(this), $myCheckBox = $this.siblings("input");
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                $this.unbind("mouseleave");
                                $this.trigger("mouseup");
                                $myCheckBox.prop("checked", !(parseInt($this.parent().css("left")) < -25)).trigger("change");
                            });
                            $this.on("mouseup", function(e) {
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                $(this).unbind("mousemove");
                            });
                        }
                    });
                });
            },
            toggleActivation: function() {
                $(this).toggleClass("deactivate");
            },
            isActive: function() {
                return !$(this).hasClass("deactivate");
            },
            setActive: function(active) {
                if (active) $(this).removeClass("deactivate"); else $(this).addClass("deactivate");
            },
            toggleState: function(skipOnChange) {
                var $input = $(this).find("input:checkbox");
                $input.prop("checked", !$input.is(":checked")).trigger("change", skipOnChange);
            },
            setState: function(value, skipOnChange) {
                $(this).find("input:checkbox").prop("checked", value).trigger("change", skipOnChange);
            },
            status: function() {
                return $(this).find("input:checkbox").is(":checked");
            },
            destroy: function() {
                var $div = $(this).find("div"), $checkbox;
                $div.find(":not(input:checkbox)").remove();
                $checkbox = $div.children();
                $checkbox.unwrap().unwrap();
                $checkbox.unbind("change");
                return $checkbox;
            }
        };
        if (methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); else if (typeof method === "object" || !method) return methods.init.apply(this, arguments); else $.error("Method " + method + " does not exist!");
    };
}(jQuery);

$(function() {
    $(".switch")["bootstrapSwitch"]();
});

/*! Backstretch - v2.0.3 - 2012-11-30
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2012 Scott Robbin; Licensed MIT */
(function(e, t, n) {
    "use strict";
    e.fn.backstretch = function(r, s) {
        return (r === n || r.length === 0) && e.error("No images were supplied for Backstretch"), 
        e(t).scrollTop() === 0 && t.scrollTo(0, 0), this.each(function() {
            var t = e(this), n = t.data("backstretch");
            n && (s = e.extend(n.options, s), n.destroy(!0)), n = new i(this, r, s), t.data("backstretch", n);
        });
    }, e.backstretch = function(t, n) {
        return e("body").backstretch(t, n).data("backstretch");
    }, e.expr[":"].backstretch = function(t) {
        return e(t).data("backstretch") !== n;
    }, e.fn.backstretch.defaults = {
        centeredX: !0,
        centeredY: !0,
        duration: 5e3,
        fade: 0
    };
    var r = {
        wrap: {
            left: 0,
            top: 0,
            overflow: "hidden",
            margin: 0,
            padding: 0,
            height: "100%",
            width: "100%",
            zIndex: -999999
        },
        img: {
            position: "absolute",
            display: "none",
            margin: 0,
            padding: 0,
            border: "none",
            width: "auto",
            height: "auto",
            maxWidth: "none",
            zIndex: -999999
        }
    }, i = function(n, i, o) {
        this.options = e.extend({}, e.fn.backstretch.defaults, o || {}), this.images = e.isArray(i) ? i : [ i ], 
        e.each(this.images, function() {
            e("<img />")[0].src = this;
        }), this.isBody = n === document.body, this.$container = e(n), this.$wrap = e('<div class="backstretch"></div>').css(r.wrap).appendTo(this.$container), 
        this.$root = this.isBody ? s ? e(t) : e(document) : this.$container;
        if (!this.isBody) {
            var u = this.$container.css("position"), a = this.$container.css("zIndex");
            this.$container.css({
                position: u === "static" ? "relative" : u,
                zIndex: a === "auto" ? 0 : a,
                background: "none"
            }), this.$wrap.css({
                zIndex: -999998
            });
        }
        this.$wrap.css({
            position: this.isBody && s ? "fixed" : "absolute"
        }), this.index = 0, this.show(this.index), e(t).on("resize.backstretch", e.proxy(this.resize, this)).on("orientationchange.backstretch", e.proxy(function() {
            this.isBody && t.pageYOffset === 0 && (t.scrollTo(0, 1), this.resize());
        }, this));
    };
    i.prototype = {
        resize: function() {
            try {
                var e = {
                    left: 0,
                    top: 0
                }, n = this.isBody ? this.$root.width() : this.$root.innerWidth(), r = n, i = this.isBody ? t.innerHeight ? t.innerHeight : this.$root.height() : this.$root.innerHeight(), s = r / this.$img.data("ratio"), o;
                s >= i ? (o = (s - i) / 2, this.options.centeredY && (e.top = "-" + o + "px")) : (s = i, 
                r = s * this.$img.data("ratio"), o = (r - n) / 2, this.options.centeredX && (e.left = "-" + o + "px")), 
                this.$wrap.css({
                    width: n,
                    height: i
                }).find("img:not(.deleteable)").css({
                    width: r,
                    height: s
                }).css(e);
            } catch (u) {}
            return this;
        },
        show: function(t) {
            if (Math.abs(t) > this.images.length - 1) return;
            this.index = t;
            var n = this, i = n.$wrap.find("img").addClass("deleteable"), s = e.Event("backstretch.show", {
                relatedTarget: n.$container[0]
            });
            return clearInterval(n.interval), n.$img = e("<img />").css(r.img).bind("load", function(t) {
                var r = this.width || e(t.target).width(), o = this.height || e(t.target).height();
                e(this).data("ratio", r / o), e(this).fadeIn(n.options.speed || n.options.fade, function() {
                    i.remove(), n.paused || n.cycle(), n.$container.trigger(s, n);
                }), n.resize();
            }).appendTo(n.$wrap), n.$img.attr("src", n.images[t]), n;
        },
        next: function() {
            return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0);
        },
        prev: function() {
            return this.show(this.index === 0 ? this.images.length - 1 : this.index - 1);
        },
        pause: function() {
            return this.paused = !0, this;
        },
        resume: function() {
            return this.paused = !1, this.next(), this;
        },
        cycle: function() {
            return this.images.length > 1 && (clearInterval(this.interval), this.interval = setInterval(e.proxy(function() {
                this.paused || this.next();
            }, this), this.options.duration)), this;
        },
        destroy: function(n) {
            e(t).off("resize.backstretch orientationchange.backstretch"), clearInterval(this.interval), 
            n || this.$wrap.remove(), this.$container.removeData("backstretch");
        }
    };
    var s = function() {
        var e = navigator.userAgent, n = navigator.platform, r = e.match(/AppleWebKit\/([0-9]+)/), i = !!r && r[1], s = e.match(/Fennec\/([0-9]+)/), o = !!s && s[1], u = e.match(/Opera Mobi\/([0-9]+)/), a = !!u && u[1], f = e.match(/MSIE ([0-9]+)/), l = !!f && f[1];
        return !((n.indexOf("iPhone") > -1 || n.indexOf("iPad") > -1 || n.indexOf("iPod") > -1) && i && i < 534 || t.operamini && {}.toString.call(t.operamini) === "[object OperaMini]" || u && a < 7458 || e.indexOf("Android") > -1 && i && i < 533 || o && o < 6 || "palmGetResource" in t && i && i < 534 || e.indexOf("MeeGo") > -1 && e.indexOf("NokiaBrowser/8.5.0") > -1 || l && l <= 6);
    }();
})(jQuery, window);

/* ---------------------------------- */
/* CheckForm */
(function($) {
    var CheckForm = function() {
        function CheckForm(cntx) {
            var self = this, $form = $(cntx);
            this.form = $form;
            $form.submit(function(e) {
                console.log("test0");
                var returnValue = self.check(this);
                var isValidCallBack = true;
                if ($(this).data("check")) {
                    console.log("test1");
                    isValidCallBack = $(this).data("check")();
                }
                if (!(returnValue["isValid"] && isValidCallBack)) {
                    console.log("not valid");
                    $(document).trigger("FORM_ERROR", [ {
                        form: $form,
                        ajax: $(this).data("submit") == "ajax" ? true : false,
                        status: returnValue["statusError"]
                    } ]);
                }
                if (returnValue["isValid"] && isValidCallBack) {
                    console.log("isValid");
                    $(document).trigger("FORM_VALID", [ {
                        form: $form,
                        ajax: $(this).data("submit") == "ajax" ? true : false
                    } ]);
                    return false;
                }
                console.log("test2");
                return returnValue["isValid"] && isValidCallBack;
            });
        }
        CheckForm.prototype = {
            check: function(formElmt) {
                var self = this, returnValue = [], $form = $(formElmt);
                returnValue["isValid"] = true, returnValue["statusError"] = undefined;
                $form.find(".form-item, label, input, select, textarea").removeClass("error");
                $form.find(".required:visible").each(function() {
                    if (!$(this).is("label") && !$(this).is("input[type=checkbox]")) {
                        if ($(this).val() == "" || $(this).val() == $(this).attr("placeholder")) {
                            returnValue["isValid"] = false;
                            returnValue["statusError"] = "empty";
                            self.applyError(this);
                        }
                    }
                });
                $form.find("input[type=checkbox].required:visible").each(function() {
                    if (!$(this).is(":checked")) {
                        returnValue["isValid"] = false;
                        returnValue["statusError"] = "empty";
                        self.applyError(this);
                    }
                });
                $form.find("input[data-type=confirm]:visible").each(function() {
                    if ($(this).val() != $($(this).data("ref")).val()) {
                        returnValue["isValid"] = false;
                        returnValue["statusError"] = "invalid";
                        self.applyError(this);
                    }
                });
                $form.find("input[data-type=email]:visible").each(function() {
                    if ($(this).val() != "" && $(this).val() != $(this).attr("placeholder")) {
                        if (!self.validEmail($(this).val())) {
                            returnValue["isValid"] = false;
                            returnValue["statusError"] = "invalid";
                            self.applyError(this);
                        }
                    }
                });
                $form.find("input[data-regexp]:visible").each(function() {
                    var value = $(this).val();
                    if (value != "" && value != $(this).attr("placeholder")) {
                        if (!self.validRegExp(value, $(this).data("regexp"))) {
                            returnValue["isValid"] = false;
                            returnValue["statusError"] = "invalid";
                            self.applyError(this);
                        }
                    }
                });
                return returnValue;
            },
            validRegExp: function(val, reg) {
                var regExp = new RegExp(reg);
                return val.match(regExp);
            },
            validEmail: function(email) {
                var mailExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                return email.match(mailExp);
            },
            applyError: function(elmt) {
                $(elmt).addClass("error").closest(".form-item").addClass("error");
                if ($(elmt).data("error")) {
                    App.log($(elmt).data("error"));
                    $($(elmt).data("error")).show();
                }
                $("label[for=" + $(elmt).attr("id") + "]").addClass("error");
            },
            ajaxSubmit: function(elmt, urlAjax, typeAjax, objAjax) {
                var $this = $(elmt), self = elmt;
                console.log("ajax", urlAjax);
                $.ajax({
                    url: urlAjax,
                    type: typeAjax,
                    data: objAjax.serialize(),
                    success: function(data, textStatus, XMLHttpRequest) {
                        if ($this.data("success")) {
                            $this.data("success").call(self, data);
                        }
                    }
                });
            }
        };
        return CheckForm;
    }();
    $.fn.checkForm = function() {
        var pluginName = "CheckForm";
        return this.each(function() {
            var $self = $(this);
            if ($self.data(pluginName)) return;
            var instance = new CheckForm(this);
            $self.data(pluginName, instance);
        });
    };
})(jQuery);

/*
 * DC jQuery Vertical Accordion Menu - jQuery vertical accordion menu plugin
 * Copyright (c) 2011 Design Chemical
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */
(function($) {
    $.fn.dcAccordion = function(options) {
        //set default options 
        var defaults = {
            classParent: "dcjq-parent",
            classActive: "active",
            classArrow: "dcjq-icon",
            classCount: "dcjq-count",
            classExpand: "dcjq-current-parent",
            eventType: "click",
            hoverDelay: 300,
            menuClose: true,
            autoClose: true,
            autoExpand: false,
            speed: "slow",
            saveState: true,
            disableLink: true,
            showCount: false
        };
        //call in the default otions
        var options = $.extend(defaults, options);
        this.each(function(options) {
            var obj = this;
            setUpAccordion();
            //			if(defaults.saveState == true){
            //				checkCookie(defaults.cookie, obj);
            //			}
            if (defaults.autoExpand == true) {
                $("li." + defaults.classExpand + " > a").addClass(defaults.classActive);
            }
            resetAccordion();
            if (defaults.eventType == "hover") {
                var config = {
                    sensitivity: 2,
                    // number = sensitivity threshold (must be 1 or higher)
                    interval: defaults.hoverDelay,
                    // number = milliseconds for onMouseOver polling interval
                    over: linkOver,
                    // function = onMouseOver callback (REQUIRED)
                    timeout: defaults.hoverDelay,
                    // number = milliseconds delay before onMouseOut
                    out: linkOut
                };
                $("li a", obj).hoverIntent(config);
                var configMenu = {
                    sensitivity: 2,
                    // number = sensitivity threshold (must be 1 or higher)
                    interval: 1e3,
                    // number = milliseconds for onMouseOver polling interval
                    over: menuOver,
                    // function = onMouseOver callback (REQUIRED)
                    timeout: 1e3,
                    // number = milliseconds delay before onMouseOut
                    out: menuOut
                };
                $(obj).hoverIntent(configMenu);
                // Disable parent links
                if (defaults.disableLink == true) {
                    $("li a", obj).click(function(e) {
                        if ($(this).siblings("ul").length > 0) {
                            e.preventDefault();
                        }
                    });
                }
            } else {
                $("li a", obj).click(function(e) {
                    $activeLi = $(this).parent("li");
                    $parentsLi = $activeLi.parents("li");
                    $parentsUl = $activeLi.parents("ul");
                    // Prevent browsing to link if has child links
                    if (defaults.disableLink == true) {
                        if ($(this).siblings("ul").length > 0) {
                            e.preventDefault();
                        }
                    }
                    // Auto close sibling menus
                    if (defaults.autoClose == true) {
                        autoCloseAccordion($parentsLi, $parentsUl);
                    }
                    if ($("> ul", $activeLi).is(":visible")) {
                        $("ul", $activeLi).slideUp(defaults.speed);
                        $("a", $activeLi).removeClass(defaults.classActive);
                    } else {
                        $(this).siblings("ul").slideToggle(defaults.speed);
                        $("> a", $activeLi).addClass(defaults.classActive);
                    }
                });
            }
            // Set up accordion
            function setUpAccordion() {
                $arrow = '<span class="' + defaults.classArrow + '"></span>';
                var classParentLi = defaults.classParent + "-li";
                $("> ul", obj).show();
                $("li", obj).each(function() {
                    if ($("> ul", this).length > 0) {
                        $(this).addClass(classParentLi);
                        $("> a", this).addClass(defaults.classParent).append($arrow);
                    }
                });
                $("> ul", obj).hide();
                if (defaults.showCount == true) {
                    $("li." + classParentLi, obj).each(function() {
                        if (defaults.disableLink == true) {
                            var getCount = parseInt($("ul a:not(." + defaults.classParent + ")", this).length);
                        } else {
                            var getCount = parseInt($("ul a", this).length);
                        }
                        $("> a", this).append(' <span class="' + defaults.classCount + '">' + getCount + "</span>");
                    });
                }
            }
            function linkOver() {
                $activeLi = $(this).parent("li");
                $parentsLi = $activeLi.parents("li");
                $parentsUl = $activeLi.parents("ul");
                // Auto close sibling menus
                if (defaults.autoClose == true) {
                    autoCloseAccordion($parentsLi, $parentsUl);
                }
                if ($("> ul", $activeLi).is(":visible")) {
                    $("ul", $activeLi).slideUp(defaults.speed);
                    $("a", $activeLi).removeClass(defaults.classActive);
                } else {
                    $(this).siblings("ul").slideToggle(defaults.speed);
                    $("> a", $activeLi).addClass(defaults.classActive);
                }
                // Write cookie if save state is on
                if (defaults.saveState == true) {
                    createCookie(defaults.cookie, obj);
                }
            }
            function linkOut() {}
            function menuOver() {}
            function menuOut() {
                if (defaults.menuClose == true) {
                    $("ul", obj).slideUp(defaults.speed);
                    // Reset active links
                    $("a", obj).removeClass(defaults.classActive);
                    createCookie(defaults.cookie, obj);
                }
            }
            // Auto-Close Open Menu Items
            function autoCloseAccordion($parentsLi, $parentsUl) {
                $("ul", obj).not($parentsUl).slideUp(defaults.speed);
                // Reset active links
                $("a", obj).removeClass(defaults.classActive);
                $("> a", $parentsLi).addClass(defaults.classActive);
            }
            // Reset accordion using active links
            function resetAccordion() {
                $("ul", obj).hide();
                $allActiveLi = $("a." + defaults.classActive, obj);
                $allActiveLi.siblings("ul").show();
            }
        });
    };
})(jQuery);

/* jquery.nicescroll 3.5.0 InuYaksa*2013 MIT http://areaaperta.com/nicescroll */ (function(e) {
    var z = !1, E = !1, L = 5e3, M = 2e3, y = 0, N = function() {
        var e = document.getElementsByTagName("script"), e = e[e.length - 1].src.split("?")[0];
        return 0 < e.split("/").length ? e.split("/").slice(0, -1).join("/") + "/" : "";
    }(), H = [ "ms", "moz", "webkit", "o" ], v = window.requestAnimationFrame || !1, w = window.cancelAnimationFrame || !1;
    if (!v) for (var O in H) {
        var F = H[O];
        v || (v = window[F + "RequestAnimationFrame"]);
        w || (w = window[F + "CancelAnimationFrame"] || window[F + "CancelRequestAnimationFrame"]);
    }
    var A = window.MutationObserver || window.WebKitMutationObserver || !1, I = {
        zindex: "auto",
        cursoropacitymin: 0,
        cursoropacitymax: 1,
        cursorcolor: "#424242",
        cursorwidth: "5px",
        cursorborder: "1px solid #fff",
        cursorborderradius: "5px",
        scrollspeed: 60,
        mousescrollstep: 24,
        touchbehavior: !1,
        hwacceleration: !0,
        usetransition: !0,
        boxzoom: !1,
        dblclickzoom: !0,
        gesturezoom: !0,
        grabcursorenabled: !0,
        autohidemode: !0,
        background: "",
        iframeautoresize: !0,
        cursorminheight: 32,
        preservenativescrolling: !0,
        railoffset: !1,
        bouncescroll: !0,
        spacebarenabled: !0,
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        disableoutline: !0,
        horizrailenabled: !0,
        railalign: "right",
        railvalign: "bottom",
        enabletranslate3d: !0,
        enablemousewheel: !0,
        enablekeyboard: !0,
        smoothscroll: !0,
        sensitiverail: !0,
        enablemouselockapi: !0,
        cursorfixedheight: !1,
        directionlockdeadzone: 6,
        hidecursordelay: 400,
        nativeparentscrolling: !0,
        enablescrollonselection: !0,
        overflowx: !0,
        overflowy: !0,
        cursordragspeed: .3,
        rtlmode: !1,
        cursordragontouch: !1,
        oneaxismousemode: "auto"
    }, G = !1, P = function() {
        if (G) return G;
        var e = document.createElement("DIV"), c = {
            haspointerlock: "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document
        };
        c.isopera = "opera" in window;
        c.isopera12 = c.isopera && "getUserMedia" in navigator;
        c.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini);
        c.isie = "all" in document && "attachEvent" in e && !c.isopera;
        c.isieold = c.isie && !("msInterpolationMode" in e.style);
        c.isie7 = c.isie && !c.isieold && (!("documentMode" in document) || 7 == document.documentMode);
        c.isie8 = c.isie && "documentMode" in document && 8 == document.documentMode;
        c.isie9 = c.isie && "performance" in window && 9 <= document.documentMode;
        c.isie10 = c.isie && "performance" in window && 10 <= document.documentMode;
        c.isie9mobile = /iemobile.9/i.test(navigator.userAgent);
        c.isie9mobile && (c.isie9 = !1);
        c.isie7mobile = !c.isie9mobile && c.isie7 && /iemobile/i.test(navigator.userAgent);
        c.ismozilla = "MozAppearance" in e.style;
        c.iswebkit = "WebkitAppearance" in e.style;
        c.ischrome = "chrome" in window;
        c.ischrome22 = c.ischrome && c.haspointerlock;
        c.ischrome26 = c.ischrome && "transition" in e.style;
        c.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window;
        c.hasmstouch = window.navigator.msPointerEnabled || !1;
        c.ismac = /^mac$/i.test(navigator.platform);
        c.isios = c.cantouch && /iphone|ipad|ipod/i.test(navigator.platform);
        c.isios4 = c.isios && !("seal" in Object);
        c.isandroid = /android/i.test(navigator.userAgent);
        c.trstyle = !1;
        c.hastransform = !1;
        c.hastranslate3d = !1;
        c.transitionstyle = !1;
        c.hastransition = !1;
        c.transitionend = !1;
        for (var k = [ "transform", "msTransform", "webkitTransform", "MozTransform", "OTransform" ], l = 0; l < k.length; l++) if ("undefined" != typeof e.style[k[l]]) {
            c.trstyle = k[l];
            break;
        }
        c.hastransform = !1 != c.trstyle;
        c.hastransform && (e.style[c.trstyle] = "translate3d(1px,2px,3px)", c.hastranslate3d = /translate3d/.test(e.style[c.trstyle]));
        c.transitionstyle = !1;
        c.prefixstyle = "";
        c.transitionend = !1;
        for (var k = "transition webkitTransition MozTransition OTransition OTransition msTransition KhtmlTransition".split(" "), q = " -webkit- -moz- -o- -o -ms- -khtml-".split(" "), t = "transitionend webkitTransitionEnd transitionend otransitionend oTransitionEnd msTransitionEnd KhtmlTransitionEnd".split(" "), l = 0; l < k.length; l++) if (k[l] in e.style) {
            c.transitionstyle = k[l];
            c.prefixstyle = q[l];
            c.transitionend = t[l];
            break;
        }
        c.ischrome26 && (c.prefixstyle = q[1]);
        c.hastransition = c.transitionstyle;
        a: {
            k = [ "-moz-grab", "-webkit-grab", "grab" ];
            if (c.ischrome && !c.ischrome22 || c.isie) k = [];
            for (l = 0; l < k.length; l++) if (q = k[l], e.style.cursor = q, e.style.cursor == q) {
                k = q;
                break a;
            }
            k = "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize";
        }
        c.cursorgrabvalue = k;
        c.hasmousecapture = "setCapture" in e;
        c.hasMutationObserver = !1 !== A;
        return G = c;
    }, Q = function(h, c) {
        function k() {
            var d = b.win;
            if ("zIndex" in d) return d.zIndex();
            for (;0 < d.length && 9 != d[0].nodeType; ) {
                var c = d.css("zIndex");
                if (!isNaN(c) && 0 != c) return parseInt(c);
                d = d.parent();
            }
            return !1;
        }
        function l(d, c, f) {
            c = d.css(c);
            d = parseFloat(c);
            return isNaN(d) ? (d = u[c] || 0, f = 3 == d ? f ? b.win.outerHeight() - b.win.innerHeight() : b.win.outerWidth() - b.win.innerWidth() : 1, 
            b.isie8 && d && (d += 1), f ? d : 0) : d;
        }
        function q(d, c, f, g) {
            b._bind(d, c, function(b) {
                b = b ? b : window.event;
                var g = {
                    original: b,
                    target: b.target || b.srcElement,
                    type: "wheel",
                    deltaMode: "MozMousePixelScroll" == b.type ? 0 : 1,
                    deltaX: 0,
                    deltaZ: 0,
                    preventDefault: function() {
                        b.preventDefault ? b.preventDefault() : b.returnValue = !1;
                        return !1;
                    },
                    stopImmediatePropagation: function() {
                        b.stopImmediatePropagation ? b.stopImmediatePropagation() : b.cancelBubble = !0;
                    }
                };
                "mousewheel" == c ? (g.deltaY = -.025 * b.wheelDelta, b.wheelDeltaX && (g.deltaX = -.025 * b.wheelDeltaX)) : g.deltaY = b.detail;
                return f.call(d, g);
            }, g);
        }
        function t(d, c, f) {
            var g, e;
            0 == d.deltaMode ? (g = -Math.floor(d.deltaX * (b.opt.mousescrollstep / 54)), e = -Math.floor(d.deltaY * (b.opt.mousescrollstep / 54))) : 1 == d.deltaMode && (g = -Math.floor(d.deltaX * b.opt.mousescrollstep), 
            e = -Math.floor(d.deltaY * b.opt.mousescrollstep));
            c && (b.opt.oneaxismousemode && 0 == g && e) && (g = e, e = 0);
            g && (b.scrollmom && b.scrollmom.stop(), b.lastdeltax += g, b.debounced("mousewheelx", function() {
                var d = b.lastdeltax;
                b.lastdeltax = 0;
                b.rail.drag || b.doScrollLeftBy(d);
            }, 120));
            if (e) {
                if (b.opt.nativeparentscrolling && f && !b.ispage && !b.zoomactive) if (0 > e) {
                    if (b.getScrollTop() >= b.page.maxh) return !0;
                } else if (0 >= b.getScrollTop()) return !0;
                b.scrollmom && b.scrollmom.stop();
                b.lastdeltay += e;
                b.debounced("mousewheely", function() {
                    var d = b.lastdeltay;
                    b.lastdeltay = 0;
                    b.rail.drag || b.doScrollBy(d);
                }, 120);
            }
            d.stopImmediatePropagation();
            return d.preventDefault();
        }
        var b = this;
        this.version = "3.5.0";
        this.name = "nicescroll";
        this.me = c;
        this.opt = {
            doc: e("body"),
            win: !1
        };
        e.extend(this.opt, I);
        this.opt.snapbackspeed = 80;
        if (h) for (var p in b.opt) "undefined" != typeof h[p] && (b.opt[p] = h[p]);
        this.iddoc = (this.doc = b.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
        this.ispage = /BODY|HTML/.test(b.opt.win ? b.opt.win[0].nodeName : this.doc[0].nodeName);
        this.haswrapper = !1 !== b.opt.win;
        this.win = b.opt.win || (this.ispage ? e(window) : this.doc);
        this.docscroll = this.ispage && !this.haswrapper ? e(window) : this.win;
        this.body = e("body");
        this.iframe = this.isfixed = this.viewport = !1;
        this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
        this.istextarea = "TEXTAREA" == this.win[0].nodeName;
        this.forcescreen = !1;
        this.canshowonmouseevent = "scroll" != b.opt.autohidemode;
        this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;
        this.scroll = {
            x: 0,
            y: 0
        };
        this.scrollratio = {
            x: 0,
            y: 0
        };
        this.cursorheight = 20;
        this.scrollvaluemax = 0;
        this.observerremover = this.observer = this.scrollmom = this.scrollrunning = this.checkrtlmode = !1;
        do this.id = "ascrail" + M++; while (document.getElementById(this.id));
        this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1;
        this.visibility = !0;
        this.hidden = this.locked = !1;
        this.cursoractive = !0;
        this.overflowx = b.opt.overflowx;
        this.overflowy = b.opt.overflowy;
        this.nativescrollingarea = !1;
        this.checkarea = 0;
        this.events = [];
        this.saved = {};
        this.delaylist = {};
        this.synclist = {};
        this.lastdeltay = this.lastdeltax = 0;
        this.detected = P();
        var g = e.extend({}, this.detected);
        this.ishwscroll = (this.canhwscroll = g.hastransform && b.opt.hwacceleration) && b.haswrapper;
        this.istouchcapable = !1;
        g.cantouch && (g.ischrome && !g.isios && !g.isandroid) && (this.istouchcapable = !0, 
        g.cantouch = !1);
        g.cantouch && (g.ismozilla && !g.isios && !g.isandroid) && (this.istouchcapable = !0, 
        g.cantouch = !1);
        b.opt.enablemouselockapi || (g.hasmousecapture = !1, g.haspointerlock = !1);
        this.delayed = function(d, c, f, g) {
            var e = b.delaylist[d], k = new Date().getTime();
            if (!g && e && e.tt) return !1;
            e && e.tt && clearTimeout(e.tt);
            if (e && e.last + f > k && !e.tt) b.delaylist[d] = {
                last: k + f,
                tt: setTimeout(function() {
                    b.delaylist[d].tt = 0;
                    c.call();
                }, f)
            }; else if (!e || !e.tt) b.delaylist[d] = {
                last: k,
                tt: 0
            }, setTimeout(function() {
                c.call();
            }, 0);
        };
        this.debounced = function(d, c, f) {
            var g = b.delaylist[d];
            new Date().getTime();
            b.delaylist[d] = c;
            g || setTimeout(function() {
                var c = b.delaylist[d];
                b.delaylist[d] = !1;
                c.call();
            }, f);
        };
        this.synched = function(d, c) {
            b.synclist[d] = c;
            (function() {
                b.onsync || (v(function() {
                    b.onsync = !1;
                    for (d in b.synclist) {
                        var c = b.synclist[d];
                        c && c.call(b);
                        b.synclist[d] = !1;
                    }
                }), b.onsync = !0);
            })();
            return d;
        };
        this.unsynched = function(d) {
            b.synclist[d] && (b.synclist[d] = !1);
        };
        this.css = function(d, c) {
            for (var f in c) b.saved.css.push([ d, f, d.css(f) ]), d.css(f, c[f]);
        };
        this.scrollTop = function(d) {
            return "undefined" == typeof d ? b.getScrollTop() : b.setScrollTop(d);
        };
        this.scrollLeft = function(d) {
            return "undefined" == typeof d ? b.getScrollLeft() : b.setScrollLeft(d);
        };
        BezierClass = function(b, c, f, g, e, k, l) {
            this.st = b;
            this.ed = c;
            this.spd = f;
            this.p1 = g || 0;
            this.p2 = e || 1;
            this.p3 = k || 0;
            this.p4 = l || 1;
            this.ts = new Date().getTime();
            this.df = this.ed - this.st;
        };
        BezierClass.prototype = {
            B2: function(b) {
                return 3 * b * b * (1 - b);
            },
            B3: function(b) {
                return 3 * b * (1 - b) * (1 - b);
            },
            B4: function(b) {
                return (1 - b) * (1 - b) * (1 - b);
            },
            getNow: function() {
                var b = 1 - (new Date().getTime() - this.ts) / this.spd, c = this.B2(b) + this.B3(b) + this.B4(b);
                return 0 > b ? this.ed : this.st + Math.round(this.df * c);
            },
            update: function(b, c) {
                this.st = this.getNow();
                this.ed = b;
                this.spd = c;
                this.ts = new Date().getTime();
                this.df = this.ed - this.st;
                return this;
            }
        };
        if (this.ishwscroll) {
            this.doc.translate = {
                x: 0,
                y: 0,
                tx: "0px",
                ty: "0px"
            };
            g.hastranslate3d && g.isios && this.doc.css("-webkit-backface-visibility", "hidden");
            var s = function() {
                var d = b.doc.css(g.trstyle);
                return d && "matrix" == d.substr(0, 6) ? d.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1;
            };
            this.getScrollTop = function(d) {
                if (!d) {
                    if (d = s()) return 16 == d.length ? -d[13] : -d[5];
                    if (b.timerscroll && b.timerscroll.bz) return b.timerscroll.bz.getNow();
                }
                return b.doc.translate.y;
            };
            this.getScrollLeft = function(d) {
                if (!d) {
                    if (d = s()) return 16 == d.length ? -d[12] : -d[4];
                    if (b.timerscroll && b.timerscroll.bh) return b.timerscroll.bh.getNow();
                }
                return b.doc.translate.x;
            };
            this.notifyScrollEvent = document.createEvent ? function(b) {
                var c = document.createEvent("UIEvents");
                c.initUIEvent("scroll", !1, !0, window, 1);
                b.dispatchEvent(c);
            } : document.fireEvent ? function(b) {
                var c = document.createEventObject();
                b.fireEvent("onscroll");
                c.cancelBubble = !0;
            } : function(b, c) {};
            g.hastranslate3d && b.opt.enabletranslate3d ? (this.setScrollTop = function(d, c) {
                b.doc.translate.y = d;
                b.doc.translate.ty = -1 * d + "px";
                b.doc.css(g.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0px)");
                c || b.notifyScrollEvent(b.win[0]);
            }, this.setScrollLeft = function(d, c) {
                b.doc.translate.x = d;
                b.doc.translate.tx = -1 * d + "px";
                b.doc.css(g.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0px)");
                c || b.notifyScrollEvent(b.win[0]);
            }) : (this.setScrollTop = function(d, c) {
                b.doc.translate.y = d;
                b.doc.translate.ty = -1 * d + "px";
                b.doc.css(g.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")");
                c || b.notifyScrollEvent(b.win[0]);
            }, this.setScrollLeft = function(d, c) {
                b.doc.translate.x = d;
                b.doc.translate.tx = -1 * d + "px";
                b.doc.css(g.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")");
                c || b.notifyScrollEvent(b.win[0]);
            });
        } else this.getScrollTop = function() {
            return b.docscroll.scrollTop();
        }, this.setScrollTop = function(d) {
            return b.docscroll.scrollTop(d);
        }, this.getScrollLeft = function() {
            return b.docscroll.scrollLeft();
        }, this.setScrollLeft = function(d) {
            return b.docscroll.scrollLeft(d);
        };
        this.getTarget = function(b) {
            return !b ? !1 : b.target ? b.target : b.srcElement ? b.srcElement : !1;
        };
        this.hasParent = function(b, c) {
            if (!b) return !1;
            for (var f = b.target || b.srcElement || b || !1; f && f.id != c; ) f = f.parentNode || !1;
            return !1 !== f;
        };
        var u = {
            thin: 1,
            medium: 3,
            thick: 5
        };
        this.getOffset = function() {
            if (b.isfixed) return {
                top: parseFloat(b.win.css("top")),
                left: parseFloat(b.win.css("left"))
            };
            if (!b.viewport) return b.win.offset();
            var d = b.win.offset(), c = b.viewport.offset();
            return {
                top: d.top - c.top + b.viewport.scrollTop(),
                left: d.left - c.left + b.viewport.scrollLeft()
            };
        };
        this.updateScrollBar = function(d) {
            if (b.ishwscroll) b.rail.css({
                height: b.win.innerHeight()
            }), b.railh && b.railh.css({
                width: b.win.innerWidth()
            }); else {
                var c = b.getOffset(), f = c.top, g = c.left, f = f + l(b.win, "border-top-width", !0);
                b.win.outerWidth();
                b.win.innerWidth();
                var g = g + (b.rail.align ? b.win.outerWidth() - l(b.win, "border-right-width") - b.rail.width : l(b.win, "border-left-width")), e = b.opt.railoffset;
                e && (e.top && (f += e.top), b.rail.align && e.left && (g += e.left));
                b.locked || b.rail.css({
                    top: f,
                    left: g,
                    height: d ? d.h : b.win.innerHeight()
                });
                b.zoom && b.zoom.css({
                    top: f + 1,
                    left: 1 == b.rail.align ? g - 20 : g + b.rail.width + 4
                });
                b.railh && !b.locked && (f = c.top, g = c.left, d = b.railh.align ? f + l(b.win, "border-top-width", !0) + b.win.innerHeight() - b.railh.height : f + l(b.win, "border-top-width", !0), 
                g += l(b.win, "border-left-width"), b.railh.css({
                    top: d,
                    left: g,
                    width: b.railh.width
                }));
            }
        };
        this.doRailClick = function(d, c, f) {
            var g;
            b.locked || (b.cancelEvent(d), c ? (c = f ? b.doScrollLeft : b.doScrollTop, g = f ? (d.pageX - b.railh.offset().left - b.cursorwidth / 2) * b.scrollratio.x : (d.pageY - b.rail.offset().top - b.cursorheight / 2) * b.scrollratio.y, 
            c(g)) : (c = f ? b.doScrollLeftBy : b.doScrollBy, g = f ? b.scroll.x : b.scroll.y, 
            d = f ? d.pageX - b.railh.offset().left : d.pageY - b.rail.offset().top, f = f ? b.view.w : b.view.h, 
            g >= d ? c(f) : c(-f)));
        };
        b.hasanimationframe = v;
        b.hascancelanimationframe = w;
        b.hasanimationframe ? b.hascancelanimationframe || (w = function() {
            b.cancelAnimationFrame = !0;
        }) : (v = function(b) {
            return setTimeout(b, 15 - Math.floor(+new Date() / 1e3) % 16);
        }, w = clearInterval);
        this.init = function() {
            b.saved.css = [];
            if (g.isie7mobile || g.isoperamini) return !0;
            g.hasmstouch && b.css(b.ispage ? e("html") : b.win, {
                "-ms-touch-action": "none"
            });
            b.zindex = "auto";
            b.zindex = !b.ispage && "auto" == b.opt.zindex ? k() || "auto" : b.opt.zindex;
            !b.ispage && "auto" != b.zindex && b.zindex > y && (y = b.zindex);
            b.isie && (0 == b.zindex && "auto" == b.opt.zindex) && (b.zindex = "auto");
            if (!b.ispage || !g.cantouch && !g.isieold && !g.isie9mobile) {
                var d = b.docscroll;
                b.ispage && (d = b.haswrapper ? b.win : b.doc);
                g.isie9mobile || b.css(d, {
                    "overflow-y": "hidden"
                });
                b.ispage && g.isie7 && ("BODY" == b.doc[0].nodeName ? b.css(e("html"), {
                    "overflow-y": "hidden"
                }) : "HTML" == b.doc[0].nodeName && b.css(e("body"), {
                    "overflow-y": "hidden"
                }));
                g.isios && (!b.ispage && !b.haswrapper) && b.css(e("body"), {
                    "-webkit-overflow-scrolling": "touch"
                });
                var c = e(document.createElement("div"));
                c.css({
                    position: "relative",
                    top: 0,
                    "float": "right",
                    width: b.opt.cursorwidth,
                    height: "0px",
                    "background-color": b.opt.cursorcolor,
                    border: b.opt.cursorborder,
                    "background-clip": "padding-box",
                    "-webkit-border-radius": b.opt.cursorborderradius,
                    "-moz-border-radius": b.opt.cursorborderradius,
                    "border-radius": b.opt.cursorborderradius
                });
                c.hborder = parseFloat(c.outerHeight() - c.innerHeight());
                b.cursor = c;
                var f = e(document.createElement("div"));
                f.attr("id", b.id);
                f.addClass("nicescroll-rails");
                var l, h, x = [ "left", "right" ], q;
                for (q in x) h = x[q], (l = b.opt.railpadding[h]) ? f.css("padding-" + h, l + "px") : b.opt.railpadding[h] = 0;
                f.append(c);
                f.width = Math.max(parseFloat(b.opt.cursorwidth), c.outerWidth()) + b.opt.railpadding.left + b.opt.railpadding.right;
                f.css({
                    width: f.width + "px",
                    zIndex: b.zindex,
                    background: b.opt.background,
                    cursor: "default"
                });
                f.visibility = !0;
                f.scrollable = !0;
                f.align = "left" == b.opt.railalign ? 0 : 1;
                b.rail = f;
                c = b.rail.drag = !1;
                b.opt.boxzoom && (!b.ispage && !g.isieold) && (c = document.createElement("div"), 
                b.bind(c, "click", b.doZoom), b.zoom = e(c), b.zoom.css({
                    cursor: "pointer",
                    "z-index": b.zindex,
                    backgroundImage: "url(" + N + "zoomico.png)",
                    height: 18,
                    width: 18,
                    backgroundPosition: "0px 0px"
                }), b.opt.dblclickzoom && b.bind(b.win, "dblclick", b.doZoom), g.cantouch && b.opt.gesturezoom && (b.ongesturezoom = function(d) {
                    1.5 < d.scale && b.doZoomIn(d);
                    .8 > d.scale && b.doZoomOut(d);
                    return b.cancelEvent(d);
                }, b.bind(b.win, "gestureend", b.ongesturezoom)));
                b.railh = !1;
                if (b.opt.horizrailenabled) {
                    b.css(d, {
                        "overflow-x": "hidden"
                    });
                    c = e(document.createElement("div"));
                    c.css({
                        position: "relative",
                        top: 0,
                        height: b.opt.cursorwidth,
                        width: "0px",
                        "background-color": b.opt.cursorcolor,
                        border: b.opt.cursorborder,
                        "background-clip": "padding-box",
                        "-webkit-border-radius": b.opt.cursorborderradius,
                        "-moz-border-radius": b.opt.cursorborderradius,
                        "border-radius": b.opt.cursorborderradius
                    });
                    c.wborder = parseFloat(c.outerWidth() - c.innerWidth());
                    b.cursorh = c;
                    var m = e(document.createElement("div"));
                    m.attr("id", b.id + "-hr");
                    m.addClass("nicescroll-rails");
                    m.height = Math.max(parseFloat(b.opt.cursorwidth), c.outerHeight());
                    m.css({
                        height: m.height + "px",
                        zIndex: b.zindex,
                        background: b.opt.background
                    });
                    m.append(c);
                    m.visibility = !0;
                    m.scrollable = !0;
                    m.align = "top" == b.opt.railvalign ? 0 : 1;
                    b.railh = m;
                    b.railh.drag = !1;
                }
                b.ispage ? (f.css({
                    position: "fixed",
                    top: "0px",
                    height: "100%"
                }), f.align ? f.css({
                    right: "0px"
                }) : f.css({
                    left: "0px"
                }), b.body.append(f), b.railh && (m.css({
                    position: "fixed",
                    left: "0px",
                    width: "100%"
                }), m.align ? m.css({
                    bottom: "0px"
                }) : m.css({
                    top: "0px"
                }), b.body.append(m))) : (b.ishwscroll ? ("static" == b.win.css("position") && b.css(b.win, {
                    position: "relative"
                }), d = "HTML" == b.win[0].nodeName ? b.body : b.win, b.zoom && (b.zoom.css({
                    position: "absolute",
                    top: 1,
                    right: 0,
                    "margin-right": f.width + 4
                }), d.append(b.zoom)), f.css({
                    position: "absolute",
                    top: 0
                }), f.align ? f.css({
                    right: 0
                }) : f.css({
                    left: 0
                }), d.append(f), m && (m.css({
                    position: "absolute",
                    left: 0,
                    bottom: 0
                }), m.align ? m.css({
                    bottom: 0
                }) : m.css({
                    top: 0
                }), d.append(m))) : (b.isfixed = "fixed" == b.win.css("position"), d = b.isfixed ? "fixed" : "absolute", 
                b.isfixed || (b.viewport = b.getViewport(b.win[0])), b.viewport && (b.body = b.viewport, 
                !1 == /fixed|relative|absolute/.test(b.viewport.css("position")) && b.css(b.viewport, {
                    position: "relative"
                })), f.css({
                    position: d
                }), b.zoom && b.zoom.css({
                    position: d
                }), b.updateScrollBar(), b.body.append(f), b.zoom && b.body.append(b.zoom), b.railh && (m.css({
                    position: d
                }), b.body.append(m))), g.isios && b.css(b.win, {
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    "-webkit-touch-callout": "none"
                }), g.isie && b.opt.disableoutline && b.win.attr("hideFocus", "true"), g.iswebkit && b.opt.disableoutline && b.win.css({
                    outline: "none"
                }));
                !1 === b.opt.autohidemode ? (b.autohidedom = !1, b.rail.css({
                    opacity: b.opt.cursoropacitymax
                }), b.railh && b.railh.css({
                    opacity: b.opt.cursoropacitymax
                })) : !0 === b.opt.autohidemode || "leave" === b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), 
                g.isie8 && (b.autohidedom = b.autohidedom.add(b.cursor)), b.railh && (b.autohidedom = b.autohidedom.add(b.railh)), 
                b.railh && g.isie8 && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "scroll" == b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), 
                b.railh && (b.autohidedom = b.autohidedom.add(b.railh))) : "cursor" == b.opt.autohidemode ? (b.autohidedom = e().add(b.cursor), 
                b.railh && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "hidden" == b.opt.autohidemode && (b.autohidedom = !1, 
                b.hide(), b.locked = !1);
                if (g.isie9mobile) b.scrollmom = new J(b), b.onmangotouch = function(d) {
                    d = b.getScrollTop();
                    var c = b.getScrollLeft();
                    if (d == b.scrollmom.lastscrolly && c == b.scrollmom.lastscrollx) return !0;
                    var f = d - b.mangotouch.sy, g = c - b.mangotouch.sx;
                    if (0 != Math.round(Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)))) {
                        var n = 0 > f ? -1 : 1, e = 0 > g ? -1 : 1, k = +new Date();
                        b.mangotouch.lazy && clearTimeout(b.mangotouch.lazy);
                        80 < k - b.mangotouch.tm || b.mangotouch.dry != n || b.mangotouch.drx != e ? (b.scrollmom.stop(), 
                        b.scrollmom.reset(c, d), b.mangotouch.sy = d, b.mangotouch.ly = d, b.mangotouch.sx = c, 
                        b.mangotouch.lx = c, b.mangotouch.dry = n, b.mangotouch.drx = e, b.mangotouch.tm = k) : (b.scrollmom.stop(), 
                        b.scrollmom.update(b.mangotouch.sx - g, b.mangotouch.sy - f), b.mangotouch.tm = k, 
                        f = Math.max(Math.abs(b.mangotouch.ly - d), Math.abs(b.mangotouch.lx - c)), b.mangotouch.ly = d, 
                        b.mangotouch.lx = c, 2 < f && (b.mangotouch.lazy = setTimeout(function() {
                            b.mangotouch.lazy = !1;
                            b.mangotouch.dry = 0;
                            b.mangotouch.drx = 0;
                            b.mangotouch.tm = 0;
                            b.scrollmom.doMomentum(30);
                        }, 100)));
                    }
                }, f = b.getScrollTop(), m = b.getScrollLeft(), b.mangotouch = {
                    sy: f,
                    ly: f,
                    dry: 0,
                    sx: m,
                    lx: m,
                    drx: 0,
                    lazy: !1,
                    tm: 0
                }, b.bind(b.docscroll, "scroll", b.onmangotouch); else {
                    if (g.cantouch || b.istouchcapable || b.opt.touchbehavior || g.hasmstouch) {
                        b.scrollmom = new J(b);
                        b.ontouchstart = function(d) {
                            if (d.pointerType && 2 != d.pointerType) return !1;
                            if (!b.locked) {
                                if (g.hasmstouch) for (var c = d.target ? d.target : !1; c; ) {
                                    var f = e(c).getNiceScroll();
                                    if (0 < f.length && f[0].me == b.me) break;
                                    if (0 < f.length) return !1;
                                    if ("DIV" == c.nodeName && c.id == b.id) break;
                                    c = c.parentNode ? c.parentNode : !1;
                                }
                                b.cancelScroll();
                                if ((c = b.getTarget(d)) && /INPUT/i.test(c.nodeName) && /range/i.test(c.type)) return b.stopPropagation(d);
                                !("clientX" in d) && "changedTouches" in d && (d.clientX = d.changedTouches[0].clientX, 
                                d.clientY = d.changedTouches[0].clientY);
                                b.forcescreen && (f = d, d = {
                                    original: d.original ? d.original : d
                                }, d.clientX = f.screenX, d.clientY = f.screenY);
                                b.rail.drag = {
                                    x: d.clientX,
                                    y: d.clientY,
                                    sx: b.scroll.x,
                                    sy: b.scroll.y,
                                    st: b.getScrollTop(),
                                    sl: b.getScrollLeft(),
                                    pt: 2,
                                    dl: !1
                                };
                                if (b.ispage || !b.opt.directionlockdeadzone) b.rail.drag.dl = "f"; else {
                                    var f = e(window).width(), n = e(window).height(), k = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth), l = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), n = Math.max(0, l - n), f = Math.max(0, k - f);
                                    b.rail.drag.ck = !b.rail.scrollable && b.railh.scrollable ? 0 < n ? "v" : !1 : b.rail.scrollable && !b.railh.scrollable ? 0 < f ? "h" : !1 : !1;
                                    b.rail.drag.ck || (b.rail.drag.dl = "f");
                                }
                                b.opt.touchbehavior && (b.isiframe && g.isie) && (f = b.win.position(), b.rail.drag.x += f.left, 
                                b.rail.drag.y += f.top);
                                b.hasmoving = !1;
                                b.lastmouseup = !1;
                                b.scrollmom.reset(d.clientX, d.clientY);
                                if (!g.cantouch && !this.istouchcapable && !g.hasmstouch) {
                                    if (!c || !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName)) return !b.ispage && g.hasmousecapture && c.setCapture(), 
                                    b.opt.touchbehavior ? b.cancelEvent(d) : b.stopPropagation(d);
                                    /SUBMIT|CANCEL|BUTTON/i.test(e(c).attr("type")) && (pc = {
                                        tg: c,
                                        click: !1
                                    }, b.preventclick = pc);
                                }
                            }
                        };
                        b.ontouchend = function(d) {
                            if (d.pointerType && 2 != d.pointerType) return !1;
                            if (b.rail.drag && 2 == b.rail.drag.pt && (b.scrollmom.doMomentum(), b.rail.drag = !1, 
                            b.hasmoving && (b.hasmoving = !1, b.lastmouseup = !0, b.hideCursor(), g.hasmousecapture && document.releaseCapture(), 
                            !g.cantouch))) return b.cancelEvent(d);
                        };
                        var t = b.opt.touchbehavior && b.isiframe && !g.hasmousecapture;
                        b.ontouchmove = function(d, c) {
                            if (d.pointerType && 2 != d.pointerType) return !1;
                            if (b.rail.drag && 2 == b.rail.drag.pt) {
                                if (g.cantouch && "undefined" == typeof d.original) return !0;
                                b.hasmoving = !0;
                                b.preventclick && !b.preventclick.click && (b.preventclick.click = b.preventclick.tg.onclick || !1, 
                                b.preventclick.tg.onclick = b.onpreventclick);
                                d = e.extend({
                                    original: d
                                }, d);
                                "changedTouches" in d && (d.clientX = d.changedTouches[0].clientX, d.clientY = d.changedTouches[0].clientY);
                                if (b.forcescreen) {
                                    var f = d;
                                    d = {
                                        original: d.original ? d.original : d
                                    };
                                    d.clientX = f.screenX;
                                    d.clientY = f.screenY;
                                }
                                f = ofy = 0;
                                if (t && !c) {
                                    var n = b.win.position(), f = -n.left;
                                    ofy = -n.top;
                                }
                                var k = d.clientY + ofy, n = k - b.rail.drag.y, l = d.clientX + f, h = l - b.rail.drag.x, r = b.rail.drag.st - n;
                                b.ishwscroll && b.opt.bouncescroll ? 0 > r ? r = Math.round(r / 2) : r > b.page.maxh && (r = b.page.maxh + Math.round((r - b.page.maxh) / 2)) : (0 > r && (k = r = 0), 
                                r > b.page.maxh && (r = b.page.maxh, k = 0));
                                if (b.railh && b.railh.scrollable) {
                                    var m = b.rail.drag.sl - h;
                                    b.ishwscroll && b.opt.bouncescroll ? 0 > m ? m = Math.round(m / 2) : m > b.page.maxw && (m = b.page.maxw + Math.round((m - b.page.maxw) / 2)) : (0 > m && (l = m = 0), 
                                    m > b.page.maxw && (m = b.page.maxw, l = 0));
                                }
                                f = !1;
                                if (b.rail.drag.dl) f = !0, "v" == b.rail.drag.dl ? m = b.rail.drag.sl : "h" == b.rail.drag.dl && (r = b.rail.drag.st); else {
                                    var n = Math.abs(n), h = Math.abs(h), x = b.opt.directionlockdeadzone;
                                    if ("v" == b.rail.drag.ck) {
                                        if (n > x && h <= .3 * n) return b.rail.drag = !1, !0;
                                        h > x && (b.rail.drag.dl = "f", e("body").scrollTop(e("body").scrollTop()));
                                    } else if ("h" == b.rail.drag.ck) {
                                        if (h > x && n <= .3 * h) return b.rail.drag = !1, !0;
                                        n > x && (b.rail.drag.dl = "f", e("body").scrollLeft(e("body").scrollLeft()));
                                    }
                                }
                                b.synched("touchmove", function() {
                                    b.rail.drag && 2 == b.rail.drag.pt && (b.prepareTransition && b.prepareTransition(0), 
                                    b.rail.scrollable && b.setScrollTop(r), b.scrollmom.update(l, k), b.railh && b.railh.scrollable ? (b.setScrollLeft(m), 
                                    b.showCursor(r, m)) : b.showCursor(r), g.isie10 && document.selection.clear());
                                });
                                g.ischrome && b.istouchcapable && (f = !1);
                                if (f) return b.cancelEvent(d);
                            }
                        };
                    }
                    b.onmousedown = function(d, c) {
                        if (!(b.rail.drag && 1 != b.rail.drag.pt)) {
                            if (b.locked) return b.cancelEvent(d);
                            b.cancelScroll();
                            b.rail.drag = {
                                x: d.clientX,
                                y: d.clientY,
                                sx: b.scroll.x,
                                sy: b.scroll.y,
                                pt: 1,
                                hr: !!c
                            };
                            var f = b.getTarget(d);
                            !b.ispage && g.hasmousecapture && f.setCapture();
                            b.isiframe && !g.hasmousecapture && (b.saved.csspointerevents = b.doc.css("pointer-events"), 
                            b.css(b.doc, {
                                "pointer-events": "none"
                            }));
                            return b.cancelEvent(d);
                        }
                    };
                    b.onmouseup = function(d) {
                        if (b.rail.drag && (g.hasmousecapture && document.releaseCapture(), b.isiframe && !g.hasmousecapture && b.doc.css("pointer-events", b.saved.csspointerevents), 
                        1 == b.rail.drag.pt)) return b.rail.drag = !1, b.cancelEvent(d);
                    };
                    b.onmousemove = function(d) {
                        if (b.rail.drag && 1 == b.rail.drag.pt) {
                            if (g.ischrome && 0 == d.which) return b.onmouseup(d);
                            b.cursorfreezed = !0;
                            if (b.rail.drag.hr) {
                                b.scroll.x = b.rail.drag.sx + (d.clientX - b.rail.drag.x);
                                0 > b.scroll.x && (b.scroll.x = 0);
                                var c = b.scrollvaluemaxw;
                                b.scroll.x > c && (b.scroll.x = c);
                            } else b.scroll.y = b.rail.drag.sy + (d.clientY - b.rail.drag.y), 0 > b.scroll.y && (b.scroll.y = 0), 
                            c = b.scrollvaluemax, b.scroll.y > c && (b.scroll.y = c);
                            b.synched("mousemove", function() {
                                b.rail.drag && 1 == b.rail.drag.pt && (b.showCursor(), b.rail.drag.hr ? b.doScrollLeft(Math.round(b.scroll.x * b.scrollratio.x), b.opt.cursordragspeed) : b.doScrollTop(Math.round(b.scroll.y * b.scrollratio.y), b.opt.cursordragspeed));
                            });
                            return b.cancelEvent(d);
                        }
                    };
                    if (g.cantouch || b.opt.touchbehavior) b.onpreventclick = function(d) {
                        if (b.preventclick) return b.preventclick.tg.onclick = b.preventclick.click, b.preventclick = !1, 
                        b.cancelEvent(d);
                    }, b.bind(b.win, "mousedown", b.ontouchstart), b.onclick = g.isios ? !1 : function(d) {
                        return b.lastmouseup ? (b.lastmouseup = !1, b.cancelEvent(d)) : !0;
                    }, b.opt.grabcursorenabled && g.cursorgrabvalue && (b.css(b.ispage ? b.doc : b.win, {
                        cursor: g.cursorgrabvalue
                    }), b.css(b.rail, {
                        cursor: g.cursorgrabvalue
                    })); else {
                        var p = function(d) {
                            if (b.selectiondrag) {
                                if (d) {
                                    var c = b.win.outerHeight();
                                    d = d.pageY - b.selectiondrag.top;
                                    0 < d && d < c && (d = 0);
                                    d >= c && (d -= c);
                                    b.selectiondrag.df = d;
                                }
                                0 != b.selectiondrag.df && (b.doScrollBy(2 * -Math.floor(b.selectiondrag.df / 6)), 
                                b.debounced("doselectionscroll", function() {
                                    p();
                                }, 50));
                            }
                        };
                        b.hasTextSelected = "getSelection" in document ? function() {
                            return 0 < document.getSelection().rangeCount;
                        } : "selection" in document ? function() {
                            return "None" != document.selection.type;
                        } : function() {
                            return !1;
                        };
                        b.onselectionstart = function(d) {
                            b.ispage || (b.selectiondrag = b.win.offset());
                        };
                        b.onselectionend = function(d) {
                            b.selectiondrag = !1;
                        };
                        b.onselectiondrag = function(d) {
                            b.selectiondrag && b.hasTextSelected() && b.debounced("selectionscroll", function() {
                                p(d);
                            }, 250);
                        };
                    }
                    g.hasmstouch && (b.css(b.rail, {
                        "-ms-touch-action": "none"
                    }), b.css(b.cursor, {
                        "-ms-touch-action": "none"
                    }), b.bind(b.win, "MSPointerDown", b.ontouchstart), b.bind(document, "MSPointerUp", b.ontouchend), 
                    b.bind(document, "MSPointerMove", b.ontouchmove), b.bind(b.cursor, "MSGestureHold", function(b) {
                        b.preventDefault();
                    }), b.bind(b.cursor, "contextmenu", function(b) {
                        b.preventDefault();
                    }));
                    this.istouchcapable && (b.bind(b.win, "touchstart", b.ontouchstart), b.bind(document, "touchend", b.ontouchend), 
                    b.bind(document, "touchcancel", b.ontouchend), b.bind(document, "touchmove", b.ontouchmove));
                    b.bind(b.cursor, "mousedown", b.onmousedown);
                    b.bind(b.cursor, "mouseup", b.onmouseup);
                    b.railh && (b.bind(b.cursorh, "mousedown", function(d) {
                        b.onmousedown(d, !0);
                    }), b.bind(b.cursorh, "mouseup", function(d) {
                        if (!(b.rail.drag && 2 == b.rail.drag.pt)) return b.rail.drag = !1, b.hasmoving = !1, 
                        b.hideCursor(), g.hasmousecapture && document.releaseCapture(), b.cancelEvent(d);
                    }));
                    if (b.opt.cursordragontouch || !g.cantouch && !b.opt.touchbehavior) b.rail.css({
                        cursor: "default"
                    }), b.railh && b.railh.css({
                        cursor: "default"
                    }), b.jqbind(b.rail, "mouseenter", function() {
                        b.canshowonmouseevent && b.showCursor();
                        b.rail.active = !0;
                    }), b.jqbind(b.rail, "mouseleave", function() {
                        b.rail.active = !1;
                        b.rail.drag || b.hideCursor();
                    }), b.opt.sensitiverail && (b.bind(b.rail, "click", function(d) {
                        b.doRailClick(d, !1, !1);
                    }), b.bind(b.rail, "dblclick", function(d) {
                        b.doRailClick(d, !0, !1);
                    }), b.bind(b.cursor, "click", function(d) {
                        b.cancelEvent(d);
                    }), b.bind(b.cursor, "dblclick", function(d) {
                        b.cancelEvent(d);
                    })), b.railh && (b.jqbind(b.railh, "mouseenter", function() {
                        b.canshowonmouseevent && b.showCursor();
                        b.rail.active = !0;
                    }), b.jqbind(b.railh, "mouseleave", function() {
                        b.rail.active = !1;
                        b.rail.drag || b.hideCursor();
                    }), b.opt.sensitiverail && (b.bind(b.railh, "click", function(d) {
                        b.doRailClick(d, !1, !0);
                    }), b.bind(b.railh, "dblclick", function(d) {
                        b.doRailClick(d, !0, !0);
                    }), b.bind(b.cursorh, "click", function(d) {
                        b.cancelEvent(d);
                    }), b.bind(b.cursorh, "dblclick", function(d) {
                        b.cancelEvent(d);
                    })));
                    !g.cantouch && !b.opt.touchbehavior ? (b.bind(g.hasmousecapture ? b.win : document, "mouseup", b.onmouseup), 
                    b.bind(document, "mousemove", b.onmousemove), b.onclick && b.bind(document, "click", b.onclick), 
                    !b.ispage && b.opt.enablescrollonselection && (b.bind(b.win[0], "mousedown", b.onselectionstart), 
                    b.bind(document, "mouseup", b.onselectionend), b.bind(b.cursor, "mouseup", b.onselectionend), 
                    b.cursorh && b.bind(b.cursorh, "mouseup", b.onselectionend), b.bind(document, "mousemove", b.onselectiondrag)), 
                    b.zoom && (b.jqbind(b.zoom, "mouseenter", function() {
                        b.canshowonmouseevent && b.showCursor();
                        b.rail.active = !0;
                    }), b.jqbind(b.zoom, "mouseleave", function() {
                        b.rail.active = !1;
                        b.rail.drag || b.hideCursor();
                    }))) : (b.bind(g.hasmousecapture ? b.win : document, "mouseup", b.ontouchend), b.bind(document, "mousemove", b.ontouchmove), 
                    b.onclick && b.bind(document, "click", b.onclick), b.opt.cursordragontouch && (b.bind(b.cursor, "mousedown", b.onmousedown), 
                    b.bind(b.cursor, "mousemove", b.onmousemove), b.cursorh && b.bind(b.cursorh, "mousedown", function(d) {
                        b.onmousedown(d, !0);
                    }), b.cursorh && b.bind(b.cursorh, "mousemove", b.onmousemove)));
                    b.opt.enablemousewheel && (b.isiframe || b.bind(g.isie && b.ispage ? document : b.win, "mousewheel", b.onmousewheel), 
                    b.bind(b.rail, "mousewheel", b.onmousewheel), b.railh && b.bind(b.railh, "mousewheel", b.onmousewheelhr));
                    !b.ispage && (!g.cantouch && !/HTML|BODY/.test(b.win[0].nodeName)) && (b.win.attr("tabindex") || b.win.attr({
                        tabindex: L++
                    }), b.jqbind(b.win, "focus", function(d) {
                        z = b.getTarget(d).id || !0;
                        b.hasfocus = !0;
                        b.canshowonmouseevent && b.noticeCursor();
                    }), b.jqbind(b.win, "blur", function(d) {
                        z = !1;
                        b.hasfocus = !1;
                    }), b.jqbind(b.win, "mouseenter", function(d) {
                        E = b.getTarget(d).id || !0;
                        b.hasmousefocus = !0;
                        b.canshowonmouseevent && b.noticeCursor();
                    }), b.jqbind(b.win, "mouseleave", function() {
                        E = !1;
                        b.hasmousefocus = !1;
                        b.rail.drag || b.hideCursor();
                    }));
                }
                b.onkeypress = function(d) {
                    if (b.locked && 0 == b.page.maxh) return !0;
                    d = d ? d : window.e;
                    var c = b.getTarget(d);
                    if (c && /INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName) && (!c.getAttribute("type") && !c.type || !/submit|button|cancel/i.tp)) return !0;
                    if (b.hasfocus || b.hasmousefocus && !z || b.ispage && !z && !E) {
                        c = d.keyCode;
                        if (b.locked && 27 != c) return b.cancelEvent(d);
                        var f = d.ctrlKey || !1, n = d.shiftKey || !1, g = !1;
                        switch (c) {
                          case 38:
                          case 63233:
                            b.doScrollBy(72);
                            g = !0;
                            break;

                          case 40:
                          case 63235:
                            b.doScrollBy(-72);
                            g = !0;
                            break;

                          case 37:
                          case 63232:
                            b.railh && (f ? b.doScrollLeft(0) : b.doScrollLeftBy(72), g = !0);
                            break;

                          case 39:
                          case 63234:
                            b.railh && (f ? b.doScrollLeft(b.page.maxw) : b.doScrollLeftBy(-72), g = !0);
                            break;

                          case 33:
                          case 63276:
                            b.doScrollBy(b.view.h);
                            g = !0;
                            break;

                          case 34:
                          case 63277:
                            b.doScrollBy(-b.view.h);
                            g = !0;
                            break;

                          case 36:
                          case 63273:
                            b.railh && f ? b.doScrollPos(0, 0) : b.doScrollTo(0);
                            g = !0;
                            break;

                          case 35:
                          case 63275:
                            b.railh && f ? b.doScrollPos(b.page.maxw, b.page.maxh) : b.doScrollTo(b.page.maxh);
                            g = !0;
                            break;

                          case 32:
                            b.opt.spacebarenabled && (n ? b.doScrollBy(b.view.h) : b.doScrollBy(-b.view.h), 
                            g = !0);
                            break;

                          case 27:
                            b.zoomactive && (b.doZoom(), g = !0);
                        }
                        if (g) return b.cancelEvent(d);
                    }
                };
                b.opt.enablekeyboard && b.bind(document, g.isopera && !g.isopera12 ? "keypress" : "keydown", b.onkeypress);
                b.bind(window, "resize", b.lazyResize);
                b.bind(window, "orientationchange", b.lazyResize);
                b.bind(window, "load", b.lazyResize);
                if (g.ischrome && !b.ispage && !b.haswrapper) {
                    var s = b.win.attr("style"), f = parseFloat(b.win.css("width")) + 1;
                    b.win.css("width", f);
                    b.synched("chromefix", function() {
                        b.win.attr("style", s);
                    });
                }
                b.onAttributeChange = function(d) {
                    b.lazyResize(250);
                };
                !b.ispage && !b.haswrapper && (!1 !== A ? (b.observer = new A(function(d) {
                    d.forEach(b.onAttributeChange);
                }), b.observer.observe(b.win[0], {
                    childList: !0,
                    characterData: !1,
                    attributes: !0,
                    subtree: !1
                }), b.observerremover = new A(function(d) {
                    d.forEach(function(d) {
                        if (0 < d.removedNodes.length) for (var c in d.removedNodes) if (d.removedNodes[c] == b.win[0]) return b.remove();
                    });
                }), b.observerremover.observe(b.win[0].parentNode, {
                    childList: !0,
                    characterData: !1,
                    attributes: !1,
                    subtree: !1
                })) : (b.bind(b.win, g.isie && !g.isie9 ? "propertychange" : "DOMAttrModified", b.onAttributeChange), 
                g.isie9 && b.win[0].attachEvent("onpropertychange", b.onAttributeChange), b.bind(b.win, "DOMNodeRemoved", function(d) {
                    d.target == b.win[0] && b.remove();
                })));
                !b.ispage && b.opt.boxzoom && b.bind(window, "resize", b.resizeZoom);
                b.istextarea && b.bind(b.win, "mouseup", b.lazyResize);
                b.checkrtlmode = !0;
                b.lazyResize(30);
            }
            if ("IFRAME" == this.doc[0].nodeName) {
                var K = function(d) {
                    b.iframexd = !1;
                    try {
                        var c = "contentDocument" in this ? this.contentDocument : this.contentWindow.document;
                    } catch (f) {
                        b.iframexd = !0, c = !1;
                    }
                    if (b.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), 
                    !0;
                    b.forcescreen = !0;
                    b.isiframe && (b.iframe = {
                        doc: e(c),
                        html: b.doc.contents().find("html")[0],
                        body: b.doc.contents().find("body")[0]
                    }, b.getContentSize = function() {
                        return {
                            w: Math.max(b.iframe.html.scrollWidth, b.iframe.body.scrollWidth),
                            h: Math.max(b.iframe.html.scrollHeight, b.iframe.body.scrollHeight)
                        };
                    }, b.docscroll = e(b.iframe.body));
                    !g.isios && (b.opt.iframeautoresize && !b.isiframe) && (b.win.scrollTop(0), b.doc.height(""), 
                    d = Math.max(c.getElementsByTagName("html")[0].scrollHeight, c.body.scrollHeight), 
                    b.doc.height(d));
                    b.lazyResize(30);
                    g.isie7 && b.css(e(b.iframe.html), {
                        "overflow-y": "hidden"
                    });
                    b.css(e(b.iframe.body), {
                        "overflow-y": "hidden"
                    });
                    g.isios && b.haswrapper && b.css(e(c.body), {
                        "-webkit-transform": "translate3d(0,0,0)"
                    });
                    "contentWindow" in this ? b.bind(this.contentWindow, "scroll", b.onscroll) : b.bind(c, "scroll", b.onscroll);
                    b.opt.enablemousewheel && b.bind(c, "mousewheel", b.onmousewheel);
                    b.opt.enablekeyboard && b.bind(c, g.isopera ? "keypress" : "keydown", b.onkeypress);
                    if (g.cantouch || b.opt.touchbehavior) b.bind(c, "mousedown", b.ontouchstart), b.bind(c, "mousemove", function(d) {
                        b.ontouchmove(d, !0);
                    }), b.opt.grabcursorenabled && g.cursorgrabvalue && b.css(e(c.body), {
                        cursor: g.cursorgrabvalue
                    });
                    b.bind(c, "mouseup", b.ontouchend);
                    b.zoom && (b.opt.dblclickzoom && b.bind(c, "dblclick", b.doZoom), b.ongesturezoom && b.bind(c, "gestureend", b.ongesturezoom));
                };
                this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
                    K.call(b.doc[0], !1);
                }, 500);
                b.bind(this.doc, "load", K);
            }
        };
        this.showCursor = function(d, c) {
            b.cursortimeout && (clearTimeout(b.cursortimeout), b.cursortimeout = 0);
            if (b.rail) {
                b.autohidedom && (b.autohidedom.stop().css({
                    opacity: b.opt.cursoropacitymax
                }), b.cursoractive = !0);
                if (!b.rail.drag || 1 != b.rail.drag.pt) "undefined" != typeof d && !1 !== d && (b.scroll.y = Math.round(1 * d / b.scrollratio.y)), 
                "undefined" != typeof c && (b.scroll.x = Math.round(1 * c / b.scrollratio.x));
                b.cursor.css({
                    height: b.cursorheight,
                    top: b.scroll.y
                });
                b.cursorh && (!b.rail.align && b.rail.visibility ? b.cursorh.css({
                    width: b.cursorwidth,
                    left: b.scroll.x + b.rail.width
                }) : b.cursorh.css({
                    width: b.cursorwidth,
                    left: b.scroll.x
                }), b.cursoractive = !0);
                b.zoom && b.zoom.stop().css({
                    opacity: b.opt.cursoropacitymax
                });
            }
        };
        this.hideCursor = function(d) {
            !b.cursortimeout && (b.rail && b.autohidedom && !(b.hasmousefocus && "leave" == b.opt.autohidemode)) && (b.cursortimeout = setTimeout(function() {
                if (!b.rail.active || !b.showonmouseevent) b.autohidedom.stop().animate({
                    opacity: b.opt.cursoropacitymin
                }), b.zoom && b.zoom.stop().animate({
                    opacity: b.opt.cursoropacitymin
                }), b.cursoractive = !1;
                b.cursortimeout = 0;
            }, d || b.opt.hidecursordelay));
        };
        this.noticeCursor = function(d, c, f) {
            b.showCursor(c, f);
            b.rail.active || b.hideCursor(d);
        };
        this.getContentSize = b.ispage ? function() {
            return {
                w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            };
        } : b.haswrapper ? function() {
            return {
                w: b.doc.outerWidth() + parseInt(b.win.css("paddingLeft")) + parseInt(b.win.css("paddingRight")),
                h: b.doc.outerHeight() + parseInt(b.win.css("paddingTop")) + parseInt(b.win.css("paddingBottom"))
            };
        } : function() {
            return {
                w: b.docscroll[0].scrollWidth,
                h: b.docscroll[0].scrollHeight
            };
        };
        this.onResize = function(d, c) {
            if (!b.win) return !1;
            if (!b.haswrapper && !b.ispage) {
                if ("none" == b.win.css("display")) return b.visibility && b.hideRail().hideRailHr(), 
                !1;
                !b.hidden && !b.visibility && b.showRail().showRailHr();
            }
            var f = b.page.maxh, g = b.page.maxw, e = b.view.w;
            b.view = {
                w: b.ispage ? b.win.width() : parseInt(b.win[0].clientWidth),
                h: b.ispage ? b.win.height() : parseInt(b.win[0].clientHeight)
            };
            b.page = c ? c : b.getContentSize();
            b.page.maxh = Math.max(0, b.page.h - b.view.h);
            b.page.maxw = Math.max(0, b.page.w - b.view.w);
            if (b.page.maxh == f && b.page.maxw == g && b.view.w == e) {
                if (b.ispage) return b;
                f = b.win.offset();
                if (b.lastposition && (g = b.lastposition, g.top == f.top && g.left == f.left)) return b;
                b.lastposition = f;
            }
            0 == b.page.maxh ? (b.hideRail(), b.scrollvaluemax = 0, b.scroll.y = 0, b.scrollratio.y = 0, 
            b.cursorheight = 0, b.setScrollTop(0), b.rail.scrollable = !1) : b.rail.scrollable = !0;
            0 == b.page.maxw ? (b.hideRailHr(), b.scrollvaluemaxw = 0, b.scroll.x = 0, b.scrollratio.x = 0, 
            b.cursorwidth = 0, b.setScrollLeft(0), b.railh.scrollable = !1) : b.railh.scrollable = !0;
            b.locked = 0 == b.page.maxh && 0 == b.page.maxw;
            if (b.locked) return b.ispage || b.updateScrollBar(b.view), !1;
            !b.hidden && !b.visibility ? b.showRail().showRailHr() : !b.hidden && !b.railh.visibility && b.showRailHr();
            b.istextarea && (b.win.css("resize") && "none" != b.win.css("resize")) && (b.view.h -= 20);
            b.cursorheight = Math.min(b.view.h, Math.round(b.view.h * (b.view.h / b.page.h)));
            b.cursorheight = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorheight);
            b.cursorwidth = Math.min(b.view.w, Math.round(b.view.w * (b.view.w / b.page.w)));
            b.cursorwidth = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorwidth);
            b.scrollvaluemax = b.view.h - b.cursorheight - b.cursor.hborder;
            b.railh && (b.railh.width = 0 < b.page.maxh ? b.view.w - b.rail.width : b.view.w, 
            b.scrollvaluemaxw = b.railh.width - b.cursorwidth - b.cursorh.wborder);
            b.checkrtlmode && b.railh && (b.checkrtlmode = !1, b.opt.rtlmode && 0 == b.scroll.x && b.setScrollLeft(b.page.maxw));
            b.ispage || b.updateScrollBar(b.view);
            b.scrollratio = {
                x: b.page.maxw / b.scrollvaluemaxw,
                y: b.page.maxh / b.scrollvaluemax
            };
            b.getScrollTop() > b.page.maxh ? b.doScrollTop(b.page.maxh) : (b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)), 
            b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x)), b.cursoractive && b.noticeCursor());
            b.scroll.y && 0 == b.getScrollTop() && b.doScrollTo(Math.floor(b.scroll.y * b.scrollratio.y));
            return b;
        };
        this.resize = b.onResize;
        this.lazyResize = function(d) {
            d = isNaN(d) ? 30 : d;
            b.delayed("resize", b.resize, d);
            return b;
        };
        this._bind = function(d, c, f, g) {
            b.events.push({
                e: d,
                n: c,
                f: f,
                b: g,
                q: !1
            });
            d.addEventListener ? d.addEventListener(c, f, g || !1) : d.attachEvent ? d.attachEvent("on" + c, f) : d["on" + c] = f;
        };
        this.jqbind = function(d, c, f) {
            b.events.push({
                e: d,
                n: c,
                f: f,
                q: !0
            });
            e(d).bind(c, f);
        };
        this.bind = function(d, c, f, e) {
            var k = "jquery" in d ? d[0] : d;
            "mousewheel" == c ? "onwheel" in b.win ? b._bind(k, "wheel", f, e || !1) : (d = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll", 
            q(k, d, f, e || !1), "DOMMouseScroll" == d && q(k, "MozMousePixelScroll", f, e || !1)) : k.addEventListener ? (g.cantouch && /mouseup|mousedown|mousemove/.test(c) && b._bind(k, "mousedown" == c ? "touchstart" : "mouseup" == c ? "touchend" : "touchmove", function(b) {
                if (b.touches) {
                    if (2 > b.touches.length) {
                        var d = b.touches.length ? b.touches[0] : b;
                        d.original = b;
                        f.call(this, d);
                    }
                } else b.changedTouches && (d = b.changedTouches[0], d.original = b, f.call(this, d));
            }, e || !1), b._bind(k, c, f, e || !1), g.cantouch && "mouseup" == c && b._bind(k, "touchcancel", f, e || !1)) : b._bind(k, c, function(d) {
                if ((d = d || window.event || !1) && d.srcElement) d.target = d.srcElement;
                "pageY" in d || (d.pageX = d.clientX + document.documentElement.scrollLeft, d.pageY = d.clientY + document.documentElement.scrollTop);
                return !1 === f.call(k, d) || !1 === e ? b.cancelEvent(d) : !0;
            });
        };
        this._unbind = function(b, c, f, g) {
            b.removeEventListener ? b.removeEventListener(c, f, g) : b.detachEvent ? b.detachEvent("on" + c, f) : b["on" + c] = !1;
        };
        this.unbindAll = function() {
            for (var d = 0; d < b.events.length; d++) {
                var c = b.events[d];
                c.q ? c.e.unbind(c.n, c.f) : b._unbind(c.e, c.n, c.f, c.b);
            }
        };
        this.cancelEvent = function(b) {
            b = b.original ? b.original : b ? b : window.event || !1;
            if (!b) return !1;
            b.preventDefault && b.preventDefault();
            b.stopPropagation && b.stopPropagation();
            b.preventManipulation && b.preventManipulation();
            b.cancelBubble = !0;
            b.cancel = !0;
            return b.returnValue = !1;
        };
        this.stopPropagation = function(b) {
            b = b.original ? b.original : b ? b : window.event || !1;
            if (!b) return !1;
            if (b.stopPropagation) return b.stopPropagation();
            b.cancelBubble && (b.cancelBubble = !0);
            return !1;
        };
        this.showRail = function() {
            if (0 != b.page.maxh && (b.ispage || "none" != b.win.css("display"))) b.visibility = !0, 
            b.rail.visibility = !0, b.rail.css("display", "block");
            return b;
        };
        this.showRailHr = function() {
            if (!b.railh) return b;
            if (0 != b.page.maxw && (b.ispage || "none" != b.win.css("display"))) b.railh.visibility = !0, 
            b.railh.css("display", "block");
            return b;
        };
        this.hideRail = function() {
            b.visibility = !1;
            b.rail.visibility = !1;
            b.rail.css("display", "none");
            return b;
        };
        this.hideRailHr = function() {
            if (!b.railh) return b;
            b.railh.visibility = !1;
            b.railh.css("display", "none");
            return b;
        };
        this.show = function() {
            b.hidden = !1;
            b.locked = !1;
            return b.showRail().showRailHr();
        };
        this.hide = function() {
            b.hidden = !0;
            b.locked = !0;
            return b.hideRail().hideRailHr();
        };
        this.toggle = function() {
            return b.hidden ? b.show() : b.hide();
        };
        this.remove = function() {
            b.stop();
            b.cursortimeout && clearTimeout(b.cursortimeout);
            b.doZoomOut();
            b.unbindAll();
            g.isie9 && b.win[0].detachEvent("onpropertychange", b.onAttributeChange);
            !1 !== b.observer && b.observer.disconnect();
            !1 !== b.observerremover && b.observerremover.disconnect();
            b.events = null;
            b.cursor && b.cursor.remove();
            b.cursorh && b.cursorh.remove();
            b.rail && b.rail.remove();
            b.railh && b.railh.remove();
            b.zoom && b.zoom.remove();
            for (var d = 0; d < b.saved.css.length; d++) {
                var c = b.saved.css[d];
                c[0].css(c[1], "undefined" == typeof c[2] ? "" : c[2]);
            }
            b.saved = !1;
            b.me.data("__nicescroll", "");
            var f = e.nicescroll;
            f.each(function(d) {
                if (this && this.id === b.id) {
                    delete f[d];
                    for (var c = ++d; c < f.length; c++, d++) f[d] = f[c];
                    f.length--;
                    f.length && delete f[f.length];
                }
            });
            for (var k in b) b[k] = null, delete b[k];
            b = null;
        };
        this.scrollstart = function(d) {
            this.onscrollstart = d;
            return b;
        };
        this.scrollend = function(d) {
            this.onscrollend = d;
            return b;
        };
        this.scrollcancel = function(d) {
            this.onscrollcancel = d;
            return b;
        };
        this.zoomin = function(d) {
            this.onzoomin = d;
            return b;
        };
        this.zoomout = function(d) {
            this.onzoomout = d;
            return b;
        };
        this.isScrollable = function(b) {
            b = b.target ? b.target : b;
            if ("OPTION" == b.nodeName) return !0;
            for (;b && 1 == b.nodeType && !/BODY|HTML/.test(b.nodeName); ) {
                var c = e(b), c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                if (/scroll|auto/.test(c)) return b.clientHeight != b.scrollHeight;
                b = b.parentNode ? b.parentNode : !1;
            }
            return !1;
        };
        this.getViewport = function(b) {
            for (b = b && b.parentNode ? b.parentNode : !1; b && 1 == b.nodeType && !/BODY|HTML/.test(b.nodeName); ) {
                var c = e(b);
                if (/fixed|absolute/.test(c.css("position"))) return c;
                var f = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                if (/scroll|auto/.test(f) && b.clientHeight != b.scrollHeight || 0 < c.getNiceScroll().length) return c;
                b = b.parentNode ? b.parentNode : !1;
            }
            return !1;
        };
        this.onmousewheel = function(d) {
            if (b.locked) return b.debounced("checkunlock", b.resize, 250), !0;
            if (b.rail.drag) return b.cancelEvent(d);
            "auto" == b.opt.oneaxismousemode && 0 != d.deltaX && (b.opt.oneaxismousemode = !1);
            if (b.opt.oneaxismousemode && 0 == d.deltaX && !b.rail.scrollable) return b.railh && b.railh.scrollable ? b.onmousewheelhr(d) : !0;
            var c = +new Date(), f = !1;
            b.opt.preservenativescrolling && b.checkarea + 600 < c && (b.nativescrollingarea = b.isScrollable(d), 
            f = !0);
            b.checkarea = c;
            if (b.nativescrollingarea) return !0;
            if (d = t(d, !1, f)) b.checkarea = 0;
            return d;
        };
        this.onmousewheelhr = function(d) {
            if (b.locked || !b.railh.scrollable) return !0;
            if (b.rail.drag) return b.cancelEvent(d);
            var c = +new Date(), f = !1;
            b.opt.preservenativescrolling && b.checkarea + 600 < c && (b.nativescrollingarea = b.isScrollable(d), 
            f = !0);
            b.checkarea = c;
            return b.nativescrollingarea ? !0 : b.locked ? b.cancelEvent(d) : t(d, !0, f);
        };
        this.stop = function() {
            b.cancelScroll();
            b.scrollmon && b.scrollmon.stop();
            b.cursorfreezed = !1;
            b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
            b.noticeCursor();
            return b;
        };
        this.getTransitionSpeed = function(d) {
            var c = Math.round(10 * b.opt.scrollspeed);
            d = Math.min(c, Math.round(d / 20 * b.opt.scrollspeed));
            return 20 < d ? d : 0;
        };
        b.opt.smoothscroll ? b.ishwscroll && g.hastransition && b.opt.usetransition ? (this.prepareTransition = function(d, c) {
            var f = c ? 20 < d ? d : 0 : b.getTransitionSpeed(d), e = f ? g.prefixstyle + "transform " + f + "ms ease-out" : "";
            if (!b.lasttransitionstyle || b.lasttransitionstyle != e) b.lasttransitionstyle = e, 
            b.doc.css(g.transitionstyle, e);
            return f;
        }, this.doScrollLeft = function(c, g) {
            var f = b.scrollrunning ? b.newscrolly : b.getScrollTop();
            b.doScrollPos(c, f, g);
        }, this.doScrollTop = function(c, g) {
            var f = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
            b.doScrollPos(f, c, g);
        }, this.doScrollPos = function(c, e, f) {
            var k = b.getScrollTop(), l = b.getScrollLeft();
            (0 > (b.newscrolly - k) * (e - k) || 0 > (b.newscrollx - l) * (c - l)) && b.cancelScroll();
            !1 == b.opt.bouncescroll && (0 > e ? e = 0 : e > b.page.maxh && (e = b.page.maxh), 
            0 > c ? c = 0 : c > b.page.maxw && (c = b.page.maxw));
            if (b.scrollrunning && c == b.newscrollx && e == b.newscrolly) return !1;
            b.newscrolly = e;
            b.newscrollx = c;
            b.newscrollspeed = f || !1;
            if (b.timer) return !1;
            b.timer = setTimeout(function() {
                var f = b.getScrollTop(), k = b.getScrollLeft(), l, h;
                l = c - k;
                h = e - f;
                l = Math.round(Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2)));
                l = b.newscrollspeed && 1 < b.newscrollspeed ? b.newscrollspeed : b.getTransitionSpeed(l);
                b.newscrollspeed && 1 >= b.newscrollspeed && (l *= b.newscrollspeed);
                b.prepareTransition(l, !0);
                b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
                0 < l && (!b.scrollrunning && b.onscrollstart && b.onscrollstart.call(b, {
                    type: "scrollstart",
                    current: {
                        x: k,
                        y: f
                    },
                    request: {
                        x: c,
                        y: e
                    },
                    end: {
                        x: b.newscrollx,
                        y: b.newscrolly
                    },
                    speed: l
                }), g.transitionend ? b.scrollendtrapped || (b.scrollendtrapped = !0, b.bind(b.doc, g.transitionend, b.onScrollEnd, !1)) : (b.scrollendtrapped && clearTimeout(b.scrollendtrapped), 
                b.scrollendtrapped = setTimeout(b.onScrollEnd, l)), b.timerscroll = {
                    bz: new BezierClass(f, b.newscrolly, l, 0, 0, .58, 1),
                    bh: new BezierClass(k, b.newscrollx, l, 0, 0, .58, 1)
                }, b.cursorfreezed || (b.timerscroll.tm = setInterval(function() {
                    b.showCursor(b.getScrollTop(), b.getScrollLeft());
                }, 60)));
                b.synched("doScroll-set", function() {
                    b.timer = 0;
                    b.scrollendtrapped && (b.scrollrunning = !0);
                    b.setScrollTop(b.newscrolly);
                    b.setScrollLeft(b.newscrollx);
                    if (!b.scrollendtrapped) b.onScrollEnd();
                });
            }, 50);
        }, this.cancelScroll = function() {
            if (!b.scrollendtrapped) return !0;
            var c = b.getScrollTop(), e = b.getScrollLeft();
            b.scrollrunning = !1;
            g.transitionend || clearTimeout(g.transitionend);
            b.scrollendtrapped = !1;
            b._unbind(b.doc, g.transitionend, b.onScrollEnd);
            b.prepareTransition(0);
            b.setScrollTop(c);
            b.railh && b.setScrollLeft(e);
            b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
            b.timerscroll = !1;
            b.cursorfreezed = !1;
            b.showCursor(c, e);
            return b;
        }, this.onScrollEnd = function() {
            b.scrollendtrapped && b._unbind(b.doc, g.transitionend, b.onScrollEnd);
            b.scrollendtrapped = !1;
            b.prepareTransition(0);
            b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
            b.timerscroll = !1;
            var c = b.getScrollTop(), e = b.getScrollLeft();
            b.setScrollTop(c);
            b.railh && b.setScrollLeft(e);
            b.noticeCursor(!1, c, e);
            b.cursorfreezed = !1;
            0 > c ? c = 0 : c > b.page.maxh && (c = b.page.maxh);
            0 > e ? e = 0 : e > b.page.maxw && (e = b.page.maxw);
            if (c != b.newscrolly || e != b.newscrollx) return b.doScrollPos(e, c, b.opt.snapbackspeed);
            b.onscrollend && b.scrollrunning && b.onscrollend.call(b, {
                type: "scrollend",
                current: {
                    x: e,
                    y: c
                },
                end: {
                    x: b.newscrollx,
                    y: b.newscrolly
                }
            });
            b.scrollrunning = !1;
        }) : (this.doScrollLeft = function(c, g) {
            var f = b.scrollrunning ? b.newscrolly : b.getScrollTop();
            b.doScrollPos(c, f, g);
        }, this.doScrollTop = function(c, g) {
            var f = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
            b.doScrollPos(f, c, g);
        }, this.doScrollPos = function(c, g, f) {
            function e() {
                if (b.cancelAnimationFrame) return !0;
                b.scrollrunning = !0;
                if (p = 1 - p) return b.timer = v(e) || 1;
                var c = 0, d = sy = b.getScrollTop();
                if (b.dst.ay) {
                    var d = b.bzscroll ? b.dst.py + b.bzscroll.getNow() * b.dst.ay : b.newscrolly, f = d - sy;
                    if (0 > f && d < b.newscrolly || 0 < f && d > b.newscrolly) d = b.newscrolly;
                    b.setScrollTop(d);
                    d == b.newscrolly && (c = 1);
                } else c = 1;
                var g = sx = b.getScrollLeft();
                if (b.dst.ax) {
                    g = b.bzscroll ? b.dst.px + b.bzscroll.getNow() * b.dst.ax : b.newscrollx;
                    f = g - sx;
                    if (0 > f && g < b.newscrollx || 0 < f && g > b.newscrollx) g = b.newscrollx;
                    b.setScrollLeft(g);
                    g == b.newscrollx && (c += 1);
                } else c += 1;
                2 == c ? (b.timer = 0, b.cursorfreezed = !1, b.bzscroll = !1, b.scrollrunning = !1, 
                0 > d ? d = 0 : d > b.page.maxh && (d = b.page.maxh), 0 > g ? g = 0 : g > b.page.maxw && (g = b.page.maxw), 
                g != b.newscrollx || d != b.newscrolly ? b.doScrollPos(g, d) : b.onscrollend && b.onscrollend.call(b, {
                    type: "scrollend",
                    current: {
                        x: sx,
                        y: sy
                    },
                    end: {
                        x: b.newscrollx,
                        y: b.newscrolly
                    }
                })) : b.timer = v(e) || 1;
            }
            g = "undefined" == typeof g || !1 === g ? b.getScrollTop(!0) : g;
            if (b.timer && b.newscrolly == g && b.newscrollx == c) return !0;
            b.timer && w(b.timer);
            b.timer = 0;
            var k = b.getScrollTop(), l = b.getScrollLeft();
            (0 > (b.newscrolly - k) * (g - k) || 0 > (b.newscrollx - l) * (c - l)) && b.cancelScroll();
            b.newscrolly = g;
            b.newscrollx = c;
            if (!b.bouncescroll || !b.rail.visibility) 0 > b.newscrolly ? b.newscrolly = 0 : b.newscrolly > b.page.maxh && (b.newscrolly = b.page.maxh);
            if (!b.bouncescroll || !b.railh.visibility) 0 > b.newscrollx ? b.newscrollx = 0 : b.newscrollx > b.page.maxw && (b.newscrollx = b.page.maxw);
            b.dst = {};
            b.dst.x = c - l;
            b.dst.y = g - k;
            b.dst.px = l;
            b.dst.py = k;
            var h = Math.round(Math.sqrt(Math.pow(b.dst.x, 2) + Math.pow(b.dst.y, 2)));
            b.dst.ax = b.dst.x / h;
            b.dst.ay = b.dst.y / h;
            var m = 0, q = h;
            0 == b.dst.x ? (m = k, q = g, b.dst.ay = 1, b.dst.py = 0) : 0 == b.dst.y && (m = l, 
            q = c, b.dst.ax = 1, b.dst.px = 0);
            h = b.getTransitionSpeed(h);
            f && 1 >= f && (h *= f);
            b.bzscroll = 0 < h ? b.bzscroll ? b.bzscroll.update(q, h) : new BezierClass(m, q, h, 0, 1, 0, 1) : !1;
            if (!b.timer) {
                (k == b.page.maxh && g >= b.page.maxh || l == b.page.maxw && c >= b.page.maxw) && b.checkContentSize();
                var p = 1;
                b.cancelAnimationFrame = !1;
                b.timer = 1;
                b.onscrollstart && !b.scrollrunning && b.onscrollstart.call(b, {
                    type: "scrollstart",
                    current: {
                        x: l,
                        y: k
                    },
                    request: {
                        x: c,
                        y: g
                    },
                    end: {
                        x: b.newscrollx,
                        y: b.newscrolly
                    },
                    speed: h
                });
                e();
                (k == b.page.maxh && g >= k || l == b.page.maxw && c >= l) && b.checkContentSize();
                b.noticeCursor();
            }
        }, this.cancelScroll = function() {
            b.timer && w(b.timer);
            b.timer = 0;
            b.bzscroll = !1;
            b.scrollrunning = !1;
            return b;
        }) : (this.doScrollLeft = function(c, g) {
            var f = b.getScrollTop();
            b.doScrollPos(c, f, g);
        }, this.doScrollTop = function(c, g) {
            var f = b.getScrollLeft();
            b.doScrollPos(f, c, g);
        }, this.doScrollPos = function(c, g, f) {
            var e = c > b.page.maxw ? b.page.maxw : c;
            0 > e && (e = 0);
            var k = g > b.page.maxh ? b.page.maxh : g;
            0 > k && (k = 0);
            b.synched("scroll", function() {
                b.setScrollTop(k);
                b.setScrollLeft(e);
            });
        }, this.cancelScroll = function() {});
        this.doScrollBy = function(c, g) {
            var f = 0, f = g ? Math.floor((b.scroll.y - c) * b.scrollratio.y) : (b.timer ? b.newscrolly : b.getScrollTop(!0)) - c;
            if (b.bouncescroll) {
                var e = Math.round(b.view.h / 2);
                f < -e ? f = -e : f > b.page.maxh + e && (f = b.page.maxh + e);
            }
            b.cursorfreezed = !1;
            py = b.getScrollTop(!0);
            if (0 > f && 0 >= py) return b.noticeCursor();
            if (f > b.page.maxh && py >= b.page.maxh) return b.checkContentSize(), b.noticeCursor();
            b.doScrollTop(f);
        };
        this.doScrollLeftBy = function(c, g) {
            var f = 0, f = g ? Math.floor((b.scroll.x - c) * b.scrollratio.x) : (b.timer ? b.newscrollx : b.getScrollLeft(!0)) - c;
            if (b.bouncescroll) {
                var e = Math.round(b.view.w / 2);
                f < -e ? f = -e : f > b.page.maxw + e && (f = b.page.maxw + e);
            }
            b.cursorfreezed = !1;
            px = b.getScrollLeft(!0);
            if (0 > f && 0 >= px || f > b.page.maxw && px >= b.page.maxw) return b.noticeCursor();
            b.doScrollLeft(f);
        };
        this.doScrollTo = function(c, g) {
            g && Math.round(c * b.scrollratio.y);
            b.cursorfreezed = !1;
            b.doScrollTop(c);
        };
        this.checkContentSize = function() {
            var c = b.getContentSize();
            (c.h != b.page.h || c.w != b.page.w) && b.resize(!1, c);
        };
        b.onscroll = function(c) {
            b.rail.drag || b.cursorfreezed || b.synched("scroll", function() {
                b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
                b.railh && (b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x)));
                b.noticeCursor();
            });
        };
        b.bind(b.docscroll, "scroll", b.onscroll);
        this.doZoomIn = function(c) {
            if (!b.zoomactive) {
                b.zoomactive = !0;
                b.zoomrestore = {
                    style: {}
                };
                var k = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "), f = b.win[0].style, l;
                for (l in k) {
                    var h = k[l];
                    b.zoomrestore.style[h] = "undefined" != typeof f[h] ? f[h] : "";
                }
                b.zoomrestore.style.width = b.win.css("width");
                b.zoomrestore.style.height = b.win.css("height");
                b.zoomrestore.padding = {
                    w: b.win.outerWidth() - b.win.width(),
                    h: b.win.outerHeight() - b.win.height()
                };
                g.isios4 && (b.zoomrestore.scrollTop = e(window).scrollTop(), e(window).scrollTop(0));
                b.win.css({
                    position: g.isios4 ? "absolute" : "fixed",
                    top: 0,
                    left: 0,
                    "z-index": y + 100,
                    margin: "0px"
                });
                k = b.win.css("backgroundColor");
                ("" == k || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(k)) && b.win.css("backgroundColor", "#fff");
                b.rail.css({
                    "z-index": y + 101
                });
                b.zoom.css({
                    "z-index": y + 102
                });
                b.zoom.css("backgroundPosition", "0px -18px");
                b.resizeZoom();
                b.onzoomin && b.onzoomin.call(b);
                return b.cancelEvent(c);
            }
        };
        this.doZoomOut = function(c) {
            if (b.zoomactive) return b.zoomactive = !1, b.win.css("margin", ""), b.win.css(b.zoomrestore.style), 
            g.isios4 && e(window).scrollTop(b.zoomrestore.scrollTop), b.rail.css({
                "z-index": b.zindex
            }), b.zoom.css({
                "z-index": b.zindex
            }), b.zoomrestore = !1, b.zoom.css("backgroundPosition", "0px 0px"), b.onResize(), 
            b.onzoomout && b.onzoomout.call(b), b.cancelEvent(c);
        };
        this.doZoom = function(c) {
            return b.zoomactive ? b.doZoomOut(c) : b.doZoomIn(c);
        };
        this.resizeZoom = function() {
            if (b.zoomactive) {
                var c = b.getScrollTop();
                b.win.css({
                    width: e(window).width() - b.zoomrestore.padding.w + "px",
                    height: e(window).height() - b.zoomrestore.padding.h + "px"
                });
                b.onResize();
                b.setScrollTop(Math.min(b.page.maxh, c));
            }
        };
        this.init();
        e.nicescroll.push(this);
    }, J = function(e) {
        var c = this;
        this.nc = e;
        this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;
        this.snapy = this.snapx = !1;
        this.demuly = this.demulx = 0;
        this.lastscrolly = this.lastscrollx = -1;
        this.timer = this.chky = this.chkx = 0;
        this.time = function() {
            return +new Date();
        };
        this.reset = function(e, l) {
            c.stop();
            var h = c.time();
            c.steptime = 0;
            c.lasttime = h;
            c.speedx = 0;
            c.speedy = 0;
            c.lastx = e;
            c.lasty = l;
            c.lastscrollx = -1;
            c.lastscrolly = -1;
        };
        this.update = function(e, l) {
            var h = c.time();
            c.steptime = h - c.lasttime;
            c.lasttime = h;
            var h = l - c.lasty, t = e - c.lastx, b = c.nc.getScrollTop(), p = c.nc.getScrollLeft(), b = b + h, p = p + t;
            c.snapx = 0 > p || p > c.nc.page.maxw;
            c.snapy = 0 > b || b > c.nc.page.maxh;
            c.speedx = t;
            c.speedy = h;
            c.lastx = e;
            c.lasty = l;
        };
        this.stop = function() {
            c.nc.unsynched("domomentum2d");
            c.timer && clearTimeout(c.timer);
            c.timer = 0;
            c.lastscrollx = -1;
            c.lastscrolly = -1;
        };
        this.doSnapy = function(e, l) {
            var h = !1;
            0 > l ? (l = 0, h = !0) : l > c.nc.page.maxh && (l = c.nc.page.maxh, h = !0);
            0 > e ? (e = 0, h = !0) : e > c.nc.page.maxw && (e = c.nc.page.maxw, h = !0);
            h && c.nc.doScrollPos(e, l, c.nc.opt.snapbackspeed);
        };
        this.doMomentum = function(e) {
            var l = c.time(), h = e ? l + e : c.lasttime;
            e = c.nc.getScrollLeft();
            var t = c.nc.getScrollTop(), b = c.nc.page.maxh, p = c.nc.page.maxw;
            c.speedx = 0 < p ? Math.min(60, c.speedx) : 0;
            c.speedy = 0 < b ? Math.min(60, c.speedy) : 0;
            h = h && 60 >= l - h;
            if (0 > t || t > b || 0 > e || e > p) h = !1;
            e = c.speedx && h ? c.speedx : !1;
            if (c.speedy && h && c.speedy || e) {
                var g = Math.max(16, c.steptime);
                50 < g && (e = g / 50, c.speedx *= e, c.speedy *= e, g = 50);
                c.demulxy = 0;
                c.lastscrollx = c.nc.getScrollLeft();
                c.chkx = c.lastscrollx;
                c.lastscrolly = c.nc.getScrollTop();
                c.chky = c.lastscrolly;
                var s = c.lastscrollx, u = c.lastscrolly, d = function() {
                    var e = 600 < c.time() - l ? .04 : .02;
                    if (c.speedx && (s = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy)), c.lastscrollx = s, 
                    0 > s || s > p)) e = .1;
                    if (c.speedy && (u = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy)), c.lastscrolly = u, 
                    0 > u || u > b)) e = .1;
                    c.demulxy = Math.min(1, c.demulxy + e);
                    c.nc.synched("domomentum2d", function() {
                        c.speedx && (c.nc.getScrollLeft() != c.chkx && c.stop(), c.chkx = s, c.nc.setScrollLeft(s));
                        c.speedy && (c.nc.getScrollTop() != c.chky && c.stop(), c.chky = u, c.nc.setScrollTop(u));
                        c.timer || (c.nc.hideCursor(), c.doSnapy(s, u));
                    });
                    1 > c.demulxy ? c.timer = setTimeout(d, g) : (c.stop(), c.nc.hideCursor(), c.doSnapy(s, u));
                };
                d();
            } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop());
        };
    }, B = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function(h, c, k) {
            return (c = e.data(h, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollTop() : B.call(h);
        },
        set: function(h, c) {
            var k = e.data(h, "__nicescroll") || !1;
            k && k.ishwscroll ? k.setScrollTop(parseInt(c)) : B.call(h, c);
            return this;
        }
    };
    e.fn.scrollTop = function(h) {
        if ("undefined" == typeof h) {
            var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollTop() : B.call(this);
        }
        return this.each(function() {
            var c = e.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollTop(parseInt(h)) : B.call(e(this), h);
        });
    };
    var C = e.fn.scrollLeft;
    e.cssHooks.pageXOffset = {
        get: function(h, c, k) {
            return (c = e.data(h, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollLeft() : C.call(h);
        },
        set: function(h, c) {
            var k = e.data(h, "__nicescroll") || !1;
            k && k.ishwscroll ? k.setScrollLeft(parseInt(c)) : C.call(h, c);
            return this;
        }
    };
    e.fn.scrollLeft = function(h) {
        if ("undefined" == typeof h) {
            var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollLeft() : C.call(this);
        }
        return this.each(function() {
            var c = e.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollLeft(parseInt(h)) : C.call(e(this), h);
        });
    };
    var D = function(h) {
        var c = this;
        this.length = 0;
        this.name = "nicescrollarray";
        this.each = function(e) {
            for (var h = 0, k = 0; h < c.length; h++) e.call(c[h], k++);
            return c;
        };
        this.push = function(e) {
            c[c.length] = e;
            c.length++;
        };
        this.eq = function(e) {
            return c[e];
        };
        if (h) for (a = 0; a < h.length; a++) {
            var k = e.data(h[a], "__nicescroll") || !1;
            k && (this[this.length] = k, this.length++);
        }
        return this;
    };
    (function(e, c, k) {
        for (var l = 0; l < c.length; l++) k(e, c[l]);
    })(D.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function(e, c) {
        e[c] = function() {
            var e = arguments;
            return this.each(function() {
                this[c].apply(this, e);
            });
        };
    });
    e.fn.getNiceScroll = function(h) {
        return "undefined" == typeof h ? new D(this) : this[h] && e.data(this[h], "__nicescroll") || !1;
    };
    e.extend(e.expr[":"], {
        nicescroll: function(h) {
            return e.data(h, "__nicescroll") ? !0 : !1;
        }
    });
    e.fn.niceScroll = function(h, c) {
        "undefined" == typeof c && ("object" == typeof h && !("jquery" in h)) && (c = h, 
        h = !1);
        var k = new D();
        "undefined" == typeof c && (c = {});
        h && (c.doc = e(h), c.win = e(this));
        var l = !("doc" in c);
        !l && !("win" in c) && (c.win = e(this));
        this.each(function() {
            var h = e(this).data("__nicescroll") || !1;
            h || (c.doc = l ? e(this) : c.doc, h = new Q(c, e(this)), e(this).data("__nicescroll", h));
            k.push(h);
        });
        return 1 == k.length ? k[0] : k;
    };
    window.NiceScroll = {
        getjQuery: function() {
            return e;
        }
    };
    e.nicescroll || (e.nicescroll = new D(), e.nicescroll.options = I);
})(jQuery);

(function($) {
    var h = $.scrollTo = function(a, b, c) {
        $(window).scrollTo(a, b, c);
    };
    h.defaults = {
        axis: "xy",
        duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    h.window = function(a) {
        return $(window)._scrollable();
    };
    $.fn._scrollable = function() {
        return this.map(function() {
            var a = this, isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]) != -1;
            if (!isWin) return a;
            var b = (a.contentWindow || a).document || a.ownerDocument || a;
            return /webkit/i.test(navigator.userAgent) || b.compatMode == "BackCompat" ? b.body : b.documentElement;
        });
    };
    $.fn.scrollTo = function(e, f, g) {
        if (typeof f == "object") {
            g = f;
            f = 0;
        }
        if (typeof g == "function") g = {
            onAfter: g
        };
        if (e == "max") e = 9e9;
        g = $.extend({}, h.defaults, g);
        f = f || g.duration;
        g.queue = g.queue && g.axis.length > 1;
        if (g.queue) f /= 2;
        g.offset = both(g.offset);
        g.over = both(g.over);
        return this._scrollable().each(function() {
            if (e == null) return;
            var d = this, $elem = $(d), targ = e, toff, attr = {}, win = $elem.is("html,body");
            switch (typeof targ) {
              case "number":
              case "string":
                if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                    targ = both(targ);
                    break;
                }
                targ = $(targ, this);
                if (!targ.length) return;

              case "object":
                if (targ.is || targ.style) toff = (targ = $(targ)).offset();
            }
            $.each(g.axis.split(""), function(i, a) {
                var b = a == "x" ? "Left" : "Top", pos = b.toLowerCase(), key = "scroll" + b, old = d[key], max = h.max(d, a);
                if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                    if (g.margin) {
                        attr[key] -= parseInt(targ.css("margin" + b)) || 0;
                        attr[key] -= parseInt(targ.css("border" + b + "Width")) || 0;
                    }
                    attr[key] += g.offset[pos] || 0;
                    if (g.over[pos]) attr[key] += targ[a == "x" ? "width" : "height"]() * g.over[pos];
                } else {
                    var c = targ[pos];
                    attr[key] = c.slice && c.slice(-1) == "%" ? parseFloat(c) / 100 * max : c;
                }
                if (g.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                if (!i && g.queue) {
                    if (old != attr[key]) animate(g.onAfterFirst);
                    delete attr[key];
                }
            });
            animate(g.onAfter);
            function animate(a) {
                $elem.animate(attr, f, g.easing, a && function() {
                    a.call(this, targ, g);
                });
            }
        }).end();
    };
    h.max = function(a, b) {
        var c = b == "x" ? "Width" : "Height", scroll = "scroll" + c;
        if (!$(a).is("html,body")) return a[scroll] - $(a)[c.toLowerCase()]();
        var d = "client" + c, html = a.ownerDocument.documentElement, body = a.ownerDocument.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d]);
    };
    function both(a) {
        return typeof a == "object" ? a : {
            top: a,
            left: a
        };
    }
})(jQuery);

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.18 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */
var requirejs, require, define;

(function(global) {
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.18", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !!(typeof window !== "undefined" && typeof navigator !== "undefined" && window.document), isWebWorker = !isBrowser && typeof importScripts !== "undefined", //PS3 indicates loaded and complete, but need to wait for complete
    //specifically. Sequence is 'loading', 'loaded', execution,
    // then 'complete'. The UA check is unfortunate, but not sure how
    //to feature test w/o causing perf issues.
    readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
    isOpera = typeof opera !== "undefined" && opera.toString() === "[object Opera]", contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = false;
    function isFunction(it) {
        return ostring.call(it) === "[object Function]";
    }
    function isArray(it) {
        return ostring.call(it) === "[object Array]";
    }
    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }
    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }
    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }
    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }
    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }
    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function(value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === "object" && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {
                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }
    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function() {
            return fn.apply(obj, arguments);
        };
    }
    function scripts() {
        return document.getElementsByTagName("script");
    }
    function defaultOnError(err) {
        throw err;
    }
    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split("."), function(part) {
            g = g[part];
        });
        return g;
    }
    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + "\nhttp://requirejs.org/docs/errors.html#" + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }
    if (typeof define !== "undefined") {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }
    if (typeof requirejs !== "undefined") {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }
    //Allow for a require config object
    if (typeof require !== "undefined" && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }
    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = {
            //Defaults. Do not set a default for map
            //config to speed up normalize(), which
            //will run faster if there is no default.
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        }, registry = {}, //registry of just enabled modules, to speed
        //cycle breaking code when lots of modules
        //are registered, but not activated.
        enabledRegistry = {}, undefEvents = {}, defQueue = [], defined = {}, urlFetched = {}, bundlesMap = {}, requireCounter = 1, unnormalizedCounter = 1;
        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === ".") {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === "..") {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || i === 1 && ary[2] === ".." || ary[i - 1] === "..") {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }
        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex, foundMap, foundI, foundStarMap, starI, normalizedBaseParts, baseParts = baseName && baseName.split("/"), map = config.map, starMap = map && map["*"];
            //Adjust any relative paths.
            if (name) {
                name = name.split("/");
                lastIndex = name.length - 1;
                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, "");
                }
                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === "." && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }
                trimDots(name);
                name = name.join("/");
            }
            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split("/");
                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join("/");
                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join("/"));
                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }
                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }
                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }
                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join("/");
                }
            }
            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);
            return pkgMain ? pkgMain : name;
        }
        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function(scriptNode) {
                    if (scriptNode.getAttribute("data-requiremodule") === name && scriptNode.getAttribute("data-requirecontext") === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }
        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);
                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([ id ]);
                return true;
            }
        }
        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix, index = name ? name.indexOf("!") : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [ prefix, name ];
        }
        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts, prefix = null, parentName = parentModuleMap ? parentModuleMap.name : null, originalName = name, isDefine = true, normalizedName = "";
            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = "_@r" + (requireCounter += 1);
            }
            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];
            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }
            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function(name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf("!") === -1 ? normalize(name, parentName, applyMap) : name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);
                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;
                    url = context.nameToUrl(normalizedName);
                }
            }
            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ? "_unnormalized" + (unnormalizedCounter += 1) : "";
            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix
            };
        }
        function getModule(depMap) {
            var id = depMap.id, mod = getOwn(registry, id);
            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }
            return mod;
        }
        function on(depMap, name, fn) {
            var id = depMap.id, mod = getOwn(registry, id);
            if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) {
                if (name === "defined") {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === "error") {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }
        function onError(err, errback) {
            var ids = err.requireModules, notified = false;
            if (errback) {
                errback(err);
            } else {
                each(ids, function(id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit("error", err);
                        }
                    }
                });
                if (!notified) {
                    req.onError(err);
                }
            }
        }
        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                //Array splice in the values since the context code has a
                //local var ref to defQueue, so cannot just reassign the one
                //on context.
                apsp.apply(defQueue, [ defQueue.length, 0 ].concat(globalDefQueue));
                globalDefQueue = [];
            }
        }
        handlers = {
            require: function(mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return mod.require = context.makeRequire(mod.map);
                }
            },
            exports: function(mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return defined[mod.map.id] = mod.exports;
                    } else {
                        return mod.exports = defined[mod.map.id] = {};
                    }
                }
            },
            module: function(mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function() {
                            return getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    };
                }
            }
        };
        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }
        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;
            if (mod.error) {
                mod.emit("error", mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function(depMap, i) {
                    var depId = depMap.id, dep = getOwn(registry, depId);
                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check();
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }
        function checkLoaded() {
            var err, usingPathFallback, waitInterval = config.waitSeconds * 1e3, //It is possible to disable the wait interval by using waitSeconds of 0.
            expired = waitInterval && context.startTime + waitInterval < new Date().getTime(), noLoads = [], reqCalls = [], stillLoading = false, needCycleCheck = true;
            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }
            inCheckLoaded = true;
            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function(mod) {
                var map = mod.map, modId = map.id;
                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }
                if (!map.isDefine) {
                    reqCalls.push(mod);
                }
                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return needCycleCheck = false;
                        }
                    }
                }
            });
            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError("timeout", "Load timeout for modules: " + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }
            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function(mod) {
                    breakCycle(mod, {}, {});
                });
            }
            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function() {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }
            inCheckLoaded = false;
        }
        Module = function(map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;
        };
        Module.prototype = {
            init: function(depMaps, factory, errback, options) {
                options = options || {};
                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }
                this.factory = factory;
                if (errback) {
                    //Register for errors on this module.
                    this.on("error", errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function(err) {
                        this.emit("error", err);
                    });
                }
                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);
                this.errback = errback;
                //Indicate this module has be initialized
                this.inited = true;
                this.ignore = options.ignore;
                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },
            defineDep: function(i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },
            fetch: function() {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;
                context.startTime = new Date().getTime();
                var map = this.map;
                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function() {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },
            load: function() {
                var url = this.map.url;
                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },
            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function() {
                if (!this.enabled || this.enabling) {
                    return;
                }
                var err, cjsModule, id = this.map.id, depExports = this.depExports, exports = this.exports, factory = this.factory;
                if (!this.inited) {
                    this.fetch();
                } else if (this.error) {
                    this.emit("error", this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;
                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }
                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }
                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [ this.map.id ] : null;
                                err.requireType = this.map.isDefine ? "define" : "require";
                                return onError(this.error = err);
                            }
                        } else {
                            //Just a literal value
                            exports = factory;
                        }
                        this.exports = exports;
                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;
                            if (req.onResourceLoad) {
                                req.onResourceLoad(context, this.map, this.depMaps);
                            }
                        }
                        //Clean up
                        cleanRegistry(id);
                        this.defined = true;
                    }
                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;
                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit("defined", this.exports);
                        this.defineEmitComplete = true;
                    }
                }
            },
            callPlugin: function() {
                var map = this.map, id = map.id, //Map already normalized the prefix.
                pluginMap = makeModuleMap(map.prefix);
                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);
                on(pluginMap, "defined", bind(this, function(plugin) {
                    var load, normalizedMap, normalizedMod, bundleId = getOwn(bundlesMap, this.map.id), name = this.map.name, parentName = this.map.parentMap ? this.map.parentMap.name : null, localRequire = context.makeRequire(map.parentMap, {
                        enableBuildCallback: true
                    });
                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function(name) {
                                return normalize(name, parentName, true);
                            }) || "";
                        }
                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + "!" + name, this.map.parentMap);
                        on(normalizedMap, "defined", bind(this, function(value) {
                            this.init([], function() {
                                return value;
                            }, null, {
                                enabled: true,
                                ignore: true
                            });
                        }));
                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);
                            if (this.events.error) {
                                normalizedMod.on("error", bind(this, function(err) {
                                    this.emit("error", err);
                                }));
                            }
                            normalizedMod.enable();
                        }
                        return;
                    }
                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }
                    load = bind(this, function(value) {
                        this.init([], function() {
                            return value;
                        }, null, {
                            enabled: true
                        });
                    });
                    load.error = bind(this, function(err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [ id ];
                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function(mod) {
                            if (mod.map.id.indexOf(id + "_unnormalized") === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });
                        onError(err);
                    });
                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function(text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name, moduleMap = makeModuleMap(moduleName), hasInteractive = useInteractive;
                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }
                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }
                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);
                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }
                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError("fromtexteval", "fromText eval for " + id + " failed: " + e, e, [ id ]));
                        }
                        if (hasInteractive) {
                            useInteractive = true;
                        }
                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);
                        //Support anonymous modules.
                        context.completeLoad(moduleName);
                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([ moduleName ], load);
                    });
                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));
                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },
            enable: function() {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;
                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;
                //Enable each dependency
                each(this.depMaps, bind(this, function(depMap, i) {
                    var id, mod, handler;
                    if (typeof depMap === "string") {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap, this.map.isDefine ? this.map : this.map.parentMap, false, !this.skipMap);
                        this.depMaps[i] = depMap;
                        handler = getOwn(handlers, depMap.id);
                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }
                        this.depCount += 1;
                        on(depMap, "defined", bind(this, function(depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));
                        if (this.errback) {
                            on(depMap, "error", bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, "error", bind(this, function(err) {
                                this.emit("error", err);
                            }));
                        }
                    }
                    id = depMap.id;
                    mod = registry[id];
                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));
                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function(pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));
                this.enabling = false;
                this.check();
            },
            on: function(name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },
            emit: function(name, evt) {
                each(this.events[name], function(cb) {
                    cb(evt);
                });
                if (name === "error") {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };
        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }
        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }
        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;
            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, "load", "onreadystatechange");
            removeListener(node, context.onScriptError, "error");
            return {
                node: node,
                id: node && node.getAttribute("data-requiremodule")
            };
        }
        function intakeDefines() {
            var args;
            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();
            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError("mismatch", "Mismatched anonymous define() module: " + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
        }
        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,
            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function(cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== "/") {
                        cfg.baseUrl += "/";
                    }
                }
                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim, objs = {
                    paths: true,
                    bundles: true,
                    config: true,
                    map: true
                };
                eachProp(cfg, function(value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });
                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function(value, prop) {
                        each(value, function(v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }
                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function(value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }
                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function(pkgObj) {
                        var location, name;
                        pkgObj = typeof pkgObj === "string" ? {
                            name: pkgObj
                        } : pkgObj;
                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }
                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + "/" + (pkgObj.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "");
                    });
                }
                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function(mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });
                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },
            makeShimExports: function(value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || value.exports && getGlobal(value.exports);
                }
                return fn;
            },
            makeRequire: function(relMap, options) {
                options = options || {};
                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;
                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }
                    if (typeof deps === "string") {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError("requireargs", "Invalid require call"), errback);
                        }
                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }
                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }
                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;
                        if (!hasProp(defined, id)) {
                            return onError(makeError("notloaded", 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? "" : ". Use require([])")));
                        }
                        return defined[id];
                    }
                    //Grab defines waiting in the global queue.
                    intakeDefines();
                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function() {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();
                        requireMod = getModule(makeModuleMap(null, relMap));
                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;
                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });
                        checkLoaded();
                    });
                    return localRequire;
                }
                mixin(localRequire, {
                    isBrowser: isBrowser,
                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function(moduleNamePlusExt) {
                        var ext, index = moduleNamePlusExt.lastIndexOf("."), segment = moduleNamePlusExt.split("/")[0], isRelative = segment === "." || segment === "..";
                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }
                        return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true);
                    },
                    defined: function(id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },
                    specified: function(id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });
                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function(id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();
                        var map = makeModuleMap(id, relMap, true), mod = getOwn(registry, id);
                        mod.undefed = true;
                        removeScript(id);
                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];
                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }
                            cleanRegistry(id);
                        }
                    };
                }
                return localRequire;
            },
            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function(depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },
            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function(moduleName) {
                var found, args, mod, shim = getOwn(config.shim, moduleName) || {}, shExports = shim.exports;
                takeGlobalQueue();
                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }
                    callGetModule(args);
                }
                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);
                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError("nodefine", "No define call for " + moduleName, null, [ moduleName ]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([ moduleName, shim.deps || [], shim.exportsFn ]);
                    }
                }
                checkLoaded();
            },
            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function(moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url, parentPath, bundleId, pkgMain = getOwn(config.pkgs, moduleName);
                if (pkgMain) {
                    moduleName = pkgMain;
                }
                bundleId = getOwn(bundlesMap, moduleName);
                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }
                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || "");
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;
                    syms = moduleName.split("/");
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join("/");
                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }
                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join("/");
                    url += ext || (/^data\:|\?/.test(url) || skipExt ? "" : ".js");
                    url = (url.charAt(0) === "/" || url.match(/^[\w\+\.\-]+:/) ? "" : config.baseUrl) + url;
                }
                return config.urlArgs ? url + ((url.indexOf("?") === -1 ? "?" : "&") + config.urlArgs) : url;
            },
            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function(id, url) {
                req.load(context, id, url);
            },
            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function(name, callback, args, exports) {
                return callback.apply(exports, args);
            },
            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function(evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === "load" || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;
                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },
            /**
             * Callback for script errors.
             */
            onScriptError: function(evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError("scripterror", "Script error for: " + data.id, evt, [ data.id ]));
                }
            }
        };
        context.require = context.makeRequire();
        return context;
    }
    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function(deps, callback, errback, optional) {
        //Find the right context, use default
        var context, config, contextName = defContextName;
        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== "string") {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }
        if (config && config.context) {
            contextName = config.context;
        }
        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }
        if (config) {
            context.configure(config);
        }
        return context.require(deps, callback, errback);
    };
    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function(config) {
        return req(config);
    };
    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== "undefined" ? function(fn) {
        setTimeout(fn, 4);
    } : function(fn) {
        fn();
    };
    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }
    req.version = version;
    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };
    //Create default context.
    req({});
    //Exports some context-sensitive methods on global require.
    each([ "toUrl", "undef", "defined", "specified" ], function(prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function() {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });
    if (isBrowser) {
        head = s.head = document.getElementsByTagName("head")[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName("base")[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }
    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;
    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function(config, moduleName, url) {
        var node = config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        node.type = config.scriptType || "text/javascript";
        node.charset = "utf-8";
        node.async = true;
        return node;
    };
    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function(context, moduleName, url) {
        var config = context && context.config || {}, node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);
            node.setAttribute("data-requirecontext", context.contextName);
            node.setAttribute("data-requiremodule", moduleName);
            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent && //Check if node.attachEvent is artificially added by custom script or
            //natively supported by browser
            //read https://github.com/jrburke/requirejs/issues/187
            //if we can NOT find [native code] then it must NOT natively supported.
            //in IE8, node.attachEvent does not have toString()
            //Note the test for "[native code" with no closing brace, see:
            //https://github.com/jrburke/requirejs/issues/273
            !(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0) && !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;
                node.attachEvent("onreadystatechange", context.onScriptLoad);
            } else {
                node.addEventListener("load", context.onScriptLoad, false);
                node.addEventListener("error", context.onScriptError, false);
            }
            node.src = url;
            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;
            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation that a build has been done so that
                //only one script needs to be loaded anyway. This may need to be
                //reevaluated if other use cases become common.
                importScripts(url);
                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError("importscripts", "importScripts failed for " + moduleName + " at " + url, e, [ moduleName ]));
            }
        }
    };
    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === "interactive") {
            return interactiveScript;
        }
        eachReverse(scripts(), function(script) {
            if (script.readyState === "interactive") {
                return interactiveScript = script;
            }
        });
        return interactiveScript;
    }
    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function(script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }
            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute("data-main");
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;
                //Set final baseUrl if there is not already an explicit one.
                if (!cfg.baseUrl) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split("/");
                    mainScript = src.pop();
                    subPath = src.length ? src.join("/") + "/" : "./";
                    cfg.baseUrl = subPath;
                }
                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, "");
                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }
                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [ mainScript ];
                return true;
            }
        });
    }
    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function(name, deps, callback) {
        var node, context;
        //Allow for anonymous modules
        if (typeof name !== "string") {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }
        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }
        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(match, dep) {
                    deps.push(dep);
                });
                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? [ "require" ] : [ "require", "exports", "module" ]).concat(deps);
            }
        }
        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute("data-requiremodule");
                }
                context = contexts[node.getAttribute("data-requirecontext")];
            }
        }
        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        (context ? context.defQueue : globalDefQueue).push([ name, deps, callback ]);
    };
    define.amd = {
        jQuery: true
    };
    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function(text) {
        /*jslint evil: true */
        return eval(text);
    };
    //Set up with config info.
    req(cfg);
})(this);
//# sourceMappingURL=vendor.js.map