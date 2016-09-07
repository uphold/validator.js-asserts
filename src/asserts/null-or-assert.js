'use strict';

/**
 * Export `NullOrAssert`.
 */

module.exports = function nullOrAssert(assert) {
  /**
   * Class name.
   */

  this.__class__ = 'NullOr';

  if (typeof assert !== 'object') {
    throw new Error('Assert must be an object.');
  }

  if (typeof assert.validate !== 'function') {
    throw new Error('Assert must have a validate function.');
  }

  /**
   * Nullable assert.
   */

  this.assert = assert;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (value === null) {
      return true;
    }

    return this.assert.validate(value);
  };

  return this;
};
