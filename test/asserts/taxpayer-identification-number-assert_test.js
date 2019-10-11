'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const TaxpayerIdentificationNumberAssert = require('../../src/asserts/taxpayer-identification-number-assert');
const should = require('should');

/**
 * Extend `Assert` with `TaxpayerIdentificationNumberAssert`.
 */

const Assert = BaseAssert.extend({
  TaxpayerIdentificationNumber: TaxpayerIdentificationNumberAssert
});

/**
 * Test `TaxpayerIdentificationNumberAssert`.
 */

describe('TaxpayerIdentificationNumberAssert', () => {
  it('should throw an error if the input value is not a string', () => {
    [{}, []].forEach(choice => {
      try {
        Assert.taxpayerIdentificationNumber().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid `tin`', () => {
    try {
      Assert.taxpayerIdentificationNumber().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('foobar');
    }
  });

  it('should throw an error if the input value is not a correctly formatted `tin`', () => {
    try {
      Assert.taxpayerIdentificationNumber().validate('1-2-3456 789');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('1-2-3456 789');
    }
  });

  it('should expose `assert` equal to `TaxpayerIdentificationNumber`', () => {
    try {
      Assert.taxpayerIdentificationNumber().validate('1-2-3456 789');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('TaxpayerIdentificationNumber');
    }
  });

  it('should accept a valid `tin`', () => {
    Assert.taxpayerIdentificationNumber().validate('123456789');
  });

  it('should accept a correctly formatted `tin`', () => {
    Assert.taxpayerIdentificationNumber().validate('123-45-6789');
  });
});
