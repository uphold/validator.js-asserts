
/**
 * Module dependencies.
 */

import BigNumber from 'bignumber.js';
import BigNumberLessThanAssert from '../../src/asserts/big-number-less-than-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `BigNumberLessThanAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumberLessThan: BigNumberLessThanAssert
});

/**
 * Test `BigNumberLessThanAssert`.
 */

describe('BigNumberLessThanAssert', () => {
  it('should throw an error if `threshold` is missing', () => {
    try {
      new Assert().BigNumberLessThan();

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  it('should throw an error if `threshold` is not a number', () => {
    try {
      new Assert().BigNumberLessThan({});

      should.fail();
    } catch (e) {
      e.message.should.match(/not a number/);
    }
  });

  it('should throw an error if the input value is not a number', () => {
    const choices = [[], {}, ''];

    choices.forEach(choice => {
      try {
        new Assert().BigNumberLessThan(10).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should throw an error if the input number is equal to threshold', () => {
    try {
      new Assert().BigNumberLessThan(10).validate(10);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the input number is greater than the threshold', () => {
    try {
      new Assert().BigNumberLessThan(10).validate(10.01);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `BigNumberLessThan`', () => {
    try {
      new Assert().BigNumberLessThan(10).validate(10.01);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('BigNumberLessThan');
    }
  });

  it('should expose `message` on the violation if the input value is not a number', () => {
    try {
      new Assert().BigNumberLessThan(10).validate({});

      should.fail();
    } catch (e) {
      e.show().violation.message.should.match(/not a number/);
    }
  });

  it('should expose `threshold` on the violation', () => {
    try {
      new Assert().BigNumberLessThan(10).validate(10.01);

      should.fail();
    } catch (e) {
      e.show().violation.threshold.should.equal('10');
    }
  });

  it('should accept a big number as a `threshold` value', () => {
    new Assert().BigNumberLessThan(new BigNumber(10)).validate(9.99999999);
  });

  it('should accept a number that is less than threshold', () => {
    new Assert().BigNumberLessThan(10).validate(9.99999999);
  });
});
