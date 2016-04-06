
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';
import { difference, intersection, isArray, isPlainObject } from 'lodash';

/**
 * Export `EqualKeysAssert`.
 */

export default function equalKeysAssert(...keys) {
  /**
   * Class name.
   */

  this.__class__ = 'EqualKeys';

  if (keys.length === 1 && isArray(keys[0])) {
    keys = keys[0];
  }

  /**
   * Keys.
   */

  this.keys = keys;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (!isPlainObject(value)) {
      throw new Violation(this, value, { value: 'must_be_a_plain_object' });
    }

    const keys = Object.keys(value);

    if (keys.length === 0 && this.keys.length > 0 || this.keys.length > keys.length) {
      throw new Violation(this, value, { difference: difference(this.keys, keys) });
    }

    const intersects = intersection(this.keys, keys);

    if (keys.length > this.keys.length || intersects.length !== keys.length) {
      throw new Violation(this, value, { difference: difference(keys, this.keys) });
    }

    return true;
  };

  return this;
}
