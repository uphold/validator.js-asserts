
/**
 * Module dependencies.
 */

var Violation = require('validator.js').Violation;
var isEmpty = require('lodash/lang/isEmpty');

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
    if (isEmpty(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
