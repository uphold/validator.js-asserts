'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const InternationalBankAccountNumberAssert = require('../../src/asserts/international-bank-account-number-assert');
const should = require('should');

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

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid iban', () => {
    try {
      Assert.internationalBankAccountNumber().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('foobar');
    }
  });

  it('should expose `assert` equal to `InternationalBankAccountNumber`', () => {
    try {
      Assert.internationalBankAccountNumber().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('InternationalBankAccountNumber');
    }
  });

  it('should accept a valid iban', () => {
    Assert.internationalBankAccountNumber().validate('BE68539007547034');
  });
});
