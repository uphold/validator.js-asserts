'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = notEmptyAssert;

var _validator = require('validator.js');

var _lodash = require('lodash');

/**
 * Export `NotEmptyAssert`.
 */

/**
 * Module dependencies.
 */

function notEmptyAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'NotEmpty';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if ((0, _lodash.isEmpty)(value)) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];