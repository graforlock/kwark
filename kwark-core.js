kwark = kwark || {};

kwark.compose = function() {
    var funcs = [].slice.call(arguments).reverse();
    return function(value) {
        return funcs.reduce(function(v,f) {
            return f(v);
        }, value);
    }
}

kwark.class_decorator = function(parent, func) {
   var obj = new function child(selector) {
       if(this instanceof child) {
        parent.call(this, selector);
        func.call(this);
       } else {
           return new child(selector);
       }
   }
   obj.prototype = Object.create(parent.prototype);
   obj.prototype.name = parent;
   return obj;
}