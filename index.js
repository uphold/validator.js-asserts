
/**
 * Module dependencies.
 */

var _ = require('lodash');
var Assert = require('validator.js').Assert;
var asserts = require('require-dir')('./lib/asserts');

/**
 * Register asserts.
 */

for (var assert in asserts) {
  var func = asserts[assert];

  assert = _.flowRight(_.capitalize, _.camelCase)(assert).replace('Assert', '');

  Assert.prototype[assert] = func;
}
