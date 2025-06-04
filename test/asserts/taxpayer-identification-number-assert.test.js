'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const TaxpayerIdentificationNumberAssert = require('../../src/asserts/taxpayer-identification-number-assert.js');

/**
 * Extend `Assert` with `TaxpayerIdentificationNumberAssert`.
 */

const Assert = BaseAssert.extend({
  TaxpayerIdentificationNumber: TaxpayerIdentificationNumberAssert
});

/**
 * Test `TaxpayerIdentificationNumberAssert`.
 */

describe('TaxpayerIdentificationNumberAssert', () => {
  it('should throw an error if the input value is not a string', ({ assert }) => {
    [{}, []].forEach(choice => {
      try {
        Assert.taxpayerIdentificationNumber().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid `tin`', ({ assert }) => {
    try {
      Assert.taxpayerIdentificationNumber().validate('foobar');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().value, 'foobar');
    }
  });

  it('should throw an error if the input value is not a correctly formatted `tin`', ({ assert }) => {
    try {
      Assert.taxpayerIdentificationNumber().validate('1-2-3456 789');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().value, '1-2-3456 789');
    }
  });

  it('should expose `assert` equal to `TaxpayerIdentificationNumber`', ({ assert }) => {
    try {
      Assert.taxpayerIdentificationNumber().validate('1-2-3456 789');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'TaxpayerIdentificationNumber');
    }
  });

  it('should accept a valid `tin`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.taxpayerIdentificationNumber().validate('123456789');
    });
  });

  it('should accept a correctly formatted `tin`', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.taxpayerIdentificationNumber().validate('123-45-6789');
    });
  });
});
