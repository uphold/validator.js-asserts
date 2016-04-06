
/**
 * Module dependencies.
 */

import InternationalBankAccountNumberAssert from '../../src/asserts/international-bank-account-number-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

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
        new Assert().InternationalBankAccountNumber().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid iban', () => {
    try {
      new Assert().InternationalBankAccountNumber().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('foobar');
    }
  });

  it('should expose `assert` equal to `InternationalBankAccountNumber`', () => {
    try {
      new Assert().InternationalBankAccountNumber().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('InternationalBankAccountNumber');
    }
  });

  it('should accept a valid iban', () => {
    new Assert().InternationalBankAccountNumber().validate('BE68539007547034');
  });
});
