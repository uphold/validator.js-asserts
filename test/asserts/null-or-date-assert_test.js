
/**
 * Module dependencies.
 */

import NullOrDateAssert from '../../src/asserts/null-or-date-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `NullOrDateAssert`.
 */

const Assert = BaseAssert.extend({
  NullOrDate: NullOrDateAssert
});

/**
 * Test `NullOrDateAssert`.
 */

describe('NullOrDateAssert', () => {
  it('should throw an error if the input value is not a `null` or a date', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        new Assert().NullOrDate().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_null_or_a_date');
      }
    });
  });

  it('should throw an error if the input value is not a valid date', () => {
    try {
      new Assert().NullOrDate().validate('2015-99-01');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('2015-99-01');
    }
  });

  it('should expose `assert` equal to `NullOrDate`', () => {
    try {
      new Assert().NullOrDate().validate({});

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('NullOrDate');
    }
  });

  it('should accept `null`', () => {
    new Assert().NullOrDate().validate(null);
  });

  it('should accept a date', () => {
    new Assert().NullOrDate().validate(new Date());
  });

  it('should accept a string', () => {
    new Assert().NullOrDate().validate('2014-10-16');
  });
});
