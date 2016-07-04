
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';
import { isString } from 'lodash';

/**
 * Export `NullOrDateAssert`.
 */

export default function nullOrDateAssert({ format } = {}) {
  /**
   * Class name.
   */

  this.__class__ = 'NullOrDate';

  /**
   * Optional peer dependency.
   */

  let moment;

  /**
   * Validate format.
   */

  if (format) {
    if (!isString(format)) {
      throw new Error(`Unsupported format ${format} given`);
    }

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
    if (typeof value !== 'string' && value !== null && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new Violation(this, value, { value: 'must_be_null_or_a_date' });
    }

    if (value === null) {
      return true;
    }

    if (this.format) {
      if (!moment(value, this.format, true).isValid()) {
        throw new Violation(this, value);
      }

      return true;
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
