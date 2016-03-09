
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `DateFormatAssert`.
 */

export default function dateFormatAssert(format) {
  if (!format) {
    throw new Error('Parameter `format` is required.');
  }

  /**
   * Optional peer dependencies.
   */

  const moment = require('moment');

  /**
   * Class name.
   */

  this.__class__ = 'DateFormat';

  /**
   * Date format.
   */

  this.format = format;

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
      throw new Violation(this, value, { value: 'must_be_a_date_or_a_string' });
      /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
    }

    if (!moment(value, this.format, true).isValid()) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
