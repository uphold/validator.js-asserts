'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');

/**
 * Uuid regexes.
 */

const uuid = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  7: /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  max: /^FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF$/i,
  nil: /^00000000-0000-0000-0000-000000000000$/i
};

/**
 * Export `UuidAssert`.
 */

module.exports = function uuidAssert(version) {
  /**
   * Class name.
   */

  this.__class__ = 'Uuid';

  if (version && !uuid[version]) {
    throw new Error('UUID version specified is not supported.');
  }

  /**
   * Uuid version.
   */

  this.version = version || 'all';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (uuid[this.version].test(value) !== true) {
      throw new Violation(this, value, { version: this.version });
    }

    return true;
  };

  return this;
};
