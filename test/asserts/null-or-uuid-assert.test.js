'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const NullOrUuidAssert = require('../../src/asserts/null-or-uuid-assert');

/**
 * Extend `Assert` with `NullOrUuidAssert`.
 */

const Assert = BaseAssert.extend({
  NullOrUuid: NullOrUuidAssert
});

/**
 * Test `NullOrUuidAssert`.
 */

describe('NullOrUuidAssert', () => {
  it('should throw an error if the input value is not a `null` or a string', () => {
    const choices = [[], {}, 123, new Boolean(true)]; // eslint-disable-line no-new-wrappers

    choices.forEach(choice => {
      try {
        Assert.nullOrUuid().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_null_or_an_uuid');
      }
    });
  });

  it('should expose `assert` equal to `NullOrUuid`', () => {
    try {
      Assert.nullOrUuid().validate({});

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('NullOrUuid');
    }
  });

  it('should expose `version` on the violation', () => {
    try {
      Assert.nullOrUuid(3).validate('d1885a73-9437-5fde-97e0-8074dc5b6c88');

      fail();
    } catch (e) {
      expect(e.show().violation.version).toBe(3);
    }
  });

  it('should accept `null`', () => {
    Assert.nullOrUuid().validate(null);
  });

  it('should accept a v3 uuid value', () => {
    Assert.nullOrUuid(3).validate('6fa459ea-ee8a-3ca4-894e-db77e160355e');
  });

  it('should accept a v4 uuid value', () => {
    Assert.nullOrUuid(4).validate('340b4140-5439-4fef-b45e-dc4ea23d1b2a');
  });

  it('should accept a v5 uuid value', () => {
    Assert.nullOrUuid(5).validate('d1885a73-9437-5fde-97e0-8074dc5b6c88');
  });
});
