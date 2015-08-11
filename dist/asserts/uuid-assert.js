
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

/**
 * Uuid regexes.
 */

var uuid = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};

/**
 * Export `UuidAssert`.
 */

exports['default'] = function (version) {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'Uuid';

  if (version && ! ~[3, 4, 5].indexOf(version)) {
    throw new Error('UUID version specified is not supported.');
  }

  /**
   * Uuid version.
   */

  this.version = version || 'all';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new _validatorJs.Violation(_this, value, { value: _validatorJs.Validator.errorCode.must_be_a_string });
    }

    if (uuid[_this.version].test(value) !== true) {
      throw new _validatorJs.Violation(_this, value, { version: _this.version });
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];