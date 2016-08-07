// <config>
var kwark = kwark || {};
kwark.events = [
     'mousedown',
     'mouseover', 
     'mouseup', 
     'click', 
     'resize', 
     'scroll',
     'keypress',
     'keyup',
     'keydown'
]
// <config/>

/*
TODOs
-------
insertAfter
insertBefore
-------
*/

/* { CONSTRUCTOR } */

function select(selector) {
    if(this instanceof select) {
        if(!selector) return;
        if(selector.indexOf('.') !== -1) {
            this['node'] = document.getElementsByClassName(selector.split('.').join(''));
        } else if(selector.indexOf('#') !== -1) {
            this['node'] = document.getElementById(selector.split('#').join(''));
        } else {
            this['node'] = document.getElementsByTagName(selector);
        }
    } else {
        return new select(selector);
    }
};

/* { CLASS METHODS } */

select.one = function(selector) {
    _s = new select();
    _s.node = document.querySelector(selector); 
    return _s;
}

select.inline = function(content) {
    _i = new select();
    _i.inlined = content;
    return _i;
}

select.prototype.find = function(selector, all) {
    var selected = all ? this.node.querySelectorAll(selector) : this.node.querySelector(selector);
    if(selected) this.node = selected; 
    else console.log('select: ' + selector + ' is empty.');
    return this;
}

select.prototype.addClass = function(className){
  if(this.node.className.indexOf(className) === -1) {
    this.node.className += (this.node.className ? ' ' : '') + className;
  }
  return this;
}

select.prototype.hasClass = function(className) {
    if(new RegExp(className, 'g').exec(this.node.className)) return this;
    return false;
}

select.prototype.removeClass =  function(className) {
    if(this.hasClass(className)) this.node.className = this.node.className.replace(className, '');
    return this;
}


select.prototype.nodeify = function(target) {
    var reg = /^<([\w =\-'"\[\]0-9]+)>([<>\w\D ]+)<\/[a-z]+>$/g,
        node = reg.exec(this.inlined);
    var inner = node[2],
        tags = node[1].split(" "),
        headTag = tags[0];
    this.node = document.createElement(headTag);
    var self = this;

    if(tags.length > 1) {

        tags.slice(1)
            .map(function(attr) { 
                var obj = {},
                    attrs = attr.split('='); 
                obj[attrs[0]] = attrs[1];
                return obj;
            }).forEach(function(attr) {
                var keys = Object.keys(attr),
                    key = keys[0];
                    if(attr[key]) {
                        value = attr[key].indexOf('"') !== -1 ? attr[key].replace(/"/g, '') : attr[key];
                    }
                self.node[key] = value ? value : "";
            });

    }

    this.html(inner);
    return this;
}

select.prototype.siblings = function(filter) {
    var prev = kwark.pSiblings(this.node) || [],
        next = kwark.nSiblings(this.node) || [];
    this.node = filter ? [].filter.call(prev.concat(next), filter) : prev.concat(next);
    return this;
}

select.prototype.eq = function(index) {
    return this.node[index];
}

select.prototype.first = function() {
    return this.node[0];
}

select.prototype.last = function() {
    return this.node[this.node.length - 1];
}

select.prototype.children = function(filter) {
    if(!filter) {
        return this.node = this.node.children; 
    } else {
        this.node = [].slice.call(this.node.children).filter(filter);
    }
    return this;
};

select.prototype.append = function(target) {
    target = target || document.body;
    target.appendChild(this.node);
    return this;
};

select.prototype.prepend = function(target) {
    target = target || document.body;
    if(target.children) target.insertBefore(this.node, target.children[0]);
    else target.appendChild(this.node);
    return this;
};

select.prototype.isntNull = function() {
        return this['node'] !== null;
};

select.prototype.event = function(ev, f) {
    f = f.bind(this);
    var cachedProp = this.node;
        if(this.isntNull() && cachedProp.length !== 0)  {
            this.each(function(e) {
                e.addEventListener(ev, f);
            });
        }
};

select.prototype.event_decorator = function(eventName) {
    return function(f) {
        f = f.bind(this);
        var cachedProp = this.node;
        if(this.isntNull() && cachedProp.length !== 0)  {
            this.each(function(e) {
                    e.addEventListener(eventName, f);
                });
        }
    }
};


for(var i = 0; i < kwark.events.length; i++) {
    select.prototype[kwark.events[i]] = select.prototype.event_decorator(kwark.events[i]);
}

select.prototype.foreach = function(list, f) {
        for (var i = 0; i < list.length && !f(list[i], i++);) {}
    };

select.prototype.type = function(node) {
    return node ? {}.toString.call(node) : {}.toString.call(this.node);
};
select.prototype.each = function(f) {
        var type = {}.toString;
        if (this.type() === '[object HTMLCollection]' || this.type() === '[object NodeList]' || this.type() === '[object Array]') {
            this.foreach(this['node'], f);
            return this;
        } else {
            f(this['node']);
            return this;
        }
    };

select.prototype.html = function(html) {
    if(!html) return this.node.innerHTML;
    this.each(function(e) {
        e.innerHTML = html;
    });
    return this;
};

select.prototype.interval = function(f,time,infinite) {
    f = f.bind(this);
    var interval = (infinite  || false) ? setInterval : setTimeout;
    interval(f,time);
};

kwark.select = (function(context) {
    return select.bind(context);
})(kwark);