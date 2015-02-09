
/**
 * Module dependencies.
 */

var Violation = require('validator.js').Violation;

/**
 * Export `NotEqualToAssert`.
 */

module.exports = function(reference) {

  /**
   * Class name.
   */

  this.__class__ = 'NotEqualTo';

  if ('undefined' === typeof reference) {
    throw new Error('A reference value is required.');
  }

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('function' === typeof reference) {
      reference = reference(value);
    }

    if (reference === value) {
      throw new Violation(this, value, { value: reference });
    }

    return true;
  };

  return this;
};
