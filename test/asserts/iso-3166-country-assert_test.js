'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const Iso3166CountryAssert = require('../../src/asserts/iso-3166-country-assert');
const should = require('should');

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
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.iso3166Country().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if country is invalid', () => {
    try {
      Assert.iso3166Country().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('FOO');
    }
  });

  it('should expose `assert` equal to `Iso3166Country`', () => {
    try {
      Assert.iso3166Country().validate([]);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Iso3166Country');
    }
  });

  it('should accept an ISO 3166-1 alpha-3 code', () => {
    Assert.iso3166Country().validate('PRT');
  });

  it('should accept an ISO 3166-1 alpha-2 code', () => {
    Assert.iso3166Country().validate('PT');
  });

  it('should accept an ISO 3166-1 country name in short format', () => {
    Assert.iso3166Country().validate('Portugal');
  });

  it('should accept an ISO 3166-1 country name in uppercase format', () => {
    Assert.iso3166Country().validate('PORTUGAL');
  });
});
