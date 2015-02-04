
/**
 * Module dependencies.
 */

var objectid = require('objectid');
var Violation = require('validator.js').Violation;

/**
 * Export `MongoIdAssert`.
 */

module.exports = function() {

  /**
   * Class name.
   */

  this.__class__ = 'MongoId';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if (!objectid.isValid(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
