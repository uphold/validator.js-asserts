
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

/**
 * Int regex.
 */

var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;

/**
 * Export `IntegerAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'Integer';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'number') {
      throw new _validatorJs.Violation(_this, value, { value: _validatorJs.Validator.errorCode.must_be_a_number });
    }

    if (int.test(value) !== true) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];