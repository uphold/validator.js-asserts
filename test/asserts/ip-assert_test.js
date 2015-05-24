
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/ip-assert');
var should = require('should');

/**
 * Test `IpAssert`.
 */

describe('IpAssert', function() {
  before(function() {
    Assert.prototype.Ip = assert;
  });

  it('should throw an error if the input value is not a valid string', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().Ip().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should expose `assert` equal to `Ip`', function() {
    try {
      new Assert().Ip().validate(123);

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Ip');
    }
  });

  it('should accept valid ips', function() {
    ['1.3.3.7', '::1'].forEach(function(choice) {
      new Assert().Ip().validate(choice);
    });
  });
});
