## kwark:dom:select

A minimalistic selector library.

### insertBefore

Insert `select`ed node before the element passed in as an argument.

#### example use:
```javascript
const div = select.inline('<div><p>contents</p></div>').nodeify();

div
    .insertBefore(document.querySelector('#nodey'));
```

### insertAfter

Insert `select`ed node after the element passed in as an argument.

#### example use:
```javascript
div
    .clone()
    .insertAfter(document.querySelector('#nodey'));
```

## kwark:dom:effects

Pre-build effects and animations that extend the standard select library.

## kwark:core:utils

Utilities, and standalone functions that make the core of kwark.

### partial

Partial application. Function will fire as soon as it gets enough arguments.

#### example use:

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

### compose

Functional composition utility (reversed pipeline).
#### example use:

```javascript
var filteredData = kwark
    .compose(filterById, parseJson);

kwark.ajax('get' url)
    .then(filteredData);
```


### contains

Checks whether array contains the given item.

```javascript
kwark.contains(1,[1,2,3]);
// true
```

### extend

Extends javascript object(s). With ES2015 in mind, rather use native `Object.assign()` method, or spread operator `{ ...object}`.


## kwark:async:ajax

A simple promise-based implementation of ajax module.  

### ajax

Generalised ajax method, supports basic GET and POST requests.
#### example use:

```javascript
kwark.ajax('get', url)
    .then(resolve, reject);
```
-  where `resolve` and `reject` are functions that take one single argument `response`, and `error`, respectiely.
- Ajax module does not support chaining multiple `.then` sequences. There is some debate whether it is a better approach than the regular "callback hell". Use functional composition (`kwark.compose`) instead, it improves the design of your app.
