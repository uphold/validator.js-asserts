'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const CreditCardAssert = require('../../src/asserts/credit-card-assert');

/**
 * Extend `Assert` with `CreditCardAssert`.
 */

const Assert = BaseAssert.extend({
  CreditCard: CreditCardAssert
});

/**
 * Test `CreditCardAssert`.
 */

describe('CreditCardAssert', () => {
  it('should throw an error if the input value is not a string or a number', () => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        Assert.creditCard().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_string_or_a_number');
      }
    });
  });

  it('should throw an error if the input value is not a valid card number', () => {
    try {
      Assert.creditCard().validate('foobar');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.value).toBe('foobar');
    }
  });

  it('should expose `assert` equal to `CreditCard`', () => {
    try {
      Assert.creditCard().validate(123);

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('CreditCard');
    }
  });

  it('should accept a valid credit card number as string', () => {
    Assert.creditCard().validate('4111111111111111');
  });

  it('should accept a valid credit card number', () => {
    Assert.creditCard().validate(4111111111111111);
  });
});
