
/**
 * Module dependencies.
 */

import DateDiffGreaterThanAssert from '../../src/asserts/date-diff-greater-than-assert';
import should from 'should';
import sinon from 'sinon';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `DateDiffGreaterThanAssert`.
 */

const Assert = BaseAssert.extend({
  DateDiffGreaterThan: DateDiffGreaterThanAssert
});

/**
 * Test `DateDiffGreaterThanAssert`.
 */

describe('DateDiffGreaterThanAssert', () => {
  it('should throw an error if `threshold` is missing', () => {
    try {
      new Assert().DateDiffGreaterThan();

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  it('should have a default option `absolute` of `false`', () => {
    const assert = new Assert().DateDiffGreaterThan(1);

    assert.options.absolute.should.be.false();
  });

  it('should have a default option `asFloat` of `false`', () => {
    const assert = new Assert().DateDiffGreaterThan(1);

    assert.options.asFloat.should.be.false();
  });

  it('should have a default option `fromDate` of `null`', () => {
    const assert = new Assert().DateDiffGreaterThan(1);

    (assert.options.fromDate === null).should.be.true();
  });

  it('should have a default option `unit` of `milliseconds`', () => {
    const assert = new Assert().DateDiffGreaterThan(1);

    assert.options.unit.should.equal('milliseconds');
  });

  it('should throw an error if the input value is not a date', () => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        new Assert().DateDiffGreaterThan(10).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_date_or_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid date', () => {
    try {
      new Assert().DateDiffGreaterThan(10).validate('2015-99-01');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('2015-99-01');
    }
  });

  it('should throw an error if the diff between `now` and input date is equal to `threshold`', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffGreaterThan(0).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the `absolute` diff between `now` and input date is equal to `threshold`', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffGreaterThan(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-02'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is equal to `threshold`', () => {
    try {
      new Assert().DateDiffGreaterThan(0, { fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }
  });

  it('should throw an error if the `absolute` diff between `fromDate` and input date is equal to `threshold`', () => {
    try {
      new Assert().DateDiffGreaterThan(24 * 60 * 60 * 1000, { absolute: true, fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-02'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.equal(e.show().violation.diff);
    }
  });

  it('should throw an error if the diff between `now` and input date is less than the `threshold`', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffGreaterThan(24 * 60 * 60 * 1000).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is less than the `threshold`', () => {
    try {
      new Assert().DateDiffGreaterThan(24 * 60 * 60 * 1000, { fromDate: new Date('1970-01-01 00:00:00') }).validate(new Date('1970-01-01 10:00:00'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.threshold.should.not.equal(e.show().violation.diff);
    }
  });

  it('should expose `assert` equal to `DateDiffGreaterThanAssert`', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffGreaterThan(24 * 60 * 60 * 1000).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('DateDiffGreaterThan');
    }

    clock.restore();
  });

  it('should expose `absolute`, `asFloat`, `diff`, `fromDate`, `threshold` and `unit` on the violation', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    try {
      new Assert().DateDiffGreaterThan(24 * 60 * 60 * 1000).validate(new Date('1970-01-01'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.should.have.keys('absolute', 'asFloat', 'diff', 'fromDate', 'threshold', 'unit');
    }

    clock.restore();
  });

  it('should accept option `asFloat`', () => {
    const assert = new Assert().DateDiffGreaterThan(0, { asFloat: true });

    assert.options.asFloat.should.be.true();
  });

  it('should accept option `fromDate`', () => {
    const assert = new Assert().DateDiffGreaterThan(0, { fromDate: new Date('1970-01-01') });

    assert.options.fromDate.should.eql(new Date('1970-01-01'));
  });

  it('should accept option `unit`', () => {
    const assert = new Assert().DateDiffGreaterThan(24, { unit: 'hours' });

    assert.options.unit.should.equal('hours');
  });

  it('should use the `asFloat` option supplied', () => {
    try {
      new Assert().DateDiffGreaterThan(5, { asFloat: true, fromDate: new Date('1970-01-01 10:00:00'), unit: 'minutes' }).validate(new Date('1970-01-01 10:04:51'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.diff.should.equal(-4.85);
    }
  });

  it('should use the `unit` option supplied', () => {
    try {
      new Assert().DateDiffGreaterThan(2000, { fromDate: new Date('1970-01-01 10:00:00'), unit: 'seconds' }).validate(new Date('1970-01-01 10:00:05'));

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should accept a date whose diff from `now` is greater than the threshold', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    new Assert().DateDiffGreaterThan(24 * 60 * 60 * 1000).validate(new Date('1969-12-30 00:00:00'));

    clock.restore();
  });

  it('should accept a date whose `absolute` diff from `now` is greater than the threshold', () => {
    const clock = sinon.useFakeTimers(0, 'Date');

    new Assert().DateDiffGreaterThan(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-03 00:00:00'));

    clock.restore();
  });

  it('should accept a date whose diff from `fromDate` is greater than the threshold', () => {
    new Assert().DateDiffGreaterThan(24, { asFloat: false, fromDate: new Date('1970-01-01 00:00:00'), unit: 'hours' }).validate(new Date('1969-12-30 00:00:00'));
  });

  it('should accept a date whose `absolute` diff from `fromDate` is greater than the threshold', () => {
    new Assert().DateDiffGreaterThan(24, { absolute: true, asFloat: false, fromDate: new Date('1969-12-30 00:00:00'), unit: 'hours' }).validate(new Date('1970-01-01 00:00:00'));
  });
});
