
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

var _lodash = require('lodash');

/**
 * Export `PlainObjectAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'PlainObject';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (!_lodash.isPlainObject(value)) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];