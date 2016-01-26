'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bigNumberAssert;

var _validator = require('validator.js');

/**
 * Export `BigNumberAssert`.
 */

function bigNumberAssert() {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  /**
   * Class name.
   */

  this.__class__ = 'BigNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      new BigNumber(value); // eslint-disable-line no-new
    } catch (e) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
/**
 * Module dependencies.
 */

module.exports = exports['default'];