
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/email-assert');
var fmt = require('util').format;
var should = require('should');

/**
 * Test `EmailAssert`.
 */

describe('EmailAssert', function() {
  before(function() {
    Assert.prototype.Email = assert;
  });

  it('should throw an error if the input value is not a string', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().Email().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should throw an error if email is a string but is out of boundaries', function() {
    try {
      new Assert().Email().validate(fmt('%s@bar.com', new Array(248).join('-')));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `Email`', function() {
    try {
      new Assert().Email().validate('foo');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Email');
    }
  });

  it('should accept valid emails', function() {
    [
      'foo@bar.com',
      'føø@båz.com',
      'foo+bar@baz.com',
      fmt('%s@bar.com', new Array(247).join('-'))
    ].forEach(function(choice) {
      new Assert().Email().validate(choice);
    });
  });
});
