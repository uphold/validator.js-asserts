const { Violation } = require('validator.js');
const isPlainObject = require('lodash');

/**
 * Export `PlainObjectTSAssert`.
 */

module.exports = function plainObjectTSAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'plainObjectTS';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    const prototype = Object.getPrototypeOf(value);

    if (!isPlainObject(prototype)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
