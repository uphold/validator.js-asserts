'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ipAssert;

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _validator = require('validator.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export `IpAssert`.
 */

/**
 * Module dependencies.
 */

function ipAssert() {
  /**
   * Class name
   */

  this.__class__ = 'Ip';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    // A result of 0 indicates that the input value is not a valid IP.
    if (_net2.default.isIP(value) === 0) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];