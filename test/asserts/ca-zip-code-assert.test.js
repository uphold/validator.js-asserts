'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const CaZipCodeAssert = require('../../src/asserts/ca-zip-code-assert');

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
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.caZipCode().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if `value` is invalid', () => {
    const choices = ['#', '1A1A9B', 'A1AA1A', 'D1A9B9'];

    choices.forEach(choice => {
      try {
        Assert.caZipCode().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.show().assert).toBe('CaZipCode');
      }
    });
  });

  it('should accept a valid zip code', () => {
    ['A1A1A1', 'A1A9B9', 'A1A9b9', 'A1a9B9', 'C9A2M6', 'C9A 2M6', 'T7A-2D3', 'a1A9B9'].forEach(choice => {
      Assert.caZipCode().validate(choice);
    });
  });
});
