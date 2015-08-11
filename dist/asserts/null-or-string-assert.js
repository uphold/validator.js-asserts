
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

/**
 * Export `NullOrStringAssert`.
 */

exports['default'] = function (boundaries) {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'NullOrString';

  /**
   * Boundaries.
   */

  boundaries = boundaries || {};

  this.min = boundaries.min;
  this.max = boundaries.max;

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (value !== null && typeof value !== 'string') {
      throw new _validatorJs.Violation(_this, value, { value: 'must_be_null_or_a_string' });
    }

    if (value === null) {
      return true;
    }

    if (typeof value === 'string' && typeof _this.min === 'undefined' && typeof _this.max === 'undefined') {
      return true;
    }

    try {
      new _validatorJs.Assert().Length({ min: _this.min, max: _this.max }).validate(value);
    } catch (e) {
      throw new _validatorJs.Violation(_this, value, e.violation);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];