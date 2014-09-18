'use strict'
//var tape = require('tape');
var equal = require('deep-equal');
var multicb = require('../')
var t = require('assert')

require('interleavings').test(function (isAsync) {

  function async(cb, delay, args) {
      isAsync(function() { cb.apply(null, args) })()
  }

  var done = multicb()
  async(done(), 5, [null, 1])
  async(done(), 15, [null, 2])
  async(done(), 10, ['fail'])
  done(function(err, results) {
    t.equal(err, 'fail')
    t.equal(results, void 0)
    isAsync.done()
  })

})

//if(!module.parent)
  //module.exports({ })
