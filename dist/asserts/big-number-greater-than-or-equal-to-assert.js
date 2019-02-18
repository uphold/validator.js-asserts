'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bigNumberGreaterThanOrEqualToAssert;

var _bigNumberAssert = require('./big-number-assert');

var _bigNumberAssert2 = _interopRequireDefault(_bigNumberAssert);

var _validator = require('validator.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export `BigNumberGreaterThanOrEqualToAssert`.
 */

/**
 * Module dependencies.
 */

function bigNumberGreaterThanOrEqualToAssert(threshold) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$validateSignific = _ref.validateSignificantDigits;

  let validateSignificantDigits = _ref$validateSignific === undefined ? true : _ref$validateSignific;

  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  BigNumber.DEBUG = !!validateSignificantDigits;

  /**
   * Extend `Assert` with `BigNumberAssert`.
   */

  const Assert = _validator.Assert.extend({ BigNumber: _bigNumberAssert2.default });

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberGreaterThanOrEqualTo';

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  new Assert().BigNumber({ validateSignificantDigits: validateSignificantDigits }).validate(threshold);

  this.threshold = new BigNumber(threshold);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    new Assert().BigNumber({ validateSignificantDigits: validateSignificantDigits }).validate(value);

    try {
      const number = new BigNumber(value);

      if (!number.isGreaterThanOrEqualTo(this.threshold)) {
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
module.exports = exports['default'];