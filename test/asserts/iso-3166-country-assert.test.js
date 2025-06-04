'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const Iso3166CountryAssert = require('../../src/asserts/iso-3166-country-assert.js');

/**
 * Extend `Assert` with `Iso3166CountryAssert`.
 */

const Assert = BaseAssert.extend({
  Iso3166Country: Iso3166CountryAssert
});

/**
 * Test `Iso3166CountryAssert`.
 */

describe('Iso3166CountryAssert', () => {
  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.iso3166Country().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if country is invalid', ({ assert }) => {
    try {
      Assert.iso3166Country().validate('FOO');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.value, 'FOO');
    }
  });

  it('should expose `assert` equal to `Iso3166Country`', ({ assert }) => {
    try {
      Assert.iso3166Country().validate([]);

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'Iso3166Country');
    }
  });

  it('should accept an ISO 3166-1 alpha-3 code', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.iso3166Country().validate('PRT');
    });
  });

  it('should accept an ISO 3166-1 alpha-2 code', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.iso3166Country().validate('PT');
    });
  });

  it('should accept an ISO 3166-1 country name in short format', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.iso3166Country().validate('Portugal');
    });
  });

  it('should accept an ISO 3166-1 country name in uppercase format', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.iso3166Country().validate('PORTUGAL');
    });
  });
});
