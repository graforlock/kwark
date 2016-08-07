kwark = kwark || {};

kwark.compose = function() {
    var funcs = [].slice.call(arguments).reverse();
    return function(value) {
        return funcs.reduce(function(v,f) {
            return f(v);
        }, value);
    }
}

kwark.pSiblings =  function(target) {
   var siblings = [], n = target;
   while(n = n.previousElementSibling) siblings.push(n);
   return siblings;
}

kwark.nSiblings =  function(target) {
   var siblings = [], n = target;
   while(n = n.nextElementSibling) siblings.push(n);
   return siblings;
}
