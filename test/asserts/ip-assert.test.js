'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const IpAssert = require('../../src/asserts/ip-assert');

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
  it('should throw an error if the input value is not a valid string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.ip().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if the ip is invalid', () => {
    try {
      Assert.ip().validate('FOO');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.value).toBe('FOO');
    }
  });

  it('should expose `assert` equal to `Ip`', () => {
    try {
      Assert.ip().validate(123);

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('Ip');
    }
  });

  it('should accept valid ips', () => {
    ['1.3.3.7', '::1'].forEach(choice => {
      Assert.ip().validate(choice);
    });
  });
});
