
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/null-or-string-assert');
var should = require('should');

/**
 * Test `NullOrStringAssert`.
 */

describe('NullOrStringAssert', function() {
  before(function() {
    Assert.prototype.NullOrString = assert;
  });

  it('should throw an error if the input value is not a `null` or a string', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().NullOrString().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_null_or_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should throw an error if input is a string but is out of boundaries', function() {
    try {
      new Assert().NullOrString({ min: 10 }).validate('foo');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.violation.should.eql({ min: 10 });
    }
  });

  it('should expose `assert` equal to `NullOrString`', function() {
    try {
      new Assert().NullOrString().validate({});

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('NullOrString');
    }
  });

  it('should expose `min` or `max` on the violation if testing boundaries of a string', function() {
    try {
      new Assert().NullOrString({ min: 5 }).validate('foo');

      should.fail();
    } catch(e) {
      e.show().violation.min.should.equal(5);
    }
  });

  it('should expose `min` or `max` on the `assert` if testing boundaries of a string', function() {
    try {
      new Assert().NullOrString({ min: 1, max: 2 }).validate('foobar');

      should.fail();
    } catch(e) {
      e.assert.min.should.equal(1);
      e.assert.max.should.equal(2);
    }
  });

  it('should accept `null`', function() {
    new Assert().NullOrString().validate(null);
  });

  it('should accept a string within boundaries', function() {
    new Assert().NullOrString({ max: 10 }).validate('foo');
  });

  it('should accept a string', function() {
    new Assert().NullOrString().validate('foo');
  });
});
