
/**
* Module dependencies.
*/

import { Assert, Validator, Violation } from 'validator.js';

/**
 * Export `EmailAssert`.
 */

export default function emailAssert() {
  /**
   * Optional peer dependencies.
   */

  const validator = require('validator');

  /**
   * Class name.
   */

  this.__class__ = 'Email';

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!validator.isEmail(value)) {
      throw new Violation(this, value);
    }

    try {
      new Assert().Length({ max: 254 }).validate(value);
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
