
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

/**
 * Export `NullOrDateAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'NullOrDate';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string' && value !== null && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new _validatorJs.Violation(_this, value, { value: 'must_be_null_or_a_date' });
    }

    if (value === null) {
      return true;
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];