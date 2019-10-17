'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const NullOrStringAssert = require('../../src/asserts/null-or-string-assert');

/**
 * Extend `Assert` with `NullOrStringAssert`.
 */

const Assert = BaseAssert.extend({
  NullOrString: NullOrStringAssert
});

/**
 * Test `NullOrStringAssert`.
 */

describe('NullOrStringAssert', () => {
  it('should throw an error if the input value is not a `null` or a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.nullOrString().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_null_or_a_string');
      }
    });
  });

  it('should throw an error if input is a string but is out of boundaries', () => {
    try {
      Assert.nullOrString({ min: 10 }).validate('foo');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.violation).toEqual({ min: 10 });
    }
  });

  it('should expose `assert` equal to `NullOrString`', () => {
    try {
      Assert.nullOrString().validate({});

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('NullOrString');
    }
  });

  it('should expose `min` or `max` on the violation if testing boundaries of a string', () => {
    try {
      Assert.nullOrString({ min: 5 }).validate('foo');

      fail();
    } catch (e) {
      expect(e.show().violation.min).toBe(5);
    }
  });

  it('should expose `min` or `max` on the `assert` if testing boundaries of a string', () => {
    try {
      Assert.nullOrString({ max: 2, min: 1 }).validate('foobar');

      fail();
    } catch (e) {
      expect(e.assert.min).toBe(1);
      expect(e.assert.max).toBe(2);
    }
  });

  it('should accept `null`', () => {
    Assert.nullOrString().validate(null);
  });

  it('should accept a string within boundaries', () => {
    Assert.nullOrString({ max: 10 }).validate('foo');
  });

  it('should accept a string', () => {
    Assert.nullOrString().validate('foo');
  });
});
