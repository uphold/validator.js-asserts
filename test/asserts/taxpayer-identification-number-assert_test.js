'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const TaxpayerIdentificationNumberAssert = require('../../src/asserts/taxpayer-identification-number-assert');

/**
 * Extend `Assert` with `TaxpayerIdentificationNumberAssert`.
 */

const Assert = BaseAssert.extend({
  TaxpayerIdentificationNumber: TaxpayerIdentificationNumberAssert
});

/**
 * Test `TaxpayerIdentificationNumberAssert`.
 */

describe('TaxpayerIdentificationNumberAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    [{}, []].forEach(choice => {
      try {
        Assert.taxpayerIdentificationNumber().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid `tin`', () => {
    try {
      Assert.taxpayerIdentificationNumber().validate('foobar');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().value).toBe('foobar');
    }
  });

  it('should throw an error if the input value is not a correctly formatted `tin`', () => {
    try {
      Assert.taxpayerIdentificationNumber().validate('1-2-3456 789');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().value).toBe('1-2-3456 789');
    }
  });

  it('should expose `assert` equal to `TaxpayerIdentificationNumber`', () => {
    try {
      Assert.taxpayerIdentificationNumber().validate('1-2-3456 789');

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('TaxpayerIdentificationNumber');
    }
  });

  it('should accept a valid `tin`', () => {
    Assert.taxpayerIdentificationNumber().validate('123456789');
  });

  it('should accept a correctly formatted `tin`', () => {
    Assert.taxpayerIdentificationNumber().validate('123-45-6789');
  });
});
