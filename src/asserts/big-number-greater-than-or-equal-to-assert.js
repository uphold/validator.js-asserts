'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BigNumberAssert = require('./big-number-assert');
const _ = require('lodash');
let BigNumber;

/**
 * Optional peer dependencies.
 */

try {
  BigNumber = require('bignumber.js');
  // eslint-disable-next-line no-empty
} catch {}

/**
 * Export `BigNumberGreaterThanOrEqualToAssert`.
 */

module.exports = function bigNumberGreaterThanOrEqualToAssert(threshold, { validateSignificantDigits = true } = {}) {
  if (!BigNumber) {
    throw new Error('BigNumber is not installed');
  }

  BigNumber.DEBUG = !!validateSignificantDigits;

  /**
   * Extend `Assert` with `BigNumberAssert`.
   */

  const Assert = BaseAssert.extend({ BigNumber: BigNumberAssert });

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberGreaterThanOrEqualTo';

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  Assert.bigNumber({ validateSignificantDigits }).validate(threshold);
  this.threshold = new BigNumber(threshold);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      Assert.bigNumber({ validateSignificantDigits }).validate(value);

      const number = new BigNumber(value);

      if (!number.isGreaterThanOrEqualTo(this.threshold)) {
        throw new Error();
      }
    } catch (e) {
      const context = { threshold: this.threshold.toString() };
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
