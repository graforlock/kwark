var core = require('./kwark-core-utils'),
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

    return _s.node;
};

kwark.one = kwark.classMethodDecorator(document.querySelector);
kwark.query = kwark.one;
kwark.queryAll = kwark.classMethodDecorator(document.querySelectorAll);
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