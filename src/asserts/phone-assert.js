'use strict';

/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';
import { includes, intersection, isArray, keys } from 'lodash';

/**
 * Export `Phone`.
 */

export default function phoneAssert({ countryCode, allowedTypes } = {}) {
  /**
   * Peer dependency `google-libphonenumber`.
   */

  const { PhoneNumberType, PhoneNumberUtil } = require('google-libphonenumber');

  /**
   * Phone util instance.
   */

  const phoneUtil = PhoneNumberUtil.getInstance();

  /**
   * Class name.
   */

  this.__class__ = 'Phone';

  /**
   * Country code to test the phone number in. May be not be set if the number is
   * guaranteed to start with a '+' followed by the country calling code (E164).
   */

  this.countryCode = countryCode;

  /**
   * The allowed phone number types.
   */

  if (allowedTypes) {
    if (!isArray(allowedTypes) || intersection(allowedTypes, keys(PhoneNumberType)).length !== allowedTypes.length) {
      throw new Error('Phone types specified are not valid.');
    }

    this.allowedTypes = allowedTypes.map(type => PhoneNumberType[type]);
  }

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    try {
      const phone = phoneUtil.parse(value, this.countryCode);

      if (!phoneUtil.isValidNumber(phone)) {
        throw new Error('Phone is not valid');
      }

      if (this.countryCode && !phoneUtil.isValidNumberForRegion(phone, this.countryCode)) {
        throw new Error(`Phone does not belong to country "${this.countryCode}"`);
      }

      if (this.allowedTypes && !includes(this.allowedTypes, phoneUtil.getNumberType(phone))) {
        throw new Error(`Phone type is not allowed`);
      }
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
