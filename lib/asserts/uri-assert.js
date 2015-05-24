
/**
* Module dependencies.
*/

var _ = require('lodash');
var URI = require('URIjs');
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var fmt = require('util').format;

/**
* Export `UriAssert`.
*/

module.exports = function(constraints) {

  /**
   * Class name.
   */

  this.__class__ = 'Uri';

  /**
   * Constraints.
   */

  this.constraints = constraints || {};

  /**
   * Validate constraints.
   */

  _.forEach(this.constraints, function(constraint, key) {
    if (!_.has(URI.prototype, key)) {
      throw new Error(fmt('Invalid constraint "%s=%s"', key, constraint));
    }
  });

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if ('string' !== typeof value) {
      /* jshint camelcase: false */
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
      /* jshint camelcase: true */
    }

    var uri;

    try {
      uri = new URI(value)
    } catch (e) {
      throw new Violation(this, value, { constraints: this.constraints });
    }

    // URIs must have at least a hostname and protocol.
    if (!uri.hostname() || !uri.protocol()) {
      throw new Violation(this, value, { constraints: this.constraints });
    }

    // Validate that each constraint matches exactly.
    _.forEach(this.constraints, function(constraint, key) {
      if (constraint === uri[key]()) {
        return;
      }

      throw new Violation(this, value, { constraints: this.constraints });
    }, this);

    return true;
  };

  return this;
};
