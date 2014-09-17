# MultiCB

Simple way to aggregate multiple node-style callbacks

```js
var multicb = require('multicb')
var done = multicb()
doAsync(done())
doAsync(done())
doAsync(done())
done(function(err, results) {
  console.log(err) // => undefined
  console.log(results) /* =>
  [
    [undefined, 'foo'],
    [undefined, 'bar'],
    [undefined, 'baz']
  ]
  */
})
```