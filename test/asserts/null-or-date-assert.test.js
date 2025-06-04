'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const NullOrDateAssert = require('../../src/asserts/null-or-date-assert.js');

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
  it('should throw an error if the input value is not a `null` or a date', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.nullOrDate().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_null_or_a_date');
      }
    });
  });

  it('should throw an error if the input value is not a valid date', ({ assert }) => {
    try {
      Assert.nullOrDate().validate('2015-99-01');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().value, '2015-99-01');
    }
  });

  it('should expose `assert` equal to `NullOrDate`', ({ assert }) => {
    try {
      Assert.nullOrDate().validate({});

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'NullOrDate');
    }
  });

  it('should accept `null`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOrDate().validate(null);
    });
  });

  it('should accept a date', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOrDate().validate(new Date());
    });
  });

  it('should accept a string', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOrDate().validate('2014-10-16');
    });
  });
});
