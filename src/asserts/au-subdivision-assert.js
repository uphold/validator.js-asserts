
/**
 * Module dependencies.
 */

import { includes } from 'lodash';
import { Validator, Violation } from 'validator.js';

/**
 * List of subdivisions.
 */

const subdivisions = ['NSW', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'ACT', 'NT'];

/**
 * Export `AuSubdivisionAssert`.
 */

export default function auSubdivisionAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'AuSubdivision';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    let code = value;

    if (value.length > 3) {
      if (/^AU-[A-Z]{2,3}$/.test(value) === false) {
        throw new Violation(this, value);
      }

      code = value.split('-')[1];
    }

    if (!includes(subdivisions, code)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
