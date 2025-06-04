'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const IpAssert = require('../../src/asserts/ip-assert.js');

/**
 * Extend `Assert` with `IpAssert`.
 */

const Assert = BaseAssert.extend({
  Ip: IpAssert
});

/**
 * Test `IpAssert`.
 */

describe('IpAssert', () => {
  it('should throw an error if the input value is not a valid string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.ip().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if the ip is invalid', ({ assert }) => {
    try {
      Assert.ip().validate('FOO');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
      assert.equal(e.value, 'FOO');
    }
  });

  it('should expose `assert` equal to `Ip`', ({ assert }) => {
    try {
      Assert.ip().validate(123);

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'Ip');
    }
  });

  it('should accept valid ips', ({ assert }) => {
    ['1.3.3.7', '::1'].forEach(choice => {
      assert.doesNotThrow(() => {
        Assert.ip().validate(choice);
      });
    });
  });
});
