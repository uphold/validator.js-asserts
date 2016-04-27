
/**
 * Module dependencies.
 */

import DateAssert from './date-assert';
import { Assert as BaseAssert, Violation } from 'validator.js';
import { assign } from 'lodash';

/**
 * Extend Assert with `DateAssert`.
 */

const Assert = BaseAssert.extend({ Date: DateAssert });

/**
 * Export `DateDiffGreaterThanAssert`.
 */

export default function dateDiffGreaterThanAssert(threshold, options) {
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

  this.options = assign(this, {
    absolute: false,
    asFloat: false,
    fromDate: null,
    unit: 'milliseconds'
  }, options);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      new Assert().Date().validate(value);
    } catch (e) {
      throw new Violation(this, value, { value: 'must_be_a_date_or_a_string_or_a_number' });
    }

    let diff = moment(this.fromDate || Date.now()).diff(value, this.unit, this.asFloat);

    if (this.absolute) {
      diff = Math.abs(diff);
    }

    if (diff <= this.threshold) {
      throw new Violation(this, value, { absolute: this.absolute, asFloat: this.asFloat, diff, fromDate: this.fromDate, threshold: this.threshold, unit: this.unit });
    }

    return true;
  };

  return this;
}
