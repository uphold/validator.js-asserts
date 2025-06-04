'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const PlainObjectAssert = require('../../src/asserts/plain-object-assert.js');

/**
 * Extend `Assert` with `PlainObjectAssert`.
 */

const Assert = BaseAssert.extend({
  PlainObject: PlainObjectAssert
});

/**
 * Test `PlainObjectAssert`.
 */

describe('PlainObjectAssert', () => {
  it('should throw an error if the input value is not a plain object', ({ assert }) => {
    const choices = [[], 123];

    choices.forEach(choice => {
      try {
        Assert.plainObject().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
      }
    });
  });

  it('should expose `assert` equal to `PlainObject`', ({ assert }) => {
    try {
      Assert.plainObject().validate('FOO');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'PlainObject');
    }
  });

  it('should accept a plain object', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.plainObject().validate({ foo: 'bar' });
    });
  });
});
