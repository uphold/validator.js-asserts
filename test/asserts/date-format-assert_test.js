
/**
 * Module dependencies.
 */

import { Assert as BaseAssert, Violation } from 'validator.js';
import DateFormatAssert from '../../src/asserts/date-format-assert';
import should from 'should';

/**
 * Extend `Assert` with `DateFormatAssert`.
 */

const Assert = BaseAssert.extend({
  DateFormat: DateFormatAssert
});

/**
 * Test `DateFormatAssert`.
 */

describe('DateFormatAssert', () => {
  it('should throw an error if `format` is missing', () => {
    try {
      new Assert().DateFormat().validate();

      should.fail();
    } catch (e) {
      e.message.should.equal('Parameter `format` is required.');
    }
  });

  it('should throw an error if `value` is invalid', () => {
    try {
      new Assert().DateFormat('YYYYMMDD').validate({});

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('DateFormat');
    }
  });

  it('should throw an error if `value` is not correctly formatted', () => {
    try {
      new Assert().DateFormat('YYYYMMDD').validate('20003112');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('DateFormat');
    }
  });

  it('should throw an error if `value` does not pass strict validation', () => {
    try {
      new Assert().DateFormat('YYYYMMDD').validate('20001230 10:00');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('DateFormat');
    }
  });

  it('should accept a valid date', () => {
    new Assert().DateFormat('YYYYMMDDHHmmss').validate('20001231102814');
  });
});
