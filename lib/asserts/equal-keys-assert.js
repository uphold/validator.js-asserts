
/**
 * Module dependencies.
 */

var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var difference = require('lodash/array/difference');
var isPlainObject = require('lodash/lang/isPlainObject');

/**
 * Add custom error code for a plain object.
 */

/* jshint camelcase: false */
Validator.errorCode.must_be_a_plain_object = 'must_be_a_plain_object';
/* jshint camelcase: true */

/**
 * Export `EqualKeysAssert`.
 */

module.exports = function(keys) {

  /**
   * Class name.
   */

  this.__class__ = 'EqualKeys';

  /**
   * Keys.
   */

  this.keys = keys;

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if (!isPlainObject(value)) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_plain_object });
      /* jshint camelcase: true */
    }

    var diff = difference(Object.keys(value), this.keys);

    if (diff.length > 0) {
      throw new Violation(this, value, { difference: diff });
    }

    return true;
  };

  return this;
};
