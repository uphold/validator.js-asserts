'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const UsZipCodeAssert = require('../../src/asserts/us-zip-code-assert.js');

/**
 * Extend `Assert` with `UsZipCodeAssert`.
 */

const Assert = BaseAssert.extend({
  UsZipCode: UsZipCodeAssert
});

/**
 * Test `UsZipCodeAssert`.
 */

describe('UsZipCodeAssert', () => {
  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.usZipCode().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if `value` is invalid', ({ assert }) => {
    const choices = ['#', '12345--1234', '12345\t1234', '1234-12345', '1234'];

    choices.forEach(choice => {
      try {
        Assert.usZipCode().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.show().assert, 'UsZipCode');
      }
    });
  });

  it('should accept 5-digit zip codes', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.usZipCode().validate('12345');
    });
  });

  it('should accept 9-digit zip codes', ({ assert }) => {
    ['12345-1234', '12345 1234', '123456789'].forEach(choice => {
      assert.doesNotThrow(() => {
        Assert.usZipCode().validate(choice);
      });
    });
  });
});
