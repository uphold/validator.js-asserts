'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const EqualKeysAssert = require('../../src/asserts/equal-keys-assert.js');

/**
 * Extend `Assert` with `EqualKeysAssert`.
 */

const Assert = BaseAssert.extend({
  EqualKeys: EqualKeysAssert
});

/**
 * Test `EqualKeysAssert`.
 */

describe('EqualKeysAssert', () => {
  it('should throw an error if the input value is not a plain object', ({ assert }) => {
    const choices = [[], '', 123];

    choices.forEach(choice => {
      try {
        Assert.equalKeys(['foo', 'bar']).validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_plain_object');
      }
    });
  });

  it('should throw an error if the object does not have the expected keys', ({ assert }) => {
    try {
      Assert.equalKeys(['foo']).validate({ bar: 'biz', foo: 'qux' });

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
    }
  });

  it('should throw an error if the object is empty', ({ assert }) => {
    try {
      Assert.equalKeys(['foo']).validate({});

      assert.fail();
    } catch (e) {
      assert.deepEqual(e.show().violation.difference, ['foo']);
    }
  });

  it('should allow `keys` to be `undefined`', ({ assert }) => {
    try {
      Assert.equalKeys().validate({ foo: 'oof' });

      assert.fail();
    } catch (e) {
      assert.deepEqual(e.show().violation.difference, ['foo']);
    }
  });

  it('should allow `keys` to be defined as multiple arguments', ({ assert }) => {
    try {
      Assert.equalKeys('foo', 'bar').validate({ foo: 'oof' });

      assert.fail();
    } catch (e) {
      assert.deepEqual(e.show().violation.difference, ['bar']);
    }
  });

  it('should allow `keys` to be defined as a single string argument', ({ assert }) => {
    try {
      Assert.equalKeys('bar').validate({ foo: 'oof' });

      assert.fail();
    } catch (e) {
      assert.deepEqual(e.show().violation.difference, ['foo']);
    }
  });

  it('should expose `assert` equal to `EqualKeys`', ({ assert }) => {
    try {
      Assert.equalKeys(['foo']).validate(123);

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'EqualKeys');
    }
  });

  it('should expose `difference` on the violation if object has extra keys', ({ assert }) => {
    try {
      Assert.equalKeys(['foo']).validate({ bar: 'biz', foo: 'qux' });

      assert.fail();
    } catch (e) {
      assert.deepEqual(e.show().violation.difference, ['bar']);
    }
  });

  it('should expose `difference` on the violation if object has missing keys', ({ assert }) => {
    try {
      Assert.equalKeys(['foo', 'biz']).validate({ foo: 'qux' });

      assert.fail();
    } catch (e) {
      assert.deepEqual(e.show().violation.difference, ['biz']);
    }
  });

  it('should accept an empty object with no keys expected', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.equalKeys().validate({});
    });
  });

  it('should accept an object with expected keys', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.equalKeys(['foo', 'bar']).validate({ bar: 'biz', foo: 'qux' });
    });
  });
});
