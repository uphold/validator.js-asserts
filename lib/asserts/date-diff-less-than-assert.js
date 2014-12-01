
/**
 * Module dependencies.
 */

var _ = require('lodash');
var DateAssert = require('./date-assert');
var Violation = require('validator.js').Violation;
var moment = require('moment');

/**
 * Export `DateDiffLessThanAssert`.
 */

module.exports = function(threshold, options) {

  /**
   * Class name.
   */

  this.__class__ = 'DateDiffLessThan';

  /**
   * Check if `threshold` is defined.
   */

  if ('undefined' === typeof threshold) {
    throw new Error('A threshold value is required.');
  }

  /**
   * Threshold.
   */

  this.threshold = threshold;

  /**
   * Options.
   */

  this.options = _.extend(this, {
    absolute: false,
    asFloat: false,
    fromDate: null,
    unit: 'milliseconds'
  }, options);

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    try {
      new DateAssert().validate(value);
    } catch (e) {
      throw new Violation(this, value, { absolute: this.absolute, asFloat: this.asFloat, fromDate: this.fromDate, threshold: this.threshold, unit: this.unit });
    }

    var diff = moment(this.fromDate || Date.now()).diff(value, this.unit, this.asFloat);

    if (this.absolute) {
      diff = Math.abs(diff);
    }

    if (diff >= this.threshold) {
      throw new Violation(this, value, { absolute: this.absolute, asFloat: this.asFloat, diff: diff, fromDate: this.fromDate, threshold: this.threshold, unit: this.unit });
    }

    return true;
  };

  return this;
};
