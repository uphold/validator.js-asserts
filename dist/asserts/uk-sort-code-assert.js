'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ukSortCodeAssert;

var _validator = require('validator.js');

/**
 * Sort code regex.
 */

const sortCode = /^(?!(?:0{6}|00-00-00))(?:\d{6}|\d\d-\d\d-\d\d)$/;

/**
 * Export `UkSortCodeAssert`.
 */

/**
 * Module dependencies.
 */

function ukSortCodeAssert() {
  /**
   * Optional peer dependencies.
   */

  const Modcheck = require('modcheck');

  /**
   * Class name.
   */

  this.__class__ = 'UkSortCode';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    if (!sortCode.test(value)) {
      throw new _validator.Violation(this, value);
    }

    const modcheck = new Modcheck('00000000', value);

    if (!modcheck.getSortCodeChecks()) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];