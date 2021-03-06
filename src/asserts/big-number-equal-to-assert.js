'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const { Assert: BaseAssert, Violation } = require('validator.js');
const BigNumberAssert = require('./big-number-assert');

/**
 * Export `BigNumberEqualToAssert`.
 */

module.exports = function bigNumberEqualToAssert(value, { validateSignificantDigits = true } = {}) {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  BigNumber.DEBUG = !!validateSignificantDigits;

  /**
   * Extend `Assert` with `BigNumberAssert`.
   */

  const Assert = BaseAssert.extend({ BigNumber: BigNumberAssert });

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberEqualTo';

  if (typeof value === 'undefined') {
    throw new Error('A value is required.');
  }

  Assert.bigNumber({ validateSignificantDigits }).validate(value);

  this.value = new BigNumber(value);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      Assert.bigNumber({ validateSignificantDigits }).validate(value);

      const number = new BigNumber(value);

      if (!number.isEqualTo(this.value)) {
        throw new Error();
      }
    } catch (e) {
      const context = { value: this.value.toString() };
      const message = e.message || _.get(e, 'violation.message');

      if (message && message.startsWith('[BigNumber Error]')) {
        context.message = message;
      }

      throw new Violation(this, value, context);
    }

    return true;
  };

  return this;
};
