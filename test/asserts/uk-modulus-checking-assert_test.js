'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const UkModulusCheckingAssert = require('../../src/asserts/uk-modulus-checking-assert');
const should = require('should');

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
      Assert.ukModulusChecking().validate();

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('UkModulusChecking');
      e.show().violation.should.eql({ accountNumber: 'must_be_a_string' });
    }
  });

  it('should throw an error if `sortCode` is missing', () => {
    try {
      Assert.ukModulusChecking().validate({ accountNumber: '' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('UkModulusChecking');
      e.show().violation.should.eql({ sortCode: 'must_be_a_string' });
    }
  });

  it('should throw an error if `accountNumber` or `sortCode` are invalid', () => {
    try {
      Assert.ukModulusChecking().validate({ accountNumber: '15764273', sortCode: '938063' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('UkModulusChecking');
      e.value.should.have.keys('accountNumber', 'sortCode');
    }
  });

  it('should accept a valid `accountNumber` and `sortCode`', () => {
    Assert.ukModulusChecking().validate({ accountNumber: '66374958', sortCode: '089999' });
  });
});
