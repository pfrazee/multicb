'use strict'
var tape = require('tape');
var equal = require('deep-equal');
var multicb = require('../')

function async(cb, delay, args) {
    setTimeout(function() { cb.apply(null, args) }, delay)
}

module.exports = function(opts) {
  tape('multiple callbacks', function(t) {
    var done = multicb()
    async(done(), 5, [null, 1])
    async(done(), 15, [null, 2])
    async(done(), 10, [null, 3])
    done(function(err, results) {
      t.equal(err, null)
      t.equal(results[0][1], 1)
      t.equal(results[1][1], 2)
      t.equal(results[2][1], 3)
      t.end()
    })
  })

  tape('errors', function(t) {
    var done = multicb()
    async(done(), 5, [null, 1])
    async(done(), 15, [null, 2])
    async(done(), 10, ['fail'])
    done(function(err, results) {
      t.equal(err, 'fail')
      t.equal(results, void 0)
      t.end()
    })
  })
}

if(!module.parent)
  module.exports({ })
