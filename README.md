## kwark:dom:select

## kwark:dom:effects

## kwark:async:ajax
### example use:

- `kwark.ajax('get', url).then(resolve, reject)`
-  where `resolve` and `reject` are functions that take one single argument `response`, and `error`, respectiely.
- Ajax module does not support chaining multiple `.then` sequences. It is bad practise to do so, and no matter how you fool yourself, no better than callback hell. Use functional composition instead.