'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bankIdentifierCodeAssert;

var _validator = require('validator.js');

/**
 * Bic regex.
 */

const bic = /^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$/i;

/**
 * Export `BankIdentifierCodeAssert`.
 */

/**
 * Module dependencies.
 */

function bankIdentifierCodeAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'BankIdentifierCode';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    if (!bic.test(value)) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];