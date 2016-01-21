'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = abaRoutingNumberAssert;

var _abavalidator = require('abavalidator');

var _abavalidator2 = _interopRequireDefault(_abavalidator);

var _validator = require('validator.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export `AbaRoutingNumberAssert`.
 */

/**
 * Module dependencies.
 */

function abaRoutingNumberAssert() {
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

    if (!_abavalidator2.default.validate(value)) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}