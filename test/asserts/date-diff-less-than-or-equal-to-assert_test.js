
/**
 * Module dependencies.
 */

import DateDiffLessThanOrEqualToAssert from '../../src/asserts/date-diff-less-than-or-equal-to-assert';
import should from 'should';
import sinon from 'sinon';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `DateDiffLessThanOrEqualToAssert`.
 */

const Assert = BaseAssert.extend({
  DateDiffLessThanOrEqualTo: DateDiffLessThanOrEqualToAssert
});

/**
 * Test `DateDiffLessThanOrEqualToAssert`.
 */

describe('DateDiffLessThanOrEqualToAssert', () => {
  it('should throw an error if `threshold` is missing', () => {
    try {
      new Assert().DateDiffLessThanOrEqualTo();

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  it('should have a default option `absolute` of `false`', () => {
    const assert = new Assert().DateDiffLessThanOrEqualTo(1);

    assert.options.absolute.should.be.false();
  });

  it('should have a default option `asFloat` of `false`', () => {
    const assert = new Assert().DateDiffLessThanOrEqualTo(1);

    assert.options.asFloat.should.be.false();
  });

  it('should have a default option `fromDate` of `null`', () => {
    const assert = new Assert().DateDiffLessThanOrEqualTo(1);

    (assert.options.fromDate === null).should.be.true();
  });

  it('should have a default option `unit` of `milliseconds`', () => {
    const assert = new Assert().DateDiffLessThanOrEqualTo(1);

    assert.options.unit.should.equal('milliseconds');
  });

  it('should throw an error if the input value is not a date', () => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        new Assert().DateDiffLessThanOrEqualTo(10).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_date_or_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid date', () => {
    try {
      new Assert().DateDiffLessThanOrEqualTo(10).validate('2015-99-01');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('2015-99-01');
    }
  });

  it('should throw an error if the diff between `now` and input date is greater than the `threshold`', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-30'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the `absolute` diff between `now` and input date is greater than the `threshold`', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-03'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is greater than the `threshold`', () => {
    try {
      new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, { fromDate: new Date('1970-01-01') }).validate(new Date('1969-12-30'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }
  });

  it('should throw an error if the `absolute` diff between `fromDate` and input date is greater than the `threshold`', () => {
    try {
      new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, { absolute: true, fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-03'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }
  });

  it('should expose `assert` equal to `DateDiffLessThanOrEqualToAssert`', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-30'));

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('DateDiffLessThanOrEqualTo');
    }

    clock.restore();
  });

  it('should expose `absolute`, `asFloat`, `diff`, `fromDate`, `threshold` and `unit` on the violation', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-30'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.should.have.keys('absolute', 'asFloat', 'diff', 'fromDate', 'threshold', 'unit');
    }

    clock.restore();
  });

  it('should accept option `asFloat`', () => {
    const assert = new Assert().DateDiffLessThanOrEqualTo(0, { asFloat: true });

    assert.options.asFloat.should.be.true();
  });

  it('should accept option `fromDate`', () => {
    const assert = new Assert().DateDiffLessThanOrEqualTo(0, { fromDate: new Date('1970-01-01') });

    assert.options.fromDate.should.eql(new Date('1970-01-01'));
  });

  it('should accept option `unit`', () => {
    const assert = new Assert().DateDiffLessThanOrEqualTo(24, { unit: 'hours' });

    assert.options.unit.should.equal('hours');
  });

  it('should use the `asFloat` option supplied', () => {
    try {
      new Assert().DateDiffLessThanOrEqualTo(5, { asFloat: true, fromDate: new Date('1970-01-01 10:00:00'), unit: 'minutes' }).validate(new Date('1970-01-01 09:54:57'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.diff.should.equal(5.05);
    }
  });

  it('should use the `unit` option supplied', () => {
    new Assert().DateDiffLessThanOrEqualTo(2000, { fromDate: new Date('1970-01-01 10:00:00'), unit: 'seconds' }).validate(new Date('1970-01-01 09:55:55'));
  });

  it('should accept a date whose diff from `now` is equal to the threshold', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-31 00:00:00'));

    clock.restore();
  });

  it('should accept a date whose diff from `now` is less than the threshold', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-31 11:00:00'));

    clock.restore();
  });

  it('should accept a date whose `absolute` diff from `now` is equal to the threshold', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-02 00:00:00'));

    clock.restore();
  });

  it('should accept a date whose `absolute` diff from `now` is less than the threshold', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    new Assert().DateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-01 11:00:00'));

    clock.restore();
  });

  it('should accept a date whose diff from `fromDate` is equal to the threshold', () => {
    new Assert().DateDiffLessThanOrEqualTo(24, { asFloat: false, fromDate: new Date('1970-01-01 00:00:00'), unit: 'hours' }).validate(new Date('1969-12-31 00:00:00'));
  });

  it('should accept a date whose diff from `fromDate` is less than the threshold', () => {
    new Assert().DateDiffLessThanOrEqualTo(24, { asFloat: false, fromDate: new Date('1970-01-01 00:00:00'), unit: 'hours' }).validate(new Date('1969-12-31 11:00:00'));
  });

  it('should accept a date whose `absolute` diff from `fromDate` is equal to the threshold', () => {
    new Assert().DateDiffLessThanOrEqualTo(24, { absolute: true, asFloat: false, fromDate: new Date('1970-01-01 00:00:00'), unit: 'hours' }).validate(new Date('1970-01-02 00:00:00'));
  });

  it('should accept a date whose `absolute` diff from `fromDate` is less than the threshold', () => {
    new Assert().DateDiffLessThanOrEqualTo(24, { absolute: true, asFloat: false, fromDate: new Date('1970-01-01 00:00:00'), unit: 'hours' }).validate(new Date('1970-01-01 11:00:00'));
  });
});
