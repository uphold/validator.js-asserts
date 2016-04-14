'use strict';

/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';

/**
 * Export `TaxpayerIdentificationNumberAssert`.
 */

export default function() {
  /**
   * Optional peer dependency.
   */

  const tin = require('tin-validator');

  /**
   * Class name.
   */

  this.__class__ = 'TaxpayerIdentificationNumber';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!tin.isValid(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
