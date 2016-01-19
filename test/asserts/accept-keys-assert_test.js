
/**
 * Module dependencies.
 */

import { Assert as BaseAssert, Violation } from 'validator.js';
import AcceptKeysAssert from '../../src/asserts/accept-keys-assert';
import should from 'should';

/**
 * Extend `Assert` with `AcceptKeysAssert`.
 */

const Assert = BaseAssert.extend({
  AcceptKeys: AcceptKeysAssert
});

/**
 * Test `AcceptKeysAssert`.
 */

describe('AcceptKeysAssert', () => {
  it('should throw an error if given input is not a plain object', () => {
    [[], '', 123].forEach((value) => {
      try {
        new Assert().AcceptKeys(['foo', 'bar']).validate(value);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_plain_object');
      }
    })
  });

  it('should throw an error if given object has unaccepted keys', () => {
    try {
      new Assert().AcceptKeys(['foo']).validate({ foo: 'bar', qux: 'qix' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `AcceptKeys`', () => {
    try {
      new Assert().AcceptKeys().validate();

      should.fail();
    } catch(e) {
      e.show().assert.should.equal('AcceptKeys');
    }
  });

  it('should expose `unaccepted` on the violation if given object has unaccepted keys', () => {
    try {
      new Assert().AcceptKeys(['foo']).validate({ foo: 'bar', biz: 'baz', qux: 'qix' });

      should.fail();
    } catch (e) {
      e.show().violation.unaccepted.should.eql(['biz', 'qux']);
    }
  });

  it('should allow setting keys as multiple arguments', () => {
    try {
      new Assert().AcceptKeys('foo', 'bar').validate({ qux: 'qix' });

      should.fail();
    } catch (e) {
      e.show().violation.unaccepted.should.eql(['qux']);
    }
  });

  it('should allow setting a single key as a string argument', () => {
    try {
      new Assert().AcceptKeys('foo').validate({ bar: 'biz' });

      should.fail();
    } catch (e) {
      e.show().violation.unaccepted.should.eql(['bar']);
    }
  });

  it('should accept an empty object', () => {
    new Assert().AcceptKeys('foo', 'bar').validate({}).should.equal(true);
  });

  it('should accept an object with accepted keys', () => {
    new Assert().AcceptKeys('foo', 'bar').validate({ foo: 'bar' }).should.equal(true);
  });
});
