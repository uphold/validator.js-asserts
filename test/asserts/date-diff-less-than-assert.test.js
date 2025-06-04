'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const DateDiffLessThanAssert = require('../../src/asserts/date-diff-less-than-assert.js');

/**
 * Extend `Assert` with `DateDiffLessThanAssert`.
 */

const Assert = BaseAssert.extend({
  DateDiffLessThan: DateDiffLessThanAssert
});

/**
 * Test `DateDiffLessThanAssert`.
 */

describe('DateDiffLessThanAssert', () => {
  it('should throw an error if `threshold` is missing', ({ assert }) => {
    try {
      Assert.dateDiffLessThan();

      assert.fail();
    } catch (e) {
      assert.equal(e.message, 'A threshold value is required.');
    }
  });

  it('should have a default option `absolute` of `false`', ({ assert }) => {
    const assertInstance = Assert.dateDiffLessThan(1);

    assert.equal(assertInstance.options.absolute, false);
  });

  it('should have a default option `asFloat` of `false`', ({ assert }) => {
    const assertInstance = Assert.dateDiffLessThan(1);

    assert.equal(assertInstance.options.asFloat, false);
  });

  it('should have a default option `fromDate` of `null`', ({ assert }) => {
    const assertInstance = Assert.dateDiffLessThan(1);

    assert.ok(assertInstance.options.fromDate === null);
  });

  it('should have a default option `unit` of `milliseconds`', ({ assert }) => {
    const assertInstance = Assert.dateDiffLessThan(1);

    assert.equal(assertInstance.options.unit, 'milliseconds');
  });

  it('should throw an error if the input value is not a date', ({ assert }) => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        Assert.dateDiffLessThan(10).validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_date_or_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid date', ({ assert }) => {
    try {
      Assert.dateDiffLessThan(10).validate('2015-99-01');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().value, '2015-99-01');
    }
  });

  it('should throw an error if the diff between `now` and input date is equal to `threshold`', ({ assert, mock }) => {
    mock.timers.enable({ apis: ['Date'], now: 0 });

    try {
      Assert.dateDiffLessThan(0).validate(new Date('1970-01-01'));

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().violation.threshold, e.show().violation.diff);
    }

    mock.timers.reset();
  });

  it('should throw an error if the `absolute` diff between `now` and input date is equal to `threshold`', ({
    assert,
    mock
  }) => {
    mock.timers.enable({ apis: ['Date'], now: 0 });

    try {
      Assert.dateDiffLessThan(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-02'));

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().violation.threshold, e.show().violation.diff);
    }

    mock.timers.reset();
  });

  it('should throw an error if the diff between `fromDate` and input date is equal to `threshold`', ({ assert }) => {
    try {
      Assert.dateDiffLessThan(0, { fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-01'));

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().violation.threshold, e.show().violation.diff);
    }
  });

  it('should throw an error if the `absolute` diff between `fromDate` and input date is equal to `threshold`', ({
    assert
  }) => {
    try {
      Assert.dateDiffLessThan(24 * 60 * 60 * 1000, { absolute: true, fromDate: new Date('1970-01-01') }).validate(
        new Date('1970-01-02')
      );

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().violation.threshold, e.show().violation.diff);
    }
  });

  it('should throw an error if the diff between `now` and input date is greater than the `threshold`', ({
    assert,
    mock
  }) => {
    mock.timers.enable({ apis: ['Date'], now: 0 });

    try {
      Assert.dateDiffLessThan(24 * 60 * 60 * 1000).validate(new Date('1969-12-30'));

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.notEqual(e.show().violation.threshold, e.show().violation.diff);
    }

    mock.timers.reset();
  });

  it('should throw an error if the `absolute` diff between `now` and input date is greater than the `threshold`', ({
    assert,
    mock
  }) => {
    mock.timers.enable({ apis: ['Date'], now: 0 });

    try {
      Assert.dateDiffLessThan(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-03'));

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.notEqual(e.show().violation.threshold, e.show().violation.diff);
    }

    mock.timers.reset();
  });

  it('should throw an error if the diff between `fromDate` and input date is greater than the `threshold`', ({
    assert
  }) => {
    try {
      Assert.dateDiffLessThan(24 * 60 * 60 * 1000, { fromDate: new Date('1970-01-01') }).validate(
        new Date('1969-12-30')
      );

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.notEqual(e.show().violation.threshold, e.show().violation.diff);
    }
  });

  it('should throw an error if the `absolute` diff between `fromDate` and input date is greater than the `threshold`', ({
    assert
  }) => {
    try {
      Assert.dateDiffLessThan(24 * 60 * 60 * 1000, { absolute: true, fromDate: new Date('1970-01-01') }).validate(
        new Date('1970-01-03')
      );

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.notEqual(e.show().violation.threshold, e.show().violation.diff);
    }
  });

  it('should expose `assert` equal to `DateDiffLessThanAssert`', ({ assert, mock }) => {
    mock.timers.enable({ apis: ['Date'], now: 0 });

    try {
      Assert.dateDiffLessThan(24 * 60 * 60 * 1000).validate(new Date('1969-12-31'));

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'DateDiffLessThan');
    }

    mock.timers.reset();
  });

  it('should expose `absolute`, `asFloat`, `diff`, `fromDate`, `threshold` and `unit` on the violation', ({
    assert,
    mock
  }) => {
    mock.timers.enable({ apis: ['Date'], now: 0 });

    try {
      Assert.dateDiffLessThan(24 * 60 * 60 * 1000).validate(new Date('1969-12-31'));

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.deepEqual(Object.keys(e.show().violation), [
        'absolute',
        'asFloat',
        'diff',
        'fromDate',
        'threshold',
        'unit'
      ]);
    }

    mock.timers.reset();
  });

  it('should accept option `asFloat`', ({ assert }) => {
    const assertInstance = Assert.dateDiffLessThan(0, { asFloat: true });

    assert.equal(assertInstance.options.asFloat, true);
  });

  it('should accept option `fromDate`', ({ assert }) => {
    const assertInstance = Assert.dateDiffLessThan(0, { fromDate: new Date('1970-01-01') });

    assert.deepEqual(assertInstance.options.fromDate, new Date('1970-01-01'));
  });

  it('should accept option `unit`', ({ assert }) => {
    const assertInstance = Assert.dateDiffLessThan(24, { unit: 'hours' });

    assert.equal(assertInstance.options.unit, 'hours');
  });

  it('should use the `asFloat` option supplied', ({ assert }) => {
    try {
      Assert.dateDiffLessThan(5, {
        asFloat: true,
        fromDate: new Date('1970-01-01 10:00:00Z'),
        unit: 'minutes'
      }).validate(new Date('1970-01-01 09:54:57Z'));

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().violation.diff, 5.05);
    }
  });

  it('should use the `unit` option supplied', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.dateDiffLessThan(2000, { fromDate: new Date('1970-01-01 10:00:00Z'), unit: 'seconds' }).validate(
        new Date('1970-01-01 09:55:55Z')
      );
    });
  });

  it('should accept a date whose diff from `now` is less than the threshold', ({ assert, mock }) => {
    mock.timers.enable({ apis: ['Date'], now: 0 });

    assert.doesNotThrow(() => {
      Assert.dateDiffLessThan(24 * 60 * 60 * 1000).validate(new Date('1969-12-31 11:00:00Z'));
    });

    mock.timers.reset();
  });

  it('should accept a date whose diff from `fromDate` is less than the threshold', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.dateDiffLessThan(24, {
        asFloat: false,
        fromDate: new Date('1970-01-01 09:00:00Z'),
        unit: 'hours'
      }).validate(new Date('1970-01-01'));
    });
  });
});
