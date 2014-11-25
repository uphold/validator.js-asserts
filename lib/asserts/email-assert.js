
/**
* Module dependencies.
*/

var Assert = require('validator.js').Assert;
var Asserts = require('validator');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;

/**
* Export `EmailAssert`.
*/

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'Email';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
      /* jshint camelcase: true */
    }

    if (!Asserts.isEmail(value)) {
      throw new Violation(this, value);
    }

    try {
      new Assert().Length({ max: 254 }).validate(value);
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
