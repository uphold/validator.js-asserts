'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');
const net = require('net');

/**
 * Export `IpAssert`.
 */

module.exports = function ipAssert() {
  /**
   * Class name
   */

  this.__class__ = 'Ip';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    // A result of 0 indicates that the input value is not a valid IP.
    if (net.isIP(value) === 0) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
