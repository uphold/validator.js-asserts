'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const JsonAssert = require('../../src/asserts/json-assert');

/**
 * Extend `Assert` with `JsonAssert`.
 */

const Assert = BaseAssert.extend({
  Json: JsonAssert
});

/**
 * Test `JsonAssert`.
 */

describe('JsonAssert', () => {
  it('should throw an error if the input value is not valid JSON', () => {
    const choices = [[], '["foo":"bar"}'];

    choices.forEach(choice => {
      try {
        Assert.json().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `Json`', () => {
    try {
      Assert.json().validate([]);

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('JSON');
    }
  });

  it('should accept valid JSON strings', () => {
    ['"foo"', '10', '{"foo":"bar"}', 123, Boolean(true), Number(10)].forEach(choice => {
      Assert.json().validate(choice);
    });
  });
});
