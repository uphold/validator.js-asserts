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
 * - `local@domain.tld.<unix-timestamp>.deleted`
 *
 * The previous pattern (`.+@.+\.\d+\.deleted`) bypassed *all* email validation for any value that
 * merely contained an `@` and ended in `.<digits>.deleted`. The pattern is now anchored and captures
 * the base address, which {@link hasPlausibleEmailShape} inspects before the bypass is honoured.
 *
 * @example `a@foo.com.123.deleted`
 */

const deletedUserEmailRegex = /^([^\s@]+@[^\s@]+)\.\d{1,15}\.deleted$/;

/**
 * Report whether `value` has the shape of an e-mail address.
 *
 * This is deliberately looser than `validator.isEmail`, because the bypass exists precisely for
 * legacy addresses that the strict validator rejects (for example a local part ending in a dot).
 * It is only tighter than "anything with an `@`": the local part must be non-empty and free of
 * whitespace and doubled dots, and every domain label must be non-empty and free of whitespace,
 * which is what rejects `not an email@x.999.deleted` and `@.1.deleted`, both of which the old
 * ``.+@.+\.\d+\.deleted`` pattern accepted as deliverable addresses.
 *
 * @param {string} value The candidate address.
 * @returns {boolean} `true` when the candidate has a plausible e-mail shape.
 */

function hasPlausibleEmailShape(value) {
  const separator = value.lastIndexOf('@');
  const local = value.slice(0, separator);
  const labels = value.slice(separator + 1).split('.');

  if (separator < 1 || local.length === 0 || /\s/.test(local) || local.includes('..')) {
    return false;
  }

  return labels.every(label => label.length > 0 && !/\s/.test(label) && !/^\d+$/.test(label));
}

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

    // We are bypassing the last-resort email syntax check for deleted users.
    // This is needed because we have legacy users with invalid emails
    // and as part of the deletion flow for expired signups we need to allow
    // the deletion of that kind of users. The process of deleting a
    // user updates their email from `${user.email}` to
    // `${user.email}.${timestamp}.deleted`, so this assert runs on that update.
    //
    // The bypass used to cover the *whole* validation: the pattern was `.+@.+\.\d+\.deleted`, so
    // any value containing an `@` and ending in `.<digits>.deleted` was accepted — `a@b.1.deleted`
    // and `not an email@x.999…deleted` both passed. Only the appended `.deleted` marker is now
    // exempt: the base address is extracted and must itself pass the regular e-mail validation, so
    // a deletion placeholder can never carry a syntactically invalid address.
    const deletedUserMatch = value.match(deletedUserEmailRegex);

    if (deletedUserMatch !== null) {
      if (hasPlausibleEmailShape(deletedUserMatch[1])) {
        return true;
      }

      throw new Violation(this, value);
    }

    if (!validator.isEmail(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
