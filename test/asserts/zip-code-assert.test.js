'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const zipCodeAssert = require('../../src/asserts/zip-code-assert');

/**
 * Extend `Assert` with `UuidAssert`.
 */

const Assert = BaseAssert.extend({
  ZipCode: zipCodeAssert
});

/**
 * Test `ZipCodeAssert`.
 */

describe('ZipCodeAssert', () => {
  it('should throw an error if the input value is invalid', () => {
    const types = [[], {}, 0];

    types.forEach(type => {
      try {
        Assert.zipCode().validate(type);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.show().assert).toBe('ZipCode');
        expect(e.violation.value).toBe('must_be_null_or_a_string');
      }
    });
  });

  it('should throw an error if the country is invalid', () => {
    try {
      Assert.zipCode({ country: null }).validate('12345');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('ZipCode');
      expect(e.show().violation.country).toBe(Validator.errorCode.must_be_a_string);
    }
  });

  it('should throw an error if the country is unknown', () => {
    try {
      Assert.zipCode({ country: 'ZZ' }).validate('12345');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('ZipCode');
      expect(e.show().violation.reason).toBe('invalid-country');
    }
  });

  it('should throw an error if the zip code is not in a valid CA zip code format and user is from CA', () => {
    try {
      Assert.zipCode({ country: 'CA' }).validate('1234');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('ZipCode');
      expect(e.show().violation.reason).toBe('invalid-zip-code');
    }
  });

  it('should throw an error if the zip code is not in a valid US zip code format and user if from US', () => {
    try {
      Assert.zipCode({ country: 'US' }).validate('1234');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('ZipCode');
      expect(e.show().violation.reason).toBe('invalid-zip-code');
    }
  });

  it('should throw an error if the zip code is not valid for the given CA state', () => {
    try {
      Assert.zipCode({ country: 'CA', state: 'CA-AB' }).validate('A1A1A2');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('ZipCode');
      expect(e.show().violation.reason).toBe('invalid-state-zip-code');
    }
  });

  it('should throw an error if the zip code is not valid for the given US state', () => {
    try {
      Assert.zipCode({ country: 'US', state: 'US-CA' }).validate('12345');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('ZipCode');
      expect(e.show().violation.reason).toBe('invalid-state-zip-code');
    }
  });

  it('should accept valid CA zip codes', () => {
    ['A1A1A1', 'C5D-1B3', 'G0A 5B6'].forEach(code => Assert.zipCode({ country: 'CA' }).validate(code));
  });

  it('should accept valid US zip codes', () => {
    ['12345', '12345-1234', '12345 1234', '123456789'].forEach(code =>
      Assert.zipCode({ country: 'US' }).validate(code)
    );
  });

  it('should accept valid US territory zip codes', () => {
    ['12345', '12345-1234', '12345 1234', '123456789'].forEach(code =>
      Assert.zipCode({ country: 'US', state: 'US-GU' }).validate(code)
    );
  });

  it('should accept valid CA state zip codes', () => {
    ['t0A-1a1', 'T0b5Z0', 'T0C 9M9'].forEach(code => Assert.zipCode({ country: 'CA', state: 'CA-AB' }).validate(code));
  });

  it('should accept valid US state zip codes', () => {
    ['94501', '95988-1234', '95559 1234', '900011234'].forEach(code =>
      Assert.zipCode({ country: 'US', state: 'US-CA' }).validate(code)
    );
  });

  it('should accept a valid non-CA/US zip code', () => {
    Assert.zipCode({ country: 'PT' }).validate('foobar');
  });

  it('should accept a valid non-CA/US state zip code', () => {
    Assert.zipCode({ country: 'PT', state: 'PT-01' }).validate('foobar');
  });
});
