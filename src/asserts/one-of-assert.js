'use strict';

/**
 * Module dependencies.
 */

const { Constraint, Violation } = require('validator.js');

/**
 * Export `OneOfAssert`.
 */

module.exports = function oneOfAssert(...constraintSets) {
  this.__class__ = 'OneOf';

  if (constraintSets.length < 2) {
    throw new Error('OneOf assert requires at least two constraint sets');
  }

  this.validate = value => {
    const matches = [];
    const violations = [];

    for (const constraintSet of constraintSets) {
      const result = new Constraint(constraintSet, { deepRequired: true }).check(value);

      if (result === true) {
        matches.push(constraintSet);
      } else {
        violations.push(result);
      }
    }

    if (matches.length === 1) {
      return true;
    }

    if (matches.length > 1) {
      violations.push(new Violation(this, value, { value: 'more_than_one_constraint_set_matched' }));
    }

    throw new Violation(this, value, violations);
  };

  return this;
};
