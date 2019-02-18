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
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$validateSignific = _ref.validateSignificantDigits;

  let validateSignificantDigits = _ref$validateSignific === undefined ? true : _ref$validateSignific;

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
        throw new _validator.Violation(this, value, { message: e.message });
      }

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