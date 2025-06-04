'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const InternationalBankAccountNumberAssert = require('../../src/asserts/international-bank-account-number-assert.js');

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
  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        Assert.internationalBankAccountNumber().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid iban', ({ assert }) => {
    try {
      Assert.internationalBankAccountNumber().validate('foobar');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.value, 'foobar');
    }
  });

  it('should expose `assert` equal to `InternationalBankAccountNumber`', ({ assert }) => {
    try {
      Assert.internationalBankAccountNumber().validate(123);

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'InternationalBankAccountNumber');
    }
  });

  it('should accept a valid iban', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.internationalBankAccountNumber().validate('BE68539007547034');
    });
  });
});
