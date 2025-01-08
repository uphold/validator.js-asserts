'use strict';
/* eslint-disable new-cap */

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const EmailAssert = require('../../src/asserts/email-assert');

/**
 * Extend `Assert` with `EmailAssert`.
 *
 * TODO: This is not working since `Email` is already a common assert,
 * and the `extend` method does not override it with our assert.
 */

const Assert = BaseAssert.extend({
  Email: EmailAssert
});

/**
 * Test `EmailAssert`.
 */

describe('EmailAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.prototype.Email().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if email is a string but is out of boundaries', () => {
    try {
      Assert.prototype.Email().validate(`${'-'.repeat(248)}@bar.com`);

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `Email`', () => {
    try {
      Assert.prototype.Email().validate('foo');

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('Email');
    }
  });

  it('should throw an error on invalid emails', () => {
    ['foo@.com', 'føø@båz.', 'foo+bar@baz_foo.com'].forEach(choice => {
      try {
        Assert.prototype.Email().validate(choice);

        fail();
      } catch (e) {
        expect(e.show().assert).toBe('Email');
      }
    });
  });

  it('should accept valid emails', () => {
    [
      'foo@bar.com',
      'foo@bar.com.123.deleted',
      'føø@båz.com',
      'føø@båz.com.123.deleted',
      'foo+.@baz.com.123.deleted',
      'foo+bar@com.12345.deleted',
      'foo+bar@baz.com',
      'foo+bar@baz.com.12345.deleted'
    ].forEach(choice => {
      Assert.prototype.Email().validate(choice);
    });
  });
});
