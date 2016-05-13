'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = emailAssert;

var _validator = require('validator.js');

/**
 * Export `EmailAssert`.
 */

function emailAssert() {
  /**
   * Optional peer dependencies.
   */

  const validator = require('validator');

  /**
   * Class name.
   */

  this.__class__ = 'Email';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    if (!validator.isEmail(value)) {
      throw new _validator.Violation(this, value);
    }

    try {
      _validator.Assert.ofLength({ max: 254 }).validate(value);
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