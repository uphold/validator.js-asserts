
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

/**
 * Export `DateAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'Date';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new _validatorJs.Violation(_this, value, { value: 'must_be_a_date_or_a_string' });
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];