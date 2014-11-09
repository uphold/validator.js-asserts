
/**
 * Module dependencies.
 */

var _ = require('lodash');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var provinces = require('provinces');

/**
 * Export `UsStateAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'UsState';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
      /* jshint camelcase: true */
    }

    if (true !== _.some(provinces, { short: value, country: 'US' })) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
