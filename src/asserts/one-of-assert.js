'use strict';

/**
 * Module dependencies.
 */

const { Constraint, Validator, Violation } = require('validator.js');

/**
 * Export `OneOfAssert`.
 */

module.exports = function oneOfAssert(...constraintSets) {
  /**
   * Class name.
   */

  this.__class__ = 'OneOf';

  if (constraintSets.length < 2) {
    throw new Error('OneOf constraint requires at least two constraint sets');
  }

  /**
   * Validator instance.
   */

  this.validator = new Validator();

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    const matches = [];
    const violations = [];

    for (const constraintSet of constraintSets) {
      try {
        if (typeof constraintSet.validate === 'function') {
          constraintSet.validate(value);
          matches.push(constraintSet);
        } else if (Array.isArray(constraintSet)) {
          for (const constraint of constraintSet) {
            constraint.validate(value);
          }

          matches.push(constraintSet);
        } else {
          const result = this.validator.validate(value, new Constraint(constraintSet, { deepRequired: true }));

          if (result === true) {
            matches.push(constraintSet);
          } else {
            violations.push(result);
          }
        }
      } catch (violation) {
        violations.push(violation);
      }
    }

    if (matches.length === 1) {
      return true;
    }

    throw new Violation(this, value, matches.length > 1 ? { matches: matches.length } : violations);
  };

  return this;
};
