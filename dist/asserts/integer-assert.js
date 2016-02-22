'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = integerAssert;

var _validator = require('validator.js');

/**
 * Int regex.
 */

const int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;

/**
 * Export `IntegerAssert`.
 */

/**
 * Module dependencies.
 */

function integerAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'Integer';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'number') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_number });
    }

    if (int.test(value) !== true) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];