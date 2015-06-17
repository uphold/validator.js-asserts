
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/credit-card-assert');
var should = require('should');

/**
 * Test `CreditCardAssert`.
 */

describe('CreditCardAssert', function() {
  before(function() {
    Assert.prototype.CreditCard = assert;
  });

  it('should throw an error if the input value is not a string', function() {
    var inputs = [[], {}, 123];

    inputs.forEach(function(input) {
      try {
        new Assert().CreditCard().validate(input);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should throw an error if the input value is not a valid card number', function() {
    try {
      new Assert().CreditCard().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.value.should.equal('foobar');
    }
  });

  it('should expose `assert` equal to `CreditCard`', function() {
    try {
      new Assert().CreditCard().validate(123);

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('CreditCard');
    }
  });

  it('should accept a valid credit card number', function() {
    new Assert().CreditCard().validate('4111111111111111');
  });
});
