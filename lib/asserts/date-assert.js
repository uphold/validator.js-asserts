
/**
 * Module dependencies.
 */

var Asserts = require('validator');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;

/**
 * Add custom error code for `string` or `date`.
 */

/* jshint camelcase: false */
Validator.errorCode.must_be_a_date_or_a_string = 'must_be_a_date_or_a_string';
/* jshint camelcase: true */

/**
 * Export `DateAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'Date';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value && !(value instanceof Date)) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_date_or_a_string });
      /* jshint camelcase: true */
    }

    if (true !== Asserts.isDate(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
