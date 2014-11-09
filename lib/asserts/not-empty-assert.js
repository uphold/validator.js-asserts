
/**
 * Module dependencies.
 */

var _ = require('lodash');
var Violation = require('validator.js').Violation;

/**
 * Export `NotEmptyAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'NotEmpty';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if (_.isEmpty(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
