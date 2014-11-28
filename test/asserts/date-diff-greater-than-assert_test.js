
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/date-diff-greater-than-assert');
var sinon = require('sinon');
var should = require('should');

/**
 * Test `DateDiffGreaterThanAssert`.
 */

describe('DateDiffGreaterThanAssert', function() {
  before(function() {
    Assert.prototype.DateDiffGreaterThanAssert = assert;
  });

  it('should throw an error if `threshold` is missing', function() {
    try {
      new Assert().DateDiffGreaterThanAssert();

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  it('should have a default option `unit` of `milliseconds`', function() {
    var assert = new Assert().DateDiffGreaterThanAssert(1);

    assert.options.unit.should.equal('milliseconds');
  });

  it('should have a default option `asFloat` of `false`', function() {
    var assert = new Assert().DateDiffGreaterThanAssert(1);

    assert.options.asFloat.should.be.false;
  });

  it('should have a default option `fromDate` of `null`', function() {
    var assert = new Assert().DateDiffGreaterThanAssert(1);

    (null === assert.options.fromDate).should.be.true;
  });

  it('should throw an error if the input value is not a date', function() {
    var choices = [[], {}, ''];

    choices.forEach(function(choice) {
      try {
        new Assert().DateDiffGreaterThanAssert(10).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
      }
    });
  });

  it('should throw an error if the diff between `now` and input date is equal to `threshold`', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffGreaterThanAssert(0).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is equal to `threshold`', function() {
    try {
      new Assert().DateDiffGreaterThanAssert(0, { fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }
  });

  it('should throw an error if the diff between `now` and input date is less than the `threshold`', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffGreaterThanAssert(24 * 60 * 60 * 1000).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is less than the `threshold`', function() {
    try {
      new Assert().DateDiffGreaterThanAssert(24 * 60 * 60 * 1000, { fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }
  });

  it('should expose `assert` equal to `DateDiffGreaterThanAssert`', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffGreaterThanAssert(24 * 60 * 60 * 1000).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('DateDiffGreaterThan');
    }

    clock.restore();
  });

  it('should expose `threshold`, `unit`, `asFloat`, `fromDate` and `diff` on the violation', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffGreaterThanAssert(24 * 60 * 60 * 1000).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.should.have.keys('threshold', 'unit', 'asFloat', 'fromDate', 'diff');
    }

    clock.restore();
  });

  it('should accept option `unit`', function() {
    var assert = new Assert().DateDiffGreaterThanAssert(24, { unit: 'hours' });

    assert.options.unit.should.equal('hours');
  });

  it('should accept option `asFloat`', function() {
    var assert = new Assert().DateDiffGreaterThanAssert(0, { asFloat: true });

    assert.options.asFloat.should.be.true;
  });

  it('should accept option `fromDate`', function() {
    var assert = new Assert().DateDiffGreaterThanAssert(0, { fromDate: new Date('1970-01-01') });

    assert.options.fromDate.should.eql(new Date('1970-01-01'));
  });

  it('should use the `unit` option supplied', function() {
    try {
      new Assert().DateDiffGreaterThanAssert(2000, { unit: 'seconds', fromDate: new Date('1970-01-01 10:00:00') }).validate(new Date('1970-01-01 10:00:05'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should use the `asFloat` option supplied', function() {
    try {
      new Assert().DateDiffGreaterThanAssert(5, { unit: 'minutes', asFloat: true, fromDate: new Date('1970-01-01 10:00:00') }).validate(new Date('1970-01-01 10:04:51'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.diff.should.equal(-4.85);
    }
  });

  it('should accept a date whose diff from `fromDate` is greater than the threshold', function() {
    new Assert().DateDiffGreaterThanAssert(24, { unit: 'hours', asFloat: false, fromDate: new Date('1970-01-01 00:00:00') }).validate(new Date('1969-12-30 00:00:00'));
  });

  it('should accept a date whose diff from `now` is greater than the threshold', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    new Assert().DateDiffGreaterThanAssert(24 * 60 * 60 * 1000).validate(new Date('1969-12-30 00:00:00'));

    clock.restore();
  });
});
