
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validatorJs = require('validator.js');

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

/**
 * Export `IpAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name
   */

  this.__class__ = 'Ip';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new _validatorJs.Violation(_this, value, { value: _validatorJs.Validator.errorCode.must_be_a_string });
    }

    // A result of 0 indicates that the input value is not a valid IP.
    if (_net2['default'].isIP(value) === 0) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];