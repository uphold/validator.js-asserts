'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BooleanAssert = require('../../src/asserts/boolean-assert');

/**
 * Extend `Assert` with `BooleanAssert`.
 */

const Assert = BaseAssert.extend({
  Boolean: BooleanAssert
});

/**
 * Test `BooleanAssert`.
 */

describe('BooleanAssert', () => {
  it('should throw an error if the input value is not a boolean', () => {
    const choices = [[], {}, 123, new Boolean(true), 'foo']; // eslint-disable-line no-new-wrappers

    choices.forEach(choice => {
      try {
        Assert.boolean().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_boolean');
      }
    });
  });

  it('should expose `assert` equal to `Boolean`', () => {
    try {
      Assert.boolean().validate('foo');

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('Boolean');
    }
  });

  it('should accept a `true` boolean value', () => {
    Assert.boolean().validate(true);
  });

  it('should accept a `false` boolean value', () => {
    Assert.boolean().validate(false);
  });
});
