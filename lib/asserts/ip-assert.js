
/**
 * Module dependencies.
 */

var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var net = require('net');

/**
 * Export `IpAssert`.
 */

module.exports = function() {

  /**
   * Class name
   */

  this.__class__ = 'Ip';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
      /* jshint camelcase: true */
    }

    // A result of 0 indicates that the input value is not a valid IP.
    if (0 === net.isIP(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
