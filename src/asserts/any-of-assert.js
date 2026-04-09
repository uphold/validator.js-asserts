'use strict';

/**
 * Module dependencies.
 */

const { Constraint, Validator, Violation } = require('validator.js');

/**
 * Export `AnyOfAssert`.
 */

module.exports = function anyOfAssert(...constraintSets) {
  /**
   * Class name.
   */

  this.__class__ = 'AnyOf';

  if (constraintSets.length < 2) {
    throw new Error('AnyOf constraint requires at least two constraint sets');
  }

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
        let result;

        if (Array.isArray(constraintSet)) {
          for (const constraint of constraintSet) {
            constraint.validate(value);
          }

          result = true;
        } else if (typeof constraintSet.validate === 'function') {
          result = constraintSet.validate(value);
        } else {
          const normalized = Object.fromEntries(
            Object.entries(constraintSet).map(([key, value]) => [key, Array.isArray(value) ? value : [value]])
          );

          result = this.validator.validate(value, new Constraint(normalized, { deepRequired: true }));
        }

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
