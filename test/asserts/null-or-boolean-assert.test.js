'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const NullOrBooleanAssert = require('../../src/asserts/null-or-boolean-assert.js');

/**
 * Extend `Assert` with `NullOrBooleanAssert`.
 */

const Assert = BaseAssert.extend({
  NullOrBoolean: NullOrBooleanAssert
});

/**
 * Test `NullOrBooleanAssert`.
 */

describe('NullOrBooleanAssert', () => {
  it('should throw an error if the input value is not a `null` or a boolean', ({ assert }) => {
    const choices = [[], {}, 123, new Boolean(true), 'foo']; // eslint-disable-line no-new-wrappers

    choices.forEach(choice => {
      try {
        Assert.nullOrBoolean().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_null_or_a_boolean');
      }
    });
  });

  it('should expose `assert` equal to `NullOrBoolean`', ({ assert }) => {
    try {
      Assert.nullOrBoolean().validate({});

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'NullOrBoolean');
    }
  });

  it('should accept `null`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOrBoolean().validate(null);
    });
  });

  it('should accept a `true` boolean value', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOrBoolean().validate(true);
    });
  });

  it('should accept a `false` boolean value', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOrBoolean().validate(false);
    });
  });
});
