'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const { Validator, Violation } = require('validator.js');
let validateRfc;

/**
 * Optional peer dependencies.
 */

try {
  validateRfc = require('validate-rfc');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `RfcNumber`.
 */

module.exports = function rfcNumberAssert() {
  if (!validateRfc) {
    throw new Error('validate-rfc is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'RfcNumber';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (!_.isString(value)) {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!validateRfc(value).isValid) {
      throw new Violation(this, value, { value: 'must_be_a_valid_rfc_number' });
    }

    return true;
  };

  return this;
};
