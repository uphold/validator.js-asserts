'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const JsonAssert = require('../../src/asserts/json-assert.js');

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
  it('should throw an error if the input value is not valid JSON', ({ assert }) => {
    const choices = [[], '["foo":"bar"}'];

    choices.forEach(choice => {
      try {
        Assert.json().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
      }
    });
  });

  it('should expose `assert` equal to `Json`', ({ assert }) => {
    try {
      Assert.json().validate([]);

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'JSON');
    }
  });

  it('should accept valid JSON strings', ({ assert }) => {
    ['"foo"', '10', '{"foo":"bar"}', 123, Boolean(true), Number(10)].forEach(choice => {
      assert.doesNotThrow(() => {
        Assert.json().validate(choice);
      });
    });
  });
});
