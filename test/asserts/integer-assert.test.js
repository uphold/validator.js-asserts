'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const IntegerAssert = require('../../src/asserts/integer-assert.js');

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
  it('should throw an error if the input value is not a number', ({ assert }) => {
    const choices = [{}, 'foo', '', [], 1.01, '2'];

    choices.forEach(choice => {
      try {
        Assert.integer().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
      }
    });
  });

  it('should expose `assert` equal to `Integer`', ({ assert }) => {
    try {
      Assert.integer().validate('foo');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'Integer');
    }
  });

  it('should accept an integer', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.integer().validate(1);
    });
  });
});
