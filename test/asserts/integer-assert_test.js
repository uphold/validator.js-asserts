
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/integer-assert');
var should = require('should');

/**
 * Test `IntegerAssert`.
 */

describe('IntegerAssert', function() {
  before(function() {
    Assert.prototype.Integer = assert;
  });

  it('should throw an error if the input value is not a number', function() {
    var choices = [{}, 'foo', '', [], 1.01, '2'];

    choices.forEach(function(choice) {
      try {
        new Assert().Integer().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `Integer`', function() {
    try {
      new Assert().Integer().validate('foo');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('Integer');
    }
  });

  it('should accept an integer', function() {
    new Assert().Integer().validate(1);
  });
});
