
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/null-or-date-assert');
var should = require('should');

/**
 * Test `NullOrDateAssert`.
 */

describe('NullOrDateAssert', function() {
  before(function() {
    Assert.prototype.NullOrDate = assert;
  });

  it('should throw an error if the input value is not a `null` or a date', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().NullOrDate().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_null_or_a_date);
        /* jshint camelcase: true */
      }
    });
  });

  it('should expose `assert` equal to `NullOrDate`', function() {
    try {
      new Assert().NullOrDate().validate({});

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('NullOrDate');
    }
  });

  it('should accept `null`', function() {
    new Assert().NullOrDate().validate(null);
  });

  it('should accept a date', function() {
    new Assert().NullOrDate().validate(new Date());
  });

  it('should accept a string', function() {
    new Assert().NullOrDate().validate('2014-10-16');
  });
});
