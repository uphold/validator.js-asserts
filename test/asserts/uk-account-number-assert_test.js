
/**
 * Module dependencies.
 */

import { Assert as BaseAssert, Violation } from 'validator.js';
import UkAccountNumberAssert from '../../src/asserts/uk-account-number-assert';
import should from 'should';

/**
 * Extend `Assert` with `UkAccountNumberAssert`.
 */

const Assert = BaseAssert.extend({
  UkAccountNumber: UkAccountNumberAssert
});

/**
 * Test `UkAccountNumberAssert`.
 */

describe('UkAccountNumberAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}];

    choices.forEach((choice) => {
      try {
        new Assert().UkAccountNumber().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if `sortCode` is not a string', () => {
    const choices = [undefined, [], {}];

    choices.forEach((choice) => {
      try {
        new Assert().UkAccountNumber(choice).validate('foobar');

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.sortCode.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid account number', () => {
    try {
      new Assert().UkAccountNumber('08-99-99').validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('foobar');
    }
  });

  it('should throw an error if modulus checking fails', () => {
    try {
      new Assert().UkAccountNumber('08-99-99').validate('66374959');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('66374959');
    }
  });

  it('should expose `assert` equal to `UkAccountNumber`', () => {
    try {
      new Assert().UkAccountNumber('08-99-99').validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UkAccountNumber');
    }
  });

  it('should accept a valid account number', () => {
    new Assert().UkAccountNumber('08-99-99').validate('66374958');
  });
});
