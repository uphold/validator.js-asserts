
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/boolean-assert');
var should = require('should');

/**
 * Test `BooleanAssert`.
 */

describe('BooleanAssert', function() {
  before(function() {
    Assert.prototype.Boolean = assert;
  });

  it('should throw an error if the input value is not a boolean', function() {
    /* jshint -W053: false */
    var choices = [[], {}, 123, new Boolean(true), 'foo'];
    /* jshint: -W053: true */

    choices.forEach(function(choice) {
      try {
        new Assert().Boolean().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_boolean);
        /* jshint camelcase: true */
      }
    });
  });

  it('should expose `assert` equal to `Boolean`', function() {
    try {
      new Assert().Boolean().validate('foo');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Boolean');
    }
  });

  it('should accept a `true` boolean value', function() {
    new Assert().Boolean().validate(true);
  });

  it('should accept a `false` boolean value', function() {
    new Assert().Boolean().validate(false);
  });
});
