
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;

/**
 * Add custom error code for `null` or string.
 */

/* jshint camelcase: false */
Validator.errorCode.must_be_a_null_or_a_string = 'must_be_a_null_or_a_string';
/* jshint camelcase: true */

/**
 * Export `NullOrStringAssert`.
 */

module.exports = function(boundaries) {

  /**
   * Class name.
   */

  this.__class__ = 'NullOrString';

  /**
   * Boundaries.
   */

  boundaries = boundaries || {};

  this.min = boundaries.min;
  this.max = boundaries.max;

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if (null !== value && 'string' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_null_or_a_string });
      /* jshint camelcase: true */
    }

    if (null === value) {
      return true;
    }

    if ('string' === typeof value && 'undefined' === typeof this.min && 'undefined' === typeof this.max) {
      return true;
    }

    try {
      new Assert().Length({ min: this.min, max: this.max }).validate(value);
    } catch (e) {
      throw new Violation(this, value, e.violation);
    }

    return true;
  };

  return this;
};
