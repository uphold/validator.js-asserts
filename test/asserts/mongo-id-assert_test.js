
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/mongo-id-assert');
var objectid = require('objectid');
var should = require('should');

/**
 * Test `MongoIdAssert`.
 */

describe('MongoIdAssert', function() {
  before(function() {
    Assert.prototype.MongoId = assert;
  });

  it('should throw an error if the input value is not a valid MongoDB id', function() {
    /*jshint -W009 */
    var choices = [[], 123, new Array(), 'foobar', {}, { id: 'bar' }];
    /*jshint +W009 */

    choices.forEach(function(choice) {
      try {
        new Assert().MongoId().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `MongoId`', function() {
    try {
      new Assert().MongoId().validate('FOO');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('MongoId');
    }
  });

  it('should accept a valid MongoDB id object', function() {
    new Assert().MongoId().validate(objectid());
  });
});
