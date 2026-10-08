'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');

/**
 * Export `JsonAssert`.
 */

module.exports = function jsonAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'JSON';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    // `JSON.parse` coerces its argument, so without this guard `123` and `null` were accepted as
    // valid JSON even though every other assert in this package rejects non-strings with
    // `must_be_a_string`. A field meant to hold a JSON document must actually be a string.
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    try {
      JSON.parse(value);
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
