
/**
 * Module dependencies.
 */

import NotEmptyAssert from '../../src/asserts/not-empty-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `NotEmptyAssert`.
 */

const Assert = BaseAssert.extend({
  NotEmpty: NotEmptyAssert
});

/**
 * Test `NotEmptyAssert`.
 */

describe('NotEmptyAssert', () => {
  it('should throw an error if the input value is empty', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        new Assert().NotEmpty().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `NotEmpty`', () => {
    try {
      new Assert().NotEmpty().validate({});

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('NotEmpty');
    }
  });

  it('should accept not empty values', () => {
    const choices = [['foo'], { foo: 'bar' }, 'foo'];

    choices.forEach(choice => {
      new Assert().NotEmpty().validate(choice);
    });
  });
});
