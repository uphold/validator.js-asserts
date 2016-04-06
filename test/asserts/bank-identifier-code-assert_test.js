
/**
 * Module dependencies.
 */

import BankIdentifierCodeAssert from '../../src/asserts/bank-identifier-code-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

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
        new Assert().BankIdentifierCode().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid bic', () => {
    try {
      new Assert().BankIdentifierCode().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('foobar');
    }
  });

  it('should expose `assert` equal to `BankIdentifierCode`', () => {
    try {
      new Assert().BankIdentifierCode().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('BankIdentifierCode');
    }
  });

  it('should accept a valid bic without branch code', () => {
    new Assert().BankIdentifierCode().validate('FOOBARBI');
  });

  it('should accept a valid bic with branch code', () => {
    new Assert().BankIdentifierCode().validate('FOOBARBIXXX');
  });
});
