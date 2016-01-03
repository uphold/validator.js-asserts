
/**
 * Module dependencies.
 */

import { Assert as BaseAssert, Violation } from 'validator.js';
import EqualKeysAssert from '../../src/asserts/equal-keys-assert';
import should from 'should';

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

    choices.forEach((choice) => {
      try {
        new Assert().EqualKeys(['foo', 'bar']).validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_plain_object');
      }
    });
  });

  it('should throw an error if an object does not have the expected keys', () => {
    try {
      new Assert().EqualKeys(['foo']).validate({ bar: 'biz', foo: 'qux' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
    }
  });

  it('should expose `assert` equal to `EqualKeys`', () => {
    try {
      new Assert().EqualKeys().validate(123);

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('EqualKeys');
    }
  });

  it('should expose `difference` on the violation', () => {
    try {
      new Assert().EqualKeys(['foo']).validate({ bar: 'biz', foo: 'qux' });

      should.fail();
    } catch (e) {
      e.show().violation.difference.should.eql(['bar']);
    }
  });

  it('should accept an object with expected keys', () => {
    new Assert().EqualKeys(['foo', 'bar']).validate({ bar: 'biz', foo: 'qux' });
  });
});
