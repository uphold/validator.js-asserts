'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const PhoneAssert = require('../../src/asserts/phone-assert');

/**
 * Extend `Assert` with `Phone`.
 */

const Assert = BaseAssert.extend({
  Phone: PhoneAssert
});

/**
 * Test `Phone`.
 */

describe('Phone', () => {
  it('should throw an error if the input value is not a string', () => {
    [{}, [], 123].forEach(choice => {
      try {
        Assert.phone({ countryCode: 'US' }).validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_string');
      }
    });
  });

  it('should throw an error if the phone is not valid', () => {
    try {
      Assert.phone().validate('+35191234567890');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('Phone');
    }
  });

  it('should throw an error if the phone does not belong to the given country', () => {
    try {
      Assert.phone({ countryCode: 'US' }).validate('912345578');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('Phone');
    }
  });

  it('should accept a valid phone in the e164 format', () => {
    Assert.phone().validate('+1 415 555 2671');
  });

  it('should accept a phone in the e164 format that belongs to the given country', () => {
    Assert.phone({ countryCode: 'US' }).validate('+1 415 555 2671');
  });

  it('should accept a phone in the national format that belongs to the given country', () => {
    Assert.phone({ countryCode: 'US' }).validate('415 555 2671');
  });
});
