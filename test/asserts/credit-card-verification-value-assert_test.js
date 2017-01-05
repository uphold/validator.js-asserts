
/**
 * Module dependencies.
 */

import CreditCardVerificationValueAssert from '../../src/asserts/credit-card-verification-value-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `CreditCardVerificationValueAssert`.
 */

const Assert = BaseAssert.extend({
  CreditCardVerificationValue: CreditCardVerificationValueAssert
});

/**
 * Test `CreditCardVerificationValueAssert`.
 */

describe('CreditCardVerificationValueAssert', () => {
  it('should throw an error if `type` is missing', () => {
    try {
      new Assert().CreditCardVerificationValue();

      should.fail();
    } catch (e) {
      e.message.should.equal('A type value is required.');
    }
  });

  it('should throw an error if the input value is not a string or a number', () => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        new Assert().CreditCardVerificationValue('foobar').validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string_or_a_number');
      }
    });
  });

  it('should throw an error if the input value is not a valid card verification value', () => {
    try {
      new Assert().CreditCardVerificationValue('foobar').validate('1234');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.should.eql({ min: 3, max: 3 });
      e.value.should.equal('1234');
    }
  });

  it('should throw an error if `type` is `AMEX` and verification value is invalid', () => {
    try {
      new Assert().CreditCardVerificationValue('AMEX').validate('123');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.should.eql({ min: 4, max: 4 });
      e.value.should.equal('123');
    }
  });

  it('should expose `assert` equal to `CreditCardVerificationValue`', () => {
    try {
      new Assert().CreditCardVerificationValue('foobar').validate('1234');
      should.fail();
    } catch (e) {
      e.show().assert.should.equal('CreditCardVerificationValue');
    }
  });

  it('should accept a valid credit card verification value as string', () => {
    new Assert().CreditCardVerificationValue('foobar').validate('123');
  });

  it('should accept a valid credit card verification value number', () => {
    new Assert().CreditCardVerificationValue('foobar').validate(123);
  });

  it('should accept a valid AMEX verification value', () => {
    new Assert().CreditCardVerificationValue('AMEX').validate(1234);
  });
});
