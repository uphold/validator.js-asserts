'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const DateAssert = require('../../src/asserts/date-assert');

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
        Assert.date().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_date_or_a_string');
      }
    });
  });

  it('should throw an error if value is not correctly formatted', () => {
    try {
      Assert.date({ format: 'YYYY-MM-DD' }).validate('20003112');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('Date');
    }
  });

  it('should throw an error if value does not pass strict validation', () => {
    try {
      Assert.date({ format: 'YYYY-MM-DD' }).validate('2000.12.30');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('Date');
    }
  });

  it('should expose `assert` equal to `Date`', () => {
    try {
      Assert.date().validate('foo');

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('Date');
    }
  });

  it('should accept a `Date`', () => {
    Assert.date().validate(new Date());
  });

  it('should accept a correctly formatted date', () => {
    Assert.date({ format: 'YYYY-MM-DD' }).validate('2000-12-30');
  });

  it('should accept a `string`', () => {
    Assert.date().validate('2014-10-16');
  });
});
