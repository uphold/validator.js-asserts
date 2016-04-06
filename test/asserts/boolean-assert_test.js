
/**
 * Module dependencies.
 */

import BooleanAssert from '../../src/asserts/boolean-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `BooleanAssert`.
 */

const Assert = BaseAssert.extend({
  Boolean: BooleanAssert
});

/**
 * Test `BooleanAssert`.
 */

describe('BooleanAssert', () => {
  it('should throw an error if the input value is not a boolean', () => {
    const choices = [[], {}, 123, new Boolean(true), 'foo']; // eslint-disable-line no-new-wrappers

    choices.forEach(choice => {
      try {
        new Assert().Boolean().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_boolean');
      }
    });
  });

  it('should expose `assert` equal to `Boolean`', () => {
    try {
      new Assert().Boolean().validate('foo');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Boolean');
    }
  });

  it('should accept a `true` boolean value', () => {
    new Assert().Boolean().validate(true);
  });

  it('should accept a `false` boolean value', () => {
    new Assert().Boolean().validate(false);
  });
});
