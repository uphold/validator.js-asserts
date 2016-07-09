
/**
 * Module dependencies.
 */

import BigNumber from 'bignumber.js';
import BigNumberGreaterThanAssert from '../../src/asserts/big-number-greater-than-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `BigNumberGreaterThanAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumberGreaterThan: BigNumberGreaterThanAssert
});

/**
 * Test `BigNumberGreaterThanAssert`.
 */

describe('BigNumberGreaterThanAssert', () => {
  it('should throw an error if `threshold` is missing', () => {
    try {
      new Assert().BigNumberGreaterThan();

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  it('should throw an error if `threshold` is not a number', () => {
    try {
      new Assert().BigNumberGreaterThan({});

      should.fail();
    } catch (e) {
      e.message.should.match(/not a number/);
    }
  });

  it('should throw an error if the input value is not a number', () => {
    const choices = [[], {}, ''];

    choices.forEach(choice => {
      try {
        new Assert().BigNumberGreaterThan(10).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should throw an error if the input number is equal to threshold', () => {
    try {
      new Assert().BigNumberGreaterThan(10).validate(10);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the input number is less than the threshold', () => {
    try {
      new Assert().BigNumberGreaterThan(10).validate(9.99999999);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `BigNumberGreaterThan`', () => {
    try {
      new Assert().BigNumberGreaterThan(1).validate(0.1);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('BigNumberGreaterThan');
    }
  });

  it('should expose `message` on the violation if the input value is not a number', () => {
    try {
      new Assert().BigNumberGreaterThan(10).validate({});

      should.fail();
    } catch (e) {
      e.show().violation.message.should.match(/not a number/);
    }
  });

  it('should expose `threshold` on the violation', () => {
    try {
      new Assert().BigNumberGreaterThan(10).validate(0.1);

      should.fail();
    } catch (e) {
      e.show().violation.threshold.should.equal('10');
    }
  });

  it('should accept a big number as a `threshold` value', () => {
    new Assert().BigNumberGreaterThan(new BigNumber(10)).validate(10.00000001);
  });

  it('should accept a number that is greater than threshold', () => {
    new Assert().BigNumberGreaterThan(10).validate(10.00000001);
  });
});
