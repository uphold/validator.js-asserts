
/**
 * Module dependencies.
 */

import { Assert as BaseAssert, Violation } from 'validator.js';
import UkSortCodeAssert from '../../src/asserts/uk-sort-code-assert';
import should from 'should';

/**
 * Extend `Assert` with `UkSortCodeAssert`.
 */

const Assert = BaseAssert.extend({
  UkSortCode: UkSortCodeAssert
});

/**
 * Test `UkSortCodeAssert`.
 */

describe('UkSortCodeAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}];

    choices.forEach((choice) => {
      try {
        new Assert().UkSortCode().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid sort code', () => {
    try {
      new Assert().UkSortCode().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('foobar');
    }
  });

  it('should expose `assert` equal to `UkSortCode`', () => {
    try {
      new Assert().UkSortCode().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('UkSortCode');
    }
  });

  it('should accept a valid sort code', () => {
    const choices = ['089999', '08-99-99'];

    choices.forEach((choice) => {
      new Assert().UkSortCode().validate(choice);
    });
  });
});
