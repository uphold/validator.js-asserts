
/**
 * Module dependencies.
 */

import CreditCardAssert from '../../src/asserts/credit-card-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

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
        new Assert().CreditCard().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string_or_a_number');
      }
    });
  });

  it('should throw an error if the input value is not a valid card number', () => {
    try {
      new Assert().CreditCard().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('foobar');
    }
  });

  it('should expose `assert` equal to `CreditCard`', () => {
    try {
      new Assert().CreditCard().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('CreditCard');
    }
  });

  it('should accept a valid credit card number as string', () => {
    new Assert().CreditCard().validate('4111111111111111');
  });

  it('should accept a valid credit card number', () => {
    new Assert().CreditCard().validate(4111111111111111);
  });
});
