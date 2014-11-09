
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/json-assert');
var should = require('should');

/**
 * Test `JsonAssert`.
 */

describe('JsonAssert', function() {
  before(function() {
    Assert.prototype.Json = assert;
  });

  it('should throw an error if the input value is not valid JSON', function() {
    var choices = [[], '["foo":"bar"}'];

    choices.forEach(function(choice) {
      try {
        new Assert().Json().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `Json`', function() {
    try {
      new Assert().Json().validate([]);

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('JSON');
    }
  });

  it('should accept valid JSON strings', function() {
    [
      '"foo"',
      '10',
      '{"foo":"bar"}',
      123,
      Boolean(true),
      Number(10)
    ].forEach(function(choice) {
      new Assert().Json().validate(choice);
    });
  });
});
