'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const NullOrNumberAssert = require('../../src/asserts/null-or-number-assert');

/**
 * Extend `Assert` with `NullOrNumberAssert`.
 */

const Assert = BaseAssert.extend({
  NullOrNumber: NullOrNumberAssert
});

/**
 * Test `NullOrNumberAssert`.
 */

describe('NullOrNumberAssert', () => {
  it('should throw an error if the input value is not a `null` or a number', () => {
    const choices = [[], {}, '123', new Boolean(true)]; // eslint-disable-line no-new-wrappers

    choices.forEach(choice => {
      try {
        Assert.nullOrNumber().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_null_or_a_number');
      }
    });
  });

  it('should expose `assert` equal to `NullOrNumber`', () => {
    try {
      Assert.nullOrNumber().validate({});

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('NullOrNumber');
    }
  });

  it('should accept `null`', () => {
    Assert.nullOrNumber().validate(null);
  });

  it('should accept a number value', () => {
    Assert.nullOrNumber().validate(123);
  });
});
