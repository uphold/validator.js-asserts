
/**
 * Module dependencies.
 */

var _ = require('lodash');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;

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
    if (!_.isPlainObject(value)) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_plain_object });
      /* jshint camelcase: true */
    }

    var difference = _.difference(_.keys(value), this.keys);

    if (difference.length > 0) {
      throw new Violation(this, value, { difference: difference });
    }

    return true;
  };

  return this;
};
