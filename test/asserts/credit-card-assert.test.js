'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const CreditCardAssert = require('../../src/asserts/credit-card-assert.js');

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
  it('should throw an error if the input value is not a string or a number', ({ assert }) => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        Assert.creditCard().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_string_or_a_number');
      }
    });
  });

  it('should throw an error if the input value is not a valid card number', ({ assert }) => {
    try {
      Assert.creditCard().validate('foobar');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.value, 'foobar');
    }
  });

  it('should expose `assert` equal to `CreditCard`', ({ assert }) => {
    try {
      Assert.creditCard().validate(123);

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'CreditCard');
    }
  });

  it('should accept a valid credit card number as string', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.creditCard().validate('4111111111111111');
    });
  });

  it('should accept a valid credit card number', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.creditCard().validate(4111111111111111);
    });
  });
});
