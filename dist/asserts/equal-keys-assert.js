
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

var _lodash = require('lodash');

/**
 * Export `EqualKeysAssert`.
 */

exports['default'] = function (keys) {
  var _this = this;

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

  this.validate = function (value) {
    if (!_lodash.isPlainObject(value)) {
      throw new _validatorJs.Violation(_this, value, { value: 'must_be_a_plain_object' });
    }

    var diff = _lodash.difference(Object.keys(value), _this.keys);

    if (diff.length > 0) {
      throw new _validatorJs.Violation(_this, value, { difference: diff });
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];