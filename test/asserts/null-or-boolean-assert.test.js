'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const NullOrBooleanAssert = require('../../src/asserts/null-or-boolean-assert');

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
  it('should throw an error if the input value is not a `null` or a boolean', () => {
    const choices = [[], {}, 123, new Boolean(true), 'foo']; // eslint-disable-line no-new-wrappers

    choices.forEach(choice => {
      try {
        Assert.nullOrBoolean().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_null_or_a_boolean');
      }
    });
  });

  it('should expose `assert` equal to `NullOrBoolean`', () => {
    try {
      Assert.nullOrBoolean().validate({});

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('NullOrBoolean');
    }
  });

  it('should accept `null`', () => {
    Assert.nullOrBoolean().validate(null);
  });

  it('should accept a `true` boolean value', () => {
    Assert.nullOrBoolean().validate(true);
  });

  it('should accept a `false` boolean value', () => {
    Assert.nullOrBoolean().validate(false);
  });
});
