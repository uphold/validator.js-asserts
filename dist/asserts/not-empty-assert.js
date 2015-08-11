
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

var _lodash = require('lodash');

/**
 * Export `NotEmptyAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'NotEmpty';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (_lodash.isEmpty(value)) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];