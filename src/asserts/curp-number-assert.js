'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');
const _ = require('lodash');
let curp;

/**
 * Optional peer dependencies.
 */

try {
  curp = require('curp');
  // eslint-disable-next-line no-empty
} catch {}

/**
 * Export `CurpNumber`.
 */

module.exports = function curpNumberAssert() {
  if (!curp) {
    throw new Error('curp is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'CurpNumber';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (!_.isString(value)) {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!curp.validar(value)) {
      throw new Violation(this, value, { value: 'must_be_a_valid_curp_number' });
    }

    return true;
  };

  return this;
};
