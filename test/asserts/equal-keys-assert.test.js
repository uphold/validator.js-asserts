'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const EqualKeysAssert = require('../../src/asserts/equal-keys-assert');

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
  it('should throw an error if the input value is not a plain object', () => {
    const choices = [[], '', 123];

    choices.forEach(choice => {
      try {
        Assert.equalKeys(['foo', 'bar']).validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_plain_object');
      }
    });
  });

  it('should throw an error if the object does not have the expected keys', () => {
    try {
      Assert.equalKeys(['foo']).validate({ bar: 'biz', foo: 'qux' });

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
    }
  });

  it('should throw an error if the object is empty', () => {
    try {
      Assert.equalKeys(['foo']).validate({});

      fail();
    } catch (e) {
      expect(e.show().violation.difference).toEqual(['foo']);
    }
  });

  it('should allow `keys` to be `undefined`', () => {
    try {
      Assert.equalKeys().validate({ foo: 'oof' });

      fail();
    } catch (e) {
      expect(e.show().violation.difference).toEqual(['foo']);
    }
  });

  it('should allow `keys` to be defined as multiple arguments', () => {
    try {
      Assert.equalKeys('foo', 'bar').validate({ foo: 'oof' });

      fail();
    } catch (e) {
      expect(e.show().violation.difference).toEqual(['bar']);
    }
  });

  it('should allow `keys` to be defined as a single string argument', () => {
    try {
      Assert.equalKeys('bar').validate({ foo: 'oof' });

      fail();
    } catch (e) {
      expect(e.show().violation.difference).toEqual(['foo']);
    }
  });

  it('should expose `assert` equal to `EqualKeys`', () => {
    try {
      Assert.equalKeys(['foo']).validate(123);

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('EqualKeys');
    }
  });

  it('should expose `difference` on the violation if object has extra keys', () => {
    try {
      Assert.equalKeys(['foo']).validate({ bar: 'biz', foo: 'qux' });

      fail();
    } catch (e) {
      expect(e.show().violation.difference).toEqual(['bar']);
    }
  });

  it('should expose `difference` on the violation if object has missing keys', () => {
    try {
      Assert.equalKeys(['foo', 'biz']).validate({ foo: 'qux' });

      fail();
    } catch (e) {
      expect(e.show().violation.difference).toEqual(['biz']);
    }
  });

  it('should accept an empty object with no keys expected', () => {
    Assert.equalKeys().validate({});
  });

  it('should accept an object with expected keys', () => {
    Assert.equalKeys(['foo', 'bar']).validate({ bar: 'biz', foo: 'qux' });
  });
});
