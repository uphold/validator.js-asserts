'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const UkModulusCheckingAssert = require('../../src/asserts/uk-modulus-checking-assert.js');

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
  it('should throw an error if `accountNumber` is missing', ({ assert }) => {
    try {
      Assert.ukModulusChecking().validate();

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'UkModulusChecking');
      assert.deepEqual(e.show().violation, { accountNumber: 'must_be_a_string' });
    }
  });

  it('should throw an error if `sortCode` is missing', ({ assert }) => {
    try {
      Assert.ukModulusChecking().validate({ accountNumber: '' });

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'UkModulusChecking');
      assert.deepEqual(e.show().violation, { sortCode: 'must_be_a_string' });
    }
  });

  it('should throw an error if `accountNumber` or `sortCode` are invalid', ({ assert }) => {
    try {
      Assert.ukModulusChecking().validate({ accountNumber: '15764273', sortCode: '938063' });

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'UkModulusChecking');
      assert.deepEqual(Object.keys(e.value), ['accountNumber', 'sortCode']);
    }
  });

  it('should accept a valid `accountNumber` and `sortCode`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.ukModulusChecking().validate({ accountNumber: '66374958', sortCode: '089999' });
    });
  });
});
