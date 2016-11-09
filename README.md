## kwark:dom:select
[![bitHound Overall Score](https://www.bithound.io/github/graforlock/kwark/badges/score.svg)](https://www.bithound.io/github/graforlock/kwark) [![bitHound Dependencies](https://www.bithound.io/github/graforlock/kwark/badges/dependencies.svg)](https://www.bithound.io/github/graforlock/kwark/master/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/graforlock/kwark/badges/devDependencies.svg)](https://www.bithound.io/github/graforlock/kwark/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/graforlock/kwark/badges/code.svg)](https://www.bithound.io/github/graforlock/kwark)

A minimalistic selector library. **NO** external dependencies.

### kwark(simpleQuery) 

Executes a simple, unified query for DOM methods: ```getElementById```, ```getElementsByClassName``` and ```getElementsByTagName```.

```javascript

var A = kwark('#my-app-id')
    .click(function(e) { /* ... */});
    
var B = kwark('.navbar')
    .each(function(el, id) { /* ... */});

var C = kwark('input')
    .last();

```

### kwark.one(anyQuery)

Selects first dom node that matches the query. Equates to ```querySelector```. Can be also used as ```kwark.query()```.

```javascript
kwark.one('.nav-item a')
    .hasClass('.active');
```

### kwark.queryAll(anyQuery)

Selects all dom nodes that match the query. Equates to ```querySelectorAll```.

```javascript
kwark.queryAll('.nav-item a')
    .each(function(e) { /* ... */});
```

### selected.children( [ filter ] )

Select all children with the optional ability to filter them out.

```javascript
var filtered = someNode.children(function(e) { /* filter by some criteria*/})
```

### selected.eq(index)

Returns the node at the index of the given selection.

### selected.find( anyQuery, [ all ] )

Finds an element inside the given node. Optional argument is a boolean that if set true, returns many occurences.

```javascript
someNode.find('a')
    .each(function(e) { /* ... */});
```

### selected.first()

Returns the first node from selection.

### selected.insertAfter( targetNode )

Insert `select`ed node after the element passed in as an argument.


```javascript
div
    .clone()
    .insertAfter(document.querySelector('#nodey'));
```

### selected.insertBefore( targetNode )

Insert `select`ed node before the element passed in as an argument.


```javascript
const div = select.inline('<div><p>contents</p></div>').nodeify();

div
    .insertBefore(document.querySelector('#nodey'));
```

### selected.last()

Returns the last node from selection.

### selected.siblings( [ filter ] )

Select all siblings (left and right) with the optional ability to filter them out.

```javascript
var filtered = someNode.siblings(function(e) { /* filter by some criteria*/})
```

## kwark:core:utils

Utilities, and standalone functions that make the core of kwark.

### utils.partial( fn, [ ...arguments ])

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

### utils.compose( ...functions )

Functional composition utility (reversed pipeline).


```javascript
var filteredData = utils
    .compose(filterById, parseJson);

ajax.ajax('get' url)
    .then(filteredData);
```


### utils.contains( item, array )

Checks whether array contains the given item.

```javascript
utils.contains(1,[1,2,3]);
// true
```

### utils.extend( destination, source )

Extends javascript object(s). With ES2015 in mind, rather use native `Object.assign()` method, or spread operator `{ ...object}`.

### utils.nSiblings( targetNode )

All siblings following the target node.

```javascript
utils.nSiblings(document.querySelector('#nodey'));
```

### utils.pSiblings( targetNode )

All siblings preceding the target node.

```javascript
utils.pSiblings(document.querySelector('#nodey'));
```
## kwark:dom:addons

### addons.serialize( targetNode )

Serializes form node which is then ready to be sent as a request.

```javascript
var formNode = select('#form').node,
    serialized = addons.serialize(formNode);
```

### addons.xmlToJson( XML )

Parses xml file and returns a valid JSON object out of it.

```javascript
// (...) some request with xmlresponse

var JSON = addons.xmlToJson(xmlresponse);

```

### addons.loadScript( urlSource, [ callback ] )

Fetches and loads the script from external url. The script itself is cleaned up from DOM after being loaded.

```javascript
addons.loadScript('https://somefancyfancysite.co.uk/script.js');
```

## kwark:async:ajax

A simple promise-based implementation of ajax module.  

### ajax.ajax( method, url ).then( resolve, reject )

Generalised ajax method, supports basic GET and POST requests. Where `resolve` and `reject` are functions that take one single argument `response`, and `error`, respectiely. Ajax module does not support chaining multiple `.then` sequences. There is some debate whether it is a better approach than the regular "callback hell". Use functional composition (`kwark.compose`) instead, it improves the design of your app.

```javascript
ajax.ajax('get', url)
    .then(resolve, reject);
```
