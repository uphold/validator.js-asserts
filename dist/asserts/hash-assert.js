
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

/**
 * Hash algorithm regular expression mapping.
 */

var hash = {
  sha1: /^[a-f0-9]{40}$/,
  sha256: /^[A-Fa-f0-9]{64}$/,
  sha512: /^[A-Fa-f0-9]{128}$/
};

/**
 * Export `HashAssert`.
 */

exports['default'] = function (algorithm) {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'Hash';

  if (typeof algorithm === 'undefined') {
    throw new Error('An algorithm is required.');
  }

  if (!(algorithm in hash)) {
    throw new Error('The algorithm specified is not supported.');
  }

  /**
   * Algorithm.
   */

  this.algorithm = algorithm;

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new _validatorJs.Violation(_this, value, { value: _validatorJs.Validator.errorCode.must_be_a_string });
    }

    if (!hash[_this.algorithm].test(value)) {
      throw new _validatorJs.Violation(_this, value, { algorithm: _this.algorithm });
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];