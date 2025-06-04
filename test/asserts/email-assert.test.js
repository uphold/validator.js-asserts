'use strict';
/* eslint-disable new-cap */

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const EmailAssert = require('../../src/asserts/email-assert.js');

/**
 * Extend `Assert` with `EmailAssert`.
 *
 * TODO: This is not working since `Email` is already a common assert,
 * and the `extend` method does not override it with our assertInstance.
 */

const Assert = BaseAssert.extend({
  Email: EmailAssert
});

/**
 * Test `EmailAssert`.
 */

describe('EmailAssert', () => {
  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.prototype.Email().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if email is a string but is out of boundaries', ({ assert }) => {
    try {
      Assert.prototype.Email().validate(`${'-'.repeat(248)}@bar.com`);

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
    }
  });

  it('should expose `assert` equal to `Email`', ({ assert }) => {
    try {
      Assert.prototype.Email().validate('foo');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'Email');
    }
  });

  it('should throw an error on invalid emails', ({ assert }) => {
    ['foo@.com', 'føø@båz.', 'foo+bar@baz_foo.com'].forEach(choice => {
      try {
        Assert.prototype.Email().validate(choice);

        assert.fail();
      } catch (e) {
        assert.equal(e.show().assert, 'Email');
      }
    });
  });

  it('should accept valid emails', ({ assert }) => {
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
      assert.doesNotThrow(() => {
        Assert.prototype.Email().validate(choice);
      });
    });
  });
});
