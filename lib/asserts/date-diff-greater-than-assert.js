
/**
 * Module dependencies.
 */

var Asserts = require('validator');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assign = require('lodash/object/assign');
var moment = require('moment');

/**
 * Add custom error code for `date` or `string`.
 */

/* jshint camelcase: false */
Validator.errorCode.must_be_a_date_or_a_string = 'must_be_a_date_or_a_string';
/* jshint camelcase: true */

/**
 * Export `DateDiffGreaterThanAssert`.
 */

module.exports = function(threshold, options) {

  /**
   * Class name.
   */

  this.__class__ = 'DateDiffGreaterThan';

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

  this.options = assign(this, {
    absolute: false,
    asFloat: false,
    fromDate: null,
    unit: 'milliseconds'
  }, options);

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value && !(value instanceof Date)) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_date_or_a_string });
      /* jshint camelcase: true */
    }

    if (true !== Asserts.isDate(value)) {
      throw new Violation(this, value, { absolute: this.absolute, asFloat: this.asFloat, fromDate: this.fromDate, threshold: this.threshold, unit: this.unit });
    }

    var diff = moment(this.fromDate || Date.now()).diff(value, this.unit, this.asFloat);

    if (this.absolute) {
      diff = Math.abs(diff);
    }

    if (diff <= this.threshold) {
      throw new Violation(this, value, { absolute: this.absolute, asFloat: this.asFloat, fromDate: this.fromDate, threshold: this.threshold, unit: this.unit, diff: diff });
    }

    return true;
  };

  return this;
};
