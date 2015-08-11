
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

/**
 * Export `JsonAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'JSON';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    try {
      JSON.parse(value);
    } catch (e) {
      throw new _validatorJs.Violation(_this, value);
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];