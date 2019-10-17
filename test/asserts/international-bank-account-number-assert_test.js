'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const InternationalBankAccountNumberAssert = require('../../src/asserts/international-bank-account-number-assert');

/**
 * Extend `Assert` with `InternationalBankAccountNumberAssert`.
 */

const Assert = BaseAssert.extend({
  InternationalBankAccountNumber: InternationalBankAccountNumberAssert
});

/**
 * Test `InternationalBankAccountNumberAssert`.
 */

describe('InternationalBankAccountNumberAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        Assert.internationalBankAccountNumber().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid iban', () => {
    try {
      Assert.internationalBankAccountNumber().validate('foobar');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.value).toBe('foobar');
    }
  });

  it('should expose `assert` equal to `InternationalBankAccountNumber`', () => {
    try {
      Assert.internationalBankAccountNumber().validate(123);

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('InternationalBankAccountNumber');
    }
  });

  it('should accept a valid iban', () => {
    Assert.internationalBankAccountNumber().validate('BE68539007547034');
  });
});
