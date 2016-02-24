'use strict';

/**
 * Module dependencies.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = phoneAssert;

var _validator = require('validator.js');

/**
 * Export `Phone`.
 */

function phoneAssert() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  let countryCode = _ref.countryCode;

  /**
   * Peer dependency `google-libphonenumber`.
   */

  const PhoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil;

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
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    try {
      const phone = phoneUtil.parse(value, this.countryCode);

      if (!phoneUtil.isValidNumber(phone)) {
        throw new Error('Phone is not valid');
      }

      if (this.countryCode && !phoneUtil.isValidNumberForRegion(phone, this.countryCode)) {
        throw new Error(`Phone does not belong to country "${ this.countryCode }"`);
      }
    } catch (e) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];