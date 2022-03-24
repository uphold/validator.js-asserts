'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const { Validator, Violation } = require('validator.js');
let cpf;

/**
 * Optional peer dependencies.
 */

try {
  cpf = require('cpf');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `CpfNumber`.
 */

module.exports = function cpfNumberAssert() {
  if (!cpf) {
    throw new Error('cpf is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'CpfNumber';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (!_.isString(value)) {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!cpf.isValid(value)) {
      throw new Violation(this, value, { value: 'must_be_a_valid_cpf_number' });
    }

    return true;
  };

  return this;
};
