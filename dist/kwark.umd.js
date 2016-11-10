(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("kwark", [], factory);
	else if(typeof exports === 'object')
		exports["kwark"] = factory();
	else
		root["kwark"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    core: __webpack_require__(1),
	    addons: __webpack_require__(2),
	    option: __webpack_require__(3),
	    select: __webpack_require__(4),
	    ajax: __webpack_require__(5)
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	var core = {
	    maybe: function (v)
	    {
	        if (!core.exists(v)) return new core.none(v);
	        return new core.just(v);
	    },
	    just: function (v)
	    {
	        this._ = v;
	        this.join = function ()
	        {
	            return this._;
	        }.bind(this)
	    },
	    none: function (v)
	    {
	        this._ = v;
	    },
	    compose: function ()
	    {
	        var funcs = [].slice.call(arguments).reverse();
	        return function (value)
	        {
	            return funcs.reduce(function (v, f)
	            {
	                return f(v);
	            }, value);
	        }
	    },
	    contains: function (item, array)
	    {
	        for (var i = 0; i < array.length; i++) if (item === array[i]) return true;
	        return false;
	    },
	    exists: function (v)
	    {
	        return v !== null && typeof v !== 'undefined' && v === v;
	    },
	    extend: function (destination, source)
	    {
	        for (var property in source)
	        {
	            if (source[property] && source[property].constructor &&
	                source[property].constructor === Object)
	            {
	                destination[property] = destination[property] || {};
	                extend(destination[property], source[property]);
	            } else
	            {
	                destination[property] = source[property];
	            }
	        }
	        return destination;
	    },
	    events: [
	        'mousedown',
	        'mouseover',
	        'mouseup',
	        'click',
	        'resize',
	        'scroll',
	        'keypress',
	        'keyup',
	        'keydown'
	    ],
	    statics: [
	        'one',
	        'inline',
	        'get'
	    ],
	    nSiblings: function (target)
	    {
	        var siblings = [], n = target;
	        while (n = n.nextElementSibling) siblings.push(n);
	        return siblings;
	    },
	    Null: function (x)
	    {
	        var nullable = x ? x : core.exists;
	        return function(v)
	        {
	            return typeof nullable === 'function' ? nullable(v) : v !== nullable;
	        }
	    },
	    partial: function (fn)
	    {
	        var arity = fn.length;
	
	        return getArgs([]);
	
	        function getArgs(totalArgs)
	        {
	            return function stepTwo()
	            {
	                var nextTotalArgs = totalArgs.concat([].slice.call(arguments, 0));
	                if (nextTotalArgs.length >= arity)
	                    return fn.apply(this, nextTotalArgs);
	                else
	                    return getArgs(nextTotalArgs);
	
	            }
	        }
	    },
	    pSiblings: function (target)
	    {
	        var siblings = [], n = target;
	        while (n = n.previousElementSibling) siblings.push(n);
	        return siblings;
	    }
	};
	
	module.exports = core;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var addons = {
	    serialize: {
	        form: function (form)
	        {
	            var field, s = [];
	            if (typeof form == 'object' && form.nodeName == "FORM")
	            {
	                var len = form.elements.length;
	                for (var i = 0; i < len; i++)
	                {
	                    field = form.elements[i];
	                    if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button')
	                    {
	                        if (field.type == 'kwark-multiple')
	                        {
	                            for (var j = form.elements[i].options.length - 1; j >= 0; j--)
	                            {
	                                if (field.options[j].selected)
	                                    s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
	                            }
	                        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked)
	                        {
	                            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
	                        }
	                    }
	                }
	            }
	            return s.join('&').replace(/%20/g, '+');
	        },
	        object: function (obj)
	        {
	            var str = [];
	            for (var p in obj)
	                if (obj.hasOwnProperty(p))
	                {
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	                }
	            return str.join("&");
	        }
	    },
	    xmlToJson: function (xml)
	    {
	        var obj = {};
	        if (xml.nodeType == 1)
	        {
	            if (xml.attributes.length > 0)
	            {
	                obj["@attributes"] = {};
	                for (var j = 0; j < xml.attributes.length; j++)
	                {
	                    var attribute = xml.attributes.item(j);
	                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
	                }
	            }
	        } else if (xml.nodeType == 3)
	        {
	            obj = xml.nodeValue;
	        }
	
	        if (xml.hasChildNodes())
	        {
	            for (var i = 0; i < xml.childNodes.length; i++)
	            {
	                var item = xml.childNodes.item(i);
	                var nodeName = item.nodeName;
	                if (typeof(obj[nodeName]) == "undefined")
	                {
	                    obj[nodeName] = xmlToJson(item);
	                } else
	                {
	                    if (typeof(obj[nodeName].push) == "undefined")
	                    {
	                        var old = obj[nodeName];
	                        obj[nodeName] = [];
	                        obj[nodeName].push(old);
	                    }
	                    obj[nodeName].push(xmlToJson(item));
	                }
	            }
	        }
	        return obj;
	    },
	    loadScript: function (source, callback)
	    {
	        var script = document.createElement('script');
	        var prior = document.getElementsByTagName('script')[0];
	        script.async = 1;
	        prior.parentNode.insertBefore(script, prior);
	
	        script.onload = script.onreadystatechange = function (_, isAbort)
	        {
	            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState))
	            {
	                script.onload = script.onreadystatechange = null;
	                script = undefined;
	
	                if (!isAbort)
	                {
	                    if (callback) callback();
	                }
	            }
	        };
	
	        script.src = source;
	    }
	
	};
	
	module.exports = addons;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var exists = __webpack_require__(1).exists;
	
	/* @Option Type:
	*
	*  May or may not return a value, but never fails.
	*  Option is null safe, will never crash your app
	*  unless you explicitly specify so by unwrapping
	*  the null value.
	*
	* */
	function Option(v)
	{
	    return exists(v) ? Just.of(v) : None.of(v);
	}
	
	Option.of = function(v)
	{
	  return new Option(v);
	};
	
	
	Option.prototype.map = function(f)
	{
	    return this.isNone() ? None.of(null) : Just.of(f(this.__value));
	};
	
	Option.prototype.isNone = function()
	{
	    return this.constructor === None;
	};
	
	Option.prototype.orElse = function(other)
	{
	    return this.isNone() ? Option.of(other.unwrap()) : Option.of(this.unwrap());
	};
	
	Option.prototype.empty = function()
	{
	    return None.of(null);
	};
	
	Option.prototype.unwrap = function()
	{
	  return this.__value;
	};
	
	Option.prototype.concat = function(other, f)
	{
	    return this.isNone() ? None.of(null) : f(this.unwrap(), other.unwrap());
	};
	
	function Just(v)
	{
	    this.__value = v;
	}
	
	Just.prototype = Object.create(Option.prototype);
	Just.prototype.constructor = Just;
	
	Just.prototype.map = function(f)
	{
	    return new Just(f(this.__value));
	};
	
	
	Just.of = function(v) {
	    return new Just(v);
	};
	
	function None(v)
	{
	    this.__value = v;
	}
	
	None.prototype = Object.create(Option.prototype);
	None.prototype.constructor = None;
	
	None.prototype.map = function()
	{
	    return new None(null);
	};
	
	None.of = function(v) {
	    return new None(v);
	};
	
	module.exports = Option;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(1),
	    events = core.events;
	
	/* @Kwark
	*
	*  Input type for selector.
	*
	* */
	function kwark(selector)
	{
	    if (this instanceof kwark)
	    {
	        if (!selector) return this;
	
	        this.node = document.querySelector(selector);
	    }
	    else
	    {
	        return new kwark(selector);
	    }
	}
	
	/* @Decorators */
	kwark.classMethodDecorator = function (method)
	{
	    return function (textContent)
	    {
	        var _s = new kwark();
	        console.log(method);
	        _s.node = method ? method(textContent) : textContent;
	        return _s;
	    }
	};
	
	kwark.staticsDecorator = function (target)
	{
	    for (var i = 0; i < core.statics.length; i++)
	    {
	        target[core.statics[i]] = kwark[core.statics[i]];
	    }
	};
	
	/* @Class Methods */
	kwark.simple = function(simple)
	{
	    var _s = new kwark();
	    if (simple.indexOf('.') !== -1)
	    {
	        _s.node = document.getElementsByClassName(simple.split('.').join(''));
	    }
	    else if (simple.indexOf('#') !== -1)
	    {
	        _s.node = document.getElementById(simple.split('#').join(''));
	    }
	    else
	    {
	        _s.node = document.getElementsByTagName(simple);
	    }
	
	    return _s;
	};
	
	kwark.one = kwark.classMethodDecorator(function(selector) { return document.querySelector(selector); });
	kwark.query = kwark.one;
	kwark.queryAll = kwark.classMethodDecorator(function(selector) { return document.querySelectorAll(selector); });
	kwark.get = kwark.classMethodDecorator();
	
	kwark.inline = function (content)
	{
	    var _i = new kwark();
	    _i.inlined = content;
	    return _i;
	};
	
	/* @Getter/Setter */
	kwark.prototype = {
	    set node(v)
	    {
	        this._ = new core.maybe(v);
	    },
	    get node()
	    {
	        if (this._.constructor.name === 'just') return this._.join();
	    }
	};
	
	/* @Instance Methods */
	kwark.prototype.find = function (selector, all)
	{
	    var selected = all ? this.node.querySelectorAll(selector) : this.node.querySelector(selector);
	    if (selected) this.node = selected;
	    else console.log('kwark: ' + selector + ' is empty.');
	    return this;
	};
	
	kwark.prototype.addClass = function (className)
	{
	    if (this.node.className.indexOf(className) === -1)
	    {
	        this.node.className += (this.node.className ? ' ' : '') + className;
	    }
	    return this;
	};
	
	kwark.prototype.hasClass = function (className)
	{
	    if (new RegExp(className, 'g').exec(this.node.className)) return this;
	    return false;
	};
	
	kwark.prototype.removeClass = function (className)
	{
	    if (this.hasClass(className)) this.node.className = this.node.className.replace(className, '');
	    return this;
	};
	
	
	kwark.prototype.nodeify = function (target)
	{
	    var reg = /^<([\w =\-'"\[\]0-9]+)>([<>\w\D ]*)<\/[a-z]+>$/g,
	        node = reg.exec(this.inlined);
	    var inner = new core.maybe(node[2]),
	        tags = node[1].split(" "),
	        headTag = tags[0];
	    this.node = document.createElement(headTag);
	    var self = this;
	
	    if (tags.length > 1)
	    {
	        var attributes = tags.slice(1)
	            .map(function (attr)
	            {
	                var obj = {},
	                    attrs = attr.split('=');
	                obj[attrs[0]] = attrs[1];
	                return obj;
	            });
	        for (var i = 0; i < attributes.length; i++)
	        {
	            var keys = Object.keys(attributes[i]),
	                key = keys[0],
	                value;
	            if (attributes[i][key])
	            {
	                value = attributes[i][key].indexOf('"') !== -1 ? attributes[i][key].replace(/"/g, '') : attributes[i][key];
	            }
	            self.node[key] = value ? value : "";
	        }
	
	    }
	    if (inner.constructor.name !== 'none') this.html(inner.join());
	    return this;
	};
	
	kwark.prototype.clone = function ()
	{
	    var cloned = this.node.cloneNode(true),
	        newObj = core.extend({}, this);
	    newObj.node = cloned;
	    return newObj;
	};
	
	kwark.prototype.siblings = function (filter)
	{
	    var prev = core.pSiblings(this.node) || [],
	        next = core.nSiblings(this.node) || [];
	    this.node = filter ? prev.concat(next).filter(filter) : prev.concat(next);
	    return this;
	};
	
	kwark.prototype.eq = function (index)
	{
	    return this.node[index];
	};
	
	kwark.prototype.first = function ()
	{
	    return this.node[0];
	};
	
	kwark.prototype.last = function ()
	{
	    return this.node[this.node.length - 1];
	};
	
	kwark.prototype.where = function (filter)
	{
	    this.node = [].filter.call(this.node, filter);
	    return this;
	};
	
	kwark.prototype.children = function (filter)
	{
	    if (!filter)
	    {
	        return this.node = this.node.children;
	    } else
	    {
	        this.node = [].slice.call(this.node.children).filter(filter);
	    }
	    return this;
	};
	
	kwark.prototype.append = function (target)
	{
	    target = target || document.body;
	    target.appendChild(this.node);
	    return this;
	};
	
	kwark.prototype.insertBefore = function (target)
	{
	    target = target || false;
	    if (target)
	    {
	        var parent = target.parentNode;
	        parent.insertBefore(this.node, target);
	    }
	    return this;
	
	};
	
	kwark.prototype.insertAfter = function (target)
	{
	    target = target.nextElementSibling || false;
	    if (target)
	    {
	        var parent = target.parentNode;
	        parent.insertBefore(this.node, target);
	    }
	    return this;
	};
	
	kwark.prototype.prepend = function (target)
	{
	    target = target || document.body;
	    if (target.children) target.insertBefore(this.node, target.children[0]);
	    else target.appendChild(this.node);
	    return this;
	};
	
	kwark.prototype.exists = function ()
	{
	    return this.node.constructor.name !== 'none';
	};
	
	
	kwark.prototype.event = function (ev, f)
	{
	    f = f.bind(this);
	    var cachedProp = this.node;
	    if (this.exists() && cachedProp.length !== 0)
	    {
	        this.each(function (e)
	        {
	            e.addEventListener(ev, f);
	        });
	    }
	};
	
	kwark.prototype.eventDecorator = function (eventName)
	{
	    return function (f)
	    {
	        f = f.bind(this);
	        var cachedProp = this.node;
	        if (this.exists() && cachedProp.length !== 0)
	        {
	            this.each(function (e)
	            {
	                e.addEventListener(eventName, f);
	            });
	        }
	    }
	};
	
	for (var i = 0; i < events.length; i++)
	{
	    kwark.prototype[events[i]] = kwark.prototype.eventDecorator(events[i]);
	}
	
	kwark.prototype.foreach = function (list, f)
	{
	    for (var i = 0; i < list.length && !f(list[i], i++);) {}
	};
	
	kwark.prototype.type = function (node)
	{
	    return node ? {}.toString.call(node) : {}.toString.call(this.node);
	};
	kwark.prototype.each = function (f)
	{
	    var type = {}.toString;
	    if (this.type() === '[object HTMLCollection]' || this.type() === '[object NodeList]' || this.type() === '[object Array]')
	    {
	        this.foreach(this.node, f);
	        return this;
	    } else
	    {
	        f(this.node);
	        return this;
	    }
	};
	
	kwark.prototype.html = function (html)
	{
	    if (!html) return this.node.innerHTML;
	    this.each(function (e)
	    {
	        e.innerHTML = html;
	    });
	    return this;
	};
	
	kwark.prototype.interval = function (f, time, infinite)
	{
	    f = f.bind(this);
	    var interval = (infinite || false) ? setInterval : setTimeout;
	    interval(f, time);
	};
	
	module.exports = kwark;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var serialize = __webpack_require__(2).serialize.object;
	
	function ajax(method, options)
	{
	    if (this instanceof ajax)
	    {
	        var params = options.params ? serialize(options.params) : null;
	        var state = 0,
	            deferred,
	            status,
	            value;
	
	        function resolve(result)
	        {
	            value = result;
	            state = result.readyState;
	            status = result.status;
	
	            if (deferred)
	            {
	                handle(deferred);
	            }
	        }
	
	        function handle(resolvers)
	        {
	            if (state < 4)
	            {
	                deferred = resolvers;
	                return;
	            }
	
	            var handler;
	            if (status >= 200)
	            {
	                if (status >= 300)
	                {
	                    resolvers.rejected({statusText: xhttp.statusText, statusCode: status});
	                } else
	                {
	                    resolvers.resolved(xhttp.responseText);
	                }
	            }
	
	        }
	
	        this.then = function (resolved, rejected)
	        {
	            handle({
	                resolved: resolved,
	                rejected: rejected
	            });
	        };
	
	        var xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	        xhttp.onreadystatechange = function ()
	        {
	            resolve(xhttp);
	        };
	        xhttp.open(method.toUpperCase(), options.url, true);
	        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	        xhttp.send(params);
	
	    } else
	    {
	        return new ajax(method, options);
	    }
	
	}
	
	module.exports = ajax;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=kwark.umd.js.map