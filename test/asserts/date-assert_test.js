
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/date-assert');
var should = require('should');

/**
 * Test `DateAssert`.
 */

describe('DateAssert', function() {
  before(function() {
    Assert.prototype.Date = assert;
  });

  it('should throw an error if the input value is not a string or a date', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().Date().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_date_or_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should expose `assert` equal to `Date`', function() {
    try {
      new Assert().Date().validate('foo');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Date');
    }
  });

  it('should accept a `Date`', function() {
    new Assert().Date().validate(new Date());
  });

  it('should accept a `string`', function() {
    new Assert().Date().validate('2014-10-16');
  });
});
