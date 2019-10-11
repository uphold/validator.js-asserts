'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const CreditCardAssert = require('../../src/asserts/credit-card-assert');
const should = require('should');

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

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string_or_a_number');
      }
    });
  });

  it('should throw an error if the input value is not a valid card number', () => {
    try {
      Assert.creditCard().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('foobar');
    }
  });

  it('should expose `assert` equal to `CreditCard`', () => {
    try {
      Assert.creditCard().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('CreditCard');
    }
  });

  it('should accept a valid credit card number as string', () => {
    Assert.creditCard().validate('4111111111111111');
  });

  it('should accept a valid credit card number', () => {
    Assert.creditCard().validate(4111111111111111);
  });
});
