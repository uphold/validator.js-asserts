
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/iso-3166-country-assert');
var should = require('should');

/**
 * Test `Iso3166CountryAssert`.
 */

describe('Iso3166CountryAssert', function() {
  before(function() {
    Assert.prototype.Iso3166Country = assert;
  });

  it('should throw an error if the input value is not a string', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().Iso3166Country().validate(choice);
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should throw an error if country is invalid', function() {
    try {
      new Assert().Iso3166Country().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('FOO');
    }
  });

  it('should expose `assert` equal to `Iso3166Country`', function() {
    try {
      new Assert().Iso3166Country().validate([]);

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Iso3166Country');
    }
  });

  it('should accept an ISO 3166-1 alpha-3 code', function() {
    new Assert().Iso3166Country().validate('PRT');
  });

  it('should accept an ISO 3166-1 alpha-2 code', function() {
    new Assert().Iso3166Country().validate('PT');
  });

  it('should accept an ISO 3166-1 country name', function() {
    new Assert().Iso3166Country().validate('Portugal');
  });
});
