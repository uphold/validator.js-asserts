'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ukModulusCheckingAssert;

var _validator = require('validator.js');

/**
 * Export `UkModulusCheckingAssert`.
 */

function ukModulusCheckingAssert() {
  var _this = this;

  /**
   * Optional peer dependencies.
   */

  const UkModulusChecking = require('uk-modulus-checking');

  /**
   * Class name.
   */

  this.__class__ = 'UkModulusChecking';

  /**
   * Validation algorithm.
   */

  this.validate = function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    let accountNumber = _ref.accountNumber;
    let sortCode = _ref.sortCode;

    if (typeof accountNumber !== 'string') {
      throw new _validator.Violation(_this, accountNumber, { accountNumber: _validator.Validator.errorCode.must_be_a_string });
    }

    if (typeof sortCode !== 'string') {
      throw new _validator.Violation(_this, sortCode, { sortCode: _validator.Validator.errorCode.must_be_a_string });
    }

    const ukModulusChecking = new UkModulusChecking({ accountNumber: accountNumber, sortCode: sortCode });

    if (!ukModulusChecking.isValid()) {
      throw new _validator.Violation(_this, { accountNumber: accountNumber, sortCode: sortCode });
    }

    return true;
  };

  return this;
}
/**
 * Module dependencies.
 */

module.exports = exports['default'];