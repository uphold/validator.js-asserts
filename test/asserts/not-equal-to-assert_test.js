
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/not-equal-to-assert');
var should = require('should');

/**
 * Test `NotEqualToAssert`.
 */

describe('NotEqualToAssert', function() {
  before(function() {
    Assert.prototype.NotEqualTo = assert;
  });

  it('should throw an error if the input value is equal to the reference', function() {
    try {
      new Assert().NotEqualTo(123).validate(123);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `NotEqualTo`', function() {
    try {
      new Assert().NotEqualTo(123).validate(123);

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('NotEqualTo');
    }
  });

  it('should accept a value not equal to the reference', function() {
    new Assert().NotEqualTo(123).validate(456);
  });
});
