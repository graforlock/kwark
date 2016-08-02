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

select.first = function(selector) {
    select = new select();
    select.node = document.querySelector(selector); 
    return select;
}

select.prototype.find = function(selector) {
    var selected = this.node.querySelector(selector);
    if(selected) this.node = selected; 
    else console.log('select: ' + selector + ' is empty.');
    return this;
};
select.prototype.isntNull = function() {
        return this['node'] != null;
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
}



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
        if (this.type(this['node']) === '[object HTMLCollection]' || this.type(this['node']) === '[object NodeList]' ) {
            return this.foreach(this['node'], f);
        } else {
            return f(this['node']);
        }
    };

select.prototype.html = function(html) {
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