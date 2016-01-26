'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = abaRoutingNumberAssert;

var _validator = require('validator.js');

/**
 * Export `AbaRoutingNumberAssert`.
 */

function abaRoutingNumberAssert() {
  /**
   * Optional peer dependencies.
   */

  const abaValidator = require('abavalidator');

  /**
   * Class name.
   */

  this.__class__ = 'AbaRoutingNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    if (!abaValidator.validate(value)) {
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