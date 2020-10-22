'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const { Violation } = require('validator.js');

/**
 * Export `CallbackAssert`.
 */

module.exports = function(fn, customClass) {
  /**
   * Class name.
   */

  if (_.isNil(customClass)) {
    throw new Error('Callback must be instantiated with a custom class');
  }

  this.__class__ = customClass;

  /**
   * Fn.
   */

  if (!_.isFunction(fn)) {
    throw new Error('Callback must be instantiated with a function');
  }

  this.fn = fn;

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    let result;

    try {
      result = this.fn(value);
    } catch (error) {
      throw new Violation(this, value, { error });
    }

    if (result !== true) {
      throw new Violation(this, value, { result });
    }

    return true;
  };

  return this;
};
