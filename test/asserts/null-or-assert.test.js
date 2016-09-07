'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const NullOrAssert = require('../../src/asserts/null-or-assert');
const UuidAssert = require('../../src/asserts/uuid-assert');

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
  it('should throw an error if the specified assert is missing', () => {
    try {
      Assert.nullOr('foo').validate();

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Assert must be an object.');
    }
  });

  it('should throw an error if the specified assert is not valid', () => {
    try {
      Assert.nullOr('foo').validate('bar');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Assert must be an object.');
    }
  });

  it('should throw an error if the specified assert has no `validate` function', () => {
    try {
      Assert.nullOr({}).validate(123);

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Assert must have a validate function.');
    }
  });

  it('should throw an error if the specified assert has a `validate` property that is not a function', () => {
    try {
      Assert.nullOr({ validate: true }).validate(123);

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Assert must have a validate function.');
    }
  });

  it('should throw an error if the value is not null and is not valid for the specified assert', () => {
    try {
      Assert.nullOr(Assert.string()).validate(123);

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('IsString');
      expect(e.violation.value).toBe('must_be_a_string');
    }
  });

  it('should include the arguments of the specified assert', () => {
    try {
      Assert.nullOr(Assert.uuid(4)).validate('foobar');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Object);
      expect(e.show().assert).toBe('Uuid');
      expect(e.violation.version).toBe(4);
    }
  });

  it('should accept a null value', () => {
    Assert.nullOr(Assert.string()).validate(null);
  });

  it('should accept a value that is valid for the specified assert', () => {
    Assert.nullOr(Assert.string()).validate('foobar');
  });
});
