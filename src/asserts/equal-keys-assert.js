
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';
import { difference, isPlainObject } from 'lodash';

/**
 * Export `EqualKeysAssert`.
 */

export default function(keys) {

  /**
   * Class name.
   */

  this.__class__ = 'EqualKeys';

  /**
   * Keys.
   */

  this.keys = keys;

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (!isPlainObject(value)) {
      throw new Violation(this, value, { value: 'must_be_a_plain_object' });
    }

    const diff = difference(Object.keys(value), this.keys);

    if (diff.length > 0) {
      throw new Violation(this, value, { difference: diff });
    }

    return true;
  };

  return this;
}
