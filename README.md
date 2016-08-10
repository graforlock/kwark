## kwark:dom:select

A minimalistic selector library.

### insertBefore( node )

Insert `select`ed node before the element passed in as an argument.


```javascript
const div = select.inline('<div><p>contents</p></div>').nodeify();

div
    .insertBefore(document.querySelector('#nodey'));
```

### insertAfter( node )

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
// nothing happens

partialAddThree(1,2)(3);
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


## kwark:async:ajax

A simple promise-based implementation of ajax module.  

### ajax( method, url )

Generalised ajax method, supports basic GET and POST requests.


```javascript
kwark.ajax('get', url)
    .then(resolve, reject);
```
-  where `resolve` and `reject` are functions that take one single argument `response`, and `error`, respectiely.
- Ajax module does not support chaining multiple `.then` sequences. There is some debate whether it is a better approach than the regular "callback hell". Use functional composition (`kwark.compose`) instead, it improves the design of your app.
