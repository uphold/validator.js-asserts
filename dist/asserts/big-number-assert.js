
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
 * Export `BigNumberAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'BigNumber';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    try {
      new _bignumberJs2['default'](value);
    } catch (e) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];