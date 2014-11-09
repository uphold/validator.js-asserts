
/**
 * Module dependencies.
 */

var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;

/**
 * Hash algorithm regular expression mapping.
 */

var hash = {
  sha1: /^[a-f0-9]{40}$/,
  sha256: /^[A-Fa-f0-9]{64}$/,
  sha512: /^[A-Fa-f0-9]{128}$/
};

/**
 * Export `HashAssert`.
 */

module.exports = function(algorithm) {

  /**
   * Class name.
   */

  this.__class__ = 'Hash';

  if (!algorithm) {
    throw new Error('An algorithm is required.');
  }

  if (!(algorithm in hash)) {
    throw new Error('The algorithm specified is not supported.');
  }

  /**
   * Algorithm.
   */

  this.algorithm = algorithm;

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
      /* jshint camelcase: true */
    }

    if (!hash[this.algorithm].test(value)) {
      throw new Violation(this, value, { algorithm: this.algorithm });
    }

    return true;
  };

  return this;
};
