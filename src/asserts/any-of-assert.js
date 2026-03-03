'use strict';

/**
 * Module dependencies.
 */

const { Constraint, Validator, Violation } = require('validator.js');

/**
 * Export `AnyOfAssert`.
 */

module.exports = function anyOfAssert(...constraintSets) {
  if (constraintSets.length < 2) {
    throw new Error('AnyOf constraint requires at least two constraint sets');
  }

  /**
   * Class name.
   */

  this.__class__ = 'AnyOf';

  /**
   * Validator instance.
   */

  this.validator = new Validator();

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    const violations = [];

    for (const constraintSet of constraintSets) {
      try {
        const result =
          typeof constraintSet.validate === 'function'
            ? constraintSet.validate(value)
            : this.validator.validate(value, new Constraint(constraintSet, { deepRequired: true }));

        if (result === true) {
          return true;
        }

        violations.push(result);
      } catch (violation) {
        violations.push(violation);
      }
    }

    throw new Violation(this, value, violations);
  };

  return this;
};
