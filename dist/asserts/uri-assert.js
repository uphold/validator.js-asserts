'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uriAssert;

var _validator = require('validator.js');

var _lodash = require('lodash');

/**
 * Export `UriAssert`.
 */

/**
* Module dependencies.
*/

function uriAssert(constraints) {
  /**
   * Optional peer dependencies.
   */

  const URI = require('urijs');

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

  (0, _lodash.forEach)(this.constraints, (constraint, key) => {
    if (!(0, _lodash.has)(URI.prototype, key)) {
      throw new Error(`Invalid constraint "${ key }=${ constraint }"`);
    }
  });

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    const uri = new URI(value);

    // URIs must have at least a hostname and protocol.
    if (!uri.hostname() || !uri.protocol()) {
      throw new _validator.Violation(this, value, { constraints: this.constraints });
    }

    // Validate that each constraint matches exactly.
    (0, _lodash.forEach)(this.constraints, (constraint, key) => {
      if (key === 'is' && uri[key](constraint)) {
        return;
      }

      if (key !== 'is' && constraint === uri[key]()) {
        return;
      }

      throw new _validator.Violation(this, value, { constraints: this.constraints });
    }, this);

    return true;
  };

  return this;
}
module.exports = exports['default'];