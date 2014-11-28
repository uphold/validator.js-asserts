
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

  this.options = _.extend({
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
      throw new Violation(this, value, { threshold: this.threshold, unit: this.options.unit, asFloat: this.options.asFloat, fromDate: this.options.fromDate });
    }

    var diff = moment(this.options.fromDate || Date.now()).diff(value, this.options.unit, this.options.asFloat);

    if (diff >= this.threshold) {
      throw new Violation(this, value, { threshold: this.threshold, unit: this.options.unit, asFloat: this.options.asFloat, fromDate: this.options.fromDate, diff: diff });
    }

    return true;
  };

  return this;
};
