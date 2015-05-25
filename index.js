
/**
 * Module dependencies.
 */

var _ = require('lodash');
var Assert = require('validator.js').Assert;
var asserts = require('require-dir')('./lib/asserts');

module.exports = _.transform(asserts, function(result, fn, key) {
  result[_.flowRight(_.capitalize, _.camelCase)(key).replace('Assert', '')] = fn;
});
