'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const BooleanAssert = require('../../src/asserts/boolean-assert.js');

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
  it('should throw an error if the input value is not a boolean', ({ assert }) => {
    const choices = [[], {}, 123, new Boolean(true), 'foo']; // eslint-disable-line no-new-wrappers

    choices.forEach(choice => {
      try {
        Assert.boolean().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_boolean');
      }
    });
  });

  it('should expose `assert` equal to `Boolean`', ({ assert }) => {
    try {
      Assert.boolean().validate('foo');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'Boolean');
    }
  });

  it('should accept a `true` boolean value', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.boolean().validate(true);
    });
  });

  it('should accept a `false` boolean value', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.boolean().validate(false);
    });
  });
});
