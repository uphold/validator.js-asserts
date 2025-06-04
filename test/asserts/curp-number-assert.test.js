'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const CurpNumberAssert = require('../../src/asserts/curp-number-assert.js');

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
  it('should throw an error if the input value is not a string', ({ assert }) => {
    try {
      Assert.curpNumber().validate();

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'CurpNumber');
      assert.ok(e.value === undefined);
      assert.equal(e.violation.value, 'must_be_a_string');
    }
  });

  it('should throw an error if `curp` is invalid', ({ assert }) => {
    try {
      Assert.curpNumber().validate('123');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.value, '123');
      assert.equal(e.violation.value, 'must_be_a_valid_curp_number');
    }
  });

  it('should accept a valid `curp`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.curpNumber().validate('LOOA531113HTCPBN07');
    });
  });
});
