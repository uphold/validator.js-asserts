
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/uuid-assert');
var should = require('should');

/**
 * Test `UuidAssert`.
 */

describe('UuidAssert', function() {
  before(function() {
    Assert.prototype.Uuid = assert;
  });

  it('should throw an error if the input value is not a string', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().Uuid().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should throw an error if the uuid `version` is specified but not supported', function() {
    var versions = [1,2];

    versions.forEach(function(version) {
      try {
        new Assert().Uuid(version);

        should.fail();
      } catch (e) {
        e.message.should.equal('UUID version specified is not supported.');
      }
    });
  });

  it('should expose `assert` equal to `Uuid`', function() {
    try {
      new Assert().Uuid().validate('foo');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Uuid');
    }
  });

  it('should expose `version` on the violation', function() {
    try {
      new Assert().Uuid(5).validate('foo');

      should.fail();
    } catch(e) {
      e.show().violation.version.should.equal(5);
    }
  });

  it('should accept a v3 uuid', function() {
    new Assert().Uuid(3).validate('6fa459ea-ee8a-3ca4-894e-db77e160355e');
  });

  it('should accept a v4 uuid', function() {
    new Assert().Uuid(4).validate('17dd5a7a-637c-436e-bb8a-5398f7ac0a76');
  });

  it('should accept a v5 uuid', function() {
    new Assert().Uuid(5).validate('74738ff5-5367-5958-9aee-98fffdcd1876');
  });
});
