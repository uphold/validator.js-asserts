'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');

var _require = require('validator.js');

const Violation = _require.Violation;

/**
 * Export `CallbackAssert`.
 */

module.exports = function (fn, customClass) {
  /**
   * Class name.
   */

  this.__class__ = customClass || 'Callback';

  if (!_.isFunction(fn)) {
    throw new Error('Callback must be instantiated with a function');
  }

  /**
   * Fn.
   */

  this.fn = fn;

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    let result;

    try {
      result = this.fn(value);
    } catch (error) {
      throw new Violation(this, value, { error: error });
    }

    if (result !== true) {
      throw new Violation(this, value, { result: result });
    }

    return true;
  };

  return this;
};