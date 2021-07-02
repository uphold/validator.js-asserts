'use strict';

/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');

/**
 * Export `NullOrBooleanAssert`.
 */

module.exports = function nullOrBooleanAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'NullOrBoolean';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (value !== null && typeof value !== 'boolean') {
      throw new Violation(this, value, { value: 'must_be_null_or_a_boolean' });
    }

    return true;
  };

  return this;
};
