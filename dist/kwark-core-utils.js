var core={compose:function(){var e=[].slice.call(arguments).reverse();return function(n){return e.reduce(function(e,n){return n(e)},n)}},pSiblings:function(e){for(var n=[],r=e;r=r.previousElementSibling;)n.push(r);return n},nSiblings:function(e){for(var n=[],r=e;r=r.nextElementSibling;)n.push(r);return n},events:["mousedown","mouseover","mouseup","click","resize","scroll","keypress","keyup","keydown"],extend:function(e,n){for(var r in n)n[r]&&n[r].constructor&&n[r].constructor===Object?(e[r]=e[r]||{},extend(e[r],n[r])):e[r]=n[r];return e},contains:function(e,n){for(var r=0;r<n.length;r++)if(e===n[r])return!0;return!1}};module.exports=core;