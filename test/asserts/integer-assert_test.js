
/**
 * Module dependencies.
 */

import IntegerAssert from '../../src/asserts/integer-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `IntegerAssert`.
 */

const Assert = BaseAssert.extend({
  Integer: IntegerAssert
});

/**
 * Test `IntegerAssert`.
 */

describe('IntegerAssert', () => {
  it('should throw an error if the input value is not a number', () => {
    const choices = [{}, 'foo', '', [], 1.01, '2'];

    choices.forEach(choice => {
      try {
        new Assert().Integer().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `Integer`', () => {
    try {
      new Assert().Integer().validate('foo');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Integer');
    }
  });

  it('should accept an integer', () => {
    new Assert().Integer().validate(1);
  });
});
