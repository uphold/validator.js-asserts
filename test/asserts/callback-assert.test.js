'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const CallbackAssert = require('../../src/asserts/callback-assert');

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
  it('should throw an error if `customClass` is missing', () => {
    try {
      Assert.callback(value => value === 'foobiz').validate('foobar');
    } catch (e) {
      expect(e.message).toEqual('Callback must be instantiated with a valid custom class name');
    }
  });

  it('should throw an error if `customClass` is invalid', () => {
    ['foo bar', 'foo 1', '%', '{}'].forEach(customClass => {
      try {
        Assert.callback(value => value === 'foobiz', customClass).validate('foobar');
      } catch (e) {
        expect(e.message).toEqual('Callback must be instantiated with a valid custom class name');
      }
    });
  });

  it('should throw an error if `value` is missing', () => {
    try {
      Assert.callback(null, 'CustomClass').validate();

      fail();
    } catch (e) {
      expect(e.message).toEqual('Callback must be instantiated with a function');
    }
  });

  it('should throw an error if `value` is not a function', () => {
    try {
      Assert.callback(null, 'CustomClass').validate('foobar');

      fail();
    } catch (e) {
      expect(e.message).toEqual('Callback must be instantiated with a function');
    }
  });

  it('should throw an error if the given function is invalid', () => {
    try {
      // eslint-disable-next-line no-undef
      Assert.callback(() => thisFunctionDoesNotExist(), 'CustomClass').validate('foobar');
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toEqual('CustomClass');
      expect(e.show().value).toEqual('foobar');
      expect(e.show().violation).not.toBeUndefined();
      expect(e.show().violation.error).toBeInstanceOf(ReferenceError);
      expect(e.show().violation.error.message).toEqual('thisFunctionDoesNotExist is not defined');
    }
  });

  it('should throw an error if the callback function returns `false`', () => {
    try {
      Assert.callback(value => value === 'foobiz', 'CustomClass').validate('foobar');
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toEqual('CustomClass');
      expect(e.show().value).toEqual('foobar');
      expect(e.show().violation.result).toBeFalsy();
    }
  });

  it('should expose `assert` equal to `CustomClass`', () => {
    try {
      Assert.callback(value => value === 'foobiz', 'CustomClass').validate('foobar');
    } catch (e) {
      expect(e.show().assert).toEqual('CustomClass');
    }
  });

  it('should expose `assert` equal to `Custom_Class1`', () => {
    try {
      Assert.callback(value => value === 'foobiz', 'Custom_Class1').validate('foobar');
    } catch (e) {
      expect(e.show().assert).toEqual('Custom_Class1');
    }
  });

  it('should not throw an error if the callback function returns `true`', () => {
    Assert.callback(value => value === 'foobar', 'CustomClass').validate('foobar');
  });
});
