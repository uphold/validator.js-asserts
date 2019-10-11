
/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');
const { isPlainObject } = require('lodash');

/**
 * Export `PlainObjectAssert`.
 */

module.exports = function plainObjectAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'PlainObject';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (!isPlainObject(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
