'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const AbaAccountNumberAssert = require('../../src/asserts/aba-account-number-assert');

/**
 * Extend `Assert` with `AbaAccountNumberAssert`.
 */

const Assert = BaseAssert.extend({
  AbaAccountNumber: AbaAccountNumberAssert
});

/**
 * Test `AbaAccountNumberAssert`.
 */

describe('AbaAccountNumberAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    [{}, []].forEach(choice => {
      try {
        Assert.abaAccountNumber().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid ABA account number', () => {
    try {
      Assert.abaAccountNumber().validate('foo');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().value).toBe('foo');
    }
  });

  it('should expose `assert` equal to `AbaAccountNumber`', () => {
    try {
      Assert.abaAccountNumber().validate(123);

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('AbaAccountNumber');
    }
  });

  it.each(['76175925', '76175925761759257', '76175', 'abcdefghijklmnopq', 'abcde', 'ABcDeFGH'])(
    'should accept a valid ABA account number',
    accountNumber => {
      Assert.abaAccountNumber().validate(accountNumber);
    }
  );
});
