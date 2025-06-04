'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const CallbackAssert = require('../../src/asserts/callback-assert.js');

/**
 * Extend `Assert` with `CallbackAssert`.
 */

const Assert = BaseAssert.extend({
  Callback: CallbackAssert
});

/**
 * Test `CallbackAssert`.
 */

describe('CallbackAssert', () => {
  it('should throw an error if `customClass` is missing', ({ assert }) => {
    try {
      Assert.callback(value => value === 'foobiz').validate('foobar');
    } catch (e) {
      assert.equal(e.message, 'Callback must be instantiated with a valid custom class name');
    }
  });

  it('should throw an error if `customClass` is invalid', ({ assert }) => {
    ['foo bar', 'foo 1', '%', '{}'].forEach(customClass => {
      try {
        Assert.callback(value => value === 'foobiz', customClass).validate('foobar');
      } catch (e) {
        assert.equal(e.message, 'Callback must be instantiated with a valid custom class name');
      }
    });
  });

  it('should throw an error if `value` is missing', ({ assert }) => {
    try {
      Assert.callback(null, 'CustomClass').validate();

      assert.fail();
    } catch (e) {
      assert.equal(e.message, 'Callback must be instantiated with a function');
    }
  });

  it('should throw an error if `value` is not a function', ({ assert }) => {
    try {
      Assert.callback(null, 'CustomClass').validate('foobar');

      assert.fail();
    } catch (e) {
      assert.equal(e.message, 'Callback must be instantiated with a function');
    }
  });

  it('should throw an error if the given function is invalid', ({ assert }) => {
    try {
      // eslint-disable-next-line no-undef
      Assert.callback(() => thisFunctionDoesNotExist(), 'CustomClass').validate('foobar');
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'CustomClass');
      assert.equal(e.show().value, 'foobar');
      assert.ok(e.show().violation !== undefined);
      assert.ok(e.show().violation.error instanceof ReferenceError);
      assert.equal(e.show().violation.error.message, 'thisFunctionDoesNotExist is not defined');
    }
  });

  it('should throw an error if the callback function returns `false`', ({ assert }) => {
    try {
      Assert.callback(value => value === 'foobiz', 'CustomClass').validate('foobar');
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'CustomClass');
      assert.equal(e.show().value, 'foobar');
      assert.ok(!e.show().violation.result);
    }
  });

  it('should expose `assert` equal to `CustomClass`', ({ assert }) => {
    try {
      Assert.callback(value => value === 'foobiz', 'CustomClass').validate('foobar');
    } catch (e) {
      assert.equal(e.show().assert, 'CustomClass');
    }
  });

  it('should not throw an error if the callback function returns `true`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.callback(value => value === 'foobar', 'CustomClass').validate('foobar');
    });
  });
});
