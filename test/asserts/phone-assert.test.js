'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const PhoneAssert = require('../../src/asserts/phone-assert.js');

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
  it('should throw an error if the input value is not a string', ({ assert }) => {
    [{}, [], 123].forEach(choice => {
      try {
        Assert.phone({ countryCode: 'US' }).validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, 'must_be_a_string');
      }
    });
  });

  it('should throw an error if the phone is not valid', ({ assert }) => {
    try {
      Assert.phone().validate('+35191234567890');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'Phone');
    }
  });

  it('should throw an error if the phone does not belong to the given country', ({ assert }) => {
    try {
      Assert.phone({ countryCode: 'US' }).validate('912345578');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.show().assert, 'Phone');
    }
  });

  it('should accept a valid phone in the e164 format', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.phone().validate('+1 415 555 2671');
    });
  });

  it('should accept a phone in the e164 format that belongs to the given country', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.phone({ countryCode: 'US' }).validate('+1 415 555 2671');
    });
  });

  it('should accept a phone in the national format that belongs to the given country', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.phone({ countryCode: 'US' }).validate('415 555 2671');
    });
  });
});
