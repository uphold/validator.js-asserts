
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/plain-object-assert');
var should = require('should');

/**
 * Test `PlainObjectAssert`.
 */

describe('PlainObjectAssert', function() {
  before(function() {
    Assert.prototype.PlainObject = assert;
  });

  it('should throw an error if the input value is not a plain object', function() {
    /*jshint -W009 */
    var choices = [[], 123, new Array()];
    /*jshint +W009 */

    choices.forEach(function(choice) {
      try {
        new Assert().PlainObject().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `PlainObject`', function() {
    try {
      new Assert().PlainObject().validate('FOO');

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('PlainObject');
    }
  });

  it('should accept a plain object', function() {
    new Assert().PlainObject().validate({ foo: 'bar' });
  });
});
