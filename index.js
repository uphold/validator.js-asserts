
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var asserts = require('require-dir')('./lib/asserts');
var pascal = require('to-pascal-case');

/**
 * Register asserts.
 */

for (var assert in asserts) {
  var func = asserts[assert];

  assert = pascal(assert).replace('Assert', '');

  Assert.prototype[assert] = func;
}
