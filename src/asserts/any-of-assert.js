'use strict';

/**
 * Module dependencies.
 */

const { Constraint, Violation } = require('validator.js');

/**
 * Export `AnyOfAssert`.
 */

module.exports = function anyOfAssert(...constraintSets) {
  /**
   * Class name.
   */

  this.__class__ = 'AnyOf';

  if (constraintSets.length < 2) {
    throw new Error('AnyOf assert requires at least two constraint sets');
  }

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    const violations = [];

    for (const constraintSet of constraintSets) {
      const result = new Constraint(constraintSet, { deepRequired: true }).check(value);

      if (result === true) {
        return true;
      }

      violations.push(result);
    }

    throw new Violation(this, value, violations);
  };

  return this;
};
