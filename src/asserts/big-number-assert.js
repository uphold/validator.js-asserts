'use strict';

/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');
let BigNumber;

/**
 * Optional peer dependencies.
 */

try {
  BigNumber = require('bignumber.js');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `BigNumberAssert`.
 */

module.exports = function bigNumberAssert({ validateSignificantDigits = true } = {}) {
  if (!BigNumber) {
    throw new Error('BigNumber is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'BigNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    const bigNumberDebug = BigNumber.DEBUG;

    try {
      BigNumber.DEBUG = !!validateSignificantDigits;

      const number = new BigNumber(value);

      if (Number.isNaN(number.toNumber())) {
        throw new Error(`[BigNumber Error] Not a number: ${value.toString()}`);
      }
    } catch (e) {
      if (e.message.startsWith('[BigNumber Error]')) {
        throw new Violation(this, value, { message: e.message });
      }

      throw new Violation(this, value);
    } finally {
      BigNumber.DEBUG = bigNumberDebug;
    }

    return true;
  };

  return this;
};
