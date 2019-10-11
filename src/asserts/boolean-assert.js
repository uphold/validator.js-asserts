
/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');

/**
 * Export `BooleanAssert`.
 */

module.exports = function booleanAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'Boolean';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'boolean') {
      throw new Violation(this, value, { value: 'must_be_a_boolean' });
    }

    return true;
  };

  return this;
}
