'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const UkModulusCheckingAssert = require('../../src/asserts/uk-modulus-checking-assert');

/**
 * Extend `Assert` with `UkModulusCheckingAssert`.
 */

const Assert = BaseAssert.extend({
  UkModulusChecking: UkModulusCheckingAssert
});

/**
 * Test `UkModulusChecking`.
 */

describe('UkModulusChecking', () => {
  it('should throw an error if `accountNumber` is missing', () => {
    try {
      Assert.ukModulusChecking().validate();

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('UkModulusChecking');
      expect(e.show().violation).toEqual({ accountNumber: 'must_be_a_string' });
    }
  });

  it('should throw an error if `sortCode` is missing', () => {
    try {
      Assert.ukModulusChecking().validate({ accountNumber: '' });

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('UkModulusChecking');
      expect(e.show().violation).toEqual({ sortCode: 'must_be_a_string' });
    }
  });

  it('should throw an error if `accountNumber` or `sortCode` are invalid', () => {
    try {
      Assert.ukModulusChecking().validate({ accountNumber: '15764273', sortCode: '938063' });

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('UkModulusChecking');
      expect(Object.keys(e.value)).toMatchObject(['accountNumber', 'sortCode']);
    }
  });

  it('should accept a valid `accountNumber` and `sortCode`', () => {
    Assert.ukModulusChecking().validate({ accountNumber: '66374958', sortCode: '089999' });
  });
});
