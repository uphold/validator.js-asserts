
/**
 * Module dependencies.
 */

import NullOrDateAssert from '../../src/asserts/null-or-date-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

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
        new Assert().NullOrDate().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_null_or_a_date');
      }
    });
  });

  it('should throw an error if an invalid format is given', () => {
    const formats = [[], {}, 123];

    formats.forEach(format => {
      try {
        new Assert().NullOrDate({ format }).validate();

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Error);
        e.message.should.equal(`Unsupported format ${format} given`);
      }
    });
  });

  it('should throw an error if value is not correctly formatted', () => {
    try {
      new Assert().NullOrDate({ format: 'YYYY-MM-DD' }).validate('20003112');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('NullOrDate');
    }
  });

  it('should throw an error if value does not pass strict validation', () => {
    try {
      new Assert().NullOrDate({ format: 'YYYY-MM-DD' }).validate('2000.12.30');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('NullOrDate');
    }
  });

  it('should expose `assert` equal to `NullOrDate`', () => {
    try {
      new Assert().NullOrDate().validate({});

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('NullOrDate');
    }
  });

  it('should accept `null`', () => {
    new Assert().NullOrDate().validate(null);
  });

  it('should accept a date', () => {
    new Assert().NullOrDate().validate(new Date());
  });

  it('should accept a correctly formatted date', () => {
    new Assert().NullOrDate({ format: 'MM/YYYY' }).validate('12/2000');
  });

  it('should accept a string', () => {
    new Assert().NullOrDate().validate('2014-10-16');
  });
});
