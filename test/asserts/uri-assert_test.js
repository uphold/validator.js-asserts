'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const UriAssert = require('../../src/asserts/uri-assert');
const should = require('should');

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
  it('should throw an error if the constraint is invalid', () => {
    try {
      Assert.uri({ foo: 'bar' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Error);
      e.message.should.equal('Invalid constraint "foo=bar"');
    }
  });

  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.uri().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if the uri does not contain a `hostname`', () => {
    try {
      Assert.uri().validate(`foo-${'-'.repeat(246)}-bar`);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not contain a `protocol`', () => {
    try {
      Assert.uri().validate('foobar.com');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not match the constraints', () => {
    try {
      Assert.uri({ protocol: 'http' }).validate(`https://${'-'.repeat(246)}@bar.com`);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not match the `is` constraint', () => {
    try {
      Assert.uri({ is: 'ip' }).validate('https://foobar.com');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `constraints` on the violation', () => {
    try {
      Assert.uri({ protocol: 'http' }).validate('https://foobar.com');

      should.fail();
    } catch (e) {
      e.show().violation.constraints.should.eql({ protocol: 'http' });
    }
  });

  it('should expose `assert` equal to `Uri`', () => {
    try {
      Assert.uri().validate('foo');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Uri');
    }
  });

  it('should accept an uri that matches the constraints', () => {
    Assert.uri({ is: 'domain' }).validate('https://foobar.com');
    Assert.uri({ protocol: 'https' }).validate('https://foobar.com');
  });

  it('should accept valid uris', () => {
    [
      'http://foobar.com',
      'http://føøbåz.com',
      'http://foobar.com',
      'https://foobar.com',
      'ftp://foobar.com',
      'biz://foobar.com'
    ].forEach(choice => {
      Assert.uri().validate(choice);
    });
  });
});
