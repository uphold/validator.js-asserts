
/**
 * Module dependencies.
 */

import UriAssert from '../../src/asserts/uri-assert';
import should from 'should';
import { Assert as BaseAssert, Validator, Violation } from 'validator.js';

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
      new Assert().Uri({ foo: 'bar' });

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
        new Assert().Uri().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);

        // jscs: disable requireCamelCaseOrUpperCaseIdentifiers
        e.violation.value.should.equal(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if the uri does not contain a `hostname`', () => {
    try {
      new Assert().Uri().validate(`foo-${'-'.repeat(246)}-bar`);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not contain a `protocol`', () => {
    try {
      new Assert().Uri().validate('foobar.com');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not match the constraints', () => {
    try {
      new Assert().Uri({ protocol: 'http' }).validate(`https://${'-'.repeat(246)}@bar.com`);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not match the `is` constraint', () => {
    try {
      new Assert().Uri({ is: 'ip' }).validate('https://foobar.com');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `constraints` on the violation', () => {
    try {
      new Assert().Uri({ protocol: 'http' }).validate('https://foobar.com');

      should.fail();
    } catch (e) {
      e.show().violation.constraints.should.eql({ protocol: 'http' });
    }
  });

  it('should expose `assert` equal to `Uri`', () => {
    try {
      new Assert().Uri().validate('foo');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('Uri');
    }
  });

  it('should accept an uri that matches the constraints', () => {
    new Assert().Uri({ is: 'domain' }).validate('https://foobar.com');
    new Assert().Uri({ protocol: 'https' }).validate('https://foobar.com');
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
      new Assert().Uri().validate(choice);
    });
  });
});
