'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bigNumberEqualToAssert;

var _validator = require('validator.js');

/**
 * Export `BigNumberEqualToAssert`.
 */

function bigNumberEqualToAssert(value) {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberEqualTo';

  if (typeof value === 'undefined') {
    throw new Error('A value is required.');
  }

  this.value = new BigNumber(value);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      const number = new BigNumber(value);

      if (!number.equals(this.value)) {
        throw new Error();
      }
    } catch (e) {
      const context = { value: this.value.toString() };

      if (e.name === 'BigNumber Error') {
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