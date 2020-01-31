
/**
 * Module dependencies.
 */

import CallbackAssert from '../../src/asserts/callback-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `CallbackAssert`.
 */

const Assert = BaseAssert.extend({
  Callback: CallbackAssert
});

/**
 * Test `CallbackAssert`.
 */

describe('CallbackAssert', () => {
  it('should throw an error if `value` is missing', () => {
    try {
      Assert.callback().validate();

      should.fail();
    } catch (e) {
      e.message.should.equal('Callback must be instantiated with a function');
    }
  });

  it('should throw an error if `value` is not a function', () => {
    try {
      Assert.callback().validate('foobar');

      should.fail();
    } catch (e) {
      e.message.should.equal('Callback must be instantiated with a function');
    }
  });

  it('should throw an error if the given function is invalid', () => {
    try {
      // eslint-disable-next-line no-undef
      Assert.callback(() => thisFunctionDoesNotExist()).validate('foobar');
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('Callback');
      e.show().value.should.equal('foobar');
      e.show().violation.should.not.be.undefined();
      e.show().violation.error.should.be.instanceOf(ReferenceError);
      e.show().violation.error.message.should.equal('thisFunctionDoesNotExist is not defined');
    }
  });

  it('should throw an error if the callback function returns `false`', () => {
    try {
      Assert.callback(value => value === 'foobiz').validate('foobar');
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('Callback');
      e.show().value.should.equal('foobar');
      e.show().violation.should.eql({ result: false });
    }
  });

  it('should expose `assert` equal to `Callback`', () => {
    try {
      Assert.callback(value => value === 'foobiz').validate('foobar');
    } catch (e) {
      e.show().assert.should.equal('Callback');
    }
  });

  it('should have a `class` option and expose it as `assert`', () => {
    try {
      Assert.callback(value => value === 'foobiz', 'CustomClass').validate('foobar');
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('CustomClass');
      e.show().value.should.equal('foobar');
      e.show().violation.should.eql({ result: false });
    }
  });

  it('should not throw an error if the callback function returns `true`', () => {
    Assert.callback(value => value === 'foobar').validate('foobar').should.be.true();
  });
});
