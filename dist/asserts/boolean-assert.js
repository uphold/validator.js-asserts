'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = booleanAssert;

var _validator = require('validator.js');

/**
 * Export `BooleanAssert`.
 */

function booleanAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'Boolean';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'boolean') {
      throw new _validator.Violation(this, value, { value: 'must_be_a_boolean' });
    }

    return true;
  };

  return this;
}
/**
 * Module dependencies.
 */

module.exports = exports['default'];