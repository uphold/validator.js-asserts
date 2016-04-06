
/**
 * Module dependencies.
 */

import BigNumberAssert from '../../src/asserts/big-number-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `BigNumberAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumber: BigNumberAssert
});

/**
 * Test `BigNumberAssert`.
 */

describe('BigNumberAssert', () => {
  it('should throw an error if the input value is not a big number', () => {
    const choices = [[], {}, ''];

    choices.forEach(choice => {
      try {
        new Assert().BigNumber().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `BigNumber`', () => {
    try {
      new Assert().BigNumber().validate();

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('BigNumber');
    }
  });

  it('should accept a big number', () => {
    new Assert().BigNumber().validate(1.01);
  });
});
