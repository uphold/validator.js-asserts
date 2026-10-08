'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');

/**
 * Hash algorithm regular expression mapping.
 *
 * A hex digest is case-insensitive by definition, and `sha256`/`sha512` already accepted upper
 * case. `sha1` did not, so the same commit SHA written in the conventional upper-case form was
 * rejected while its lower-case twin was accepted. Git prints object IDs in upper case, which
 * makes the inconsistency easy to hit.
 */

const hash = {
  sha1: /^[A-Fa-f0-9]{40}$/,
  sha256: /^[A-Fa-f0-9]{64}$/,
  sha512: /^[A-Fa-f0-9]{128}$/
};

/**
 * Export `HashAssert`.
 */

module.exports = function hashAssert(algorithm) {
  /**
   * Class name.
   */

  this.__class__ = 'Hash';

  if (typeof algorithm === 'undefined') {
    throw new Error('An algorithm is required.');
  }

  if (!Object.prototype.hasOwnProperty.call(hash, algorithm)) {
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
};
