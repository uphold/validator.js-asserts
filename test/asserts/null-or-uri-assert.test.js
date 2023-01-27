'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const NullOrUriAssert = require('../../src/asserts/null-or-uri-assert');

/**
 * Extend `Assert` with `NullOrUriAssert`.
 */

const Assert = BaseAssert.extend({
  NullOrUri: NullOrUriAssert
});

/**
 * Test `NullOrUriAssert`.
 */

describe('NullOrUriAssert', () => {
  it('should throw an error if the input value is not a `null` or a uri', () => {
    const choices = [[], {}, 'foo', 123];

    choices.forEach(choice => {
      try {
        Assert.nullOrUri().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
      }
    });
  });

  it('should expose `assert` equal to `NullOrUri`', () => {
    try {
      Assert.nullOrUri().validate({});

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('NullOrUri');
    }
  });

  it('should pass the original URI assertion constraints through to the assertion', () => {
    try {
      Assert.nullOrUri({ is: 'domain', protocol: 'https' }).validate(`http://0.0.0.0/`);

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.violation.constraints).toEqual({ is: 'domain', protocol: 'https' });
    }
  });

  it('should accept `null`', () => {
    Assert.nullOrUri().validate(null);
  });

  it('should accept a uri', () => {
    Assert.nullOrUri().validate('https://foo.bar/baz');
  });
});
