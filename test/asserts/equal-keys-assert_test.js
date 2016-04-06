
/**
 * Module dependencies.
 */

import EqualKeysAssert from '../../src/asserts/equal-keys-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `EqualKeysAssert`.
 */

const Assert = BaseAssert.extend({
  EqualKeys: EqualKeysAssert
});

/**
 * Test `EqualKeysAssert`.
 */

describe('EqualKeysAssert', () => {
  it('should throw an error if the input value is not a plain object', () => {
    const choices = [[], '', 123];

    choices.forEach(choice => {
      try {
        new Assert().EqualKeys(['foo', 'bar']).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_plain_object');
      }
    });
  });

  it('should throw an error if the object does not have the expected keys', () => {
    try {
      new Assert().EqualKeys(['foo']).validate({ bar: 'biz', foo: 'qux' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should throw an error if the object is empty', () => {
    try {
      new Assert().EqualKeys(['foo']).validate({});

      should.fail();
    } catch (e) {
      e.show().violation.difference.should.eql(['foo']);
    }
  });

  it('should allow `keys` to be `undefined`', () => {
    try {
      new Assert().EqualKeys().validate({ foo: 'oof' });

      should.fail();
    } catch (e) {
      e.show().violation.difference.should.eql(['foo']);
    }
  });

  it('should allow `keys` to be defined as multiple arguments', () => {
    try {
      new Assert().EqualKeys('foo', 'bar').validate({ foo: 'oof' });

      should.fail();
    } catch (e) {
      e.show().violation.difference.should.eql(['bar']);
    }
  });

  it('should allow `keys` to be defined as a single string argument', () => {
    try {
      new Assert().EqualKeys('bar').validate({ foo: 'oof' });

      should.fail();
    } catch (e) {
      e.show().violation.difference.should.eql(['foo']);
    }
  });

  it('should expose `assert` equal to `EqualKeys`', () => {
    try {
      new Assert().EqualKeys(['foo']).validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('EqualKeys');
    }
  });

  it('should expose `difference` on the violation if object has extra keys', () => {
    try {
      new Assert().EqualKeys(['foo']).validate({ bar: 'biz', foo: 'qux' });

      should.fail();
    } catch (e) {
      e.show().violation.difference.should.eql(['bar']);
    }
  });

  it('should expose `difference` on the violation if object has missing keys', () => {
    try {
      new Assert().EqualKeys(['foo', 'biz']).validate({ foo: 'qux' });

      should.fail();
    } catch (e) {
      e.show().violation.difference.should.eql(['biz']);
    }
  });

  it('should accept an empty object with no keys expected', () => {
    new Assert().EqualKeys().validate({});
  });

  it('should accept an object with expected keys', () => {
    new Assert().EqualKeys(['foo', 'bar']).validate({ bar: 'biz', foo: 'qux' });
  });
});
