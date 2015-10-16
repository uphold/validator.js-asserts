
/**
* Module dependencies.
*/

import { Validator, Violation } from 'validator.js';
import { forEach, has } from 'lodash';
import URI from 'urijs';

/**
* Export `UriAssert`.
*/

export default function(constraints) {

  /**
   * Class name.
   */

  this.__class__ = 'Uri';

  /**
   * Constraints.
   */

  this.constraints = constraints || {};

  /**
   * Validate constraints.
   */

  forEach(this.constraints, (constraint, key) => {
    if (!has(URI.prototype, key)) {
      throw new Error(`Invalid constraint "${key}=${constraint}"`);
    }
  });

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    const uri = new URI(value);

    // URIs must have at least a hostname and protocol.
    if (!uri.hostname() || !uri.protocol()) {
      throw new Violation(this, value, { constraints: this.constraints });
    }

    // Validate that each constraint matches exactly.
    forEach(this.constraints, (constraint, key) => {
      if (constraint === uri[key]()) {
        return;
      }

      throw new Violation(this, value, { constraints: this.constraints });
    }, this);

    return true;
  };

  return this;
}
