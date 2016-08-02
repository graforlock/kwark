## kwark:dom:select

## kwark:dom:effects

## kwark:async:ajax
### example use:

- `kwark.ajax('get', url).then(resolve, reject)`
-  where `resolve` and `reject` are functions that take one single argument `response`, and `error`, respectiely.
- Ajax module does not support chaining multiple `.then` sequences. There is some debate whether it is a better approach than the regular "callback hell". Use functional composition (`kwark.compose`) instead, it improves the design of your app.