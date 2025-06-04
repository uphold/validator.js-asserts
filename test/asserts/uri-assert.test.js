'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const { describe, it } = require('node:test');
const UriAssert = require('../../src/asserts/uri-assert.js');

/**
 * Extend `Assert` with `UriAssert`.
 */

const Assert = BaseAssert.extend({
  Uri: UriAssert
});

/**
 * Test `UriAssert`.
 */

describe('UriAssert', () => {
  it('should throw an error if the constraint is invalid', ({ assert }) => {
    try {
      Assert.uri({ foo: 'bar' });

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Error);
      assert.equal(e.message, 'Invalid constraint "foo=bar"');
    }
  });

  it('should throw an error if the input value is not a string', ({ assert }) => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.uri().validate(choice);

        assert.fail();
      } catch (e) {
        assert.ok(e instanceof Violation);
        assert.equal(e.violation.value, Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if the uri does not contain a `hostname`', ({ assert }) => {
    try {
      Assert.uri().validate(`foo-${'-'.repeat(246)}-bar`);

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
    }
  });

  it('should throw an error if the uri does not contain a `protocol`', ({ assert }) => {
    try {
      Assert.uri().validate('foobar.com');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
    }
  });

  it('should throw an error if the uri does not match the constraints', ({ assert }) => {
    try {
      Assert.uri({ protocol: 'http' }).validate(`https://${'-'.repeat(246)}@bar.com`);

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
    }
  });

  it('should throw an error if the uri does not match the `is` constraint', ({ assert }) => {
    try {
      Assert.uri({ is: 'ip' }).validate('https://foobar.com');

      assert.fail();
    } catch (e) {
      assert.ok(e instanceof Violation);
    }
  });

  it('should expose `constraints` on the violation', ({ assert }) => {
    try {
      Assert.uri({ protocol: 'http' }).validate('https://foobar.com');

      assert.fail();
    } catch (e) {
      assert.deepEqual(e.show().violation.constraints, { protocol: 'http' });
    }
  });

  it('should expose `assert` equal to `Uri`', ({ assert }) => {
    try {
      Assert.uri().validate('foo');

      assert.fail();
    } catch (e) {
      assert.equal(e.show().assert, 'Uri');
    }
  });

  it('should accept an uri that matches the constraints', ({ assert }) => {
    assert.doesNotThrow(() => {
      Assert.uri({ is: 'domain' }).validate('https://foobar.com');
      Assert.uri({ protocol: 'https' }).validate('https://foobar.com');
    });
  });

  it('should accept valid uris', ({ assert }) => {
    [
      'http://foobar.com',
      'http://føøbåz.com',
      'http://foobar.com',
      'https://foobar.com',
      'ftp://foobar.com',
      'biz://foobar.com'
    ].forEach(choice => {
      assert.doesNotThrow(() => {
        Assert.uri().validate(choice);
      });
    });
  });
});
