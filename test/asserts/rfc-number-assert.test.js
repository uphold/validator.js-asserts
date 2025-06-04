'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const RfcNumberAssert = require('../../src/asserts/rfc-number-assert.js');

/**
 * Extend `Assert` with `RfcNumberAssert`.
 */

const Assert = BaseAssert.extend({
  RfcNumber: RfcNumberAssert
});

/**
 * Test `RfcNumberAssert`.
 */

describe('RfcNumberAssert', () => {
  it('should throw an error if the input value is not a string', ({ assert }) => {
    try {
      Assert.rfcNumber().validate();

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'RfcNumber');
      assert.ok(e.value === undefined);
      assert.equal(e.violation.value, 'must_be_a_string');
    }
  });

  it('should throw an error if `rfc` is invalid', ({ assert }) => {
    try {
      Assert.rfcNumber().validate('123');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.value, '123');
      assert.equal(e.violation.value, 'must_be_a_valid_rfc_number');
    }
  });

  it('should accept a valid `rfc`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.rfcNumber().validate('mhtr93041179a');
    });
  });
});
