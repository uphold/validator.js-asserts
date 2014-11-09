
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/equal-keys-assert');
var should = require('should');

/**
 * Test `EqualKeysAssert`.
 */

describe('EqualKeysAssert', function() {
  before(function() {
    Assert.prototype.EqualKeys = assert;
  });

  it('should throw an error if the input value is not a plain object', function() {
    var choices = [[], '', 123];

    choices.forEach(function(choice) {
      try {
        new Assert().EqualKeys(['foo', 'bar']).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_plain_object);
        /* jshint camelcase: true */
      }
    });
  });

  it('should throw an error if an object does not have the expected keys', function() {
    try {
      new Assert().EqualKeys(['foo']).validate({ foo: 'qux', bar: 'biz' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `EqualKeys`', function() {
    try {
      new Assert().EqualKeys().validate(123);

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('EqualKeys');
    }
  });

  it('should expose `difference` on the violation', function() {
    try {
      new Assert().EqualKeys(['foo']).validate({ foo: 'qux', bar: 'biz' });

      should.fail();
    } catch(e) {
      e.show().violation.difference.should.eql(['bar']);
    }
  });

  it('should accept an object with expected keys', function() {
    new Assert().EqualKeys(['foo', 'bar']).validate({ foo: 'qux', bar: 'biz' });
  });
});
