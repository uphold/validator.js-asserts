
/**
 * Module dependencies.
 */

var Asserts = require('validator');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;

/**
 * Export `UuidAssert`.
 */

module.exports = function(version) {

  /**
   * Class name.
   */

  this.__class__ = 'Uuid';

  /* jshint bitwise: false */
  if (version && !~[3,4,5].indexOf(version)) {
    throw new Error('UUID version specified is not supported.');
  }
  /* jshint bitwise: true */

  /**
   * UUID version.
   */

  this.version = version;

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
      /* jshint camelcase: true */
    }

    if (!Asserts.isUUID(value, this.version)) {
      throw new Violation(this, value, { version: this.version });
    }

    return true;
  };

  return this;
};
