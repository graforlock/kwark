## kwark:dom:select

A minimalistic selector library.

## kwark:dom:effects

Pre-build effects and animations that extend the standard select library.

## kwark:core:utils

Utilities, and standalone functions that make the core of kwark.

#### example use:

```
var filteredData = kwark.compose(filterById, parseJson)

kwark.ajax('get' url).then(filteredData)
```

## kwark:async:ajax

A simple promise-based implementation of ajax module.  

#### example use:

```
kwark.ajax('get', url)
    .then(resolve, reject)
```
-  where `resolve` and `reject` are functions that take one single argument `response`, and `error`, respectiely.
- Ajax module does not support chaining multiple `.then` sequences. There is some debate whether it is a better approach than the regular "callback hell". Use functional composition (`kwark.compose`) instead, it improves the design of your app.