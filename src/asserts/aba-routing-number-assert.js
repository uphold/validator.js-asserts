
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';

/**
 * Export `AbaRoutingNumberAssert`.
 */

export default function abaRoutingNumberAssert() {
  /**
   * Optional peer dependencies.
   */

  const abaValidator = require('abavalidator');

  /**
   * Class name.
   */

  this.__class__ = 'AbaRoutingNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!abaValidator.validate(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
