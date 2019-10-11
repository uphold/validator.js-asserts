'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const UuidAssert = require('../../src/asserts/uuid-assert');
const should = require('should');

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
  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.uuid().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if the uuid `version` is specified but not supported', () => {
    const versions = [1, 2];

    versions.forEach(version => {
      try {
        Assert.uuid(version);

        should.fail();
      } catch (e) {
        e.message.should.equal('UUID version specified is not supported.');
      }
    });
  });

  it('should expose `assert` equal to `Uuid`', () => {
    try {
      Assert.uuid().validate('foo');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Uuid');
    }
  });

  it('should expose `version` on the violation', () => {
    try {
      Assert.uuid(5).validate('foo');

      should.fail();
    } catch (e) {
      e.show().violation.version.should.equal(5);
    }
  });

  it('should accept a v3 uuid', () => {
    Assert.uuid(3).validate('6fa459ea-ee8a-3ca4-894e-db77e160355e');
  });

  it('should accept a v4 uuid', () => {
    Assert.uuid(4).validate('17dd5a7a-637c-436e-bb8a-5398f7ac0a76');
  });

  it('should accept a v5 uuid', () => {
    Assert.uuid(5).validate('74738ff5-5367-5958-9aee-98fffdcd1876');
  });
});
