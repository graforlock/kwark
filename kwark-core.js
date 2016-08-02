kwark = kwark || {};

kwark.compose = function() {
    var funcs = [].slice.call(arguments).reverse();
    return function(value) {
        return funcs.reduce(function(v,f) {
            return f(v);
        }, value);
    }
}