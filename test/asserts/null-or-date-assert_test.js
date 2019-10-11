'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const NullOrDateAssert = require('../../src/asserts/null-or-date-assert');
const should = require('should');

/**
 * Extend `Assert` with `NullOrDateAssert`.
 */

const Assert = BaseAssert.extend({
  NullOrDate: NullOrDateAssert
});

/**
 * Test `NullOrDateAssert`.
 */

describe('NullOrDateAssert', () => {
  it('should throw an error if the input value is not a `null` or a date', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.nullOrDate().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_null_or_a_date');
      }
    });
  });

  it('should throw an error if the input value is not a valid date', () => {
    try {
      Assert.nullOrDate().validate('2015-99-01');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('2015-99-01');
    }
  });

  it('should expose `assert` equal to `NullOrDate`', () => {
    try {
      Assert.nullOrDate().validate({});

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('NullOrDate');
    }
  });

  it('should accept `null`', () => {
    Assert.nullOrDate().validate(null);
  });

  it('should accept a date', () => {
    Assert.nullOrDate().validate(new Date());
  });

  it('should accept a string', () => {
    Assert.nullOrDate().validate('2014-10-16');
  });
});
