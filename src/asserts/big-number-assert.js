'use strict';

/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');

/**
 * Export `BigNumberAssert`.
 */

module.exports = function bigNumberAssert({ validateSignificantDigits = true } = {}) {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  BigNumber.DEBUG = !!validateSignificantDigits;

  /**
   * Class name.
   */

  this.__class__ = 'BigNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      const number = new BigNumber(value);

      if (Number.isNaN(number.toNumber())) {
        throw new Error(`[BigNumber Error] Not a number: ${value.toString()}`);
      }
    } catch (e) {
      if (e.message.startsWith('[BigNumber Error]')) {
        throw new Violation(this, value, { message: e.message });
      }

      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
