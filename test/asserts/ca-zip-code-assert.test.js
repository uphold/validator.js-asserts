'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const CaZipCodeAssert = require('../../src/asserts/ca-zip-code-assert.js');

/**
 * Extend `Assert` with `CaZipCodeAssert`.
 */

const Assert = BaseAssert.extend({
  CaZipCode: CaZipCodeAssert
});

/**
 * Test `CaZipCodeAssert`.
 */

describe('CaZipCodeAssert', () => {
  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.caZipCode().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if `value` is invalid', ({ assert }) => {
    const choices = ['#', '1A1A9B', 'A1AA1A', 'D1A9B9'];

    choices.forEach(choice => {
      try {
        Assert.caZipCode().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.show().assert, 'CaZipCode');
      }
    });
  });

  it('should accept a valid zip code', ({ assert }) => {
    ['A1A1A1', 'A1A9B9', 'A1A9b9', 'A1a9B9', 'C9A2M6', 'C9A 2M6', 'T7A-2D3', 'a1A9B9'].forEach(choice => {
      assert.doesNotThrow(() => {
        Assert.caZipCode().validate(choice);
      });
    });
  });
});
