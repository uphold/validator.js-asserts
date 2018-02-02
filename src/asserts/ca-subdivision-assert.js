
/**
 * Module dependencies.
 */

import { includes } from 'lodash';
import { Validator, Violation } from 'validator.js';

/**
 * List of subdivisions.
 */

const subdivisions = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];

/**
 * Export `CaSubdivisionAssert`.
 */

export default function caSubdivisionAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'CaSubdivision';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    let code = value;

    if (value.length > 3) {
      if (/^CA-[A-Z]{2,3}$/.test(value) === false) {
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
