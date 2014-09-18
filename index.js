

module.exports = function() {
  var n = 0, m = 0, _cb, results = [];

  return function(cb) {
    if (cb) {
      _cb = cb
      results.length = m
      if(n == m) {
        _cb = null
        cb(null, results)
      }
      return
    }

    var i = m++
    return function (err) {
      if (err) {
        n = -1 // stop
        if (_cb) _cb(err)
      } else {
        n++
        results[i] = Array.prototype.slice.call(arguments)
        if (n === m && _cb)
          _cb(null, results)
      }
    }
  }
}
