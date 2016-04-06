
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';

/**
 * Hash algorithm regular expression mapping.
 */

const hash = {
  sha1: /^[a-f0-9]{40}$/,
  sha256: /^[A-Fa-f0-9]{64}$/,
  sha512: /^[A-Fa-f0-9]{128}$/
};

/**
 * Export `HashAssert`.
 */

export default function hashAssert(algorithm) {
  /**
   * Class name.
   */

  this.__class__ = 'Hash';

  if (typeof algorithm === 'undefined') {
    throw new Error('An algorithm is required.');
  }

  if (!(algorithm in hash)) {
    throw new Error('The algorithm specified is not supported.');
  }

  /**
   * Algorithm.
   */

  this.algorithm = algorithm;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!hash[this.algorithm].test(value)) {
      throw new Violation(this, value, { algorithm: this.algorithm });
    }

    return true;
  };

  return this;
}
