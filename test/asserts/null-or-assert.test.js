'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const NullOrAssert = require('../../src/asserts/null-or-assert.js');
const UuidAssert = require('../../src/asserts/uuid-assert.js');

/**
 * Extend `Assert` with `NullOrAssert`.
 */

const Assert = BaseAssert.extend({
  NullOr: NullOrAssert,
  Uuid: UuidAssert
});

/**
 * Test `NullOrAssert`.
 */

describe('NullOrAssert', () => {
  it('should throw an error if the specified assert is missing', ({ assert }) => {
    try {
      Assert.nullOr('foo').validate();

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Error);
      assert.equal(e.message, 'Assert must be an object.');
    }
  });

  it('should throw an error if the specified assert is not valid', ({ assert }) => {
    try {
      Assert.nullOr('foo').validate('bar');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Error);
      assert.equal(e.message, 'Assert must be an object.');
    }
  });

  it('should throw an error if the specified assert has no `validate` function', ({ assert }) => {
    try {
      Assert.nullOr({}).validate(123);

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Error);
      assert.equal(e.message, 'Assert must have a validate function.');
    }
  });

  it('should throw an error if the specified assert has a `validate` property that is not a function', ({ assert }) => {
    try {
      Assert.nullOr({ validate: true }).validate(123);

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Error);
      assert.equal(e.message, 'Assert must have a validate function.');
    }
  });

  it('should throw an error if the value is not null and is not valid for the specified assert', ({ assert }) => {
    try {
      Assert.nullOr(Assert.string()).validate(123);

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'IsString');
      assert.equal(e.violation.value, 'must_be_a_string');
    }
  });

  it('should include the arguments of the specified assert', ({ assert }) => {
    try {
      Assert.nullOr(Assert.uuid(4)).validate('foobar');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Object);
      assert.equal(e.show().assert, 'Uuid');
      assert.equal(e.violation.version, 4);
    }
  });

  it('should accept a null value', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOr(Assert.string()).validate(null);
    });
  });

  it('should accept a value that is valid for the specified assert', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.nullOr(Assert.string()).validate('foobar');
    });
  });
});
