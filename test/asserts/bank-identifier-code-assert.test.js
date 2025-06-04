'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const BankIdentifierCodeAssert = require('../../src/asserts/bank-identifier-code-assert.js');

/**
 * Extend `Assert` with `BankIdentifierCodeAssert`.
 */

const Assert = BaseAssert.extend({
  BankIdentifierCode: BankIdentifierCodeAssert
});

/**
 * Test `BankIdentifierCodeAssert`.
 */

describe('BankIdentifierCodeAssert', () => {
  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        Assert.bankIdentifierCode().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_string');
      }
    });
  });

  it('should expose `assert` equal to `BankIdentifierCode`', ({ assert }) => {
    try {
      Assert.bankIdentifierCode().validate(123);

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'BankIdentifierCode');
    }
  });

  it('should throw an error if the input value is not a valid bic', ({ assert }) => {
    try {
      Assert.bankIdentifierCode().validate('BICOLETO');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.value, 'BICOLETO');
    }
  });

  it('should accept a valid bic without branch code', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.bankIdentifierCode().validate('FOOBARBI');
    });
  });

  it('should accept a valid bic with branch code', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.bankIdentifierCode().validate('FOOBARBIXXX');
    });
  });

  it('should be case-insensitive', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.bankIdentifierCode().validate('FOOBARBI');
      Assert.bankIdentifierCode().validate('FooBarBI');
      Assert.bankIdentifierCode().validate('foobarbi');
      Assert.bankIdentifierCode().validate('FOOBARBIXXX');
      Assert.bankIdentifierCode().validate('FooBarBIXXX');
      Assert.bankIdentifierCode().validate('foobarbixxx');
    });
  });
});
