var core = {
    maybe: function(v) {
        if(v === null || typeof v === 'undefined' || !isNaN(v) ) return new core.none(v);

        return new core.just(v);
    },
    just: function(v) {
        this._ = v;
        this.join = function() {
            return this._;
        }.bind(this)

    },
    none: function(v) {
        this._ = v;
    },
    compose : function() {
        var funcs = [].slice.call(arguments).reverse();
        return function(value) {
            return funcs.reduce(function(v,f) {
                return f(v);
            }, value);
        }
    },
    contains: function(item,array) {
        for(var i = 0; i < array.length; i++) if(item === array[i]) return true;
        
        return false;
    },
   extend: function(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor &&
                source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                extend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    },
    events : [
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
    nSiblings : function(target) {
        var siblings = [], n = target;
        while(n = n.nextElementSibling) siblings.push(n);
        return siblings;
    },
    partial: function(fn) {
        var arity = fn.length;

        return getArgs([]);

        function getArgs(totalArgs) {
            return function stepTwo() {
                var nextTotalArgs = totalArgs.concat([].slice.call(arguments, 0));
                if (nextTotalArgs.length >= arity)
                    return fn.apply(this, nextTotalArgs);
                else
                    return getArgs(nextTotalArgs);

            }
        }
    },
    pSiblings : function(target) {
        var siblings = [], n = target;
        while(n = n.previousElementSibling) siblings.push(n);
        return siblings;
    }

}

module.exports = core;