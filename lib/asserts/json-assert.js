
/**
 * Module dependencies.
 */

var Violation = require('validator.js').Violation;

/**
 * Export `JsonAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'JSON';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    try {
      JSON.parse(value);
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
