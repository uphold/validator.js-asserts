'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const DateAssert = require('../../src/asserts/date-assert.js');

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
  it('should throw an error if the input value is not a string or a date', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.date().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_date_or_a_string');
      }
    });
  });

  it('should throw an error if value is not correctly formatted', ({ assert }) => {
    try {
      Assert.date({ format: 'YYYY-MM-DD' }).validate('20003112');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'Date');
    }
  });

  it('should throw an error if value does not pass strict validation', ({ assert }) => {
    try {
      Assert.date({ format: 'YYYY-MM-DD' }).validate('2000.12.30');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'Date');
    }
  });

  it('should expose `assert` equal to `Date`', ({ assert }) => {
    try {
      Assert.date().validate('foo');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'Date');
    }
  });

  it('should accept a `Date`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.date().validate(new Date());
    });
  });

  it('should accept a correctly formatted date', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.date({ format: 'YYYY-MM-DD' }).validate('2000-12-30');
    });
  });

  it('should accept a `string`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.date().validate('2014-10-16');
    });
  });
});
