
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';
import { isString } from 'lodash';

/**
 * Export `DateAssert`.
 */

export default function dateAssert({ format } = {}) {
  /**
   * Class name.
   */

  this.__class__ = 'Date';

  /**
   * Optional peer dependency.
   */

  let moment;

  /**
   * Validate format.
   */

  if (format) {
    moment = require('moment');
  }

  /**
   * Format to match the input.
   */

  this.format = format;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new Violation(this, value, { value: 'must_be_a_date_or_a_string' });
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new Violation(this, value);
    }

    if (!this.format) {
      return true;
    }

    if (!moment(value, this.format, true).isValid()) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
