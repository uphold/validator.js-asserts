
/**
 * Module dependencies.
 */

var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var creditcard = require('creditcard');

/**
 * Export `CreditCardAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'CreditCard';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value && 'number' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: 'must_be_a_string_or_a_number' });
      /* jshint camelcase: true */
    }

    if (!creditcard.validate(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
