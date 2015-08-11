
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validatorJs = require('validator.js');

var _creditcard = require('creditcard');

var _creditcard2 = _interopRequireDefault(_creditcard);

/**
 * Export `CreditCardAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'CreditCard';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new _validatorJs.Violation(_this, value, { value: 'must_be_a_string_or_a_number' });
    }

    if (_creditcard2['default'].validate(value) !== true) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];