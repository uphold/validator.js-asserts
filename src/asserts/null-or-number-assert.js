'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const { Violation } = require('validator.js');

/**
 * Export `NullOrNumberAssert`.
 */

module.exports = function nullOrNumberAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'NullOrNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (value !== null && !_.isNumber(value)) {
      throw new Violation(this, value, { value: 'must_be_null_or_a_number' });
    }

    return true;
  };

  return this;
};
