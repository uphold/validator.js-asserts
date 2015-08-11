
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validatorJs = require('validator.js');

var _lodash = require('lodash');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

/**
 * Export `DateDiffGreaterThanAssert`.
 */

exports['default'] = function (threshold, options) {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'DateDiffGreaterThan';

  /**
   * Check if `threshold` is defined.
   */

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  /**
   * Threshold.
   */

  this.threshold = threshold;

  /**
   * Options.
   */

  this.options = _lodash.assign(this, {
    absolute: false,
    asFloat: false,
    fromDate: null,
    unit: 'milliseconds'
  }, options);

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new _validatorJs.Violation(_this, value, { value: 'must_be_a_date_or_a_string' });
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new _validatorJs.Violation(_this, value, { absolute: _this.absolute, asFloat: _this.asFloat, fromDate: _this.fromDate, threshold: _this.threshold, unit: _this.unit });
    }

    var diff = _moment2['default'](_this.fromDate || Date.now()).diff(value, _this.unit, _this.asFloat);

    if (_this.absolute) {
      diff = Math.abs(diff);
    }

    if (diff <= _this.threshold) {
      throw new _validatorJs.Violation(_this, value, { absolute: _this.absolute, asFloat: _this.asFloat, fromDate: _this.fromDate, threshold: _this.threshold, unit: _this.unit, diff: diff });
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];