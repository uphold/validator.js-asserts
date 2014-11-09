
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/not-empty-assert');
var should = require('should');

/**
 * Test `NotEmptyAssert`.
 */

describe('NotEmptyAssert', function() {
  before(function() {
    Assert.prototype.NotEmpty = assert;
  });

  it('should throw an error if the input value is empty', function() {
    var choices = [[], {}, 123];

    choices.forEach(function(choice) {
      try {
        new Assert().NotEmpty().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `NotEmpty`', function() {
    try {
      new Assert().NotEmpty().validate({});

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('NotEmpty');
    }
  });

  it('should accept not empty values', function() {
    var choices = [['foo'], { foo: 'bar' }, 'foo'];

    choices.forEach(function(choice) {
      new Assert().NotEmpty().validate(choice);
    });
  });
});
