'use strict';

/**
 * Module dependencies.
 */

const { Assert: is, Validator, Violation } = require('validator.js');
let validator;

/**
 * Deleted email regex.
 *
 * The email should contain the following pattern:
 * - `.+@.+\.any-number\.deleted`.
 *
 * @example `a@foo.com.123.deleted`
 */

const deletedUserEmailRegex = /.+@.+\.\d+\.deleted$/;

/**
 * Optional peer dependencies.
 */

try {
  validator = require('validator');
  // eslint-disable-next-line no-empty
} catch {}

/**
 * Export `EmailAssert`.
 */

module.exports = function emailAssert() {
  if (!validator) {
    throw new Error('validator is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'Email';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    try {
      is.ofLength({ max: 254 }).validate(value);
    } catch (e) {
      throw new Violation(this, value);
    }

    // We are bypassing the email validation for deleted users.
    // This is needed because we have legacy users with invalid emails
    // and as part of the deletion flow for expired signups we need to allow
    // the deletion of that kind of users. The process of deleting a
    // user updates their email from `${user.email}` to
    // `${user.email}.${timestamp}.deleted`, so this assert runs on that update.
    if (deletedUserEmailRegex.test(value) === true) {
      return true;
    }

    if (!validator.isEmail(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
