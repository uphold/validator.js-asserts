
/**
 * Module dependencies.
 */

import UkModulusCheckingAssert from '../../src/asserts/uk-modulus-checking-assert';
import should from 'should';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Extend `Assert` with `UkModulusCheckingAssert`.
 */

const Assert = BaseAssert.extend({
  UkModulusChecking: UkModulusCheckingAssert
});

/**
 * Test `UkModulusChecking`.
 */

describe('UkModulusChecking', () => {
  it('should throw an error if `accountNumber` is missing', () => {
    try {
      new Assert().UkModulusChecking().validate();

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('UkModulusChecking');
      e.show().violation.should.eql({ accountNumber: 'must_be_a_string' });
    }
  });

  it('should throw an error if `sortCode` is missing', () => {
    try {
      new Assert().UkModulusChecking().validate({ accountNumber: '' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('UkModulusChecking');
      e.show().violation.should.eql({ sortCode: 'must_be_a_string' });
    }
  });

  it('should throw an error if `accountNumber` or `sortCode` are invalid', () => {
    try {
      new Assert().UkModulusChecking().validate({ accountNumber: '15764273', sortCode: '938063' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('UkModulusChecking');
      e.value.should.have.keys('accountNumber', 'sortCode');
    }
  });

  it('should accept a valid `accountNumber` and `sortCode`', () => {
    new Assert().UkModulusChecking().validate({ accountNumber: '66374958', sortCode: '089999' });
  });
});
