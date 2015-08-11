
/**
 * Module dependencies.
 */

'use strict';

exports.__esModule = true;

var _validatorJs = require('validator.js');

/**
 * Export `BooleanAssert`.
 */

exports['default'] = function () {
  var _this = this;

  /**
   * Class name.
   */

  this.__class__ = 'Boolean';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'boolean') {
      throw new _validatorJs.Violation(_this, value, { value: 'must_be_a_boolean' });
    }

    return true;
  };

  return this;
};

module.exports = exports['default'];