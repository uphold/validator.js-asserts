
/**
 * Module dependencies.
 */

import { Assert as BaseAssert, Validator, Violation } from 'validator.js';
import UsStateAssert from '../../src/asserts/us-state-assert';
import should from 'should';

/**
 * Extend `Assert` with `UsStateAssert`.
 */

const Assert = BaseAssert.extend({
  UsState: UsStateAssert
});

/**
 * Test `UsStateAssert`.
 */

describe('UsStateAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach((choice) => {
      try {
        new Assert().UsState().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if state is invalid', () => {
    try {
      new Assert().UsState().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `UsState`', () => {
    try {
      new Assert().UsState().validate('FOO');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('UsState');
    }
  });

  it('should accept a state code', () => {
    new Assert().UsState().validate('CA');
  });
});
