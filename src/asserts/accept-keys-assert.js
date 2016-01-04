
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';
import { difference, isArray, isPlainObject } from 'lodash';

/**
 * Export `AcceptKeysAssert`.
 */

export default function acceptKeysAssert(...keys) {

  /**
   * Class name.
   */

  this.__class__ = 'AcceptKeys';

  /**
   * Keys.
   */

  this.keys = keys.length === 1 && isArray(keys[0]) ? keys[0] : keys;

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (!isPlainObject(value)) {
      throw new Violation(this, value, { value: 'must_be_a_plain_object' });
    }

    const unaccepted = difference(Object.keys(value), this.keys);

    if (unaccepted.length > 0) {
      throw new Violation(this, value, { unaccepted });
    }

    return true;
  };

  return this;
}
