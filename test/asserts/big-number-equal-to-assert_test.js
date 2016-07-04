
/**
 * Module dependencies.
 */

import BigNumber from 'bignumber.js';
import BigNumberEqualToAssert from '../../src/asserts/big-number-equal-to-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `BigNumberEqualToAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumberEqualTo: BigNumberEqualToAssert
});

/**
 * Test `BigNumberEqualToAssert`.
 */

describe('BigNumberEqualToAssert', () => {
  it('should throw an error if `value` is missing', () => {
    try {
      new Assert().BigNumberEqualTo();

      should.fail();
    } catch (e) {
      e.message.should.equal('A value is required.');
    }
  });

  it('should throw an error if `value` is not a number', () => {
    try {
      new Assert().BigNumberEqualTo({});

      should.fail();
    } catch (e) {
      e.message.should.match(/not a number/);
    }
  });

  it('should throw an error if the input value is not a number', () => {
    const choices = [[], {}, ''];

    choices.forEach(choice => {
      try {
        new Assert().BigNumberEqualTo(10).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should throw an error if the input number is greater than the value', () => {
    try {
      new Assert().BigNumberEqualTo(10).validate(12);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the input number is less than the value', () => {
    try {
      new Assert().BigNumberEqualTo(10).validate(9);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `BigNumberEqualTo`', () => {
    try {
      new Assert().BigNumberEqualTo(1).validate(0.1);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('BigNumberEqualTo');
    }
  });

  it('should expose `message` on the violation if the input value is not a number', () => {
    try {
      new Assert().BigNumberEqualTo(10).validate({});

      should.fail();
    } catch (e) {
      e.show().violation.message.should.match(/not a number/);
    }
  });

  it('should expose `value` on the violation', () => {
    try {
      new Assert().BigNumberEqualTo(10).validate(0.1);

      should.fail();
    } catch (e) {
      e.show().violation.value.should.equal('10');
    }
  });

  it('should accept a big number as a value', () => {
    new Assert().BigNumberEqualTo(new BigNumber(10)).validate(10);
  });

  it('should accept a number that is equal to value', () => {
    new Assert().BigNumberEqualTo(10).validate(10);
  });
});
