
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/hash-assert');
var should = require('should');

/**
 * Test `HashAssert`.
 */

describe('HashAssert', function() {
  before(function() {
    Assert.prototype.Hash = assert;
  });

  it('should throw an error if the hash algorithm is missing', function() {
    try {
      new Assert().Hash();

      should.fail();
    } catch (e) {
      e.message.should.equal('An algorithm is required.');
    }
  });

  it('should throw an error if the hash algorithm is not supported', function() {
    var algorithms = ['md5', 'sha384'];

    algorithms.forEach(function(algorithm) {
      try {
        new Assert().Hash(algorithm);

        should.fail();
      } catch (e) {
        e.message.should.equal('The algorithm specified is not supported.');
      }
    });
  });

  it('should throw an error if the input value is not a string', function() {
    var inputs = [[], {}, 123];

    inputs.forEach(function(input) {
      try {
        new Assert().Hash('sha512').validate(input);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should expose `assert` equal to `Hash`', function() {
    try {
      new Assert().Hash('sha1').validate(123);

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Hash');
    }
  });

  it('should expose `algorithm` on the violation', function() {
    try {
      new Assert().Hash('sha1').validate('foo');

      should.fail();
    } catch(e) {
      e.show().violation.algorithm.should.equal('sha1');
    }
  });

  it('should accept a `sha1` hash', function() {
    new Assert().Hash('sha1').validate('0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33');
  });

  it('should accept a `sha256` hash', function() {
    new Assert().Hash('sha256').validate('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
  });

  it('should accept a `sha512` hash', function() {
    new Assert().Hash('sha512').validate('f7fbba6e0636f890e56fbbf3283e524c6fa3204ae298382d624741d0dc6638326e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7');
  });
});
