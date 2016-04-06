
/**
 * Module dependencies.
 */

import PhoneAssert from '../../src/asserts/phone-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `Phone`.
 */

const Assert = BaseAssert.extend({
  Phone: PhoneAssert
});

/**
 * Test `Phone`.
 */

describe('Phone', () => {
  it('should throw an error if the input value is not a string', () => {
    [{}, [], 123].forEach(choice => {
      try {
        new Assert().Phone({ countryCode: 'US' }).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the phone is not valid', () => {
    try {
      new Assert().Phone().validate('+35191234567890');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('Phone');
    }
  });

  it('should throw an error if the phone does not belong to the given country', () => {
    try {
      new Assert().Phone({ countryCode: 'US' }).validate('912345578');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('Phone');
    }
  });

  it('should accept a valid phone in the e164 format', () => {
    new Assert().Phone().validate('+1 415 555 2671');
  });

  it('should accept a phone in the e164 format that belongs to the given country', () => {
    new Assert().Phone({ countryCode: 'US' }).validate('+1 415 555 2671');
  });

  it('should accept a phone in the national format that belongs to the given country', () => {
    new Assert().Phone({ countryCode: 'US' }).validate('415 555 2671');
  });
});
