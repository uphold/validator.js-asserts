
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

describe('Callback', () => {
  it('should throw an error if value is not provided', () => {
    try {
      Assert.callback().validate();

      should.fail();
    } catch (e) {
      e.message.should.equal('Callback must be instantiated with a function');
    }
  });

  it('should throw an error if value is not function', () => {
    try {
      Assert.callback().validate('foobar');

      should.fail();
    } catch (e) {
      e.message.should.equal('Callback must be instantiated with a function');
    }
  });

  it('should forward error when callback function has an error', () => {
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

  it('should throw `Violation` error when callback fails', () => {
    try {
      Assert.callback(value => value === 'foobiz').validate('foobar');
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('Callback');
      e.show().value.should.equal('foobar');
      e.show().violation.should.eql({ result: false });
    }
  });

  it('should throw error with a custom class name when given', () => {
    try {
      Assert.callback(value => value === 'foobiz', 'CustomClass').validate('foobar');
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('CustomClass');
      e.show().value.should.equal('foobar');
      e.show().violation.should.eql({ result: false });
    }
  });

  it('should not throw error when callback function does succeed', () => {
    Assert.callback(value => value === 'foobar').validate('foobar').should.be.true();
  });
});
