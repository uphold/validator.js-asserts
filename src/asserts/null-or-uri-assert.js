'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const UriAssert = require('./uri-assert');

/**
 * Extend `Assert` with `UriAssert`.
 */

const Assert = BaseAssert.extend({
  Uri: UriAssert
});

/**
 * Export `NullOrUriAssert`.
 */

module.exports = function nullOrUriAssert(constraints) {
  /**
   * Class name.
   */

  this.__class__ = 'NullOrUri';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (value === null) {
      return true;
    }

    try {
      Assert.uri(constraints).validate(value);
    } catch (e) {
      throw new Violation(this, value, e.violation);
    }

    return true;
  };

  return this;
};
