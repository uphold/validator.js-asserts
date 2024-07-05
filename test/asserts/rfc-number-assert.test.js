'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const RfcNumberAssert = require('../../src/asserts/rfc-number-assert');

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
  it('should throw an error if the input value is not a string', () => {
    try {
      Assert.rfcNumber().validate();

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('RfcNumber');
      expect(e.value).toBeUndefined();
      expect(e.violation.value).toBe('must_be_a_string');
    }
  });

  it('should throw an error if `rfc` is invalid', () => {
    try {
      Assert.rfcNumber().validate('123');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.value).toBe('123');
      expect(e.violation.value).toBe('must_be_a_valid_rfc_number');
    }
  });

  it('should accept a valid `rfc`', () => {
    Assert.rfcNumber().validate('mhtr93041179a');
  });
});
