
/**
 * Module dependencies.
 */

var Violation = require('validator.js').Violation;
var isPlainObject = require('lodash/lang/isPlainObject');

/**
 * Export `PlainObjectAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'PlainObject';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if (!isPlainObject(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
