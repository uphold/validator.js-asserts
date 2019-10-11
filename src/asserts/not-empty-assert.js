'use strict';

/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');
const { isEmpty } = require('lodash');

/**
 * Export `NotEmptyAssert`.
 */

module.exports = function notEmptyAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'NotEmpty';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (isEmpty(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
