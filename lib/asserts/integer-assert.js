
/**
 * Module dependencies.
 */

var Asserts = require('validator');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;

/**
 * Export `IntegerAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'Integer';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('number' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_number });
      /* jshint camelcase: true */
    }

    if (!Asserts.isInt(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
