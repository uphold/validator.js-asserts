'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bigNumberGreaterThanAssert;

var _validator = require('validator.js');

/**
 * Export `BigNumberGreaterThanAssert`.
 */

function bigNumberGreaterThanAssert(threshold) {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberGreaterThan';

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  this.threshold = new BigNumber(threshold);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    BigNumber.DEBUG = true;

    try {
      const number = new BigNumber(value);

      if (!number.isGreaterThan(this.threshold)) {
        throw new Error();
      }
    } catch (e) {
      const context = { threshold: this.threshold.toString() };

      if (e.message.startsWith('[BigNumber Error]')) {
        context.message = e.message;
      }

      throw new _validator.Violation(this, value, context);
    }

    return true;
  };

  return this;
}
/**
 * Module dependencies.
 */

module.exports = exports['default'];