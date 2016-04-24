
/**
 * Module dependencies.
 */

import TaxpayerIdentificationNumberAssert from '../../src/asserts/taxpayer-identification-number-assert';
import { Assert as BaseAssert, Violation } from 'validator.js';
import should from 'should';

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
        new Assert().TaxpayerIdentificationNumber().validate(choice);

        should.fail();
      } catch (e) {
        e.should.be.instanceOf(Violation);
        e.violation.value.should.equal('must_be_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid `tin`', () => {
    try {
      new Assert().TaxpayerIdentificationNumber().validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('foobar');
    }
  });

  it('should throw an error if the input value is not a correctly formatted `tin`', () => {
    try {
      new Assert().TaxpayerIdentificationNumber().validate('1-2-3456 789');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().value.should.equal('1-2-3456 789');
    }
  });

  it('should expose `assert` equal to `TaxpayerIdentificationNumber`', () => {
    try {
      new Assert().TaxpayerIdentificationNumber().validate('1-2-3456 789');

      should.fail();
    } catch (e) {
      e.show().assert.should.equal('TaxpayerIdentificationNumber');
    }
  });

  it('should accept a valid `tin`', () => {
    new Assert().TaxpayerIdentificationNumber().validate('123456789');
  });

  it('should accept a correctly formatted `tin`', () => {
    new Assert().TaxpayerIdentificationNumber().validate('123-45-6789');
  });
});
