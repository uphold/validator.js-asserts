'use strict';

/**
 * Module dependencies.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  /**
   * Optional peer dependency.
   */

  const tin = require('tin-validator');

  /**
   * Class name.
   */

  this.__class__ = 'TaxpayerIdentificationNumber';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    if (!tin.isValid(value)) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
};

var _validator = require('validator.js');

module.exports = exports['default'];

/**
 * Export `TaxpayerIdentificationNumberAssert`.
 */