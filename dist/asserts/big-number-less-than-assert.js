
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validatorJs = require('validator.js');

var _bignumberJs = require('bignumber.js');

var _bignumberJs2 = _interopRequireDefault(_bignumberJs);

/**
 * Export `BigNumberLessThan`.
 */

exports['default'] = function (threshold) {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberLessThan';

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  this.threshold = new _bignumberJs2['default'](threshold);

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    try {
      var number = new _bignumberJs2['default'](value);

      if (!number.lessThan(_this.threshold)) {
        throw new Error();
      }
    } catch (e) {
      var context = { threshold: _this.threshold.toString() };

      if (e.name === 'BigNumber Error') {
        context.message = e.message;
      }

      throw new _validatorJs.Violation(_this, value, context);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];