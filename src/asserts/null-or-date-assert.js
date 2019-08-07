
/**
 * Module dependencies.
 */

import DateAssert from './date-assert';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend Assert with `DateAssert`.
 */

const Assert = BaseAssert.extend({ Date: DateAssert });

/**
 * Export `NullOrDateAssert`.
 */

export default function nullOrDateAssert({ format } = {}) {
  /**
   * Class name.
   */

  this.__class__ = 'NullOrDate';

  /**
   * Format to match the input.
   */

  this.format = format;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (value === null) {
      return true;
    }

    try {
      new Assert().Date({ format }).validate(value);
    } catch (e) {
      throw new Violation(this, value, { value: 'must_be_null_or_a_date_or_a_number' });
    }

    return true;
  };

  return this;
}
