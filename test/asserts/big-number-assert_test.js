
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/big-number-assert');
var should = require('should');

/**
 * Test `BigNumberAssert`.
 */

describe('BigNumberAssert', function() {
  before(function() {
    Assert.prototype.BigNumber = assert;
  });

  it('should throw an error if the input value is not a big number', function() {
    var choices = [[], {}, ''];

    choices.forEach(function(choice) {
      try {
        new Assert().BigNumber().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `BigNumber`', function() {
    try {
      new Assert().BigNumber().validate();

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('BigNumber');
    }
  });

  it('should accept a big number', function() {
    new Assert().BigNumber().validate(1.01);
  });
});
