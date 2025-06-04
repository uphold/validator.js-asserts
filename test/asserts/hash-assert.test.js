'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const HashAssert = require('../../src/asserts/hash-assert.js');

/**
 * Extend `Assert` with `HashAssert`.
 */

const Assert = BaseAssert.extend({
  Hash: HashAssert
});

/**
 * Test `HashAssert`.
 */

describe('HashAssert', () => {
  it('should throw an error if the hash algorithm is missing', ({ assert }) => {
    try {
      Assert.hash();

      assert.fail();
    } catch (e) {
      assert.equal(e.message, 'An algorithm is required.');
    }
  });

  it('should throw an error if the hash algorithm is not supported', ({ assert }) => {
    const algorithms = ['md5', 'sha384'];

    algorithms.forEach(algorithm => {
      try {
        Assert.hash(algorithm);

        assert.fail();
      } catch (e) {
        assert.equal(e.message, 'The algorithm specified is not supported.');
      }
    });
  });

  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.hash('sha512').validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should expose `assert` equal to `Hash`', ({ assert }) => {
    try {
      Assert.hash('sha1').validate(123);

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'Hash');
    }
  });

  it('should expose `algorithm` on the violation', ({ assert }) => {
    try {
      Assert.hash('sha1').validate('foo');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().violation.algorithm, 'sha1');
    }
  });

  it('should accept a `sha1` hash', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.hash('sha1').validate('0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33');
    });
  });

  it('should accept a `sha256` hash', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.hash('sha256').validate('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
    });
  });

  it('should accept a `sha512` hash', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.hash('sha512').validate(
        'f7fbba6e0636f890e56fbbf3283e524c6fa3204ae298382d624741d0dc6638326e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7'
      );
    });
  });
});
