'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BankIdentifierCodeAssert = require('../../src/asserts/bank-identifier-code-assert');
const should = require('should');

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
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        Assert.bankIdentifierCode().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should expose `assert` equal to `BankIdentifierCode`', () => {
    try {
      Assert.bankIdentifierCode().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('BankIdentifierCode');
    }
  });

  it('should throw an error if the input value is not a valid bic', () => {
    try {
      Assert.bankIdentifierCode().validate('BICOLETO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('BICOLETO');
    }
  });

  it('should accept a valid bic without branch code', () => {
    Assert.bankIdentifierCode().validate('FOOBARBI');
  });

  it('should accept a valid bic with branch code', () => {
    Assert.bankIdentifierCode().validate('FOOBARBIXXX');
  });

  it('should be case-insensitive', () => {
    Assert.bankIdentifierCode().validate('FOOBARBI');
    Assert.bankIdentifierCode().validate('FooBarBI');
    Assert.bankIdentifierCode().validate('foobarbi');
    Assert.bankIdentifierCode().validate('FOOBARBIXXX');
    Assert.bankIdentifierCode().validate('FooBarBIXXX');
    Assert.bankIdentifierCode().validate('foobarbixxx');
  });
});
