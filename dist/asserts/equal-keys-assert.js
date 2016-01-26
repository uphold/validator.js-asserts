'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = equalKeysAssert;

var _validator = require('validator.js');

var _lodash = require('lodash');

/**
 * Export `EqualKeysAssert`.
 */

/**
 * Module dependencies.
 */

function equalKeysAssert() {
  for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
    keys[_key] = arguments[_key];
  }

  /**
   * Class name.
   */

  this.__class__ = 'EqualKeys';

  if (keys.length === 1 && (0, _lodash.isArray)(keys[0])) {
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
    if (!(0, _lodash.isPlainObject)(value)) {
      throw new _validator.Violation(this, value, { value: 'must_be_a_plain_object' });
    }

    const keys = Object.keys(value);

    if (keys.length === 0 && this.keys.length > 0 || this.keys.length > keys.length) {
      throw new _validator.Violation(this, value, { difference: (0, _lodash.difference)(this.keys, keys) });
    }

    const intersects = (0, _lodash.intersection)(this.keys, keys);

    if (keys.length > this.keys.length || intersects.length !== keys.length) {
      throw new _validator.Violation(this, value, { difference: (0, _lodash.difference)(keys, this.keys) });
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];