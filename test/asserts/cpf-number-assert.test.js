'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const CpfNumberAssert = require('../../src/asserts/cpf-number-assert.js');

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
  it('should throw an error if the input value is not a string', ({ assert }) => {
    try {
      Assert.cpfNumber().validate();

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'CpfNumber');
      assert.ok(e.value === undefined);
      assert.equal(e.violation.value, 'must_be_a_string');
    }
  });

  it('should throw an error if `cpf` is invalid', ({ assert }) => {
    try {
      Assert.cpfNumber().validate('123');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.value, '123');
      assert.equal(e.violation.value, 'must_be_a_valid_cpf_number');
    }
  });

  it('should throw an error if `cpf` is invalid but correctly formatted', ({ assert }) => {
    try {
      Assert.cpfNumber().validate('564.232.751-31');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.value, '564.232.751-31');
      assert.equal(e.violation.value, 'must_be_a_valid_cpf_number');
    }
  });

  it('should accept a valid `cpf` not formatted', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.cpfNumber().validate('43228987264');
    });
  });

  it('should accept a valid `cpf` correctly formatted', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.cpfNumber().validate('432.289.872-64');
    });
  });
});
