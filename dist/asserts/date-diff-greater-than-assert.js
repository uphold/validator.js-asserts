'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dateDiffGreaterThanAssert;

var _validator = require('validator.js');

var _lodash = require('lodash');

/**
 * Export `DateDiffGreaterThanAssert`.
 */

/**
 * Module dependencies.
 */

function dateDiffGreaterThanAssert(threshold, options) {
  /**
   * Optional peer dependencies.
   */

  const moment = require('moment');

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

  this.options = (0, _lodash.assign)(this, {
    absolute: false,
    asFloat: false,
    fromDate: null,
    unit: 'milliseconds'
  }, options);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new _validator.Violation(this, value, { value: 'must_be_a_date_or_a_string' });
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new _validator.Violation(this, value, { absolute: this.absolute, asFloat: this.asFloat, fromDate: this.fromDate, threshold: this.threshold, unit: this.unit });
    }

    let diff = moment(this.fromDate || Date.now()).diff(value, this.unit, this.asFloat);

    if (this.absolute) {
      diff = Math.abs(diff);
    }

    if (diff <= this.threshold) {
      throw new _validator.Violation(this, value, { absolute: this.absolute, asFloat: this.asFloat, diff: diff, fromDate: this.fromDate, threshold: this.threshold, unit: this.unit });
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];