
/**
 * Module dependencies.
 */

var Assert = require('validator.js').Assert;
var Validator = require('validator.js').Validator;
var Violation = require('validator.js').Violation;
var assert = require('../../lib/asserts/date-diff-less-than-assert');
var sinon = require('sinon');
var should = require('should');

/**
 * Test `DateDiffLessThanAssert`.
 */

describe('DateDiffLessThanAssert', function() {
  before(function() {
    Assert.prototype.DateDiffLessThanAssert = assert;
  });

  it('should throw an error if `threshold` is missing', function() {
    try {
      new Assert().DateDiffLessThanAssert();

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  it('should have a default option `absolute` of `false`', function() {
    var assert = new Assert().DateDiffLessThanAssert(1);

    assert.options.absolute.should.be.false;
  });

  it('should have a default option `asFloat` of `false`', function() {
    var assert = new Assert().DateDiffLessThanAssert(1);

    assert.options.asFloat.should.be.false;
  });

  it('should have a default option `fromDate` of `null`', function() {
    var assert = new Assert().DateDiffLessThanAssert(1);

    (null === assert.options.fromDate).should.be.true;
  });

  it('should have a default option `unit` of `milliseconds`', function() {
    var assert = new Assert().DateDiffLessThanAssert(1);

    assert.options.unit.should.equal('milliseconds');
  });

  it('should throw an error if the input value is not a date', function() {
    var choices = [[], {}];

    choices.forEach(function(choice) {
      try {
        new Assert().DateDiffLessThanAssert(10).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        /* jshint camelcase: false */
        e.violation.value.should.equal(Validator.errorCode.must_be_a_date_or_a_string);
        /* jshint camelcase: true */
      }
    });
  });

  it('should throw an error if the diff between `now` and input date is equal to `threshold`', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanAssert(0).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the `absolute` diff between `now` and input date is equal to `threshold`', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanAssert(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-02'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is equal to `threshold`', function() {
    try {
      new Assert().DateDiffLessThanAssert(0, { fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }
  });

  it('should throw an error if the `absolute` diff between `fromDate` and input date is equal to `threshold`', function() {
    try {
      new Assert().DateDiffLessThanAssert(24 * 60 * 60 * 1000, { absolute: true, fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-02'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }
  });

  it('should throw an error if the diff between `now` and input date is greater than the `threshold`', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanAssert(24 * 60 * 60 * 1000).validate(new Date('1969-12-30'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the `absolute` diff between `now` and input date is greater than the `threshold`', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanAssert(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-03'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is greater than the `threshold`', function() {
    try {
      new Assert().DateDiffLessThanAssert(24 * 60 * 60 * 1000, { fromDate: new Date('1970-01-01') }).validate(new Date('1969-12-30'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }
  });

  it('should throw an error if the `absolute` diff between `fromDate` and input date is greater than the `threshold`', function() {
    try {
      new Assert().DateDiffLessThanAssert(24 * 60 * 60 * 1000, { absolute: true, fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-03'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }
  });

  it('should expose `assert` equal to `DateDiffLessThanAssert`', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanAssert(24 * 60 * 60 * 1000).validate(new Date('1969-12-31'));

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('DateDiffLessThan');
    }

    clock.restore();
  });

  it('should expose `absolute`, `asFloat`, `diff`, `fromDate`, `threshold` and `unit` on the violation', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanAssert(24 * 60 * 60 * 1000).validate(new Date('1969-12-31'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.should.have.keys('absolute', 'asFloat', 'diff', 'fromDate', 'threshold', 'unit');
    }

    clock.restore();
  });

  it('should accept option `asFloat`', function() {
    var assert = new Assert().DateDiffLessThanAssert(0, { asFloat: true });

    assert.options.asFloat.should.be.true;
  });

  it('should accept option `fromDate`', function() {
    var assert = new Assert().DateDiffLessThanAssert(0, { fromDate: new Date('1970-01-01') });

    assert.options.fromDate.should.eql(new Date('1970-01-01'));
  });

  it('should accept option `unit`', function() {
    var assert = new Assert().DateDiffLessThanAssert(24, { unit: 'hours' });

    assert.options.unit.should.equal('hours');
  });

  it('should use the `asFloat` option supplied', function() {
    try {
      new Assert().DateDiffLessThanAssert(5, { unit: 'minutes', asFloat: true, fromDate: new Date('1970-01-01 10:00:00') }).validate(new Date('1970-01-01 09:54:57'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.diff.should.equal(5.05);
    }
  });

  it('should use the `unit` option supplied', function() {
    new Assert().DateDiffLessThanAssert(2000, { unit: 'seconds', fromDate: new Date('1970-01-01 10:00:00') }).validate(new Date('1970-01-01 09:55:55'));
  });

  it('should accept a date whose diff from `now` is less than the threshold', function() {
    var clock = sinon.useFakeTimers(0, 'Date');

    new Assert().DateDiffLessThanAssert(24 * 60 * 60 * 1000).validate(new Date('1969-12-31 11:00:00'));

    clock.restore();
  });

  it('should accept a date whose diff from `fromDate` is less than the threshold', function() {
    new Assert().DateDiffLessThanAssert(24, { unit: 'hours', asFloat: false, fromDate: new Date('1970-01-01 09:00:00') }).validate(new Date('1970-01-01 00:00:00'));
  });
});
