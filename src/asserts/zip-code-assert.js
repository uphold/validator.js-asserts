'use strict';

/**
 * Module dependencies.
 */

const { Assert, Validator, Violation } = require('validator.js');
const { CaZipCode, UsZipCode } = require('../index.js');
const {
  common: { getCountriesAlpha2 }
} = require('@uphold/countries');
const _ = require('lodash');
const zipCodes = require('@uphold/zip-codes');

/**
 * Constants.
 */

const countriesAlpha2 = getCountriesAlpha2();

/**
 * Instances.
 */

const is = Assert.extend({ CaZipCode, UsZipCode });

/**
 * Export `ZipCodeAssert`.
 */

module.exports = function zipCodeAssert(data = {}) {
  /**
   * Class name.
   */

  this.__class__ = 'ZipCode';
  this.country = data && data.country;
  this.state = data && data.state;

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (value !== null && !_.isString(value)) {
      throw new Violation(this, value, { value: 'must_be_null_or_a_string' });
    }

    if (!_.isString(this.country)) {
      throw new Violation(this, value, { country: Validator.errorCode.must_be_a_string });
    }

    if (!countriesAlpha2.includes(this.country)) {
      throw new Violation(this, value, { reason: 'invalid-country' });
    }

    if (this.country === 'US' && is.usZipCode().check(value) !== true) {
      throw new Violation(this, value, { reason: 'invalid-zip-code' });
    }

    if (this.country === 'CA' && is.caZipCode().check(value) !== true) {
      throw new Violation(this, value, { reason: 'invalid-zip-code' });
    }

    const state = this.state && this.state.split('-')[1];

    if (
      this.country &&
      state &&
      _.has(zipCodes, `${this.country}.${state}`) &&
      !(zipCodes[this.country][state] || []).find(zip => value.toUpperCase().startsWith(zip.toUpperCase()))
    ) {
      throw new Violation(this, value, { reason: 'invalid-state-zip-code' });
    }

    return true;
  };

  return this;
};
