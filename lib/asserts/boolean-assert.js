
/**
 * Module dependencies.
 */

var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;

/**
 * Add custom error code for `string` or `date`.
 */

/* jshint camelcase: false */
Validator.errorCode.must_be_a_boolean = 'must_be_a_boolean';
/* jshint camelcase: true */

/**
 * Export `BooleanAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'Boolean';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('boolean' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_boolean });
      /* jshint camelcase: true */
    }

    return true;
  };

  return this;
};
