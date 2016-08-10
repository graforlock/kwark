var core = {

    compose : function() {
        var funcs = [].slice.call(arguments).reverse();
        return function(value) {
            return funcs.reduce(function(v,f) {
                return f(v);
            }, value);
        }
    },

    pSiblings : function(target) {
        var siblings = [], n = target;
        while(n = n.previousElementSibling) siblings.push(n);
        return siblings;
    },

    nSiblings : function(target) {
        var siblings = [], n = target;
        while(n = n.nextElementSibling) siblings.push(n);
        return siblings;
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
    contains: function(item,array) {
        for(var i = 0; i < array.length; i++) if(item === array[i]) return true;
        
        return false;
    }

}

module.exports = core;