
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
  it('should throw an error if the input value is not a date or a string or a number', () => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        new Assert().Date().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_date_or_a_string_or_a_number');
      }
    });
  });

  it('should throw an error if an invalid format is given', () => {
    const formats = [[], {}, 123];

    formats.forEach(format => {
      try {
        new Assert().Date({ format }).validate();

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Error);
        e.message.should.equal(`Unsupported format ${format} given`);
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

  it('should throw an error if the input value is an invalid timestamp', () => {
    try {
      new Assert().Date().validate(-Number.MAX_VALUE);

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

  it('should accept an instance of `Date`', () => {
    new Assert().Date().validate(new Date());
  });

  it('should accept a correctly formatted date', () => {
    new Assert().Date({ format: 'YYYY-MM-DD' }).validate('2000-12-30');
  });

  it('should accept a string date', () => {
    new Assert().Date().validate('2016-04-23');
  });

  it('should accept an ISO-8601 string date', () => {
    new Assert().Date().validate('2016-04-23T00:51:18.570Z');
  });

  it('should accept a numeric timestamp', () => {
    new Assert().Date().validate(Date.now());
  });
});
