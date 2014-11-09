
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/us-state-assert');
var should = require('should');

/**
 * Test `UsStateAssert`.
 */

describe('UsStateAssert', function() {
  before(function() {
    Assert.prototype.UsState = assert;
  });

  it('should throw an error if the input value is not a string', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().UsState().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should throw an error if state is invalid', function() {
    try {
      new Assert().UsState().validate('FOO');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `UsState`', function() {
    try {
      new Assert().UsState().validate('FOO');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('UsState');
    }
  });

  it('should accept a state code', function() {
    new Assert().UsState().validate('CA');
  });
});
