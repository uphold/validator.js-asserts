
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var BigNumber = require('bignumber.js');
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/big-number-greater-than-assert');
var should = require('should');

/**
 * Test `BigNumberGreaterThanAssert`.
 */

describe('BigNumberGreaterThanAssert', function() {
  before(function() {
    Assert.prototype.BigNumberGreaterThan = assert;
  });

  it('should throw an error if `threshold` is missing', function() {
    try {
      new Assert().BigNumberGreaterThan();

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  it('should throw an error if `threshold` is not a number', function() {
    try {
      new Assert().BigNumberGreaterThan({});

      should.fail();
    } catch (e) {
      e.message.should.match(/not a number/);
    }
  });

  it('should throw an error if the input value is not a number', function() {
    var choices = [[], {}, ''];

    choices.forEach(function(choice) {
      try {
        new Assert().BigNumberGreaterThan(10).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should throw an error if the input number is equal to threshold', function() {
    try {
      new Assert().BigNumberGreaterThan(10).validate(10);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the input number is less than the threshold', function() {
    try {
      new Assert().BigNumberGreaterThan(10).validate(9.99999999);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `BigNumberGreaterThan`', function() {
    try {
      new Assert().BigNumberGreaterThan(1).validate(0.1);

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('BigNumberGreaterThan');
    }
  });

  it('should expose `message` on the violation if the input value is not a number', function() {
    try {
      new Assert().BigNumberGreaterThan(10).validate({});

      should.fail();
    } catch(e) {
      e.show().violation.message.should.match(/not a number/);
    }
  });

  it('should expose `threshold` on the violation', function() {
    try {
      new Assert().BigNumberGreaterThan(10).validate(0.1);

      should.fail();
    } catch(e) {
      e.show().violation.threshold.should.equal('10');
    }
  });

  it('should accept a big number as a `threshold` value', function() {
    new Assert().BigNumberGreaterThan(new BigNumber(10)).validate(10.00000001);
  });

  it('should accept a big number that is greater than threshold', function() {
    new Assert().BigNumberGreaterThan(10).validate(10.00000001);
  });
});
