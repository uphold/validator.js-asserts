'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const IntegerAssert = require('../../src/asserts/integer-assert');

/**
 * Extend `Assert` with `IntegerAssert`.
 */

const Assert = BaseAssert.extend({
  Integer: IntegerAssert
});

/**
 * Test `IntegerAssert`.
 */

describe('IntegerAssert', () => {
  it('should throw an error if the input value is not a number', () => {
    const choices = [{}, 'foo', '', [], 1.01, '2'];

    choices.forEach(choice => {
      try {
        Assert.integer().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `Integer`', () => {
    try {
      Assert.integer().validate('foo');

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('Integer');
    }
  });

  it('should accept an integer', () => {
    Assert.integer().validate(1);
  });
});
