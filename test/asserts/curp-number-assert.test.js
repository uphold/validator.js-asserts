'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const CurpNumberAssert = require('../../src/asserts/curp-number-assert');

/**
 * Extend `Assert` with `CurpNumberAssert`.
 */

const Assert = BaseAssert.extend({
  CurpNumber: CurpNumberAssert
});

/**
 * Test `CurpNumberAssert`.
 */

describe('CurpNumberAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    try {
      Assert.curpNumber().validate();

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('CurpNumber');
      expect(e.value).toBeUndefined();
      expect(e.violation.value).toBe('must_be_a_string');
    }
  });

  it('should throw an error if `curp` is invalid', () => {
    try {
      Assert.curpNumber().validate('123');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.value).toBe('123');
      expect(e.violation.value).toBe('must_be_a_valid_curp_number');
    }
  });

  it('should accept a valid `curp`', () => {
    Assert.curpNumber().validate('LOOA531113HTCPBN07');
  });
});
