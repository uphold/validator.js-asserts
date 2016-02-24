'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ukAccountNumberAssert;

var _validator = require('validator.js');

/**
 * Account number regex.
 */

const accountNumber = /^(\d){7,8}$/;

/**
 * Export `UkAccountNumberAssert`.
 */

/**
 * Module dependencies.
 */

function ukAccountNumberAssert(sortCode) {
  /**
   * Optional peer dependencies.
   */

  const Modcheck = require('modcheck');

  /**
   * Class name.
   */

  this.__class__ = 'UkAccountNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    if (typeof sortCode !== 'string') {
      throw new _validator.Violation(this, value, { sortCode: _validator.Validator.errorCode.must_be_a_string });
    }

    if (!accountNumber.test(value)) {
      throw new _validator.Violation(this, value);
    }

    const modcheck = new Modcheck(value, sortCode);

    if (!modcheck.check()) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];