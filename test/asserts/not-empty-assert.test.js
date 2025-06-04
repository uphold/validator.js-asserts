'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const NotEmptyAssert = require('../../src/asserts/not-empty-assert.js');

/**
 * Extend `Assert` with `NotEmptyAssert`.
 */

const Assert = BaseAssert.extend({
  NotEmpty: NotEmptyAssert
});

/**
 * Test `NotEmptyAssert`.
 */

describe('NotEmptyAssert', () => {
  it('should throw an error if the input value is empty', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.notEmpty().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
      }
    });
  });

  it('should expose `assert` equal to `NotEmpty`', ({ assert }) => {
    try {
      Assert.notEmpty().validate({});

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'NotEmpty');
    }
  });

  it('should accept not empty values', ({ assert }) => {
    const choices = [['foo'], { foo: 'bar' }, 'foo'];

    choices.forEach(choice => {
      assert.doesNotThrow(() => {
        Assert.notEmpty().validate(choice);
      });
    });
  });
});
