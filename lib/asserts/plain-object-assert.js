
/**
 * Module dependencies.
 */

var _ = require('lodash');
var Violation = require('validator.js').Violation;

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
    if (!_.isPlainObject(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
