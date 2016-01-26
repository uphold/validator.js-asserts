'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plainObjectAssert;

var _validator = require('validator.js');

var _lodash = require('lodash');

/**
 * Export `PlainObjectAssert`.
 */

/**
 * Module dependencies.
 */

function plainObjectAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'PlainObject';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (!(0, _lodash.isPlainObject)(value)) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];