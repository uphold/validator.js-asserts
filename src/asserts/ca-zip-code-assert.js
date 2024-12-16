'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');

/**
 * Canada zip code regular expression.
 */

const regexp = new RegExp(/^[AaBbCcEeGgHhJjKkLlMmNnPpRrSsTtVvXxYy]\d[A-Za-z][ -]?\d[A-Za-z]\d$/);

/**
 * Export `CaZipCodeAssert`.
 */

module.exports = function caZipCodeAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'CaZipCode';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!regexp.test(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
