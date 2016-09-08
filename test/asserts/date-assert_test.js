
/**
 * Module dependencies.
 */

import DateAssert from '../../src/asserts/date-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `DateAssert`.
 */

const Assert = BaseAssert.extend({
  Date: DateAssert
});

/**
 * Test `DateAssert`.
 */

describe('DateAssert', () => {
  it('should throw an error if the input value is not a string or a date', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        new Assert().Date().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_date_or_a_string');
      }
    });
  });

  it('should throw an error if value is not correctly formatted', () => {
    try {
      new Assert().Date({ format: 'YYYY-MM-DD' }).validate('20003112');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('Date');
    }
  });

  it('should throw an error if value does not pass strict validation', () => {
    try {
      new Assert().Date({ format: 'YYYY-MM-DD' }).validate('2000.12.30');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('Date');
    }
  });

  it('should expose `assert` equal to `Date`', () => {
    try {
      new Assert().Date().validate('foo');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Date');
    }
  });

  it('should accept a `Date`', () => {
    new Assert().Date().validate(new Date());
  });

  it('should accept a correctly formatted date', () => {
    new Assert().Date({ format: 'YYYY-MM-DD' }).validate('2000-12-30');
  });

  it('should accept a `string`', () => {
    new Assert().Date().validate('2014-10-16');
  });
});
