'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const UuidAssert = require('./uuid-assert');

/**
 * Export `NullOrUuidAssert`.
 */

module.exports = function nullOrUuidAssert(version) {
  /**
   * Extend `Assert` with `UuidAssert`.
   */

  const Assert = BaseAssert.extend({ Uuid: UuidAssert });
  /**
   * Class name.
   */

  this.__class__ = 'NullOrUuid';

  /**
   * Uuid version.
   */

  this.version = version;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (value !== null && typeof value !== 'string') {
      throw new Violation(this, value, { value: 'must_be_null_or_an_uuid' });
    }

    if (value === null) {
      return true;
    }

    try {
      Assert.uuid(this.version).validate(value);
    } catch (e) {
      throw new Violation(this, value, e.violation);
    }

    return true;
  };

  return this;
};
