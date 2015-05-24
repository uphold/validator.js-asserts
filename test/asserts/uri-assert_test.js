
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/uri-assert');
var fmt = require('util').format;
var should = require('should');

/**
 * Test `UriAssert`.
 */

describe('UriAssert', function() {
  before(function() {
    Assert.prototype.Uri = assert;
  });

  it('should throw an error if the constraint is invalid', function() {
    try {
      new Assert().Uri({ foo: 'bar' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Error);
      e.message.should.equal('Invalid constraint "foo=bar"');
    }
  });

  it('should throw an error if the input value is not a string', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().Uri().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should throw an error if the uri does not contain a `hostname`', function() {
    try {
      new Assert().Uri().validate(fmt('foo-%s-bar', new Array(248).join('-')));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not contain a `protocol`', function() {
    try {
      new Assert().Uri().validate('foobar.com');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not match the constraints', function() {
    try {
      new Assert().Uri({ protocol: 'http' }).validate(fmt('https://%s@bar.com', new Array(248).join('-')));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `constraints` on the violation', function() {
    try {
      new Assert().Uri({ protocol: 'http' }).validate('https://foobar.com');

      should.fail();
    } catch(e) {
      e.show().violation.constraints.should.eql({ protocol: 'http' });
    }
  });

  it('should expose `assert` equal to `Uri`', function() {
    try {
      new Assert().Uri().validate('foo');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Uri');
    }
  });

  it('should accept valid uris', function() {
    [
      'http://foobar.com',
      'http://føøbåz.com',
      'http://foobar.com',
      'https://foobar.com',
      'ftp://foobar.com',
      'biz://foobar.com'
    ].forEach(function(choice) {
      new Assert().Uri().validate(choice);
    });
  });
});
