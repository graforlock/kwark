## kwark:dom:select
[![bitHound Overall Score](https://www.bithound.io/github/graforlock/kwark/badges/score.svg)](https://www.bithound.io/github/graforlock/kwark) [![bitHound Dependencies](https://www.bithound.io/github/graforlock/kwark/badges/dependencies.svg)](https://www.bithound.io/github/graforlock/kwark/master/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/graforlock/kwark/badges/devDependencies.svg)](https://www.bithound.io/github/graforlock/kwark/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/graforlock/kwark/badges/code.svg)](https://www.bithound.io/github/graforlock/kwark)

A minimalistic selector library. **NO** external dependencies.

### insertBefore( targetNode )

Insert `select`ed node before the element passed in as an argument.


```javascript
const div = select.inline('<div><p>contents</p></div>').nodeify();

div
    .insertBefore(document.querySelector('#nodey'));
```

### insertAfter( targetNode )

Insert `select`ed node after the element passed in as an argument.


```javascript
div
    .clone()
    .insertAfter(document.querySelector('#nodey'));
```

## kwark:dom:effects

Pre-build effects and animations that extend the standard select library.

## kwark:core:utils

Utilities, and standalone functions that make the core of kwark.

### partial( fn, [ ...arguments ])

Partial application. Function will fire as soon as it gets enough arguments.



```javascript
var addThree = function(a,b,c) {
    return a + b + c;
}

var partialAddThree = kwark.partial(addThree);

partialAddThree(1)(2);
// nothing happens, waiting for the third arg

partialAddThree(1,2)(3);
// 6
partialAddThree(1)(2,3);
// 6
partialAddThree(1)(2)(3);
// 6
```

### compose( ...functions )

Functional composition utility (reversed pipeline).


```javascript
var filteredData = kwark
    .compose(filterById, parseJson);

kwark.ajax('get' url)
    .then(filteredData);
```


### contains( item, array )

Checks whether array contains the given item.

```javascript
kwark.contains(1,[1,2,3]);
// true
```

### extend( destination, source )

Extends javascript object(s). With ES2015 in mind, rather use native `Object.assign()` method, or spread operator `{ ...object}`.

### nSiblings( targetNode )

All siblings following the target node.

```javascript
kwark.nSiblings(document.querySelector('#nodey'));
```

### pSiblings( targetNode )

All siblings preceding the target node.

```javascript
kwark.pSiblings(document.querySelector('#nodey'));
```
## kwark:dom:addons

### serialize( targetNode )

Serializes form node which is then ready to be sent as a request.

```javascript
var formNode = select('#form').node,
    serialized = addons.serialize(formNode);
```

### xmlToJson( XML )

Parses xml file and returns a valid JSON object out of it.

```javascript
// (...) some request with xmlresponse

var JSON = addons.xmlToJson(xmlresponse);

```

### loadScript( urlSource, [ callback ] )

Fetches and loads the script from external url. The script itself is cleaned up from DOM after being loaded.

```javascript
addons.loadScript('https://somefancyfancysite.co.uk/script.js');
```

## kwark:async:ajax

A simple promise-based implementation of ajax module.  

### ajax( method, url ).then( resolve, reject )

Generalised ajax method, supports basic GET and POST requests. Where `resolve` and `reject` are functions that take one single argument `response`, and `error`, respectiely. Ajax module does not support chaining multiple `.then` sequences. There is some debate whether it is a better approach than the regular "callback hell". Use functional composition (`kwark.compose`) instead, it improves the design of your app.

```javascript
kwark.ajax('get', url)
    .then(resolve, reject);
```
