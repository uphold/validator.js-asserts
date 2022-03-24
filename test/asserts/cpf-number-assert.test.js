'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const CpfNumberAssert = require('../../src/asserts/cpf-number-assert');

/**
 * Extend `Assert` with `CpfNumberAssert`.
 */

const Assert = BaseAssert.extend({
  CpfNumber: CpfNumberAssert
});

/**
 * Test `CpfNumberAssert`.
 */

describe('CpfNumberAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    try {
      Assert.cpfNumber().validate();

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().assert).toBe('CpfNumber');
      expect(e.value).toBeUndefined();
      expect(e.violation.value).toBe('must_be_a_string');
    }
  });

  it('should throw an error if `cpf` is invalid', () => {
    try {
      Assert.cpfNumber().validate('123');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.value).toBe('123');
      expect(e.violation.value).toBe('must_be_a_valid_cpf_number');
    }
  });

  it('should throw an error if `cpf` is invalid but correctly formatted', () => {
    try {
      Assert.cpfNumber().validate('564.232.751-31');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.value).toBe('564.232.751-31');
      expect(e.violation.value).toBe('must_be_a_valid_cpf_number');
    }
  });

  it('should accept a valid `cpf` not formatted', () => {
    Assert.cpfNumber().validate('43228987264');
  });

  it('should accept a valid `cpf` correctly formatted', () => {
    Assert.cpfNumber().validate('432.289.872-64');
  });
});
