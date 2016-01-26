'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = jsonAssert;

var _validator = require('validator.js');

/**
 * Export `JsonAssert`.
 */

function jsonAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'JSON';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      JSON.parse(value);
    } catch (e) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
/**
 * Module dependencies.
 */

module.exports = exports['default'];