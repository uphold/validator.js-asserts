
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/country-assert');
var should = require('should');

/**
 * Test `CountryAssert`.
 */

describe('CountryAssert', function() {
  before(function() {
    Assert.prototype.Country = assert;
  });

  it('should throw an error if the input value is not a string', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().Country().validate(choice);

        should.fail();
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
      new Assert().Country().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('FOO');
    }
  });

  it('should expose `assert` equal to `Country`', function() {
    try {
      new Assert().Country().validate([]);

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Country');
    }
  });

  it('should accept an `alpha-3` code', function() {
    new Assert().Country().validate('PRT');
  });

  it('should accept an `alpha-3` code belonging to a division', function() {
    new Assert().Country().validate('SHN');
  });

  it('should accept an `alpha-2` code', function() {
    new Assert().Country().validate('PT');
  });

  it('should accept an `alpha-2` code belonging to a division', function() {
    new Assert().Country().validate('BQ');
  });

  it('should accept a country `official` name', function() {
    new Assert().Country().validate('Portuguese Republic');
  });

  it('should accept a country `common` name', function() {
    new Assert().Country().validate('Portugal');
  });

  it('should accept a country `altSpelling` name', function() {
    new Assert().Country().validate('República Portuguesa');
  });
});
