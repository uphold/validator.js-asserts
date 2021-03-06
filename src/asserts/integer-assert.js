'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');

/**
 * Int regex.
 */

const int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;

/**
 * Export `IntegerAssert`.
 */

module.exports = function integerAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'Integer';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'number') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_number });
    }

    if (int.test(value) !== true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
