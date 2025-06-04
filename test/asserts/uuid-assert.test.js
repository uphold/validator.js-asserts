'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const UuidAssert = require('../../src/asserts/uuid-assert.js');

/**
 * Extend `Assert` with `UuidAssert`.
 */

const Assert = BaseAssert.extend({
  Uuid: UuidAssert
});

/**
 * Test `UuidAssert`.
 */

describe('UuidAssert', () => {
  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.uuid().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if the uuid `version` is specified but not supported', ({ assert }) => {
    const versions = [1, 2];

    versions.forEach(version => {
      try {
        Assert.uuid(version);

        assert.fail();
      } catch (e) {
        assert.equal(e.message, 'UUID version specified is not supported.');
      }
    });
  });

  it('should expose `assert` equal to `Uuid`', ({ assert }) => {
    try {
      Assert.uuid().validate('foo');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'Uuid');
    }
  });

  it('should expose `version` on the violation', ({ assert }) => {
    try {
      Assert.uuid(5).validate('foo');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().violation.version, 5);
    }
  });

  it('should accept a v3 uuid', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.uuid(3).validate('6fa459ea-ee8a-3ca4-894e-db77e160355e');
    });
  });

  it('should accept a v4 uuid', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.uuid(4).validate('17dd5a7a-637c-436e-bb8a-5398f7ac0a76');
    });
  });

  it('should accept a v5 uuid', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.uuid(5).validate('74738ff5-5367-5958-9aee-98fffdcd1876');
    });
  });
});
